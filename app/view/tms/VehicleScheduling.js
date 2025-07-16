/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.6															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	    Raj              4/2/2016     67607             Update for Ref doc no.		.
1.0.2	 Manibharathi		05/02/2016    69997             Addition of var   
1.0.3      Steffie		    14/03/2016	  71027   
1.0.4      divya            12/05/2016    72417		   
1.0.5      Steffie          14/07/2016    73395     
1.0.6      shekar           18/07/2016    73364       Loading Point, Unload Point  and Load description                            
************************************************************************************************/
Ext.define('CueTrans.view.tms.VehicleScheduling', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Vehicle Scheduling";
		mainpage.toolbarSectionFlag = true;
		mainpage.toolbarLinks=
		[
			//{"name":"Scheduling Report","linkid":"scheduling_report","tooltip":"Click here for Scheduling Report."}
		]
		//mainpage.liveScreenFlag=true;
		//mainpage.liveScreenFlag=true;				
		
		plf.columns = 3
		//VehSchHdrColumn = plf.addColumnSection({});
		var VehSchHdrColumn = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSrch"},this);
		if(plf.defaultLayout==4)
		{
			plf.columns = 4
			
			var VehSchHdrCtrl=
				[  
				plf.addText({"label":"Trip No",id:"strTripNo","anywhereSearch":"true"}),	
				plf.addText({"label":"Load No",id:"strLoadNo","anywhereSearch":"true"}),
				plf.addText({"label":"Request No",id:"strReqNo","anywhereSearch":"true"}),
				
				plf.addCombo({"label":"Region From",id:"strRegionFrom"}),
				plf.addCombo({"label":"Region To",id:"strRegionTo"}),
				plf.addCombo({"label":"Origin",id:"strOrigin"}),
				plf.addCombo({"label":"Destination",id:"strDestination"}),
				/*
				plf.addText({"label":"Loading Point",id:"strLoadAtt","anywhereSearch":"true"}),
				plf.addText({"label":"Unloading Point",id:"strDelAtt","anywhereSearch":"true"}),
				plf.addText({"label":"Load Description",id:"strLoadDesc","anywhereSearch":"true"}),
				*/
				plf.addCombo({"label":"Date Type",id:"strDateType"}),
				plf.addDate({"label":"Date From",id:"dtDepDtFrom"}),
				plf.addDate({"label":"Date To",id:"dtDepDtTo"}),
				plf.addText({"label":"Vehicle Regn No",id:"strVehNo"}),
				plf.addCombo({"label":"Vehicle Category",id:"strVehCat"}),
				
				plf.addHlpText({"label":"Carrier",id:"strCarrier",hlpLinkID:"carrierNoHelp"},this),
				plf.addText({"label":"Driver Name",id:"strDriverName"}),
				/*plf.addText({"label":"Ref Doc No",id:"strDocNo","anywhereSearch":"true"})*/
				plf.addText({"label":"Old Driver",id:"strRepDriverCode"}),
				plf.addText({"label":"Old Vehicle",id:"strRepVehicleCode"}),
				plf.addText({"label":"Ref Doc No",id:"strDocNo","anywhereSearch":"true"})//Added by raj for ref doc 67607
				/*//plf.addCombo({"label":"Schedule For",id:"strSchFor"}),
				plf.addBlank(),
				plf.addButton({"label":"Search",id:"btnSrch"}),
				plf.addBlank()
				*/
				]
		}
		
		else
		{    
				VehSchHdrCtrl=
				[ 
				plf.addText({"label":"Trip No",id:"strTripNo","anywhereSearch":"true"}),	
				plf.addText({"label":"Load No",id:"strLoadNo","anywhereSearch":"true"}),
				plf.addText({"label":"Request No",id:"strReqNo","anywhereSearch":"true"}),
				
				
				plf.addCombo({"label":"Region From",id:"strRegionFrom"}),
				plf.addCombo({"label":"Region To",id:"strRegionTo"}),
				plf.addCombo({"label":"Origin",id:"strOrigin"}),
				
				plf.addCombo({"label":"Destination",id:"strDestination"}),
				/*
				plf.addText({"label":"Loading Point",id:"strLoadAtt","anywhereSearch":"true"}),
				plf.addText({"label":"Unloading Point",id:"strDelAtt","anywhereSearch":"true"}),
				plf.addText({"label":"Load Description",id:"strLoadDesc","anywhereSearch":"true"}),
				*/
				plf.addCombo({"label":"Date Type",id:"strDateType"}),
				plf.addDate({"label":"Date From",id:"dtDepDtFrom"}),
				
				plf.addDate({"label":"Date To",id:"dtDepDtTo"}),				
				plf.addText({"label":"Vehicle Registration Number",id:"strVehNo"}),
				plf.addCombo({"label":"Vehicle Category",id:"strVehCat"}),
				
				plf.addHlpText({"label":"Carrier",id:"strCarrier",hlpLinkID:"carrierNoHelp"},this),
				plf.addText({"label":"Driver Name",id:"strDriverName"}),
				//plf.addText({"label":"Ref Doc No",id:"strDocNo","anywhereSearch":"true"})
				plf.addText({"label":"Old Driver",id:"strRepDriverCode"}),
				plf.addText({"label":"Old Vehicle",id:"strRepVehicleCode"}),
				plf.addText({"label":"Ref Doc No",id:"strDocNo","anywhereSearch":"true"})//Added by raj  for ref doc 67607
				/*plf.addCombo({"label":"Schedule For",id:"strSchFor"})
				plf.addBlank(),
			
				plf.addBlank(),
				plf.addButton({"label":"Search",id:"btnSrch"}),
				plf.addBlank()
				*/
				]
			
		}	
		VehSchHdrColumn.add(VehSchHdrCtrl)
		
		
		var vehschgrid1Obj=
		[   
			{columnname:"Click here to launch the oto roster.",dataname:"OTO_LINK_ID",width:70,linkId:"OTORosterScr",imageURL:"resources/images/grid/Schedule/oto.png"},
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:100},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:80},
			{columnname:"Request No",dataname:"REQUEST_NO",datatype:"string",width:80},
			{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:80},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:80},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:80},
			
			{columnname:"Loading Point",dataname:"LOAD_AT",datatype:"string",width:80}, //73364
			{columnname:"Unloading Point",dataname:"DELIVERY_AT",datatype:"string",width:80},//73364
			{columnname:"Load Description",dataname:"LOAD_DESCRIPTION",datatype:"string",width:80},//73364
			
			{columnname:"Departure Date",dataname:"DEP_DATE",datatype:"string",width:100},
			{columnname:"Contractual Delivery Date",dataname:"DELV_DATE",datatype:"string",width:150},
			{columnname:"Vehicle Category",dataname:"VEH_CAT",datatype:"string",width:100},			
			{columnname:"Vehicle Code",dataname:"VEHICLE_CODE",datatype:"string",width:100,editControl:"textbox",helpid:'vehiclehelp',"onenter":"G1vehicle_onenter"},
			{columnname:"Vehicle Reg No",dataname:"VEH_REG_NO",datatype:"string",width:100},
			{columnname:"Carrier Code",dataname:"OWNER_CODE_3PL",datatype:"string",editControl:"textbox",width:100,helpid:'carrierhelp',"onenter":"G1carrier_onenter"},
			{columnname:"Carrier Phone No",dataname:"PHONE_1",datatype:"string",width:105},
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:100,editControl:"textbox",helpid:'driverhelp',"onenter":"G1driver_onenter"},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:100},
			{columnname:"Driver Phone No",dataname:"PHONE_NO",datatype:"string",width:100},
			
			{columnname:"Inspection Required",dataname:"INS_REQ",datatype:"string",width:120,editControl:"combo",storeId:'strInsReq'},
			{columnname:"Inspection Location",dataname:"LOC_CODE",datatype:"string",width:120,editControl:"textbox",helpid:'locationhelp'},
			{columnname:"Inspection Date",dataname:"INSPECTION_DATE",datatype:"string",width:120,editControl:"date"},
			{columnname:"Inspection Time",dataname:"INSPECTION_TIME",datatype:"string",width:120,editControl:"time"},
			//{columnname:"Status",dataname:"STATUS",datatype:"string",width:80},
		]
		vehschdGridDtl=
		{
			title:"",
			id:"vehschgrid1",
			detail:vehschgrid1Obj,
			visibleRow:10,
			removeAddDelete:true
	   }
		//VehSchHdrColumn.add(VehSchHdrCtrl)
		plf.columns=4
		var AllVehHdrCol = plf.addColumnSection({title:"Schedule Trip"});
		var AllVehHdrCtrl=
		[	
			plf.addBlank({}),
			plf.addButton({"label":"Allocate Vehicle",id:"btnAllVehTrp",tooltip:"Click here to allocate Vehicle."})
				
		]
		var tripScheduleSection = plf.addGrid(vehschdGridDtl,mainpage)
		AllVehHdrCol.add(tripScheduleSection)	
        AllVehHdrCol.add(AllVehHdrCtrl)	
		
		//		tripScheduleSection.add(AllVehHdrCol);		
		var vehSchGrid2Obj=
		[   
			{columnname:"Click here to launch the oto roster.",dataname:"OTO_LINK_ID",width:70,linkId:"OTOLoadRosterScr",imageURL:"resources/images/grid/Schedule/oto.png"},
			{columnname:"Click here to launch the allocate trip.",dataname:"AllocTrip_LINK_ID",width:70,linkId:"AllocTripScr",imageURL:"resources/images/grid/Schedule/oto.png"},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:80},
			{columnname:"Departure Date",dataname:"DEP_DATE",datatype:"string",width:120},
			
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100,hidden:true},
			{columnname:"Request No",dataname:"REQUEST_NO",datatype:"string",width:80},
			{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:80},
			{columnname:"Vendor Name",dataname:"VENDOR_NAME",datatype:"string",width:120},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:120},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:80},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:80},
			
			{columnname:"Loading Point",dataname:"LOAD_AT",datatype:"string",width:150},            //73364
			{columnname:"Unloading Point",dataname:"DELIVERY_AT",datatype:"string",width:150},      //73364
			{columnname:"Load Description",dataname:"LOAD_DESCRIPTION",datatype:"string",width:150}, //73364
			
			
			{columnname:"Contractual Delivery Date",dataname:"DELV_DATE",datatype:"string",width:150},
			
			{columnname:"Quantity",dataname:"QUANTITY",width:100,inputFormat:"Number"},
			{columnname:"Load Weight",dataname:"LOAD_WEIGHT",width:100,inputFormat:"Number"},
			
			{columnname:"Vehicle Category",dataname:"VEH_CAT",datatype:"string",width:110},
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:100,hidden:true},
			{columnname:"Vehicle Code",dataname:"VEHICLE_CODE",datatype:"string",width:100,editControl:"textbox",helpid:'vehicleshelp',"onenter":"G1vehicle_onenter"},
			{columnname:"Vehicle Reg No",dataname:"VEH_REG_NO",datatype:"string",width:100},
			{columnname:"Carrier Code",dataname:"OWNER_CODE_3PL",datatype:"string",editControl:"textbox",width:100,helpid:'carriershelp',"onenter":"G1carrier_onenter"},
			{columnname:"Carrier Phone No",dataname:"PHONE_1",datatype:"string",width:105},
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:100,editControl:"textbox",helpid:'drivershelp',"onenter":"G1driver_onenter"},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:100},
			{columnname:"Driver Phone No",dataname:"PHONE_NO",datatype:"string",width:100},			
			//{columnname:"Inspection Req",dataname:"INS_REQ",datatype:"string",width:120,editControl:"combo",storeId:'strInspReq'},
			{columnname:"Inspection Required",dataname:"INS_REQ",datatype:"string",width:120,editControl:"combo",storeId:'strInspReqsch'},
			{columnname:"Inspection Location",dataname:"LOC_CODE",datatype:"string",width:120,editControl:"textbox",helpid:'locationshelp'},
			{columnname:"Inspection Date",dataname:"INSPECTION_DATE",datatype:"string",width:120,editControl:"date"},
			{columnname:"Inspection Time",dataname:"INSPECTION_TIME",datatype:"string",width:120,editControl:"time"},
			
		]
		vehschdGridDt2=
		{
			title:"",
			id:"vehschgrid2",
			detail:vehSchGrid2Obj,
			visibleRow:10,
			removeAddDelete:true,
			selRowProcess:'Y'
	   }
		//vehSchdGridSection2 = plf.addGrid(vehschdGridDt2,this)
		plf.columns=4
		var AllVehLdHdrCol = plf.addColumnSection({title:"Schedule Load"});
		AllVehLdHdrCtrl=
		[	
			plf.addBlank({}),
			plf.addButton({"label":"Allocate Vehicle",id:"btnAllVehLd",tooltip:"Click here to allocate Vehicle."})
				
		]
		var loadScheduleSection = plf.addGrid(vehschdGridDt2,mainpage)
		AllVehLdHdrCol.add(loadScheduleSection)	
        AllVehLdHdrCol.add(AllVehLdHdrCtrl)	
		
		
		var vehSchGrid3Obj=
		[   
			{columnname:"OTO Roster",dataname:"",datatype:"string",width:100},
			{columnname:"Suggest",dataname:"",datatype:"string",width:80},
			{columnname:"Service ID",dataname:"",datatype:"string",width:80},
			{columnname:"Request No",dataname:"",datatype:"string",width:80},
			{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:80},
			{columnname:"Origin",dataname:"",datatype:"string",width:80},
			{columnname:"Destination",dataname:"",datatype:"string",width:80},
			{columnname:"Departure Date",dataname:"",datatype:"string",width:80},
			{columnname:"Vehicle Category",dataname:"",datatype:"string",width:50},			
			{columnname:"Trip No",dataname:"",datatype:"string",width:100},
			{columnname:"Vehicle Code",dataname:"",datatype:"string",width:80,editControl:"textbox",helpid:'vehicleshelp'},
			{columnname:"Vehicle RegNo",dataname:"",datatype:"string",width:80},
			{columnname:"Carrier Code",dataname:"OWNER_CODE_3PL",datatype:"string",editControl:"textbox",width:80,helpid:'carrierhelp'},
			{columnname:"Carrier Phone No",dataname:"",datatype:"string",width:80},
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:80,editControl:"textbox",helpid:'drivershelp'},
			{columnname:"Driver Name",dataname:"",datatype:"string",width:80},
			{columnname:"Driver PhoneNo",dataname:"",datatype:"string",width:80},
			{columnname:"Inspection Location",dataname:"LOC_CODE",datatype:"string",width:80,editControl:"textbox",helpid:'locationhelp'},
			{columnname:"Inspection Date",dataname:"",datatype:"string",width:80,editControl:"date"},
			{columnname:"Status",dataname:"",datatype:"string",width:80},
		]
		vehschdGridDt3=
		{
			title:"",
			id:"vehschgrid3",
			detail:vehSchGrid3Obj,
			visibleRow:5,
			removeAddDelete:true
	   }
		var vehSchdGridSection3 = plf.addGrid(vehschdGridDt3,mainpage)
		/*Allocate Trip*/
		var allocateTrip=
		[   			
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:120},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:80},
			//{columnname:"Request No",dataname:"REQUEST_NO",datatype:"string",width:80},
			{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:80},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:80},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:80},
			/*
			{columnname:"Loading Point",dataname:"LOAD_AT",datatype:"string",width:80},
			{columnname:"Unloading Point",dataname:"DELIVERY_AT",datatype:"string",width:80},
			{columnname:"Load Description",dataname:"LOAD_DESCRIPTION",datatype:"string",width:80},
			*/
			{columnname:"Departure Date",dataname:"DEP_DATE",datatype:"string",width:100},
			{columnname:"Contractual Delivery Date",dataname:"DELV_DATE",datatype:"string",width:150},
			{columnname:"Vehicle Category",dataname:"VEH_CAT",datatype:"string",width:100},
			
			{columnname:"Vehicle Code",dataname:"VEHICLE_CODE",datatype:"string",width:100},
			{columnname:"Vehicle Reg No",dataname:"VEH_REG_NO",datatype:"string",width:100},
			{columnname:"Base Location",dataname:"BASE_LOCATION",datatype:"string",width:100},//73395 changes for base location
			{columnname:"Carrier Code",dataname:"OWNER_CODE_3PL",datatype:"string",width:100},
			{columnname:"Carrier Name",dataname:"OWNER_NAME_3PL",datatype:"string",width:100},
			{columnname:"Carrier Phone No",dataname:"PHONE_1",datatype:"string",width:105},
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:100},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:100},
			{columnname:"Driver Phone No",dataname:"PHONE_NO",datatype:"string",width:100},
			//{columnname:"Old Driver",dataname:"REPORTING_DRIVER",datatype:"string",width:130},
			//{columnname:"Old Vehicle",dataname:"REPORTING_VEHICLE",datatype:"string",width:130},
			{columnname:"Inspection Required",dataname:"INS_REQ",datatype:"string",width:120},
			{columnname:"Inspection Location",dataname:"LOC_CODE",datatype:"string",width:120},
			{columnname:"Inspection Date",dataname:"INSPECTION_DATE",datatype:"string",width:120},
			{columnname:"Inspection Time",dataname:"INSPECTION_TIME",datatype:"string",width:120},
			
		]
		allocateTrip_dtl=
		{
			title:"Allocated Trip",
			id:"allocateTrip_Grid",
			detail:allocateTrip,
			visibleRow:10,
			removeAddDelete:true
	   }
	   var AllocateTrip_section = plf.addGrid(allocateTrip_dtl,mainpage)
	   /*Allocate Trip*/
	   
	   /* Service Section Starts here*/
	   var scheduleServiceCtrl=
		[   
		{columnname:"Click here to launch the oto roster.",dataname:"SER_OTO_LINK_ID",width:70,linkId:"OTOServiceRosterScr",imageURL:"resources/images/grid/Schedule/oto.png"},			
		{columnname:"Service Id",dataname:"SERVICE_ID",datatype:"string",width:100},
		{columnname:"Status",dataname:"STATUS",datatype:"string",width:100},
		//{columnname:"Service Req No",dataname:"SER_REQUEST_NO",datatype:"string",width:100},
		{columnname:"Transport Plan No",dataname:"SER_REQUEST_NO",datatype:"string",width:100},
		{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:80},
		{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:80},
		{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:80},
		{columnname:"Required Date",dataname:"REQ_DATE",datatype:"string",width:100},
		{columnname:"Vehicle Category",dataname:"VEH_CAT",datatype:"string",width:110},
		{columnname:"Carrier Code",dataname:"OWNER_CODE_3PL",datatype:"string",editControl:"textbox",width:100,helpid:'carrierSerhelp',"onenter":"G1carrier_onenter"},
		{columnname:"Carrier Phone No",dataname:"PHONE_1",datatype:"string",width:105},
		{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:100},
		{columnname:"Vehicle Code",dataname:"VEHICLE_CODE",datatype:"string",width:100,editControl:"textbox",helpid:'vehicleSerhelp',"onenter":"G1vehicle_onenter"},
		{columnname:"Vehicle Reg No",dataname:"VEH_REG_NO",datatype:"string",width:100},
		{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:100,editControl:"textbox",helpid:'driverSerhelp',"onenter":"G1driver_onenter"},
		{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:100},
		{columnname:"Driver Phone No",dataname:"PHONE_NO",datatype:"string",width:100},
		{columnname:"Inspection Required",dataname:"INS_REQ",datatype:"string",width:120,editControl:"combo",storeId:'strServInspReq'},
		{columnname:"Inspection Location",dataname:"LOC_CODE",datatype:"string",width:120,editControl:"textbox",helpid:'locationSerhelp'},
		{columnname:"Inspection Date",dataname:"INSPECTION_DATE",datatype:"string",width:120,editControl:"date"},
		{columnname:"Inspection Time",dataname:"INSPECTION_TIME",datatype:"string",width:120,editControl:"textbox"},
		
		]
		var scheduleServiceGrid=
		{
			title:"",
			id:"vehschService",
			detail:scheduleServiceCtrl,
			visibleRow:10,
			removeAddDelete:true
		}
		plf.columns=4
		var scheduleServiceSection = plf.addColumnSection({title:"Schedule Service"});
		var AllocBtnService=
		[	
			plf.addBlank({}),
			plf.addButton({"label":"Allocate Vehicle",id:"btnAllVehService",tooltip:"Click here to allocate Vehicle."})
				
		]
		var scheduleServiceGridSection = plf.addGrid(scheduleServiceGrid,mainpage)
		scheduleServiceSection.add(scheduleServiceGridSection)	
		scheduleServiceSection.add(AllocBtnService)	
		
		var scheduleServiceToTripCtrl=
		[   
		{columnname:"Click here to launch the oto roster.",dataname:"SER_OTO_LINK_ID",width:70,linkId:"OTOServiceRosterScr1",imageURL:"resources/images/grid/Schedule/oto.png"},			
		{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:100},
		{columnname:"Status",dataname:"STATUS",datatype:"string",width:100},
		{columnname:"Service Id",dataname:"SERVICE_ID",datatype:"string",width:100},
		//{columnname:"Service Req No",dataname:"SER_REQUEST_NO",datatype:"string",width:100},
		{columnname:"Transport Plan No",dataname:"SER_REQUEST_NO",datatype:"string",width:100},
		{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:80},
		{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:80},
		{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:80},
		{columnname:"Required Date",dataname:"REQ_DATE",datatype:"string",width:100},
		{columnname:"Vehicle Category",dataname:"VEH_CAT",datatype:"string",width:110},
		{columnname:"Carrier Code",dataname:"OWNER_CODE_3PL",datatype:"string",editControl:"textbox",width:100,helpid:'carrierSer1help',"onenter":"G1carrier_onenter"},
		{columnname:"Carrier Phone No",dataname:"PHONE_1",datatype:"string",width:105},		
		{columnname:"Vehicle Code",dataname:"VEHICLE_CODE",datatype:"string",width:100,editControl:"textbox",helpid:'vehicleSer1help',"onenter":"G1vehicle_onenter"},
		{columnname:"Vehicle Reg No",dataname:"VEH_REG_NO",datatype:"string",width:100},
		{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:100,editControl:"textbox",helpid:'driverSer1help',"onenter":"G1driver_onenter"},
		{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:100},
		{columnname:"Driver Phone No",dataname:"PHONE_NO",datatype:"string",width:100},
		{columnname:"Inspection Required",dataname:"INS_REQ",datatype:"string",width:120,editControl:"combo",storeId:'strServInsReq'},
		{columnname:"Inspection Location",dataname:"LOC_CODE",datatype:"string",width:120,editControl:"textbox",helpid:'locationSer1help'},
		{columnname:"Inspection Date",dataname:"INSPECTION_DATE",datatype:"string",width:120,editControl:"date"},
		{columnname:"Inspection Time",dataname:"INSPECTION_TIME",datatype:"string",width:120,editControl:"textbox"},
		
		]
		var scheduleServiceToTripGrid=
		{
			title:"",
			id:"vehschServiceToTrip",
			detail:scheduleServiceToTripCtrl,
			visibleRow:10,
			removeAddDelete:true
		}
		plf.columns=4
		var scheduleServiceToTripSection = plf.addColumnSection({title:"Schedule Service to Trip"});
		var AllocBtnServiceToTrip=
		[	
			plf.addBlank({}),
			plf.addButton({"label":"Allocate Vehicle",id:"btnAllVehServiceToTrip",tooltip:"Click here to allocate Vehicle."})
				
		]
		var scheduleServiceToTripGridSection = plf.addGrid(scheduleServiceToTripGrid,mainpage)
		scheduleServiceToTripSection.add(scheduleServiceToTripGridSection)	
		scheduleServiceToTripSection.add(AllocBtnServiceToTrip)	
		
		var scheduleAllocServiceToTripCtrl=
		[   		
		{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:100},
		{columnname:"Status",dataname:"STATUS",datatype:"string",width:140},
		{columnname:"Service Id",dataname:"SERVICE_ID",datatype:"string",width:100},
		//{columnname:"Service Req No",dataname:"SER_REQUEST_NO",datatype:"string",width:100},
		{columnname:"Transport Plan No",dataname:"SER_REQUEST_NO",datatype:"string",width:100},
		{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:80},
		{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:80},
		{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:80},
		//{columnname:"Required Date",dataname:"REQ_DATE",datatype:"string",width:100},
		{columnname:"Departure Date",dataname:"DEP_DATE",datatype:"string",width:100},
		{columnname:"Vehicle Category",dataname:"VEH_CAT",datatype:"string",width:110},
		{columnname:"Carrier Code",dataname:"OWNER_CODE_3PL",datatype:"string",width:100},
		{columnname:"Carrier Name",dataname:"OWNER_NAME_3PL",datatype:"string",width:100},
		{columnname:"Carrier Phone No",dataname:"PHONE_1",datatype:"string",width:105},		
		{columnname:"Vehicle Code",dataname:"VEHICLE_CODE",datatype:"string",width:100,editControl:"textbox",helpid:'vehicleshelp',"onenter":"G1vehicle_onenter"},
		{columnname:"Vehicle Reg No",dataname:"VEH_REG_NO",datatype:"string",width:100},
		{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:100,editControl:"textbox",helpid:'drivershelp',"onenter":"G1driver_onenter"},
		{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:100},
		{columnname:"Driver Phone No",dataname:"PHONE_NO",datatype:"string",width:100},
		{columnname:"Inspection Required",dataname:"INS_REQ",datatype:"string",width:120},
		{columnname:"Inspection Location",dataname:"LOC_CODE",datatype:"string",width:120},
		{columnname:"Inspection Date",dataname:"INSPECTION_DATE",datatype:"string",width:120},
		{columnname:"Inspection Time",dataname:"INSPECTION_TIME",datatype:"string",width:120},
		
		]
		var scheduleAllocServiceToTripGrid=
		{
			title:"",
			id:"vehschAllocServiceToTrip",
			detail:scheduleAllocServiceToTripCtrl,
			visibleRow:10,
			removeAddDelete:true
		}
		plf.columns=4
		var scheduleAllocServiceToTripSection = plf.addColumnSection({title:"Allocated Service to Trip"});
		
		var scheduleAllocServiceToTripGridSection = plf.addGrid(scheduleAllocServiceToTripGrid,mainpage)
		scheduleAllocServiceToTripSection.add(scheduleAllocServiceToTripGridSection)	
		
		
		 /* Service Section ends here*/  
	   /*Local load section start here*/	
		var localLoadvehSchGridObj=
		[   
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:80},
			{columnname:"Departure Date",dataname:"DEP_DATE",datatype:"string",width:120},
			
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100,hidden:true},
			{columnname:"Request No",dataname:"REQUEST_NO",datatype:"string",width:80},
			{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:80},
			{columnname:"Vendor Name",dataname:"VENDOR_NAME",datatype:"string",width:120},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:120},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:80},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:80},
			
			{columnname:"Loading Point",dataname:"LOAD_AT",datatype:"string",width:150},           
			{columnname:"Unloading Point",dataname:"DELIVERY_AT",datatype:"string",width:150},     
			{columnname:"Load Description",dataname:"LOAD_DESCRIPTION",datatype:"string",width:150}, 
			
			
			{columnname:"Contractual Delivery Date",dataname:"DELV_DATE",datatype:"string",width:150},
			{columnname:"Vehicle Category",dataname:"VEH_CAT",datatype:"string",width:110},
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:100,hidden:true},
			{columnname:"Vehicle Code",dataname:"VEHICLE_CODE",datatype:"string",width:100,editControl:"textbox",helpid:'Localvehicleshelp',"onenter":"G1vehicle_onenter"},
			{columnname:"Vehicle Reg No",dataname:"VEH_REG_NO",datatype:"string",width:100},
			{columnname:"Carrier Code",dataname:"OWNER_CODE_3PL",datatype:"string",editControl:"textbox",width:100,helpid:'Localcarriershelp',"onenter":"G1carrier_onenter"},
			//{columnname:"Carrier Phone No",dataname:"PHONE_1",datatype:"string",width:105},
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:100,editControl:"textbox",helpid:'drivershelp',"onenter":"G1driver_onenter",hidden:true},
			//{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:100},
			//{columnname:"Driver Phone No",dataname:"PHONE_NO",datatype:"string",width:100},			
			{columnname:"Inspection Required",dataname:"INS_REQ",datatype:"string",width:120,editControl:"combo",storeId:'strInspReq'},
			{columnname:"Inspection Location",dataname:"LOC_CODE",datatype:"string",width:120,editControl:"textbox",helpid:'locationsLocalhelp',hidden:true},
			{columnname:"Inspection Date",dataname:"INSPECTION_DATE",datatype:"string",width:120,editControl:"date",hidden:true},
			{columnname:"Inspection Time",dataname:"INSPECTION_TIME",datatype:"string",width:120,editControl:"textbox",hidden:true},
			{columnname:"Journey Required",dataname:"JP_REQ",datatype:"string",width:120,editControl:"combo",storeId:'strJpReq',hidden:true},
			{columnname:"Special Trailer",dataname:"SPECIAL_TRAILER",datatype:"string",width:150,editControl:"combo",storeId:'strSpecialTrailer'}
		
		]
		localLoadvehschdGridDt=
		{
			title:"",
			id:"LocalLoadRoster",
			detail:localLoadvehSchGridObj,
			visibleRow:10,
			removeAddDelete:true,
			selRowProcess:'Y'
	   }
		//vehSchdGridSection2 = plf.addGrid(localLoadvehschdGridDt,this)
		plf.columns=4
		var localLoadVehAllHdrCol = plf.addColumnSection({title:"Local Loads"});
		localLoadVehVehHdrCtrl=
		[	
			plf.addBlank({}),
			plf.addButton({"label":"Allocate Vehicle",id:"btnAllVehLocalLd",tooltip:"Click here to allocate Vehicle."})
				
		]
		var localLoadScheduleSection = plf.addGrid(localLoadvehschdGridDt,mainpage)
		localLoadVehAllHdrCol.add(localLoadScheduleSection)	
        localLoadVehAllHdrCol.add(localLoadVehVehHdrCtrl)	
		/*Local load section end here*/
		var baseTab = plf.addTabSection({ tabs:[
												AllVehLdHdrCol,AllVehHdrCol,AllocateTrip_section,localLoadVehAllHdrCol/*,
												scheduleServiceSection,scheduleAllocServiceToTripSection,
												scheduleServiceToTripSection*/
												]});
		
		mainpage.ptrMainSection.add(VehSchHdrColumn) 
		mainpage.ptrMainSection.add(baseTab) 
		
		//mainpage.ptrMainSection.add(AllVehHdrCol) 
		//mainpage.ptrMainSection.add(AllVehLdHdrCol) 
		//mainpage.ptrMainSection.add(vehSchdGridSection3) 
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			
				{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"VEHSCHCoreVehSchServiceTS",
				"methodName":"initVehSchBulkTS"
				},
				{       
				"controlid":"btnAllVehTrp",
				"tasktype":"btnclick",
				"input":["vehschgrid1"],
              	"service":"VEHSCHCoreVehSchServiceTS",
				"methodName":"allocateVehSchTS"				
				},
				{       
				"controlid":"btnAllVehLd",
				"tasktype":"btnclick",
				"input":["vehschgrid2"],
		        "service":"VEHSCHCoreVehSchServiceTS",
				"methodName":"allocateLdVehSchTS"				
				},
				{       
				"controlid":"btnAllVehService",
				"tasktype":"btnclick",
				"input":["vehschService"],
		        "service":"VEHSCHCoreVehSchServiceTS",
				"methodName":"allocateSerVehSchTS"				
				},
				{       
				"controlid":"btnAllVehServiceToTrip",
				"tasktype":"btnclick",
				"input":["vehschServiceToTrip"],
              	"service":"VEHSCHCoreVehSchServiceTS",
				"methodName":"allocateVehSerSchTS"				
				},
				{       
				"controlid":"btnSrch",
				"tasktype":"btnclick",
				"input":["strTripNo","strLoadNo","strReqNo","strDateType","strRegionFrom","strRegionTo","strRepDriverCode","strRepVehicleCode",
						"strOrigin","strDestination","dtDepDtFrom","dtDepDtTo","strVehCat","strSchFor","strVehNo","strCarrier","strDriverName","strDocNo"],
		        "service":"VEHSCHCoreVehSchServiceTS",
				"methodName":"searchTrpLdVehSchTS"
				},
				{
				"grideventid":"G1carrier_onenter",
				"tasktype":"gridonenter",
				"input":["OWNER_CODE_3PL"],
				"service":"VEHSCHCoreVehSchServiceTS",
				"methodName":"fetchG1CarrTS"
				},
				{
				"grideventid":"G1vehicle_onenter",
				"tasktype":"gridonenter",
				"input":["VEHICLE_CODE"],
				"service":"VEHSCHCoreVehSchServiceTS",
				"methodName":"fetchG1VehTS"
				},
				{
				"grideventid":"G1driver_onenter",
				"tasktype":"gridonenter",
				"input":["DRIVER_CODE"],
				"service":"VEHSCHCoreVehSchServiceTS",
				"methodName":"fetchG1DrvTS"
				},	
                {       
				"controlid":"btnAllVehLocalLd",
				"tasktype":"btnclick",
				"input":["LocalLoadRoster"],
		        "service":"VEHSCHCoreVehSchServiceTS",
				"methodName":"allocateLocalLdVehSchTS"				
				},				
				{
					"tasktype":"proto",
					"filename":"peoplelogistics/VehicleSch.json"
				}	
		]
		mainpage.hlpLinks=
		{		
				"vehiclehelp":
				{
					"hlpType":"grid",
					"gridID":"vehschgrid1",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"VEHICLE_AC","child":"strContext"}
						   ],
					"receive":[
					{"parent":"VEHICLE_CODE","child":"TRUCK_CODE"},
					{"parent":"VEH_REG_NO","child":"TRUCK_REG_NO"},
					{"parent":"DRIVER_CODE","child":"DRIVER_CODE"},
					{"parent":"DRIVER_NAME","child":"DRIVER_NAME"},					
					{"parent":"OWNER_CODE_3PL","child":"CARRIER_CODE"}
						]
				},
				"vehicleshelp":
				{
					"hlpType":"grid",
					"gridID":"vehschgrid2",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							/*{"parent":"OWNER_CODE_3PL","child":"strTruckOwnerCode"},*/
							{"direct":"VEHICLE_AC","child":"strContext"}
						   ],
					"receive":[
					{"parent":"VEHICLE_CODE","child":"TRUCK_CODE"},
					{"parent":"VEH_REG_NO","child":"TRUCK_REG_NO"},
					{"parent":"DRIVER_CODE","child":"DRIVER_CODE"},
					{"parent":"DRIVER_NAME","child":"DRIVER_NAME"},					
					{"parent":"OWNER_CODE_3PL","child":"CARRIER_CODE"}
						]
				},
				"Localvehicleshelp":
				{
					"hlpType":"grid",
					"gridID":"LocalLoadRoster",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							/*{"parent":"OWNER_CODE_3PL","child":"strTruckOwnerCode"},*/
							{"direct":"VEHICLE_AC","child":"strContext"}
						   ],
					"receive":[
					{"parent":"VEHICLE_CODE","child":"TRUCK_CODE"},
					{"parent":"VEH_REG_NO","child":"TRUCK_REG_NO"},
					{"parent":"DRIVER_CODE","child":"DRIVER_CODE"},
					{"parent":"DRIVER_NAME","child":"DRIVER_NAME"},					
					{"parent":"OWNER_CODE_3PL","child":"CARRIER_CODE"}
						]
				},
				"vehicleSerhelp":
				{
					"hlpType":"grid",
					"gridID":"vehschService",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"VEHICLE_AC","child":"strContext"}
						   ],
					"receive":[
					{"parent":"VEHICLE_CODE","child":"TRUCK_CODE"},
					{"parent":"VEH_REG_NO","child":"TRUCK_REG_NO"}
						]
				},
				"vehicleSer1help":
				{
					"hlpType":"grid",
					"gridID":"vehschServiceToTrip",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"VEHICLE_AC","child":"strContext"}
						   ],
					"receive":[
					{"parent":"VEHICLE_CODE","child":"TRUCK_CODE"},
					{"parent":"VEH_REG_NO","child":"TRUCK_REG_NO"}
						]
				},
				"driverhelp":
				{
					"hlpType":"grid",
					"gridID":"vehschgrid1",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					{"parent":"DRIVER_CODE","child":"DRIVER_CODE"},
					{"parent":"DRIVER_NAME","child":"DRIVER_NAME"},
					{"parent":"PHONE_NO","child":"PHONE_NO"}
					
					
						]
				},
				"drivershelp":
				{
					"hlpType":"grid",
					"gridID":"vehschgrid2",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"DRIVER_AC","child":"strContext"}
						   ],
					"receive":[
					{"parent":"DRIVER_CODE","child":"DRIVER_CODE"},
					{"parent":"DRIVER_NAME","child":"DRIVER_NAME"},
					{"parent":"PHONE_NO","child":"PHONE_NO"}
					
					
						]
				},
				"driverSerhelp":
				{
					"hlpType":"grid",
					"gridID":"vehschService",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					{"parent":"DRIVER_CODE","child":"DRIVER_CODE"},
					{"parent":"DRIVER_NAME","child":"DRIVER_NAME"},
					{"parent":"PHONE_NO","child":"PHONE_NO"}
					
					
						]
				},
				"driverSer1help":
				{
					"hlpType":"grid",
					"gridID":"vehschServiceToTrip",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"DRIVER_AC","child":"strContext"}
						   ],
					"receive":[
					{"parent":"DRIVER_CODE","child":"DRIVER_CODE"},
					{"parent":"DRIVER_NAME","child":"DRIVER_NAME"},
					{"parent":"PHONE_NO","child":"PHONE_NO"}
					
					
						]
				},
				"locationhelp":
				{
					"hlpType":"grid",
					"gridID":"vehschgrid1",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"LOCATION_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"LOC_CODE","child":"LOC_NAME"}
							
							]
				},
				"locationshelp":
				{
					"hlpType":"grid",
					"gridID":"vehschgrid2",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"LOCATION_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"LOC_CODE","child":"LOC_NAME"}
							
							]
				},
				"locationsLocalhelp":
				{
					"hlpType":"grid",
					"gridID":"LocalLoadRoster",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"LOCATION_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"LOC_CODE","child":"LOC_NAME"}
							
							]
				},				
				"locationSerhelp":
				{
					"hlpType":"grid",
					"gridID":"vehschService",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"LOCATION_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"LOC_CODE","child":"LOC_NAME"}
							
							]
				},
				"locationSer1help":
				{
					"hlpType":"grid",
					"gridID":"vehschServiceToTrip",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"LOCATION_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"LOC_CODE","child":"LOC_NAME"}
							
							]
				},
				"carrierNoHelp":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"CARRIER_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strCarrier","child":"OWNER_CODE_3PL"}
							]
				},
				"carrierhelp":
				{
					"hlpType":"grid",
					"gridID":"vehschgrid1",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"CARRIER_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"OWNER_CODE_3PL","child":"OWNER_CODE_3PL"},
							{"parent":"PHONE_1","child":"PHONE1"}
	    					   ]
				},
				"carriershelp":
				{
					"hlpType":"grid",
					"gridID":"vehschgrid2",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"CARRIER_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"OWNER_CODE_3PL","child":"OWNER_CODE_3PL"},
							{"parent":"PHONE_1","child":"PHONE1"}
	    					   ]
				},
				"Localcarriershelp":
				{
					"hlpType":"grid",
					"gridID":"LocalLoadRoster",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"CARRIER_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"OWNER_CODE_3PL","child":"OWNER_CODE_3PL"},
							{"parent":"PHONE_1","child":"PHONE1"}
	    					   ]
				},
				"carrierSerhelp":
				{
					"hlpType":"grid",
					"gridID":"vehschService",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"CARRIER_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"OWNER_CODE_3PL","child":"OWNER_CODE_3PL"},
							{"parent":"PHONE_1","child":"PHONE1"}
	    					   ]
				},
				"carrierSer1help":
				{
					"hlpType":"grid",
					"gridID":"vehschServiceToTrip",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"CARRIER_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"OWNER_CODE_3PL","child":"OWNER_CODE_3PL"},
							{"parent":"PHONE_1","child":"PHONE1"}
	    					   ]
				}

		}
		
		mainpage.screenLinks=
		{
			"OTORosterScr":
				{
					"dest":"tms.OTOVehicleAllocation",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"TRIP_NO","dest":"strTripNo"}
							]
				},
			"OTOLoadRosterScr":
				{
					"dest":"tms.OTOLoadVehicleAllocation",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"LOAD_NO","dest":"strLoadNo"}
							]
				},
			"OTOServiceRosterScr":
				{
					"dest":"tms.OTOServiceVehicleAllocation",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"SERVICE_ID","dest":"strServiceId"}
							]
				},
			"OTOServiceRosterScr1":
				{
					"dest":"tms.OTOVehicleAllocation_service",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"TRIP_NO","dest":"strTripNo"}
							]
				},
			"AllocTripScr":
				{
					"dest":"tms.AllocateTrip",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"LOAD_NO","dest":"strLoadNo"},
							{"src":"ORIGIN","dest":"strOrigin"},
							{"src":"DESTINATION","dest":"strDestination"},
							{"src":"VEH_CAT","dest":"strVehCat"},
							{"src":"DEP_DATE","dest":"dtDepDtFrom"},
							{"src":"LOAD_AT","dest":"strLoadAt"},          // 73364
							{"src":"DELIVERY_AT","dest":"strDelvAt"},      // 73364
							{"src":"LOAD_DESCRIPTION","dest":"strLoadDesc"}// 73364
							]
				}	,
             "scheduling_report":
				{
					"dest":"tms.SchedulingReport",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}				
		}
	
		this.callParent(arguments);
		
	}
});
