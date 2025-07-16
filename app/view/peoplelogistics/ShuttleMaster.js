/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	                           Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.peoplelogistics.ShuttleMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Shuttle Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		//mainpage.liveScreenFlag=false;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create shuttle master."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit shuttle master."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete shuttle master."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate shuttle master."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate shuttle master."
            }
            ]
		
		//Add Keyfields
		
		//shuttleMaster Header Section Begins
		plf.columns=4
		var shuttleMasterColumn = plf.addColumnSection({});			//69995
		var shuttleMstrCtrl=										//69995
		[
			plf.addHlpText({"label":"Shuttle Code",id:"strShuttleCode","mandatory":"true",hlpLinkID:"shuttleCode",inputFormat:"string",InputLength:"40"},this),
			plf.addText({"label":"Shuttle Description",id:"strShuttleDesc",inputFormat:"string",InputLength:"100","mandatory":"true"}),
			plf.addHlpText({"label":"Calendar Code",id:"strCalendarCode",hlpLinkID:"calendarCode","mandatory":"true"},this),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),	
			plf.addDate({"label":"Effective From",id:"dtEffectiveFrom","mandatory":"true"}),
			plf.addDate({"label":"Effective To",id:"dtEffectiveTo","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Calendar Description",id:"strCalendarDesc"})
		]
		shuttleMasterColumn.add(shuttleMstrCtrl);
		//shuttleMaster Header Section Ends
		
		var shuttleDtlObj=
		[   			
			{columnname:"Shuttle No",dataname:"SHUTTLE_NO",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Vehicle Code",dataname:"VEH_CODE",datatype:"string",editControl:"textbox",width:100,helpid:'VehCode'},
			{columnname:"Vehicle Reg No",dataname:"REG_NO",datatype:"string",width:100},
			{columnname:"Route Code",dataname:"ROUTE_CODE",datatype:"string",editControl:"textbox",width:100,helpid:'routecode'},
			{columnname:"Route Description",dataname:"ROUTE_DESC",datatype:"string",width:100},
			{columnname:"Start Time",dataname:"START_TIME",datatype:"string",storeId:"strStartTime",editControl:"time",width:100}
		]
		var shuttleDocDtlGridDtl=
		{
			title:"Shuttle Details",
			id:"shuttleDtl",
			detail:shuttleDtlObj,
			widthBasis:"flex",
			visibleRow:5
		}
		var shuttleDocGridSection = plf.addGrid(shuttleDocDtlGridDtl,this)	
		mainpage.ptrMainSection.add(shuttleMasterColumn)//Add Header Section to Main Page
		
		var vehicleDtlObj=
		[   			
			{columnname:"Travel Date",dataname:"TRAVEL_DATE",datatype:"string",width:100},
			{columnname:"Start Time",dataname:"START_TIME",datatype:"string",width:100},
			{columnname:"Vehicle Code",dataname:"VEH_CODE",datatype:"string",width:100},
			{columnname:"Vehicle Reg No",dataname:"REG_NO",datatype:"string",width:100},
			{columnname:"Route Code",dataname:"ROUTE_CODE",datatype:"string",width:100},
			{columnname:"Route Description",dataname:"ROUTE_DESC",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
		]
		var vehicleDocDtlGridDtl=
		{
			title:"Shuttle Summary",
			id:"vehicleDtl",
			detail:vehicleDtlObj,
			widthBasis:"flex",
			visibleRow:5,
			removeAddDelete:true
		}
		var vehicleDocGridSection = plf.addGrid(vehicleDocDtlGridDtl,this)	
		mainpage.ptrMainSection.add(shuttleMasterColumn)
			
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// for green line
		mainpage.ptrMainSection.add(shuttleMasterColumn)//add hdr details
		mainpage.ptrMainSection.add(shuttleDocGridSection)//Add Grid1 Section to Main Page
		mainpage.ptrMainSection.add(vehicleDocGridSection)//Add Grid2 Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[									
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strShuttleCode"],
				"service":"PPLCoreMasterTS",
				"methodName":"initShuttleMasterScrTS"
		},
        {
				"controlid":"strShuttleCode",
				"tasktype":"onenter",
				"input":["strShuttleCode"],
				"service":"PPLCoreMasterTS",
				"methodName":"fetchShutCodeMasTS"
		},			
		{
			
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"create",
				"input":["strShuttleCode","strShuttleDesc","strStatus","strCalendarCode","dtEffectiveFrom","dtEffectiveTo","shuttleDtl"],
				"service":"PPLCoreMasterTS",
				"methodName":"createShutMasterTS"
		},
		{
			
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"edit",
				"input":["strShuttleCode","strShuttleDesc","strStatus","strCalendarCode","dtEffectiveFrom","dtEffectiveTo","shuttleDtl"],
				"service":"PPLCoreMasterTS",
				"methodName":"editShutMasterTS"
		},
				{
			
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"delete",
				"input":["strShuttleCode","strShuttleDesc","strStatus","strCalendarCode","dtEffectiveFrom","dtEffectiveTo","shuttleDtl"],
				"service":"PPLCoreMasterTS",
				"methodName":"deleteShutMasterTS"
		},
		{
			
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"activate",
				"input":["strShuttleCode","strShuttleDesc","strStatus","strCalendarCode","dtEffectiveFrom","dtEffectiveTo","shuttleDtl"],
				"service":"PPLCoreMasterTS",
				"methodName":"activateShutMasterTS"
		},
		{
			
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"inactivate",
				"input":["strShuttleCode","strShuttleDesc","strStatus","strCalendarCode","dtEffectiveFrom","dtEffectiveTo","shuttleDtl"],
				"service":"PPLCoreMasterTS",
				"methodName":"inactivateShutMasterTS"
		},
		];
		//Event Handlers Mapping Ends
		
		
		mainpage.hlpLinks=
		{
			"shuttleCode":
				{
					"hlpType":"Header",
					"hlpScreen":"peoplelogistics.ShuttleHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strShuttleCode","child":"SHUTTLE_CODE"}
							]
				},
			"calendarCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CalendarHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCalendarCode","child":"CALENDAR_CODE"},
							{"parent":"strCalendarDesc","child":"CALENDAR_DESC"}
							]
				},
			"VehCode":
				{
					"hlpType":"grid",
					"gridID":"shuttleDtl",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}							
						   ],
					"receive":[
								{"parent":"VEH_CODE","child":"TRUCK_CODE"},
								{"parent":"REG_NO","child":"TRUCK_REG_NO"}								
							  ]
				},
			"routecode":
				{
					"hlpType":"grid",
					"gridID":"shuttleDtl",
					"hlpScreen":"jm_master.RouteHelp",
					"send":[
							{"parent":"","child":""}							
						   ],
					"receive":[
								{"parent":"ROUTE_CODE","child":"ROUTE_CODE"},
								{"parent":"ROUTE_DESC","child":"ROUTE_DESC"}								
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
