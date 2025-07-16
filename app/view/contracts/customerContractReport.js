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
Ext.define('CueTrans.view.contracts.customerContractReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Customer Contract Report";
		
		
		
		//Help on Customer Search Section Begins
		plf.columns=3
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var inspectionReportsColumn = plf.addColumnSection({});			//69997 
		
		var inspectionReportsFormCtrl=					//69997 
		[
			plf.addDate({"label":"Contract Date From",id:"dtContractDateFrom"}),
			plf.addDate({"label":"Contract Date To",id:"dtContractDateTo"}),
			plf.addCombo({"label":"Date Range",id:"strDateRange"}),
			
			plf.addHlpText({"label":"Contract No From",id:"strContractNoFrom",hlpLinkID:"contract"},this),
			plf.addHlpText({"label":"Contract No To",id:"strContractNoTo",hlpLinkID:"contract"},this),
			plf.addCombo({"label":"Contract Status",id:"strStatus"}),
			
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"customerCode"},this),
			plf.addText({"label":"Customer Name",id:"strCustomerName"}),
			plf.addCombo({"label":"Contract Type",id:"strContractType"}),
			
			plf.addHlpText({"label":"Sales Person Code",id:"strSalesPersonCode",hlpLinkID:"salesPersonCode"},this),
			plf.addText({"label":"Sales Person Name",id:"strSalesPersonName"}),
			plf.addText({"label":"Quotation No",id:"strQuotationNo"}),
			
			plf.addDate({"label":"Effective From Date",id:"dtEffectiveFrom"}),
			plf.addDate({"label":"Effective To Date",id:"dtEffectiveTo"})
			/*plf.addCombo({"label":"Report Name",id:"strReportName"})*/
			
		  
				
		]
		
		inspectionReportsColumn.add(inspectionReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var inspectionReportsButtonColumn = plf.addColumnSection({});		//69997 
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
			"contract":
				{
					"hlpType":"Header",
					"hlpScreen":"contracts.CustomerContractHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{}
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
				},
			
				"salesPersonCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.EmployeeHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strSalesPersonCode","child":"EMPLOYEE_CODE"}
							]
				}
			
		}
		
		mainpage.eventHandlers = 
		[			
			{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreCustomerContract",
					"methodName":"initCustomerContractTS"
			},
			{       
				"controlid":"btnStatusSummary",
				"tasktype":"btnclick",
				"input":["strContractNoFrom","strContractNoTo","strCustomerCode","strCustomerName","dtContractDateFrom","dtContractDateTo","strDateRange",				   "strSalesPersonCode","strStatus","strSalesPersonName","strContractType","dtEffectiveFrom","dtEffectiveTo","strQuotationNo"],
				"service":"CoreCustomerContract",
				"methodName":"getStatusCountTSReport"
			},
			
						{       
				"controlid":"btnContractDetails",
				"tasktype":"btnclick",
				"input":["strContractNoFrom","strContractNoTo","strCustomerCode","strCustomerName","dtContractDateFrom",
				"dtContractDateTo","strDateRange","strSalesPersonCode","strSalesPersonName",
				"strStatus","strContractType","strQuotationNo","dtEffectiveFrom","dtEffectiveTo"
				],
				"service":"CoreCustomerContract",
				"methodName":"getContractDetailsReport"
			},
			
						{       
				"controlid":"btnPrintContract",
				"tasktype":"btnclick",
				"input":["strContractNoFrom","strContractNoTo","strCustomerCode","strCustomerName","dtContractDateFrom",
				"dtContractDateTo","strDateRange","strSalesPersonCode","strSalesPersonName",
				"strStatus","strContractType","strQuotationNo","dtEffectiveFrom","dtEffectiveTo"
				],
				"service":"CoreCustomerContract",
				"methodName":"getPrintContractReport"
			},
			
						{       
				"controlid":"btnTariffDetails",
				"tasktype":"btnclick",
				"input":["strContractNoFrom","strContractNoTo","strCustomerCode","strCustomerName","dtContractDateFrom",
				"dtContractDateTo","strDateRange","strSalesPersonCode","strSalesPersonName",
				"strStatus","strContractType","strQuotationNo","dtEffectiveFrom","dtEffectiveTo"],
				"service":"CoreCustomerContract",
				"methodName":"getCustTariffDetailsReport"
			},				
			
	   ];
		
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	
			
});
