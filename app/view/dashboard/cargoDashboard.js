Ext.define('CueTrans.view.dashboard.cargoDashboard',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Cargo Dashboard";
			
            // Add Toolbar
            mainpage.toolbarSectionFlag = true;	
			mainpage.liveScreenFlag=true;
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
		
		
			plf.columns = 1
            var tmpRow2 = plf.addGenSection({})
			//var tmpTitle=["Normal","Urgent"];
			
			// Grid1 sec begins
			var gridcustobj=
			[										
				{columnname:"Truck No",dataname:"TRUCK_CODE",datatype:"string",width:100},
				{columnname:"Last Stop ",dataname:"LAST_STOP",datatype:"string",width:100},
				{columnname:"Arrival Time",dataname:"ARRIVAL_TIME",datatype:"string",width:100},
				{columnname:"From",dataname:"FROM",datatype:"string",width:100},
				{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:100},
				{columnname:"Waybill No",dataname:"WAYBILL_NO",datatype:"string",width:100},
				{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:100},
				{columnname:"ROS Date",dataname:"ROS_DATE",datatype:"string",width:100},
			]
			var gridcustDtl=
			{
				title:"",
				id:"inbound_dtl",
				removetoolbar:true,
				detail:gridcustobj,
				visibleRow:plf.searchVisibleRows,
				readOnly:true,
				removeAddDelete:true,
				removeFilter:true
			}
			var tmpChart1 = plf.addGrid(gridcustDtl,this) 
			
			// Grid sec ends	
			
			
			// Grid2 sec begins
			var gridcustobj=
			[										
				{columnname:"Truck No",dataname:"TRUCK_CODE",datatype:"string",width:100},
				{columnname:"Last Stop ",dataname:"LAST_STOP",datatype:"string",width:100},
				{columnname:"Arrival Time",dataname:"ARRIVAL_TIME",datatype:"string",width:100},
				{columnname:"From",dataname:"FROM",datatype:"string",width:100},
				{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:100},
				{columnname:"Waybill No",dataname:"WAYBILL_NO",datatype:"string",width:100},
				{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:100},
				{columnname:"ROS Date",dataname:"ROS_DATE",datatype:"string",width:100},
			]
			var gridcustDtl=
			{
				title:"",
				id:"outbound_dtl",
				removetoolbar:true,
				detail:gridcustobj,
				visibleRow:plf.searchVisibleRows,
				readOnly:true,
				removeAddDelete:true,
				removeFilter:true
			}
			var tmpChart2 = plf.addGrid(gridcustDtl,this) 
			
			// Grid sec ends			
			
			// Grid3 sec begins
			var gridcustobj=
			[										
				{columnname:"Truck No",dataname:"TRCUK_NO",datatype:"string",width:100},
				{columnname:"Event",dataname:"STATUS",datatype:"string",width:300},
			]
			var gridcustDtl=
			{
				title:"",
				id:"Last30Mins_dtl",
				removetoolbar:true,
				detail:gridcustobj,
				visibleRow:plf.searchVisibleRows,
				readOnly:true,
				removeAddDelete:true,
				removeFilter:true
			}
			var tmpChart3 = plf.addGrid(gridcustDtl,this) 
			
			// Grid sec ends
			
			// Grid4 sec begins
			var gridcustobj=
			[										
				{columnname:"Origin & Destin",dataname:"ORG_DES",datatype:"string",width:100},
				{columnname:"Inbound-<BR>Arrived",dataname:"INB_ARR",datatype:"string",width:100},
				{columnname:"Inbound-<BR>Intransit",dataname:"INB_INT",datatype:"string",width:100},
				{columnname:"Outbound-<BR>Arrived",dataname:"OUT_ARR",datatype:"string",width:100},
				{columnname:"Outbound-<BR>Intransit",dataname:"OUT_INT",datatype:"string",width:100},
			]
			var gridcustDtl=
			{
				title:"",
				id:"loadSummary_dtl",
				removetoolbar:true,
				detail:gridcustobj,
				visibleRow:plf.searchVisibleRows,
				readOnly:true,
				removeAddDelete:true,
				removeFilter:true
			}
			var tmpChart4 = plf.addGrid(gridcustDtl,this) 
			
			// Grid sec ends
			
			
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
						"gr_Inbound": tmpChart1,
						"gr_Outbound": tmpChart2,
						"gr_Last30Mins": tmpChart3,
						"gr_LoadSummary": tmpChart4,
											
					},
                "svgURL": "resources/images/svg/cargoDashboard/cargoDashboard.svg"
            }))
			//mainpage.ptrMainSection.add(tmpRow1) //Add Header Section to Main Page  
			mainpage.ptrMainSection.add(tmpRow1)
			mainpage.ptrMainSection.add(tmpRow2) 
            
			mainpage.eventHandlers = 
			[
			
			{
					"tasktype":"proto",
					"filename":"dashboard/Cargo_dashboard.json"
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
				
				"jms_current":
				{
					"dest":"dashboard.journeyPlan",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
			}
			this.callParent(arguments);
        },
		triggerLink:function()
		{
		alert("Test");
		}

    });