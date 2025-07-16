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
Ext.define('CueTrans.view.tms.OTOVehicleAllocation', 
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
			{"name":"Get Contractor Sequence","linkid":"jm_vehseqscr","tooltip":"Click here to view contractor sequence."}
		]
		
		mainpage.toolbarActions=
		[
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
				}
				
			]
		
		plf.columns=4
		var OTOVehicleAllHdrColumn = plf.addColumnSection({});
		
		
		var OTOVehFormCtrl=
		[
			plf.addDisplayOnly({"label":"Trip Sheet No",id:"strTripNo"}),
			plf.addDisplayOnly({"label":"Primary Load No",id:"strPriLoad"}),
			plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
			plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
			
			plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehCat"}),
			plf.addDisplayOnly({"label":"Departure Date",id:"dtDepDate"}),
			plf.addDisplayOnly({"label":"Load Distance",id:"iLoadDist"}),
			plf.addDisplayOnly({"label":"No-load Distance",id:"iUnLoadDist"}),
			
			plf.addDisplayOnly({"label":"Total Distance",id:"iTotDist"}),	
			//plf.addButton({label:"Fetch Next Trip",id:"btnNxtTrp",tooltip:"Click here to fetch next trip."})		
		]
		
		OTOVehicleAllHdrColumn.add(OTOVehFormCtrl);
		
		plf.columns=4
		var OTOCarrierHdrColumn = plf.addColumnSection({title:"Carrier Details"});
		
		
		var OTOCarFormCtrl=
		[
			plf.addHlpText({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"carrierhelp"},this),
			plf.addDisplayOnly({"label":"Carrier Name",id:"strCarrierName"}),	
			plf.addDisplayOnly({"label":"Carrier Phone No",id:"strCarPhNo"}),				
			plf.addButton({label:"Get Contractor",id:"btnGetBtn",tooltip:"Click here to get contractor."})		
		]
		
		OTOCarrierHdrColumn.add(OTOCarFormCtrl);
		
		plf.columns=4
		var parentForm=mainpage;
		var btnGetBtn=[
						plf.addButton({"label":"Get Contractor",id:"btnGetBtn",tooltip:"Click here to get contractor.",
						"handler": function() 
							{
								parentForm.queryById("methodName").setValue("getVehSchTS");
								process_ebpack_service(parentForm,["strCarrierCode","strVehCat"],"VEHSCHCoreVehSchServiceTS");																							
							}
						})
		];
		var OTORosterOTOHdrColumn = plf.addColumnSection({title:"Roster OTO",tool:btnGetBtn});
		
		
		var OTORosterFormCtrl=
		[
			plf.addDisplayOnly({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"carrierhelp"},this),
			//plf.addDisplayOnly({"label":"Carrier Name",id:"strCarrierName"}),	
			//plf.addDisplayOnly({"label":"Carrier Phone No",id:"strCarPhNo"}),		
			plf.addDisplayOnly({"label":"Contract No",id:"strContractNum"}),
			plf.addDisplayOnly({"label":"Contract Holder Name",id:"strContractHolderName"}),
			plf.addDisplayOnly({"label":"Contact No",id:"strContractContactNum"})	,				
			//plf.addButton({label:"Get Vehicle",id:"btnGetBtn",tooltip:"Click here to get vehicle."}),	
			plf.addDisplayOnly({"label":"Vehicle Code",id:"strVehCode"}),	
			plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehCate"}),				
			plf.addDisplayOnly({"label":"Vehicle Regn No",id:"strVehRegNo"}),	
			plf.addDisplayOnly({"label":"Base Location",id:"strBaseLoc"}),				
			
			plf.addHlpText({"label":"Driver Code",id:"strDriverCode",hlpLinkID:"driverhelp"},this),	
			plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),		
			plf.addBlank({}),
			plf.addBlank({}),
			
			plf.addCombo({"label":"Inspection Required",id:"strInsReq"}),	
			plf.addHlpText({"label":"Inspection Location",id:"strInsLoc",hlpLinkID:"locationhelp"},this),
			plf.addDateTime({"label":"Inspection Date/Time",dateid:"dtRepDate",timeid:"tmRepTime"}),
			plf.addBlank({}),
			
			plf.addHlpText({"label":"Reporting Vehicle",id:"strRepVehicleCode",hlpLinkID:"repvehiclehelp"},this),	
			//plf.addDisplayOnly({"label":"Vehicle Name",id:"strRepVehicleName"}),			
			plf.addHlpText({"label":"Reporting Driver",id:"strRepDriverCode",hlpLinkID:"repdriverhelp"},this),	
			//plf.addDisplayOnly({"label":"Driver Name",id:"strRepDriverName"}),			
			
			plf.addCombo({"label":"Reason",id:"strReason"}),
			plf.addText({"label":"Remarks",id:"strRemarks"}),
			plf.addCombo({"label":"Skip Roster Reason",id:"strSkipReason"})
			
			
		]
		
		OTORosterOTOHdrColumn.add(OTORosterFormCtrl);
		//Customer Vendor Header Section Ends
		
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(OTOVehicleAllHdrColumn)
		//mainpage.ptrMainSection.add(OTOCarrierHdrColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(OTORosterOTOHdrColumn)
		
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"strInsReq",
				"tasktype":"onchange",
				"input":["strInsReq","strPriLoad"],
				"service":"VEHSCHCoreVehSchServiceTS",
				"methodName":"fetchonchangeOTOInsReqTS"
			},
			{
					"controlid":"",
					"tasktype":"onload",
					"input":["strTripNo"],
					"service":"VEHSCHCoreVehSchServiceTS",
					"methodName":"initVehSchOTOTS"
			},
			{
					"controlid":"btnGetBtn",
					"tasktype":"btnclick",
					"input":["strCarrierCode","strVehCat"],
					"service":"VEHSCHCoreVehSchServiceTS",
					"methodName":"getVehSchTS"	
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Roster Next Day",
					"input":["strTripNo","strPriLoad","strVehCat","strCarrierCode","strDriverCode","strRemarks","strVehCode"],
					"service":"VEHSCHCoreVehSchServiceTS",
					"methodName":"nxtRosDayVehSchTS"	
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Mark Unavailable",
					"input":["strTripNo","strPriLoad","strVehCat","strCarrierCode","strDriverCode","strRemarks","strReason","strVehCode"],
					"service":"VEHSCHCoreVehSchServiceTS",
					"methodName":"markUnVehSchTS"	
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Allocate Vehicle",
					"input":["strTripNo","strPriLoad","strVehCat","strCarrierCode","strDriverCode","strRemarks","strReason",
							 "strInsReq","strInsLoc","dtRepDate","tmRepTime","dtDepDate","strVehCode","strRepVehicleCode","strRepDriverCode"],
					"service":"VEHSCHCoreVehSchServiceTS",
					"methodName":"allocateOTOVehSchTS"	
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Skip Roster",
					"input":["strTripNo","strPriLoad","strVehCat","strCarrierCode","strDriverCode","strRemarks","strReason",
							 "strInsReq","strInsLoc","dtRepDate","tmRepTime","dtDepDate","strVehCode"],
					"service":"VEHSCHCoreVehSchServiceTS",
					"methodName":"skipRosterTrpVehSchTS"	
			},
			{
					"controlid":"strCarrierCode",
					"tasktype":"onenter",
					"input":["strCarrierCode"],
					"service":"VEHSCHCoreVehSchServiceTS",
					"methodName":"fetchCarrierDetTS"
			},
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
				},
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
							{"direct":"Tran","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strRepVehicleCode","child":"TRUCK_CODE"}							
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
