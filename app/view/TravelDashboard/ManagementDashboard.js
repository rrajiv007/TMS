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
Ext.define('CueTrans.view.TravelDashboard.ManagementDashboard',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Travel Request Dashboard";
            
            mainpage.toolbarSectionFlag = true;	
			mainpage.liveScreenFlag=false;
			mainpage.toolbarLinks=
			[				
				//{"name":"Transport Dashbord","linkid":"db_transportDash"},
				{"name":"Accommodation Dashboard","linkid":"db_accomDash"}				
			]
			
			
							
			//Graph starts here			
            var GraphSection = plf.addGenSection({"cls":"chart_panel_container"});				
			/*Open/Closed Vs Count begins*/
			var TRCurrentStatus_chart= plf.addChart({
                "id": "TRStatus",
				"xAxisCaption": "Status",
                "xAxisColumn":"Status",
                "yAxisCaption": "Requests Count",
				"chartType": "Polar",
				"chartTitle": "Travel Requests by Status View",
				"chartTheme":"chartTheme1",
				"heightFactor":.5,
				"popScreen":"",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"",
				"columnWidth": .33,
				seriesArray:[
					{type:"pie",field:["Count"]}					
				]				
            },this)
			/*Open/Closed Vs Count ends*/
			
			
			/*Open status Vs Count begins*/
			var purposeView_chart= plf.addChart({
                "id": "purposeView",
				"xAxisCaption": "Month",
                "xAxisColumn":"Month",
                "yAxisCaption": "Requests Count",
				"chartTitle": "Travel Purpose Trend",
				"chartTheme":"chartTheme3",
				"heightFactor":.5,
				"popScreen":"",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"",
				"columnWidth": .33,
				seriesArray:[
					//{type:"bar",field:["Count"]},			
					{type:"line",field:["TechSupport"]},			
					{type:"line",field:["Deputation"]},
					{type:"line",field:["Emergency"]}
				]				
            },this)
	
			var TravelType_chart= plf.addChart({
                "id": "TravelType",
				"xAxisCaption": "",
                "xAxisColumn":"TT",
                "yAxisCaption": "Count",
				"chartTitle": "Travel Type Monthly View",
				"chartTheme":"chartTheme4",
				"heightFactor":.5,
				"popScreen":"",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"",
				"columnWidth": .33,
				seriesArray:[
					{type:"bar",field:["Count"]}			
					/*{type:"bar",field:["Desktop"]}										
					{type:"bar",field:["MMA"]}					
					{type:"bar",field:["NMC"]}					
					{type:"bar",field:["HR"]}	*/				
				]				
            },this)
			/*Department Vs Count ends*/
			
			/*Exchange Vs Count begins*/
			var DestinationGrp_chart= plf.addChart({
                "id": "DestinationGrp",
				"xAxisCaption": "Destination",
                "xAxisColumn":"DG",
                "yAxisCaption": "Count",
				"chartTitle": "Destination Group View",
				"chartTheme":"chartTheme5",
				"heightFactor":.5,
				"popScreen":"",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"",
				"columnWidth": .3,
				seriesArray:[
					{type:"bar",field:["Count"]}					
				]				
            },this)
			/*Exchange Vs Count ends*/
			
			// Inbound grid sec begins
			var gridInboundobj=
			[										
				{columnname:"Traveller",dataname:"Traveller",datatype:"string",width:100},
				{columnname:"Approver",dataname:"Approver",datatype:"string",width:150},
				{columnname:"Date of Travel",dataname:"DateofReq",datatype:"string",width:100},
				{columnname:"Purpose",dataname:"Purpose",datatype:"string",width:100},
			]
			var gridInboundDtl=
			{
				title:"Pending Travel Requests",
				id:"cargoInBoundGrid",				
				detail:gridInboundobj,
				readonly:true,				
				removeTbar:true,
				removePaging:true,
				margin:2,
				heightFactor:.5,
				columnWidth:.7,
				widthBasis:"flex"
			}
			var tmpInbound = plf.addGrid(gridInboundDtl,this) 	
			/*Problem Vs Count ends*/
			
			
			
			
			//mainpage.ptrMainSection.add(SearchSection)			
			GraphSection.add(TRCurrentStatus_chart)
			GraphSection.add(purposeView_chart)			
			GraphSection.add(TravelType_chart)			
			GraphSection.add(DestinationGrp_chart)
			GraphSection.add(tmpInbound)
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
			"db_accomDash":
			{
				"dest":"TravelDashboard.AccommodationView",
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