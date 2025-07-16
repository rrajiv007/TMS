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
Ext.define('CueTrans.view.PDOFinance.TripHelp', 
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
		var UnAllocTripSummaryColumn = plf.addColumnSection({title:"", collapsed: false},this);		//69997
		
		var UnAllocTripSummaryFormCtrl=														//69997
		[
			plf.addHidden({"label":"Carrier Bill No",id:"strBillNo"}),
			plf.addCombo({"label":"Load Type",id:"strLoadType"}),
			plf.addCombo({"label":"Load Category",id:"strLoadCat"}),
			plf.addCombo({"label":"From Region",id:"strFromRegion"}),
			plf.addCombo({"label":"To Region",id:"strToRegion"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Loading Point",id:"strLoadingPt"}),
            plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addCombo({"label":"Unloading Point",id:"strULoadingPt"}),
			
					
			plf.addBlank(),			
			plf.addButton({"label":"Search",id:"btnSearch",
			"handler": function() 
			{
						mainpage.queryById("methodName").setValue("PDOFETCHCARSTRIPHLPTS");						
						process_ebpack_service(mainpage,["strBillNo","strLoadType","strLoadCat","strFromRegion","strToRegion","strOrigin",
							"strLoadingPt","strDestination","strULoadingPt"],"FINCoreFinanceServiceTS");
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
			"input":["strBillNo"],
			"service":"FINCoreFinanceServiceTS",
			"methodName":"PDOINITCARSTRIPHLPTS"
		}
		
		];
			
		this.callParent(arguments);
		
	
	}
});
