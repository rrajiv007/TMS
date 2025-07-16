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
Ext.define('CueTrans.view.Report.WayBillReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "WayBill Report";
		
		//Help on Customer Search Section Begins
		plf.columns=3
		mainpage.toolbarSectionFlag=true;
		var ReportsColumn = plf.addColumnSection({});	
		
		var ReportsFormCtrl=						
		[
            plf.addDate({"label":"Date From",id:"dtDateFrom","mandatory":"true"}),
			plf.addDate({"label":"Date To",id:"dtDateTo","mandatory":"true"}),
            plf.addHlpText({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"carriercode"},this),
			plf.addHlpText({"label":"WayBill No",id:"strLoadNo",hlpLinkID:"LoadNo"},this),            
            plf.addHlpText({"label":"JourneyPlan No",id:"strJourneyPlanNo",hlpLinkID:"journeyno"},this)
			]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({}); //69997
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Way Bill","id":"waybill"}),	 
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
				"controlid":"waybill", 
				"tasktype":"btnclick",
                 "input":["strLoadNo","dtDateFrom","dtDateTo","strCarrierCode","strJourneyPlanNo"],
				"service":"CoreReportService",
				"methodName":"PrintwaybillReport"		
			}			
		];
								
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	
			
});
