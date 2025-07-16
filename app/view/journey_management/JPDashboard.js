Ext.define('CueTrans.view.journey_management.JPDashboard', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();	
		
		
		jpDashboardPanel =  Ext.create("Ext.panel.Panel",
			{
				layout:"vbox",
				padding:plf.padding,
				margin:plf.margin,
				border:true,
				defaults:{padding:plf.padding,margin:plf.margin},
				cls:"c-mainpage-section",
				bodyCls:"c-mainpage-section"
			})
		
		jpDashboardGraphPanel = plf.addColumnSection({title:"",cls:"svgjourneycls"});
		
		plf.columns=2
		jpDashboardCtrl=
		[
			plf.addGRAPHObject({"id":"journeygraphmonthly","graphHdr":"Journeys-Month To Date","xAxisCaption":"Date","yAxisCaption":"Total Journeys",columnWidth:.5}),
			plf.addGRAPHObject({"id":"journeygraphyearly","graphHdr":"Journeys-Year To Date","xAxisCaption":"Month","yAxisCaption":"Total Journeys",columnWidth:.5,"chartType":"column"})
		]
		jpDashboardGraphPanel.add(jpDashboardCtrl)
		
		svgJourneyPanel = plf.addColumnSection({title:"",cls:"svgjourneycls"});
		svgJourneyPanel.add(plf.addSVGObject({"id":"journey","svgID":"journey","svgFileName":"resources/images/svg/journeyplan/journey.svg"}))
		
		jpDashboardPanel.add(svgJourneyPanel);
		jpDashboardPanel.add(jpDashboardGraphPanel);

		
		mainpage.ptrMainSection.add(jpDashboardPanel);//Add Header Section to Numbering Type Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreJourneyPlanService",
				"methodName":"loadJourneyDashboard"
			}			
		];	
		this.callParent(arguments);
		
	}
});
