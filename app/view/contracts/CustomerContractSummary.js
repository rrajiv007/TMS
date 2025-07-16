/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.2															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Manibharathi	04/02/2016      69952					Status Combo Alignment 
1.0.2	 Manibharathi		05/02/2016    69997                         Addition of var                
************************************************************************************************/
Ext.define('CueTrans.view.contracts.CustomerContractSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Customer Contract Summary";
		mainpage.toolbarSectionFlag=true;
	    mainpage.toolbarLinks=
		[
			{"name":"Create Customer Contract","linkid":"co_CustomerContracts"}
		]
		
				
		
		//Customer Master Section starts

		var formCtrl=[];
		plf.columns=4
		var customerContractSummaryColumn = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);				//69997 
		
		
		var customerContractSummaryFormCtrl=								//69997 
		[
			plf.addText({"label":"Contract No",id:"strContractNoFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Contract No To",id:"strContractNoTo"}),
			plf.addText({"label":"Contract Description","id":"strContractDesc"}),
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addCombo({"label":"Status","id":"strStatus"}),
			plf.addDate({"label":"Date From","id":"dtContractDateFrom"}),
			plf.addDate({"label":"Date To","id":"dtContractDateTo"}),
			plf.addText({"label":"Customer Name","id":"strCustomerName"},this),
			plf.addText({"label":"Customer Code","id":"strCustomerCode"}),
			
			
			plf.addCombo({"label":"Contract type","id":"strContractType"}),
			plf.addText({"label":"Quotation No","id":"strQuotationNo"}),
			plf.addText({"label":"Sales Person Name","id":"strSalesPersonName"},this),
			plf.addText({"label":"Sales Person Code","id":"strSalesPersonCode"}),
			
			//plf.addBlank(),
			//plf.addBlank(),
			//plf.addButton({"label":"Search","id":"searchBtn"})
		
		]
		
		customerContractSummaryColumn.add(customerContractSummaryFormCtrl);
		
		
		var customerContractSummaryObj=								//69997 
		[
			{columnname:"Contract No",dataname:"CUST_CONT_NO",datatype:"string",width:150,linkId:"contractsmaster"},
			{columnname:"Contract<br>Date",dataname:"CONTRACT_DATE",datatype:"string",width:70},
			{columnname:"Customer Code",dataname:"CUSTOMER_CODE",datatype:"string",width:100},
			{columnname:"Customer Name",dataname:"CUSTOMER_NAME",datatype:"string",width:150},
			{columnname:"Contract<br>Description",dataname:"CONTRACT_DESC",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:75},
			{columnname:"Contract Type",dataname:"CONTRACT_TYPE",datatype:"string",width:200},
			{columnname:"Quotation No",dataname:"QUOTATION_NO",datatype:"string",width:100},
			{columnname:"Sales Person<br>Code",dataname:"SALES_PERSON_CODE",datatype:"string",width:100},
			{columnname:"Sales Person<br>Name",dataname:"SALES_PERSON_NAME",datatype:"string",width:100}
		]
		var customerContractSummaryGridDetail=							//69997 
		{
			title:"",
			id:"custContGrid",
			detail:customerContractSummaryObj,
			visibleRow:10,
			removeAddDelete:true
			
		}
		var customerContractSummaryGridSection = plf.addGrid(customerContractSummaryGridDetail,this)			//69997 
		
		
		
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(customerContractSummaryColumn)
		mainpage.ptrMainSection.add(customerContractSummaryGridSection) 
		
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
				"input":["strContractNoFrom","dtContractDateFrom","dtContractDateTo","strCustomerCode","strCustomerName","strContractDesc","strStatus","strContractType","strQuotationNo","strSalesPersonCode","strSalesPersonName","strDateType"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchCustomerContractsTS"
			}
		
			             
			];
		mainpage.screenLinks=
		{
			
				"co_CustomerContracts":
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
				
			
		}
			
		
		this.callParent(arguments);
		
	
	}
});
