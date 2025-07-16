/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	LSR APPROVAL Help                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
                                  
************************************************************************************************/
Ext.define('CueTrans.view.LSR.JMCLSRApprovalHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.screenName = "Journey Plan Help";
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		//Journey Summary Addtion

		//Journey Search Section Begins
		plf.columns=3
		var helpOnJourneyHdrCollapse = plf.addColumnSection({title:"", collapsed: false}); 	
	 	var helpOnJourneyFormCtrl=		
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
			plf.addCombo({"label":"Unloading Point",id:"strUnloadingPoint"}),//
			plf.addBlank(),
			plf.addBlank(),
			plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."})
		]
		
		helpOnJourneyHdrCollapse.add(helpOnJourneyFormCtrl);
		//Journey Search Section Ends
		
		//Journey Grid Section Begins
		var helpOnJourneyGridFieldObj=		
		[
			
			{columnname:"Journey Plan #",dataname:"JOURNEY_PLAN_NO",datatype:"string",width:"auto"},
			{columnname:"Load #",dataname:"LOAD_NO",datatype:"string",width:"auto"},
			{columnname:"From Region",dataname:"FROM_REGION",datatype:"string",width:"auto"},
			{columnname:"Origin",dataname:"ROUTE_ORIGIN",datatype:"string",width:"auto"},
			{columnname:"Loading Point",dataname:"LOADING_POINT",datatype:"string",width:"auto"},
			{columnname:"To Region",dataname:"TO_REGION",datatype:"string",width:"auto"},
			{columnname:"Destination",dataname:"ROUTE_DEST",datatype:"string",width:"auto"},
			{columnname:"Unloading Point",dataname:"UNLOADING_POINT",datatype:"string",width:"auto"},
			{columnname:"Journey Status",dataname:"STATUS",datatype:"string",width:"auto"},
			//{columnname:"Link ID",dataname:"NEXT_LINKID",width:100,hidden:true},
			{columnname:"Number of LSR's Reported",dataname:"NO_LSR_REPORTED",datatype:"string",width:"auto",colAlign:'center'},
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
		var helpOnJourneyGridDtl=	
		{
			title:"Journey Plan Help",
			id:"journeySearch",
	        detail:helpOnJourneyGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
	   }
		helpGridSection = plf.addGrid(helpOnJourneyGridDtl,this)
		mainpage.hlpSearchGridPtr = helpGridSection
		//Driver Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnJourneyHdrCollapse)
		mainpage.ptrMainSection.add(helpGridSection) 
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreJourneyPlanService",
				"methodName":"initJMCLSRApprovalSum"
			},	
		{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strJourneyPlanNoFrom","strLoadNo","strOrigin","strDestination","strDateType","dtJourneyDateFrom","dtJourneyDateTo",,"strStatus","strTruckCode","strContractNo","strDriverCode","strMobileNo","strReportingVehicle","strLSRConfirmStatus","strLSRReviewStatus","strLSRApprovalStatus","strFromRegion","strToRegion","strLoadingPoint","strUnloadingPoint"],
			    "service":"CoreJourneyPlanService",
				"methodName":"fetchJMCLSRApprovalTS"
			},
			{
				
					"tasktype":"proto",
					"filename":"jm_master/journeyplanhlp.json"
			}			
			
		];
		
		this.callParent(arguments);
		
	}
});
