Ext.define("CueTrans.lib.control.cueChart", {
	extend: "Ext.panel.Panel",
	alias:'widget.cueChart',
	//requires:["CueTrans.lib.control.theme.chartTheme0"],
	layout:'fit',
	cls:'chart_container',
	margin:2,
	chartSectionPtr: {},
	config:
	{
		xAxisColumn:"name",
		xAxisCaption: "",
		yAxisCaption: "",
		y1AxisCaption:"",
		xyaxis :false,
		seriesArray:[],
		//chartTheme:"chartTheme1",
		chartId:"",
		chartType:"Cartesian",
		showLegend:false,
		MoneySeparator:true,
		//chartColor:plf.getChartColor(1),
		//chartHeight: 300,
		//chartWidth: 625,
		parentForm:"",
		popScreen:"",
		popSeriesCtrl:"",
		popValueCtrl:"",
		popMethodName:"",
		chartTitle:"",
		heightFactor:.5,
		animate: true,
        	shadow: false,
		chartColors:[]
	},
	initComponent: function() {
		var tmpChartFields = [];
		var tmpChartSeries = [];
		var formObj = this;
				
		this.setTitle(this.chartTitle);
		//this.setWidth(this.chartWidth);
		//this.setHeight(this.chartHeight);
		if(this.parentForm.chartSearchPanel)
			this.setHeight((plf.screenHeight-170-40)*this.heightFactor)
		else
			this.setHeight((plf.screenHeight-170)*this.heightFactor)
		/*
		Derive Chart Fields from series array
		*/
		if (this.chartType=="Cartesian")
		{		
		tmpChartFields.push(formObj.xAxisColumn);

		Ext.each(this.seriesArray,
			function(seriesObj) {
				tmpChartFields.push.apply(tmpChartFields,seriesObj.field);
					var tmpSeriesObj = {};
					
					
					tmpSeriesObj.xField= formObj.xAxisColumn;
					tmpSeriesObj.yField= seriesObj.field;
					tmpSeriesObj.axis= 'bottom';
					
					if(seriesObj.type=="barcolor")
					{
						tmpSeriesObj.type= "bar";
						tmpSeriesObj.renderer= function(sprite, record, attributes, index, store) 
						{							 
							//var colors= [ '#1ABC9C', '#F1C40F', '#3498DB', '#C0392B', '#9B59B6' ];
							
							if(formObj.chartColors.length>0)
							{
								var colors = plf.getChartColor(formObj.chartColors);
							}
							else
							{
								var colors = plf.getChartColor("base");
							}							
							
							attributes.fill = colors[index%colors.length];							
							attributes.width =50;							
							return attributes;
						}						
					}
					else if(seriesObj.type=="barstack")
					{
						tmpSeriesObj.stacked=true;
						tmpSeriesObj.type= "bar";
					}
					else if(seriesObj.type=="bar")
					{
						tmpSeriesObj.stacked=false;
						tmpSeriesObj.type= "bar";
					}					
					else
					{
						tmpSeriesObj.type= seriesObj.type;
					}
					
					if(tmpSeriesObj.type =='bar')
					{
						tmpSeriesObj.label= {
							field: seriesObj.field,
							display: 'insideEnd',
							fontSize:'11px',
							fontWeight:'bold',
							orientation: 'horizontal',
							color:"#000000",
							calloutLine:false,
							renderer: function (value, sprite, config, renderData, index) 
							{								
							if (!formObj.MoneySeparator)
							{						
							return {text: value};
							}
							else
							return {text: Ext.util.Format.number(value, '000,000')};
							}
						}					
					
					}
					
					tmpSeriesObj.style= {
							fillOpacity:.9,
							maxBarWidth:50,
							minGapWidth: 20
					}
					/*	
					tmpSeriesObj.tooltip= {
							trackMouse: true,
							//width: 70,
							//height: 28,
							renderer: function (storeItem, item) {	

								if (storeItem.get(item) != "" & storeItem.get(item) != undefined)
								{
									this.setHtml(storeItem.get(formObj.xAxisColumn) + ":" + storeItem.get(item));
								}
							}
					  }
					*/	  
					tmpChartSeries.push(tmpSeriesObj)
							/*
							
						tooltip: {
						  trackMouse: true,
						  width: 70,
						  height: 28,
						  renderer: function (storeItem, item) {						  
									console.log(storeItem);
									console.log(item);
						  if (storeItem.get('Count') != "")
						  {
							  this.setHtml(storeItem.get('Count'));
						  }
						  }
						  }
							*/
						
					})
		//console.log(tmpChartFields)
		//console.log(tmpChartSeries)
		
		this.chartStore = Ext.create('Ext.data.Store', {
			id: this.chartId + '_store',
			fields:tmpChartFields
		});
	
			var tmpChartProp = {};
			tmpChartProp.store = this.chartStore;
			tmpChartProp.insetPadding = 30;
			
			if(this.chartColors.length>0)
			{
				tmpChartProp.colors = plf.getChartColor(this.chartColors);
			}
			else
			{
				tmpChartProp.colors = plf.getChartColor(plf.chartCounter);
			}
			
				
			//tmpChartProp.theme="chartTheme0";// + plf.chartCounter % 4,
			tmpChartProp.plugins = {
						ptype: 'chartitemevents',
						moveEvents: true
					}	
			tmpChartProp.animate = true;
					
			//define the x and y-axis configuration.
			tmpChartProp.series=tmpChartSeries;
					
			//define the actual bar series.
			if(!this.xyaxis)	
			{
				tmpChartProp.axes = [
						{
							type: 'numeric',
							position: 'left',
							grid: false,	
							//hidden:true,
							minimum: 0,
							dashSize:0,
							title: this.yAxisCaption,
							renderer:function(v)
							{
								if (parseInt(v) == v)
								{
									if (!formObj.MoneySeparator)
									{
									return v;
									}
									else
									return Ext.util.Format.number(v, '000,000');
								}
									
								else
									return "";
							}						
						}, 
						{
							type: 'category',
							position: 'bottom', 
							title: this.xAxisCaption						
						},
				] 
			}
			else
			{
				tmpChartProp.axes = [
						{
							type: 'numeric',
							position: 'left',
							grid: false,	
							//hidden:true,
							minimum: 0,
							dashSize:0,
							title: this.yAxisCaption,
							renderer:function(v)
							{
								if (parseInt(v) == v)
								{
									if (!formObj.MoneySeparator)
									{
									return v;
									}
									else
									return Ext.util.Format.number(v, '000,000');
								}
									
								else
									return "";
							}						
						}, 
						{						
							type: 'numeric',
							position: 'right',
							grid: false,	
							//hidden:true,
							minimum: 0,
							dashSize:0,
							title: this.y1AxisCaption,
							renderer:function(v)
							{
								if (parseInt(v) == v)
								{
									if (!formObj.MoneySeparator)
									{
									return v;
									}
									else
									return Ext.util.Format.number(v, '000,000');
								}
									
								else
									return "";
							}				
						}, 

						{
							type: 'category',
							position: 'bottom',
							title: this.xAxisCaption						
						}
				]
			}
			//Axis Array closure bracket.
					
			tmpChartProp.listeners = { 
						itemclick: function (chart, item, event) {
							//console.log(item.record.data[formObj.xAxisColumn], item.field);
							if(formObj.popScreen != "")
							{
								var tmp_initialValues =
								[
									{ctrl:"iUID","value":formObj.parentForm.hdnUID.getValue()},
									{ctrl:formObj.popSeriesCtrl,"value":item.field},
									{ctrl:formObj.popValueCtrl,"value":item.record.data[formObj.xAxisColumn]},
									{ctrl:"dynMethodName","value":formObj.popMethodName}
								];	
																											                                           launch_helpscreen(formObj.parentForm,"","CueTrans.view."+formObj.popScreen,tmp_initialValues)
							}
						}
					}
					
			if(this.parentForm.chartSearchPanel)
				tmpChartProp.height = ((plf.screenHeight-170-40)*this.heightFactor)-10
			else
				tmpChartProp.height = ((plf.screenHeight-170)*this.heightFactor) -10
			
			this.chartSectionPtr = Ext.create('Ext.chart.CartesianChart', tmpChartProp);
			
			if(this.showLegend)
			{
				this.chartSectionPtr.setLegend({
					docked: 'bottom',
					cls:"legend3Lines",
					autoShow:true,
					alwaysOnTop:true
					
				})	
		}
			/*
			if(this.chartColors.length>0)
			{
				
				this.chartSectionPtr.setColors(["red","green"]);
			}
			*/
		}
		if (this.chartType=="Polar")
		{
		Ext.each(this.seriesArray,
			function(seriesObj) {
				tmpChartFields.push.apply(tmpChartFields,seriesObj.field);
				
				tmpChartSeries.push({						
						type: seriesObj.type,
						angleField: seriesObj.field,
						 highlight: true,
					    label: {
								field: seriesObj.field,
								display: 'rotate',					
								contrast: false	
							   },					   
					    donut: 50,
						tooltip: {
						  trackMouse: true,
						  //width: 70,
						  //height: 28,
						  renderer: function (storeItem, item) {
							  this.setHtml(storeItem.get(formObj.xAxisColumn) + ":" + storeItem.get(seriesObj.field));
						  }
						}
					})
			
		})
		
		this.chartStore = Ext.create('Ext.data.Store', {
			id: this.chartId + '_store',
			fields:tmpChartFields
		});
		this.chartSectionPtr = Ext.create('Ext.chart.PolarChart', {
					cls:'chart_element',					
					store: this.chartStore,		
					showInLegend: true,	
					insetPadding: 30,
					//interactions: ['rotate', 'itemhighlight'],					
					//background: '#F8F8F8',					
					plugins: {
						ptype: 'chartitemevents',
						moveEvents: true
					},
					animate: true,
					shadow: false,				
					//define the actual bar series.
					series:tmpChartSeries
				})
		if(this.showLegend)
			{
				this.chartSectionPtr.setLegend({
					docked: 'bottom',
					cls:"legend3Lines",
					autoShow:true,
					alwaysOnTop:true
					
				})	
			 }
		}
		plf.chartCounter++;
		this.callParent(arguments);
		this.add(this.chartSectionPtr);
	}
});
