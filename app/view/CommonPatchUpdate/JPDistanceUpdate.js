/************************************************************************************************
					  Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
                         
************************************************************************************************/
Ext.define('CueTrans.view.CommonPatchUpdate.JPDistanceUpdate', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.43;
		mainpage.popupWidthRatio=.7;	
		mainpage.startPainting();
		
		mainpage.screenName = "Update Journey Plan Distance";
		
	
		mainpage.liveScreenFlag=true;
		mainpage.toolbarSectionFlag=true;
		//Add the header portion
		plf.columns=3
		var LoadBasedSummaryColumn = plf.addColumnSection({title:"", collapsed: true});
		
		
		var LoadBasedSummaryFormCtrl=
		[
			plf.addText({"label":"Journey Plan No","id":"strJourneyPlanNo","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Journey Plan Date",id:"dtJourneyPlanDate"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addDisplayOnly({"label":"Load No","id":"strLoadNo"}),
			plf.addDisplayOnly({"label":"Load Origin",id:"strLoadOrigin"}),
            plf.addDisplayOnly({"label":"Load Destination",id:"strLoadDestination"}),			
            
			plf.addDisplayOnly({"label":"Loading Point","id":"strLoadAt"}),
			plf.addDisplayOnly({"label":"Unloading Point","id":"strDeliveryAt"}),
			plf.addText({"label":"JP Distance",id:"strJPDistance",inputFormat:'numeric',"mandatory":"true",weightPrecision:2})
			
		]
		
		 LoadBasedSummaryColumn.add(LoadBasedSummaryFormCtrl);
		 
		var amendDetails = plf.addColumnSection({title:"Amend Reason"})
		
		var amendDetailsCtrl=
		[   
		     plf.addText({"label":"Amend Reason",id:"strReason","mandatory":"true"}) ,
             plf.addButton({"label":"Update","id":"JPDisUpd",tooltip:"Click here to update journey plan distance."})			 
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
					"controlid":"strJourneyPlanNo",
					"tasktype":"onenter",
					"input":["strJourneyPlanNo"],
					"service":"CoreJourneyPlanService",
					"methodName":"patchonenterjpdistance"
				},
				{
					"controlid":"JPDisUpd",
					"tasktype":"btnclick",
					"input":["strJourneyPlanNo","strReason","strJPDistance"],
					"service":"CoreJourneyPlanService",
					//"service":"TMSCoreTransportTS",
					"methodName":"patchjpdistupdate"
				}
			]
		this.callParent(arguments);
		
	
	}
});