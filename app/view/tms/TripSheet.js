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
Ext.define('CueTrans.view.tms.TripSheet', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Trip Sheet";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		mainpage.toolbarActions= [{
                "name": "Print",
                "tooltip": "Click here to print."
            }
            ]
			
		mainpage.toolbarLinks=
		[
		]
		
		//Add Keyfields
		mainpage.keyFields=["strTripSheetNo"]
		
		//Trip sheet Section starts

		var formCtrl=[];
		plf.columns=4
		var tripMasterColumn = plf.addColumnSection({});
		
		
		var tripMasterFormCtrl=
		[
			plf.addHlpText({"label":"Trip Sheet No",id:"strTripSheetNo","mandatory":"true",hlpLinkID:"tripSheet",inputFormat:"string",InputLength:"60"},this),
			plf.addDate({"label":"Date","id":"dtDate","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			plf.addHlpText({"label":"Vehicle Code",id:"strTruckCode","mandatory":"true",hlpLinkID:"vehicleCode",inputFormat:"string",InputLength:"60"},this),
			plf.addDisplayOnly({"label":"Vehicle Regn.No","id":"strTruckRegNo"}),
			plf.addDisplayOnly({"label":"Base Location","id":"strBaseLocation"}),
			plf.addDisplayOnly({"label":"Vehicle Category","id":"strVehicleCategory"}),
			plf.addHlpText({"label":"Driver Code",id:"strDriverCode","mandatory":"true",hlpLinkID:"driverCode",inputFormat:"string",InputLength:"60"},this),
			plf.addDisplayOnly({"label":"Driver Name","id":"strDriverName"}),
			plf.addDisplayOnly({"label":"Phone Number","id":"strPhoneNo"}),
			plf.addDisplayOnly({"label":"Vehicle Capacity(tons)","id":"strVehicleCapacity"}),
			plf.addBlank(),
			plf.addBlank()
		
		]
		
		tripMasterColumn.add(tripMasterFormCtrl);
		//Trip sheet Section Ends
		
		//vehicle summary Section Begins
		plf.columns=7
		var tripFieldsetColumn = plf.addColumnSection({title:"Vehicle Summary"});
		var tripFieldsetFormCtrl=
		[
			plf.addDisplayOnly({"label":"Current Location","id":"strCurrentLocation"}),
			plf.addDisplayOnly({"label":"Current Document Type","id":"strCurrentDocumentType"}),
			plf.addDisplayOnly({"label":"Current Document No","id":"strCurrentDocumentNo"}),
			plf.addDisplayOnly({"label":"Current Planned Arrival","id":"strCurPlanArr"}),
		
		]
		tripFieldsetColumn.add(tripFieldsetFormCtrl);
		//Vehicle summary Section Ends
		
		//Adding Grid to Trip Sheet
		plf.columns=4
        var tripDetailsPlan = plf.addColumnSection({title:""});
		var tripFieldObj=
		[
			
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Document No",dataname:"DOC_NO",datatype:"string",editControl:"textbox",width:300},
			{columnname:"From Location",dataname:"ORIGIN",datatype:"string",editControl:"textbox",width:100},
			{columnname:"To Location",dataname:"DESTINATION",datatype:"string",editControl:"textbox",width:300},
			{columnname:"Start ODO Reading",dataname:"DATES",datatype:"string",editControl:"textbox",width:100},
			{columnname:"End ODO Reading",dataname:"END_ODO_READING",datatype:"string",editControl:"textbox",width:300},
			{columnname:"Planned Arrival Date",dataname:"PLANNED_ARRIVAl_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Actual Arrival Date",dataname:"ACTUAL_ARRIVAL_DATE",datatype:"string",editControl:"date",width:300},
			{columnname:"Status",dataname:"STATUS",datatype:"string",editControl:"textbox",width:300}
		]
		tripGridDtl=
		{
			title:"Trip Details",
			id:"tripSheet",
			detail:tripFieldObj
		}
		var tripGridSection = plf.addGrid(tripGridDtl,this)
		//helpGridSection = plf.addGrid(helpOncalendarGridDtl,this)	
		//Trip Sheet Grid Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(tripMasterColumn)//Add Header Section to Main 
		mainpage.ptrMainSection.add(tripFieldsetColumn)//Add vehicle summary Section to Main trip sheet Page
		mainpage.ptrMainSection.add(tripGridSection) 
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		
		// Event Handlers Mapping Begins
			/*	mainpage.eventHandlers = 
			[
                 
                {
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"",
					"methodName":""
				},					 
				{
					"controlid":"",
					"tasktype":"onenter",
					"input":[""],
					"service":"",
					"methodName":""
				},	
				
				{
				"grideventid":"",
				"tasktype":"",
				"input":[""],
				"service":"",
				"methodName":""
			},
				     
             {       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print",
				"input":[""],
				"service":"",
				"methodName":""
			},
			
			{
					"tasktype":"proto",
					"filename":"jm_master/CalendarMaster.json"
				}
			
				
			];
			
		mainpage.hlpLinks=
		{
			"tripSheet":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TripSheet",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTripSheetNo","child":"TRIP_SHEET_NO"}
							]
				},
				
				"vehicleCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckMaster",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTruckCode","child":"TRUCK_CODE"}
							]
							]
				},
				"driverCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.DriverMaster",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strDriverCode","child":"DRIVER_CODE"}
							]
				}

		}		
		
		/*mainpage.screenLinks=
		{
			"jm_calendarexceptions":
				{
					"dest":"jm_master.CalendarExceptions",
					"hdr":[
							{"src":"strCalenderCode","dest":"strCalenderCode"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"jm_calendarconstraints":
			{
					"dest":"jm_master.CalenderConstraints",
					"hdr":[
							{"src":"strCalenderCode","dest":"strCalenderCode"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
				
		}*/
			
			//Generate Screen Section
	/*	mainpage.generateScreen();
		
		
		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
		
	
	}
});
