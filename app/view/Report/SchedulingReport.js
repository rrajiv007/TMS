/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var  		                                   
************************************************************************************************/
Ext.define('CueTrans.view.Report.SchedulingReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Scheduling Report";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		
		var ReportsColumn = plf.addColumnSection({});	
		
		var ReportsFormCtrl=							
		[			
			
			plf.addDate({"label":"From Date",id:"dtDateFrom","mandatory":"true"}),
			plf.addDate({"label":"To Date",id:"dtDateTo","mandatory":"true"})
			
			
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({});	
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Show details","id":"getSchReport"}),
		//  plf.addButton({"label":"Generate PDF","id":"vehicleRequest"}),
		  plf.addBlank(),
		
		]
		//Raj
		 var FetchVehicleAllocationReport=
		[   
			{columnname:"Action Date",dataname:"ACTION_DATE",datatype:"string",width:90},
			{columnname:"Action By",dataname:"ACTION_BY",datatype:"string",width:100},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:70},
			{columnname:"Load Status",dataname:"LOAD_STATUS",datatype:"string",width:120},
			{columnname:"Scheduled Date",dataname:"SCHEDULED_DATE",datatype:"string",width:100},
			{columnname:"Load Departure Date",dataname:"LOAD_DEP_DATE",datatype:"string",width:130},
			{columnname:"Vehicle Allocated Date",dataname:"VEHICLE_ALL_DATE",datatype:"string",width:135},
			{columnname:"Vehicle Allocated Type",dataname:"VEHICLE_ALL_TYPE",datatype:"string",width:135},
			{columnname:"Override Remarks",dataname:"OVERRIDE_REMARKS",datatype:"string",width:120},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:130},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:130},
			{columnname:"Loading Point",dataname:"LOADING_POINT",datatype:"string",width:110},
			{columnname:"Unloading Point",dataname:"UNLOADING_POINT",datatype:"string",width:110},
			{columnname:"Load Description",dataname:"LOAD_DESCRIPTION",datatype:"string",width:120},
			{columnname:"Scheduled Vehicle",dataname:"SCHEDULED_VEHICLE",datatype:"string",width:120},
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:100},
			{columnname:"Contractor Name",dataname:"CONTRACTOR_NAME",datatype:"string",width:130},
			{columnname:"Contractor Contact Number",dataname:"CONTRACTOR_CONT_NO",datatype:"string",width:165},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:130}
			
							
		]
		FetchVehicleAllocReportDetailsPlan=
		{
			title:"Fetch Vehicle Allocation Report",
			id:"Vehicle_Allocation",
			detail:FetchVehicleAllocationReport,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		 var FetchVehicleAllocGridSection = plf.addGrid(FetchVehicleAllocReportDetailsPlan,this)	
		 
		 //69950
		  var FetchSkipRosterReportGridFetchObj=
		[   
			{columnname:"Action Date",dataname:"ACTION_DATE",datatype:"string",width:90},
			{columnname:"Action By",dataname:"ACTION_BY",datatype:"string",width:100},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:70},
			{columnname:"Scheduled Date",dataname:"SCHEDULED_DATE",datatype:"string",width:100},
			{columnname:"Load Departure Date",dataname:"LOAD_DEP_DATE",datatype:"string",width:130},
			//{columnname:"Vehicle Allocated Date",dataname:"VEHICLE_ALL_DATE",datatype:"string",width:120},
			//{columnname:"Vehicle Allocated Type",dataname:"VEHICLE_ALL_TYPE",datatype:"string",width:120},
			//{columnname:"Override Remarks",dataname:"OVERRIDE_REMARKS",datatype:"string",width:120},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:130},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:130},
			{columnname:"Loading Point",dataname:"LOADING_POINT",datatype:"string",width:110},
			{columnname:"Unloading Point",dataname:"UNLOADING_POINT",datatype:"string",width:110},
			{columnname:"Load Description",dataname:"LOAD_DESCRIPTION",datatype:"string",width:120},
			//{columnname:"Scheduled Vehicle",dataname:"SCHEDULED_VEHICLE",datatype:"string",width:120},
			{columnname:"Vehicle Skipped",dataname:"VEHICLE_SKIPPED",datatype:"string",width:120},
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:100},
			{columnname:"Contractor Name",dataname:"CONTRACTOR_NAME",datatype:"string",width:130},
			{columnname:"Contractor Contact Number",dataname:"CONTRACTOR_CONT_NO",datatype:"string",width:165},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:130},
			{columnname:"Reason for Skip",dataname:"REASON_SKIP",datatype:"string",width:120}
			
		]
		FetchSkipRosterDetailsFetchPlan=
		{
			title:"Fetch Skip Roster Report",
			id:"Fetch_Skip_Roster",
			detail:FetchSkipRosterReportGridFetchObj,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		var FetchSkipRosterDetailsPlanGridSection = plf.addGrid(FetchSkipRosterDetailsFetchPlan,this)
		//3333333
		 //69950
		  var FetchRosterNextDayReportGridFetchObj=
		[   
			{columnname:"Action Date",dataname:"ACTION_DATE",datatype:"string",width:90},
			{columnname:"Action By",dataname:"ACTION_BY",datatype:"string",width:100},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:70},
			{columnname:"Scheduled Date",dataname:"SCHEDULED_DATE",datatype:"string",width:100},
			{columnname:"Load Departure Date",dataname:"LOAD_DEP_DATE",datatype:"string",width:130},
			//{columnname:"Vehicle Allocated Date",dataname:"VEHICLE_ALL_DATE",datatype:"string",width:120},
			//{columnname:"Vehicle Allocated Type",dataname:"VEHICLE_ALL_TYPE",datatype:"string",width:120},
			//{columnname:"Override Remarks",dataname:"OVERRIDE_REMARKS",datatype:"string",width:120},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:130},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:130},
			{columnname:"Loading Point",dataname:"LOADING_POINT",datatype:"string",width:110},
			{columnname:"Unloading Point",dataname:"UNLOADING_POINT",datatype:"string",width:110},
			{columnname:"Load Description",dataname:"LOAD_DESCRIPTION",datatype:"string",width:120},
			//{columnname:"Scheduled Vehicle",dataname:"SCHEDULED_VEHICLE",datatype:"string",width:120},
			{columnname:"Vehicle Marked Next Day",dataname:"VEHICLE_NEXT",datatype:"string",width:120},
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:100},
			{columnname:"Contractor Name",dataname:"CONTRACTOR_NAME",datatype:"string",width:130},
			{columnname:"Contractor Contact Number",dataname:"CONTRACTOR_CONT_NO",datatype:"string",width:165},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:130},
			{columnname:"Reason for Roster Next Day",dataname:"REASON_NEXT_DAY",datatype:"string",width:120}
			
		]
		FetchRosterNextDayDetailsFetchPlan=
		{
			title:"Fetch Roster Next Day Report",
			id:"Fetch_Roster_Next_Day",
			detail:FetchRosterNextDayReportGridFetchObj,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		var FetchRosterNextDayGridSection = plf.addGrid(FetchRosterNextDayDetailsFetchPlan,this)
		//3333333
		 
		var FetchMarkUnavailableReportGridFetchObj=
		[   
			{columnname:"Action Date",dataname:"ACTION_DATE",datatype:"string",width:90},
			{columnname:"Action By",dataname:"ACTION_BY",datatype:"string",width:100},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:70},
			{columnname:"Scheduled Date",dataname:"SCHEDULED_DATE",datatype:"string",width:100},
			{columnname:"Load Departure Date",dataname:"LOAD_DEP_DATE",datatype:"string",width:120},
			//{columnname:"Vehicle Allocated Date",dataname:"VEHICLE_ALL_DATE",datatype:"string",width:120},
			//{columnname:"Vehicle Allocated Type",dataname:"VEHICLE_ALL_TYPE",datatype:"string",width:120},
			//{columnname:"Override Remarks",dataname:"OVERRIDE_REMARKS",datatype:"string",width:120},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:130},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:130},
			{columnname:"Loading Point",dataname:"LOADING_POINT",datatype:"string",width:110},
			{columnname:"Unloading Point",dataname:"UNLOADING_POINT",datatype:"string",width:110},
			{columnname:"Load Description",dataname:"LOAD_DESCRIPTION",datatype:"string",width:120},
			//{columnname:"Scheduled Vehicle",dataname:"SCHEDULED_VEHICLE",datatype:"string",width:120},
			{columnname:"Vehicle Marked Unavailable",dataname:"VEHICLE_MARKED",datatype:"string",width:120},
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:100},
			{columnname:"Contractor Name",dataname:"CONTRACTOR_NAME",datatype:"string",width:130},
			{columnname:"Contractor Contact Number",dataname:"CONTRACTOR_CONT_NO",datatype:"string",width:165},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:130},
			{columnname:"Reason for Mark Unavailable",dataname:"REASON_MARK",datatype:"string",width:120}
			
		]
		FetchMarkUnavailableDetailsFetchPlan=
		{
			title:"Fetch Mark Unavailable Report",
			id:"Fetch_Mark_Unavailable",
			detail:FetchMarkUnavailableReportGridFetchObj,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		var FetchMarkUnavailableGridSection = plf.addGrid(FetchMarkUnavailableDetailsFetchPlan,this)
		
		var OtoSchSumObj=
		[   
			{columnname:"Vehicle Code",dataname:"VEH_CODE",datatype:"string",width:100},
			{columnname:"Contract No",dataname:"CONTRACT_NUM",datatype:"string",width:100},
			{columnname:"Vehicle Category",dataname:"VEH_CAT",datatype:"string",width:140},			
			{columnname:"Roster Allocation",dataname:"ASSIGN_LOAD",datatype:"string",width:140},
			{columnname:"Override Roster Allocation",dataname:"MAN_LOAD",datatype:"string",width:150},
			{columnname:"Total Allocation",dataname:"LOAD_ALLOC",datatype:"string",width:140},		
			{columnname:"Mark Unavailable",dataname:"MARK_UNAVAIL",datatype:"string",width:140},
			{columnname:"Roster Next Day",dataname:"ROST_NXT_DAY",datatype:"string",width:140},
			{columnname:"Skip Roster",dataname:"SKIP_ROST",datatype:"string",width:140}
		]
		var OtoSchSumPlan=
		{
			title:"OTO Scheduling Summary",
			id:"OtoSchSum",
			detail:OtoSchSumObj,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		var OtoSchSumGridSection = plf.addGrid(OtoSchSumPlan,this)
		
		var RosterBackupObj=
		[   
			{columnname:"Backup Date",dataname:"BACKUP_DT",datatype:"date",width:100}, 
			{columnname:"Sequence No",dataname:"SEQ_NO",datatype:"string",width:100}, 
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:100},
			{columnname:"Contract Name",dataname:"CONTRACT_NAME",datatype:"string",width:100},
			{columnname:"Contact No",dataname:"CONTACT_NO",datatype:"string",width:100},						
			{columnname:"Vehicle Code",dataname:"VEH_CODE",datatype:"string",width:100},
			{columnname:"Vehicle Regn No",dataname:"VEH_REGN",datatype:"string",width:180},
			{columnname:"Vehicle Category",dataname:"VEH_CAT",datatype:"string",width:150},
			{columnname:"Base Location",dataname:"BASE_LOCATION",datatype:"string",width:150},
			{columnname:"Carrier Code",dataname:"CAR_CODE",datatype:"string",width:100},
			{columnname:"Carrier Name",dataname:"CAR_NAME",datatype:"string",width:150},
			{columnname:"Next Roster date",dataname:"NXT_ROSTER_DATE",datatype:"string",width:130}
		]
		var RosterBackupDtl=
		{
			title:"Roster Sequence Backup",
			id:"rosterseq",
			detail:RosterBackupObj,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		var RosterBackupGridSection = plf.addGrid(RosterBackupDtl,this)
		//raj end
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		var baseTab = plf.addTabSection({ tabs:[
										FetchVehicleAllocGridSection,FetchSkipRosterDetailsPlanGridSection,
										FetchRosterNextDayGridSection,FetchMarkUnavailableGridSection,
										OtoSchSumGridSection,RosterBackupGridSection
												]});
		
		mainpage.ptrMainSection.add(baseTab)	
		
			
		mainpage.eventHandlers = 
		[	
        	{		 
				"controlid":"getSchReport",
				"tasktype":"btnclick",
				"input":[
						"dtDateFrom","dtDateTo"
						],
				"service":"CoreReportService",
				"methodName":"getSchedulingRoster"
							
			},
			
			{ 
				"controlid":"",
				"tasktype":"onload", 
				"input":["dtDateFrom","dtDateTo"],
				"service":"CoreReportService",
				"methodName":"InitSchedulingRoster"
			}		
		];
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
