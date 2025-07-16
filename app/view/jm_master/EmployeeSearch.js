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
Ext.define('CueTrans.view.jm_master.EmployeeSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
   
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Employee Summary";
		
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=
		[
			{"name":"Create Employee","linkid":"jm_employeeMst","tooltip":"Click here to create an employee."}
		]
		
		
		//HelpOnEmployee Search Section starts
		plf.columns=4
		var employeeHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);			//69995
		
		
		//plf.addText({"label":"Employee Code To",id:"strEmployeeCodeTo","anywhereSearch":"true"}),
		
		var employeeFormCtrl=									//69995
		[
			plf.addText({"label":"Employee Code",id:"strEmployeeCodeFrom","anywhereSearch":"true"}),
			
			plf.addText({"label":"Employee Name",id:"strEmployeeName"}),
			plf.addCombo({"label":"Employee Role",id:"strEmployeeRole"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Country",id:"strCountry"}),
			
			plf.addCombo({"label":"State",id:"strState"}),
			plf.addCombo({"label":"City",id:"strCity"}),
			
			//plf.addBlank(),
			//plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
			
		]
		
		employeeHdrCollapse.add(employeeFormCtrl);
		//HelpOnEmployee Header Section Ends
		
		//HelpOnEmployee Grid Section Begins
		var employeeGridFieldObj=									//69995
		[
			{columnname:"Employee Code",dataname:"EMPLOYEE_CODE",datatype:"string",width:150,linkId:"EmployeeMaster","tooltip":"Click here to launch the employee screen."},
			{columnname:"Employee Name",dataname:"EMPLOYEE_NAME",datatype:"string",width:150},
			{columnname:"User Id",dataname:"USER_ID",datatype:"string",width:150},
			{columnname:"Address",dataname:"ADDRESS",datatype:"string",width:150},
			{columnname:"Email Id",dataname:"EMAIL",datatype:"string",width:150},
			{columnname:"Employee Role",dataname:"EMPLOYEE_ROLE",datatype:"string",datatype:"string",width:200},
			{columnname:"Phone 1",dataname:"PHONE1",datatype:"string",width:100},
			{columnname:"City",dataname:"CITY",datatype:"string",width:130},
			{columnname:"State",dataname:"STATE",datatype:"string",width:130},
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",width:130},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:200},
		
		]
		var employeeGridDtl=										//69995
		{
			title:"Employee Details",
			id:"employeeRole",
			detail:employeeGridFieldObj,
			visibleRow:plf.searchVisibleRows,
			readOnly:true,
			removeAddDelete:true
		}
		var employeeGridSection = plf.addGrid(employeeGridDtl,this)			//69995
		//HelpOnEmployee Grid Section Ends
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(employeeHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(employeeGridSection) //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
					
			{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strEmployeeCodeFrom","strEmployeeName","strEmployeeRole","strCity","strState","strCountry","strStatus"],
					"service":"CoreEmployeeService",
					"methodName":"fetchAllEmployeeTS"
			},
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strEmployeeCodeFrom","strEmployeeName","strEmployeeRole","strCity","strState","strCountry","strStatus"],
				"service":"CoreEmployeeService",
				"methodName":"initEmployeeMasterSearchScrTS"
			},
			{
			"tasktype":"proto",
			"filename":"jm_master/EmployeeSearch.json"
			},
			{
				"controlid":"strCountry",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreEmployeeService",
				"methodName":"fetchStateTS"
		},
		
		{
				"controlid":"strState",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreEmployeeService",
				"methodName":"fetchCityTS"
		}
		];
		//Event Handlers Mapping Ends
		
		mainpage.screenLinks=
		{
			"EmployeeMaster":
				{
					"dest":"jm_master.EmployeeMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"EMPLOYEE_CODE","dest":"strEmployeeCode"}
							]
				},
				"jm_employeeMst":
				{
					"dest":"jm_master.EmployeeMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
			
	
		this.callParent(arguments);
		
	}
});
