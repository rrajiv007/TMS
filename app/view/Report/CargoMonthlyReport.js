/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
                          
************************************************************************************************/
Ext.define('CueTrans.view.Report.CargoMonthlyReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Cargo Monthly Report";		
		
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		
		var ReportsColumn = plf.addColumnSection({});
		
		var ReportsFormCtrl=						
		[
		  plf.addCombo({"label":"Year",id:"dtDateFrom",mandatory:true}),
		  plf.addCombo({"label":"Month",id:"strLoadType",mandatory:true}),
		  plf.addCombo({"label":"Duration",id:"strDateType"}),
		  
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({});
		ReportsButtonCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Show Details","id":"btnShowDetails"}),
		  plf.addButton({"label":"Generate PDF","id":"btnGenerate"}),	  		  
		  plf.addBlank()
		]	
		
		ReportsButtonColumn.add(ReportsButtonCtrl);
		
		/****** REPORTS BUTTON SECTION BEGINS*****/
		
		var cargoMonthlyStatsSummaryObj=
		[
		  	{columnname:"Month Year",dataname:"MONTH_YY",datatype:"string",width:130},
			{columnname:"Year",dataname:"YEAR",datatype:"string",width:70},
            {columnname:"Month",dataname:"MONTH",datatype:"string",width:90},
            {columnname:"Number Of Scheduled Trips",dataname:"NUMBER_OF_SHEDULED_TRIPS",datatype:"date",width:200},
			{columnname:"Distance (KM)",dataname:"DISTANCE",datatype:"string",width:120},
			{columnname:"Weight (T)",dataname:"WEIGHT",datatype:"string",width:100},
			{columnname:"Trips by North",dataname:"TRIPS_BY_NORTH",datatype:"string",width:130},
			{columnname:"Trips by South",dataname:"TRIPS_BY_SOUTH",datatype:"string",width:130},
			{columnname:"Trips by Others",dataname:"TRIPS_BY_OTHERS",datatype:"string",width:130},
			{columnname:"Delivered Ontime (Standard Trips)",dataname:"DELIVERED_ONTIME_STD_TRIPS",datatype:"string",width:220},
			{columnname:"Delivered Overtime (Standard Trips)",dataname:"DELIVERED_OVERTIME_STD_TRIPS",datatype:"string",width:220},
            {columnname:"Delivered Overtime =>24",dataname:"DELIVERED_OVERTIME_LESS_24",datatype:"string",width:180},
            {columnname:"Delivered Overtime >24-48",dataname:"DELIVERED_OVERTIME_BTW_24_48",datatype:"date",width:180},
			{columnname:"Delivered Overtime >49-72",dataname:"DELIVERED_OVERTIME_BTW_49_72",datatype:"string",width:180},
			{columnname:"Delivered Overtime >72",dataname:"DELIVERED_OVERTIME_GREATER_72",datatype:"string",width:180},
			{columnname:"Delivered Ontime(Hotshot)",dataname:"DELIVERED_ONTIME_HOTSHOT",datatype:"string",width:180},
			{columnname:"Delivered Overtime (Hotshot)",dataname:"DELIVERED_OVERTIME_HOTSHOT",datatype:"string",width:180},
			{columnname:"Average Weight (Ton)",dataname:"AVERAGE_WEIGHT",datatype:"string",width:140},			
			{columnname:"Average Volume (%)",dataname:"AVERAGE_VOLUME",datatype:"string",width:140},
			{columnname:"Baiza Per Ton Per Km",dataname:"BAIZA_PER_TON_PER_KM",datatype:"string",width:180},
			{columnname:"Active Contracts Per Month",dataname:"ACTIVE_CONTRACTS_PER_MONTH",datatype:"string",width:220},
            {columnname:"Box Trucks Available",dataname:"BOX_TRUCKS_AVAILABLE",datatype:"string",width:150},
            {columnname:"Box Truck Total Trips",dataname:"BOX_TRUCK_TOTAL_TRIPS",datatype:"date",width:150},
			{columnname:"No SJP Issued",dataname:"NO_SJP_ISSUED",datatype:"string",width:120},
			{columnname:"Breakdown",dataname:"BREAKDOWN",datatype:"string",width:100},
			{columnname:"Driver (HSE)",dataname:"DRIVER_HSE",datatype:"string",width:100},
			{columnname:"No Driver",dataname:"NO_DRIVER",datatype:"string",width:80},
			{columnname:"Weather",dataname:"WEATHER",datatype:"string",width:90},			
			{columnname:"Other",dataname:"OTHER",datatype:"string",width:90},
			{columnname:"Spot Hire Canter",dataname:"SPOT_HIRE_CANTER",datatype:"string",width:150},
			{columnname:"Spot Hire Box Truck",dataname:"SPOT_HIRE_BOX_TRUCK",datatype:"string",width:150},
            {columnname:"Spot Hire 40' Flat Bed",dataname:"SPOT_HIRE_40_FLAT_BED",datatype:"string",width:160},
            {columnname:"Spot Hire Extendable Trailer",dataname:"SPOT_HIRE_EXTENDABLE_TRAILER",datatype:"date",width:180},
			{columnname:"Spot Hire Lowdbed",dataname:"SPOT_HIRE_LOWDBED",datatype:"string",width:150},
			{columnname:"Spot Hire Canter cost",dataname:"SPOT_HIRE_CANTER_COST",datatype:"string",width:180},
			{columnname:"Spot Hire Box Truck cost",dataname:"SPOT_HIRE_BOX_TRUCK_COST",datatype:"string",width:180},
			{columnname:"Spot Hire 40' Flat Bed cost",dataname:"SPOT_HIRE_40_FLAT_BED_COST",datatype:"string",width:200},
			{columnname:"Spot Hire Extendable Trailer cost",dataname:"SPOT_HIRE_EXTEND_TRAILER_COST",datatype:"string",width:350},
	        {columnname:"Spot Hire Lowbed cost",dataname:"SPOT_HIRE_LOWBED_COST",datatype:"string",width:180},
			{columnname:"ADS Total Trips N",dataname:"ADS_TOTAL_TRIPS_N",datatype:"string",width:150},
			{columnname:"ATE  Total Trips S",dataname:"ATE_TOTAL_TRIPS_S",datatype:"string",width:150},
			{columnname:"STST  Total Trips N",dataname:"STST_TOTAL_TRIPS_N",datatype:"string",width:180},
			{columnname:"WGCC  Total Trips S",dataname:"WGCC_TOTAL_TRIPS_S",datatype:"string",width:180},
			{columnname:"AH Total N",dataname:"AH_TOTAL_N",datatype:"string",width:110},
			{columnname:"WPAI Total S",dataname:"WPAI_TOTAL_S",datatype:"string",width:110},
			{columnname:"STS Total S",dataname:"STS_TOTAL_S",datatype:"string",width:110},
			{columnname:"GPS Total S",dataname:"GPS_TOTAL_S",datatype:"string",width:110},
			{columnname:"BEC Total S",dataname:"BEC_TOTAL_S",datatype:"string",width:110},
			{columnname:"ADS Direct (N)",dataname:"ADS_DIRECT_N",datatype:"string",width:110},
			{columnname:"ATE Direct (S)",dataname:"ATE_DIRECT_S",datatype:"string",width:110},
			{columnname:"STST Direct (N)",dataname:"STST_DIRECT_N",datatype:"string",width:110},
			{columnname:"WGCC Direct (S)",dataname:"WGCC_DIRECT_S",datatype:"string",width:110},
			{columnname:"AH Direct (N)",dataname:"AH_DIRECT_N",datatype:"string",width:110},
			{columnname:"WPAI Direct (S)",dataname:"WPAI_DIRECT_S",datatype:"string",width:110},
			{columnname:"STS Direct (S)",dataname:"STS_DIRECT_S",datatype:"string",width:110},
			{columnname:"GPS Direct (S)",dataname:"GPS_DIRECT_S",datatype:"string",width:110},
			{columnname:"BEC Direct (S)",dataname:"BEC_DIRECT_S",datatype:"string",width:110},
			{columnname:"Direct Deliver Saving North (OR4.275)",dataname:"DIRECT_DELV_SAVING_N_OR4_275",datatype:"string",width:280},
			{columnname:"Direct Deliver Saving South (OR3.750)",dataname:"DIRECT_DELV_SAVING_S_OR3_750",datatype:"string",width:280},
			{columnname:"Direct Deliver Saving Total",dataname:"DIRECT_DELV_SAVING_TOTAL",datatype:"string",width:220},
			{columnname:"Harsh Acceleration",dataname:"HARSH_ACCEL",datatype:"string",width:180},
			{columnname:"Harsh Breaking",dataname:"HARSH_BREAK",datatype:"string",width:120},
			{columnname:"Over Speeding",dataname:"OVER_SPEED",datatype:"string",width:120},
			{columnname:"Late Departure (V1)",dataname:"LATE_DEPART_V1",datatype:"string",width:140},
			{columnname:"Unauthorised Asset Change (V2)",dataname:"UNAUTH_ASSET_CHGE_V2",datatype:"string",width:220},
			{columnname:"Unauthorised Driver Change(V3)",dataname:"UNAUTH_DRIVER_CHGE_V3",datatype:"string",width:220},
			{columnname:"Did Not Contact JMC (V4)",dataname:"DID_NOT_CONTACT_JMC_V4",datatype:"string",width:220},
			{columnname:"Failure To Take Rest (V5)",dataname:"FAILURE_TO_TAKE_REST_V5",datatype:"string",width:220},
			{columnname:"Arrived Early (V6)",dataname:"ARRIVED_EARLY_V6",datatype:"string",width:140},
			{columnname:"Arrived Late (V7)",dataname:"ARRIVED_LATE_V7",datatype:"string",width:120},
			{columnname:"Night Driving (V8)",dataname:"NIGHT_DRIVING_V8",datatype:"string",width:120},
			{columnname:"IVMS Fault (V9)",dataname:"IVMS_FAULT_V9",datatype:"string",width:120},
			{columnname:"Active",dataname:"ACTIVE",datatype:"string",width:90},
			{columnname:"Counselled",dataname:"COUNSEL",datatype:"string",width:90},
			{columnname:"First Warning",dataname:"FIRST_WARN",datatype:"string",width:120},
			{columnname:"Second Warning",dataname:"SECOND_WARN",datatype:"string",width:130},
			{columnname:"Suspended",dataname:"SUSP",datatype:"string",width:90},
			{columnname:"Terminated",dataname:"TERMI",datatype:"string",width:90},
			{columnname:"Off",dataname:"OFF",datatype:"string",width:90},
			{columnname:"SLA Comments",dataname:"SLA_CMTS",datatype:"string",width:120},
			{columnname:"Coast to North(24hrs on-time)",dataname:"C_TO_N_24HRS_ON_TIME",datatype:"string",width:220},
			{columnname:"Coast to North(24hrs over time)",dataname:"C_TO_N_24HRS_OVER_TM",datatype:"string",width:220},
			{columnname:"Coast to South(72hrs on-time)",dataname:"C_TO_S_72HRS_ON_TM",datatype:"string",width:220},
			{columnname:"Coast to South(72 over time)",dataname:"C_TO_S_72_OVER_TM",datatype:"string",width:220},
			{columnname:"Sohar to North(36hrs on-time)",dataname:"SOH_TO_N_36HRS_ON_TM",datatype:"string",width:220},
			{columnname:"Sohar to North(36hrs over time)",dataname:"SOH_TO_N_36HRS_OVER_TM",datatype:"string",width:220},
			{columnname:"Sohar to South(72hrs on-time)",dataname:"SOH_TO_S_72HRS_ON_TM",datatype:"string",width:220},
			{columnname:"Sohar to South(72hrs over time)",dataname:"SOH_TO_S_72HRS_OVER_TM",datatype:"string",width:220},
			{columnname:"Consolidated Shipments received",dataname:"CONSOLID_SHIP_RECEIVED",datatype:"string",width:220},
			{columnname:"Processed within 72hrs",dataname:"PROCESSED_WITHIN_72HRS",datatype:"string",width:150},
			{columnname:"Processed over 72hrs",dataname:"PROCESSED_OVER_72HRS",datatype:"string",width:150},
			{columnname:"Number of scheduled Trips from Sumitomo to North",dataname:"NO_OF_SCHE_TRIP_SUMI_TO_N",datatype:"string",width:350},
			{columnname:"Number of scheduled Trips from Sumitomo to South",dataname:"NO_OF_SCHE_TRIP_SUMI_TO_S",datatype:"string",width:350},
			{columnname:"Ghala CCC to North",dataname:"G_CCC_TO_N",datatype:"string",width:150},
			{columnname:"Ghala CCC to South",dataname:"G_CCC_TO_S",datatype:"string",width:150},
			{columnname:"Ghala CCC to Coast",dataname:"G_CCC_TO_C",datatype:"string",width:150},
			{columnname:"Sohar to North",dataname:"SOH_TO_N",datatype:"string",width:120},
			{columnname:"Sohar to South",dataname:"SOH_TO_S",datatype:"string",width:120},
			{columnname:"Sohar to Coast",dataname:"SOH_TO_C",datatype:"string",width:120},
			{columnname:"Duqm to North",dataname:"DQ_TO_N",datatype:"string",width:120},
			{columnname:"Duqm to South",dataname:"DQ_TO_S",datatype:"string",width:120},
			{columnname:"Duqm to Coast",dataname:"DQ_TO_C",datatype:"string",width:120},
			{columnname:"Duqm to North (36hrs on time)",dataname:"DQ_TO_N_36HRS_ON_TM",datatype:"string",width:220},
			{columnname:"Duqm to North(36hrs over time)",dataname:"DQ_TO_N_36HRS_OVER_TM",datatype:"string",width:220},
			{columnname:"Duqm to South (24hrs on time)",dataname:"DQ_TO_S_24HRS_ON_TM",datatype:"string",width:220},
			{columnname:"Duqm to South(24hrs over time)",dataname:"DQ_TO_S_24HRS_OVER_TM",datatype:"string",width:220},
			{columnname:"Duqm to Coast (72hrs on time)",dataname:"DQ_TO_C_72HRS_ON_TM",datatype:"string",width:220},
			{columnname:"Duqm to Coast (72hrs over time)",dataname:"DQ_TO_C_72HRS_OVER_TM",datatype:"string",width:220}			
			
		]
		cargoMonthlyStatsSummaryGridDetail=
		{
			title:"",
			id:"cargoMonthlyGrid",
			detail:cargoMonthlyStatsSummaryObj,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true
			
		}
		var cargoMonthlyStatsSummaryGridSection = plf.addGrid(cargoMonthlyStatsSummaryGridDetail,this)
		
		
		/****** REPORTS BUTTON SECTION ENDS*****/
		
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(cargoMonthlyStatsSummaryGridSection)
		
		
		mainpage.eventHandlers = 
		[	
            { 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"INITCARGOMONTHLYRPT"
			},
			{		
				"controlid":"btnGenerate",
				"tasktype":"btnclick",
				"input":[
						"strLoadType","strDateType","dtDateFrom"			
						],
				"service":"CoreReportService",
				"methodName":"PrintCargoMonthlyReport"
							
			},
			{		
				"controlid":"btnShowDetails",
				"tasktype":"btnclick",
				"input":[
						"strLoadType","strDateType","dtDateFrom"			
						],
				"service":"CoreReportService",
				"methodName":"SEARCH_CARGOMONTHLYRPT"
							
			}
		];	
				
		this.callParent(arguments);		
	}
});
