Ext.define('CueTrans.view.journey_management.JourneyPlanTab', 
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
		mainpage.toolbarActions=["Refresh","Create","Edit","Delete","Authorize","Short-Close","Reject"]
		
		//Add Keyfields
		mainpage.keyFields=["journeyPlanNo","inspectionNo","journeyManagerCode"]
		//journey plan Header Section starts
		
		var formCtrl=[];
		plf.columns=4
		JourneyHdrFieldset1 = plf.addFieldSet({title:"Journey Details"});
		JourneyPlanFormCtrl1=
		[
			plf.addHlpText({"label":"Journey Plan No1",id:"strJourneyPlanNo","mandatory":"true",hlpLinkID:"jpno"},this),
			plf.addDate({"label":"Journey Plan Date",id:"dtJourneyPlanDate","mandatory":"true"}),
			plf.addText({"label":"Journey Type",id:"strJourneyPlanType"}),			
			plf.addText({"label":"Status",id:"strStatus"}),			
			//plf.addDisplayOnly({"label":"Journey Mode",id:"strJourneyMode"}),
			plf.addText({"label":"Inspection No",id:"strInspectionNo",inputFormat:"number"}),
			plf.addText({"label":"Way Bill No",id:"strWaybillNo"}),
			plf.addText({"label":"Commodity",id:"strCommodity"})
		]
		JourneyHdrFieldset1.add(JourneyPlanFormCtrl1);
	    
		plf.columns=1
		JourneyHdrFieldset2 = plf.addFieldSet({title:"Journey  Manager Details",columnWidth:.25});
		JourneyPlanFormCtrl2=
		[
			 plf.addText({"label":"Journey Mgr Code",id:"strJourneyManagerCode","mandatory":"true"}),
			 //plf.addDisplayOnly({"label":"Journey  Manager Name",id:"strJourneyManagerName"}),
			 plf.addListEdit({"label":"Journey Mgr Name",id:"strJourneyManagerName","keyField":"strJourneyManagerCode"},this),
		     plf.addText({"label":"Coordinator Code",id:"strJourneyCoordinatorCode"}),
			 plf.addDisplayOnly({"label":"Coordinator Name",id:"strJourneyCoordinatorName"})
		]
		JourneyHdrFieldset2.add(JourneyPlanFormCtrl2);
		
		plf.columns=1
		JourneyHdrFieldset3 = plf.addFieldSet({title:"Truck Trailer Details",columnWidth:.25});
		JourneyPlanFormCtrl3=
		[
		    plf.addText({"label":"Truck Code",id:"strTruckCode","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Truck Description",id:"strTruckDescription"}),
			plf.addText({"label":"Trailer Code",id:"strTrailerCode","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Trailer Description",id:"strTrailerDescription"})
		]
		JourneyHdrFieldset3.add(JourneyPlanFormCtrl3);

		JourneyHdrFieldset5 = plf.addFieldSet({title:"Customer Details",columnWidth:.25});
		JourneyPlanFormCtrl5=
		[
		    plf.addText({"label":"Customer Vendor Code",id:"strCustomerVendorCode","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Customer Vendor Name",id:"strCustomerVendorName"}),
			plf.addDisplayOnly({"label":"Customer Code",id:"strCustomerCode"}),
			plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
		    
		]
		JourneyHdrFieldset5.add(JourneyPlanFormCtrl5);

		JourneyHdrFieldset4 = plf.addFieldSet({title:"Driver Details",columnWidth:.25});
		JourneyPlanFormCtrl4=
		[
			plf.addHlpText({"label":"Driver Code",id:"strDriverCode","mandatory":"true",hlpLinkID:"driver"},this),
			plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
			plf.addBlank({}),
			plf.addBlank({})
		]
		JourneyHdrFieldset4.add(JourneyPlanFormCtrl4);
		
		
		plf.columns=4
		JourneyHdrFieldset6 = plf.addFieldSet({title:"Compliances",columnWidth:1});
		JourneyPlanFormCtrl6=	
		[
		    plf.addCombo({"label":"Driver Compliance",id:"strDriverCompliance","mandatory":"true"}),
	        plf.addCombo({"label":"Truck Compliance",id:"strTruckCompliance","mandatory":"true"}),
		    plf.addCombo({"label":"Load Compliance",id:"strLoadCompliance","mandatory":"true"}),
			plf.addText({"label":"Risk Assessment Score",id:"iRiskAssessmentScore"})
	    ]
		JourneyHdrFieldset6.add(JourneyPlanFormCtrl6); 
		
		plf.columns=4
		JourneyJMTruckCust=plf.addColumnSection({title:"Customer Details"});
		JourneyJMTruckCust.add(JourneyHdrFieldset2);
		JourneyJMTruckCust.add(JourneyHdrFieldset3);
		JourneyJMTruckCust.add(JourneyHdrFieldset5);
		JourneyJMTruckCust.add(JourneyHdrFieldset4);
		JourneyJMTruckCust.add(JourneyHdrFieldset6);
			
		
		//journey plan Header Section ends
		//Plan Details Section Begins
		plf.columns=4
		journeyPlanDetailsCollapse = plf.addColumnSection({title:""});
		journeyPlanDetailsFormCtrl=
		[
			plf.addText({"label":"Route Code","id":"strRouteCode","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Route Desc","id":"strRouteDescription"}),
			plf.addDate({"label":"Departure Date",id:"dtDepartureDate"}),
			plf.addTime({"label":"Departure Time",id:"tmDepartureTime"}),
			plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
			plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
			plf.addText({"label":"Pickup Point",id:"strPickupPoint"}),
			plf.addButton({"label":"Plan Schedule",id:"cmn_btnsubmit"})
			
		]
		journeyPlanDetailsCollapse.add(journeyPlanDetailsFormCtrl);
		//Plan Details  Section Ends
		
		//Adding Grid to Plan Details Begins
		planDtsGridFieldObj=
		[
			
			{columnname:"Transit Location",dataname:"INTRANSIT_LOCATION",datatype:"string",editControl:"addDisplayOnly",width:200},			
			{columnname:"Planned Arrival<br>Date",dataname:"PLANNED_ARRIVAL_DATE",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Planned Arrival<br>Time",dataname:"PLANNED_ARRIVAL_TIME",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Planned Departure<br>Date",dataname:"PLANNED_DEPARTURE_DATE",datatype:"string",editControl:"textbox",width:150},
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
			visibleRow:5
		}
		planDtsGridSection = plf.addGrid(planDtsGridDtl,this)
		journeyPlanDetailsCollapse.add(planDtsGridSection);
		//Adding Grid to Plan Details Ends	
		
		//Adding Passenger to Plan Details Begins
		passengerDtsGridFieldObj=
		[
			{columnname:"Passenger",dataname:"PASSENGER",datatype:"string",editControl:"textbox",width:300},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:300},
			{columnname:"serial no",dataname:"SERIAL_NO",datatype:"string",editControl:"textbox",width:300,hidden:true}
		]
		passengerDtsGridDtl=
		{
			title:"Passengers",
			id:"passengerDetails",
			detail:passengerDtsGridFieldObj,
			columnWidth:.5
		}
		passengerDtsGridSection = plf.addGrid(passengerDtsGridDtl,this)
		//Adding Passenger to Plan Details Ends
		
		//Adding Violations to Plan Details Begins
		violationsDtsGridFieldObj=
		[
			{columnname:"Violation Type",dataname:"VIOLATION_TYPE",datatype:"string",editControl:"addDisplayOnly",	width:100},
			{columnname:"Violations Description",dataname:"VIOLATION_DESC",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Existing Violations",dataname:"VIOLATION_COUNT",datatype:"string",editControl:"addDisplayOnly",width:100}
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
		violationsDtsGridSection = plf.addGrid(violationsDtsGridDtl,this)
		//Adding Violations to Plan Details Ends
		
		//Adding Tool Box Talks  to Plan Details Begins		
		toolBoxDtsGridFieldObj=
		[
			{columnname:"Tool Box Talk Code",dataname:"TOOLBOX_TYPE",datatype:"string",editControl:"textbox",	width:300,hidden:true},
			{columnname:"Tool Box Talks",dataname:"CATEGORY_DESC",datatype:"string",editControl:"textbox",	width:300},
			{columnname:"Seq_no",dataname:"SEQ_NO",datatype:"string",editControl:"addDisplayOnly",	width:300,hidden:true}
			
		]
		toolBoxDtsGridDtl=
		{
			title:"Tool Box Talks",
			id:"toolBoxTalksDetails",
			detail:toolBoxDtsGridFieldObj,
			columnWidth:.5
		}
		toolBoxDtsGridSection = plf.addGrid(toolBoxDtsGridDtl,this)
		//Adding Tool Box Talks to Plan Details Ends
		
		//Status Details Section Begins
		plf.columns=3
		statusDetailsCollapse = plf.addColumnSection({});
		statusDetailsFormCtrl=
		[
			plf.addCombo({"label":"Night Drive Approval","id":"strNightDriveApproval"}),
			plf.addButton({"label":"Browse","id":"browseBtn"}),
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
			{columnname:"ReferenceType",dataname:"REFERENCE_TYPE",datatype:"string",editControl:"combo",width:100,storeId:"strReferenceType"},
			{columnname:"ReferenceNo",dataname:"REFERENCE_NO",datatype:"string",editControl:"textbox",	width:100},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:100},
			{columnname:"SEQ NO",dataname:"SEQ_NO",datatype:"string",editControl:"textbox",width:100,hidden:true}
			
		]
		refDtsGridDtl=
		{
			title:"Reference Documents",
			id:"referenceDetails",
			detail:refDtsGridFieldObj,
			columnWidth:.5
		}
		refDtsGridSection = plf.addGrid(refDtsGridDtl,this)
		//Adding Grid to Reference Details Collapsed ends
		
		//
		var passRefDocDtl =  plf.addCollapseSection({title:"Reference",collapsed:true})
		passRefDocDtl.add(refDtsGridSection)
		passRefDocDtl.add(plf.addSplitter)
		passRefDocDtl.add(passengerDtsGridSection)
		
		//Adding Grid to item Details Collapsed ends
		itemDtsGridFieldObj=
		[
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",editControl:"textbox",	width:100},
			{columnname:"Item Description",dataname:"ITEM_DESCRIPTION",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Qty",dataname:"ITEM_QUANTITY",datatype:"string",editControl:"textbox",width:100},
			{columnname:"seq no",dataname:"SEQ_NO",datatype:"string",editControl:"textbox",width:100,hidden:true}
			//{columnname:"Standard UOM",dataname:"UOM",datatype:"string",editControl:"textbox",width:300}
		]
		itemDtsGridDtl=
		{
			title:"ItemDetails",
			id:"itemDetails",
			detail:itemDtsGridFieldObj
		}
		itemDtsGridSection = plf.addGrid(itemDtsGridDtl,this)
		//Adding Grid to item Details Collapsed ends
		violationAndToolBoxDocColumn = plf.addColumnSection({});
		violationAndToolBoxDocColumn.add(violationsDtsGridSection)
		violationAndToolBoxDocColumn.add(plf.addSplitter)
		violationAndToolBoxDocColumn.add(toolBoxDtsGridSection)
		
		//Add Child Sections
		JourneyHdrFieldset1.add(plf.addStripLine({}));
		//mainpage.ptrMainSection.add(JourneyHdrFieldset1)//add hdr details
		//baseJourneyTab.add(JourneyHdrFieldset1)
		
        //mainpage.ptrMainSection.add(JourneyHdrFieldset2)//add hdr details
        //mainpage.ptrMainSection.add(JourneyHdrFieldset3)//add hdr details
		JourneyJMTruckCust.add(plf.addStripLine({}));
		//mainpage.ptrMainSection.add(JourneyJMTruckCust)
		//baseJourneyTab.add(JourneyJMTruckCust)
		
        //mainpage.ptrMainSection.add(JourneyHdrFieldset4)//add hdr details	
        //mainpage.ptrMainSection.add(JourneyHdrFieldset5)//add hdr details
        //mainpage.ptrMainSection.add(JourneyHdrFieldset6)//add hdr details		
		/*mainpage.ptrMainSection.add(journeyPlanReferenceCollapse)//Add Day Field Section to Main */	
		journeyPlanDetailsCollapse.add(plf.addStripLine({}));		
		//mainpage.ptrMainSection.add(journeyPlanDetailsCollapse)//Add Day Field Section to Main 
		//baseJourneyTab.add(journeyPlanDetailsCollapse)
		
		//mainpage.ptrMainSection.add(planDtsGridSection) //Add Grid Section to Journey Plan Page
		/*mainpage.ptrMainSection.add(complianceDetailsCollapse) //Add Compliance Section to Journey Plan Page*/
		//mainpage.ptrMainSection.add(passengerDtsGridSection) //Add Passenger Section to Journey Plan Page
		//mainpage.ptrMainSection.add(violationsDtsGridSection) //Add Violation Section to Journey Plan Page
		//mainpage.ptrMainSection.add(toolBoxDtsGridSection) //Add Toolbox Section to Journey Plan Page
		statusDetailsCollapse.add(plf.addStripLine({}));
		//mainpage.ptrMainSection.add(statusDetailsCollapse) //Add Status Section to Journey Plan Page
		//baseJourneyTab.add(statusDetailsCollapse)
		
		//mainpage.ptrMainSection.add(refDtsGridSection) //Add Grid Section to Journey Plan Page
		//mainpage.ptrMainSection.add(itemDtsGridSection) //Add Grid Section to Journey Plan Page
		//mainpage.ptrMainSection.add(passRefDocDtl)
		//mainpage.ptrMainSection.add(violationAndToolBoxDocColumn)
		//History Data Section
		
		var baseJourneyTab = plf.addTabSection({
			tabs:[JourneyHdrFieldset1,JourneyJMTruckCust]
			});
		
		mainpage.ptrMainSection.add(baseJourneyTab)
		
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
					"passengerDetails","toolBoxTalksDetails","referenceDetails","itemDetails"],
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
					"passengerDetails","toolBoxTalksDetails","referenceDetails","itemDetails"],
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
					"action":"Authorize",
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
				
					"tasktype":"proto",
					"filename":"jm_master/JourneyPlan.json"
			}
			
			];
			//Event Handlers Mapping Ends

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
				}
		}
			
			
			//Generate Screen Section
		/*mainpage.generateScreen();
		
		
		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
		
	
	}
});
