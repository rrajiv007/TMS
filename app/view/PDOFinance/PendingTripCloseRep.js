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
Ext.define('CueTrans.view.PDOFinance.PendingTripCloseRep', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Pending Trip Closure";
				
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		/*mainpage.toolbarLinks=
		[
			{"name":"Operational Reports","linkid":"operation_rpt"},
			{"name":"Statistical Reports","linkid":"rep_streports"}
		] */
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var ReportsColumn = plf.addColumnSection({});	
		
		var ReportsFormCtrl=
		[			
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addText({"label":"Journey Plan No",id:"strJourneyNoFrom"}),
			plf.addText({"label":"Journey Mgr Name",id:"strJMname"}),
			plf.addText({"label":"Driver Name",id:"strDriverName"}),
			plf.addText({"label":"Driver Mobile No",id:"strMobileNo"}),
			plf.addText({"label":"Scheduled Vehicle",id:"strVehicleCode"}),
			//plf.addText({"label":"Reporting Vehicle",id:"strReportedVeh"}),
			plf.addText({"label":"Contract No",id:"strContNo"}),
			//plf.addText({"label":"Shipment No",id:"strShippmentNo"}),
			plf.addText({"label":"Trip No",id:"strShippmentNo"}),
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			plf.addCombo({"label":"Carrier",id:"strCarrierCode"}),
			//plf.addCombo({"label":"Journey Status","id":"strStatus"}),
			plf.addCombo({"label":"Date Type","id":"strVehicleType"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom","mandatory":"true"}),
			plf.addDate({"label":"Date To",id:"dtDateTo","mandatory":"true"})

		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=1
		var ReportsButtonColumn = plf.addColumnSection({});	//69997
		ReportsFormCtrl=
		[
		  plf.addButton({"label":"Show Details","id":"getreleasepending"})
		  //plf.addButton({"label":"Generate PDF","id":"releasepending"})
		   
		
		]	
		
		VehicleRelgrid=
		[   
		{columnname:"Journey Plan No",dataname:"JP_NO",datatype:"string",width:150},
		{columnname:"Status",dataname:"STATUS",datatype:"string",width:150},
		{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
		{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
		{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:150},
		{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:150},
		{columnname:"Scheduled Vehicle",dataname:"VEHICLE",datatype:"string",width:120},
		{columnname:"Reporting Vehicle",dataname:"REP_VEHICLE",datatype:"string",width:120},
		{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:150},
		{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:150},
		{columnname:"Journey Manager",dataname:"JOURNEY_MANAGER",datatype:"string",width:150},
		{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:150},
		{columnname:"Driver Mobile No",dataname:"DRIVER_MOBILENO",datatype:"string",width:150},
		{columnname:"JP Date",dataname:"JP_DATE",datatype:"string",width:150},
		{columnname:"Departed Date",dataname:"DEPARTED_DATE",datatype:"string",width:150},
		{columnname:"JP Closed Date&Time",dataname:"JP_CLOSED_DATETIME",datatype:"string",width:150}
			
		]
		VehicleReldetails=
		{
			title:"Vehicle Release Pending Details",
			id:"vehReldetails",
			detail:VehicleRelgrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		VehicleRelGridSection = plf.addGrid(VehicleReldetails,this)
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(VehicleRelGridSection)

		mainpage.eventHandlers = 
		[	
         {		 
				"controlid":"releasepending",
				"tasktype":"btnclick",
				"input":[
						"strOrigin","strDestination","strJourneyNoFrom","strJMname",
			            "strDriverName","strMobileNo","strVehicleCode","strContNo","strCarrierCode",
			            "strShippmentNo","strLoadNoFrom","strStatus","strVehicleType",
			            "dtDateFrom","dtDateTo"					
						],
				"service":"CoreReportService", 
				"methodName":"PrintReleasePendingReport"
				
							
			},
           { 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitReportVehicleRelease"
			},
			{		 
				"controlid":"getreleasepending",
				"tasktype":"btnclick",
				"input":[
						"strOrigin","strDestination","strJourneyNoFrom","strJMname",
			            "strDriverName","strMobileNo","strVehicleCode","strContNo","strCarrierCode",
			            "strShippmentNo","strLoadNoFrom","strStatus","strVehicleType",
			            "dtDateFrom","dtDateTo","strReportedVeh"					
						],
				"service":"CoreReportService", 
				"methodName":"getReleasePendingReportXL"
				
							
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
