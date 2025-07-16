/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
                         
************************************************************************************************/
Ext.define('CueTrans.view.CommonPatchUpdate.JPStatusChange', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.30;
		mainpage.popupWidthRatio=.7;	
		mainpage.startPainting();
		
		mainpage.screenName = "Reverse Journey Plan Status";
		
	
		mainpage.liveScreenFlag=true;
		mainpage.toolbarSectionFlag=true;
		//Add the header portion
		plf.columns=3
		var LoadBasedSummaryColumn = plf.addColumnSection({title:"", collapsed: true});
		
		
		var LoadBasedSummaryFormCtrl=
		[
			plf.addText({"label":"Journey Plan No","id":"strJourneyPlanNo","mandatory":"true"}),
			plf.addCombo({"label":"Status","id":"strStatus","mandatory":"true"})
			
		]
		
		 LoadBasedSummaryColumn.add(LoadBasedSummaryFormCtrl);
		 
		var amendDetails = plf.addColumnSection({title:"Amend Reason"})
		
		var amendDetailsCtrl=
		[   
		     plf.addText({"label":"Amend Reason",id:"strReason","mandatory":"true"}) ,
             plf.addButton({"label":"Reverse JP Status","id":"JPStatusChn",tooltip:"Click here to Reverse journey plan status."})			 
		]
		
		amendDetails.add(amendDetailsCtrl);
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(LoadBasedSummaryColumn)
		mainpage.ptrMainSection.add(amendDetails) 
		
		
		
		//History Data Section
		//mainpage.dataHistorySectionFlag=false;
		mainpage.screenLinks=
		{
			
		}	
		
		mainpage.hlpLinks=
		{
		}
		
		mainpage.eventHandlers = 
			[
				   {
					"controlid":"",
					"tasktype":"onload",
					"input":["strJourneyPlanNo"],
					"service":"CoreJourneyPlanService",
					"methodName":"initPatchJpStatus"
				},
			   {
					"controlid":"strJourneyPlanNo",
					"tasktype":"onenter",
					"input":["strJourneyPlanNo"],
					"service":"CoreJourneyPlanService",
					"methodName":"patchonenterjpstatus"
				},
				{
					"controlid":"JPStatusChn",
					"tasktype":"btnclick",
					"input":["strJourneyPlanNo","strStatus","strReason"],
					"service":"CoreJourneyPlanService",
					//"service":"TMSCoreTransportTS",
					"methodName":"patchjpstatuschange"
				}
			]
		this.callParent(arguments);
		
	
	}
});