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
Ext.define('CueTrans.view.jm_master.EmployeeGroupSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
   
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Employee Group Summary";
		
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=
		[
			{"name":"Create Employee Group","linkid":"jm_employeeMst","tooltip":"Click here to create a Employee Group."}
		]
		
		
		//HelpOnEmployee Search Section starts
		plf.columns=4
		var employeeHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);		//69995
		
		
		//plf.addText({"label":"Employee Code To",id:"strEmployeeCodeTo","anywhereSearch":"true"}),
		
		var employeeFormCtrl=					//69995
		[
			plf.addText({"label":"Group Code",id:"strGroupCode","anywhereSearch":"true"}),			
			plf.addText({"label":"Group Name",id:"strGroupName"}),
			plf.addCombo({"label":"Status",id:"strStatus"})
			//plf.addBlank(),
			//plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
			
		]
		
		employeeHdrCollapse.add(employeeFormCtrl);
		//HelpOnEmployee Header Section Ends
		
		//HelpOnEmployee Grid Section Begins
		var employeeGridFieldObj=				//69995
		[
			{columnname:"Group Code",dataname:"GROUP_CODE",datatype:"string",width:150,linkId:"EmployeeMaster","tooltip":"Click here to launch the employee screen."},
			{columnname:"Group Name",dataname:"GROUP_NAME",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",datatype:"string",width:200}
					]
		var employeeGridDtl=					//69995
		{
			title:"Employee Details",
			id:"employeeGroupGrid",
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
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreEmployeeService",
				"methodName":"initEmployeeGroupSearchScrTS"
			},
		{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strGroupCode","strGroupName","strStatus"],
					"service":"CoreEmployeeService",
					"methodName":"fetchAllEmployeeGroupTS"
			}/*,
			,
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
		}*/
		];
		//Event Handlers Mapping Ends
		
		mainpage.screenLinks=
		{
			"EmployeeMaster":
				{
					"dest":"jm_master.EmployeeGroupMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"GROUP_CODE","dest":"strGroupCode"}
							]
				},
				"jm_employeeMst":
				{
					"dest":"jm_master.EmployeeGroupMaster",
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
