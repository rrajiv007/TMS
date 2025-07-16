Ext.define('CueTrans.view.journey_management.JourneyPlanRecreate', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Journey Plan Recreate";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		//mainpage.toolbarActions=["Refresh","Create","Edit","Delete","Confirm","Short-Close","Reject"]
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to recreate a journey plan."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a journey plan."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a journey plan."
            },
            {
                "name": "Confirm",
                "tooltip": "Click here to confirm a journey plan."
            },
            {
                "name": "Short-Close",
                "tooltip": "Click here to short close a journey plan."
            },
			{
                "name": "Reject",
                "tooltip": "Click here to reject a journey plan."
            },
            ]
		mainpage.toolbarLinks=
		[
			{"name":"Journey Plan","linkid":"jms_journeyPlan","tooltip":"Click here to launch the journey plan screen."},
			{"name":"Update","linkid":"jms_update","tooltip":"Click here to launch the journey update screen."},
			{"name":"Re-Plan","linkid":"jms_replan","tooltip":"Click here to launch the journey replan screen."},
			{"name":"Assessment","linkid":"jms_assessment","tooltip":"Click here to launch the journey assessment screen."},
			//{"name":"Re-create","linkid":"recreate"}
		]
		
		//Add Keyfields
		mainpage.keyFields=["journeyPlanNo","inspectionNo","journeyManagerCode"]
		//journey plan Header Section starts
		var formCtrl=[];
		plf.columns=4
	JourneyHdrFieldset1 = plf.addColumnSection({title:"Journey Details"});
		JourneyPlanFormCtrl1=
		[
			plf.addHlpText({"label":"Journey Plan No",id:"strJourneyPlanNo",hlpLinkID:"jpno",inputFormat:"string",InputLength:"80"},this),
			plf.addDate({"label":"Journey Plan Date",id:"dtJourneyPlanDate","mandatory":"true",Increment:"10"}),
			plf.addCombo({"label":"Journey Type",id:"strJourneyPlanType"}),			
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			
			//plf.addDisplayOnly({"label":"Journey Mode",id:"strJourneyMode"}),
			plf.addHlpText({"label":"Inspection No",id:"strInspectionNo",hlpLinkID:"inspectionno",inputFormat:"string",InputLength:"80"},this),
			plf.addText({"label":"Way Bill No",id:"strWaybillNo",inputFormat:"string",InputLength:"80"}),
			plf.addDate({"label":"Need Date",id:"dtNeedDate"}),	
            plf.addHlpText({"label":"Old Journey Plan No",id:"strOldJourneyPlanNo",hlpLinkID:"oldjpno",inputFormat:"string",InputLength:"80"},this),
            plf.addDate({"label":"ROS Date",id:"dtROSDate"}), 
			
			plf.addListEdit({"label":"Journey Mgr Name",id:"strJourneyManagerName",keyField:"strJourneyManagerCode"},this),
			plf.addHlpText({"label":"Journey Mgr Code",id:"strJourneyManagerCode","mandatory":"true",hlpLinkID:"journeyManagerCode",inputFormat:"string",InputLength:"40"},this),
			
			plf.addListEdit({"label":"Coordinator Name",id:"strJourneyCoordinatorName",keyField:"strJourneyCoordinatorCode"},this),
			plf.addHlpText({"label":"Coordinator Code",id:"strJourneyCoordinatorCode",hlpLinkID:"journeyCoordinatorCode",inputFormat:"string",InputLength:"40"},this),
			
			plf.addListEdit({"label":"Vehicle Description",id:"strTruckDescription",keyField:"strTruckCode"},this),
			plf.addHlpText({"label":"Vehicle Code",id:"strTruckCode","mandatory":"true",hlpLinkID:"truckCode",inputFormat:"string",InputLength:"40"},this),
			
		//	plf.addHlpText({"label":"Trailer Code",id:"strTrailerCode","mandatory":"true",hlpLinkID:"trailerCode"},this),
			plf.addListEdit({"label":"Trailer Description",id:"strTrailerDescription",keyField:"strTrailerCode"},this),
			plf.addHlpText({"label":"Trailer Code",id:"strTrailerCode",hlpLinkID:"trailerCode",inputFormat:"string",InputLength:"40"},this),
			
			plf.addListEdit({"label":"Driver Name",id:"strDriverName",keyField:"strDriverCode"},this),
			plf.addHlpText({"label":"Driver Code",id:"strDriverCode","mandatory":"true",hlpLinkID:"driver",inputFormat:"string",InputLength:"40"},this),
			
			plf.addListEdit({"label":"Vendor Name",id:"strCustomerVendorName",keyField:"strCustomerVendorCode"},this),
			plf.addHlpText({"label":"Vendor Code",id:"strCustomerVendorCode","mandatory":"true",hlpLinkID:"customerVendor",inputFormat:"string",InputLength:"40"},this),
			
			plf.addDisplayOnly({"label":"Customer Code",id:"strCustomerCode"}),
			plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
			plf.addText({"label":"Commodity",id:"strCommodity"}),			
			plf.addBlank(),
			
			plf.addCombo({"label":"Driver Compliance",id:"strDriverCompliance","mandatory":"true"}),
	        plf.addCombo({"label":"Truck Compliance",id:"strTruckCompliance","mandatory":"true"}),
		    plf.addCombo({"label":"Load Compliance",id:"strLoadCompliance","mandatory":"true"}),
			plf.addText({"label":"RAM Score",id:"iRiskAssessmentScore",inputFormat:"string",InputLength:"80"})
			
			
					
		]
		JourneyHdrFieldset1.add(JourneyPlanFormCtrl1);
	    
		
			
		
		//journey plan Header Section ends
		//Plan Details Section Begins
		plf.columns=4
		journeyPlanDetailsCollapse = plf.addColumnSection({title:""});
		journeyPlanDetailsFormCtrl=
		[
			plf.addListEdit({"label":"Route Description","id":"strRouteDescription",keyField:"strRouteCode",inputFormat:"string",InputLength:"100"},this),
			plf.addHlpText({"label":"Route Code","id":"strRouteCode","mandatory":"true",hlpLinkID:"routeCode",inputFormat:"string",InputLength:"40"},this),
			plf.addDate({"label":"Departure Date",id:"dtDepartureDate"}),
			plf.addText({"label":"Departure Time",id:"tmDepartureTime",Increment:"10"}),
			plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Recreate From",id:"strReplanFrom"}),
			plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
			plf.addText({"label":"Pickup Point",id:"strPickupPoint",inputFormat:"string",InputLength:"100"}),
			plf.addButton({"label":"Plan Schedule",id:"cmn_btnsubmit","tooltip":"Click here to schedule the journey"})
			
		]
		journeyPlanDetailsCollapse.add(journeyPlanDetailsFormCtrl);
		//Plan Details  Section Ends
		
		//Adding Grid to Plan Details Begins
		planDtsGridFieldObj=
		[
			
			{columnname:"Transit Location",dataname:"INTRANSIT_LOCATION",datatype:"string",editControl:"addDisplayOnly",width:200},			
			{columnname:"Planned Arrival<br>Date",dataname:"PLANNED_ARRIVAL_DATE",datatype:"string",editControl:"date",width:200},
			{columnname:"Planned Arrival<br>Time",dataname:"PLANNED_ARRIVAL_TIME",datatype:"string",editControl:"textbox",width:200},
			{columnname:"Planned Departure<br>Date",dataname:"PLANNED_DEPARTURE_DATE",datatype:"string",editControl:"date",width:200},
			{columnname:"Planned Departure<br>Time",dataname:"PLANNED_DEPARTURE_TIME",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Action",dataname:"ACTION",datatype:"string",editControl:"combo",width:100,storeId:"strAction"},            			
           /* {columnname:"ReferenceType",dataname:"select",datatype:"string",editControl:"checkbox",width:150},*/		
			{columnname:"Motel",dataname:"MOTEL",datatype:"string",editControl:"textbox",width:150}
		]
		planDtsGridDtl=
		{
			title:"Plan Details",
			id:"planDetails",			
			detail:planDtsGridFieldObj,
			visibleRow:5,
			removeAddDelete:true
		}
		planDtsGridSection = plf.addGrid(planDtsGridDtl)
		journeyPlanDetailsCollapse.add(planDtsGridSection);
		//Adding Grid to Plan Details Ends	
		
		//Adding Passenger to Plan Details Begins
		passengerDtsGridFieldObj=
		[
			{columnname:"Passenger",dataname:"PASSENGER",datatype:"string",editControl:"textbox",width:200},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:400},
			{columnname:"serial no",dataname:"SERIAL_NO",datatype:"string",editControl:"textbox",width:300,hidden:true}
		]
		passengerDtsGridDtl=
		{
			title:"Passengers",
			id:"passengerDetails",
			detail:passengerDtsGridFieldObj,
			columnWidth:.5
		}
		passengerDtsGridSection = plf.addGrid(passengerDtsGridDtl)
		//Adding Passenger to Plan Details Ends
		
		//Adding Violations to Plan Details Begins
		violationsDtsGridFieldObj=
		[
			{columnname:"Violation Type",dataname:"VIOLATION_TYPE",datatype:"string",editControl:"addDisplayOnly",	width:150},
			{columnname:"Violations Description",dataname:"VIOLATION_DESC",datatype:"string",editControl:"addDisplayOnly",width:200},
			{columnname:"Existing Violations",dataname:"EXISTING_VIOLATION",datatype:"string",editControl:"addDisplayOnly",width:250}
		]
		violationsDtsGridDtl=
		{
			title:"Violations",
			id:"violationDetails",
			detail:violationsDtsGridFieldObj,
			columnWidth:.5,
			readOnly:true,
			removeAddDelete:true
		}
		violationsDtsGridSection = plf.addGrid(violationsDtsGridDtl)
		//Adding Violations to Plan Details Ends
		
		//Adding Tool Box Talks  to Plan Details Begins		
		toolBoxDtsGridFieldObj=
		[
			{columnname:"Tool Box Talk Code",dataname:"TOOLBOX_TYPE",datatype:"string",editControl:"textbox",	width:300,hidden:true},
			{columnname:"Tool Box Talks",dataname:"CATEGORY_DESC",datatype:"string",editControl:"textbox",	width:550},
			{columnname:"Seq_no",dataname:"SEQ_NO",datatype:"string",editControl:"addDisplayOnly",	width:300,hidden:true}
			
		]
		toolBoxDtsGridDtl=
		{
			title:"Tool Box Talks",
			id:"toolBoxTalksDetails",
			detail:toolBoxDtsGridFieldObj,
			columnWidth:.5,
			removeAddDelete:true
		}
		toolBoxDtsGridSection = plf.addGrid(toolBoxDtsGridDtl)
		//Adding Tool Box Talks to Plan Details Ends
		
		//Status Details Section Begins
		plf.columns=4
		statusDetailsCollapse = plf.addColumnSection({});
		statusDetailsFormCtrl=
		[
			plf.addCombo({"label":"Night Driving","id":"strNightDriveApproval"}),
			//plf.addButton({"label":"Browse","id":"browseBtn"}),
			plf.addText({"label":"Reason","id":"strApprovalReason"}),
			plf.addText({"label":"Approver Name","id":"strApproverName"}),
			plf.addText({"label":"Comments for Driver","id":"strCommentsForDriver"})
			
		]
		statusDetailsCollapse.add(statusDetailsFormCtrl);
		//Status Details  Section Ends
		
		//Adding Grid to Reference Details Collapsed Begins
		refDtsGridFieldObj=
		[
			//{columnname:"ReferenceType",dataname:"select",datatype:"string",editControl:"checkbox",width:150},
			{columnname:"Reference Type",dataname:"REFERENCE_TYPE",datatype:"string",editControl:"combo",width:200,storeId:"strReferenceType"},
			{columnname:"Reference No",dataname:"REFERENCE_NO",datatype:"string",editControl:"textbox",	width:200},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:200},
			{columnname:"SEQ NO",dataname:"SEQ_NO",datatype:"string",editControl:"textbox",width:100,hidden:true}
			
		]
		refDtsGridDtl=
		{
			title:"Reference Documents",
			id:"referenceDetails",
			detail:refDtsGridFieldObj,
			columnWidth:.5
		}
		refDtsGridSection = plf.addGrid(refDtsGridDtl)
		//Adding Grid to Reference Details Collapsed ends
		
		//
		var passRefDocDtl =  plf.addCollapseSection({title:"Reference / Passengers",collapsed:true})
		passRefDocDtl.add(refDtsGridSection)
		passRefDocDtl.add(plf.addSplitter)
		passRefDocDtl.add(passengerDtsGridSection)
		
		//Adding Grid to item Details Collapsed ends
		itemDtsGridFieldObj=
		[
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",editControl:"textbox",	width:150},
			{columnname:"Item Description",dataname:"ITEM_DESCRIPTION",datatype:"string",editControl:"textbox",width:400},
			{columnname:"Qty",dataname:"ITEM_QUANTITY",datatype:"string",editControl:"textbox",width:100},
			{columnname:"seq no",dataname:"SEQ_NO",datatype:"string",editControl:"textbox",width:100,hidden:true}
			//{columnname:"Standard UOM",dataname:"UOM",datatype:"string",editControl:"textbox",width:300}
		]
		itemDtsGridDtl=
		{
			title:"Item Details",
			id:"itemDetails",
			detail:itemDtsGridFieldObj,
			columnWidth:.6
		}
		itemDtsGridSection = plf.addGrid(itemDtsGridDtl)
		
		//itemDtlGridContainer = plf.addCollapseSection({title:"Item Details",collapsed:true});
		//itemDtlGridContainer.add(plf.addBlankBlock({"columnWidth":".2"}))
		//itemDtlGridContainer.add(itemDtsGridSection)
		
		
		//Adding Grid to item Details Collapsed ends
		violationAndToolBoxDocColumn = plf.addCollapseSection({title:"Violation / ToolBox Talks",collapsed:true});
		violationAndToolBoxDocColumn.add(violationsDtsGridSection)
		violationAndToolBoxDocColumn.add(plf.addSplitter)
		violationAndToolBoxDocColumn.add(toolBoxDtsGridSection)
		
		//Add Child Sections
		JourneyHdrFieldset1.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(JourneyHdrFieldset1)//add hdr details
        //mainpage.ptrMainSection.add(JourneyHdrFieldset2)//add hdr details
        //mainpage.ptrMainSection.add(JourneyHdrFieldset3)//add hdr details
		//JourneyJMTruckCust.add(plf.addStripLine({}));
		//mainpage.ptrMainSection.add(JourneyJMTruckCust)
		
        //mainpage.ptrMainSection.add(JourneyHdrFieldset4)//add hdr details	
        //mainpage.ptrMainSection.add(JourneyHdrFieldset5)//add hdr details
        //mainpage.ptrMainSection.add(JourneyHdrFieldset6)//add hdr details		
		/*mainpage.ptrMainSection.add(journeyPlanReferenceCollapse)//Add Day Field Section to Main */	
		journeyPlanDetailsCollapse.add(plf.addStripLine({}));		
		mainpage.ptrMainSection.add(journeyPlanDetailsCollapse)//Add Day Field Section to Main 
		//mainpage.ptrMainSection.add(planDtsGridSection) //Add Grid Section to Journey Plan Page
		/*mainpage.ptrMainSection.add(complianceDetailsCollapse) //Add Compliance Section to Journey Plan Page*/
		//mainpage.ptrMainSection.add(passengerDtsGridSection) //Add Passenger Section to Journey Plan Page
		//mainpage.ptrMainSection.add(violationsDtsGridSection) //Add Violation Section to Journey Plan Page
		//mainpage.ptrMainSection.add(toolBoxDtsGridSection) //Add Toolbox Section to Journey Plan Page
		//statusDetailsCollapse.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(statusDetailsCollapse) //Add Status Section to Journey Plan Page
		//mainpage.ptrMainSection.add(refDtsGridSection) //Add Grid Section to Journey Plan Page
		//mainpage.ptrMainSection.add(itemDtlGridContainer) //Add Grid Section to Journey Plan Page
		mainpage.ptrMainSection.add(passRefDocDtl)
		mainpage.ptrMainSection.add(violationAndToolBoxDocColumn)
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
				mainpage.eventHandlers = 
			[
			
				{
				"controlid":"",
				"tasktype":"onload",
				"input":["strOldJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"initJourneyPlanRecreateScrTS"
			},	
			{
				"controlid":"strTruckCode",
				"tasktype":"onenter",
				"input":["strTruckCode"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchTruckDetailsTS"
			},
			{
				"controlid":"strTrailerCode",
				"tasktype":"onenter",
				"input":["strTrailerCode"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchTrailerDetailsTS"
			},
			{
				"controlid":"strJourneyPlanNo",
				"tasktype":"onenter",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchJourneyPlanScrTS"
			},
			{
				"controlid":"strOldJourneyPlanNo",
				"tasktype":"onenter",
				"input":["strOldJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchJourneyPlanRecreateScrTS"
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
			{
				"controlid":"strCustomerVendorCode",
				"tasktype":"onenter",
				"input":["strCustomerVendorCode"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchCustomerVendorTS"
			},
			{
				"controlid":"strInspectionNo",
				"tasktype":"onenter",
				"input":["strInspectionNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchInspectionAdviceScrTS"
			},
			/*{
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
					"strTruckCompliance","strLoadCompliance","iRiskAssessmentScore","strStatus","strRouteCode","dtDepatureDate","tmDepartureTime","strNightDriveApproval","strApprovalReason","strApproverName","strCommentsForDriver","strPassengerName","strPassengerRemarks","strToolBoxTalks","strTransitLocation","strJourneyMode",
					"strRiskAssessmentScore","strCommodity","strTrailerCode","strNightDriveApproval","dtDepartureDate","dtDepartureTime","strOrigin","strDestination","planDetails",
					"passengerDetails","toolBoxTalksDetails","referenceDetails","itemDetails","strOldJourneyPlanNo","strRecreateReason"],
					"service":"CoreJourneyPlanService",
					"methodName":"modifyJourneyPlanTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Create",
					"input":["strJourneyPlanNo","strInspectionNo","strJourneyManagerCode","strTruckCode","strCustomerVendorCode","dtNeedDate","dtJourneyPlanDate",
					"strWaybillNo","dtROSDate","strJourneyPlanType","strJourneyCoordinatorCode","strDriverCode","strCustomerCode","strPickupPoint","strDriverCompliance",
					"strTruckCompliance","strLoadCompliance","iRiskAssessmentScore","strStatus","strRouteCode","dtDepatureDate","tmDepartureTime","strNightDriveApproval","strApprovalReason",
					"strApproverName","strCommentsForDriver","strPassengerName","strPassengerRemarks","strToolBoxTalks","strTransitLocation","strJourneyMode",
					"strRiskAssessmentScore","strCommodity","strTrailerCode","strNightDriveApproval","dtDepartureDate","dtDepartureTime","strOrigin","strDestination","planDetails",
					"passengerDetails","toolBoxTalksDetails","referenceDetails","itemDetails","strOldJourneyPlanNo"],
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
					"input":["strJourneyPlanNo"],
					"service":"CoreJourneyPlanService",
					"methodName":"authorizeJourneyPlanTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Short-Close",
					"input":["strJourneyPlanNo"],
					"service":"CoreJourneyPlanService",
					"methodName":"shortcloseJourneyPlanTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Reject",
					"input":["strJourneyPlanNo","strInspectionNo"],
					"service":"CoreJourneyPlanService",
					"methodName":"rejectJourneyPlanTS"
			},
			{       
				"controlid":"cmn_btnsubmit",
				"tasktype":"btnclick",
				"input":["strTruckCode","dtDepartureDate","tmDepartureTime","strRouteCode"],
			    "service":"CoreJourneyPlanService",
				"methodName":"createPlanScheduleTS"
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
				"except":["strTruckCode","strTruckDescription","strTrailerCode","strTrailerDescription","strDriverCode","strDriverName",                          "strCustomerVendorCode","strCustomerVendorName","strCustomerCode","strCustomerName"]
			},
			"locked":
			{
				"enableAll":false,
				"except":[]
			},
			
			"open-noins":
			{
				"enableAll":true,
				"except":[]
			},
			
			"Assessed":
			{
				"enableAll":true,
				"except":["strTruckCode","strTruckDescription","strTrailerCode","strTrailerDescription","strDriverCode","strDriverName",                          "strCustomerVendorCode","strCustomerVendorName","strCustomerCode","strCustomerName","strRouteCode"]
			}	
		}

				mainpage.screenLinks=
				
		{
			"jms_journeyPlan":
				{
					"dest":"journey_management.JourneyPlanTms",
					"hdr":[
							{"src":"strJourneyPlanNo","dest":"strJourneyPlanNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"jms_update":
				{
					"dest":"journey_management.JourneyPlanUpdateTms",
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
				"jms_assessment":
				{
					"dest":"journey_management.JourneyAssessment",
					"hdr":[
							{"src":"strJourneyPlanNo","dest":"strJourneyPlanNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
				/*"recreate":
				{
					"dest":"journey_management.JourneyPlanRecreate",
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
				"oldjpno":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.JourneyPlanHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strOldJourneyPlanNo","child":"JOURNEY_PLAN_NO"}
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
							{"parent":"","child":""}
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
				"customerVendor":
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
				},
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
		}	
		
		this.callParent(arguments);
		
	
	}
});
