Ext.define('CueTrans.view.LiveDashboard.assetutil_search', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		//mainpage.hlpSectionFlag=true;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.68;
		mainpage.popupWidthRatio=.7;
		mainpage.startPainting();
		
		mainpage.screenName = "Asset Utilization";	

		var formCtrl=[];
		plf.columns=1
		var AssetUtilSummaryColumn = plf.addColumnSection({title:"", collapsed: false,"cls":""});
		
		plf.columns = 3
		var tmpRow1 = plf.addColumnSection({});	 
		tmpRow1.add(
			plf.addListEdit({"label":"Vehicle Reg No",id:"strVehRegNo"},this),
			plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
		)		
		
		var AssetUtilSummaryFormCtrl=
		[
			plf.addHidden({"id":"selChartSeries"}),
			plf.addHidden({"id":"selChartValue"})
		]		
		AssetUtilSummaryColumn.add(AssetUtilSummaryFormCtrl);	
		
		var AssetUtilSummaryObj=
		[			
			{columnname:"Carrier",dataname:"CARRIER_CODE",datatype:"string",width:120},
			{columnname:"Asset Type",dataname:"TRUCK_CATEGORY",datatype:"string",width:120},
			{columnname:"Vehicle Code",dataname:"TRUCK_CODE",datatype:"string",width:100},
			{columnname:"Vehicle Regn<br>No",dataname:"TRUCK_REG_NO",datatype:"string",width:130},
			/*{columnname:"Segment",dataname:"LOGIS_GRP",datatype:"string",width:100},*/
			{columnname:"Utilized Days",dataname:"UTIL_DAY",datatype:"string",width:100,colAlign:'right',linkId:"db_loaddtl",gridpopup:true,tooltip:"Click here to view load details."},
			{columnname:"Idle Days",dataname:"IDLE_DAY",datatype:"string",width:100,colAlign:'right',linkId:"db_idledtl",gridpopup:true,tooltip:"Click here to view idle details."},
			{columnname:"Standby Days",dataname:"STAND_DAY",datatype:"string",width:100,colAlign:'right',linkId:"db_standdtl",gridpopup:true,tooltip:"Click here to view standby details."}
		]
		var AssetUtilSummaryGridDetail=
		{
			title:"",
			id:"AssetUtilGrid",
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
		mainpage.ptrMainSection.add(tmpRow1)
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
				"methodName":"initsearchassetutilTS"
			},
			{					
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["iUID","strVehRegNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"FetchassetutilTS"
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
			},
			"db_idledtl":
			{
				"dest":"LiveDashboard.IdleSummary",
				"popMethodName":"initsearchassetutilIdleTS",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"TRUCK_CODE","dest":"selChartSeries"}
						]
			},
			"db_standdtl":
			{
				"dest":"LiveDashboard.IdleSummary",
				"popMethodName":"initsearchassetutilStandTS",
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