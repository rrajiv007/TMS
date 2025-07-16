Ext.define("CueTrans.lib.GraphObject", 
	{
		extend:"Ext.panel.Panel",		
		graphHdr:"",
		kpiArray:[],
		chartType:"line",
		xAxisCaption:"",
		yAxisCaption:"",
		id:"",
		chartSectionPtr:{},
		hdrSectionPtr:{},
		footSectionPtr:{},		
		chartHeight:300,
		chartWidth:625,	
		
		initComponent: function()
		{
			this.callParent(arguments);
			
			this.height = this.chartHeight
			this.width = this.chartWidth
			
			this.hdrSectionPtr = Ext.create("Ext.container.Container",{layout:"hbox",dock:"top"})
			this.hdrSectionPtr.add({xtype:"label",text:this.graphHdr,cls:"graphhdrcls"})
			this.addDocked(this.hdrSectionPtr)

			this.footSectionPtr = Ext.create("Ext.container.Container",{layout:"hbox",dock:"bottom"})
			/*
			footSection.add({xtype:"button",cls:"graphFootImage",src:"images/line.png",})
			footSection.add({xtype:"button",cls:"graphFootImage",src:"images/bar.png"})
			footSection.add({xtype:"button",cls:"graphFootImage",src:"images/pie.png"})
			*/
			this.footSectionPtr.add(this.addButton('line'))
			this.footSectionPtr.add(this.addButton('column'))
			this.footSectionPtr.add(this.addButton('pie'))
			this.footSectionPtr.add(this.addButton('donut'))
			this.addDocked(this.footSectionPtr)

			
			Ext.define(this.id+'_model', {
				extend: 'Ext.data.Model',
				fields: [
							{ name:'xaxis', type:'string' },
							{ name:'yaxis', type:'Numeric' }
							
						]
			});

			Ext.create('Ext.data.Store', {
			id: this.id+'_store',
			model: this.id+'_model',
			data: 
			[
				{"yaxis":0,"xaxis":"0"},
				{"yaxis":10,"xaxis":"1 Aug"},
				{"yaxis":15,"xaxis":"2 Aug"},
				{"yaxis":12,"xaxis":"3 Aug"},
				{"yaxis":14,"xaxis":"4 Aug"},
				{"yaxis":11,"xaxis":"5 Aug"},
				{"yaxis":9,"xaxis":"6 Aug"},
				{"yaxis":16,"xaxis":"7 Aug"},
				{"yaxis":14,"xaxis":"8 Aug"},	
				{"yaxis":17,"xaxis":"9 Aug"},
				{"yaxis":3,"xaxis":"10 Aug"},
				{"yaxis":5,"xaxis":"11 Aug"}			
			]	
			});
		
			if(this.chartType == 'pie')
			{
				this.addPieChart()
			}
			
			else
			{
				this.addLineChart()
			}
			
			
			this.add(this.chartSectionPtr)
		},
		addLineChart:function()
		{
			this.chartSectionPtr = Ext.create('Ext.chart.Chart', {
					width: this.chartWidth-30,
					height: this.chartHeight-70,
					store:this.id+'_store',
					//baseCls:"c-graph1",
					animate: true,		
					shadow: true,
					axes:[		
						{
							title: this.yAxisCaption,
							type: 'Numeric',
							position: 'left',
							showInLegend: true,							
							fields: ['yaxis'],													
							grid: false							
						},
						{
							title: this.xAxisCaption,							
							type: 'Category',
							position: 'bottom',
							fields: ['xaxis'],							
							grid: true
						}			
					],
					series: [
						{
							type: this.chartType,
							xField: 'xaxis',
							yField: 'yaxis',	
							angleField: 'yaxis',
							fill: true,
						}
					]
				});				
		},
		addPieChart:function()
		{
			
			this.chartSectionPtr = Ext.create('Ext.chart.Chart', {
					width: this.chartWidth-100,
					height: this.chartHeight-50,
					store:this.id+'_store',
					//baseCls:"c-graph1",
					//theme: 'Blue',
					animate: true,		
					shadow: true,
					series: [
						{
							type: this.chartType,
							angleField: 'yaxis',
							showInLegend: true,
							label: {
								field: 'xaxis',
								display: 'rotate',
								contrast: true,
								font: '18px Arial'
							   }							
						}
					],
					legend: {
                        boxStrokeWidth: 0,
                        position: 'right'
                    }					
				});				
		},
		addDonutChart:function()
		{
			this.chartSectionPtr = Ext.create('Ext.chart.Chart', {
					width: this.chartWidth-100,
					height: this.chartHeight-50,
					store:this.id+'_store',
					//baseCls:"c-graph1",
					//theme: 'Blue',
					animate: true,		
					shadow: true,
					series: [
						{
							type: 'pie',
							angleField: 'yaxis',
							showInLegend: true,
							donut:30,
							label: {
								field: 'xaxis',
								display: 'rotate',
								contrast: true,
								font: '18px Arial'
							   }							
						}
					],
					legend: {
                        boxStrokeWidth: 0,
                        position: 'right'
                    }					
				});				
		},
		addButton:function(tmpChartType)
		{
			var me=this;
			tmpObj=
				{
					xtype:"button",
					height: 25,
					width:25,
					margin:1,
					icon:'resources/images/chart/'+tmpChartType+'.png',
					iconAlign:'left',
					scale   : 'small',
					handler:function(eventobj){
						me.remove(me.chartSectionPtr)
						me.chartType=tmpChartType;
						if(tmpChartType == 'pie')
						{
							
							me.addPieChart()
						}
						else if(tmpChartType == 'donut')
						{
							
							me.addDonutChart()
						}
						else
						{
							me.addLineChart()
						}	
						me.add(me.chartSectionPtr)
					}
				}		
			return tmpObj
		}
		
	})