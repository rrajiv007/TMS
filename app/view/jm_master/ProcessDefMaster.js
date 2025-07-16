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
Ext.define('CueTrans.view.jm_master.ProcessDefMaster', 
{
extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Process Definition Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
 
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create a process definition."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a process definition."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a process definition."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate a process definition."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate a process definition."
            }
            ]
		//Add Keyfields
		mainpage.keyFields=["ProcessCode"]
		
		//Violation Header Section Starts

		plf.columns=4
		var processHdrColumn = plf.addColumnSection({title:""});			//69995
		var processFormCtrl=												//69995	
		[
			plf.addHlpText({"label":"Process Code",id:"strProcessCode","mandatory":"true",hlpLinkID:"ProcessCode"},this),
			plf.addText({"label":"Process Name",id:"strProcessName","mandatory":"true"}),
			plf.addCombo({"label":"Process Type",id:"strProcessType","mandatory":"true"}),
		    plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			
		
		]
		
		processHdrColumn.add(processFormCtrl);
        plf.columns=3
		var processFieldsetColumn = plf.addColumnSection({title:"Inspection For"});					//69995
		var processFieldsetFormCtrl=																//69995
		[
			plf.addCheckBox({"label":"Vehicle","id":"strVehicle"}),
			plf.addCombo({"label":"Vehicle Document Type","id":"strVehicleDocType"}),
			plf.addBlank({}),
			plf.addCheckBox({"label":"Driver","id":"strDriver"}),
			//plf.addCheckBox({"label":"Asset","id":"strAsset"}),
			plf.addCombo({"label":"Driver Document Type","id":"strDriverDocType"}),
			plf.addBlank({}),
			//plf.addCombo({"label":"Asset Document Type","id":"strAssetDocType"}),
			plf.addCheckBox({"label":"General","id":"strGeneral"}),			
			plf.addText({"label":"Remarks",id:"strRemarks"}),
			plf.addBlank({})
		
		]
		processFieldsetColumn.add(processFieldsetFormCtrl);
		var ProcessGridFieldObj=									//69995
		[
		{columnname:"Step Sequence",dataname:"STEP_SEQUENCE",datatype:"string",editControl:"textbox",width:150},
			//{columnname:"Step Code",dataname:"STEP_CODE",datatype:"string",editControl:"textbox",width:300},
			{columnname:"Process Step Name",dataname:"STEP_NAME",datatype:"string",storeId:"strStepName",editControl:"combo",width:300}
			//{columnname:"Journey Allowed",dataname:"JOURNEY_ALLOWED",datatype:"string",storeId:"strJourneyAllowed",editControl:"combo",width:300}
			
		]
		var ProcessGridDtl=											//69995
		{
			title:"Process Details",
			id:"processDtl",
			detail:ProcessGridFieldObj
		}
		var ProcessGridSection = plf.addGrid(ProcessGridDtl)		//69995
		//Violation Grid Section Ends
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(processHdrColumn)
		//Add Header Section to Main Page
		mainpage.ptrMainSection.add(processFieldsetColumn)
		
		mainpage.ptrMainSection.add(ProcessGridSection) //Add Grid Section to Main Page
		//mainpage.ptrMainSection.add(violationFtrColumn)//Add Footer Section to Main Page
		//History Data Section
		//mainpage.data_his_sec_flag=true;
			mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
				mainpage.eventHandlers = 
			[
				{
					"controlid":"",
					"tasktype":"onload",
					"input":["strProcessCode"],
					"service":"coreProcessService",
					"methodName":"initProcessMSTS"
				},
				{
				"controlid":"strProcessCode",
				"tasktype":"onenter",
				"input":["strProcessCode"],
				"service":"coreProcessService",
				"methodName":"fetchProcessDetailsTS"
			},				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strProcessCode","strProcessName","strStatus","strProcessType","strVehicle","strDriver","strAsset","strVehicleDocType","strDriverDocType","strAssetDocType",
				"strGeneral","processDtl","strRemarks"],
				"service":"coreProcessService",
				"methodName":"createProcessMSTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strProcessCode","strProcessName","strStatus","strProcessType","strVehicle","strDriver","strAsset","strVehicleDocType","strDriverDocType","strAssetDocType","strRemarks",
				"strGeneral","processDtl"],
				"service":"coreProcessService",
				"methodName":"modifyProcessMSTS"
			},
			
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strProcessCode","strProcessName","strStatus","strProcessType","strVehicle","strDriver","strAsset","strVehicleDocType","strDriverDocType","strAssetDocType",
				"strGeneral","processDtl","strRemarks"],
				"service":"coreProcessService",
				"methodName":"deleteProcessTS"
			},
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Activate",
				"input":["strProcessCode","strProcessName","strStatus","strProcessType","strVehicle","strDriver","strAsset","strVehicleDocType","strDriverDocType","strAssetDocType",
				"strGeneral","processDtl","strRemarks"],
				"service":"coreProcessService",
				"methodName":"activeProcessTS"
			},
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Inactivate",
				"input":["strProcessCode","strProcessName","strStatus","strProcessType","strVehicle","strDriver","strAsset","strVehicleDocType","strDriverDocType","strAssetDocType","strRemarks",
				"strGeneral","processDtl"],
				"service":"coreProcessService",
				"methodName":"inactiveProcessTS"
			},
			{
				"controlid":"strProcessCode",
				"tasktype":"onenter",
				"input":["strProcessCode"],
				"service":"coreProcessService",
				"methodName":"fetchProcessDetailsTS"
			}/*,
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strProcessCode","strProcessName","strStatus","strProcessType","strVehicle","strDriver","strAsset","strVehicleDocType","strDriverDocType","strAssetDocType",
				"strGeneral","processDtl"],
				"service":"coreProcessService",
				"methodName":"createProcessMSTS"
			},
			
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strProcessCode","strProcessName","strStatus","strProcessType","strVehicle","strDriver","strAsset","strVehicleDocType","strDriverDocType","strAssetDocType",
				"strGeneral","processDtl"],
				"service":"coreProcessService",
				"methodName":"modifyProcessMSTS"
			},
			
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strProcessCode"],
				"service":"coreProcessService",
				"methodName":"deleteProcessTS"
			},
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Activate",
				"input":["strProcessCode","strProcessName","strStatus","strProcessType","strVehicle","strDriver","strAsset","strVehicleDocType","strDriverDocType","strAssetDocType",
				"strGeneral","processDtl"],
				"service":"coreProcessService",
				"methodName":"activeProcessTS"
			}
			,
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Inactivate",
				"input":["strProcessCode"],
				"service":"coreProcessService",
				"methodName":"inactiveProcessTS"
			}
			,	

			
			{
				"controlid":"strProcessCode",
				"tasktype":"onenter",
				"input":["strProcessCode"],
				"service":"coreProcessService",
				"methodName":"fetchProcessDetailsTS"
			} */
							
			];
			//Event Handlers Mapping Ends
		
		
		mainpage.hlpLinks=
		{
			"ProcessCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.ProcessDefHelp",
					"send":[
							{"parent":"strProcessCode","child":"PROCESS_CODE"}
						   ],
					"receive":[
							{"parent":"strProcessCode","child":"PROCESS_CODE"}
							]
				}			
		}
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
				"except":["strProcessCode"]
			},
			"active":
			{
				"enableAll":false,
				"except":["processDtl","strProcessCode"]
			}			
		}
	/*	mainpage.hlpLinks=
		{
			"Vlno":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.ViolationHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strViolationCode","child":"VIOLATION_CODE"},
							{"parent":"strViolationDesc","child":"VIOLATION_DESC"},
							{"parent":"strViolationType","child":"VIOLATION_TYPE"},
							{"parent":"dtEffectiveFrom","child":"EFFECTIVE_FROM"},
							{"parent":"dtEffectiveTo","child":"EFFECTIVE_TO"},
							{"parent":"strStatus","child":"STATUS"}
							
							]
				}
		}
		*/
		this.callParent(arguments);
		
	}
});
