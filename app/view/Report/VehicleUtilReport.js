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
1.0.2      Vidhya           30-05-2016  72785                           veh util rep      		                                   
************************************************************************************************/
Ext.define('CueTrans.view.Report.VehicleUtilReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Vehicle Utilization Report";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		/*
		mainpage.toolbarLinks=
		[
			{"name":"Tactical Reports","linkid":"rep_opreports"},
			{"name":"Operational Reports","linkid":"operation_rpt"},
			{"name":"Vehicle and Driver Reports","linkid":"DV_reports"}

			]
		*/
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var ReportsColumn = plf.addColumnSection({});	//69997
		
		var ReportsFormCtrl=							//69997
		[   
		    plf.addCombo({"label":"Region",id:"strRegion"}),
			plf.addCombo({"label":"Hub",id:"strHub"}),
            plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity"}),
			plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory"}),
			plf.addCombo({"label":"Logistics Group",id:"strLogGroup"}),
			plf.addCombo({"label":"Division",id:"strDivCode"}),
			plf.addCombo({"label":"Utilisation",id:"strUtil"}),
			plf.addText({"label":"Request No",id:"strRequestNoFrom"}),
			plf.addText({"label":"DO No",id:"strInspectionNoTo"}),
			plf.addText({"label":"Shipment No",id:"strShippmentNo"}),
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			plf.addText({"label":"JP No",id:"strJourneyNoFrom"}),
			plf.addText({"label":"Trip No",id:"strTripNo"}),
			plf.addText({"label":"Vehicle No",id:"strVehicleCode"}),
			plf.addCombo({"label":"Carrier",id:"strCarrierCode"}),
			plf.addCombo({"label":"Asset Type",id:"strNightDriving"}),
			plf.addCombo({"label":"Date Type","id":"strVehUtil"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"})
		   
		    /*
			plf.addCombo({"label":"Region",id:"strRegion"}),
		    plf.addText({"label":"Origin",id:"strOrigin"}),
			plf.addText({"label":"Destiantion",id:"strDestiantion"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"}),
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"customerCode"},this),
			plf.addCombo({"label":"Commodity",id:"strCommodity"}), 
			plf.addCombo({"label":"Vehicle category",id:"strVehicleCategory"}),
			plf.addCombo({"label":"Logistics Group",id:"strLogGrp"}),
			plf.addCombo({"label":"Utilization",id:"strUtil"}),
            plf.addCombo({"label":"Location",id:"strLocation"}),
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
			plf.addHlpText({"label":"trip No",id:"strTripno",hlpLinkID:"tripsheet"},this),
			plf.addText({"label":"Vehicle No",id:"strVehno"}),
			plf.addText({"label":"Ref Doc No",id:"strDocNo","anywhereSearch":"true"})
          */
			
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({});		//69997
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Get Details","id":"getvehicleutilisation"}),
		  plf.addButton({"label":"Vehicle Utilization","id":"vehicleutilisation"}),
		  plf.addBlank()
		]	
		
		VehicleUtilgrid=
		[   
		
		    {columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:150},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:150},
			{columnname:"Load Type",dataname:"load_type",datatype:"string",width:150},
			{columnname:"From Region",dataname:"FROM_REGION",datatype:"string",width:150},
			{columnname:"To Region",dataname:"TO_REGION",datatype:"string",width:150},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Origin Location Type",dataname:"ORIGIN_LOCATION",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
			{columnname:"Destination Location Type",dataname:"DESTINATION_LOCATION",datatype:"string",width:200},
			{columnname:"Logistics Group",dataname:"logistics_group",datatype:"string",width:150},
			{columnname:"Division",dataname:"division",datatype:"string",width:150},
			{columnname:"JP No",dataname:"JOURNEY_PLAN_NO",datatype:"string",width:150},
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:150},
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:150},
			{columnname:"Vehicle No",dataname:"VEHICLE_NO",datatype:"string",width:150},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:150},
			{columnname:"Vehicle Capacity",dataname:"VEHICLE_CAPACITY",datatype:"string",width:150},
			{columnname:"Weight (tons)",dataname:"WEIGHT",datatype:"string",width:150},
			{columnname:"Utilisation (%)",dataname:"UTILISATION",datatype:"string",width:150},
			{columnname:"Created Date",dataname:"CREATED_DATE",datatype:"string",width:150},
			{columnname:"Contractual Delivery Date",dataname:"CONTRACTUAL_DELIVERY_DATE",datatype:"string",width:150},
			{columnname:"Delivered Date",dataname:"DELIVERED_DATE",datatype:"string",width:150}
			//{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:150},
			//{columnname:"Vehicle",dataname:"VEHICLE",datatype:"string",width:150},
			//{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:150},
			//{columnname:"Journey Plan No",dataname:"JOURNEY_PLAN_NO",datatype:"string",width:150},
			//{columnname:"Journey Date",dataname:"JOURNEY_DATE",datatype:"string",width:150},
			//{columnname:"Region",dataname:"REGION",datatype:"string",width:150},
			//{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			//{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150}
				
		]
		VehicleUtildetails=
		{
			title:"Vehicle Utilisation Details",
			id:"vehutildetails",
			detail:VehicleUtilgrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		VehicleUtilGridSection = plf.addGrid(VehicleUtildetails,this)
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(VehicleUtilGridSection)
		
		mainpage.hlpLinks=
		{
             /*       "requestnofrom":
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
				},
				"tripsheet":
				{
					"dest":"trip.TripSheet",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"TRIP_SHEET_NO","dest":"strTripSheetNo"}
							]
				}
				*/
				}
		
		mainpage.eventHandlers = 
		[	
         
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitReportVehicleUtilization"
			},
			{
				"controlid":"vehicleutilisation",
				"tasktype":"btnclick",
				"input":[
				      "strRegion","strHub","strOrigin","strDestination","strCommodity","strVehicleCategory",
			           "strLogGroup","strDivCode","strUtil","strRequestNoFrom","strInspectionNoTo","strShippmentNo","strLoadNoFrom",
			           "strJourneyNoFrom","strTripNo","strVehicleCode","strCarrierCode","strNightDriving","strVehUtil","dtDateFrom",
			           "dtDateTo"
			],
				"service":"CoreReportService",
				"methodName":"VehicleutilStatReport"
			},
			{
				"controlid":"getvehicleutilisation",
				"tasktype":"btnclick",
				"input":[ 
				      "strRegion","strHub","strOrigin","strDestination","strCommodity","strVehicleCategory",
			           "strLogGroup","strDivCode","strUtil","strRequestNoFrom","strInspectionNoTo","strShippmentNo","strLoadNoFrom",
			           "strJourneyNoFrom","strTripNo","strVehicleCode","strCarrierCode","strNightDriving","strVehUtil","dtDateFrom",
			           "dtDateTo"
					  ],
				"service":"CoreReportService",
				"methodName":"getVehutilStatReportXL"
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
