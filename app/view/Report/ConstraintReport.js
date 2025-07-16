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
Ext.define('CueTrans.view.Report.ConstraintReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.screenName = "Constraint Report";
		mainpage.startPainting();
		
		mainpage.toolbarSectionFlag=true;
		//Constraint List Header Section Begins
		plf.columns=4
		var helpOncalendarHdrCollapse = plf.addCollapseSection({title:"",collapsed:false});	//69997
		
		var helpOncalendarFormCtrl=							//69997
		[
			plf.addText({"label":"Constraint Code From",id:"strConstraintCodeFrom"}),
			plf.addText({"label":"Constraint Code To",id:"strConstraintCodeTo"}),
			plf.addText({"label":"Constraint Description",id:"strConstraintDesc"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
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
				"input":["strConstraintCodeFrom","strConstraintCodeTo","strConstraintDesc","strStatus"],
				"service":"CoreReportService",
				"methodName":"PrintConstraintMasterReport"
			}			
		];
		this.callParent(arguments);
		
	}
});
