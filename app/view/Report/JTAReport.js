/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1       Vidhya P         3 June      
************************************************************************************************/
Ext.define('CueTrans.view.Report.JTAReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Journey Tracker Allocation";
		
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
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
            plf.addCombo({"label":"Destination",id:"strDestination"}),
            plf.addText({"label":"Journey Plan No",id:"strJourneyNoFrom"}),
            plf.addText({"label":"Journey Manager Name",id:"strJMname"}),
            plf.addText({"label":"Tracker Name",id:"strTrackerName"}),
            plf.addText({"label":"Vehicle No",id:"strVehicleCodeFrom"}), 
            plf.addText({"label":"Contract No",id:"strContractNumber"}), 
			plf.addBlank(),
            plf.addCombo({"label":"Status","id":"strStatus"}),
            plf.addCombo({"label":"Carrier",id:"strCarrierCode"}),
            plf.addCombo({"label":"Night Driving","id":"strNightDriving"}),
            plf.addCombo({"label":"Date Type","id":"strDateType"}),
            plf.addDate({"label":"Date From",id:"dtDateFrom"}),
            plf.addDate({"label":"Date To",id:"dtDateTo"})
			
			/*
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"}),
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"customerCode"},this),
            plf.addHlpText({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"carriercode"},this),
			plf.addCombo({"label":"Priority",id:"strPriority"}),
            plf.addCombo({"label":"Commodity",id:"strCommodity"}), 
			plf.addCombo({"label":"Request Type",id:"strRequestType"}),
			plf.addCombo({"label":"Region",id:"strRegion"}),
			plf.addHlpText({"label":"Request No From",id:"strRequestNoFrom",hlpLinkID:"requestnofrom",inputFormat:"string",InputLength:"80"},this),
			plf.addHlpText({"label":"Request No To",id:"strRequestNoTo",hlpLinkID:"requestnoto",inputFormat:"string",InputLength:"80"},this),	
            plf.addHlpText({"label":"Shipment No From",id:"strDateType",hlpLinkID:"shipmentnofrom",inputFormat:"string",InputLength:"80"},this),
			plf.addHlpText({"label":"Shipment No To",id:"strDateType",hlpLinkID:"shipmentnoto",inputFormat:"string",InputLength:"80"},this),					
			plf.addHlpText({"label":"Inspection No From",id:"strInspectionNoFrom",hlpLinkID:"inspectionno",inputFormat:"string",InputLength:"80"},this),
			plf.addHlpText({"label":"Inspection No To",id:"strInspectionNoTo",hlpLinkID:"inspectionnoto",inputFormat:"string",InputLength:"80"},this),				
			plf.addHlpText({"label":"Journey Plan No From",id:"strJourneyNoFrom",hlpLinkID:"jpnoFrom",inputFormat:"string",InputLength:"80"},this),			
			plf.addHlpText({"label":"Journey Plan No To",id:"strJourneyNoTo",hlpLinkID:"jpnoTo",inputFormat:"string",InputLength:"80"},this),
            plf.addHlpText({"label":"Load No From",id:"strLoadNoFrom",hlpLinkID:"LoadFrom",inputFormat:"string",InputLength:"80"},this),			
			plf.addHlpText({"label":"Load No To",id:"strLoadNoTo",hlpLinkID:"LoadTo",inputFormat:"string",InputLength:"80"},this),	
			*/
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({});	//69997
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Show Details","id":"GetjtareportDetails"}),//Golive	  
		  plf.addButton({"label":"Generate PDF",id:"ListJourTracAll"}),
		  plf.addBlank()
		
		]	
		
		jtareportgrid=
		[   
			{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:150},
			{columnname:"Tracker Name",dataname:"TRACKER_NAME",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:150},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:150},
			{columnname:"Vehicle No",dataname:"VEH_CODE",datatype:"string",width:150},
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:150},
			{columnname:"Journey Manager",dataname:"JOURNEY_MANAGER",datatype:"string",width:150},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:150},
			{columnname:"Driver Mobile No",dataname:"DRIVER_MOBILENO",datatype:"string",width:150},
			{columnname:"Night Driving",dataname:"NIGHT_DRIVING",datatype:"string",width:150},
			{columnname:"JP Date",dataname:"JP_DATE",datatype:"date",width:150},
			{columnname:"Departure date",dataname:"DEPARTED_DATE",datatype:"date",width:150},
			{columnname:"Journey Closed Date",dataname:"JP_CLOSED_DATE",datatype:"date",width:150}
				
		]
		jtareportdetails=
		{
			title:"JTA Details",
			id:"jtareportdtl",
			detail:jtareportgrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		jtareportGridSection = plf.addGrid(jtareportdetails,this)
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(jtareportGridSection)//--Golive		
		
		mainpage.eventHandlers = 
		[	
         /*{		 
				"controlid":"vehicleRequest",
				"tasktype":"btnclick",
				"input":[
						"strOrigin","strDestination","strJourneyNoFrom","strJMname","strTrackerName",
                        "strVehicleCodeFrom","strContractNumber","strStatus","strCarrierCode",
                        "strNightDriving","strDateType","dtDateFrom","dtDateTo"							
						],
				"service":"CoreReportService", 
				"methodName":"PrintVehicleRequestReport"
							
			},	
			{		 
				"controlid":"RequestExcel",
				"tasktype":"btnclick",
				"input":[
						"strOrigin","strDestination","strJourneyNoFrom","strJMname","strTrackerName",
                        "strVehicleCodeFrom","strContractNumber","strStatus","strCarrierCode",
                        "strNightDriving","strDateType","dtDateFrom","dtDateTo"							
						],
				"service":"CoreReportService", 
				"methodName":"PrintVehicleRequestReport",
				"ExcelViewer":"Viewer"
							
			},*/
			{ 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitJTAtracking"
			},
			/*{		
				"controlid":"shipmentRequest",
				"tasktype":"btnclick",
				"input":[
						"strOrigin","strDestination","strJourneyNoFrom","strJMname","strTrackerName",
                        "strVehicleCodeFrom","strContractNumber","strStatus","strCarrierCode",
                        "strNightDriving","strDateType","dtDateFrom","dtDateTo"							
						],
				"service":"CoreReportService",
				"methodName":"PrintShipmentReport"
							
			}, 
			{		
				"controlid":"LoadBuildingReport",
				"tasktype":"btnclick",
				"input":[
						"strOrigin","strDestination","strJourneyNoFrom","strJMname","strTrackerName",
                        "strVehicleCodeFrom","strContractNumber","strStatus","strCarrierCode",
                        "strNightDriving","strDateType","dtDateFrom","dtDateTo"							
						],
				"service":"CoreReportService",
				"methodName":"PrintLoadBuildingReport"
							
			},
			{		 
                 "controlid":"ListInspection",
				"tasktype":"btnclick",
				"input":[
						"strOrigin","strDestination","strJourneyNoFrom","strJMname","strTrackerName",
                        "strVehicleCodeFrom","strContractNumber","strStatus","strCarrierCode",
                        "strNightDriving","strDateType","dtDateFrom","dtDateTo"							
						],
				"service":"CoreReportService",
				"methodName":"ListInspectionReport"
			            
		},*/
		{       
				"controlid":"ListJourTracAll",
				"tasktype":"btnclick", 
				"input":[
						"strOrigin","strDestination","strJourneyNoFrom","strJMname","strTrackerName",
                        "strVehicleCodeFrom","strContractNumber","strStatus","strCarrierCode",
                        "strNightDriving","strDateType","dtDateFrom","dtDateTo"						
						],
			    "service":"CoreReportService",
				"methodName":"printJourTrkrAllReport"
			},
{       
				"controlid":"GetjtareportDetails",
				"tasktype":"btnclick", 
				"input":[
						"strOrigin","strDestination","strJourneyNoFrom","strJMname","strTrackerName",
                        "strVehicleCodeFrom","strContractNumber","strStatus","strCarrierCode",
                        "strNightDriving","strDateType","dtDateFrom","dtDateTo"						
						],
			    "service":"CoreReportService",
				"methodName":"printJourTrkrDetails"
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
