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
Ext.define('CueTrans.view.peoplelogistics.UnAssignedTransportReq', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		//mainpage.hlpSectionFlag=true;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.2;
		//mainpage.popupWidthRatio=.5;
		mainpage.startPainting();
		
		mainpage.screenName = "Unassigned Transport Request";	

		var formCtrl=[];
		plf.columns=3
		var planListSummaryColumn = plf.addColumnSection({title:"", collapsed: false});		
		
		var PlanListSummaryFormCtrl=
		[
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),			
			plf.addText({"label":"Transport Req No","id":"strTranRequestNo","anywhereSearch":"true"}),			
			//plf.addDate({"label":"Travel Date","id":"dtTravelDate"}),						
			plf.addButton({"label":"Search",id:"btnSearch",
			"handler": function() 
			{
						//mainpage.queryById("methodName").setValue("fetchLoadShipSearchTS");						
						//process_ebpack_service(mainpage,["strOrigin","strDestination","strTransportReqNo","dtPickUpDateTime"],"TMSCoreTransportTS");
						mainpage.ownerCt.close()
			}
			})
		]
		
		planListSummaryColumn.add(PlanListSummaryFormCtrl);
		
		
		//adding the field control to the mainpage
		mainpage.ptrMainSection.add(planListSummaryColumn)
		
		
	    //History Data Section
		mainpage.dataHistorySectionFlag=false;	
	
		mainpage.eventHandlers = 
		[	
		{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"PPLCoreTS",
				"methodName":"initTplanReqSearchTS"
			},	
		{		
			"controlid":"btnSearch",
			"tasktype":"btnclick",
			"input":["strTranRequestNo","strOrigin","strDestination"], 
			"service":"PPLCoreTS", 
			"methodName":"fetchTplanReqSearchTS"
		 }
		];
			
		this.callParent(arguments);
		
	
	}
});
