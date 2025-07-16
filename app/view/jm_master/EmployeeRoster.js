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
Ext.define('CueTrans.view.jm_master.EmployeeRoster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Employee Roster";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		
		mainpage.toolbarActions= [
			{
                "name": "Save",
                "tooltip": "Click here to Save Roster."
            }
            ]


		plf.columns=4
		var EmployeeHdrColumn = plf.addColumnSection({});			//69995
		var EmployeeHdrCtrl=										//69995	
			[	
			    plf.addDate({"label":"Date","id":"dtDate"}),				
				plf.addText({"label":"Employee Code",id:"strEmployeeCode"}),
				plf.addCombo({"label":"Employee Type",id:"strEmployeeType"}),
                plf.addBlank({}), 
                plf.addButton({"label":"Fetch Details","id":"btnSearch"})							
			]
		
		EmployeeHdrColumn.add(EmployeeHdrCtrl)
		
		
		EmployeeHdrCol = plf.addColumnSection({title:""});
		
		plf.columns=4
		var EmployeeHdrDefaultColumn = plf.addColumnSection({});		//69995
		var EmployeeDefaultHdrCtrl=										//69995
			[	
			    plf.addDate({"label":"Default Date","id":"dtDefaultDate"}),
     			plf.addCombo({"label":"Shift Name",id:"strShiftName"}),	
                plf.addButton({"label":"Default","id":"btnSearchdefault"})							
			]
		
		EmployeeHdrDefaultColumn.add(EmployeeDefaultHdrCtrl)
						

		var EmployeeGridFieldObj=			//69995
		[   
			{columnname:"Date",dataname:"R_DATE",datatype:"string",width:250,editControl:"date"},
			{columnname:"Employee Code",dataname:"EMP_CODE",datatype:"string",width:150,editControl:"textbox",helpid:'employCode',"onenter":"EMPLOYEE_CODE_ONENTER"},
			{columnname:"Employee Name",dataname:"EMP_NAME",datatype:"string",width:150,editControl:"addDisplayOnly"},
            {columnname:"Employee Type",dataname:"EMP_TYPE",datatype:"string",width:150,storeId:"strEmployeeType",editControl:"addDisplayOnly"},
            {columnname:"Shift Name",dataname:"SHIFT_NAME",datatype:"string",width:150,storeId:"strShiftNm",editControl:"combo"}			
		]
		var EmployeeGridDtl=				//69995
		{
			title:"Employee Details",
			id:"EmployeeDtlCache",
			detail:EmployeeGridFieldObj,
			visibleRow:10
		}
		var EmployeeGridSection = plf.addGrid(EmployeeGridDtl,this)			//69995
		
		mainpage.ptrMainSection.add(EmployeeHdrColumn) 
		mainpage.ptrMainSection.add(EmployeeHdrDefaultColumn) 
		mainpage.ptrMainSection.add(EmployeeGridSection)
				
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreShiftService",
				"methodName":"initEmployeeRosterTS"
		},
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
		/*,
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