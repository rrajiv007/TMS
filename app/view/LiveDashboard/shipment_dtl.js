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
Ext.define('CueTrans.view.LiveDashboard.shipment_dtl', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		//mainpage.hlpSectionFlag=true;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.58;
		mainpage.popupWidthRatio=.7;
		mainpage.startPainting();
		
		mainpage.screenName = "Shipment Details";	

		var formCtrl=[];
		plf.columns=1
		var loadListSummaryColumn = plf.addColumnSection({title:"", collapsed: false,"cls":""});	//69997
		
		var loadListSummaryFormCtrl=								//69997
		[
			plf.addHidden({"id":"selChartSeries"}),
			plf.addHidden({"id":"selChartValue"})
		]		
		loadListSummaryColumn.add(loadListSummaryFormCtrl);	
		
		var loadListSummaryObj=									//69997
		[			
			{columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",width:200,popup:true,linkId:"shipmentNoLink","tooltip":"Click here to launch the shipment screen."},			
			{columnname:"Request No",dataname:"REQUEST_NO",datatype:"string",width:150,popup:true,linkId:"requestnolink","tooltip":"Click here to launch the request screen."},
			{columnname:"Ref Doc. No",dataname:"DO_NO",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:150},			
			{columnname:"Priority",dataname:"PRIORITY",datatype:"string",width:150},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:150},	
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
			{columnname:"Weight (ton)",dataname:"WEIGHT",datatype:"string",width:150,colAlign:'right',weightPrecision:3},
			{columnname:"Distance",dataname:"DISTANCE",datatype:"string",width:150,colAlign:'right'},
			{columnname:"Ton-Km",dataname:"TON_KM",datatype:"string",width:150,colAlign:'right'},
			{columnname:"Volume (cu.m)",dataname:"VOLUME",datatype:"string",width:150,colAlign:'right',weightPrecision:3}
					
		]
		var loadListSummaryGridDetail=								//69997
		{	
			title:"",
			id:"ShipmentGrid",
			detail:loadListSummaryObj,
			visibleRow:10,
			removeAddDelete:true,
			removeFilter:true,
			readonly:true			
		}
		var loadListSummaryGridSection = plf.addGrid(loadListSummaryGridDetail,this)		//69997
				
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
			"methodName":"initLoadShipSearchTS"
		}	
		];
		mainpage.screenLinks=
		{
				"shipmentNoLink":
				{
					"dest":"tms.ShipmentSplit",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"SHIPMENT_NO","dest":"strShippmentNo"},
							{"src":"REQUEST_NO","dest":"strRequestNo"}
							]
				},
				"requestnolink":
				{
					"dest":"tms.TransRequestItemBased",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"REQUEST_NO","dest":"strRequestNo"}
							]
				}
		}
		this.callParent(arguments);
	}
});