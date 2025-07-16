/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
		                                   
************************************************************************************************/
Ext.define('CueTrans.view.peoplelogistics.ShuttleRequest', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Shuttle Request";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create shuttle request."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit shuttle request."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete shuttle request."
            },
			{
                "name": "Confirm",
                "tooltip": "Click here to confirm shuttle request."
            }/*,
            {
                "name": "Approve",
                "tooltip": "Click here to approve shuttle request."
            }*/
            ]
		
		//Add Keyfields
		mainpage.keyFields=["strShuttleRequestNo"]
		
		//EmployeeMaster Header Section Begins
		plf.columns=4
		var ShuttleRequestColumn = plf.addColumnSection({});
		var ShuttleRequestCtrl=
		[
			/*plf.addHlpText({"label":"Shuttle Request No",id:"strShuttleRequestNo","mandatory":"true",hlpLinkID:"ShuttleRequest",inputFormat:"string",InputLength:"100"},this),*/
			plf.addHlpText({"label":"Shuttle Request No",id:"strShuttleRequestNo",hlpLinkID:"ShuttleRequest",inputFormat:"string",InputLength:"100"},this),
			plf.addDisplayOnly({"label":"Travel Request No","id":"strTravelRequestNo",inputFormat:"string",InputLength:"100"}),
			plf.addDate({"label":"Request Date",id:"dtTranDate","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus",inputFormat:"string",InputLength:"100"}),
			plf.addHlpText({"label":"Traveller Code",id:"strTravellerCode","mandatory":"true",hlpLinkID:"TravellerCode",inputFormat:"string",InputLength:"100"},this),
			plf.addDisplayOnly({"label":"Traveller Name",id:"strTravellerName",inputFormat:"string",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Traveller Type",id:"strTravellerType"}),
			plf.addDisplayOnly({"label":"Grade",id:"strGrade"}),
			plf.addDisplayOnly({"label":"Gender",id:"strGender"}),
			//plf.addBlank({}),
			plf.addHlpText({"label":"Calendar Code",id:"strCalendarCode",hlpLinkID:"calendarCode",inputFormat:"string",InputLength:"100"},this),
			plf.addDisplayOnly({"label":"Calendar Description",id:"strCalenderDesc"}),
			plf.addCombo({"label":"Purpose",id:"strPurpose","mandatory":"true"}),	
			plf.addDate({"label":"Travel Date From",id:"dtTravelDtFrom","mandatory":"true"}),
			plf.addDate({"label":"Travel Date To",id:"dtTravelDtTo","mandatory":"true"}),
			//plf.addCombo({"label":"Pickup Location",id:"strOrigin",inputFormat:"string",InputLength:"100","mandatory":"true"}),
			plf.addTime({"label":"Pickup Time",id:"strPickupTime","mandatory":"true"}),
			//plf.addCombo({"label":"Drop Location",id:"strDestination",inputFormat:"string",InputLength:"100","mandatory":"true"}),
			plf.addText({"label":"Remarks",id:"strRemarks"}),
			plf.addDisplayOnly({"label":"Approver Name",id:"strApproverName"})
			
		]
		ShuttleRequestColumn.add(ShuttleRequestCtrl);
		//EmployeeMaster Header Section Ends
		
		var ShuttleRequestDef = plf.addColumnSection({});
		var ShuttleRequestDefCtrl=
		[
			plf.addCombo({"label":"Pickup Location",id:"strPickupLoc","listeners":{
										change: function (field, newValue, oldValue) 
										{					 	 
											var gridStore = Ext.data.StoreManager.lookup('VehicleDetails_store');				 
											Ext.each(gridStore.getRange(), function(record) 
											{
												
												record.set('PICKUP_LOC',newValue)												
											})				 
										}
									}}),
			plf.addCombo({"label":"Drop Location",id:"strDropLoc","listeners":{
										change: function (field, newValue, oldValue) 
										{					 	 
											var gridStore = Ext.data.StoreManager.lookup('VehicleDetails_store');				 
											Ext.each(gridStore.getRange(), function(record) 
											{
												record.set('DROP_LOC',newValue)												
											})				 
										}
									}})
		]
		ShuttleRequestDef.add(ShuttleRequestDefCtrl);
		var VehicleRequestDtl=
		[   			
			{columnname:"Travel Date",dataname:"TRAVEL_DATE",datatype:"string",width:150},
			{columnname:"Pickup Location",dataname:"PICKUP_LOC",datatype:"string",editControl:"combo",width:100,storeId:"strOrigin"},
			{columnname:"Drop Location",dataname:"DROP_LOC",datatype:"string",editControl:"combo",width:100,storeId:"strDestination"},			
			{columnname:"Travel Time",dataname:"TRAVEL_TIME",datatype:"string",width:150,hidden:true},
			{columnname:"Vehicle Reg No",dataname:"VEHICLE_REG_NO",datatype:"string",width:200,hidden:true},
			{columnname:"Shuttle No",dataname:"SHUTTLE_NO",datatype:"string",width:200},
			{columnname:"Seat No",dataname:"SEAT_NO",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:150}
		]
		var VehicleRequestGridDtl=
		{
			title:"Vehicle Details",
			id:"VehicleDetails",
			detail:VehicleRequestDtl,
			readonly:"true"		
		}
		var VehicleRequestGridSection = plf.addGrid(VehicleRequestGridDtl,this)	
		mainpage.ptrMainSection.add(ShuttleRequestColumn)
		
		var ShuttleRequestDtl=
		[   			
			{columnname:"Designation",dataname:"DESIGNATION",datatype:"string",storeId:"strDocumentType",editControl:"DisplayOnly",width:150},
			{columnname:"Name",dataname:"NAME",datatype:"string",editControl:"DisplayOnly",width:150},
			{columnname:"Date",dataname:"DATE",datatype:"date",width:150,editControl:"DisplayOnly"},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:150,editControl:"DisplayOnly"},
		]
		var ShuttleRequestGridDtl=
		{
			title:"Approval History",
			id:"ShuttleRequest",
			detail:ShuttleRequestDtl,
			readonly:"true"		
		}
		var ShuttleRequestGridSection = plf.addGrid(ShuttleRequestGridDtl,this)	
		mainpage.ptrMainSection.add(ShuttleRequestColumn)//Add Header Section to Main Page
		
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		
		// for green line
		//employeeMasterColumn.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(ShuttleRequestColumn)//add hdr details
		mainpage.ptrMainSection.add(ShuttleRequestDef)//add hdr details
		
		mainpage.ptrMainSection.add(VehicleRequestGridSection)//Add Grid1 Section to Main Page
		mainpage.ptrMainSection.add(ShuttleRequestGridSection)//Add Grid2 Section to Main Page
		mainpage.eventHandlers = 
		[									
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strShuttleRequestNo"],
				"service":"PPLCoreTS",
				"methodName":"initShuttleRequestTS"
			},
			
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strShuttleRequestNo","dtTranDate","strPurpose","strStatus",
				         "strTravellerCode","strTravellerName","strApproverName","dtTravelDtFrom",
						 "dtTravelDtTo","strCalendarCode","strPickupTime",
						 "strTravelRequestNo","strRemarks"
				        ],
				"service":"PPLCoreTS",
				"methodName":"createShuttleREQTS"
	
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strShuttleRequestNo","dtTranDate","strPurpose","strStatus",
				         "strTravellerCode","strTravellerName","strApproverName","dtTravelDtFrom",
						 "dtTravelDtTo","strCalendarCode","strPickupTime",
						 "strTravelRequestNo","strRemarks","VehicleDetails"
				        ],
				"service":"PPLCoreTS",
				"methodName":"editShuttleREQTS"
			},
			
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strShuttleRequestNo","dtTranDate","strPurpose","strStatus",
				         "strTravellerCode","strTravellerName","strApproverName","dtTravelDtFrom",
						 "dtTravelDtTo","strCalendarCode","strPickupTime",
						 "strTravelRequestNo","strRemarks","VehicleDetails"
				        ],
				"service":"PPLCoreTS",
				"methodName":"deleteShuttleREQTS"
			},
			
			{
				"controlid":"strShuttleRequestNo",
				"tasktype":"onenter",
				"input":["strShuttleRequestNo"],
				"service":"PPLCoreTS",
				"methodName":"fetchShuttleReqTS"
			},	
			
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["strShuttleRequestNo","dtTranDate","strPurpose","strStatus",
				         "strTravellerCode","strTravellerName","strApproverName","dtTravelDtFrom",
						 "dtTravelDtTo","strCalendarCode","strPickupTime",
						 "strTravelRequestNo","strRemarks","VehicleDetails"
				        ],
				"service":"PPLCoreTS",
				"methodName":"ConfirmShuttleREQTS"
			},
			{
				"controlid":"strTravellerCode",
				"tasktype":"onenter",
				"input":["strTravellerCode"],
				"service":"PPLCoreMasterTS",
				"methodName":"fetchTravellerCodeTS"
				
			}
			
			
		];
		// Event Handlers Mapping Begins
		/*
		//Event Handlers Mapping Ends
		
		//Generate Screen Section
		//mainpage.generateScreen();
		
		mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":[]
			},
			"locked":
			{
				"enableAll":true,
				"except":["strEmployeeName"]
			},
			"active":
			{
				"enableAll":true,
				"except":["strEmployeeName"]
			}			
		}*/
		
		
		mainpage.hlpLinks=
		{
			"ShuttleRequest":
				{
					"hlpType":"Header",
					"hlpScreen":"peoplelogistics.ShuttleRequestHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strShuttleRequestNo","child":"SHUTTLE_REQ_NO"}
							]
				},
			"WorkLocation":
				{
					"hlpType":"Header",
					"hlpScreen":"",
					"send":[
							 {"parent":"","child":""}
						   ],
					"receive":[
							    {"parent":"","child":""}
							  ]
				},
			"TravellerCode":
				{
					"hlpType":"Header",
					"hlpScreen":"peoplelogistics.EmployeeHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							   {"parent":"strTravellerCode","child":"TRAVELLER_CODE"}
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
							   {"parent":"strCalenderDesc","child":"CALENDAR_DESC"}
							   
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
