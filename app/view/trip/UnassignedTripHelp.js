/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
<<<<<<< .mine
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var	
1.0.2    Shekar				17/11/2016	  74687                                
||||||| .r8164
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var		 
1.0.2    Shekar             17/11/2016    74583                                  
=======
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var	
1.0.2    Shekar             17/10/2016    74583                                
1.0.3    Shekar				17/11/2016	  74687   
>>>>>>> .r8341
************************************************************************************************/
Ext.define('CueTrans.view.trip.UnassignedTripHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		//mainpage.hlpSectionFlag=true;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.3;
		//mainpage.popupWidthRatio=.5;
		mainpage.startPainting();
		
		mainpage.screenName = "Filter Trips";	

		var formCtrl=[];
		plf.columns=3
		var UnAllocTripSummaryColumn = plf.addColumnSection({title:"", collapsed: false});		//69997
		
		var UnAllocTripSummaryFormCtrl=														//69997
		[
			plf.addText({"label":"Trip No",id:"strTripNo","anywhereSearch":"true"}),
			plf.addDate({"label":"Trip Sheet Date",id:"dtTripDate","anywhereSearch":"true"}),
			plf.addText({"label":"Reported Vehicle",id:"strRepVehicleCode"}),
			plf.addText({"label":"Scheduled Vehicle",id:"strVehNo","anywhereSearch":"true"}),
			plf.addText({"label":"Latest Load",id:"strLoadNo"}),
			plf.addText({"label":"Latest Journey",id:"strReqNo"}),
            plf.addCombo({"label":"From Location",id:"strOrigin","anywhereSearch":"true"}),
			plf.addCombo({"label":"To Location",id:"strDestination","anywhereSearch":"true"}),
			
			plf.addHidden({"label":"Departure Date",id:"dtDepDtFrom"}),
			plf.addHidden({"label":"Vehicle Category",id:"strVehCat"}),	
		    plf.addHidden({"label":"Trip Radius",id:"strTripRadius"}),	
			plf.addHidden({"label":"Carrier Code",id:"strCarrier","anywhereSearch":"true"}),
			plf.addHidden({"label":"Carrier Type",id:"strCarrierType"}),
			plf.addHidden({"label":"Region From",id:"strRegionFrom"}),
			plf.addHidden({"label":"Region To",id:"strRegionTo"}),
			plf.addHidden({"label":"Vehicle No",id:"strVehNo","anywhereSearch":"true"}),
			
			plf.addBlank(),			
			plf.addButton({"label":"Search",id:"btnSearch",
			"handler": function() 
			{
						mainpage.queryById("methodName").setValue("SEARCHVSCHUnAllocateTripTS");						
						process_ebpack_service(mainpage,["strVehCat","strTripNo","strCarrier","strCarrierType","dtTripDate",
							"strRegionFrom","strRegionTo","strOrigin","strDestination","dtDepDtFrom","strVehNo","strLoadNo","strReqNo","strRepVehicleCode"],"VEHSCHCoreVehSchServiceTS");
						mainpage.ownerCt.close()
			}
			})
		]
		
		UnAllocTripSummaryColumn.add(UnAllocTripSummaryFormCtrl);	
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(UnAllocTripSummaryColumn)
		//mainpage.ptrMainSection.add(UnAllocTripSummaryGridSection) 
		
	    //History Data Section
		mainpage.dataHistorySectionFlag=false;	
	
		mainpage.eventHandlers = 
		[	
		{
			"controlid":"",
			"tasktype":"onload",
			"input":[""],
			"service":"VEHSCHCoreVehSchServiceTS",
			"methodName":"initVSCHunAllocateTripTS"
		}
		];
			
		this.callParent(arguments);
		
	
	}
});
