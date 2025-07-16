Ext.define('CueTrans.view.dashboard.custreq_performanceCurrent',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Customer Request Current Dashboard";
            // Add Toolbar
            mainpage.toolbarSectionFlag = true;
			mainpage.liveScreenFlag=false;
			mainpage.toolbarLinks=
		[
			{"name":"Journey","linkid":"jms_analysis"}
		]
            
			plf.columns = 1
            var tmpRow2 = plf.addGenSection({});
			var tmpTitle=["Normal","Urgent"];
			// chart1 begins
			var tmpChart1 = plf.addGraph({
                "id": "chart1",
                "chartType": "columnstack",
                "xAxisCaption": "Customer",
                "yAxisCaption": "Load(Tons)",
				"ChartTitle": tmpTitle,
				"lnkID":"origin",
                chartHeight: 189.5103,
                chartWidth: 890.51031
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
                "chartType": "columnstack",
                "xAxisCaption": "Commodity",
                "yAxisCaption": "Load(Tons)",
				"ChartTitle": tmpTitle1,
				"lnkID":"origin",
                chartHeight: 199.50868,
                chartWidth: 890.50867
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
						
					},
                "svgURL": "resources/images/svg/CustomerRequest/custReqCurrent.svg"
            },this))

			
			//mainpage.ptrMainSection.add(tmpRow1) //Add Header Section to Main Page  
			mainpage.ptrMainSection.add(tmpRow2)
			
            
			mainpage.eventHandlers = 
			[
			
			/*{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"TMSCoreTransportTS",
					"methodName":"initTmsCurrDashboardTS"
			},*/	
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
			
				"jms_analysis":
				{
					"dest":"dashboard.custreq_performance",
					"tab":"dashboard",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
				
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