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
Ext.define('CueTrans.view.OTOAPP.OTOViewJob', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this; 
		mainpage.startPainting();
		
		mainpage.screenName = "View Job Details";
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=[];
		
		mainpage.toolbarActions=
		[
		{
			"name": "Print Waybill",
			"tooltip": "Click here to print the waybill report."
		},
		 {
			"name": "Print Inspection",
			"tooltip": "Click here to print the inspection report."
		},
		{
			"name": "Print JP",
			"tooltip": "Click here to print the journey plan report."
		}
		]
		
		
		/*Job Details Starts here*/
		plf.columns=4
		var JobDetailSection = plf.addColumnSection({"title":"Job Details"});
		var JobDetailSectionCtrl = 
		[
		plf.addDisplayOnly({"label":"Job No",id:"strJobNo"}),
		plf.addDisplayOnly({"label":"Load No",id:"strLoadNo"}),
		plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
		plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
		plf.addDisplayOnly({"label":"Departure Date",id:"dtDepartureDt"}),
		plf.addDisplayOnly({"label":"Contractor Name",id:"strContractorName"}),
		plf.addDisplayOnly({"label":"Contract Number",id:"strContractNum"}),
		plf.addDisplayOnly({"label":"Contact Number",id:"strContactNo"}),
		plf.addDisplayOnly({"label":"Vehicle Registration #",id:"strVehRegNo"}),
		plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehCat"}),
		plf.addDisplayOnly({"label":"Vehicle Make",id:"strVehMake"}),
		plf.addDisplayOnly({"label":"Year of MFG",id:"strYearMfg"}),
		plf.addDisplayOnly({"label":"Loading Point",id:"strLoadingPoint"}),
		plf.addDisplayOnly({"label":"Unloading Point",id:"strUnloadingPoint"}),
		plf.addDisplayOnly({"label":"Special Trailer",id:"strSpecialTrailer"})
		]
		JobDetailSection.add(JobDetailSectionCtrl);
		/*Job Details Ends here*/
		
		/*Inspection Details Starts here*/
		plf.columns=4
		var InspectionDetailSection = plf.addColumnSection({"title":"Inspection Details"});
		var InspectionDetailSectionCtrl = 
		[
		plf.addDisplayOnly({"label":"Inspection No",id:"strInspectionNo"}),
		plf.addHidden({"label":"Inspection Date/Time",id:"dtInspDtTm"}),
		plf.addHidden({"label":"Inspection Name",id:"strInspectorName"}),
		plf.addDisplayOnly({"label":"Inspection Location",id:"strInsLoc"}),	
        plf.addDisplayOnly({"label":"Inspection Date",id:"dtInspDt"}),
        plf.addDisplayOnly({"label":"Inspection Time",id:"dtInspTm"}),	
        plf.addDisplayOnly({"label":"Inspection Time Slot",id:"dtInspTmSlot"}),			
		plf.addHidden({"label":"Inspection Bay #",id:"strInspBayNo"}),
		//plf.addHidden({"label":"Special Trailer",id:"strSpecialTrailer"}),
		plf.addDisplayOnly({"label":"Token No",id:"strTokenNo"}),
		plf.addHidden({"label":"Inspection Flag",id:"strInspectionFlag"})
		//plf.addDisplayOnly({"label":"Status",id:"strStatus"})
		]
		InspectionDetailSection.add(InspectionDetailSectionCtrl);
		/*Inspection Details Ends here*/
		
		/*Journey Details Starts here*/
		plf.columns=4
		var JourneyDetailSection = plf.addColumnSection({"title":"Journey Details"});
		var JourneyDetailSectionCtrl = 
		[
		plf.addDisplayOnly({"label":"Journey Plan No",id:"strJourneyPlanNo"}),
		plf.addDisplayOnly({"label":"Journey Plan Date",id:"dtJourneyPlanDate"}),
		plf.addDisplayOnly({"label":"Journey Mgr Name",id:"strJourneyManagerName"}),
		plf.addDisplayOnly({"label":"Journey Mgr #",id:"strPhoneNo"}),
		plf.addHidden({"label":"Journey Flag",id:"strJourneyFlag"})
		]
		JourneyDetailSection.add(JourneyDetailSectionCtrl);
		
		var planDtsGridFieldObj =
		[			
			{columnname:"Transit Location",dataname:"INTRANSIT_LOCATION",datatype:"string",width:180},			
			//{columnname:"Planned Arrival Date/Time",dataname:"PLANNED_ARRIVAL_DATE",datatype:"string",width:180},
			//{columnname:"Planned Departure Date/Time",dataname:"PLANNED_DEPARTURE_DATE",datatype:"string",width:180},
			
			{columnname:"Planned Arrival Date",dataname:"PLANNED_ARRIVAL_DATE",datatype:"string",width:150},
			{columnname:"Planned Arrival Time",dataname:"PLANNED_ARRIVAL_TIME",datatype:"string",width:150},
			{columnname:"Planned Departure Date",dataname:"PLANNED_DEPARTURE_DATE",datatype:"string",width:160},
			{columnname:"Planned Departure Time",dataname:"PLANNED_DEPARTURE_TIME",datatype:"string",width:160},
			//{columnname:"Actual Arrival Date/Time",dataname:"ACTUAL_ARRIVAL_DATE",datatype:"string",width:180},
			//{columnname:"Actual Departure Date/Time",dataname:"ACTUAL_DEPARTURE_DATE",datatype:"string",width:180}
			{columnname:"Actual Arrival Date",dataname:"ACTUAL_ARRIVAL_DATE",datatype:"string",width:150},
			{columnname:"Actual Arrival Time",dataname:"ACTUAL_ARRIVAL_TIME",datatype:"string",width:150},
			{columnname:"Actual Departure Date",dataname:"ACTUAL_DEPARTURE_DATE",datatype:"string",width:160},
			{columnname:"Actual Departure Time",dataname:"ACTUAL_DEPARTURE_TIME",datatype:"string",width:160}
		]
		var planDtsGridDtl=						
		{
			title:"Plan/Actual Details",
			id:"planDetails",
			detail:planDtsGridFieldObj,
			visibleRow:7,
			removePaging:true,
            removeExport:true,
			readonly:true,
			columnWidth:1
		}
		var planDtsGridSection = plf.addGrid(planDtsGridDtl,this)
		JourneyDetailSection.add(planDtsGridSection);
		
		var violationsDtsGridFieldObj=						
		[	
			{columnname:"LSR Violation Type",dataname:"LSR_TYPE",datatype:"string",width:125},
			{columnname:"LSR Violation Details",dataname:"LSR_NOTES",datatype:"string",width:400,inputFormat:"string",InputLength:"4000"},			
			{columnname:"File Name",dataname:"FILE_NAME",datatype:"string",width:150},
			{columnname:"File Id",dataname:"FILE_ID",datatype:"string",width:150,hidden:false},	
			{columnname:"Upload Document",dataname:"UPLOADDOCUMENT",datatype:"string",editControl:"fileupload",fileGroup:"JPLSR/Documents",width:150,nameColumn:"FILE_NAME"},
			/*
		    {columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:180},
			{columnname:"Violation Code",dataname:"VIOLATION_CODE",datatype:"string",width:180},
			{columnname:"Violation Type",dataname:"VIOLATION_TYPE",datatype:"string",width:180},
			{columnname:"Description",dataname:"VIOLATION_DESC",datatype:"string",width:180},
			{columnname:"Existing Violations",dataname:"EXISTING_VIOLATION",datatype:"string",colAlign:'right',width:120},
			{columnname:"Current Violation",dataname:"CURRENT_VIOLATION",datatype:"string",width:120,colAlign:'right'}
			*/
		]
		var violationsDtsGridDtl =
		{
			title:"LSR Violation Details",
			id:"violationDetails", 
			detail:violationsDtsGridFieldObj,
			visibleRow:7,
			removePaging:true,
            removeExport:true,
			readonly:true,
			visibleRow:10			
		}
		var violationsDtsGridSection = plf.addGrid(violationsDtsGridDtl,this)
		JourneyDetailSection.add(violationsDtsGridSection);
		/*Journey Details Ends here*/
		
		mainpage.ptrMainSection.add(JobDetailSection)
		mainpage.ptrMainSection.add(InspectionDetailSection)
		mainpage.ptrMainSection.add(JourneyDetailSection)
		/* Event Handlers Mapping Starts here*/
		mainpage.eventHandlers = 
		[
		{
			"controlid":"",
			"tasktype":"onload",
			"input":["strJobNo","strLoadNo"],
			"service":"OTOAppCoreServiceTS",
			"methodName":"OTOAPP_INITVIEWJOB"
	    },
		{
			"controlid":"",
			"tasktype":"toolbarclick",
			"action":"Print JP",
			"input":["strJourneyPlanNo"],
			"service":"CoreJourneyPlanService",
			"methodName":"PrintJourneyPlanReport"
		},
		{
			"controlid":"",
			"tasktype":"toolbarclick",
			"action":"Print Waybill",
			"input":["strLoadNo"],
			"service":"CoreReportService",
			"methodName":"PrintwaybillloadingReport"
		},
		{
			"controlid":"",
			"tasktype":"toolbarclick",
			"action":"Print Inspection",
			"input":["strInspectionNo","strInspectionType"],
			"service":"CoreReportService",
			"methodName":"PrintVehicleInspectReport"
		}
		]
		/* Event Handlers Mapping Ends here*/
		
		this.callParent(arguments);
		
	}
});
