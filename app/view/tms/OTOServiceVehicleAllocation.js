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
Ext.define('CueTrans.view.tms.OTOServiceVehicleAllocation', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Roster Based Vehicle Allocation";
		mainpage.toolbarSectionFlag=true;
		//mainpage.liveScreenFlag=false;
        mainpage.toolbarLinks=
		[
			{"name":"Get Vehicle Sequence","linkid":"jm_vehseqscr","tooltip":"Click here to view vehicle sequence."}
		]
		
		mainpage.toolbarActions=
		[
				{
					"name": "Allocate Vehicle",
					"tooltip": "Click here to allocate vehicle."
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
			plf.addDisplayOnly({"label":"Service Id",id:"strServiceId"}),
			plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
			plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
			plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehCat"}),			
			plf.addDisplayOnly({"label":"Req From Date/Time",id:"dtReqDate"}),
			plf.addDisplayOnly({"label":"Trip Sheet No",id:"strTripNo"})	
		]
		
		OTOVehicleAllHdrColumn.add(OTOVehFormCtrl);
		
		plf.columns=4
		var OTOCarrierHdrColumn = plf.addColumnSection({title:"Carrier Details"});
		
		
		var OTOCarFormCtrl=
		[			
			plf.addBlank({}),		
			plf.addBlank({}),
			plf.addBlank({}),
			plf.addButton({label:"Get Vehicle",id:"btnGetBtn",tooltip:"Click here to get vehicle."})			
		]
		
		OTOCarrierHdrColumn.add(OTOCarFormCtrl);
		var parentForm=mainpage;
		plf.columns=4
		var btnGetBtn=[
						plf.addButton({"label":"Get Vehicle",id:"btnGetBtn",tooltip:"Click here to get vehicle.",
						"handler": function() 
							{
								parentForm.queryById("methodName").setValue("getVehSchTS");
								process_ebpack_service(parentForm,["strCarrierCode","strVehCat","strVehCode",
								"strServiceId"],"VEHSCHCoreVehSchServiceTS");																							
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
			plf.addCombo({"label":"Inspection Required",id:"strInsReq"}),	
			plf.addHlpText({"label":"Inspection Location",id:"strInsLoc",hlpLinkID:"locationhelp"},this),
			plf.addDateTime({"label":"Inspection Date/Time",dateid:"dtRepDate",timeid:"tmRepTime"}),
			plf.addCombo({"label":"Unavailability Reason",id:"strReason"}),
			plf.addText({"label":"Remarks",id:"strRemarks"})
			
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
			"controlid":"",
			"tasktype":"onload",
			"input":["strServiceId"],
			"service":"VEHSCHCoreVehSchServiceTS",
			"methodName":"initSERVehSchOTOTS"
			},
			{
			"controlid":"btnGetBtn",
			"tasktype":"btnclick",
			"input":["strCarrierCode","strVehCat","strVehCode","strServiceId"],
			"service":"VEHSCHCoreVehSchServiceTS",
			"methodName":"getVehSchTS"	
			},
			{
			"controlid":"",
			"tasktype":"toolbarclick",
			"action":"Roster Next Day",
			"input":["strServiceId","strVehCat","strCarrierCode","strDriverCode","strRemarks","strVehCode"],
			"service":"VEHSCHCoreVehSchServiceTS",
			"methodName":"nxtRosDayLdVehSchTS"	
			},
			{
			"controlid":"",
			"tasktype":"toolbarclick",
			"action":"Mark Unavailable",
			"input":["strServiceId","strVehCat","strCarrierCode","strDriverCode","strRemarks","strReason","strVehCode"],
			"service":"VEHSCHCoreVehSchServiceTS",
			"methodName":"markUnVehSchTS"	
			},
			{
			"controlid":"",
			"tasktype":"toolbarclick",
			"action":"Allocate Vehicle",
			"input":["strTripNo","strServiceId","strVehCat","strCarrierCode","strDriverCode","strRemarks","strReason",
					 "strInsReq","strInsLoc","dtRepDate","tmRepTime","strOrigin","strDestination","strVehCode",
					 "strDriverName","strContractNum","strContractHolderName","strContractContactNum"],
			"service":"VEHSCHCoreVehSchServiceTS",
			"methodName":"allocateOTOSerVehSchTS"	
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
				"tasktype":"proto",
				"filename":"peoplelogistics/VehicleOTO.json"
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
							{"parent":"","child":""}
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
