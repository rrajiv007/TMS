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
Ext.define('CueTrans.view.contracts.CustomerContracts', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Customer Contracts";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Refresh","Create","Edit","Confirm","Amend","Delete","ShortClose","Print"]
		
		
		/*mainpage.toolbarLinks=
		[
			{"name":"Tarrif details","linkid":"co_tarrifDetails"}
			//{"name":"Attach Documents","linkid":"attachDocuments"}
		]*/
		//Add Keyfields
		//mainpage.keyFields=["CustomerCode"]
		
		//3pl Owner Header Section Begins
		plf.columns=4
		
		var customerContractColumn = plf.addColumnSection({});			//69997 
		if(plf.defaultLayout==3)
		{
			plf.columns=3
			
			var helpOncustomerContractCtrl=								//69997 
		[
			plf.addHlpText({"label":"Customer Contract No",id:"strContractNo",hlpLinkID:"customercontract",inputFormat:"string",InputLength:"60"},this),
			plf.addDate({"label":"Contract Date",id:"dtContractDate","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			
			plf.addText({"label":"Contract Description",id:"strContractDesc","mandatory":"true",inputFormat:"string",InputLength:"60"}),
			plf.addListEdit({"label":"Customer Name",id:"strCustomerName"}),
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode","mandatory":"true",hlpLinkID:"customerlink",inputFormat:"string",InputLength:"60"},this),
			
			
			plf.addDate({"label":"Effective From Date",id:"dtEffectiveFrom","mandatory":"true"}),
			plf.addDate({"label":"Effective To Date",id:"dtEffectiveTo","mandatory":"true"}),
			plf.addCombo({"label":"Contract Type",id:"strContractType"}),
			
			plf.addCombo({"label":"Billing Frequency",id:"strBillingFrequency"}),
			plf.addText({"label":"Credit Term",id:"strCreditTerm",inputFormat:"string",InputLength:"40"}),
			plf.addText({"label":"Remarks",id:"strRemarks",inputFormat:"string",InputLength:"100"}),
			
			plf.addCombo({"label":"Amendment No",id:"iAmendmentNo"}),
			plf.addDisplayOnly({"label":"Amendment Date",id:"dtAmendmentDate"}),
			plf.addText({"label":"Quotation No",id:"strQuotationNo",inputFormat:"string",InputLength:"60"}),
			
			plf.addDate({"label":"Quotation Date",id:"dtQuotationDate"}),
			plf.addCombo({"label":"Ref Doc Type",id:"strRefDocType"}),
			plf.addText({"label":"Ref Doc Details",id:"strRefDocDetails",inputFormat:"string",InputLength:"60"}),
			
			plf.addText({"label":"Contact Person",id:"strContactPerson",inputFormat:"string",InputLength:"100"}),
			plf.addText({"label":"Contact No",id:"strContactNumber",inputFormat:"string",InputLength:"60"}),
			plf.addListEdit({"label":"Sales Person Name",id:"strSalesPersonName"}),
			plf.addHlpText({"label":"Sales Person Code",id:"strSalesPersonCode",hlpLinkID:"employeelink",inputFormat:"string",InputLength:"60"},this),
			plf.addBlank(),
			plf.addFileUpload({"label":"Attach File",id:"strFileAttach",Entity:"Customer_Contract\\File_Attachment"})
		]
		
		}
		
		else
		{
		
			helpOncustomerContractCtrl=
		[
			plf.addHlpText({"label":"Customer Contract No",id:"strContractNo",hlpLinkID:"customercontract",inputFormat:"string",InputLength:"60"},this),
			plf.addDate({"label":"Contract Date",id:"dtContractDate","mandatory":"true"}),
			plf.addText({"label":"Contract Description",id:"strContractDesc","mandatory":"true",inputFormat:"string",InputLength:"60"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addListEdit({"label":"Customer Name",id:"strCustomerName",keyField:"strCustomerCode"},this),
					
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode","mandatory":"true",hlpLinkID:"customerlink",inputFormat:"string",InputLength:"60"},this),
			
			plf.addDate({"label":"Effective From Date",id:"dtEffectiveFrom","mandatory":"true"}),
			plf.addDate({"label":"Effective To Date",id:"dtEffectiveTo","mandatory":"true"}),
			
			plf.addCombo({"label":"Contract Type",id:"strContractType"}),
			plf.addCombo({"label":"Billing Frequency",id:"strBillingFrequency"}),
			plf.addText({"label":"Credit Term",id:"strCreditTerm",inputFormat:"string",InputLength:"40"}),
			plf.addText({"label":"Remarks",id:"strRemarks",inputFormat:"string",InputLength:"100"}),
			
			plf.addCombo({"label":"Amendment No",id:"iAmendmentNo"}),
			plf.addDisplayOnly({"label":"Amendment Date",id:"dtAmendmentDate"}),
			plf.addText({"label":"Quotation No",id:"strQuotationNo",inputFormat:"string",InputLength:"60"}),
			plf.addDate({"label":"Quotation Date",id:"dtQuotationDate"}),
			
			plf.addCombo({"label":"Ref Doc Type",id:"strRefDocType",inputFormat:"string",InputLength:"60"}),
			plf.addText({"label":"Ref Doc Details",id:"strRefDocDetails",inputFormat:"string",InputLength:"60"}),
			plf.addText({"label":"Contact Person",id:"strContactPerson",inputFormat:"string",InputLength:"100"}),
			plf.addText({"label":"Contact No",id:"strContactNumber",inputFormat:"string",InputLength:"60"}),
			plf.addListEdit({"label":"Sales Person Name",id:"strSalesPersonName",keyField:"strSalesPersonCode"},this),
			plf.addHlpText({"label":"Sales Person Code",id:"strSalesPersonCode",hlpLinkID:"employeelink",inputFormat:"string",InputLength:"60"},this),
			plf.addBlank(),
			plf.addBlank(),
			plf.addFileUpload({"label":"Attach File",id:"strFileAttach",Entity:"Customer_Contract\\File_Attachment"}),
			
		]
		
		}
		
		
		customerContractColumn.add(helpOncustomerContractCtrl);
		//HelpOn3PL Header Section Ends
		
		//HelpOn3PL Grid Section Begins
		
		var helpOncustomerContractCtrlObj=					//69997 
		[
			{columnname:"Scope Category",dataname:"SCOPE_CATEGORY",datatype:"string",width:250,editControl:"combo",storeId:"strScopeCategory"},
			{columnname:"Scope Description",dataname:"SCOPE_DESC",datatype:"string",width:250,editControl:"textbox",inputFormat:"string",InputLength:"500"},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",datatype:"string",width:350,editControl:"textbox",inputFormat:"string",InputLength:"500"},
			{columnname:"Attach Document",dataname:"ATTACH_DOCUMENT",datatype:"string",width:185,editControl:"fileupload",fileGroup:"Customer_Contract\\Scope_Documents",width:175}
		]
		var helpOncustomerContractGridDtl=					//69997 
		{
			title:"Scope Details",
			id:"scopeGridObj",
			visibleRow:5,
			detail:helpOncustomerContractCtrlObj,
			
		}
		var helpOncustomerContractGridSection = plf.addGrid(helpOncustomerContractGridDtl,this)		//69997 
		
		
		
		
		var helpOncustomerContractCtrl1Obj=			//69997 
		[
			{columnname:"Carrier Code",dataname:"CARRIER_CODE",datatype:"string",width:100,editControl:"textbox",helpid:'carriercode',"onenter":"CARRIER_CODE_ONENTER"},
			{columnname:"Carrier Name",dataname:"CARRIER_NAME",datatype:"string",width:150},
			{columnname:"Carrier Contract No",dataname:"CARRIER_CONTRACT_NO",datatype:"string",editControl:"textbox",width:150,helpid:'carriercontractno',"onenter":"CARRIER_CONTRACT_NO_ONENTER"},
			{columnname:"Contract Date",dataname:"CONTRACT_DATE",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:150},
			{columnname:"Description",dataname:"CONTRACT_DESC",datatype:"string",width:190},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"string",width:130},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"string",width:110},
		]
		var helpOncustomerContractGrid1Dtl=							//69997 
		{
			title:"",
			id:"carrierGridObj",
			visibleRow:5,
			detail:helpOncustomerContractCtrl1Obj,
	
		}
		
		
		var passRefDocDtl =  plf.addCollapseSection({title:"Approved Carrier Details",collapsed:false})
		helpOncustomerContractGrid1Section = plf.addGrid(helpOncustomerContractGrid1Dtl,this)	
		passRefDocDtl.add(helpOncustomerContractGrid1Section)
		
		
		var helpOntariffDetailsCtrl1Obj=														//69997 
		[
			{columnname:"Tariff Code",dataname:"TARIFF_CODE",datatype:"string",width:150,editControl:"textbox",helpid:'tariffcode',"onenter":"TARIFF_CODE_ONENTER"},
			{columnname:"Tariff Description",dataname:"TARIFF_DESC",datatype:"",width:250},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:""},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"",width:150},
			{columnname:"Currency Code",dataname:"CURRENCY",datatype:"",width:150},
			{columnname:"Exchange Rate",dataname:"EXCHANGE_RATE",datatype:"",width:190},
			//{columnname:"Customer Contract No",dataname:"CAR_CONT_NO",datatype:"",width:190,hidden:"true"},
		]
		var helpOntariffDetailsGrid1Dtl=								//69997 
		{
			title:"",
			id:"tariffGridObj",
			visibleRow:5,
			detail:helpOntariffDetailsCtrl1Obj,
	
		}
		
		
		var passTariffDetailsDtl =  plf.addCollapseSection({title:"Tariff Mapping",collapsed:false})
		helpOntariffDetailsGrid1Section = plf.addGrid(helpOntariffDetailsGrid1Dtl,this)	
		passTariffDetailsDtl.add(helpOntariffDetailsGrid1Section)
		
		var baseTab = plf.addTabSection({ tabs:[helpOncustomerContractGridSection,passRefDocDtl,passTariffDetailsDtl]});		

		mainpage.ptrMainSection.add(customerContractColumn)//Add Header Section to Main Page
		//mainpage.ptrMainSection.add(helpOncustomerContractGridSection) 
		//mainpage.ptrMainSection.add(passRefDocDtl) //Add Grid Section to Main Page
		//mainpage.ptrMainSection.add(passTariffDetailsDtl) //Add Grid Section to Main Page
		mainpage.ptrMainSection.add(baseTab)	
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
					"grideventid":"CARRIER_CODE_ONENTER",
					"tasktype":"gridonenter",
					"input":["CARRIER_CODE","strCarrierCode"],
					"service":"CoreCustomerContract",
					"methodName":"fetchCarrierNameML"
			},
			{
					"grideventid":"TARIFF_CODE_ONENTER",
					"tasktype":"gridonenter",
					"input":["TARIFF_CODE"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"fetchTariffDetTS"
			},
			{
					"grideventid":"CARRIER_CONTRACT_NO_ONENTER",
					"tasktype":"gridonenter",
					"input":["CARRIER_CONTRACT_NO"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"fetchCarrierNoDetailsML"
			},
	        {
				"controlid":"",
				"tasktype":"onload",
				"input":["strContractNo"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"initCustomerContractMstTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strContractNo","dtContractDate","strContractDesc","strCustomerCode","strCustomerName","dtEffectiveFrom","dtEffectiveTo",
				"strContractType","strBillingFrequency","strCreditTerm","strRemarks","strQuotationNo","dtQuotationDate","strRefDocType","strRefDocDetails",
				"strContactPerson","strContactNumber","strSalesPersonCode","scopeGridObj","carrierGridObj","strFileAttach","tariffGridObj","strTariffCode"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"createCustomerContractTS"
			},
			{
					"controlid":"strContractNo",
					"tasktype":"onenter",
					"input":["strContractNo"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"fetchContractDetailsTS"
			},	
			{
					"controlid":"strCustomerCode",
					"tasktype":"onenter",
					"input":["strCustomerCode"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"fetchCustomerNameTS"
			},	
			{
					"controlid":"strSalesPersonCode",
					"tasktype":"onenter",
					"input":["strSalesPersonCode"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"fetchSalesPersonNameTS"
			},	
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Amend",
				"input":["strContractNo","dtContractDate","strContractDesc","strCustomerCode","strCustomerName","dtEffectiveFrom","dtEffectiveTo",
				"strContractType","strBillingFrequency","strCreditTerm","strRemarks","strQuotationNo","dtQuotationDate","strRefDocType","strRefDocDetails",
				"strContactPerson","strContactNumber","strSalesPersonCode","scopeGridObj","carrierGridObj","strStatus","iAmendmentNo","strFileAttach","tariffGridObj","strTariffCode","strStatus"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"amendCustomerContractTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strContractNo","dtContractDate","strContractDesc","strCustomerCode","strCustomerName","dtEffectiveFrom","dtEffectiveTo",
				"strContractType","strBillingFrequency","strCreditTerm","strRemarks","strQuotationNo","dtQuotationDate","strRefDocType","strRefDocDetails",
				"strContactPerson","strContactNumber","strSalesPersonCode","scopeGridObj","carrierGridObj","iAmendmentNo","strFileAttach","tariffGridObj","strTariffCode","strStatus"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"editCustomerContractTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["strContractNo","dtContractDate","strContractDesc","strCustomerCode","strCustomerName","dtEffectiveFrom","dtEffectiveTo",
				"strContractType","strBillingFrequency","strCreditTerm","strRemarks","strQuotationNo","dtQuotationDate","strRefDocType","strRefDocDetails",
				"strContactPerson","strContactNumber","strSalesPersonCode","scopeGridObj","carrierGridObj","iAmendmentNo","strStatus","strFileAttach","tariffGridObj","strTariffCode"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"authoriseCustomerContractTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strContractNo","dtContractDate","strContractDesc","strCustomerCode","strCustomerName","dtEffectiveFrom","dtEffectiveTo",
				"strContractType","strBillingFrequency","strCreditTerm","strRemarks","strQuotationNo","dtQuotationDate","strRefDocType","strRefDocDetails",
				"strContactPerson","strContactNumber","strSalesPersonCode","scopeGridObj","carrierGridObj","iAmendmentNo","strFileAttach","tariffGridObj","strTariffCode"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"deleteCustomerContractTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"ShortClose",
				"input":["strContractNo","dtContractDate","strContractDesc","strCustomerCode","strCustomerName","dtEffectiveFrom","dtEffectiveTo",
				"strContractType","strBillingFrequency","strCreditTerm","strRemarks","strQuotationNo","dtQuotationDate","strRefDocType","strRefDocDetails",
				"strContactPerson","strContactNumber","strSalesPersonCode","scopeGridObj","carrierGridObj","iAmendmentNo","strStatus","strFileAttach","tariffGridObj","strTariffCode"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"shortCloseCustomerContractTS"
			},
			{
					"controlid":"iAmendmentNo",
					"tasktype":"onchange",
					"input":["iAmendmentNo","strContractNo","strTariffCode"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"fetchContractsDetailsTS"
			},
            {
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Print",
					"input":["iAmendmentNo","strContractNo"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"printCustomerDetailsTSReport"
			}
			
		];
		/*mainpage.screenLinks=
		{
			"co_tarrifDetails":
				{
					"dest":"contracts.CustomerContractTariffs",
					"hdr":[
							{"src":"strContractNo","dest":"strContractNo"},
							{"src":"iAmendmentNo","dest":"iAmendmentNo"}
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
			
			
		}*/
		
		
		mainpage.hlpLinks=
		{
			"customercontract":
				{
					"hlpType":"Header",
					"hlpScreen":"contracts.CustomerContractHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strContractNo","child":"CUST_CONT_NO"}
							]
				},
				"carriercode":
				{
					"hlpType":"grid",
					"gridID":"carrierGridObj",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					{"parent":"CARRIER_CODE","child":"OWNER_CODE_3PL"}
					]
				},
				"carriercontractno":
				{
					"hlpType":"grid",
					"gridID":"carrierGridObj",
					"hlpScreen":"contracts.HelpOnCarrierContracts",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					{"parent":"CARRIER_CONTRACT_NO","child":"CAR_CONT_NO"}
					]
				},
				"customerlink":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CustomerHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCustomerCode","child":"CUST_CODE"},
							{"parent":"strCustomerName","child":"CUST_NAME"}
							]
				},
				"employeelink":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.EmployeeHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strSalesPersonCode","child":"EMPLOYEE_CODE"},
							{"parent":"strSalesPersonName","child":"EMPLOYEE_NAME"}
							]
				},

				"tariffcode":
				{
					"hlpType":"grid",
					"gridID":"tariffGridObj",
					"hlpScreen":"tariff.TariffHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					{"parent":"TARIFF_CODE","child":"TARIFF_CODE"},
					{"parent":"TARIFF_DESC","child":"TARIFF_DESC"},
					{"parent":"EFFECTIVE_FROM","child":"EFFECTIVE_FROM"},
					{"parent":"EFFECTIVE_TO","child":"EFFECTIVE_TO"},
					{"parent":"CURRENCY","child":"CURRENCY"},
					{"parent":"EXCHANGE_RATE","child":"EXCHANGE_RATE"},
					]
				},
				
				
		}		
		
		
		this.callParent(arguments);
		//mainpage.generateScreen();
	}
});
