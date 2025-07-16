/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
		                                   
************************************************************************************************/
Ext.define('CueTrans.view.service.VehicleRequestMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Service Request";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create service request."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit service request."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete service request."
            },
            {
                "name": "Confirm",
                "tooltip": "Click here to confirm service request."
            }/*,
            {
                "name": "Short Close",
                "tooltip": "Click here to short close service request."
            }*/
            ]
		
		//Service Request Header Section Begins
		plf.columns=4
		var servicebasedColumn = plf.addColumnSection({});
		var serviceMstrCtrl=
		[  		
		plf.addHlpText({"label":"Service Request No",id:"strVehicleRequestNo",hlpLinkID:"vehicleRequestNo",inputFormat:"string",InputLength:"40"},this),
		plf.addDate({"label":"Request Date",id:"dtVehicleRequestDate","mandatory":"true"}),
		plf.addText({"label":"Ref Doc No",id:"strReferenceDocNo",inputFormat:"string",InputLength:"40"}),
		plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
		plf.addListEdit({"label":"Customer Name",id:"strCustomerName",keyField:"strCustomerCode",inputFormat:"string",InputLength:"40"},this),
		plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"CustomerCode","mandatory":"true",inputFormat:"string",InputLength:"40"},this),				
		plf.addCombo({"label":"Service Type",id:"strServiceType"}),
		plf.addHlpText({"label":"Service Group ID",id:"strServiceGroup",hlpLinkID:"servicegroupid"},this),				
		plf.addCombo({"label":"Origin",id:"strOrigin1"}),			
		plf.addCombo({"label":"Destination",id:"strDestination1"})				
		]
		servicebasedColumn.add(serviceMstrCtrl);
		servicebasedColumn.add(plf.addStripLine({}));
		//Service Request Header Section ends
		
		//Vehicle Details Section Begins
		var VehicleDtlObj=
		[			
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",editControl:"combo",width:100,storeId:"strOrigin"},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",editControl:"combo",width:100,storeId:"strDestination"},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",storeId:"strVehicleCategory",editControl:"combo",width:150},
			{columnname:"No of Vehicles",dataname:"NO_OF_VEHICLES",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Required From Date",dataname:"REQUIRED_FROM_DATE",datatype:"string",editControl:"date",width:150},
			{columnname:"Required From Time",dataname:"REQUIRED_FROM_TIME",datatype:"string",storeId:"strReqFromTime",editControl:"time",width:150},
			{columnname:"Required To Date",dataname:"REQUIRED_TO_DATE",datatype:"string",editControl:"date",width:150},
			{columnname:"Required To Time",dataname:"REQUIRED_TO_TIME",datatype:"string",storeId:"strReqToTime",editControl:"time",width:150}			
		]
		var VehicleDtlGrid =
		{
			title:"Vehicle Details",
			id:"vehicleGrid",
			detail:VehicleDtlObj,
			visibleRow:10
		}
		var vehicleGridSection = plf.addGrid(VehicleDtlGrid,this)
		//Vehicle Details Section ends
		
		//Reference Details Section starts
		var ReferenceDocObj=
		[			
			{columnname:"Reference Document Type",dataname:"REFERENCE_DOCUMENT_TYPE",datatype:"string",editControl:"combo",width:200,storeId:"strRefDocType"},
			{columnname:"Reference Document No",dataname:"REFERENCE_DOCUMENT_NO",datatype:"string",editControl:"textbox",width:150,inputFormat:"string",InputLength:"40"},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:150,inputFormat:"string",InputLength:"100"}			
		]
		var ReferenceDocGridDtl =
		{
			title:"",
			id:"referenceGrid",
			detail:ReferenceDocObj
		}
		var passRefDocDtl =  plf.addCollapseSection({title:"Reference Details",collapsed:true})
		var referenceGridSection = plf.addGrid(ReferenceDocGridDtl,this)	
		passRefDocDtl.add(referenceGridSection)
		//Reference Details Section ends	
		
		/*Cost Center starts here*/
		plf.columns=4
		var serviceCostPanel = plf.addColumnSection({});
		
		var serviceCostFormCtrl=
		[
			plf.addHlpText({"label":"Cost Center Code",id:"strCostCenterCode","mandatory":"true",hlpLinkID:"CostCenter"},this),	
			plf.addDisplayOnly({"label":"Cost Center Name",id:"strCostCenterName"}),
			plf.addDisplayOnly({"label":"Cost Object Type",id:"strCostObjType"}),
			plf.addDisplayOnly({"label":"Operation A/C No",id:"strOperAccNo"})			
		]
		serviceCostPanel.add(serviceCostFormCtrl);
		/*Cost Center ends here*/
		
		mainpage.ptrMainSection.add(servicebasedColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(vehicleGridSection)
		mainpage.ptrMainSection.add(passRefDocDtl)
		mainpage.ptrMainSection.add(serviceCostPanel)
		//Add Grid Section to Main Page
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[		
		      
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strVehicleRequestNo"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"initVehicleRequestMasterScrTS"
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strCostCenterCode","strVehicleRequestNo","dtVehicleRequestDate","strReferenceDocNo","strCustomerCode","strServiceType","strServiceGroup","strOrigin1","strDestination1","vehicleGrid","referenceGrid"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"createVehicleRequestTS"
					
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strCostCenterCode","strVehicleRequestNo","dtVehicleRequestDate","strReferenceDocNo","strCustomerCode","strServiceType","strServiceGroup","strOrigin1","strDestination1","vehicleGrid","referenceGrid"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"modifyVehicleRequestTS"
					
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strCostCenterCode","strVehicleRequestNo","dtVehicleRequestDate","strReferenceDocNo","strCustomerCode","strServiceType","strServiceGroup","strOrigin1","strDestination1","vehicleGrid","referenceGrid"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"deleteVehicleRequestTS"
					
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["strCostCenterCode","strVehicleRequestNo","dtVehicleRequestDate","strReferenceDocNo","strCustomerCode","strServiceType","strServiceGroup","strOrigin1","strDestination1","vehicleGrid","referenceGrid"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"AuthoriseVehicleRequestTS"
					
			},
			/*{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Shortclose",
				"input":["strCostCenterCode","strVehicleRequestNo","dtVehicleRequestDate","strReferenceDocNo","strCustomerCode","strServiceType","strServiceGroup","strOrigin1","strDestination1","vehicleGrid","referenceGrid"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"shortcloseVehicleRequestTS"
					
			},*/
			{
				"controlid":"strVehicleRequestNo",
				"tasktype":"onenter",
				"input":["strVehicleRequestNo"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"fetchVehicleRequestDetailsTS"

			},
			{
				"controlid":"strCustomerCode",
				"tasktype":"onenter",
				"input":["strCustomerCode"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"fetchCustomerDtlTS"
			},			
			{
				"controlid":"strServiceGroup",
				"tasktype":"onenter",
				"input":["strServiceGroup"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"fetchServiceGrpDetailsTS"

			},
			{
				"controlid":"strCostCenterCode",
				"tasktype":"onenter",
				"input":["strCostCenterCode"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"onenterCostCenterCodeTS"
			},
			{
				"controlid":"strServiceType",
				"tasktype":"onchange",
				"input":["strServiceType"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"fetch_Service_type_VehicleRequest"
			}
			/*,
			{
				"controlid":"strCustomerCode",
				"tasktype":"onenter",
				"input":["strCustomerCode","strContractType","strContractNo"],
				"service":"CoreServiceGroup",
				"methodName":"fetchCustomerDetailsTS"

			},
			{
				"controlid":"strContractType",
				"tasktype":"onchange",
				"input":["strContractType","strCustomerCode","strContractNo"],
				"service":"CoreServiceGroup",
				"methodName":"fetchContractNumberTS"
			}*/		
			];
	
		mainpage.hlpLinks=
		{
			"vehicleRequestNo":
				{
					"hlpType":"Header",
					"hlpScreen":"service.VehicleRequestHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strVehicleRequestNo","child":"VEHICLE_REQUEST_NO"}
							]
				},
				"CustomerCode":
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
				},
				"CostCenter":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CostCenterHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCostCenterCode","child":"COST_CENTER_CODE"},
							{"parent":"strCostCenterName","child":"COST_CENTER_NAME"},
							{"parent":"strCostObjType","child":"COST_OBJECT_TYPE"},
							{"parent":"strOperAccNo","child":"OPERATIONS_ACC_NO"}
							]
				},
				"servicegroupid":
				{
					"hlpType":"Header",
					"hlpScreen":"service.ServiceGroupHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strServiceGroup","child":"SERVICE_ID"}							
							]
				}
				
			
		}
		/*
		mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":[""]
			},
			"locked":
			{
				"enableAll":false,
				"except":["strVehicleRequestNo"]
			}
					
		}
		
		mainpage.screenLinks=
		{
			
				
		}*/
		
		//To for an empty Inspection ADvice Screen
		//Event Handlers Mapping Ends
		
		//Generate Screen Section
		/*mainpage.generateScreen();
		
		
		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
			
	}
});
