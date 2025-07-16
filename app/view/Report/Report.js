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
Ext.define('CueTrans.view.Report.Report', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Operational Reports";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Tactical Reports","linkid":"rep_opreports"},
			{"name":"Statistical Reports","linkid":"rep_streports"}
		]

		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var ReportsColumn = plf.addColumnSection({});	//69997
		
		var ReportsFormCtrl=							//69997
		[
                     plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"}),
                     plf.addHlpText({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"carriercode"},this),
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"customerCode"},this),
			plf.addCombo({"label":"Priority",id:"strPriority"}),
                     plf.addCombo({"label":"Commodity",id:"strCommodity"}), 
                   //  plf.addText({"label":"WayBill No From",id:"strLoadNoFrom"}),
			//plf.addText({"label":"WayBill No To",id:"strLoadNoTo"}),
                     plf.addBlank(),
                     plf.addBlank(),
                     plf.addHlpText({"label":"WayBill No",id:"strLoadNo",hlpLinkID:"LoadNo"},this),
                     plf.addHlpText({"label":"Inspection No",id:"strInspectionNo",hlpLinkID:"inspectionno"},this),
                     plf.addHlpText({"label":"JourneyPlan No No",id:"strJourneyPlanNo",hlpLinkID:"journeyno"},this),


                   //  plf.addText({"label":"Inspection No From",id:"strInspectionNoFrom"}),
                    // plf.addText({"label":"Inspection No To",id:"strInspectionNoTo"}),                     
			//plf.addText({"label":"Journey plan No From",id:"strJourneyPlanNoFrom"}),
			//plf.addText({"label":"Journey Plan To",id:"strJourneyPlanNoTo"})
			
				
			
			
			]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({}); //69997
		ReportsFormCtrl=
		[
		  //plf.addButton({"label":"Cargo Haulage Performance","id":"cargohaulage"}),
		  //plf.addButton({"label":"OTO Work Distribution","id":"otowork"}),
		  //plf.addButton({"label":"Asset Utilization","id":"assettilization"}),
		  plf.addButton({"label":"Cost Object","id":"costobject"}),
		  
		  plf.addButton({"label":"Way Bill","id":"waybill"}),
		  plf.addButton({"label":"Way Bill Summary","id":"waybillSummary"}),
		  plf.addButton({"label":"Inspection","id":"PrintINS"}),
                plf.addButton({"label":"Journey Plan","id":"PrintJP"}),
				

		  //plf.addButton({"label":"Roster Statistics","id":"roster"}),
		  //plf.addButton({"label":"Vehicle Inspection","id":"vehicleinspection"}),
		  //plf.addButton({"label":"Journey Violation","id":"journeyviolation"}),
		  plf.addBlank(),
		  plf.addBlank(),		  
		  plf.addBlank()
		
		]	
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		
		mainpage.hlpLinks=
		{
		 "carriercode":
			{
				"hlpType":"Header",
				"hlpScreen":"jm_master.CarrierHelp",
				"send":[
						{"parent":"","child":""}
					   ],
				"receive":[
						{"parent":"strCarrierCode","child":"OWNER_CODE_3PL"}
						]
			},
		  "customerCode":
			{
				"hlpType":"Header",
				"hlpScreen":"jm_master.CustomerHelp",
				"send":[
						{"parent":"","child":""}
					   ],
				"receive":[
						{"parent":"strCustomerCode","child":"CUST_CODE"}
						]
			}	,
                   "inspectionno":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.InspectionHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strInspectionNo","child":"INSPECTION_NO"}
							]
				},
                     "journeyno":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.JourneyPlanHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strJourneyPlanNo","child":"JOURNEY_PLAN_NO"}
							]
				},
	
				"LoadNo":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.LoadBuildingHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strLoadNo","child":"LOAD_NO"}
							]
				}
								
		}
		
		mainpage.eventHandlers = 
		[			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitReportScreen"
			},
			/*{		
				"controlid":"cargohaulage",
				"tasktype":"btnclick",
				"input":["strRequestNoFrom","strRequestNoTo","strShipmentNoFrom","strShipmentNoTo","strLoadNoFrom","strLoadNoTo","dtDateFrom","dtDateTo","strLocationCode","strRegion","strPriority","strCarrierCode","strCustomerCode","strJourneyNoFrom","strJourneyNoTo"],
				"service":"CoreReportService",
				"methodName":"PrintcargohaulageReport"
							
			},
			{		
				"controlid":"otowork",
				"tasktype":"btnclick",
				"input":["strRequestNoFrom","strRequestNoTo","strShipmentNoFrom","strShipmentNoTo","strLoadNoFrom","strLoadNoTo","dtDateFrom","dtDateTo","strLocationCode","strRegion","strPriority","strCarrierCode","strCustomerCode","strJourneyNoFrom","strJourneyNoTo"],
				"service":"CoreReportService",
				"methodName":"PrintotoworkReport"
							
			},
			{		
				"controlid":"assettilization",
				"tasktype":"btnclick",
				"input":[],
				"service":"CoreReportService",
				"methodName":"PrintassettilizationReport"
							
			},*/
			{		
				"controlid":"costobject",
				"tasktype":"btnclick",
				"input":["strRequestNoFrom","strRequestNoTo","strShipmentNoFrom","strShipmentNoTo","strLoadNoFrom","strLoadNoTo","dtDateFrom","dtDateTo","strLocationCode","strRegion","strPriority","strCarrierCode","strCustomerCode"],
				"service":"CoreReportService",
				"methodName":"PrintcostobjectReport"
							
			},
			{		
				"controlid":"waybill", 
				"tasktype":"btnclick",
                 "input":["strLoadNo","dtDateFrom","dtDateTo","strCarrierCode","strCustomerCode","strCommodity","strInspectionNo","strJourneyPlanNo","strPriority"],
				"service":"CoreReportService",
				"methodName":"PrintwaybillReport"

                           /* "input":["strLoadNo"],
				 "service":"CoreReportService",
				 "methodName":"unloadPrintwaybillReport"*/

				/*"input":["strLoadNo","strLoadNoFrom","strLoadNoTo"],
				"service":"CoreReportService",
				"methodName":"PrintwaybillReport"*/
						
			},
			{		
				"controlid":"waybillSummary", 
				"tasktype":"btnclick",
                 "input":["strLoadNo","dtDateFrom","dtDateTo","strCarrierCode","strCustomerCode","strCommodity","strInspectionNo","strJourneyPlanNo","strPriority"],
				"service":"CoreReportService",
				"methodName":"PrintwaybillSummaryReport"

                           /* "input":["strLoadNo"],
				 "service":"CoreReportService",
				 "methodName":"unloadPrintwaybillReport"*/

				/*"input":["strLoadNo","strLoadNoFrom","strLoadNoTo"],
				"service":"CoreReportService",
				"methodName":"PrintwaybillReport"*/
						
			},
{
				"controlid":"PrintINS",
				"tasktype":"btnclick",
				"input":["strLoadNo","dtDateFrom","dtDateTo","strCarrierCode","strCustomerCode","strCommodity","strInspectionNo","strJourneyPlanNo","strPriority"],
				"service":"CoreReportService", 
				"methodName":"PrintVehicleInspectionReport"

			},
			{
				"controlid":"PrintJP",
				"tasktype":"btnclick",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"PrintJourneyPlanReport"

			},




                 
/*{		
				"controlid":"roster",
				"tasktype":"btnclick",
				"input":[],
				"service":"CoreReportService",
				"methodName":"PrintrosterReport"		
			},*/
/*{		
				"controlid":"vehicleinspection",
				"tasktype":"btnclick",
				"input":["strRequestNoFrom","strRequestNoTo","strShipmentNoFrom","strShipmentNoTo","strLoadNoFrom","strLoadNoTo","dtDateFrom","dtDateTo","strLocationCode","strRegion","strPriority","strCarrierCode","strCustomerCode",
				"strJourneyNoFrom",
				"strJourneyNoTo"],
				"service":"CoreReportService",
				"methodName":"PrintvehcileInspectionReport"							
			},
{		
				"controlid":"journeyviolation",
				"tasktype":"btnclick",
				"input":["strRequestNoFrom","strRequestNoTo","strShipmentNoFrom","strShipmentNoTo","strLoadNoFrom","strLoadNoTo","dtDateFrom","dtDateTo","strLocationCode","strRegion","strPriority","strCarrierCode","strCustomerCode","strJourneyNoFrom",
				"strJourneyNoTo"],
				"service":"CoreReportService",
				"methodName":"PrintJourneyViolationReport"							
			}				*/
		];
		mainpage.screenLinks=	
		{	
				"rep_opreports":
				{
					"dest":"Report.TMSReport",
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
