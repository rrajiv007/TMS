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
Ext.define('CueTrans.view.peoplelogistics.UnAssignedShuttleReq', 
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
		
		mainpage.screenName = "Unassigned Shuttle Request";	

		var formCtrl=[];
		plf.columns=3
		var planListSummaryColumn = plf.addColumnSection({title:"", collapsed: false});		
		
		var PlanListSummaryFormCtrl=
		[
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),			
			plf.addText({"label":"Shuttle Req No","id":"strShuttleReqNo","anywhereSearch":"true"}),			
			plf.addDate({"label":"Delivery Date","id":"dtPickUpDateTime"}),						
			plf.addButton({"label":"Search",id:"btnSearch",
			"handler": function() 
			{
						//mainpage.queryById("methodName").setValue("fetchLoadShipSearchTS");						
						//process_ebpack_service(mainpage,["strOrigin","strDestination","strShuttleReqNo","dtPickUpDateTime"],"TMSCoreShuttleTS");
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
			
		}
		];
			
		this.callParent(arguments);
		
	
	}
});
