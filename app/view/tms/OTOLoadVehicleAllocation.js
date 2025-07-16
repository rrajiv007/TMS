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
1.0.2   Steffie             03/08/16      73753    		                                   
************************************************************************************************/
Ext.define('CueTrans.view.tms.OTOLoadVehicleAllocation', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function() 
	{
		
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Roster Based Vehicle Allocation";
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=
		[
			//{"name":"Get Contractor Sequence","linkid":"jm_vehseqscr","tooltip":"Click here to view contractor sequence."}
		]
		
		mainpage.toolbarActions=
		[
				/*
				{
					"name": "Allocate Vehicle",
					"tooltip": "Click here to allocate vehicle."
				},
				{
					"name": "Skip Roster",
					"tooltip": "Click here to skip roster vehicle."
				},
				{
					"name": "Roster Next Day",
					"tooltip": "Click here to roster next day."
				},
				{
					"name": "Mark Unavailable",
					"tooltip": "Click here to mark unavailable."
				},
				{
					"name": "Assign Job",
					"tooltip": "Click here to assign job."
				}
				*/
			]
		
		plf.columns=4
		var OTOVehicleAllHdrColumn = plf.addColumnSection({});
		
		
		var OTOVehFormCtrl=
		[
			plf.addDisplayOnly({"label":"Load #",id:"strLoadNo"}),
			plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
			plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
			plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehCat"}),
			
			plf.addDisplayOnly({"label":"Departure Date",id:"dtDepDate"}),
			plf.addDisplayOnly({"label":"Trip Sheet #",id:"strTripNo"}),
            plf.addDisplayOnly({"label":"Loading Point",id:"strLoadAt"}),
			plf.addDisplayOnly({"label":"Unloading Point",id:"strDelvAt"}),
			plf.addDisplayOnly({"label":"Load Description",id:"strLoadDesc"}),
            plf.addDisplayOnly({"label":"Remarks",id:"strLoadRemarks"}),
			plf.addDisplayOnly({"label":"Job #",id:"strJobNo"})
			//plf.addButton({label:"Fetch Next Trip",id:"btnNxtTrp",tooltip:"Click here to fetch next trip."})		
		]
		
		OTOVehicleAllHdrColumn.add(OTOVehFormCtrl);
		
		plf.columns=4
		var OTOCarrierHdrColumn = plf.addColumnSection({title:"Carrier Details"});
		
		
		var OTOCarFormCtrl=
		[
			/*
			plf.addHlpText({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"carrierhelp"},this),
			//plf.addDisplayOnly({"label":"Carrier Name",id:"strCarrierName"}),	
			//plf.addDisplayOnly({"label":"Carrier Phone No",id:"strCarPhNo"}),				
			plf.addDisplayOnly({"label":"Contract No",id:"strContractNum"}),
			plf.addDisplayOnly({"label":"Contract Holder Name",id:"strContractHolderName"}),
			plf.addDisplayOnly({"label":"Contact No",id:"strContractContactNum"})	,	
			*/
			plf.addBlank({}),		
			plf.addBlank({}),
			plf.addBlank({}),
			plf.addButton({label:"Get Contractor",id:"btnGetBtn",tooltip:"Click here to get contractor."}),
			plf.addButton({label:"Assign Contractor",id:"btnSearch",tooltip:"Click here to assign contractor."}) /*73753  changes*/
			
		]
		
		OTOCarrierHdrColumn.add(OTOCarFormCtrl);
		var parentForm=mainpage;
		plf.columns=4
		var btnGetBtn=[
		                 plf.addButton({id:"btnGetPenSlot",label:"Available Slot",tooltip:"Click here to view available slot.",    
							"handler": function() 
							{
								parentForm.launchHlpLink("get_available_slot")						
							}
                                           }) ,
						 
						 //Raj 091017
						 plf.addButton({id:"btnGetSeq",label:"Get Contractor Sequence",tooltip:"Click here to view contractor sequence.",    
							"handler": function() 
							{
								parentForm.launchHlpLink("get_contrac_seq")						
							}
                                           }) , 
						plf.addButton({"label":"Fetch Next Load",id:"btnNxtLd",tooltip:"Click here to get next load.",
						"handler": function() 
							{
								parentForm.queryById("methodName").setValue("fetchNextLoadTS");
								process_ebpack_service(parentForm,["strLoadNo","strTripNo"],"VEHSCHCoreVehSchServiceTS");																							
							}
						}),
						plf.addButton({"label":"Get Contractor",id:"btnGetBtn",tooltip:"Click here to get contractor.",
						"handler": function() 
							{
								parentForm.queryById("methodName").setValue("getVehSchTS");
								process_ebpack_service(parentForm,["strCarrierCode","strVehCat","strVehCode","strServiceId",
								"strLoadNo"],"VEHSCHCoreVehSchServiceTS");																							
							}
						}),
                            plf.addButton({id:"btnSearch",label:"Assign Contractor",tooltip:"Click here to assign contractor.",    /*73753  changes starts*/
							"handler": function() 
							{							
								parentForm.launchHlpLink("assn_contrac");
                                							
							}   
							})                                                                                                 /*73753  changes end*/
						                                                                                               
		];
               
		var OTORosterOTOHdrColumn = plf.addColumnSection({title:"Roster OTO",tool:btnGetBtn});
		
            
		
		var OTORosterFormCtrl=
		[
			plf.addDisplayOnly({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"carrierhelp"},this),
			//plf.addDisplayOnly({"label":"Carrier Name",id:"strCarrierName"}),	
			//plf.addDisplayOnly({"label":"Carrier Phone No",id:"strCarPhNo"}),		
			plf.addDisplayOnly({"label":"Contract #",id:"strContractNum"}),
			plf.addDisplayOnly({"label":"Contract Holder Name",id:"strContractHolderName"}),
			plf.addDisplayOnly({"label":"Contact #",id:"strContractContactNum"})	,				
			//plf.addButton({label:"Get Vehicle",id:"btnGetBtn",tooltip:"Click here to get vehicle."}),	
			plf.addDisplayOnly({"label":"Vehicle Code",id:"strVehCode"}),	
			plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehCate"}),				
			plf.addDisplayOnly({"label":"Vehicle Regn #",id:"strVehRegNo"}),	
			//plf.addDisplayOnly({"label":"Base Location",id:"strBaseLoc"}),	
            plf.addHidden({"label":"Base Location",id:"strBaseLoc"}),					
			
			plf.addHlpText({"label":"Driver Code",id:"strDriverCode",hlpLinkID:"driverhelp"},this),	
			plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),		
			plf.addHlpText({"label":"Reporting Vehicle",id:"strRepVehicleCode",hlpLinkID:"repvehiclehelp"},this),
			plf.addHlpText({"label":"Reporting Trailer",id:"strRepTrailerCode",hlpLinkID:"reportingTrailerCode"},this),
			plf.addText({"label":"Remarks",id:"strRemarks"}),
			plf.addText({"label":"Inspection Bay #",id:"strInspBayNo"}),				
			plf.addCombo({"label":"Inspection Required",id:"strInsReq"}),	
			plf.addCombo({"label":"Inspection Location",id:"strInsLoc"}),
			//plf.addHlpText({"label":"Inspection Location",id:"strInsLoc",hlpLinkID:"locationhelp"},this),
			//plf.addHidden({"label":"Inspection Location",id:"strInsLoc"}),
			plf.addDateTime({"label":"Inspection Date/Time",dateid:"dtRepDate",timeid:"tmRepTime"}),
			plf.addCombo({"label":"Special Trailer",id:"strSpecialTrailer"}),
			plf.addCombo({"label":"Reason",id:"strReason"}),		
            plf.addDisplayOnly({"label":"Smartphone Available",id:"strSmartphoneAvailable"}),				
			plf.addDisplayOnly({"label":"Phone OS",id:"strPhoneOS"}),			
			//plf.addDisplayOnly({"label":"Vehicle Name",id:"strRepVehicleName"}),			
			plf.addHidden({"label":"Reporting Driver",id:"strRepDriverCode",hlpLinkID:"repdriverhelp"},this),	
			//plf.addDisplayOnly({"label":"Driver Name",id:"strRepDriverName"}),	
			plf.addHidden({id:"strServiceId"})	
			
		]
		
		OTORosterOTOHdrColumn.add(OTORosterFormCtrl);
		//Customer Vendor Header Section Ends
		
		/* Grid Section Start here */
		/* Added by Raj on 04072019 for Roster enhancement start*/
		var TrailerMappingObj=
		[
			
			{columnname:"Trailer Code",dataname:"TRUCK_CODE",datatype:"string",width:100,editControl:"addDisplayOnly"/*editControl:"textbox",helpid:'trailermappinglnk',"onenter":"TRAILER_CODE_ONENTER"*/},
			{columnname:"Trailer Description",dataname:"TRUCK_DESC",datatype:"string",editControl:"addDisplayOnly",width:120},
			{columnname:"Trailer Regn No",dataname:"TRUCK_REG_NO",datatype:"string",width:130,editControl:"addDisplayOnly"},
			{columnname:"Trailer Category",dataname:"TRUCK_CATEGORY",datatype:"string",width:150,editControl:"addDisplayOnly"}/*,
			{columnname:"Contract No",dataname:"TRUCK_CONTRACT_NO",datatype:"string",width:130,editControl:"addDisplayOnly"},
			{columnname:"Carrier code",dataname:"CARRIER_CODE",datatype:"string",width:120,editControl:"addDisplayOnly"},
			{columnname:"Carrier Name",dataname:"TRUCK_OWNER_CODE",datatype:"string",width:150,editControl:"addDisplayOnly"},
			{columnname:"Vehicle Type",dataname:"TRUCK_TYPE",datatype:"string",width:100,editControl:"addDisplayOnly"},
			{columnname:"Base Location",dataname:"BASE_LOCATION",datatype:"string",width:120,editControl:"addDisplayOnly"},
		  	{columnname:"Make",dataname:"TRUCK_MAKE",datatype:"string",width:100,editControl:"addDisplayOnly"},
			{columnname:"Year Of Manufacture",dataname:"YEAR_OF_MFG",datatype:"string",width:100,editControl:"addDisplayOnly"},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100,editControl:"addDisplayOnly"},
			{columnname:"Availability Status",dataname:"AVAILABILITY_STATUS",datatype:"string",width:120,editControl:"addDisplayOnly"} */			
			
		]
		var TrailerMappingGridDtl=									
		{
			title:"",
			id:"trailerMappingDtl",
			detail:TrailerMappingObj,
			removeAddDelete:true,
			readonly:true,
			removePaging:true
		}
		plf.columns=4
		var TrailerMappingHdrCol = plf.addColumnSection({title:"Trailer Mapping"});
		var TrailerMappingGridSection = plf.addGrid(TrailerMappingGridDtl,this)
		TrailerMappingHdrCol.add(TrailerMappingGridSection)	
		
	   /* var VehicleCatMappingObj=  
		[
			{columnname:"Vehicle Category",dataname:"TRUCK_CATEGORY",datatype:"string",editControl:"addDisplayOnly",width:120}
			
		]
		var VehicleCatMappingGridDtl=									
		{
			title:"",
			id:"VehicleCatMappingDtl",
			detail:VehicleCatMappingObj,
			removeAddDelete:true,
			readonly:true,
			removePaging:true
		}
		plf.columns=4
		var VehicleCatMappingHdrCol = plf.addColumnSection({title:"Vehicle Category Mapping"});
		var VehicleCatMappingGridSection = plf.addGrid(VehicleCatMappingGridDtl,this)
		VehicleCatMappingHdrCol.add(VehicleCatMappingGridSection)	*/
		/* Added by Raj on 04072019 for Roster enhancement end */
		
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(OTOVehicleAllHdrColumn)
		//mainpage.ptrMainSection.add(OTOCarrierHdrColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(OTORosterOTOHdrColumn)
		var baseTab = plf.addTabSection({ tabs:[
												TrailerMappingHdrCol/*,VehicleCatMappingHdrCol*/
												]});
		//mainpage.ptrMainSection.add(baseTab) 
		
		mainpage.webSection = plf.addColumnSection({id:"whenSmartNo",title:""});
		var webSectionFormCtrl=
		[
			plf.addButton({label:"Allocate Vehicle",id:"btnAllocateVehicle",tooltip:"Click here to allocate vehicle."}),
			plf.addButton({label:"Skip Roster",id:"btnSkipRoster",tooltip:"Click here to skip roster vehicle."}),
			plf.addButton({label:"Roster Next Day",id:"btnRosterNextDay",tooltip:"Click here to roster next day."}),
			plf.addButton({label:"Mark Unavailable",id:"btnMarkUnavailable",tooltip:"Click here to mark unavailable."})
		]
		mainpage.webSection.add(webSectionFormCtrl);	
		
		mainpage.ptrMainSection.add(mainpage.webSection)
		
		mainpage.MobileSection = plf.addColumnSection({id:"whenSmartYes",title:""});
		var MobileSectionFormCtrl=
		[
			plf.addBlank({}),		
			plf.addBlank({}),
			plf.addButton({label:"Assign Job",id:"btnAssignJob",tooltip:"Click here to assign job."})
		]
		mainpage.MobileSection.add(MobileSectionFormCtrl);	
		mainpage.ptrMainSection.add(mainpage.MobileSection)
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"strInsReq",
				"tasktype":"onchange",
				"input":["strInsReq","strLoadNo"],
				"service":"VEHSCHCoreVehSchServiceTS",
				"methodName":"fetchonchangeInsReqTS"
			},
			{
					"controlid":"",
					"tasktype":"onload",
					"input":["strLoadNo","strVehCode"],
					"service":"VEHSCHCoreVehSchServiceTS",
					"methodName":"initLdVehSchOTOTS"
			},
			{
					"controlid":"btnGetBtn",
					"tasktype":"btnclick",
					"input":["strCarrierCode","strVehCat","strVehCode","strLoadNo","strServiceId"],
					"service":"VEHSCHCoreVehSchServiceTS",
					"methodName":"getVehSchTS"	
			},
			//Raj 13 09 2017
			{
					"controlid":"btnNxtLd",
					"tasktype":"btnclick",
					"input":["strLoadNo","strTripNo"],
					"service":"VEHSCHCoreVehSchServiceTS",
					"methodName":"fetchNextLoadTS"	
			},
			/*
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Roster Next Day",
					"input":["strLoadNo","strVehCat","strCarrierCode","strDriverCode","strRemarks","strVehCode","strReason","strServiceId"],
					"service":"VEHSCHCoreVehSchServiceTS",
					"methodName":"nxtRosDayLdVehSchTS"	
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Mark Unavailable",
					"input":["strLoadNo","strVehCat","strCarrierCode","strDriverCode","strRemarks","strReason","strVehCode","strServiceId"],
					"service":"VEHSCHCoreVehSchServiceTS",
					"methodName":"markUnVehSchTS"	
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Allocate Vehicle",
					"input":["strTripNo","strLoadNo","strVehCat","strCarrierCode","strDriverCode","strRemarks","strReason",
							 "strInsReq","strInsLoc","dtRepDate","tmRepTime","dtDepDate","strOrigin","strDestination","strVehCode",
							 "strDriverName","strContractNum","strContractHolderName","strContractContactNum","strRepVehicleCode","strRepDriverCode","strLoadAt","strDelvAt","strLoadDesc","strServiceId","strRepTrailerCode","strInspBayNo","strSpecialTrailer"], //73364
					"service":"VEHSCHCoreVehSchServiceTS",
					"methodName":"allocateOTOLdVehSchTS"	
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Skip Roster",
					"input":[ "strTripNo","strLoadNo","strVehCat","strCarrierCode","strDriverCode","strRemarks","strReason",
							 "strInsReq","strInsLoc","dtRepDate","tmRepTime","dtDepDate","strOrigin","strDestination","strVehCode",
							 "strDriverName","strContractNum","strContractHolderName","strContractContactNum","strLoadAt","strDelvAt","strLoadDesc","strServiceId"],// 73364
					"service":"VEHSCHCoreVehSchServiceTS",
					"methodName":"skipRosterVehSchTS"	
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Assign Job",
					"input":["strJobNo","strLoadNo","strVehCat","strCarrierCode","strDriverCode","strRemarks","strReason",
							 "strInsReq","strInsLoc","dtRepDate","tmRepTime","dtDepDate","strOrigin","strDestination","strVehCode",
							 "strDriverName","strContractNum","strContractHolderName","strContractContactNum","strRepVehicleCode","strRepDriverCode","strLoadAt","strDelvAt","strLoadDesc","strServiceId","strRepTrailerCode","strInspBayNo",
							 "strSpecialTrailer"],
					"service":"OTOAppCoreServiceTS",
					"methodName":"OTOAPP_ASSIGNJOB"	
			},
			*/
			{
			"controlid":"btnRosterNextDay",
			"tasktype":"btnclick",
			"input":["strLoadNo","strVehCat","strCarrierCode","strDriverCode","strRemarks","strVehCode","strReason","strServiceId","strSmartphoneAvailable"],
			"service":"VEHSCHCoreVehSchServiceTS",
			"methodName":"nxtRosDayLdVehSchTS"	
			},
			{
			"controlid":"btnMarkUnavailable",
			"tasktype":"btnclick",
			"input":["strLoadNo","strVehCat","strCarrierCode","strDriverCode","strRemarks","strReason","strVehCode","strServiceId","strSmartphoneAvailable"],
			"service":"VEHSCHCoreVehSchServiceTS",
			"methodName":"markUnVehSchTS"	
			},
			{
			"controlid":"btnAllocateVehicle",
			"tasktype":"btnclick",
			"input":["strTripNo","strLoadNo","strVehCat","strCarrierCode","strDriverCode","strRemarks","strReason",
					 "strInsReq","strInsLoc","dtRepDate","tmRepTime","dtDepDate","strOrigin","strDestination","strVehCode","strDriverName","strContractNum","strContractHolderName","strContractContactNum","strRepVehicleCode","strRepDriverCode","strLoadAt","strDelvAt","strLoadDesc","strServiceId","strRepTrailerCode","strInspBayNo","strSpecialTrailer","strSmartphoneAvailable"],
			"service":"VEHSCHCoreVehSchServiceTS",
			"methodName":"allocateOTOLdVehSchTS"	
			},
			{
			"controlid":"btnSkipRoster",
			"tasktype":"btnclick",
			"input":[ "strTripNo","strLoadNo","strVehCat","strCarrierCode","strDriverCode","strRemarks","strReason",
					 "strInsReq","strInsLoc","dtRepDate","tmRepTime","dtDepDate","strOrigin","strDestination","strVehCode",
					 "strDriverName","strContractNum","strContractHolderName","strContractContactNum","strLoadAt","strDelvAt","strLoadDesc","strServiceId","strSmartphoneAvailable"],
			"service":"VEHSCHCoreVehSchServiceTS",
			"methodName":"skipRosterVehSchTS"	
			},
			{
			"controlid":"btnAssignJob",
			"tasktype":"btnclick",
			"input":["strJobNo","strLoadNo","strVehCat","strCarrierCode","strDriverCode","strRemarks","strReason",
					 "strInsReq","strInsLoc","dtRepDate","tmRepTime","dtDepDate","strOrigin","strDestination","strVehCode",
					 "strDriverName","strContractNum","strContractHolderName","strContractContactNum","strRepVehicleCode","strRepDriverCode","strLoadAt","strDelvAt","strLoadDesc","strServiceId","strRepTrailerCode","strInspBayNo",
					 "strSpecialTrailer","strSmartphoneAvailable"],
			"service":"OTOAppCoreServiceTS",
			"methodName":"OTOAPP_ASSIGNJOB"	
			},
			{
					"controlid":"strVehCode",
					"tasktype":"onenter",
					"input":["strVehCode"],
					"service":"VEHSCHCoreVehSchServiceTS",
					"methodName":"fetchTraiVehCatMapTS"
			},
			/*{
					"controlid":"strCarrierCode",
					"tasktype":"onenter",
					"input":["strCarrierCode","strVehCode" ],
					"service":"VEHSCHCoreVehSchServiceTS",
					"methodName":"fetchCarrierDetTS"
			},*/
			{
					"controlid":"strDriverCode",
					"tasktype":"onenter",
					"input":["strDriverCode"],
					"service":"VEHSCHCoreVehSchServiceTS",
					"methodName":"fetchDriverDetTS"
			},
			{
					"controlid":"strRepDriverCode",
					"tasktype":"onenter",
					"input":["strRepDriverCode"],
					"service":"VEHSCHCoreVehSchServiceTS",
					"methodName":"fetchRepDriverDetTS"
			},
			{
				"controlid":"strInsLoc",
				"tasktype":"onchange",
				"input":["strInsLoc","dtRepDate","strLoadNo"],
				"service":"VEHSCHCoreVehSchServiceTS",
				"methodName":"onchangeInsLocTS"
			}
			
		];
		//Event Handlers Mapping Ends
		
	
		//Generate Screen Section
		//mainpage.generateScreen();
		
		
		mainpage.hlpLinks=
		{
			"carrierhelp":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCarrierCode","child":"OWNER_CODE_3PL"},
							{"parent":"strCarrierName","child":"OWNER_NAME_3PL"},
							{"parent":"strCarPhNo","child":"PHONE1"}
							]
				},
			"repdriverhelp":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"Tran","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strRepDriverCode","child":"DRIVER_CODE"}
							]
				},
			"repvehiclehelp":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"VEHICLE_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strRepVehicleCode","child":"TRUCK_CODE"}
							]
				},
			"reportingTrailerCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TrailerHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRepTrailerCode","child":"TRUCK_CODE"}
							]
				},
			
				
			"driverhelp":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"Tran","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strDriverCode","child":"DRIVER_CODE"},
							{"parent":"strDriverName","child":"DRIVER_NAME"}
							
							]
				}/*,
			"locationhelp":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strInsLoc","child":"LOC_CODE"}
							
							]
				}*/,
                    /*73753  changes starts*/
                    "assn_contrac":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.VehicleSequenceHelp",
					"send":[
							{"parent":"strLoadNo","child":"strLoadNo"},
							{"parent":"strVehCat","child":"strVehCat"}//Raj 220917
						   ],
					"receive":[
							{"parent":"strCarrierCode","child":"CAR_CODE"},
							{"parent":"strContractNum","child":"CONTRACT_NO"},
							{"parent":"strContractHolderName","child":"CONTRACT_NAME"},
							{"parent":"strContractContactNum","child":"CONTACT_NO"},
							{"parent":"strVehCode","child":"VEH_CODE"},
							{"parent":"strVehCate","child":"VEH_CAT"},
							{"parent":"strVehRegNo","child":"VEH_REGN"},
							{"parent":"strBaseLoc","child":"BASE_LOCATION"},
							{"parent":"strServiceId","child":"MOD_FLAG"},
							{"parent":"strSmartphoneAvailable","child":"SMARTPHONE_AVAILABLE"},
							{"parent":"strPhoneOS","child":"PHONE_OS"}

							]
				},   /*73753  changes ends*/
				   "get_contrac_seq":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.VehicleSequence",
					"send":[
							{"parent":"","child":""}
							],
					"receive":[
							{"parent":"","child":""}
							]
				} , 
                   "get_available_slot":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.AvailableTimeSlot",
					"send":[
							{"parent":"dtRepDate","child":"strFromDate"}
							],
					"receive":[
							{"parent":"","child":""}
							]
				}
			
		}
		
		mainpage.screenLinks=
		{
			"jm_vehseqscr":
				{
					"dest":"tms.VehicleSequence",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
		
		/*Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
		
	}
});
