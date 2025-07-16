/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016      69997                         Addition of var  
1.0.2	      Steffie       04/02/2016       69640              Journey short close    		                                   
************************************************************************************************/
Ext.define('CueTrans.view.journey_management.JourneyPlan', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Journey Plan";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create a journey."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit the journey."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete the journey."
            },
            {
                "name": "Confirm",
                "tooltip": "Click here to confirm the journey."
            },
			{
                "name": "Short-Close",
                "tooltip": "Click here to short close the journey."
            },
			{
                "name": "Reject",
                "tooltip": "Click here to reject the journey."
            },
			{
                "name": "Print",
                "tooltip": "Click here to print the journey."
            },
           
            ]
	//	mainpage.toolbarActions=["Refresh","Create","Edit","Delete","Confirm","Short-Close","Reject","Print"]
		
		mainpage.toolbarLinks=
		[
			{"name":"Risk Assessment","linkid":"jms_assessment","tooltip":"Click here to launch risk assessment screen."},
			
			{"name":"Update Actuals","linkid":"jms_update","tooltip":"Click here to launch journey update actuals screen."},
			{"name":"Re-Plan","linkid":"jms_replan","tooltip":"Click here to launch journey replan screen."},
			{"name":"Re-Create","linkid":"jms_recreate","tooltip":"Click here to launch journey recreate screen"}
			//{"name":"Journey Debriefing","linkid":"jms_JourneyDebriefing"}
		]
		//Add Keyfields
		mainpage.keyFields=["strJourneyPlanNo","strInspectionNo","strJourneyManagerCode"]
		//journey plan Header Section starts
		var formCtrl=[];
		plf.columns=4
		//JourneyHdrFieldset1 = plf.addFieldSet({title:"Journey Details"});
		var JourneyHdrFieldset1 = plf.addColumnSection({title:"Journey Details"}); //69997
		var JourneyPlanFormCtrl1=												  //69997
		[
			plf.addHlpText({"label":"Journey Plan No",id:"strJourneyPlanNo",hlpLinkID:"jpno",inputFormat:"string",InputLength:"80"},this),
			plf.addDate({"label":"Journey Plan Date",id:"dtJourneyPlanDate","mandatory":"true",Increment:"10"}),
			plf.addCombo({"label":"Journey Type",id:"strJourneyPlanType"}),			
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),		
			plf.addListEdit({"label":"Journey Mgr Name",id:"strJourneyManagerName",keyField:"strJourneyManagerCode"},this),
			plf.addHlpText({"label":"Journey Mgr Code",id:"strJourneyManagerCode","mandatory":"true",hlpLinkID:"journeyManagerCode",inputFormat:"string",InputLength:"40"},this),

			//plf.addHlpText({"label":"Journey Mgr Code",id:"strJourneyManagerCode","mandatory":"true",hlpLinkID:"journeyManagerCode",inputFormat:"string",InputLength:"40"},this),			
			//plf.addDisplayOnly({"label":"Journey Mgr Name",id:"strJourneyManagerName",keyField:"strJourneyManagerCode"},this),
			plf.addDisplayOnly({"label":"Phone Number",id:"strPhoneNo"}),
			//plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}), --Bug 65148
			plf.addListEdit({"label":"Coordinator Name",id:"strJourneyCoordinatorName",keyField:"strJourneyCoordinatorCode"},this),
			plf.addHlpText({"label":"Coordinator Code",id:"strJourneyCoordinatorCode",hlpLinkID:"journeyCoordinatorCode",inputFormat:"string",InputLength:"40"},this),	
			
			plf.addHidden({"label":"Vehicle Description",id:"strTruckDescription",keyField:"strTruckCode"},this),
			
			plf.addHidden({"label":"Trailer Description",id:"strTrailerDescription",keyField:"strTrailerCode"},this),
			plf.addHidden({"label":"Trailer Code",id:"strTrailerCode",hlpLinkID:"trailerCode",inputFormat:"string",InputLength:"40"},this),			
			
					
			//plf.addFileUpload({"label":"Attach File",id:"strFileAttach",Entity:"Journey_Plan\\File_Attachment"})
			
		]
		JourneyHdrFieldset1.add(JourneyPlanFormCtrl1);
		
	   var  JPInspDtls = plf.addColumnSection({title:""});		//69997
		var JPInspDtlsCtrl=										//69997
		[			
			plf.addHlpText({"label":"Inspection No",id:"strInspectionNo",hlpLinkID:"inspectionno",inputFormat:"string",InputLength:"80"},this),
			plf.addDisplayOnly({"label":"Load No",id:"strWaybillNo",inputFormat:"string"}),
			//plf.addCombo({"label":"Commodity",id:"strCommodity"}),	--Bug 65148
			plf.addDisplayOnlyDate({"label":"Delivery Date",id:"dtROSDate",Increment:"10"}), 
			plf.addHlpText({"label":"Vehicle Code",id:"strTruckCode","mandatory":"true",hlpLinkID:"truckCode",inputFormat:"string",InputLength:"40"},this),
			plf.addDisplayOnly({"label":"Vehicle Reg.No",id:"strVehicleRegNo"}),
			plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehicleCategory"}),
			plf.addDisplayOnly({"label":"Carrier Name",id:"strCarrierName"}),
			plf.addHlpText({"label":"Driver Code",id:"strDriverCode","mandatory":"true",hlpLinkID:"driver",inputFormat:"string",InputLength:"40"},this),
			plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName",keyField:"strDriverCode"},this),			
			plf.addDisplayOnly({"label":"Mobile No",id:"strMobileNo"}),
			plf.addDisplayOnly({"label":"Licence No",id:"strLicenseNo"}),
			plf.addCombo({"label":"Driver Compliance",id:"strDriverCompliance","mandatory":"true"}),
	        plf.addCombo({"label":"Vehicle Compliance",id:"strTruckCompliance","mandatory":"true"}),
		    plf.addCombo({"label":"Load Compliance",id:"strLoadCompliance","mandatory":"true"}),
			plf.addText({"label":"RAM Score",id:"iRiskAssessmentScore",inputFormat:"string",InputLength:"80"})
		]
		JPInspDtls.add(JPInspDtlsCtrl);
			
		
		//journey plan Header Section ends
		//Plan Details Section Begins
		plf.columns=4
		var journeyPlanDetailsCollapse = plf.addColumnSection({title:""});	//69997
		var journeyPlanDetailsFormCtrl=										//69997
		[   
		    plf.addCombo({"label":"Manual Plan",id:"strManualPlan","mandatory":"true"}),
			plf.addListEdit({"label":"Route Description","id":"strRouteDescription",keyField:"strRouteCode",inputFormat:"string",InputLength:"100"},this),
			plf.addHlpText({"label":"Route Code","id":"strRouteCode",hlpLinkID:"routeCode",inputFormat:"string",InputLength:"40"},this),			
			//plf.addDate({"label":"Departure Date",id:"dtDepartureDate"}),
			//plf.addText({"label":"Departure Time",id:"tmDepartureTime",Increment:"10"}),
			plf.addDateTime({"label":"Departure Date/Time",dateid:"dtDepartureDate",timeid:"tmDepartureTime"}),
			plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
			plf.addDisplayOnly({"label":"Via","id":"strVia"}),
			plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),			
			//plf.addText({"label":"Pickup Point",id:"strPickupPoint",inputFormat:"string",InputLength:"100"}),
			plf.addButton({"label":"Create Route Plan",id:"cmn_btnsubmit","tooltip":"Click here to schedule the journey."})
			
		]
		journeyPlanDetailsCollapse.add(journeyPlanDetailsFormCtrl);
		//Plan Details  Section Ends
		
		//Adding Grid to Plan Details Begins
		var planDtsGridFieldObj=										//69997
		[
			
			{columnname:"Transit Location",dataname:"INTRANSIT_LOCATION",datatype:"string",editControl:"addDisplayOnly",width:100},			
			/*{columnname:"Planned Arrival Date",dataname:"PLANNED_ARRIVAL_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Planned Arrival Time",dataname:"PLANNED_ARRIVAL_TIME",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Planned Departure Date",dataname:"PLANNED_DEPARTURE_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Planned Departure Time",dataname:"PLANNED_DEPARTURE_TIME",datatype:"string",editControl:"textbox",width:120},
			*/
			{"group":"Plan","dtl":[
			{columnname:"Arrival Date",dataname:"PLANNED_ARRIVAL_DATE",datatype:"string",width:100},
			{columnname:"Arrival Time",dataname:"PLANNED_ARRIVAL_TIME",datatype:"string",width:100},
			{columnname:"Departure Date",dataname:"PLANNED_DEPARTURE_DATE",datatype:"string",width:100},
			{columnname:"Departure Time",dataname:"PLANNED_DEPARTURE_TIME",datatype:"string",width:120},
			]},			
			{columnname:"Action",dataname:"ACTION_TYPE",datatype:"string",editControl:"combo",width:100,storeId:"strAction"},
            {columnname:"Delay Reason",dataname:"DELAY_REASON",datatype:"string",editControl:"combo",width:100,storeId:"strDelayReason"},  			
           /* {columnname:"ReferenceType",dataname:"select",datatype:"string",editControl:"checkbox",width:150},*/		
			{columnname:"Motel",dataname:"MOTEL",datatype:"string",editControl:"textbox",width:100}
		]
		var planDtsGridDtl=										//69997
		{
			title:"Plan Details",
			id:"planDetails",			
			widthBasis:"flex",
			detail:planDtsGridFieldObj,
			visibleRow:7,
		    removeAddDelete:true
		}
		var planDtsGridSection = plf.addGrid(planDtsGridDtl,this)			//69997
		journeyPlanDetailsCollapse.add(planDtsGridSection);		//69997		
		//Adding Grid to Plan Details Ends	
		var planDtsGridManualFieldObj=									//69997
		[
			
			{columnname:"Transit Location",dataname:"INTRANSIT_LOCATION",datatype:"string",editControl:"combo",width:100,storeId:"strTransitLocation"},			
			{columnname:"Planned Arrival Date",dataname:"PLANNED_ARRIVAL_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Planned Arrival Time",dataname:"PLANNED_ARRIVAL_TIME",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Planned Departure Date",dataname:"PLANNED_DEPARTURE_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Planned Departure Time",dataname:"PLANNED_DEPARTURE_TIME",datatype:"string",editControl:"textbox",width:120},
			/*
			{"group":"Plan","dtl":[
			{columnname:"Arrival Date",dataname:"PLANNED_ARRIVAL_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Arrival Time",dataname:"PLANNED_ARRIVAL_TIME",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Departure Date",dataname:"PLANNED_DEPARTURE_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Departure Time",dataname:"PLANNED_DEPARTURE_TIME",datatype:"string",editControl:"textbox",width:120},
			]},	*/	
			{columnname:"Action",dataname:"ACTION_TYPE",datatype:"string",editControl:"combo",width:100,storeId:"strAction"},
            {columnname:"Delay Reason",dataname:"DELAY_REASON",datatype:"string",editControl:"combo",width:100,storeId:"strDelayReason"},  			
           /* {columnname:"ReferenceType",dataname:"select",datatype:"string",editControl:"checkbox",width:150},*/		
			{columnname:"Motel",dataname:"MOTEL",datatype:"string",editControl:"textbox",width:100}
		]
		var planDtsGridManualDtl=									//69997
		{
			title:"Manual Plan Details",
			id:"manualplanDetails",			
			widthBasis:"flex",
			detail:planDtsGridManualFieldObj,
			visibleRow:7
		}
		var planDtsGridManualSection = plf.addGrid(planDtsGridManualDtl,this)	//69997
		journeyPlanDetailsCollapse.add(planDtsGridManualSection);
		//Adding Passenger to Plan Details Begins
		var passengerDtsGridFieldObj=								//69997
		[
			{columnname:"Passenger",dataname:"PASSENGER",datatype:"string",editControl:"textbox",width:200},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:400},
			{columnname:"serial no",dataname:"SERIAL_NO",datatype:"string",editControl:"textbox",width:300,hidden:true}
		]
		var passengerDtsGridDtl=					//69997
		{
			title:"Passengers",
			id:"passengerDetails",
			widthBasis:"flex",
			detail:passengerDtsGridFieldObj,
			columnWidth:.5
		}
		var passengerDtsGridSection = plf.addGrid(passengerDtsGridDtl,this)	//69997
		//Adding Passenger to Plan Details Ends
		
		//Adding Violations to Plan Details Begins
		var violationsDtsGridFieldObj=								//69997
		[
			{columnname:"Violation Type",dataname:"VIOLATION_TYPE",datatype:"string",editControl:"addDisplayOnly",	width:100},
			{columnname:"Violations Description",dataname:"VIOLATION_DESC",datatype:"string",editControl:"addDisplayOnly",width:200},
			{columnname:"Count",dataname:"COUNT",datatype:"string",editControl:"addDisplayOnly",width:150,colAlign:'right'}
			//{columnname:"Attach Document",dataname:"ATTACH_DOCUMENT_VIO",datatype:"string",width:150,editControl:"fileupload",fileGroup:"Journey_Plan\\Violations",width:175}
		]
		var violationsDtsGridDtl=									//69997
		{
			title:"Existing Violations",
			id:"violationDetails",
			detail:violationsDtsGridFieldObj,
			widthBasis:"flex",
			columnWidth:.5,
			readOnly:true,
			removeAddDelete:true
		}
		var violationsDtsGridSection = plf.addGrid(violationsDtsGridDtl,this)	//69997
		//Adding Violations to Plan Details Ends
		
		//Adding Tool Box Talks  to Plan Details Begins		
		var toolBoxDtsGridFieldObj=												//69997
		[
			{columnname:"Tool Box Talk Code",dataname:"TOOLBOX_TYPE",datatype:"string",editControl:"textbox",	width:300,hidden:true},
			{columnname:"Tool Box Talks",dataname:"CATEGORY_DESC",datatype:"string",editControl:"textbox",	width:500},
			{columnname:"Seq_no",dataname:"SEQ_NO",datatype:"string",editControl:"addDisplayOnly",	width:300,hidden:true}

			
		]
	var toolBoxDtsGridDtl=						//69997
		{
			title:"Toolbox Talks",
			id:"toolBoxTalksDetails",
			widthBasis:"flex",
			detail:toolBoxDtsGridFieldObj,
			columnWidth:.5
			
		}
		var toolBoxDtsGridSection = plf.addGrid(toolBoxDtsGridDtl,this) //69997
		//Adding Tool Box Talks to Plan Details Ends
		
		//Status Details Section Begins
		plf.columns=4
		var statusDetailsCollapse = plf.addColumnSection({title:"Night Driving"});	//69997
		var statusDetailsFormCtrl=													//69997
		[
			plf.addCombo({"label":"Night Driving","id":"strNightDriveApproval"}),
			//plf.addButton({"label":"Browse","id":"browseBtn"}),
			plf.addCombo({"label":"Reason","id":"strApprovalReason"}),
			plf.addText({"label":"Approver Name","id":"strApproverName"}),
			plf.addText({"label":"Comments for Driver","id":"strCommentsForDriver"}),
			plf.addFileUpload({"label":"Attach File",id:"strFileAttach1",Entity:"Journey_Plan\\Night_Approval"})
			
			
		]
		statusDetailsCollapse.add(statusDetailsFormCtrl);
		//Status Details  Section Ends
		
		//Adding Grid to Reference Details Collapsed Begins
		var refDtsGridFieldObj=														//69997
		[
			//{columnname:"ReferenceType",dataname:"select",datatype:"string",editControl:"checkbox",width:150},
			{columnname:"Reference Type",dataname:"REFERENCE_TYPE",datatype:"string",editControl:"combo",width:100,storeId:"strReferenceType"},
			{columnname:"Reference No",dataname:"REFERENCE_NO",datatype:"string",editControl:"textbox",	width:100},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:100},
			{columnname:"SEQ NO",dataname:"SEQ_NO",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Attach Document",dataname:"ATTACH_DOCUMENT_REF",datatype:"string",width:100,editControl:"fileupload",fileGroup:"Journey_Plan\\Reference_Documents",width:175}
			
			
		]
		var refDtsGridDtl=														//69997
		{
			title:"Reference Documents",
			id:"referenceDetails",
			widthBasis:"flex",
			detail:refDtsGridFieldObj,
			columnWidth:.5
		}
		var refDtsGridSection = plf.addGrid(refDtsGridDtl,this)					//69997
		//Adding Grid to Reference Details Collapsed ends
		
		//
		var passRefDocDtl =  plf.addCollapseSection({title:"Reference / Passengers",collapsed:true})
		passRefDocDtl.add(refDtsGridSection)
		passRefDocDtl.add(plf.addSplitter)
		passRefDocDtl.add(passengerDtsGridSection)
		
		//Adding Grid to item Details Collapsed ends
		var itemDtsGridFieldObj=											//69997
		[
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Item Description",dataname:"ITEM_DESCRIPTION",datatype:"string",editControl:"textbox",width:400},
			{columnname:"Qty",dataname:"ITEM_QUANTITY",datatype:"string",editControl:"textbox",width:100},
			{columnname:"seq no",dataname:"SEQ_NO",datatype:"string",editControl:"textbox",width:100,hidden:true}
			//{columnname:"Standard UOM",dataname:"UOM",datatype:"string",editControl:"textbox",width:300}
		]
		var itemDtsGridDtl=												//69997
		{
			title:"Item Details",
			id:"itemDetails",
			detail:itemDtsGridFieldObj,
			columnWidth:.6
		}
		var itemDtsGridSection = plf.addGrid(itemDtsGridDtl,this)			//69997
		
		var itemDtlGridContainer = plf.addCollapseSection({title:"Item Details",collapsed:true});		//69997
		itemDtlGridContainer.add(plf.addBlankBlock({"columnWidth":".2"}))
		itemDtlGridContainer.add(itemDtsGridSection)
		
		
		//Adding Grid to item Details Collapsed ends
		var violationAndToolBoxDocColumn = plf.addCollapseSection({title:"Violations / Toolbox Talks",collapsed:false});	//69997
		violationAndToolBoxDocColumn.add(violationsDtsGridSection)
		violationAndToolBoxDocColumn.add(plf.addSplitter)
		violationAndToolBoxDocColumn.add(toolBoxDtsGridSection)
		
		//Add Child Sections
		JourneyHdrFieldset1.add(plf.addStripLine({}));											//69997
		mainpage.ptrMainSection.add(JourneyHdrFieldset1)//add hdr details
		mainpage.ptrMainSection.add(JPInspDtls);		
        //mainpage.ptrMainSection.add(JourneyHdrFieldset2)//add hdr details
        //mainpage.ptrMainSection.add(JourneyHdrFieldset3)//add hdr details
		//JourneyJMTruckCust.add(plf.addStripLine({}));
		//mainpage.ptrMainSection.add(JourneyJMTruckCust)
		
        //mainpage.ptrMainSection.add(JourneyHdrFieldset4)//add hdr details	
        //mainpage.ptrMainSection.add(JourneyHdrFieldset5)//add hdr details
        //mainpage.ptrMainSection.add(JourneyHdrFieldset6)//add hdr details		
		/*mainpage.ptrMainSection.add(journeyPlanReferenceCollapse)//Add Day Field Section to Main */	
		journeyPlanDetailsCollapse.add(plf.addStripLine({}));				//69997
		mainpage.ptrMainSection.add(journeyPlanDetailsCollapse)//Add Day Field Section to Main 
		//mainpage.ptrMainSection.add(planDtsGridSection) //Add Grid Section to Journey Plan Page
		/*mainpage.ptrMainSection.add(complianceDetailsCollapse) //Add Compliance Section to Journey Plan Page*/
		//mainpage.ptrMainSection.add(passengerDtsGridSection) //Add Passenger Section to Journey Plan Page
		//mainpage.ptrMainSection.add(violationsDtsGridSection) //Add Violation Section to Journey Plan Page
		//mainpage.ptrMainSection.add(toolBoxDtsGridSection) //Add Toolbox Section to Journey Plan Page
		//statusDetailsCollapse.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(statusDetailsCollapse) //Add Status Section to Journey Plan Page
		mainpage.ptrMainSection.add(violationAndToolBoxDocColumn)
		//mainpage.ptrMainSection.add(refDtsGridSection) //Add Grid Section to Journey Plan Page
		//mainpage.ptrMainSection.add(itemDtlGridContainer) //Add Grid Section to Journey Plan Page
		mainpage.ptrMainSection.add(passRefDocDtl)
		//mainpage.ptrMainSection.add(violationAndToolBoxDocColumn)
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
				mainpage.eventHandlers = 
			[
			
				{
				"controlid":"",
				"tasktype":"onload",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"initJourneyPlanScrTS"
			},	
			{
				"controlid":"strTruckCode",
				"tasktype":"onenter",
				"input":["strTruckCode"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchTruckDetailsTS"
			},
			{
				"controlid":"strJourneyPlanNo",
				"tasktype":"onenter",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchJourneyPlanScrTS"
			},
			{
				"controlid":"strRouteCode",
				"tasktype":"onenter",
				"input":["strRouteCode"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchRouteDetailsTS"
			},
			{
				"controlid":"strDriverCode",
				"tasktype":"onenter",
				"input":["strDriverCode"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchDriverDetailsTS"
			},
			{
				"controlid":"strJourneyManagerCode",
				"tasktype":"onenter",
				"input":["strJourneyManagerCode"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchJourneyManagerDetails"
			},
			{
				"controlid":"strJourneyCoordinatorCode",
				"tasktype":"onenter",
				"input":["strJourneyCoordinatorCode"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchJourneyCoordinatorDetails"
			},
			{
				"controlid":"strTrailerCode",
				"tasktype":"onenter",
				"input":["strTrailerCode"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchTrailerDetailsTS"
			},
			/*{
				"controlid":"strCustomerVendorCode",
				"tasktype":"onenter",
				"input":["strCustomerVendorCode"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchCustomerVendorTS"
			},*/
			{
				"controlid":"strInspectionNo",
				"tasktype":"onenter",
				"input":["strInspectionNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchInspectionAdviceScrTS"
			},
			/*{
				"controlid":"strWaybillNo",
				"tasktype":"onenter",
				"input":["strWaybillNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchWaybillNoScrTS"
			},
			{
				"controlid":"strWayBillNo",
				"tasktype":"onenter",
				"input":["strWayBillNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchWaybillNoTS"
			},*/
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Edit",
					"input":["strJourneyPlanNo","strInspectionNo","strJourneyManagerCode","strTruckCode","strCustomerVendorCode","dtNeedDate","dtJourneyPlanDate",
					"strWaybillNo","dtROSDate","strJourneyPlanType","strJourneyCoordinatorCode","strDriverCode","strCustomerCode","strPickupPoint","strDriverCompliance",
					"strTruckCompliance","strLoadCompliance","iRiskAssessmentScore","strStatus","strRouteCode","strManualPlan","dtDepatureDate","tmDepartureTime","strNightDriveApproval","strApprovalReason","strApproverName","strCommentsForDriver","strPassengerName","strPassengerRemarks","strToolBoxTalks","strTransitLocation","strJourneyMode",
					"strRiskAssessmentScore","strCommodity","strTrailerCode","strNightDriveApproval","dtDepartureDate","dtDepartureTime","strOrigin","strDestination","planDetails",
					"passengerDetails","toolBoxTalksDetails","referenceDetails","manualplanDetails","itemDetails","strFileAttach","strFileAttach1"],
					"service":"CoreJourneyPlanService",
					"methodName":"modifyJourneyPlanTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Create",
					"input":["strJourneyPlanNo","strInspectionNo","strJourneyManagerCode","strTruckCode","strCustomerVendorCode","dtNeedDate","dtJourneyPlanDate",
					"strWaybillNo","dtROSDate","strJourneyPlanType","strJourneyCoordinatorCode","strDriverCode","strCustomerCode","strPickupPoint","strDriverCompliance",
					"strTruckCompliance","strLoadCompliance","iRiskAssessmentScore","strStatus","strRouteCode","strManualPlan","dtDepatureDate","tmDepartureTime","strNightDriveApproval","strApprovalReason",
					"strApproverName","strCommentsForDriver","strPassengerName","strPassengerRemarks","strToolBoxTalks","strTransitLocation","strJourneyMode",
					"strRiskAssessmentScore","strCommodity","strTrailerCode","strNightDriveApproval","dtDepartureDate","dtDepartureTime","strOrigin","strDestination","planDetails",
					"passengerDetails","toolBoxTalksDetails","referenceDetails","manualplanDetails","itemDetails","strFileAttach","strFileAttach1"],
					"service":"CoreJourneyPlanService",
					"methodName":"createJourneyPlanTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Delete",
					"input":["strJourneyPlanNo"],
					"service":"CoreJourneyPlanService",
					"methodName":"deleteJourneyPlanTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Confirm",
					"input":["strJourneyPlanNo","strInspectionNo","strJourneyManagerCode","strTruckCode","strCustomerVendorCode","dtNeedDate","dtJourneyPlanDate",
					"strWaybillNo","dtROSDate","strJourneyPlanType","strJourneyCoordinatorCode","strDriverCode","strCustomerCode","strPickupPoint","strDriverCompliance",
					"strTruckCompliance","strLoadCompliance","iRiskAssessmentScore","strStatus","strRouteCode","strManualPlan","dtDepatureDate","tmDepartureTime","strNightDriveApproval","strApprovalReason",
					"strApproverName","strCommentsForDriver","strPassengerName","strPassengerRemarks","strToolBoxTalks","strTransitLocation","strJourneyMode",
					"strRiskAssessmentScore","strCommodity","strTrailerCode","strNightDriveApproval","dtDepartureDate","dtDepartureTime","strOrigin","strDestination","planDetails",
					"passengerDetails","toolBoxTalksDetails","referenceDetails","manualplanDetails","itemDetails","strFileAttach","strFileAttach1"],
					"service":"CoreJourneyPlanService",
					"methodName":"authorizeJourneyPlanTS"
			},
            //69640 changes
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Short-Close",
					"input":["strJourneyPlanNo","strWaybillNo","strTruckCode","strDriverCode","strTrailerCode","strFileAttach","strFileAttach1"],
					"service":"CoreJourneyPlanService",
					"methodName":"shortcloseJourneyPlanTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Reject",
					"input":["strJourneyPlanNo","strInspectionNo","strTruckCode","strDriverCode","strTrailerCode","strFileAttach","strFileAttach1"],
					"service":"CoreJourneyPlanService",
					"methodName":"rejectJourneyPlanTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Print",
					"input":["strJourneyPlanNo"],
					"service":"CoreJourneyPlanService",
					"methodName":"PrintJourneyPlanReport"
			},
			{       
				"controlid":"cmn_btnsubmit",
				"tasktype":"btnclick",
				"input":["strTruckCode","dtDepartureDate","tmDepartureTime","strRouteCode","strFileAttach","strFileAttach1","strWaybillNo"],
			    "service":"CoreJourneyPlanService",
				"methodName":"createPlanScheduleTS"
			},
			{
				"controlid":"strManualPlan",
				"tasktype":"onchange",
				"input":["strManualPlan"],
				"service":"CoreJourneyPlanService",
				"methodName":"onchange_manualplan"
			},
			{
				
					"tasktype":"proto",
					"filename":"jm_master/JourneyPlan.json"
			}
			
			];
			//Event Handlers Mapping Ends
			
			
			mainpage.screenModes=
		{
			"open-ins":
			{
				"enableAll":true,
				"except":["strTruckCode","strTruckDescription","strTrailerCode","strTrailerDescription","strDriverCode","strDriverName","strCustomerVendorCode",
                                        "strCustomerVendorName","strCustomerCode","strCustomerName"]
			},
			"locked":
			{
				"enableAll":false,
				"except":["strJourneyPlanNo"]
			},
			
			"open-noins":
			{
				"enableAll":true,
				"except":[]
			},
			
			"Assessed":
			{
				"enableAll":true,
				"except":["strTruckCode","strTruckDescription","strTrailerCode","strTrailerDescription","strDriverCode","strDriverName","strCustomerVendorCode",
                                     "strCustomerVendorName","strCustomerCode","strCustomerName","strRouteCode"]
			}	
		}

		
		mainpage.screenLinks=
		{
			"jms_assessment":
				{
					"dest":"journey_management.JourneyAssessment",
					"hdr":[
							{"src":"strJourneyPlanNo","dest":"strJourneyPlanNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
				
				"jms_update":
				{
					"dest":"journey_management.JourneyPlanUpdate",
					"hdr":[
							{"src":"strJourneyPlanNo","dest":"strJourneyPlanNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"jms_replan":
				{
					"dest":"journey_management.JourneyPlanReplan",
					"hdr":[
							{"src":"strJourneyPlanNo","dest":"strJourneyPlanNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"jms_recreate":
				{
					"dest":"journey_management.JourneyPlanRecreate",
					"hdr":[
							{"src":"strJourneyPlanNo","dest":"strOldJourneyPlanNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}/*,
				"jms_JourneyDebriefing":
				{
					"dest":"journey_management.JourneyDebriefing",
					"hdr":[
							{"src":"strJourneyPlanNo","dest":"strJourneyPlanNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}*/
		}
		
		mainpage.hlpLinks=
		{
			"jpno":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.JourneyPlanHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strJourneyPlanNo","child":"JOURNEY_PLAN_NO"}
							]
				},			
			"waybillno":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.LoadBuildingHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strWaybillNo","child":"LOAD_NO"}
							]
				},	
				
			"driver":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strDriverCode","child":"DRIVER_CODE"},
							{"parent":"strDriverName","child":"DRIVER_NAME"}
							]
				},
				"journeyManagerCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.EmployeeHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"Tran","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strJourneyManagerCode","child":"EMPLOYEE_CODE"},
							{"parent":"strJourneyManagerName","child":"EMPLOYEE_NAME"}
							]
				},
				"journeyCoordinatorCode":
				{

					"hlpType":"Header",
					"hlpScreen":"jm_master.EmployeeHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strJourneyCoordinatorCode","child":"EMPLOYEE_CODE"},
							{"parent":"strJourneyCoordinatorName","child":"EMPLOYEE_NAME"}
							]
				},
				"truckCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTruckCode","child":"TRUCK_CODE"},
							{"parent":"strTruckDescription","child":"TRUCK_DESC"}
							]
				},
				"trailerCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTrailerCode","child":"TRUCK_CODE"},
							{"parent":"strTrailerDescription","child":"TRUCK_DESC"}
							]
				},
				/*"customerVendor":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CustomerVendorHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCustomerVendorCode","child":"CUST_VENDOR_CODE"},
							{"parent":"strCustomerVendorName","child":"CUST_VENDOR_NAME"},
							{"parent":"strCustomerCode","child":"CUST_CODE"},
							{"parent":"strCustomerName","child":"CUST_NAME"}
							]
				},*/
				"routeCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.RouteHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRouteCode","child":"ROUTE_CODE"},
							{"parent":"strRouteDescription","child":"JOURNEYLEGS"},
							{"parent":"strOrigin","child":"INTRANSIT_ORIGIN"},
							{"parent":"strDestination","child":"INTRANSIT_DEST"}
							]
				},
				"inspectionno":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.InspectionHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strInspectionNo","child":"INSPECTION_NO"}
							]
				},
		}	
		
		this.callParent(arguments);
		
	
	},
	callIVMSFn:function()
	{
			var tmpHTMLStr =ivmsPath + Math.random()+"&vh="+this.queryById("strTruckCode").getValue();
			if (newIVMSPtr != undefined && typeof newIVMSPtr.close != undefined) 
				newIVMSPtr.close();
			newIVMSPtr = window.open(tmpHTMLStr, 'cuetransivms');
	}
});
