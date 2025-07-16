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
Ext.define('CueTrans.view.PDOFinance.PDOContractBillDetails', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Contractor Bill Details";
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;
        
		mainpage.toolbarActions= 
			[
				{
					"name": "Pay",
					"tooltip": "Click here to Pay the contract bill details."
				},
				{
					"name": "Print",
					"tooltip": "Click here to print the contract bill details."
				}
            ]
			
		plf.columns = 4
		var finInvSumHdrCollapse = plf.addColumnSection({});		//69995
		
		var finInvSumFormCtrl=					//69995
		[
			plf.addDisplayOnly({"label":"Contractor Bill No",id:"strConBillNo"}),
			//plf.addDisplayOnly({"label":"Contractor Bill No",id:"strLoadNo"}),
			plf.addHidden({"label":"Bill No",id:"strBillNo"}),
			plf.addDisplayOnly({"label":"Generated Date",id:"dtGenDate"}),
			plf.addDisplayOnly({"label":"Bill Amount",id:"iBillAmt",weightPrecision:3}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addDisplayOnly({"label":"Contract No",id:"strContractNo"}),
			plf.addDisplayOnly({"label":"Contractor Name",id:"strContractNm"}), 
			plf.addDisplayOnly({"label":"Vehicle Regn No",id:"strVehCode"}),
			plf.addDisplayOnly({"label":"No of Trips Processed",id:"iNoofTrips"}),
			plf.addDisplayOnly({"label":"No of Loads Processed",id:"iNoofLoads"}),
			plf.addText({"label":"Contractor Bill Remarks",id:"strContractRemarks",width:130}),
			plf.addHidden({"label":"Contractor Bill No",id:"strLoadNo"})
			
		]
		
		finInvSumHdrCollapse.add(finInvSumFormCtrl);
		
		/*
		var finInvText = plf.addColumnSection({columnWidth:1,height:75});
		var finInvtextFormCtrl=					//69995
		[
			plf.addTextArea({"label":"Contractor Remarks",id:"strContractRemarks",height:50,width:150}),
			
		]
	
		finInvText.add(finInvtextFormCtrl);
		*/
		var finInvSumGridFieldObj=			//69995
		[
			{columnname:"Contractor Bill No",dataname:"KEY_FIELD",datatype:"string",width:250},
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
			/*
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:150,hidden:true},
			{columnname:"Trip Amount",dataname:"TRIP_AMT",datatype:"string",width:150,hidden:true},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:150},
			{columnname:"Scheduled Date",dataname:"SCH_DT",datatype:"string",width:150},
			{columnname:"Load Type",dataname:"LOAD_TYPE",datatype:"string",width:150},
			{columnname:"Loading Point",dataname:"LD_PT",datatype:"string",datatype:"string",width:100},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Finance Region From",dataname:"FIN_FROM",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DEST",datatype:"string",width:150},
			{columnname:"Finance Region To",dataname:"FIN_TO",datatype:"string",width:150},
			{columnname:"Load Weight",dataname:"LOAD_WT",datatype:"string",width:130,colAlign:'right',weightPrecision:3},
			{columnname:"Load Distance",dataname:"LOAD_DIST",datatype:"string",width:150,colAlign:'right',weightPrecision:1},
			{columnname:"Load Leg Amount",dataname:"LEG_AMT",datatype:"string",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Adjustments",dataname:"ADJ",datatype:"string",width:200,colAlign:'right',weightPrecision:3},
			{columnname:"Total Load Leg Amount",dataname:"TOT_LOAD_LEG_AMT",datatype:"string",width:150,colAlign:'right',weightPrecision:3},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:130},
			{columnname:"Approved",dataname:"APPROVED",datatype:"string",width:130},
			{columnname:"Approved By",dataname:"APPROVED_BY",datatype:"string",width:130},
			*/
			
		]
		var finInvSumGridDtl=			//69995
		{
			title:"",
			id:"SumloadDetailsGrid",
			detail:finInvSumGridFieldObj,
			visibleRow:9,
			removeAddDelete:true,
			removePaging:true,
			removeTbar:false,
			columnWidth:1,
			selRowProcess:"Y"
		}
		
		//charge Grid Section Ends
		
		//Add Child Sections
	
		mainpage.ptrMainSection.add(finInvSumHdrCollapse)//Add Header Section to Main Page
		//mainpage.ptrMainSection.add(finInvText)
		var InvSumSection=plf.addGrid(finInvSumGridDtl,this)			//69995
		mainpage.InvSumGridPtr = InvSumSection
		mainpage.ptrMainSection.add(InvSumSection) 
		
	// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strConBillNo","strVehCode","strBillNo"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"PDOinitContractBillTS"
			},/*
			{
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strInvoiceFrom","dtInvoiceDesc","strStatus","dtInvoiceFromDate","dtInvoiceToDate"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"fetchPDOCarSummaryTS"
			}
			*/
			
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print",
				"input":["strLoadNo"],
				"service":"CoreReportService",
				"methodName":"PrintCarrierBillReport"
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Pay",
				"input":["strBillNo","strContractRemarks","strConBillNo","SumloadDetailsGrid"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"PDOSAVECONTBILLTS"
			},
			{
				
					"tasktype":"proto",
					"filename":"PDOFinance/PDOContractBillDetails.json"
			}
		
		];
		
		mainpage.hlpLinks=
		{
		
			
		
		}
	
		mainpage.screenLinks=
		{
			
			
				
			
		}
		
		this.callParent(arguments);
		
	}
});
