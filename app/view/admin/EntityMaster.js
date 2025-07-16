/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.EntityMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Entity Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [
			{
                "name": "Create",
                "tooltip": "Click here to create entity."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit entity."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete entity."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate entity."
            },
            {
                "name": "Inactive",
                "tooltip": "Click here to inactive entity."
            }
            ]
		
		//Add Keyfields
		mainpage.keyFields=["strEntityCode"]
		//Entity Master Section Begins
		plf.columns=4
		var entityMstrColumn = plf.addColumnSection({});
		var entityMasterCtrl=
		[	
			plf.addHlpText({"label":"Entity Code",id:"strEntityCode","mandatory":"true",hlpLinkID:"entityCode",inputFormat:"string",InputLength:"10"},this),
			plf.addText({"label":"Entity Name",id:"strEntityName","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addCombo({"label":"Entity Type",id:"strEntityType","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Parent Entity",id:"strParentEntity"}),
			plf.addText({"label":"Address 1",id:"strAddress1",inputFormat:"string",InputLength:"100"}),
			plf.addText({"label":"Address 2",id:"strAddress2",inputFormat:"string",InputLength:"100"}),
			plf.addCombo({"label":"Country",id:"strCountry"}),
			plf.addCombo({"label":"State",id:"strState"}),
			plf.addCombo({"label":"City",id:"strCity"}),
			plf.addText({"label":"Zip Code",id:"strZipCode",inputFormat:"integer",InputLength:"20"})
		]
		entityMstrColumn.add(entityMasterCtrl);
		//Entity Master Section Ends
		
		mainpage.ptrMainSection.add(entityMstrColumn) //Add Header Section to Main Page
				
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
				{
					"controlid":"",
					"tasktype":"onload",
					"input":["strEntityCode","strEntityType"],
					"service":"CoreAdminService",
					"methodName":"initEntityMstTS"
				},
				{
					"controlid":"strEntityCode",
					"tasktype":"onenter",
					"input":["strEntityCode"],
					"service":"CoreAdminService",
					"methodName":"fetchOnEnterEntityTS"
				},	
		
				{
			
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Create",
				"input":["strEntityCode","strEntityName","strEntityType","strParentEntity","strAddress1","strAddress2","strCity","strState","strCountry","strZipCode"],
				"service":"CoreAdminService",
				"methodName":"createEntityTS"
				},
			
				{			   
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strEntityCode","strEntityName","strEntityType","strParentEntity","strAddress1","strAddress2","strCity","strState","strCountry","strZipCode"],
				"service":"CoreAdminService",
				"methodName":"editEntityTS"
				},
				{
			    
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strEntityCode"],
				"service":"CoreAdminService",
				"methodName":"deleteEntityTS"
				},
				{
			    
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Activate",
				"input":["strEntityCode","strEntityName","strEntityType","strParentEntity","strAddress1","strAddress2","strCity","strState","strCountry","strZipCode"],
				"service":"CoreAdminService",
				"methodName":"activateEntityTS"
				},
				{
			 
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Inactive",
				"input":["strEntityCode","strEntityName","strEntityType","strParentEntity","strAddress1","strAddress2","strCity","strState","strCountry","strZipCode"],
				"service":"CoreAdminService",
				"methodName":"inactivateEntityTS"
				},
				{
				"controlid":"strCountry",
				"tasktype":"onchange",
				"input":["strCountry"],
				"service":"CoreAdminService",
				"methodName":"onchangeCountryTS"
				},		
				{
				"controlid":"strState",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreAdminService",
				"methodName":"onchangeStateTS"
				},
				
				{
				"controlid":"strEntityType",
				"tasktype":"onchange",
				"input":["strEntityType"],
				"service":"CoreAdminService",
				"methodName":"fetchonchangeENTTypeTS"
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
				"except":["strEntityCode"]
			},
			"active":
			{
				"enableAll":false,
				"except":["strEntityCode"]
			}			
		}
				
		mainpage.hlpLinks=
		{
			"entityCode":
				{
					"hlpType":"Header",
					"hlpScreen":"admin.EntityHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strEntityCode","child":"ENTITY_CODE"},
							{"parent":"strEntityName","child":"ENTITY_NAME"},
							{"parent":"strEntityType","child":"ENTITY_TYPE"},
							{"parent":"strParentEntity","child":"PARENT_ENTITY"},
							{"parent":"strCity","child":"CITY"},
							{"parent":"strState","child":"STATE"},
							{"parent":"strCountry","child":"COUNTRY"},
							{"parent":"strZipCode","child":"ZIPCODE"},
							{"parent":"strAddress1","child":"ADDRESS"},
							{"parent":"strAddress2","child":"ADDRESS2"},
							{"parent":"strStatus","child":"STATUS"}
							]
				},
				"parentcompCode":
				{
					"hlpType":"Header",
					"hlpScreen":"admin.EntityHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strParentEntity","child":"ENTITY_CODE"}							
							]
				}
		}
		this.callParent(arguments);
		
	}
});
