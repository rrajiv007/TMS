/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.PDOFinance.PDOViewLoadDetails', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function() 
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Load/Trip Details";
		mainpage.toolbarSectionFlag=true;
        
			
		plf.columns = 4
		var finInvSumHdrCollapse = plf.addCollapseSection({title:"Search Criteria", collapsed:true,btnID:"searchBtn"},this);		//69995
		
		var finInvSumFormCtrl=					//69995
		[
		
			plf.addText({"label":"Load No",id:"strLoadNo"}),
			plf.addText({"label":"Trip No",id:"strTripSheetNo"}),
			plf.addCombo({"label":"Load Type",id:"strLoadType"}),
			plf.addCombo({"label":"Load Category",id:"strLoadCat"}),
			
			plf.addCombo({"label":"Origin",id:"strOrigin"}), 
			plf.addCombo({"label":"Loading Point",id:"strLoadingPt"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addCombo({"label":"Unloading Point",id:"strULoadingPt"}),
			
			plf.addCombo({"label":"From Region",id:"strFromRegion"}),
			plf.addCombo({"label":"To Region",id:"strToRegion"}),
			plf.addText({"label":"Sch. Vehicle No",id:"strSchVehNo"}),
			plf.addCombo({"label":"Sch. Vehicle Category",id:"strSchVehCat"}),
			
			plf.addText({"label":"Sch. Contract No",id:"strSchVehConNo"}),
			plf.addText({"label":"Sch. Contractor Name",id:"strSchVehConNm"}),
			plf.addText({"label":"Rep. Vehicle No",id:"strRepVehNo"}),
			plf.addText({"label":"Rep. Contract No",id:"strRepVehConNo"}),
			
			plf.addText({"label":"Rep. Contractor Name",id:"strRepVehConNm"}),
			plf.addCombo({"label":"Date Type",id:"strDateType"}),
			plf.addDate({"label":"Date From",id:"dtInvoiceFromDate"}),
			plf.addDate({"label":"Date To",id:"dtInvoiceToDate"}),
			
			plf.addText({"label":"Carrier Bill No",id:"strBillNo"}),
			plf.addText({"label":"Contractor Bill No",id:"strConBillNo"})
			
			
		]
		
		finInvSumHdrCollapse.add(finInvSumFormCtrl);
	
		
		
		var finInvSumGridFieldObj=			//69995
		[
		
			{columnname:"Carrier Bill ID",dataname:"INVOICE_NO",datatype:"string",width:150,linkId:"finInvSumView","tooltip":"Click here to view carrier bill details."},
			{columnname:"Carrier Bill Period",dataname:"INVOICE_DT",datatype:"string",width:150},
			{columnname:"Contractor Bill No",dataname:"INVOICE_DESC",datatype:"string",width:150},
			{columnname:"Scheduled Vehicle No",dataname:"BILL_PERIOD",datatype:"string",width:200},
			{columnname:"Scheduled Vehicle Category",dataname:"STATUS",datatype:"string",width:200},
			{columnname:"Scheduled Contract No",dataname:"NO_CONBILL",datatype:"string",width:200},
			{columnname:"Scheduled Contractor Name",dataname:"SC_CONTRACTOR_NAME",datatype:"string",width:200},
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:120},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:120},
			{columnname:"Scheduled Date",dataname:"SCH_DT",datatype:"string",width:100},
			{columnname:"Generated Date",dataname:"GEN_DATE",datatype:"string",width:100},
			{columnname:"Load Type",dataname:"LOAD_TYPE",datatype:"string",width:120},
			{columnname:"Load Category",dataname:"LOAD_CATEGORY",datatype:"string",width:120},
			{columnname:"Loading Point",dataname:"LD_PT",datatype:"string",width:120},
			{columnname:"Origin",dataname:"ORG",datatype:"string",width:120},
			{columnname:"From Region",dataname:"FROM_REGION",datatype:"string",width:120},
			{columnname:"Destination",dataname:"DEST",datatype:"string",width:120},
			{columnname:"To Region",dataname:"TO_REGION",datatype:"string",width:120},
			{columnname:"Unloading Point",dataname:"ULD_PT",datatype:"string",width:120},
			{columnname:"Finance From Region",dataname:"FIN_FROM_REG",datatype:"string",width:120},
			{columnname:"Finance To Region",dataname:"FIN_TO_REG",datatype:"string",width:120},
			{columnname:"Journey Plan No",dataname:"JOURNEY_PLAN_NO",datatype:"string",width:120},
			{columnname:"Journey Type",dataname:"JOURNEY_TYPE",datatype:"string",width:120},
			{columnname:"Load Weight",dataname:"LOAD_WT",datatype:"string",width:120},
			{columnname:"Load Distance",dataname:"LOAD_DIST",datatype:"string",width:120},
			{columnname:"TonKM",dataname:"TONKM",datatype:"string",width:120,hidden:true},
			{columnname:"Load Leg Amount",dataname:"LOAD_LEG_AMT",datatype:"string",width:150},
			{columnname:"Adjustments",dataname:"ADJ",datatype:"string",width:120},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:120},
			{columnname:"Total Load Leg Amount",dataname:"TOT_LOAD_LEG_AMT",datatype:"string",width:200},
			{columnname:"Cost per TonKM",dataname:"COST_PER_TONKM",datatype:"string",width:200,colAlign:'right',weightPrecision:3,hidden:true},
			{columnname:"Reported Vehicle No",dataname:"REP_VEH",datatype:"string",width:200,hidden:true},
			{columnname:"Reported Contract No",dataname:"REP_CON",datatype:"string",width:200,hidden:true},
			{columnname:"Reported Contractor Name",dataname:"REP_CON_NM",datatype:"string",width:200,hidden:true},
			{columnname:"OPS Approval",dataname:"OPS_APP",datatype:"string",width:100},
			{columnname:"Approved By",dataname:"OPS_APP_BY",datatype:"string",width:100},
			{columnname:"Approved Date",dataname:"OPS_APP_DT",datatype:"string",width:100},
			{columnname:"PDO Approval",dataname:"PDO_APP",datatype:"string",width:100},
			{columnname:"Approved By",dataname:"PDO_APP_BY",datatype:"string",width:100},
			{columnname:"Approved Date",dataname:"PDO_APP_DT",datatype:"string",width:100},
			{columnname:"Paid to OTO",dataname:"PAID_OTO",datatype:"string",width:100},
			{columnname:"Updated By",dataname:"UPDATE_BY",datatype:"string",width:100},
			{columnname:"Updated Date",dataname:"PAID_OTO_DT",datatype:"string",width:100}
			
			
		]
		var finInvSumGridDtl=			//69995
		{
			title:"",
			id:"billsumGrid",
			detail:finInvSumGridFieldObj,
			visibleRow:13,
			readonly:true,
			removeAddDelete:true
		}
		
		//charge Grid Section Ends
		
		//Add Child Sections
	
		mainpage.ptrMainSection.add(finInvSumHdrCollapse)//Add Header Section to Main Page
		var InvSumSection=plf.addGrid(finInvSumGridDtl,this)			//69995
		mainpage.InvSumGridPtr = InvSumSection
		mainpage.ptrMainSection.add(InvSumSection) 
		
	// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[	
			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"PDOinitLoadDetailsTS"
			},
			{
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strLoadNo","strTripSheetNo","strLoadType","strLoadCat","strOrigin","strLoadingPt","strDestination",
						 "strULoadingPt","strFromRegion","strToRegion","strSchVehNo","strSchVehCat","strSchVehConNo","strSchVehConNm",
						 "strRepVehNo","strRepVehConNo","strRepVehConNm","strDateType","dtInvoiceFromDate","dtInvoiceToDate",
						 "strBillNo","strConBillNo"						 
						],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"PDOfetchLoadDetailsTS"
			}
			
		];
		
		mainpage.screenLinks=
		{
				"finInvSumView":
				{
					"dest":"PDOFinance.PDOViewCarrierBill",
					"hdr":[
							{"src":"","dest":""}						
							],
					"grid":[
							{"src":"INVOICE_NO","dest":"strBillNo"}	//INVOICE_NO BILL_NO
							]
				}
				
			
		}		
		this.callParent(arguments);
		
	}
});
