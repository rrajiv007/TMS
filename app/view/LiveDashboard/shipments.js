/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.0         Raj            09-June-16     72968            Shipment dashboard screen development	
1.0.2  Mohammed Razhith.S.A	  15-June-16 73011            Changing From To Orgin        	                                   
************************************************************************************************/
Ext.define('CueTrans.view.LiveDashboard.shipments',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Shipment Current Dashboard";
            // Add Toolbar
            mainpage.toolbarSectionFlag = true;
			//mainpage.liveScreenFlag=true;
			mainpage.liveScreenFlag=true;

			mainpage.toolbarLinks=
			[		
				
				{"name":"Customer Request","linkid":"db_requestdash"},
                {"name":"Shipment","linkid":"db_shipmentsdash"},
				{"name":"Load Planning","linkid":"db_vehicledemandplandash"},
				{"name":"Inspection","linkid":"db_inspectiondash"},
				{"name":"Journey Plan","linkid":"db_journeydash"},
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

			plf.columns = 1
            var tmpCargoPanel = plf.addGenSection({"cls":"chart_panel_container"});

			/*Svg starts here*/
			/*tmpCargoPanel.add(
				plf.addSvg({
					"id": "cargoDash",
					"svgID": "cargoDash",
					"columnWidth": .33,					
					"heightFactor":.5,
					"svgData": {
						"iReqReceived": "",
						"iCustReqNorm": "",
						"iCustReqUrg": "",
						"iShipCreated": "",
						"iShipCreatedNorm1":"",
						"iShipCreatedUrg":""
					},
					"svgLinks":
						[	
							{"linkId":"iReqReceived","popScreen":"LiveDashboard.request_dtl","popMethodName":"initCustReqDB5"},
							{"linkId":"iCustReqNorm","popScreen":"LiveDashboard.request_dtl","popMethodName":"initCustReqDBNor5"},
							{"linkId":"iCustReqUrg","popScreen":"LiveDashboard.request_dtl","popMethodName":"initCustReqDBUrg5"},
							{"linkId":"iShipCreated","popScreen":"LiveDashboard.shipment_dtl","popMethodName":"initshipmentcntDB1"},
							{"linkId":"iShipCreatedNorm1","popScreen":"LiveDashboard.shipment_dtl","popMethodName":"initShipmentBNor2"},
							{"linkId":"iShipCreatedUrg","popScreen":"LiveDashboard.shipment_dtl","popMethodName":"initShipmentDBUrg3"}
						],
					"svgURL": "resources/images/svg/LiveDashboard/CargoDashboard.svg"
            },this))*/
			/*Svg ends here*/
			
                /*Region-wise Shipment Plan Summary*/
			    var tmpShipStat = plf.addChart({
                "id": "ShipStatDboard",
				"xAxisCaption": "",
                "xAxisColumn":"ShipStatus",
                "yAxisCaption": "Shipment Count",
				"chartTitle": "Region-wise Shipment Status Summary",
				"heightFactor":.60,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchShipStatus_dtlchart",
				"columnWidth": 1.0,
                "chartColors": "greenredorange",
                "showLegend": true,
				seriesArray:[
					{type:"bar",field:["South","North","Coastal"]}					
				]				
            },this)			
//Region Wise Shipment	Start here		
             /* Region Wise Shipment Count */
			      
                var ShipSummary_Regionld = plf.addChart({
                "id": "cr_ShipRegionCount",
		 		"xAxisCaption": "",
                "xAxisColumn":"zone",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Shipment Count",
				"chartTitle": "Region-wise Shipment Count",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchRegionWise_dtlchart",
				//"showLegend":true,
				"columnWidth": .5,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["ShipCount"]}								
				]				
            },this)
		
		      /* Region Wise Shipment Distance */
                var ShipSummary_RegionDis = plf.addChart({
                "id": "cr_ShipRegionDis",
		 		"xAxisCaption": "",
                "xAxisColumn":"zone",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Distance(Km)",
				"chartTitle": "Region-wise Shipment Distance",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchRegionWise_dtlchart",
				//"showLegend":true,
				"columnWidth": .5,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["ShipDistance"]}
								
				]				
            },this)
			/* Region Wise Shipment Tonnage */
			    var ShipSummary_RegionWeight = plf.addChart({
                "id": "cr_ShipRegionWeight",
		 		"xAxisCaption": "",
                "xAxisColumn":"zone",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Ton",
				"chartTitle": "Region-wise Shipment Tonnage",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchRegionWise_dtlchart",
				//"showLegend":true,
				"columnWidth": .5,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["ShipTon"]}					
				]				
            },this)
			
			 /* Region Wise Shipment TonKiloMeter */
                var ShipSummary_RegionTonDis = plf.addChart({
                "id": "cr_ShipRegionTonDis",
		 		"xAxisCaption": "",
                "xAxisColumn":"zone",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Ton Distance",
				"chartTitle": "Region-wise Shipment Ton-Km",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchRegionWise_dtlchart",
				//"showLegend":true,
				"columnWidth": .5,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["ShipTonDistance"]}										
				]				
            },this)
// region wise shipment end here
//Commodity Wise Shipment	Start here		
             /* Region Wise Shipment Count */
			    
                var CommoditySummary_Regionld = plf.addChart({
                "id": "cr_ShipCommodityCount",
		 		"xAxisCaption": "",
                "xAxisColumn":"Commodity",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Shipment Count",
				"chartTitle": "Commodity-wise Shipment Count",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchCommodityWise_dtlchart",
				//"showLegend":true,
				"columnWidth": .5,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["CommodityCount"]}								
				]				
            },this)
		
		      /* Commodity Wise Shipment Distance */
                var CommoditySummary_RegionDis = plf.addChart({
                "id": "cr_ShipCommodityDis",
		 		"xAxisCaption": "",
                "xAxisColumn":"Commodity",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Distance(Km)",
				"chartTitle": "Commodity-wise Shipment Distance",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchCommodityWise_dtlchart",
				//"showLegend":true,
				"columnWidth": .5,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["CommodityDistance"]}
								
				]				
            },this)
			/* Commodity Wise Shipment Tonnage */
			    var ShipSummary_CommodityWeight = plf.addChart({
                "id": "cr_ShipCommodityWeight",
		 		"xAxisCaption": "",
                "xAxisColumn":"Commodity",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Ton",
				"chartTitle": "Commodity-wise Shipment Tonnage",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchCommodityWise_dtlchart",
				//"showLegend":true,
				"columnWidth": .5,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["CommodityTon"]}					
				]				
            },this)
			
			 /* Commodity Wise Shipment TonKiloMeter */
                var CommoditySummary_RegionTonDis = plf.addChart({
                "id": "cr_ShipCommodityTonDis",
		 		"xAxisCaption": "",
                "xAxisColumn":"Commodity",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Ton Distance",
				"chartTitle": "Commodity-wise Shipment Ton-Km",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchCommodityWise_dtlchart",
				//"showLegend":true,
				"columnWidth": .5,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["CommodityTonDistance"]}										
				]				
            },this)
// Commodity wise shipment end here
//Location Type Wise Shipment	Start here		
             /* Location Wise Shipment Count */
			    
                var LocationSummary_Regionld = plf.addChart({
                "id": "cr_ShipLocationyCount",
		 		"xAxisCaption": "",
                "xAxisColumn":"Location",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Shipment Count",
				"chartTitle": "Destination Location Type-wise Shipment Count",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchLocatioTypeWise_dtlchart",
				//"showLegend":true,
				"columnWidth": .5,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["LocationCount"]}								
				]				
            },this)
		
		      /* Location Wise Shipment Distance */
                var LocationSummary_RegionDis = plf.addChart({
                "id": "cr_ShipLocationDis",
		 		"xAxisCaption": "",
                "xAxisColumn":"Location",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Distance(Km)",
				"chartTitle": "Destination Location Type-wise Shipment Distance",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchLocatioTypeWise_dtlchart",
				//"showLegend":true,
				"columnWidth": .5,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["LocationDistance"]}
								
				]				
            },this)
			/* Location Wise Shipment Tonnage */
			    var ShipSummary_LocationWeight = plf.addChart({
                "id": "cr_ShipLocationWeight",
		 		"xAxisCaption": "",
                "xAxisColumn":"Location",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Ton",
				"chartTitle": "Destination Location Type-wise Shipment Tonnage",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchLocatioTypeWise_dtlchart",
				//"showLegend":true,
				"columnWidth": .5,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["LocationTon"]}					
				]				
            },this)
			
			 /* Location Wise Shipment TonKiloMeter */
                var LocationSummaryTonDis = plf.addChart({
                "id": "cr_ShipLocationTonDis",
		 		"xAxisCaption": "",
                "xAxisColumn":"Location",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Ton Distance",
				"chartTitle": "Destination Location Type-wise Shipment Ton-Km",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchLocatioTypeWise_dtlchart",
				//"showLegend":true,
				"columnWidth": .5,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["LocationTonDistance"]}										
				]				
            },this)
// Location Type Wise shipment end here
//Hotshot Wise Shipment	Start here		
             /* Hotshot Wise Shipment Count */
			      
                var Hotshot_Regionld = plf.addChart({
                "id": "cr_HotshotRegCount",
		 		"xAxisCaption": "",
                "xAxisColumn":"HotshotReg",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Shipment Count",
				"chartTitle": "Region-wise Hotshot Shipment Count",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchRegionHotshotWise_dtlchart",
				//"showLegend":true,
				"columnWidth": .5,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["HotshotRegCount"]}								
				]				
            },this)
		
		      /* Hotshot Shipment Distance */
                var Hotshot_RegionDis = plf.addChart({
                "id": "cr_HotshotRegDis",
		 		"xAxisCaption": "",
                "xAxisColumn":"HotshotReg",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Distance(Km)",
				"chartTitle": "Region-wise Hotshot Shipment Distance",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchRegionHotshotWise_dtlchart",
				//"showLegend":true,
				"columnWidth": .5,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["HotshotRegDistance"]}
								
				]				
            },this)
			/* Hotshot Wise Shipment Tonnage */
			    var Hotshot_RegWeight = plf.addChart({
                "id": "cr_HotshotRegWeight",
		 		"xAxisCaption": "",
                "xAxisColumn":"HotshotReg",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Ton",
				"chartTitle": "Region-wise Hotshot Shipment Tonnage",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchRegionHotshotWise_dtlchart",
				//"showLegend":true,
				"columnWidth": .5,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["HotshotRegTon"]}					
				]				
            },this)
			
			 /* Hotshot Wise Shipment TonKiloMeter */
                var HotshotRegTonDis = plf.addChart({
                "id": "cr_HotshotRegTonDis",
		 		"xAxisCaption": "",
                "xAxisColumn":"HotshotReg",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Ton Distance",
				"chartTitle": "Region-wise Hotshot Shipment Ton-Km",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchRegionHotshotWise_dtlchart",
				//"showLegend":true,
				"columnWidth": .5,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["HotshotRegTonDistance"]}										
				]				
            },this)
// Hotshot  Wise shipment end here
//Hotshot Commodity Wise Shipment	Start here		
             /* Hotshot Commodity Wise Shipment Count */
			      
                var Hotshot_Commodityld = plf.addChart({
                "id": "cr_HotshotCommodityCount",
		 		"xAxisCaption": "",
                "xAxisColumn":"HotshotCommodity",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Shipment Count",
				"chartTitle": "Commodity-wise Hotshot Shipment Count",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchCommodityHotshotWise_dtlchart",
				//"showLegend":true,
				"columnWidth": .5,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["HotshotCommodityCount"]}								
				]				
            },this)
		
		      /* Hotshot Shipment Distance */
                var Hotshot_CommodityDis = plf.addChart({
                "id": "cr_HotshotCommodityDis",
		 		"xAxisCaption": "",
                "xAxisColumn":"HotshotCommodity",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Distance(Km)",
				"chartTitle": "Commodity-wise Hotshot Shipment Distance",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchCommodityHotshotWise_dtlchart",
				//"showLegend":true,
				"columnWidth": .5,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["HotshotCommodityDistance"]}
								
				]				
            },this)
			/* Hotshot Wise Shipment Tonnage */
			    var Hotshot_CommodityWeight = plf.addChart({
                "id": "cr_HotshotCommodityWeight",
		 		"xAxisCaption": "",
                "xAxisColumn":"HotshotCommodity",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Ton",
				"chartTitle": "Commodity-wise Hotshot Shipment Tonnage",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchCommodityHotshotWise_dtlchart",
				//"showLegend":true,
				"columnWidth": .5,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["HotshotCommodityTon"]}					
				]				
            },this)
			
			 /* Hotshot Wise Shipment TonKiloMeter */
                var HotshotCommodityTonDis = plf.addChart({
                "id": "cr_HotshotCommodityTonDis",
		 		"xAxisCaption": "",
                "xAxisColumn":"HotshotCommodity",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Ton Distance",
				"chartTitle": "Commodity-wise Hotshot Shipment Ton-Km",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchCommodityHotshotWise_dtlchart",
				//"showLegend":true,
				"columnWidth": .5,
                //"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["HotshotCommodityTonDistance"]}										
				]				
            },this)
// Hotshot Commodity  Wise shipment end here
//Ontime delay stacked/tiled graph for the region start here
			    var Ontime_Delay_Region = plf.addChart({
                "id": "cr_Ontime_Delay_Region",
		 		"xAxisCaption": "",
                "xAxisColumn":"Ontime_Delay_Reg",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                "yAxisCaption": "Shipment Count",
				"chartTitle": "Region-wise Ontime Or Delay Shipment Count",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetchRegWiseOntime_dtlchart",
				"showLegend":true,
				"columnWidth": .5,
                "chartColors": "greenredorange",
				seriesArray:[
					{type:"bar",field:["South","North","Coastal"]}					
				]				
            },this)

//Ontime delay stacked/tiled graph for the region end here
		
//Ontime delay stacked/tiled graph for the 3pl Start here
                var Ontime_Delay_3pl = plf.addChart({
                "id": "cr_Ontime_Delay_3pl",
		 		"xAxisCaption": "",
                "xAxisColumn":"Ontime_Del_3pl",
				//"y1AxisCaption": "Load Count",
				//"xyaxis": true,
                 "yAxisCaption": "Shipment Count",
				"chartTitle": "3PL-wise Ontime Or Delay Shipment Count",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.shipment_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"serfetch3plWiseOntime_dtlchart",
				"showLegend":true,
				"columnWidth": .5,
                //"chartColors": "greenorange",
				seriesArray:[
					{type:"bar",field:["Ontime","Delayed"]}					
				]				
            },this)
// Ontime delay stacked/tiled graph for the 3pl end here
                        
			
			mainpage.ptrMainSection.add(tmpRow1) //Add Header Section to Main Page 
                     tmpCargoPanel.add(tmpShipStat)

                     tmpCargoPanel.add(ShipSummary_Regionld)
                     tmpCargoPanel.add(ShipSummary_RegionDis)
                     tmpCargoPanel.add(ShipSummary_RegionWeight)
                     tmpCargoPanel.add(ShipSummary_RegionTonDis)
					 
		       tmpCargoPanel.add(CommoditySummary_Regionld)
                     tmpCargoPanel.add(CommoditySummary_RegionDis)
                     tmpCargoPanel.add(ShipSummary_CommodityWeight)
                     tmpCargoPanel.add(CommoditySummary_RegionTonDis)

		       tmpCargoPanel.add(LocationSummary_Regionld)
                     tmpCargoPanel.add(LocationSummary_RegionDis)
                     tmpCargoPanel.add(ShipSummary_LocationWeight)
                     tmpCargoPanel.add(LocationSummaryTonDis)
            
                     tmpCargoPanel.add(Hotshot_Regionld)
                     tmpCargoPanel.add(Hotshot_RegionDis)
                     tmpCargoPanel.add(Hotshot_RegWeight)
                     tmpCargoPanel.add(HotshotRegTonDis)
					 
					 tmpCargoPanel.add(Hotshot_Commodityld)
                     tmpCargoPanel.add(Hotshot_CommodityDis)
                     tmpCargoPanel.add(Hotshot_CommodityWeight)
                     tmpCargoPanel.add(HotshotCommodityTonDis)
					 
					 tmpCargoPanel.add(Ontime_Delay_Region)
					 tmpCargoPanel.add(Ontime_Delay_3pl)
			
			mainpage.ptrMainSection.add(tmpCargoPanel);
			

			mainpage.eventHandlers = 
			[
				{
						"controlid":"",
						"tasktype":"onload",
						"input":[""],
						"service":"TMSCoreTransportTS",
						"methodName":"initShipdboard"
				},
				{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strFromRegion","strToRegion","strFromDate","strToDate","strStatus"],
					"service":"TMSCoreTransportTS",
					"methodName":"srchinitShipmentDboard"
			}
				/*{
				"tasktype":"proto",
				"filename":"dashboard/customerrequestcurrent.json"
				}*/

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
                     "db_shipmentsdash":
			{
				"dest":"LiveDashboard.shipments",
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
			"db_requestdtl":
			{
				"dest":"LiveDashboard.request_dtl",
				"popMethodName":"initCustReqDBgrid",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"Region","dest":"selChartSeries"},
						{"src":"Commodity","dest":"selChartValue"}
						]
			},
			"db_shipmentdtl":
			{
				"dest":"LiveDashboard.shipment_dtl",
				"popMethodName":"initShipmentDBgrid",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"Region","dest":"selChartSeries"},
						{"src":"Commodity","dest":"selChartValue"}
						]
			}
		}
			this.callParent(arguments);
        }

    });