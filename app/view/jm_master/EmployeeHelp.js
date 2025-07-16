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
Ext.define('CueTrans.view.jm_master.EmployeeHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.screenName = "Employee Help";
		mainpage.startPainting();
		
		
		//Calendar List Header Section Begins
		plf.columns=3
		var helpOnEmployeeHdrCollapse = plf.addColumnSection({collapsed: true});			//69995
		
		var helpOnEmployeeFormCtrl=				//69995
		[
			plf.addText({"label":"Employee Code",id:"strEmployeeCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Employee Code To",id:"strEmployeeCodeTo","anywhereSearch":"true"}),
			plf.addText({"label":"Employee Name",id:"strEmployeeName"}),
			plf.addCombo({"label":"Employee Role",id:"strEmployeeRole"}),
			
			plf.addCombo({"label":"Country",id:"strCountry"}),
			
			plf.addCombo({"label":"State",id:"strState"}),
			plf.addCombo({"label":"City",id:"strCity"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
            plf.addBlank(),
			plf.addBlank(),
			plf.addHidden({"label":"Context",id:"strContext"}),
       		plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
		]
		helpOnEmployeeHdrCollapse.add(helpOnEmployeeFormCtrl);
		//Calendar List Header Section Ends
		
		//Calendar Grid Section Begins
		var helpOnEmployeeGridFieldObj=			//69995
		[
			{columnname:"Employee Code",dataname:"EMPLOYEE_CODE",datatype:"string",width:150},
			{columnname:"Employee Name",dataname:"EMPLOYEE_NAME",datatype:"string",width:200},
			{columnname:"Employee Role",dataname:"EMPLOYEE_ROLE",datatype:"string",datatype:"string",width:200},
			{columnname:"Phone 1",dataname:"PHONE1",datatype:"string",width:200},
			{columnname:"City",dataname:"CITY",datatype:"string",width:200},
			{columnname:"State",dataname:"STATE",datatype:"string",width:200},
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",width:200},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:200},
		]
		var helpOnEmployeeGridDtl=			//69995
		{
			title:"Employee Details",
			id:"employeeRole",
			detail:helpOnEmployeeGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true

		}
		var helpGridSection = plf.addGrid(helpOnEmployeeGridDtl,this)		//69995
		mainpage.hlpSearchGridPtr = helpGridSection		
		//Calendar Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnEmployeeHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
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
				"input":["strContext"],
				"service":"CoreEmployeeService",
				"methodName":"initEmployeeMasterSearchScrTS"
			},
			{
			"tasktype":"proto",
			"filename":"jm_master/EmployeeHelp.json"
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
		//Event Handlers Mapping Ends
		/*
		mainpage.screenLinks=
		{
			"calendarmaster":
				{
					"dest":"jm_master.CalendarMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"CALENDAR_CODE","dest":"strCalenderCode"}
							]
				}
		}
		*/
		//Generate Screen Section
	/*	mainpage.generateScreen();

		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
		
	}
});
