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
Ext.define('CueTrans.view.Report.SchedulingSummaryReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Scheduling Summary";
				
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		/*mainpage.toolbarLinks=
		[
			{"name":"Operational Reports","linkid":"operation_rpt"},
			{"name":"Statistical Reports","linkid":"rep_streports"}
		] */
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var ReportsColumn = plf.addColumnSection({});	//69997
		
		var ReportsFormCtrl=							//69997
		[			
			plf.addCombo({"label":"Region",id:"strRegion"}),
			plf.addCombo({"label":"Hub",id:"strHub"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addCombo({"label":"Vehicle Catgeory",id:"strVehicleCategory"}),
			plf.addCombo({"label":"Logistics Group","id":"strLogGroup"}),
			plf.addCombo({"label":"Division","id":"strDivCode"}),
			plf.addCombo({"label":"Utilisation","id":"strUtilisation"}),

			plf.addText({"label":"Request No",id:"strRequestNoFrom"}),
			plf.addText({"label":"DO No",id:"strDocNo"}),			
			plf.addText({"label":"Shipment No",id:"strShipmentNoFrom"}),
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			plf.addText({"label":"Journey Plan No",id:"strJourneyNoFrom"}),
			plf.addText({"label":"Trip No",id:"strTripNo"}),
			plf.addText({"label":"WBS No",id:"strWBSNo"}),
			plf.addText({"label":"Vehicle Code",id:"strVehicleCodeFrom"}),

			plf.addCombo({"label":"Load Status","id":"strStatus"}),
			plf.addCombo({"label":"Carrier Code",id:"strCarrierCode"}),
			plf.addCombo({"label":"Asset type",id:"strVehicleTypes"}),

			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"}),
			plf.addCombo({"label":"Year","id":"strYear"}),
			plf.addCombo({"label":"Month","id":"strMonth"}),

			//plf.addCombo({"label":"Priority",id:"strPriority"}),
			//plf.addCombo({"label":"Commodity",id:"strCommodity"}), 
			//plf.addText({"label":"Driver Code",id:"strDriverCodeFrom"}),

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
           		plf.addHlpText({"label":"Shipment No From",id:"strShipmentNoFrom",hlpLinkID:"shipmentnofrom",inputFormat:"string",InputLength:"80"},this),
			plf.addHlpText({"label":"Shipment No To",id:"strShipmentNoTo",hlpLinkID:"shipmentnoto",inputFormat:"string",InputLength:"80"},this),					
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
		  plf.addButton({"label":"Show Details","id":"getschedulesummary"}),
		  plf.addButton({"label":"Generate PDF","id":"schedulesummary"})
		   
		
		]	
		
		SchSummarygrid=
		[   
		{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:150},
		{columnname:"From Region",dataname:"ORG_REG_DESC",datatype:"string",width:150},
		{columnname:"To Region",dataname:"DEST_REG_DESC",datatype:"string",width:150},
		{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
		{columnname:"Origin Location Type",dataname:"ORIGIN_TYPE",datatype:"string",width:150},
		{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
		{columnname:"Destination Location Type",dataname:"DESTINATION_TYPE",datatype:"string",width:150},
		{columnname:"Status",dataname:"STATUS",datatype:"string",width:150},
		{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:150},
		{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:150},
		{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:150},
		{columnname:"Vehicle Category",dataname:"VEH_CAT_DESC",datatype:"string",width:150},
		{columnname:"Vehicle No",dataname:"VEH_CODE",datatype:"string",width:150},
		{columnname:"Utilisation",dataname:"UTIL",datatype:"string",width:150},
		{columnname:"Weight",dataname:"ITEM_WT",datatype:"string",width:150},
		{columnname:"Distance",dataname:"DIST",datatype:"string",width:150},
		{columnname:"Tonkm",dataname:"TONKM",datatype:"string",width:150},
		{columnname:"Created Date",dataname:"CR_DATE",datatype:"string",width:150},
		{columnname:"Scheduled Date",dataname:"SCH_DATETIME",datatype:"string",width:150}
			
		]
		SchSummarydetails=
		{
			title:"Scheduling Summary Details",
			id:"schsummdetails",
			detail:SchSummarygrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		SchSummaryGridSection = plf.addGrid(SchSummarydetails,this)
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(SchSummaryGridSection)
		
		
		mainpage.eventHandlers = 
		[	
			
			{ 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitReportScreenSch"
			},
			
			
			{		 
				"controlid":"schedulesummary",
				"tasktype":"btnclick",
				"input":[
						"strRegion","strHub","strLoadNoFrom","strOrigin","strDestination","strVehicleCategory",
						"strLogGroup","strDivCode","strRequestNoFrom","strDocNo","strShipmentNoFrom","strLoadNoFrom",
						"strJourneyNoFrom","strTripNo","strWBSNo","strVehicleCodeFrom","strStatus","strCarrierCode",
						"dtDateFrom","dtDateTo","strYear","strMonth","strUtilisation","strVehicleTypes","strDateType"
						],
				"service":"CoreReportService", 
				"methodName":"PrintScheduleSummaryReport"
							
			},
			{		 
				"controlid":"getschedulesummary",
				"tasktype":"btnclick",
				"input":[
						"strRegion","strHub","strLoadNoFrom","strOrigin","strDestination","strVehicleCategory",
						"strLogGroup","strDivCode","strRequestNoFrom","strDocNo","strShipmentNoFrom","strLoadNoFrom",
						"strJourneyNoFrom","strTripNo","strWBSNo","strVehicleCodeFrom","strStatus","strCarrierCode",
						"dtDateFrom","dtDateTo","strYear","strMonth","strUtilisation","strVehicleTypes","strDateType"						
						],
				"service":"CoreReportService", 
				"methodName":"getScheduleSummaryReportXL"
							
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
