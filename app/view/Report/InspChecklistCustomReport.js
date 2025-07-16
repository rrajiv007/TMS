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
Ext.define('CueTrans.view.Report.InspChecklistCustomReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Inspection Checklist - Custom Report";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		
		var ReportsColumn = plf.addColumnSection({});
		
		var ReportsFormCtrl=	
		[			
			plf.addCombo({"label":"Date Type","id":"strDateType","mandatory":"true"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom","mandatory":"true"}),
			plf.addDate({"label":"Date To",id:"dtDateTo","mandatory":"true"}),
			plf.addText({"label":"Scheduled Vehicle",id:"strScheduleVeh"}),
			plf.addText({"label":"Reported Vehicle",id:"strVehicleCodeFrom"})		
			
			
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=3
		var ReportsButtonColumn = plf.addColumnSection({});	
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Show details","id":"getInspCustomChk"}),
		  plf.addBlank()
		
		]
        InspectionChecklistCustomgrid=
		[   
		{columnname:"S.No",dataname:"S_NO",datatype:"integer",width:"auto"},
		{columnname:"Print Report",dataname:"INS",datatype:"string",width:130,gridReport:"PrintInspSumRep",imageURL:"resources/images/shared/calendar.gif",tooltip:"Click here to print Inspection Report."},
		{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:"auto"},
		{columnname:"Inspection Number",dataname:"INSPECTION_NO",datatype:"string",width:"auto"},
		{columnname:"Inspection Number",dataname:"strInspectionNo",datatype:"string",width:"auto",hidden:true},
		{columnname:"Inspection Date",dataname:"INSPECTION_DT",datatype:"string",width:"auto"},
		{columnname:"Inspection Completed Date/Time",dataname:"INSP_COMPLETED_DT_TM",datatype:"string",width:"auto"},
		{columnname:"Completed By",dataname:"COMPLETED_BY",datatype:"string",width:"auto"},
		{columnname:"Scheduled Vehicle",dataname:"SCHEDULED_VEHICLE",datatype:"string",width:"auto"},
		{columnname:"Reported Vehicle",dataname:"REPORTED_VEHICLE",datatype:"string",width:"auto"},
		{columnname:"Inspection Status",dataname:"INSP_STATUS",datatype:"string",width:"auto"},
		
		
		{columnname:"19 - Prime Mover Brake actuators",dataname:"PRIME_MOVER_BRAKE",datatype:"string",width:"auto"},
		{columnname:"26 - Trailer Brake actuators",dataname:"TRAILER_BRAKE_ACTUATORS",datatype:"string",width:"auto"},
		{columnname:"48 - Footbrake - operation and condition",dataname:"FOOTBRAKE",datatype:"string",width:"auto"},
		{columnname:"61 - Brake lights position and function (prime mover and trailer)",dataname:"BRAKE_LIGHTS",datatype:"string",width:"auto"},
		{columnname:"65 - Air leaks (able to maintain pressure)",dataname:"AIR_LEAKS",datatype:"string",width:"auto"},
		{columnname:"67 - Brake chambers",dataname:"BRAKE_CHAMBERS",datatype:"string",width:"auto"},
		{columnname:"68 - Air tank drain valves",dataname:"AIR_TANK_DRAIN",datatype:"string",width:"auto"},
		
		
		]
		InspectionChecklistCustomdetails=
		{
			title:"Inspection Details",
			id:"InspectionCustomChkDtl",
			detail:InspectionChecklistCustomgrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		InspectionChecklistCustomSection = plf.addGrid(InspectionChecklistCustomdetails,this)		
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(InspectionChecklistCustomSection)
		
			
		mainpage.eventHandlers = 
		[	
        	{		 
				"controlid":"getInspCustomChk",
				"tasktype":"btnclick",
				"input":[
						"strVehicleCodeFrom","strScheduleVeh","strDateType","dtDateFrom","dtDateTo"
						],
				"service":"CoreReportService",
				"methodName":"getCustomInspChkDtl"
							
			},
			
			{ 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitCustomInspChkDtl"
			},
            {
				"grideventid":"PrintInspSumRep",
				"tasktype":"gridonprint",
				"input":["strInspectionNo"],
				"service":"CoreReportService",
				"methodName":"PrintInspSummReport"
			}			
		];
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
