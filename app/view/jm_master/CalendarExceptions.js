
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
Ext.define('CueTrans.view.jm_master.CalendarExceptions', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Calender Exceptions"
		mainpage.keyFields=["strCalenderCode"]
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Maintain"]
		
		mainpage.toolbarLinks=
		[
			{"name":"Calendar Master","linkid":"jm_calendarmst"},
			{"name":"Calendar Constraints","linkid":"jm_calendarconstraints"}
		]
		
		
		var formCtrl=[];
		plf.columns=4
		var calendarMasterColumn = plf.addColumnSection({});		//69995
		var column1_obj =											//69995
		[
		   plf.addHlpText({"label":"Calendar Code","id":"strCalenderCode","mandatory":"true",hlpLinkID:"calcode",inputFormat:"string",InputLength:"60"},this),    
		   plf.addText({"label":"Calendar Description",id:"strCalenderDesc","mandatory":"true",inputFormat:"string",InputLength:"100"}),
		   plf.addDate({"label":"Date From","id":"dtEffectiveFrom"}),
		   plf.addDate({"label":"Date To","id":"dtEffectiveTo"}),
		   plf.addBlank(),
		   plf.addButton({"label":"Get Details","id":"getDetailsBtn"})
		   
		];
				
	
		calendarMasterColumn.add(column1_obj);
		calendarMasterColumn.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(calendarMasterColumn)
		var calenderFieldObj=		//69995
		[
			{columnname:"Date",dataname:"DATES",datatype:"string",editControl:"date",width:100},
			{columnname:"Day",dataname:"DAY",datatype:"string",editControl:"textbox",width:150,inputFormat:"string",InputLength:"30"},
			{columnname:"Status",dataname:"STATUS",datatype:"string",editControl:"combo",storeId:"strStatus",width:150},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:150,editControl:"textbox",inputFormat:"string",InputLength:"250"},
			
		]
		var calenderGridDtl=			//69995
		{
			title:"Calender Details",
			id:"calendarExceptionsGrid",
			detail:calenderFieldObj,
			removeAddDelete:true
			
		}
		var calenderGridSection = plf.addGrid(calenderGridDtl)	//69995
		mainpage.ptrMainSection.add(calenderGridSection) 
		
		//plf.columns=2
		//calendarMasterColumn1 = plf.addColumnSection({});
		/*column2_obj =
		[
		   plf.addBlank(),
		   plf.addButton({"label":"Submit","id":"submitBtn"})
		   
		];*/
				
	
		//calendarMasterColumn1.add(column2_obj);
		//mainpage.ptrMainSection.add(calendarMasterColumn1)
		mainpage.dataHistorySectionFlag=false;
		mainpage.eventHandlers = 
			[
				{
					"controlid":"strCalenderCode",
					"tasktype":"onenter",
					"input":["strCalenderCode"],
					"service":"CoreCalendarExceptionService",
					"methodName":"fetchCalenderTS"
				},
				{       
				"controlid":"getDetailsBtn",
				"tasktype":"btnclick",
				"input":["strCalenderCode","dtEffectiveFrom","dtEffectiveTo"],
				"service":"CoreCalendarExceptionService",
				"methodName":"fetchCalendarDetailsTS"
			},
			{       
				"controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Maintain",
				"input":["calendarExceptionsGrid","strCalenderCode","dtEffectiveFrom","dtEffectiveTo"],
				"service":"CoreCalendarExceptionService",
				"methodName":"maintainCalendarDetailsTS"
			},
			{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreCalendarExceptionService",
					"methodName":"initCalendarExceptionScrTS"
				},
						
							
			];
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


    mainpage.screenLinks=
		{
			"jm_calendarmst":
				{
					"dest":"jm_master.CalendarMaster",
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
		
		
	
		this.callParent(arguments);
	}
});
