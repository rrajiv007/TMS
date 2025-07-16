/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.UserMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "User Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create user."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit user."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete user."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate user."
            },
            {
                "name": "Inactive",
                "tooltip": "Click here to inactive user."
            }
            ]
		
		//Add Keyfields
		mainpage.keyFields=["strNewUserId"]
		
		UserFileUploadSection=plf.addColumnSection({});
		//Driver Master Section Begins
		plf.columns=4
		
		userMstrColumn = plf.addColumnSection({columnWidth:.85});		
		userMasterCtrl=
		[	
			plf.addHlpText({"label":"User ID",id:"strNewUserId","mandatory":"true",hlpLinkID:"userCode",inputFormat:"string",InputLength:"40"},this),
			plf.addText({"label":"User Name",id:"strNewUserName","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addText({"label":"Phone No",id:"iphoneNumber",inputFormat:"integer",InputLength:"20"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Email Id",id:"strEmailId",inputFormat:"email",InputLength:"50","mandatory":"true"}),
			plf.addCombo({"label":"User Type","id":"strUserType"}),
			plf.addText({"label":"Organization Name",id:"strOrgName",inputFormat:"string",InputLength:"100"}),
			plf.addDate({"label":"Effective From",id:"dtEffectiveFrom","mandatory":"true"}),
			plf.addDate({"label":"Effective To",id:"dtEffectiveTo"}),
			plf.addBlank({})
			
	]
		
		userMstrColumn.add(userMasterCtrl);
		
		userUpload=plf.addColumnSection({columnWidth:.15});
		plf.columns=8	
		userUploadCtrl=
		[		
			
			plf.addImageFileUpload({"label":"User",id:"strPhoto",Entity:"User"})
		]
		
		userUpload.add(userUploadCtrl)
		UserFileUploadSection.add(userMstrColumn)
		//UserFileUploadSection.add(userUpload)
		//mainpage.ptrMainSection.add(userMstrColumn) //Add Header Section to Main Page
		mainpage.ptrMainSection.add(UserFileUploadSection)
		
		
		
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
					"controlid":"strNewUserId",
					"tasktype":"onload",
					"input":["strNewUserId"],
					"service":"CoreAdminService",
					"methodName":"initUserMstTS"
				},
			
				{
					"controlid":"strNewUserId",
					"tasktype":"onenter",
					"input":["strNewUserId"],
					"service":"CoreAdminService",
					"methodName":"fetchUserTS"
				},
			
				{
			
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Create",
				"input":["strNewUserId","strNewUserName","iphoneNumber","strEmailId","dtEffectiveFrom","dtEffectiveTo","strUserType","strPhoto","strOrgName"],
				"service":"CoreAdminService",
				"methodName":"createUserTS"
				},
			
			{
			   
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strNewUserId","strNewUserName","iphoneNumber","strEmailId","dtEffectiveFrom","dtEffectiveTo","strUserType","strOrgName"],
				"service":"CoreAdminService",
				"methodName":"modifyUserTS"
				},
			{
			    
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strNewUserId"],
				"service":"CoreAdminService",
				"methodName":"deleteUserTS"
				},
			{
			    
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Activate",
				"input":["strNewUserId","strNewUserName","iphoneNumber","strEmailId","dtEffectiveFrom","dtEffectiveTo","strUserType","strOrgName"],
				"service":"CoreAdminService",
				"methodName":"activateUserTS"
				},
			{
			 
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Inactive",
				"input":["strNewUserId"],
				"service":"CoreAdminService",
				"methodName":"inactivateUserTS"
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
				"except":["strNewUserId"]
			},
			"active":
			{
				"enableAll":false,
				"except":["strNewUserId"]
			}			
		}
		
		//Generate Screen Section
		
		mainpage.hlpLinks=
		{
			"userCode":
				{
					"hlpType":"Header",
					"hlpScreen":"admin.UserHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"USER_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strNewUserId","child":"USER_ID"},
							{"parent":"strNewUserName","child":"USER_NAME"}
							//{"parent":"iphoneNumber","child":"PHONE_NUMBER"},
							//{"parent":"strEmailId","child":"EMAIL_ID"},
							//{"parent":"dtEffectiveFrom","child":"EFFECTIVE_FROM"},
							//{"parent":"dtEffectiveTo","child":"EFFECTIVE_TO"}
							//{"parent":"USER_TYPE","child":"strUserType"}
							]
				}
				
		}
		
		this.callParent(arguments);
		
	}
});
