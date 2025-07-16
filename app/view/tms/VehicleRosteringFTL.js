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
Ext.define('CueTrans.view.tms.VehicleRosteringFTL', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Vehicle Rostering FTL Loads";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Allocate Vehicle","Schedule Inspection"]
		
		mainpage.toolbarLinks=
		[
			{"name":"Get Vehicle Sequence","linkid":"tms_vehiclesequence"}
		]
		
		
		//Add Keyfields
		mainpage.keyFields=["strRequestNo"]
		//Vehicle Rostering-FTL Master Section Begins
		plf.columns=4
		var VehicleRostMstrColumn = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=3
			
			var VehicleRostMasterCtrl=
			[	
				plf.addDisplayOnly({"label":"Request No",id:"strRequestNo"}),
				plf.addDisplayOnly({"label":"Request Date",id:"dtRequestDate"}),
				plf.addDisplayOnly({"label":"Reference<br>Document No",id:"strDocNo"}),
				
				plf.addDisplayOnly({"label":"Roster Pending",id:"iRosteringPending"}),
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
				
				plf.addDisplayOnly({"label":"Number Of Vehicles",id:"iNoOfVehicles"}),
				plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"}),
				plf.addDisplayOnly({"label":"Priority",id:"strPriority"}),
				
				plf.addBlank(),
				plf.addButton({"label":"Get Vehicle Roster",id:"getVehicleRoster"}),
				plf.addBlank()
			]
		
		}
		
		else
		{
			VehicleRostMasterCtrl=
			[	
				plf.addDisplayOnly({"label":"Request No",id:"strRequestNo"}),
				plf.addDisplayOnly({"label":"Request Date",id:"dtRequestDate"}),
				plf.addDisplayOnly({"label":"Reference<br>Document No",id:"strDocNo"}),
				plf.addDisplayOnly({"label":"Roster Pending",id:"iRosteringPending"}),
				
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
				plf.addDisplayOnly({"label":"Number Of Vehicles",id:"iNoOfVehicles"}),
				plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"}),
				
				plf.addDisplayOnly({"label":"Priority",id:"strPriority"}),
				plf.addBlank(),
				plf.addButton({"label":"Get Vehicle Roster",id:"getVehicleRoster"}),
				plf.addBlank()
				
			]
		}	
		
		var VehicleRostMstrColumn.add(VehicleRostMasterCtrl);
		
		//Driver License Grid section starts
		var rosteringBulkGridObj=
		[   
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:120,hidden:true},
			{columnname:"Load No",dataname:"DOC_NO",datatype:"string",width:150},
			{columnname:"Document<br>Line.No",dataname:"DOC_LINE_NO",datatype:"string",width:70,hidden:true},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:125},
			{columnname:"Vehicle Code",dataname:"TRUCK_CODE",datatype:"string",editControl:"textbox",width:125,inputFormat:"string",InputLength:"40"},
			{columnname:"Carrier Name",dataname:"CODE3PL",datatype:"string",width:125},
			{columnname:"Phone Number",dataname:"PHONE_NO",datatype:"string",width:125},
		//	{columnname:"Carrier //Code",dataname:"CARRIER_CODE",datatype:"string",width:100,editControl:"textbox",helpid:'carriercontract',"onenter":"CARRIER_CODE_ONENTER"},
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:80,editControl:"textbox",helpid:'drivermaster'},
			{columnname:"Inspection Date",dataname:"INSPECTION_DATE",datatype:"string",width:110,editControl:"date"},
			{columnname:"Inspection Time",dataname:"INSPECTION_TIME",datatype:"string",width:110,editControl:"textbox"},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:80},
			{columnname:"Ref<br>Line.No",dataname:"REF_LINE_NO",datatype:"string",width:70,hidden:true}
		]
		VehicleRostGridDtl=
		{
			title:"",
			id:"getDetailsGrid",
			detail:rosteringBulkGridObj,
		
		}
		var VehicleRostGridSection = plf.addGrid(VehicleRostGridDtl,this)	
		//Add Child Sections
		
		mainpage.ptrMainSection.add(VehicleRostMstrColumn) //Add Header Section to Main Page
		//mainpage.ptrMainSection.add(PLFieldset)//Add 3PL Field set to Main Page
		mainpage.ptrMainSection.add(VehicleRostGridSection)  //Add Grid Section to Main Page
		
		
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			 {
				"controlid":"",
				"tasktype":"onload",
				"input":["strRequestNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"initFTLLoadsTS"
		},	
       {       
				     
				"controlid":"getVehicleRoster",
				"tasktype":"btnclick",
				"input":["getDetailsGrid","strRequestNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"getVehicleRosterTS"
		},	
		
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Allocate Vehicle",
				"input":["getDetailsGrid","strRequestNo"],
                "service":"TMSCoreTransportTS",
				"methodName":"allocateVehicleTS"				
		},
    //Schedule Inspection
	    	{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Schedule Inspection",
				"input":["getDetailsGrid","dtDate","strTime","strPriority","strCommodity","strOrigin","strDestination","dtInspectionDate","iInspectionTime"],
                "service":"TMSCoreTransportTS",
				"methodName":"scheduleBulkInspTS"				
		}
		];
		//Event Handlers Mapping Ends
		mainpage.hlpLinks=
		{
		"drivermaster":
			{
					"hlpType":"grid",
					"gridID":"getDetailsGrid",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					{"parent":"DRIVER_CODE","child":"DRIVER_CODE"}
					//,{"parent":"CONSTRAINT_DESC","child":"CONSTRAINT_DESC"}
							]
				},
				"3plowner":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"str3plOwnerCode","child":"OWNER_CODE_3PL"},
							{"parent":"str3plOwnerName","child":"OWNER_NAME_3PL"}
							]
				}
		}
		
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
