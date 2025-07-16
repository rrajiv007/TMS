/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :CUTRANS
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Sudhakar D			13/03/2016	  Golive					Grid addition in JS
************************************************************************************************/
Ext.define('CueTrans.view.Report.InspectionSummaryReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Inspection Summary";
		
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
			plf.addCombo({"label":"Region",id:"strRegion"}),
			plf.addCombo({"label":"Hub",id:"strHub"}),
			plf.addCombo({"label":"Inspection Location",id:"strLocation"}),//
			plf.addText({"label":"Inspection No",id:"strInspectionNoFrom"}),
			plf.addText({"label":"Journey Plan No",id:"strJourneyNoFrom"}),
			plf.addText({"label":"Inspector Name",id:"strInspectorName"}),//
			plf.addText({"label":"Driver Name",id:"strDriverCodeFrom"}),
			plf.addText({"label":"Driver Mobile No.",id:"strMobileNo"}),//
			plf.addText({"label":"Vehicle Code",id:"strVehicleCodeFrom"}),
			plf.addText({"label":"Contract No",id:"strContractNo"}),
			plf.addText({"label":"Shipment No",id:"strShipmentNoFrom"}),
			plf.addText({"label":"DO No",id:"strDocNo"}),
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),			
			plf.addText({"label":"Request No",id:"strRequestNoFrom"}),
			plf.addCombo({"label":"Inspection Status",id:"strStatus"}),//
			plf.addCombo({"label":"Carrier Code",id:"strCarrierCode"}),
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"}),
			plf.addCombo({"label":"Year",id:"strYear"}),//added by sudhakar
			plf.addCombo({"label":"Month","id":"strMonth"}),//added by sudhakar
		//	plf.addCombo({"label":"Include","id":"strInclude"}) //added by sudhakar
			
			
			/* commented by sudhakar
			plf.addCombo({"label":"Origin",id:"strRequestNoTo"}),
			plf.addCombo({"label":"Destination",id:"strShipmentNoTo"}),
			plf.addCombo({"label":"Priority",id:"strPriority"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity"}), 			
			plf.addCombo({"label":"Logistics Group","id":"strLoadNoTo"}),
			plf.addCombo({"label":"Status","id":"strLocation"}),
			plf.addCombo({"label":"Date Type","id":"strJourneyNoTo"}),
			
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
		  /*
		  plf.addButton({"label":"Request","id":"vehicleRequest"}),
		  plf.addButton({"label":"Request Excel Based","id":"RequestExcel"}),
		  plf.addButton({"label":"Shipment","id":"shipmentRequest"}),
		  plf.addButton({"label":"Load","id":"LoadBuildingReport"}),		
		  plf.addButton({"label":"Inspection","id":"ListInspection"}),
		  plf.addButton({"label":"Journey Plan",id:"ListJourneyRpt"}),
		  */
		  plf.addBlank(),//Golive	  
		  plf.addButton({"label":"Show Details","id":"GetDetails"}),//Golive	  
		  plf.addButton({"label":"Generate PDF",id:"InspectionSummary"}),
		  plf.addBlank()
		
		]

	// Grid section Begins--Golive

		Inspectiongrid=
		[   
			{columnname:"Inspection No.",dataname:"INSPECTION_NO",datatype:"string",width:150},
			{columnname:"Inspection Type",dataname:"INSPECTION_TYPE",datatype:"string",width:150},
			{columnname:"Inspection Status",dataname:"INSPECTION_STATUS",datatype:"string",width:150},
			{columnname:"Inspector Name",dataname:"INSPECTOR_NAME",datatype:"string",width:150},
			{columnname:"Region",dataname:"REGION",datatype:"string",width:150},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:150},
			{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:150},			
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:150},			
			{columnname:"Vehicle No",dataname:"VEHICLE_NO",datatype:"string",width:150},			
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:150},			
			{columnname:"Journey Manager",dataname:"JOURNEY_MGR",datatype:"string",width:150},			
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:150},
			{columnname:"Driver Mobile No.",dataname:"DRIVER_MOBILE_NO",datatype:"string",width:150},
			{columnname:"Inspection Date",dataname:"INSPECTION_DT",datatype:"string",width:150},
			{columnname:"Completed Date",dataname:"COMPLETED_DT",datatype:"string",width:150}
		]
		Inspectiondetails=
		{
			title:"Inspection Summary",
			id:"Inspectiondtl",
			detail:Inspectiongrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		InspectionGridSection = plf.addGrid(Inspectiondetails,this)

		// Grid section Ends--Golive		
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(InspectionGridSection)//--Golive		
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
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitReportScreenInsp"
			},
			{       
				"controlid":"InspectionSummary",
				"tasktype":"btnclick", 
				"input":[
						"strRegion","strHub","strLocation","strInspectionNoFrom","strJourneyNoFrom","strInspectorName",
						"strDriverCodeFrom","strMobileNo","strVehicleCodeFrom","strContractNo","strShipmentNoFrom","strDocNo",
						"strLoadNoFrom","strRequestNoFrom","strStatus","strCarrierCode","dtDateFrom","dtDateTo","strYear","strMonth","strDateType"					
						],
			    "service":"CoreReportService",
				"methodName":"printInspectSummaryReport"
			}
			//--Golive Begins
			,{       
				"controlid":"GetDetails",
				"tasktype":"btnclick", 
				"input":[
						"strRegion","strHub","strLocation","strInspectionNoFrom","strJourneyNoFrom","strInspectorName",
						"strDriverCodeFrom","strMobileNo","strVehicleCodeFrom","strContractNo","strShipmentNoFrom","strDocNo",
						"strLoadNoFrom","strRequestNoFrom","strStatus","strCarrierCode","dtDateFrom","dtDateTo","strYear","strMonth","strDateType"						
						],
			    "service":"CoreReportService",
				"methodName":"GetInspectSummary"
			}	
			//--Golive ENDS
			
					
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