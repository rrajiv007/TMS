Ext.define('CueTrans.view.dashboard1.cargoDashboard',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Cargo Dashboard";
			
            // Add Toolbar
            mainpage.toolbarSectionFlag = true;	
			mainpage.liveScreenFlag=false;
			mainpage.toolbarLinks=
		[
			/*{"name":"requestdash","linkid":"db_requestdash"},
			{"name":"vehicledemandplandash","linkid":"db_vehicledemandplandash"},
			{"name":"inspectiondash","linkid":"db_inspectiondash"},
			{"name":"journeydash","linkid":"db_journeydash"},
			
			//{"name":"cargodashboard","linkid":"db_cargodashboard"},
			*/
			
			{"name":"Customer Request","linkid":"db_requestdash"},
			{"name":"Vehicle Demand Planning","linkid":"db_vehicledemandplandash"},
			{"name":"Inspection","linkid":"db_inspectiondash"},
			{"name":"Journey Plan","linkid":"db_journeydash"},
			{"name":"Cargo","linkid":"db_cargodashboard"},
			
			/*
			{"name":"vehicledemandplandash","linkid":"db_vehicledemandplandash"},
			{"name":"inspectiondash","linkid":"db_inspectiondash"},
			{"name":"journeydash","linkid":"db_journeydash"},
			{"name":"cargodashboard","linkid":"db_cargodashboard"},
			{"name":"requestdash","linkid":"db_requestdash"},
			*/
		]
		
		
			
		
		
			plf.columns = 4
			var tmpRow1 = plf.addGenSection({})
			tmpRow1.add(
				plf.addCombo({"label":"Region",id:"strRegion"}),
				plf.addCombo({"label":"Location",id:"strLocation"}),
				plf.addButton({"label":"Search",id:"btnSearch"})
					   )
				
            var tmpRow2 = plf.addGenSection({})
			//var tmpTitle=["Normal","Urgent"];
			
			// Grid1 sec begins
			var gridcustobj=
			[										
				{columnname:"Truck No",dataname:"TRUCK_CODE",datatype:"string",width:100},
				{columnname:"Last Stop ",dataname:"LAST_STOP",datatype:"string",width:100},
				{columnname:"Arrival<br>Time",dataname:"ARRIVAL_TIME",datatype:"string",width:100},
				{columnname:"From",dataname:"FROM",datatype:"string",width:100},
				{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:80},
				{columnname:"Waybill<br>No",dataname:"WAYBILL_NO",datatype:"string",width:70},
				{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:80},
				//{columnname:"ROS Date",dataname:"ROS_DATE",datatype:"string",width:80},
			]
			var gridcustDtl=
			{
				title:"",
				id:"inbound_dtl",
				removetoolbar:true,
				detail:gridcustobj,
				visibleRow:3,
				readonly:true,
				removeAddDelete:true,
				removeExport:true,
				removeFilter:true
			}
			var tmpChart1 = plf.addGrid(gridcustDtl,this) 
			
			// Grid sec ends	
			
			
			// Grid2 sec begins
			var gridcustobj=
			[										
				{columnname:"Truck No",dataname:"TRUCK_CODE",datatype:"string",width:100},
				{columnname:"Next Stop ",dataname:"NEXT_STOP",datatype:"string",width:100},
				{columnname:"Departure<br>Time",dataname:"ARRIVAL_TIME",datatype:"string",width:100},
				{columnname:"To",dataname:"TO",datatype:"string",width:100},
				{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:80},
				{columnname:"Waybill<br>No",dataname:"WAYBILL_NO",datatype:"string",width:70},
				{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:80},
				//{columnname:"ROS Date",dataname:"ROS_DATE",datatype:"string",width:80},
			]
			var gridcustDtl=
			{
				title:"",
				id:"outbound_dtl",
				removetoolbar:true,
				detail:gridcustobj,
				visibleRow:3,
				readonly:true,
				removeAddDelete:true,
				removeExport:true,
				removeFilter:true
			}
			var tmpChart2 = plf.addGrid(gridcustDtl,this) 
			
			// Grid sec ends			
			
			// Grid3 sec begins
			var gridcustobj=
			[										
				{columnname:"Truck No",dataname:"TRUCK_CODE",datatype:"string",width:100},
				{columnname:"Event",dataname:"EVENT",datatype:"string",width:300},
				
			]
			var gridcustDtl=
			{
				title:"",
				id:"Last30Mins_dtl",
				removetoolbar:true,
				detail:gridcustobj,
				visibleRow:plf.searchVisibleRows,
				readonly:true,
				removeAddDelete:true,
				removeExport:true,
				removeFilter:true
			}
			var tmpChart3 = plf.addGrid(gridcustDtl,this) 
			
			// Grid sec ends
			
			// Grid4 sec begins
			var gridcustobj=
			[										
				{columnname:"Org &<BR>Dest",dataname:"ORG_DES",datatype:"string",width:80},
				{columnname:"In-<BR>Arrived",dataname:"INB_ARR",datatype:"string",width:60},
				{columnname:"In-<BR>Intransit",dataname:"INB_INT",datatype:"string",width:60},
				{columnname:"Out-<BR>Arrived",dataname:"OUT_ARR",datatype:"string",width:60},
				{columnname:"Out-<BR>Intransit",dataname:"OUT_INT",datatype:"string",width:60},
			]
			var gridcustDtl=
			{
				title:"",
				id:"loadSummary_dtl",
				removetoolbar:true,
				detail:gridcustobj,
				visibleRow:plf.searchVisibleRows,
				readonly:true,
				removeAddDelete:true,
				removeFilter:true
			}
			var tmpChart4 = plf.addGrid(gridcustDtl,this) 
			
			// Grid sec ends
			
			
			tmpRow2.add(
				plf.addSvg({
					"id": "svg1",
					"svgID": "svg1",
					"columnWidth": 1,
					"svgData": {
						"text1": "",
						"text2": ""
					},
					"svgObjData": {
						"gr_Inbound": tmpChart1,
						"gr_Outbound": tmpChart2,
						"gr_Last30Mins": tmpChart3,
						"gr_LoadSummary": tmpChart4,
											
					},
                "svgURL": "resources/images/svg/cargoDashboard/cargoDashboard.svg"
            }))
			//mainpage.ptrMainSection.add(tmpRow1) //Add Header Section to Main Page  
			//mainpage.ptrMainSection.add(tmpRow1)
			mainpage.ptrMainSection.add(tmpRow1)
			mainpage.ptrMainSection.add(tmpRow2) 
            
			mainpage.eventHandlers = 
			[
				{
						"controlid":"",
						"tasktype":"onload",
						"input":[""],
						"service":"TMSCoreTransportTS",
						"methodName":"initCargoDashBoardTS"
				},
				{
					"controlid":"strRegion",
					"tasktype":"onchange",
					"input":["strRegion"],
					"service":"TMSCoreTransportTS",
					"methodName":"onchangeRegionTS"
				},
				/*
				{
					"controlid":"strLocation",
					"tasktype":"onchange",
					"input":["strLocation"],
					"service":"TMSCoreTransportTS",
					"methodName":"onchangeLocationTS"
				},
				*/
				{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strRegion","strLocation"],
					"service":"TMSCoreTransportTS",
					"methodName":"fetchCargoDashBoardTS"
				},
				{
					"tasktype":"proto",
					"filename":"dashboard/Cargo_dashboard.json"
				}			
			
			];
			mainpage.screenLinks=
			{
			"driverMaster":
				{
					"dest":"jm_master.DriverMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"strDriverCode","dest":"strDriverCode"}
							]
				},
				
				"db_inspectiondash":
				{
					"dest":"dashboard1.inspection",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
				"db_requestdash":
				{
					"dest":"dashboard1.custreq_performanceCurrent",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
				"db_vehicledemandplandash":
				{
					"dest":"dashboard1.vehicleDemandPlanningCurrent",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
				"db_cargodashboard":
				{
					"dest":"dashboard1.cargoDashboard",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"db_journeydash":
				{
					"dest":"dashboard1.journeyPlan",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
			}
			this.callParent(arguments);
        },
		triggerLink:function()
		{
		alert("Test");
		}

    });