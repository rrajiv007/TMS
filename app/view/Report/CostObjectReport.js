/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			         Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                     Addition of var
1.0.2	 Sudhakar D			13/03/2016	  Golive					Grid addition in JS	  
************************************************************************************************/
Ext.define('CueTrans.view.Report.CostObjectReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Cost Object Report";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		/*
		mainpage.toolbarLinks=
		[
			{"name":"Tactical Reports","linkid":"rep_opreports"},
			{"name":"Statistical Reports","linkid":"rep_streports"},
			{"name":"Summary Reports","linkid":"rep_sumreports"}
		]
		*/
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
			plf.addHlpText({"label":"WayBill No",id:"strLoadNo",hlpLinkID:"LoadNo"},this),
			plf.addHlpText({"label":"Inspection No",id:"strInspectionNo",hlpLinkID:"inspectionno"},this),
			plf.addHlpText({"label":"JourneyPlan No",id:"strJourneyPlanNo",hlpLinkID:"journeyno"},this),
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({}); //69997
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  //plf.addButton({"label":"Show Details","id":"GetDetails"}),//Golive	  
		  //plf.addBlank(),	//Golive
		  plf.addButton({"label":"Generate PDF","id":"costobject"}),		 	  
		  plf.addBlank()		
		]	
		
		// Grid section Begins--Golive

		CostObjectgrid=
		[   
			{columnname:"Load Id",dataname:"LOAD_ID",datatype:"string",width:150},
			{columnname:"Shipment Id",dataname:"SHIPMENT_ID",datatype:"string",width:150},
			{columnname:"Delivery Number",dataname:"DELIVERY_NUMBER",datatype:"string",width:150},
			{columnname:"Requester ID",dataname:"REQUESTER_ID",datatype:"string",width:150},
			{columnname:"Requester Name",dataname:"REQUESTER_NAME",datatype:"string",width:150},
			{columnname:"Manual/SAP",dataname:"MANUAL_SAP",datatype:"string",width:150},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
			{columnname:"WBS Cost Center No.",dataname:"WBS_CC_NO",datatype:"string",width:150},
			{columnname:"Region Std/Hotshot",dataname:"REGION_STD_HOT",datatype:"string",width:150},
			{columnname:"Distance(km)",dataname:"DISTANCE",datatype:"string",width:150},
			{columnname:"Weight(kg)",dataname:"WEIGHT",datatype:"string",width:150},
			{columnname:"tonkm",dataname:"TONKM",datatype:"string",width:150},
			{columnname:"Shipment Created Date",dataname:"SHIPMENT_CREATED_DT",datatype:"string",width:150},
			{columnname:"Completed Date",dataname:"COMPLETED_DT",datatype:"string",width:150}
				
		]
		CostObjectdetails=
		{
			title:"Cost Object Details",
			id:"CostObjectdtl",
			detail:CostObjectgrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		CostObjectGridSection = plf.addGrid(CostObjectdetails,this)

		// Grid section Ends--Golive
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		//mainpage.ptrMainSection.add(CostObjectGridSection)//--Golive		
		
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
			{		
				"controlid":"costobject",
				"tasktype":"btnclick",
				"input":["strRequestNoFrom","strRequestNoTo","strShipmentNoFrom","strShipmentNoTo","strLoadNoFrom","strLoadNoTo","dtDateFrom","dtDateTo","strLocationCode","strRegion","strPriority","strCarrierCode","strCustomerCode"],
				"service":"CoreReportService",
				"methodName":"PrintcostobjectReport"
							
			}
			//--Golive Begins
			,{		
				"controlid":"GetDetails",
				"tasktype":"btnclick",
				"input":["strRequestNoFrom","strRequestNoTo","strShipmentNoFrom","strShipmentNoTo","strLoadNoFrom","strLoadNoTo","dtDateFrom","dtDateTo","strLocationCode","strRegion","strPriority","strCarrierCode","strCustomerCode"],
				"service":"CoreReportService",
				"methodName":"GetcostobjectDetails"
							
			}//--Golive Ends
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
							{"src":"","dest":""}]
				},
	"rep_sumreports":
				{
					"dest":"Report.SummaryReport",
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
