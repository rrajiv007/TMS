/************************************************************************************************
        	      Modification History        									                               	
************************************************************************************************
Description	  :	Comprehensive JMC LSR View                                                                   		         
Author		  :	CUETRANS																                                         
Version		  :	2.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.LSR.ComprehensiveJMCLSRView', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		/****** TOOL BAR SECTION BEGINS******/
		mainpage.screenName = "Comprehensive JMC LSR View";
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=
		[
		 		 
		]
		/****** TOOL BAR SECTION END******/
		
		
		/****** SEARCH SECTION BEGINS******/
		plf.columns=4
		var LSRApprovalSumHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);
	 	var LSRApprovalSumFormCtrl=	
		[
			plf.addText({"label":"Journey Plan #",id:"strJourneyPlanNoFrom"}),
			plf.addCombo({"label":"LSR Violation Type",id:"strLSRType"}),
			plf.addText({"label":"LSR Violation Details",id:"strLSRNotes"}),
			plf.addCombo({"label":"Date Type",id:"strDateType"}),	
			plf.addDate({"label":"Date From",id:"dtJourneyDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtJourneyDateTo"}),
			plf.addText({"label":"Scheduled Vehicle",id:"strTruckCode"}),
			plf.addText({"label":"Contract Number",id:"strContractNo"}),
			plf.addText({"label":"Reported Vehicle",id:"strReportingVehicle"}),
			plf.addText({"label":"Driver Code",id:"strDriverCode"})
			
		]
		
		LSRApprovalSumHdrCollapse.add(LSRApprovalSumFormCtrl);
		/****** SEARCH SECTION ENDS******/
		
		/****** SEARCH RESULT GRID SECTION BEGINS******/	
		var LSRApprovalSumGridFieldObj=
		[
			{columnname:"Journey Plan #",dataname:"JOURNEY_PLAN_NO",datatype:"string",linkId:"LSRjp_gridlink","tooltip":"Click here to view journey details.",width:"auto",gridpopup:true},
			
			{columnname:"Scheduled Vehicle",dataname:"SCHEDULED_VEHICLE",datatype:"string",width:"auto"},
			{columnname:"Contract Number",dataname:"CONTRACT_NO",datatype:"string",width:"auto"},
			{columnname:"Reported Vehicle",dataname:"REPORTING_VEHICLE",datatype:"string",width:"auto"},
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:"auto"},
			{columnname:"LSR ID",dataname:"LSR_ID",datatype:"string",width:"auto"},
			{columnname:"LSR Violation Type",dataname:"LSR_TYPE",datatype:"string",width:"auto"},
			{columnname:"LSR Violation Details",dataname:"LSR_NOTES",datatype:"string",width:"auto"},

			{columnname:"Download Document",dataname:"REP_DOWNLOAD_DOCUMENT",datatype:"string",linkId:"DOWN_LINKID","tooltip":"Click here to download",type:"filedownload",fileGroup:"Service/Doc_Attachment",width:"auto"},
            {columnname:"LSR Reported By",dataname:"LSR_REPORTED_BY",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			{columnname:"LSR Reported Date/Time",dataname:"LSR_REPORTED_DT",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			{columnname:"LSR Confirmation Action",dataname:"LSR_CONFIRM_ACTION_DESC",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			{columnname:"LSR Confirmation Remarks",dataname:"LSR_CONFIRM_REMARKS",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			{columnname:"Download Document",dataname:"CON_DOWNLOAD_DOCUMENT",datatype:"string",linkId:"DOWN_LINKID","tooltip":"Click here to download",type:"filedownload",fileGroup:"Service/Doc_Attachment",width:"auto"},
			{columnname:"LSR Confirmed By",dataname:"LSR_CONFIRMED_BY",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			{columnname:"LSR Confirmed Date/Time",dataname:"LSR_CONFIRMED_DT",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			
            {columnname:"LSR Review Action",dataname:"LSR_REVIEW_ACTION_DESC",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			{columnname:"LSR Review Remarks",dataname:"LSR_REVIEW_REMARKS",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
				
			{columnname:"Download Document",dataname:"REV_DOWNLOAD_DOCUMENT",datatype:"string",linkId:"DOWN_LINKID","tooltip":"Click here to download",type:"filedownload",fileGroup:"Service/Doc_Attachment",width:"auto"},
			{columnname:"LSR Reviewed By",dataname:"LSR_REVIEWED_BY",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			{columnname:"LSR Reviewed Date/Time",dataname:"LSR_REVIEWED_DT",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			{columnname:"LSR Approval Action",dataname:"LSR_APPROVAL_ACTION",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			{columnname:"LSR Approval Remarks",dataname:"LSR_APPROVAL_REMARKS",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			{columnname:"Download Document",dataname:"APP_DOWNLOAD_DOCUMENT",datatype:"string",linkId:"DOWN_LINKID","tooltip":"Click here to download",type:"filedownload",fileGroup:"Service/Doc_Attachment",width:"auto"},
			{columnname:"LSR Approval By",dataname:"LSR_APPROVAL_BY",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			{columnname:"LSR Approval Date/Time",dataname:"LSR_APPROVAL_DT",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			{columnname:"JP Close Date/Time",dataname:"JP_CLOSE_DT_TIME",datatype:"string",editControl:"addDisplayOnly",width:"auto",hidden:true}
									              
		]
		var LSRApprovalSumGridDtl=
		{
			title:"",
			id:"journeySearch",
	        detail:LSRApprovalSumGridFieldObj,
		    readonly:true,
			removeAddDelete:true,
			visibleRow:plf.searchVisibleRows
		   }
		var LSRreviewSumGridSection = plf.addGrid(LSRApprovalSumGridDtl,this)
		/****** SEARCH RESULT GRID SECTION ENDS ******/	
		
		/****** MAINPAGE SECTION STRAT******/
		mainpage.ptrMainSection.add(LSRApprovalSumHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(LSRreviewSumGridSection) //Add Grid Section to Main Page
		/****** MAINPAGE SECTION ENDS******/
		
		/******  EVENT HANDLERS SECTION BEGINS******/
		mainpage.eventHandlers = 
		[
		   {
				"controlid":"",
				"tasktype":"onload",
				"input":[],
				"service":"CoreJourneyPlanService", 
				"methodName":"initCompJMCLSRView"
			},			
		    {       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strJourneyPlanNoFrom","strLSRType","strLSRNotes","strDateType","dtJourneyDateFrom","dtJourneyDateTo","strTruckCode","strContractNo","strDriverCode","strReportingVehicle"
				],
			    "service":"CoreJourneyPlanService",
				"methodName":"fetchCompJMCLSRView"
			}
		];
		/******  EVENT HANDLERS SECTION END******/
		
		/******  HELP LINK BEGINS******/
		
		mainpage.hlpLinks=
		{
		}
		/******  HELP LINK END******/
		
		/******  SCREEN LINK BEGINS******/
		mainpage.screenLinks=
		{
			                     
        }
		/******  SCREEN LINK END******/
		
		/******  GRIDPOPUP LINK BEGINS******/
		mainpage.gridPopupLinks=
		{
		 "LSRjp_gridlink":
			{
				"dest":"LSR.LSRJourneyDtl",
				"popMethodName":"initJourneyPlanUpdateScrTS",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"JOURNEY_PLAN_NO","dest":"strJourneyPlanNo"}
						]
			}
		}
		/******  GRIDPOPUP LINK END******/
		this.callParent(arguments);
		
	}
});
