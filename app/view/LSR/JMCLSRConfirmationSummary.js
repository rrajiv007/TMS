/************************************************************************************************
        	      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	2.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.LSR.JMCLSRConfirmationSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		/****** TOOL BAR SECTION BEGINS******/
		mainpage.screenName = "JMC LSR Confirmation Summary";
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=
		[
		 {"name":"LSR Confirmation","linkid":"LSRConfirmation_Link","tooltip":"Click here for LSR confirmation."}
		 
		]
		/****** TOOL BAR SECTION END******/
		
		
		/****** SEARCH SECTION BEGINS******/
		plf.columns=4
		var LSRConfirmSumHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);
	 	var LSRConfirmSumFormCtrl=	
		[
			plf.addText({"label":"Journey Plan #",id:"strJourneyPlanNoFrom"}),
			plf.addText({"label":"Load #",id:"strLoadNo"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addComboWithoutStore({"label":"Destination",id:"strDestination",storeId:"strOrigin"}),
			plf.addCombo({"label":"Date Type",id:"strDateType"}),	
			plf.addDate({"label":"Date From",id:"dtJourneyDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtJourneyDateTo"}),
			plf.addCombo({"label":"Journey Status",id:"strStatus"})	,
			plf.addText({"label":"Scheduled Vehicle",id:"strTruckCode"}),
			plf.addText({"label":"Contract #",id:"strContractNo"}),//
			plf.addText({"label":"Driver Code",id:"strDriverCode"}),
			plf.addText({"label":"Driver Phone #",id:"strMobileNo"}),
			plf.addText({"label":"Reported Vehicle",id:"strReportingVehicle"}),
			plf.addCombo({"label":"LSR Confirm Status",id:"strLSRConfirmStatus"}),//
			plf.addCombo({"label":"LSR Review Status",id:"strLSRReviewStatus"}),//
			plf.addCombo({"label":"LSR Approval Status",id:"strLSRApprovalStatus"}),//
			plf.addCombo({"label":"From Region",id:"strFromRegion"}),//
			plf.addCombo({"label":"To Region",id:"strToRegion"}),//
			plf.addCombo({"label":"Loading Point",id:"strLoadingPoint"}), //
			plf.addCombo({"label":"Unloading Point",id:"strUnloadingPoint"})//
			
		]
		
		LSRConfirmSumHdrCollapse.add(LSRConfirmSumFormCtrl);
		/****** SEARCH SECTION ENDS******/
		
		/****** SEARCH RESULT GRID SECTION BEGINS******/	
		var LSRConfirmSumGridFieldObj=
		[
			//{columnname:"Journey Plan #",dataname:"JOURNEY_PLAN_NO",datatype:"string",linkId:"NEXT_LINKID","linkType":"DYN","tooltip":"Click here to launch the LSR Confirmation/Approval screen.",width:"auto"},
			{columnname:"Journey Plan #",dataname:"JOURNEY_PLAN_NO",datatype:"string",linkId:"LSRConfirmation","tooltip":"Click here to launch the LSR Confirmation screen.",width:"auto"},
			{columnname:"Load #",dataname:"LOAD_NO",datatype:"string",width:"auto"},
			{columnname:"From Region",dataname:"FROM_REGION",datatype:"string",width:"auto"},
			{columnname:"Origin",dataname:"ROUTE_ORIGIN",datatype:"string",width:"auto"},
			{columnname:"Loading Point",dataname:"LOADING_POINT",datatype:"string",width:"auto"},
			{columnname:"To Region",dataname:"TO_REGION",datatype:"string",width:"auto"},
			{columnname:"Destination",dataname:"ROUTE_DEST",datatype:"string",width:"auto"},
			{columnname:"Unloading Point",dataname:"UNLOADING_POINT",datatype:"string",width:"auto"},
			{columnname:"Journey Status",dataname:"STATUS",datatype:"string",width:"auto"},
			//{columnname:"Link ID",dataname:"NEXT_LINKID",width:100,hidden:true},
			{columnname:"Number of LSR's Reported",dataname:"NO_LSR_REPORTED",datatype:"string",width:"auto",colAlign:'center',gridpopup:true,linkId:"LSRViewPopupcount","tooltip":"Click here to LSR count."},
			{columnname:"LSR Confirmation Status",dataname:"LSR_CONFIRMATION_STATUS",datatype:"string",width:"auto"},
			{columnname:"LSR Review Status",dataname:"LSR_REVIEW_STATUS",datatype:"string",width:"auto"},
			{columnname:"LSR Approval Status",dataname:"LSR_APPROVAL_STATUS",datatype:"string",width:"auto"},
			{columnname:"Scheduled Vehicle",dataname:"SCHEDULED_VEHICLE",datatype:"string",width:"auto"},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:"auto"},
			{columnname:"Contract #",dataname:"CONTRACT_NO",datatype:"string",width:"auto"},
			{columnname:"Reported Vehicle",dataname:"REPORTING_VEHICLE",datatype:"string",width:"auto"},
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:"auto"},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:"auto"},
			{columnname:"Driver Phone #",dataname:"DRIVER_PHONE",datatype:"string",width:"auto"},
			{columnname:"Journey Manager",dataname:"EMPLOYEE_NAME",datatype:"string",width:"auto"},
			{columnname:"JP Closed Date",dataname:"CLOSURE_DATE",datatype:"string",width:"auto"},
			{columnname:"JP Closed By",dataname:"CLOSURE_BY",datatype:"string",width:"auto"},
            {columnname:"JP Close Date",dataname:"JP_CLOSE_DT_TIME",datatype:"string",width:"auto",hidden:true} 			
						              
		]
		var LSRConfirmSumGridDtl=
		{
			title:"",
			id:"journeySearch",
	        detail:LSRConfirmSumGridFieldObj,
		    readonly:true,
			removeAddDelete:true,
			visibleRow:plf.searchVisibleRows
		   }
		var LSRConfirmSumGridSection = plf.addGrid(LSRConfirmSumGridDtl,this)
		/****** SEARCH RESULT GRID SECTION ENDS ******/	
		
		/****** MAINPAGE SECTION STRAT******/
		mainpage.ptrMainSection.add(LSRConfirmSumHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(LSRConfirmSumGridSection) //Add Grid Section to Main Page
		/****** MAINPAGE SECTION ENDS******/
		
		/******  EVENT HANDLERS SECTION BEGINS******/
		mainpage.eventHandlers = 
		[
		   {
				"controlid":"",
				"tasktype":"onload",
				"input":[],
				"service":"CoreJourneyPlanService",
				//"methodName":"initLSRReportedJPSum"
				"methodName":"initJMCLSRConfirmSum"
			},			
		    {       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strJourneyPlanNoFrom","strLoadNo","strOrigin","strDestination","strDateType","dtJourneyDateFrom","dtJourneyDateTo",,"strStatus","strTruckCode","strContractNo","strDriverCode","strMobileNo","strReportingVehicle","strLSRConfirmStatus","strLSRReviewStatus","strLSRApprovalStatus","strFromRegion","strToRegion","strLoadingPoint","strUnloadingPoint"
				],
			    "service":"CoreJourneyPlanService",
				//"methodName":"fetchLSRReportedJPTS"
				"methodName":"fetchJMCLSRConfirmTS"
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
			"LSRConfirmation_Link":
			{
				"dest":"LSR.JMCLSRConfirmation",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
			},
			"LSRConfirmation":
			{
				"dest":"LSR.JMCLSRConfirmation",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"JOURNEY_PLAN_NO","dest":"strJourneyPlanNo"}
						]
			}
                     
        }
		/******  SCREEN LINK END******/
		
		/******  GRIDPOPUP LINK BEGINS******/
		mainpage.gridPopupLinks=
		{
		"LSRViewPopupcount":
			{
				"dest":"LSR.JMCLSRActionOverviewpopup",
				"popMethodName":"initLSRActionpopup",
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
