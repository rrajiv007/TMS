Ext.define('CueTrans.view.LiveDashboard.segcostutil', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		//mainpage.hlpSectionFlag=true;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.54;
		mainpage.popupWidthRatio=.5;
		mainpage.startPainting();
		
		mainpage.screenName = "Cost Utilization";	

		var formCtrl=[];
		plf.columns=1
		var AssetUtilSummaryColumn = plf.addColumnSection({title:"", collapsed: false,"cls":""});
		
		var AssetUtilSummaryFormCtrl=
		[
			plf.addHidden({"id":"selChartSeries"}),
			plf.addHidden({"id":"selChartValue"})
		]		
		AssetUtilSummaryColumn.add(AssetUtilSummaryFormCtrl);	
		
		var AssetUtilSummaryObj=
		[			
			
			{columnname:"Vehicle No",dataname:"TRUCK_CODE",datatype:"string",width:100},
			{columnname:"Asset Type",dataname:"TRUCK_CATEGORY",datatype:"string",width:120},
			{columnname:"Vehicle Regn No",dataname:"TRUCK_REG_NO",datatype:"string",width:130},
			{columnname:"Carrier",dataname:"CARRIER_CODE",datatype:"string",width:120},			
			/*{columnname:"Effective From",dataname:"EFF_FROM",datatype:"string",width:120},
			{columnname:"Effective To",dataname:"EFF_TO",datatype:"string",width:115},
			{columnname:"Contract Days",dataname:"CONT_DAYS",datatype:"string",width:110,colAlign:'right'},
			{columnname:"Contract Cost",dataname:"CONT_COST",datatype:"string",width:110,colAlign:'right'},	*/		
			{columnname:"Utilized Cost",dataname:"UTIL_COST",datatype:"string",width:110,colAlign:'right'}			
		]
		var AssetUtilSummaryGridDetail=
		{
			title:"",
			id:"costutilGrid",
			detail:AssetUtilSummaryObj,
			visibleRow:10,
			removeAddDelete:true,
			removeFilter:true,
			readonly:true,
			widthBasis:"flex"
		}
		var AssetUtilSummaryGridSection = plf.addGrid(AssetUtilSummaryGridDetail,this)
				
		//mainpage.hlpSearchGridPtr = loadListSummaryGridSection
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(AssetUtilSummaryColumn)
		mainpage.ptrMainSection.add(AssetUtilSummaryGridSection) 
		
	    //History Data Section
		mainpage.dataHistorySectionFlag=false;	
	
		mainpage.eventHandlers = 
		[	
		{
			"controlid":"",
			"tasktype":"onload",
			"input":["iUID","selChartSeries","selChartValue"],
			"service":"TMSCoreTransportTS",
			"methodName":"initsearchassetutilCatTS"
		}	
		];	
		mainpage.gridPopupLinks=
		{
			"db_loaddtl":
			{
				"dest":"LiveDashboard.LoadBuildingSummary",
				"popMethodName":"initsearchassetutilLoadTS",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"TRUCK_CODE","dest":"selChartSeries"}
						]
			}
		}	
		this.callParent(arguments);
	}
});