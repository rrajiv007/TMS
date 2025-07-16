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
Ext.define('CueTrans.view.VehicleRequest.VehicleRequestMaster', 
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
	//	mainpage.toolbarActions=["Refresh","Create","Edit","Delete","Confirm","Shortclose"]
		
		
		
		//InspectionMaster Header Section Begins
		plf.columns=4
		var servicebasedColumn = plf.addColumnSection({});		//69997
		var serviceMstrCtrl=									//69997
		[   
		
				plf.addHlpText({"label":"Service Request No",id:"strVehicleRequestNo",hlpLinkID:"vehicleRequestNo",inputFormat:"string",InputLength:"40"},this),
				plf.addDate({"label":"Request Date",id:"dtVehicleRequestDate","mandatory":"true"}),
				plf.addText({"label":"Ref Doc No",id:"strReferenceDocNo",inputFormat:"string",InputLength:"40"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),

				plf.addListEdit({"label":"Customer Name",id:"strCustomerName",keyField:"strCustomerCode",inputFormat:"string",InputLength:"40"},this),
				plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"CustomerCode","mandatory":"true",inputFormat:"string",InputLength:"40"},this),				
				plf.addCombo({"label":"Contract Type",id:"strContractType"}),
				plf.addDisplayOnly({"label":"Contract No",id:"strContractNo","mandatory":"true"})
				
		]
		servicebasedColumn.add(serviceMstrCtrl);
		servicebasedColumn.add(plf.addStripLine({}));

		var serviceRequestObj=						//69997
		[
			
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",editControl:"combo",width:100,storeId:"strOrigin"},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",editControl:"combo",width:100,storeId:"strDestination"},
			{columnname:"Required From Date",dataname:"REQUIRED_FROM_DATE",datatype:"string",editControl:"date",width:150},
			{columnname:"Required From Time",dataname:"REQUIRED_FROM_TIME",datatype:"string",storeId:"",editControl:"textbox",width:150},
			{columnname:"Required To Date",dataname:"REQUIRED_TO_DATE",datatype:"string",editControl:"date",width:150},
			{columnname:"Required To Time",dataname:"REQUIRED_TO_TIME",datatype:"string",storeId:"",editControl:"textbox",width:150},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",storeId:"strVehicleCategory",editControl:"combo",width:150},
			{columnname:"No of Vehicles",dataname:"NO_OF_VEHICLES",datatype:"string",editControl:"textbox",width:150}
		]
		serviceReqGridDtl =
		{
			title:"",
			id:"vehicleGrid",
			detail:serviceRequestObj
		}
		
		var serviceRequestObj1=						//69997
		[
			
			{columnname:"Reference Document Type",dataname:"REFERNECE_DOCUMENT_TYPE",datatype:"string",editControl:"combo",width:200,storeId:"strReferenceDocType"},
			{columnname:"Reference Document No",dataname:"REFERENCE_DOCUMENT_NO",datatype:"string",editControl:"textbox",width:150,inputFormat:"string",InputLength:"40"},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:150,inputFormat:"string",InputLength:"100"}			
		]
		serviceReqGridDt2 =
		{
			title:"",
			id:"referenceGrid",
			detail:serviceRequestObj1
		}
		
	//	var passRefDocDt =  plf.addCollapseSection({title:"Vehicle Details",collapsed:true})
		vehicleGridSection1 = plf.addGrid(serviceReqGridDtl,this)	
	//	passRefDocDt.add(vehicleGridSection1)
		
		var passRefDocDtl =  plf.addCollapseSection({title:"Reference Details",collapsed:true})
		referenceGridSection1 = plf.addGrid(serviceReqGridDt2,this)	
		passRefDocDtl.add(referenceGridSection1)
		//InspectionMaster Grid Section Ends
		
		
		
		
		
		mainpage.ptrMainSection.add(servicebasedColumn)//Add Header Section to Main Page
		//mainpage.ptrMainSection.add(inspectionMstrFieldSt)//Add Header Section to Main Page
		//mainpage.ptrMainSection.add(inspectionMstrGridSection)
	//	mainpage.ptrMainSection.add(passRefDocDt)
		mainpage.ptrMainSection.add(vehicleGridSection1)
		mainpage.ptrMainSection.add(passRefDocDtl)
		//Add Grid Section to Main Page
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		
		      
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreVehicleRequest",
				"methodName":"initVehicleRequestMasterScrTS"
		},
		{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Create",
				    "input":["strVehicleRequestNo","dtVehicleRequestDate","strRequestType","strStatus","strCustomerCode","strCustomerName","strContractType","strContractNo","vehicleGrid","referenceGrid","strReferenceDocNo"],
					"service":"CoreVehicleRequest",
					"methodName":"createVehicleRequestTS"
					
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Edit",
				    "input":["strVehicleRequestNo","dtVehicleRequestDate","strRequestType","strStatus","strCustomerCode","strCustomerName","strContractType","strContractNo","vehicleGrid","strDestination","strCommodity","inspectionCache",
					"referenceGrid","strReferenceDocNo"],
					"service":"CoreVehicleRequest",
					"methodName":"modifyVehicleRequestTS"
					
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Delete",
				    "input":["strVehicleRequestNo","dtVehicleRequestDate","strRequestType","strStatus","strCustomerCode","strCustomerName","strContractType","strContractNo","strOrigin","strDestination","strCommodity","inspectionCache",
					"inspectionCache1","strReferenceDocNo"],
					"service":"CoreVehicleRequest",
					"methodName":"deleteVehicleRequestTS"
					
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Confirm",
				   "input":["strVehicleRequestNo","dtVehicleRequestDate","strRequestType","strStatus","strCustomerCode","strCustomerName","strContractType","strContractNo","vehicleGrid","strDestination","strCommodity","inspectionCache",
					"referenceGrid","strReferenceDocNo"],
					"service":"CoreVehicleRequest",
					"methodName":"AuthoriseVehicleRequestTS"
					
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Shortclose",
				    "input":["strVehicleRequestNo","dtVehicleRequestDate","strRequestType","strStatus","strCustomerCode","strCustomerName","strContractType","strContractNo","strOrigin","strDestination","strCommodity","inspectionCache",
					"inspectionCache1","strReferenceDocNo"],
					"service":"CoreVehicleRequest",
					"methodName":"shortcloseVehicleRequestTS"
					
			},
			{
					"controlid":"strVehicleRequestNo",
					"tasktype":"onenter",
					"input":["strVehicleRequestNo"],
					"service":"CoreVehicleRequest",
					"methodName":"fetchVehicleRequestDetailsTS"

				},
				{
					"controlid":"strCustomerCode",
					"tasktype":"onenter",
					"input":["strCustomerCode","strContractType","strContractNo"],
					"service":"CoreVehicleRequest",
					"methodName":"fetchCustomerDetailsTS"

				},
				{
					"controlid":"strContractType",
					"tasktype":"onchange",
					"input":["strContractType","strCustomerCode","strContractNo"],
					"service":"CoreVehicleRequest",
					"methodName":"fetchContractNumberTS"
			}
		
			];
	
		mainpage.hlpLinks=
		{
			"vehicleRequestNo":
				{
					"hlpType":"Header",
					"hlpScreen":"VehicleRequest.VehicleRequestHelp",
					"send":[
							{"parent":"strVehicleRequestNo","child":"VEHICLE_REQUEST_NO"}
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
							{"parent":"strCustomerCode","child":"CUST_CODE"}
						   ],
					"receive":[
							{"parent":"strCustomerCode","child":"CUST_CODE"},
							{"parent":"strCustomerName","child":"CUST_NAME"}
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
