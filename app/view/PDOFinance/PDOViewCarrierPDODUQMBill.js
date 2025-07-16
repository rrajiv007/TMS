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
Ext.define('CueTrans.view.PDOFinance.PDOViewCarrierPDODUQMBill', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Duqm Sumitomo PDO Approval";		
		
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;
		mainpage.toolbarActions= 
		[		
		{
			"name": "Submit",
			"tooltip": "Click here to submit."
		},		
		{
			"name": "Print Summary",
			"tooltip": "Click here to print summary."
		},
		{
			"name": "Print Detail",
			"tooltip": "Click here to print detail."
		}
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
				//plf.addDisplayOnly({"label":"No of Contractor Bills",id:"iNoCons"}),	
				plf.addDisplayOnly({"label":"No of Trips",id:"iNoTrips"}),	
				plf.addDisplayOnly({"label":"No of Loads",id:"iNoLoads"}),
				plf.addDisplayOnly({"label":"Amount",id:"strAmount"})	
			]
		
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
				//plf.addDisplayOnly({"label":"No of Contractor Bills",id:"iNoCons"}),	
				plf.addDisplayOnly({"label":"No of Trips",id:"iNoTrips"}),	
				plf.addDisplayOnly({"label":"No of Loads",id:"iNoLoads"}),
				plf.addDisplayOnly({"label":"Amount",id:"strAmount","weightPrecision":3})					
				
			]
		}			
		BillHdrColumn.add(BillHdrCtrl)		
		
		
		
		var LoadDetailsColumn = plf.addColumnSection({"title":""},this);
		var loadDetailsGridObj=			
		[   
			{columnname:"Key Field",dataname:"KEY_FIELD",datatype:"string",width:150,hidden:true},
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:150},	
			{columnname:"Trip Closure Date",dataname:"TRIP_CLS_DT",datatype:"string",width:150},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:120},
			{columnname:"Load Scheduled Date",dataname:"SCH_DT",datatype:"string",width:120},
			{columnname:"Load Closure Date",dataname:"LOAD_CLS_DT",datatype:"string",width:150},			
			{columnname:"Load Leg Type",dataname:"LOAD_TYPE",datatype:"string",width:120},
			{columnname:"Load Category",dataname:"LOAD_CAT",datatype:"string",width:120},
			{columnname:"Scheduled Vehicle No",dataname:"VEH_CODE",datatype:"string",width:150},
			{columnname:"Scheduled Vehicle Category",dataname:"SCH_CAT",datatype:"string",width:200},
			{columnname:"Scheduled Contract No",dataname:"CONTRACT_NO",datatype:"string",width:150},			
			{columnname:"Scheduled Contractor Name",dataname:"CONTRACTOR_NAME",datatype:"string",width:200},
			{columnname:"Reported Vehicle No",dataname:"REP_VEH",datatype:"string",width:150},
			{columnname:"Reported Contract No",dataname:"REP_CON",datatype:"string",width:150},
			{columnname:"Reported Contractor Name",dataname:"REP_CON_NM",datatype:"string",width:200},			
			{columnname:"Loading Point",dataname:"LD_PT",datatype:"string",width:120},			
			{columnname:"Origin",dataname:"ORG",datatype:"string",width:170},
			{columnname:"Destination",dataname:"DEST",datatype:"string",width:170},			
			{columnname:"Unloading Point",dataname:"ULD_PT",datatype:"string",width:120},
			{columnname:"Load Weight",dataname:"LOAD_WT",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Load Distance",dataname:"LOAD_DIST",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Load Leg Amount",dataname:"CHARGE_AMT",datatype:"string",width:120,colAlign:'right',weightPrecision:3},			
			{columnname:"Adjustments",dataname:"ADJ",datatype:"string",width:100,colAlign:'right',weightPrecision:3},			
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:100},
			{columnname:"Total Load Leg Amount",dataname:"TOT_LOAD_LEG_AMT",datatype:"string",width:150,colAlign:'right',weightPrecision:3},
			{columnname:"Generated Date",dataname:"GEN_DATE",datatype:"string",width:120},			
			{columnname:"Contractor Bill No",dataname:"CONTRACT_BILL_NO",datatype:"string",width:170},			
			{columnname:"Operations Approval",dataname:"OPS_APP",datatype:"string",width:150},
			{columnname:"Approved By",dataname:"OPS_APP_BY",datatype:"string",width:100},
			{columnname:"PDO Approval",dataname:"PDO_APP",datatype:"string",width:120,editControl:"checkbox"},			
			{columnname:"Approved By",dataname:"PDO_APP_BY",datatype:"string",width:100},
			{columnname:"Paid to OTO",dataname:"PAID_OTO",datatype:"string",width:100},
			{columnname:"Updated By",dataname:"UPDATE_BY",datatype:"string",width:100}
		]
		var loaddetGridDtl=			
		{
			title:"",
			id:"loadDetailsGrid",
			detail:loadDetailsGridObj,
			visibleRow:10,
			removeAddDelete:true,
			removePaging:true,
			removeTbar:false,		
			columnWidth:1,
			selectedRowCnt:true
		
		}
		var loadGridSection = plf.addGrid(loaddetGridDtl,this)
		LoadDetailsColumn.add(loadGridSection);
		
		
		
		
		var SumitomoColumn = plf.addCollapseSection({"title":"Summary",collapsed:true});	
		var SumitomoGridFieldObj=			
		[   
			{columnname:"Load Type",dataname:"GRP_SUMITOMO",datatype:"string",width:150,hidden:true},			
			{columnname:"From Region",dataname:"FROM_REG",datatype:"string",width:100},			
			{columnname:"To Region",dataname:"TO_REG",datatype:"string",width:100},
			{columnname:"No. of Loads",dataname:"TOT_LEGS",datatype:"string",width:100},
			{columnname:"Rate/Load",dataname:"AMT_LEGS",datatype:"string",datatype:"string",colAlign:'right',width:100},
			{columnname:"Total Amount",dataname:"TOT_AMT",datatype:"string",width:130,colAlign:'right'}
		]
		var SumitomoGridDtl=			
		{
			title:"",
			id:"SumitomoGrid",
			detail:SumitomoGridFieldObj,
			visibleRow:8,
			readonly:true,
			removeAddDelete:true,
			removePaging:true,
			removeTbar:false,
			widthBasis: "Flex",
			groupByField: 'GRP_SUMITOMO',
			columnWidth:1
		}
		var SumitomoGridSection = plf.addGrid(SumitomoGridDtl,this)		
		SumitomoColumn.add(SumitomoGridSection);			
		
		//Main Page layout starts
		mainpage.ptrMainSection.add(BillHdrColumn) 
		
		mainpage.ptrMainSection.add(SumitomoColumn);
		mainpage.ptrMainSection.add(LoadDetailsColumn);
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
				"methodName":"PDOinitViewPDODUQBillTS"
			},			
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Submit",
				"input":["loadDetailsGrid","strBillNo"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"PDOSubViewPDODUQMBillTS"
			},
			{        
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print Bank Advise",
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBillInvoiceReport"
			},					
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print Summary",
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBilDuqmSumiReport"
			},					
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print Detail",
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBillDtlDuqmReport"
			}
			
		];
		
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
