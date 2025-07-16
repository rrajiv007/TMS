/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1       steffie           6/6/2016          72904  		                                   
************************************************************************************************/
Ext.define('CueTrans.view.Report.CostalTrackingReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Coastal Tracking Report";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		
		var ReportsColumn = plf.addColumnSection({});	//69997
		
		var ReportsFormCtrl=							//69997
		[	
			plf.addCombo({"label":"Region",id:"strRegion"}),
			plf.addCombo({"label":"Hub",id:"strHub"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			//plf.addCombo({"label":"Customer",id:"strCustomerName"}),
			plf.addCombo({"label":"Vehicle Category","id":"strVehicleCategory"}),
			//plf.addCombo({"label":"Logistics Group","id":"strLogGroup"}),
			//plf.addCombo({"label":"Division","id":"strDivCode"}),
			plf.addText({"label":"Vehicle No",id:"strVehicleCodeFrom"}),
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			//plf.addText({"label":"Request No",id:"strRequestNoFrom"}),
			//plf.addText({"label":"DO No",id:"strDocNo"}),
			//plf.addText({"label":"Shipment No",id:"strShipmentNoFrom"}),
			plf.addText({"label":"JP No",id:"strJourneyNoFrom"}),
			//plf.addText({"label":"WBS NO",id:"strWBSNo"}),
			plf.addCombo({"label":"Load Status","id":"strStatus"}),
			plf.addCombo({"label":"Carrier Code",id:"strCarrierCode"}),
			plf.addCombo({"label":"Year",id:"strYear"}),
			plf.addCombo({"label":"Month",id:"strMonth"}),
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
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
		  plf.addButton({"label":"Show Details","id":"getcostaltracking"}),
		  plf.addButton({"label":"Generate PDF","id":"costaltracking"}),
		  plf.addBlank()
		
		]
        ReqSummarygrid=
		[
        {columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:150},
        {columnname:"From Region",dataname:"ORG_REG_DESC",datatype:"string",width:150},
		{columnname:"To Region",dataname:"DEST_REG_DESC",datatype:"string",width:150},
        {columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
		{columnname:"Origin Location Type",dataname:"ORG_TYPE_DESC",datatype:"string",width:150},
        {columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},		
		{columnname:"Destination Location Type",dataname:"DEST_TYPE_DESC",datatype:"string",width:150},
		{columnname:"Load Status",dataname:"STATUS",datatype:"string",width:150},
		{columnname:"Vehicle No",dataname:"ITM_CODE",datatype:"string",width:150},
		{columnname:"Vehicle Category",dataname:"ITM_DESC",datatype:"string",width:150},
		{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:150},
		{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:150},
		{columnname:"Created Date",dataname:"CR_DATE",datatype:"string",width:150},
		{columnname:"Scheduled Date",dataname:"SCH_DATE",datatype:"string",width:150},
		{columnname:"Departed Date",dataname:"DELY_DATE",datatype:"string",width:150},
		{columnname:"Completed Date",dataname:"DELV_DATE",datatype:"string",width:150}
		]
		
		ReqSummarydetails=
		{
			title:"Costal Tracking Details",
			id:"reqsummdetails",
			detail:ReqSummarygrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		ReqSummarySection = plf.addGrid(ReqSummarydetails,this)		
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(ReqSummarySection)
		
		mainpage.eventHandlers = 
		[	
         {		 
				"controlid":"getcostaltracking",
				"tasktype":"btnclick",
				"input":[
				        "strLoadNoFrom","strJourneyNoFrom","strLogGroup","strRegion",
						"strOrigin","strDestination","strCarrierCode","strVehicleCodeFrom","dtDateFrom","dtDateTo","strStatus","strCustomerName","strRequestorId",
						"strDateType","strDivCode","strHub","strYear","strMonth","reqsummdetails"		
		                ],
				"service":"CoreReportService", 
				"methodName":"getCoastalTrackingXL"
							
			},
			{ 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitCoastalTracking"
			},
			
			
			{		
				"controlid":"costaltracking",
				"tasktype":"btnclick",
				"input":["strLoadNoFrom","strJourneyNoFrom","strLogGroup","strRegion","strOrigin","strDestination","strCarrierCode","strVehicleCodeFrom","dtDateFrom","dtDateTo","strStatus","strCustomerName","strRequestorId",
					  "strDateType","strDivCode","strHub","strYear","strMonth","reqsummdetails"				
					],
				"service":"CoreReportService",
				"methodName":"PrintCoastalTrackingReport"
							
			}		
		];
/*mainpage.screenLinks=	
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
		*/
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
