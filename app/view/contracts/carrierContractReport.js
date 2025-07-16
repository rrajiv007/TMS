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
Ext.define('CueTrans.view.contracts.carrierContractReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Carrier Contract Report";
		
		
		
		//Help on Customer Search Section Begins
		plf.columns=3
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var inspectionReportsColumn = plf.addColumnSection({});		//69997
		
		var inspectionReportsFormCtrl=								//69997
		[
			plf.addDate({"label":"Contract Date From",id:"dtContractDateFrom"}),
			plf.addDate({"label":"Contract Date To",id:"dtContractDateTo"}),
			plf.addCombo({"label":"Date Range",id:"strDateRange"}),
			
			plf.addHlpText({"label":"Contract No From",id:"strContractNoFrom",hlpLinkID:"contractFrom"},this),
			plf.addHlpText({"label":"Contract No To",id:"strContractNoTo",hlpLinkID:"contractTo"},this),
			plf.addCombo({"label":"Contract Status",id:"strStatus"}),
			plf.addListEdit({"label":"Carrier Name",id:"strCarrierName",keyField:"strCarrierCode",inputFormat:"string",InputLength:"100"},this),
			plf.addHlpText({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"carrierCode",inputFormat:"string",InputLength:"40"},this),
			
			plf.addCombo({"label":"Contract Type",id:"strContractType"}),
			plf.addListEdit({"label":"Buyer Name",id:"strBuyerName",keyField:"strBuyerCode",inputFormat:"string",InputLength:"100"},this),
			plf.addHlpText({"label":"Buyer Code",id:"strBuyerCode",hlpLinkID:"buyerCode",inputFormat:"string",InputLength:"40"},this),
			
			plf.addText({"label":"Quotation No",id:"strQuotationNo",inputFormat:"string",InputLength:"60"}),
			
			plf.addDate({"label":"Effective From Date",id:"dtEffectiveFrom"}),
			plf.addDate({"label":"Effective To Date",id:"dtEffectiveTo"})
			/*plf.addCombo({"label":"Report Name",id:"strReportName"})*/
			
		  
				
		]
		
		inspectionReportsColumn.add(inspectionReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		inspectionReportsButtonColumn = plf.addColumnSection({});
		inspectionReportsFormCtrl=
		[
		  plf.addButton({"label":"Status Summary","id":"btnStatusSummary"}),
		  plf.addButton({"label":"Contract Details","id":"btnContractDetails"}),
		  plf.addButton({"label":"Print Contract","id":"btnPrintContract"}),
		  plf.addButton({"label":"Tariff Details","id":"btnTariffDetails"})
		
		
		]	
		
		inspectionReportsButtonColumn.add(inspectionReportsFormCtrl)
		mainpage.ptrMainSection.add(inspectionReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(inspectionReportsButtonColumn) //Add buttons to Main Page
		
	   mainpage.hlpLinks=
		{
			
				"contractFrom":
				{
					"hlpType":"Header",
					"hlpScreen":"contracts.HelpOnCarrierContracts",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strContractNoFrom","child":"CAR_CONT_NO"}
							]
				},
				"contractTo":
				{
					"hlpType":"Header",
					"hlpScreen":"contracts.HelpOnCarrierContracts",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strContractNoTo","child":"CAR_CONT_NO"}
							]
				},
				"carrierCode":
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
			
				"buyerCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.EmployeeHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strBuyerCode","child":"EMPLOYEE_CODE"}
							]
				}
			
		}
		
		mainpage.eventHandlers = 
		[			
			{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreCarrierContract",
					"methodName":"initCarrierContractSummaryTS"
			},
			{       
				"controlid":"btnStatusSummary",
				"tasktype":"btnclick",
				"input":["strContractNoFrom","strContractNoTo","strCarrierCode","strCarrierName","dtContractDateFrom","dtContractDateTo","strDateRange","strBuyerCode","strBuyerName","strContractType","strStatus","strQuotationNo","dtEffectiveFrom","dtEffectiveTo"],
				"service":"CoreCarrierContract",
				"methodName":"getStatusCountTSReport"
			},
			
			{       
				"controlid":"btnContractDetails",
				"tasktype":"btnclick",
				"input":["strContractNoFrom","strContractNoTo","strCarrierCode","strCarrierName","dtContractDateFrom",
						"dtContractDateTo","strDateRange","strBuyerCode","strBuyerName","strStatus","strContractType",
						"strQuotationNo","dtEffectiveFrom","dtEffectiveTo"],
				"service":"CoreCarrierContract",
				"methodName":"getContractDetailsReport"
			},
			
			{       
				"controlid":"btnPrintContract",
				"tasktype":"btnclick",
				"input":["strContractNoFrom","strContractNoTo","strCarrierCode","strCarrierName","dtContractDateFrom",
						"dtContractDateTo","strDateRange","strBuyerCode","strBuyerName","strStatus","strContractType",
						"strQuotationNo","dtEffectiveFrom","dtEffectiveTo"],
				"service":"CoreCarrierContract",
				"methodName":"getPrintCarrierReport"
			},			
			{       
				"controlid":"btnTariffDetails",
				"tasktype":"btnclick",
				"input":["strContractNoFrom","strContractNoTo","strCarrierCode","strCarrierName","dtContractDateFrom",
						"dtContractDateTo","strDateRange","strBuyerCode","strBuyerName","strStatus","strContractType",
						"strQuotationNo","dtEffectiveFrom","dtEffectiveTo"],
				"service":"CoreCarrierContract",
				"methodName":"getCarTariffDetailsTSReport"
			}
		];
		
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	
			
});
