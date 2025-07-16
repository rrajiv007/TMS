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
Ext.define('CueTrans.view.contracts.CarrierContractTariffs', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Carrier Contracts- Tariff Details";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Save","Print"]
		mainpage.toolbarLinks=
		[
			{"name":"Carrier Contracts","linkid":"co_CarContractsTar"},
			/*{"name":"Attach Documents","linkid":"attachdocs"}*/
			
		]
		
		var formCtrl=[];
		plf.columns=4
		var customerContractTariffColumn = plf.addColumnSection({});		//69997
		
		
		var customerContractTariffFormCtrl=									//69997
		[
			plf.addDisplayOnly({"label":"Carrier Contract No",id:"strContractNo"}),
			plf.addDisplayOnly({"label":"Contract Date",id:"dtContractDate"}),
			plf.addDisplayOnly({"label":"Contract Description","id":"strContractDesc"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			plf.addDisplayOnly({"label":"Carrier Name","id":"strCarrierName"}),
			plf.addDisplayOnly({"label":"Carrier Code","id":"strCarrierCode"}),
			
			plf.addDisplayOnly({"label":"Effective From Date","id":"dtEffectiveFrom"}),
			plf.addDisplayOnly({"label":"Effective To Date","id":"dtEffectiveTo"}),
			plf.addDisplayOnly({"label":"Amendment No","id":"iAmendmentNo"}),
			plf.addCombo({"label":"Currency","id":"strCurrency","mandatory":"true"}),
			plf.addText({"label":"Exchange Rate","id":"iExchangeRate",inputFormat:"numeric",InputPrecision:"2"}),
			plf.addCombo({"label":"Billing Document Type","id":"strBillingDoc","mandatory":"true"})
		]
		
      customerContractTariffColumn.add(customerContractTariffFormCtrl);					
		
		
		var customerContractTariffObj=													//69997
		[
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:100,editControl:"textbox",inputFormat:"string",InputLength:"40"},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:100,editControl:"textbox",inputFormat:"string",InputLength:"40",inputFormat:"string",InputLength:"40"},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",editControl:"combo",width:110,storeId:"strVehicleCategory"},
			{columnname:"Mode",dataname:"TRAN_MODE",datatype:"string",editControl:"combo",width:100,storeId:"strTranMode"},
			{columnname:"Price Basis",dataname:"PRICE_BASIS",datatype:"string",editControl:"combo",width:150,storeId:"strPriceBasis"},
			{columnname:"Price",dataname:"PRICE",datatype:"string",width:100,editControl:"textbox",inputFormat:"numeric",InputPrecision:"2"},
			{columnname:"Slab From Value",dataname:"SLAB_FROM_VALUE",datatype:"string",width:110,editControl:"textbox",inputFormat:"integer",InputLength:"20"},
			{columnname:"Slab To Value",dataname:"SLAB_TO_VALUE",datatype:"string",width:100,editControl:"textbox",inputFormat:"integer",InputLength:"20"},
			{columnname:"Slab Basis",dataname:"SLAB_BASIS",datatype:"string",width:130,editControl:"combo",storeId:"strSlabBasis"},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:180,editControl:"textbox",inputFormat:"string",InputLength:"100"}
		]
		var customerContractTariffGridDetail=										//69997
		{
			title:"Tariff Matrix",
			id:"tariffGridObj",
			detail:customerContractTariffObj
			
		}
		var customerContractTariffGridSection = plf.addGrid(customerContractTariffGridDetail)		//69997
		
		
		
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(customerContractTariffColumn)
		mainpage.ptrMainSection.add(customerContractTariffGridSection) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		
		
			mainpage.eventHandlers = 
			[
            {
					"controlid":"strContractNo",
					"tasktype":"onload",
					"input":["strContractNo","iAmendmentNo"],
					"service":"CoreCarrierContract",
					"methodName":"initTarrifDetailsTS"
			},

			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Save",
					"input":["strContractNo","dtContractDate","strContractDesc","strStatus","strCarrierCode","strCarrierName","dtEffectiveFrom","dtEffectiveTo","iAmendmentNo","strCurrency","iExchangeRate","strBillingDoc","tariffGridObj"],
					"service":"CoreCarrierContract",
					"methodName":"createTarrifDetailsTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Print",
					"input":["strContractNo"],
					"service":"CoreCarrierContract",
					"methodName":"PrintCarTarrifDetailsReport"
			}

			             
			];
		
	mainpage.screenLinks=
		{
			"co_CarContractsTar":
				{
					"dest":"contracts.CarrierContracts",
					"hdr":[
							{"src":"strContractNo","dest":"strContractNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
				/*"attachdocs":
				{
					"dest":"contracts.CarrierContracts",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}*/
		}		
		
		this.callParent(arguments);
		
	
	}
});
