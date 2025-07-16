/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.OrganisationMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Organisation Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create organisation."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit organisation."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete organisation."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate organisation."
            },
            {
                "name": "Inactive",
                "tooltip": "Click here to inactive organisation."
            }
            ]
		
		//Add Keyfields
		mainpage.keyFields=["strOrgCode"]
		//Driver Master Section Begins
		plf.columns=4
		orgMstrColumn = plf.addColumnSection({});
		OrgMasterCtrl=
		[	
			plf.addHlpText({"label":"Organisation Code",id:"strOrgCode","mandatory":"true",hlpLinkID:"orgCode",inputFormat:"string",InputLength:"40"},this),
			plf.addText({"label":"Organisation Name",id:"strOrgName","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addCombo({"label":"Parent Entity",id:"strParentEntity","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Address",id:"strAddress",inputFormat:"string",InputLength:"200"}),			
			plf.addCombo({"label":"Country",id:"strCountry"}),			
			plf.addCombo({"label":"State",id:"strState"}),
			plf.addCombo({"label":"City",id:"strCity"}),
			plf.addText({"label":"Zip Code",id:"strZipCode",inputFormat:"string",InputLength:"20"})
		]
		
		orgMstrColumn.add(OrgMasterCtrl);
		
		mainpage.ptrMainSection.add(orgMstrColumn) //Add Header Section to Main Page
		
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		
		{
					"controlid":"strOrgCode",
					"tasktype":"onload",
					"input":["strOrgCode"],
					"service":"CoreAdminService",
					"methodName":"initOrgMstTS"
		},
			
			
		{
					"controlid":"strOrgCode",
					"tasktype":"onenter",
					"input":["strOrgCode"],
					"service":"CoreAdminService",
					"methodName":"fetchOrgTS"
		},
		{
			
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Create",
				"input":["strOrgCode","strOrgName","strParentEntity","strAddress","strCity","strState","strCountry","strZipCode"],
				"service":"CoreAdminService",
				"methodName":"createOrganisationTS"
				},
			
			{
			   
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strOrgCode","strOrgName","strParentEntity","strAddress","strCity","strState","strCountry","strZipCode"],
				"service":"CoreAdminService",
				"methodName":"modifyOrganisationTS"
				},
			{
			    
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strOrgCode"],
				"service":"CoreAdminService",
				"methodName":"deleteOrganisationTS"
				},
			   {
			    
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Activate",
				"input":["strOrgCode","strOrgName","strParentEntity","strAddress","strCity","strState","strCountry","strZipCode"],
				"service":"CoreAdminService",
				"methodName":"activateOrganisationTS"
				},
				{
			 
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Inactive",
				"input":["strOrgCode"],
				"service":"CoreAdminService",
				"methodName":"inactivateOrganisationTS"
				},
				{
				"controlid":"strCountry",
				"tasktype":"onchange",
				"input":["strCountry"],
				"service":"CoreAdminService",
				"methodName":"fetchonchangeENTCountryTS"
				},		
				{
				"controlid":"strState",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreAdminService",
				"methodName":"fetchonchangeENTStateTS"
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
				"except":["strOrgCode"]
			},
			"active":
			{
				"enableAll":false,
				"except":["strOrgCode"]
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
		mainpage.hlpLinks=
		{
			"orgCode":
				{
					"hlpType":"Header",
					"hlpScreen":"admin.OrganisationHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strOrgCode","child":"ORG_UNIT_CODE"},
							{"parent":"strOrgName","child":"ORG_UNIT_NAME"},
							{"parent":"strParentEntity","child":"PARENT_ENTITY"},
							//{"parent":"strCompanyCode","child":"COMPANY_CODE"},
							{"parent":"strAddress","child":"ADDRESS"},							
							{"parent":"strCity","child":"CITY"},
							{"parent":"strCountry","child":"COUNTRY"},
							{"parent":"strZipCode","child":"ZIPCODE"},
							{"parent":"strState","child":"STATE"}
							]
				},
				"compCode":
				{
					"hlpType":"Header",
					"hlpScreen":"admin.CompanyHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCompanyCode","child":"COMPANY_CODE"}							
							]
				}
		}
		this.callParent(arguments);
		
	}
});
