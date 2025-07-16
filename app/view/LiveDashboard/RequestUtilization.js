/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
		                                   
************************************************************************************************/
Ext.define('CueTrans.view.LiveDashboard.SegementWise',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "SegementWise Dashboard";
            // Add Toolbar
            mainpage.toolbarSectionFlag = true;
			//mainpage.liveScreenFlag=true;
			mainpage.liveScreenFlag=true;

			mainpage.toolbarLinks=
			[		
				
				{"name":"Customer Request","linkid":"db_requestdash"},
				{"name":"Load Planning","linkid":"db_vehicledemandplandash"},
				{"name":"Vehicle Demand Planning","linkid":"db_vehicledemandplanning"},
				{"name":"Inspection","linkid":"db_inspectiondash"},
				{"name":"Journey Plan","linkid":"db_journeydash"},
				{"name":"Cargo","linkid":"db_cargodashboard"}	
				
			]
            

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
			
			/*Utilisation by day by Zone starts here*/
			var UtilbyDay_tmp = plf.addChart({
                "id": "cr_UtilbyDay",
				"xAxisCaption": "Date",
                "xAxisColumn":"Date",
                "yAxisCaption": "Asset Count",
				"chartTitle": "Asset utilization by day",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.asset_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"columnWidth": 1,
				seriesArray:[
					{type:"bar",field:["cnt"]}					
				]				
            },this)
			/*Utilisation by day by Zone ends here*/
			
			/*Utilisation by day by month starts here*/
			var UtilbyMon_tmp = plf.addChart({
                "id": "cr_UtilbyMon",
				"xAxisCaption": "Month",
                "xAxisColumn":"Month",
                "yAxisCaption": "Asset Count",
				"chartTitle": "Asset utilization by month",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.asset_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"columnWidth": 1,
				seriesArray:[
					{type:"bar",field:["cnt"]}					
				]				
            },this)
			/*Utilisation by day by month ends here*/
			
			/* Asset Utilisation by category starts here*/
			var UtilbyCat_tmp = plf.addChart({
                "id": "cr_UtilbyCat",
				"xAxisCaption": "Vehicle Category",
                "xAxisColumn":"Vehicle_Category",
                "yAxisCaption": "Asset Count",
				"chartTitle": "Asset utilization by Category",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.asset_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"columnWidth": 1,
				seriesArray:[
					{type:"bar",field:["cnt"]}					
				]				
            },this)
			/*Asset Utilisation by category ends here*/
			
			/* Utilisation % starts here*/
			var Utilper_tmp = plf.addChart({
				"id": "cr_Utilper",
				"xAxisCaption": "Utilized",
                "xAxisColumn":"Utilized",
                "yAxisCaption": "Idle",
				"chartTheme":"chartTheme2",
				"chartType": "Polar",
				"chartTitle": "Total utilization %",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.asset_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"columnWidth": 1,
				seriesArray:[
					{type:"pie",field:["cnt"]}	
				]				
            },this)
			/*Utilisation %  ends here*/
			
			
			/* Asset utilisation starts here*/
			var Assetused_tmp = plf.addChart({
                "id": "cr_Assetused",
				"xAxisCaption": "Date",
                "xAxisColumn":"Date",
                "yAxisCaption": "Asset Percentage",
				"chartTitle": "Asset used/idle by date",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.asset_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"columnWidth": 1,
				seriesArray:[
					{type:"bar",field:["cnt"]}					
				]				
            },this)
			/*Carrier utilisation ends here*/
			
			
			/* Carrierwise utilisation starts here*/
			var CarwiseAsset_tmp = plf.addChart({
                "id": "cr_CarwiseAsset",
				"xAxisCaption": "Date",
                "xAxisColumn":"Date",
                "yAxisCaption": "Asset Count",
				"chartTitle": "Carrier wise utilization",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.asset_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initassetdetails",
				"columnWidth": 1,
				seriesArray:[
					{type:"bar",field:["cnt"]}					
				]				
            },this)
			/*Carrierwise utilisation ends here*/
			
					
			
			//mainpage.ptrMainSection.add(tmpRow1) //Add Header Section to Main Page  
			tmpRequestPanel.add(UtilbyDay_tmp)
			//tmpAssetPanel.add(TonnageZoneCommodity_tmp);			
			tmpRequestPanel.add(UtilbyMon_tmp);
			tmpRequestPanel.add(UtilbyCat_tmp);		
			tmpRequestPanel.add(Utilper_tmp);		
			//tmpAssetPanel.add(Assetused_tmp);		
			tmpRequestPanel.add(CarwiseAsset_tmp);	
			
						
			mainpage.ptrMainSection.add(tmpRequestPanel)
			

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