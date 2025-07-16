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
Ext.define('CueTrans.view.inspection.InspectionHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
	//	var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
	    var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		mainpage.screenName = "Inspection Help";
		
		//Inspection Search Section Begins
		plf.columns=3
		var helpOninspectionHdrCollapse =plf.addColumnSection({title:"", collapsed: true});	//69997
		
		
		var helpOninspectionFormCtrl=							//69997
		[
			//plf.addText({"label":"Inspection No From",id:"strInspectionNoFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Inspection No To",id:"strInspectionNoTo","anywhereSearch":"true"}),
			plf.addText({"label":"Inspection No",id:"strInspectionNoFrom","anywhereSearch":"true"}),
			plf.addHlpText({"label":"Request No",id:"strRequestNo",hlpLinkID:"transreqno"},this),	
			plf.addHlpText({"label":"Load No",id:"strLoadNo",hlpLinkID:"LoadNo"},this),
			//plf.addHlpText({"label":"Truck Code",id:"strTruckCode",hlpLinkID:"truckno"},this),
			plf.addHlpText({"label":"Vehicle Regn No",id:"strRegNo",hlpLinkID:"truckno"},this),
			
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addDate({"label":"Date From",id:"strInspectionDateFrom"}),
		    plf.addDate({"label":"Date To",id:"strInspectionDateTo"}),
			plf.addHlpText({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"carrierno"},this),
			
			plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory"}),
			plf.addHlpText({"label":"Driver Name",id:"strDriverName",hlpLinkID:"drivercode"},this),
			plf.addText({"label":"Driver Licence No",id:"strDriverLicenceNo"}),
			plf.addText({"label":"Driver Mobile No",id:"strDriverMobileNo"}),
			
			plf.addCombo({"label":"Status",id:"strStatus"}),
			/*plf.addText({"label":"Ref Doc No",id:"strDocNo","anywhereSearch":"true"}),*/
			plf.addCombo({"label":"Carrier Type",id:"strCarrierType"}),
			plf.addText({"label":"Reporting Driver",id:"strReportingDriver"}),
			plf.addText({"label":"Reporting Vehicle",id:"strReportingVehicle"}),
			
			//plf.addHlpText({"label":"Trailer Code",id:"strTrailerCode",hlpLinkID:"trailerno"},this),
			//plf.addHlpText({"label":"Pickup Point",id:"strPickUpPoint",hlpLinkID:"pickuppoint"},this),
			
            plf.addBlank({}),
			//plf.addText({"label":"Customer Vendor Code",id:"strCustomerVendorCode"}),
			plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
		]
		
		helpOninspectionHdrCollapse.add(helpOninspectionFormCtrl);						//69997
		//Inspection Search Section Ends
		
		//Inspection Grid Section Begins
		var helpOninspectionGridFieldObj=												//69997
		[
			//{columnname:"Click here to launch the inspection advice screen.",linkId:"inspectionmaster",dataname:"INSPLINKID",width:10,imageURL:"resources/images/grid/Inspection/Inspection_Advice.png"},
			//{columnname:"Click here to launch the vehicle inspection screen.",linkId:"PreInspection",dataname:"PRELINKID",width:10,imageURL:"resources/images/grid/Inspection/Vehicle_Inspection.png"},
			//{columnname:"Click here to launch the reinspection screen.",linkId:"ReInspection",dataname:"RELINKID",width:10,imageURL:"resources/images/grid/Inspection/Re_Inspection.png"},
			//{columnname:"Click here to launch the load inspection screen.",linkId:"LoadInspection",dataname:"LOADLINKID",width:10,imageURL:"resources/images/grid/Inspection/Load_Inspection.png"},
			{columnname:"Inspection No",dataname:"INSPECTION_NO",datatype:"string",width:150,linkId:"NEXT_LINKID","linkType":"DYN","tooltip":"Click here to launch inspection details."},
			{columnname:"Link ID",dataname:"NEXT_LINKID",width:100,hidden:true},
            {columnname:"Request No",dataname:"REQUEST_NO",datatype:"string",width:150},
			{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:80},
			//  {columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",width:110},
			{columnname:"Load No",dataname:"WAYBILL_NO",datatype:"string",width:130},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:130},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:130},
			{columnname:"Vehicle Regn No",dataname:"TRUCK_CODE",datatype:"string",width:130},
			{columnname:"Driver Name",dataname:"DRIVER_CODE",datatype:"string",width:130},
			{columnname:"Driver<BR>Mobile No",dataname:"MOBILE_NO",datatype:"string",width:130},
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:130},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:130},
			{columnname:"Inspection Date<BR>& Time",dataname:"INS_DT_TIME",datatype:"string",width:130},
			{columnname:"Inspection Completed<BR>Datetime",dataname:"INS_LIC_DT",datatype:"string",width:130},
			{columnname:"Inspector Name",dataname:"INSPECTOR_NAME",datatype:"string",width:130},
            {columnname:"Inspection Status",dataname:"INS_STATUS",datatype:"string",width:220},
			{columnname:"Rejection Reason",dataname:"REJ_REASON",datatype:"string",width:100}
                    // {columnname:"Pickup Point",dataname:"PICKUP_POINT",datatype:"string",width:120},
			//{columnname:"Customer Vendor<br>Code",dataname:"CUSTOMER_VENDOR_CODE",datatype:"string",width:150},

			//{columnname:"Inspection Date &<br>Time",dataname:"INSPECTIONTIME",datatype:"string",width:150},
			//{columnname:"Truck Description",dataname:"TRUCK_DESC",datatype:"string",width:150},
			//{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:150},
			//{columnname:"Trailer Code",dataname:"TRAILER_CODE",datatype:"string",width:90},
		]
		var helpOninspectionGridDtl=															//69997
		{
			title:"Inspection Details",
			id:"inspectionresultCache",
			visibleRow:plf.helpVisibleRows,
			detail:helpOninspectionGridFieldObj,
			removeAddDelete:true
		}
		var helpGridSection = plf.addGrid(helpOninspectionGridDtl,this)					//69997
		mainpage.hlpSearchGridPtr = helpGridSection	
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
			"strRequestNo","strLoadNo","strCarrierCode","strVehicleCategory","strDriverLicenceNo","strDriverMobileNo",
			"strRegNo","strCarrierType","strReportingDriver","strReportingVehicle"],
			"service":"CoreInspectionsService",
			"methodName":"initInspAdvSrchScrTS"
			
			},
			{
		   "controlid":"btnSearch",
			"tasktype":"btnclick",
			"input":["strInspectionNoFrom","strInspectionNoTo","strInspectionDateFrom","strInspectionDateTo","strTruckCode",
			"strDriverCode","strStatus","strPickUpPoint","strCustomerVendorCode","strTrailerCode","strDateType","strDriverName",
			"strRequestNo","strLoadNo","strCarrierCode","strVehicleCategory","strDriverLicenceNo","strDriverMobileNo",
			"strRegNo","strCarrierType","strReportingDriver","strReportingVehicle"], 
			"service":"CoreInspectionsService",
			"methodName":"fetchAllInspAdvScrTS"
		
			}		
		];
		
		mainpage.hlpLinks=
		{
			"truckcode":
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
			"DriverCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strDriverCode","child":"DRIVER_CODE"}
							
							]
				}
				
			
				
				
		}
		//Event Handlers Mapping Ends
			
		//Generate Screen Section
		
		/*mainpage.screenLinks=
		{
			"inspectionmaster":
				{
					"dest":"journey_management.InspectionAdviceMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"INSPECTION_NO","dest":"strInspectionNo"}
							]
				}
		}*/
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
