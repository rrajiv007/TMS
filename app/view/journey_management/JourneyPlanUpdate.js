/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.4															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var  		  
1.0.2  Mohammed Razhith.S.A   17/07/2016  73363            Adding Waybill,inspection,jp report.  
1.0.3	  Steffie        	 20/07/2016   73945	          vehicle Release Applicable 
1.0.4      Raghavi             25/08/2016  74033                     Adding Contract No   
************************************************************************************************/
Ext.define('CueTrans.view.journey_management.JourneyPlanUpdate', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Journey Plan Actuals";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		//mainpage.toolbarActions=["Refresh","Update Actuals","Close JP","Truck Release","IVMS"]
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Update Actuals",
                "tooltip": "Click here to update the actuals."
            },
			{
                "name": "Close JP",
                "tooltip": "Click here to close the journey plan."
            },
            {
                "name": "Truck Release",
                "tooltip": "Click here to release the truck."
            },
            {
                "name": "IVMS",
                "tooltip": "Click here to launch IVMS."
            }
            ]
		mainpage.toolbarLinks=
		[
			{"name":"Journey Plan","linkid":"jms_journeyPlan","tooltip":"Click here to launch the journey plan screen."},
			//{"name":"Update","linkid":"update"},
			{"name":"Re-Plan","linkid":"jms_replan","tooltip":"Click here to launch the journey replan screen."},
			{"name":"Re-Create","linkid":"jms_recreate","tooltip":"Click here to launch the journey recreate screen."},
			//{"name":"Vehicle Trace","linkid":"veh_trace"},
			{"name":"Journey Debriefing","linkid":"jms_JourneyDebriefing","tooltip":"Click here to launch the journey debreifing screen."}
		]
		
		//Add Keyfields
		mainpage.keyFields=["journeyPlanNo"]
		
		//Journey Plan Header Section Begins
		plf.columns=4
		var JourneyHdrFieldset1 = plf.addColumnSection({title:"Journey Details"});  //69997
		var JourneyPlanFormCtrl1=													//69997
		[
		   
			plf.addHlpText({"label":"Journey Plan No",id:"strJourneyPlanNo",hlpLinkID:"jpno"},this),
			plf.addDisplayOnly({"label":"Journey Plan Date",id:"dtJourneyPlanDate"}),
			plf.addDisplayOnly({"label":"Journey Type",id:"strJourneyPlanType"}),			
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addDisplayOnly({"label":"Journey Mgr Name",id:"strJourneyManagerName"}),
			plf.addDisplayOnly({"label":"Journey Mgr Code",id:"strJourneyManagerCode"}),
			plf.addDisplayOnly({"label":"Phone Number",id:"strPhoneNo"}),
			plf.addDisplayOnly({"label":"RAM score",id:"iRiskAssessmentScore"})
			plf.addDisplayOnly({"label":"Way Bill No",id:"strWaybillNo"}),
			plf.addDisplayOnly({"label":"Load Origin",id:"strLoadOrigin"}),
            plf.addDisplayOnly({"label":"Load Destination",id:"strLoadDestination"}),			
            plf.addDisplayOnly({"label":"Load Description","id":"strLoadDesc"}),
			plf.addDisplayOnly({"label":"Loading Point","id":"strLoadAt"}),
			plf.addDisplayOnly({"label":"Unloading Point","id":"strDeliveryAt"}),
			plf.addDisplayOnly({"label":"Carrier Name",id:"strCarrierName"}),
			plf.addDisplayOnly({"label":"Inspection No",id:"strInspectionNo"}),
			plf.addDisplayOnly({"label":"Driver Compliance",id:"strDriverCompliance"}),
			plf.addDisplayOnly({"label":"Truck Compliance",id:"strTruckCompliance"}),
		    plf.addDisplayOnly({"label":"Load Compliance",id:"strLoadCompliance"}),
			
			//plf.addDisplayOnly({"label":"Journey Mode",id:"strJourneyMode"}),
			//plf.addHidden({"label":"Inspection No",id:"strInspectionNo"}),
			//plf.addDisplayOnly({"label":"Way Bill No",id:"strWaybillNo"}),
			//plf.addDisplayOnly({"label":"Vehicle Registration No",id:"strVehicleRegNo"}),
			//plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehicleCategory"}),
			plf.addHidden({"label":"Need Date",id:"dtNeedDate"}),		    
            plf.addHidden({"label":"ROS Date",id:"dtROSDate"}), 
            plf.addHidden({"label":"Pickup Point",id:"strPickupPoint"}),
			//plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"}),
			
			
		    plf.addDisplayOnly({"label":"Coordinator Code",id:"strJourneyCoordinatorCode"}),
			plf.addDisplayOnly({"label":"Coordinator Name",id:"strJourneyCoordinatorName"}),
			plf.addHidden({"label":"Vehicle Code",id:"strTruckCode"}),
			plf.addHidden({"label":"Vehicle Description",id:"strTruckDescription"}),
			plf.addHidden({"label":"Trailer Code",id:"strTrailerCode"}),
			plf.addHidden({"label":"Trailer Description",id:"strTrailerDescription"}),
			plf.addHidden({"label":"Driver Code",id:"strDriverCode"}),
			//plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
			//plf.addDisplayOnly({"label":"Driver Mobile No",id:"strMobileNo"}),
		    plf.addHidden({"label":"Customer Code",id:"strCustomerCode"}),
			//plf.addDisplayOnly({"label":"Carrier Name",id:"strCarrierName"}),
			//plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
		    plf.addHidden({"label":"Vendor Code",id:"strCustomerVendorCode"}),
			plf.addHidden({"label":"Vendor Name",id:"strCustomerVendorName"})
			//plf.addHidden({"label":"Driver Compliance",id:"strDriverCompliance"}),
	     //   plf.addHidden({"label":"Truck Compliance",id:"strTruckCompliance"}),
		 //   plf.addHidden({"label":"Load Compliance",id:"strLoadCompliance"}),
			
			
		]
		var JourneyHdrFieldset2 = plf.addColumnSection({title:"Scheduled Vehicle/Driver Details"});		//69997
		var JourneyPlanFormCtrl2=										//69997
		[
			//plf.addHlpText({"label":"Journey Plan No",id:"strJourneyPlanNo",hlpLinkID:"jpno"},this),
			//plf.addDisplayOnly({"label":"Journey Plan Date",id:"dtJourneyPlanDate"}),
			plf.addHidden({"label":"Journey Type",id:"strJourneyPlanType"}),			
			//plf.addDisplayOnly({"label":"Journey Mgr Name",id:"strJourneyManagerName"}),
			//plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			//plf.addDisplayOnly({"label":"Journey Mode",id:"strJourneyMode"}),
			
			
			plf.addDisplayOnly({"label":"Vehicle Registration No",id:"strVehicleRegNo"}),
			plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehicleCategory"}),
			plf.addHidden({"label":"Need Date",id:"dtNeedDate"}),		    
            plf.addHidden({"label":"ROS Date",id:"dtROSDate"}), 
            plf.addHidden({"label":"Pickup Point",id:"strPickupPoint"}),
			//plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"}),--Bug 65148
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
			plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
			plf.addDisplayOnly({"label":"Contract No",id:"strContractNo"}),

		    plf.addHidden({"label":"Vendor Code",id:"strCustomerVendorCode"}),
			plf.addHidden({"label":"Vendor Name",id:"strCustomerVendorName"}),
			plf.addHidden({"label":"Driver Compliance",id:"strDriverCompliance"}),
	        plf.addHidden({"label":"Truck Compliance",id:"strTruckCompliance"}),
		    plf.addHidden({"label":"Load Compliance",id:"strLoadCompliance"}),
			plf.addHidden({"label":"RAM score",id:"iRiskAssessmentScore"})
			
		]
		JourneyHdrFieldset1.add(JourneyPlanFormCtrl1);	
	    JourneyHdrFieldset2.add(JourneyPlanFormCtrl2);
      // 74673	
		var JPInspDtls = plf.addColumnSection({title:"Reporting Vehicle/Driver Details"}); // 74673		
		var JPInspDtlsCtrl=										
		[	
			plf.addDisplayOnly({"label":"Reported Vehicle","id":"strRepTruckCode"}),
			plf.addDisplayOnly({"label":"Vehicle Regn No","id":"strRepVehicleRegNo"}),
			plf.addDisplayOnly({"label":"Reporting Driver",id:"strRepDriverCode"}),	
			plf.addDisplayOnly({"label":"Reporting Driver Name",id:"strRepDriverName"}),	
			plf.addDisplayOnly({"label":"Reporting Driver No",id:"strRepMobileNo"}),		
			plf.addDisplayOnly({"label":"Reporting Licence No",id:"strRepLicenceNo"})
		   			
		]
		JPInspDtls.add(JPInspDtlsCtrl);		
		
		plf.columns=4
		var journeyPlanDetailsCollapse = plf.addColumnSection({title:"Route Details"});	//69997
		var journeyPlanDetailsFormCtrl=										//69997
		[
			plf.addDisplayOnly({"label":"Route Code",id:"strRouteCode"}),
			plf.addDisplayOnly({"label":"Route Description",id:"strRouteDescription"}),
			plf.addDisplayOnly({"label":"Departure Date",id:"dtDepartureDate"}),
			plf.addDisplayOnly({"label":"Departure Time",id:"tmDepartureTime"}),
			plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
			plf.addDisplayOnly({"label":"Via",id:"strVia"}),
			plf.addDisplayOnly({"label":"Destination",id:"strDestination"})
		]
		journeyPlanDetailsCollapse.add(journeyPlanDetailsFormCtrl);
		//Plan Details  Section Ends
		
		//Adding Grid to Plan Details Begins
		var planDtsGridFieldObj=									//69997
		[
			
			{columnname:"Transit Location",dataname:"INTRANSIT_LOCATION",datatype:"string",editControl:"addDisplayOnly",width:100},
			
			{columnname:"Planned Arrival Date",dataname:"PLANNED_ARRIVAL_DATE",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Planned Arrival Time",dataname:"PLANNED_ARRIVAL_TIME",datatype:"string",editControl:"addDisplayOnly",width:100},
			
			{columnname:"Planned Departure Date",dataname:"PLANNED_DEPARTURE_DATE",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Planned Departure Time",dataname:"PLANNED_DEPARTURE_TIME",datatype:"string",editControl:"addDisplayOnly",width:120},
			
			
			{columnname:"Arrival Date",dataname:"ACTUAL_ARRIVAL_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Arrival Time",dataname:"ACTUAL_ARRIVAL_TIME",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Departure Date",dataname:"ACTUAL_DEPARTURE_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Departure Time",dataname:"ACTUAL_DEPARTURE_TIME",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Motel",dataname:"MOTEL",datatype:"string",editControl:"textbox",width:80},
            {columnname:"Action",dataname:"ACTION_TYPE",datatype:"string",editControl:"combo",width:100,storeId:"strAction"}, 
			{columnname:"Delay Reason",dataname:"DELAY_REASON",datatype:"string",editControl:"combo",width:100,storeId:"strDelayReason"},  			
            {columnname:"Call Status",dataname:"CALL_STATUS",datatype:"string",editControl:"textbox",width:80}
		]
		var planDtsGridDtl=					//69997
		{
			title:"Plan/Actual Details",
			id:"planDetails",
			detail:planDtsGridFieldObj,
			visibleRow:7,
			removeAddDelete:true
		}
		var planDtsGridSection = plf.addGrid(planDtsGridDtl,this) //69997
		journeyPlanDetailsCollapse.add(planDtsGridSection);	
		//Adding Grid to Plan Details Ends	
		//Adding Violations to Plan Details Begins
		var violationsDtsGridFieldObj=							//69997
		[
		    //{columnname:"Transit Location",dataname:"TRANSIT_LOCATION",datatype:"string",editControl:"addDisplayOnly",	width:100},
		    //{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",editControl:"addDisplayOnly",	width:100},
			{columnname:"Violation Code",dataname:"VIOLATION_CODE",datatype:"string",editControl:"textbox",helpid:'ViolationCode',	width:100,"onenter":"VIOLATION_CODE_ONENTER"},
			{columnname:"Violation Type",dataname:"VIOLATION_TYPE",datatype:"string",editControl:"addDisplayOnly",	width:100},
			{columnname:"Description",dataname:"VIOLATION_DESC",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Existing Violations",dataname:"EXISTING_VIOLATION",datatype:"string",editControl:"addDisplayOnly",width:120},
			{columnname:"Current Violation",dataname:"CURRENT_VIOLATION",datatype:"string",inputFormat:"integer",editControl:"textbox",width:120,colAlign:'right'},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:150}
			//{columnname:"Attach Document",dataname:"ATTACH_DOCUMENT_VIO",datatype:"string",width:150,editControl:"fileupload",fileGroup:"Journey_plan_update\\Violations",width:175}
			
		]
		var violationsDtsGridDtl=						//69997
		{
			title:"Violation/Reference",
			id:"violationDetails", 
			detail:violationsDtsGridFieldObj,
			columnWidth:1
			
		}
		var violationsDtsGridSection = plf.addGrid(violationsDtsGridDtl,this) //69997
		//Adding Violations to Plan Details Ends
		//Status Details Section Begins
		
		
		plf.columns=4
		var statusDetailsCollapse = plf.addColumnSection({title:"Journey Closure & Vehicle Release"});	//69997
		var statusDetailsFormCtrl=																		//69997
		[
			//plf.addDisplayOnly({"label":"Night Drive Approval",id:"strNightDriveApproval"}),
			//plf.addButton({"label":"Browse",id:"browseBtn"}),
			//plf.addDisplayOnly({"label":"Reason",id:"strApprovalReason"}),
			//plf.addDisplayOnly({"label":"Approver Name",id:"strApproverName"}),
			
			
			plf.addDateTime({"label":"JP Close Date & Time",dateid:"dtJpCloseDateAndTime",timeid:"strJpCloseTime"}),
			plf.addDateTime({"label":"Release Date & Time",dateid:"dtReleaseDateAndTime",timeid:"strReleaseTime"}),
			//plf.addText({"label":"Destination",id:"strAfterReleaseDest"}),
			//plf.addCombo({"label":"Release Status",id:"strReleaseStatus"}),
			//plf.addText({"label":"Destination",id:"strAfterReleaseDest"}),
			plf.addText({"label":"Release Remarks",id:"strReleaseRemarks"}),
			plf.addDisplayOnly({"label":"Comments for Driver",id:"strCommentsForDriver"})
		]
		statusDetailsCollapse.add(statusDetailsFormCtrl);
		//Status Details  Section Ends
		
		//Adding Grid to Reference Details Collapsed Begins
		/*refDtsGridFieldObj=
		[
			//{columnname:"ReferenceType",dataname:"select",datatype:"string",editControl:"checkbox",width:150},
			{columnname:"Reference Type",dataname:"REFERENCE_TYPE",datatype:"string",editControl:"addDisplayOnly",width:120,storeId:"strReferenceType"},
			{columnname:"Reference No",dataname:"REFERENCE_NO",datatype:"string",editControl:"addDisplayOnly",	width:120},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"addDisplayOnly",width:330}
			
		]
		refDtsGridDtl=
		{
			title:"Reference Documents",
			id:"referenceDetails",
			detail:refDtsGridFieldObj,
			columnWidth:.5,
			readOnly:true,
			removeAddDelete:true
		}
		refDtsGridSection = plf.addGrid(refDtsGridDtl,this)*/
		//Adding Grid to Reference Details Collapsed ends
		
		//Adding Grid to item Details Collapsed ends
		var itemDtsGridFieldObj=						//69997
		[
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",editControl:"addDisplayOnly",	width:100},
			{columnname:"Item Description",dataname:"ITEM_DESCRIPTION",datatype:"string",editControl:"addDisplayOnly",width:430},
			{columnname:"Qty",dataname:"ITEM_QUANTITY",datatype:"string",editControl:"addDisplayOnly",width:150}
			//{columnname:"Standard UOM",dataname:"UOM",datatype:"string",editControl:"textbox",width:300}
		]
		var itemDtsGridDtl=									//69997
		{
			title:"Item Details",
			id:"itemDetails",
			detail:itemDtsGridFieldObj,
			columnWidth:.6,
			readOnly:true,
			removeAddDelete:true
		}
		var itemDtsGridSection = plf.addGrid(itemDtsGridDtl,this)	//69997
		//Adding Grid to item Details Collapsed ends
		var violationAndReferDocColumn = plf.addColumnSection({});	//69997
		//violationAndReferDocColumn = plf.addCollapseSection({title:"New Violations Registered",collapsed:false});
		violationAndReferDocColumn.add(violationsDtsGridSection)
		//violationAndReferDocColumn.add(plf.addSplitter)
		//violationAndReferDocColumn.add(refDtsGridSection)
		
		//itemDtlGridContainer = plf.addColumnSection({});
		var itemDtlGridContainer = plf.addCollapseSection({title:"Item Details",collapsed:true});		//69997
		itemDtlGridContainer.add(plf.addBlankBlock({"columnWidth":".2"}))
		itemDtlGridContainer.add(itemDtsGridSection)
		
		//Add Child Sections
		/*mainpage.ptrMainSection.add(journeyPlanReferenceCollapse)//Add Day Field Section to Main */
		JourneyHdrFieldset1.add(plf.addStripLine({}));		//69997
		mainpage.ptrMainSection.add(JourneyHdrFieldset1)//add hdr details
		JourneyHdrFieldset2.add(plf.addStripLine({}));			//69997
		mainpage.ptrMainSection.add(JourneyHdrFieldset2)//add hdr details
        //mainpage.ptrMainSection.add(JourneyHdrFieldset2)//add hdr details
        //mainpage.ptrMainSection.add(JourneyHdrFieldset3)//add hdr details
        //mainpage.ptrMainSection.add(JourneyHdrFieldset4)//add hdr details	
        //mainpage.ptrMainSection.add(JourneyHdrFieldset5)//add hdr details
        //mainpage.ptrMainSection.add(JourneyHdrFieldset6)//add hdr details
		
		//journeyPlanDetailsCollapse.add(plf.addStripLine({}));	
		mainpage.ptrMainSection.add(JPInspDtls)
		mainpage.ptrMainSection.add(journeyPlanDetailsCollapse)//Add Day Field Section to Main 
		
		mainpage.ptrMainSection.add(planDtsGridSection) //Add Grid Section to Journey Plan Page
		/*mainpage.ptrMainSection.add(complianceDetailsCollapse) //Add Compliance Section to Journey Plan Page*/
		//mainpage.ptrMainSection.add(violationsDtsGridSection) //Add Violation Section to Journey Plan Page
		statusDetailsCollapse.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(statusDetailsCollapse) //Add Status Section to Journey Plan Page
		//mainpage.ptrMainSection.add(refDtsGridSection) //Add Grid Section to Journey Plan Page
		//itemDtlGridContainer.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(violationAndReferDocColumn)
		//mainpage.ptrMainSection.add(itemDtlGridContainer) //Add Grid Section to Journey Plan Page
		
		violationAndReferDocColumn.add(plf.addStripLine({}));
	    	//mainpage.ptrMainSection.add(violationAndReferDocColumn)
		//History Data Section
		
		var freeTextEditor = plf.addColumnSection({title:"Notes"});
		
		freeTextEditor.add({
                 xtype: "container",
                 layout: "column",
                 //cls: plf.getContainerCls(),
                 items: 
				 [						
						 Ext.create('Ext.form.field.TextArea', {
							itemId:"strJpHistory",
							label:"Body",
							height: 250,
							width:plf.screenWidth-120
						})
                 ]
             })
		mainpage.ptrMainSection.add(freeTextEditor)
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
				mainpage.eventHandlers = 
			[
			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strJourneyPlanNo","strDriverCode"],
				"service":"CoreJourneyPlanService",
				"methodName":"initJourneyPlanUpdateScrTS"
			},	
			/*{
				"controlid":"strTruckCode",
				"tasktype":"onenter",
				"input":["strTruckCode"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchTruckDetailsTS"
			},*/
			{
				"controlid":"strJourneyPlanNo",
				"tasktype":"onenter",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchJourneyPlanScrTS"
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Update Actuals",
				"input":["strJpHistory","strWaybillNo","dtJpCloseDateAndTime","dtReleaseDateAndTime","strReleaseStatus","strAfterReleaseDest","strReleaseRemarks","strJourneyPlanNo","planDetails", 
				"strViolationCode","strDriverCode","strExistingViolation","strViolationRemarks","strCallStatus","violationDetails","strJpCloseTime","strReleaseTime","strVia"],
				"service":"CoreJourneyPlanService",
				"methodName":"updateJourneyPlanTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Close JP",
					"input":["strJourneyPlanNo","dtJpCloseDateAndTime","strJpCloseTime","strReleaseTime","strVia","strWaybillNo"],
					"service":"CoreJourneyPlanService",
					"methodName":"closeJourneyPlanTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Truck Release",
					"input":["strJourneyPlanNo","dtReleaseDateAndTime","strTruckCode","strTrailerCode","strDriverCode","dtJpCloseDateAndTime","strReleaseStatus",
					"strAfterReleaseDest","strReleaseRemarks","strJpCloseTime","strReleaseTime","strVia","strWaybillNo"],
					"service":"CoreJourneyPlanService",
					"methodName":"releaseJourneyPlanTS"
			},
			
			{
					"grideventid":"VIOLATION_CODE_ONENTER",
					"tasktype":"gridonenter",
					"input":["VIOLATION_CODE"],
					"service":"CoreJourneyPlanService",
					"methodName":"fetchViolationTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"IVMS",
					"input":["strJourneyPlanNo"],
					"service":"callIVMSFn",
					"methodName":"customJSCall"
			}
			,
			{
				
					"tasktype":"proto",
					"filename":"jm_master/JourneyPlan.json"
			}
			
			];
			
			
			//screen links
			
				mainpage.screenLinks=
		{
			"jms_journeyPlan":
				{
					"dest":"journey_management.JourneyPlan",
					"hdr":[
							{"src":"strJourneyPlanNo","dest":"strJourneyPlanNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				/*"update":
				{
					"dest":"journey_management.JourneyPlanUpdate",
					"hdr":[
							{"src":"strJourneyPlanNo","dest":"strJourneyPlanNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},*/
				"jms_replan":
				{
					"dest":"journey_management.JourneyPlanReplan",
					"hdr":[
							{"src":"strJourneyPlanNo","dest":"strJourneyPlanNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}/*,
				"jms_recreate":
				{
					"dest":"journey_management.JourneyPlanRecreate",
					"hdr":[
							{"src":"strJourneyPlanNo","dest":"strOldJourneyPlanNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}*/,
				"veh_trace":
				{
					"dest":"journey_management.JourneyPlanRecreate",
					"hdr":[
							{"src":"strJourneyPlanNo","dest":"strOldJourneyPlanNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"jms_JourneyDebriefing":
				{
					"dest":"journey_management.JourneyDebriefing",
					"hdr":[
							{"src":"strJourneyPlanNo","dest":"strJourneyPlanNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
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
				},
			"ViolationCode":
				{
					"hlpType":"grid",
					"gridID":"violationDetails",
					"hlpScreen":"jm_master.ViolationHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"VIOLATION_CODE","child":"VIOLATION_CODE"},
							{"parent":"VIOLATION_TYPE","child":"VIOLATION_TYPE"},
							{"parent":"VIOLATION_DESC","child":"VIOLATION_DESC"}
							]
				}
			}
			//for screen mode
			
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
		
		this.ivmsWindow = Ext.create('Ext.window.Window', {
			height : (plf.screenHeight * .78) - plf.helpMargin,
			width : (plf.screenWidth * .82) - plf.helpMargin,
			title : 'IVMS-Map',
			closeAction : 'hide',
			listeners : {
				'show' : function(wnd, eOpts) {	
					wnd.setLoading(true);
					if(wnd.items.length == 0) {
						var gisLayer = plf.addGIS({
							toolBarGroups : ['mapLayers', 'basic'],
							actions : [{
								action : 'LoadRoute',
								params : {									
									jpNo : wnd._gis.parent.initialValues[0].value
								},
								mapWnd : wnd
							}],							
							mapId : 'routeMap'
						});
						wnd._gisLayer = gisLayer;
						wnd.add(gisLayer);
					} else {						
						wnd._gisLayer.refreshActions({
							jpNo : wnd._gis.parent.initialValues[0].value,
							mapFrame : wnd
						});
					}
				}
			}
		});
		this.ivmsWindow._gis =  {
			parent : mainpage
		};
		this.callParent(arguments);
		
	
	},
	callIVMSFn:function()
	{
		this.ivmsWindow.show();
		/*
			var tmpHTMLStr =ivmsPath + Math.random()+"&vh="+this.queryById("strTruckCode").getValue();
			if (newIVMSPtr != undefined && typeof newIVMSPtr.close != undefined) 
				newIVMSPtr.close();
			newIVMSPtr = window.open(tmpHTMLStr, 'cuetransivms');
		*/
	}

});
