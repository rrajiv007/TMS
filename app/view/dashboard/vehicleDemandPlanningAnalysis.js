Ext.define('CueTrans.view.dashboard.vehicleDemandPlanningAnalysis',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Vehicle Demand Planning Analysis";
			  plf.columns = 4		
            var tmpRow10 = plf.addGenSection({})			
			/*Search Criteria starts here*/
			/*tmpRow1.add(
				plf.addLabel({"text":"Customer Request Dashboard",id:"strStatus"}))	*/
			
		    // Add Toolbar
            mainpage.toolbarSectionFlag = true;
			mainpage.liveScreenFlag=false;
			mainpage.toolbarLinks=
		[
			{"name":"Journey","linkid":"jms_current"}
		]
            plf.columns = 4		
            var tmpRow1 = plf.addGenSection({})			
			/*Search Criteria starts here*/
			/*tmpRow1.add(
				plf.addLabel({"text":"Customer Request Dashboard",id:"strStatus"}))	*/
			
			tmpRow1.add(
				plf.addCombo({"label":"Projection Period",id:"strPeriod"}))	
		
							
			/*Search Criteria ends here*/	
			plf.columns = 1
            var tmpRow2 = plf.addGenSection({});
			var tmpTitle=["Normal","Urgent"];
			// chart1 begins
			var tmpChart1 = plf.addGraph({
                "id": "chart1",
                "chartType": "column",
                "xAxisCaption": "Customer",
                "yAxisCaption": "Load(tons)",
				"ChartTitle": tmpTitle,
				"lnkID":"origin",
                chartHeight: 183.14096,
                chartWidth: 528.78735
            },this)	
			/*
			Ext.data.StoreManager.lookup('chart1_store').loadData([
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
                "yAxisCaption": "Load",
				"ChartTitle": tmpTitle1,
				"lnkID":"origin",
                chartHeight: 183.14124,
                chartWidth: 528.78735
            },this)	
			/*
			Ext.data.StoreManager.lookup('chart2_store').loadData([
				{"yaxis":1000,"data1":5000,"xaxis":"JAN-29"},
				{"yaxis":9000,"data1":1000,"xaxis":"JAN-30"},
				{"yaxis":5000,"data1":4000,"xaxis":"JAN-31"},
				{"yaxis":4000,"data1":1000,"xaxis":"FEB-01"},
				{"yaxis":2000,"data1":1000,"xaxis":"FEB-02"},
				{"yaxis":500,"data1":9000,"xaxis":"FEB-03"},
				{"yaxis":3000,"data1":1000,"xaxis":"FEB-04"}							
				],false);*/
			// chart2 end
			
			// chart3 begins
			var tmpChart3 = plf.addGraph({
                "id": "chart3",
                "chartType": "donut",
                "xAxisCaption": "Date",
                "yAxisCaption": "Weight",
				"lnkID":"origin",
                chartHeight: 186.78983,
                chartWidth: 409.19464
            },this)	/*
			Ext.data.StoreManager.lookup('chart3_store').loadData([
				{"yaxis":1000,"xaxis":"Chemicals"},
				{"yaxis":9000,"xaxis":"Pipes"},
				{"yaxis":5000,"xaxis":"Others"},
				{"yaxis":4000,"xaxis":"Petrol"},
				{"yaxis":2000,"xaxis":"Water"}						
				],false);*/
			// chart3 end
			
			// chart4 begins
			var tmpChart4 = plf.addGraph({
                "id": "chart4",
                "chartType": "donut",
                "xAxisCaption": "Date",
                "yAxisCaption": "Weight",
				"lnkID":"origin",
                chartHeight: 186.78983,
                chartWidth: 409.20578
            },this)	/*
			Ext.data.StoreManager.lookup('chart4_store').loadData([
				{"yaxis":1000,"xaxis":"Chemicals"},
				{"yaxis":9000,"xaxis":"Pipes"},
				{"yaxis":5000,"xaxis":"Others"},
				{"yaxis":4000,"xaxis":"Petrol"},
				{"yaxis":2000,"xaxis":"Water"}						
				],false);*/
			// chart4 end
			
			// Grid sec begins
			var gridcustobj=
			[					
				{columnname:"Origin",dataname:"origin",datatype:"string",width:115},		
				{columnname:"Destination",dataname:"destination",datatype:"string",width:115},						
				{columnname:"No Of Vehicles",dataname:"no_of_vehicles",datatype:"string",width:115}
			]
			var gridcustDtl=
			{
				title:"",
				id:"origindtl",
				removetoolbar:true,
				detail:gridcustobj,
				visibleRow:plf.searchVisibleRows,
				readOnly:true,
				removeAddDelete:true,
				removeFilter:true
			}
			var tmpChart5 = plf.addGrid(gridcustDtl,this) 
			// Grid sec ends
			
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
						"chart3": tmpChart3,
						"chart4": tmpChart4,
						"grid1": tmpChart5,
						"grid2": tmpChart6
					},
                "svgURL": "resources/images/svg/VehicleDemandPlanning/vehicleDemandPlanningAnalysis.svg"
            }))

			mainpage.ptrMainSection.add(tmpRow1) //Add Header Section to Main Page  
			mainpage.ptrMainSection.add(tmpRow2)
			
            
			mainpage.eventHandlers = 
			[
			
			/*{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"TMSCoreTransportTS",
					"methodName":"initTmsDashBoardTS"
			},	
			{
					"controlid":"strPeriod",
					"tasktype":"onchange",
					"input":["strPeriod"],
					"service":"TMSCoreTransportTS",
					"methodName":"onchangePeriodTS"
			}	*/
			{
				"tasktype":"proto",
				"filename":"dashboard/vehicledemandplanninganalysis.json"
			}
				
			];
			mainpage.popupLinks=
			{
				
					"origin":
					{
						"hlpType":"grid",
						"gridID":"commodity_dtl",
						"hlpScreen":"dashboard.origingrid",
						"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"strOrigin","dest":"strOrigin"},
							{"src":"strWeight","dest":"strWeight"}
							]
					}	
					
				
			}


	mainpage.screenLinks=
		{
			
				"jms_current":
				{
					"dest":"dashboard.vehicleDemandPlanningCurrent",
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