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
1.0.2    Stefiie    		22/02/2016    70598                         ref doc no    
************************************************************************************************/
Ext.define('CueTrans.view.tms.LoadPlanningHelp', 
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
		
		mainpage.screenName = "Unassigned Shipment No";	

		var formCtrl=[];
		plf.columns=3
		var loadListSummaryColumn = plf.addColumnSection({title:"", collapsed: false});		
		
		var loadListSummaryFormCtrl=
		[
			plf.addCombo({"label":"Region Code From",id:"strOrigin"}),
			plf.addCombo({"label":"Region Code To",id:"strDestination"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity"}),	
			plf.addText({"label":"Shipment No From","id":"strShippmentNoFrom"}),
			plf.addText({"label":"Shipment No To","id":"strShippmentNoTo"}),
			plf.addCombo({"label":"Shipment Priority","id":"strPriority"}),
			plf.addDate({"label":"Delivery Date","id":"dtPickUpDateTime"}),
			plf.addText({"label":"Request No","id":"strRequestNo"}),
            plf.addText({"label":"Ref Doc No",id:"strDocNo","anywhereSearch":"true"}),		//70598 changes	
			plf.addButton({"label":"Search",id:"btnSearch",
			"handler": function() 
			{
						mainpage.queryById("methodName").setValue("fetchLoadShipSearchTS");						
						process_ebpack_service(mainpage,["strOrigin","strDestination","strCommodity","dtPickUpDateTime","strRequestNo","strShippmentNoFrom","strShippmentNoTo","strPriority","strDocNo"],"TMSCoreTransportTS");
						mainpage.ownerCt.close()
			}
			})
		]
		
		loadListSummaryColumn.add(loadListSummaryFormCtrl);
		
		/*
		loadListSummaryObj=
		[
			{columnname:"Shipment No",dataname:"UN_SHIPMENT_NO",datatype:"string",width:200},				
			{columnname:"Origin",dataname:"UN_ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"UN_DESTINATION",datatype:"string",width:150},
			{columnname:"Priority",dataname:"UN_PRIORITY",datatype:"string",width:150},
			{columnname:"Commodity",dataname:"UN_COMMODITY",datatype:"string",width:150},				
			{columnname:"Weight (tons)",dataname:"UN_WEIGHT",datatype:"string",width:150},
			{columnname:"Volume (cu.m)",dataname:"UN_VOLUME",datatype:"string",width:150}
		]
		loadListSummaryGridDetail=
		{
			title:"",
			id:"LoadSummaryGrid",
			detail:loadListSummaryObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
			
		}
		loadListSummaryGridSection = plf.addGrid(loadListSummaryGridDetail,this)
		*/		
		//mainpage.hlpSearchGridPtr = loadListSummaryGridSection
		
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
			"service":"TMSCoreTransportTS",
			"methodName":"initLoadShipSearchTS"
		},			
		/*{					
		"controlid":"btnSearch",
		"tasktype":"btnclick",
		"input":["strOrigin","strDestination","strCommodity","dtPickUpDateTime","strRequestNo","strShippmentNoFrom","strShippmentNoTo","strPriority"],
		"service":"TMSCoreTransportTS",
		"methodName":"fetchLoadShipSearchTS"
		}	*/
		];
			
		this.callParent(arguments);
		
	
	}
});
