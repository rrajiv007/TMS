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
Ext.define('CueTrans.view.jm_master.RouteHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		
		mainpage.screenName = "Route Help";
		//Help on Customer Search Section Begins
		plf.columns=3
		var routeHdrCollapse = plf.addColumnSection({title:"", collapsed: true});		//69995
		mainpage.toolbarSectionFlag=false;	
        /*mainpage.toolbarLinks=
		[
			{"name":"Create Route","linkid":"route"},
			{"name":"Create ToolBox Talk","linkid":"toolboxtalk"},
			{"name":"Create Truck Route Speed Mapping","linkid":"truckroutemapping"}

		]*/
		
		var routeSearchCtrl=							//69995
		[
			plf.addText({"label":"Route Code",id:"strRouteIdFrom"}),
			//plf.addText({"label":"Route Code To",id:"strRouteIdTo"}),
			plf.addText({"label":"Route Description",id:"strRouteDesc"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addComboWithoutStore({"label":"Via",id:"strVia",storeId:"strOrigin"}),
			plf.addComboWithoutStore({"label":"Destination",id:"strDestination",storeId:"strOrigin"}),
			//plf.addCombo({"label":"Via",id:"strVia"}),
			//plf.addCombo({"label":"Destination",id:"strDestination"}),
			/*
			plf.addText({"label":"Route Code From",id:"strRouteIdFrom","anywhereSearch":"true"}),
			plf.addText({"label":"Route Code To",id:"strRouteIdTo","anywhereSearch":"true"}),
			plf.addCombo({"label":"Route Status",id:"strStatus"}),
			plf.addText({"label":"Route Description",id:"strRouteDesc"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Via",id:"strVia"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),*/
			plf.addText({"label":"JMC Code",id:"strJMCCode"}),
			plf.addHidden({"label":"Context",id:"strContext"}),			
			plf.addButton({"label":"Search","id":"btnSearch","tooltip":"Click here to search."})
			
		]
		
		routeHdrCollapse.add(routeSearchCtrl);
		//Help on Customer Header Section Ends
		
		//Help on Customer Grid Section Begins
		var routeGridFieldObj=										//69995
		[
			{columnname:"Route Code",dataname:"ROUTE_CODE",datatype:"string",width:200,"tooltip":"Click here to launch the route screen."},		
			{columnname:"Route Description", dataname:"ROUTE_DESC", datatype:"string", storeId:"strIntransitOrigin", 
			width:170},
			{columnname:"JMC Code",dataname:"JMC_CODE",datatype:"string",width:90},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:75},
			{columnname:"Origin", dataname:"INTRANSIT_ORIGIN", datatype:"string", storeId:"strIntransitOrigin",width:170},
			{columnname:"Via", dataname:"VIA", datatype:"string",width:170},
			{columnname:"Destination", dataname:"INTRANSIT_DEST", datatype:"string", storeId:"strIntransitDestination",width:170},
			{columnname:"Journey Legs",dataname:"JOURNEYLEGS",datatype:"string",width:250},
			{columnname:"Total<BR>Distance (kms)",dataname:"DISTANCE",datatype:"string",width:75},
			{columnname:"Time<BR>Taken (hh:mm)",dataname:"HOURS",datatype:"string",width:75}
			
			/*
			{columnname:"Route",dataname:"ROUTE_CODE",datatype:"string",width:150},	
			{columnname:"StartingLocation", dataname:"INTRANSIT_ORIGIN", datatype:"string", storeId:"strIntransitOrigin", 
			width:150},
			{columnname:"Transit Location", dataname:"INTRANSIT_DEST", datatype:"string", storeId:"strIntransitDestination",
			 width:150},
			{columnname:"Journey Legs",dataname:"JOURNEYLEGS",datatype:"string",width:500},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100},
			*/
		]
		var routeGridDtl=						//69995
		{
			title:"",
			id:"routeDtlCache",
			detail:routeGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
			
		}
		var helpGridSection = plf.addGrid(routeGridDtl,this)				//69995
        mainpage.hlpSearchGridPtr = helpGridSection //HelpChanges
		//Help on Customer Grid Section Ends
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(routeHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strContext"],
				"service":"CoreRouteService",
				"methodName":"initRouteMasterSearchScrTS"
			},		
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strRouteIdFrom","strRouteDesc","strOrigin","strDestination","strStatus","strVia","strJMCCode"],				
				"service":"CoreRouteService",
				"methodName":"initRouteMasterSearchTS"
			},
			{
			"tasktype":"proto",
			"filename":"jm_master/RouteSearch.json"
			}
							
			
		];
		
		/*mainpage.screenLinks=
		{
			"routeMaster":
				{
					"dest":"jm_master.RouteMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"ROUTE_CODE","dest":"strRouteId"}
							]
				},
				"route":
				{
					"dest":"jm_master.RouteMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"toolboxtalk":
				{
					"dest":"jm_master.ToolBoxTalks",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"truckroutemapping":
				{
					"dest":"jm_master.TruckRouteSpeedMapping",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}*/
		//Event Handlers Mapping Ends
		/*	
		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});
		*/
		//Generate Screen Section
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
});
