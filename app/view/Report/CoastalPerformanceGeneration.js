/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :CUTRANS
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.Report.CoastalPerformanceGeneration', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();		
		mainpage.screenName = "Coastal Performance Generation";		
		
		plf.columns=5
		mainpage.toolbarSectionFlag=false;		
		var ReportsColumn = plf.addColumnSection({});	
		
		var ReportsFormCtrl=							
		[	
			plf.addCombo({"label":"Month","id":"strDateType"}),
			plf.addButton({"label":"Process","id":"btnProcess"})			
		]
		
		ReportsColumn.add(ReportsFormCtrl);	
			
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		
		
		
		mainpage.eventHandlers = 
		[	
			{		 
				"controlid":"btnProcess",
				"tasktype":"btnclick",
				"input":["strDateType"],
				"service":"TMSCoreTransportTS", 
				"methodName":"ProcessCoastalPerfGenTS"							
			},
			{ 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitProcessCoastalPerfGenTS"
			}			
					
		];	
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
