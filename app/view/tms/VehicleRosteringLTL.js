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
Ext.define('CueTrans.view.tms.VehicleRosteringLTL', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Vehicle Rostering LTL Loads";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["AllocateVehicle","Schedule Inspection"]
		
		//Add Keyfields
		mainpage.keyFields=["strRequestNo"]
		
		
		mainpage.toolbarLinks=
		[
			{"name":"Get Vehicle Sequence","linkid":"tms_vehiclesequence"}
		]
		
		//Vehicle Rostering-FTL Master Section Begins
		var VehicleRostGridFieldObj=
		[   
			{columnname:"Request No",dataname:"TRANS_REQ_NO",datatype:"",editControl:"textbox",width:140},
			{columnname:"Request Date",dataname:"TARNS_REQ_DATE",datatype:"",width:250},
			{columnname:"Reference Document No",dataname:"DO_NO",datatype:"string",editControl:"",width:200},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"",width:200,editControl:""},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"",width:200,editControl:""},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"",width:150,editControl:""},
			
		]
		var VehicleRostGridDtl=
		{
			title:"",
			id:"VehicleLTL",
			detail:VehicleRostGridFieldObj,
		
		}
		var VehicleRostGridSection = plf.addGrid(VehicleRostGridDtl)	
		plf.columns=4
		var VehicleRostMstrColumn1 = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=3
			
			var VehicleRostMasterCtrl1=
			[	
				plf.addDisplayOnly({"label":"Load Number",id:"strLoadNo"}),
				plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehicleCategory"}),
				plf.addBlank(),
				plf.addButton({"label":"Get Vehicle Roster",id:"getVehRoster"})
			]
		
		}
		
		else
		{
			VehicleRostMasterCtrl1=
			[	
				plf.addDisplayOnly({"label":"Load Number",id:"strLoadNo"}),
				plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehicleCategory"}),
				plf.addBlank(),
				plf.addButton({"label":"Get Vehicle Roster",id:"getVehRoster"})
				
			]
		}	
		
		
		VehicleRostMstrColumn1.add(VehicleRostMasterCtrl1);
		var VehicleRostMstrColumn2= plf.addColumnSection({});
		if(plf.defaultLayout==4)
		
		{
			plf.columns=3
			
			var VehicleRostMasterCtrl2=
			[	
			
			
			    plf.addDisplayOnly({"label":"Vehicle Code",id:"strTruckCode"}),	
				plf.addBlank(),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addDisplayOnly({"label":"Carrier Code",id:"strCarrierCode"}),
				plf.addDisplayOnly({"label":"Carrier Name",id:"strCarrierName"}),
				plf.addDisplayOnly({"label":"Carrier Phone No",id:"strPhoneNo"}),
				plf.addHlpText({"label":"Driver Code",id:"strDriverCode","mandatory":"true",hlpLinkID:"driverlink"},this),	
				plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
				plf.addBlank(),
				plf.addDate({"label":"Inspection Date",id:"dtInspectionDate"}),
				plf.addText({"label":"Inspection Time",id:"iInspectionTime"})
			  
			]
		
		}
		
		else
		{
			VehicleRostMasterCtrl2=
			[	
				plf.addDisplayOnly({"label":"Vehicle Code",id:"strTruckCode"}),	
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addDisplayOnly({"label":"Carrier Code",id:"strCarrierCode"}),
				plf.addDisplayOnly({"label":"Carrier Name",id:"strCarrierName"}),
				plf.addDisplayOnly({"label":"Carrier Phone No",id:"strPhoneNo"}),
				plf.addHlpText({"label":"Driver Code",id:"strDriverCode","mandatory":"true",hlpLinkID:"driverlink"},this),	
				plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
				plf.addDate({"label":"Inspection Date",id:"dtInspectionDate"}),
				plf.addText({"label":"Inspection Time",id:"iInspectionTime"})
								
			]
		}	
		
		
		VehicleRostMstrColumn2.add(VehicleRostMasterCtrl2);
		
		//Add Child Sections
		
		
		
		mainpage.ptrMainSection.add(VehicleRostGridSection) //Add Header Section to Main Page
		//mainpage.ptrMainSection.add(PLFieldset)//Add 3PL Field set to Main Page
		mainpage.ptrMainSection.add(VehicleRostMstrColumn1)  //Add Grid Section to Main Page
		mainpage.ptrMainSection.add(VehicleRostMstrColumn2)
		
		//History Data Section
	//	mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strLoadNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"initVehRosterLTLTS"
			},	
			{       
				     
				"controlid":"getVehRoster",
				"tasktype":"btnclick",
				"input":["VehicleLTL","strVehicleCategory"],
				"service":"TMSCoreTransportTS",
				"methodName":"getVehicleRosterLTLTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"AllocateVehicle",
				"input":["strDriverCode","strTruckCode","strLoadNo","strCarrierCode"],
                "service":"TMSCoreTransportTS",
				"methodName":"allocateVehicleLTLTS"				
		},
		//Schedule Inspection
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Schedule Inspection",
				"input":["strDriverCode","strTruckCode","strLoadNo","strCarrierCode","dtInspectionDate","iInspectionTime"],
                "service":"TMSCoreTransportTS",
				"methodName":"scheduleInspectionLTLTS"				
		}
		

		];
		//Event Handlers Mapping Ends
		mainpage.hlpLinks=
		{
		"driverlink":
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
				}
			
		}
		
			
		//Generate Screen Section
		/*mainpage.generateScreen();
		
		
		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		
		mainpage.screenLinks=
		{
			"tms_vehiclesequence":
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
		this.callParent(arguments);
		
	}
});
