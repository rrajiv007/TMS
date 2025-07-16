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
Ext.define('CueTrans.view.trip.UnassignedLoadsHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		//mainpage.hlpSectionFlag=true;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.3;		
		mainpage.startPainting();
		mainpage.screenName = "Unassigned Loads";	

		var formCtrl=[];
		plf.columns=3
		var loadListSummaryColumn = plf.addColumnSection({title:"", collapsed: false});		//69997
		
		var loadListSummaryFormCtrl=														//69997
		[
			plf.addText({"label":"Load No",id:"strLoadNoFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Load No To",id:"strLoadNoTo","anywhereSearch":"true"}),
			plf.addCombo({"label":"Vehicle Category","id":"strVehCat"}),
			
			plf.addDateTime({"label":"Departure Date/Time From",dateid:"dtDepDateFrom",timeid:"tmDepTimeFrom"}),
			plf.addDateTime({"label":"Departure Date/Time To",dateid:"dtDepDateTo",timeid:"tmDepTimeTo"}),
			plf.addCombo({"label":"Commodity","id":"strCommodity"}),
			
			//plf.addCombo({"label":"Priority","id":"strPriority"}),
			plf.addCombo({"label":"Region From","id":"strRegionFrom"}),
			plf.addCombo({"label":"Region To","id":"strRegionTo"}),
			
			plf.addCombo({"label":"Origin","id":"strOrigin"}),
			plf.addCombo({"label":"Destination","id":"strDestination"}),
			
			plf.addButton({"label":"Search",id:"btnSearch",
			"handler": function() 
			{
						mainpage.queryById("methodName").setValue("fetchAllUnassLoadsTS");						
						process_ebpack_service(mainpage,["strLoadNoFrom","strVehCat","strCommodity","strOrigin",
														 "strRegionFrom","strRegionTo","dtDepDateFrom","tmDepTimeFrom",
														 "dtDepDateTo","tmDepTimeTo","strDestination"]
														 ,"TRPLISTCoreTripListTS");
						mainpage.ownerCt.close()
			}
			})
		]
		
		loadListSummaryColumn.add(loadListSummaryFormCtrl);
		
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(loadListSummaryColumn)
		//mainpage.ptrMainSection.add(loadListSummaryGridSection) 
		
	    //History Data Section
		mainpage.dataHistorySectionFlag=false;	
	
		mainpage.eventHandlers = 
		[	
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TRPLISTCoreTripListTS",
				"methodName":"initUnassignedLoadsTS"
			}		
		
		];
			
		this.callParent(arguments);
		
	
	}
});
