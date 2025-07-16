Ext.define('CueTrans.view.dashboard1.analysis',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Trip Summary";
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
			var tmpTitle=["load","weight"];
			// chart1 begins
			var tmpChart1 = plf.addGraph({
                "id": "cr_TripSummary",
                "chartType": "columnstack",
                "xAxisCaption": "Date",
                "yAxisCaption": "Load(Tons)",
				"ChartTitle": tmpTitle,
				"lnkID":"origin",
                chartHeight: 200,
                chartWidth: 620
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

			var tmpTitle=["load","distance"];
			var tmpChart2 = plf.addGraph({
                "id": "cr_TripSummaryDistance",
                "chartType": "columnstack",
                "xAxisCaption": "Date",
                "yAxisCaption": "Weight",
				"ChartTitle": tmpTitle,
				"lnkID":"origin",
                chartHeight: 200,
                chartWidth: 620
            },this)	

			// chart2 end
			
			// Trip By Destination begins
			var tmpTitle=["Central","North","Coastal","South"];
			var tmpChart3 = plf.addGraph({
                "id": "cr_TripByDestination",
                "chartType": "columnstack",
                "xAxisCaption": "Date",
                "yAxisCaption": "Load",
				"ChartTitle": tmpTitle,
				"lnkID":"origin",
				"labelRotate":true,
                chartHeight: 200,
                chartWidth: 620
            },this)	

			// Trip By Destination end
	
			// Trip By Destination % begins
			var tmpTitle=["Central","North","Coastal","South"];
			var tmpChart4 = plf.addGraph({
                "id": "cr_TripByDestinationPer",
                "chartType": "columnstack",
                "xAxisCaption": "Date",
                "yAxisCaption": "Load(%)",
				"ChartTitle": tmpTitle,
				"lnkID":"origin",
				"labelRotate":true,
                chartHeight: 200,
                chartWidth: 620
            },this)	

			// Trip By Destination % end
			
			
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
						"cr_TripSummary": tmpChart1,
						"cr_TripSummaryDistance":tmpChart2,
						"cr_TripByDestination":tmpChart3,
						"cr_TripByDestinationPer":tmpChart4
						
					},
                "svgURL": "resources/images/svg/analysis/tripSummary.svg"
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
					"methodName":"initTmsAnalysisDashboard"
			},

			{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strPeriod","strDuration"],
					"service":"TMSCoreTransportTS",
					"methodName":"fetchTmsAnalysisDashboard"
			},
			/*{
				"tasktype":"proto",
				"filename":"dashboard/customerrequestanalysis.json"
			}
			*/	
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