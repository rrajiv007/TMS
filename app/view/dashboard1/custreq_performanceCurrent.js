Ext.define('CueTrans.view.dashboard1.custreq_performanceCurrent',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Customer Request Current Dashboard";
            // Add Toolbar
            mainpage.toolbarSectionFlag = true;
			mainpage.liveScreenFlag=true;
			mainpage.toolbarLinks=
		[
			/*{"name":"vehicledemandplandash","linkid":"db_vehicledemandplandash"},
			{"name":"inspectiondash","linkid":"db_inspectiondash"},
			{"name":"journeydash","linkid":"db_journeydash"},
			{"name":"cargodashboard","linkid":"db_cargodashboard"},
			//{"name":"requestdash","linkid":"db_requestdash"},
			{"name":"analysis","linkid":"db_analysis"}
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
			{"name":"analysis","linkid":"db_analysis"},
			{"name":"requestdash","linkid":"db_requestdash"},
			*/
		]
            

			plf.columns = 1
            var tmpRow2 = plf.addGenSection({});
			var tmpTitle=["Normal","Urgent"];
			// chart1 begins
			var tmpChart1 = plf.addGraph({
                "id": "cr_CustomerLoad",
                "chartType": "column",
                "xAxisCaption": "Region",
                "yAxisCaption": "tonnage",
				"ChartTitle": tmpTitle,
				"lnkID":"origin",
                chartHeight: 189.68008,
                chartWidth: 520
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
                "id": "cr_commodityload",
                "chartType": "column",
                "xAxisCaption": "Commodity",
                "yAxisCaption": "tonnage",
				"ChartTitle": tmpTitle1,
				"lnkID":"origin",
                chartHeight: 199.48251,
                chartWidth: 995.64368
            },this)	/*
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
			
			/*
			// chart3 begins
			var tmpTitle1=["Tentative","Confirmed"];
			var tmpChart3 = plf.addGraph({
                "id": "cr_regionbycommodity",
                "chartType": "column",
                "xAxisCaption": "Region",
                "yAxisCaption": "Commodity",
				"ChartTitle": tmpTitle1,
				"lnkID":"origin",
                chartHeight: 189.79739,
                chartWidth: 395.57205
            },this)	/*
			Ext.data.StoreManager.lookup('chart2_store').loadData([
				{"yaxis":1000,"data1":5000,"xaxis":"JAN-29"},
				{"yaxis":9000,"data1":1000,"xaxis":"JAN-30"},
				{"yaxis":5000,"data1":4000,"xaxis":"JAN-31"},
				{"yaxis":4000,"data1":1000,"xaxis":"FEB-01"},
				{"yaxis":2000,"data1":1000,"xaxis":"FEB-02"},
				{"yaxis":500,"data1":9000,"xaxis":"FEB-03"},
				{"yaxis":3000,"data1":1000,"xaxis":"FEB-04"}							
				],false);
			// chart3 end
			*/
			
			// Grid sec begins
			var gridcustobj=
			[										
				{columnname:"Region",dataname:"Region",datatype:"string",width:60},
				{columnname:"Commodity",dataname:"Commodity",datatype:"string",width:80},
				{columnname:"Request<br>Count",dataname:"RequestCount",datatype:"string",width:72,colAlign:'right'},
				{columnname:"Shipment<br>Count",dataname:"ShipmentCount",datatype:"string",width:78,colAlign:'right'},	
				{columnname:"Tonnage",dataname:"Tonnage",datatype:"string",width:71,colAlign:'right',weightPrecision:3},			
			]
			var gridcustDtl=
			{
				title:"",
				id:"regionByCommodity_dtl",
				removetoolbar:true,
				detail:gridcustobj,
				visibleRow:4,
				readonly:true,
				removeAddDelete:true,
				removeExport:true,
				removeFilter:true
			}
			var tmpChart3 = plf.addGrid(gridcustDtl,this) 
			
			// Grid sec ends
			
			
			// chart3 begins
			var tmpTitle2=["Tentative","Confirmed"];
			var tmpChart4 = plf.addGraph({
                "id": "cr_custRequest",
                "chartType": "bar",
                "xAxisCaption": "Day",
                "yAxisCaption": "Count",
				"ChartTitle": tmpTitle2,
				"lnkID":"origin",
                chartHeight: 198,
                chartWidth: 236
            },this)/*
			
			var tmpChart2 = plf.addGraph({
                "id": "cr_commodityload",
                "chartType": "column",
                "xAxisCaption": "Commodity",
                "yAxisCaption": "tonnage",
				"ChartTitle": tmpTitle1,
				"lnkID":"origin",
                chartHeight: 199.48251,
                chartWidth: 995.64368
            },this)
			
			
			Ext.data.StoreManager.lookup('cr_custRequest').loadData([
				{"yaxis":1000,"xaxis":"JAN-29"},
				{"yaxis":9000,"xaxis":"JAN-30"}										
				],true);*/
			// chart3 end
			
			
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
						"cr_CustomerLoad": tmpChart1,
						"cr_commodityload": tmpChart2,
						"cr_regionbycommodity": tmpChart3,
						"cr_custRequest": tmpChart4,
					},
                "svgURL": "resources/images/svg/CustomerRequest/custReqCurrent.svg"
            },this))

			
			//mainpage.ptrMainSection.add(tmpRow1) //Add Header Section to Main Page  
			mainpage.ptrMainSection.add(tmpRow2)
			
            
			mainpage.eventHandlers = 
			[
			
			{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"TMSCoreTransportTS",
					"methodName":"initTmsCurrDashboardTS"
			},
			
			{
				"tasktype":"proto",
				"filename":"dashboard/customerrequestcurrent.json"
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
			
				/*
				"jms_analysis":
				{
					"dest":"dashboard.custreq_performanceCurrent",
					"tab":"dashboard",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				*/
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
				/*
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
				*/
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
				"db_analysis":
				{
					"dest":"dashboard1.analysis",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},

				
		}
		mainpage.svgLinks=
			{
				
					"iVehAllo":
					{
						"hlpType":"Header",						
						"hlpScreen":"dashboard.shipmentdtl",
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