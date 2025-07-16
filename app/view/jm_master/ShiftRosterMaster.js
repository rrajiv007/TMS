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
Ext.define('CueTrans.view.jm_master.ShiftRosterMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Shift Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Save",
                "tooltip": "Click here to create a Shift Master."
            }
            ]
			
		mainpage.toolbarLinks=
		[
			//{"name":"Calendar Exceptions","linkid":"jm_calendarexceptions"},
			//{"name":"Calendar Constraints","linkid":"jm_calendarconstraints"}
		]
		
		//Add Keyfields
		//mainpage.keyFields=["strCalenderCode"]
		
		//Truck Master Section starts

		var formCtrl=[];
		plf.columns=4
		var shiftMasterColumn = plf.addColumnSection({});		//69995
		
	 	
		var shiftMasterFormCtrl=											//69995
		[
			plf.addCombo({"label":"Day Type","id":"strShiftCode","mandatory":"true",width:"200"}),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
		    plf.addButton({"label":"Fetch Shift Details","id":"btnfetch"})
			//plf.addDisplayOnly({"label":"Exceptions",linkId:"calendarexceptions"})
		
		]
	 	
		shiftMasterColumn.add(shiftMasterFormCtrl);
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
        var shiftExcDetailsPlan = plf.addColumnSection({title:""});					//69995
		var shiftFieldObj=															//69995	
		[
			
			{columnname:"Shift Name",dataname:"SHIFT_NAME",datatype:"string",width:250,editControl:"combo",storeId:"strShiftName",},
			{columnname:"Start Time (hh:mm)",dataname:"START_TIME",datatype:"string",width:150,storeId:"strStartTime",editControl:"time"},
			{columnname:"End Time (hh:mm)",dataname:"END_TIME",datatype:"string",width:150,storeId:"strEndTime",editControl:"time"}	
		]
		var shiftExcGridDtl=									//69995
		{
			title:"Shift Details",
			id:"shiftDtlCache",
			detail:shiftFieldObj
		}
		var shiftExcGridSection = plf.addGrid(shiftExcGridDtl,this)				//69995
		//helpGridSection = plf.addGrid(helpOncalendarGridDtl,this)	
		//Calendar Exception Grid Ends
		
		//Adding Grid to Constraints
		/*
		helpOnconstraintGridFieldObj=
		[
			
			{columnname:"Start Date",dataname:"CONSTRAINT_CODE",datatype:"string","mandatory":"true",editControl:"date",width:140},
			{columnname:"End Date",dataname:"CONSTRAINT_DESC",datatype:"string","mandatory":"true",editControl:"date",width:300},
			{columnname:"Description",dataname:"DESC",datatype:"string","mandatory":"true",editControl:"textbox",width:140},
			{columnname:"Day Type",dataname:"DAY_TYPE",datatype:"string","mandatory":"true",editControl:"combo",width:140}

			]
		calConsGridDtl=
		{
			title:"Exceptions",
			id:"constraintDtl",
			detail:helpOnconstraintGridFieldObj
		}
		calConsGridSection = plf.addGrid(calConsGridDtl,this)
		//Calendar Exception Grid Ends
		*/
		//Add Child Sections
		mainpage.ptrMainSection.add(shiftMasterColumn)//Add Header Section to Main 
		//mainpage.ptrMainSection.add(calendarFieldsetColumn)//Add Day Field Section to Main 
		mainpage.ptrMainSection.add(shiftExcGridSection) //Add Grid Section to Calendar Exception Page
		//mainpage.ptrMainSection.add(calConsGridSection) 
		//History Data Section
		//mainpage.dataHistorySectionFlag=true;
		
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
				"input":["strShiftCode"],
				"service":"CoreShiftService",
				"methodName":"initShiftMasterNewTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strShiftCode","shiftDtlCache"],
				"service":"CoreShiftService",
				"methodName":"saveShiftMasterTS"
		},
		
			{
				"controlid":"btnfetch",
				"tasktype":"btnclick",
				"input":["strShiftCode"],
				"service":"CoreShiftService",
				"methodName":"FetchShiftMasterNewTS"
			}
			
				
			];
			
		/*
		mainpage.hlpLinks=
		{
			"calcode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CalendarHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCalenderCode","child":"CALENDAR_CODE"}
							]
				}

		}		
			//Event Handlers Mapping Ends
			*/
			/*
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
		*/
		/*
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
