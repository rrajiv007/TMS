Ext.define('CueTrans.view.tms.TransRequestVehicleBased', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Vehicle Request";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create a request."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a request."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a request."
            },
            {
                "name": "Confirm",
                "tooltip": "Click here to confirm a request."
            },
            {
                "name": "Short Close",
                "tooltip": "Click here to short close a request."
            }
            ]
		//mainpage.toolbarActions=["Refresh","Create","Edit","Delete","Confirm","Short Close"]
		
		//Add Keyfields
		mainpage.keyFields=["strTransporReqNo"]
		//Driver Master Section Begins
		plf.columns=4
		VehicleBasedColumn1 = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			VehicleBasedCtrl1=
			[	
			    plf.addHlpText({"label":"Request No",id:"strRequestNo",hlpLinkID:"transreqno"},this),	
				plf.addDate({"label":"Request Date",id:"dtRequestDate","mandatory":"true"}),
				plf.addCombo({"label":"Commodity",id:"strCommodity"}),
				//plf.addCombo({"label":"Request Type",id:"strRequestType"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addCombo({"label":"Origin",id:"strOrigin","mandatory":"true"}),
				plf.addCombo({"label":"Destination",id:"strDestination","mandatory":"true"}),
				//plf.addCombo({"label":"Commodity",id:"strCommodity"}),
				plf.addText({"label":"Ref Doc No",id:"strDocNo","mandatory":"true",inputFormat:"string",InputLength:"40"}),
				plf.addDisplayOnly({"label":"Demand Status",id:"strDemandStatus"}),
				plf.addCombo({"label":"Priority",id:"strPriority"}),
				plf.addCombo({"label":"Weight UOM",id:"strWeightUom"}),
				plf.addCombo({"label":"Volume UOM",id:"strVolumeUom"}),
				plf.addBlank()
			]
		
		}
		
		else
		{
			VehicleBasedCtrl1=
			[	
				plf.addHlpText({"label":"Request No",id:"strRequestNo",hlpLinkID:"transreqno"},this),	
				plf.addDate({"label":"Request Date",id:"dtRequestDate","mandatory":"true"}),
				plf.addCombo({"label":"Commodity",id:"strCommodity"}),
				//plf.addCombo({"label":"Request Type",id:"strRequestType"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addCombo({"label":"Origin",id:"strOrigin","mandatory":"true"}),
				plf.addCombo({"label":"Destination",id:"strDestination","mandatory":"true"}),
				//plf.addCombo({"label":"Commodity",id:"strCommodity"}),
				plf.addText({"label":"Ref Doc No",id:"strDocNo","mandatory":"true",inputFormat:"string",InputLength:"40"}),
				plf.addDisplayOnly({"label":"Demand Status",id:"strDemandStatus"}),
				plf.addCombo({"label":"Priority",id:"strPriority"}),
				plf.addCombo({"label":"Weight UOM",id:"strWeightUom"}),
				plf.addCombo({"label":"Volume UOM",id:"strVolumeUom"}),
				plf.addBlank()
			]
		}	
		
		VehicleBasedColumn1.add(VehicleBasedCtrl1); 
		
		VehicleBasedColumn2 = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			VehicleBasedCtrl2=
			[	
			    plf.addListEdit({"label":"Customer Name",id:"strCustomerName",keyField:"strCustomerCode"},this),
				plf.addHlpText({"label":"Customer Code",id:"strCustomerCode","mandatory":"true",hlpLinkID:"customerlink"},this),	
				
				plf.addCombo({"label":"Contract Type",id:"strContractType"}),
				plf.addText({"label":"Contract No",id:"strContractNo",inputFormat:"string",InputLength:"40"}),
				plf.addDate({"label":"Pickup Date",id:"dtPickUpDateTime"}),
				plf.addText({"label":"Pick Up Time",id:"tmPickUpTime"}),
				plf.addDate({"label":"Delivery Date ",id:"dtRosDateTime"}),
				plf.addText({"label":"Delivery Time",id:"tmROSTime"})
			
			]
		
		}
		
		else
		{
			VehicleBasedCtrl2=
			[	
				plf.addListEdit({"label":"Customer Name",id:"strCustomerName",keyField:"strCustomerCode"},this),
				plf.addHlpText({"label":"Customer Code",id:"strCustomerCode","mandatory":"true",hlpLinkID:"customerlink"},this),	
				
				plf.addCombo({"label":"Contract Type",id:"strContractType"}),
				plf.addText({"label":"Contract No",id:"strContractNo",inputFormat:"string",InputLength:"40"}),
				plf.addDate({"label":"Pickup Date",id:"dtPickUpDateTime"}),
				plf.addText({"label":"Pick Up Time",id:"tmPickUpTime"}),
				plf.addDate({"label":"Delivery Date ",id:"dtRosDateTime"}),
				plf.addText({"label":"Delivery Time",id:"tmROSTime"})
			]
		}	
		
		VehicleBasedColumn2.add(VehicleBasedCtrl2);
		
		VehicleDetailsGridFieldObj1=
		[   
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",storeId:"strVehicleCategory",editControl:"combo",width:160},
			{columnname:"No Of Vehicles",dataname:"NO_OF_VEHICLES",datatype:"string",editControl:"textbox",width:250,inputFormat:"integer",InputLength:"20"},
			{columnname:"Weight",dataname:"WEIGHT",datatype:"string",editControl:"textbox",width:200,inputFormat:"numeric",InputPrecision:"0"}
			
		]
		VehicleDetailsGridDtl1=
		{
			title:"Vehicle Details(Plan)",
			id:"VehDetail",
			detail:VehicleDetailsGridFieldObj1,
		
		}
		VehicleDetailsGridSection1 = plf.addGrid(VehicleDetailsGridDtl1)
		
		
        MaterialDetailsGridFieldObj2=
		[   
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",editControl:"",width:140,inputFormat:"string",InputLength:"40"},
			{columnname:"Item Description",dataname:"ITEM_DESC",datatype:"string",editControl:"",width:250,inputFormat:"string",InputLength:"40"},
			{columnname:"Quantity",dataname:"ITEM_QTY",datatype:"string",editControl:"",width:200,inputFormat:"numeric",InputPrecision:"2"},
			{columnname:"Uom",dataname:"ITEM_QTY_UOM",datatype:"string",width:200,editControl:"",storeId:"strQuantityUom",inputFormat:"string",InputLength:"40"
			},
			{columnname:"Weight",dataname:"TOT_WEIGHT",datatype:"string",editControl:"",width:150,inputFormat:"numeric",InputPrecision:"2"},
			{columnname:"Volume",dataname:"TOT_VOLUME",datatype:"string",editControl:"",width:150,inputFormat:"numeric",InputPrecision:"2"},
		]
		MaterialDetailsGridDtl2=
		{
			title:"Material Details(Actual)",
			id:"actDetail",
			detail:MaterialDetailsGridFieldObj2,
			readOnly:true,
			removeAddDelete:true
		
		}
		MaterialDetailsGridSection2 = plf.addGrid(MaterialDetailsGridDtl2)	
		
		VehicleDetailsGridFieldObj3=
		[   
			{columnname:"Reference Document Type",dataname:"REF_DOC_TYPE",storeId:"strRefDocumentType",datatype:"string",width:200,editControl:"combo"},
			{columnname:"Reference Document No",dataname:"REF_DOC_NO",datatype:"string",editControl:"textbox",width:250,inputFormat:"string",InputLength:"40"},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:200,inputFormat:"string",InputLength:"80"}
		]
		VehicleDetailsGridDtl3=
		{
			title:"Reference Details",
			id:"refGrid",
			detail:VehicleDetailsGridFieldObj3,
		
		}
	
		var passRefDocDtl =  plf.addCollapseSection({title:"Reference Details",collapsed:true})
		TransrequestGrid1Section = plf.addGrid(VehicleDetailsGridDtl3,this)	
		passRefDocDtl.add(TransrequestGrid1Section)
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(VehicleBasedColumn1) 
		mainpage.ptrMainSection.add(VehicleBasedColumn2)
		mainpage.ptrMainSection.add(VehicleDetailsGridSection1)	
       	mainpage.ptrMainSection.add(MaterialDetailsGridSection2)
        mainpage.ptrMainSection.add(passRefDocDtl)	
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strRequestNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"initVehicleBasedTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strRequestNo","dtRequestDate","strCommodity","strOrigin","strDestination","strDocNo","strCustomerCode",
				"strCustomerName","strContractType","strContractNo","dtPickUpDateTime","dtRosDateTime","strRequestType","VehDetail","actDetail","refGrid","strWeightUom",
				"strVolumeUom","strPriority","tmPickUpTime","tmROSTime"],
				"service":"TMSCoreTransportTS",
				"methodName":"createVehicleBasedTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strRequestNo","dtRequestDate","strCommodity","strOrigin","strDestination","strDocNo","strCustomerCode",
				"strCustomerName","strContractType","strContractNo","dtPickUpDateTime","dtRosDateTime","strRequestType","VehDetail","actDetail","refGrid","strWeightUom",
				"strVolumeUom","strPriority","tmPickUpTime","tmROSTime"],
				"service":"TMSCoreTransportTS",
				"methodName":"editVehicleBasedTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["strRequestNo","dtRequestDate","strCommodity","strOrigin","strDestination","strDocNo","strCustomerCode",
				"strCustomerName","strContractType","strContractNo","dtPickUpDateTime","dtRosDateTime","strRequestType","VehDetail","actDetail","refGrid","strWeightUom",
				"strVolumeUom","strPriority","tmPickUpTime","tmROSTime"],
				"service":"TMSCoreTransportTS",
				"methodName":"authoriseVehicleBasedTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Short Close",
				"input":["strRequestNo","dtRequestDate","strCommodity","strOrigin","strDestination","strDocNo","strCustomerCode",
				"strCustomerName","strContractType","strContractNo","dtPickUpDateTime","dtRosDateTime","strRequestType","VehDetail","actDetail","refGrid","strWeightUom",
				"strVolumeUom","strPriority","tmPickUpTime","tmROSTime"],
				"service":"TMSCoreTransportTS",
				"methodName":"shortCloseVehicleBasedTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strRequestNo","dtRequestDate","strCommodity","strOrigin","strDestination","strDocNo","strCustomerCode",
				"strCustomerName","strContractType","strContractNo","dtPickUpDateTime","dtRosDateTime","strRequestType","VehDetail","actDetail","refGrid","strWeightUom",
				"strVolumeUom","strPriority","tmPickUpTime","tmROSTime"],
				"service":"TMSCoreTransportTS",
				"methodName":"deleteVehicleBasedTS"
		},
		{
					"controlid":"strRequestNo",
					"tasktype":"onenter",
					"input":["strRequestNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"onenterReqNoTS"
		},
		{
					"controlid":"strCustomerCode",
					"tasktype":"onenter",
					"input":["strCustomerCode"],
					"service":"TMSCoreTransportTS",
					"methodName":"onenterCustomerCodeTS"
		},
		{
					"controlid":"strContractType",
					"tasktype":"onchange",
					"input":["strContractType","strCustomerCode"],
					"service":"TMSCoreTransportTS",
					"methodName":"fetchContractNoTS"
		}
		
		];
		mainpage.hlpLinks=
		{
			"transreqno":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.TransRequestVehicleHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRequestNo","child":"TRANS_REQ_NO"}
							]
				},
				"customerlink":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CustomerHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"CUST_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strCustomerCode","child":"CUST_CODE"},
							{"parent":"strCustomerName","child":"CUST_NAME"}
							]
				}	
		}		
		
		//Event Handlers Mapping Ends
		
		//Generate Screen Section
		/*mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":["strCategoryName"]
			},
			"locked":
			{
				"enableAll":false,
				"except":["strCategoryName"]
			},
			"active":
			{
				"enableAll":false,
				"except":["strCategoryName"]
			}		
}		*/	
		//mainpage.generateScreen();
		
		
		/*Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
			
	}
});
