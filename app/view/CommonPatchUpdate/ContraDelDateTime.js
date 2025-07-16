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
Ext.define('CueTrans.view.CommonPatchUpdate.ContraDelDateTime', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.30;
		mainpage.popupWidthRatio=.7;	
		mainpage.startPainting();
		
		mainpage.screenName = "Load Contractual Delivery Date and Time Change";
		
	
		mainpage.liveScreenFlag=true;
		mainpage.toolbarSectionFlag=true;
		//Add the header portion
		plf.columns=3
		var LoadBasedSummaryColumn = plf.addColumnSection({title:"", collapsed: true});
		
		
		var LoadBasedSummaryFormCtrl=
		[
			plf.addText({"label":"Load No","id":"strLoadNo","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			plf.addDateTime({"label":"Contractual Delivery Date/Time",dateid:"dtRosDateTime",timeid:"tmROSTime","mandatory":"true"})
		]
		
		 LoadBasedSummaryColumn.add(LoadBasedSummaryFormCtrl);
		 
		var amendDetails = plf.addColumnSection({title:"Amend Reason"})
		
		var amendDetailsCtrl=
		[   
		     plf.addText({"label":"Amend Reason",id:"strAmendRsn","mandatory":"true"}) ,
             plf.addButton({"label":"Update","id":"ContDelDateTm",tooltip:"Click here to change load contractual delivery date and time."})			 
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
					"controlid":"strLoadNo",
					"tasktype":"onenter",
					"input":["strLoadNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"OnEnterLoadForPatchUpd"
				},
				{
					"controlid":"ContDelDateTm",
					"tasktype":"btnclick",
					"input":["strLoadNo","strStatus","dtRosDateTime","strAmendRsn","tmROSTime"],
					"service":"TMSCoreTransportTS",
					"methodName":"patchContraDelDateTime"
				}
			]
		this.callParent(arguments);
		
	
	}
});