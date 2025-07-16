Ext.define('CueTrans.view.journey_management.INSDashboard', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();	
		
		
		insDashboardPanel =  Ext.create("Ext.panel.Panel",
			{
				layout:"vbox",
				padding:plf.padding,
				margin:plf.margin,
				border:true,
				defaults:{padding:plf.padding,margin:plf.margin},
				cls:"c-mainpage-section",
				bodyCls:"c-mainpage-section"
			})
		
		insDashboardGraphPanel = plf.addColumnSection({title:"",cls:"svgjourneycls"});
		
		plf.columns=2
		insDashboardCtrl=
		[
			plf.addGRAPHObject({"id":"inspectiongraphmonthly","graphHdr":"Inspections-Month To Date","xAxisCaption":"Date","yAxisCaption":"Total Inspections",columnWidth:.5}),
			plf.addGRAPHObject({"id":"inspectiongraphyearly","graphHdr":"Inspections-Year To Date","xAxisCaption":"Month","yAxisCaption":"Total Inspections",columnWidth:.5,"chartType":"column"})
		]
		insDashboardGraphPanel.add(insDashboardCtrl)
		
		svgInspectionPanel = plf.addColumnSection({title:"",cls:"svgjourneycls"});
		svgInspectionPanel.add(plf.addSVGObject({"id":"inspection","svgID":"inspection","svgFileName":"resources/images/svg/inspection/Inspection.svg"}))
		
		insDashboardPanel.add(svgInspectionPanel);
		insDashboardPanel.add(insDashboardGraphPanel);

		
		mainpage.ptrMainSection.add(insDashboardPanel);//Add Header Section to Numbering Type Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreInspectionService",
				"methodName":"loadInspectionDashboard"
			}			
		];	
		this.callParent(arguments);
		
	}
});
