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
Ext.define('CueTrans.view.contracts.CustomerContractHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.screenName = "Help on Customer Contracts";
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();		
		
		
		var formCtrl=[];
		plf.columns=3
		var customerContractSummaryColumn =  plf.addColumnSection({collapsed: false});	//69997 
		
		
		var customerContractSummaryFormCtrl=						//69997 
		[
			plf.addText({"label":"Contract No",id:"strContractNoFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Contract No To",id:"strContractNoTo"}),
			plf.addText({"label":"Contract Description","id":"strContractDesc"}),
			
			plf.addDate({"label":"Contract Date From","id":"dtContractDateFrom"}),
			plf.addDate({"label":"Contract Date To","id":"dtContractDateTo"}),
			plf.addCombo({"label":"Status","id":"strStatus"}),
			
			plf.addText({"label":"Customer Code","id":"strCustomerCode"}),
			plf.addText({"label":"Customer Name","id":"strCustomerName"}),
			plf.addCombo({"label":"Contract type","id":"strContractType"}),
			plf.addText({"label":"Quotation No","id":"strQuotationNo"}),
			plf.addText({"label":"Sales Person Code","id":"strSalesPersonCode"}),
			plf.addText({"label":"Sales Person Name","id":"strSalesPersonName"}),
			plf.addBlank(),
			plf.addButton({"label":"Search","id":"searchBtn"})
		
		]
		
		customerContractSummaryColumn.add(customerContractSummaryFormCtrl);
		
		
		var customerContractSummaryObj=											//69997 
		[
			{columnname:"Contract No",dataname:"CUST_CONT_NO",datatype:"string",width:120},
			{columnname:"Contract<br>Date",dataname:"CONTRACT_DATE",datatype:"string",width:70},
			{columnname:"Customer<br>Code",dataname:"CUSTOMER_CODE",datatype:"string",width:100},
			{columnname:"Customer<br>Name",dataname:"CUSTOMER_NAME",datatype:"string",width:150},
			{columnname:"Contract<br>Description",dataname:"CONTRACT_DESC",datatype:"string",width:140},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:75},
			{columnname:"Contract<br>Type",dataname:"CONTRACT_TYPE",datatype:"string",width:100},
			{columnname:"Quotation<br>No",dataname:"QUOTATION_NO",datatype:"string",width:70},
			{columnname:"Sales Person<br>Code",dataname:"SALES_PERSON_CODE",datatype:"string",width:80},
			{columnname:"Sales Person<br>Name",dataname:"SALES_PERSON_NAME",datatype:"string",width:80}
		]
		var customerContractSummaryGridDetail=												//69997 
		{
			title:"",
			id:"custContGrid",
			detail:customerContractSummaryObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
			
		}
		var helpGridSection=plf.addGrid(customerContractSummaryGridDetail,this)						//69997 
		mainpage.hlpSearchGridPtr = helpGridSection		
		//customerContractSummaryGridSection = plf.addGrid(customerContractSummaryGridDetail)	
		
		
		
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(customerContractSummaryColumn)
		mainpage.ptrMainSection.add(helpGridSection) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		
			mainpage.eventHandlers = 
			[
               {
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TARCoreTariffServiceTS",
				"methodName":"initCustomerContractTS"
				},
			{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strContractNoFrom","dtContractDateFrom","dtContractDateTo","strCustomerCode","strCustomerName","strContractDesc","strStatus","strContractType","strQuotationNo","strSalesPersonCode","strSalesPersonName"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchCustomerContractsTS"
			}
		
			             
			];
	/*	mainpage.screenLinks=
		{
			
				"Create":
				{
					"dest":"contracts.CustomerContracts",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"contractsmaster":
				{
					"dest":"contracts.CustomerContracts",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"CUST_CONT_NO","dest":"strContractNo"}
							]
				}
				
			
		}*/
			
		
		this.callParent(arguments);
		
	
	}
});
