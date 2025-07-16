/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	                           Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.PDOFinance.PDOContractorBillPayments', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Contractor Bill Payments";		
		
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;
		mainpage.toolbarActions= 
		[	
		{
			"name": "Print Summary",
			"tooltip": "Click here to print."
		}/*,
		{
			"name": "Print Detail",
			"tooltip": "Click here to print."
		}*/
		]
		
		plf.columns=4
		var parentForm =this;
		var BillHdrColumn = plf.addColumnSection({});		
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var BillHdrCtrl=		
			[	
				plf.addDisplayOnly({"label":"Carrier Bill ID",id:"strBillNo"}),	
				plf.addDisplayOnly({"label":"Carrier Bill Description",id:"strBillDesc"}),
				plf.addDisplayOnly({"label":"Carrier Code",id:"strCarCode"}),	
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addDisplayOnly({"label":"Carrier Bill Period",id:"strBillPeriod"}),								
				plf.addDisplayOnly({"label":"No of Trips",id:"iNoTrips"}),	
				plf.addDisplayOnly({"label":"No of Loads",id:"iNoLoads"}),
				plf.addDisplayOnly({"label":"Amount",id:"strAmount"})				]
		
		}
		
		else
		{
			var BillHdrCtrl=		
			[	
				plf.addDisplayOnly({"label":"Carrier Bill ID",id:"strBillNo"}),	
				plf.addDisplayOnly({"label":"Carrier Bill Description",id:"strBillDesc"}),
				plf.addDisplayOnly({"label":"Carrier Code",id:"strCarCode"}),	
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addDisplayOnly({"label":"Bill Period",id:"strBillPeriod"}),								
				plf.addDisplayOnly({"label":"No of Trips",id:"iNoTrips"}),	
				plf.addDisplayOnly({"label":"No of Loads",id:"iNoLoads"}),
				plf.addDisplayOnly({"label":"Amount",id:"strAmount","weightPrecision":3})					
				
			]
		}			
		BillHdrColumn.add(BillHdrCtrl)		
		
		var ContractorColumn = plf.addColumnSection({"title":"Contractor Bills"});	
		var ContractorGridFieldObj=			
		[   
			{columnname:"Print Contractor Bill",dataname:"CONTRACT_BILL",datatype:"string",width:130,gridReport:"PrintContractorbill",imageURL:"resources/images/shared/calendar.gif",tooltip:"Click here to Contractor bill."},
			{columnname:"Contractor Bill No",dataname:"INVOICE_NO",datatype:"string",width:250,linkId:"finContView","tooltip":"Click here to view contractor bill details."},
			{columnname:"Contractor Bill No",dataname:"strRef",datatype:"string",width:130,hidden:true},
			{columnname:"Contractor Bill Status",dataname:"PAYMENT_STATUS",datatype:"string",width:150},
			{columnname:"Contractor Bill Remarks",dataname:"CONTRACT_RMKS",datatype:"string",width:150},
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:150},
			{columnname:"Contractor Name",dataname:"CONTRACT_NM",datatype:"string",width:100},			
			{columnname:"Vehicle Regn No",dataname:"VEH_NO",datatype:"string",width:100},
			//{columnname:"Total Load Legs",dataname:"TOT_LEGS",datatype:"string",width:100},
			{columnname:"Bill Amount",dataname:"BILL_AMT",datatype:"string",datatype:"string",width:100,colAlign:'right'},
			{columnname:"No of Trips Processed",dataname:"NO_TRIPS",datatype:"string",width:130,colAlign:'right'},
			{columnname:"No of Loads Processed",dataname:"NO_LOAD",datatype:"string",width:130,colAlign:'right'},
			{columnname:"Generated Date",dataname:"GEN_DATE",datatype:"string",width:130}			
		]
		var ContractorGridDtl=			
		{
			title:"",
			id:"contractorGrid",
			detail:ContractorGridFieldObj,
			visibleRow:10,
			readonly:true,
			removeAddDelete:true,
			removePaging:true,
			removeTbar:false
		
		}
		var ContractorGridSection = plf.addGrid(ContractorGridDtl,this)		
		ContractorColumn.add(ContractorGridSection);		
		
		var LoadDetailsColumn = plf.addColumnSection({"title":"Load Details"},this);
		var loadDetailsGridObj=			
		[   
			{columnname:"Key Field",dataname:"KEY_FIELD",datatype:"string",width:150,hidden:true},
			{columnname:"Charge Code",dataname:"CHARGE_CODE",datatype:"string",width:150,hidden:true},
			{columnname:"Lane Code",dataname:"LANE_CODE",datatype:"string",width:150,hidden:true},
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:150},
			{columnname:"Trip Closure Date",dataname:"TRIP_CLS_DT",datatype:"string",width:150},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:120},
			{columnname:"Load Scheduled Date",dataname:"SCH_DT",datatype:"string",width:120},
			{columnname:"Load Closure Date",dataname:"LOAD_CLS_DT",datatype:"string",width:150},
			{columnname:"Load Leg Type",dataname:"LOAD_TYPE",datatype:"string",width:120},
			{columnname:"Load Category",dataname:"LOAD_CAT",datatype:"string",width:120},
			{columnname:"Journey Plan No",dataname:"JOURNEY_PLAN_NO",datatype:"string",width:120},
			{columnname:"Journey Type",dataname:"JOURNEY_TYPE",datatype:"string",width:120},
			{columnname:"Charge Basis",dataname:"CHARGE_BASIS",datatype:"string",width:150},
			{columnname:"Scheduled Vehicle No",dataname:"VEH_CODE",datatype:"string",width:150},
			{columnname:"Scheduled Vehicle Category",dataname:"SCH_CAT",datatype:"string",width:200},
			{columnname:"Scheduled Contract No",dataname:"CONTRACT_NO",datatype:"string",width:150},
			
			{columnname:"Scheduled Contractor Name",dataname:"CONTRACTOR_NAME",datatype:"string",width:200},
			{columnname:"Reported Vehicle No",dataname:"REP_VEH",datatype:"string",width:150,hidden:true},
			{columnname:"Reported Contract No",dataname:"REP_CON",datatype:"string",width:150,hidden:true},
			{columnname:"Reported Contractor Name",dataname:"REP_CON_NM",datatype:"string",width:200,hidden:true},
			
			{columnname:"Loading Point",dataname:"LD_PT",datatype:"string",width:120},
			
			{columnname:"Origin",dataname:"ORG",datatype:"string",width:170},
			{columnname:"Destination",dataname:"DEST",datatype:"string",width:170},
			//{columnname:"From Region",dataname:"FRM_REG",datatype:"string",width:170},
			//{columnname:"To Region",dataname:"TO_REG",datatype:"string",width:170},
			{columnname:"Finance From Region",dataname:"FIN_FROM_REG",datatype:"string",width:170},
			{columnname:"Finance To Region",dataname:"FIN_TO_REG",datatype:"string",width:170},
			{columnname:"Unloading Point",dataname:"ULD_PT",datatype:"string",width:120},
			{columnname:"Load Weight",dataname:"LOAD_WT",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Load Distance",dataname:"LOAD_DIST",datatype:"string",width:100,colAlign:'right'},
			{columnname:"Load Leg Amount",dataname:"CHARGE_AMT",datatype:"string",width:120,colAlign:'right',weightPrecision:3},
			
			{columnname:"Adjustments",dataname:"ADJ",datatype:"string",width:100,editControl:"textbox",colAlign:'right',weightPrecision:3},			
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"Total Load Leg Amount",dataname:"TOT_LOAD_LEG_AMT",datatype:"string",width:150,colAlign:'right',weightPrecision:3},
			{columnname:"Generated Date",dataname:"GEN_DATE",datatype:"string",width:120},
			
			{columnname:"Contractor Bill No",dataname:"CONTRACT_BILL_NO",datatype:"string",width:170},			
			{columnname:"Operations Approval",dataname:"OPS_APP",datatype:"string",width:150},
			{columnname:"Approved By",dataname:"OPS_APP_BY",datatype:"string",width:100},
			{columnname:"Approved Date",dataname:"OPS_APP_DT",datatype:"string",width:100},
			{columnname:"PDO Approval",dataname:"PDO_APP",datatype:"string",width:120},
			
			{columnname:"Approved By",dataname:"PDO_APP_BY",datatype:"string",width:100},
			{columnname:"Approved Date",dataname:"PDO_APP_DT",datatype:"string",width:100},
			{columnname:"Paid to OTO",dataname:"PAID_OTO",datatype:"string",width:100},
			{columnname:"Updated By",dataname:"UPDATE_BY",datatype:"string",width:100},
			{columnname:"Updated Date",dataname:"PAID_OTO_DT",datatype:"string",width:100},
			{columnname:"Cancel Load",dataname:"CAN_LOAD",datatype:"string",width:80,linkId:"cancellink",heading:true,gridpopup:true,tooltip:"Click here to cancel load.",imageURL:"resources/images/gridbar/delete.png",hidden:true}

			
		]
		var loaddetGridDtl=			
		{
			title:"",
			id:"loadSummaryDetailsGrid",
			detail:loadDetailsGridObj,
			visibleRow:9,
			removeAddDelete:true,
			removePaging:true,
			removeTbar:false,
			columnWidth:1		
		}
		var loadGridSection = plf.addGrid(loaddetGridDtl,this)
		LoadDetailsColumn.add(loadGridSection);
		
		var LoadDetailsPayColumn = plf.addColumnSection({"title":"Load Details for Payment"},this);
		var loadDetailsPayGridObj=			
		[   
		    {columnname:"Print Contractor Bill",dataname:"CONTRACT_BILL",datatype:"string",width:130,gridReport:"PrintPayContractorbill",imageURL:"resources/images/shared/calendar.gif",tooltip:"Click here to Contractor bill."},
			{columnname:"Print WayBill",dataname:"WAYBILL",datatype:"string",width:130,gridReport:"PrintWaybill",imageURL:"resources/images/grid/Journey/Grid_Replan.png",tooltip:"Click here to print waybill."},
			{columnname:"Print journey plan.",dataname:"JP_REPORT",datatype:"string",width:130,gridReport:"PrintJPReport",imageURL:"resources/images/grid/Journey/Grid_Re_Create.png",tooltip:"Click here to print journey plan report."},
			{columnname:"Print Diversion Letter",dataname:"DIV_LETTER",datatype:"string",width:130,gridReport:"PrintDivLetter",imageURL:"resources/images/gridbar/DiversionLetter.png",tooltip:"Click here to print diversion letter."},
			{columnname:"Print Release Letter",dataname:"REL_LETTER",datatype:"string",width:130,gridReport:"PrintRelLetter",imageURL:"resources/images/gridbar/OTOReleaseLetter.png",tooltip:"Click here to print release letter."},
			{columnname:"JP No",dataname:"strJourneyPlanNo",datatype:"string",width:120,hidden:true},
			{columnname:"Load No",dataname:"strLoadNo",datatype:"string",width:120,hidden:true},
			{columnname:"Contractor Bill No",dataname:"KEY_FIELD",datatype:"string",width:250},
			{columnname:"Contractor Bill No",dataname:"strRef",datatype:"string",width:130,hidden:true},
			{columnname:"Load No",dataname:"strDocNo",datatype:"string",width:120,hidden:true},		
			{columnname:"Load No",dataname:"TRIP_NO",datatype:"string",width:120},		
			{columnname:"Load Closure Date",dataname:"LOAD_CLS_DT",datatype:"string",width:150},
			{columnname:"Trip No",dataname:"LOAD_NO",datatype:"string",width:150},
			{columnname:"Trip Closure Date",dataname:"TRIP_CLS_DT",datatype:"string",width:150},
			{columnname:"Journey Plan No",dataname:"JOURNEY_PLAN_NO",datatype:"string",width:120},
			{columnname:"Scheduled Vehicle Category",dataname:"SCH_CAT",datatype:"string",width:200},
			{columnname:"Scheduled Vehicle No",dataname:"VEH_CODE",datatype:"string",width:150},
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:150},			
			{columnname:"Contractor Name",dataname:"CONTRACTOR_NAME",datatype:"string",width:200},
			{columnname:"Origin",dataname:"ORG",datatype:"string",width:170},
			{columnname:"Finance From Region",dataname:"FIN_FROM_REG",datatype:"string",width:170},
			{columnname:"Destination",dataname:"DEST",datatype:"string",width:170},			
			{columnname:"Finance To Region",dataname:"FIN_TO_REG",datatype:"string",width:170},
			{columnname:"Amount",dataname:"CHARGE_AMT",datatype:"string",width:120,colAlign:'right',weightPrecision:3},
			{columnname:"Payment Status",dataname:"PAYMENT_STATUS",datatype:"string",width:150},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:100,editControl:"textbox"}
			]
		var loaddetPayGridDtl=			
		{
			title:"",
			id:"loadDetailsGrid",
			detail:loadDetailsPayGridObj,
			visibleRow:9,
			removeAddDelete:true,
			removePaging:true,
			removeTbar:false,
			columnWidth:1,
			selRowProcess:"Y"
		}
		var loadGridPaySection = plf.addGrid(loaddetPayGridDtl,this)
		LoadDetailsPayColumn.add(loadGridPaySection);
		var LoadBtnColumn = plf.addColumnSection({columnWidth:1});	
		var BtnCtrl=							
		[				
			plf.addButton({"label":"Pay","id":"btnPay"})
		]
		LoadBtnColumn.add(BtnCtrl);
		LoadDetailsPayColumn.add(LoadBtnColumn);
		
		var ExcelLoadDetailsPayColumn = plf.addColumnSection({"title":"Upload Payment Status"},this);
		var  ExcelloadDetailsPayGridObj=			
		[   
			{columnname:"Contractor Bill No",dataname:"CONTRACT_BILL_NO",datatype:"string",width:250},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:120},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:100}
			]
		var ExcelloaddetPayGridDtl=			
		{
			title:"",
			id:"ExcelloadDetailsGrid",
			detail:ExcelloadDetailsPayGridObj,
			visibleRow:9,
			removeAddDelete:true,
			removePaging:true,
			removeTbar:false,
			columnWidth:1,
			readonly:true,
			removeExport:true,
			importTemplate:"excelTemplate/Contractor_bill_Template.xls"
		}
		var ExcelloadGridPaySection = plf.addGrid(ExcelloaddetPayGridDtl,this)
		ExcelLoadDetailsPayColumn.add(ExcelloadGridPaySection);
		var ExcelLoadBtnColumn = plf.addColumnSection({columnWidth:1});	
		var ExcelBtnCtrl=							
		[				
			plf.addButton({"label":"Submit","id":"btnSubmit"})
		]
		ExcelLoadBtnColumn.add(ExcelBtnCtrl);
		ExcelLoadDetailsPayColumn.add(ExcelLoadBtnColumn);
		
		//Main Page layout starts
		mainpage.ptrMainSection.add(BillHdrColumn) 	

		var baseTab = plf.addTabSection({columnWidth:1,tabs:[LoadDetailsColumn,ContractorColumn,LoadDetailsPayColumn,ExcelLoadDetailsPayColumn]});
		
		mainpage.ptrMainSection.add(baseTab);
		
		//Main Page layout ends
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strBillNo"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"PDOinitViewCarConBillTS"
			},							
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print Summary",
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBillCONTRReport"
			},							
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print Detail",
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBillDtlCONTRReport"
			},
			{       
				"controlid":"btnPay",
				"tasktype":"btnclick",				
				"input":["loadDetailsGrid","strBillNo"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"PDOContractorBillBulkPayTS"
			},
			{       
				"controlid":"btnSubmit",
				"tasktype":"btnclick",				
				"input":["ExcelloadDetailsGrid","strBillNo"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"PDOContBillSubmitpayTS"
			},
			{
				"grideventid":"PrintContractorbill",
				"tasktype":"gridonprint",
				"input":["strRef"],
				"service":"CoreReportService",
				"methodName":"PrintCarrierBillMLReport"
			},
			{
				"grideventid":"PrintPayContractorbill",
				"tasktype":"gridonprint",
				"input":["strRef","strDocNo"],
				"service":"CoreReportService",
				"methodName":"PrintCarrierBillMLReport"
			},
			{
				"grideventid":"PrintDivLetter",
				"tasktype":"gridonprint",
				"input":["strLoadNo"],
				"service":"CoreReportService",
				"methodName":"JpMlPrintDivReport"
			},
			{
				"grideventid":"PrintRelLetter",
				"tasktype":"gridonprint",
				"input":["strJourneyPlanNo"],
				"service":"CoreReportService",
				"methodName":"PrintReleaseMLReport"
			},
			{
				"grideventid":"PrintJPReport",
				"tasktype":"gridonprint",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"mlPrintJPReport"
			},
			{
				"grideventid":"PrintWaybill",
				"tasktype":"gridonprint",
				"input":["strLoadNo"],
				"service":"CoreReportService",
				"methodName":"PrintwaybillloadingReport"
			}
			
		];
		mainpage.screenLinks=
		{
		
			"finContView":
				{
					"dest":"PDOFinance.PDOContractBillDetails",
					"hdr":[
							{"src":"strBillNo","dest":"strBillNo"}						
						   ],
					"grid":[
							{"src":"INVOICE_NO","dest":"strConBillNo"},	
							{"src":"INVOICE_NO","dest":"strLoadNo"},	
							{"src":"GEN_DATE","dest":"dtGenDate"},
							{"src":"BILL_AMT","dest":"iBillAmt"},
							{"src":"CONTRACT_NO","dest":"strContractNo"},
							{"src":"CONTRACT_NM","dest":"strContractNm"},
							{"src":"VEH_NO","dest":"strVehCode"},
							{"src":"NO_TRIPS","dest":"iNoofTrips"},
							{"src":"NO_LOAD","dest":"iNoofLoads"},
							{"src":"CONTRACT_RMKS","dest":"strContractRemarks"},
							{"src":"PAYMENT_STATUS","dest":"strStatus"}
						   ]
				}	
		
		}
		mainpage.gridPopupLinks=
		{
			"cancellink":
			{
				"dest":"PDOFinance.CancelLoad",
					"hdr":[
							{"src":"","dest":""}
							],
					"grid":[
							{"src":"LOAD_NO","dest":"strLoadNo"}
							]
			}
		}
		
		this.callParent(arguments);
		
	}
});
