/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID		Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995			Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.EmployeeGroupHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.screenName = "Employee Group Help";
		mainpage.startPainting();
		
		
		//Calendar List Header Section Begins
		plf.columns=3
		var helpOnEmployeeHdrCollapse = plf.addColumnSection({collapsed: true});			//69995
		
		var helpOnEmployeeFormCtrl=						//69995
		[
			plf.addText({"label":"Group Code",id:"strGroupCode","anywhereSearch":"true"}),			
			plf.addText({"label":"Group Name",id:"strGroupName"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addBlank(),
			plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
		]
		helpOnEmployeeHdrCollapse.add(helpOnEmployeeFormCtrl);
		//Calendar List Header Section Ends
		
		//Calendar Grid Section Begins
		var helpOnEmployeeGridFieldObj=		//69995
		[
			{columnname:"Group Code",dataname:"GROUP_CODE",datatype:"string",width:150},
			{columnname:"Group Name",dataname:"GROUP_NAME",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",datatype:"string",width:200}
		]
		var helpOnEmployeeGridDtl=			//69995
		{
			title:"Employee Details",
			id:"employeeGroupGrid",
			detail:helpOnEmployeeGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true

		}
		var helpGridSection = plf.addGrid(helpOnEmployeeGridDtl,this)			//69995
		mainpage.hlpSearchGridPtr = helpGridSection		
		//Calendar Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnEmployeeHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
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
