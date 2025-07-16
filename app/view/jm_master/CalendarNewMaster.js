/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995				Added var for all local variable	                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.CalendarNewMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Calender Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create a calendar."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a calendar."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a calendar."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate a calendar."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate a calendar."
            }
            ]
			
		mainpage.toolbarLinks=
		[
			//{"name":"Calendar Exceptions","linkid":"jm_calendarexceptions"},
			//{"name":"Calendar Constraints","linkid":"jm_calendarconstraints"}
		]
		
		//Add Keyfields
		mainpage.keyFields=["strCalenderCode"]
		
		//Truck Master Section starts

		var formCtrl=[];
		plf.columns=4
		var calendarMasterColumn = plf.addColumnSection({});		//69995
		
		
		var calendarMasterFormCtrl=						//69995
		[
			plf.addHlpText({"label":"Calendar Code",id:"strCalenderCode","mandatory":"true",hlpLinkID:"calcode",inputFormat:"string",InputLength:"60"},this),
			plf.addDate({"label":"Effective From","id":"dtEffectiveFrom","mandatory":"true"}),
			plf.addDate({"label":"Effective To","id":"dtEffectiveTo","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			plf.addText({"label":"Description","id":"strCalenderDesc","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addBlank(),
			plf.addBlank()
		//	plf.addButton({"label":"Submit","id":"btnSubmit"}),
			//plf.addDisplayOnly({"label":"Exceptions",linkId:"calendarexceptions"})
		
		]
		
		calendarMasterColumn.add(calendarMasterFormCtrl);
		//Truck Master Header Section Ends
		
		//Calendar Day FieldSet Section Begins
		/*
		plf.columns=7
		calendarFieldsetColumn = plf.addColumnSection({title:"Working Days"});
		calendarFieldsetFormCtrl=
		[
			plf.addCheckBox({"label":"Sunday","id":"strSunday"}),
			plf.addCheckBox({"label":"Monday","id":"strMonday"}),
			plf.addCheckBox({"label":"Tuesday","id":"strTuesday"}),
			plf.addCheckBox({"label":"Wednesday","id":"strWednesday"}),
			plf.addCheckBox({"label":"Thursday","id":"strThursday"}),
			plf.addCheckBox({"label":"Friday","id":"strFriday"}),
			plf.addCheckBox({"label":"Saturday","id":"strSaturday"})
		
		]
		calendarFieldsetColumn.add(calendarFieldsetFormCtrl);
		//Calendar Day FieldSet Section Ends
		*/
		
		//Adding Grid to Calendar Eception
		plf.columns=4
		//calExcDetailsPlan = plf.addFieldSet({title:""})
        var calExcDetailsPlan = plf.addColumnSection({title:""});		//69995
		var calenderFieldObj=											//69995
		[
			
			{columnname:"Week Day",dataname:"DATES",datatype:"string",editControl:"textbox",width:100,storeId:"strWeekDays"},
			{columnname:"Day Type",dataname:"DAY_TYPE",datatype:"string","mandatory":"true",editControl:"combo",width:300,storeId:"strDayTy"}
		]
		var calExcGridDtl=					//69995
		{
			title:"Working Days",
			id:"calenderDays",
			detail:calenderFieldObj,
			removeAddDelete:false,
			readonly:true,
			visibleRow:7
		}
		var calExcGridSection = plf.addGrid(calExcGridDtl,this)				//69995
		//helpGridSection = plf.addGrid(helpOncalendarGridDtl,this)	
		//Calendar Exception Grid Ends
		
		//Adding Grid to Constraints
		var CalendarGridFieldObj=						//69995
		[
			
			{columnname:"Start Date",dataname:"START_DATE",datatype:"string","mandatory":"true",editControl:"date",width:140,storeId:"strStartDate"},
			{columnname:"End Date",dataname:"END_DATE",datatype:"string","mandatory":"true",editControl:"date",width:300,storeId:"strEndDate"},
			{columnname:"Description",dataname:"DESC",datatype:"string","mandatory":"true",editControl:"textbox",width:140,storeId:"strDesc"},
			{columnname:"Day Type",dataname:"DAY_TYPE",datatype:"string","mandatory":"true",editControl:"combo",width:140,storeId:"strDayType"}

			]
		var calConsGridDtl=					//69995
		{
			title:"Exceptions",
			id:"CalendarExceptions",
			detail:CalendarGridFieldObj
		}
		var calConsGridSection = plf.addGrid(calConsGridDtl,this)		//69995
		//Calendar Exception Grid Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(calendarMasterColumn)//Add Header Section to Main 
		//mainpage.ptrMainSection.add(calendarFieldsetColumn)//Add Day Field Section to Main 
		mainpage.ptrMainSection.add(calExcGridSection) //Add Grid Section to Calendar Exception Page
		mainpage.ptrMainSection.add(calConsGridSection) 
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		/*mainpage.screenLinks=
		{
			"calendarexceptions":
				{
					"dest":"jm_master.CalendarExceptions",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"btnLink","dest":"strCalenderCode"}
							]
				}
		}*/
		
		// Event Handlers Mapping Begins
				mainpage.eventHandlers = 
			[
                 
                {
					"controlid":"",
					"tasktype":"onload",
					"input":["strCalenderCode"],
					"service":"CoreCalendarMasterService",
					"methodName":"initCalendarRosterTS"
				},					 
				{
					"controlid":"strCalenderCode",
					"tasktype":"onenter",
					"input":["strCalenderCode"],
					"service":"CoreCalendarMasterService",
					"methodName":"fetchCalendarRosterTS"
				},
				     
             {       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strCalenderCode","strCalenderDesc","strStatus","dtEffectiveFrom","dtEffectiveTo",
	                     "CalendarExceptions","calenderDays"],
				"service":"CoreCalendarMasterService",
				"methodName":"createCalendarRosterTS"
			},
			
			 { 
				
				  "controlid":"",
				  "tasktype":"toolbarclick",
				  "action":"Activate",
				  "input":["strCalenderCode","strCalenderDesc","strStatus","dtEffectiveFrom","dtEffectiveTo",
	                     "CalendarExceptions","calenderDays"],
				  "service":"CoreCalendarMasterService",
				  "methodName":"activateCalendarRosterTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Inactivate",
				"input":["strCalenderCode","strCalenderDesc","strStatus","dtEffectiveFrom","dtEffectiveTo",
	                     "CalendarExceptions","calenderDays"],
				"service":"CoreCalendarMasterService",
				"methodName":"inactivateCalendarRosterTS"
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strCalenderCode","strCalenderDesc","strStatus","dtEffectiveFrom","dtEffectiveTo",
	                     "CalendarExceptions","calenderDays"],
				"service":"CoreCalendarMasterService",
				"methodName":"deleteCalendarRosterTS"
			},
			 {       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strCalenderCode","strCalenderDesc","strStatus","dtEffectiveFrom","dtEffectiveTo",
	                     "CalendarExceptions","calenderDays"],
				"service":"CoreCalendarMasterService",
				"methodName":"modifyCalendarRosterTS"
			}
			
				
			];
			
		mainpage.hlpLinks=
		{
			"calcode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CalendarRosterHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCalenderCode","child":"CALENDAR_CODE"}
							]
				}

		}		
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
				"except":["strCalenderCode"]
			},
			"active":
			{
				"enableAll":false,
				"except":[]
			}			
		}
		
		
		mainpage.screenLinks=
		{
			"jm_calendarexceptions":
				{
					"dest":"jm_master.CalendarExceptions",
					"hdr":[
							{"src":"strCalenderCode","dest":"strCalenderCode"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"jm_calendarconstraints":
			{
					"dest":"jm_master.CalenderConstraints",
					"hdr":[
							{"src":"strCalenderCode","dest":"strCalenderCode"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
				
		}
			
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
