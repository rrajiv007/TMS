Ext.define("CueTrans.lib.control.svgGraph", {
    extend: "Ext.chart.Chart",
	alias:'widget.svgGraph',
	chartSectionPtr: {},
	/*
	//floating:true,
	alwaysOnTop:true,
	autoRender:true,
	visible:true,	
	style: {
		'z-index': 1
	},
	*/
	config:
	{
		chartType: "line",
		xAxisCaption: "",
		yAxisCaption: "",
		svgChart:true,
		chartId:"",
		chartHeight: 300,
		chartWidth: 625,
		parentForm:"",
		lnkID:"",
		ChartTitle:"",
		labelRotate:false
	},
    initComponent: function() {
		
		this.setWidth(this.chartWidth);
		this.setHeight(this.chartHeight);
        this.height = this.chartHeight;
        this.width = this.chartWidth;			
		if (this.chartType == 'columnstack' || this.chartType == 'barstack' || this.chartType == 'slider')
		{
			
			Ext.define(this.chartId + '_model', {
				extend: 'Ext.data.Model',
				fields: [{
						name: 'xaxis',
						type: 'string'
					}, {
						name: 'yaxis',
						type: 'int'
					}, {
						name: 'data1',
						type: 'int'
					}, {
						name: 'data2',
						type: 'int'
					}, {
						name: 'data3',
						type: 'int'
					}
				]
			});
		}
		else
		{
			
			Ext.define(this.chartId + '_model', {
				extend: 'Ext.data.Model',
				fields: [{
						name: 'xaxis',
						type:'string'
						}, {
						name: 'yaxis',
						type: 'int'
						}
						]
			});
			
		}
		
        Ext.create('Ext.data.Store', {
            id: this.chartId + '_store',
            model: this.chartId + '_model'
        });

		var tmpYAxisPos="left";
		var tmpXAxisPos="bottom";
		
        if (this.chartType == 'bar' || this.chartType == 'barstack' || this.chartType == 'slider')
		{
			tmpYAxisPos="bottom";
			tmpXAxisPos="left";
		}
		/*
		Ext.define('Ext.chart.theme.ColumnTheme', {
			extend: 'Ext.chart.theme.Base',
			constructor: function(config) {
				this.callParent([Ext.apply({ 
				   
					colors: ['#3AA8CB', 'red']

				}, config)]);
			}
		});	
		*/
		var tmpLable;
		var chartProp={
			store: Ext.data.StoreManager.lookup(this.chartId+'_store'),
            width: this.chartWidth,
            height: this.chartHeight,
            animate: true,
            //shadow: true,			
			style: 'background:#ffffff'
			//theme:'ColumnTheme'
		};
		
		if(this.svgChart)
		{
			/*
			chartProp["autoRender"]=true;
			chartProp["autoShow"]=false;
			*/
		}
		if (this.chartType == 'columnstack' || this.chartType == 'barstack')
		{
				chartProp["legend"] = {
						 position: 'right',
						boxStrokeWidth: 0,
						labelFont: '12px Trebuchet MS, Tahoma, Arial, Verdana;'
					}
		}
		
		if (this.chartType == 'guage')
		{
			chartProp["animate"] = {
						easing: 'ease',
						duration: 500
					}
			chartProp["insetPadding"]= 25
		 };
		
		if (this.chartType == 'donut')
		{
			chartProp["legend"] = {
						boxStrokeWidth: 0,
                        position: 'right'
					}
			//chartProp["insetPadding"]= 50
			//chartProp["innerPadding"]= 20
		 };
		
		if (this.labelRotate)
		{
			tmpLable = {
                    rotate: {
                        degrees: -90
                    }
                }
		 }
		else		 
		{
		tmpLable = {
                    rotate: {
                        degrees: 0
                    }
                }
		}
		var lineAxesProp=
			[{
				title: this.yAxisCaption,
				type: 'Numeric',
				position: tmpYAxisPos,
				//floating:true,
				majorTickSteps: 4,  				
				minorTickSteps: 0,
				fields: ['yaxis'],
				labelTitle: { "font": '12px Trebuchet MS, Tahoma, Arial, Verdana;',"font-family":'Trebuchet MS, Tahoma, Arial, Verdana;' },
				grid: 
				{
					odd: {
						opacity: 1,
						fill: "#ffffff",
						stroke: "#ffffff",
						"stroke-width": 0.5
					}
				},
				minimum: 0
			}, 
			{
				title: this.xAxisCaption,
				type: 'Category',
				//floating:true,
				labelTitle: { "font": '12px Trebuchet MS, Tahoma, Arial, Verdana;',"font-family":'Trebuchet MS, Tahoma, Arial, Verdana;' },
				position: tmpXAxisPos,
				fields: ['xaxis'],
				label: tmpLable
			}];				
		var guageAxesProp=
				[{
                    type: 'gauge',
                    position: 'gauge',
					//floating:true,
                    minimum: 0,
                    maximum: 100,
                    steps: 5,
                    margin: 7,
					title:''
                }];
				
        var lineSeriesProp = 
			[{
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                "stroke-width": 10,
                xField: 'xaxis',
                yField: 'yaxis',
				//floating:true,
                angleField: 'yaxis',
                markerConfig: {
                    type: "circle",
                    size: 4,
                    radius: 4,
                    "stroke-width": 0
                }
            }];
		var pieSeriesProp = 
			[{
                type: 'pie',
                angleField: 'yaxis',
				//lengthField: 'xaxis',
				showInLegend: true,
				//floating:true,
				//colorSet: ['#3AA8CB', 'red'],
				/*
				 renderer: function(sprite, record, attr, index, store) {
				  //console.log("index",index,index % 1,index % 2,index % 3,index % 4,5 % 4,6 % 4);
                   var color = ['rgb(213, 70, 121)', 
                                 'rgb(44, 153, 201)', 
                                 'rgb(146, 6, 157)', 
                                 'rgb(49, 149, 0)', 
                                 'rgb(249, 153, 0)'];
					return Ext.apply(attr, {
                        fill: color[index % 5]
                    });                   
                },*/	
                donut:30,
				label: {
					field: 'xaxis',	
					renderer: function(value, label, storeItem) {
						// storeItem is your model, so return the value you want as label
						return storeItem.get('yaxis');
					},
					display: 'rotate',					
					contrast: true,
					font: '12px Trebuchet MS, Tahoma, Arial, Verdana;'
				   },				
				tips: {
						trackMouse: true,
						style: 'background: #FFF',
						height: 20,
						width:150,
						renderer: function(storeItem, item) {
							this.setTitle(storeItem.get('xaxis')+ ': ' + storeItem.get('yaxis') );
						}
					}
            }];
		var me=this;
		var columnSeriesProp =
            [{
                type: 'column',
                xField: 'xaxis',
                yField: 'yaxis',				
                angleField: 'yaxis',
				//floating:true,
                fill: true,						
				listeners: {
					itemclick: function (param) {
						if (me.lnkID !=undefined & me.lnkID !=null & me.lnkID !="" & me.lnkID !=" ")
						{
						//console.log(param.yField);
						var xValue=param.storeItem.data["xaxis"];
						var yValue=param.storeItem.get(param.yField);
						//var me=this;						
						me.parentForm.launchpopupchart(me.lnkID,xValue,yValue)
						//alert(param.storeItem.get(param.yField));
						}
					}
				},
				label: {
                    display: 'insideEnd',
                    field: [ 'yaxis'],
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'horizontal',
                    color: '#ffffff',
					font: '12px Trebuchet MS, Tahoma, Arial, Verdana;',
                    'text-anchor': 'middle'
                },				
				 renderer: function(sprite, record, attr, index, store) {
				  //console.log("index",index,index % 1,index % 2,index % 3,index % 4,5 % 4,6 % 4);
                   var color = ['rgb(213, 70, 121)', 
                                 'rgb(44, 153, 201)', 
                                 'rgb(146, 6, 157)', 
                                 'rgb(49, 149, 0)', 
                                 'rgb(249, 153, 0)'];
					return Ext.apply(attr, {
                        fill: color[index % 5]
                    });                   
                },				
				tips: {
                    trackMouse: true,
                    style: 'background: #FFF',
                    height: 20,
					width:150,
                    renderer: function(storeItem, item) {						
                        this.setTitle(storeItem.get('xaxis') + ': ' + storeItem.get('yaxis'));
                    }
                }
            }];	
		var columnstackSeriesProp =
            [{
                type: 'column',
				axis: 'left',
				title: this.ChartTitle,				
                xField: 'xaxis',                			
                yField: [ 'yaxis', 'data1','data2', 'data3'],   								
				stacked: true,
				column: true,									
				tips: {
                    trackMouse: true,
                    style: 'background: #FFF',
                    height: 20,
					width:150,
                    renderer: function(storeItem, item) {						
						var tmpMonth = item.series.title[Ext.Array.indexOf(item.series.yField, item.yField)];
                        this.setTitle(tmpMonth + ' for ' + storeItem.get('xaxis') + ': ' + storeItem.get(item.yField));
                        //this.setTitle(storeItem.get('xaxis') + ': ' + storeItem.get('yaxis'));
                    }
                },
				label: {
                    display: 'insideEnd',
                    field: [ 'yaxis', 'data1', 'data2', 'data3'],
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'horizontal',
                    color: '#ffffff',
					font: '10px Trebuchet MS, Tahoma, Arial, Verdana;',
                    //'text-anchor': 'middle'
                },
            }];	
		var barSeriesProp =
            [{
                type: 'bar',
                axis: 'bottom', 							
                label: {
                    display: 'insideEnd',
                    field: 'yaxis',
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'horizontal',
                    color: '#ffffff',
					font: '10px Trebuchet MS, Tahoma, Arial, Verdana;',
                    'text-anchor': 'middle'
                },
				 renderer: function(sprite, record, attr, index, store) {
				  //console.log("index",index,index % 1,index % 2,index % 3,index % 4,5 % 4,6 % 4);
                   var color = ['rgb(213, 70, 121)', 
                                 'rgb(44, 153, 201)', 
                                 'rgb(146, 6, 157)', 
                                 'rgb(49, 149, 0)', 
                                 'rgb(249, 153, 0)'];
					return Ext.apply(attr, {
                        fill: color[index % 5]
                    });                   
                },							
				tips: {
                    trackMouse: true,
                    style: 'background: #FFF',
                    height: 20,
					width:150,
                    renderer: function(storeItem, item) {						
                        this.setTitle(storeItem.get('xaxis') + ': ' + storeItem.get('yaxis'));
                    }
                },
                xField: 'xaxis',
                yField: ['yaxis']
            }]	;			
		var barstackSeriesProp =
            [{
                type: 'bar',
				axis: 'left',
				title: [ 'Q1', 'Q2', 'Q3', 'Q4'],
                xField: 'xaxis',                			
                yField: [ 'yaxis', 'data1', 'data2', 'data3'],   								
				stacked: true,	
				//style: { height: 25 },
				tips: {
                    trackMouse: true,
                    style: 'background: #FFF',
                    height: 20,
					width:150,
                    renderer: function(storeItem, item) {						
						var tmpMonth = item.series.title[Ext.Array.indexOf(item.series.yField, item.yField)];
                        this.setTitle(tmpMonth + ' for ' + storeItem.get('xaxis') + ': ' + storeItem.get(item.yField));
                        //this.setTitle(storeItem.get('xaxis') + ': ' + storeItem.get('yaxis'));
                    }
                },
				label: {
                    display: 'insideEnd',
                    field: [ 'yaxis', 'data1', 'data2', 'data3'],
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'horizontal',
                    color: '#ffffff',
					font: '10px Trebuchet MS, Tahoma, Arial, Verdana;',
                    //'text-anchor': 'middle'
                },
            }];	
		var sliderSeriesProp =
            [{
                type: 'bar',
				axis: 'left',				                               			
                yField: [ 'yaxis', 'data1'],   								
				stacked: true
				//style: { height: 12 }			
            }];	
		var guageSeriesProp =
			[{
                    type: 'gauge',
                    field: ['yaxis'],
                    donut: 80,
					orientation :'horizontal',
                    colorSet: ['#3AA8CB', 'red']					
            }
			];
			
        if (this.chartType == 'line')
		{
			chartProp["axes"]=lineAxesProp;
			chartProp["series"]=lineSeriesProp;
		}
		else if (this.chartType == 'guage')
		{
			
			chartProp["axes"]=guageAxesProp;
			chartProp["series"]=guageSeriesProp;
		}
		else if (this.chartType == 'column')
		{
			chartProp["axes"]=lineAxesProp;
			chartProp["series"]=columnSeriesProp;
		}
		else if (this.chartType == 'bar')
		{
			chartProp["axes"]=lineAxesProp;
			chartProp["series"]=barSeriesProp;			
		}
		else if (this.chartType == 'donut')
		{			
			chartProp["series"]=pieSeriesProp;			
		}
		else if (this.chartType == 'columnstack')
		{			
			chartProp["axes"]=lineAxesProp;
			chartProp["series"]=columnstackSeriesProp;			
		}
		else if (this.chartType == 'barstack')
		{			
			chartProp["axes"]=lineAxesProp;
			chartProp["series"]=barstackSeriesProp;			
		}
		else if (this.chartType == 'slider')
		{			
			//chartProp["axes"]=lineAxesProp;
			chartProp["series"]=sliderSeriesProp;			
		}
		
		//this.chartSectionPtr =Ext.create('Ext.chart.Chart', chartProp);
		Ext.apply(this,chartProp)
        //this.add(this.chartSectionPtr);
		this.callParent(arguments);
		//this.doAutoRender();
		//this.show();
    }

})