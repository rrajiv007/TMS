/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.Report.VehicleReleasePendingReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Vehicle Release Pending";
				
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		/*mainpage.toolbarLinks=
		[
			{"name":"Operational Reports","linkid":"operation_rpt"},
			{"name":"Statistical Reports","linkid":"rep_streports"}
		] */
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var ReportsColumn = plf.addColumnSection({});	//69997
		
		var ReportsFormCtrl=							//69997
		[			
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addText({"label":"Journey Plan No",id:"strJourneyNoFrom"}),
			plf.addText({"label":"Journey Manager Name",id:"strJMname"}),
			plf.addText({"label":"Driver Name",id:"strDriverName"}),
			plf.addText({"label":"Driver Mobile No",id:"strMobileNo"}),
			plf.addText({"label":"Scheduled Vehicle No",id:"strVehicleCode"}),
			plf.addBlank(),
			plf.addText({"label":"Contract No",id:"strContNo"}),
			//plf.addText({"label":"Shipment No",id:"strShippmentNo"}),
			plf.addText({"label":"Trip No",id:"strShippmentNo"}),
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			plf.addCombo({"label":"Carrier",id:"strCarrierCode"}),
			//plf.addCombo({"label":"Journey Status","id":"strStatus"}),
			plf.addCombo({"label":"Date Type","id":"strVehicleType"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"})
			
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
		  plf.addButton({"label":"Show Details","id":"getreleasepending"}),
		  plf.addButton({"label":"Generate PDF","id":"releasepending"})
		   
		
		]	
		
		VehicleRelgrid=
		[   
		{columnname:"Journey Plan No",dataname:"JP_NO",datatype:"string",width:150},
		{columnname:"Status",dataname:"STATUS",datatype:"string",width:150},
		{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
		{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
		{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:150},
		{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:150},
		{columnname:"Scheduled Vehicle No",dataname:"VEHICLE",datatype:"string",width:150},
		{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:150},
		{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:150},
		{columnname:"Journey Manager",dataname:"JOURNEY_MANAGER",datatype:"string",width:150},
		{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:150},
		{columnname:"Driver Mobile No",dataname:"DRIVER_MOBILENO",datatype:"string",width:150},
		{columnname:"JP Date",dataname:"JP_DATE",datatype:"string",width:150},
		{columnname:"Departed Date",dataname:"DEPARTED_DATE",datatype:"string",width:150},
		{columnname:"JP Closed Date&Time",dataname:"JP_CLOSED_DATETIME",datatype:"string",width:150}
			
		]
		VehicleReldetails=
		{
			title:"Vehicle Release Pending Details",
			id:"vehReldetails",
			detail:VehicleRelgrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		VehicleRelGridSection = plf.addGrid(VehicleReldetails,this)
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(VehicleRelGridSection)
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
				"controlid":"releasepending",
				"tasktype":"btnclick",
				"input":[
						"strOrigin","strDestination","strJourneyNoFrom","strJMname",
			            "strDriverName","strMobileNo","strVehicleCode","strContNo","strCarrierCode",
			            "strShippmentNo","strLoadNoFrom","strStatus","strVehicleType",
			            "dtDateFrom","dtDateTo"						
						],
				"service":"CoreReportService", 
				"methodName":"PrintReleasePendingReport"
				
							
			},
           { 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitReportVehicleRelease"
			},
			{		 
				"controlid":"getreleasepending",
				"tasktype":"btnclick",
				"input":[
						"strOrigin","strDestination","strJourneyNoFrom","strJMname",
			            "strDriverName","strMobileNo","strVehicleCode","strContNo","strCarrierCode",
			            "strShippmentNo","strLoadNoFrom","strStatus","strVehicleType",
			            "dtDateFrom","dtDateTo"					
						],
				"service":"CoreReportService", 
				"methodName":"getReleasePendingReportXL"
				
							
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
