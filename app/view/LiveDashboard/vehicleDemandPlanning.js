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
Ext.define('CueTrans.view.LiveDashboard.vehicleDemandPlanning',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Vehicle Demand Planning";
            
			//mainpage.liveScreenFlag=false;
            mainpage.toolbarSectionFlag = true;
			//mainpage.liveScreenFlag=false;
			mainpage.toolbarLinks=
			[			
			{"name":"Customer Request","linkid":"db_requestdash"},
			{"name":"Load Planning","linkid":"db_vehicledemandplandash"},
			{"name":"Vehicle Demand Planning","linkid":"db_vehicledemandplanning"},
			{"name":"Inspection","linkid":"db_inspectiondash"},
			{"name":"Journey Plan","linkid":"db_journeydash"}
			/*{"name":"Cargo","linkid":"db_cargodashboard"}	*/		
			]
			plf.columns = 5
			var tmpRow1 = plf.addColumnSection({});	
			tmpRow1.add(
				plf.addCombo({"label":"From Zone",id:"strFromRegion"}),
				plf.addCombo({"label":"To Zone",id:"strToRegion"}),
				plf.addDate({"label":"From Date",id:"strFromDate",mandatory:"true"}),
				plf.addDate({"label":"To Date",id:"strToDate",mandatory:"true"}),
				plf.addButton({"label":"Search",id:"btnSearch"})
				)
            plf.columns = 3
			var filterSection = plf.addColumnSection({});	
			filterSection.add
					  (
				plf.addDate({"label":"Date","id":"dtDate"}),
				plf.addCombo({"label":"Planning Location",id:"strOrigin"}),				
				plf.addButton({"label":"Fetch Details",id:"btnSearch"})
					   )
					   
			plf.columns = 1
			var svgSection	=	plf.addGenSection({"cls":"chart_panel_container"});
			/*Svg starts here*/
			svgSection.add(
				plf.addSvg({
					"id": "vehdemandDash",
					"svgID": "vehdemandDash",
					"columnWidth": 1,					
					"heightFactor":.27,
					"svgData": {
						"iJTotDemand": "",
						"iPlanTrip": "",
						"iPlanLoad": "",
						"iPlanShipments": "",
						"iEffTrips":"",
						"iEffLoads":"",						
						"iEffShipments": "",
						"iTotCapacity":"",
						"iAllocCapacity":"",
						"iAvlCapacity":"",
						"iStorageCapacity":""
					},	
					"svgLinks":
						[								
						],
					"svgURL": "resources/images/svg/LiveDashboard/vehicleDemandPlaning.svg"
            },this))
			
            var tmpNoLoadTripLegPanel = plf.addColumnSection({});			
			
			// Grid section Noload Trip Legs begins
			var NoLoadTripLegSummary=
			[										
				{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:120},
				{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:100},
				{columnname:"Noload Dist(km)",dataname:"NOLOAD_DIST",datatype:"string",width:100,colAlign:'right'},
				{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:100},
				{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:100}					
			]
			var NoLoadTripLegDtl=
			{
				title:"Noload Trip Legs",
				id:"NoLoadTripLeg",				
				detail:NoLoadTripLegSummary,				
				readonly:true,				
				removeTbar:true,
				removePaging:true,
				margin:2,
				heightFactor:.30,
				columnWidth:.5,
				widthBasis:"flex",
				visibleRow:10
			}
			var NoLoadTripLegDtlSummary = plf.addGrid(NoLoadTripLegDtl,this) 
			
			// Grid section Noload Trip Legs ends
			
			// Grid section Unmapped Loads begins
			var UnmappedLoadSummary=
			[										
				{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:120},
				{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:100},				
				{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:100},
				{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:100}					
			]
			var UnmappedLoadsDtl=
			{
				title:"Unmapped Loads",
				id:"UnmappedLoads",				
				detail:UnmappedLoadSummary,				
				readonly:true,				
				removeTbar:true,
				removePaging:true,
				margin:2,
				heightFactor:.30,
				columnWidth:.5,
				widthBasis:"flex",
				visibleRow:10
			}
			var UnmappedLoadsSummary = plf.addGrid(UnmappedLoadsDtl,this) 
			
			// Grid section Unmapped Loads ends
			
			var tmpPanel = plf.addColumnSection({});
			
			// Grid section Unoptimized Loads in Trip begins
			var UnoptimizedSummary=
			[										
				{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:120},
				{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:100},
				{columnname:"Utilization %",dataname:"UTIL",datatype:"string",width:100,colAlign:'right'},
				{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:100},
				{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:100}					
			]
			var UnoptimizedDtl=
			{
				title:"Unoptimized Loads in Trip",
				id:"Unoptimized",				
				detail:UnoptimizedSummary,				
				readonly:true,				
				removeTbar:true,
				removePaging:true,
				margin:2,
				heightFactor:.30,
				columnWidth:.5,
				widthBasis:"flex",
				visibleRow:10
			}
			var UnoptimizedDtlSummary = plf.addGrid(UnoptimizedDtl,this) 
			// Grid section Unoptimized Loads in Trip ends
			
			
			// Grid section Unmapped Shipments begins
			var UnmappedShipSummary=
			[										
				{columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",width:120},
				{columnname:"Weight(ton)",dataname:"WEIGHT",datatype:"string",width:100,colAlign:'right'},				
				{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:100},
				{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:100}					
			]
			var UnmappedShipmentsDtl=
			{
				title:"Unmapped Shipments",
				id:"UnmappedShipments",				
				detail:UnmappedShipSummary,				
				readonly:true,				
				removeTbar:true,
				removePaging:true,
				margin:2,
				heightFactor:.30,
				columnWidth:.5,
				widthBasis:"flex",
				visibleRow:10
			}
			var UnmappedShipmentsSummary = plf.addGrid(UnmappedShipmentsDtl,this) 
			// Grid section Unmapped Shipments ends	

			// Grid section Demand Vs Capacity begins
			var demandvscapacitySummary=
			[										
				{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:120},
				{columnname:"Vehicle Demand (count)",dataname:"VEH_DEMAND_CNT",datatype:"string",width:100,colAlign:'right'},				
				{columnname:"Available Vehicles (count)",dataname:"AVL_VEH_CNT",datatype:"string",width:100,colAlign:'right'},
				{columnname:"Excess/Shortage (count)",dataname:"EX_CNT",datatype:"string",width:100,colAlign:'right'},
				{columnname:"Planned Capacity (ton)",dataname:"VEH_DEMAND_TON",datatype:"string",width:100,colAlign:'right'},				
				{columnname:"Available Capacity (ton)",dataname:"AVL_VEH_TON",datatype:"string",width:100,colAlign:'right'},
				{columnname:"Excess/Shortage (capacity)",dataname:"EX_TON",datatype:"string",width:100,colAlign:'right'}
			]
			var demandvscapacityDtl=
			{
				title:"Demand vs Capacity",
				id:"demandvscapacity",				
				detail:demandvscapacitySummary,				
				readonly:true,				
				removeTbar:true,
				removePaging:true,				
				columnWidth:1,
				widthBasis:"flex",
				visibleRow:10
			}
			var demandvscapacitySum = plf.addGrid(demandvscapacityDtl,this) 
			var tmpPanel1 = plf.addColumnSection({});
			tmpPanel1.add(demandvscapacitySum)
			// Grid section Demand Vs Capacity ends
			
			tmpNoLoadTripLegPanel.add(NoLoadTripLegDtlSummary)
			tmpNoLoadTripLegPanel.add(UnmappedLoadsSummary)
			tmpPanel.add(UnoptimizedDtlSummary)
			tmpPanel.add(UnmappedShipmentsSummary)
			
			//mainpage.ptrMainSection.add(filterSection)
			mainpage.ptrMainSection.add(tmpRow1)
			mainpage.ptrMainSection.add(svgSection)
			mainpage.ptrMainSection.add(tmpNoLoadTripLegPanel)
			mainpage.ptrMainSection.add(tmpPanel)
			mainpage.ptrMainSection.add(tmpPanel1)          
			mainpage.eventHandlers = 
			[
			{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strFromRegion","strToRegion","strFromDate","strToDate"],
					"service":"TMSCoreTransportTS",
					"methodName":"fetchVehDemandPlannDBTS"
			},
			{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"TMSCoreTransportTS",
					"methodName":"initVehDemandPlanDBTS"
			}		
				
			];
/*
,
			{
				"tasktype":"proto",
				"filename":"dashboard/vehdemandplanningcurrent.json"
			}	
*/			
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