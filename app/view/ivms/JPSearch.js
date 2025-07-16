/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRACK																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var 
1.0.2    Stefiie    		22/02/2016    70598                         ref doc no    
************************************************************************************************/
Ext.define('CueTrans.view.ivms.JPSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		//mainpage.hlpSectionFlag=true;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.32;
		mainpage.popupWidthRatio=.5;
		mainpage.startPainting();
		
		mainpage.screenName = "Journey Plan Search";	

		var formCtrl=[];
		plf.columns=2
		
		var JPSearchColumn = plf.addColumnSection({title:"", collapsed: false});		
		
		var JPSearchFormCtrl=
		[
			plf.addText({"label":"Journey Plan No",id:"strJourneyPlanNo"}),
			plf.addText({"label":"Vehicle No",id:"strVehCode"}),
			plf.addText({"label":"Trailer No",id:"strTrailerNo"}),
			plf.addText({"label":"Driver",id:"strDriverCode"}),
			plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Customer Code",id:"strCustomerCode"}),
			plf.addText({"label":"Journey Mgr Code",id:"strJourneyMgrCode"}),
			//plf.addText({"label":"Item",id:"strItemCode"}),
			
			plf.addButton({"label":"Search",id:"btnSearch",
			"handler": function() 
			{
						mainpage.queryById("methodName").setValue("getGISJPSearch");						
						process_ebpack_service(mainpage,["strJourneyPlanNo","strVehCode","strTrailerNo","strDriverCode",
														 "strVehicleCategory","strStatus","strCustomerCode","strJourneyMgrCode",
															"strItemCode"],"TMSCoreTransportTS");
						mainpage.ownerCt.close()
			}
			})
		]
		
		JPSearchColumn.add(JPSearchFormCtrl);
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(JPSearchColumn)
		//mainpage.ptrMainSection.add(loadListSummaryGridSection) 
		
	    //History Data Section
		mainpage.dataHistorySectionFlag=false;	
	
		mainpage.eventHandlers = 
		[	
			
		{
			"controlid":"",
			"tasktype":"onload",
			"input":[""],
			"service":"TMSCoreTransportTS",
			"methodName":"initGISJPSearch"
		}/*,			
		{					
		"controlid":"btnSearch",
		"tasktype":"btnclick",
		"input":["strFirstName","strRole","strExchange","strZone"],
		"service":"GISCoreTS",
		"methodName":"getGISJPSearch"
		}
		*/	
		];
			
		this.callParent(arguments);
		
	
	}
});
