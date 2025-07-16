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
Ext.define('CueTrans.view.tms.shipment_itemdtl', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		//mainpage.hlpSectionFlag=true;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.5;
		mainpage.popupWidthRatio=.58;
		mainpage.startPainting();
		
		mainpage.screenName = "Shipment Item Details";	

		var formCtrl=[];
		plf.columns=1
		var loadListSummaryColumn = plf.addColumnSection({title:"", collapsed: false,"cls":""});
		
		var loadListSummaryFormCtrl=
		[
			plf.addHidden({"id":"selChartSeries"}),
			plf.addHidden({"id":"selChartValue"})
		]		
		loadListSummaryColumn.add(loadListSummaryFormCtrl);	
		
		var loadListSummaryObj=
		[			
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",width:150},			
			{columnname:"Item Description",dataname:"ITEM_DESC",datatype:"string",width:150},						
			{columnname:"Qty",dataname:"QTY",datatype:"string",width:150},
			{columnname:"Weight (tons)",dataname:"WEIGHT",datatype:"string",width:150},
			{columnname:"Volume (cu.m)",dataname:"VOLUME",datatype:"string",width:150}
					
		]
		loadListSummaryGridDetail=
		{
			title:"",
			id:"ShipmentItemGrid",
			detail:loadListSummaryObj,
			visibleRow:10,
			removeAddDelete:true,
			removeTbar:true,
			readonly:true
			
		}
		var loadListSummaryGridSection = plf.addGrid(loadListSummaryGridDetail,this)
				
		//mainpage.hlpSearchGridPtr = loadListSummaryGridSection
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(loadListSummaryColumn)
		mainpage.ptrMainSection.add(loadListSummaryGridSection) 
		
	    //History Data Section
		mainpage.dataHistorySectionFlag=false;	
	
		mainpage.eventHandlers = 
		[	
		{
			"controlid":"",
			"tasktype":"onload",
			"input":["iUID","selChartSeries","selChartValue"],
			"service":"TMSCoreTransportTS",
			"methodName":"initLoadShipItemSearchTS"
		}	
		];		
		this.callParent(arguments);
	}
});