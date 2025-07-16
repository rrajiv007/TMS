Ext.define('CueTrans.view.dashboard1.journeyPlan',
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
			//{"name":"journeydash","linkid":"db_journeydash"},
			
			/*{"name":"requestdash","linkid":"db_requestdash"},
			{"name":"vehicledemandplandash","linkid":"db_vehicledemandplandash"},
			{"name":"inspectiondash","linkid":"db_inspectiondash"},
			{"name":"cargodashboard","linkid":"db_cargodashboard"},
			{"name":"journeydash","linkid":"db_journeydash"},
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
			plf.columns = 1
            var tmpRow1 = plf.addGenSection({})
			
			// Grid1 sec begins
			var gridcustobj=
			[										
				{columnname:"JP Open<br>From",dataname:"JPOpenFrom",datatype:"string",width:80},					
				{columnname:"Vehicle",dataname:"TRUCK_CODE",datatype:"string",width:90},
				
				{columnname:"Way Point",dataname:"WAY_POINT",datatype:"string",width:80},
				{columnname:"Planned Time",dataname:"PLANNED_TIME",datatype:"string",width:95},
				{columnname:"Time Overdue",dataname:"TIME_OVERDUE",datatype:"string",width:95},
				{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:90},
				{columnname:"Contact No",dataname:"CONTACT_NO",datatype:"string",width:90},
				{columnname:"Journey<BR>Manager",dataname:"JOURNEY_MANAGER",datatype:"string",width:80},
				{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:95}		
			]
			var gridcustDtl=
			{
				title:"",
				id:"Lost_dtl",
				removetoolbar:true,
				detail:gridcustobj,
				visibleRow:plf.searchVisibleRows,
				readonly:true,
				removeAddDelete:true,
				removeExport:true,
				removeFilter:true
			}
			var tmpChart1 = plf.addGrid(gridcustDtl,this) 
			
			// Grid1 sec ends
			
			
			// Grid2 sec begins
			var gridcustobj=
			[										
				{columnname:"JP Open<br>From",dataname:"JPOpenFrom",datatype:"string",width:80},				
				{columnname:"Vehicle",dataname:"TRUCK_CODE",datatype:"string",width:90},
					
				{columnname:"Way Point",dataname:"WAY_POINT",datatype:"string",width:80},
				{columnname:"Planned Time",dataname:"PLANNED_TIME",datatype:"string",width:95},
				{columnname:"Time Overdue",dataname:"TIME_OVERDUE",datatype:"string",width:95},
				{columnname:"Driver<BR>Name",dataname:"DRIVER_NAME",datatype:"string",width:80},
				{columnname:"Contact No",dataname:"CONTACT_NO",datatype:"string",width:90},
				{columnname:"Journey<BR>Manager",dataname:"JOURNEY_MANAGER",datatype:"string",width:80},
				{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:95},
				
				
			]
			var gridcustDtl=
			{
				title:"",
				id:"overdue_dtl",
				removetoolbar:true,
				detail:gridcustobj,
				visibleRow:plf.searchVisibleRows,
				readonly:true,
				removeAddDelete:true,
				removeExport:true,
				removeFilter:true
			}
			var tmpChart2 = plf.addGrid(gridcustDtl,this) 
			
			// Grid2 sec ends
			
			// Grid2 sec begins
			var gridcustobj=
			[										
				{columnname:"Vehicle",dataname:"TRUCK_CODE",datatype:"string",width:90},
				{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:120},
				{columnname:"Violation",dataname:"VIOLATION_CNT",datatype:"string",width:110,colAlign:'right'}		
			]
			var gridcustDtl=
			{
				title:"",
				id:"violation_dtl",
				removetoolbar:true,
				detail:gridcustobj,
				visibleRow:plf.searchVisibleRows,
				readonly:true,
				removeAddDelete:true,
				removeExport:true,
				removeFilter:true
			}
			var tmpChart3 = plf.addGrid(gridcustDtl,this) 
			
			// Grid2 sec ends
			
			
				tmpRow1.add(
				plf.addSvg({
					"id": "svg1",
					"svgID": "svg1",
					"columnWidth": 1,
					"svgData": {
						"text1": "",
						"text2": ""
					},
					"svgObjData": {
						"gr_LostVehicle": tmpChart1,
						"gr_OverdueVehicle": tmpChart2,
						"gr_Violation": tmpChart3,
						//"div4": tmpGrid1,
					},
                "svgURL": "resources/images/svg/journeyplan/journeyCurrent.svg"
            }))
			//mainpage.ptrMainSection.add(tmpRow1) //Add Header Section to Main Page  
			mainpage.ptrMainSection.add(tmpRow1)
			//mainpage.ptrMainSection.add(tmpRow3) 
            
			mainpage.eventHandlers = 
			[
			
			{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreJourneyPlanService",
					"methodName":"initJourneyCurDashTS"
			}	,
			{
					"tasktype":"proto",
					"filename":"journey_management/Journey_plan_current.json"
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
			}
			this.callParent(arguments);
        },
		triggerLink:function()
		{
		alert("Test");
		}

    });