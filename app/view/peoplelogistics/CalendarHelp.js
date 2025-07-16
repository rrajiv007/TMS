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
Ext.define('CueTrans.view.jm_master.CalendarHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.screenName = "Calendar Help";
		mainpage.startPainting();
		
		
		//Calendar List Header Section Begins
		plf.columns=3
		var helpOncalendarHdrCollapse = plf.addColumnSection({title:"",collapsed:false});						//69995
		
		var helpOncalendarFormCtrl=							//69995
		[
			plf.addText({"label":"Calendar Code",id:"strCalendarCodeFrom"}),
			plf.addText({"label":"Calendar Description",id:"strCalenderDesc"}),
			plf.addCombo({"label":"Calendar Status",id:"strStatus"}),
			plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."}),
		]
		helpOncalendarHdrCollapse.add(helpOncalendarFormCtrl);
		//Calendar List Header Section Ends
		
		//Calendar Grid Section Begins
		var helpOncalendarGridFieldObj=					//69995
		[
			{columnname:"Calendar Code",dataname:"CALENDAR_CODE",datatype:"string",width:100},
			{columnname:"Calendar Description",dataname:"CALENDAR_DESC",datatype:"string",width:200},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"string",width:100},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
		]
		var helpOncalendarGridDtl=					//69995
		{
			title:"",
			id:"calendarList",
			detail:helpOncalendarGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true,
			removeTbar:true,
			widthBasis:"flex"

		}
		var helpGridSection = plf.addGrid(helpOncalendarGridDtl,this)			//69995
		mainpage.hlpSearchGridPtr = helpGridSection		
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
				"input":["strCalendarCodeFrom","strCalendarCodeTo","strCalenderDesc","strStatus"],
				"service":"CoreCalendarService",
				"methodName":"fetchAllCalendarsTS"
			},
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strCalendarCodeFrom","strCalendarCodeTo","strCalenderDesc","strStatus"],
				"service":"CoreCalendarService",
				"methodName":"initCalenderSearchScrTS"
				},
				{
					"tasktype":"proto",
					"filename":"jm_master/CalendarHelp.json"
				}
			
		];
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
