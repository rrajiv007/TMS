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
Ext.define('CueTrans.view.trip.UnassignedLoads', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		mainpage.screenName = "Unassigned Loads";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		
		
		var formCtrl=[];
		plf.columns=3
		var unassignedLoadsColumn = plf.addCollapseSection({title:"Search Criteria",collapsed: false,btnID:"searchBtn"},this);	//69997
		
		
		var unassignedLoadsFormCtrl=							//69997
		[
			plf.addText({"label":"Load No",id:"strLoadNoFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Load No To",id:"strLoadNoTo","anywhereSearch":"true"}),
			plf.addCombo({"label":"Vehicle Category","id":"strVehCat"}),
			
			plf.addDateTime({"label":"Departure Date/Time From",dateid:"dtDepDateFrom",timeid:"tmDepTimeFrom"}),
			plf.addDateTime({"label":"Departure Date/Time To",dateid:"dtDepDateTo",timeid:"tmDepTimeTo"}),
			plf.addCombo({"label":"Commodity","id":"strCommodity"}),
			
			//plf.addCombo({"label":"Priority","id":"strPriority"}),
			plf.addCombo({"label":"Region From","id":"strRegionFrom"}),
			plf.addCombo({"label":"Region To","id":"strRegionTo"}),
			
			plf.addCombo({"label":"Origin","id":"strOrigin"}),
			plf.addCombo({"label":"Destination","id":"strDestination"}),
			
			
		//	plf.addBlank(),
		//	plf.addButton({"label":"Fetch","id":"fetchBtn","tooltip":"Click here to fetch load details."}),
		//	plf.addBlank()
			
		]
		
		unassignedLoadsColumn.add(unassignedLoadsFormCtrl);
		
		
		var unassignedLoadsSummaryObj=								//69997
		[
		  	{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:70},
			{columnname:"Vehicle<br>Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:80},
			{columnname:"Departure Date",dataname:"DEP_DATE",datatype:"string",width:80},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:90},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:90},			
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:90},			
			{columnname:"Weight<BR>(ton)",dataname:"WEIGHT",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Volume<BR>(cu.m)",dataname:"VOLUME",width:120,colAlign:'right',volumePrecision:3}
		]
		unassignedLoadsSummaryGridDetail=
		{
			title:"",
			id:"searchGrid",
			
			detail:unassignedLoadsSummaryObj,
			
			visibleRow:plf.searchVisibleRows
					
		}
		var unassignedLoadSummaryGridSection = plf.addGrid(unassignedLoadsSummaryGridDetail,this)	//69997
		mainpage.hlpSearchGridPtr = unassignedLoadSummaryGridSection
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(unassignedLoadsColumn)
		mainpage.ptrMainSection.add(unassignedLoadSummaryGridSection) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TRPLISTCoreTripListTS",
				"methodName":"initUnassignedLoadsTS"
			},
			{
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strLoadNoFrom","strVehCat","strCommodity","strOrigin","strRegionFrom","strRegionTo",
						"dtDepDateFrom","tmDepTimeFrom","dtDepDateTo","tmDepTimeTo","strDestination"],
				"service":"TRPLISTCoreTripListTS",
				"methodName":"fetchAllUnassLoadsTS"
			}
		]
		
		this.callParent(arguments);
		
	}
});
