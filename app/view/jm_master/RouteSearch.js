/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.2
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Manibharathi	04/02/2016      69952					Status Combo Alignment       
1.0.2		Bhuvan			05-Feb-2016	  	69995	                Added var for all local variable        
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.RouteSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Route Summary";
		//Help on Customer Search Section Begins
		plf.columns=4
		var routeHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);			//69995
		mainpage.toolbarSectionFlag=true;	
        mainpage.toolbarLinks=
		[
			{"name":"Create Route","linkid":"jm_routeMst","tooltip":"Click here to create a route."},
			{"name":"Create ToolBox Talk","linkid":"jm_toolboxtalk","tooltip":"Click here to create toolbox talks."},
			{"name":"Create Truck Route Speed Mapping","linkid":"jm_truckroutemapping","tooltip":"Click here to create truck route speed mapping."}

		]
		
		var routeSearchCtrl=			//69995
		[
			plf.addText({"label":"Route Code",id:"strRouteIdFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Route Code To",id:"strRouteIdTo","anywhereSearch":"true"}),
			plf.addText({"label":"Route Description",id:"strRouteDesc"}),
			plf.addText({"label":"JMC Code",id:"strJMCCode"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),			
			plf.addComboWithoutStore({"label":"Via",id:"strVia",storeId:"strOrigin"}),
			plf.addComboWithoutStore({"label":"Destination",id:"strDestination",storeId:"strOrigin"})
			//plf.addBlank(),
			//plf.addButton({"label":"Search","id":"btnSearch","tooltip":"Click here to search."})
			
		]
		
		routeHdrCollapse.add(routeSearchCtrl);
		//Help on Customer Header Section Ends
		
		//Help on Customer Grid Section Begins
		var routeGridFieldObj=				//69995
		[
			{columnname:"Route Code",dataname:"ROUTE_CODE",datatype:"string",width:150,linkId:"routeMaster","tooltip":"Click here to launch the route screen."},		
			{columnname:"Route Description", dataname:"ROUTE_DESC", datatype:"string", storeId:"strIntransitOrigin", width:150},
			{columnname:"JMC Code",dataname:"JMC_CODE",datatype:"string",width:90},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:75},
			{columnname:"Origin", dataname:"INTRANSIT_ORIGIN", datatype:"string", storeId:"strIntransitOrigin",width:150},
			{columnname:"Via", dataname:"VIA", datatype:"string",width:150},
			{columnname:"Destination", dataname:"INTRANSIT_DEST", datatype:"string", storeId:"strIntransitDestination",width:150},
			{columnname:"Journey Legs",dataname:"JOURNEYLEGS",datatype:"string",width:250},
			{columnname:"Total<BR>Distance (kms)",dataname:"DISTANCE",datatype:"string",width:100,colAlign:'right',weightPrecision:2},
			{columnname:"Time<BR>Taken (hh:mm)",dataname:"HOURS",datatype:"string",width:100,colAlign:'right'}
			
			
		] 
		var routeGridDtl=			//69995
		{
			title:"",
			id:"routeDtlCache",
			detail:routeGridFieldObj,
			visibleRow:plf.searchVisibleRows,
			//groupByField: 'CHK_LIST_NAME',
			removeAddDelete:true,
			readonly:true
		}
		var helpGridSection = plf.addGrid(routeGridDtl,this)				//69995
		//Help on Customer Grid Section Ends
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(routeHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{//ROUTE_VIA
				"controlid":"",
				"tasktype":"onload",
				"input":["strRouteIdFrom","strRouteDesc","strOrigin","strDestination","strStatus","strVia"],
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
		
		mainpage.screenLinks=
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
				"jm_routeMst":
				{
					"dest":"jm_master.RouteMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"jm_toolboxtalk":
				{
					"dest":"jm_master.ToolBoxTalks",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"jm_truckroutemapping":
				{
					"dest":"jm_master.TruckRouteSpeedMapping",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
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
