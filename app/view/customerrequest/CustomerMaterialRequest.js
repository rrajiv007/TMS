Ext.define('CueTrans.view.customerrequest.CustomerMaterialRequest', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Material Movement Request";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Refresh","Create","Edit","Delete","Authorize","ShortClose"]
		
		//Add Keyfields
		//mainpage.keyFields=["CustomerCode"]
		
		//Customer Request Section Begins
		plf.columns=4
		
		customerRequestColumn = plf.addColumnSection({});
		if(plf.defaultLayout==3)
		{
			plf.columns=3
			
			helpOncustomerRequestCtrl=
		[
			plf.addHlpText({"label":"Material Movement No",id:"strCustomerRequestNo",hlpLinkID:"customerrequest"},this),
			plf.addDate({"label":"Material Movement Date",id:"dtCustomerReqDate","mandatory":"true"}),
			plf.addCombo({"label":"Request Type",id:"strRequestType","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addListEdit({"label":"Customer Name",id:"strCustomerName",keyField:"strCustomerCode"},this),
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode","mandatory":"true",hlpLinkID:"customerlink"},this),
			
			plf.addCombo({"label":"Contract Type",id:"strContractType","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Contract No",id:"strContractNo"}),
			
			plf.addCombo({"label":"Origin",id:"strOrigin","mandatory":"true"}),
			plf.addCombo({"label":"Destination",id:"strDestination","mandatory":"true"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity","mandatory":"true"}),
			plf.addText({"label":"Reference Doc No",id:"strRefDocNo","mandatory":"true",inputFormat:"string",InputLength:"60"}),
			
			plf.addCombo({"label":"Service Type",id:"strServiceType","mandatory":"false"}),
			plf.addCombo({"label":"Consignment Note Generation",id:"strConsNodeGen","mandatory":"true"}),
			plf.addCombo({"label":"Weight Uom",id:"strWeight","mandatory":"true"}),
			plf.addCombo({"label":"Volume Uom",id:"strVolume","mandatory":"true"}),
			
			plf.addDate({"label":"Pickup Date",id:"dtPickUpDate","mandatory":"true"}),
			plf.addText({"label":"Pickup Time",id:"tmPickUpTime","mandatory":"true"}),		
		]
		
		}
		
		else
		{
		
			helpOncustomerRequestCtrl=
		[
			plf.addHlpText({"label":"Material Movement No",id:"strCustomerRequestNo",hlpLinkID:"customerrequest"},this),
			plf.addDate({"label":"Material Movement Date",id:"dtCustomerReqDate","mandatory":"true"}),
			plf.addCombo({"label":"Request Type",id:"strRequestType","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addListEdit({"label":"Customer Name",id:"strCustomerName",keyField:"strCustomerCode"},this),
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode","mandatory":"true",hlpLinkID:"customerlink"},this),
			
			plf.addCombo({"label":"Contract Type",id:"strContractType","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Contract No",id:"strContractNo"}),
			
			plf.addCombo({"label":"Origin",id:"strOrigin","mandatory":"true"}),
			plf.addCombo({"label":"Destination",id:"strDestination","mandatory":"true"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity","mandatory":"true"}),
			plf.addText({"label":"Reference Doc No",id:"strRefDocNo","mandatory":"true",inputFormat:"string",InputLength:"60"}),
			
			plf.addCombo({"label":"Service Type",id:"strServiceType","mandatory":"true"}),
			plf.addCombo({"label":"Consignment Note Generation",id:"strConsNodeGen","mandatory":"true"}),
			plf.addCombo({"label":"Weight Uom",id:"strWeight","mandatory":"true"}),
			plf.addCombo({"label":"Volume Uom",id:"strVolume","mandatory":"true"}),
			
			plf.addDate({"label":"Pickup Date",id:"dtPickUpDate","mandatory":"true"}),
			plf.addText({"label":"Pickup Time",id:"tmPickUpTime","mandatory":"true"}),	  	
		]
		
		}
		
		
		helpOncustomerMatReqCtrlObj=
		[
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",width:80,editControl:"textbox",inputFormat:"string",InputLength:"40"},
			{columnname:"Item<br>Description",dataname:"ITEM_DESCRIPTION",datatype:"string",width:90,editControl:"textbox",inputFormat:"string",InputLength:"100"},
			{columnname:"Quantity",dataname:"QUANTITY",datatype:"string",width:60,editControl:"textbox",inputFormat:"integer",InputLength:"20"},
			{columnname:"Quantity<br>Uom",dataname:"QUANTITY_UOM",datatype:"string",width:80,editControl:"combo",storeId:"strQtyUom"},
			{columnname:"Package<br>Type",dataname:"PACKAGE_TYPE",datatype:"string",width:80,editControl:"combo",storeId:"strPackageType"},
			{columnname:"No Of<br>Packages",dataname:"NO_OF_PCKGS",datatype:"string",width:80,editControl:"textbox",inputFormat:"integer",InputLength:"20"},
			{columnname:"Weight",dataname:"WEIGHT",datatype:"string",width:80,editControl:"textbox",inputFormat:"numeric",InputPrecision:"2"},
			{columnname:"Volume",dataname:"VOLUME",datatype:"string",width:80,editControl:"textbox",inputFormat:"numeric",InputPrecision:"2"},
			{columnname:"Pick Up<br>Point",dataname:"PICK_UP_POINT",datatype:"string",width:100,editControl:"combo",storeId:"strPickUpPoint"},
			{columnname:"Pick Up<br>Address",dataname:"PICK_UP_ADDRESS",datatype:"string",width:100,editControl:"textbox",inputFormat:"string",InputLength:"100"},
			{columnname:"Pick Up<br>Date",dataname:"PICKUP_DATE",datatype:"string",width:80,editControl:"date"},
			{columnname:"Pick Up<br>Time",dataname:"PICKUP_TIME",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"Delivery<br>Point",dataname:"DELIVERY_POINT",datatype:"string",width:100,editControl:"combo",storeId:"strDeliveryPoint"},
			{columnname:"Delivery<br>Address",dataname:"DELIVERY_ADDRESS",datatype:"string",width:80,editControl:"textbox",inputFormat:"string",InputLength:"20"},
			//{columnname:"Delivery<br>Date",dataname:"DEIVER_DATE_TIME",datatype:"string",width:100,editControl:"textbox",hidden:true},
            //{columnname:"Delivery<br>Time",dataname:"DEIVER_DATE_TIME",datatype:"string",width:100,editControl:"textbox",hidden:true},
		]
		helpOncustomerMatReqGridDtl=
		{
			title:"Material Details",
			id:"matGridObj",
			visibleRow:5,
			detail:helpOncustomerMatReqCtrlObj,
			
		}
		helpOncustomerMatReqGridSection = plf.addGrid(helpOncustomerMatReqGridDtl,this)	
		
		
		helpOncustomerMatReqCtrl1Obj=
		[
			{columnname:"Reference Document type",dataname:"REF_DOC_TYPE",datatype:"string",width:200,editControl:"combo",storeId:"strRefDocType"},
			{columnname:"Reference Document No",dataname:"REF_DOC_NO",datatype:"string",editControl:"textbox",width:200,inputFormat:"string",InputLength:"40"},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:200,inputFormat:"string",InputLength:"80"}
	    ]
		helpOncustomerMatGrid1Dtl=
		{
			title:"Reference Details",
			id:"refGridObj",
			visibleRow:2,
			detail:helpOncustomerMatReqCtrl1Obj,
	
		}
		
		
		var passRefDocDtl =  plf.addCollapseSection({title:"Reference Details",collapsed:true})
		helpOncustomerMatReqGrid1Section = plf.addGrid(helpOncustomerMatGrid1Dtl)	
		passRefDocDtl.add(helpOncustomerMatReqGrid1Section)
		
		plf.columns=4
		weightColumn = plf.addColumnSection({});
	    helpOnWeightCtrl=
		[
		   plf.addBlank(),
		   plf.addBlank(),
		   plf.addBlank(),
		   plf.addDisplayOnly({"label":"Total Weight",id:"iTotalWeightt"}),
		  // plf.addDisplayOnly({"label":"Total Weight Uom",id:"iTotWeightUom"}),
		   plf.addBlank(),
		   plf.addBlank(),
		   plf.addBlank(),
	       plf.addDisplayOnly({"label":"Total Volume",id:"iTotalVolume"}),
		  // plf.addDisplayOnly({"label":"Total Volume Uom",id:"iTotalVolumeUom"})
		  
		]
		weightColumn.add(helpOnWeightCtrl)
		
		
		customerRequestColumn.add(helpOncustomerRequestCtrl);
			
	
		mainpage.ptrMainSection.add(customerRequestColumn)
		mainpage.ptrMainSection.add(helpOncustomerMatReqGridSection)
		mainpage.ptrMainSection.add(passRefDocDtl)
		mainpage.ptrMainSection.add(weightColumn)
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		
		// Event Handlers Mapping Begins
	
		
		
		mainpage.hlpLinks=
		{
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
				"customerrequest":
				{
					"hlpType":"Header",
					"hlpScreen":"customerrequest.CustomerRequestHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCustomerRequestNo","child":"CUST_REQ_NO"}
							]
				}
					
		}		
		
		mainpage.eventHandlers = 
		[
	        {
				"controlid":"",
				"tasktype":"onload",
				"input":["strCustomerRequestNo"],
				"service":"CoreCustomerRequest",
				"methodName":"initCustomerRequestTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strCustomerRequestNo","dtCustomerReqDate","strRequestType","strStatus",
				"strContractNo","strCustomerCode","strRefDocNo","strOrigin","strDestination",
				"strContractType","dtPickUpDate","tmPickUpTime","strServiceType","strConsNodeGen",
				"strCommodity","strWeight","strVolume","matGridObj","refGridObj"	
				],
				"service":"CoreCustomerRequest",
				"methodName":"createCustomerRequestTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strCustomerRequestNo","dtCustomerReqDate","strRequestType","strStatus","strContractNo","strCustomerCode","strRefDocNo","strOrigin","strDestination","strCommodity","strWeight","strVolume","matGridObj","refGridObj",,"strContractType","dtPickUpDate","tmPickUpTime","strServiceType","strConsNodeGen"],
				"service":"CoreCustomerRequest",
				"methodName":"editCustomerRequestTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Authorize",
				"input":["strCustomerRequestNo","dtCustomerReqDate","strRequestType","strStatus","strContractNo","strCustomerCode","strRefDocNo","strOrigin","strDestination","strCommodity","strWeight","strVolume","matGridObj","refGridObj",,"strContractType","dtPickUpDate","tmPickUpTime","strServiceType","strConsNodeGen"],
				"service":"CoreCustomerRequest",
				"methodName":"authoriseCustomerRequestTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strCustomerRequestNo","dtCustomerReqDate","strRequestType","strStatus","strContractNo","strCustomerCode","strRefDocNo","strOrigin","strDestination","strCommodity","strWeight","strVolume","matGridObj","refGridObj",,"strContractType","dtPickUpDate","tmPickUpTime","strServiceType","strConsNodeGen"],
				"service":"CoreCustomerRequest",
				"methodName":"deleteCustomerRequestTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"ShortClose",
				"input":["strCustomerRequestNo","dtCustomerReqDate","strRequestType","strStatus","strContractNo","strCustomerCode","strRefDocNo","strOrigin","strDestination","strCommodity","strWeight","strVolume","matGridObj","refGridObj",,"strContractType","dtPickUpDate","tmPickUpTime","strServiceType","strConsNodeGen"],
				"service":"CoreCustomerRequest",
				"methodName":"shortCloseCustomerRequestTS"
			},
			{
					"controlid":"strCustomerRequestNo",
					"tasktype":"onenter",
					"input":["strCustomerRequestNo","strWeight"],
					"service":"CoreCustomerRequest",
					"methodName":"fetchCustReqDtsTS"
			},
			{
					"controlid":"strCustomerCode",
					"tasktype":"onenter",
					"input":["strCustomerCode"],
					"service":"CoreCustomerRequest",
					"methodName":"fetchCustomerNameTS"
			},	
			{
					"controlid":"strContractType",
					"tasktype":"onchange",
					"input":["strContractType","strCustomerCode"],
					"service":"CoreCustomerRequest",
					"methodName":"fetchContractNumberTS"
			},
			
		];			
		
		this.callParent(arguments);
		
	}
});
