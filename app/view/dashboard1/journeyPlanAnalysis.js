Ext.define('CueTrans.view.dashboard1.journeyPlanAnalysis',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Journey Plan Analysis Dashboard";
			
            // Add Toolbar
            mainpage.toolbarSectionFlag = true;	
			mainpage.liveScreenFlag=false;
			mainpage.toolbarLinks=
		[
			//{"name":"journeydash","linkid":"db_journeydash"},
			{"name":"requestdash","linkid":"db_requestdash"},
			{"name":"vehicledemandplandash","linkid":"db_vehicledemandplandash"},
			{"name":"inspectiondash","linkid":"db_inspectiondash"}
		]
		
		
		
			plf.columns = 4		
            var tmpRow1 = plf.addGenSection({})			
			/*Search Criteria starts here*/
			/*tmpRow1.add(
				plf.addLabel({"text":"Customer Request Dashboard",id:"strStatus"}))	*/
			
			tmpRow1.add(
				plf.addCombo({"label":"Projection Period",id:"strPeriod"}))	
		
		
			plf.columns = 1
            var tmpRow2 = plf.addGenSection({})
			//var tmpTitle=["Normal","Urgent"];
			// chart1 begins
			var tmpChart1 = plf.addGraph({
                "id": "chart1",
                "chartType": "column",
                "xAxisCaption": "Date",
                "yAxisCaption": "Journeys Count",
				//"ChartTitle": tmpTitle,
				"lnkID":"origin",
                chartHeight: 185,
                chartWidth: 618.04407
            },this)	
			/*Ext.data.StoreManager.lookup('chart1_store').loadData([
				{"yaxis":23,"xaxis":"Day 1"},
				{"yaxis":19,"xaxis":"Day 2"},
				{"yaxis":8,"xaxis":"Day 3"},
				{"yaxis":39,"xaxis":"Day 4"},
				{"yaxis":11,"xaxis":"Day 5"},			
				],false);*/
			// chart1 lation V 
			
			// chart2 begins
			var tmpChart2 = plf.addGraph({
                "id": "chart2",
                "chartType": "column",
                "xAxisCaption": "Driver Name",
                "yAxisCaption": "Violation Count",
				//"ChartTitle": tmpTitle,
				"lnkID":"origin",
                chartHeight: 185,
                chartWidth: 618.06018
            },this)	
			/*Ext.data.StoreManager.lookup('chart2_store').loadData([
				{"yaxis":9,"xaxis":"DM01-Peter"},
				{"yaxis":1,"xaxis":"DM02-Abdullah"},
				{"yaxis":6,"xaxis":"DM03-Sayed"},
				{"yaxis":12,"xaxis":"DM04-Mohammed"},
				{"yaxis":3,"xaxis":"DM05-Asif"},				
				],false);*/
			// chart2 end
         // Grid sec begins
			var gridcustobj=
			[										
				{columnname:"ToolBox Talks",dataname:"Toolbox_Talk",datatype:"string",width:350}
			]
			var gridcustDtl=
			{
				title:"",
				id:"toolbox_dtl",
				removetoolbar:true,
				detail:gridcustobj,
				visibleRow:plf.searchVisibleRows,
				readOnly:true,
				removeAddDelete:true,
				removeFilter:true
			}
			var tmpChart3 = plf.addGrid(gridcustDtl,this) 
			// Grid sec ends			
			
			// chart4 begins
			var tmpChart4 = plf.addGraph({
                "id": "chart4",
                "chartType": "donut",
                "xAxisCaption": "Date",
                "yAxisCaption": "Weight",
			//	"ChartTitle": tmpTitle,
				"lnkID":"origin",
                chartHeight: 185.21458,
                chartWidth: 408.03116
            },this)	
			/*
			Ext.data.StoreManager.lookup('chart4_store').loadData([
				{"yaxis":1000,"data1":5000,"xaxis":"29-Jan"},
				{"yaxis":9000,"data1":1000,"xaxis":"30-Jan"},
				{"yaxis":5000,"data1":4000,"xaxis":"31-Jan"},
				{"yaxis":4000,"data1":1000,"xaxis":"01-Feb"},
				{"yaxis":2000,"data1":1000,"xaxis":"02-Feb"},
				{"yaxis":500,"data1":9000,"xaxis":"03-Feb"},
				{"yaxis":3000,"data1":1000,"xaxis":"04-Feb"}							
				],false);
				*/
			// chart4 end
			
			// chart5 begins
			var tmpChart5 = plf.addGraph({
                "id": "chart5",
                "chartType": "donut",
                "xAxisCaption": "Date",
                "yAxisCaption": "Weight",
				//"ChartTitle": tmpTitle,
				"lnkID":"origin",
                chartHeight: 185.21458,
                chartWidth: 408.03116
            },this)	
			/*Ext.data.StoreManager.lookup('chart5_store').loadData([
				{"yaxis":1000,"data1":5000,"xaxis":"29-Jan"},
				{"yaxis":9000,"data1":1000,"xaxis":"30-Jan"},
				{"yaxis":5000,"data1":4000,"xaxis":"31-Jan"},
				{"yaxis":4000,"data1":1000,"xaxis":"01-Feb"},
				{"yaxis":2000,"data1":1000,"xaxis":"02-Feb"},
				{"yaxis":500,"data1":9000,"xaxis":"03-Feb"},
				{"yaxis":3000,"data1":1000,"xaxis":"04-Feb"}							
				],false);*/
			// chart5 end
			
			
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
						"chart1": tmpChart1,
						"chart2": tmpChart2,
						"grid1": tmpChart3,
						"chart4": tmpChart4,
						"chart5": tmpChart5,
						
						
					},
                "svgURL": "resources/images/svg/journeyplan/journeyPlanAnalysis.svg"
            }))
			//mainpage.ptrMainSection.add(tmpRow1) //Add Header Section to Main Page  
			mainpage.ptrMainSection.add(tmpRow1)
			mainpage.ptrMainSection.add(tmpRow2) 
            
			mainpage.eventHandlers = 
			[
			
			{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreJourneyPlanService",
					"methodName":"initJourneyCurDashTS"
			},
            {   
					"controlid":"strPeriod",
					"tasktype":"onchange",
					"input":["strPeriod"],
					"service":"CoreJourneyPlanService",
					"methodName":"onchangePeriodTS"
			},
            {
					"tasktype":"proto",
					"filename":"journey_management/Journey_plan_analysis.json"
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
				/*
				"jms_current":
				{
					"dest":"dashboard.journeyPlan",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
				"db_journeydash":
				{
					"dest":"dashboard1.journeyPlanAnalysis",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},*/
				
				"db_inspectiondash":
				{
					"dest":"dashboard1.inspectionAnalysis",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
				"db_requestdash":
				{
					"dest":"dashboard1.custreq_performance",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
				"db_vehicledemandplandash":
				{
					"dest":"dashboard1.vehicleDemandPlanningAnalysis",
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