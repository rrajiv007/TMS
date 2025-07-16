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
Ext.define('CueTrans.view.CommonPatchUpdate.OriginDestinationChangeSeparateScreen', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		//mainpage.popupSectionFlag=true;
		//mainpage.popupHeightRatio=.30;
		//mainpage.popupWidthRatio=.7;	
		mainpage.toolbarSectionFlag=true;
		mainpage.startPainting();
		
		mainpage.screenName = "Load Origin & Destination Change";
		
	
		mainpage.liveScreenFlag=true;
		//mainpage.toolbarSectionFlag=true;
		//Add the header portion
		plf.columns=3
		var LoadBasedSummaryColumn = plf.addColumnSection({title:"", collapsed: true});
		
		
		var LoadBasedSummaryFormCtrl=
		[
			plf.addText({"label":"Load No","id":"strLoadNo","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			plf.addCombo({"label":"Origin",id:"strOrigin","mandatory":"true"}),  
			plf.addComboWithoutStore({"label":"Destination",id:"strDestination",storeId:"strOrigin"})
			//plf.addCombo({"label":"Destination",id:"strDestination","mandatory":"true"})
		]
		
		 LoadBasedSummaryColumn.add(LoadBasedSummaryFormCtrl);
		 
		var amendDetails = plf.addColumnSection({title:"Amend Reason"})
		
		var amendDetailsCtrl=
		[   
		     plf.addText({"label":"Amend Reason",id:"strAmendRsn","mandatory":"true"}) ,
             plf.addButton({"label":"Update","id":"OriginDest",tooltip:"Click here to change origin & destination."})			 
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
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"patchinitLoadTS"
		       },
			   {
					"controlid":"strLoadNo",
					"tasktype":"onenter",
					"input":["strLoadNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"OnEnterLoadForPatchUpd"
				},
				{
					"controlid":"OriginDest",
					"tasktype":"btnclick",
					"input":["strLoadNo","strStatus","strAmendRsn","strOrigin","strDestination"],
					"service":"TMSCoreTransportTS",
					"methodName":"patchOriginDestChange" 
				}
			]
		this.callParent(arguments);
		
	
	}
});