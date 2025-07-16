/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	 CUETRANS																                                         
Version		  :	1.0.5															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	Manibharathi		   05/02/2016     69997                         Addition of var  
1.0.2	Steffie                04/1/2016      69640                         Journey short close  
1.0.3   Raj                    20/06/2016     73078	                        Add Load Origin and Load destination in Journey plan screen.  
1.0.4   Mohammed Razhith.S.A   17/07/2016     73363                         Adding Waybill,inspection,jp report. 
1.0.5   Raghavi.M              25/08/2016     74033                         Adding Contract No 
1.0.6   Vidhya P               16/09/2016     74329 
1.0.7  Shekar                  15/11/2106     74673                        Changes in Journey Plan Main & Update Actuals Screen 
																		   and Adding Reporting Vehicle Details
1.0.8   Raj                    15/12/2016     74993
1.0.9   Raj               20/12/2016     75082                     removed <BR> from column name 
************************************************************************************************/
Ext.define('CueTrans.view.journey_management.JourneyPlanTms', 
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
		
		mainpage.toolbarActions= [
			/*{
                "name": "Create",
                "tooltip": "Click here to create a journey."
            },*/
			{
                "name": "Save",
                "tooltip": "Click here to edit the journey."
            },
            /*{
                "name": "Delete",
                "tooltip": "Click here to delete the journey."
            },*/
            {
                "name": "Confirm",
                "tooltip": "Click here to confirm the journey."
            },
			{
                "name": "Short-Close",
                "tooltip": "Click here to short close the journey."
            },/*,
			{
                "name": "Reject",
                "tooltip": "Click here to reject the journey."
            }*/
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
                "name": "Print Diversion Letter",
                "tooltip": "Click here to print diversion letter."
            },
			/*{
                "name": "Print Release Letter",
                "tooltip": "Click here to print the Release Letter."
            }
           */
            ]
	//	mainpage.toolbarActions=["Refresh","Create","Edit","Delete","Confirm","Short-Close","Reject","Print"]
		
		mainpage.toolbarLinks=
		[
			{"name":"Amendment History","linkid":"Amend_History","tooltip":"Click here to launch the Amendment History screen."},
			{"name":"Amend Journey Plan ","linkid":"Amend_JP","tooltip":"Click here to launch the Amend Journey Plan screen."},

			{"name":"Risk Assessment","linkid":"jms_assessment","tooltip":"Click here to launch risk assessment screen."},
			{"name":"Update Actuals","linkid":"jms_update","tooltip":"Click here to launch journey update actuals screen."},
			{"name":"Re-Plan","linkid":"jms_replan","tooltip":"Click here to launch journey replan screen."},//,
			{"name":"Violation History","linkid":"Violation_History","tooltip":"Click here to violation history."}//,
			//{"name":"Proof Of Delivery","linkid":"ProofOfDelivery_Journey","tooltip":"Click here for Proof Of Delivery."}
		]
		//Add Keyfields
		mainpage.keyFields=["strJourneyPlanNo","strInspectionNo","strJourneyManagerCode"]
		//journey plan Header Section starts
		var formCtrl=[];
		plf.columns=4
		//JourneyHdrFieldset1 = plf.addFieldSet({title:"Journey Details"});
		var JourneyHdrFieldset1 = plf.addColumnSection({title:"Journey Details"});	//69997
		var JourneyPlanFormCtrl1=													//69997//74329
		[
			plf.addHlpText({"label":"Journey Plan No",id:"strJourneyPlanNo",hlpLinkID:"jpno",inputFormat:"string",InputLength:"80"},this),
			plf.addDate({"label":"Journey Plan Date",id:"dtJourneyPlanDate","mandatory":"true",Increment:"10"}),
			plf.addDisplayOnly({"label":"Journey Type",id:"strJourneyPlanType"}),			
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),		
			plf.addListEdit({"label":"Journey Mgr Name",id:"strJourneyManagerName",keyField:"strJourneyManagerCode"},this),
			plf.addHlpText({"label":"Journey Mgr Code",id:"strJourneyManagerCode","mandatory":"true",hlpLinkID:"journeyManagerCode",inputFormat:"string",InputLength:"40"},this),
            plf.addDisplayOnly({"label":"Phone Number",id:"strPhoneNo"}),
			//plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),			
			plf.addHidden({"label":"Coordinator Name",id:"strJourneyCoordinatorName",keyField:"strJourneyCoordinatorCode"},this),
			plf.addHidden({"label":"Coordinator Code",id:"strJourneyCoordinatorCode",hlpLinkID:"journeyCoordinatorCode",inputFormat:"string",InputLength:"40"},this),	
			
			plf.addHidden({"label":"Vehicle Description",id:"strTruckDescription",keyField:"strTruckCode"},this),
			plf.addHidden({"label":"Trailer Description",id:"strTrailerDescription",keyField:"strTrailerCode"},this),
			plf.addHidden({"label":"Trailer Code",id:"strTrailerCode",hlpLinkID:"trailerCode",inputFormat:"string",InputLength:"40"},this),	
            plf.addHidden({"label":"Load No",id:"strLoadNo"}),  // 74673 Starts 
			plf.addHidden({"label":"Journey Plan No",id:"strJourneyPlanNo"}),	
            plf.addDisplayOnly({"label":"RAM Score",id:"iRiskAssessmentScore",inputFormat:"string",InputLength:"80"}),
			plf.addDisplayOnly({"label":"Load No",id:"strWaybillNo"/*,inputFormat:"string"*/}),	
			plf.addDisplayOnly({"label":"Load Origin",id:"strLoadOrigin",inputFormat:"string"}),
            plf.addDisplayOnly({"label":"Load Destination",id:"strLoadDestination",inputFormat:"string"}),			
            plf.addDisplayOnly({"label":"Load Description","id":"strLoadDesc"}),
			plf.addDisplayOnly({"label":"Loading Point","id":"strLoadAt"}),
			plf.addDisplayOnly({"label":"Unloading Point","id":"strDeliveryAt"}),
			plf.addDisplayOnly({"label":"Carrier Name",id:"strCarrierName"}),
			plf.addDisplayOnly({"label":"Inspection No",id:"strInspectionNo",hlpLinkID:"inspectionno",inputFormat:"string",InputLength:"80"},this),
			plf.addDisplayOnly({"label":"Driver Compliance",id:"strDriverCompliance","mandatory":"true"}),
	        plf.addDisplayOnly({"label":"Vehicle Compliance",id:"strTruckCompliance","mandatory":"true"}),
		    plf.addDisplayOnly({"label":"Load Compliance",id:"strLoadCompliance","mandatory":"true"}), // 74673 Ends 
			plf.addDisplayOnly({"label":"Trip No",id:"strTripNo"})
			//plf.addFileUpload({"label":"Attach File",id:"strFileAttach",Entity:"Journey_Plan\\File_Attachment"})
			
		]
		JourneyHdrFieldset1.add(JourneyPlanFormCtrl1);
		

		 //var JPInspSchedDtls = plf.addColumnSection({title:"Scheduled Vehicle/Driver Details"});//75145
		 var JPInspSchedDtls = plf.addColumnSection({title:"Scheduled Asset Details"});
		 var JPInspSchedDtlsCtrl=
              [			 
				plf.addDisplayOnly({"label":"Vehicle Code",id:"strTruckCode","mandatory":"true",hlpLinkID:"truckCode",inputFormat:"string",InputLength:"40"},this),
				plf.addDisplayOnly({"label":"Vehicle Regn No",id:"strVehicleRegNo"}),
				plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehicleCategory"}),
				plf.addDisplayOnly({"label":"Contract No",id:"strContractNo"}),		
				plf.addDisplayOnly({"label":"Driver Code",id:"strDriverCode",inputFormat:"string"}),
				plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName",keyField:"strDriverCode"},this),			
				plf.addDisplayOnly({"label":"Driver Contact No",id:"strMobileNo"}),
				plf.addDisplayOnly({"label":"Driver License No",id:"strLicenseNo"}),
				plf.addDisplayOnly({"label":"Driver Age",id:"strDriverAge"}),
				plf.addDisplayOnly({"label":"Trailer Code",id:"strSTrai"})
				
			]
            JPInspSchedDtls.add(JPInspSchedDtlsCtrl);		 
		
	    //var JPInspDtls = plf.addColumnSection({title:"Reporting Vehicle/Driver Details"}); // 74673	
        var JPInspDtls = plf.addColumnSection({title:"Reporting Asset Details"}); // 74673			
		var JPInspDtlsCtrl=										
		[	
 
			plf.addDisplayOnly({"label":"Vehicle Code","id":"strRepTruckCode"}),
			plf.addDisplayOnly({"label":"Vehicle Regn No","id":"strRVReg"}),// strRepVehicleRegNo
			plf.addDisplayOnly({"label":"Vehicle Category","id":"strVCat"}),//75145
			//plf.addHlpText({"label":"Driver Code",id:"strRepDriverCode",hlpLinkID:"driver",inputFormat:"string"},this),
            plf.addDisplayOnly({"label":"Driver Code","id":"strRepDriverCode"}),//75145			
			plf.addDisplayOnly({"label":"Driver Name",id:"strRepDriverName"}),	
			plf.addDisplayOnly({"label":"Driver Contact No",id:"strRepMobileNo"}),		
			plf.addDisplayOnly({"label":"Driver License No",id:"strRepLicenceNo"}),
			plf.addDisplayOnly({"label":"Driver Age",id:"strRepoDriverAge"}),
			plf.addDisplayOnly({"label":"Driver Carrier",id:"strCarrierNameNew"}),
			//plf.addHlpText({"label":"Trailer Code","id":"strTrailerCode",hlpLinkID:"reportingTrailerCode"},this)//75145
			plf.addDisplayOnly({"label":"Trailer Code",id:"strRTri"})	
			
            			
		]
		JPInspDtls.add(JPInspDtlsCtrl);
			
		
		//journey plan Header Section ends
		//Plan Details Section Begins
		plf.columns=4
		var journeyPlanDetailsCollapse = plf.addColumnSection({title:"Route Details"});		//69997
		var journeyPlanDetailsFormCtrl=											//69997
		[   
		    plf.addCombo({"label":"Manual Plan",id:"strManualPlan","mandatory":"true"}),
			plf.addListEdit({"label":"JMC Code","id":"strJMCCode",inputFormat:"string",InputLength:"100"
			,listeners: {
                     beforequery: function(record) {
                         record.query = new RegExp(record.query, 'i');
                         record.forceAll = true;
                         return true;
                     },
					render : function(cmp) {
                                    cmp.getEl().on('keypress', function(e) {
                                        if (e.getKey() == e.ENTER) {
											mainpage.queryById("methodName").setValue("onenterJmcCodeTS");
											process_ebpack_service(mainpage,["strJMCCode"],"CoreJourneyPlanService");
                                        }
                                    });
                                }
                 }		
			},this),
			//plf.addListEdit({"label":"JMC Code","id":"strJMCCode",inputFormat:"string",InputLength:"100"},this),
			plf.addListEdit({"label":"Route Description","id":"strRouteDescription",keyField:"strRouteCode",inputFormat:"string",InputLength:"100"},this),
			plf.addHlpText({"label":"Route Code","id":"strRouteCode",hlpLinkID:"routeCode",inputFormat:"string",InputLength:"40"},this),			
			//plf.addDate({"label":"Departure Date",id:"dtDepartureDate"}),
			//plf.addText({"label":"Departure Time",id:"tmDepartureTime",Increment:"10"}),
			plf.addDateTime({"label":"Departure Date/Time",dateid:"dtDepartureDate",timeid:"tmDepartureTime"}),
			plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
			plf.addDisplayOnly({"label":"Via","id":"strVia"}),
			plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),			
			//plf.addText({"label":"Pickup Point",id:"strPickupPoint",inputFormat:"string",InputLength:"100"}),
			plf.addBlank(),
			plf.addBlank(),
			plf.addButton({"label":"Create Route Plan",id:"cmn_btnsubmit","tooltip":"Click here to schedule the journey."})
			
		]
		journeyPlanDetailsCollapse.add(journeyPlanDetailsFormCtrl);
		//Plan Details  Section Ends
		
		//Adding Grid to Plan Details Begins
		var planDtsGridFieldObj=									//69997
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
			//{columnname:"Action",dataname:"ACTION_TYPE",datatype:"string",editControl:"combo",width:100,storeId:"strAction"},            			
           /* {columnname:"ReferenceType",dataname:"select",datatype:"string",editControl:"checkbox",width:150},*/		
			{columnname:"Motel",dataname:"MOTEL",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Call JM",dataname:"CALLJM",datatype:"string",editControl:"combo",width:100,storeId:"strCallJMNo"}
		]
		var planDtsGridDtl=									//69997
		{
			title:"Plan Details",
			id:"planDetails",			
			widthBasis:"flex",
			detail:planDtsGridFieldObj,
			visibleRow:7,
		    removeAddDelete:true,
                  removeExport:true
		}
		var planDtsGridSection = plf.addGrid(planDtsGridDtl,this)				//69997
		journeyPlanDetailsCollapse.add(planDtsGridSection);
		//Adding Grid to Plan Details Ends	
		var planDtsGridManualFieldObj=						//69997
		[	
			
			{columnname:"Transit Location",dataname:"INTRANSIT_LOCATION",datatype:"string",editControl:"combo",width:100,storeId:"strTransitLocation"},			
			{columnname:"Planned Arrival Date",dataname:"PLANNED_ARRIVAL_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Planned Arrival Time",dataname:"PLANNED_ARRIVAL_TIME",datatype:"string",editControl:"RegexTime",width:100},
			{columnname:"Planned Departure Date",dataname:"PLANNED_DEPARTURE_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Planned Departure Time",dataname:"PLANNED_DEPARTURE_TIME",datatype:"string",editControl:"RegexTime",width:120},
			/*
			{"group":"Plan","dtl":[
			{columnname:"Arrival Date",dataname:"PLANNED_ARRIVAL_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Arrival Time",dataname:"PLANNED_ARRIVAL_TIME",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Departure Date",dataname:"PLANNED_DEPARTURE_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Departure Time",dataname:"PLANNED_DEPARTURE_TIME",datatype:"string",editControl:"textbox",width:120},
			]},	*/	
			//{columnname:"Action",dataname:"ACTION_TYPE",datatype:"string",editControl:"combo",width:100,storeId:"strAction"},
            //{columnname:"Delay Reason",dataname:"DELAY_REASON",datatype:"string",editControl:"combo",width:100,storeId:"strDelayReason"},  			
           /* {columnname:"ReferenceType",dataname:"select",datatype:"string",editControl:"checkbox",width:150},*/		
			{columnname:"Motel",dataname:"MOTEL",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Call JM",dataname:"CALLJM",datatype:"string",editControl:"combo",width:100,storeId:"strCallJMYes"}
		]
		var planDtsGridManualDtl=					//69997
		{
			title:"Manual Plan Details",
			id:"manualplanDetails",			
			widthBasis:"flex",
			detail:planDtsGridManualFieldObj,
			visibleRow:7
		}
		 var planDtsGridManualSection = plf.addGrid(planDtsGridManualDtl,this)		//69997
		journeyPlanDetailsCollapse.add(planDtsGridManualSection);
		
				//Driver Rest Details  Section start
      
		var DriverRestDetailsGridObj=	
		[
			{columnname:"License No",dataname:"LICENSE_NO",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"GSM Number",dataname:"GSM_NUMBER",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Blue Key No",dataname:"BLUE_KEY_NO",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Driver",dataname:"DRIVER",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Vehicle",dataname:"VEHICLE",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Contract Number",dataname:"CONTRACT_NUMBER",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Registration Number",dataname:"REGISTRATION_NUMBER",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Event Description",dataname:"EVENT_DESCRIPTION",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Start Date",dataname:"START_DATE",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Start Time",dataname:"START_TIME",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"End Date",dataname:"END_DATE",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"End Time",dataname:"END_TIME",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Occurrences",dataname:"OCCURRENCES",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Event Value",dataname:"EVENT_VALUE",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Total Duration (hh:mm:ss)",dataname:"TOTAL_DURATION",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Measurement Unit",dataname:"MEASUREMENT_UNIT",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"JP Number",dataname:"JP_NUMBER",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Reason",dataname:"REASON",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Road Type",dataname:"ROAD_TYPE",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Provider",dataname:"PROVIDER",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"Start Long/Lat",dataname:"START_LONG_LAT",datatype:"string",editControl:"addDisplayOnly"},
			{columnname:"End Long/Lat",dataname:"END_LONG_LAT",datatype:"string",editControl:"addDisplayOnly"}
			
		]
		var DriverRestDetailsGridDtl=
		{
			title:"Violation Details - 09:00 PM - 05:00 AM",
			id:"DriverRestDetails", 
			detail:DriverRestDetailsGridObj,
			columnWidth:1,
			visibleRow:5,	
			readonly:true
			
		}
		var DriverRestDetailsGridSection = plf.addGrid(DriverRestDetailsGridDtl,this)
		plf.columns=4
		var DriverRestDetailsColumn = plf.addColumnSection({id:"strDriverRestDetailsGrid",title:"Driver Rest Details - For Duty of Care"});
		var ValidateDriverCtrl=										
		[	
	
			plf.addButton({"label":"Validate Driver Rest",id:"strValidateDriverRest","tooltip":"Click here to validate driver rest."})      			
		]
		DriverRestDetailsColumn.add(ValidateDriverCtrl);
				
		DriverRestDetailsColumn.add(DriverRestDetailsGridSection)
		
		//Driver Rest Details  Section Ends
		
	   //Action Details start
	   plf.columns=4
		var AllocateSection = plf.addCollapseSection({id:"strActionDriver",title:"Allocate the reporting driver irrespective of the above violations"});	
		var AllocateFormCtrl=															
		[			
			plf.addCombo({"label":"Allocate",id:"strAllocate"})			
		]
		AllocateSection.add(AllocateFormCtrl);
		plf.columns=1
		var freeActionTextEditor = plf.addColumnSection({title:"Reason",columnWidth:1});
		
		freeActionTextEditor.add({
                 xtype: "container",
                 layout: "column",
				 //columnWidth:1,
                 //cls: plf.getContainerCls(),
                 items: 
				 [						
						 Ext.create('Ext.form.field.TextArea', {
							itemId:"strAllocateReason",
							height: 150,
							width:plf.screenWidth-150	
						})
                 ]
             })
		AllocateSection.add(freeActionTextEditor)
		plf.columns=3
		var AllocateDocDetailSection = plf.addColumnSection({id:"strAllocateDocSection",title:"",columnWidth:1});	
		var AllocateDocDetailFormCtrl=															
		[
			
			plf.addCustomFileUpload({"label":"Upload Document",id:"strSupUploadDoc",mandatory:"true",Entity:"Service/Doc_Attachment",Path:"app"}),
			plf.addDisplayOnly({"label":"Action By",id:"strActionBy"}),
			plf.addDisplayOnly({"label":"Action Date/Time",id:"stActionDtTm"}),
			
		]
		AllocateDocDetailSection.add(AllocateDocDetailFormCtrl);
		AllocateSection.add(AllocateDocDetailSection);
	   
	  // Allocate Details end
		
		//Adding Passenger to Plan Details Begins
		var passengerDtsGridFieldObj=		//69997
		[
			{columnname:"Passenger",dataname:"PASSENGER",datatype:"string",editControl:"textbox",width:200},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:400},
			{columnname:"serial no",dataname:"SERIAL_NO",datatype:"string",editControl:"textbox",width:300,hidden:true}
		]
		var passengerDtsGridDtl=				//69997
		{
			title:"Passengers",
			id:"passengerDetails",
			widthBasis:"flex",
			detail:passengerDtsGridFieldObj,
			columnWidth:.5
		}
		var passengerDtsGridSection = plf.addGrid(passengerDtsGridDtl,this) //69997
		//Adding Passenger to Plan Details Ends
		
		//Adding Violations to Plan Details Begins
		var vioDriver=[
						plf.addCombo({"label":"Driver",id:"strVioDriver",
						"listeners":{
							change: function (field, newValue, oldValue) 
							{	
								mainpage.queryById("methodName").setValue("onchangeVioDriverTs");
								process_ebpack_service(mainpage,["strJourneyPlanNo","strVioDriver"],"CoreJourneyPlanService");			
			 
							}
						}
						})				
					  ];	
						
		var violationsDtsGridFieldObj=						//69997
		[
			{columnname:"Violation Type",dataname:"VIOLATION_TYPE",datatype:"string",editControl:"addDisplayOnly",	width:100},
			{columnname:"Violations Description",dataname:"VIOLATION_DESC",datatype:"string",editControl:"addDisplayOnly",width:200},
			{columnname:"Count",dataname:"COUNT",datatype:"string",editControl:"addDisplayOnly",width:150,colAlign:'right'}
			//{columnname:"Attach Document",dataname:"ATTACH_DOCUMENT_VIO",datatype:"string",width:150,editControl:"fileupload",fileGroup:"Journey_Plan\\Violations",width:175}
		]
		var violationsDtsGridDtl=						//69997
		{
			title:"Existing Violations",
			id:"violationDetails",
			detail:violationsDtsGridFieldObj,
			widthBasis:"flex",
			columnWidth:.5,
			readOnly:true,
			tool:vioDriver,
			removeAddDelete:true
		}
		var violationsDtsGridSection = plf.addGrid(violationsDtsGridDtl,this)	//69997
		//Adding Violations to Plan Details Ends
		
		//Adding Tool Box Talks  to Plan Details Begins		
		var toolBoxDtsGridFieldObj=						//69997
		[
			{columnname:"Tool Box Talk Code",dataname:"TOOLBOX_TYPE",datatype:"string",editControl:"textbox",	width:300,hidden:true},
			{columnname:"Tool Box Talks",dataname:"TYPE_DESC",datatype:"string",editControl:"textbox",	width:500},
			{columnname:"Seq_no",dataname:"SEQ_NO",datatype:"string",editControl:"addDisplayOnly",	width:300,hidden:true}

			
		]
		var toolBoxDtsGridDtl=					//69997
		{
			title:"Toolbox Talks",
			id:"toolBoxTalksDetails",
			widthBasis:"flex",
			detail:toolBoxDtsGridFieldObj,
			columnWidth:.5
			
		}
		var toolBoxDtsGridSection = plf.addGrid(toolBoxDtsGridDtl,this)	//69997
		//Adding Tool Box Talks to Plan Details Ends
		
		//Status Details Section Begins
		plf.columns=4
		var statusDetailsCollapse = plf.addColumnSection({title:"Night Driving"});	//69997
		var statusDetailsFormCtrl=														//69997
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
		
		//Adding Grid to Reference Details Collapsed Begins
		var refDtsGridFieldObj=				//69997
		[
			//{columnname:"ReferenceType",dataname:"select",datatype:"string",editControl:"checkbox",width:150},
			{columnname:"Reference Type",dataname:"REFERENCE_TYPE",datatype:"string",editControl:"combo",width:100,storeId:"strReferenceType"},
			{columnname:"Reference No",dataname:"REFERENCE_NO",datatype:"string",editControl:"textbox",	width:100},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:100},
			{columnname:"SEQ NO",dataname:"SEQ_NO",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Attach Document",dataname:"ATTACH_DOCUMENT_REF",datatype:"string",width:100,editControl:"fileupload",fileGroup:"Journey_Plan\\Reference_Documents",width:175}
			
			
		]
		var refDtsGridDtl=												//69997
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
		var itemDtsGridFieldObj=														//69997
		[
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Item Description",dataname:"ITEM_DESCRIPTION",datatype:"string",editControl:"textbox",width:400},
			{columnname:"Qty",dataname:"ITEM_QUANTITY",datatype:"string",editControl:"textbox",width:100},
			{columnname:"seq no",dataname:"SEQ_NO",datatype:"string",editControl:"textbox",width:100,hidden:true}
			//{columnname:"Standard UOM",dataname:"UOM",datatype:"string",editControl:"textbox",width:300}
		]
		var itemDtsGridDtl=									//69997
		{
			title:"Item Details",
			id:"itemDetails",
			detail:itemDtsGridFieldObj,
			columnWidth:.6
		}
		var itemDtsGridSection = plf.addGrid(itemDtsGridDtl,this)				//69997
		
		var itemDtlGridContainer = plf.addCollapseSection({title:"Item Details",collapsed:true});	//69997
		itemDtlGridContainer.add(plf.addBlankBlock({"columnWidth":".2"}))
		itemDtlGridContainer.add(itemDtsGridSection)
		
		
		//Adding Grid to item Details Collapsed ends
		var violationAndToolBoxDocColumn = plf.addCollapseSection({title:"Violations / Toolbox Talks",collapsed:false});	//69997
		violationAndToolBoxDocColumn.add(violationsDtsGridSection)
		violationAndToolBoxDocColumn.add(plf.addSplitter)
		violationAndToolBoxDocColumn.add(toolBoxDtsGridSection)
		
		//Add Child Sections
		JourneyHdrFieldset1.add(plf.addStripLine({}));	//69997
		
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
		
		mainpage.ptrMainSection.add(JourneyHdrFieldset1)//add hdr details
		
		mainpage.ptrMainSection.add(JPInspSchedDtls);
		mainpage.ptrMainSection.add(JPInspDtls);
		mainpage.ptrMainSection.add(truckAndDriverColumn)
		//mainpage.ptrMainSection.add(JPInspSchedDtls);//75145
		
        //mainpage.ptrMainSection.add(JourneyHdrFieldset2)//add hdr details
        //mainpage.ptrMainSection.add(JourneyHdrFieldset3)//add hdr details
		//JourneyJMTruckCust.add(plf.addStripLine({}));
		//mainpage.ptrMainSection.add(JourneyJMTruckCust)
		
        //mainpage.ptrMainSection.add(JourneyHdrFieldset4)//add hdr details	
        //mainpage.ptrMainSection.add(JourneyHdrFieldset5)//add hdr details
        //mainpage.ptrMainSection.add(JourneyHdrFieldset6)//add hdr details		
		/*mainpage.ptrMainSection.add(journeyPlanReferenceCollapse)//Add Day Field Section to Main */	
		journeyPlanDetailsCollapse.add(plf.addStripLine({}));			//69997
		mainpage.ptrMainSection.add(journeyPlanDetailsCollapse)//Add Day Field Section to Main 
		//mainpage.ptrMainSection.add(planDtsGridSection) //Add Grid Section to Journey Plan Page
		/*mainpage.ptrMainSection.add(complianceDetailsCollapse) //Add Compliance Section to Journey Plan Page*/
		//mainpage.ptrMainSection.add(passengerDtsGridSection) //Add Passenger Section to Journey Plan Page
		//mainpage.ptrMainSection.add(violationsDtsGridSection) //Add Violation Section to Journey Plan Page
		//mainpage.ptrMainSection.add(toolBoxDtsGridSection) //Add Toolbox Section to Journey Plan Page
		//statusDetailsCollapse.add(plf.addStripLine({}));
		
		
		mainpage.ptrMainSection.add(DriverRestDetailsColumn);//DriverRestDetailsColumn
		
		mainpage.ptrMainSection.add(AllocateSection) //Add Action Section
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
			/*{
				"controlid":"strJMCCode",
				"tasktype":"onenter",
				"input":["strJMCCode"],
				"service":"CoreJourneyPlanService",
				"methodName":"onenterJmcCodeTS"
			},*/
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
					"action":"Save",
					"input":["strJourneyPlanNo","strInspectionNo","strJourneyManagerCode","strTruckCode","strCustomerVendorCode","dtNeedDate","dtJourneyPlanDate",
					"strWaybillNo","dtROSDate","strJourneyPlanType","strJourneyCoordinatorCode","strDriverCode","strCustomerCode","strPickupPoint","strDriverCompliance",
					"strTruckCompliance","strLoadCompliance","iRiskAssessmentScore","strStatus","strRouteCode","strManualPlan","dtDepatureDate","tmDepartureTime","strNightDriveApproval","strApprovalReason","strApproverName","strCommentsForDriver","strPassengerName","strPassengerRemarks","strToolBoxTalks","strTransitLocation","strJourneyMode",
					"strRiskAssessmentScore","strCommodity","strTrailerCode","strNightDriveApproval","dtDepartureDate","dtDepartureTime","strOrigin","strDestination","planDetails",
					"passengerDetails","toolBoxTalksDetails","referenceDetails","manualplanDetails","itemDetails","strFileAttach","strFileAttach1","violationDetails","strRepDriverCode","strBLDistance","strBLWeight","strBLRemarks","strFuelReq","strFuelChitNo","strFcnNo","strJMCCode",
                     "strAllocate","strSupUploadDoc","strActionBy","stActionDtTm","strAllocateReason"
                      ],
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
					"passengerDetails","toolBoxTalksDetails","referenceDetails","manualplanDetails","itemDetails","strFileAttach","strFileAttach1","violationDetails"],
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
					"passengerDetails","toolBoxTalksDetails","referenceDetails","manualplanDetails","itemDetails","strFileAttach","strFileAttach1","violationDetails","strRepDriverCode","strBLDistance","strBLWeight","strBLRemarks","strFuelReq","strFuelChitNo","strFcnNo","strJMCCode",
                    "strAllocate","strSupUploadDoc","strActionBy","stActionDtTm","strAllocateReason"],
					"service":"CoreJourneyPlanService",
					"methodName":"authorizeJourneyPlanTS"
					
				},
				/*
			{	
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Print Release Letter",
					"input":["strJourneyPlanNo","strInspectionNo","strJourneyManagerCode","strTruckCode","strCustomerVendorCode","dtNeedDate","dtJourneyPlanDate",
					"strWaybillNo","dtROSDate","strJourneyPlanType","strJourneyCoordinatorCode","strDriverCode","strCustomerCode","strPickupPoint","strDriverCompliance",
					"strTruckCompliance","strLoadCompliance","iRiskAssessmentScore","strStatus","strRouteCode","strManualPlan","dtDepatureDate","tmDepartureTime","strNightDriveApproval","strApprovalReason",
					"strApproverName","strCommentsForDriver","strPassengerName","strPassengerRemarks","strToolBoxTalks","strTransitLocation","strJourneyMode",
					"strRiskAssessmentScore","strCommodity","strTrailerCode","strNightDriveApproval","dtDepartureDate","dtDepartureTime","strOrigin","strDestination","planDetails",
					"passengerDetails","toolBoxTalksDetails","referenceDetails","manualplanDetails","itemDetails","strFileAttach","strFileAttach1","violationDetails","strRepDriverCode"],
					"service":"CoreJourneyPlanService",
					"methodName":"ReleaseJourneyPlanTS"
			},*/
            //69640
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Short-Close",
					"input":["strJourneyPlanNo","strWaybillNo","strTruckCode","strDriverCode","strTrailerCode","strFileAttach","strFileAttach1","violationDetails"],
					"service":"CoreJourneyPlanService",
					"methodName":"shortcloseJourneyPlanTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Reject",
					"input":["strJourneyPlanNo","strInspectionNo","strTruckCode","strDriverCode","strTrailerCode","strFileAttach","strFileAttach1","violationDetails"],
					"service":"CoreJourneyPlanService",
					"methodName":"rejectJourneyPlanTS"
			},
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
				"controlid":"cmn_btnsubmit",
				"tasktype":"btnclick",
				"input":["strTruckCode","dtDepartureDate","tmDepartureTime","strRouteCode","strFileAttach","strFileAttach1","strWaybillNo","violationDetails"],
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
			},
			{
					"controlid":"strRepDriverCode",
					"tasktype":"onenter",
					"input":["strRepDriverCode"],
					"service":"CoreJourneyPlanService",
					"methodName":"fetchJPDriverDetTS"
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
				"controlid":"strValidateDriverRest",
				"tasktype":"btnclick",
				"input":["strRepDriverCode","strJourneyPlanNo","strDriverCode","dtDepartureDate","strRouteCode","strManualPlan"],
			    "service":"CoreJourneyPlanService",
				"methodName":"validateDriverRestTS"
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
				
				/*,
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
							{"parent":"","child":""},
                                                 {"direct":"DRIVER_AC","child":"strContext"}//74993
						   ],
					"receive":[
							{"parent":"strRepDriverCode","child":"DRIVER_CODE"},
							{"parent":"strRepDriverName","child":"DRIVER_NAME"},	
							{"parent":"strRepMobileNo","child":"PHONE_NO"},
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
							{"parent":"","child":""},
							{"direct":"ROUTE_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strRouteCode","child":"ROUTE_CODE"},
							{"parent":"strRouteDescription","child":"JOURNEYLEGS"},
							{"parent":"strOrigin","child":"INTRANSIT_ORIGIN"},
							{"parent":"strDestination","child":"INTRANSIT_DEST"},
							{"parent":"strJMCCode","child":"JMC_CODE"}
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
				}/*,
				//for 75145
				 "reportingTrailerCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"VEHICLE_AC","child":"strContext"}//74993
						   ],
					"receive":[
							{"parent":"strTrailerCode","child":"TRUCK_CODE"}
							]
				}*/
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