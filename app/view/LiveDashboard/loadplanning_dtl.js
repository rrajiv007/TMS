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
Ext.define('CueTrans.view.LiveDashboard.loadplanning_dtl', 
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
		
		mainpage.screenName = "Load Details";	

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
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:120,popup:true,linkId:"loadNoLink","tooltip":"Click here to launch the load screen."},						
			{columnname:"Ref Doc. No",dataname:"DO_NO",datatype:"string",width:100},
			{columnname:"Delivery Date/Time",dataname:"DELV_DATE",datatype:"string",width:130},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:130},			
			{columnname:"Commodity",dataname:"Commodity",datatype:"string",width:130},			
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:150},
			{columnname:"Vehicle Capacity",dataname:"VEHICLE_CAPACITY",datatype:"string",width:130},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:130},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:130},			
			{columnname:"Load Weight(ton)",dataname:"WEIGHT",datatype:"string",width:130,colAlign:'right',weightPrecision:3},
			{columnname:"Distance",dataname:"DISTANCE",datatype:"string",width:130,colAlign:'right'},
			{columnname:"Ton-Km",dataname:"TON_KM",datatype:"string",width:130,colAlign:'right'},
			{columnname:"Utilization %",dataname:"UTILIZATION",datatype:"string",width:130,colAlign:'right',weightPrecision:2}
					
		]
		var loadListSummaryGridDetail=							//69997
		{
			title:"",
			id:"LoadGrid",
			detail:loadListSummaryObj,
			visibleRow:10,
			removeAddDelete:true,
			removeFilter:true,
			readonly:true
			
		}
		var loadListSummaryGridSection = plf.addGrid(loadListSummaryGridDetail,this)			//69997
				
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
				"loadNoLink":
				{
					"dest":"tms.LoadBuilding",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"LOAD_NO","dest":"strLoadNo"}							
							]
				}
		}
		this.callParent(arguments);
	}
});