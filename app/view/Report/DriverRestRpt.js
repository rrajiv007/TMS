/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			           Remarks             
************************************************************************************************	
1.0.0	     Raj		    01/10/2020                         Driver rest Data Report  		                                   
************************************************************************************************/
Ext.define('CueTrans.view.Report.DriverRestRpt', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Driver Rest";
		
		
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		
		var ReportsColumn = plf.addColumnSection({});
		
		var ReportsFormCtrl=							
		[	
			plf.addText({"label":"Journey #",id:"strJourneyNoFrom"}),
			plf.addText({"label":"Load #",id:"strLoadNoFrom"}),
			plf.addText({"label":"Scheduled Vehicle",id:"strScheduleVeh"}),
			plf.addText({"label":"Reported Vehicle",id:"strReportedVeh"}),
			plf.addText({"label":"Reporting Driver Code",id:"strDriverCodeFrom"}),
				
			plf.addCombo({"label":"Date Type","id":"strDateType","mandatory":"true"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom","mandatory":"true"}),
			plf.addDate({"label":"Date To",id:"dtDateTo","mandatory":"true"})

		
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=3
		var ReportsButtonColumn = plf.addColumnSection({});	
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Show Details","id":"getDriRstDtl"}),
		  plf.addBlank(),
		  		
		]
        DriRstDtlReportgrid=
		[  
		{columnname:"Journey Plan #",dataname:"JOURNEY_PLAN_NO",datatype:"string",width:"auto"},
		{columnname:"Load #",dataname:"LOAD_NO",datatype:"string",width:"auto"},
		{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
		{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
		{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:"auto"},
		{columnname:"Scheduled Vehicle #",dataname:"SCHEDULED_VEHICLE_NO",datatype:"string",width:"auto"},
		{columnname:"Reported Vehicle #",dataname:"REPORTED_VEHICLE_NO",datatype:"string",width:"auto"},
		{columnname:"Journey Plan Date",dataname:"JOURNEY_PLAN_DATE",datatype:"string",width:"auto"},
		{columnname:"Journey Plan Status",dataname:"JOURNEY_PLAN_STATUS",datatype:"string",width:"auto"},
	    {columnname:"Journey Manager Name",dataname:"JOURNEY_MANAGER_NAME",datatype:"string",width:180},
		{columnname:"Reporting Driver Code",dataname:"REP_DRIVER_CODE",datatype:"string",width:"auto"},
		{columnname:"Reporting Driver Name",dataname:"REP_DRIVER_NAME",datatype:"string",width:"auto"},
		{columnname:"Departed Date",dataname:"DEPARTED_DATE",datatype:"string",width:"auto"},
		
		{columnname:"Validate Driver Rest",dataname:"VALIDATE_DRIVER_REST",datatype:"string",width:"auto"},
		{columnname:"# of IVMS Violations",dataname:"NO_IVMS_VIOLATIONS",datatype:"string",width:"auto",colAlign:'right'},
		{columnname:"Allocate Value",dataname:"ALLOCATE_VALUE",datatype:"string",width:"auto"},
		{columnname:"Allocate Reason",dataname:"ALLOCATE_REASON",datatype:"string",width:200}
		]
		DriRstDtlReportdetails=
		{
			title:"Driver Rest Details",
			id:"DriRestDetails",
			detail:DriRstDtlReportgrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		DriRstDtlReportSection = plf.addGrid(DriRstDtlReportdetails,this)		
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(DriRstDtlReportSection)
		
		mainpage.eventHandlers = 
		[	
            { 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"initDriverRestsdtl"
			},
			{		
				"controlid":"getDriRstDtl",
				"tasktype":"btnclick",
				"input":[
				         "strJourneyNoFrom","strLoadNoFrom","strScheduleVeh","strReportedVeh","strDriverCodeFrom","strDateType","dtDateFrom","dtDateTo"
						],
				"service":"CoreReportService",
				"methodName":"getDriverRestDatadtl"
							
			}	
		];
    mainpage.screenLinks=	
		{
		} 
		
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
