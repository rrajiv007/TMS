/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
		                                   
************************************************************************************************/
Ext.define('CueTrans.view.TravelDashboard.TransportDashboard',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Transport Dashboard";
            
            mainpage.toolbarSectionFlag = true;	
			mainpage.liveScreenFlag=false;
			mainpage.toolbarLinks=
			[				
				//{"name":"Transport Dashbord","linkid":"db_transportDash"},
				{"name":"Management Dashbord","linkid":"db_ManagementDash"},
				{"name":"Accommodation Dashboard","linkid":"db_accomDash"}				
			]
			
			
							
			//Graph starts here			
            var GraphSection = plf.addGenSection({"cls":"chart_panel_container"});				
			/*Open/Closed Vs Count begins*/
			var openclosed_chart= plf.addChart({
                "id": "openclosed_chart",
				"xAxisCaption": "Status",
                "xAxisColumn":"status",
                "yAxisCaption": "Count",
				"chartType": "Polar",
				"chartTitle": "Flight Request Status",
				"heightFactor":.5,
				"popScreen":"",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"",
				"columnWidth": .25	,
				seriesArray:[
					{type:"pie",field:["cnt"]}					
				]				
            },this)
			/*Open/Closed Vs Count ends*/
			
			
			
			// Inbound grid sec begins
			var gridInboundobj=
			[										
				{columnname:"Date",dataname:"TRUCK_CODE",datatype:"string",width:100},
				{columnname:"Vehicle Number",dataname:"LAST_STOP",datatype:"string",width:150},
				{columnname:"Time",dataname:"ARRIVAL_TIME",datatype:"string",width:100},
				{columnname:"Seats Filled",dataname:"FROM",datatype:"string",width:100},
				{columnname:"Seats Available",dataname:"COMMODITY",datatype:"string",width:80}
			]
			var gridInboundDtl=
			{
				title:"Inbound",
				id:"cargoInBoundGrid",				
				detail:gridInboundobj,
				readonly:true,				
				removeTbar:true,
				removePaging:true,
				margin:2,
				heightFactor:.5,
				columnWidth:.75,
				widthBasis:"flex"
			}
			var tmpInbound = plf.addGrid(gridInboundDtl,this) 			
			// Inbound grid sec begins
			
			
			
			/*Open status Vs Count begins*/
			var openstatus_chart= plf.addChart({
                "id": "openstatus_chart",
				"xAxisCaption": "Status",
                "xAxisColumn":"status",
                "yAxisCaption": "Count",
				"chartTitle": "Status of unresolved tickets",
				"legend": { position: 'top' },
				"heightFactor":.5,
				"popScreen":"",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"",
				"columnWidth": .33,
				seriesArray:[
					{type:"bar",field:["cnt"]}					
				]				
            },this)
			/*Open status Vs Count ends*/
			
			/*Department Vs Count begins*/
		/*	var Department_chart= plf.addChart({
                "id": "Department_chart",
				"xAxisCaption": "Department",
                "xAxisColumn":"dept",
                "yAxisCaption": "Count",
				"chartTitle": "Trend by Department",
				"heightFactor":.5,
				"popScreen":"",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"",
				"columnWidth": .5,
				seriesArray:[
					{type:"line",field:["cnt"]}					
				]				
            },this)*/
			var Department_chart= plf.addChart({
                "id": "DepartmentTrend1_chart",
				"xAxisCaption": "Month",
                "xAxisColumn":"Month",
                "yAxisCaption": "Count",
				"chartTitle": "Trend by Department",
				"heightFactor":.5,
				"popScreen":"",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"",
				"columnWidth": .33,
				seriesArray:[
					{type:"bar",field:["Desktop", "MMA", "NMC", "HR"]}			
					/*{type:"bar",field:["Desktop"]}										
					{type:"bar",field:["MMA"]}					
					{type:"bar",field:["NMC"]}					
					{type:"bar",field:["HR"]}	*/				
				]				
            },this)
			/*Department Vs Count ends*/
			
			/*Exchange Vs Count begins*/
			var Exchange_chart= plf.addChart({
                "id": "Exchange_chart",
				"xAxisCaption": "Exchange",
                "xAxisColumn":"exchange",
                "yAxisCaption": "Count",
				"chartTitle": "Trend by Exchange",
				"heightFactor":.5,
				"popScreen":"",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"",
				"columnWidth": .3,
				seriesArray:[
					{type:"line",field:["cnt"]}					
				]				
            },this)
			/*Exchange Vs Count ends*/
			
			
			
			
			
			
			//mainpage.ptrMainSection.add(SearchSection)			
			GraphSection.add(openclosed_chart)
			GraphSection.add(tmpInbound)
			GraphSection.add(openstatus_chart)			
			GraphSection.add(Department_chart)			
			GraphSection.add(Exchange_chart)
			//GraphSection.add(Problem_chart)
			//GraphSection.add(Nature_chart)
			//GraphSection.add(Clear_chart)
			//GraphSection.add(Cause_chart)
			//GraphSection.add(turnaroundSummary)
			
			
			
			mainpage.ptrMainSection.add(GraphSection)
			
			//mainpage.ptrMainSection.add(map)
			//mainpage.ptrMainSection.add(tmpPanel)
			/*Svg ends here*/
			mainpage.eventHandlers = 
			[
			
			{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"DashCoreCustomerTS",
					"methodName":""
			},	
			{
				"tasktype":"proto",
				"filename":"ManagementDashboard/ManagementDashboard.json"
			}
			];		
			
			mainpage.screenLinks=
			{
			"db_ManagementDash":
			{
				"dest":"TravelDashboard.ManagementDashboard",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
			},
			
			"db_accomDash":
			{
				"dest":"TravelDashboard.AccomodationDashboard",
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