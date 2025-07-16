/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var  		                                   
************************************************************************************************/
Ext.define('CueTrans.view.Report.CalendarReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.screenName = "Calendar Report";
		mainpage.startPainting();
		
		mainpage.toolbarSectionFlag=true;
		//Calendar List Header Section Begins
		plf.columns=4
		var helpOncalendarHdrCollapse = plf.addCollapseSection({title:"",collapsed:false});	//69997
		
		var helpOncalendarFormCtrl=													//69997
		[
			plf.addText({"label":"Calendar Code From",id:"strCalendarCodeFrom"}),
		
			plf.addText({"label":"Calendar Code To",id:"strCalendarCodeTo"}),		
			plf.addText({"label":"Calendar Description",id:"strCalenderDesc"}),
		
			plf.addCombo({"label":"Calendar Status",id:"strStatus"}),
			plf.addBlank(),
			plf.addBlank(),
			plf.addButton({"label":"Print",id:"PrintReport"})
		]
		helpOncalendarHdrCollapse.add(helpOncalendarFormCtrl);
		
		mainpage.ptrMainSection.add(helpOncalendarHdrCollapse)//Add Header Section to Main Page
		
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitReportScreen"
			},
		{       
				"controlid":"PrintReport",
				"tasktype":"btnclick",
				"input":["strCalendarCodeFrom","strCalendarCodeTo","strCalenderDesc","strStatus"],
				"service":"CoreReportService",
				"methodName":"PrintCalendarMasterReport"
			}			
		];
		this.callParent(arguments);
		
	}
});
