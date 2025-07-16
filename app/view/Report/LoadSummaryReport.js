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
1.0.2    Vidhya 		    05/05/2016    72252                           
************************************************************************************************/
Ext.define('CueTrans.view.Report.LoadSummaryReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Load Summary Report";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		/*mainpage.toolbarLinks=
		[
			{"name":"Operational Reports","linkid":"operation_rpt"},
			{"name":"Statistical Reports","linkid":"rep_streports"}
		]*/
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var ReportsColumn = plf.addColumnSection({});	//69997
		
		var ReportsFormCtrl=							//69997
		[	
		
		      plf.addCombo({"label":"Date Type","id":"strLoadType"}),
			  plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			  plf.addDate({"label":"Date To",id:"dtDateTo"}),
			  plf.addCombo({"label":"Load Status","id":"strLocation"}),
			  plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			  plf.addText({"label":"Load Description",id:"strLoadDesc"}),
			  plf.addCombo({"label":"Origin",id:"strRequestNoTo"}),
			  plf.addCombo({"label":"Destination",id:"strShipmentNoTo"}),
              plf.addText({"label":"Scheduled Vehicle",id:"strScheduleVeh"}),	
              plf.addText({"label":"Contract No",id:"strRequestNoFrom"}),	
              plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory"}), 
              plf.addText({"label":"Reported Vehicle",id:"strReportedVeh"}),
              //plf.addText({"label":"Loading Point",id:"strLoadAtt"}),
              //plf.addText({"label":"Unloading Point",id:"strDelAtt"}),
			  plf.addCombo({"label":"Loading Point",id:"strLoadAtt"}),
              plf.addCombo({"label":"Unloading Point",id:"strDelAtt"}),
			  plf.addText({"label":"Ref Doc No",id:"strRef"}),
              plf.addCombo({"label":"Region",id:"strRegion"})			 
		      
		    /*
		    plf.addCombo({"label":"Region",id:"strRegion"}),	
            plf.addCombo({"label":"Origin",id:"strRequestNoTo"}),
			plf.addCombo({"label":"Destination",id:"strShipmentNoTo"}),		
            plf.addCombo({"label":"Customer",id:"strCustomer"}),	
            plf.addCombo({"label":"Commodity",id:"strCommodity"}), 
            plf.addCombo({"label":"Vehicle Category",id:"strVehiclecat"}), 
            plf.addCombo({"label":"Logistics Group","id":"strLoadNoTo"}),
            plf.addCombo({"label":"Division","id":"strDivision"}),			
			plf.addCombo({"label":"Request No",id:"strRequestNoFrom"}),
			plf.addText({"label":"DO No",id:"strInspectionNoTo"}),
			plf.addCombo({"label":"Region",id:"strRegion"}),	
			plf.addText({"label":"Shipment No",id:"strShipmentNoFrom"}),
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			plf.addText({"label":"Journey Plan No",id:"strJourneyNoFrom"}),
			plf.addText({"label":"Trip No",id:"strTripno"}),
			plf.addText({"label":"WBS No",id:"strWBSno"}),
			plf.addText({"label":"Vehicle Code",id:"strVehicleCodeFrom"}),
			plf.addText({"label":"Vehicle No",id:"strVehicleNo"}),
			plf.addText({"label":"Inspection No",id:"strInspectionNoFrom"}),
			plf.addCombo({"label":"Priority",id:"strPriority"}),
			plf.addText({"label":"Carrier ",id:"strCarrierCode"}),
			plf.addCombo({"label":"Asset Type","id":"strAsset"}),
			plf.addText({"label":"Driver Code",id:"strDriverCodeFrom"}),
			plf.addCombo({"label":"Status","id":"strLocation"}),
			plf.addCombo({"label":"Date Type","id":"strJourneyNoTo"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"})
			*/
			/*
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"}),
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"customerCode"},this),
            plf.addHlpText({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"carriercode"},this),
			plf.addCombo({"label":"Priority",id:"strPriority"}),
            plf.addCombo({"label":"Commodity",id:"strCommodity"}), 
			plf.addCombo({"label":"Request Type",id:"strRequestType"}),
			plf.addCombo({"label":"Region",id:"strRegion"}),
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
			*/
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({});	//69997
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Show Details","id":"GetLoadSummaryDetails"}),//Golive	  
		  plf.addButton({"label":"Generate","id":"LoadBuildingReport"}),
		  plf.addBlank()		 
		  /*plf.addButton({"label":"Load","id":"LoadBuildingReport"}),		
		  plf.addButton({"label":"Inspection","id":"ListInspection"}),
		  plf.addButton({"label":"Journey Plan",id:"ListJourneyRpt"}),
		  */		
		]	
		JourneyViolationsgrid=
		[  
             {columnname:"Load Date",dataname:"LOAD_DATE",datatype:"string",width:100},
			 {columnname:"Scheduled Vehicle",dataname:"SCHEDULED_VEHICLE",datatype:"string",width:150},
			 {columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:100},
			 {columnname:"Reported Vehicle",dataname:"REPORTED_VEHICLE",datatype:"string",width:150},
			 {columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:100},
			 {columnname:"Loading Point",dataname:"LOADING_POINT",datatype:"string",width:100},
			 {columnname:"Unloading Point",dataname:"UNLOADING_POINT",datatype:"string",width:100},
			 {columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:100},
			 {columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:100},
			 {columnname:"Load Description",dataname:"LOAD_DESCRIPTION",datatype:"string",width:100},
			 {columnname:"Request No",dataname:"REQUEST_LIST",datatype:"string",width:150},
			 {columnname:"Load Status",dataname:"STATUS",datatype:"string",width:100},
			 {columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:150},
			 {columnname:"Actual Weight",dataname:"ACTUAL_WEIGHT",datatype:"string",width:100},
			 {columnname:"Created Date",dataname:"CREATED_DATE",datatype:"string",width:150},
			 {columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:150},
			 {columnname:"Vehicle Allocated Date",dataname:"VEH_ALLOCATED_DATE_TIME",datatype:"string",width:150},
			 {columnname:"Delivered Date",dataname:"DELIVERED_DATE",datatype:"string",width:150},			 
			 {columnname:"Origin Region",dataname:"REGION_FROM",datatype:"string",width:150},
			 {columnname:"Destination Region",dataname:"REGION_TO",datatype:"string",width:150},
			 {columnname:"Load Status",dataname:"LOAD_STATUS",datatype:"string",width:150}, 
			 {columnname:"Distance",dataname:"DIST",datatype:"string",width:100}
		    /*
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:150},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:150},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
			{columnname:"From Region",dataname:"REGION_FROM",datatype:"string",width:150},
			{columnname:"To Region",dataname:"REGION_TO",datatype:"string",width:150},
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:150},
			{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:150},
			{columnname:"Vehicle",dataname:"VEH_NO",datatype:"string",width:150},
			{columnname:"Vehicle Category",dataname:"VEH_CAT_DESC",datatype:"string",width:150},
		{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:150},
		{columnname:"Distance",dataname:"DIST",datatype:"string",width:150},
			{columnname:"Weight(Tons)",dataname:"ITEM_WT",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:150},
			{columnname:"Created Date",dataname:"",datatype:"string",width:150},
			{columnname:"Delivered Date",dataname:"",datatype:"string",width:150}
			*/
				
		]
		JourneyViolationsdetails=
		{
			title:"Load Summary Details",
			id:"Loadsummarydtl",
			detail:JourneyViolationsgrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		JourneyViolationsSection = plf.addGrid(JourneyViolationsdetails,this)
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(JourneyViolationsSection)//--Golive		
		/*
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
				}
				}
		*/
		mainpage.eventHandlers = 
		[	
         {		 
				"controlid":"vehicleRequest",
				"tasktype":"btnclick",
				"input":[
						"strLoadType","dtDateFrom","dtDateTo","strLocation","strLoadNoFrom","strLoadDesc","strRequestNoTo","strShipmentNoTo","strScheduleVeh","strRequestNoFrom","strVehicleCategory","strReportedVeh","strLoadAtt","strDelAt","strRef","strRegion"		
						],
				"service":"CoreReportService", 
				"methodName":"PrintVehicleRequestReport"
							
			},	
			{		 
				"controlid":"RequestExcel",
				"tasktype":"btnclick",
				"input":[
						"strLoadType","dtDateFrom","dtDateTo","strLocation","strLoadNoFrom","strLoadDesc","strRequestNoTo","strShipmentNoTo","strScheduleVeh","strRequestNoFrom","strVehicleCategory","strReportedVeh","strLoadAtt","strDelAtt","strRef","strRegion"							
						],
				"service":"CoreReportService", 
				"methodName":"PrintVehicleRequestReport",
				"ExcelViewer":"Viewer"
							
			},
			{ 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitLoadSumWayReportScreen"// InitReportScreen
			},
			{		
				"controlid":"shipmentRequest",
				"tasktype":"btnclick",
				"input":[
						"strLoadType","dtDateFrom","dtDateTo","strLocation","strLoadNoFrom","strLoadDesc","strRequestNoTo","strShipmentNoTo","strScheduleVeh","strRequestNoFrom","strVehicleCategory","strReportedVeh","strLoadAtt","strDelAtt","strRef","strRegion"						
						],
				"service":"CoreReportService",
				"methodName":"PrintShipmentReport"
							
			}, 
			{		
				"controlid":"LoadBuildingReport",
				"tasktype":"btnclick",
				"input":[
						"strLoadType","dtDateFrom","dtDateTo","strLocation","strLoadNoFrom","strLoadDesc","strRequestNoTo","strShipmentNoTo","strScheduleVeh","strRequestNoFrom","strVehicleCategory","strReportedVeh","strLoadAtt","strDelAtt","strRef","strRegion"					
						],
				"service":"CoreReportService",
				"methodName":"PrintLoadBuildingReport"
							
			},
			{		 
                 "controlid":"ListInspection",
				"tasktype":"btnclick",
				"input":[
						"strLoadType","dtDateFrom","dtDateTo","strLocation","strLoadNoFrom","strLoadDesc","strRequestNoTo","strShipmentNoTo","strScheduleVeh","strRequestNoFrom","strVehicleCategory","strReportedVeh","strLoadAtt","strDelAtt","strRef","strRegion"				
						],
				"service":"CoreReportService",
				"methodName":"ListInspectionReport"
			            
		},
		{       
				"controlid":"ListJourneyRpt",
				"tasktype":"btnclick", 
				"input":[
						"strLoadType","dtDateFrom","dtDateTo","strLocation","strLoadNoFrom","strLoadDesc","strRequestNoTo","strShipmentNoTo","strScheduleVeh","strRequestNoFrom","strVehicleCategory","strReportedVeh","strLoadAtt","strDelAtt","strRef","strRegion"					
						],
			    "service":"CoreReportService",
				"methodName":"printListJourneyReport"
			},			
			{		
				"controlid":"GetLoadSummaryDetails",
				"tasktype":"btnclick",
				"input":[
						"strLoadType","dtDateFrom","dtDateTo","strLocation","strLoadNoFrom","strLoadDesc","strRequestNoTo","strShipmentNoTo","strScheduleVeh","strRequestNoFrom","strVehicleCategory","strReportedVeh","strLoadAtt","strDelAtt","strRef","strRegion"						
						],
				"service":"CoreReportService",
				"methodName":"PrintLoadSummaryDtl"
							
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
