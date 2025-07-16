
Ext.define('CueTrans.view.Report.JourneyComplianceReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Journey Compliance Report";
		
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
			plf.addCombo({"label":"Region",id:"strRegion"}),
			plf.addCombo({"label":"Hub",id:"strHub"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addText({"label":"Journey Plan No",id:"strJourneyNoFrom"}),
			plf.addText({"label":"Journey Manager",id:"strJMname"}), 
			plf.addText({"label":"Driver Name",id:"strDriverCodeFrom"}),
			plf.addText({"label":"Driver Mobile No",id:"strMobileNo"}),
			plf.addText({"label":"Vehicle No",id:"strVehicleCodeFrom"}),
			plf.addText({"label":"Contract No",id:"strContractNo"}),
			plf.addText({"label":"Trip No",id:"strTripNo"}),	
			plf.addCombo({"label":"Journey Status","id":"strStatus"}),
			plf.addCombo({"label":"Carrier",id:"strCarrierCode"}),
			plf.addCombo({"label":"Compliance",id:"strCompliance"}),
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"}),
			plf.addCombo({"label":"Year",id:"strYear"}),
			plf.addCombo({"label":"Month To",id:"strMonth"})

			/*
			plf.addText({"label":"Request No",id:"strRequestNoFrom"}),
			plf.addText({"label":"Shipment No",id:"strShipmentNoFrom"}),
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			plf.addText({"label":"Journey Plan No",id:"strJourneyNoFrom"}),
			plf.addText({"label":"Inspection No",id:"strInspectionNoFrom"}),
			plf.addCombo({"label":"Region",id:"strRegion"}),
			plf.addCombo({"label":"Origin",id:"strRequestNoTo"}),
			plf.addCombo({"label":"Destination",id:"strShipmentNoTo"}),
			plf.addCombo({"label":"Priority",id:"strPriority"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity"}), 
			plf.addText({"label":"Carrier Code",id:"strCarrierCode"}),
			plf.addText({"label":"Driver Code",id:"strDriverCodeFrom"}),
			plf.addText({"label":"Vehicle Code",id:"strVehicleCodeFrom"}),
			plf.addText({"label":"DO No",id:"strInspectionNoTo"}),			
			plf.addCombo({"label":"Logistics Group","id":"strLoadNoTo"}),
			plf.addCombo({"label":"Status","id":"strLocation"}),
			plf.addCombo({"label":"Date Type","id":"strJourneyNoTo"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"})
			*/
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({});	//69997
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Show Details","id":"getjourneycomp"}),
		  plf.addButton({"label":"Generate PDF",id:"journeycomp"}),
		  plf.addBlank()
		
		]	
		JourneyCompliancegrid=
		[   
			{columnname:"JP No",dataname:"JOURNEY_PLAN_NO",datatype:"string",width:100},
			{columnname:"Journey Status",dataname:"JOURNEY_STATUS",datatype:"string",width:150},
			{columnname:"Region",dataname:"REGION",datatype:"string",width:100},
			{columnname:"Route Code",dataname:"ROUTE_CODE",datatype:"string",width:100},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:100},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:100},
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:100},
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:150},
			{columnname:"Vehicle No",dataname:"TRUCK_REG_NO",datatype:"string",width:100},
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:100},
			{columnname:"Blue Key No",dataname:"BLUE_KEY_NO",datatype:"string",width:100},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:150},
			{columnname:"Driver Mobile No",dataname:"PHONE_NO",datatype:"string",width:100},
			{columnname:"Night Driving",dataname:"NIGHT_DRV",datatype:"string",width:100},
			{columnname:"Route Leg",dataname:"ROUTE_LEG_DESC",datatype:"string",width:100},
			{columnname:"Planned Arrival Time",dataname:"PLANNED_ARRIVAL_TIME",datatype:"string",width:150},
			{columnname:"Actual Arrival Time",dataname:"ACTUAL_ARRIVAL_TIME",datatype:"string",width:150},
			{columnname:"Arrival Variance",dataname:"AVARIANCE",datatype:"string",width:150},
			{columnname:"Planned Dept Time",dataname:"PLANNED_DEPARTURE_TIME",datatype:"string",width:150},
			{columnname:"Actual Dept Time",dataname:"ACTUAL_DEPARTURE_TIME",datatype:"string",width:150},
			{columnname:"Departure Variance",dataname:"DVARIANCE",datatype:"string",width:150},
			{columnname:"Journey Leg status",dataname:"JPLEG_STATUS",datatype:"string",width:100},
			{columnname:"Compliance Status",dataname:"COMPLIANCE_DESC",datatype:"string",width:125},			
			{columnname:"Seq No",dataname:"SEQ_NO",datatype:"string",width:125,hidden:true}
			
				
		]
		JourneyCompliancedetails=
		{
			title:"Journey Compliance Details",
			id:"journeycompliancedtl",
			detail:JourneyCompliancegrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		JourneyCompianceGridSection = plf.addGrid(JourneyCompliancedetails,this)
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(JourneyCompianceGridSection)//--Golive		
		
		
		mainpage.eventHandlers = 
		[	
		         { 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitReportScreenjpcomp"
			},

			{       
				"controlid":"journeycomp",
				"tasktype":"btnclick", 
				"input":[
					"strRegion","strHub","strOrigin","strDestination","strJourneyNoFrom","strJMname","strDriverCodeFrom","strMobileNo","strVehicleCodeFrom",
					"strContractNo","strTripNo","strStatus","strCarrierCode","strCompliance","strDateType","dtDateFrom","dtDateTo","strYear","strMonth"
					],
			    "service":"CoreReportService",
				"methodName":"printjourneycomplReport"
			},
			{       
				"controlid":"getjourneycomp",
				"tasktype":"btnclick", 
				"input":[
					"strRegion","strHub","strOrigin","strDestination","strJourneyNoFrom","strJMname","strDriverCodeFrom","strMobileNo","strVehicleCodeFrom",
					"strContractNo","strTripNo","strStatus","strCarrierCode","strCompliance","strDateType","dtDateFrom","dtDateTo","strYear","strMonth"
					],
			    "service":"CoreReportService",
				"methodName":"printjourneycomplDtl"
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
