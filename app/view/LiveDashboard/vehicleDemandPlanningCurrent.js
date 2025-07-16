/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.0       Raj             09-June-16    72968             Shipment dashboard screen link added		
1.0.2  Mohammed Razhith.S.A	  15-June-16 73011            Changing From To Orgin                                           
************************************************************************************************/
Ext.define('CueTrans.view.LiveDashboard.vehicleDemandPlanningCurrent',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Load Planning";
            
			//mainpage.liveScreenFlag=false;
            mainpage.toolbarSectionFlag = true;
			mainpage.liveScreenFlag=true;
			mainpage.toolbarLinks=
			[			
			{"name":"Customer Request","linkid":"db_requestdash"},
            {"name":"Shipment","linkid":"db_shipmentsdash"},
			{"name":"Load Planning","linkid":"db_vehicledemandplandash"},
			/*{"name":"Vehicle Demand Planning","linkid":"db_vehicledemandplanning"},*/
			{"name":"Inspection","linkid":"db_inspectiondash"},
			{"name":"Journey Plan","linkid":"db_journeydash"}
			/*{"name":"Cargo","linkid":"db_cargodashboard"}	*/		
			]
            plf.columns = 4
			var tmpRow1 = plf.addColumnSection({});	
			tmpRow1.add(
				plf.addCombo({"label":"Origin Region",id:"strFromRegion"}),
				plf.addCombo({"label":"Destination Region",id:"strToRegion"}),
				plf.addDate({"label":"From Date",id:"strFromDate",mandatory:"true"}),
				plf.addDate({"label":"To Date",id:"strToDate",mandatory:"true"}),
				plf.addCombo({"label":"Status",id:"strStatus"}),
				plf.addButton({"label":"Search",id:"btnSearch"})
				)
			/*plf.columns = 1*/
            var tmpLoadPlanningPanel = plf.addGenSection({"cls":"chart_panel_container"});
			/*Svg starts here*/
			tmpLoadPlanningPanel.add(
				plf.addSvg({
					"id": "loadPlanSvgId",
					"svgID": "loadPlanSvgId",
					"columnWidth": .15,					
					"heightFactor":.59,
					"svgData": {
						"iTotShipment": "",
						"iPending": "",
						"iVehPlanned":""
					},
					"svgLinks":
						[	
							{"linkId":"iTotShipment","popScreen":"LiveDashboard.shipment_dtl","popMethodName":"serfetchtotloadplan"},
							{"linkId":"iPending","popScreen":"LiveDashboard.shipment_dtl","popMethodName":"serfetchpendingloadplan"},
							{"linkId":"iVehPlanned","popScreen":"LiveDashboard.shipment_dtl","popMethodName":"serfetchplannedloadplan"}
						],
					"svgURL": "resources/images/svg/LiveDashboard/LoadPlanning.svg"
            },this))
			/*Svg ends here*/
			
			// Grid sec Planned Vehicles begins
		
			
			/*Completed Load staus end here*/
                   // var tmpLoadDashStatus = plf.addGenSection({"cls":"chart_panel_container"});	
			var tmpLoadDashStatus = plf.addGenSection({"cls":"chart_panel_container"});	
			var LoadUtil_tmp = plf.addChart({
			"id": "cr_util",
			"xAxisCaption": "",
			"xAxisColumn":"util",
			"yAxisCaption": "Load Count",
			"chartTitle": "Load Utilization",
			"heightFactor":.59,
			"popScreen":"LiveDashboard.loadplanning_dtl",
			"popSeriesCtrl":"selChartSeries",
			"popValueCtrl":"selChartValue",
			"popMethodName":"serfetchLoadUtil_dtlchart",			
			"columnWidth":.85,			
			seriesArray:[
				{type:"barcolor",field:["cnt"]}					
			]				
			},this)
			
                   /*Laod Status Summary starts here*/
			        var LoadCompleted_tmp = plf.addChart({
                "id": "chart_loadCompleted",
				"xAxisCaption": "",
                "xAxisColumn":"loadStatus",
                "yAxisCaption": "Load Count",
				"chartTitle": "Load Status Summary",
				"heightFactor":.59,
				"popScreen":"LiveDashboard.loadplanning_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchLoadStatus_dtlchart",
				"columnWidth": 1.0,
				"chartColors": "greenredorange",
				"showLegend": true,
                            seriesArray:[
					{type:"barstack",field:["South","North","Coastal"]}					
				]				
                         },this)
			
			/* Load Summary For Region Starts Here */
			//var tmpLoadDashStatus = plf.addGenSection({"cls":"chart_panel_container"});
            var LoadSummary_Regionld = plf.addChart({
                "id": "cr_loadregionld",
		 		"xAxisCaption": "",
                "xAxisColumn":"zone",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Load Count",
				"chartTitle": "Region-Wise:Load Count",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.loadplanning_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchLoadRegionld_dtlchart",
				//"showLegend":true,
				"columnWidth": .50,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["LoadCount"]}								
				]				
            },this)
		
		   //var tmpLoadDashStatus = plf.addGenSection({"cls":"chart_panel_container"});
           var LoadSummary_RegionDis = plf.addChart({
                "id": "cr_loadregionDis",
		 		"xAxisCaption": "",
                "xAxisColumn":"zone",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Kilo Meter",
				"chartTitle": "Region-Wise:Load Distance",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.loadplanning_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchLoadRegionld_dtlchart",
				//"showLegend":true,
				"columnWidth": .50,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["DistanceCount"]}
					//{type:"bar",field:["TonCount"]}				
				]				
            },this)
			
			//var tmpLoadDashStatus = plf.addGenSection({"cls":"chart_panel_container"});
           var LoadSummary_RegionWeight = plf.addChart({
                "id": "cr_loadregionWeight",
		 		"xAxisCaption": "",
                "xAxisColumn":"zone",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Ton",
				"chartTitle": "Region-Wise:Load Tonnage",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.loadplanning_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchLoadRegionld_dtlchart",
				//"showLegend":true,
				"columnWidth": .50,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["TonCount"]}					
				]				
            },this)
			
			//var tmpLoadDashStatus = plf.addGenSection({"cls":"chart_panel_container"});
           var LoadSummary_RegionTonDis = plf.addChart({
                "id": "cr_loadregionTonDis",
		 		"xAxisCaption": "",
                "xAxisColumn":"zone",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Ton-km",
				"chartTitle": "Region-Wise:Load Ton-km",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.loadplanning_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchLoadRegionld_dtlchart",
				//"showLegend":true,
				"columnWidth": .50,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["TonDistance"]}										
				]				
            },this)
			
			/* Load Summary For 3pl Starts Here */
			//var tmpLoadDashStatus = plf.addGenSection({"cls":"chart_panel_container"});
            var LoadSummary_3plload = plf.addChart({
                "id": "cr_load3plld",
		 		"xAxisCaption": "",
                "xAxisColumn":"3pl",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Load Count",
				"chartTitle": "3PL-Wise:Load Count",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.loadplanning_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchLoad3pl_dtlchart",
				//"showLegend":true,
				"columnWidth": .50,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["LoadCount"]}								
				]				
            },this)
		
		   //var tmpLoadDashStatus = plf.addGenSection({"cls":"chart_panel_container"});
           var LoadSummary_3plDis = plf.addChart({
                "id": "cr_load3plDis",
		 		"xAxisCaption": "",
                "xAxisColumn":"3pl",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Kilo Meter",
				"chartTitle": "3PL-Wise:Distance Count",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.loadplanning_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchLoad3pl_dtlchart",
				//"showLegend":true,
				"columnWidth": .50,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["DistanceCount"]}
					//{type:"bar",field:["TonCount"]}				
				]				
            },this)
			
			//var tmpLoadDashStatus = plf.addGenSection({"cls":"chart_panel_container"});
           var LoadSummary_3plWeight = plf.addChart({
                "id": "cr_load3plWeight",
		 		"xAxisCaption": "",
                "xAxisColumn":"3pl",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Ton",
				"chartTitle": "3PL-Wise:Load Tonnage",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.loadplanning_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchLoad3pl_dtlchart",
				//"showLegend":true,
				"columnWidth": .50,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["TonCount"]}					
				]				
            },this)
			
			//var tmpLoadDashStatus = plf.addGenSection({"cls":"chart_panel_container"});
           var LoadSummary_3plTonDis = plf.addChart({
                "id": "cr_load3plTonDis",
		 		"xAxisCaption": "",
                "xAxisColumn":"3pl",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Ton-km",
				"chartTitle": "3PL-Wise:Load Ton-km",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.loadplanning_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchLoad3pl_dtlchart",
				//"showLegend":true,
				"columnWidth": .50,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["TonDistance"]}										
				]				
            },this)
			/* Load Summary For Commodity Starts Here */
			//var tmpLoadDashStatus = plf.addGenSection({"cls":"chart_panel_container"});
            var LoadSummary_CommodityLoad = plf.addChart({
                "id": "cr_loadCommodityld",
		 		"xAxisCaption": "",
                "xAxisColumn":"Commodity",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Load Count",
				"chartTitle": "Commodity-Wise:Load Count ",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.loadplanning_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchLoadComm_dtlchart",
				//"showLegend":true,
				"columnWidth": .50,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["LoadCount"]}								
				]				
            },this)
		
		   //var tmpLoadDashStatus = plf.addGenSection({"cls":"chart_panel_container"});
           var LoadSummary_CommodityDis = plf.addChart({
                "id": "cr_loadCommodityDis",
		 		"xAxisCaption": "",
                "xAxisColumn":"Commodity",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Kilo Meter",
				"chartTitle": "Commodity-Wise:Load Distance",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.loadplanning_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchLoadComm_dtlchart",
				//"showLegend":true,
				"columnWidth": .50,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["DistanceCount"]}			
				]				
            },this)
			
			//var tmpLoadDashStatus = plf.addGenSection({"cls":"chart_panel_container"});
           var LoadSummary_CommodityWeight = plf.addChart({
                "id": "cr_loadCommodityWeight",
		 		"xAxisCaption": "",
                "xAxisColumn":"Commodity",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Ton",
				"chartTitle": "Commodity-Wise:Load Tonnage",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.loadplanning_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchLoadComm_dtlchart",
				//"showLegend":true,
				"columnWidth": .50,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["TonCount"]}					
				]				
            },this)
			
			//var tmpLoadDashStatus = plf.addGenSection({"cls":"chart_panel_container"});
           var LoadSummary_CommodityTonDis = plf.addChart({
                "id": "cr_CommodityTonDis",
		 		"xAxisCaption": "",
                "xAxisColumn":"Commodity",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Ton-km",
				"chartTitle": "Commodity-Wise:Load Ton-km",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.loadplanning_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchLoadComm_dtlchart",
				//"showLegend":true,
				"columnWidth": .50,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["TonDistance"]}										
				]				
            },this)
			
			/*Load Summary For Location Type  Starts Here */
			//var tmpLoadDashStatus = plf.addGenSection({"cls":"chart_panel_container"});
           var LoadSummary_LocTypeLoad = plf.addChart({
                "id": "cr_LocTypeld",
		 		"xAxisCaption": "",
                "xAxisColumn":"LocationType",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Load Count",
				"chartTitle": "Destination Location Type-Wise:Load Count",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.loadplanning_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchLoadLocType_dtlchart",
				//"showLegend":true,
				"columnWidth": .50,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["LoadCount"]}										
				]				
            },this)
			
			//var tmpLoadDashStatus = plf.addGenSection({"cls":"chart_panel_container"});
           var LoadSummary_LocTypeDis = plf.addChart({
                "id": "cr_LocTypeDis",
		 		"xAxisCaption": "",
                "xAxisColumn":"LocationType",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Kilo Meter",
				"chartTitle": "Destination Location Type-Wise:Load Distance",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.loadplanning_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchLoadLocType_dtlchart",
				//"showLegend":true,
				"columnWidth": .50,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["DistanceCount"]}										
				]				
            },this)
			
			//var tmpLoadDashStatus = plf.addGenSection({"cls":"chart_panel_container"});
           var LoadSummary_LocTypeWeight = plf.addChart({
                "id": "cr_LocTypeWeight",
		 		"xAxisCaption": "",
                "xAxisColumn":"LocationType",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Ton",
				"chartTitle": "Destination Location Type-Wise:Load Tonnage",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.loadplanning_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchLoadLocType_dtlchart",
				//"showLegend":true,
				"columnWidth": .50,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["TonCount"]}										
				]				
            },this)
			
			//var tmpLoadDashStatus = plf.addGenSection({"cls":"chart_panel_container"});
           var LoadSummary_LocTypeTonDis = plf.addChart({
                "id": "cr_LocTypeldTonDis",
		 		"xAxisCaption": "",
                "xAxisColumn":"LocationType",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Ton-km",
				"chartTitle": "Destination Location Type-Wise:Load Ton-km",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.loadplanning_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchLoadLocType_dtlchart",
				//"showLegend":true,
				"columnWidth": .50,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["TonDistance"]}										
				]				
            },this)
			
			/*Tonnage(tons) by Vehicle Category starts here*/
			var TonnageVehCat_tmp = plf.addChart({
                "id": "cr_tonnageByVehCat",
				"xAxisCaption": "Vehicle Category",
                "xAxisColumn":"vehcat",
				//"y1AxisCaption": "Distance",
				//"xyaxis": true,
                "yAxisCaption": "Tonnage",
				"chartTitle": "Tonnage by Vehicle Category",
				"heightFactor":.59,
				"popScreen":"LiveDashboard.loadplanning_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchLoad_dtlchart",
				"columnWidth": 1.0,
				seriesArray:[
					{type:"barcolor",field:["cnt"]}					
				]				
            },this)
			/*Tonnage(ton) by Vehicle Category ends here*/
			
				var gridPlannedSummary=
			[										
				{columnname:"Destination",dataname:"Destination",datatype:"string",width:150},		
				{columnname:"No of Vehicles",dataname:"vehicles",datatype:"string",width:150,colAlign:'right',linkId:"db_loaddtl",gridpopup:true,tooltip:"Click here to view load details."},						
				{columnname:"No of Shipments",dataname:"Shipments",datatype:"string",width:150,colAlign:'right',linkId:"db_shipmentdtl",gridpopup:true,tooltip:"Click here to view shipment details."},
				{columnname:"Vehicle Category",dataname:"vehicle_category",datatype:"string",width:150},
				{columnname:"Weight (tons)",dataname:"Tonnage",datatype:"string",width:150,colAlign:'right'},	
				{columnname:"Under Utilized<br>Vehicles(%)",dataname:"Utilization",datatype:"string",width:150,colAlign:'right'},
			]
			var gridPlannedDtl=
			{
				title:"Planned Vehicles",
				id:"plannedVehiclesGridId",				
				detail:gridPlannedSummary,				
				readonly:true,				
				removeTbar:true,
				removePaging:true,
				margin:2,
				heightFactor:.59,
				columnWidth:.70,
				widthBasis:"flex",
			}
			var tmpgridPlannedSummary = plf.addGrid(gridPlannedDtl,this) 
			// Grid sec Planned Vehicles ends
			
				// Grid sec Avail Vehicles begins
			var gridAvailSummary=
			[										
				{columnname:"Vehicle Category",dataname:"vehicle_category",datatype:"string",width:120},
				{columnname:"No of vehicles",dataname:"total",datatype:"string",width:100,colAlign:'right'},				
				{columnname:"Available",dataname:"avialable",datatype:"string",width:100,colAlign:'right'},
				{columnname:"Occupied",dataname:"allocated",datatype:"string",width:100,colAlign:'right'}
			]
			var gridAvailDtl=
			{
				title:"Available Vehicles",
				id:"plannedVehiclesAvailVehGridId",				
				detail:gridAvailSummary,				
				readonly:true,				
				removeTbar:true,
				removePaging:true,
				margin:2,
				heightFactor:.59,
				columnWidth:.30,
				widthBasis:"flex",
			}
			var tmpgridAvailSummary = plf.addGrid(gridAvailDtl,this) 
			// Grid sec Avail Vehicles ends
			
			
			
		
			
			tmpLoadPlanningPanel.add(LoadUtil_tmp)
            tmpLoadPlanningPanel.add(LoadCompleted_tmp)
			//tmpLoadDashStatus.add(LoadUtil_tmp)
			tmpLoadPlanningPanel.add(LoadSummary_Regionld)
			tmpLoadPlanningPanel.add(LoadSummary_RegionDis)
			tmpLoadPlanningPanel.add(LoadSummary_RegionWeight)
			tmpLoadPlanningPanel.add(LoadSummary_RegionTonDis)
			tmpLoadPlanningPanel.add(LoadSummary_3plload)
			tmpLoadPlanningPanel.add(LoadSummary_3plDis)
			tmpLoadPlanningPanel.add(LoadSummary_3plWeight)
			tmpLoadPlanningPanel.add(LoadSummary_3plTonDis)
			tmpLoadPlanningPanel.add(LoadSummary_CommodityLoad)
			tmpLoadPlanningPanel.add(LoadSummary_CommodityDis)
			tmpLoadPlanningPanel.add(LoadSummary_CommodityWeight)
			tmpLoadPlanningPanel.add(LoadSummary_CommodityTonDis)
			tmpLoadPlanningPanel.add(LoadSummary_LocTypeLoad)
			tmpLoadPlanningPanel.add(LoadSummary_LocTypeDis)
			tmpLoadPlanningPanel.add(LoadSummary_LocTypeWeight)
			tmpLoadPlanningPanel.add(LoadSummary_LocTypeTonDis)
			tmpLoadPlanningPanel.add(TonnageVehCat_tmp)
			tmpLoadPlanningPanel.add(tmpgridPlannedSummary)
			tmpLoadPlanningPanel.add(tmpgridAvailSummary)
            mainpage.ptrMainSection.add(tmpRow1)
			mainpage.ptrMainSection.add(tmpLoadPlanningPanel)
			//mainpage.ptrMainSection.add(tmpLoadDashStatus)
            
			mainpage.eventHandlers = 
			[
			{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strFromRegion","strToRegion","strFromDate","strToDate","strStatus"],
					"service":"TMSCoreTransportTS",
					"methodName":"srchinitloadplandboard"
			},
			{
					"controlid":"",
					"tasktype":"onload",
					"input":["strFromRegion","strToRegion","strFromDate","strToDate"],
					"service":"TMSCoreTransportTS",
					"methodName":"serinitloadplandboard"
			},
			{
				"tasktype":"proto",
				"filename":"dashboard/vehdemandplanningcurrent.json"
			}			
				
			];			
	mainpage.screenLinks=
		{
			
								
				"db_journeydash":
				{
					"dest":"LiveDashboard.journeyplan",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
				"db_inspectiondash":
				{
					"dest":"LiveDashboard.inspection",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
				"db_requestdash":
				{
					"dest":"LiveDashboard.custreq_performanceCurrent",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},				
				"db_cargodashboard":
				{
					"dest":"LiveDashboard.cargoDashboard",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
                            "db_shipmentsdash":
				{
					"dest":"LiveDashboard.shipments",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"db_vehicledemandplandash":
				{
				"dest":"LiveDashboard.vehicleDemandPlanningCurrent",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
				},
				"db_vehicledemandplanning":
				{
				"dest":"LiveDashboard.vehicleDemandPlanning",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
				}
				
		}
		mainpage.gridPopupLinks=
		{
			"db_loaddtl":
			{
				"dest":"LiveDashboard.loadplanning_dtl",
				"popMethodName":"serfetchLoad_dtlloadplan",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"Destination","dest":"selChartSeries"},
						{"src":"vehicle_category","dest":"selChartValue"}
						]
			},
			"db_shipmentdtl":
			{
				"dest":"LiveDashboard.shipment_dtl",
				"popMethodName":"serfetchShipment_dtlloadplan",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"Destination","dest":"selChartSeries"},
						{"src":"vehicle_category","dest":"selChartValue"}
						]
			}
		}	
			this.callParent(arguments);
        }

    });