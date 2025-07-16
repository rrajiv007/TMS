Ext.define('CueTrans.view.dashboard1.analysisPage3',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Average Weight";
            // Add Toolbar
            mainpage.toolbarSectionFlag = true;
			mainpage.liveScreenFlag=true;
			mainpage.toolbarLinks=
		[
			
			{"name":"Trip Summary","linkid":"db_analysis"},
			{"name":"On Time Delevery","linkid":"db_analysis1"},			
			{"name":"Average Weight","linkid":"db_analysis2"},
			{"name":"Loads by Vehicle Category","linkid":"db_analysis3"},
			
		]
         
            plf.columns = 4		
            var tmpRow1 = plf.addGenSection({})			
			/*Search Criteria starts here*/
			/*tmpRow1.add(
				plf.addLabel({"text":"Customer Request Dashboard",id:"strStatus"}))	*/
			
			tmpRow1.add(
				plf.addCombo({"label":"Projection Period",id:"strPeriod"}),
				plf.addCombo({"label":"Duration",id:"strDuration"}),
				plf.addButton({"label":"Search","id":"btnSearch"})
				)	
		
							
			/*Search Criteria ends here*/	
			plf.columns = 1
            var tmpRow2 = plf.addGenSection({});
			var tmpTitle=["Average Weight","Average Capacity"];
			// chart1 begins
			var tmpChart1 = plf.addGraph({
                "id": "cr_AverageWeight",
                "chartType": "column",
                "xAxisCaption": "Date",
                "yAxisCaption": "Weight (Tons)",
				"ChartTitle": tmpTitle,
				"labelRotate":true,
				"lnkID":"origin",
                chartHeight: 200,
                chartWidth: 620
            },this)	

			// chart1 end
			
			// chart2 begins
			var tmpTitle=["Average Weight","Average Capacity"];
			var tmpChart2 = plf.addGraph({
                "id": "cr_AverageWeightPer",
                "chartType": "column",
                "xAxisCaption": "Date",
                "yAxisCaption": "%",
				"ChartTitle": tmpTitle,
				"labelRotate":true,
				"lnkID":"origin",
                chartHeight: 200,
                chartWidth: 620
            },this)	

			// chart2 end
			/*
			// chart3 begins
			var tmpTitle=["Average Volume","Average Capacity"];
			var tmpChart3 = plf.addGraph({
                "id": "cr_AverageVolume",
                "chartType": "columnstack",
                "xAxisCaption": "Date",
                "yAxisCaption": "Average volume & capacity",
				"ChartTitle": tmpTitle,
				"labelRotate":true,
				"lnkID":"origin",
                chartHeight: 200,
                chartWidth: 620
            },this)	

			// chart3 end
			
			// chart4 begins
			var tmpTitle=["Average Volume","Average Capacity"];
			var tmpChart4 = plf.addGraph({
                "id": "cr_AverageVolumePer",
                "chartType": "columnstack",
                "xAxisCaption": "Date",
                "yAxisCaption": "Average volume & capacity %",
				"ChartTitle": tmpTitle,
				"labelRotate":true,
				"lnkID":"origin",
                chartHeight: 200,
                chartWidth: 620
            },this)	

			// chart4 end
			*/

			
			
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
						"cr_AverageWeight": tmpChart1,
						"cr_AverageWeightPer":tmpChart2,
						//"cr_AverageVolume":tmpChart3,
						//"cr_AverageVolumePer":tmpChart4
						
					},
                "svgURL": "resources/images/svg/analysis/averageWeight.svg"
            }))

			
			mainpage.ptrMainSection.add(tmpRow1) //Add Header Section to Main Page  
			mainpage.ptrMainSection.add(tmpRow2)
			
            
			mainpage.eventHandlers = 
			[
			
			{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"TMSCoreTransportTS",
					"methodName":"initTmsAnalysisDashboardpage3"
			},
			
			{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strPeriod","strDuration"],
					"service":"TMSCoreTransportTS",
					"methodName":"fetchTmsAnalysisDashboardpage3"
			},


			];
			mainpage.popupLinks=
			{
				

					
				
			}


	mainpage.screenLinks=
		{
			
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
				
				"db_analysis1":
				{
					"dest":"dashboard1.analysisPage2",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
				"db_analysis2":
				{
					"dest":"dashboard1.analysisPage3",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"db_analysis3":
				{
					"dest":"dashboard1.analysisPage4",
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