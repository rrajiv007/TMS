Ext.define('CueTrans.view.LiveDashboard.journey_dtl', 
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
		
		mainpage.screenName = "Journey Details";	

		var formCtrl=[];
		plf.columns=1
		var JPSummaryColumn = plf.addColumnSection({title:"", collapsed: false,"cls":""});
		
		var JPSummaryFormCtrl=
		[
			plf.addHidden({"id":"selChartSeries"}),
			plf.addHidden({"id":"selChartValue"})
		]		
		JPSummaryColumn.add(JPSummaryFormCtrl);	
		
		var JPSummaryObj=
		[			
			{columnname:"Journey Plan No",dataname:"JP_NO",datatype:"string",width:150,popup:true,linkId:"jpnolink","tooltip":"Click here to launch the Journey screen."},			
			{columnname:"Violation Count",dataname:"Violation_Count",datatype:"string",width:120},
			{columnname:"Journey Date/Time",dataname:"JP_DATE",datatype:"string",width:150},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:150},
			{columnname:"JM Name",dataname:"JM_NAME",datatype:"string",width:150},
			{columnname:"JM Number",dataname:"JM_NO",datatype:"string",width:150},
			{columnname:"Status",dataname:"Status",datatype:"string",width:150},
			{columnname:"Vehicle",dataname:"TRUCK",datatype:"string",width:150},
			{columnname:"Driver",dataname:"DRIVER",datatype:"string",width:150},			
			{columnname:"Driver No",dataname:"DRIVER_NO",datatype:"string",width:150},	
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:100},				
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:100}

		]
		var JPSummaryGridDetail=
		{
			title:"",
			id:"JPGrid",
			detail:JPSummaryObj,
			visibleRow:10,
			removeAddDelete:true,
			removeFilter:true,
			readonly:true
		}
		var JPSummaryGridSection = plf.addGrid(JPSummaryGridDetail,this)
				
		//mainpage.hlpSearchGridPtr = loadListSummaryGridSection
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(JPSummaryColumn)
		mainpage.ptrMainSection.add(JPSummaryGridSection) 
		
	    //History Data Section
		mainpage.dataHistorySectionFlag=false;	
	
		mainpage.eventHandlers = 
		[	
		{
			"controlid":"",
			"tasktype":"onload",
			"input":["iUID","selChartSeries","selChartValue"],
			"service":"TMSCoreTransportTS",
			"methodName":"TMSLiveInspDashTOTInsp"
		}	
		];	
		mainpage.screenLinks=
		{
				
				"jpnolink":
				{
					"dest":"journey_management.JourneyPlanUpdateTms",//JourneyPlanUpdateTms JourneyPlanUpdate
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"JP_NO","dest":"strJourneyPlanNo"}
							]
				}
		}		
		this.callParent(arguments);
	}
});