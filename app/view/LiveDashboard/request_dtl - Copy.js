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
Ext.define('CueTrans.view.LiveDashboard.request_dtl', 
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
		
		mainpage.screenName = "Request Details";	

		var formCtrl=[];
		plf.columns=1
		var loadListSummaryColumn = plf.addColumnSection({title:"", collapsed: false,"cls":""});			//69997
		
		var loadListSummaryFormCtrl=										//69997
		[
			plf.addHidden({"id":"selChartSeries"}),
			plf.addHidden({"id":"selChartValue"})
		]		
		loadListSummaryColumn.add(loadListSummaryFormCtrl);	
		
		var loadListSummaryObj=											//69997
		[			
			{columnname:"Request No",dataname:"REQUEST_NO",datatype:"string",width:200,popup:true,linkId:"requestnolink","tooltip":"Click here to launch the request screen."},			
			{columnname:"Request Date",dataname:"REQUEST_DATE",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:150},			
			{columnname:"Priority",dataname:"PRIORITY",datatype:"string",width:150},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:150},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
			{columnname:"Weight (tons)",dataname:"WEIGHT",datatype:"string",width:150},
			{columnname:"Volume (cu.m)",dataname:"VOLUME",datatype:"string",width:150}
		]
		var loadListSummaryGridDetail=									//69997
		{
			title:"",
			id:"RequestGrid",
			detail:loadListSummaryObj,
			visibleRow:10,
			removeAddDelete:true,
			removeFilter:true,
			readonly:true
			
		}
		var loadListSummaryGridSection = plf.addGrid(loadListSummaryGridDetail,this) //69997
				
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
