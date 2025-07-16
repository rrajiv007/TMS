/************************************************************************************************
							      ModificationHistory      									                               	
************************************************************************************************
Description	  :	Journey Start Pending                                                                   		         
Author		  : Vidhya																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
************************************************************************************************/
Ext.define('CueTrans.view.Report.Journeystartpending', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Journey Start Pending";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		
		var ReportsColumn = plf.addColumnSection({});	
		
		var ReportsFormCtrl=							
		[			
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			plf.addText({"label":"Journey Plan No",id:"strJourneyNoFrom"}),
			plf.addText({"label":"Inspection No",id:"strInspectionNoFrom"}),
			plf.addCombo({"label":"Region",id:"strRegion"}),
			plf.addCombo({"label":"Origin",id:"strRequestNoTo"}),
			plf.addCombo({"label":"Destination",id:"strShipmentNoTo"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity"}), 
			plf.addCombo({"label":"Carrier Code",id:"strCarrierCode"}),
			plf.addText({"label":"Driver Code",id:"strDriverCodeFrom"}),
			plf.addText({"label":"Vehicle Code",id:"strVehicleCodeFrom"}),
			plf.addText({"label":"DO No",id:"strInspectionNoTo"}),			
			plf.addCombo({"label":"Date Type","id":"strJourneyNoTo"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"})
			
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({});	//69997
		ReportsFormCtrl=
		[
		   plf.addBlank(),
		  plf.addButton({"label":"Show Details","id":"jourpendtlreport"}),
		 // plf.addButton({"label":"Generate PDF","id":"ListJourneyRpt"}),
		  plf.addBlank()
		
		]	
		
		jtareportgrid=
		[   
			{columnname:"JP No",dataname:"JOURNEY_PLAN_NO",datatype:"string",width:90},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100},
			{columnname:"Region",dataname:"REGION",datatype:"string",width:100},
			{columnname:"Route Code",dataname:"ROUTE_CODE",datatype:"string",width:100},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:150},
			{columnname:"Load No",dataname:"WAYBILL_NO",datatype:"string",width:100},
			{columnname:"Load Description",dataname:"LOAD_DESC",datatype:"string",width:150},
			{columnname:"Loading Point",dataname:"LOAD_AT",datatype:"string",width:100},
			{columnname:"Unloading Point",dataname:"DELV_AT",datatype:"string",width:100},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:150},
			{columnname:"Carrier",dataname:"CAR",datatype:"string",width:150},
			{columnname:"Vehicle No",dataname:"TRK_CODE",datatype:"string",width:100},
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:150},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:150},
			{columnname:"JM Name",dataname:"JOURNEY_MANAGER_NAME",datatype:"string",width:100},
			{columnname:"Driver Mobile No",dataname:"PHONE_NO",datatype:"string",width:100},
			{columnname:"JP Date",dataname:"JP_DT",datatype:"date",width:100},
			{columnname:"Departure Date",dataname:"DEPT_DT",datatype:"date",width:100},
            {columnname:"Departure Time",dataname:"DEPT_TIME",datatype:"date",width:100},
            {columnname:"Planned ETA Date",dataname:"PL_ETA_DT",datatype:"date",width:100},
            {columnname:"Planned ETA Time",dataname:"PL_ETA_TIME",datatype:"date",width:100},
			{columnname:"Completed Date",dataname:"JPCLOSE_DT",datatype:"date",width:100},
			//{columnname:"Insp Completed Date",dataname:"INSP_DATE",width:100},
			//{columnname:"Insp Completed Time",dataname:"INSP_TIME",width:100}
			{columnname:"Insp Completed Date & Time",dataname:"INSP_CMPDATE",width:200}	
		]	
		jtareportdetails=
		{
			title:"",
			id:"jourpendtl",
			detail:jtareportgrid,
			visibleRow:15,
			removeExport:false,
			readonly:true,
			"rowHighlight":true
		}
		jtareportGridSection = plf.addGrid(jtareportdetails,this)
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(jtareportGridSection)//--Golive		
		
		mainpage.eventHandlers = 
		[	
         
			{ 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitReportScreen_JPS"
			},
{       
				"controlid":"jourpendtlreport",
				"tasktype":"btnclick", 
				"input":[
							"strLoadNoFrom","strJourneyNoFrom","strInspectionNoFrom","strRegion","strRequestNoTo","strShipmentNoTo",	
							"strCommodity","strCarrierCode","strDriverCodeFrom","strVehicleCodeFrom","strInspectionNoTo","strJourneyNoTo",
							"dtDateFrom","dtDateTo"
						],
			    "service":"CoreReportService",
				"methodName":"printJourPending"
			}		
		];
mainpage.screenLinks=	
		{	
				"operation_rpt":
				{
					"dest":"Report.Report",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
	"rep_streports":
				{
					"dest":"Report.StatisticalReport",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		} 
		
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
