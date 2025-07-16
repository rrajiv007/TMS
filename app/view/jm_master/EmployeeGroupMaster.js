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
Ext.define('CueTrans.view.jm_master.EmployeeGroupMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Employee Group Master";
		
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
 

		plf.columns=4
		var EmployeeHdrColumn = plf.addColumnSection({});			//69995
		var EmployeeHdrCtrl=										//69995	
			[	
			    plf.addHlpText({"label":"Group Code",id:"strGroupCode","mandatory":"true",hlpLinkID:"groupcode",inputFormat:"string",InputLength:"40"},this),
			    plf.addText({"label":"Group Name",id:"strGroupName","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"})					
			]
		
		EmployeeHdrColumn.add(EmployeeHdrCtrl)
		
		
		EmployeeHdrCol = plf.addColumnSection({title:"Employee List"});
		
		plf.columns=4
		var EmployeeHdrDefaultColumn = plf.addColumnSection({});		//69995
		var EmployeeDefaultHdrCtrl=										//69995
			[	
			    plf.addCombo({"label":"Employee Role","id":"strEmployeeRole"})
     								
			]
		
		EmployeeHdrDefaultColumn.add(EmployeeDefaultHdrCtrl)
						
var unMappedObj=
		[
		{columnname:"Available",dataname:"CODE",datatype:"string",width:300,hidden:true},
		{columnname:"Available",dataname:"DESC",datatype:"string",width:100}
		
	]

		var mappedObj=
		[
			{columnname:"Selected",dataname:"CODE",datatype:"string",width:300,hidden:true},
		{columnname:"Selected",dataname:"DESC",datatype:"string",width:100}
		]
		
		var ZoneDeptHdrSec = plf.addMultiSelect
		    ({
				"id":"zonedepmap",
				"mapgridid":"mappedGrid",
				"unmapgridid":"unmappedGrid",
				"keycolumn":"CODE",
				"mapdetail":mappedObj,
				"unmapdetail":unMappedObj
			});
						
		mainpage.ptrMainSection.add(EmployeeHdrColumn) 
		mainpage.ptrMainSection.add(EmployeeHdrDefaultColumn) 
		mainpage.ptrMainSection.add(ZoneDeptHdrSec)
		
				
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		   {
				"controlid":"strEmployeeRole",
				"tasktype":"onchange",
				"input":["strEmployeeRole"],
				"service":"CoreEmployeeService",
				"methodName":"onchangeEmpRoleTS"
			},
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strGroupCode"],
				"service":"CoreEmployeeService",
				"methodName":"initEmployeeGroupMstTS"
		},
		{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Create",
					"input":["strGroupCode","strGroupName","strStatus","strEmployeeRole","mappedGrid"],
					"service":"CoreEmployeeService",
					"methodName":"createEmployeeGroupMstTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",          
					"action":"Edit",
					"input":["strGroupCode","strGroupName","strStatus","strEmployeeRole","mappedGrid"],
					"service":"CoreEmployeeService",
					"methodName":"modifyEmployeeGroupMstTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Activate",
					"input":["strGroupCode","strGroupName","strStatus","strEmployeeRole","mappedGrid"],
					"service":"CoreEmployeeService",
					"methodName":"activateEmployeeGroupMstTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Delete",
					"input":["strGroupCode","strGroupName","strStatus","strEmployeeRole","mappedGrid"],
					"service":"CoreEmployeeService",
					"methodName":"deleteEmployeeGroupMstTS"
			},
			{
					"controlid":"strGroupCode",
					"tasktype":"onenter",
					"input":["strGroupCode","strEmployeeRole"],
					"service":"CoreEmployeeService",
					"methodName":"fetchEmployeeGroupMstTS"
			},
			{
					"controlid":"strGroupCode",
					"tasktype":"toolbarclick",
					"action":"Inactivate",
					"input":["strGroupCode","strGroupName","strStatus","strEmployeeRole","mappedGrid"],
					"service":"CoreEmployeeService",
					"methodName":"inactivateEmployeeGroupMstTS"
			}
			/*,
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["EmployeeDtlCache"],
				"service":"CoreShiftService",
				"methodName":"saveEmployeeRosterTS"
		},
		{
				"grideventid":"EMPLOYEE_CODE_ONENTER",
				"tasktype":"gridonenter",
				"input":["EMP_CODE"],
				"service":"CoreShiftService",
				"methodName":"fetchEmployeeDtlTS"
		},
		{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["dtDate","strEmployeeCode","strEmployeeType"],
				"service":"CoreShiftService",
				"methodName":"fetchALLRosterDtlsTS"
		},
		{
				"controlid":"btnSearchdefault",
				"tasktype":"btnclick",
				"input":["strEmployeeCode","strEmployeeDesc","strStatus","strDayType"],
				"service":"CoreShiftService",
				"methodName":"DefaultDateShiftNameTS"
		}
		,
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strEmployeeCode","strEmployeeDesc","strDayType","EmployeeDtlCache","strStatus"],
				"service":"CoreEmployeeService",
				"methodName":"createEmployeeMasterTS"
		},
		{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strEmployeeCode","strEmployeeDesc","strStatus","strDayType"],
				"service":"CoreEmployeeService",
				"methodName":"FETCHALLEmployeeSrchTS"
		},
		{
				"controlid":"btnSearchdefault",
				"tasktype":"btnclick",
				"input":["strEmployeeCode","strEmployeeDesc","strStatus","strDayType"],
				"service":"CoreEmployeeService",
				"methodName":"FETCHALLEmployeeSrchTS"
		},
		{
				"grideventid":"EMPLOYEE_CODE_ONENTER",
				"tasktype":"gridonenter",
				"input":["EMP_CODE"],
				"service":"CoreTruckService",
				"methodName":"fetchSupplierCodeTS"
				}*/	
		];
		
		
			mainpage.hlpLinks=
		{
			"EmployeeScreenHelp":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.EmployeeMasterHelp",
					"send":[
							{"parent":"strEmployeeCode","child":"strEmployeeCode"}
						   ],
					"receive":[
							{"parent":"strEmployeeCode","child":"Employee_CODE"}
							]
				},
				"groupcode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.EmployeeGroupHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strGroupCode","child":"GROUP_CODE"}
							]
				},
				"employCode":
				{
					"hlpType":"grid",
					"gridID":"EmployeeDtlCache",
					"hlpScreen":"jm_master.EmployeeHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					//{"parent":"IVMS_VENDOR_CODE","child":"SUPPLIER_CODE"}
					{"parent":"EMP_CODE","child":"EMPLOYEE_CODE"}
					
							]
				}
				
		}
		
		this.callParent(arguments);
		
	}
});