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
1.0.2	 Vidhya			    29-05-16      73191 	                                   
************************************************************************************************/
Ext.define('CueTrans.view.Report.coastalperformance', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Coastal Performance Report";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;	
		
		var ReportsColumn = plf.addColumnSection({});	//69997
		
		var ReportsFormCtrl=							//69997
		[		
			plf.addCombo({"label":"From Region",id:"strRegion"}),
			//plf.addCombo({"label":"Hub",id:"strHub"}),//Raj
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"To Region",id:"strDocNo"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addCombo({"label":"Carrier",id:"strCarrierCode"}),
			plf.addText({"label":"Scheduled Vehicle",id:"strVehicleCodeFrom"}),
			plf.addCombo({"label":"Vehicle Category",id:"strRequestNoFrom"}),
			plf.addText({"label":"Contract No",id:"strInspectionNoFrom"}),
			plf.addText({"label":"Reported Vehicle",id:"strShipmentNoFrom"}),
			plf.addText({"label":"Journey Plan No",id:"strJourneyNoFrom"}),
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			plf.addHidden({"label":"Delivery Status",id:"strStatus"}),
			plf.addCombo({"label":"Process Period","id":"strDateType"}),
			plf.addCombo({"label":"Date Type","id":"strVehicleType"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"})	,
			plf.addCombo({"label":"Ramadan Month","id":"strItemLevel"})
			
			/*plf.addText({"label":"Request No",id:"strRequestNoFrom"}),
			plf.addText({"label":"DO No",id:"strDocNo"}),
			plf.addText({"label":"Shipment No",id:"strShipmentNoFrom"}),	
			plf.addText({"label":"Vehicle No",id:"strVehicleCodeFrom"}),
			//plf.addCombo({"label":"Process Period","id":"strDateType"}),
			plf.addCombo({"label":"Date Type","id":"strVehicleType"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"})	*/		
			
		]
			
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({});	//69997
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Show Details","id":"getcoastalperf"}),
		 // plf.addButton({"label":"Generate PDF",id:"coastalperf"}),
		  plf.addBlank()
		
		]	
		coastalperformancegrid=
		[   
			//{columnname:"DO No",dataname:"DO_NO",datatype:"string",width:150},
			//{columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",width:150},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:"auto"},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:"auto"},
			{columnname:"Journey Plan No ",dataname:"JOURNEY_PLAN_NO",datatype:"string",width:"auto"},
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:"auto"},
			{columnname:"Scheduled Vehicle",dataname:"SCH_VEH",datatype:"string",width:"auto"},
			{columnname:"Contract No",dataname:"CONT_NO",datatype:"string",width:"auto"},
			{columnname:"Vehicle Category",dataname:"VEH_CAT",datatype:"string",width:"auto"},
			{columnname:"Reported Vehicle",dataname:"REP_VEH",datatype:"string",width:"auto"},		
			{columnname:"From Region",dataname:"REGION",datatype:"string",width:"auto"},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Origin Group",dataname:"ORIGIN_GROUP_NAME",datatype:"string",width:150},
			{columnname:"Loading Point",dataname:"LOADING_POINT",datatype:"string",width:"auto"},
			{columnname:"To Region",dataname:"TO_REGION",datatype:"string",width:"auto"},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
			{columnname:"Unloading Point",dataname:"UNLOADING_POINT",datatype:"string",width:"auto"},			
			{columnname:"JP Scheduled Date",dataname:"SCH_DATE",datatype:"date",width:150},
			{columnname:"Journey Departure Date",dataname:"DEPARTURE_DATE",datatype:"date",width:"auto"},	
			{columnname:"JP Closure Date",dataname:"JP_CLOSE_DT",datatype:"date",width:"auto"},	
			{columnname:"Early/Delay(Hrs)",dataname:"HRS",datatype:"string",width:"auto"},		
			{columnname:"Delivery Status",dataname:"DELV_STATUS",datatype:"string",width:200,hidden:true},
			{columnname:"Trip Summary",dataname:"TRIP_SUMMARY",datatype:"string",width:200,hidden:true},
			{columnname:"Time Buckets",dataname:"TIME_BUCKETS",datatype:"string",width:150,hidden:true},
			{columnname:"Coastal Performance Group",dataname:"COASTAL_PERF_GRP",datatype:"string",width:"auto"},
			{columnname:"Coastal Performance Status",dataname:"COASTAL_PERF_STATUS",datatype:"string",width:"auto"},
			{columnname:"Distance",dataname:"DISTANCE",datatype:"string",width:"auto"}
				
		]
		coastalperformancedetails=
		{
			title:"Coastal Performance Details",
			id:"coastalperformdtl",
			detail:coastalperformancegrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		coastalperformancegridsection = plf.addGrid(coastalperformancedetails,this)
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(coastalperformancegridsection)//--Golive		
		
		
		mainpage.eventHandlers = 
		[	
         { 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitCoastalPerfReportScreen"
			},
		{       
				"controlid":"coastalperf",
				"tasktype":"btnclick", 
				"input":["strRegion","strHub","strOrigin","strDestination","strStatus","strRequestNoFrom","strDocNo","strShipmentNoFrom","strLoadNoFrom",
						"strJourneyNoFrom","strVehicleCodeFrom","strInspectionNoFrom","strCarrierCode","strDateType","strVehicleType","dtDateFrom","dtDateTo",
						"strItemLevel"],
			    "service":"CoreReportService",
				"methodName":"printcoastalperformReport"
			},
{       
				"controlid":"getcoastalperf",
				"tasktype":"btnclick", 
				"input":["strRegion","strHub","strOrigin","strDestination","strStatus","strRequestNoFrom","strDocNo","strShipmentNoFrom","strLoadNoFrom",
						"strJourneyNoFrom","strVehicleCodeFrom","strInspectionNoFrom","strCarrierCode","strDateType","strVehicleType","dtDateFrom","dtDateTo",
						"strItemLevel"],
			    "service":"CoreReportService",
				"methodName":"printcoastalperformDtl"
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
