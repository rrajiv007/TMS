/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			           Remarks             
************************************************************************************************	
1.0.0	     Raj		    08/06/2018                          Comprehensive Load Report  		                                   
************************************************************************************************/
Ext.define('CueTrans.view.Report.ComprehensiveLoadReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Comprehensive Load Report";
		
		
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		
		var ReportsColumn = plf.addColumnSection({});
		
		var ReportsFormCtrl=							
		[	
			//plf.addCombo({"label":"From Region",id:"strRegion"}),
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			plf.addCombo({"label":"Date Type","id":"strDateType","mandatory":"true"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom","mandatory":"true"}),
			plf.addDate({"label":"Date To",id:"dtDateTo","mandatory":"true"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addCombo({"label":"From Region",id:"strRegion"}),
			plf.addCombo({"label":"To Region",id:"strDestRegion"}),
			plf.addText({"label":"Scheduled Vehicle",id:"strScheduleVeh"}),
			plf.addText({"label":"Reporting Vehicle",id:"strReportedVeh"}),
			plf.addText({"label":"Scheduled Trailer",id:"strVehicleCodeFrom"}),
			plf.addText({"label":"Reporting Trailer",id:"strVehicleNo"})
		
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=3
		var ReportsButtonColumn = plf.addColumnSection({});	
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Show Details","id":"getRequest"}),
		  plf.addBlank(),
		  		
		]
        ConsoReportgrid=
		[  
		
		{columnname:"Load Date",dataname:"LOAD_DATE",datatype:"string",width:100,hidden:true},
		{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:80},
		{columnname:"Departure Date",dataname:"DEPARTURE_DATE",datatype:"string",width:110},
		{columnname:"Delivered Date",dataname:"DELIVERED_DATE",datatype:"string",width:110},
		{columnname:"Load Status",dataname:"LOAD_STATUS",datatype:"string",width:80},
		{columnname:"Load Type",dataname:"LOAD_TYPE",datatype:"string",width:80},
		{columnname:"Load Category",dataname:"LOAD_CATEGORY",datatype:"string",width:110},
		{columnname:"Load Commodity",dataname:"LOAD_COMMODITY",datatype:"string",width:110},
		{columnname:"Total Load Weight (ton)",dataname:"TOTAL_LOAD_WT",datatype:"string",width:160},
		{columnname:"Actual Weight",dataname:"ACTUAL_WEIGHT",datatype:"string",width:110,colAlign:'right'},
		{columnname:"Load Description",dataname:"LOAD_DESCRIPTION",datatype:"string",width:120},
		{columnname:"Loading Point",dataname:"LOADING_POINT",datatype:"string",width:120},
		{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:120},
		{columnname:"Origin Location Type",dataname:"ORG_LOC_TYPE",datatype:"string",width:130},
		{columnname:"From Region",dataname:"FROM_REGION",datatype:"string",width:90},
		{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:120},
		{columnname:"Destination Location Type",dataname:"DEST_LOC_TYPE",datatype:"string",width:150},
		{columnname:"To Region",dataname:"TO_REGION",datatype:"string",width:90},
		{columnname:"Unloading Point",dataname:"UNLOADING_POINT",datatype:"string",width:120},
		{columnname:"Journey Plan No",dataname:"JOURNEY_PLAN_NO",datatype:"string",width:110},
		{columnname:"Trip Sheet No",dataname:"TRIP_SHEET_NO",datatype:"string",width:110},
		{columnname:"Trip Sheet Date",dataname:"TRIP_SHEET_DATE",datatype:"string",width:110},
		{columnname:"Trip Status",dataname:"TRIP_STATUS",datatype:"string",width:100},
		{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:110},
		{columnname:"Scheduled Vehicle",dataname:"SCHEDULED_VEHICLE",datatype:"string",width:120},
		{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:90},
		{columnname:"Reporting Vehicle",dataname:"REPORTING_VEHICLE",datatype:"string",width:120},
		{columnname:"Scheduled Trailer",dataname:"SCH_TRAILER",datatype:"string",width:120},
		{columnname:"Reporting Trailer",dataname:"REP_TRAILER",datatype:"string",width:120},
		{columnname:"Reporting Driver Code",dataname:"REP_DRIVER_CODE",datatype:"string",width:140},
		{columnname:"Reporting Driver Name",dataname:"REP_DRIVER_NAME",datatype:"string",width:140},
		{columnname:"Carrier Code",dataname:"CARRIER_CODE",datatype:"string",width:90},
		{columnname:"Load Distance",dataname:"LOAD_DISTANCE",datatype:"string",width:95,colAlign:'right'},
		{columnname:"Journey Distance",dataname:"JP_DISTANCE",datatype:"string",width:115,colAlign:'right'},
		{columnname:"Diversion Distance",dataname:"DIV_DISTANCE",datatype:"string",width:130,colAlign:'right'},
		{columnname:"Load Created Date",dataname:"LOAD_CREATED_DT",datatype:"string",width:110},
		{columnname:"Vehicle Allocated Date",dataname:"VEH_ALLOCATED_DT",datatype:"string",width:150},
		{columnname:"Vehicle Ins. Completed Date",dataname:"VEH_INSP_COMP_DT",datatype:"string",width:150},
		{columnname:"JP Departure - Planned Date",dataname:"JP_DEP_PLANNED_DT",datatype:"string",width:170},
		{columnname:"JP Departure - Actual Date",dataname:"JP_DEP_ACTUAL_DT",datatype:"string",width:170},
		{columnname:"Last Intransit Arrival Planned Date",dataname:"LAST_INTRANSIT_ARR_PLAN_DT",datatype:"string",width:180},
		{columnname:"Last Intransit Arrival Actual Date",dataname:"LAST_INTRANSIT_ARR_ACTUAL_DT",datatype:"string",width:180},
		{columnname:"Journey Closure Date",dataname:"JP_CLOSURE_DATE",datatype:"string",width:130},
		{columnname:"Coastal Early/Delay(Hrs)",dataname:"EARLY_DELAY",datatype:"string",width:170},
		{columnname:"Coastal Performance Group",dataname:"COASTAL_PERF_GRP",datatype:"string",width:200},
		{columnname:"Coastal Performance Status",dataname:"COASTAL_PERF_STATUS",datatype:"string",width:200},
		//{columnname:"Interior Performance Status",dataname:"INT_PERF_STATUS",datatype:"string",width:200},
		
		{columnname:"Truck Released Date",dataname:"TRUCK_RELEASED_DT",datatype:"string",width:130},
		{columnname:"Release To",dataname:"RELEASE_TO",datatype:"string",width:130},
		{columnname:"Journey Status",dataname:"JOURNEY_STATUS",datatype:"string",width:100},
		{columnname:"Backload Refused",dataname:"BACKLOAD_REFUSED",datatype:"string",width:115},
		{columnname:"Load Remarks",dataname:"LOAD_REMARKS",datatype:"string",width:115},
		{columnname:"Special Trailer",dataname:"SPECIAL_TRAILER",datatype:"string",width:115}
				
		]
		ConsoReportdetails=
		{
			title:"Comprehensive Load Details",
			id:"reqsummdetails",
			detail:ConsoReportgrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		ConsoReportSection = plf.addGrid(ConsoReportdetails,this)		
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(ConsoReportSection)
		
		mainpage.eventHandlers = 
		[	
            { 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"initComprehensiveLdRpt"
			},
			{		
				"controlid":"getRequest",
				"tasktype":"btnclick",
				"input":[
				         "strDateType","dtDateFrom","dtDateTo","strLoadNoFrom","strOrigin","strDestination",
						 "strRegion","strDestRegion","strScheduleVeh","strReportedVeh","strVehicleCodeFrom","strVehicleNo"
						],
				"service":"CoreReportService",
				"methodName":"getComprehensiveLdRpt"
							
			}	
		];
    mainpage.screenLinks=	
		{
		} 
		
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
