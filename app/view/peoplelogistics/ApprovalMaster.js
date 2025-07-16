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
Ext.define('CueTrans.view.peoplelogistics.ApprovalMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Approval Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;
		mainpage.toolbarActions= 
		    [
			{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create a traveller."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a traveller."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a traveller."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate a traveller."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate a traveller."
            }
            ]
		
		//Add Keyfields
		
		//ApprovalMaster Header Section Begins
		plf.columns=4
		var approvalMasterColumn = plf.addColumnSection({});				//69995
		var approvalMstrCtrl=												//69995
		[
			plf.addHlpText({"label":"Rule ID",id:"strRuleId","mandatory":"true",hlpLinkID:"ruleId",inputFormat:"string",InputLength:"40"},this),
			plf.addText({"label":"Rule Description",id:"strRuleDesc",inputFormat:"string",InputLength:"100","mandatory":"true"}),
			plf.addCombo({"label":"Process Type",id:"strProcessType","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"})
			
		]
		approvalMasterColumn.add(approvalMstrCtrl);
		//ApprovalMaster Header Section Ends
		
		var approvalDtlObj=
		[   			
			{columnname:"Data Name",dataname:"DATA_TYPE",datatype:"string",width:200,editControl:"combo",storeId:"strDataType"},
			{columnname:"Value",dataname:"VALUE",datatype:"string",editControl:"textbox",width:200},
			
		]
		var approvalDocDtlGridDtl=
		{
			title:"Data Value Details",
			id:"approvalDataDtl",
			detail:approvalDtlObj,
			//widthBasis:"flex",
			visibleRow:5
		}
		var approvalDocGridSection = plf.addGrid(approvalDocDtlGridDtl,this)	
		mainpage.ptrMainSection.add(approvalMasterColumn)//Add Header Section to Main Page
		
		var levelDtlObj=
		[   			
			{columnname:"Level Sequence",dataname:"LEVEL_SEQ",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Level Status",dataname:"LEVEL_STATUS",datatype:"string",editControl:"textbox",width:140},
			{columnname:"User",dataname:"USER",datatype:"string",editControl:"textbox",width:140,helpid:'user'},
			{columnname:"Email ID",dataname:"EMAIL_ID",datatype:"string",width:140}
		]
		var vehicleDocDtlGridDtl=
		{
			title:"Approval Level Details",
			id:"approvalLevelDtl",
			detail:levelDtlObj,
			//widthBasis:"flex",
			visibleRow:5
		}
		var approvalDocGridSectionGridSection = plf.addGrid(vehicleDocDtlGridDtl,this)	
		mainpage.ptrMainSection.add(approvalMasterColumn)
			
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// for green line
		mainpage.ptrMainSection.add(approvalMasterColumn)//add hdr details
		mainpage.ptrMainSection.add(approvalDocGridSection)//Add Grid1 Section to Main Page
		mainpage.ptrMainSection.add(approvalDocGridSectionGridSection)//Add Grid2 Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[									
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strRuleId"],
				"service":"PPLCoreMasterTS",
				"methodName":"initApprovalMasterTS"
		},
        {
				"controlid":"strRuleId",
				"tasktype":"onenter",
				"input":["strRuleId","strRuleDesc","strStatus","strProcessType","approvalDataDtl","approvalLevelDtl"],
				"service":"PPLCoreMasterTS",
				"methodName":"fetchApprovalMasterTS"
		},			
		{
			
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Create",
				"input":["strRuleId","strRuleDesc","strStatus" ,"strProcessType","approvalDataDtl","approvalLevelDtl"],
				"service":"PPLCoreMasterTS",
				"methodName":"createApprovalMasterTS"
		},
		{
			
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strRuleId","strRuleDesc","strStatus" ,"strProcessType","approvalDataDtl","approvalLevelDtl"],
				"service":"PPLCoreMasterTS",
				"methodName":"editApprovalMasterTS"
		},
		{
			
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strRuleId"],
				"service":"PPLCoreMasterTS",
				"methodName":"deleteApprovalMasterTS"
		},
		{
			
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Activate",
				"input":["strRuleId","strRuleDesc","strStatus" ,"strProcessType","approvalDataDtl","approvalLevelDtl"],
				"service":"PPLCoreMasterTS",
				"methodName":"activateApprovalMasterTS"
		},
		{
			
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Inactivate",
				"input":["strRuleId","strRuleDesc","strStatus" ,"strProcessType","approvalDataDtl","approvalLevelDtl"],
				"service":"PPLCoreMasterTS",
				"methodName":"inactivateApprovalMasterTS"
		}
		];
		//Event Handlers Mapping Ends
		
		
		mainpage.hlpLinks=
		{
			"ruleId":
				{
					"hlpType":"Header",
					"hlpScreen":"peoplelogistics.RuleHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRuleId","child":"RULE_ID"}
							]
				},
          "user":
				{
					"hlpType":"grid",
					"gridID":"approvalLevelDtl",
					"hlpScreen":"admin.UserHelp",
					"send":[
							{"parent":"","child":""}
                            							
						   ],
					"receive":[
								{"parent":"USER","child":"USER_ID"},
                                {"parent":"EMAIL_ID","child":"EMAIL_ID"}	
							  ]
				}
		}
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
