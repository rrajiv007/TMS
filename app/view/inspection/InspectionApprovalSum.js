/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.3															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
                                 
************************************************************************************************/
Ext.define('CueTrans.view.inspection.InspectionApprovalSum', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
	//	var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Tyre Inspection Approval Summary";
		
		//Inspection Search Section Begins
		plf.columns=4
		var helpOninspectionHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);		//69997
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			//{"name":"Create an Inspection Advice","linkid":"ins_InspAdvice","tooltip":"Click here to create an inspection advice."},
			//{"name":"Assign Inspector","linkid":"ins_Inspassign","tooltip":"Click here to assign inspector."}
		]
		
		var helpOninspectionFormCtrl=															//69997
		[
			//plf.addText({"label":"Inspection No From",id:"strInspectionNoFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Inspection No To",id:"strInspectionNoTo","anywhereSearch":"true"}),
			plf.addText({"label":"Inspection No",id:"strInspectionNoFrom","anywhereSearch":"true"}),
			plf.addHlpText({"label":"Request No",id:"strRequestNo",hlpLinkID:"transreqno"},this),	
			plf.addHlpText({"label":"Load No",id:"strLoadNo",hlpLinkID:"LoadNo"},this),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			//plf.addHlpText({"label":"Truck Code",id:"strTruckCode",hlpLinkID:"truckno"},this),
			plf.addHlpText({"label":"Vehicle Regn No",id:"strRegNo",hlpLinkID:"truckno"},this),
			
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addDate({"label":"Date From",id:"strInspectionDateFrom","mandatory":"true"}),
		    plf.addDate({"label":"Date To",id:"strInspectionDateTo","mandatory":"true"}),
			plf.addHlpText({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"carrierno"},this),
			
			plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory"}),
			plf.addHlpText({"label":"Driver Name",id:"strDriverName",hlpLinkID:"drivercode"},this),
			plf.addText({"label":"Driver Licence No",id:"strDriverLicenceNo"}),
			

			plf.addText({"label":"Driver Mobile No",id:"strDriverMobileNo"}),
			//plf.addText({"label":"Ref Doc No",id:"strDocNo","anywhereSearch":"true"}),
			plf.addCombo({"label":"Carrier Type",id:"strCarrierType"}),
			plf.addText({"label":"Reporting Driver",id:"strReportingDriver"}),
			plf.addText({"label":"Reporting Vehicle",id:"strReportingVehicle"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),//71027 changes
			plf.addCombo({"label":"Destination","id":"strDestination"}),//71027 changes
			plf.addText({"label":"Ref Doc No",id:"strDocNo","anywhereSearch":"true"}),//Added by Raj  for ref doc 67607
			plf.addCombo({"label":"Re-Inspected","id":"strReInspected"}),	
            plf.addCombo({"label":"Approval Status",id:"strActionStatus"}),			
			//plf.addHlpText({"label":"Trailer Code",id:"strTrailerCode",hlpLinkID:"trailerno"},this),
			//plf.addHlpText({"label":"Pickup Point",id:"strPickUpPoint",hlpLinkID:"pickuppoint"},this),
			
            // plf.addBlank({}),
			//plf.addText({"label":"Customer Vendor Code",id:"strCustomerVendorCode"}),
			//plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
		]
		
		 helpOninspectionHdrCollapse.add(helpOninspectionFormCtrl);									
		//Inspection Search Section Ends
		
		//Inspection Grid Section Begins
		var helpOninspectionGridFieldObj=												//69997
		[
			//{columnname:"Click here to launch the inspection advice screen.",linkId:"inspectionmaster",dataname:"INSPLINKID",width:10,imageURL:"resources/images/grid/Inspection/Inspection_Advice.png"},
			//{columnname:"Click here to launch the vehicle inspection screen.",linkId:"PreInspection",dataname:"PRELINKID",width:10,imageURL:"resources/images/grid/Inspection/Vehicle_Inspection.png"},
			//{columnname:"Click here to launch the reinspection screen.",linkId:"ReInspection",dataname:"RELINKID",width:10,imageURL:"resources/images/grid/Inspection/Re_Inspection.png"},
			//{columnname:"Click here to launch the load inspection screen.",linkId:"LoadInspection",dataname:"LOADLINKID",width:10,imageURL:"resources/images/grid/Inspection/Load_Inspection.png"},    
			{columnname:"PrintInspSumReport",dataname:"INS",datatype:"string",width:130,gridReport:"PrintInspSumRep",imageURL:"resources/images/shared/calendar.gif",tooltip:"Click here to print Inspection Report."},
			
			{columnname:"Print WayBill",dataname:"WAYBILL",datatype:"string",width:130,gridReport:"PrintWaybill",imageURL:"resources/images/grid/Journey/Grid_Re_Create.png",tooltip:"Click here to print waybill."},
			
			{columnname:"Inspection No",dataname:"INSPECTION_NO",datatype:"string",width:120,linkId:"NEXT_LINKID","linkType":"DYN","tooltip":"Click here to launch inspection details."},
			{columnname:"Inspection Status",dataname:"INS_STATUS",datatype:"string",width:220},
			{columnname:"Approval Status",dataname:"APPROVAL_STATUS",datatype:"string",width:150},
			{columnname:"Link ID",dataname:"NEXT_LINKID",width:100,hidden:true},
			{columnname:"Inspection Date & Time",dataname:"INS_DT_TIME",datatype:"string",width:160},
			{columnname:"Vehicle Regn No",dataname:"TRUCK_CODE",datatype:"string",width:130},
			{columnname:"Reporting Vehicle",dataname:"REPORTING_VEHICLE",datatype:"string",width:130},
			{columnname:"Load No",dataname:"WAYBILL_NO",datatype:"string",width:80},
			{columnname:"Load Description",dataname:"LOAD_DESCRIPTION",datatype:"string",width:150},
			{columnname:"Loading Point",dataname:"LOAD_AT",datatype:"string",width:150},
			{columnname:"Unloading Point",dataname:"DELIVERY_AT",datatype:"string",width:150},
			{columnname:"Created Date",dataname:"CREATED_DATE",datatype:"string",width:150,hidden:true},
			{columnname:"Inspection Date",dataname:"INSPECTION_DATE",datatype:"string",width:150,hidden:true},
            		//{columnname:"Request No",dataname:"REQUEST_NO",datatype:"string",width:150},
			{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:80},
			//  {columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",width:110},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:130},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:130},
			{columnname:"Driver Name",dataname:"DRIVER_CODE",datatype:"string",width:130},			
			{columnname:"Driver<BR>Mobile No",dataname:"MOBILE_NO",datatype:"string",width:130},
			{columnname:"Reporting Driver",dataname:"REPORTING_DRIVER",datatype:"string",width:130},			
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:130},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:130},
			{columnname:"Inspection Completed<BR>Datetime",dataname:"INS_LIC_DT",datatype:"string",width:130},
			{columnname:"Inspector Name",dataname:"INSPECTOR_NAME",datatype:"string",width:130},
			{columnname:"Rejection Reason",dataname:"REJ_REASON",datatype:"string",width:100},
			{columnname:"Re-Inspected",dataname:"RE_INSPECTED",datatype:"string",width:120},
			{columnname:"Re-Inspection Marked Date/Time",dataname:"RE_INSPECTION_MARKED_DT",datatype:"string",width:200},
			
			{columnname:"Load Reinspection Reason",dataname:"LOAD_REINSPECTION_REASON",datatype:"string",width:200},
			
			{columnname:"Inspection No",dataname:"strInspectionNo",datatype:"string",width:130,hidden:true},
			{columnname:"Load No",dataname:"strLoadNo",datatype:"string",width:130,hidden:true},
			{columnname:"Inspection Type",dataname:"strInspectionType",datatype:"string",width:130,hidden:true},
                    // {columnname:"Pickup Point",dataname:"PICKUP_POINT",datatype:"string",width:120},
			//{columnname:"Customer Vendor<br>Code",dataname:"CUSTOMER_VENDOR_CODE",datatype:"string",width:150},

			//{columnname:"Inspection Date &<br>Time",dataname:"INSPECTIONTIME",datatype:"string",width:150},
			//{columnname:"Truck Description",dataname:"TRUCK_DESC",datatype:"string",width:150},
			//{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:150},
			//{columnname:"Trailer Code",dataname:"TRAILER_CODE",datatype:"string",width:90},
		]
		var helpOninspectionGridDtl=										//69997
		{
			title:"",
			id:"inspectionresultCache",
			detail:helpOninspectionGridFieldObj,
			removeAddDelete:true,
			visibleRow:12,
			"rowHighlight":true
		}
		var helpGridSection = plf.addGrid(helpOninspectionGridDtl,this)
		//Inspection Grid Section Ends
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(helpOninspectionHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		 	{
			"controlid":"",
			"tasktype":"onload",
			"input":["strInspectionNoFrom","strInspectionNoTo","strInspectionDateFrom","strInspectionDateTo","strTruckCode",
			"strDriverCode","strStatus","strPickUpPoint","strCustomerVendorCode","strTrailerCode","strDateType","strDriverName",
			"strRequestNo","strLoadNo","strCarrierCode","strVehicleCategory","strDriverLicenceNo","strDriverMobileNo","strCarrierType",
			"strRegNo","strReportingDriver","strReportingVehicle","strDocNo","strOrigin","strDestination","strReInspected"],
			"service":"CoreInspectionsService",
			//"methodName":"initInspAdvSrchScrTS"
			"methodName":"initInspApprovalSumTS"
			
			},
			{
		   "controlid":"btnSearch",
			"tasktype":"btnclick",
			"input":["strInspectionNoFrom","strInspectionNoTo","strInspectionDateFrom","strInspectionDateTo","strTruckCode",
			"strDriverCode","strStatus","strPickUpPoint","strCustomerVendorCode","strTrailerCode","strDateType","strDriverName",
			"strRequestNo","strLoadNo","strCarrierCode","strVehicleCategory","strDriverLicenceNo","strDriverMobileNo","strCarrierType",
			"strRegNo","strReportingDriver","strReportingVehicle","strDocNo","strOrigin","strDestination","strReInspected","strActionStatus"], //71027 changes
			"service":"CoreInspectionsService",
			//"methodName":"fetchAllInspAdvScrTS"
			"methodName":"fetchInspApprovalSumTS"
		
			},
			{
				"grideventid":"PrintInspSumRep",
				"tasktype":"gridonprint",
				"input":["strInspectionNo"],
				"service":"CoreReportService",
				"methodName":"PrintInspSummReport"
			},
			{
				"grideventid":"PrintWaybill",
				"tasktype":"gridonprint",
				"input":["strLoadNo"],
				"service":"CoreReportService",
				"methodName":"PrintwaybillloadingReport"
			},
			{
				"tasktype":"proto",
				"filename":"journey_management/InspectionList.json"
			}				
		];
		mainpage.hlpLinks=
		{
			"transreqno":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.TransRequestItemHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRequestNo","child":"TRANS_REQ_NO"}
							]
				},
				"truckno":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTruckCode","child":"TRUCK_CODE"},
							{"parent":"strRegNo","child":"TRUCK_REG_NO"}
							
							]
				},
				"carrierno":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCarrierCode","child":"OWNER_CODE_3PL"}							
							]
				},
				"drivercode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strDriverCode","child":"DRIVER_CODE"},							
							{"parent":"strDriverName","child":"DRIVER_NAME"},
							{"parent":"strDriverMobileNo","child":"PHONE_NO"}
							]
				},
					
				"LoadNo":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.LoadBuildingHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strLoadNo","child":"LOAD_NO"}
							]
				},					
				"pickuppoint":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strPickUpPoint","child":"LOC_CODE"}
							]
				},
				"trailerno":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTrailerCode","child":"TRUCK_CODE"}
							
							]
				}
		}
		//Event Handlers Mapping Ends
			
		//Generate Screen Section
		
		mainpage.screenLinks=
	
		{	 "inspectionmaster": 
				{
					"dest":"inspection.InspectionAdviceMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"INSPECTION_NO","dest":"strInspectionNo"}
							]
				},
				"inspection":
				{
					"dest":"inspection.InspectionApproval",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"INSPECTION_NO","dest":"strInspectionNo"}
							]
				},
				"ins_InspAdvice":
				{
					"dest":"inspection.InspectionAdviceMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"ins_Inspassign":
				{
					"dest":"inspection.AssignInspector",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
				
		}
	/*	mainpage.generateScreen();
		
		
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
