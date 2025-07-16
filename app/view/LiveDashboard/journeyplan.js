/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	     Defect ID			               Remarks             
************************************************************************************************	
1.0.1       Raj             01-06-2016     72843 		  Corrected the spelling mistake     
1.0.2       Nageshwarrao    07-06-2016     72934          Stacked/Tiled graph to show journey status region wise               
1.0.3       Nageshwarrao    07-06-2016     72935   JP status and JP Date column should be shown in the 'Lost' and 'Overdue' widget drill  in JP dashboard  
1.0.4         Raj           09-June-16   72968            Shipment dashboard screen Link Added		  
1.0.5  Mohammed Razhith.S.A	  15-June-16 73011            Changing From To Orgin                                         
************************************************************************************************/
Ext.define('CueTrans.view.LiveDashboard.journeyplan',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Journey Plan Current Dashboard";
            // Add Toolbar
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
				/*{"name":"Cargo","linkid":"db_cargodashboard"}*/
				
			]
			plf.columns = 5
			var tmpRow1 = plf.addColumnSection({});	
			tmpRow1.add(
				plf.addCombo({"label":"Origin Region",id:"strFromRegion"}),
				plf.addCombo({"label":"Destination Region",id:"strToRegion"}),
				plf.addDate({"label":"From Date",id:"strFromDate",mandatory:"true"}),
				plf.addDate({"label":"To Date",id:"strToDate",mandatory:"true"}),
				plf.addButton({"label":"Search",id:"btnSearch"})
				
				
					   )
		/*	plf.columns = 1 */
            var tmpJourneyPanel = plf.addGenSection({"cls":"chart_panel_container"});	
            /*Svg starts here*/
			tmpJourneyPanel.add(
				plf.addSvg({
					"id": "journeyPlanSvgId",
					"svgID": "journeyPlanSvgId",
					"columnWidth": 1,					
					"heightFactor":.2,
					"svgData": {
						"iJPOpen": "",
						"iJPOpenPrv": "",
						"iJPOnTime": "",
						"iJPOnTimePrv": "",
						"iJPDelay":"",
						"iJPDelayPrv":"",					
						"iJPOverdue": "",
						"iJPOverduePrv":"",
						"iJPLost":"",
						"iJPLostPrv":"",
						"iJPRest":"",
						"iJPRestPrv":"",
						"iJPDayRest":"",
						"iJPDayRestPrv":"",
						"iJPClosed":"",
						"iJPClosedPrv":"",
						"iJPTruckReleasePending":"",
						"iJPTruckReleasePendingPrv":""
					},
					"svgLinks":
						[	
							{"linkId":"iJPOpen","popScreen":"LiveDashboard.journey_dtl","popMethodName":"TMSJPCUROPEN_TS"},
							{"linkId":"iJPOpenPrv","popScreen":"LiveDashboard.journey_dtl","popMethodName":"TMSJPPRVOPEN_TS"},
							{"linkId":"iJPOnTime","popScreen":"LiveDashboard.journey_dtl","popMethodName":"TMSJPCUROT_TS"},
							{"linkId":"iJPOnTimePrv","popScreen":"LiveDashboard.journey_dtl","popMethodName":"TMSJPPRVOT_TS"},
							{"linkId":"iJPDelay","popScreen":"LiveDashboard.journey_dtl","popMethodName":"TMSJPCURDL_TS"},
							{"linkId":"iJPDelayPrv","popScreen":"LiveDashboard.journey_dtl","popMethodName":"TMSJPPRVDL_TS"},
							{"linkId":"iJPOverdue","popScreen":"LiveDashboard.journey_dtl","popMethodName":"TMSJPCUROD_TS"},
							{"linkId":"iJPOverduePrv","popScreen":"LiveDashboard.journey_dtl","popMethodName":"TMSJPPRVOD_TS"},
							{"linkId":"iJPLost","popScreen":"LiveDashboard.journey_dtl","popMethodName":"TMSJPCURLT_TS"},
							{"linkId":"iJPLostPrv","popScreen":"LiveDashboard.journey_dtl","popMethodName":"TMSJPPRVLT_TS"},
							{"linkId":"iJPRest","popScreen":"LiveDashboard.journey_dtl","popMethodName":"TMSJPCURRT_TS"},
							{"linkId":"iJPRestPrv","popScreen":"LiveDashboard.journey_dtl","popMethodName":"TMSJPPRVRT_TS"},
							{"linkId":"iJPDayRest","popScreen":"LiveDashboard.journey_dtl","popMethodName":"TMSJPCURDRT_TS"},
							{"linkId":"iJPDayRestPrv","popScreen":"LiveDashboard.journey_dtl","popMethodName":"TMSJPPRVDRT_TS"},
							{"linkId":"iJPClosed","popScreen":"LiveDashboard.journey_dtl","popMethodName":"TMSJPCURJPC_TS"},					
							{"linkId":"iJPClosedPrv","popScreen":"LiveDashboard.journey_dtl","popMethodName":"TMSJPPRVJPC_TS"},
							{"linkId":"iJPTruckReleasePending","popScreen":"LiveDashboard.journey_dtl","popMethodName":"TMSJPCURTRL_TS"},
							{"linkId":"iJPTruckReleasePendingPrv","popScreen":"LiveDashboard.journey_dtl","popMethodName":"TMSJPPRVTRL_TS"}
						],
					"svgURL": "resources/images/svg/LiveDashboard/JourneyPlan.svg"
            },this))
			/*Svg ends here*/
			
			
			// Grid sec Lost Vehicles begins
			var gridLostSummary=
			[										
				{columnname:"JP Open From",dataname:"JP_OPEN_FROM",datatype:"string",width:80},					
				{columnname:"Vehicle",dataname:"TRUCK_CODE",datatype:"string",width:90},				
				{columnname:"Way Point",dataname:"WAY_POINT",datatype:"string",width:80},
				{columnname:"Planned Time",dataname:"PLANNED_TIME",datatype:"string",width:80},
				{columnname:"Time Overdue",dataname:"TIME_OVERDUE",datatype:"string",width:80},
				{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:90},
				{columnname:"Contact No",dataname:"CONTACT_NO",datatype:"string",width:90},
				{columnname:"JM Name",dataname:"JOURNEY_MANAGER",datatype:"string",width:90},
                            {columnname:"Journey Date",dataname:"JOURNEY_DT",datatype:"string",width:80},
				{columnname:"Journey Status",dataname:"JOURNEY_STAT",datatype:"string",width:80},
				{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:95,linkId:"jpnolink","tooltip":"Click here to launch the Journey screen."}		
			]
			var gridLostDtl=
			{
				title:"Lost Vehicles",
				id:"journeyPlanLostVehicleGrid",				
				detail:gridLostSummary,				
				readonly:true,				
				removeTbar:true,
				removePaging:true,
				margin:2,
				heightFactor:.4,
				columnWidth:.75,
				widthBasis:"flex",
			}
			var tmpgridLostSummary = plf.addGrid(gridLostDtl,this) 
			tmpJourneyPanel.add(tmpgridLostSummary)
			// Grid sec Lost Vehicles ends
			
			/*Svg Risk Assessment starts here*/
			
			tmpJourneyPanel.add(
				plf.addSvg({
					"id": "jpRiskAssessmentSvgId",
					"svgID": "jpRiskAssessmentSvgId",
					"columnWidth": .25,					
					"heightFactor":.4,
					"svgData": {
						"iHigh": "",
						"iMedium": "",
						"iLow": "",
						"iJPNightDrive": ""
					},
					"svgLinks":
						[	
							{"linkId":"iHigh","popScreen":"LiveDashboard.journey_dtl","popMethodName":"TMSJPHIGH_TS"},
							{"linkId":"iMedium","popScreen":"LiveDashboard.journey_dtl","popMethodName":"TMSJPMEDIUM_TS"},
							{"linkId":"iLow","popScreen":"LiveDashboard.journey_dtl","popMethodName":"TMSJPLOW_TS"},
							{"linkId":"iJPNightDrive","popScreen":"LiveDashboard.journey_dtl","popMethodName":"TMSJPNIGHTAPP_TS"}
						],
					"svgURL": "resources/images/svg/LiveDashboard/RiskAssessment.svg"
            },this))
			/*Svg Risk Assessment ends here*/
			
			// Grid sec Overdue Vehicles begins
			var gridOverdueSummary=
			[										
				{columnname:"JP Open From",dataname:"JP_OPEN_FROM",datatype:"string",width:80},					
				{columnname:"Vehicle",dataname:"TRUCK_CODE",datatype:"string",width:90},				
				{columnname:"Way Point",dataname:"WAY_POINT",datatype:"string",width:80},
				{columnname:"Planned Time",dataname:"PLANNED_TIME",datatype:"string",width:80},
				{columnname:"Time Overdue",dataname:"TIME_OVERDUE",datatype:"string",width:80},
				{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:90},
				{columnname:"Contact No",dataname:"CONTACT_NO",datatype:"string",width:90},
				{columnname:"JM Name",dataname:"JOURNEY_MANAGER",datatype:"string",width:90},
                            {columnname:"Journey Date",dataname:"JOURNEY_DT",datatype:"string",width:80},
				{columnname:"Journey Status",dataname:"JOURNEY_STAT",datatype:"string",width:80},
				{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:95,linkId:"jpnolink","tooltip":"Click here to launch the Journey screen."}	
			]
			var gridOverdueDtl=
			{
				title:"Overdue Vehicles",
				id:"journeyPlanOverDueVehicleGrid",				
				detail:gridOverdueSummary,				
				readonly:true,				
				removeTbar:true,
				removePaging:true,
				margin:2,
				heightFactor:.4,
				columnWidth:.75,
				widthBasis:"flex",
			}
			var tmpgridOverdueSummary = plf.addGrid(gridOverdueDtl,this) 
			// Grid sec Overdue Vehicles ends
			
			// Grid sec Violation begins
			var gridViolationSummary=
			[										
				/*{columnname:"Vehicle",dataname:"TRUCK_CODE",datatype:"string",width:80},
				{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:120},*/
				{columnname:"Violation",dataname:"VIO_DESC",datatype:"string",width:120},
				{columnname:"Count",dataname:"VIOLATION_CNT",datatype:"string",width:90,colAlign:'right',linkId:"db_violationdtl",gridpopup:true,tooltip:"Click here to view journey details."}		
			]
			var gridViolationDtl=
			{
				title:"Violation",
				id:"Violationdtl",				
				detail:gridViolationSummary,				
				readonly:true,				
				removeTbar:true,
				removePaging:true,
				margin:2,
				heightFactor:.4,
				columnWidth:.25,
				widthBasis:"flex",
			}
			var tmpgridViolationSummary = plf.addGrid(gridViolationDtl,this) 
			// Grid sec Violation ends
			
			/*Delay reasons againt Journey Plan*/
			var tmpDelayReason = plf.addChart({
                "id": "JourDelyReason",
				"xAxisCaption": "",
                "xAxisColumn":"delay_Reason",
                "yAxisCaption": "Count",
				"chartTitle": "Delay Reasons Against Journey Plan",
				"heightFactor":.7,
				"popScreen":"LiveDashboard.journey_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initjourdelay",
				"columnWidth": .5,
				seriesArray:[
					{type:"barcolor",field:["cnt"]}					
				]				
            },this)
			
            /*Delay Action Taken againt Journey Plan*/
			var tmpDelayAction = plf.addChart({
                "id": "JourDelyAction",
				"xAxisCaption": "",
                "xAxisColumn":"delay_action",
                "yAxisCaption": "Count",
				"chartTitle": "Delay Action Taken Against Journey Plan",
				"heightFactor":.7,
				"popScreen":"LiveDashboard.journey_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initjourdelayAct",
				"columnWidth": .5,
				seriesArray:[
					{type:"barcolor",field:["cnt"]}					
				]				
            },this)		

             /*Region-wise Journey Plan Summary*/
			var tmpJourStat = plf.addChart({
                "id": "JourStatDboard",
				"xAxisCaption": "",
                "xAxisColumn":"Status",
                "yAxisCaption": "Count",
				"chartTitle": "Region-wise Journey Plan Summary",
				"heightFactor":.7,
				"popScreen":"LiveDashboard.journey_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initjrplansumm",
				"columnWidth": 1.0,
                            "chartColors": "greenredorange",
                            "showLegend": true,
				seriesArray:[
					{type:"barstack",field:["South","North","Coastal"]}					
				]				
            },this)				
			
			tmpJourneyPanel.add(tmpgridOverdueSummary)
			tmpJourneyPanel.add(tmpgridViolationSummary)
			tmpJourneyPanel.add(tmpDelayReason)
			tmpJourneyPanel.add(tmpDelayAction)
			tmpJourneyPanel.add(tmpJourStat)
			mainpage.ptrMainSection.add(tmpRow1)
			mainpage.ptrMainSection.add(tmpJourneyPanel)
			//mainpage.ptrMainSection.add(tmpDelayReason)
			//mainpage.ptrMainSection.add(tmpDelayAction)
			//mainpage.ptrMainSection.add(tmpPanel)
			/*Svg ends here*/
			mainpage.eventHandlers = 
			[
			{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strFromRegion","strToRegion","strFromDate","strToDate"],
					"service":"TMSCoreTransportTS",
					"methodName":"serfetchjourneyplan"
			},
			{
					"controlid":"",
					"tasktype":"onload",
					"input":["strFromRegion","strToRegion","strFromDate","strToDate"],
					"service":"TMSCoreTransportTS",
					"methodName":"serinitjourneyplan"
			},	
			{
				"tasktype":"proto",
				"filename":"dashboard/Inspectioncurrent.json"
			}
			];		
			mainpage.gridPopupLinks=
			{
				"db_violationdtl":
				{
					"dest":"LiveDashboard.journey_dtl",
					"popMethodName":"fetchJPViolationDetails",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"VIO_DESC","dest":"selChartSeries"}							
							]
				}
			}
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
			"jpnolink":
				{
					"dest":"journey_management.JourneyPlanUpdateTms",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"JP_NO","dest":"strJourneyPlanNo"}
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
			this.callParent(arguments);
        },
		triggerLink:function()
		{
		alert("Test");
		},
             triggerLink:function timedCount()
{
// call here the function that reloads your grid's DataStore
t=setTimeout("timedCount()",1000)
}

    });