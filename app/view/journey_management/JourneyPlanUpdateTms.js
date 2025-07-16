/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.6															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var  		  
1.0.2  Mohammed Razhith.S.A   17/07/2016  73363            Adding Waybill,inspection,jp report.  
1.0.3	  Steffie        	 20/07/2016   73945	          vehicle Release Applicable      
1.0.4     Divya D            27/7/2016     73563                                            
1.0.5     Vidhya P           16/09/2016    74329
1.0.6     Raghavi            25/08/2016    74033 
1.0.7     Shekar             16/11/2016    74673
1.0.8     Raj               20/12/2016     75082                     removed <BR> from column name   
************************************************************************************************/
Ext.define('CueTrans.view.journey_management.JourneyPlanUpdateTms', 
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
			//73363
			 {
                "name": "Print Waybill",
                "tooltip": "Click here to print the waybill report."
            },
			 {
                "name": "Print Inspection",
                "tooltip": "Click here to print the inspection report."
            },
			{
                "name": "Print JP",
                "tooltip": "Click here to print the journey plan report."
            },
			{
                "name": "Print Release Letter",
                "tooltip": "Click here to print the Release Letter."
            },
			{
                "name": "Print Diversion Letter",
                "tooltip": "Click here to print diversion letter."
            },
            {
                "name": "IVMS",
                "tooltip": "Click here to launch IVMS."
            },
			 {
                "name": "Print Update Actuals",
                "tooltip": "Click here to Print the Update Actuals Report."
            }
	     
            ]
		mainpage.toolbarLinks=
		[
			
			{"name":"Amendment History","linkid":"Amend_History","tooltip":"Click here to launch the Amendment History screen."},
			{"name":"Violation History","linkid":"Violation_History","tooltip":"Click here to launch violation history."},
			{"name":"Amend Journey Plan ","linkid":"Amend_JP","tooltip":"Click here to launch the Amend Journey Plan screen."},
			{"name":"Journey Plan","linkid":"jms_journeyPlan","tooltip":"Click here to launch the journey plan screen."},
			//{"name":"Update","linkid":"update"},
			{"name":"Re-Plan","linkid":"jms_replan","tooltip":"Click here to launch the journey replan screen."}
			//{"name":"Proof Of Delivery","linkid":"ProofOfDelivery_Journey","tooltip":"Click here for Proof Of Delivery."}
			 
			/*{"name":"Re-Create","linkid":"jms_recreate","tooltip":"Click here to launch the journey recreate screen."},*/
			//{"name":"Vehicle Trace","linkid":"veh_trace"},
			//{"name":"Journey Debriefing","linkid":"jms_JourneyDebriefing","tooltip":"Click here to launch the journey debreifing screen."}
		]
		
		//Add Keyfields
		mainpage.keyFields=["journeyPlanNo"]
		
		//Journey Plan Header Section Begins
		plf.columns=4
		var JourneyHdrFieldset1 = plf.addColumnSection({title:"Journey Details"});			//69997
		var JourneyPlanFormCtrl1=															//69997	
		[
	
			plf.addHlpText({"label":"Journey Plan No",id:"strJourneyPlanNo",hlpLinkID:"jpno"},this),
			plf.addDisplayOnly({"label":"Journey Plan Date",id:"dtJourneyPlanDate"}),
			plf.addDisplayOnly({"label":"Journey Type",id:"strJourneyPlanType"}),			
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addDisplayOnly({"label":"Journey Mgr Name",id:"strJourneyManagerName"}),
			//plf.addDisplayOnly({"label":"Journey Mode",id:"strJourneyMode"}),
			//plf.addHidden({"label":"Inspection No",id:"strInspectionNo"}),
			//plf.addDisplayOnly({"label":"Way Bill No",id:"strWaybillNo"}),
			//plf.addDisplayOnly({"label":"Vehicle Registration No",id:"strVehicleRegNo"}),
			//plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehicleCategory"}),
			//plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"}),
			plf.addDisplayOnly({"label":"Journey Mgr Code",id:"strJourneyManagerCode"}),
			plf.addDisplayOnly({"label":"Phone Number",id:"strPhoneNo"}),    
			plf.addDisplayOnly({"label":"RAM score",id:"iRiskAssessmentScore"}),
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
			plf.addDisplayOnly({"label":"Trip No",id:"strTripNo"}),
		    plf.addDisplayOnly({"label":"Coordinator Code",id:"strJourneyCoordinatorCode"}),
			plf.addDisplayOnly({"label":"Coordinator Name",id:"strJourneyCoordinatorName"}),
			plf.addHidden({"label":"Vehicle Description",id:"strTruckDescription"}),
			plf.addHidden({"label":"Trailer Code",id:"strTrailerCode"}),
			plf.addHidden({"label":"Trailer Description",id:"strTrailerDescription"}),
			plf.addHidden({"label":"Need Date",id:"dtNeedDate"}),		    
            plf.addHidden({"label":"ROS Date",id:"dtROSDate"}), 
            plf.addHidden({"label":"Pickup Point",id:"strPickupPoint"}),
			//plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
			//plf.addDisplayOnly({"label":"Driver Mobile No",id:"strMobileNo"}),
		    plf.addHidden({"label":"Customer Code",id:"strCustomerCode"}), 
			//plf.addDisplayOnly({"label":"Carrier Name",id:"strCarrierName"}),
			//plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
		    plf.addHidden({"label":"Vendor Code",id:"strCustomerVendorCode"}),
			plf.addHidden({"label":"Vendor Name",id:"strCustomerVendorName"}),
			
	        
			
		]
		//var JourneyHdrFieldset2 = plf.addColumnSection({title:"Scheduled Vehicle/Driver Details"});			//69997
		var JourneyHdrFieldset2 = plf.addColumnSection({title:"Scheduled Asset Details"});			//69997
		var JourneyPlanFormCtrl2=											//69997					
		[   
		
		    plf.addDisplayOnly({"label":"Vehicle Code",id:"strTruckCode"}),
			plf.addDisplayOnly({"label":"Vehicle Regn No",id:"strVehicleRegNo"}),
			plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehicleCategory"}),
			plf.addDisplayOnly({"label":"Contract No",id:"strContractNo"}),//74033
			plf.addDisplayOnly({"label":"Driver Code",id:"strDriverCode"}),
			plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
			plf.addDisplayOnly({"label":"Driver Contact No",id:"strMobileNo"}),
			plf.addDisplayOnly({"label":"Driver License No",id:"strLicenseNo"}),
			plf.addDisplayOnly({"label":"Driver Age",id:"strDriverAge"}),
			plf.addDisplayOnly({"label":"Trailer Code",id:"strTrailerCodeSC"}),
			//plf.addHlpText({"label":"Journey Plan No",id:"strJourneyPlanNo",hlpLinkID:"jpno"},this),
			//plf.addDisplayOnly({"label":"Journey Plan Date",id:"dtJourneyPlanDate"}),
			plf.addHidden({"label":"Journey Type",id:"strJourneyPlanType"}),			
			//plf.addDisplayOnly({"label":"Journey Mgr Name",id:"strJourneyManagerName"}),
			//plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			//plf.addDisplayOnly({"label":"Journey Mode",id:"strJourneyMode"}),
			plf.addHidden({"label":"Inspection No",id:"strInspectionNo"}),
			plf.addHidden({"label":"Need Date",id:"dtNeedDate"}),		    
            plf.addHidden({"label":"ROS Date",id:"dtROSDate"}), 
            plf.addHidden({"label":"Pickup Point",id:"strPickupPoint"}),
			//plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"}), --Bug 65148
			plf.addHidden({"label":"Journey Mgr Code",id:"strJourneyManagerCode"}),
			plf.addHidden({"label":"Coordinator Code",id:"strJourneyCoordinatorCode"}),
			plf.addHidden({"label":"Coordinator Name",id:"strJourneyCoordinatorName"}),
			plf.addHidden({"label":"Vehicle Description",id:"strTruckDescription"}),
			plf.addHidden({"label":"Trailer Code",id:"strTrailerCode"}),
			plf.addHidden({"label":"Trailer Description",id:"strTrailerDescription"}),
			plf.addHidden({"label":"Customer Code",id:"strCustomerCode"}),
			//plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
		    plf.addHidden({"label":"Vendor Code",id:"strCustomerVendorCode"}),
			plf.addHidden({"label":"Vendor Name",id:"strCustomerVendorName"}),
			plf.addHidden({"label":"Driver Compliance",id:"strDriverCompliance"}),
	        plf.addHidden({"label":"Truck Compliance",id:"strTruckCompliance"}),
		    plf.addHidden({"label":"Load Compliance",id:"strLoadCompliance"}),
			plf.addHidden({"label":"Load No",id:"strLoadNo"}),//73363
			plf.addHidden({"label":"RAM score",id:"iRiskAssessmentScore"})
			
		]
		JourneyHdrFieldset1.add(JourneyPlanFormCtrl1);
	    JourneyHdrFieldset2.add(JourneyPlanFormCtrl2);
		plf.columns=4
		
		// 74673	
		//var JPInspDtls = plf.addColumnSection({title:"Reporting Vehicle/Driver Details"}); // 74673	
        var JPInspDtls = plf.addColumnSection({title:"Reporting Asset Details"})		
		var JPInspDtlsCtrl=										
		[	
			plf.addDisplayOnly({"label":"Vehicle Code","id":"strRepTruckCode"}),
			plf.addDisplayOnly({"label":"Vehicle Regn No","id":"strRepVehicleRegNo"}),
			plf.addDisplayOnly({"label":"Vehicle Category","id":"strVCat"}),//75145
			plf.addDisplayOnly({"label":"Driver Code",id:"strRepDriverCode"}),	
			plf.addDisplayOnly({"label":"Driver Name",id:"strRepDriverName"}),	
			plf.addDisplayOnly({"label":"Driver Contact No",id:"strRepMobileNo"}),		
			plf.addDisplayOnly({"label":"Driver License No",id:"strRepLicenceNo"}),
			plf.addDisplayOnly({"label":"Driver Age",id:"strRepoDriverAge"}),
			plf.addDisplayOnly({"label":"Driver Carrier",id:"strCarrierNameNew"}),
			//plf.addHlpText({"label":"Trailer Code","id":"strTrailerCode1",hlpLinkID:"reportingTrailerCode"},this)//75145
			plf.addDisplayOnly({"label":"Trailer Code",id:"strTrailerCode1"})
		   			
		]
		JPInspDtls.add(JPInspDtlsCtrl);
		
		
		var journeyPlanDetailsCollapse = plf.addColumnSection({title:"Route Details"});			//69997
		var journeyPlanDetailsFormCtrl=												//69997	
		[
			plf.addDisplayOnly({"label":"Route Code",id:"strRouteCode"}),
			plf.addDisplayOnly({"label":"Route Description",id:"strRouteDescription"}),
			plf.addDisplayOnly({"label":"Departure Date",id:"dtDepartureDate"}),
			plf.addDisplayOnly({"label":"Departure Time",id:"tmDepartureTime"}),
			plf.addDisplayOnly({"label":"JMC Code",id:"strJMCCode"}),
			plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
			plf.addDisplayOnly({"label":"Via",id:"strVia"}),
			plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
			plf.addHidden({"label":"OUID",id:"strDateType"})
		]
		journeyPlanDetailsCollapse.add(journeyPlanDetailsFormCtrl);
		//Plan Details  Section Ends
		
		//Adding Grid to Plan Details Begins
		
		var tmpPlannedJpDtl=									//69997
		[
			
			{columnname:"Transit Location",dataname:"INTRANSIT_LOCATION",datatype:"string",editControl:"addDisplayOnly",width:100},
			{"group":"Plan","dtl":[
			{columnname:"Arrival Date",dataname:"PLANNED_ARRIVAL_DATE",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Arrival Time",dataname:"PLANNED_ARRIVAL_TIME",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Departure Date",dataname:"PLANNED_DEPARTURE_DATE",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Departure Time",dataname:"PLANNED_DEPARTURE_TIME",datatype:"string",editControl:"addDisplayOnly",width:120}
			]},						           	
			{columnname:"Motel",dataname:"MOTEL",datatype:"string",editControl:"textbox",width:100},
            {columnname:"Call JM",dataname:"CALLJM",datatype:"string",editControl:"addDisplayOnly",width:80}
		]
		var tmpPlannedJpGridDtl=									
		{
			title:"Plan Details",
			id:"tmpPlanDetails",			
			widthBasis:"flex",
			detail:tmpPlannedJpDtl,
			visibleRow:7,
		    removeAddDelete:true,
			removePaging:true,
                    removeExport:true
		}
		var tmpPlannedJpGridSection = plf.addGrid(tmpPlannedJpGridDtl,this)				//69997
		journeyPlanDetailsCollapse.add(tmpPlannedJpGridSection);
		var parentForm =this;
		var btnSearch=[
					plf.addButton({id:"btnTmp",label:"New Row",tooltip:"Click here to add new row.",
						"handler": function() 
						{
							 var gridStore = Ext.data.StoreManager.lookup('planDetails_store');
							 var grid = parentForm.queryById("planDetails");
							 var selected = grid.getSelectionModel().getSelection();
							 
							 var newRecord = Ext.create('planDetails_model', {
										 "recStatus": "I"
									 })
							var recCount = 0;
							var flag=false;
							var selectcnt;
							Ext.each(gridStore.getRange(), function(record) 
							{
								recCount = recCount + 1;
								 if (record.getData().select) 
									 {
										if (!flag)
											{
												flag=true;	
												selectcnt=recCount;
											}											
									 }
							
							})
							console.log(selectcnt,"selectcnt");
							gridStore.insert(selectcnt,newRecord);
							grid.getView().refresh();								 
						}})
					];	
		
		var planDtsGridFieldObj=		//69997
		[
			
			{columnname:"Transit Location",dataname:"INTRANSIT_LOCATION",datatype:"string",editControl:"combo",width:100,storeId:"strTransitLocation"},			
			{columnname:"Planned Arrival Date",dataname:"PLANNED_ARRIVAL_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Planned Arrival Time",dataname:"PLANNED_ARRIVAL_TIME",datatype:"string",editControl:"RegexTime",width:100},
			{columnname:"Planned Departure Date",dataname:"PLANNED_DEPARTURE_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Planned Departure Time",dataname:"PLANNED_DEPARTURE_TIME",datatype:"string",editControl:"RegexTime",width:120},
			{columnname:"Arrival Date",dataname:"ACTUAL_ARRIVAL_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Arrival Time",dataname:"ACTUAL_ARRIVAL_TIME",datatype:"string",editControl:"RegexTime",width:100},
			{columnname:"Departure Date",dataname:"ACTUAL_DEPARTURE_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Departure Time",dataname:"ACTUAL_DEPARTURE_TIME",datatype:"string",editControl:"RegexTime",width:100},
			{columnname:"Motel",dataname:"MOTEL",datatype:"string",editControl:"addDisplayOnly",width:80},
            {columnname:"Delay Reason",dataname:"DELAY_REASON",datatype:"string",editControl:"combo",width:100,storeId:"strDelayReason"},
            {columnname:"Action",dataname:"ACTION_TYPE",datatype:"string",editControl:"combo",width:100,storeId:"strAction"}, 
			{columnname:"Call JM",dataname:"CALLJM",datatype:"string",editControl:"addDisplayOnly",width:80},
			{columnname:"Call Status",dataname:"CALL_STATUS",datatype:"string",editControl:"textbox",width:80}
		]
		var planDtsGridDtl=								//69997
		{
			title:"Plan/Actual Details",
			id:"planDetails",
			detail:planDtsGridFieldObj,
			visibleRow:7,
			removePaging:true,
                     removeExport:true,
			tool:btnSearch
		}
		var planDtsGridSection = plf.addGrid(planDtsGridDtl,this)		//69997
		journeyPlanDetailsCollapse.add(planDtsGridSection);
		//Adding Grid to Plan Details Ends	
		
		
		
		//Adding Violations to Plan Details Begins
		var vioDriver=[
						plf.addCombo({"label":"Driver",id:"strVioDriver",
						"listeners":{
							change: function (field, newValue, oldValue) 
							{	
								mainpage.queryById("methodName").setValue("onchangeVioDriUPDActTs");
								process_ebpack_service(mainpage,["strJourneyPlanNo","strVioDriver"],"CoreJourneyPlanService");			
			 
							}
						}
						})				
					  ];	
		var violationsDtsGridFieldObj=							//69997
		[
		    /*{columnname:"Transit Location",dataname:"TRANSIT_LOCATION",datatype:"string",editControl:"addDisplayOnly",	width:100},
		    {columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",editControl:"addDisplayOnly",	width:100},*/
			{columnname:"Violation Code",dataname:"VIOLATION_CODE",datatype:"string",editControl:"textbox",helpid:'ViolationCode',	width:100,"onenter":"VIOLATION_CODE_ONENTER"},
			{columnname:"Violation Type",dataname:"VIOLATION_TYPE",datatype:"string",editControl:"addDisplayOnly",	width:100},
			{columnname:"Description",dataname:"VIOLATION_DESC",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Existing Violations",dataname:"EXISTING_VIOLATION",datatype:"string",editControl:"addDisplayOnly",width:120},
			{columnname:"Current Violation",dataname:"CURRENT_VIOLATION",datatype:"string",editControl:"textbox",width:120,colAlign:'right'},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:150}
			//{columnname:"Attach Document",dataname:"ATTACH_DOCUMENT_VIO",datatype:"string",width:150,editControl:"fileupload",fileGroup:"Journey_plan_update\\Violations",width:175}
			
		]
		var violationsDtsGridDtl=				//69997
		{
			title:"Violation/Reference",
			id:"violationDetails", 
			detail:violationsDtsGridFieldObj,
			tool:vioDriver,
			columnWidth:1,
			visibleRow:10
			
		}
		var violationsDtsGridSection = plf.addGrid(violationsDtsGridDtl,this)	//69997

		
		//Adding Violations to Plan Details Ends
		//Status Details Section Begins
		
		var ivmsviolationsDtsGridFieldObj=							//69997
		[
			{columnname:"Event Code",dataname:"EVENT_CODE",datatype:"string",editControl:"addDisplayOnly",width:200},
			//{columnname:"Latitude",dataname:"LATITUDE",datatype:"string",editControl:"addDisplayOnly",	width:150},
			//{columnname:"Longitude",dataname:"LONGITUDE",datatype:"string",editControl:"addDisplayOnly",width:150},
			{columnname:"Start Date",dataname:"START_DATE",datatype:"string",editControl:"addDisplayOnly",width:80},
			{columnname:"Start Time",dataname:"START_TIME",datatype:"string",editControl:"addDisplayOnly",width:80},
			{columnname:"End Date",dataname:"END_DATE",datatype:"string",editControl:"addDisplayOnly",width:80},
			{columnname:"End Time",dataname:"END_TIME",datatype:"string",editControl:"addDisplayOnly",width:80}
		]
		var ivmsviolationsDtsGridDtl=				//69997
		{
			title:"IVMS Violation",
			id:"ivmsviolationDetails", 
			detail:ivmsviolationsDtsGridFieldObj,
			columnWidth:1,
			readonly:true,
			removeAddDelete:true,	
			visibleRow:5
		}
		var ivmsviolationsDtsGridSection = plf.addGrid(ivmsviolationsDtsGridDtl,this)
		
			var tPMSDtsGridFieldObj=						
		[
			{columnname:"Event Description",dataname:"TPMS_EVENT_CODE",datatype:"string",editControl:"addDisplayOnly",width:200},
			{columnname:"Start Date",dataname:"TPMS_START_DATE",datatype:"string",editControl:"addDisplayOnly",width:80},
			{columnname:"Start Time",dataname:"TPMS_START_TIME",datatype:"string",editControl:"addDisplayOnly",width:80},
			{columnname:"End Date",dataname:"TPMS_END_DATE",datatype:"string",editControl:"addDisplayOnly",width:80},
			{columnname:"End Time",dataname:"TPMS_END_TIME",datatype:"string",editControl:"addDisplayOnly",width:80}
		]
		var tpmsDtsGridDtl=			
		{
			title:"TPMS",
			id:"tpmsDetails", 
			detail:tPMSDtsGridFieldObj,
			columnWidth:1,
			readonly:true,
			removeAddDelete:true,	
			visibleRow:5
		}
		var tpmsDtsGridSection = plf.addGrid(tpmsDtsGridDtl,this)
		
			var fatigueDtsGridFieldObj=						
		[
			{columnname:"Event Description",dataname:"FATI_EVENT_CODE",datatype:"string",editControl:"addDisplayOnly",width:200},
			{columnname:"Start Date",dataname:"FATI_START_DATE",datatype:"string",editControl:"addDisplayOnly",width:80},
			{columnname:"Start Time",dataname:"FATI_START_TIME",datatype:"string",editControl:"addDisplayOnly",width:80},
			{columnname:"End Date",dataname:"FATI_END_DATE",datatype:"string",editControl:"addDisplayOnly",width:80},
			{columnname:"End Time",dataname:"FATI_END_TIME",datatype:"string",editControl:"addDisplayOnly",width:80}
		]
		var fatigueDtsGridDtl=			
		{
			title:"Fatigue Management",
			id:"fatigueDetails", 
			detail:fatigueDtsGridFieldObj,
			columnWidth:1,
			readonly:true,
			removeAddDelete:true,	
			visibleRow:5
		}
		var fatigueDtsGridSection = plf.addGrid(fatigueDtsGridDtl,this)
		
		var ivmsfeedDtsGridFieldObj=							//69997
		[
			{columnname:"Location",dataname:"LOCATION",datatype:"string",editControl:"addDisplayOnly",	width:100},
			{columnname:"Feed Date",dataname:"FEED_DATE",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Feed Time",dataname:"FEED_TIME",datatype:"string",editControl:"addDisplayOnly",width:100}
		]
		var ivmsfeedDtsGridDtl=				//69997
		{
			title:"IVMS Feed",
			id:"ivmsfeed", 
			detail:ivmsfeedDtsGridFieldObj,
			columnWidth:1,
			readOnly:true,
			removeAddDelete:true,	
			visibleRow:8			
		}
		var ivmsfeedDtsGridSection = plf.addGrid(ivmsfeedDtsGridDtl,this)
		
		
		plf.columns=4
		var statusDetailsCollapse = plf.addColumnSection({title:"Journey Closure & Vehicle Release"});		//69997
		var statusDetailsFormCtrl=																			//69997
		[
			//plf.addDisplayOnly({"label":"Night Drive Approval",id:"strNightDriveApproval"}),
			//plf.addButton({"label":"Browse",id:"browseBtn"}),
			//plf.addDisplayOnly({"label":"Reason",id:"strApprovalReason"}),
			//plf.addDisplayOnly({"label":"Approver Name",id:"strApproverName"}),
			
			
			plf.addRegexDateTime({"label":"JP Close Date & Time",dateid:"dtJpCloseDateAndTime",timeid:"strJpCloseTime"}),
			plf.addDisplayOnly({"label":"Journey Closed By",id:"strJPClosedBy"}),
			plf.addRegexDateTime({"label":"Release Date & Time",dateid:"dtReleaseDateAndTime",timeid:"strReleaseTime"}),
			plf.addDisplayOnly({"label":"Vehicle Released By",id:"strVehicleReleasedBy"}),
			//plf.addText({"label":"Destination",id:"strAfterReleaseDest"}),
			//plf.addCombo({"label":"Release Status",id:"strReleaseStatus"}),
			//plf.addText({"label":"Destination",id:"strAfterReleaseDest"}),
			plf.addText({"label":"Release Remarks",id:"strReleaseRemarks",InputLength:"40"}),
			plf.addDisplayOnly({"label":"Comments for Driver",id:"strCommentsForDriver"}),
			plf.addCombo({"label":"Release To",id:"strReleaseTo"}),
			plf.addText({"label":"JP Distance",id:"strJPDistance",inputFormat:'numeric',weightPrecision:2}),
			plf.addCombo({"label":"Backload Refused",id:"strBackLdRefused"})
		]
		statusDetailsCollapse.add(statusDetailsFormCtrl);
		//Status Details  Section Ends
		
		
		//Back Load diversion Details  Section start
        plf.columns=4
		var backloadDiveDetailSection = plf.addColumnSection({id:"DiversionDetails",title:"Diversion Details"});	
		var backloadDiveDetailFormCtrl=															
		[
			
			plf.addText({"label":"Distance",id:"strBLDistance",inputFormat:'numeric',weightPrecision:3}),
			plf.addText({"label":"Weight",id:"strBLWeight",inputFormat:'numeric',weightPrecision:3}),
			plf.addText({"label":"Remarks",id:"strBLRemarks",InputLength:"100"}),
			plf.addText({"label":"Fuel Required",id:"strFuelReq",InputLength:"100"}),
			plf.addText({"label":"Fuel Chit No",id:"strFuelChitNo",InputLength:"100"}),
			plf.addText({"label":"FCN No",id:"strFcnNo"})
		]
		backloadDiveDetailSection.add(backloadDiveDetailFormCtrl);
		//Back Load diversion Details  Section Ends
		
		
		
		
		//LSR Reporting Details  Section start

		var JMCLSRDetailsGridObj=	
		[
			{columnname:"LSR Violation Type",dataname:"LSR_TYPE",datatype:"string",editControl:"combo",storeId:"strLSRType",width:125},
			{columnname:"LSR Violation Details",dataname:"LSR_NOTES",datatype:"string",editControl:"textbox",width:400,inputFormat:"string",InputLength:"4000"},
			{columnname:"File Name",dataname:"FILE_NAME",datatype:"string",width:150,editControl:"addDisplayOnly"},			
			{columnname:"Upload Document",dataname:"UPLOADDOCUMENT",datatype:"string",editControl:"fileupload",fileGroup:"JPLSR/Documents",width:150,nameColumn:"FILE_NAME"},
			{columnname:"LSR Reported By",dataname:"LSR_REPORTED_BY",datatype:"string",editControl:"addDisplayOnly",width:150},
			{columnname:"LSR Reported Date/Time",dataname:"LSR_REPORTED_DT",datatype:"string",editControl:"addDisplayOnly",width:150}
			
		]
		var JMCLSRDetailsGridDtl=
		{
			title:"JMC LSR Details",
			id:"JMSLSRDTL", 
			detail:JMCLSRDetailsGridObj,
			columnWidth:1,
			visibleRow:10,
			selDelProcess:'Y'
			
		}
		var JMCLSRDetailsGridSection = plf.addGrid(JMCLSRDetailsGridDtl,this)
		//LSR Reporting Details  Section Ends
		//LSR Violation  Section start
        plf.columns=4
		var LSRViolationSection = plf.addColumnSection({id:"LSRViolation",title:"Discussed and informed Driver about LSR violations"});	
		var LSRViolationFormCtrl=															
		[
			
			plf.addCombo({"label":"Discussed",id:"strLSRVioInform"}),
			plf.addTextArea({"label":"Remarks",id:"strLSRVioRemarks",InputLength:"4000",width:400}),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank()
			
		]
		LSRViolationSection.add(LSRViolationFormCtrl);
		//LSR Violation  Section Ends
		
		
		
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
		refDtsGridSection = plf.addGrid(refDtsGridDtl)*/
		//Adding Grid to Reference Details Collapsed ends
		
		//Adding Grid to item Details Collapsed ends
		var itemDtsGridFieldObj=			//69997
		[
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",editControl:"addDisplayOnly",	width:100},
			{columnname:"Item Description",dataname:"ITEM_DESCRIPTION",datatype:"string",editControl:"addDisplayOnly",width:430},
			{columnname:"Qty",dataname:"ITEM_QUANTITY",datatype:"string",editControl:"addDisplayOnly",width:150}
			//{columnname:"Standard UOM",dataname:"UOM",datatype:"string",editControl:"textbox",width:300}
		]
		var itemDtsGridDtl=					//69997
		{
			title:"Item Details",
			id:"itemDetails",
			detail:itemDtsGridFieldObj,
			columnWidth:.6,
			readOnly:true,
			removeAddDelete:true
		}
		var itemDtsGridSection = plf.addGrid(itemDtsGridDtl,this)			//69997
		//Adding Grid to item Details Collapsed ends
		violationAndReferDocColumn = plf.addColumnSection({title:"Violation/Reference",hidden:true});
		//violationAndReferDocColumn = plf.addCollapseSection({title:"New Violations Registered",collapsed:false});
		violationAndReferDocColumn.add(violationsDtsGridSection)
		//violationAndReferDocColumn.add(plf.addSplitter)
		//violationAndReferDocColumn.add(refDtsGridSection)
		
		//itemDtlGridContainer = plf.addColumnSection({});
		itemDtlGridContainer = plf.addCollapseSection({title:"Item Details",collapsed:true});
		itemDtlGridContainer.add(plf.addBlankBlock({"columnWidth":".2"}))
		itemDtlGridContainer.add(itemDtsGridSection)
		
		//Add Child Sections
		/*mainpage.ptrMainSection.add(journeyPlanReferenceCollapse)//Add Day Field Section to Main */
		JourneyHdrFieldset1.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(JourneyHdrFieldset1)//add hdr details
		JourneyHdrFieldset2.add(plf.addStripLine({}));
		
		var TruckGridFieldObj=							//69997
		[
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:140},//188
			{columnname:"Document No",dataname:"DOC_NO",datatype:"string",width:140},//140
			{columnname:"Expiry Date",dataname:"EXPIRTY_DT",datatype:"string",width:140}
			//{columnname:"Issued By",dataname:"ISSUED_BY",datatype:"string",width:110}//Raj
		]
		var truckGridDtl=								//69997
		{
			title:"Truck Documents Details",
			id:"preJourneyTruck",
			columnWidth:0.33,
			detail:TruckGridFieldObj,
			visibleRow:6,	
			readonly:true,
			removeFilter:true,
			removeTbar:true,
			"rowHighlight":true

		}
		var  TruckGridSection = plf.addGrid(truckGridDtl,this)		//69997

		//Pre Journey Inspection Truck Document Grid Section Ends

			//Pre Journey Inspection Trailer Document Grid Section start           	
		var TrailerGridFieldObj=							//69997
		[
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:140},
			{columnname:"Document No",dataname:"DOC_NO",datatype:"string",width:140},
			{columnname:"Expiry Date",dataname:"EXPIRTY_DT",datatype:"string",width:140}
			//{columnname:"Issued By",dataname:"ISSUED_BY",datatype:"string",width:110}//Raj
		]
		var TrailerGridDtl=								//69997
		{
			title:"Trailer Documents Details",
			id:"preJourneyTrailer",
			columnWidth:0.34,
			detail:TrailerGridFieldObj,
			visibleRow:6,	
			readonly:true,
			removeFilter:true,
			removeTbar:true,
			"rowHighlight":true

		}
		var  TrailerGridSection = plf.addGrid(TrailerGridDtl,this)		//69997

		//Pre Journey Inspection Truck Document Grid Section Ends        

		//Pre Journey Inspection Driver Document Grid Section Begins
		var preJourneyInspectionDriverGridFieldObj=	     //69997
		[
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:140},
			{columnname:"Document No",dataname:"DOC_NO",datatype:"string",width:140},
			//{columnname:"Issue Date",dataname:"DOC_ISSUE_DT",datatype:"string",width:140},//Raj
			{columnname:"Expiry Date",dataname:"DOC_EXPIRY_DT",datatype:"string",width:110}
			
		]
		var driverGridDtl=			//69997
		{
			title:"Driver Documents Details",
			id:"preJourneyDriver",
			columnWidth:0.33,
			detail:preJourneyInspectionDriverGridFieldObj,
			visibleRow:6,			
			readonly:true,
			removeFilter:true,
			removeTbar:true,
			"rowHighlight":true				
		}

		var DriverGridSection = plf.addGrid(driverGridDtl,this)
		var truckAndDriverColumn = plf.addCollapseSection({collapsed:true,"title":"Documents Details"});			//69997
		truckAndDriverColumn.add(TruckGridSection)
		truckAndDriverColumn.add(plf.addSplitter)
		truckAndDriverColumn.add(TrailerGridSection)//Raj
		truckAndDriverColumn.add(plf.addSplitter)//Raj
		truckAndDriverColumn.add(DriverGridSection)
		truckAndDriverColumn.add(plf.addStripLine({}));
		
		mainpage.ptrMainSection.add(JourneyHdrFieldset2)//add hdr details
        //mainpage.ptrMainSection.add(JourneyHdrFieldset2)//add hdr details
        //mainpage.ptrMainSection.add(JourneyHdrFieldset3)//add hdr details
        //mainpage.ptrMainSection.add(JourneyHdrFieldset4)//add hdr details	
        //mainpage.ptrMainSection.add(JourneyHdrFieldset5)//add hdr details
        //mainpage.ptrMainSection.add(JourneyHdrFieldset6)//add hdr details
		
		//journeyPlanDetailsCollapse.add(plf.addStripLine({}));	
		mainpage.ptrMainSection.add(JPInspDtls)
		mainpage.ptrMainSection.add(truckAndDriverColumn)
		mainpage.ptrMainSection.add(journeyPlanDetailsCollapse)//Add Day Field Section to Main 
		
		mainpage.ptrMainSection.add(planDtsGridSection) //Add Grid Section to Journey Plan Page
		/*mainpage.ptrMainSection.add(complianceDetailsCollapse) //Add Compliance Section to Journey Plan Page*/
		//mainpage.ptrMainSection.add(violationsDtsGridSection) //Add Violation Section to Journey Plan Page
		statusDetailsCollapse.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(statusDetailsCollapse) //Add Status Section to Journey Plan Page
		
		backloadDiveDetailSection.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(backloadDiveDetailSection) //Add back load diversion
		
			
		JMCLSRDetailsGridSection.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(JMCLSRDetailsGridSection) //Add LSR Reporting Section
		LSRViolationSection.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(LSRViolationSection) //Add LSR Reporting Section
		
		//mainpage.ptrMainSection.add(freeLSRTextEditor)//Free Text For LSR
        //mainpage.ptrMainSection.add(LSRReportingDocDetailSection) //Add LSR Reporting Section		
		//mainpage.ptrMainSection.add(refDtsGridSection) //Add Grid Section to Journey Plan Page
		//itemDtlGridContainer.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(violationAndReferDocColumn)
		
		//mainpage.ptrMainSection.add(itemDtlGridContainer) //Add Grid Section to Journey Plan Page
		
		violationAndReferDocColumn.add(plf.addStripLine({}));
	    	//mainpage.ptrMainSection.add(violationAndReferDocColumn)
		//History Data Section
		var freeTextEditor = plf.addCollapseSection({title:"Notes",collapsed:false});
		
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
		mainpage.ptrMainSection.add(ivmsviolationsDtsGridSection)
		mainpage.ptrMainSection.add(tpmsDtsGridSection)
		mainpage.ptrMainSection.add(fatigueDtsGridSection)
		//mainpage.ptrMainSection.add(ivmsfeedDtsGridSection)		
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
				"methodName":"fetchJourneyPlanUpdScrTS"
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Update Actuals",
				"input":["strJpHistory","strWaybillNo","dtJpCloseDateAndTime","dtReleaseDateAndTime","strReleaseStatus","strAfterReleaseDest","strReleaseRemarks","strJourneyPlanNo","planDetails", 
				"strViolationCode","strDriverCode","strExistingViolation","strViolationRemarks","strCallStatus","violationDetails","strJpCloseTime","strReleaseTime","strVia","strVioDriver","strReleaseTo","strJPDistance",
				"strBackLdRefused","strBLDistance","strBLWeight","strBLRemarks","strFuelReq","strFuelChitNo","strFcnNo",/*"strLSRReported","strLSRReportedNotes","strUploadDoc","strLSRType"*/ "JMSLSRDTL","strLSRVioInform","strLSRVioRemarks"],
				"service":"CoreJourneyPlanService",
				"methodName":"updateJourneyPlanTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Close JP",
					"input":["strJourneyPlanNo","dtJpCloseDateAndTime","strJpCloseTime","strReleaseTime","strVia","strWaybillNo","strTruckCode","strTrailerCode","strDriverCode","strDestination","strVioDriver","strJPDistance","strBackLdRefused","strBLDistance","strBLWeight","strBLRemarks","strFuelReq","strFuelChitNo","strFcnNo",/*"strLSRReported","strLSRReportedNotes","strUploadDoc","strLSRType"*/ "JMSLSRDTL","strLSRVioInform","strLSRVioRemarks"],//73945
					"service":"CoreJourneyPlanService",
					"methodName":"closeJourneyPlanTMSTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Truck Release",
					"input":["strJourneyPlanNo","dtReleaseDateAndTime","strTruckCode","strTrailerCode","strDriverCode","dtJpCloseDateAndTime","strReleaseStatus",
					"strAfterReleaseDest","strReleaseRemarks","strJpCloseTime","strReleaseTime","strVia","strWaybillNo","strReleaseTo","strVioDriver","strJPDistance","strBackLdRefused","strBLDistance","strBLWeight","strBLRemarks","strFuelReq","strFuelChitNo","strFcnNo"],
					"service":"CoreJourneyPlanService",
					"methodName":"releaseJourneyPlanTMSTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Print Release Letter",
					"input":["strJourneyPlanNo","strStatus","strDateType"],
					"service":"CoreReportService",
					"methodName":"PrintReleaseReport"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print Diversion Letter",
				"input":["strLoadNo"],
				"service":"CoreReportService",
				"methodName":"JpPrintDiversionReport"
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
			},
			//73363
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print Waybill",
				"input":["strLoadNo"],
				"service":"CoreReportService",
				"methodName":"PrintwaybillloadingReport"
			},
            {
			    "controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print Inspection",
				"input":["strInspectionNo","strInspectionType"],
				"service":"CoreReportService",
				"methodName":"PrintVehicleInspectReport"
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print JP",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"PrintJourneyPlanReport"
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print Update Actuals",
				"input":["strJourneyPlanNo"],
				"service":"CoreReportService",
				"methodName":"PrintUpdateActualsReport"
			}
			
			];
			
			
			//screen links
			
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
				},
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
				}*/,
				
				
				"Amend_JP":
				{
					"dest":"tms.AmendJPDetails",
					"hdr":[
							{"src":"strJourneyPlanNo","dest":"strJourneyPlanNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
				"Amend_History":
				{
					"dest":"tms.AmendmentHistory",
					"hdr":[
							{"src":"strJourneyPlanNo","dest":"strJourneyPlanNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"ProofOfDelivery_Journey":
				{
					"dest":"ProofOfDelivery.ProofofDeliveryJPLevel",
					"hdr":[
							{"src":"strJourneyPlanNo","dest":"strJourneyPlanNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"Violation_History":
				{
					"dest":"journey_management.ViolationHistory",
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
			var form_obj=this;
			var initValueObj = [];
			var tmpObj = {}
			tmpObj.ctrl = "strDocNo"
			tmpObj.value = form_obj.queryById("strJourneyPlanNo").getValue();			
			initValueObj.push(tmpObj)
			
			console.log(form_obj.queryById("strJourneyPlanNo").getValue(),"mainpage");
			launch_helpscreen("","","CueTrans.view.ivms.ivmspopup",initValueObj)
			/*this.ivmsWindow.show();
			
			var tmpHTMLStr =ivmsPath + Math.random()+"&vh="+this.queryById("strTruckCode").getValue();
			if (newIVMSPtr != undefined && typeof newIVMSPtr.close != undefined) 
				newIVMSPtr.close();
			newIVMSPtr = window.open(tmpHTMLStr, 'cuetransivms');
			launch_helpscreen("","","CueTrans.view.ivms.ivmspopup","")
			*/
	}

});
