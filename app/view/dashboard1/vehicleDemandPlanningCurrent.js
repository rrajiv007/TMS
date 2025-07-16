Ext.define('CueTrans.view.dashboard1.vehicleDemandPlanningCurrent',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Vehicle Demand Planning Current";
            // Add Toolbar
			//mainpage.liveScreenFlag=false;
            mainpage.toolbarSectionFlag = true;
			mainpage.liveScreenFlag=true;
			mainpage.toolbarLinks=
		[
			/*{"name":"requestdash","linkid":"db_requestdash"},
			{"name":"inspectiondash","linkid":"db_inspectiondash"},
			{"name":"journeydash","linkid":"db_journeydash"},
			//{"name":"vehicledemandplandash","linkid":"db_vehicledemandplandash"},
			{"name":"cargodashboard","linkid":"db_cargodashboard"},
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
            var tmpRow2 = plf.addGenSection({});
			var tmpTitle=["Normal","Urgent"];
			/*
			// chart1 begins
			var tmpChart1 = plf.addGraph({
                "id": "cr_LoadByCustomer",
                "chartType": "column",
                "xAxisCaption": "Customer",
                "yAxisCaption": "Load(Tons)",
				"ChartTitle": tmpTitle,
				"lnkID":"origin",
                chartHeight: 179.24011,
                chartWidth: 609.24011
            },this)	
			Ext.data.StoreManager.lookup('chart1_store').loadData([
				{"yaxis":1000,"data1":5000,"xaxis":"JAN-29"},
				{"yaxis":9000,"data1":1000,"xaxis":"JAN-30"},
				{"yaxis":5000,"data1":4000,"xaxis":"JAN-31"},
				{"yaxis":4000,"data1":1000,"xaxis":"FEB-01"},
				{"yaxis":2000,"data1":1000,"xaxis":"FEB-02"},
				{"yaxis":500,"data1":9000,"xaxis":"FEB-03"},
				{"yaxis":3000,"data1":1000,"xaxis":"FEB-04"}							
				],false);
			// chart1 end
			*/
			// chart2 begins
			var tmpTitle1=["Tentative","Confirmed"];
			var tmpChart2 = plf.addGraph({
                "id": "cr_LoadByVehCategory",
                "chartType": "column",
                "xAxisCaption": "Vehicle Category",
                "yAxisCaption": "Tonnage",
				"ChartTitle": tmpTitle1,
				"lnkID":"origin",
                chartHeight: 179.17868,
                chartWidth: 709.1803
            },this)	/*
			Ext.data.StoreManager.lookup('chart2_store').loadData([
				{"yaxis": 300,"xaxis": "Light Commercial Vehicle"},
				{"yaxis": 200,"xaxis": "Heavy Commercial Vehicle"},
				{"yaxis": 122,"xaxis": "BUS"}
				],false);*/
			// chart2 end
			
			
			
			// Grid sec begins
			var gridcustobj=
			[					
				{columnname:"Destination",dataname:"Destination",datatype:"string",width:155},		
				{columnname:"No of vehicles",dataname:"vehicles",datatype:"string",width:155,colAlign:'right'},						
				{columnname:"No of Shipments",dataname:"Shipments",datatype:"string",width:150,colAlign:'right'},
				{columnname:"Vehicle Category",dataname:"vehicle_category",datatype:"string",width:150},
				//,popupid:"vehicle_list"
				{columnname:"Weight (tons)",dataname:"Tonnage",datatype:"string",width:150,colAlign:'right',weightPrecision:3},	
				{columnname:"Under Utilized<br>Vehicles",dataname:"Utilization",datatype:"string",width:150,colAlign:'right'},
			]
			var gridcustDtl=
			{
				title:"",
				id:"orgdestdtl",
				removetoolbar:true,
				detail:gridcustobj,
				visibleRow:4,
				readonly:true,
				removeAddDelete:true,
				removeExport:true,
				removeFilter:true
			}
			var tmpChart5 = plf.addGrid(gridcustDtl,this) 
			// Grid sec ends
			
			// Grid2 sec begins
			var gridcustobj1=
			[					
				{columnname:"Category",dataname:"vehicle_category",datatype:"string",width:120},
				{columnname:"Total",dataname:"total",datatype:"string",width:100,colAlign:'right'},				
				{columnname:"Available",dataname:"avialable",datatype:"string",width:100,colAlign:'right'},
				{columnname:"Allocated",dataname:"allocated",datatype:"string",width:100,colAlign:'right'}
			]
			var gridcustDtl1=
			{
				title:"",
				id:"vehcatdtl",
				removetoolbar:true,
				detail:gridcustobj1,
				visibleRow:4,
				readonly:true,
				removeAddDelete:true,
				removeExport:true,
				removeFilter:true
			}
			var tmpChart6 = plf.addGrid(gridcustDtl1,this) 
			// Grid2 sec ends
			
			
            tmpRow2.add(
				plf.addSvg({
					"id": "svg1",
					"svgID": "svg1",
					"columnWidth": 1,
					"svgHeight":400,
					"svgData": {
						"text1": "",
						"text2": ""
					},
					"svgObjData": {
						//"cr_LoadByCustomer": tmpChart1,
						"cr_LoadByVehCategory": tmpChart2,
						
						"gr_OriginDestSummary": tmpChart5,
						"gr_VehicleCategorySummary": tmpChart6,
					},
                "svgURL": "resources/images/svg/VehicleDemandPlanning/vehicleDemandPlanningCurrent.svg"
            }))

			
			//mainpage.ptrMainSection.add(tmpRow1) //Add Header Section to Main Page  
			mainpage.ptrMainSection.add(tmpRow2)
			
            
			mainpage.eventHandlers = 
			[
			
			{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"TMSCoreTransportTS",
					"methodName":"initVehDemDashTS"
			},
			{
				"tasktype":"proto",
				"filename":"dashboard/vehdemandplanningcurrent.json"
			}
			
				
			];
			mainpage.popupLinks=
			{
				/*
					"vehicle_list":
					{
						"hlpType":"grid",
						"gridID":"orgdestdtl",
						"hlpScreen":"dashboard.vehicledetails",
						"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"origin","dest":"destination"}							
							]
					}	
					*/
				
			}
	mainpage.screenLinks=
		{
			
				/*"jms_analysis":
				{
					"dest":"dashboard.vehicleDemandPlanningAnalysis",
					"tab":"dashboard",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},*/
				
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
				/*
				"db_vehicledemandplandash":
				{
					"dest":"dashboard1.vehicleDemandPlanningCurrent",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},*/
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
        }

    });