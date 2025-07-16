/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	 CUETRANS																                                         
Version		  :	1.0.1
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
	                                   
************************************************************************************************/
Ext.define('CueTrans.view.PDOFinance.CoastAppViewCarrierBill', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Coastal Approval";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;
		
		mainpage.toolbarActions= 
			[
				{
					"name": "Save",
					"tooltip": "Click here to save the carrier bill details.",
					msg:"Are you sure you want to save?"
				},
				/*{
					"name": "Delete",
					"tooltip": "Click here to delete the carrier bill details."
				},*/
				{
					"name": "Submit",
					"tooltip": "Click here to submit the carrier bill details.",
					msg:"Are you sure you want to submit?"
				},
            ]
		/**/
		
		


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
				//plf.addText({"label":"Bill Period To",id:"strCarCode"}),
				plf.addDisplayOnly({"label":"No of Contractor Bills",id:"iNoCons"}),	
				plf.addHidden({"label":"No of Trips",id:"iNoTrips"}),	
				plf.addDisplayOnly({"label":"No of Loads",id:"iNoLoads"}),
				plf.addDisplayOnly({"label":"Amount",id:"strAmount"})
				//plf.addButton({"label":"Recalculate",id:"btnRecalc"})		
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
				//plf.addText({"label":"Bill Period To",id:"strCarCode"}),
				plf.addDisplayOnly({"label":"No of Contractor Bills",id:"iNoCons"}),	
				plf.addHidden({"label":"No of Trips",id:"iNoTrips"}),	
				plf.addDisplayOnly({"label":"No of Loads",id:"iNoLoads"}),
				plf.addDisplayOnly({"label":"Amount",id:"strAmount","weightPrecision":3})
				//plf.addButton({"label":"Recalculate",id:"btnRecalc"})					
				
			]
		}			
		BillHdrColumn.add(BillHdrCtrl)		
		
		var btnSearch=[
						plf.addButton({id:"btnTrip",label:"Search Trips",tooltip:"Click here to search trips.",
							"handler": function() 
							{
								parentForm.launchHlpLink("Trips")						
							}})
						];
		
		//Load Details
		
		var LoadDetailsColumn = plf.addColumnSection({"title":"Load Details"},this);	
		var loadDetailsGridObj=			
		[   
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
			
			{columnname:"Operations Approval",dataname:"OPS_APP",datatype:"string",width:150,editControl:"checkbox"},
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
			id:"loadDetailsGrid",
			detail:loadDetailsGridObj,
			visibleRow:14,
			removeAddDelete:true,
			removePaging:true,
			removeTbar:false,
			selRowProcess:"Y",
			//tool:btnSearch,
			columnWidth:1
		
		}
		var loadGridSection = plf.addGrid(loaddetGridDtl,this)
		LoadDetailsColumn.add(loadGridSection);
		
		var LoadBtnColumn = plf.addColumnSection({columnWidth:1});	
		var BtnCtrl=							
		[				
			//plf.addButton({"label":"Save","id":"btnSave"}),			
		    /*plf.addButton({"label":"Delete",id:"btnDelete"}),*/
			//plf.addButton({"label":"Submit",id:"btnSubmit"}),
			//plf.addButton({"label":"Rollback",id:"btnRollback"})
			/*plf.addButton({"label":"Print Bank Advise",id:"btnInvoice"})*/
		]
		LoadBtnColumn.add(BtnCtrl);
		LoadDetailsColumn.add(LoadBtnColumn);
		
		
		
		var OTOStandardColumn = plf.addColumnSection({"title":"OTO Standard"});	
		var OTOStandardGridFieldObj=			
		[   
			{columnname:"Load Type",dataname:"GRP_OTOSTD",datatype:"string",width:150,hidden:true},
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
			{columnname:"No. of Load Legs",dataname:"TOT_LEGS",datatype:"string",width:100,linkId:"load_Leg_link",gridpopup:true,tooltip:"Click here to view load legs details."},
			//{columnname:"Rate/Load",dataname:"AMT_LEGS",datatype:"string",datatype:"string",colAlign:'right',width:100},
			{columnname:"Total Amount",dataname:"TOT_AMT",datatype:"string",width:130,colAlign:'right'}
			
		]
		var OTOStandardGridDtl=			
		{
			title:"",
			id:"OTOStandardGrid",
			detail:OTOStandardGridFieldObj,
			visibleRow:8,
			readonly:true,
			removeAddDelete:true,
			removePaging:true,
			removeTbar:false,
			widthBasis: "Flex",
			groupByField: 'GRP_OTOSTD',
			columnWidth:1
		}
		var OTOStandardGridSection = plf.addGrid(OTOStandardGridDtl,this)		
			OTOStandardColumn.add(OTOStandardGridSection);	
		
		var OTOColumn = plf.addColumnSection({columnWidth:1});	
		var OTOBtnCtrl=							
		[	
			plf.addBlank({}),	
			plf.addBlank({}),							
		    plf.addButton({"label":"Print Summary",id:"OTOPrint"}),												
			plf.addButton({"label":"Print Detail",id:"OTODtlPrint"}),		
			plf.addBlank({})
		]
		OTOColumn.add(OTOBtnCtrl);
		OTOStandardColumn.add(OTOColumn);
		
		var SumitomoColumn = plf.addColumnSection({"title":"Sohar Sumitomo"});	
		var SumitomoGridFieldObj=			
		[   
			{columnname:"Load Type",dataname:"GRP_SUMITOMO",datatype:"string",width:150,hidden:true},
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
			{columnname:"No. of Load Legs",dataname:"TOT_LEGS",datatype:"string",width:100,linkId:"load_Leg_link",gridpopup:true,tooltip:"Click here to view load legs details."},
			//{columnname:"Rate/Load",dataname:"AMT_LEGS",datatype:"string",datatype:"string",colAlign:'right',width:100},
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
		
		var SumiBtnColumn = plf.addColumnSection({columnWidth:1});	
		var SumiBtnCtrl=							
		[	
			plf.addBlank({}),	
			plf.addBlank({}),							
		    plf.addButton({"label":"Print Summary",id:"SumitoPrint"}),												
			plf.addButton({"label":"Print Detail",id:"SumitoDtlPrint"}),	
			plf.addBlank({})
		]
		SumiBtnColumn.add(SumiBtnCtrl);
		SumitomoColumn.add(SumiBtnColumn);
		//Dquam sumito start
		var DuqmSumitomoColumn = plf.addColumnSection({"title":"Duqm Sumitomo"});	
		var DuqmSumitomoGridFieldObj=			
		[   
			{columnname:"Load Type",dataname:"GRP_DUQMSUMITOMO",datatype:"string",width:150,hidden:true},
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
			{columnname:"No. of Load Legs",dataname:"TOT_LEGS",datatype:"string",width:100,linkId:"load_Leg_link",gridpopup:true,tooltip:"Click here to view load legs details."},
			//{columnname:"Rate/Load",dataname:"AMT_LEGS",datatype:"string",datatype:"string",colAlign:'right',width:100},
			{columnname:"Total Amount",dataname:"TOT_AMT",datatype:"string",width:130,colAlign:'right'}
		]
		var DuqmSumitomoGridDtl=			
		{
			title:"",
			id:"DuqmSumitomoGrid",
			detail:DuqmSumitomoGridFieldObj,
			visibleRow:8,
			readonly:true,
			removeAddDelete:true,
			removePaging:true,
			removeTbar:false,
			widthBasis: "Flex",
			groupByField: 'GRP_DUQMSUMITOMO',
			columnWidth:1
		}
		var DuqmSumitomoGridSection = plf.addGrid(DuqmSumitomoGridDtl,this)		
			DuqmSumitomoColumn.add(DuqmSumitomoGridSection);	
		
		var DuqmSumiBtnColumn = plf.addColumnSection({columnWidth:1});	
		var DuqmSumiBtnCtrl=							
		[	
			plf.addBlank({}),	
			plf.addBlank({}),							
		    plf.addButton({"label":"Print Summary",id:"DuqmSumitoPrint"}),	
			plf.addButton({"label":"Print Detail",id:"DuqmSumitodtlPrint"}),						
			plf.addBlank({})
		]
		DuqmSumiBtnColumn.add(DuqmSumiBtnCtrl);
		DuqmSumitomoColumn.add(DuqmSumiBtnColumn);
		//Dquam Sumitomo end
		//SAFA Loads start
		var SafaLoadColumn = plf.addColumnSection({"title":"Safa Loads"});	
		var SafaLoadGridFieldObj=			
		[   
			{columnname:"Load Type",dataname:"GRP_SAFALOADS",datatype:"string",width:150,hidden:true},
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
			{columnname:"No. of Load Legs",dataname:"TOT_LEGS",datatype:"string",width:100,linkId:"load_Leg_link",gridpopup:true,tooltip:"Click here to view load legs details."},
			//{columnname:"Rate/Load",dataname:"AMT_LEGS",datatype:"string",datatype:"string",colAlign:'right',width:100},
			{columnname:"Total Amount",dataname:"TOT_AMT",datatype:"string",width:130,colAlign:'right'}
		]
		var SafaLoadGridDtl=			
		{
			title:"",
			id:"SafaLoadsGrid",
			detail:SafaLoadGridFieldObj,
			visibleRow:8,
			readonly:true,
			removeAddDelete:true,
			removePaging:true,
			removeTbar:false,
			widthBasis: "Flex",
			groupByField: 'GRP_SAFALOADS',
			columnWidth:1
		}
		var SafaLoadGridSection = plf.addGrid(SafaLoadGridDtl,this)		
			SafaLoadColumn.add(SafaLoadGridSection);	
		
		var SafaLoadBtnColumn = plf.addColumnSection({columnWidth:1});	
		var SafaLoadBtnCtrl=							
		[	
			plf.addBlank({}),	
			plf.addBlank({}),							
		    plf.addButton({"label":"Print Summary",id:"SafaLoadPrint"}),	
			plf.addButton({"label":"Print Detail",id:"SafaLoaddtlPrint"}),						
			plf.addBlank({})
		]
		SafaLoadBtnColumn.add(SafaLoadBtnCtrl);
		SafaLoadColumn.add(SafaLoadBtnColumn);
		//SAFA Loads Ends
		
		/*var baseTab = plf.addTabSection({columnWidth:1,tabs:[LoadDetailsColumn,LoadSummaryColumn,OTOStandardColumn,SumitomoColumn,DuqmSumitomoColumn,NorthDiversionColumn,SouthDiversionColumn,ContractorColumn]});*/
		var baseTab = plf.addTabSection({columnWidth:1,tabs:[LoadDetailsColumn,OTOStandardColumn,SumitomoColumn,DuqmSumitomoColumn,SafaLoadColumn]});
		
		//Main Page layout starts
		mainpage.ptrMainSection.add(BillHdrColumn) 
		mainpage.ptrMainSection.add(baseTab) 
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
				"methodName":"initViewCostalAppBillTS"// PDOinitViewCarBillTS
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Submit",
				"input":["strBillNo"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"PDOSubmitCoastOTOBillTS"
			},
			{       
				"controlid":"btnRecalc",
				"tasktype":"btnclick",				
				"input":[/*"loadDetailsGrid",*/"strBillNo"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"PDORecalcViewCarBillTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",	
				"action":"Save",
				"input":["loadDetailsGrid","strBillNo"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"PDOSubCoastOTOBillTS"
			},
			{       
				"controlid":"btnDelete",
				"tasktype":"btnclick",				
				"input":["loadDetailsGrid","strBillNo"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"PDODelViewCarBillTS"
			},
			{       
				"controlid":"btnRollback",
				"tasktype":"btnclick",				
				"input":["loadDetailsGrid","strBillNo"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"PDORollbackCarBillTS"
			},
			/*{       
				"controlid":"btnSubmit",
				"tasktype":"btnclick",				
				"input":["loadDetailsGrid","strBillNo"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"PDOSubViewCarBillTS"
			},*/
			{       
				"controlid":"btnInvoice",
				"tasktype":"btnclick",				
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBillInvoiceReport"
			},			
			{
				
					"tasktype":"proto",
					"filename":"PDOFinance/PDOViewCarrierBill.json"
			},
			{       
				"controlid":"LoadTypePrint",
				"tasktype":"btnclick",				
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBillLoadReport"
			},
			{       
				"controlid":"LoadTypeDtlPrint",
				"tasktype":"btnclick",				
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBillDtlLoadReport"
			},
			
			{       
				"controlid":"OTOPrint",
				"tasktype":"btnclick",				
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBillOTOReport"
			},
			{       
				"controlid":"OTODtlPrint",
				"tasktype":"btnclick",				
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBillDtlOTOReport"
			},
			
			{       
				"controlid":"SumitoPrint",
				"tasktype":"btnclick",				
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBillSumiReport"
			},
			{       
				"controlid":"SumitoDtlPrint",
				"tasktype":"btnclick",				
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBillDtlSumiReport"
			},
			{       
				"controlid":"DuqmSumitoPrint",
				"tasktype":"btnclick",				
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBilDuqmSumiReport"
			},
			{       
				"controlid":"DuqmSumitodtlPrint",
				"tasktype":"btnclick",				
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBillDtlDuqmReport"
			},
			
			{       
				"controlid":"NorthPrint",
				"tasktype":"btnclick",				
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBillNorthReport"
			},
				{       
				"controlid":"NorthDtlPrint",
				"tasktype":"btnclick",				
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBillDtlNorthReport"
			},
			{       
				"controlid":"SouthPrint",
				"tasktype":"btnclick",				
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBillSouthReport"
			},
			{       
				"controlid":"SouthDtlPrint",
				"tasktype":"btnclick",				
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBillDtlSouthReport"
			},
			{       
				"controlid":"ContractorPrint",
				"tasktype":"btnclick",				
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBillCONTRReport"
			},
			{       
				"controlid":"ContractorDtlPrint",
				"tasktype":"btnclick",				
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBillDtlCONTRReport"
			},
			{       
				"controlid":"SafaLoadPrint",
				"tasktype":"btnclick",				
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBillSafaReport"
			},
			{       
				"controlid":"SafaLoaddtlPrint",
				"tasktype":"btnclick",				
				"input":["strBillNo"],
				"service":"CoreReportService",
				"methodName":"PDOCarBillDtlSafaReport"
			}

			
		];
		
		
		mainpage.screenLinks=
		{
		
			"finContView":
				{
					"dest":"PDOFinance.PDOContractBillDetails",
					"hdr":[
							{"src":"","dest":""}						
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
							{"src":"CONTRACT_RMKS","dest":"strContractRemarks"}
						   ]
				}	
		
		}
		
		mainpage.hlpLinks=
		{
			"Trips":
				{
					"hlpType":"hdrgrid",
					"gridID":"loadDetailsGrid",
					"hlpScreen":"PDOFinance.TripHelp",
					"send":[
								{"parent":"strBillNo","child":"strBillNo"}				
						   ],
					"receive":[
							
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
