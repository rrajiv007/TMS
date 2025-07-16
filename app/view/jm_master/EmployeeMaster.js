/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.EmployeeMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Employee Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create an employee."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit an employee."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete an employee."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate an employee."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate an employee."
            }
            ]
		
		//Add Keyfields
		mainpage.keyFields=["strEmployeeCode"]
		
		//EmployeeMaster Header Section Begins
		plf.columns=4
		var employeeMasterColumn = plf.addColumnSection({});
		var employeeMstrCtrl=
		[
			plf.addHlpText({"label":"Employee Code",id:"strEmployeeCode","mandatory":"true",hlpLinkID:"employeeCode",inputFormat:"string",InputLength:"40"},this),
			plf.addText({"label":"Employee Name",id:"strEmployeeName","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addCombo({"label":"Employee Group",id:"strEmployeeGroup"}),	
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),			
			plf.addHlpText({"label":"User Id",id:"strUserCode",hlpLinkID:"userid",inputFormat:"string",InputLength:"40"},this),
			plf.addHlpText({"label":"Supervisor Code",id:"strSupervisorCode",hlpLinkID:"employeeCodenew",inputFormat:"string",InputLength:"40"},this),
			plf.addDisplayOnly({"label":"Supervisor Name",id:"strSupervisorName"}),			
			
			plf.addText({"label":"Email",id:"strEmail",inputFormat:"email",InputLength:"60","mandatory":"true"}),
			plf.addText({"label":"Phone 1",id:"strPhone1",inputFormat:"integer","mandatory":"true",InputLength:"20"}),
			plf.addText({"label":"Phone 2",id:"strPhone2",inputFormat:"integer",InputLength:"20"}),
			plf.addText({"label":"Address",id:"strAddress",inputFormat:"string",InputLength:"200"}),
			plf.addCombo({"label":"Country",id:"strEmpCountry",inputFormat:"string","mandatory":"true",InputLength:"60"}),
			plf.addCombo({"label":"State/Province",id:"strEmpState",inputFormat:"string",InputLength:"60"}),
			plf.addCombo({"label":"City",id:"strEmpCity",inputFormat:"string",InputLength:"50"}),
			plf.addText({"label":"Zip Code",id:"strZipCode",inputFormat:"integer",InputLength:"20"})
			//plf.addCombo({"label":"Employee Role",id:"strEmployeeRole"}),	
			]
		employeeMasterColumn.add(employeeMstrCtrl);
		
		
		var employeeGridFieldObj=
		[
			//{columnname:"Role Name",dataname:"ROLE_NAME",datatype:"string",editControl:"textbox",width:250}
			{columnname:"Role Name",dataname:"ROLE_NAME",datatype:"string",editControl:"combo",width:100,storeId:"strRoleName"},
			{columnname:"Default Role",dataname:"DEFAULT",datatype:"string",editControl:"combo",width:100,storeId:"strDefault"}
			
			
		]
		var employeeGridDtl=
		{
			title:"Employee Role",
			id:"employeeMap",
			detail:employeeGridFieldObj,
			visibleRow:plf.searchVisibleRows
		}
		var employeemasterGridSection = plf.addGrid(employeeGridDtl,this)
		//EmployeeMaster Header Section Ends
		
		mainpage.ptrMainSection.add(employeeMasterColumn)//Add Header Section to Main Page
		
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		
		// for green line
		employeeMasterColumn.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(employeeMasterColumn)//add hdr details
		mainpage.ptrMainSection.add(employeemasterGridSection)
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
					"controlid":"",
					"tasktype":"onload",
					"input":["strEmployeeCode"],
					"service":"CoreEmployeeService",
					"methodName":"initEmployeeMasterScrTS" 
			},	
			{ 
					"controlid":"strEmployeeCode",
					"tasktype":"onenter",
					"input":["strEmployeeCode"],
					"service":"CoreEmployeeService",
					"methodName":"fetchEmployeeTS"
			},
			{ 
					"controlid":"strUserCode",
					"tasktype":"onenter",
					"input":["strUserCode"], 
					"service":"CoreEmployeeService",
					"methodName":"fetchUserCodeTS"
			},	
{ 
					"controlid":"strSupervisorCode",
					"tasktype":"onenter",
					"input":["strSupervisorCode"], 
					"service":"CoreEmployeeService",
					"methodName":"fetchSupervisorCodeTS"
			},			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Create",
					"input":["strEmployeeCode","strEmployeeName","strEmployeeGroup","strPhone1","strPhone2","strEmail",
					"strAddress","strArea","strEmpCity","strEmpState","strEmpCountry","strZipCode","strStatus","strCreatedBy","dtCreatedDate","employeeMap","strUserId","strSupervisorCode","strUserCode"],
					"service":"CoreEmployeeService",
					"methodName":"createEmployeeTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Edit",
					"input":["strEmployeeCode","strEmployeeName","strEmployeeGroup","strPhone1","strPhone2","strEmail",
					"strAddress","strArea","strEmpCity","strEmpState","strEmpCountry","strZipCode","strStatus","strCreatedBy","dtCreatedDate","employeeMap","strUserId","strSupervisorCode","strUserCode"],
					"service":"CoreEmployeeService",
					"methodName":"modifyEmployeeTS"
			}, 
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Delete",
					"input":["strEmployeeCode"],
					"service":"CoreEmployeeService",
					"methodName":"deleteEmployeeTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Activate",
					"input":["strEmployeeCode","strEmployeeName","strEmployeeGroup","strPhone1","strPhone2","strEmail",
					"strAddress","strArea","strEmpCity","strEmpState","strEmpCountry","strZipCode","strStatus","strCreatedBy","dtCreatedDate","employeeMap","strUserId","strSupervisorCode","strUserCode"],
					"service":"CoreEmployeeService",
					"methodName":"activateEmployeeTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Inactivate",
					"input":["strEmployeeCode","strEmployeeName","strEmployeeGroup","strPhone1","strPhone2","strEmail",
					"strAddress","strArea","strEmpCity","strEmpState","strEmpCountry","strZipCode","strStatus","strCreatedBy","dtCreatedDate","employeeMap","strUserId","strSupervisorCode","strUserCode"],
					"service":"CoreEmployeeService",
					"methodName":"inactivateEmployeeTS"
			},
			{
				"controlid":"strEmpCountry",
				"tasktype":"onchange",
				"input":["strEmpCountry"],
				"service":"CoreEmployeeService",
				"methodName":"fetchonchangeStateTS"
		},
		 
		{
				"controlid":"strEmpState",
				"tasktype":"onchange", 
				"input":["strEmpCountry","strEmpState"],
				"service":"CoreEmployeeService",
				"methodName":"fetchonchangeCityTS"
		},									
			{
				"tasktype":"proto",
				"filename":"jm_master/EmployeeMaster.json"
			}
		
	
		];
		//Event Handlers Mapping Ends
		
		//Generate Screen Section
		//mainpage.generateScreen();
		 
		mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":[]
			},
			"locked":
			{
				"enableAll":true,
				"except":["strEmployeeName"]
			},
			"active":
			{
				"enableAll":true,
				"except":["strEmployeeName"]
			}			
		}
		
		
		mainpage.hlpLinks=
		{
			"employeeCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.EmployeeHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strEmployeeCode","child":"EMPLOYEE_CODE"}
							]
				},
				"userid":
				{
					"hlpType":"Header",
					"hlpScreen":"admin.UserHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strUserCode","child":"USER_NAME"},
							{"parent":"strEmail","child":"EMAIL_ID"},
							{"parent":"strPhone1","child":"PHONE_NUMBER"}							
							]
				},				
				"employeeCodenew":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.EmployeeHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strSupervisorCode","child":"EMPLOYEE_CODE"},
							{"parent":"strSupervisorName","child":"EMPLOYEE_NAME"}
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
