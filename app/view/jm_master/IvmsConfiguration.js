/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	                           Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.IvmsConfiguration', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "IVMS Configuration";
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= 
			[{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create IVMS entry."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit IVMS entry."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete IVMS entry."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate IVMS entry."
            },
            {
                "name": "Inactive",
                "tooltip": "Click here to inactive IVMS entry."
            }
            ]	
			
		//Add Keyfields
		mainpage.keyFields=["strDeviceCode"]
		plf.columns=4
		var deviceMstrColumn = plf.addColumnSection({});			//69995
		var deviceMasterCtrl=										//69995
		[	
			plf.addHlpText({"label":"IVMS Entry Code",id:"strIvmsEntryCode","mandatory":"true",hlpLinkID:"entryIDe",inputFormat:"string",InputLength:"40"},this),
			plf.addText({"label":"Description",id:"strDescription","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addCombo({"label":"IVMS Provider",id:"strIvmsProvider","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addHlpText({"label":"Carrier Code",id:"strTruckOwnerCode","mandatory":"true",hlpLinkID:"truckownercode",inputFormat:"string",InputLength:"40"},this),
			plf.addDisplayOnly({"label":"Carrier Name",id:"strTruckOwnerName"}),
			plf.addText({"label":"Web URL",id:"strWebUrl","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addText({"label":"Username",id:"strUsername","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addText({"label":"Password",id:"strPassword","mandatory":"true",inputFormat:"string",InputLength:"100"})
		]
		deviceMstrColumn.add(deviceMasterCtrl);
			
			
		var ivmsGridobj=
		[   			
			{columnname:"IVMS Vehicle Code",dataname:"IVMS_VEHCODE",storeId:"strIvmsVehCode",datatype:"string",editControl:"textbox",width:250},
			{columnname:"Internal Vehicle Code",dataname:"INTERNAL_VEHCODE",storeId:"strIntVehCode",datatype:"string",editControl:"textbox",width:250,helpid:'truckCode',"onenter":"TRUCK_CODE_ONENTER"}
		]
		
		var IVMSConfigGridDtl=
		{
			title:"IVMS Vehicle to Internal Vehicle Mapping",
			id:"ivmsGrid",
			detail:ivmsGridobj,
			visibleRow:10			
		}
		var IVMSConfigDocGridSection = plf.addGrid(IVMSConfigGridDtl,this)	
			
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		mainpage.ptrMainSection.add(deviceMstrColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(IVMSConfigDocGridSection)//Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[		
		   {
			"controlid":"",
			"tasktype":"onload",
			"input":["strIvmsEntryCode"],
			"service":"CoreTruckService",
			"methodName":"initIvmsConloadTS"
			},
			
			{
				   "controlid":"strIvmsEntryCode",
					"tasktype":"onenter",
					"input":["strIvmsEntryCode"],
					"service":"CoreTruckService",
					"methodName":"fetchIvmsConenterTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Create",
					"input":["strIvmsEntryCode","strDescription","strIvmsProvider","strTruckOwnerCode","strStatus",
							 "strTruckOwnerName","strWebUrl","strUsername","strPassword","ivmsGrid"],
					"service":"CoreTruckService",
					"methodName":"createIvmsConfigTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Edit",
					"input":["strIvmsEntryCode","strDescription","strIvmsProvider","strTruckOwnerCode","strStatus",
							 "strTruckOwnerName","strWebUrl","strUsername","strPassword","ivmsGrid"],
					"service":"CoreTruckService",
					"methodName":"modifyIvmsConfigTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Delete",
					"input":["strIvmsEntryCode","strDescription","strIvmsProvider","strTruckOwnerCode","strStatus",
							 "strTruckOwnerName","strWebUrl","strUsername","strPassword","ivmsGrid"],
					"service":"CoreTruckService",
					"methodName":"deleteIvmsConfigTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Activate",
					"input":["strIvmsEntryCode","strDescription","strIvmsProvider","strTruckOwnerCode","strStatus",
							 "strTruckOwnerName","strWebUrl","strUsername","strPassword","ivmsGrid"],
					"service":"CoreTruckService",
					"methodName":"activateIvmsConfigTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Inactive",
					"input":["strIvmsEntryCode","strDescription","strIvmsProvider","strTruckOwnerCode","strStatus",
							 "strTruckOwnerName","strWebUrl","strUsername","strPassword","ivmsGrid"],
					"service":"CoreTruckService",
					"methodName":"inactivateIvmsConfigTS"
			}
		];
		
		mainpage.hlpLinks=
		{
			"entryIDe":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.IvmsConfigurationHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strIvmsEntryCode","child":"IVMS_ENTRY_CODE"}
							]
				},
				"truckownercode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCarrierCode","child":"CARRIER_CODE"}
							]
				},
				"truckCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strIntVehCode","child":"INTERNAL_VEHCODE"}
							]
				}
				
		}
		
		
		
		this.callParent(arguments);
			
	}
});
