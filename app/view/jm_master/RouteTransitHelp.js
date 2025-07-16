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
Ext.define('CueTrans.view.jm_master.RouteTransitHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.hlpSectionFlag=true;
		mainpage.screenName = "Route Transit Help";
		//Help on Customer Search Section Begins
		plf.columns=3
		var routeHdrCollapse = plf.addCollapseSection({title:"Search Criteria", collapsed: false});			//69995
		mainpage.toolbarSectionFlag=true;	
        /*mainpage.toolbarLinks=
		[
			{"name":"Create Route","linkid":"route"},
			{"name":"Create ToolBox Talk","linkid":"toolboxtalk"},
			{"name":"Create Truck Route Speed Mapping","linkid":"truckroutemapping"}

		]*/
		
		var routeSearchCtrl=				//69995
		[
			plf.addText({"label":"Route Code From",id:"strRouteIdFrom","anywhereSearch":"true"}),
			plf.addText({"label":"Route Code To",id:"strRouteIdTo","anywhereSearch":"true"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Description",id:"strRouteDesc"}),
			plf.addCombo({"label":"Starting Location",id:"strOrigin"}),
			plf.addCombo({"label":"Transit Location",id:"strVia"}),
			plf.addCombo({"label":"Route Leg Category",id:"strRouteLeg"}),
			plf.addButton({"label":"Search","id":"btnSearch","tooltip":"Click here to search."})
			
		]
		
		routeHdrCollapse.add(routeSearchCtrl);
		//Help on Customer Header Section Ends
		
		//Help on Customer Grid Section Begins
		var routeGridFieldObj=					//69995
		[
			//{columnname:"Select",dataname:"",datatype:"string",width:150},
			{columnname:"Route Code",dataname:"ROUTE_CODE",datatype:"string",width:150},
			{columnname:"Route Description",dataname:"ROUTE_DESC",datatype:"string",width:150},
			{columnname:"Sequence No",dataname:"ROUTE_DTL_SEQ_NO",datatype:"string",datatype:"string",width:100},
			{columnname:"Starting Location",dataname:"INTRANSIT_ORIGIN",datatype:"string",width:170},
			{columnname:"Transit Location",dataname:"INTRANSIT_DEST",datatype:"string",width:170},
			{columnname:"Route Leg Category",dataname:"ROUTE_LEG",datatype:"string",width:150},
			{columnname:"Distance(km)",dataname:"DISTANCE",datatype:"string",width:100},
			{columnname:"Transit Time<BR>(hh:mm)",dataname:"TRANSIT_TIME",datatype:"string",width:130}	
			
		]
		var routeGridDtl=					//69995
		{
			title:"Route Details",
			id:"routeDtlCache",
			detail:routeGridFieldObj,
              removeAddDelete:true,
			visibleRow:plf.searchVisibleRows,
			//groupByField: 'CHK_LIST_NAME',
			
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
				"input":[""],
				"service":"CoreRouteService",
				"methodName":"initRouteTransitSearchTS"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strRouteIdFrom","strRouteIdTo","strRouteDesc","strOrigin","strVia","strStatus","strRouteLeg"],
				"service":"CoreRouteService",
				"methodName":"fetchRouteTransitSearchTS"
			}
			/*{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreRouteService",
				"methodName":"initRouteTransitSearchTS"
			},		
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strRouteIdFrom","strRouteIdTo","strRouteDesc","strOrigin","strDestination","strStatus"],
				"service":"CoreRouteService",
				"methodName":"initRouteMasterSearchTS"
			},
			{
			"tasktype":"proto",
			"filename":"jm_master/RouteSearch.json"
			}*/
							
			
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
