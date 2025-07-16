/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :CUTRANS
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.Report.JourneyVoilationsReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Journey Violations";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			//{"name":"Operational Reports","linkid":"operation_rpt"},
			//{"name":"Statistical Reports","linkid":"rep_streports"}
		]
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var ReportsColumn = plf.addColumnSection({});	//69997
		
		var ReportsFormCtrl=							//69997
		[	
			plf.addText({"label":"JP No",id:"strJourneyNoFrom"}),
			plf.addText({"label":"Contract No",id:"strContractNo"}),
			plf.addText({"label":"Prime Mover No",id:"strVehicleCodeFrom"}),	
			plf.addText({"label":"Loading Point",id:"strLoadAt"}),
			plf.addText({"label":"Load Description",id:"strLoadNoFrom"}),
			plf.addText({"label":"Unloading Point",id:"strDelAt"}),
			plf.addText({"label":"BlueKey No",id:"strBlueKeyNo"}),
			plf.addText({"label":"Driver Name",id:"strDriverName"}),
			plf.addCombo({"label":"Date Type","id":"strJourType"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"})
			
			
			/*
		    plf.addCombo({"label":"Region",id:"strRegion"}),	
            plf.addCombo({"label":"Origin",id:"strRequestNoTo"}),
			plf.addCombo({"label":"Destination",id:"strShipmentNoTo"}),	
			plf.addCombo({"label":"Violations",id:"strViolation"}),
			plf.addText({"label":"Journey Plan No",id:"strJourneyNoFrom"}),
			plf.addText({"label":"Journey Manager",id:"strDriverCodeFrom"}),	
			plf.addText({"label":"Driver BlueKey No",id:"strBlueKeyNo"}),
			plf.addText({"label":"Driver Name",id:"strDriverName"}),
			plf.addText({"label":"Driver Mobile No",id:"strMobileNo"}),
			plf.addText({"label":"Vehicle No",id:"strVehicleCodeFrom"}),
			plf.addText({"label":"Contract No",id:"strTripNo"}),
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
		    plf.addText({"label":"Violations Applicable",id:"strApplicableTo"}),
			plf.addCombo({"label":"Journey Status","id":"strLocation"}),
            plf.addCombo({"label":"Carrier",id:"strCarrierCode"}),
			plf.addCombo({"label":"Night Driving","id":"strNightDriving"}),
			plf.addCombo({"label":"Date Type","id":"strJourneyNoTo"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"})	
			*/
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({});	//69997
		ReportsFormCtrl=
		[
		  plf.addButton({"label":"Show Details","id":"GetjourneyViolationDetails"}),//Golive	  
		  /*
		  plf.addButton({"label":"Request","id":"vehicleRequest"}),
		  plf.addButton({"label":"Request Excel Based","id":"RequestExcel"}),
		  plf.addButton({"label":"Shipment","id":"shipmentRequest"}),
		  plf.addButton({"label":"Load","id":"LoadBuildingReport"}),		
		  plf.addButton({"label":"Inspection","id":"ListInspection"}),
		  plf.addButton({"label":"Journey Plan",id:"ListJourneyRpt"}),
		  */
		  plf.addButton({"label":"Generate PDF",id:"JourneyViolations"}),
		  plf.addBlank()
		
		]	
        JourneyViolationsgrid=
		[  
			
			{columnname:"Date Truck Requested",dataname:"LOAD_DATE",datatype:"string",width:150},
			{columnname:"Contract No",dataname:"CONTRACT_NUM",datatype:"string",width:150},
			{columnname:"Prime Mover No",dataname:"TRUCK_REG_NO",datatype:"string",width:150},
			{columnname:"Trailer No",dataname:"TRAILER_CODE",datatype:"string",width:150},
			{columnname:"Asset Type",dataname:"TRUCK_TYPE",datatype:"string",width:150},
			{columnname:"Specification Required",dataname:"REMARKS",datatype:"string",width:150},
			{columnname:"Loading Point",dataname:"LOAD_AT",datatype:"string",width:150},	
			{columnname:"Load Description",dataname:"LOAD_DESCRIPTION",datatype:"string",width:150},
			{columnname:"Unloading Point",dataname:"DELIVERY_AT",datatype:"string",width:150},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:150},
			//{"group":"Driver Detail","dtl":[
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",editControl:"textbox",width:100},
			{columnname:"BlueKey No",dataname:"IVMS_BLUEKEYID",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",editControl:"textbox",width:100},
			{columnname:"GSM",dataname:"PHONE_NO",datatype:"string",editControl:"textbox",width:120},
			//]},	
			//{"group":"Journey Plan Detail","dtl":[
			{columnname:"JP No",dataname:"JOURNEY_NO",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Issue Date",dataname:"JOURNEY_DATE",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Departure Date",dataname:"DEPARTURE_DATE",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"D1",dataname:"D1",datatype:"string",width:100},
			{columnname:"D2",dataname:"D2",datatype:"string",width:100},
			{columnname:"D3",dataname:"D3",datatype:"string",width:100},
			{columnname:"D4",dataname:"D4",datatype:"string",width:100},
			{columnname:"D5",dataname:"D5",datatype:"string",width:100},
			
			//]},
			
			//{"group":"Decision Taken","dtl":[
			{columnname:"A1",dataname:"A1",datatype:"string",width:100},
			{columnname:"A2",dataname:"A2",datatype:"string",width:100},
			{columnname:"A3",dataname:"A3",datatype:"string",width:100},
			{columnname:"A4",dataname:"A4",datatype:"string",width:100},
			{columnname:"A5",dataname:"A5",datatype:"string",width:100},
			//]},
			
			//{"group":"ETA","dtl":[
			{columnname:"Planned Date",dataname:"PLANNED_DATE_TIME",datatype:"string",width:100},
			{columnname:"Planned Time",dataname:"PLANNED_TIME",datatype:"string",width:100},
			{columnname:"Actual Date",dataname:"ACTUAL_DATE_TIME",datatype:"string",width:100},
			{columnname:"Actual Time",dataname:"ACTUAL_TIME",datatype:"string",width:100},
			//]},
			//{"group":"Violations","dtl":[
			{columnname:"V1",dataname:"V1",datatype:"string",width:100},
			{columnname:"V2",dataname:"V2",datatype:"string",width:100},
			{columnname:"V3",dataname:"V3",datatype:"string",width:100},
			{columnname:"V4",dataname:"V4",datatype:"string",width:100},
			{columnname:"V5",dataname:"V5",datatype:"string",width:100},
			{columnname:"V6",dataname:"V6",datatype:"string",width:100},
			{columnname:"V7",dataname:"V7",datatype:"string",width:100},
			{columnname:"V8",dataname:"V8",datatype:"string",width:100},
			{columnname:"V9",dataname:"V9",datatype:"string",width:100},
			//]},
			{columnname:"Journey Status",dataname:"JOURNEY_STATUS",datatype:"string",width:150},
			{columnname:" Journey Closed By",dataname:"JOURNEY_CLOSEDBY",datatype:"string",width:150},
			{columnname:"Journey Closed Date & Time",dataname:"JOURNEY_CLOSED_DT",datatype:"string",width:180},
			{columnname:"Vehicle Released By",dataname:"VEHICLE_RELEASEDBY",datatype:"string",width:150},
			{columnname:"Vehicle Released Date & Time",dataname:"VEHICLE_RELEASED_DT",datatype:"string",width:180}
			
			
			/*
			{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:150},
			{columnname:"Region",dataname:"REGION",datatype:"string",width:150},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:150},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:150},
			{columnname:"Vehicle No",dataname:"VEH_NO",datatype:"string",width:150},
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:150},
			{columnname:"Journey Manager",dataname:"JOURNEY_MANAGER",datatype:"string",width:150},
			{columnname:"Blue key No",dataname:"BLUE_KEY_NO",datatype:"string",width:150},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:150},
			{columnname:"Driver Mobile No",dataname:"DRIVER_MOBILENO",datatype:"string",width:150},
			{columnname:"All Violations(Defined)",dataname:"req_cnt",datatype:"string",width:150}	
				*/
		]
		JourneyViolationsdetails=
		{
			title:"Journey Violation Details",
			id:"journeyviolationdtl",
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
				"strRegion","strRequestNoTo","strShipmentNoTo","strViolation","strJourneyNoFrom","strDriverCodeFrom","strBlueKeyNo","strDriverName","strMobileNo","strVehicleCodeFrom",
			"strTripNo","strLoadNoFrom","strApplicableTo","strLocation","strCarrierCode","strNightDriving","strJourneyNoTo","dtDateFrom","dtDateTo"
				/*
						"strLoadNoFrom","strJourneyNoFrom","strRegion","strRequestNoTo","strShipmentNoTo","strCarrierCode",
						"strVehicleCodeFrom","dtDateFrom","dtDateTo","strJourneyNoTo","strLocation","strViolation","strManagerName","strDriverBluekeyNo","strDriverName","strDriverNo","strContractNo","strApllicableTo",
						"strNightDriving"
						*/
						],
				"service":"CoreReportService", 
				"methodName":"PrintVehicleRequestReport"
							
			},	
			{		 
				"controlid":"RequestExcel",
				"tasktype":"btnclick",
				"input":[
				"strRegion","strRequestNoTo","strShipmentNoTo","strViolation","strJourneyNoFrom","strDriverCodeFrom","strBlueKeyNo","strDriverName","strMobileNo","strVehicleCodeFrom",
			"strTripNo","strLoadNoFrom","strApplicableTo","strLocation","strCarrierCode","strNightDriving","strJourneyNoTo","dtDateFrom","dtDateTo"
				/*
						"strLoadNoFrom","strJourneyNoFrom","strRegion","strRequestNoTo","strShipmentNoTo","strCarrierCode",
						"strVehicleCodeFrom","dtDateFrom","dtDateTo","strJourneyNoTo","strLocation","strViolation","strManagerName","strDriverBluekeyNo","strDriverName","strDriverNo","strContractNo","strApllicableTo",
						"strNightDriving"	
*/						
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
				"methodName":"InitvioReportScreen"//InitvioReportScreen InitReportScreen
			},
			{		
				"controlid":"shipmentRequest",
				"tasktype":"btnclick",
				"input":[
				"strRegion","strRequestNoTo","strShipmentNoTo","strViolation","strJourneyNoFrom","strDriverCodeFrom","strBlueKeyNo","strDriverName","strMobileNo","strVehicleCodeFrom",
			"strTripNo","strLoadNoFrom","strApplicableTo","strLocation","strCarrierCode","strNightDriving","strJourneyNoTo","dtDateFrom","dtDateTo"
				/*
						"strLoadNoFrom","strJourneyNoFrom","strRegion","strRequestNoTo","strShipmentNoTo","strCarrierCode",
						"strVehicleCodeFrom","dtDateFrom","dtDateTo","strJourneyNoTo","strLocation","strViolation","strManagerName","strDriverBluekeyNo","strDriverName","strDriverNo","strContractNo","strApllicableTo",
						"strNightDriving"	
*/						
						],
				"service":"CoreReportService",
				"methodName":"PrintShipmentReport"
							
			}, 
			{		
				"controlid":"LoadBuildingReport",
				"tasktype":"btnclick",
				"input":[
				"strRegion","strRequestNoTo","strShipmentNoTo","strViolation","strJourneyNoFrom","strDriverCodeFrom","strBlueKeyNo","strDriverName","strMobileNo","strVehicleCodeFrom",
			"strTripNo","strLoadNoFrom","strApplicableTo","strLocation","strCarrierCode","strNightDriving","strJourneyNoTo","dtDateFrom","dtDateTo"
				/*
						"strLoadNoFrom","strJourneyNoFrom","strRegion","strRequestNoTo","strShipmentNoTo","strCarrierCode",
						"strVehicleCodeFrom","dtDateFrom","dtDateTo","strJourneyNoTo","strLocation","strViolation","strManagerName","strDriverBluekeyNo","strDriverName","strDriverNo","strContractNo","strApllicableTo",
						"strNightDriving"	
*/						
						],
				"service":"CoreReportService",
				"methodName":"PrintLoadBuildingReport"
							
			},
			{		 
                 "controlid":"ListInspection",
				"tasktype":"btnclick",
				"input":[
				"strRegion","strRequestNoTo","strShipmentNoTo","strViolation","strJourneyNoFrom","strDriverCodeFrom","strBlueKeyNo","strDriverName","strMobileNo","strVehicleCodeFrom",
			"strTripNo","strLoadNoFrom","strApplicableTo","strLocation","strCarrierCode","strNightDriving","strJourneyNoTo","dtDateFrom","dtDateTo"
				/*
						"strLoadNoFrom","strJourneyNoFrom","strRegion","strRequestNoTo","strShipmentNoTo","strCarrierCode",
						"strVehicleCodeFrom","dtDateFrom","dtDateTo","strJourneyNoTo","strLocation","strViolation","strManagerName","strDriverBluekeyNo","strDriverName","strDriverNo","strContractNo","strApllicableTo",
						"strNightDriving"
*/						
						],
				"service":"CoreReportService",
				"methodName":"ListInspectionReport"
			            
		},
		{       
				"controlid":"ListJourneyRpt",
				"tasktype":"btnclick", 
				"input":[
				"strRegion","strRequestNoTo","strShipmentNoTo","strViolation","strJourneyNoFrom","strDriverCodeFrom","strBlueKeyNo","strDriverName","strMobileNo","strVehicleCodeFrom",
			"strTripNo","strLoadNoFrom","strApplicableTo","strLocation","strCarrierCode","strNightDriving","strJourneyNoTo","dtDateFrom","dtDateTo"
				/*
						"strLoadNoFrom","strJourneyNoFrom","strRegion","strRequestNoTo","strShipmentNoTo","strCarrierCode",
						"strVehicleCodeFrom","dtDateFrom","dtDateTo","strJourneyNoTo","strLocation","strViolation","strManagerName","strDriverBluekeyNo","strDriverName","strDriverNo","strContractNo","strApllicableTo",
						"strNightDriving"
						*/
						],
			    "service":"CoreReportService",
				"methodName":"printListJourneyReport"
			},
			{       
				"controlid":"JourneyViolations",
				"tasktype":"btnclick", 
				"input":[
				"strJourneyNoFrom","strContractNo","strVehicleCodeFrom","strLoadAt","strLoadNoFrom","strDelAt","strBlueKeyNo",
				"strDriverName","strMobileNo","strJourType","dtDateFrom","dtDateTo"
				/*
						"strLoadNoFrom","strJourneyNoFrom","strRegion","strRequestNoTo","strShipmentNoTo","strCarrierCode",
						"strVehicleCodeFrom","dtDateFrom","dtDateTo","strJourneyNoTo","strLocation","strViolation","strManagerName","strDriverBluekeyNo","strDriverName","strDriverNo","strContractNo","strApllicableTo",
						"strNightDriving"	*/				
						],
			    "service":"CoreReportService",
				"methodName":"printJourneyViolationReport"   //RPT_PRINTJOURNEYVIOLATIONRPT
			},
{       
				"controlid":"GetjourneyViolationDetails",
				"tasktype":"btnclick", 
				"input":[
				"strJourneyNoFrom","strContractNo","strVehicleCodeFrom","strLoadAt","strLoadNoFrom","strDelAt","strBlueKeyNo",
				"strDriverName","strMobileNo","strJourType","dtDateFrom","dtDateTo"
				/*
				        "strLoadNoFrom","strJourneyNoFrom","strRegion","strRequestNoTo","strShipmentNoTo","strCarrierCode",
						"strVehicleCodeFrom","dtDateFrom","dtDateTo","strJourneyNoTo","strLocation","strViolation","strManagerName","strDriverBluekeyNo","strDriverName","strDriverNo","strContractNo","strApllicableTo",
						"strNightDriving"	*/			
						],
			    "service":"CoreReportService",
				"methodName":"printJourneyViolationDetail"  
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
