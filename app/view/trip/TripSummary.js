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
Ext.define('CueTrans.view.trip.TripSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.screenName = "Trip Summary";
		mainpage.startPainting();
		
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Create Trip for Load","linkid":"tar_createtrip","tooltip":"Click here to create a trip for load."}//,
			//{"name":"Create Trip for Service","linkid":"tar_createSertrip","tooltip":"Click here to create a trip for service."}
		]
		
		plf.columns=4
		var TripSearchHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);	//69997
		
		var TripFormCtrl=																	//69997
		[
			plf.addText({"label":"Trip Sheet No",id:"strTripSheetNoFrom","anywhereSearch":"true"}),
			plf.addCombo({"label":"Vehicle Category",id:"strVehCat"}),
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addCombo({"label":"Status",id:"strTripStatus"}),
			plf.addDate({"label":"Date From",id:"dtDepdateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDepdateTo"}),
			plf.addCombo({"label":"Origin",id:"strTripStgPt"}),
			plf.addCombo({"label":"Destination",id:"strTripEnd"}),
			plf.addText({"label":"Vehicle No",id:"strVehicleNo"}),
			plf.addText({"label":"Carrier Code",id:"strCarrier"}),
			plf.addText({"label":"Load No",id:"strLoadNo"}),
			plf.addText({"label":"Last Destination",id:"strLastDest"})	
		]
		TripSearchHdrCollapse.add(TripFormCtrl);
		//Calendar List Header Section Ends
		
		//Calendar Grid Section Begins
		var TripGridFieldObj=												//69997
		[
			{columnname:"Trip Sheet<BR>No",dataname:"TRIP_SHEET_NO",datatype:"string",width:100,linkId:"tripsheet","tooltip":"Click here to launch the trip sheet screen."},
			{columnname:"Status",dataname:"TRIP_STATUS",datatype:"string",width:130},
			{columnname:"Trip Sheet<BR>Date",dataname:"TRIP_SHEET_DATE",datatype:"string",width:90},
			{columnname:"Vehicle<BR>Category",dataname:"VEH_CAT",datatype:"string",width:90},
			{columnname:"Departure<BR>Date/Time",dataname:"DEP_DATE",datatype:"string",width:130},
			{columnname:"Origin",dataname:"TRIP_STG_PT",datatype:"string",width:100},
			{columnname:"Destination",dataname:"TRIP_END_PT",datatype:"string",width:100},
			{columnname:"Vehicle No",dataname:"VEH_NO",datatype:"string",width:100},
			{columnname:"Carrier Code",dataname:"CARRIER_CODE",datatype:"string",width:100},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:120},
			{columnname:"Last Destination",dataname:"LAST_DEST",datatype:"string",width:150},
			{columnname:"Load<BR>Distance",dataname:"LOAD_DIST",datatype:"string",width:90},
			{columnname:"NoLoad<BR>Distance",dataname:"NO_LOAD_DIST",datatype:"string",width:110},
			{columnname:"Total<BR>Distance",dataname:"TOT_DIST",datatype:"string",width:90},
			{columnname:"Trip<BR>Efficiency",dataname:"TRIP_EFFICIENCY",datatype:"string",width:90},
			{columnname:"Trip Closure<BR>Date",dataname:"TRIP_CLOS_DATE",datatype:"string",width:100}
			
			
		]
		TripGridDtl=
		{
			title:"",
			id:"tripList",
			removeAddDelete:true,
			visibleRow:plf.searchVisibleRows,
			detail:TripGridFieldObj,
			readonly:true
			
		}
		var TripGridSection = plf.addGrid(TripGridDtl,this)			//69997
		//Calendar Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(TripSearchHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(TripGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strTripSheetNoFrom","strVehCat","strTripStatus","dtDepdateFrom","dtDepdateTo",
				        "strTripStgPt","strTripEnd","strDateType","strVehicleNo","strCarrier","strLoadNo","strLastDest"],
				"service":"TRPLISTCoreTripListTS",
				"methodName":"fetchAllTripsTS"
			},
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TRPLISTCoreTripListTS",
				"methodName":"initTripSumScrTS"
			}
	
		];
		//Event Handlers Mapping Ends
		
		mainpage.screenLinks=
		{
			
				"tar_createtrip":
				{
					"dest":"trip.TripSheet",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				/*
				"tar_createSertrip":
				{
					"dest":"service.TripSheetService",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},*/
				"tripsheet":
				{
					"dest":"trip.TripSheet",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"TRIP_SHEET_NO","dest":"strTripSheetNo"}
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
