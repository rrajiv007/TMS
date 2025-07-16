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
Ext.define('CueTrans.view.tms.OTORostering', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Vehicle Scheduling";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		mainpage.toolbarActions= [{
                "name": "Allocate Vehicle",
                "tooltip": "Click here to allocate a vehicle."
            },
			{
                "name": "Schedule Inspection",
                "tooltip": "Click here to schedule a inspection."
            },
			{
                "name": "Roster Next Day",
                "tooltip": "Click here to roster for the next day."
            },
			{
                "name": "Mark Unavailable",
                "tooltip": "Click here to mark unavailable."
            }
			
            ]
		//mainpage.toolbarActions=["Allocate Vehicle","Schedule Inspection","Roster Next Day","Mark Unavailable"]
			
		
		//Add Keyfields
		mainpage.keyFields=["strRequestNo"]
		
		//Vehicle Rostering-FTL Master Section Begins
		plf.columns=4
		var OTORostMstrColumn = plf.addColumnSection({});
		if(plf.defaultLayout==3)
		{
			plf.columns=3
			
			var OTORostMasterCtrl=
			[	
				plf.addDisplayOnly({"label":"Request No",id:"strRequestNo"}),
				plf.addDisplayOnly({"label":"Request Date",id:"dtRequestDate"}),
				plf.addDisplayOnly({"label":"Ref Doc No",id:"strDocNo"}),
				
				plf.addDisplayOnly({"label":"Roster Pending",id:"iRosteringPending"}),
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
				
				plf.addDisplayOnly({"label":"Number Of Vehicles",id:"iNoOfVehicles"}),
				plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"}),
				plf.addBlank()
				]
		
		}
		
		else
		{
			OTORostMasterCtrl=
			[	
				plf.addDisplayOnly({"label":"Request No",id:"strRequestNo"}),
				plf.addDisplayOnly({"label":"Request Date",id:"dtRequestDate"}),
				plf.addDisplayOnly({"label":"Ref Doc No",id:"strDocNo"}),
				plf.addDisplayOnly({"label":"Roster Pending",id:"iRosteringPending"}),
				
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
				plf.addDisplayOnly({"label":"Number Of Vehicles",id:"iNoOfVehicles"}),
				plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"})
				
				
			]
		}	
		
		var OTORostMstrColumn.add(OTORostMasterCtrl);
		
		plf.columns=4
		var OTORostMstrButtColumn = plf.addColumnSection({});
		
		if(plf.defaultLayout==3)
		{
			plf.columns=3
			
			var OTORostMasterButtCtrl=
			[	
				plf.addButton({"label":"Get Next Vehicle",id:"getVehicleRoster","tooltip":"Click here to get the next vehicle."}),
				plf.addButton({"label":"Previous Set",id:"previousset","tooltip":"Click here to get the previous set."}),
				plf.addButton({"label":"Next Set",id:"nextset","tooltip":"Click here to get the next set."})
			]
		
		}
		
		else
		{
			OTORostMasterButtCtrl=
			[	
				plf.addButton({"label":"Get Next Vehicle",id:"getVehicleRoster","tooltip":"Click here to get the next vehicle."}),
				plf.addButton({"label":"Previous Set",id:"previousset","tooltip":"Click here to get the previous set."}),
				plf.addButton({"label":"Next Set",id:"nextset","tooltip":"Click here to get the next set."}),
				plf.addBlank()
				
				
			]
		}
		
		OTORostMstrButtColumn.add(OTORostMasterButtCtrl);
		
		//Driver License Grid section starts
		var rosteringBulkGridObj=
		[   
                     {columnname:"Shipment Number",dataname:"SHIPMENT_LIST",datatype:"string",width:150,hidden:true},
			{columnname:"Load No",dataname:"DOC_NO",datatype:"string",width:150},
			{columnname:"Document<br>Line.No",dataname:"DOC_LINE_NO",datatype:"string",width:70,hidden:true},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:125},
			{columnname:"Vehicle",dataname:"TRUCK_CODE",datatype:"string",editControl:"textbox",width:125,hidden:true},
			{columnname:"Vehicle No",dataname:"TRUCK_REGNO",datatype:"string",width:125,inputFormat:"string",colAlign:'center'},
              	{columnname:"Carrier Name",dataname:"CODE3PL",datatype:"string",width:125},
			{columnname:"Phone Number",dataname:"PHONE_NO",datatype:"string",width:125,colAlign:'center'},
                     {columnname:"Driver",dataname:"DRIVER_NAME",datatype:"string",editControl:"textbox",width:125,inputFormat:"string",helpid:'drivermaster'},
			{columnname:"Driver",dataname:"DRIVER_CODE",datatype:"string",width:85,editControl:"textbox",hidden:true},
      			{columnname:"Inspection No",dataname:"INSPECTION_NO",datatype:"string",width:110,editControl:"textbox"},
			{columnname:"Inspection Date",dataname:"INSPECTION_DATE",datatype:"string",width:110,editControl:"date"},
			{columnname:"Inspection Time",dataname:"INSPECTION_TIME",datatype:"string",width:110,editControl:"textbox"},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:80},
			{columnname:"Ref<br>Line.No",dataname:"REF_LINE_NO",datatype:"string",width:70,hidden:true},
			{columnname:"Unavailability Reason",dataname:"REASON",datatype:"string",width:80,storeId:"strReason",editControl:"combo"},
			{columnname:"Date",dataname:"NEXTDATE",datatype:"string",width:80,editControl:"textbox"}

		]
		VehicleRostGridDtl=
		{
			title:"",
			id:"getDetailsGrid",
			detail:rosteringBulkGridObj,
			removeAddDelete:true
		
		}
		var VehicleRostGridSection = plf.addGrid(VehicleRostGridDtl,this)	
		//Add Child Sections
		
		mainpage.ptrMainSection.add(OTORostMstrColumn) //Add Header Section to Main Page
		mainpage.ptrMainSection.add(OTORostMstrButtColumn)
		mainpage.ptrMainSection.add(VehicleRostGridSection)
		//History Data Section
		/*mainpage.dataHistorySectionFlag=true;*/
		
		
		mainpage.eventHandlers = 
		[
			 {
				"controlid":"",
				"tasktype":"onload",
				"input":["strRequestNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"initOTOTS"
		}, 
		{       
				     
				"controlid":"getVehicleRoster",
				"tasktype":"btnclick",
				"input":["getDetailsGrid","strRequestNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"getOTLRosterTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Allocate Vehicle",
				"input":["getDetailsGrid","strRequestNo"],
                "service":"TMSCoreTransportTS",
				"methodName":"allocateOTOVehicleTS"				
		},
       {       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Schedule Inspection",
				"input":["getDetailsGrid","strRequestNo"],
                "service":"TMSCoreTransportTS",
				"methodName":"scheduleOTOInspTS"				
		},
        {       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Mark Unavailable",
				"input":["getDetailsGrid","strRequestNo"],
                "service":"TMSCoreTransportTS",
				"methodName":"unavailOTOTS"				
		},

        {       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Roster Next Day",
				"input":["getDetailsGrid","strRequestNo"],
                            "service":"TMSCoreTransportTS",
				"methodName":"rosterNextDayTS"				
		},
		
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
					{"parent":"DRIVER_CODE","child":"DRIVER_CODE"},
					{"parent":"DRIVER_NAME","child":"DRIVER_NAME"}
					       ]
				}
		}
		
	/*	mainpage.screenLinks=
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
			
		}*/
		this.callParent(arguments);
		
	}
});
