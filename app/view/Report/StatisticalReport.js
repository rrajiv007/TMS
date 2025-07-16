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
Ext.define('CueTrans.view.Report.StatisticalReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Statistical Reports";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Tactical Reports","linkid":"rep_opreports"},
			{"name":"Operational Reports","linkid":"operation_rpt"},
			{"name":"Vehicle and Driver Reports","linkid":"DV_reports"}

			]
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var ReportsColumn = plf.addColumnSection({});	//69997
		
		var ReportsFormCtrl=							//69997
		[
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"}),
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"customerCode"},this),
                     plf.addHlpText({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"carriercode"},this),
			plf.addCombo({"label":"Priority",id:"strPriority"}),
                     plf.addCombo({"label":"Commodity",id:"strCommodity"}), 
			plf.addCombo({"label":"Region",id:"strRegion"}),
			plf.addCombo({"label":"Location",id:"strLocation"}),

		/*	plf.addText({"label":"Request No From",id:"strRequestNoFrom"}),
			plf.addText({"label":"Request No To",id:"strRequestNoTo"}),
			plf.addText({"label":"Shipment No From",id:"strShipmentNoFrom"}),
			plf.addText({"label":"Shipment No To",id:"strShipmentNoTo"}),*/

                     plf.addHlpText({"label":"Request No From",id:"strRequestNoFrom",hlpLinkID:"requestnofrom",inputFormat:"string",InputLength:"80"},this),
			plf.addHlpText({"label":"Request No To",id:"strRequestNoTo",hlpLinkID:"requestnoto",inputFormat:"string",InputLength:"80"},this),	
                     plf.addHlpText({"label":"Shipment No From",id:"strShipmentNoFrom",hlpLinkID:"shipmentnofrom",inputFormat:"string",InputLength:"80"},this),
			plf.addHlpText({"label":"Shipment No To",id:"strShipmentNoTo",hlpLinkID:"shipmentnoto",inputFormat:"string",InputLength:"80"},this),					
			plf.addHlpText({"label":"Inspection No From",id:"strInspectionNoFrom",hlpLinkID:"inspectionno",inputFormat:"string",InputLength:"80"},this),
			plf.addHlpText({"label":"Inspection No To",id:"strInspectionNoTo",hlpLinkID:"inspectionnoto",inputFormat:"string",InputLength:"80"},this),				
			plf.addHlpText({"label":"Journey Plan No From",id:"strJourneyNoFrom",hlpLinkID:"jpnoFrom",inputFormat:"string",InputLength:"80"},this),			
			plf.addHlpText({"label":"Journey Plan No To",id:"strJourneyNoTo",hlpLinkID:"jpnoTo",inputFormat:"string",InputLength:"80"},this),
                       plf.addHlpText({"label":"Load No From",id:"strLoadNoFrom",hlpLinkID:"LoadFrom",inputFormat:"string",InputLength:"80"},this),			
			plf.addHlpText({"label":"Load No To",id:"strLoadNoTo",hlpLinkID:"LoadTo",inputFormat:"string",InputLength:"80"},this),

			
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({});		//69997
		ReportsFormCtrl=
		[
		  plf.addButton({"label":"Carrier Wise Load Summary","id":"carrier"}),
		  plf.addButton({"label":"Commodity Wise Load Summary","id":"commodity"}),
		  plf.addButton({"label":"Region Wise Load Summary","id":"region"}),
		  plf.addButton({"label":"Daily Tracking Report","id":"dailyTracking"}),
		  plf.addButton({"label":"Carrier Work Distribution Statistics","id":"carrierworkstatisics"}),
		  plf.addButton({"label":"Vehicle Roster Statistics","id":"vehicleroster"}),
		  plf.addButton({"label":"Vehicle Utilization Statistics","id":"vehicleutilisation"}),
		  plf.addButton({"label":"Cargo Haulage Statistics","id":"cargohaulage"})

		
		]	
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		
		mainpage.hlpLinks=
		{
                    "requestnofrom":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.TransRequestItemHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRequestNoFrom","child":"TRANS_REQ_NO"}
							]
				},

                      "requestnoto":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.TransRequestItemHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRequestNoTo","child":"TRANS_REQ_NO"}
							]
				},

                        "shipmentnofrom":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.ShipmentHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strShipmentNoFrom","child":"SHIPMENT_NO"}
							]
				},
                          "shipmentnoto":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.ShipmentHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strShipmentNoTo","child":"SHIPMENT_NO"}
							]
				},
				
		"inspectionnoto":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.InspectionHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strInspectionNoTo","child":"INSPECTION_NO"}
							]
				},
				"inspectionno":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.InspectionHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strInspectionNoFrom","child":"INSPECTION_NO"}
							]
				},
				"jpnoFrom":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.JourneyPlanHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strJourneyNoFrom","child":"JOURNEY_PLAN_NO"}
							]
				},
				"jpnoTo":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.JourneyPlanHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strJourneyNoTo","child":"JOURNEY_PLAN_NO"}
							]
				},
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
			},
 "LoadFrom":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.LoadBuildingHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strLoadNoFrom","child":"LOAD_NO"}
							]
				},
	
				"LoadTo":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.LoadBuildingHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strLoadNoTo","child":"LOAD_NO"}
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
                      {
				"controlid":"carrier",
				"tasktype":"btnclick",
				"input":["dtDateFrom","dtDateTo"],
				"service":"CoreReportService",
				"methodName":"CarrierBasedListReport"
			},
                     {
				"controlid":"commodity",
				"tasktype":"btnclick",
				"input":["dtDateFrom","dtDateTo"],
				"service":"CoreReportService",
				"methodName":"CommodityBasedListReport"
			},
                      {
				"controlid":"region",
				"tasktype":"btnclick",
				"input":["dtDateFrom","dtDateTo"],
				"service":"CoreReportService",
				"methodName":"RegionBasedListReport"
			},
                      {
				"controlid":"dailyTracking",
				"tasktype":"btnclick",
				"input":["dtDateFrom","dtDateTo"],
				"service":"CoreReportService",
				"methodName":"DailyTrackingListReport"
			},
                     {
				"controlid":"carrierworkstatisics",
				"tasktype":"btnclick",
				"input":["strLoadNoFrom","strLoadNoTo","strCustomerCode","strCarrierCode","dtDateFrom","dtDateTo","strJourneyNoFrom","strJourneyNoTo"],
				"service":"CoreReportService",
				"methodName":"CarrierWokListReport"
			},

                        {
				"controlid":"vehicleroster",
				"tasktype":"btnclick",
				"input":["dtDateFrom","dtDateTo","strLoadNoFrom","strLoadNoTo","strCustomerCode","strCarrierCode"],
				"service":"CoreReportService",
				"methodName":"VehicleRosterStatReport"
			},
 {
				"controlid":"vehicleutilisation",
				"tasktype":"btnclick",
				"input":["dtDateFrom","dtDateTo","strLoadNoFrom","strLoadNoTo","strCustomerCode","strCarrierCode","strLocation","strRegion"],
				"service":"CoreReportService",
				"methodName":"VehicleutilStatReport"
			},
			{
				"controlid":"cargohaulage",
				"tasktype":"btnclick",
				"input":["dtDateFrom","dtDateTo","strLoadNoFrom","strLoadNoTo","strCarrierCode","strRegion","strLocation"],
				"service":"CoreReportService",
				"methodName":"CargoHaulageListReport"
			}


			
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
				"DV_reports":
				{
					"dest":"Report.Driver&VehicleReport",
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
