Ext.define('CueTrans.view.journey_management.InspectionList', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
	//	var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Inspection Summary";
		
		//Inspection Search Section Begins
		plf.columns=4
		helpOninspectionHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Create an Inspection Advice","linkid":"ins_InspAdvice","tooltip":"Click here to create an inspection advice."}
		]
		
		helpOninspectionFormCtrl=
		[
			plf.addText({"label":"Inspection No",id:"strInspectionNoFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Inspection No To",id:"strInspectionNoTo","anywhereSearch":"true"}),
			plf.addHlpText({"label":"Request No",id:"strRequestNo",hlpLinkID:"transreqno"},this),	
			plf.addHlpText({"label":"Load No",id:"strLoadNo",hlpLinkID:"LoadNo"},this),
				
			plf.addHlpText({"label":"Truck Code",id:"strTruckCode",hlpLinkID:"truckno"},this),
			plf.addDate({"label":"Inspection Date From",id:"strInspectionDateFrom"}),
		    plf.addDate({"label":"Inspection Date To",id:"strInspectionDateTo"}),
			plf.addHlpText({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"carrierno"},this),
			plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory"}),
			plf.addText({"label":"Vehicle Registration No",id:"strRegNo"}),
			plf.addHlpText({"label":"Driver Code",id:"strDriverCode",hlpLinkID:"drivercode"},this),
			plf.addText({"label":"Driver Licence Number",id:"strDriverLicenceNo"}),
			plf.addText({"label":"Driver Mobile Number",id:"strDriverMobileNo"}),
			plf.addHlpText({"label":"Trailer Code",id:"strTrailerCode",hlpLinkID:"trailerno"},this),
			plf.addHlpText({"label":"Pickup Point",id:"strPickUpPoint",hlpLinkID:"pickuppoint"},this),
			plf.addCombo({"label":"Status",id:"strStatus"}),
                    // plf.addBlank({}),
			//plf.addText({"label":"Customer Vendor Code",id:"strCustomerVendorCode"}),
			//plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
		]
		
		helpOninspectionHdrCollapse.add(helpOninspectionFormCtrl);
		//Inspection Search Section Ends
		
		//Inspection Grid Section Begins
		helpOninspectionGridFieldObj=
		[
			{columnname:"Click here to launch the inspection advice screen.",linkId:"inspectionmaster",dataname:"INSPLINKID",width:10,imageURL:"resources/images/grid/Inspection/Inspection_Advice.png"},
			{columnname:"Click here to launch the vehicle inspection screen.",linkId:"PreInspection",dataname:"PRELINKID",width:10,imageURL:"resources/images/grid/Inspection/Vehicle_Inspection.png"},
			{columnname:"Click here to launch the reinspection screen.",linkId:"ReInspection",dataname:"RELINKID",width:10,imageURL:"resources/images/grid/Inspection/Re_Inspection.png"},
			{columnname:"Click here to launch the load inspection screen.",linkId:"LoadInspection",dataname:"LOADLINKID",width:10,imageURL:"resources/images/grid/Inspection/Load_Inspection.png"},
			{columnname:"Inspection No",dataname:"INSPECTION_NO",datatype:"string",width:150,linkId:"NEXT_LINKID","linkType":"DYN","tooltip":"Click here to launch inspection details."},
			{columnname:"Link ID",dataname:"NEXT_LINKID",width:100,hidden:true},
            {columnname:"Request No",dataname:"REQUEST_NO",datatype:"string",width:150},
                   //  {columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",width:110},
			{columnname:"Load No",dataname:"WAYBILL_NO",datatype:"string",width:130},
			{columnname:"Vehicle",dataname:"TRUCK_CODE",datatype:"string",width:130},
			{columnname:"Driver",dataname:"DRIVER_CODE",datatype:"string",width:130},
			{columnname:"Driver<BR>Mobile No",dataname:"MOBILE_NO",datatype:"string",width:130},
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:130},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:130},
			{columnname:"Inspection Date<BR>& Time",dataname:"INS_DT_TIME",datatype:"string",width:130},
			{columnname:"Inspector Name",dataname:"INSPECTOR_NAME",datatype:"string",width:130},
            {columnname:"Inspection Status",dataname:"INS_STATUS",datatype:"string",width:220}
                    // {columnname:"Pickup Point",dataname:"PICKUP_POINT",datatype:"string",width:120},
			//{columnname:"Customer Vendor<br>Code",dataname:"CUSTOMER_VENDOR_CODE",datatype:"string",width:150},

			//{columnname:"Inspection Date &<br>Time",dataname:"INSPECTIONTIME",datatype:"string",width:150},
			//{columnname:"Truck Description",dataname:"TRUCK_DESC",datatype:"string",width:150},
			//{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:150},
			//{columnname:"Trailer Code",dataname:"TRAILER_CODE",datatype:"string",width:90},
		]
		helpOninspectionGridDtl=
		{
			title:"",
			id:"inspectionresultCache",
			detail:helpOninspectionGridFieldObj,
			removeAddDelete:true,
			visibleRow:12
		}
		helpGridSection = plf.addGrid(helpOninspectionGridDtl,this)
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
				"input":["strUserId"],
				"service":"CoreInspectionService",
				"methodName":"initInspectionAdviceSearchScrTS"
				//completed
				},
            {
			   "controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strInspectionNoFrom","strInspectionNoTo","strInspectionDateFrom","strInspectionDateTo","strTruckCode","strDriverCode","strStatus","strPickUpPoint","strCustomerVendorCode","strTrailerCode",
				"strRequestNo","strLoadNo","strCarrierCode","strVehicleCategory","strDriverLicenceNo","strDriverMobileNo","strRegNo"], 
				"service":"CoreInspectionService",
				"methodName":"fetchAllInspectionAdviceScrTS"
			//completed
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
							{"parent":"strTruckCode","child":"TRUCK_CODE"}
							
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
							{"parent":"strDriverCode","child":"DRIVER_CODE"}							
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
	
		{	"inspectionmaster": 
				{
					"dest":"journey_management.InspectionAdviceMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"INSPECTION_NO","dest":"strInspectionNo"}
							]
				},
				"inspectionmasters":
				{
					"dest":"journey_management.InspectionAdviceMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"INSPECTION_NO","dest":"strInspectionNo"}
							]
				},
				"PreInspection":
				{
					"dest":"journey_management.PreJourneyInspection",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"INSPECTION_NO","dest":"strInspectionNo"}
							]
				},
				"LoadInspection":
				{
					"dest":"journey_management.LoadInspection",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"INSPECTION_NO","dest":"strInspectionNo"}
							]
				},
				"ReInspection":
				{
					"dest":"journey_management.ReInspection",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"INSPECTION_NO","dest":"strInspectionNo"}
							]
				},
				"ins_InspAdvice":
				{
					"dest":"journey_management.InspectionAdviceMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
				
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
