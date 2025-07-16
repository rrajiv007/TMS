/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var  		                                   
************************************************************************************************/
Ext.define('CueTrans.view.journey_management.JourneyPlanReplan', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Journey Plan Replan";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		//mainpage.toolbarActions=["Refresh","Amend","Confirm","Short-Close"]
	      mainpage.toolbarActions= [
	      {
                "name": "Refresh",
                "tooltip": "Click here to refresh."
             }
	      /*,
			{
                "name": "Amend",
                "tooltip": "Click here to amend a journey plan no."
            }*/,
			{
                "name": "Re-Plan",
                "tooltip": "Click here to Update Re-Plan details."
            }
	     /*,
            {
                "name": "Short-Close",
                "tooltip": "Click here to shortclose a journey plan."
            }*/
            ]
		
		mainpage.toolbarLinks=
		[
			{"name":"Journey Plan","linkid":"jms_journeyPlan","tooltip":"Click here to launch the journey plan screen."},
			{"name":"Update Actuals","linkid":"jms_update","tooltip":"Click here to launch the journey update screen."}
			//{"name":"Re-plan","linkid":"replan"},
			/*{"name":"Re-Create","linkid":"jms_recreate","tooltip":"Click here to launch the journey recreate screen."}*/
		]
		
		//Add Keyfields
		mainpage.keyFields=["journeyPlanNo","inspectionNo","journeyManagerCode"]
		
	//journey plan Header Section starts
	    var formCtrl=[];
		plf.columns=4
		
		var JourneyHdrFieldset1 = plf.addColumnSection({title:"Journey Plan Details"});		//69997
		var JourneyPlanFormCtrl1=															//69997

		[
			plf.addHlpText({"label":"Journey Plan No",id:"strJourneyPlanNo",hlpLinkID:"jpno"},this),
			plf.addDisplayOnly({"label":"Journey Plan Date",id:"dtJourneyPlanDate"}),
			plf.addDisplayOnly({"label":"Journey Type",id:"strJourneyPlanType"}),			
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),			
			plf.addDisplayOnly({"label":"Journey Mgr Name",id:"strJourneyManagerName"}),			
			plf.addHidden({"label":"Need Date",id:"dtNeedDate"}),		    
            plf.addHidden({"label":"ROS Date",id:"dtROSDate"}), 
            plf.addHidden({"label":"Pickup Point",id:"strPickupPoint"}),			
			plf.addDisplayOnly({"label":"Journey Mgr Code",id:"strJourneyManagerCode"}),			
		    plf.addDisplayOnly({"label":"Coordinator Code",id:"strJourneyCoordinatorCode"}),
			plf.addDisplayOnly({"label":"Coordinator Name",id:"strJourneyCoordinatorName"}),
			plf.addHidden({"label":"Vehicle Code",id:"strTruckCode"}),
			plf.addHidden({"label":"Vehicle Description",id:"strTruckDescription"}),
			plf.addHidden({"label":"Trailer Code",id:"strTrailerCode"}),
			plf.addHidden({"label":"Trailer Description",id:"strTrailerDescription"}),
			plf.addHidden({"label":"Driver Code",id:"strDriverCode"}),
			plf.addHidden({"label":"Customer Code",id:"strCustomerCode"}),
			plf.addHidden({"label":"Vendor Code",id:"strCustomerVendorCode"}),
			plf.addHidden({"label":"Vendor Name",id:"strCustomerVendorName"}),
			plf.addHidden({"label":"Driver Compliance",id:"strDriverCompliance"}),
	        plf.addHidden({"label":"Truck Compliance",id:"strTruckCompliance"}),
		    plf.addHidden({"label":"Load Compliance",id:"strLoadCompliance"}),
			plf.addHidden({"label":"RAM score",id:"iRiskAssessmentScore"})
			
		]
		JourneyHdrFieldset1.add(JourneyPlanFormCtrl1);	
		
		var JourneyHdrFieldset2 = plf.addColumnSection({title:""});				//69997

		var JourneyPlanFormCtrl2=												//69997
		[
			//plf.addHlpText({"label":"Journey Plan No",id:"strJourneyPlanNo",hlpLinkID:"jpno"},this),
			//plf.addDisplayOnly({"label":"Journey Plan Date",id:"dtJourneyPlanDate"}),
			plf.addHidden({"label":"Journey Type",id:"strJourneyPlanType"}),			
			//plf.addDisplayOnly({"label":"Journey Mgr Name",id:"strJourneyManagerName"}),
			//plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			//plf.addDisplayOnly({"label":"Journey Mode",id:"strJourneyMode"}),
			plf.addHidden({"label":"Inspection No",id:"strInspectionNo"}),
			plf.addDisplayOnly({"label":"Way Bill No",id:"strWaybillNo"}),
			plf.addDisplayOnly({"label":"Vehicle Registration No",id:"strVehicleRegNo"}),
			plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehicleCategory"}),
			plf.addHidden({"label":"Need Date",id:"dtNeedDate"}),		    
            plf.addHidden({"label":"ROS Date",id:"dtROSDate"}), 
            plf.addHidden({"label":"Pickup Point",id:"strPickupPoint"}),
			plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"}),
			plf.addHidden({"label":"Journey Mgr Code",id:"strJourneyManagerCode"}),
			
		    plf.addHidden({"label":"Coordinator Code",id:"strJourneyCoordinatorCode"}),
			plf.addHidden({"label":"Coordinator Name",id:"strJourneyCoordinatorName"}),
			plf.addHidden({"label":"Vehicle Code",id:"strTruckCode"}),
			plf.addHidden({"label":"Vehicle Description",id:"strTruckDescription"}),
			plf.addHidden({"label":"Trailer Code",id:"strTrailerCode"}),
			plf.addHidden({"label":"Trailer Description",id:"strTrailerDescription"}),
			plf.addHidden({"label":"Driver Code",id:"strDriverCode"}),
			plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
			plf.addDisplayOnly({"label":"Driver Mobile No",id:"strMobileNo"}),
		    plf.addHidden({"label":"Customer Code",id:"strCustomerCode"}),
			plf.addDisplayOnly({"label":"Carrier Name",id:"strCarrierName"}),
			plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
		    plf.addHidden({"label":"Vendor Code",id:"strCustomerVendorCode"}),
			plf.addHidden({"label":"Vendor Name",id:"strCustomerVendorName"}),
			plf.addHidden({"label":"Driver Compliance",id:"strDriverCompliance"}),
	        plf.addHidden({"label":"Truck Compliance",id:"strTruckCompliance"}),
		    plf.addHidden({"label":"Load Compliance",id:"strLoadCompliance"}),
			plf.addHidden({"label":"RAM score",id:"iRiskAssessmentScore"})
			
		]
		JourneyHdrFieldset2.add(JourneyPlanFormCtrl2);
		//journey plan Header Section ends
		//Plan Details Section Begins
	
		plf.columns=4
		var journeyPlanDetailsCollapse = plf.addColumnSection({title:""});		//69997

		var journeyPlanDetailsFormCtrl=										//69997

		[
			plf.addDisplayOnly({"label":"Manual Plan",id:"strManualPlan"}),	
			plf.addDisplayOnly({"label":"Route Code",id:"strRouteCode"}),
			plf.addDisplayOnly({"label":"Route Description",id:"strRouteDescription"}),
			/*plf.addDisplayOnly({"label":"Departure Date",id:"dtDepartureDate"}),
			plf.addDisplayOnly({"label":"Departure Time",id:"tmDepartureTime"}),*/
			plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
			plf.addDisplayOnly({"label":"Via",id:"strVia"}),
			plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
			plf.addCombo({"label":"Replan From",id:"strReplanFrom"}),
			plf.addDateTime({"label":"Departure Date/Time",dateid:"dtDepartureDate",timeid:"tmDepartureTime",id:"strDeptdttm"}),
            plf.addCombo({"label":"Replan Remarks",id:"strReplanRemarks"}),
			plf.addBlank(),
			plf.addBlank(),
			plf.addButton({"label":"Re-Plan Schedule",id:"cmn_btnsubmit","tooltip":"Click here to re-schedule the journey"})			
		]
		journeyPlanDetailsCollapse.add(journeyPlanDetailsFormCtrl);
		//Plan Details  Section Ends
		
		//Adding Grid to Plan Details Begins
		var planDtsGridFieldObj=						//69997

		[
			
			{columnname:"Transit Location",dataname:"INTRANSIT_LOCATION",datatype:"string",editControl:"addDisplayOnly",width:100},			
			{columnname:"Planned Arrival Date",dataname:"PLANNED_ARRIVAL_DATE",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Planned Arrival Time",dataname:"PLANNED_ARRIVAL_TIME",datatype:"string",editControl:"addDisplayOnly",width:100},			
			{columnname:"Planned Departure Date",dataname:"PLANNED_DEPARTURE_DATE",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Planned Departure Time",dataname:"PLANNED_DEPARTURE_TIME",datatype:"string",editControl:"addDisplayOnly",width:120},			
			{columnname:"Arrival Date",dataname:"ACTUAL_ARRIVAL_DATE",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Arrival Time",dataname:"ACTUAL_ARRIVAL_TIME",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Departure Date",dataname:"ACTUAL_DEPARTURE_DATE",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Departure Time",dataname:"ACTUAL_DEPARTURE_TIME",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Motel",dataname:"MOTEL",datatype:"string",editControl:"addDisplayOnly",width:80},
			{columnname:"Call JM",dataname:"CALLJM",datatype:"string",editControl:"combo",width:80,storeId:"strCallJMNo"}
			//{columnname:"Action",dataname:"ACTION_TYPE",datatype:"string",editControl:"combo",width:100,storeId:"strAction"}, 
			//{columnname:"Call Status",dataname:"CALL_STATUS",datatype:"string",editControl:"textbox",width:80}
		]
		var planDtsGridDtl=					//69997

		{
			title:"",
			id:"planDetails",
			detail:planDtsGridFieldObj,
			visibleRow:5,
			removeAddDelete:true
		}
		var planDtsGridSection = plf.addGrid(planDtsGridDtl,this)  //69997
		
		planDtsGridManualFieldObj=
		[
			{columnname:"Transit Location",dataname:"INTRANSIT_LOCATION",datatype:"string",editControl:"addDisplayOnly",width:100},			
			{columnname:"Planned Arrival Date",dataname:"PLANNED_ARRIVAL_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Planned Arrival Time",dataname:"PLANNED_ARRIVAL_TIME",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Planned Departure Date",dataname:"PLANNED_DEPARTURE_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Planned Departure Time",dataname:"PLANNED_DEPARTURE_TIME",datatype:"string",editControl:"textbox",width:120},
			{columnname:"Arrival Date",dataname:"ACTUAL_ARRIVAL_DATE",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Arrival Time",dataname:"ACTUAL_ARRIVAL_TIME",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Departure Date",dataname:"ACTUAL_DEPARTURE_DATE",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Departure Time",dataname:"ACTUAL_DEPARTURE_TIME",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Motel",dataname:"MOTEL",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Call JM",dataname:"CALLJM",datatype:"string",editControl:"combo",width:100,storeId:"strCallJMYes"}
		]
		planDtsGridManualDtl=
		{
			title:"Manual Plan Details",
			id:"manualplanDetails",			
			widthBasis:"flex",
			detail:planDtsGridManualFieldObj,
			visibleRow:7
		}
		planDtsGridManualSection = plf.addGrid(planDtsGridManualDtl,this)
			
		//Adding Grid to Plan Details Ends	
		//Status Details Section Begins
		plf.columns=4
		var statusDetailsCollapse = plf.addColumnSection({});	//69997
		var statusDetailsFormCtrl=								//69997
		[
			plf.addCombo({"label":"Night Driving","id":"strNightDriveApproval"}),
			plf.addText({"label":"Reason","id":"strReasonForApproval"}),
			plf.addText({"label":"Approver Name","id":"strApproverName"}),
			plf.addText({"label":"Comments for Driver","id":"strCommentsforDriver"})
			
		]
		statusDetailsCollapse.add(statusDetailsFormCtrl);
		//Status Details  Section Ends
		
		
		//Add Child Sections
		/*mainpage.ptrMainSection.add(journeyPlanReferenceCollapse)//Add Day Field Section to Main */
		 JourneyHdrFieldset1.add(plf.addStripLine({}));		
        mainpage.ptrMainSection.add(JourneyHdrFieldset1)//add hdr details
		 JourneyHdrFieldset2.add(plf.addStripLine({}));		
		mainpage.ptrMainSection.add(JourneyHdrFieldset2)
		
        mainpage.ptrMainSection.add(journeyPlanDetailsCollapse)//Add Day Field Section to Main 
		
		mainpage.ptrMainSection.add(planDtsGridSection) //Add Grid Section to Journey Plan Page
		mainpage.ptrMainSection.add(planDtsGridManualSection) //Add Grid Section to Journey Plan Page
		/*mainpage.ptrMainSection.add(complianceDetailsCollapse) //Add Compliance Section to Journey Plan Page*/
		//mainpage.ptrMainSection.add(violationsDtsGridSection) //Add Violation Section to Journey Plan Page
		statusDetailsCollapse.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(statusDetailsCollapse) //Add Status Section to Journey Plan Page
		//mainpage.ptrMainSection.add(refDtsGridSection) //Add Grid Section to Journey Plan Page
		//itemDtlGridContainer.add(plf.addStripLine({}));
		//mainpage.ptrMainSection.add(itemDtlGridContainer) //Add Grid Section to Journey Plan Page
		
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
				mainpage.eventHandlers = 
			[
			{       
				"controlid":"cmn_btnsubmit",
				"tasktype":"btnclick",
				"input":["strJourneyPlanNo","strTruckCode","dtDepartureDate","tmDepartureTime","strRouteCode","strWaybillNo","strReplanFrom","strManualPlan"],
			    "service":"CoreJourneyPlanService",
				"methodName":"createRePlanScheduleTS"
			},
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strJourneyPlanNo","strReplanRemarks"],
				"service":"CoreJourneyPlanService",
				"methodName":"initJourneyReplanScrTS"
			},	
			{
				"controlid":"strJourneyPlanNo",
				"tasktype":"onenter",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchJourneyRe-PlanScrTS"
			},
			{
				
				"controlid":"strJourneyPlanNo",
				"tasktype":"toolbarclick",
				"action":"Amend",				
				"input":[""],
				"service":"CoreJourneyPlanService",
				"methodName":"amendJourneyRe-PlanTS"
			},
			{
				
				"controlid":"strJourneyPlanNo",
				"tasktype":"toolbarclick",
				"action":"Re-Plan",				
				"input":["strJourneyPlanNo","dtDepartureDate","tmDepartureTime","strReplanFrom","planDetails","strReplanRemarks","strManualPlan","manualplanDetails"],
				"service":"CoreJourneyPlanService",
				"methodName":"updateJourneyRePlanTS"
			},
			{
				
				"controlid":"strJourneyPlanNo",
				"tasktype":"toolbarclick",
				"action":"Short-Close",				
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"shortcloseJourneyRe-PlanTS"
			}
			
			];
			//Event Handlers Mapping Ends
			
			
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
				/*"replan":
				{
					"dest":"journey_management.JourneyPlanReplan",
					"hdr":[
							{"src":"strJourneyPlanNo","dest":"strJourneyPlanNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},*/
				"jms_recreate":
				{
					"dest":"journey_management.JourneyPlanRecreate",
					"hdr":[
							{"src":"strJourneyPlanNo","dest":"strOldJourneyPlanNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
			
			mainpage.screenModes=
		{
			"open-ins":
			{
				"enableAll":true,
				"except":["strTruckCode","strTruckDescription","strTrailerCode","strTrailerDescription","strDriverCode","strDriverName","strCustomerVendorCode","strCustomerVendorName","strCustomerCode","strCustomerName"]
			},
			"locked":
			{
				"enableAll":false,
				"except":["violationDetails","planDetails","strJourneyPlanNo"]
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
				}
			}
			
		this.callParent(arguments);
		
	
	}
});
