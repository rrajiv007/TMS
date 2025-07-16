/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.CompanyMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Company Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create company."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit company."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete company."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate company."
            },
            {
                "name": "Inactive",
                "tooltip": "Click here to inactive company."
            }
            ]
		
		//Add Keyfields
		mainpage.keyFields=["strCompanyCode"]
		//Group Company Master Section Begins
		plf.columns=4
		companyMstrColumn = plf.addColumnSection({});
		companyMasterCtrl=
		[	
			plf.addHlpText({"label":"Company Code",id:"strCompanyCode","mandatory":"false",hlpLinkID:"compCode",inputFormat:"string",InputLength:"40"},this),
			plf.addText({"label":"Company Name",id:"strCompanyName","mandatory":"false",inputFormat:"string",InputLength:"100"}),
			plf.addCombo({"label":"Parent Entity",id:"strParentEntity"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Address",id:"strAddress",inputFormat:"string",InputLength:"100"}),			
			plf.addCombo({"label":"Country",id:"strCountry"}),
			plf.addCombo({"label":"State",id:"strState"}),
			plf.addCombo({"label":"City",id:"strCity"}),
			plf.addText({"label":"Zip Code",id:"strZipCode",inputFormat:"string",InputLength:"20"})
		]
		companyMstrColumn.add(companyMasterCtrl);
		//Group Company Master Section Ends
		
		mainpage.ptrMainSection.add(companyMstrColumn) //Add Header Section to Main Page
		
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
					"controlid":"strCompanyCode",
					"tasktype":"onload",
					"input":["strCompanyCode"],
					"service":"CoreAdminService",
					"methodName":"initCompanyMstTS"
				},
		{
					"controlid":"strCompanyCode",
					"tasktype":"onenter",
					"input":["strCompanyCode"],
					"service":"CoreAdminService",
					"methodName":"fetchCompanyTS"
				},	
		
			{
			
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Create",
				"input":["strCompanyCode","strCompanyName","strParentEntity","strAddress","strCity","strState","strCountry","strZipCode"],
				"service":"CoreAdminService",
				"methodName":"createCompanyTS"
				},
			
			{
			   
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strCompanyCode","strCompanyName","strParentEntity","strAddress","strCity","strState","strCountry","strZipCode"],
				"service":"CoreAdminService",
				"methodName":"modifyCompanyTS"
				},
			{
			    
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strCompanyCode","strCompanyName","strParentEntity","strAddress","strCity","strState","strCountry","strZipCode"],
				"service":"CoreAdminService",
				"methodName":"deleteCompanyTS"
				},
			{
			    
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Activate",
				"input":["strCompanyCode","strCompanyName","strParentEntity","strAddress","strCity","strState","strCountry","strZipCode"],
				"service":"CoreAdminService",
				"methodName":"activateCompanyTS"
				},
			{
			 
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Inactive",
				"input":["strCompanyCode","strCompanyName","strParentEntity","strAddress","strCity","strState","strCountry","strZipCode"],
				"service":"CoreAdminService",
				"methodName":"inactivateCompanyTS"
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
				"except":["strCompanyCode"]
			},
			"active":
			{
				"enableAll":false,
				"except":["strCompanyCode"]
			}			
		}
				
		mainpage.hlpLinks=
		{
			"compCode":
				{
					"hlpType":"Header",
					"hlpScreen":"admin.CompanyHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCompanyCode","child":"COMPANY_CODE"},
							{"parent":"strCompanyName","child":"COMPANY_NAME"},
							{"parent":"strParentEntity","child":"PARENT_ENTITY"},
							//{"parent":"strParentEntity","child":"PARENT_ENTITY"},
							{"parent":"strCity","child":"CITY"},
							{"parent":"strState","child":"STATE"},
							{"parent":"strCountry","child":"COUNTRY"},
							{"parent":"strZipCode","child":"ZIPCODE"},
							{"parent":"strAddress","child":"ADDRESS"},							
							{"parent":"strStatus","child":"STATUS"}
							]
				},
				"parentcompCode":
				{
					"hlpType":"Header",
					"hlpScreen":"admin.CompanyHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strParentCompanyCode","child":"COMPANY_CODE"}							
							]
				}
		}
		this.callParent(arguments);
		
	}
});
