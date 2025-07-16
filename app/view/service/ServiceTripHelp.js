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
Ext.define('CueTrans.view.service.ServiceTripHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.screenName = "Help on Trip";
		mainpage.hlpSectionFlag=true
		mainpage.startPainting();		
		plf.columns=4
		var TripSearchHdrCollapse =  plf.addColumnSection({title:"Search Criteria",collapsed: false});	//69997
		
		var TripFormCtrl=													//69997
		[
			plf.addText({"label":"Trip Sheet No",id:"strTripSheetNo","anywhereSearch":"true"}),			
			plf.addCombo({"label":"Status",id:"strTripStatus"}),
			plf.addCombo({"label":"Vehicle Category",id:"strVehCat"}),
			plf.addDate({"label":"Required Date From",id:"dtReqdateFrom"}),
			plf.addDate({"label":"Required Date To",id:"dtReqdateTo"}),			
			plf.addCombo({"label":"Trip Starting Point",id:"strTripStgPt"}),
			plf.addCombo({"label":"Trip Ending Point",id:"strTripEnd"}),
			plf.addButton({"label":"Search",id:"btnSearch"})
		]
		TripSearchHdrCollapse.add(TripFormCtrl);
		//Calendar List Header Section Ends
		
		//Calendar Grid Section Begins
		var TripGridFieldObj=												//69997
		[
			{columnname:"Trip Sheet No",dataname:"TRIP_SHEET_NO",datatype:"string",width:120},
			{columnname:"Trip Sheet Date",dataname:"TRIP_SHEET_DATE",datatype:"string",width:100},
			{columnname:"Vehicle Category",dataname:"VEH_CAT",datatype:"string",width:100},
			{columnname:"Required From Date/Time",dataname:"DEP_DATE",datatype:"string",width:150},
			{columnname:"Trip Starting Point",dataname:"TRIP_STG_PT",datatype:"string",width:110},
			{columnname:"Trip Ending Point",dataname:"TRIP_END_PT",datatype:"string",width:110},			
			{columnname:"NoLoad Distance",dataname:"NO_LOAD_DIST",datatype:"string",width:100},
			{columnname:"Trip Closure Date",dataname:"TRIP_CLOS_DATE",datatype:"string",width:100},
			{columnname:"Status",dataname:"TRIP_STATUS",datatype:"string",width:120}
			
		]
		TripGridDtl=
		{
			title:"",
			id:"tripList",
			removeAddDelete:true,
			visibleRow:plf.searchVisibleRows,
			detail:TripGridFieldObj
			
		}
	//	TripGridSection = plf.addGrid(TripGridDtl,this)	
		//Calendar Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(TripSearchHdrCollapse)
		var helpGridSection=plf.addGrid(TripGridDtl,this)		//69997
		mainpage.hlpSearchGridPtr = helpGridSection
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{       
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strTripSheetNoFrom","strVehCat","strTripStatus","dtDepdateFrom","dtDepdateTo",
				        "strTripStgPt","strTripEnd"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"fetchAllTripsTS"
			},
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"SERCoreServiceGroupTS",
				"methodName":"initTripSumScrTS"
			}
	
		];
		
		this.callParent(arguments);
		
	}
});
