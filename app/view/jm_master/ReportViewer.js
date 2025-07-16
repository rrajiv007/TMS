/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	                           Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.ReportViewer',
{
	extend:"CueTrans.lib.plfTransScreen",
   
	initComponent: function()
	{   
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Report Viewer";
		//mainpage.liveScreenFlag=false;
		mainpage.toolbarSectionFlag=true;
        /*mainpage.toolbarActions= [
			{
                "name": "Print",
                "tooltip": "Click here to get Excel."
            }
            ]
		*/
		//GuestHouse Search Section starts
		plf.columns=6
		var reportbuildMasterColumn = plf.addColumnSection({title:"Schedule",collapsed: true},this);			//69995
		var reportbuildMstrCtrl=																				//69995
		[
		    plf.addCombo({"label":"Report Category",id:"strReportCategory","mandatory":"true",inputFormat:"string",InputLength:"100"},this),
		    plf.addCombo({"label":"Report Name",id:"strReportName","mandatory":"true",inputFormat:"string",InputLength:"100"},this),
			//plf.addButton({"label":"Get Details",id:"searchBtn","tooltip":"Click here to get Details."},this),
            plf.addBlank(),	
            plf.addButton({"label":"Journey Print",id:"JurprintBtn","tooltip":"Click here to get Journey Plan."},this),
            plf.addButton({"label":"Trip Print",id:"TripPrintBtn","tooltip":"Click here to get Trip Plan."},this)			

		]
		reportbuildMasterColumn.add(reportbuildMstrCtrl);
		
		plf.columns=4
		var ReportviewerinputHdrCollapse = plf.addColumnSection({});
			
		var ReportviewerinputFormCtrl=
		[
           plf.addText({"label":"Journey Plan From",id:"strJourneyNoFrom",inputFormat:"string",InputLength:"100"},this),
           //plf.addText({"label":"Journey Plan To",id:"strJourneyPlanTo",inputFormat:"string",InputLength:"100"},this),
           plf.addDate({"label":"Journey Date From",id:"dtDateFrom",inputFormat:"date",InputLength:"100"},this),
           plf.addDate({"label":"Journey Date To",id:"dtDateTo",inputFormat:"date",InputLength:"100"},this),
		   /*plf.addText({"label":"Status",id:"strStatus",inputFormat:"string",InputLength:"100"},this),
           plf.addText({"label":"Journey Type",id:"strJourneyType",inputFormat:"string",InputLength:"100"},this),
           plf.addText({"label":"Journey Manager Code",id:"strJourneyManagerCode",inputFormat:"string",InputLength:"100"},this),
		   plf.addText({"label":"Journey Manager Name",id:"strJourneyManagerName",inputFormat:"string",InputLength:"100"},this),
           plf.addText({"label":"Journey Coordinator Code",id:"strJourneyCoordinatorCode",inputFormat:"string",InputLength:"100"},this),
           plf.addText({"label":"Journey Coordinator Name",id:"strJourneyCoordinatorName",inputFormat:"string",InputLength:"100"},this),
		   plf.addText({"label":"Customer Code",id:"strCustomerCode",inputFormat:"string",InputLength:"100"},this),
           plf.addText({"label":"Customer Name",id:"strCustomerName",inputFormat:"string",InputLength:"100"},this),
           plf.addText({"label":"Route Code",id:"strRouteCode",inputFormat:"string",InputLength:"100"},this),
		   plf.addText({"label":"Vehicle Code",id:"strVehicleCode",inputFormat:"string",InputLength:"100"},this),
           plf.addText({"label":"Vehicle Description",id:"strVehicleDescription",inputFormat:"string",InputLength:"100"},this),
           plf.addText({"label":"Trailer Code",id:"strTrailerCode",inputFormat:"string",InputLength:"100"},this),
		    plf.addText({"label":"Driver Code",id:"strDriverCode",inputFormat:"string",InputLength:"100"},this),
           plf.addText({"label":"Driver Name",id:"strDriverName",inputFormat:"string",InputLength:"100"},this),
           plf.addText({"label":"Carrier Code",id:"strCarrierCode",inputFormat:"string",InputLength:"100"},this),
		   plf.addText({"label":"Carrier Name",id:"strCarrierName",inputFormat:"string",InputLength:"100"},this),
           plf.addText({"label":"Commodity",id:"strCommodity",inputFormat:"string",InputLength:"100"},this),
           plf.addText({"label":"Risk Assessment",id:"strRiskAssessment",inputFormat:"string",InputLength:"100"},this),*/
		   plf.addText({"label":"Trip Sheet No",id:"strTripSheetNo",inputFormat:"string",InputLength:"100"},this),
           plf.addText({"label":"Vehicle Category",id:"strVehicleCategory",inputFormat:"string",InputLength:"100"},this)
		   ]
		ReportviewerinputHdrCollapse.add(ReportviewerinputFormCtrl);
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		
		
		mainpage.ptrMainSection.add(reportbuildMasterColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportviewerinputHdrCollapse) //Add Header Section to Main Page
		//mainpage.ptrMainSection.add(reportbuildoutGridSection)//Add Grid Section to Main Page
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[	
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strReportName"],
				"service":"CoreReportService",
				"methodName":"initRepbuilderSearchTS"
			},
			{
					"controlid":"TripPrintBtn",
					"tasktype":"btnclick",
					"input":["strJourneyNoFrom","dtDateFrom","dtDateTo","strViolationType","strReportName","strReportCategory","strTripSheetNo","strVehicleCategory"],
					"service":"CoreReportService",
					"methodName":"TripPrintTs"
			},
			{
					"controlid":"JurprintBtn",
					"tasktype":"btnclick",
					"input":["strJourneyNoFrom","dtDateFrom","dtDateTo","strViolationType","strReportName","strReportCategory","strTripSheetNo","strVehicleCategory"],
					"service":"CoreReportService",
					"methodName":"JourneyPrintTS"
			},
			{
					"controlid":"strReportName",
					"tasktype":"onchange",
					"input":["strReportName","strReportCategory"],
					"service":"CoreReportService",
					"methodName":"fetchAllGetdetailsTS"
			},
			{
				"controlid":"strReportCategory",
				"tasktype":"onchange",
				"input":["strReportCategory"],
				"service":"CoreReportService",
				"methodName":"onchangeRebuViewTs"
			}
			
		];
		//Event Handlers Mapping Ends
		
		mainpage.screenLinks=
		{			
			"ReportBuilderMaster":
				{
					"dest":"jm_master.ReportBuilderMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"Rep_Name","dest":"strReportName"}
							]
				},
				"jm_ReportBuilderMaster":
				{
					"dest":"jm_master.ReportBuilderMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}				
		};
			
	
		this.callParent(arguments);
		
	}
});
