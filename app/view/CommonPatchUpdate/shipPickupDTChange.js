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
Ext.define('CueTrans.view.CommonPatchUpdate.shipPickupDTChange', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.30;
		mainpage.popupWidthRatio=.7;	
		mainpage.startPainting();
		
		mainpage.screenName = "Shipment Pickup Date/Time Change";
		
	
		mainpage.liveScreenFlag=true;
		mainpage.toolbarSectionFlag=true;
		//Add the header portion
		plf.columns=3
		var LoadBasedSummaryColumn = plf.addColumnSection({title:"", collapsed: true});
		
		
		var LoadBasedSummaryFormCtrl=
		[
			plf.addText({"label":"Shipment No","id":"strShippmentNo","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			plf.addDateTime({"label":"Pickup Date/Time",dateid:"dtPickUpDateTime",timeid:"tmPickUpTime","mandatory":"true"})
			
		]
		
		 LoadBasedSummaryColumn.add(LoadBasedSummaryFormCtrl);
		 
		var amendDetails = plf.addColumnSection({title:"Amend Reason"})
		
		var amendDetailsCtrl=
		[   
		     plf.addText({"label":"Amend Reason",id:"strAmendRsn","mandatory":"true"}) ,
             plf.addButton({"label":"Update","id":"shipPickupDateTm",tooltip:"Click here to change shipment pickup date and time."})			 
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
					"controlid":"strShippmentNo",
					"tasktype":"onenter",
					"input":["strShippmentNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"OnEnterShipForPatchUpd"
				},
				{
					"controlid":"shipPickupDateTm",
					"tasktype":"btnclick",
					"input":["strShippmentNo","strStatus","dtPickUpDateTime","strAmendRsn","tmPickUpTime"],
					"service":"TMSCoreTransportTS",
					"methodName":"PatchShipPickUpChange"
				}
			]
		this.callParent(arguments);
		
	
	}
});