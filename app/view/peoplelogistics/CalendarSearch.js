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
Ext.define('CueTrans.view.jm_master.CalendarSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.screenName = "Calendar Summary";
		mainpage.startPainting();
		
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Create a Calendar","linkid":"jm_createcalender","tooltip":"Click here to create a calendar."}
		]
		//Calendar List Header Section Begins
		plf.columns=3
		var helpOncalendarHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);		//69995
		
		var helpOncalendarFormCtrl=			//69995
		[
			plf.addText({"label":"Calendar Code",id:"strCalendarCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Calendar Code To",id:"strCalendarCodeTo","anywhereSearch":"true"}),
			plf.addText({"label":"Calendar Description",id:"strCalenderDesc"}),
				plf.addCombo({"label":"Calendar Status",id:"strStatus"})
			//plf.addBlank(),
			//plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."}),
		]
		helpOncalendarHdrCollapse.add(helpOncalendarFormCtrl);
		//Calendar List Header Section Ends
		
		//Calendar Grid Section Begins
		var helpOncalendarGridFieldObj=						//69995
		[
			{columnname:"Calendar Code",dataname:"CALENDAR_CODE",datatype:"string",width:100,linkId:"calendarmaster","tooltip":"Click here to launch the calendar screen."},
			{columnname:"Calendar Description",dataname:"CALENDAR_DESC",datatype:"string",width:300},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"string",width:200},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"string",width:200},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:200}
		]
		var helpOncalendarGridDtl=					//69995
		{
			title:"Calendar Details",
			id:"calendarList",
			removeAddDelete:true,
			visibleRow:plf.searchVisibleRows,
			detail:helpOncalendarGridFieldObj,
			readonly:true,
		}
		var helpGridSection = plf.addGrid(helpOncalendarGridDtl,this)			//69995
		//Calendar Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOncalendarHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strCalendarCodeFrom","strCalenderDesc","strStatus"],
				"service":"CoreCalendarService",
				"methodName":"fetchAllCalendarsTS"
			},
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreCalendarService",
				"methodName":"initCalenderSearchScrTS"
			},
			
			{
				"tasktype":"proto",
				"filename":"jm_master/CalendarSearch.json"	
			}
			
		];
		//Event Handlers Mapping Ends
		
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
				},
				"jm_createcalender":
				{
					"dest":"jm_master.CalendarMaster",
					"hdr":[
							{"src":"","dest":""}							
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
