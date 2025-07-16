Ext.define('CueTrans.view.LiveDashboard.AssetUtilization',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Management Information Dashboard - 1";
            // Add Toolbar
            mainpage.toolbarSectionFlag = true;
			//mainpage.liveScreenFlag=true;
			mainpage.liveScreenFlag=true;

			mainpage.toolbarLinks=
			[		
				
				//{"name":"Customer Request","linkid":"db_requestdash"},
				//{"name":"Load Planning","linkid":"db_vehicledemandplandash"},
				//{"name":"Vehicle Demand Planning","linkid":"db_vehicledemandplanning"},
				//{"name":"Inspection","linkid":"db_inspectiondash"},
				//{"name":"Journey Plan","linkid":"db_journeydash"},
				//{"name":"Cargo","linkid":"db_cargodashboard"},
				{"name":"Management Information - 1","linkid":"db_assetdash"},
				{"name":"Management Information - 2","linkid":"db_Segmentdash"},
	
				
			]
            		plf.columns = 4
			var tmpRow1 = plf.addColumnSection({});	
			tmpRow1.add(
				plf.addDate({"label":"From Date",id:"dtShippmentDateFrom"}),
				plf.addDate({"label":"To Date",id:"dtShippmentDateTo"}),
				plf.addButton({"label":"Search",id:"btnSearch"})
					   )


			plf.columns = 1
            var tmpAssetPanel = plf.addGenSection({"cls":"chart_panel_container"});	
			
			
			var MonthCost_tmp = plf.addChart({
               		"id": "cr_MonthCost",
				"xAxisCaption": "",
                		"xAxisColumn":"Type",
                		"yAxisCaption": "Cost",
				"chartTitle": "Monthly Costs",
				"heightFactor":.7,
				"popScreen":"LiveDashboard.costutil",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initUtilCostdetails",
				"MoneySeparator":true,
				"columnWidth": .5,
				//"showLegend": true,
				"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["Cost"]}					
				]				
            },this)

						
			/*Utilisation by day by Zone starts here*/
			var AssetCostbyseg_tmp = plf.addChart({
                		"id": "cr_AssetCostbyseg",
				"xAxisCaption": "", //"Segment",
                		"xAxisColumn":"LogGrp",
               		"yAxisCaption": "Cost",
				"chartTitle": "Asset Utilization Cost by Segment",
				"heightFactor":.7,
				"popScreen":"LiveDashboard.segcostutil",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initUtilCostSegdetails",
				"MoneySeparator":true,
				"columnWidth": 1,
				"showLegend": true,
				"chartColors": "greenorange",
				seriesArray:[
					{type:"bar",field:["Utilised","Standby at Site"]}					
				]				
            		},this)
			var IdleCostbyAsset_tmp = plf.addChart({
                		"id": "cr_IdleCostbyAsset",
				"xAxisCaption": "", //"Segment",
                		"xAxisColumn":"Type",
               		"yAxisCaption": "Cost",
				"chartTitle": "Idle Cost by Asset Type",
				"heightFactor":.7,
				"popScreen":"LiveDashboard.costutil",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initUtilCostCATdetails",
				"MoneySeparator":true,
				"columnWidth": 1,
				//"showLegend": true,
				seriesArray:[
					{type:"barcolor",field:["Cost"]}					
				]				
            		},this)

			/*Utilisation by day by Zone ends here*/
			
			/*Utilisation by day by month starts here*/
			var DisCost_tmp = plf.addChart({
                		"id": "cr_DisCost",
				"xAxisCaption": "", //"Segment",
                		"xAxisColumn":"LogGrp",
                		"yAxisCaption": "Cost",
				"chartTitle": "Diesel Cost by Segment",
				"heightFactor":.7,
				"popScreen":"",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"columnWidth": .5,
				"showLegend": true,
				seriesArray:[
					{type:"bar",field:["Cost"]}					
				]				
            },this)
			/*Utilisation by day by month ends here*/
			
			/* Utilisation % starts here*/
			var Utilper_tmp = plf.addChart({
				"id": "cr_Utilper",
				"xAxisCaption": "", //"Utilized",
                		"xAxisColumn":"Utilized",
               		"yAxisCaption": "Percentage - %",
				//"chartTheme":"chartTheme2",
				//"chartType": "Polar",
				"chartTitle": "Total Utilization %",
				"heightFactor":.7,
				"popScreen":"LiveDashboard.assetutil_search",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initsearchassetutilTS",
				"columnWidth": .5,
				"chartColors": "greenredorange",
				seriesArray:[
					{type:"barcolor",field:["cnt"]}	
				]				
            },this)
			/*Utilisation %  ends here*/
			
			
			/* Asset Utilisation by category starts here*/
			var UtilbyCat_tmp = plf.addChart({
                		"id": "cr_UtilbyCat",
				"xAxisCaption": "", //"Asset Type",
                		"xAxisColumn":"Vehicle_Category",
                		"yAxisCaption": "Percentage - %",
				"chartTitle": "Asset Type Utilization%",
				"heightFactor":.7,
				"popScreen":"LiveDashboard.assetutil_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initsearchassetutilCatTS",
				"columnWidth": 1,
				"showLegend": true,
				"chartColors": "greenredorange",
				seriesArray:[
					{type:"bar",field:["Utilised","Standby at Site","Idle"]}					
				]				
            			},this)
			var UtilbyLTC_tmp = plf.addChart({
                		"id": "cr_UtilbyLTC",
				"xAxisCaption": "", //"Asset Type",
                		"xAxisColumn":"LTC",
                		"yAxisCaption": "Percentage - %",
				"chartTitle": "Asset Utilization by LTC",
				"heightFactor":.7,
				"popScreen":"LiveDashboard.assetutil_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initsearchassetutilLTCTS",
				"columnWidth": .5,
				"showLegend": true,
				"chartColors": "greenredorange",
				seriesArray:[
					{type:"bar",field:["Utilised","Standby at Site","Idle"]}					
				]				
           			 },this)
			var UtilCostbyLTC_tmp = plf.addChart({
                		"id": "cr_UtilCostbyLTC",
				"xAxisCaption": "", //"Asset Type",
                		"xAxisColumn":"LTC",
                		"yAxisCaption": "Cost",
				"chartTitle": "Asset Idle Cost by LTC",
				"heightFactor":.7,
				"popScreen":"LiveDashboard.costutil",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initUtilCostLTCdetails",
				"MoneySeparator":true,
				"columnWidth": .5,
				//"showLegend": true,
				//"chartColors": "greenred",
				seriesArray:[
					{type:"barcolor",field:["Idle"]}					
				]				
           			 },this)

			/*Asset Utilisation by category ends here*/

			/* Asset Utilisation by Segment starts here*/
			var UtilbySeg_tmp = plf.addChart({
                		"id": "cr_UtilbySeg",
				"xAxisCaption": "", //"Asset Type",
                		"xAxisColumn":"log_grp",
                		"yAxisCaption": "Percentage - %",
				"chartTitle": "Asset Utilization by Segment",
				"heightFactor":.7,
				"popScreen":"LiveDashboard.assetutilseg_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initsearchassetutilSegTS",
				"columnWidth": 1,
				"showLegend": true,
				"chartColors": "greenorange",
				seriesArray:[
					{type:"bar",field:["Utilised","Standby at Site"]}					
				]				
            },this)

				
			
			/*
			var Utilbyseg_tmp = plf.addChart({
               		"id": "cr_Utilbyseg",
				"xAxisCaption": "Logistics Group",
               		"xAxisColumn":"LogGrp",
               		"yAxisCaption": "Percentage",
				"chartTitle": "Asset Utilization by Category",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.asset_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initsearchassetutilSegTS",
				"columnWidth": 1,
				seriesArray:[
					{type:"bar",field:["Utilised","Idle"]}					
				]				
            },this)
			*/
			
			
			var Reqbyseq_tmp = plf.addChart({
               		"id": "cr_Reqbyseq",
				"xAxisCaption": "", //"Segment",
               		"xAxisColumn":"LogGrp",
               		"yAxisCaption": "Request Received",
				"chartTitle": "Request Received by Segment",
				"heightFactor":.7,
				"popScreen":"",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"MoneySeparator":true,
				"columnWidth":1,
				seriesArray:[
					{type:"barcolor",field:["cntreq"]}					
				]				
            },this)
			
			
			var KmbySeg_tmp = plf.addChart({
                		"id": "cr_KmbySeg",
				"xAxisCaption": "", //"Segment",
                		"xAxisColumn":"LogGrp",
               		"yAxisCaption": "KM",
				"chartTheme":"chartTheme2",
				"chartTitle": "KM Driven by Segment",
				"heightFactor":.7,
				"popScreen":"",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"MoneySeparator":true,
				"columnWidth": 1,
				seriesArray:[
					{type:"barcolor",field:["KM"]}					
				]				
            },this)
			
		
			
			
			var KmbyCat_tmp = plf.addChart({
				"id": "cr_KmbyCat",
				"xAxisCaption": "", //"Asset Type",
                		"xAxisColumn":"Vehicle_Category",
                		"yAxisCaption": "KM",
				"chartTheme":"chartTheme2",
				/*"chartType": "Polar",*/
				"chartTitle": "KM Driven by Asset Type",
				"heightFactor":.7,
				"popScreen":"",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"MoneySeparator":true,
				"columnWidth": 1,				
				seriesArray:[
					{type:"barcolor",field:["KM"]}	
				]				
            },this)
			
			
			
			var Reqrecvsful_tmp = plf.addChart({
                "id": "cr_Reqrecvsful",
				"xAxisCaption": "", //"Segment",
                "xAxisColumn":"LogGrp",
                "yAxisCaption": "Request",
				"chartTitle": "Request Received vs Fulfilled by Segment",
				"heightFactor":.7,
				"popScreen":"",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"columnWidth": 1,
				"showLegend": true,
				seriesArray:[
					{type:"bar",field:["Received","Fulfilled"]}					
				]				
            },this)
			
					
			
			//mainpage.ptrMainSection.add(tmpRow1) //Add Header Section to Main Page  
			//tmpAssetPanel.add(MonthCost_tmp)
			//tmpAssetPanel.add(AssetCostbyseg_tmp)
			//tmpAssetPanel.add(DisCost_tmp)
			
			tmpAssetPanel.add(Utilper_tmp)
			tmpAssetPanel.add(UtilbyLTC_tmp)	
			tmpAssetPanel.add(UtilbyCat_tmp)
			tmpAssetPanel.add(UtilbySeg_tmp)	
							
			tmpAssetPanel.add(Reqbyseq_tmp)
			tmpAssetPanel.add(KmbySeg_tmp)
			tmpAssetPanel.add(KmbyCat_tmp)
			//tmpAssetPanel.add(Reqrecvsful_tmp)
			tmpAssetPanel.add(MonthCost_tmp)
			tmpAssetPanel.add(UtilCostbyLTC_tmp)
			tmpAssetPanel.add(AssetCostbyseg_tmp)
			tmpAssetPanel.add(IdleCostbyAsset_tmp)	
			
				
			//tmpAssetPanel.add(DisCost_tmp)

			
			mainpage.ptrMainSection.add(tmpRow1)				
			mainpage.ptrMainSection.add(tmpAssetPanel)
			

			mainpage.eventHandlers = 
			[
			
				{
						"controlid":"",
						"tasktype":"onload",
						"input":[""],
						"service":"TMSCoreTransportTS",
						"methodName":"initassetutilTS"
				},
				{
				"tasktype":"proto",
				"filename":"dashboard/customerrequestcurrent.json"
				},
				{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["dtShippmentDateFrom","dtShippmentDateTo"],
					"service":"TMSCoreTransportTS",
					"methodName":"fetchAssetTS"
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
			"db_vehicledemandplanning":
				{
				"dest":"LiveDashboard.vehicleDemandPlanning",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
				},
			"db_assetdash":
				{
				"dest":"LiveDashboard.AssetUtilization",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
				},
			"db_Segmentdash":
				{
				"dest":"LiveDashboard.SegementWise",
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