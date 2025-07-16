/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRACK																                                         
Version		  :	1.0.0														                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
************************************************************************************************/
Ext.define('CueTrans.view.ivms.VehSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		//mainpage.hlpSectionFlag=true;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.25;
		mainpage.popupWidthRatio=.5;
		mainpage.startPainting();
		
		mainpage.screenName = "Vehicle/Trailer Search";	

		var formCtrl=[];
		plf.columns=2
		
		var VehSearchColumn = plf.addColumnSection({title:"", collapsed: false});		
		
		var VehSearchFormCtrl=
		[
			plf.addText({"label":"Vehicle No",id:"strVehCode"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Trailer No",id:"strTrailerNo"}),
			plf.addText({"label":"Driver",id:"strDriverCode"}),
			plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory"}),
			//plf.addCombo({"label":"Current Dept",id:"strAssignedDept"}),			
			plf.addButton({"label":"Search",id:"btnSearch",
			"handler": function() 
			{
						/*
						mainpage.queryById("methodName").setValue("getGISVehSearch");						
						process_ebpack_service(mainpage,["strVehCode","strStatus","strTrailerNo","strDriverCode","strVehicleCategory"],"TMSCoreTransportTS");
						mainpage.ownerCt.close();
						*/						
						mainpage.popupCloseWindow = true;						
			}
			})
		]
		
		VehSearchColumn.add(VehSearchFormCtrl)
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(VehSearchColumn)
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
			"methodName":"initGISVehSearch"
		},					
		{					
		"controlid":"btnSearch",
		"tasktype":"btnclick",
		"input":["strVehCode","strStatus","strTrailerNo","strDriverCode","strVehicleCategory"],
		"service":"TMSCoreTransportTS",
		"methodName":"getGISVehSearch"
		}
			
		];
			
		this.callParent(arguments);
		
	
	}
});
