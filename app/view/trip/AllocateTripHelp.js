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
Ext.define('CueTrans.view.trip.AllocateTripHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.screenName = "Help on Trip";
		mainpage.hlpSectionFlag=true
		mainpage.startPainting();
		/*
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Create a Trip","linkid":"tar_createtrip","tooltip":"Click here to create a trip."}
		]
		*/
		plf.columns=4
		var TripSearchHdrCollapse =  plf.addColumnSection({title:"Search Criteria"});	//69997
		
		var TripFormCtrl=																//69997
		[
			plf.addText({"label":"Trip Sheet No",id:"strTripSheetNoFrom","anywhereSearch":"true"}),			
			plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehCat"}),
			plf.addDisplayOnly({"label":"Departure Date",id:"dtDepDtFrom"}),			
			plf.addCombo({"label":"Trip Starting Point",id:"strTripStgPt"}),
			plf.addCombo({"label":"Trip Ending Point",id:"strTripEnd"}),
			plf.addBlank(),
			plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."}),
		]
		TripSearchHdrCollapse.add(TripFormCtrl);
		//Calendar List Header Section Ends
		
		//Calendar Grid Section Begins
		var TripGridFieldObj=										//69997
		[
			{columnname:"Trip Sheet No",dataname:"TRIP_SHEET_NO",datatype:"string",width:150},
			{columnname:"Trip Sheet Date",dataname:"TRIP_SHEET_DATE",datatype:"string",width:100},
			{columnname:"Vehicle Category",dataname:"VEH_CAT",datatype:"string",width:100},
			{columnname:"Departure Date/Time",dataname:"DEP_DATE",datatype:"string",width:150},
			{columnname:"Trip Starting Point",dataname:"TRIP_STG_PT",datatype:"string",width:120},
			{columnname:"Trip Ending Point",dataname:"TRIP_END_PT",datatype:"string",width:100},
			{columnname:"Load Distance",dataname:"LOAD_DIST",datatype:"string",width:100},
			{columnname:"NoLoad Distance",dataname:"NO_LOAD_DIST",datatype:"string",width:100},
			{columnname:"Total Distance",dataname:"TOT_DIST",datatype:"string",width:100},
			{columnname:"Trip Efficiency",dataname:"TRIP_EFFICIENCY",datatype:"string",width:100},
			{columnname:"Trip Closure Date",dataname:"TRIP_CLOS_DATE",datatype:"string",width:120},
			{columnname:"Status",dataname:"TRIP_STATUS",datatype:"string",width:100}
			
		]
		TripGridDtl=
		{
			title:"",
			id:"tripList",
			removeAddDelete:true,
			visibleRow:plf.helpVisibleRows,
			detail:TripGridFieldObj
			
		}
	//	TripGridSection = plf.addGrid(TripGridDtl,this)	
		//Calendar Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(TripSearchHdrCollapse)
		var helpGridSection=plf.addGrid(TripGridDtl,this)	//69997
		mainpage.hlpSearchGridPtr = helpGridSection
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strTripSheetNoFrom","strVehCat","dtDepDtFrom","strTripStgPt","strTripEnd"],
				"service":"TRPLISTCoreTripListTS",
				"methodName":"fetchAllOCTripHlpTS"
			},
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strVehCat","dtDepDtFrom"],
				"service":"TRPLISTCoreTripListTS",
				"methodName":"InitAloclTripSummary"
			}
	
		];
		//Event Handlers Mapping Ends
		
	/*	mainpage.screenLinks=
		{
			
				"tar_createtrip":
				{
					"dest":"tariff.TripSheet",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"tripsheet":
				{
					"dest":"tariff.TripSheet",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"TRIP_SHEET_NO","dest":"strTripSheetNo"}
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
