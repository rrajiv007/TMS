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
Ext.define('CueTrans.view.contracts.CarrierContracts', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Carrier Contracts";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Refresh","Create","Edit","Authorise","Amend","Delete","Short Close","Print"]
		
		/*
		mainpage.toolbarLinks=
		[
			{"name":"Tarrif details","linkid":"co_tarrifDetails"},
			/*{"name":"Attach Documents","linkid":"attachDocuments"}
		] 
		*/
		//Add Keyfields
		mainpage.keyFields=["CustomerCode"]
		
		//3pl Owner Header Section Begins
		plf.columns=4
		var contractCollapse = plf.addColumnSection({});				//69997 
		
		
		var helpOn3PLFormCtrl=											//69997 
		[
			plf.addHlpText({"label":"Carrier Contract No",id:"strContractNo",hlpLinkID:"contractmaster",inputFormat:"string",InputLength:"60"},this),
			plf.addDate({"label":"Contract Date",id:"dtContractDate","mandatory":"true"}),
			plf.addText({"label":"Contract Description",id:"strContractDesc","mandatory":"true",inputFormat:"string",InputLength:"60"}),
			
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addListEdit({"label":"Carrier Name",id:"strCarrierName",keyField:"strCarrierCode"},this),
			plf.addHlpText({"label":"Carrier Code",id:"strCarrierCode","mandatory":"true",hlpLinkID:"carrierMaster",inputFormat:"string",InputLength:"60"},this),
			
			plf.addDate({"label":"Effective From Date",id:"dtEffectiveFrom","mandatory":"true"}),
			plf.addDate({"label":"Effective To Date",id:"dtEffectiveTo","mandatory":"true"}),
			plf.addCombo({"label":"Contract Type",id:"strContractType","mandatory":"true"}),
			
			plf.addCombo({"label":"Billing Frequency",id:"strBillingFrequency"}),
			plf.addText({"label":"Payterm",id:"strPayterm",inputFormat:"string",InputLength:"40"}),
			plf.addText({"label":"Remarks",id:"strRemarks",inputFormat:"string",InputLength:"100"}),
			
			plf.addCombo({"label":"Amendment No",id:"iAmendmentNo"}),
			plf.addDisplayOnly({"label":"Amendment Date",id:"dtAmendmentDate"}),
			plf.addText({"label":"Quotation No",id:"strQuotationNo",inputFormat:"string",InputLength:"60"}),
			
			plf.addDate({"label":"Quotation Date",id:"dtQuotationDate"}),
			plf.addCombo({"label":"Ref Doc Type",id:"strRefDocType"}),
			plf.addText({"label":"Ref Doc Details",id:"strRefDocDetails",inputFormat:"string",InputLength:"60"}),
			
			plf.addText({"label":"Contact Person",id:"strContactPerson",inputFormat:"string",InputLength:"100"}),
			plf.addText({"label":"Contact No",id:"strContactNumber",inputFormat:"string",InputLength:"60"}),
			plf.addListEdit({"label":"Buyer Name",id:"strBuyerName",keyField:"strBuyerCode"},this),
			plf.addHlpText({"label":"Buyer Code",id:"strBuyerCode",hlpLinkID:"employeeMaster"},this),
			plf.addBlank(),
			plf.addBlank(),
			plf.addFileUpload({"label":"Attach File",id:"strFileAttach",Entity:"Carrier_Contract\\File_Attachment"})
			
			
		]
		
		contractCollapse.add(helpOn3PLFormCtrl);
		//HelpOn3PL Header Section Ends
		
		//HelpOn3PL Grid Section Begins
		var scopeGridObj=							//69997 
		[
			{columnname:"Scope Category",dataname:"SCOPE_CATEGORY",datatype:"string",width:250,editControl:"combo",storeId:"strScopeCategory"},
			{columnname:"Scope Description",dataname:"SCOPE_DESC",datatype:"string",editControl:"textbox",width:350,inputFormat:"string",InputLength:"500"},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",datatype:"string",editControl:"textbox",width:350,inputFormat:"string",InputLength:"500"},
			{columnname:"Attach Document",dataname:"ATTACH_DOCUMENT",datatype:"string",width:185,editControl:"fileupload",fileGroup:"Carrier_Contract\\Scope_Documents",width:175}
		]
		var scopeDtl=								//69997 
		{
			title:"Scope Details",
			id:"scopeGridObj",
			detail:scopeGridObj,
			visibleRow:5
					
		}
		/*helpGridSection = plf.addGrid(helpOn3PLGridDtl,this)	
		helpGridSectionContainer = plf.addCollapseSection({title:"Scope Details",collapsed:false});
		helpGridSectionContainer.add(helpGridSection)*/
		
		var helpOncarrierContractGridSection = plf.addGrid(scopeDtl,this)		//69997 
		//HelpOn3PL Grid Section Ends
		
		
		var helpOntariffDetailsCtrl1Obj=										//69997 
		[
			{columnname:"Tariff Code",dataname:"TARIFF_CODE",datatype:"string",width:150,editControl:"textbox",helpid:'tariffcode',"onenter":"TARIFF_CODE_ONENTER","onkeyup":"TARIFF_CODE_ONENTER"},
			//{columnname:"Tariff Code",dataname:"TARIFF_CODE",datatype:"string",width:150,editControl:"textbox",helpid:'tariffcode',"onenter":"TARIFF_CODE_ONENTER"},
			{columnname:"Tariff Description",dataname:"TARIFF_DESC",datatype:"",width:250},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:""},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"",width:150},
			{columnname:"Currency Code",dataname:"CURRENCY",datatype:"",width:150},
			{columnname:"Exchange Rate",dataname:"EXCHANGE_RATE",datatype:"",width:190},
			//{columnname:"Customer Contract No",dataname:"CAR_CONT_NO",datatype:"",width:190,hidden:"true"},
		]
		var helpOntariffDetailsGrid1Dtl=												//69997 
		{
			title:"Tariff Mapping",
			id:"tariffGridObj",
			visibleRow:5,
			detail:helpOntariffDetailsCtrl1Obj,
	
		}

		var passTariffDetailsDtl = plf.addGrid(helpOntariffDetailsGrid1Dtl,this)		//69997 

		
		/*
		var passTariffDetailsDtl =  plf.addCollapseSection({title:"Tariff Mapping",collapsed:false})
		helpOntariffDetailsGrid1Section = plf.addGrid(helpOntariffDetailsGrid1Dtl,this)	
		passTariffDetailsDtl.add(helpOntariffDetailsGrid1Section)
		*/
	
		var baseTab = plf.addTabSection({ tabs:[helpOncarrierContractGridSection,passTariffDetailsDtl ]});
		
		
		//Add Child Sections
	
		mainpage.ptrMainSection.add(contractCollapse)//Add Header Section to Main Page
		//mainpage.ptrMainSection.add(helpOncarrierContractGridSection) //Add Grid Section to Main Page
	    	//mainpage.ptrMainSection.add(passTariffDetailsDtl) //Add Grid Section to Main Page
		mainpage.ptrMainSection.add(baseTab)
	
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	       {
				"controlid":"strContractNo",
				"tasktype":"onload",
				"input":["strContractNo"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"initCarrierContractTS"
			},
			
			{
					"controlid":"strContractNo",
					"tasktype":"onenter",
					"input":["strContractNo"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"fetchCarrierContractTS"
			},
			
			{
					"controlid":"strCarrierCode",
					"tasktype":"onenter",
					"input":["strCarrierCode"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"fetchCarrierCodeTS"
			},
			
			{
					"controlid":"strBuyerCode",
					"tasktype":"onenter",
					"input":["strBuyerCode"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"fetchBuyerCodeTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Create",
					"input":["strContractNo","dtContractDate","strContractDesc","strCarrierCode","dtEffectiveFrom","dtEffectiveTo","strContractType",
					"strBillingFrequency","strPayterm","strRemarks","iAmendmentNo","dtAmendmentDate","strQuotationNo","dtQuotationDate",
					"strRefDocType","strRefDocDetails","strContactPerson","strContactNumber","strBuyerCode","strStatus","scopeGridObj","strFileAttach","tariffGridObj"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"createCarrierContractTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Edit",
					"input":["strContractNo","dtContractDate","strContractDesc","strCarrierCode","dtEffectiveFrom","dtEffectiveTo","strContractType",
					"strBillingFrequency","strPayterm","strRemarks","iAmendmentNo","dtAmendmentDate","strQuotationNo","dtQuotationDate","strFileAttach",
					"strRefDocType","strRefDocDetails","strContactPerson","strContactNumber","strBuyerCode","strStatus","scopeGridObj","tariffGridObj"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"modifyCarrierContractTS"
			},
			
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Authorise",
				"input":["strContractNo","dtContractDate","strContractDesc","strCarrierCode","dtEffectiveFrom","dtEffectiveTo","strContractType",
					"strBillingFrequency","strPayterm","strRemarks","iAmendmentNo","dtAmendmentDate","strQuotationNo","dtQuotationDate",
					"strRefDocType","strRefDocDetails","strContactPerson","strContactNumber","strBuyerCode","strStatus","scopeGridObj","strFileAttach","tariffGridObj"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"authoriseCarrierContractTS"
			},
			
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strContractNo","dtContractDate","strContractDesc","strCarrierCode","dtEffectiveFrom","dtEffectiveTo","strContractType",
					"strBillingFrequency","strPayterm","strRemarks","iAmendmentNo","dtAmendmentDate","strQuotationNo","dtQuotationDate",
					"strRefDocType","strRefDocDetails","strContactPerson","strContactNumber","strFileAttach","strBuyerCode","strStatus","scopeGridObj","tariffGridObj"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"deleteCarrierContractTS"
			},
			
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Amend",
				"input":["strContractNo","dtContractDate","strContractDesc","strCarrierCode","dtEffectiveFrom","dtEffectiveTo","strContractType",
					"strBillingFrequency","strPayterm","strRemarks","iAmendmentNo","dtAmendmentDate","strQuotationNo","dtQuotationDate",
					"strRefDocType","strRefDocDetails","strContactPerson","strContactNumber","strBuyerCode","strStatus","scopeGridObj","strFileAttach","tariffGridObj"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"amendCarrierContractTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Short Close",
				"input":["strContractNo","dtContractDate","strContractDesc","strCarrierCode","dtEffectiveFrom","dtEffectiveTo","strContractType",
					"strBillingFrequency","strPayterm","strRemarks","iAmendmentNo","dtAmendmentDate","strQuotationNo","dtQuotationDate",
					"strRefDocType","strRefDocDetails","strContactPerson","strContactNumber","strBuyerCode","strStatus","scopeGridObj","strFileAttach","tariffGridObj"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"shortCloseCarrierContractTS"
			},

			{
					"controlid":"iAmendmentNo",
					"tasktype":"onchange",
					"input":["iAmendmentNo","strContractNo"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"fetchCarrierDetailsTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Print",
					"input":["iAmendmentNo","strContractNo"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"printCarrierDetailsTSReport"
			},
			{
					"grideventid":"TARIFF_CODE_ONENTER",
					"tasktype":"gridonenter",
					"input":["TARIFF_CODE"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"fetchTariffDetalTS"
			},
		];
		//Event Handlers Mapping Ends
			
		//Generate Screen Section
		
		mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":[]
			},
			"locked":
			{
				"enableAll":false,
				"except":[""]
			},
			"active":
			{
				"enableAll":false,
				"except":[""]
			}
		}
		
		
mainpage.screenLinks=
		{
			"co_tarrifDetails":
				{
					"dest":"contracts.CarrierContractTariffs",
					"hdr":[
							{"src":"strContractNo","dest":"strContractNo"},
							{"src":"iAmendmentNo","dest":"iAmendmentNo"}						
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
				/*"attachDocuments":
				{
					"dest":"jm_master.3PLOwnerMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}*/
				
		}
		
		mainpage.hlpLinks=
		{
			"contractmaster":
				{
					"hlpType":"Header",
					"hlpScreen":"contracts.HelpOnCarrierContracts",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strContractNo","child":"CAR_CONT_NO"}
							]
				},
				"carrierMaster":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCarrierCode","child":"OWNER_CODE_3PL"},
							{"parent":"strCarrierName","child":"OWNER_NAME_3PL"}
							]
				},
				"employeeMaster":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.EmployeeHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strBuyerCode","child":"EMPLOYEE_CODE"},
							{"parent":"strBuyerName","child":"EMPLOYEE_NAME"}
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

		
		/*
		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});
		*/
		
		this.callParent(arguments);
		//mainpage.generateScreen();
	}
});
