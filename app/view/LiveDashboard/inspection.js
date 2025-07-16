/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	 Sivaraman                                                                   		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		  Sivaraman       22/01/2016   67621                    Add Chart for Rejection. 
1.0.2         Raj             09-June-16   72968            Shipment dashboard screen Link Added
************************************************************************************************/
Ext.define('CueTrans.view.LiveDashboard.inspection',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Inspection Current Dashboard";
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
				/*plf.addCombo({"label":"From Zone",id:"strFromRegion"}),
				plf.addCombo({"label":"To Zone",id:"strToRegion"}),*/
				plf.addDate({"label":"From Date",id:"strFromDate",mandatory:"true"}),
				plf.addDate({"label":"To Date",id:"strToDate",mandatory:"true"}),
				plf.addButton({"label":"Search",id:"btnSearch"})
				)
			/*plf.columns = 1*/
            var tmpInspectionPanel = plf.addGenSection({"cls":"chart_panel_container"});	
            /*Svg starts here*/
			tmpInspectionPanel.add(
				plf.addSvg({
					"id": "InspectionDash",
					"svgID": "InspectionDash",
					"columnWidth": 1,					
					"heightFactor":.2,
					"svgData": {
						"iTotalInsp": "",
						"iNotAssigned": "",
						"iVehicleInspPending": "",
						"iLoadInspPending": "",
						"iReinspection":"",
						"iInspectionComp":"",						
						"iRejected": "",
						"iNoShow":"",
						"iDeficiency":""
					},
					"svgLinks":
						[	
							{"linkId":"iTotalInsp","popScreen":"LiveDashboard.inspection_dtl","popMethodName":"TMSLiveInspDashTOTInsp"},
							{"linkId":"iNotAssigned","popScreen":"LiveDashboard.inspection_dtl","popMethodName":"TMSLiveInspDashNOTASInsp"},
							{"linkId":"iVehicleInspPending","popScreen":"LiveDashboard.inspection_dtl","popMethodName":"TMSLiveInspDashVEHInsp"},
							{"linkId":"iLoadInspPending","popScreen":"LiveDashboard.inspection_dtl","popMethodName":"TMSLiveInspDashLOADInsp"},
							{"linkId":"iReinspection","popScreen":"LiveDashboard.inspection_dtl","popMethodName":"TMSLiveInspDashREINSP"},
							{"linkId":"iInspectionComp","popScreen":"LiveDashboard.inspection_dtl","popMethodName":"TMSLiveInspDashCOMP"},							
							{"linkId":"iRejected","popScreen":"LiveDashboard.inspection_dtl","popMethodName":"TMSLiveInspDashREJ"},
							{"linkId":"iNoShow","popScreen":"LiveDashboard.inspection_dtl","popMethodName":"TMSLiveInspDashSC"},
							{"linkId":"iDeficiency","popScreen":"LiveDashboard.inspection_dtl","popMethodName":"TMSLiveInspDashDEF"}
						],
					"svgURL": "resources/images/svg/LiveDashboard/inspection.svg"
            },this))
			
			// Grid sec begins
			var gridInspectorSummary=
			[					
				{columnname:"Inspector",dataname:"inspector",datatype:"string",width:100},		
				{columnname:"Total",dataname:"TotalInspections",datatype:"string",width:70,colAlign:'right'},
				{columnname:"Pending",dataname:"insppending",datatype:"string",width:70,colAlign:'right'},
				//{columnname:"Inspector Available After(hrs)",dataname:"Free",datatype:"string",width:200,colAlign:'right',weightPrecision:2},				
			]
			var gridInspectorDtl=
			{
				title:"Inspector Summary",
				id:"inspectordtl",				
				detail:gridInspectorSummary,				
				readonly:true,				
				removeTbar:true,
				removePaging:true,
				margin:2,
				heightFactor:.5,
				columnWidth:.5,
				widthBasis:"flex",
			}
			var tmpgridInspectorSummary = plf.addGrid(gridInspectorDtl,this) 
			// Grid sec ends
			
			/*Completed Inspection Summary starts here*/
			var InspCompleted_tmp = plf.addChart({
                "id": "chart_inspCompleted",
				"xAxisCaption": "",
                "xAxisColumn":"insComp",
                "yAxisCaption": "Inspection Count",
				"chartTitle": "Completed Inspection Summary",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.inspection_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"TMSLiveInspDashINSPCOMP",
				"columnWidth": .5,
				"chartColors": "greenorange",
				"showLegend": true,
                 seriesArray:[
					{type:"bar",field:["Load","Vehicle"]}					
				]				
            },this)
			/*Completed Inspection Summary starts here*/
			
			var Rejection_cnt_tmp = plf.addChart({
			"id": "cr_cntByRejection",
			"xAxisCaption": "",
			"xAxisColumn":"reject",
			"yAxisCaption": "Inspection Count",
			"chartTitle": "Rejection Remarks",
			"heightFactor":.5,
			"popScreen":"LiveDashboard.rejection_dtl",
			"popSeriesCtrl":"selChartSeries",
			"popValueCtrl":"selChartValue",
			"popMethodName":"TMSLiveInspDashREJREM",			
			"columnWidth":.5,
			//"chartColors": "greenred",
			//"showLegend": true,
			seriesArray:[
				{type:"barcolor",field:["Count"]}					
			]				
		},this)
		
			/*Inspection Type starts here*/
			var InspType_tmp = plf.addChart({
                "id": "chart_inspType",
				"xAxisCaption": "",
                "xAxisColumn":"insType",
                "yAxisCaption": "Inspection Count",
				"chartTitle": "Inspection Type",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.inspection_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"TMSLiveInspDashINSPTYPE",				
				"columnWidth": .5,
				seriesArray:[
					{type:"barcolor",field:["cnt"]}					
				]				
            },this)
			
			var InsprejType_tmp = plf.addChart({
                "id": "chart_rejType",
				"xAxisCaption": "",
                "xAxisColumn":"rejType",
                "yAxisCaption": "Inspection Count",
				"chartTitle": "Inspection Rejection Checklist",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.rejectiontype_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"TMSLiveInsptypeDashREJREM",				
				"columnWidth": 1.0,
				seriesArray:[
					{type:"barcolor",field:["cnt"]}					
				]				
            },this)
			/*Completed Inspection Summary starts here*/
			
			tmpInspectionPanel.add(tmpgridInspectorSummary)		
			tmpInspectionPanel.add(InspCompleted_tmp)
			tmpInspectionPanel.add(Rejection_cnt_tmp)			
			tmpInspectionPanel.add(InspType_tmp)
			tmpInspectionPanel.add(InsprejType_tmp)
			mainpage.ptrMainSection.add(tmpRow1)
			mainpage.ptrMainSection.add(tmpInspectionPanel)
			//mainpage.ptrMainSection.add(tmpPanel)
			/*Svg ends here*/
			mainpage.eventHandlers = 
			[
			{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":[/*"strFromRegion","strToRegion",*/"strFromDate","strToDate"],
					"service":"TMSCoreTransportTS",
					"methodName":"TMSLiveInspectionSrchDash"
			},
			{
					"controlid":"",
					"tasktype":"onload",
					"input":[/*"strFromRegion","strToRegion",*/"strFromDate","strToDate"],
					"service":"TMSCoreTransportTS",
					"methodName":"TMSLiveInspectionDash"
			},	
			{
				"tasktype":"proto",
				"filename":"dashboard/Inspectioncurrent.json"
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
		}

    });