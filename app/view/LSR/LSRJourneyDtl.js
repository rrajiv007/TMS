/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	LSR VIEW JOURNEY                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.6															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.LSR.LSRJourneyDtl', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{  
		
        var mainpage = this;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.7;
		mainpage.popupWidthRatio=.85;
		mainpage.startPainting();
		mainpage.screenName = "Journey Plan Update Actual";
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;	
		
		//Add Keyfields
		mainpage.keyFields=["journeyPlanNo"]
		
		//Journey Plan Header Section Begins
		plf.columns=4
		var JourneyHdrFieldset1 = plf.addColumnSection({title:"Journey Details"});	
		var JourneyPlanFormCtrl1=	
		[
	
			plf.addDisplayOnly({"label":"Journey Plan No",id:"strJourneyPlanNo"}),
			plf.addDisplayOnly({"label":"Journey Plan Date",id:"dtJourneyPlanDate"}),
			plf.addDisplayOnly({"label":"Journey Type",id:"strJourneyPlanType"}),			
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addDisplayOnly({"label":"Journey Mgr Name",id:"strJourneyManagerName"}),
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
		    plf.addHidden({"label":"Customer Code",id:"strCustomerCode"}), 
		    plf.addHidden({"label":"Vendor Code",id:"strCustomerVendorCode"}),
			plf.addHidden({"label":"Vendor Name",id:"strCustomerVendorName"})   
			
		]
		
		var JourneyHdrFieldset2 = plf.addColumnSection({title:"Scheduled Asset Details"});	
		var JourneyPlanFormCtrl2=					
		[   
		
		    plf.addDisplayOnly({"label":"Vehicle Code",id:"strTruckCode"}),
			plf.addDisplayOnly({"label":"Vehicle Regn No",id:"strVehicleRegNo"}),
			plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehicleCategory"}),
			plf.addDisplayOnly({"label":"Contract No",id:"strContractNo"}),
			plf.addDisplayOnly({"label":"Driver Code",id:"strDriverCode"}),
			plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
			plf.addDisplayOnly({"label":"Driver Contact No",id:"strMobileNo"}),
			plf.addDisplayOnly({"label":"Driver License No",id:"strLicenseNo"}),
			plf.addDisplayOnly({"label":"Driver Age",id:"strDriverAge"}),
			plf.addDisplayOnly({"label":"Trailer Code",id:"strTrailerCodeSC"}),

			plf.addHidden({"label":"Journey Type",id:"strJourneyPlanType"}),			

			plf.addHidden({"label":"Inspection No",id:"strInspectionNo"}),
			plf.addHidden({"label":"Need Date",id:"dtNeedDate"}),		    
            plf.addHidden({"label":"ROS Date",id:"dtROSDate"}), 
            plf.addHidden({"label":"Pickup Point",id:"strPickupPoint"}),

			plf.addHidden({"label":"Journey Mgr Code",id:"strJourneyManagerCode"}),
			plf.addHidden({"label":"Coordinator Code",id:"strJourneyCoordinatorCode"}),
			plf.addHidden({"label":"Coordinator Name",id:"strJourneyCoordinatorName"}),
			plf.addHidden({"label":"Vehicle Description",id:"strTruckDescription"}),
			plf.addHidden({"label":"Trailer Code",id:"strTrailerCode"}),
			plf.addHidden({"label":"Trailer Description",id:"strTrailerDescription"}),
			plf.addHidden({"label":"Customer Code",id:"strCustomerCode"}),

		    plf.addHidden({"label":"Vendor Code",id:"strCustomerVendorCode"}),
			plf.addHidden({"label":"Vendor Name",id:"strCustomerVendorName"}),
			plf.addHidden({"label":"Driver Compliance",id:"strDriverCompliance"}),
	        plf.addHidden({"label":"Truck Compliance",id:"strTruckCompliance"}),
		    plf.addHidden({"label":"Load Compliance",id:"strLoadCompliance"}),
			plf.addHidden({"label":"Load No",id:"strLoadNo"}),
			plf.addHidden({"label":"RAM score",id:"iRiskAssessmentScore"})
			
		]
		JourneyHdrFieldset1.add(JourneyPlanFormCtrl1);
	    JourneyHdrFieldset2.add(JourneyPlanFormCtrl2);
		plf.columns=4
		


        var JPInspDtls = plf.addColumnSection({title:"Reporting Asset Details"})		
		var JPInspDtlsCtrl=										
		[	
			plf.addDisplayOnly({"label":"Vehicle Code","id":"strRepTruckCode"}),
			plf.addDisplayOnly({"label":"Vehicle Regn No","id":"strRepVehicleRegNo"}),
			plf.addDisplayOnly({"label":"Vehicle Category","id":"strVCat"}),
			plf.addDisplayOnly({"label":"Driver Code",id:"strRepDriverCode"}),	
			plf.addDisplayOnly({"label":"Driver Name",id:"strRepDriverName"}),	
			plf.addDisplayOnly({"label":"Driver Contact No",id:"strRepMobileNo"}),		
			plf.addDisplayOnly({"label":"Driver License No",id:"strRepLicenceNo"}),
			plf.addDisplayOnly({"label":"Driver Age",id:"strRepoDriverAge"}),
			plf.addDisplayOnly({"label":"Trailer Code",id:"strTrailerCode1"})
		   			
		]
		JPInspDtls.add(JPInspDtlsCtrl);
		
		
		var journeyPlanDetailsCollapse = plf.addColumnSection({title:"Route Details"});	
		var journeyPlanDetailsFormCtrl=		
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
		
		var tmpPlannedJpDtl=
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
			readonly:true,
			removePaging:true,
            removeExport:true
		}
		var tmpPlannedJpGridSection = plf.addGrid(tmpPlannedJpGridDtl,this)	
		journeyPlanDetailsCollapse.add(tmpPlannedJpGridSection);
				
		var planDtsGridFieldObj=	
		[
			
			{columnname:"Transit Location",dataname:"INTRANSIT_LOCATION",datatype:"string",editControl:"addDisplayOnly",width:100,storeId:"strTransitLocation"},			
			{columnname:"Planned Arrival Date",dataname:"PLANNED_ARRIVAL_DATE",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Planned Arrival Time",dataname:"PLANNED_ARRIVAL_TIME",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Planned Departure Date",dataname:"PLANNED_DEPARTURE_DATE",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Planned Departure Time",dataname:"PLANNED_DEPARTURE_TIME",datatype:"string",editControl:"addDisplayOnly",width:120},
			{columnname:"Arrival Date",dataname:"ACTUAL_ARRIVAL_DATE",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Arrival Time",dataname:"ACTUAL_ARRIVAL_TIME",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Departure Date",dataname:"ACTUAL_DEPARTURE_DATE",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Departure Time",dataname:"ACTUAL_DEPARTURE_TIME",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Motel",dataname:"MOTEL",datatype:"string",editControl:"addDisplayOnly",width:80},
            {columnname:"Delay Reason",dataname:"DELAY_REASON",datatype:"string",editControl:"addDisplayOnly",width:100,storeId:"strDelayReason"},
            {columnname:"Action",dataname:"ACTION_TYPE",datatype:"string",editControl:"addDisplayOnly",width:100,storeId:"strAction"}, 
			{columnname:"Call JM",dataname:"CALLJM",datatype:"string",editControl:"addDisplayOnly",width:80},
			{columnname:"Call Status",dataname:"CALL_STATUS",datatype:"string",editControl:"addDisplayOnly",width:80}
		]
		var planDtsGridDtl=	
		{
			title:"Plan/Actual Details",
			id:"planDetails",
			detail:planDtsGridFieldObj,
			visibleRow:7,
			removeAddDelete:true,
			readonly:true,
			removePaging:true,
            removeExport:true
			//tool:btnSearch
		}
		var planDtsGridSection = plf.addGrid(planDtsGridDtl,this)	
		journeyPlanDetailsCollapse.add(planDtsGridSection);
		//Adding Grid to Plan Details Ends	
		
		
		
		//Adding Violations to Plan Details Begins
		var vioDriver=[
						plf.addDisplayOnly({"label":"Driver",id:"strVioDriver",
						"listeners":{
							change: function (field, newValue, oldValue) 
							{	
								mainpage.queryById("methodName").setValue("onchangeVioDriUPDActTs");
								process_ebpack_service(mainpage,["strJourneyPlanNo","strVioDriver"],"CoreJourneyPlanService");			
			 
							}
						}
						})				
					  ];	
		var violationsDtsGridFieldObj=		
		[
			{columnname:"Violation Code",dataname:"VIOLATION_CODE",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Violation Type",dataname:"VIOLATION_TYPE",datatype:"string",editControl:"addDisplayOnly",	width:100},
			{columnname:"Description",dataname:"VIOLATION_DESC",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Existing Violations",dataname:"EXISTING_VIOLATION",datatype:"string",editControl:"addDisplayOnly",width:120},
			{columnname:"Current Violation",dataname:"CURRENT_VIOLATION",datatype:"string",editControl:"addDisplayOnly",width:120,colAlign:'right'},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"addDisplayOnly",width:150}
			
		]
		var violationsDtsGridDtl=	
		{
			title:"Violation/Reference",
			id:"violationDetails", 
			detail:violationsDtsGridFieldObj,
			tool:vioDriver,
			removeAddDelete:true,
			readonly:true,
			columnWidth:1,
			visibleRow:10
			
		}
		var violationsDtsGridSection = plf.addGrid(violationsDtsGridDtl,this)	
		//Adding Violations to Plan Details Ends
		//Status Details Section Begins
		
		var ivmsviolationsDtsGridFieldObj=		
		[
			{columnname:"Event Code",dataname:"EVENT_CODE",datatype:"string",editControl:"addDisplayOnly",width:200},
			{columnname:"Start Date",dataname:"START_DATE",datatype:"string",editControl:"addDisplayOnly",width:80},
			{columnname:"Start Time",dataname:"START_TIME",datatype:"string",editControl:"addDisplayOnly",width:80},
			{columnname:"End Date",dataname:"END_DATE",datatype:"string",editControl:"addDisplayOnly",width:80},
			{columnname:"End Time",dataname:"END_TIME",datatype:"string",editControl:"addDisplayOnly",width:80}
		]
		var ivmsviolationsDtsGridDtl=			
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
		
		
		var ivmsfeedDtsGridFieldObj=				
		[
			{columnname:"Location",dataname:"LOCATION",datatype:"string",editControl:"addDisplayOnly",	width:100},
			{columnname:"Feed Date",dataname:"FEED_DATE",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Feed Time",dataname:"FEED_TIME",datatype:"string",editControl:"addDisplayOnly",width:100}
		]
		var ivmsfeedDtsGridDtl=		
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
		var statusDetailsCollapse = plf.addColumnSection({title:"Journey Closure & Vehicle Release"});
		var statusDetailsFormCtrl=													
		[
			
			plf.addRegexDateTime({"label":"JP Close Date & Time",dateid:"dtJpCloseDateAndTime",timeid:"strJpCloseTime"}),
			plf.addDisplayOnly({"label":"Journey Closed By",id:"strJPClosedBy"}),
			plf.addRegexDateTime({"label":"Release Date & Time",dateid:"dtReleaseDateAndTime",timeid:"strReleaseTime"}),
			plf.addDisplayOnly({"label":"Vehicle Released By",id:"strVehicleReleasedBy"}),
			plf.addDisplayOnly({"label":"Release Remarks",id:"strReleaseRemarks",InputLength:"40"}),
			plf.addDisplayOnly({"label":"Comments for Driver",id:"strCommentsForDriver"}),
			plf.addDisplayOnly({"label":"Release To",id:"strReleaseTo"}),
			plf.addDisplayOnly({"label":"JP Distance",id:"strJPDistance",inputFormat:'numeric',weightPrecision:2}),
			plf.addDisplayOnly({"label":"Backload Refused",id:"strBackLdRefused"})
		]
		statusDetailsCollapse.add(statusDetailsFormCtrl);
		//Status Details  Section Ends
		
		
		//Back Load diversion Details  Section start
        plf.columns=4
		var backloadDiveDetailSection = plf.addColumnSection({id:"DiversionDetails",title:"Diversion Details"});	
		var backloadDiveDetailFormCtrl=															
		[
			
			plf.addDisplayOnly({"label":"Distance",id:"strBLDistance",inputFormat:'numeric',weightPrecision:3}),
			plf.addDisplayOnly({"label":"Weight",id:"strBLWeight",inputFormat:'numeric',weightPrecision:3}),
			plf.addDisplayOnly({"label":"Remarks",id:"strBLRemarks",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Fuel Required",id:"strFuelReq",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Fuel Chit No",id:"strFuelChitNo",InputLength:"100"}),
			plf.addDisplayOnly({"label":"FCN No",id:"strFcnNo"})
		]
		backloadDiveDetailSection.add(backloadDiveDetailFormCtrl);
		//Back Load diversion Details  Section Ends
		
		
		//LSR Reporting Details  Section start
        var JMCLSRDetailsGridObj=	
		[
			{columnname:"LSR Violation Type",dataname:"LSR_TYPE",datatype:"string",editControl:"combo",storeId:"strLSRType",width:"auto"},
			{columnname:"LSR Violation Details",dataname:"LSR_NOTES",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			{columnname:"File Name",dataname:"FILE_NAME",datatype:"string",width:"auto",editControl:"addDisplayOnly"},			
			{columnname:"Upload Document",dataname:"UPLOADDOCUMENT",datatype:"string",editControl:"fileupload",fileGroup:"JPLSR/Documents",width:"auto",nameColumn:"FILE_NAME"},
			{columnname:"LSR Reported By",dataname:"LSR_REPORTED_BY",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			{columnname:"LSR Reported Date/Time",dataname:"LSR_REPORTED_DT",datatype:"string",editControl:"addDisplayOnly",width:"auto"}
			
		]
		var JMCLSRDetailsGridDtl=
		{
			title:"JMC LSR Details",
			id:"JMSLSRDTL", 
			detail:JMCLSRDetailsGridObj,
			columnWidth:1,
			visibleRow:10,
			removeAddDelete:true,
			readonly:true
			
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
		//Adding Grid to item Details Collapsed ends
		var itemDtsGridFieldObj=	
		[
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",editControl:"addDisplayOnly",	width:100},
			{columnname:"Item Description",dataname:"ITEM_DESCRIPTION",datatype:"string",editControl:"addDisplayOnly",width:430},
			{columnname:"Qty",dataname:"ITEM_QUANTITY",datatype:"string",editControl:"addDisplayOnly",width:150}
		]
		var itemDtsGridDtl=		
		{
			title:"Item Details",
			id:"itemDetails",
			detail:itemDtsGridFieldObj,
			columnWidth:.6,
			readOnly:true,
			removeAddDelete:true
		}
		var itemDtsGridSection = plf.addGrid(itemDtsGridDtl,this)	
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
		
		var TruckGridFieldObj=			
		[
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",editControl:"addDisplayOnly",width:140},
			{columnname:"Document No",dataname:"DOC_NO",datatype:"string",editControl:"addDisplayOnly",width:140},
			{columnname:"Expiry Date",dataname:"EXPIRTY_DT",datatype:"string",editControl:"addDisplayOnly",width:140}

		]
		var truckGridDtl=			
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
		var  TruckGridSection = plf.addGrid(truckGridDtl,this)	

		//Pre Journey Inspection Truck Document Grid Section Ends

			//Pre Journey Inspection Trailer Document Grid Section start           	
		var TrailerGridFieldObj=							
		[
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:140,editControl:"addDisplayOnly"},
			{columnname:"Document No",dataname:"DOC_NO",datatype:"string",width:140,editControl:"addDisplayOnly"},
			{columnname:"Expiry Date",dataname:"EXPIRTY_DT",datatype:"string",width:140,editControl:"addDisplayOnly"}

		]
		var TrailerGridDtl=			
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
		var  TrailerGridSection = plf.addGrid(TrailerGridDtl,this)	

		//Pre Journey Inspection Truck Document Grid Section Ends        

		//Pre Journey Inspection Driver Document Grid Section Begins
		var preJourneyInspectionDriverGridFieldObj=	   
		[
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:140,editControl:"addDisplayOnly"},
			{columnname:"Document No",dataname:"DOC_NO",datatype:"string",width:140,editControl:"addDisplayOnly"},
			{columnname:"Expiry Date",dataname:"DOC_EXPIRY_DT",datatype:"string",width:110,editControl:"addDisplayOnly"}
			
		]
		var driverGridDtl=	
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
		var truckAndDriverColumn = plf.addCollapseSection({collapsed:true,"title":"Documents Details"});	
		truckAndDriverColumn.add(TruckGridSection)
		truckAndDriverColumn.add(plf.addSplitter)
		truckAndDriverColumn.add(TrailerGridSection)
		truckAndDriverColumn.add(plf.addSplitter)
		truckAndDriverColumn.add(DriverGridSection)
		truckAndDriverColumn.add(plf.addStripLine({}));
		
		mainpage.ptrMainSection.add(JourneyHdrFieldset2)//add hdr details

		mainpage.ptrMainSection.add(JPInspDtls)
		mainpage.ptrMainSection.add(truckAndDriverColumn)
		mainpage.ptrMainSection.add(journeyPlanDetailsCollapse)//Add Day Field Section to Main 
		
		mainpage.ptrMainSection.add(planDtsGridSection) //Add Grid Section to Journey Plan Page

		//mainpage.ptrMainSection.add(violationsDtsGridSection) //Add Violation Section to Journey Plan Page
		statusDetailsCollapse.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(statusDetailsCollapse) //Add Status Section to Journey Plan Page
		
		backloadDiveDetailSection.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(backloadDiveDetailSection) //Add back load diversion
		
		JMCLSRDetailsGridSection.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(JMCLSRDetailsGridSection) //Add LSR Reporting Section
        
		LSRViolationSection.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(LSRViolationSection) //Add LSR Reporting Section
	
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
			}
			
			];
			
			
			//screen links
			
			mainpage.screenLinks=
		    {

			}  
			
			
			mainpage.hlpLinks=
			{
			
			}
   this.callParent(arguments);
		
  }

});
