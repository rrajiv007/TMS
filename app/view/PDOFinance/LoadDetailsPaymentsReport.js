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
Ext.define('CueTrans.view.PDOFinance.LoadDetailsPaymentsReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function() 
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Load Details for Payments";
		mainpage.toolbarSectionFlag=true;
        
			
		plf.columns = 4
		var LoadDetPaySumHdrCollapse = plf.addCollapseSection({title:"Search Criteria", collapsed:false,btnID:"searchBtn"},this);		//69995
		
		var LoadDetPaySumFormCtrl=					//69995
		[
		
			plf.addText({"label":"Load No",id:"strLoadNo"}),
			plf.addCombo({"label":"Date Type",id:"strPeriodFrequency"}),
			plf.addDate({"label":"Date From",id:"dtTripDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtTripDateTo"}),
			plf.addText({"label":"Carrier Bill No",id:"strBillNo"}),
			plf.addCombo({"label":"Load Category",id:"strCostType"}),
			plf.addText({"label":"Contract No",id:"strContractNo"}),
			plf.addText({"label":"Vehicle No",id:"strVehCode"})/*,
			plf.addText({"label":"Trip No",id:"strTripSheetNo"}),
			plf.addCombo({"label":"Load Type",id:"strLoadType"}),
			
			
			plf.addCombo({"label":"Origin",id:"strOrigin"}), 
			plf.addCombo({"label":"Loading Point",id:"strLoadingPt"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addCombo({"label":"Unloading Point",id:"strULoadingPt"}),
			
			plf.addCombo({"label":"From Region",id:"strFromRegion"}),
			plf.addCombo({"label":"To Region",id:"strToRegion"}),
			
			plf.addCombo({"label":"Sch. Vehicle Category",id:"strSchVehCat"}),
			
			
			plf.addText({"label":"Sch. Contractor Name",id:"strSchVehConNm"}),
			plf.addText({"label":"Rep. Vehicle No",id:"strRepVehNo"}),
			plf.addText({"label":"Rep. Contract No",id:"strRepVehConNo"}),
			
			plf.addText({"label":"Rep. Contractor Name",id:"strRepVehConNm"}),
			
			
			
			plf.addText({"label":"Contractor Bill No",id:"strConBillNo"})*/
			
			
		]
		
		LoadDetPaySumHdrCollapse.add(LoadDetPaySumFormCtrl);
	
		
		
		var LoadDetPaySumGridFieldObj=			
		[
		
			{columnname:"Print Contractor Bill",dataname:"CONTRACT_BILL",datatype:"string",width:130,gridReport:"PrintPayContractorbill",imageURL:"resources/images/shared/calendar.gif",tooltip:"Click here to Contractor bill."},
			/*{columnname:"Print WayBill",dataname:"WAYBILL",datatype:"string",width:130,gridReport:"PrintWaybill",imageURL:"resources/images/grid/Journey/Grid_Replan.png",tooltip:"Click here to print waybill."},
			{columnname:"Print journey plan.",dataname:"JP_REPORT",datatype:"string",width:130,gridReport:"PrintJPReport",imageURL:"resources/images/grid/Journey/Grid_Re_Create.png",tooltip:"Click here to print journey plan report."},
			{columnname:"Print Diversion Letter",dataname:"DIV_LETTER",datatype:"string",width:130,gridReport:"PrintDivLetter",imageURL:"resources/images/gridbar/DiversionLetter.png",tooltip:"Click here to print diversion letter."},
			{columnname:"Print Release Letter",dataname:"REL_LETTER",datatype:"string",width:130,gridReport:"PrintRelLetter",imageURL:"resources/images/gridbar/OTOReleaseLetter.png",tooltip:"Click here to print release letter."},
			{columnname:"JP No",dataname:"strJourneyPlanNo",datatype:"string",width:120,hidden:true},
			{columnname:"Load No",dataname:"strLoadNo",datatype:"string",width:120,hidden:true},*/
			{columnname:"Carrier Bill ID",dataname:"BILL_NO",datatype:"string",width:"auto"},
			{columnname:"Carrier Bill Description",dataname:"BILL_DESC",datatype:"string",width:"auto"},
			{columnname:"Carrier Bill Period",dataname:"BILL_PERIOD",datatype:"string",width:"auto"},
			{columnname:"Carrier Bill Status",dataname:"STATUS",datatype:"string",datatype:"string",width:"auto"},
			{columnname:"Contractor Bill No",dataname:"KEY_FIELD",datatype:"string",width:"auto"},
			{columnname:"Contractor Bill No",dataname:"strRef",datatype:"string",width:"auto",hidden:true},
			{columnname:"Load No",dataname:"strDocNo",datatype:"string",width:120,hidden:true},		
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:"auto"},		
			{columnname:"Load Closure Date",dataname:"LOAD_CLS_DT",datatype:"string",width:"auto"},
			{columnname:"Load Category",dataname:"LOAD_CAT",datatype:"string",width:"auto"},
			{columnname:"Load Type",dataname:"LOAD_TYPE",datatype:"string",width:"auto"},
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:"auto"},
			{columnname:"Trip Closure Date",dataname:"TRIP_CLS_DT",datatype:"string",width:"auto"},
			{columnname:"Journey Plan No",dataname:"JOURNEY_PLAN_NO",datatype:"string",width:"auto"},
			{columnname:"Scheduled Vehicle Category",dataname:"SCH_CAT",datatype:"string",width:"auto"},
			{columnname:"Scheduled Vehicle No",dataname:"VEH_CODE",datatype:"string",width:"auto"},
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:"auto"},			
			{columnname:"Contractor Name",dataname:"CONTRACTOR_NAME",datatype:"string",width:"auto"},
			{columnname:"Origin",dataname:"ORG",datatype:"string",width:"auto"},
			{columnname:"Finance From Region",dataname:"FIN_FROM_REG",datatype:"string",width:"auto"},
			{columnname:"Loading Point",dataname:"PICK_AT",datatype:"string",width:"auto"},
			{columnname:"Destination",dataname:"DEST",datatype:"string",width:"auto"},			
			{columnname:"Finance To Region",dataname:"FIN_TO_REG",datatype:"string",width:"auto"},
			{columnname:"Unloading Point",dataname:"DELV_AT",datatype:"string",width:"auto"}, 
			{columnname:"Amount",dataname:"CHARGE_AMT",datatype:"string",width:"auto",colAlign:'right',weightPrecision:3},
			{columnname:"Payment Status",dataname:"PAYMENT_STATUS",datatype:"string",width:"auto"},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:"auto",editControl:"textbox"},
			{columnname:"Actual Weight",dataname:"ACTUAL_WEIGHT",datatype:"string",width:"auto",colAlign:'right',weightPrecision:3},
			{columnname:"Total Load Weight (ton)",dataname:"TOTAL_LOAD_WEIGHT",datatype:"string",width:"auto",colAlign:'right',weightPrecision:3},	
			{columnname:"Departure Date",dataname:"DEPARTURE_DATE",datatype:"string",width:"auto"},
			{columnname:"Delivered Date",dataname:"DELIVERED_DATE",datatype:"string",width:"auto"},
			{columnname:"Load status",dataname:"LOAD_STATUS",datatype:"string",width:"auto"},
			{columnname:"Load Remarks",dataname:"LOAD_REMARKS",datatype:"string",width:"auto"},
			{columnname:"Special Trailer",dataname:"SPECIAL_TRAILER",datatype:"string",width:"auto"}
			
			
		]
		var LoadDetPaySumGridDtl=			
		{
			title:"",
			id:"loadDetailsGrid",
			detail:LoadDetPaySumGridFieldObj,
			visibleRow:13,
			readonly:true,
			removeAddDelete:true
		}
		
		//charge Grid Section Ends
		
		//Add Child Sections
	
		mainpage.ptrMainSection.add(LoadDetPaySumHdrCollapse)//Add Header Section to Main Page
		var LoadDetPaySumSection=plf.addGrid(LoadDetPaySumGridDtl,this)			
		mainpage.LoadDetPaySumGridPtr = LoadDetPaySumSection
		mainpage.ptrMainSection.add(LoadDetPaySumSection) 
		
	// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[	
			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"initLoadDetPayDetails"
			},
			{
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strBillNo","strLoadNo","strCostType","strContractNo","strVehCode","strPeriodFrequency",
				         "dtTripDateFrom","dtTripDateTo"						 
						],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"fetchLoadDetPayDetails"
			},
			{
				"grideventid":"PrintPayContractorbill",
				"tasktype":"gridonprint",
				"input":["strRef","strDocNo"],
				"service":"CoreReportService",
				"methodName":"PrintCarrierBillMLReport"
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
