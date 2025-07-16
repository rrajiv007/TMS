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
Ext.define('CueTrans.view.jm_master.CostCenterMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Cost Center Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create a cost center."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a cost center."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a cost center."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate a cost center."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate a cost center."
            }
            ]
		//Add Keyfields
		mainpage.keyFields=["strCostCenterCode"]
		//Cost Center Master Section Begins
		plf.columns=3
		var costMstrColumn = plf.addColumnSection({columnWidth:.75});			//69995
		
		var costMasterCtrl=					//69995
		[	
			plf.addHlpText({"label":"Cost Center Code",id:"strCostCenterCode","mandatory":"true",hlpLinkID:"CostCenter",inputFormat:"string",InputLength:"40"},this),
			plf.addText({"label":"Cost Center Name",id:"strCostCenterName","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Cost Department",id:"strCostDepartment"}),
			plf.addText({"label":"Operations Account No",id:"strOperAccNo"}),
			plf.addText({"label":"Company Code",id:"strCompanyCode"}),
			plf.addText({"label":"Cost Object Type",id:"strCostObjType"})
		]	
		costMstrColumn.add(costMasterCtrl);
		//Add Child Sections
		mainpage.ptrMainSection.add(costMstrColumn)  //Add Master Section to Main Page
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strCostCenterCode"],
				"service":"CoreCostCenterService",
				"methodName":"initCostMasterScrTS"
			},	

			{
				"controlid":"strCostCenterCode",
				"tasktype":"onenter",
				"input":["strCostCenterCode"],
				"service":"CoreCostCenterService",
				"methodName":"fetchCostCenterDetailsTS"
			},	
			{
			
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"create",
				"input":["strCostCenterCode","strCostCenterName","strStatus","strCostDepartment","strOperAccNo",
				         "strCompanyCode","strCostObjType","strCreatedBy","dtCreatedDate"],
				"service":"CoreCostCenterService",
				"methodName":"createCostCenterTS"
				},
			
			{
			   
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"edit",
				"input":["strCostCenterCode","strCostCenterName","strStatus","strCostDepartment","strOperAccNo",
				         "strCompanyCode","strCostObjType","strModifiedBy","dtModifiedDate","strStatus"],
				"service":"CoreCostCenterService",
				"methodName":"modifyCostCenterTS"
				},
			{
			    
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"delete",
				"input":["strCostCenterCode","strCostCenterName","strStatus","strCostDepartment","strOperAccNo",
				         "strCompanyCode","strCostObjType","strModifiedBy","dtModifiedDate","strStatus"],
				"service":"CoreCostCenterService",
				"methodName":"deleteCostCenterTS"
				},
			{
			    
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"activate",
				"input":["strCostCenterCode","strCostCenterName","strStatus","strCostDepartment","strOperAccNo",
				         "strCompanyCode","strCostObjType","strModifiedBy","dtModifiedDate","strStaus"],
				"service":"CoreCostCenterService",
				"methodName":"activateCostCenterTS"
				},
			{
			 
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"inactivate",
				"input":["strCostCenterCode","strCostCenterName","strStatus","strCostDepartment","strOperAccNo",
				         "strCompanyCode","strCostObjType","strModifiedBy","dtModifiedDate","strStaus"],
				"service":"CoreCostCenterService",
				"methodName":"inactivateCostCenterTS"
				}		
		];
		//Event Handlers Mapping Ends
		mainpage.hlpLinks=
		{
		"CostCenter":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CostCenterHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCostCenterCode","child":"COST_CENTER_CODE"}
							]
				},
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
				"except":[""]
			},
			"active":
			{
				"enableAll":false,
				"except":[""]
			}	
		}
			
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