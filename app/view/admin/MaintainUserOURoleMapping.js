/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.MaintainUserOURoleMapping', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
		initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "User– Entity – Role Mapping";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Maintain"]
		
		//Add Keyfields		
		//ConstraintMaster Header Section Begins
		plf.columns=4
		MaintainUserOURoleMappingMasterColumn = plf.addColumnSection({});
		MaintainUserOURoleMappingMstrCtrl=
		[
			
		    plf.addText({"label":"User ID",id:"strNewUserId",inputFormat:"string",InputLength:"40","mandatory":"true"}),
			plf.addText({"label":"User Name",id:"strNewUserName",inputFormat:"string",InputLength:"100"}),
			/*plf.addCombo({"label":"User Status",id:"strUserStatus"}),*/
			
			plf.addText({"label":"Entity Code",id:"strOuCode",inputFormat:"string",InputLength:"40"}),	
			plf.addText({"label":"Entity Name",id:"strOuName",inputFormat:"string",InputLength:"100"}),				
			plf.addText({"label":"Role ID",id:"strRoleIdFrom",inputFormat:"string",InputLength:"40"}),					
			/*plf.addCombo({"label":"OU Status",id:"strOuStatus"}),*/
			plf.addText({"label":"Role Name",id:"strRoleName",inputFormat:"string",InputLength:"100"}),			
			plf.addButton({"label":"Get Details",id:"cmn_get_details"})
		]
		MaintainUserOURoleMappingMasterColumn.add(MaintainUserOURoleMappingMstrCtrl);
		//ConstraintMaster Header Section Ends
		
		//ConstraintMaster Grid Section Begins
		MaintainUserOURoleMappingFieldObj=
		[
			{columnname:"Seq No",dataname:"SEQ_NO",datatype:"string",editControl:"textbox",width:50,hidden:true},
			{columnname:"User ID",dataname:"USER_ID",datatype:"string",editControl:"textbox",width:150,inputFormat:"string",InputLength:"40",helpid:'UserIdHlp'},
			{columnname:"User Name",dataname:"USER_NAME",datatype:"string",editControl:"addDisplayOnly",width:150,inputFormat:"string",InputLength:"100"},
			//{columnname:"User Status",dataname:"USER_STATUS",datatype:"string",editControl:"addDisplayOnly",width:80},
			{columnname:"Entity Code",dataname:"OU_CODE",datatype:"string",editControl:"textbox",width:150,inputFormat:"string",InputLength:"40",helpid:'OuIdHlp'},
			{columnname:"Entity Name",dataname:"OU_NAME",datatype:"string",editControl:"addDisplayOnly",width:150,inputFormat:"string",InputLength:"100"},
			{columnname:"Entity Type",dataname:"OU_TYPE",datatype:"string",editControl:"addDisplayOnly",width:150,inputFormat:"string",InputLength:"100"},
			//{columnname:"OU Status",dataname:"OU_STATUS",datatype:"string",editControl:"addDisplayOnly",width:80},
			{columnname:"Default Entity",dataname:"DEFAULT_OU",datatype:"string",editControl:"combo",storeId:"strDefaultOu",width:100},
			{columnname:"Role ID",dataname:"ROLE_ID",datatype:"string",editControl:"textbox",width:150,inputFormat:"string",InputLength:"40",helpid:'RoleIdHlp'},
			{columnname:"Role Name",dataname:"ROLE_NAME",datatype:"string",editControl:"addDisplayOnly",width:150},
			{columnname:"Default Role",dataname:"DEFAULT_ROLE",datatype:"string",editControl:"combo",storeId:"strDefaultRole",width:80}
		]
		MaintainUserOURoleMappingMstrGridDtl=
		{
			title:"",
			id:"userOuRoleDtlCache",
			detail:MaintainUserOURoleMappingFieldObj,
			visibleRow:10
		}
		
		MaintainUserOURoleMappingMstrGridSection = plf.addGrid(MaintainUserOURoleMappingMstrGridDtl,this)	
		//ConstraintMaster Grid Section Ends
		
		mainpage.ptrMainSection.add(MaintainUserOURoleMappingMasterColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(MaintainUserOURoleMappingMstrGridSection) //Add Grid Section to Main Page
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreAdminService",
				"methodName":"initMntUsrOURoleMapTS"
			},		
			{       
				"controlid":"cmn_get_details",
				"tasktype":"btnclick",
				"input":["strNewUserId","strNewUserName","strRoleIdFrom","strOuCode","strOuName","strRoleName"],
				"service":"CoreAdminService",
				"methodName":"btngetDtlMntUsrOURoleMapTS"
			},
            {       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"maintain",
				"input":["strNewUserId","strNewUserName","strRoleIdFrom","strOuCode","strOuName","strRoleName","userOuRoleDtlCache"],
				"service":"CoreAdminService",
				"methodName":"btnMntUsrOURoleMapTS"
			}		
		];
		mainpage.hlpLinks=
		{
		"UserIdHlp":
				{
					"hlpType":"grid",
					"gridID":"userOuRoleDtlCache",
					"hlpScreen":"admin.UserHelp",
					"send":[
							{"parent":"","child":""}							
						   ],
					"receive":[
					{"parent":"USER_ID","child":"USER_ID"},
					{"parent":"USER_NAME","child":"USER_NAME"}
                    ]
				},
		 "OuIdHlp":
				{
					"hlpType":"grid",
					"gridID":"userOuRoleDtlCache",
					"hlpScreen":"admin.UserEntityHelp",
					"send":[
							{"parent":"","child":""}							
						   ],
					"receive":[
					{"parent":"OU_CODE","child":"ENTITY_CODE"},
					{"parent":"OU_NAME","child":"ENTITY_NAME"},
					{"parent":"OU_TYPE","child":"ENTITY_TYPE"}
                    ]
				},
		"RoleIdHlp":
				{
					"hlpType":"grid",
					"gridID":"userOuRoleDtlCache",
					"hlpScreen":"admin.RoleMasterHelp",
					"send":[
							{"parent":"","child":""}							
						   ],
					"receive":[
					{"parent":"ROLE_ID","child":"ROLE_ID"},
					{"parent":"ROLE_NAME","child":"ROLE_NAME"}
                    ]
				}
		}
		//Event Handlers Mapping Ends
		
		//Generate Screen Section
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

