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
Ext.define('CueTrans.view.LiveDashboard.cargoDashboard',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Cargo Dashboard";
			
            // Add Toolbar
            mainpage.toolbarSectionFlag = true;	
			mainpage.liveScreenFlag=true;
			mainpage.toolbarLinks=
			[			
			{"name":"Customer Request","linkid":"db_requestdash"},
			{"name":"Load Planning","linkid":"db_vehicledemandplandash"},
			/*{"name":"Vehicle Demand Planning","linkid":"db_vehicledemandplanning"},*/
			{"name":"Inspection","linkid":"db_inspectiondash"},
			{"name":"Journey Plan","linkid":"db_journeydash"}
			/*{"name":"Cargo","linkid":"db_cargodashboard"}	*/		
			]
		
			plf.columns = 4
			var tmpRow1 = plf.addColumnSection({});	
			tmpRow1.add(
				plf.addCombo({"label":"Zone",id:"strRegion"}),
				//plf.addCombo({"label":"Location",id:"strLocation"}),
				plf.addButton({"label":"Search",id:"btnSearch"})
					   )
				
            var tmpCargoDash = plf.addGenSection({"cls":"chart_panel_container"});	
			
			// Last 30 Mins grid sec begins
			var gridlastobj=
			[										
				{columnname:"Truck No",dataname:"TRUCK_CODE",datatype:"string",width:100},
				{columnname:"Event",dataname:"EVENT",datatype:"string",width:240}				
			]
			var gridlastDtl=
			{
				title:"Last 30 Minutes",
				id:"cargoLast30MinutesGrid",				
				detail:gridlastobj,
				readonly:true,				
				removeTbar:true,
				removePaging:true,
				margin:2,
				heightFactor:.71,
				columnWidth:.25,
				widthBasis:"flex"
			}
			var gridlastsec = plf.addGrid(gridlastDtl,this) 			
			// Last 30 Mins grid sec ends
			
			// Inbound grid sec begins
			var gridInboundobj=
			[										
				{columnname:"Truck No",dataname:"TRUCK_CODE",datatype:"string",width:100},
				{columnname:"Last Stop ",dataname:"LAST_STOP",datatype:"string",width:100},
				{columnname:"Arrival Time",dataname:"ARRIVAL_TIME",datatype:"string",width:100},
				{columnname:"From",dataname:"FROM",datatype:"string",width:100},
				{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:80},
				{columnname:"Waybill No",dataname:"WAYBILL_NO",datatype:"string",width:70,linkId:"loadnolink","tooltip":"Click here to launch the Load screen."},
				{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:80,linkId:"jpnolink","tooltip":"Click here to launch the Journey screen."}				
			]
			var gridInboundDtl=
			{
				title:"Inbound",
				id:"cargoInBoundGrid",				
				detail:gridInboundobj,
				readonly:true,				
				removeTbar:true,
				removePaging:true,
				margin:2,
				heightFactor:.35,
				columnWidth:.75,
				widthBasis:"flex"
			}
			var tmpInbound = plf.addGrid(gridInboundDtl,this) 			
			// Inbound grid sec begins
			
			
			// Outbound grid sec begins
			var gridOutboundobj=
			[										
				{columnname:"Truck No",dataname:"TRUCK_CODE",datatype:"string",width:100},
				{columnname:"Next Stop ",dataname:"NEXT_STOP",datatype:"string",width:100},
				{columnname:"Departure Time",dataname:"ARRIVAL_TIME",datatype:"string",width:100},
				{columnname:"To",dataname:"TO",datatype:"string",width:100},
				{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:80},
				{columnname:"Waybill No",dataname:"WAYBILL_NO",datatype:"string",width:70,linkId:"loadnolink","tooltip":"Click here to launch the Load screen."},
				{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:80,linkId:"jpnolink","tooltip":"Click here to launch the Journey screen."}				
			]
			var gridOutboundDtl=
			{
				title:"Outbound",
				id:"cargoOutBoundGrid",				
				detail:gridOutboundobj,
				readonly:true,				
				removeTbar:true,
				removePaging:true,
				margin:2,
				heightFactor:.35,
				columnWidth:.75,
				widthBasis:"flex"
			}
			var tmpOutbound = plf.addGrid(gridOutboundDtl,this) 			
			// Outbound grid sec ends here	
			var tmpCargoDashStatus = plf.addGenSection({"cls":"chart_panel_container"});	
			var status_tmp = plf.addChart({
			"id": "cr_reqstatus",
			"xAxisCaption": "",
			"xAxisColumn":"reqstatus",
			"yAxisCaption": "Count",
			"chartTitle": "Status",
			"heightFactor":.5,
			"popScreen":"",
			"popSeriesCtrl":"",
			"popValueCtrl":"",
			"popMethodName":"",			
			"columnWidth":.55,			
			seriesArray:[
				{type:"barcolor",field:["cnt"]}					
			]				
			},this)
			// Grid sec Planned Vehicles begins
			var gridPlannedSummary=
			[										
				{columnname:"From Zone",dataname:"FROM_ZONE",datatype:"string",width:150},		
				{columnname:"To Zone",dataname:"TO_ZONE",datatype:"string",width:150},
				{columnname:"Shipment Count",dataname:"Shipments",datatype:"string",width:150,colAlign:'right'},
				{columnname:"Load Count",dataname:"Load",datatype:"string",width:150,colAlign:'right'},										
				{columnname:"Total Tonnage",dataname:"Tonnage",datatype:"string",width:150,colAlign:'right',weightPrecision:3}				
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
				heightFactor:.5,
				columnWidth:.45,
				widthBasis:"flex",
			}
			var tmpgridPlannedSummary = plf.addGrid(gridPlannedDtl,this) 
			// Grid sec Planned Vehicles ends
			tmpCargoDash.add(gridlastsec)
			tmpCargoDash.add(tmpInbound)
			tmpCargoDash.add(tmpOutbound)
			tmpCargoDashStatus.add(status_tmp)
			tmpCargoDashStatus.add(tmpgridPlannedSummary)
			mainpage.ptrMainSection.add(tmpRow1)
			mainpage.ptrMainSection.add(tmpCargoDash) 
            mainpage.ptrMainSection.add(tmpCargoDashStatus) 
			mainpage.eventHandlers = 
			[
				{
					"controlid":"",
					"tasktype":"onload",
					"input":["strRegion"],
					"service":"TMSCoreTransportTS",
					"methodName":"serinitcargodboard"
				},
				/*{
					"controlid":"strRegion",
					"tasktype":"onchange",
					"input":["strRegion"],
					"service":"TMSCoreTransportTS",
					"methodName":"onchangeRegionTS"
				},	*/			
				{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strRegion","strLocation"],
					"service":"TMSCoreTransportTS",
					"methodName":"serfetchCargoDashBoardTS"
				}	

				/*
				,
				{
					"tasktype":"proto",
					"filename":"dashboard/Cargo_dashboard.json"
				}		
				*/
				]
			mainpage.screenLinks=
			{			
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
			"jpnolink":
				{
					"dest":"journey_management.JourneyPlanUpdate",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"JP_NO","dest":"strJourneyPlanNo"}
							]
				},				
			"loadnolink":
				{
					"dest":"tms.LoadBuilding",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"WAYBILL_NO","dest":"strLoadNo"}
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
        }

    });