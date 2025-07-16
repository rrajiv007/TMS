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
Ext.define('CueTrans.view.tms.VehicleRosteringBulk', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Vehicle Bulk Scheduling";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		
		mainpage.toolbarActions= [{
                "name": "Allocate Vehicle",
                "tooltip": "Click here to allocate a vehicle."
            },
			{
                "name": "Schedule Inspection",
                "tooltip": "Click here to schedule a inspection."
            }
            ]
	//	mainpage.toolbarActions=["Allocate Vehicle","Schedule Inspection"]
		mainpage.toolbarLinks=
		[
			{"name":"Get Vehicle Sequence","linkid":"tms_vehiclesequence","tooltip":"Click here to launch the vehicle sequence."}
		]
		
		//Add Keyfields
		mainpage.keyFields=[""]
		
		
		plf.columns=3
		var vehRosBlkHdrColumn = plf.addColumnSection({});
		
		
		var vehRosBlkHdrCtrl=
		[
			
			plf.addDate({"label":"Date",id:"dtDate","mandatory":"true"}),
			plf.addText({"label":"Time",id:"strTime"}),
                     plf.addCombo({"label":"Commodity",id:"strCommodity"}),
			//plf.addCombo({"label":"Priority",id:"strPriority"}),
			
			
			plf.addCombo({"label":"Origin",id:"strOrigin"}),	
			plf.addCombo({"label":"Destination",id:"strDestination"}),			
			plf.addBlank(),

			plf.addBlank(),
			plf.addButton({"label":"Search",id:"getDetailsBtn","tooltip":"Click here to search."}),
			plf.addButton({"label":"Get Next Vehicle",id:"getVehicleRoster","tooltip":"Click here to get next vehicle."}),
		]
		
		vehRosBlkHdrColumn.add(vehRosBlkHdrCtrl);
		
		
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(vehRosBlkHdrColumn)//Add Header Section to Main Page
		
		var rosteringBulkGridObj=
		[
		//	{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:120},

			{columnname:"Request No",dataname:"REQUEST_LIST",datatype:"string",width:150},
			//{columnname:"Shipment No",dataname:"SHIPMENT_LIST",datatype:"string",width:150},
                     {columnname:"Load No",dataname:"DOC_NO",datatype:"string",width:150},
        		{columnname:"Document<br>Line.No",dataname:"DOC_LINE_NO",datatype:"string",width:70,hidden:true},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:125},
			{columnname:"Vehicle",dataname:"TRUCK_CODE",datatype:"string",editControl:"textbox",width:125,hidden:true},
			{columnname:"Vehicle",dataname:"TRUCK_REGNO",datatype:"string",editControl:"textbox",width:125,inputFormat:"string"},
              	{columnname:"Carrier Name",dataname:"CODE3PL",datatype:"string",width:125},
			{columnname:"Phone Number",dataname:"PHONE_NO",datatype:"string",width:125},
		//	{columnname:"Carrier",dataname:"CARRIER_CODE",datatype:"string",width:100,editControl:"textbox",helpid:'carriercontract',"onenter":"CARRIER_CODE_ONENTER"},
                     {columnname:"Driver",dataname:"DRIVER_NAME",datatype:"string",editControl:"textbox",width:125,inputFormat:"string",helpid:'drivermaster'},
			{columnname:"Driver",dataname:"DRIVER_CODE",datatype:"string",width:85,editControl:"textbox",hidden:true},
			{columnname:"Inspection Date",dataname:"INSPECTION_DATE",datatype:"string",width:110,editControl:"date"},
			{columnname:"Inspection Time",dataname:"INSPECTION_TIME",datatype:"string",width:110,editControl:"textbox"},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:80},
			{columnname:"Ref<br>Line.No",dataname:"REF_LINE_NO",datatype:"string",width:70,hidden:true},
                     
		]
		
		rosteringBulkGridDtl=
		{
			title:"Effort",
			id:"getDetailsGrid",
			detail:rosteringBulkGridObj,
			columnWidth:.5,
			visibleRow:8
		
		}
		var rosteringBulkGridDtlGridSection = plf.addGrid(rosteringBulkGridDtl,this)
		
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	      {
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initVehRosterBulkTS"
		},
		{       
				     
				"controlid":"getDetailsBtn",
				"tasktype":"btnclick",
				"input":["dtDate","strTime","strPriority","strCommodity","strOrigin","strDestination"],
				"service":"TMSCoreTransportTS",
				"methodName":"getDetailsTS"
		},
		{       
				     
				"controlid":"getVehicleRoster",
				"tasktype":"btnclick",
				"input":["getDetailsGrid"],
				"service":"TMSCoreTransportTS",
				"methodName":"getVehicleRosterTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Allocate Vehicle",
				"input":["getDetailsGrid","dtDate","strTime","strPriority","strCommodity","strOrigin","strDestination"],
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
					,{"parent":"DRIVER_NAME","child":"DRIVER_NAME"}
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
			
		//Generate Screen Section
		//mainpage.generateScreen();
		
		mainpage.ptrMainSection.add(rosteringBulkGridDtlGridSection)//Add Header Section to Main Page
		this.callParent(arguments);
		
	}
});
