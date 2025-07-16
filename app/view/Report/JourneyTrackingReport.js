/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.Report.JourneyTrackingReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Journey Tracking Report";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		/*
		mainpage.toolbarLinks=
		[
			{"name":"Operational Reports","linkid":"operation_rpt"},
			{"name":"Statistical Reports","linkid":"rep_streports"}
		]
		*/
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var ReportsColumn = plf.addColumnSection({});	//69997
		
		var ReportsFormCtrl=							//69997
		[			
			plf.addText({"label":"Request No",id:"strRequestNoFrom"}),
			plf.addText({"label":"Shipment No",id:"strShipmentNoFrom"}),
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			plf.addText({"label":"Journey Plan No",id:"strJourneyNoFrom"}),
			plf.addText({"label":"Inspection No",id:"strInspectionNoFrom"}),
			plf.addCombo({"label":"Region",id:"strRegion"}),
			plf.addCombo({"label":"Origin",id:"strRequestNoTo"}),
			plf.addCombo({"label":"Destination",id:"strShipmentNoTo"}),
			plf.addCombo({"label":"Priority",id:"strPriority"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity"}), 
			plf.addText({"label":"Carrier Code",id:"strCarrierCode"}),
			plf.addText({"label":"Driver Code",id:"strDriverCodeFrom"}),
			plf.addText({"label":"Vehicle Code",id:"strVehicleCodeFrom"}),
			plf.addText({"label":"DO No",id:"strInspectionNoTo"}),			
			plf.addCombo({"label":"Logistics Group","id":"strLoadNoTo"}),
			plf.addCombo({"label":"Status","id":"strLocation"}),
			plf.addCombo({"label":"Date Type","id":"strJourneyNoTo"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"})
			
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({});	//69997
		ReportsFormCtrl=
		[
		  plf.addButton({"label":"Show Details","id":"GetjourneytrackreportDetails"})/*,//Golive	  
		  plf.addButton({"label":"Generate PDF",id:"JourTracking"}),*/
		  //plf.addBlank()
		
		]	
		
		JourneyTrackinggrid=
		[   
			{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:150},
			//{columnname:"Last InTransit Point",dataname:"",datatype:"string",width:150},
			//{columnname:"Last IVMS update",dataname:"",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:150},
			{columnname:"Region",dataname:"REGION",datatype:"string",width:150},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:150},
			{columnname:"Vehicle No",dataname:"VEH_CODE",datatype:"string",width:150},
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:150},
			{columnname:"Journey Manager",dataname:"JOURNEY_MANAGER",datatype:"string",width:150},
			//{columnname:"Current Tracker",dataname:"TRACKER_NAME",datatype:"string",width:150},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:150},
			{columnname:"Driver Mobile No",dataname:"DRIVER_MOBILENO",datatype:"string",width:150},
			//{columnname:"Night Driving",dataname:"NIGHT_DRIVING",datatype:"string",width:150},
			{columnname:"JP Date",dataname:"JP_DATE",datatype:"string",width:150},
			{columnname:"Departure Date",dataname:"DEPARTED_DATE",datatype:"string",width:150},
			{columnname:"Journey Completion Date",dataname:"COMPLETED_DATE",datatype:"string",width:150}
				
		]
		JourneyTrackingdetails=
		{
			title:"Journey Tracking Details",
			id:"journeytrackingdtl",
			detail:JourneyTrackinggrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		JourneyTrackingSection = plf.addGrid(JourneyTrackingdetails,this)
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(JourneyTrackingSection)//--Golive		
		
		mainpage.eventHandlers = 
		[	
         { 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitReportScreen"
			},
		{       
				"controlid":"JourTracking",
				"tasktype":"btnclick", 
				"input":[
						"strRequestNoFrom","strShipmentNoFrom","strLoadNoFrom","strJourneyNoFrom","strInspectionNoFrom","strRegion",
						"strRequestNoTo","strShipmentNoTo","strPriority","strCommodity","strCarrierCode","strDriverCodeFrom",
						"strVehicleCodeFrom","strInspectionNoTo","dtDateFrom","dtDateTo","strLoadNoTo","strJourneyNoTo","strLocation"						
						],
			    "service":"CoreReportService",
				"methodName":"printjourneytrackingReport"
			},
{       
				"controlid":"GetjourneytrackreportDetails",
				"tasktype":"btnclick", 
				"input":[
						"strRequestNoFrom","strShipmentNoFrom","strLoadNoFrom","strJourneyNoFrom","strInspectionNoFrom","strRegion",
						"strRequestNoTo","strShipmentNoTo","strPriority","strCommodity","strCarrierCode","strDriverCodeFrom",
						"strVehicleCodeFrom","strInspectionNoTo","dtDateFrom","dtDateTo","strLoadNoTo","strJourneyNoTo","strLocation"						
						],
			    "service":"CoreReportService",
				"methodName":"printjourneytrackingDetails"
			}			
		];
mainpage.screenLinks=	
		{	
				"operation_rpt":
				{
					"dest":"Report.Report",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
	"rep_streports":
				{
					"dest":"Report.StatisticalReport",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		} 
		
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
