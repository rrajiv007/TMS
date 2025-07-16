Ext.define('CueTrans.view.dashboard.vehicledetails', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		//mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		mainpage.liveScreenFlag=false;
		mainpage.screenName = "Vehicle Details";
		//HelpOn3PL Search Section starts
		plf.columns=2
		helpOn3PLHdrCollapse = plf.addColumnSection({title:""});
		
		
		helpOn3PLFormCtrl=
		[
			plf.addText({"label":"Origin",id:"strOrigin"}),
			plf.addText({"label":"Destination",id:"strDestination"})			/*
			plf.addText({"label":"Vehicle Code",id:"strCode"}),
			plf.addText({"label":"Vehicle Name",id:"strName"}),
			plf.addText({"label":"Vehicle Type",id:"strType"}),
			plf.addText({"label":"Status",id:"strStatus"})	*/		
		]
		
		helpOn3PLHdrCollapse.add(helpOn3PLFormCtrl);
		mainpage.hlpSearchGridPtr =helpOn3PLHdrCollapse;
		//HelpOn3PL Header Section Ends	
		
		//mainpage.ptrMainSection.add(helpOn3PLHdrCollapse)//Add Header Section to Main Page
		gridvehicle_obj=
		[		
			{columnname:"Vehicle Code",dataname:"strCode",datatype:"string",width:140},	
			{columnname:"Vehicle Name",dataname:"strName",datatype:"string",width:140},				
			{columnname:"Vehicle Type",dataname:"strType",datatype:"string",width:140},				
			//{columnname:"Status",dataname:"strStatus",datatype:"string",width:120}			
		]
		gridvehicle_dtl=
		{
			title:"",
			id:"vehicle_dtl",
			removetoolbar:true,
			detail:gridvehicle_obj,
			//columnWidth:.5,
			visibleRow:plf.searchVisibleRows,				
			removeAddDelete:true,
			removeFilter:true
		}
		gridvehicle_section = plf.addGrid(gridvehicle_dtl,this)
		GridContainer = plf.addColumnSection({title:""});
		GridContainer.add(gridvehicle_section);
		
		Ext.data.StoreManager.lookup('vehicle_dtl_store').loadData([
				{"strCode":"Truck001","strName":"Prime Mover","strType":"Heavy Commercial Vehicle","strStatus":"Available"},
				{"strCode":"Truck002","strName":"LCV Truck","strType":"Light Commercial Vehicle","strStatus":"Occupied"},
				{"strCode":"Truck003","strName":"HCV Volvo","strType":"Heavy Commercial Vehicle","strStatus":"Available"},
				{"strCode":"Truck004","strName":"Mercedez Passenger Bus","strType":"Bus","strStatus":"Occupied"},
				{"strCode":"Truck005","strName":"Multi Axle Volvo Bus","strType":"Bus","strStatus":"Available"}
				],false);
				
		mainpage.ptrMainSection.add(GridContainer)	
		/*
		mainpage.eventHandlers = 
		[
			{
					"controlid":"",
					"tasktype":"onload",
					"input":["strOrigin"],
					"service":"TMSCoreTransportTS",
					"methodName":"initLoadBasedTS"
			}
		]
		*/
		this.callParent(arguments);
		
	}
});
