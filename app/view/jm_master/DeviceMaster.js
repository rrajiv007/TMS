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
Ext.define('CueTrans.view.jm_master.DeviceMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Device Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create device."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit device."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete device."
            }
         , {
                "name": "Activate",
                "tooltip": "Click here to activate device."
            },
            {
                "name": "Inactive",
                "tooltip": "Click here to inactive device."
            }
            ]
		
		//Add Keyfields
		mainpage.keyFields=["strDeviceCode"]
		//Device Master Section Begins
		plf.columns=4
		var deviceMstrColumn = plf.addColumnSection({});			//69995
		var deviceMasterCtrl=										//69995	
		[	
			plf.addHlpText({"label":"Device ID",id:"strDeviceID","mandatory":"true",hlpLinkID:"deviceID",inputFormat:"string",InputLength:"40"},this),
			plf.addText({"label":"Description",id:"strDescription","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addText({"label":"ESN",id:"strEsn","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			//plf.addCombo({"label":"Base Location",id:"strBaseLoc","mandatory":"true"}),
			plf.addCombo({"label":"Source",id:"strSource","mandatory":"true"}),
			plf.addCombo({"label":"Device Type",id:"strDeviceType","mandatory":"true"}),
			plf.addText({"label":"Device Model",id:"strDeviceModel","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addCombo({"label":"Supplier",id:"strSupplier","mandatory":"true"}),
			plf.addText({"label":"Remarks",id:"strRemarks",inputFormat:"string",InputLength:"100"})
		]
		deviceMstrColumn.add(deviceMasterCtrl);
		//Device Master Section Ends
		
		mainpage.ptrMainSection.add(deviceMstrColumn) //Add Header Section to Main Page
				
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
				{
					"controlid":"strDeviceID",
					"tasktype":"onload",
					"input":["strDeviceID"],
					"service":"CoreTruckService",
					"methodName":"initDeviceMstTS"
				},
				{
					"controlid":"strDeviceID",
					"tasktype":"onenter",
					"input":["strDeviceID"],
					"service":"CoreTruckService",
					"methodName":"fetchOnEnterDeviceTS"
				},	
		
				{
			
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Create",
				"input":["strDeviceID","strDescription","strEsn","strDeviceType","strSource","strDeviceModel","strSupplier","strRemarks"],
				"service":"CoreTruckService",
				"methodName":"createDeviceTS"
				},
			
				{
			   
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strDeviceID","strDescription","strEsn","strDeviceType","strSource","strDeviceModel","strSupplier","strRemarks"],
				"service":"CoreTruckService",
				"methodName":"editDeviceTS"
				},
				{
			    
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strDeviceID"],
				"service":"CoreTruckService",
				"methodName":"deleteDeviceTS"
				}
			,{
			    
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Activate",
				"input":["strDeviceID","strDescription","strDeviceType","strSource","strDeviceModel","strSupplier","strRemarks"],
				"service":"CoreTruckService",
				"methodName":"activateDeviceTS"
				},
				{
			 
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Inactive",
				"input":["strDeviceID","strDescription","strDeviceType","strSource","strDeviceModel","strSupplier","strRemarks"],
				"service":"CoreTruckService",
				"methodName":"inactivateDeviceTS"
				}
				
		];
		//Event Handlers Mapping Ends
		
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
				"except":["strDeviceID"]
			},
			"active":
			{
				"enableAll":false,
				"except":["strDeviceID"]
			}			
		}
				
		mainpage.hlpLinks=
		{
			"deviceID":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.DeviceHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strDeviceID","child":"DEVICE_ID"},
							{"parent":"strDescription","child":"DESCRIPTION"},
							{"parent":"strEsn","child":"ESN"},
							{"parent":"strDeviceType","child":"DEVICE_TYPE"},
							{"parent":"strSupplier","child":"SUPPLIER"},
							{"parent":"strRemarks","child":"REMARKS"},
							{"parent":"strSource","child":"SOURCE"},
							{"parent":"strDeviceModel","child":"DEVICE_MODEL"},
							{"parent":"strStatus","child":"STATUS"}
							]
				}
				
		}
		this.callParent(arguments);
		
	}
});
