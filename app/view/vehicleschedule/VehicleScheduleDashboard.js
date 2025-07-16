/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var		                                   
************************************************************************************************/
Ext.define('CueTrans.view.vehicleschedule.VehicleScheduleDashboard', 
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
		
		var insDashboardGraphPanel = plf.addColumnSection({title:"",cls:"svgjourneycls"});	//69997
		
		plf.columns=1
		var insDashboardCtrl1=													//69997
		[
			plf.addGRAPHObject({"id":"vehiclegraphmonthly","graphHdr":"Months","xAxisCaption":"Months",                                "yAxisCaption":"No Of Trucks","chartHeight":300,
		"chartWidth":"1272"})
			
		]
		insDashboardGraphPanel.add(insDashboardCtrl1)
		
				
		var insDashboardGraphPanel2 = plf.addColumnSection({title:"",cls:"svgjourneycls"});		//69997
		
		plf.columns=1
		var insDashboardCtrl2=																//69997
		[
			plf.addGRAPHObject({"id":"vehiclegraphweekly","graphHdr":"Weeks","xAxisCaption":"Weeks","yAxisCaption":"No Of Trucks","chartType":"column","chartWidth":"1272"})
		]
		insDashboardGraphPanel2.add(insDashboardCtrl2)
        
		var insDashboardGraphPanel3 = plf.addColumnSection({title:"",cls:"svgjourneycls"});		//69997
		
		plf.columns=1
		var insDashboardCtrl3=															//69997
		[
			plf.addGRAPHObject({"id":"vehiclegraphday","graphHdr":"Days","xAxisCaption":"Days","yAxisCaption":"No Of Trucks","chartType":"column","chartWidth":"1272"})
		]
		insDashboardGraphPanel3.add(insDashboardCtrl3)
		
		
		var svgInspectionPanel = plf.addColumnSection({title:"",cls:"svgjourneycls"});		//69997
		plf.columns=1
		var insDashboardsvgCtrl	=															//69997
		[			
		plf.addSVGObject({"id":"inspection","svgID":"inspection","svgFileName":"resources/images/svg/VehicleSchedule/VehicleSchedule.svg"})
		]
		svgInspectionPanel.add(insDashboardsvgCtrl)
		//svgInspectionPanel.add(plf.addSVGObject({"id":"inspection","svgID":"inspection","svgFileName":"resources/images/svg/VehicleSchedule/VehicleSchedule.svg"}))
		
		var insDashboardPanel.add(svgInspectionPanel);		//69997
		insDashboardPanel.add(insDashboardGraphPanel);
		insDashboardPanel.add(insDashboardGraphPanel2);
		insDashboardPanel.add(insDashboardGraphPanel3);

		
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
