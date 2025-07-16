/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.RoleMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Role Master";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		
		mainpage.toolbarActions= [
			{
                "name": "Create",
                "tooltip": "Click here to create role."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit role."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete role."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate role."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate role."
            }
            ]


		plf.columns=3
		RoleHdrColumn = plf.addColumnSection({});
		RoleHdrCtrl=
			[	
			    plf.addHlpText({"label":"Role ID",id:"strRoleIdFrom","mandatory":"true",hlpLinkID:"RoleScreenHelp",inputFormat:"string",InputLength:"10"},this),	
				plf.addText({"label":"Role Name",id:"strRoleDesc",inputFormat:"string","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"})
				
			]
		
		RoleHdrColumn.add(RoleHdrCtrl)
		
		
		roleHdrCol = plf.addColumnSection({title:""});
		roleGridFieldObj=
		[   
			{columnname:"Entity Code",dataname:"ENTITY_CODE",datatype:"string",width:250,editControl:"textbox",helpid:'entity',"onenter":"ENTITY_ONENTER",id:"strEntityCode"},
			{columnname:"Entity Name",dataname:"ENTITY_NAME",datatype:"string",width:250},
			{columnname:"Entity Type",dataname:"ENTITY_TYPE",datatype:"string",width:250},
			{columnname:"Parent Entity",dataname:"PARENT_ENTITY",datatype:"string",width:250}
		]
		roleGridDtl=
		{
			title:"Applicable Entities",
			id:"roleDtlCache",
			detail:roleGridFieldObj,
			visibleRow:15
		}
		roleGridSection = plf.addGrid(roleGridDtl,this)
		
		mainpage.ptrMainSection.add(RoleHdrColumn) 
		mainpage.ptrMainSection.add(roleGridSection)
				
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strRoleIdFrom"],
				"service":"CoreAdminService",
				"methodName":"initRoleMasterTS"
		},
		{
				"controlid":"strRoleIdFrom",
				"tasktype":"onenter",
				"input":["strRoleIdFrom"],
				"service":"CoreAdminService",
				"methodName":"fetchRoleNoMasterTS"
		},
		{
					"grideventid":"ENTITY_ONENTER",
					"tasktype":"gridonenter",
					"input":["ENTITY_CODE"],
					"service":"CoreAdminService",
					"methodName":"fetchEntityMLTS"
			},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strRoleIdFrom","strRoleDesc","roleDtlCache"],
				"service":"CoreAdminService",
				"methodName":"createRoleMasterTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strRoleIdFrom","strRoleDesc","roleDtlCache"],
				"service":"CoreAdminService",
				"methodName":"editRoleMasterTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strRoleIdFrom","strRoleDesc","roleDtlCache"],
				"service":"CoreAdminService",
				"methodName":"deleteRoleMasterTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Activate",
				"input":["strRoleIdFrom","strRoleDesc","roleDtlCache"],
				"service":"CoreAdminService",
				"methodName":"activeRoleMasterTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Inactivate",
				"input":["strRoleIdFrom","strRoleDesc","roleDtlCache"],
				"service":"CoreAdminService",
				"methodName":"inactiveRoleMasterTS"
		}	
		];
		
		
			mainpage.hlpLinks=
		{
			"RoleScreenHelp":
				{
					"hlpType":"Header",
					"hlpScreen":"admin.RoleMasterHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
						    {"parent":"strRoleIdFrom","child":"ROLE_ID"},
							{"parent":"strRoleDesc","child":"ROLE_NAME"},
							{"parent":"strStatus","child":"STATUS"},
							]
				},
				"entity":
				{
					"hlpType":"grid",
					"gridID":"roleDtlCache",
					"hlpScreen":"admin.UserEntityHelp",
					"send":[
							{"parent":"","child":""}							
						   ],
					"receive":[
					{"parent":"ENTITY_CODE","child":"ENTITY_CODE"},
					{"parent":"ENTITY_NAME","child":"ENTITY_NAME"},
					{"parent":"ENTITY_TYPE","child":"ENTITY_TYPE"},
					{"parent":"PARENT_ENTITY","child":"PARENT_ENTITY"}
					
                    ]
				}
		}
		
		this.callParent(arguments);
		
	}
});