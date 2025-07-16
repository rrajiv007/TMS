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
Ext.define('CueTrans.view.Report.JPCATReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Journey CAT Report";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		/*
		mainpage.toolbarLinks=
		[
			{"name":"Operational Reports","linkid":"operation_rpt"},
			{"name":"Statistical Reports","linkid":"rep_streports"}
		]
		*/
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var ReportsColumn = plf.addColumnSection({});	//69997
		
		var ReportsFormCtrl=							//69997
		[			
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			plf.addText({"label":"Journey Plan No",id:"strJourneyNoFrom"}),
			plf.addText({"label":"Inspection No",id:"strInspectionNoFrom"}),
			plf.addCombo({"label":"Region",id:"strRegion"}),
			plf.addCombo({"label":"Origin",id:"strRequestNoTo"}),
			plf.addCombo({"label":"Destination",id:"strShipmentNoTo"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity"}), 
			plf.addText({"label":"Carrier Code",id:"strCarrierCode"}),
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
		  plf.addButton({"label":"Show Details","id":"getjourneycatreport"}),
		 // plf.addButton({"label":"Generate PDF","id":"ListJourneyRpt"}),
		  plf.addBlank()		 
		  /*plf.addButton({"label":"Load","id":"LoadBuildingReport"}),		
		  plf.addButton({"label":"Inspection","id":"ListInspection"}),
		  plf.addButton({"label":"Journey Plan",id:"ListJourneyRpt"}),
		  */		
		]

       JourneySummarygrid=
		[   
			{columnname:"JP No",dataname:"JOURNEY_PLAN_NO",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:150},
			{columnname:"Region",dataname:"REGION",datatype:"string",width:100},
			{columnname:"Route Code",dataname:"ROUTE_CODE",datatype:"string",width:100},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:150},
			{columnname:"Load No",dataname:"WAYBILL_NO",datatype:"string",width:150},
			{columnname:"Load Decription",dataname:"LOAD_DESC",datatype:"string",width:150},
			{columnname:"Loading Point",dataname:"LOAD_AT",datatype:"string",width:150},
			{columnname:"Unloading Point",dataname:"DELV_AT",datatype:"string",width:150},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:150},
			{columnname:"Carrier",dataname:"CAR",datatype:"string",width:150},
			{columnname:"Vehicle No",dataname:"TRK_CODE",datatype:"string",width:100},
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:150},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:150},
			{columnname:"JM Name",dataname:"JOURNEY_MANAGER_NAME",datatype:"string",width:100},
			{columnname:"Driver Mobile No",dataname:"PHONE_NO",datatype:"string",width:100},
			{columnname:"JP Date",dataname:"JP_DT",datatype:"string",width:100},
			//{columnname:"JP Created Date",dataname:"CREATED_DATE",datatype:"string",width:100},
			//{columnname:"Departure Date",dataname:"DEPT_DT",datatype:"string",width:100},
			{columnname:"Departure Date",dataname:"DEPT_DT",datatype:"string",width:100},
			{columnname:"Departure Time",dataname:"DEPT_TM",datatype:"string",width:100},
			//{columnname:"Planned ETA",dataname:"PL_ETA",datatype:"string",width:100},
			{columnname:"Planned EDA",dataname:"PL_EDA",datatype:"string",width:100},
			{columnname:"Planned ETA",dataname:"PL_ETA",datatype:"string",width:100},
			{columnname:"Completed Date",dataname:"JPCLOSE_DT",datatype:"string",width:100}
				
		]
		JourneySummarydetails=
		{
			title:"Journey Summary Details",
			id:"journeysummarydtl",
			detail:JourneySummarygrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		JourneySummaryGridSection = plf.addGrid(JourneySummarydetails,this)		
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(JourneySummaryGridSection)//--Golive		
	
		mainpage.eventHandlers = 
		[	
			
			{ 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitReportJPCatScreen"
			},
			{       
				"controlid":"getjourneycatreport",
				"tasktype":"btnclick", 
				"input":[
							"strLoadNoFrom","strJourneyNoFrom","strInspectionNoFrom","strRegion","strRequestNoTo","strShipmentNoTo",	
							"strCommodity","strCarrierCode","strDriverCodeFrom","strVehicleCodeFrom","strInspectionNoTo","strJourneyNoTo",
							"dtDateFrom","dtDateTo"
						],
			    "service":"CoreReportService",
				"methodName":"printJPCAT"
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
