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
1.0.2       Steffie          11/04/16     71907                          Cancel Load Details
1.0.3       Steffie          20/04/16     71910                         amend Load Details	                                   
************************************************************************************************/
Ext.define('CueTrans.view.tms.LoadBuildingHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		mainpage.screenName = "Help on Load Building";		
		
		//Truck Master Section starts

		var formCtrl=[];
		plf.columns=3
		var loadListSummaryColumn = plf.addColumnSection({collapsed: false});
		
		
		var loadListSummaryFormCtrl=
		[
			
			plf.addText({"label":"Load No",id:"strLoadNoFrom","anywhereSearch":"true"}),
			plf.addCombo({"label":"Status","id":"strStatus"}),
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addDate({"label":"Date From","id":"dtLoadDateFrom"}),
			plf.addDate({"label":"Date To","id":"dtLoadDateTo"}),			
			plf.addText({"label":"Origin",id:"strOrigin"}),
			plf.addText({"label":"Destination","id":"strDestination"}),
            plf.addText({"label":"Ref Doc No",id:"strDocNo","anywhereSearch":"true"}),			
			plf.addButton({"label":"Search","id":"btnSearch","tooltip":"Click here to search."})
			
			
		]
		
		loadListSummaryColumn.add(loadListSummaryFormCtrl);
		
		
		var loadListSummaryObj=
		[
			
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:200},
			{columnname:"Departure Date",dataname:"LOAD_DATE",datatype:"string",width:100},			
			{columnname:"Origin",dataname:"FROM_LOCATION",datatype:"string",width:150},
			{columnname:"Destination",dataname:"TO_LOCATION",datatype:"string",width:150},			
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:150},	
            {columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:80},			
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100},
			{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:100},               //71907  changes
			{columnname:"Inspection No",dataname:"INSPECTION_NO",datatype:"string",width:100},   //71907  changes
			{columnname:"Loading Point",dataname:"PICK_AT",datatype:"string",width:100},         /*71910  changes starts*/        
			{columnname:"Unloading Point",dataname:"DELV_AT",datatype:"string",width:100},
			{columnname:"Actual weight(ton)",dataname:"WEIGHT",datatype:"string",width:100},
			{columnname:"Load Description",dataname:"LOAD_DESC",datatype:"string",width:100},
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:100}   /*71910  changes ends*/  
			
		]
		loadListSummaryGridDetail=
		{
			title:"",
			id:"LoadHelpGrid",
			detail:loadListSummaryObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
			
		}
		loadListSummaryGridSection = plf.addGrid(loadListSummaryGridDetail,this)	
		mainpage.hlpSearchGridPtr = loadListSummaryGridSection
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(loadListSummaryColumn)
		mainpage.ptrMainSection.add(loadListSummaryGridSection) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		
			mainpage.eventHandlers = 
			[	
{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initLoadBasedSearchTS"
			},			
				{					
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strLoadNoFrom","strStatus","strDateType","dtLoadDateFrom","dtLoadDateTo","strOrigin","strDestination"],
					"service":"TMSCoreTransportTS",
					"methodName":"initLoadBasedHelpScrTS"
					}	
			];
			mainpage.hlpLinks=
		{			

					
		}		
		
	
		
		this.callParent(arguments);
		
	
	}
});
