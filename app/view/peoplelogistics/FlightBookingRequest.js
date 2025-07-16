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
Ext.define('CueTrans.view.peoplelogistics.FlightBookingRequest', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.screenName = "Flight Booking";
		mainpage.startPainting();
		//mainpage.liveScreenFlag=false;
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Save",
                "tooltip": "Click here to save flight booking details."
            },
			{
                "name": "Confirm",
                "tooltip": "Click here to confirm flight booking."
            }
            ]
		
		//Flight Booking Request Header Section Begins
		plf.columns=4
		var BookingHdrCollapse = plf.addColumnSection({});
		
		var helpOnBookingFormCtrl=
		[
			plf.addHlpText({"label":"Flight Booking No",id:"strFlightBookReqNo",hlpLinkID:"FlightbookingNo",inputFormat:"string",InputLength:"40"},this),	
			//plf.addText({"label":"Travel Request No",id:"strTravelRequestNo","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Travel Request No",id:"strTravelRequestNo"}),
			plf.addDisplayOnly({"label":"Reporting Date/Time",id:"dtReportDateTime"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addDisplayOnly({"label":"Traveller Code",id:"strTravellerCode"}),
			plf.addDisplayOnly({"label":"Traveller Name",id:"strTravellerName"}),
			plf.addDisplayOnly({"label":"Traveller Type",id:"strTravellerType"}),
			plf.addDisplayOnly({"label":"Grade",id:"strGrade"}),
			plf.addDisplayOnly({"label":"Gender",id:"strGender"}),
			//plf.addDisplayOnly({"label":"DOB",id:"strDob"}),
			//plf.addDisplayOnly({"label":"Age",id:"strAge"}),
			plf.addDisplayOnly({"label":"Travel Type",id:"strTravelType"}),
			plf.addDisplayOnly({"label":"Purpose",id:"strPurpose"}),
			plf.addDisplayOnly({"label":"Starting Location",id:"strOrigin"}),
			plf.addDisplayOnly({"label":"Destination Location",id:"strDestination"}),
			plf.addDisplayOnly({"label":"Meal Preference",id:"strMealPreference"}),
			plf.addText({"label":"Remarks",id:"strRemarks"})
			]
		BookingHdrCollapse.add(helpOnBookingFormCtrl);
		//Flight Booking Request Header Section Ends
		
		//Flight Booking Request Grid Section Begins
		var helpOnBookingGridFieldObj=							//69995
		[
			{columnname:"From Location",dataname:"FROM_LOCATION",datatype:"string",storeId:"strFromRegion",width:150,editControl:"combo"},
			{columnname:"To Location",dataname:"TO_LOCATION",datatype:"string",storeId:"strToLocation",width:150,editControl:"combo"},
			{columnname:"Airline",dataname:"AIRLINE",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"Flight No",dataname:"FLIGHT_NO",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"Terminal Info",dataname:"TERMINAL_INFO",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"Ticket No",dataname:"TICKET_NUMBER",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"Departure Date",dataname:"DEPARTURE_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Departure Time",dataname:"DEPARTURE_TIME",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"Arrival Date",dataname:"ARRIVAL_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Arrival Time",dataname:"ARRIVAL_TIME",datatype:"string",width:100,editControl:"textbox"},	
			{columnname:"Attach Ticket",dataname:"ATTACH_DOCUMENT",datatype:"string",editControl:"fileupload",fileGroup:"People\\Documents",width:150}
		]
		var helpOnBookingGridDtl=							//69995					
		{
			title:"Travel Details",
			id:"FlightBookingRequest",
			detail:helpOnBookingGridFieldObj,
			visibleRow:plf.helpVisibleRows
		}
		var helpGridSection = plf.addGrid(helpOnBookingGridDtl,this)
		//mainpage.hlpSearchGridPtr = helpGridSection		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		//Add Child Sections
		mainpage.ptrMainSection.add(BookingHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[									
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strFlightBookReqNo"],
				"service":"PPLCoreTS",
				"methodName":"initFlightbookingTS"
		},
        {
				"controlid":"strFlightBookReqNo",
				"tasktype":"onenter",
				"input":["strFlightBookReqNo"],
				"service":"PPLCoreTS",
				"methodName":"fetchFlightbookingTS"
	    },			
		{
			
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Save",
				"input":["strFlightBookReqNo","strTravelRequestNo","dtReportDateTime","strStatus",
						"strTravellerCode","strTravellerName","strTravellerType","strGrade",
						"strGender","strDob","strAge","strTravelType","strPurpose","strOrigin",
						"strDestination","strMealPreference","strRemarks","FlightBookingRequest"],
				"service":"PPLCoreTS",
				"methodName":"createFlightbookingTS"
		},
		
		{
			
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["strFlightBookReqNo","strTravelRequestNo","dtReportDateTime","strStatus",
						"strTravellerCode","strTravellerName","strTravellerType","strGrade",
						"strGender","strDob","strAge","strTravelType","strPurpose","strOrigin",
						"strDestination","strMealPreference","strRemarks","FlightBookingRequest"],
				"service":"PPLCoreTS",
				"methodName":"ConfirmFlightbookingTS"
		}
						
		
		];
		//Event Handlers Mapping Ends
		//Event Handlers Mapping Ends
		
		mainpage.hlpLinks=
		{
			"FlightbookingNo":
				{
				
				"hlpType":"Header",
				"hlpScreen":"peoplelogistics.FlightBookingHelp",
				"send":[
							{"parent":"","child":""}
					    ],
				"receive":[
							{"parent":"strFlightBookReqNo","child":"FLIGHT_BOOKING_NO"}
							]
				}
					
		}
		
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
