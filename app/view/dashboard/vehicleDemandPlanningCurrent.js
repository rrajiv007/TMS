Ext.define('CueTrans.view.dashboard.vehicleDemandPlanningCurrent',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Vehicle Demand Planning Current";
            // Add Toolbar
			mainpage.liveScreenFlag=false;
            mainpage.toolbarSectionFlag = true;
			mainpage.liveScreenFlag=false;
			mainpage.toolbarLinks=
		[
			{"name":"VehDemAnl","linkid":"jms_analysis"}
			//{"name":"vehicledemandplaning","linkid":"tms_vehicledemandplaning"}
		]
            			
			plf.columns = 1
            var tmpRow2 = plf.addGenSection({});
			var tmpTitle=["Normal","Urgent"];
			// chart1 begins
			var tmpChart1 = plf.addGraph({
                "id": "chart1",
                "chartType": "column",
                "xAxisCaption": "Customer",
                "yAxisCaption": "Load(Tons)",
				"ChartTitle": tmpTitle,
				"lnkID":"origin",
                chartHeight: 179.24011,
                chartWidth: 609.24011
            },this)	
			/*Ext.data.StoreManager.lookup('chart1_store').loadData([
				{"yaxis":1000,"data1":5000,"xaxis":"JAN-29"},
				{"yaxis":9000,"data1":1000,"xaxis":"JAN-30"},
				{"yaxis":5000,"data1":4000,"xaxis":"JAN-31"},
				{"yaxis":4000,"data1":1000,"xaxis":"FEB-01"},
				{"yaxis":2000,"data1":1000,"xaxis":"FEB-02"},
				{"yaxis":500,"data1":9000,"xaxis":"FEB-03"},
				{"yaxis":3000,"data1":1000,"xaxis":"FEB-04"}							
				],false);*/
			// chart1 end
			
			// chart2 begins
			var tmpTitle1=["Tentative","Confirmed"];
			var tmpChart2 = plf.addGraph({
                "id": "chart2",
                "chartType": "column",
                "xAxisCaption": "Vehicle Category",
                "yAxisCaption": "Load(Tons)",
				"ChartTitle": tmpTitle1,
				"lnkID":"origin",
                chartHeight: 179.24011,
                chartWidth: 609.24011
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
				{columnname:"Origin",dataname:"origin",datatype:"string",width:100},		
				{columnname:"Destination",dataname:"destination",datatype:"string",width:110},						
				{columnname:"No Of Vehicles",dataname:"no_of_vehicles",datatype:"string",width:140,popupid:"vehicle_list"}
			]
			var gridcustDtl=
			{
				title:"",
				id:"orgdestdtl",
				removetoolbar:true,
				detail:gridcustobj,
				visibleRow:plf.searchVisibleRows,
				readOnly:true,
				removeAddDelete:true,
				removeFilter:true
			}
			var tmpChart5 = plf.addGrid(gridcustDtl,this) 
			// Grid sec ends
			
			// Grid2 sec begins
			var gridcustobj1=
			[					
				{columnname:"Vehicle Category",dataname:"veh_category",datatype:"string",width:200},		
				{columnname:"No Of Vehicles",dataname:"no_of_vehicles",datatype:"string",width:150}
			]
			var gridcustDtl1=
			{
				title:"",
				id:"vehcatdtl",
				removetoolbar:true,
				detail:gridcustobj1,
				visibleRow:plf.searchVisibleRows,
				readOnly:true,
				removeAddDelete:true,
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
						"chart1": tmpChart1,
						"chart2": tmpChart2,
						
						"grid1": tmpChart5,
						"grid2": tmpChart6,
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
					
				
			}
	mainpage.screenLinks=
		{
			
				"jms_analysis":
				{
					"dest":"dashboard.vehicleDemandPlanningAnalysis",
					"tab":"dashboard",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
				"tms_vehicledemandplaning":
				{
					"dest":"dashboard.vehicleDemandPlanningUser",
					"tab":"dashboard",
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