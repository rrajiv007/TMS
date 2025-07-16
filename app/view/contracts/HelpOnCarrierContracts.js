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
Ext.define('CueTrans.view.contracts.HelpOnCarrierContracts', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		mainpage.screenName = "Help on Carrier Contracts";
		
		
		//Truck Master Section starts

		//var formCtrl=[];
		plf.columns=3
		//customerContractSummaryColumn = plf.addColumnSection({});
		var customerContractSummaryColumn =   plf.addColumnSection({collapsed: false});			//69997
		
		
		var customerContractSummaryFormCtrl=						//69997
		[
			plf.addText({"label":"Contract No From",id:"strContractNoFrom","anywhereSearch":"true"}),
			//plf.addDate({"label":"Contract Date From","id":"dtContractDateFrom"}),
			plf.addDate({"label":"Contract Date To","id":"dtContractDateTo"}),
			plf.addText({"label":"Carrier Code","id":"strCarrierCode"}),
			plf.addText({"label":"Carrier Name","id":"strCarrierName"}),
			plf.addText({"label":"Contract Description","id":"strContractDesc"}),
			plf.addCombo({"label":"Status","id":"strStatus"}),
			plf.addCombo({"label":"Contract type","id":"strContractType"}),
			plf.addText({"label":"Quotation No","id":"strQuotationNo"}),
			plf.addText({"label":"Buyer Code","id":"strBuyerCode"}),
			plf.addText({"label":"Buyer Name","id":"strBuyerName"}),
			plf.addBlank(),
			plf.addButton({"label":"Search","id":"btnSearch"}),
		]
		
		customerContractSummaryColumn.add(customerContractSummaryFormCtrl);
		
		
		var customerContractSummaryObj=											//69997
		[
			{columnname:"Contract No",dataname:"CAR_CONT_NO",datatype:"string",width:150},
			{columnname:"Contract Date",dataname:"CONTRACT_DATE",datatype:"string",width:100},
			{columnname:"Carrier Code",dataname:"CARRIER_CODE",datatype:"string",width:100},
			{columnname:"Carrier Name",dataname:"CARRIER_NAME",datatype:"string",width:160},
			{columnname:"Contract Description",dataname:"CONTRACT_DESC",datatype:"string",width:160},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:80},
			{columnname:"Contract Type",dataname:"CONTRACT_TYPE",datatype:"string",width:100},
			{columnname:"Quotation No",dataname:"QUOTATION_NO",datatype:"string",width:100},
			{columnname:"Buyer Code",dataname:"BUYER_CODE",datatype:"string",width:100},
			{columnname:"Buyer Name",dataname:"BUYER_NAME",datatype:"string",width:150}
		]
		var customerContractSummaryGridDetail=												//69997
		{
			title:"",
			id:"carContGrid",
			detail:customerContractSummaryObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
			
		}
		var customerContractSummaryGridSection = plf.addGrid(customerContractSummaryGridDetail,this)					//69997
		mainpage.hlpSearchGridPtr = customerContractSummaryGridSection
		
		
		
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(customerContractSummaryColumn)
		mainpage.ptrMainSection.add(customerContractSummaryGridSection) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		
			mainpage.eventHandlers = 
			[
               {
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strContractNoFrom","dtContractDateFrom","dtContractDateTo","strCarrierCode","strCarrierName","strContractDesc","strStatus","strContractType","strQuotationNo","strBuyerCode","strBuyerName"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"fetchAllCarrierContractTS"
			},
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TARCoreTariffServiceTS",
				"methodName":"initCarrierContractSummaryTS"
			} 
			             
			];
		
			
		
		this.callParent(arguments);
		
	
	}
});
