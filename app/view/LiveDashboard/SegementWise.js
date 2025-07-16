Ext.define('CueTrans.view.LiveDashboard.SegementWise',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Management Information Dashboard - 2";
            // Add Toolbar
            mainpage.toolbarSectionFlag = true;
			//mainpage.liveScreenFlag=true;
			mainpage.liveScreenFlag=true;

			mainpage.toolbarLinks=
			[		
				
				//{"name":"Customer Request","linkid":"db_requestdash"},
				//{"name":"Load Planning","linkid":"db_vehicledemandplandash"},
				//{"name":"Vehicle Demand Planning","linkid":"db_vehicledemandplanning"},
				{"name":"Management Information - 1","linkid":"db_assetdash"},
				{"name":"Management Information - 2","linkid":"db_Segmentdash"},

				//{"name":"Inspection","linkid":"db_inspectiondash"},
				//{"name":"Journey Plan","linkid":"db_journeydash"},
				//{"name":"Cargo","linkid":"db_cargodashboard"}	
				
			]
			
			plf.columns = 4
			var tmpRow1 = plf.addColumnSection({});	
			tmpRow1.add(
				plf.addDate({"label":"From Date",id:"dtShippmentDateFrom"}),
				plf.addDate({"label":"To Date",id:"dtShippmentDateTo"}),
				plf.addButton({"label":"Search",id:"btnSearch"})
					   )

	            

			plf.columns = 1
            var tmpRequestPanel = plf.addGenSection({"cls":"chart_panel_container"});	

			/*Svg starts here
			tmpCargoPanel.add(
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
            },this))
			Svg ends here */
			
			
			var KmbyCar_tmp = plf.addChart({
                "id": "cr_KmbyCar",
				"xAxisCaption": "", //"Carrier",
                "xAxisColumn":"Carrier",
                "yAxisCaption": "KM",
				"chartTitle": "KM Driven by Carrier",
				"heightFactor":.7,
				"popScreen":"LiveDashboard.asset_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"columnWidth": .5,
				seriesArray:[
					{type:"barcolor",field:["KM"]}					
				]				
            },this)
			
			
			var Jpbyseg_tmp = plf.addChart({
                "id": "cr_Jpbyseg",
				"xAxisCaption": "", //"Logistics Group",
                "xAxisColumn":"LogGrp",
                "yAxisCaption": "Journey Plan",
				"chartTitle": "Total Journey Plan by Segment",
				"heightFactor":.7,
				"popScreen":"LiveDashboard.asset_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"columnWidth": .5,
				seriesArray:[
					{type:"barcolor",field:["TOTJP"]}					
				]				
            },this)
			
			var Jpbycar_tmp = plf.addChart({
                "id": "cr_Jpbycar",
				"xAxisCaption": "", //"Carrier",
                "xAxisColumn":"Carrier",
                "yAxisCaption": "Journey Plan",
				"chartTitle": "Total Journey Plan by Carrier",
				"heightFactor":.7,
				"popScreen":"LiveDashboard.asset_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"columnWidth": .5,
				seriesArray:[
					{type:"barcolor",field:["TOTJP"]}					
				]				
            },this)
			
			
			var Valasset_tmp = plf.addChart({
				"id": "cr_Valasset",
				"xAxisCaption": "", // "Valid",
                "xAxisColumn":"Valid",
                "yAxisCaption": "Invalid",

				"chartTheme":"chartTheme2",
				//"chartType": "Polar",
				"chartTitle": "Total Valid & Out of Date Assets",
				"heightFactor":.7,
				"popScreen":"LiveDashboard.asset_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"columnWidth": .5,
				seriesArray:[
					{type:"barcolor",field:["Invalid"]}	
				]				
            },this)
			
			
			var ValidAssbyType_tmp = plf.addChart({
                		"id": "cr_ValidAssbyType",
				"xAxisCaption": "", //"Vehicle Category",
                		"xAxisColumn":"Vehicle_Category",
                		"yAxisCaption": "Vehicle",
				"chartTitle": "Total Valid & Out of Date Assets by Type",
				"heightFactor":.7,
				"popScreen":"LiveDashboard.asset_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"columnWidth": .5,
				"showLegend": true,
				"chartColors": "greenred",
				seriesArray:[
					{type:"bar",field:["Valid Assets","Out of Date Assets"]}					
				]				
            },this)
			
			
			var ValidAssbycar_tmp = plf.addChart({
                "id": "cr_ValidAssbycar",
				"xAxisCaption": "", //"Carrier",
                "xAxisColumn":"Carrier",
                "yAxisCaption": "Vehicle",
				"chartTitle": "Total Valid & Out of Date Assets by Carrier",
				"heightFactor":.7,
				"popScreen":"LiveDashboard.asset_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"columnWidth": .5,
				"showLegend": true,
				"chartColors": "greenred",
				seriesArray:[
					{type:"bar",field:["Valid Assets","Out of Date Assets"]}					
				]				
            },this)
			
			
			var Valdriver_tmp = plf.addChart({
				"id": "cr_Valdriver",
				"xAxisCaption": "", // "Valid",
                "xAxisColumn":"Valid",
                "yAxisCaption": "Invalid",
				"chartTheme":"chartTheme2",
				//"chartType": "Polar",
				"chartTitle": "Total Valid & Out of Date Drivers",
				"heightFactor":.7,
				"popScreen":"LiveDashboard.asset_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"columnWidth": .5,
				seriesArray:[
					{type:"barcolor",field:["Invalid"]}	
				]				
            },this)
			
			
			var ValidDribyCar_tmp = plf.addChart({
                "id": "cr_ValidDribyCar",
				"xAxisCaption":"", // "Carrier",
                "xAxisColumn":"Carrier",
                "yAxisCaption": "Driver",
				"chartTitle": "Total Valid & Out of Date Drivers by Carrier",
				"heightFactor":.7,
				"popScreen":"LiveDashboard.asset_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"columnWidth": .5,
				"showLegend": true,
				"chartColors": "greenred",
				seriesArray:[
					{type:"bar",field:["Valid Drivers","Out of Date Drivers"]}					
				]				
            },this)
			
			/*		
			var KmbySeg_tmp = plf.addChart({
                "id": "cr_KmbySeg",
				"xAxisCaption": "Logistics Group",
                "xAxisColumn":"LogGrp",
                "yAxisCaption": "KM",
				"chartTitle": "KM Driven by Logistics Group",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.asset_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"columnWidth": .5,
				seriesArray:[
					{type:"barcolor",field:["KM"]}					
				]				
            },this)
			
		
			
			
			var KmbyCat_tmp = plf.addChart({
				"id": "cr_KmbyCat",
				"xAxisCaption": "Vehicle Category",
                "xAxisColumn":"Vehicle_Category",
                "yAxisCaption": "KM",
				"chartTheme":"chartTheme2",
				"chartType": "Polar",
				"chartTitle": "KM Driven by Vehicle Category",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.asset_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"columnWidth": .5,
				seriesArray:[
					{type:"pie",field:["KM"]}	
				]				
            },this)
			
			
			
			var Reqbyseq_tmp = plf.addChart({
                "id": "cr_Reqbyseq",
				"xAxisCaption": "Logistics Group",
                "xAxisColumn":"LogGrp",
                "yAxisCaption": "Request Received",
				"chartTitle": "Request Received by Logistics Group",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.asset_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"columnWidth":.5,
				seriesArray:[
					{type:"barcolor",field:["cntreq"]}					
				]				
            },this)
			
			
			
			
			
			var Reqrecvsful_tmp = plf.addChart({
                "id": "cr_Reqrecvsful",
				"xAxisCaption": "Logistics Group",
                "xAxisColumn":"LogGrp",
                "yAxisCaption": "Request",
				"chartTitle": "Request Received vs Fulfilled by Logistics Group",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.asset_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"columnWidth": 1,
				seriesArray:[
					{type:"bar",field:["Received","Fulfilled"]}					
				]				
            },this)
			*/
			
			
			
			//mainpage.ptrMainSection.add(tmpRow1) //Add Header Section to Main Page  
			//tmpRequestPanel.add(TonnbySeg_tmp)
			//tmpAssetPanel.add(TonnageZoneCommodity_tmp);	
			
			tmpRequestPanel.add(KmbyCar_tmp);	
			tmpRequestPanel.add(Jpbyseg_tmp);	
			tmpRequestPanel.add(Jpbycar_tmp);	
			tmpRequestPanel.add(Valasset_tmp);	
			tmpRequestPanel.add(ValidAssbyType_tmp);	
			tmpRequestPanel.add(ValidAssbycar_tmp);	
			tmpRequestPanel.add(Valdriver_tmp);	
			tmpRequestPanel.add(ValidDribyCar_tmp);	

			
			/*
			tmpRequestPanel.add(KmbySeg_tmp);
			tmpRequestPanel.add(KmbyCat_tmp);		
			tmpRequestPanel.add(Reqbyseq_tmp);		
			tmpRequestPanel.add(Reqrecvsful_tmp);	
			*/

			mainpage.ptrMainSection.add(tmpRow1)						
			mainpage.ptrMainSection.add(tmpRequestPanel)
			

			mainpage.eventHandlers = 
			[
			
				{
						"controlid":"",
						"tasktype":"onload",
						"input":[""],
						"service":"TMSCoreTransportTS",
						"methodName":"initsegwiseTS"
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
					"methodName":"fetchSegmentTS"
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