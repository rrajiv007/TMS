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
Ext.define('CueTrans.view.peoplelogistics.FlightBookingHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
   
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Flight Booking Help";
		mainpage.liveScreenFlag=true;
		mainpage.toolbarSectionFlag=true;
        /*mainpage.toolbarLinks=
		[
			{"name":"Flight Booking Request","linkid":"pl_flightBook","tooltip":"Click here create a flight booking request."}
		]*/
		
		
		//HelpOnEmployee Search Section starts
		plf.columns=4
		var flightBookHdrCollapse = plf.addColumnSection({collapsed: true});
			
		var flightBookFormCtrl=
		[
			plf.addText({"label":"Flight Booking No",id:"strFlightBookReqNo"}),			
			plf.addText({"label":"Travel Request No",id:"strTravelRequestNo"}),
			plf.addText({"label":"Traveller Name",id:"strTravellerName"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Travel Type",id:"strTravelType"}),
			plf.addDate({"label":"Reporting Date",id:"dtReportDate"}),
			plf.addText({"label":"Starting Location",id:"strOrigin"}),
			plf.addText({"label":"Destination Location",id:"strDestination"}),
			plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
		
		]
		
		flightBookHdrCollapse.add(flightBookFormCtrl);
		//HelpOnEmployee Header Section Ends
		
		//HelpOnEmployee Grid Section Begins
		var flightBookGridFieldObj=								//69995
		[
			{columnname:"Flight Booking No",dataname:"FLIGHT_BOOKING_NO",datatype:"string",width:120,linkId:"flightBook","tooltip":"Click here to launch the flight booking screen."},
			{columnname:"Travel Request No",dataname:"TRAVEL_REQUEST_NO",datatype:"string",width:120},
			{columnname:"Traveller Name",dataname:"TRAVELLER_NAME",datatype:"string",width:100},
			{columnname:"Travel Type",dataname:"TRAVEL_TYPE",datatype:"string",width:100},
			{columnname:"Purpose",dataname:"PURPOSE",datatype:"string",width:100},
			{columnname:"Reporting Date",dataname:"REPORTING_DATE",datatype:"string",datatype:"string",width:100},
			{columnname:"Reporting Time",dataname:"REPORTING_TIME",datatype:"string",datatype:"string",width:100},
			{columnname:"Starting Location",dataname:"STARTING_LOC",datatype:"string",width:100},
			{columnname:"Destination Location",dataname:"DEST_LOC",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100},
		]
		var flightBookGridDtl=											//69995
		{

		title:"",
		id:"flightBooking",
	    detail:flightBookGridFieldObj,
		readonly:true,
		visibleRow:plf.searchVisibleRows,
		widthBasis:"flex",
		}
		var flightBookGridSection = plf.addGrid(flightBookGridDtl,this)			//69995
		//HelpOnEmployee Grid Section Ends
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(flightBookHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(flightBookGridSection) //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[	
			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"PPLCoreTS",
				"methodName":"initFlightBookingSearchScrTS"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strFlightBookReqNo","strTravelRequestNo","strTravellerName","dtReportDate","strStatus","strTravelType","strOrigin","strDestination"],
				"service":"PPLCoreTS",
				"methodName":"fetchAllFlightBookingSrchScrTS"
			},
			
			{
			"tasktype":"proto",
			"filename":"peoplelogistics/FlightBookingSummary.json"
			}
		];
		//Event Handlers Mapping Ends
		
		mainpage.screenLinks=
		{
			"flightBook":
				{
					"dest":"peoplelogistics.FlightBookingRequest",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"FLIGHT_BOOKING_NO","dest":"strFlightbookingRequestNo"}
							]
				},
				"pl_flightBook":
				{
					"dest":"peoplelogistics.FlightBookingRequest",
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
