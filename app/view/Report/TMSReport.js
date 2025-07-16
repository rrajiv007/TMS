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
Ext.define('CueTrans.view.Report.TMSReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Request Summary Report";
		
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
			plf.addCombo({"label":"Region",id:"strRegion"}),
			plf.addCombo({"label":"Hub",id:"strHub"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			//plf.addCombo({"label":"Customer",id:"strCustomerName"}),
			
			plf.addCombo({"label":"Commodity",id:"strCommodity"}), 
			plf.addCombo({"label":"Logistics Group","id":"strLogGroup"}),
			plf.addCombo({"label":"Division","id":"strDivCode"}),
			plf.addText({"label":"Request No",id:"strRequestNoFrom"}),
			plf.addCombo({"label":"Created Type","id":"strJourneyNoFrom"}),
			plf.addText({"label":"DO No",id:"strDocNo"}),
			plf.addText({"label":"Shipment No",id:"strShipmentNoFrom"}),
			plf.addText({"label":"Request ID",id:"strRequestorId"}),
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			//plf.addText({"label":"Journey Plan No",id:"strJourneyNoFrom"}),
			plf.addText({"label":"WBS NO",id:"strWBSNo"}),
			//plf.addText({"label":"Vehicle Code",id:"strVehicleCodeFrom"}),
			plf.addText({"label":"Item No",id:"strItemCode"}),
			plf.addCombo({"label":"Priority",id:"strPriority"}),
			plf.addCombo({"label":"Request Status","id":"strStatus"}),
			//plf.addCombo({"label":"Carrier Code",id:"strCarrierCode"}),
			plf.addCombo({"label":"Item Level",id:"strItemLevel"}),
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"}),
			plf.addCombo({"label":"Year",id:"strYear"}),
			plf.addCombo({"label":"Month",id:"strMonth"}),
		//	plf.addCombo({"label":"Include","id":"strInclude",hidden:"true"}) //added by sudhakar			

/*		
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
		  plf.addButton({"label":"Show Details","id":"getRequest"}),
		  plf.addButton({"label":"Generate PDF","id":"vehicleRequest"}),
		  plf.addBlank(),
		  /*
		  plf.addButton({"label":"Request Excel Based","id":"RequestExcel"}),
		  plf.addButton({"label":"Shipment","id":"shipmentRequest"}),
		  plf.addButton({"label":"Load","id":"LoadBuildingReport"}),		
		  plf.addButton({"label":"Inspection","id":"ListInspection"}),
		  plf.addButton({"label":"Journey Plan",id:"ListJourneyRpt"}),
		 */
		
		]
        ReqSummarygrid=
		[  
		{columnname:"RequestNo",dataname:"TRANS_REQ_NO",datatype:"string",width:150},
		{columnname:"DO No",dataname:"REF_DOC_NO",datatype:"string",width:150},
		{columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",width:150},
		{columnname:"Requester ID",dataname:"REQ_ID",datatype:"string",width:150},
		{columnname:"Requester Name",dataname:"REQ_NAME",datatype:"string",width:150},
		
		{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:150},
		{columnname:"Rig No",dataname:"RIG_NO",datatype:"string",width:150},
		{columnname:"Rig ID",dataname:"RIG_ID",datatype:"string",width:150},
		
		{columnname:"Shipment Priority",dataname:"PRIORITY",datatype:"string",width:150},
		
		{columnname:"Item No",dataname:"ITM_CODE",datatype:"string",width:150},
		{columnname:"Item Description",dataname:"ITM_DESC",datatype:"string",width:150},
		{columnname:"Item Quantity",dataname:"ITM_QTY",datatype:"string",width:150},
		{columnname:"Load NO",dataname:"LOAD_NO",datatype:"string",width:150},
		{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:150},
		
		{columnname:"Customer Name",dataname:"CUSTOMER_NAME",datatype:"string",width:150},
		{columnname:"WBS No",dataname:"WBS_NO",datatype:"string",width:150},
		{columnname:"From Region",dataname:"ORG_REG_DESC",datatype:"string",width:150},
		{columnname:"To Region",dataname:"DEST_REG_DESC",datatype:"string",width:150},
		{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
		
		{columnname:"Origin Location Type",dataname:"ORG_TYPE_DESC",datatype:"string",width:150},
		{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
		{columnname:"Destination Location Type",dataname:"DEST_TYPE_DESC",datatype:"string",width:150},
		{columnname:"Logistics Group",dataname:"LOG_GRP_DESC",datatype:"string",width:150},
		{columnname:"Division",dataname:"DIV_DESC",datatype:"string",width:150},
		
		{columnname:"Status",dataname:"STATUS",datatype:"string",width:150},				
	
		
		{columnname:"Weight",dataname:"ITEM_WT",datatype:"string",width:150},
		{columnname:"Created Date",dataname:"CR_DATE",datatype:"string",width:150},
		{columnname:"Delivery Date",dataname:"DELY_DATE",datatype:"string",width:150},
		{columnname:"Delivered Date",dataname:"DELV_DATE",datatype:"string",width:150},
		{columnname:"Created Type",dataname:"CREATED_TYPE",datatype:"string",width:150}
		/*
		{columnname:"RequestNo",dataname:"TRANS_REQ_NO",datatype:"string",width:150},
		{columnname:"Customer Name",dataname:"CUSTOMER_NAME",datatype:"string",width:150},
		{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
		{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
		{columnname:"DO No",dataname:"REF_DOC_NO",datatype:"string",width:150},
		{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:150},
		{columnname:"Priority",dataname:"PRIORITY",datatype:"string",width:150},
		{columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",width:150},
		{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:150},
		{columnname:"Item Code",dataname:"ITM_CODE",datatype:"string",width:150},
		{columnname:"Qnty",dataname:"ITM_QTY",datatype:"string",width:150},
		{columnname:"Weight",dataname:"ITEM_WT",datatype:"string",width:150},
		{columnname:"Logistics Group",dataname:"LOG_GRP_DESC",datatype:"string",width:150},
		{columnname:"Division",dataname:"DIV_DESC",datatype:"string",width:150},
		{columnname:"Status",dataname:"STATUS",datatype:"string",width:150},
		{columnname:"Created Date",dataname:"CR_DATE",datatype:"string",width:150},
		{columnname:"Delivery Date",dataname:"DELY_DATE",datatype:"string",width:150},
		{columnname:"Delivered Date",dataname:"DELV_DATE",datatype:"string",width:150}
		*/	
		]
		ReqSummarydetails=
		{
			title:"Request Summary Details",
			id:"reqsummdetails",
			detail:ReqSummarygrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		ReqSummarySection = plf.addGrid(ReqSummarydetails,this)		
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(ReqSummarySection)
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
				"strRequestNoFrom","strShipmentNoFrom","strLoadNoFrom","strJourneyNoFrom","strLogGroup","strRegion",
						"strOrigin","strDestination","strPriority","strCommodity","strCarrierCode","strDriverCodeFrom",
						"strVehicleCodeFrom","strInspectionNoTo","dtDateFrom","dtDateTo","strLoadNoTo","strJourneyNoTo",
						"strStatus","strCustomerName","strDocNo","strRequestorId","strWBSNo","strItemCode","strDateType","strDivCode","strItemLevel","strInclude","strHub",
						"strYear","strMonth"		
				/*
						"strRequestNoFrom","strShipmentNoFrom","strLoadNoFrom","strJourneyNoFrom","strInspectionNoFrom","strRegion",
						"strRequestNoTo","strShipmentNoTo","strPriority","strCommodity","strCarrierCode","strDriverCodeFrom",
						"strVehicleCodeFrom","strInspectionNoTo","dtDateFrom","dtDateTo","strLoadNoTo","strJourneyNoTo","strLocation"	
*/						
						],
				"service":"CoreReportService", 
				"methodName":"PrintVehicleRequestReport"
							
			},	
			{		 
				"controlid":"RequestExcel",
				"tasktype":"btnclick",
				"input":[
						"strRequestNoFrom","strShipmentNoFrom","strLoadNoFrom","strJourneyNoFrom","strLogGroup","strRegion",
						"strOrigin","strDestination","strPriority","strCommodity","strCarrierCode","strDriverCodeFrom",
						"strVehicleCodeFrom","strInspectionNoTo","dtDateFrom","dtDateTo","strLoadNoTo","strJourneyNoTo",
						"strStatus","strCustomerName","strDocNo","strRequestorId","strWBSNo","strItemCode","strDateType","strDivCode","strItemLevel","strCreateType"					
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
				"methodName":"InitReportRequest"
			},
			{		
				"controlid":"shipmentRequest",
				"tasktype":"btnclick",
				"input":[
						"strRequestNoFrom","strShipmentNoFrom","strLoadNoFrom","strJourneyNoFrom","strLogGroup","strRegion",
						"strOrigin","strDestination","strPriority","strCommodity","strCarrierCode","strDriverCodeFrom",
						"strVehicleCodeFrom","strInspectionNoTo","dtDateFrom","dtDateTo","strLoadNoTo","strJourneyNoTo",
						"strStatus","strCustomerName","strDocNo","strRequestorId","strWBSNo","strItemCode","strDateType","strDivCode","strItemLevel","strCreateType"
						],
				"service":"CoreReportService",
				"methodName":"PrintShipmentReport"
							
			}, 
			{		
				"controlid":"LoadBuildingReport",
				"tasktype":"btnclick",
				"input":[
						"strRequestNoFrom","strShipmentNoFrom","strLoadNoFrom","strJourneyNoFrom","strLogGroup","strRegion",
						"strOrigin","strDestination","strPriority","strCommodity","strCarrierCode","strDriverCodeFrom",
						"strVehicleCodeFrom","strInspectionNoTo","dtDateFrom","dtDateTo","strLoadNoTo","strJourneyNoTo",
						"strStatus","strCustomerName","strDocNo","strRequestorId","strWBSNo","strItemCode","strDateType","strDivCode","strItemLevel"						
						],
				"service":"CoreReportService",
				"methodName":"PrintLoadBuildingReport"
							
			},
			{		 
                 "controlid":"ListInspection",
				"tasktype":"btnclick",
				"input":[
						"strRequestNoFrom","strShipmentNoFrom","strLoadNoFrom","strJourneyNoFrom","strLogGroup","strRegion",
						"strOrigin","strDestination","strPriority","strCommodity","strCarrierCode","strDriverCodeFrom",
						"strVehicleCodeFrom","strInspectionNoTo","dtDateFrom","dtDateTo","strLoadNoTo","strJourneyNoTo",
						"strStatus","strCustomerName","strDocNo","strRequestorId","strWBSNo","strItemCode","strDateType","strDivCode","strItemLevel"							
						],
				"service":"CoreReportService",
				"methodName":"ListInspectionReport"
			            
		},
		{       
				"controlid":"ListJourneyRpt",
				"tasktype":"btnclick", 
				"input":[
						"strRequestNoFrom","strShipmentNoFrom","strLoadNoFrom","strJourneyNoFrom","strLogGroup","strRegion",
						"strOrigin","strDestination","strPriority","strCommodity","strCarrierCode","strDriverCodeFrom",
						"strVehicleCodeFrom","strInspectionNoTo","dtDateFrom","dtDateTo","strLoadNoTo","strJourneyNoTo",
						"strStatus","strCustomerName","strDocNo","strRequestorId","strWBSNo","strItemCode","strDateType","strDivCode","strItemLevel"							
						],
			    "service":"CoreReportService",
				"methodName":"printListJourneyReport"
			}	,
			
			{		
				"controlid":"getRequest",
				"tasktype":"btnclick",
				"input":[
						"strRequestNoFrom","strShipmentNoFrom","strLoadNoFrom","strJourneyNoFrom","strLogGroup","strRegion",
						"strOrigin","strDestination","strPriority","strCommodity","strCarrierCode","strDriverCodeFrom",
						"strVehicleCodeFrom","strInspectionNoTo","dtDateFrom","dtDateTo","strLoadNoTo","strJourneyNoTo",
						"strStatus","strCustomerName","strDocNo","strRequestorId","strWBSNo","strItemCode","strDateType","strDivCode","strItemLevel",
						"strYear","strMonth","strCreateType"				
						],
				"service":"CoreReportService",
				"methodName":"getRequestReportXL"
							
			},
			{
				"controlid":"strItemLevel",
				"tasktype":"onchange",
				"input":["strItemLevel"],
				"service":"CoreReportService",
				"methodName":"onchange_ItemLevel"
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
