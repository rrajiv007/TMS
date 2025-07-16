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
Ext.define('CueTrans.view.PDOFinance.PDOViewCarrierPDOSOUBill',  
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "South Diversion PDO Approval";		
		
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;
		mainpage.toolbarActions= 
		[		
		{
			"name": "Submit",
			"tooltip": "Click here to submit.",
			 msg:"Are you sure you want to submit?"
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
				plf.addHidden({"label":"No of Trips",id:"iNoTrips"}),	
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
				plf.addHidden({"label":"No of Trips",id:"iNoTrips"}),	
				plf.addDisplayOnly({"label":"No of Loads",id:"iNoLoads"}),
				plf.addDisplayOnly({"label":"Amount",id:"strAmount","weightPrecision":3})					
				
			]
		}			
		BillHdrColumn.add(BillHdrCtrl)		
		
		
		
		var LoadDetailsColumn = plf.addColumnSection({"title":""},this);
		var loadDetailsGridObj=			
		[   
			{columnname:"Print Diversion Letter",dataname:"DIV_LETTER",datatype:"string",width:130,gridReport:"PrintDivLetter",imageURL:"resources/images/gridbar/DiversionLetter.png",tooltip:"Click here to print diversion letter."},
			{columnname:"Load No",dataname:"strLoadNo",datatype:"string",width:120,hidden:true},
			{columnname:"Key Field",dataname:"KEY_FIELD",datatype:"string",width:150,hidden:true},
			{columnname:"Lane Code",dataname:"LANE_CODE",datatype:"string",width:150,hidden:true},
			{columnname:"Charge Code",dataname:"CHARGE_CODE",datatype:"string",width:150,hidden:true},
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
            {columnname:"Finance From Region",dataname:"FIN_FROM_REG",datatype:"string",width:170},
			{columnname:"Finance To Region",dataname:"FIN_TO_REG",datatype:"string",width:170},			
			{columnname:"Unloading Point",dataname:"ULD_PT",datatype:"string",width:120},
			{columnname:"Load Weight",dataname:"LOAD_WT",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Load Distance",dataname:"LOAD_DIST",datatype:"string",width:100,colAlign:'right'},
			{columnname:"Load Leg Amount",dataname:"CHARGE_AMT",datatype:"string",width:120,colAlign:'right',weightPrecision:3},			
			{columnname:"Adjustments",dataname:"ADJ",datatype:"string",width:100,colAlign:'right',weightPrecision:3},			
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:100},
			{columnname:"Total Load Leg Amount",dataname:"TOT_LOAD_LEG_AMT",datatype:"string",width:150,colAlign:'right',weightPrecision:3},
			{columnname:"Generated Date",dataname:"GEN_DATE",datatype:"string",width:120},			
			{columnname:"Contractor Bill No",dataname:"CONTRACT_BILL_NO",datatype:"string",width:170},			
			{columnname:"Operations Approval",dataname:"OPS_APP",datatype:"string",width:150},
			{columnname:"Approved By",dataname:"OPS_APP_BY",datatype:"string",width:100},
			{columnname:"Approved Date",dataname:"OPS_APP_DT",datatype:"string",width:100},
			{columnname:"PDO Approval",dataname:"PDO_APP",datatype:"string",width:120,editControl:"checkbox"},			
			{columnname:"Approved By",dataname:"PDO_APP_BY",datatype:"string",width:100},
			{columnname:"Approved Date",dataname:"PDO_APP_DT",datatype:"string",width:100},
			{columnname:"Paid to OTO",dataname:"PAID_OTO",datatype:"string",width:100},
			{columnname:"Updated By",dataname:"UPDATE_BY",datatype:"string",width:100},
			{columnname:"Updated Date",dataname:"PAID_OTO_DT",datatype:"string",width:100}
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
		
		
		
		
		var SouthDiversionColumn = plf.addCollapseSection({"title":"Summary",collapsed:false});	
		var SouthDiversionGridFieldObj=			
		[   
			{columnname:"Load Type",dataname:"GRP_SOUTHDIV",datatype:"string",width:150,hidden:true},
			{columnname:"Load Type",dataname:"LOAD_TYPE_CODE",datatype:"string",width:150,hidden:true},
			{columnname:"Bill No",dataname:"BILL_NO",datatype:"string",width:90,hidden:true},
			{columnname:"Load CAT",dataname:"LOAD_CAT",datatype:"string",width:90,hidden:true},	
			//{columnname:"From Location",dataname:"FROM_LOC",datatype:"string",width:150},
			{columnname:"Finance From Region",dataname:"FIN_FROM_REG",datatype:"string",width:100},
			//{columnname:"From Region",dataname:"FROM_REG",datatype:"string",width:100},
			//{columnname:"To Location",dataname:"TO_LOC",datatype:"string",width:100},
			//{columnname:"To Region",dataname:"TO_REG",datatype:"string",width:100},
			{columnname:"Finance To Region",dataname:"FIN_TO_REG",datatype:"string",width:100},
			//{columnname:"No. of Load Legs",dataname:"TOT_LEGS",datatype:"string",width:100},
		    {columnname:"No. of Load Legs",dataname:"TOT_LEGS",datatype:"string",width:100,linkId:"load_Leg_link",gridpopup:true,tooltip:"Click here to view load legs details."},	//{columnname:"Rate/Load",dataname:"AMT_LEGS",datatype:"string",datatype:"string",colAlign:'right',width:100,weightPrecision:3},
			{columnname:"Total Amount",dataname:"TOT_AMT",datatype:"string",width:130,colAlign:'right'}
		]
		var SouthDiversionGridDtl=			
		{
			title:"",
			id:"SouthDiversionGrid",
			detail:SouthDiversionGridFieldObj,
			visibleRow:8,
			readonly:true,
			removeAddDelete:true,
			removePaging:true,
			removeTbar:false,
			widthBasis: "Flex",
			groupByField: 'GRP_SOUTHDIV',
			columnWidth:1
		}
		var SouthDiversionGridSection = plf.addGrid(SouthDiversionGridDtl,this)		
		SouthDiversionColumn.add(SouthDiversionGridSection);			
		
		//Main Page layout starts
		mainpage.ptrMainSection.add(BillHdrColumn) 
		
		mainpage.ptrMainSection.add(SouthDiversionColumn);
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
				"methodName":"PDOinitViewPDOSOUBillTS"
			},	
			
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Submit",
				"input":["loadDetailsGrid","strBillNo"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"PDOSubViewPDOSOUBillTS"
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
				"methodName":"PDOCarBillSouthReport"
			},					
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print Detail",
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBillDtlSouthReport"
			},
			{
				"grideventid":"PrintDivLetter",
				"tasktype":"gridonprint",
				"input":["strLoadNo"],
				"service":"CoreReportService",
				"methodName":"JpPrintDiversionReport"
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
			},
			"load_Leg_link":
			{
				"dest":"PDOFinance.LoadLegsDetails",
				"popMethodName":"initFinLoadLegPopupTS",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"FIN_FROM_REG","dest":"strFromRegion"},
						{"src":"FIN_TO_REG","dest":"strToRegion"},
						{"src":"BILL_NO","dest":"strBillNo"},
						{"src":"LOAD_CAT","dest":"strLoadCat"},
						{"src":"LOAD_TYPE_CODE","dest":"strLoadType"}						
						]
			}
		}
		
		this.callParent(arguments);
		
	}
});
