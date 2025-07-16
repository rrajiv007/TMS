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
1.0.2	    Manibharathi	05/02/2016      69997                         Addition of var               
************************************************************************************************/
Ext.define('CueTrans.view.contracts.CarrierContractSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Carrier Contract Summary";
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Create Carrier Contract","linkid":"co_CarrierContracts"}
		]		
		
		//Truck Master Section starts

		var formCtrl=[];
		plf.columns=4
		var customerContractSummaryColumn =plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);	//69997
		
		
		var customerContractSummaryFormCtrl=									//69997			
		[
			plf.addText({"label":"Contract No",id:"strContractNoFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Contract No To",id:"strContractNoTo"}),
			plf.addText({"label":"Carrier Name","id":"strCarrierName"},this),
			plf.addText({"label":"Carrier Code","id":"strCarrierCode"}),
			plf.addCombo({"label":"Status","id":"strStatus"}),
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addDate({"label":"Date From","id":"dtContractDateFrom"}),
			plf.addDate({"label":"Date To","id":"dtContractDateTo"}),
			plf.addText({"label":"Contract Description","id":"strContractDesc"}),
			plf.addCombo({"label":"Contract type","id":"strContractType"}),
			plf.addText({"label":"Quotation No","id":"strQuotationNo",inputFormat:"string",InputLength:"60"}),
			plf.addText({"label":"Buyer Name","id":"strBuyerName"},this),
			plf.addText({"label":"Buyer Code","id":"strBuyerCode",inputFormat:"string",InputLength:"40"}),
			
			//plf.addBlank(),
			//plf.addBlank(),
			//plf.addButton({"label":"Search","id":"btnSearch"}),
		]
		
		customerContractSummaryColumn.add(customerContractSummaryFormCtrl);												
		
		
		var customerContractSummaryObj=																							//69997
		[
			{columnname:"Contract No",dataname:"CAR_CONT_NO",datatype:"string",width:150,linkId:"carrierContractScr"},
			{columnname:"Contract Date",dataname:"CONTRACT_DATE",datatype:"string",width:100},
			{columnname:"Carrier Code",dataname:"CARRIER_CODE",datatype:"string",width:100},
			{columnname:"Carrier Name",dataname:"CARRIER_NAME",datatype:"string",width:160},
			{columnname:"Contract Description",dataname:"CONTRACT_DESC",datatype:"string",width:150},			
			{columnname:"Contract Type",dataname:"CONTRACT_TYPE",datatype:"string",width:100},
			{columnname:"Quotation No",dataname:"QUOTATION_NO",datatype:"string",width:100},
			{columnname:"Buyer Code",dataname:"BUYER_CODE",datatype:"string",width:100},
			{columnname:"Buyer Name",dataname:"BUYER_NAME",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:80},
		]
		var customerContractSummaryGridDetail=																					//69997
		{
			title:"",
			id:"carContGrid",
			detail:customerContractSummaryObj,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true
			
		}
		var customerContractSummaryGridSection = plf.addGrid(customerContractSummaryGridDetail,this)		//69997
		
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
					"methodName":"initCarrierContractSummaryTS"
			},
			 {
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strContractNoFrom","dtContractDateFrom","dtContractDateTo","strCarrierCode","strCarrierName","strContractDesc","strStatus","strContractType","strQuotationNo","strBuyerCode","strBuyerName","strDateType"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"fetchAllCarrierContractTS"
			},

					
			             
			];
		
		mainpage.screenLinks=
		{
			"co_CarrierContracts":
				{
					"dest":"contracts.CarrierContracts",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"carrierContractScr":
				{
					"dest":"contracts.CarrierContracts",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"CAR_CONT_NO","dest":"strContractNo"}
							]
				},
				
		}	
		
		this.callParent(arguments);
		
	
	}
});
