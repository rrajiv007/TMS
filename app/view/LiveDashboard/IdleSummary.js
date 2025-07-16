Ext.define('CueTrans.view.LiveDashboard.IdleSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		
		mainpage.screenName = "Idle/Standby Summary";
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.58;
		mainpage.popupWidthRatio=.7;
		mainpage.startPainting();

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
			{columnname:"Date",dataname:"UTIL_DATE",datatype:"string",width:90},
			/*{columnname:"Vehicle No",dataname:"VEHICLE",datatype:"string",width:100},*/
			{columnname:"Vehicle Reg No",dataname:"VEHICLE_REG_NO",datatype:"string",width:100},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:100},
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:120}	   ,
			{columnname:"Base Location",dataname:"BASE_LOC",datatype:"string",width:120}	   ,
			{columnname:"Dest Location",dataname:"DEST_LOC",datatype:"string",width:120}	   
			/*{columnname:"Logistics Group",dataname:"LOG_GRP",datatype:"string",width:120}*/			
		]
		var loadListSummaryGridDetail=
		{
			title:"",
			id:"IdleSummaryGrid",
			detail:loadListSummaryObj,
			visibleRow:10,
			removeAddDelete:true,
			removeFilter:true,
			readonly:true,
			widthBasis:"flex"
			
		}
		var loadListSummaryGridSection = plf.addGrid(loadListSummaryGridDetail,this)	
		
		//adding the User Master field control to the mainpage	
	
		mainpage.ptrMainSection.add(loadListSummaryColumn) 
		mainpage.ptrMainSection.add(loadListSummaryGridSection) 
		
		//History Data Section
		//mainpage.dataHistorySectionFlag=false;
		
		
		
		mainpage.eventHandlers = 
			[	
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["iUID","selChartSeries","selChartValue"],
				"service":"TMSCoreTransportTS",
				"methodName":"initsearchassetutilIdleTS"
			}
			];			
		this.callParent(arguments);
		
	
	}
});
