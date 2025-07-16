Ext.define('CueTrans.view.dashboard.shipmentdtl', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		//mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		mainpage.liveScreenFlag=false;
		mainpage.screenName = "Shipment Details";
		//HelpOn3PL Search Section starts
		plf.columns=2
		helpOn3PLHdrCollapse = plf.addColumnSection({title:""});
		
		
		helpOn3PLFormCtrl=
		[
			plf.addText({"label":"Origin-Destination",id:"strOrigin"}),
			plf.addText({"label":"Weight",id:"strWeight"})			
		]
		
		helpOn3PLHdrCollapse.add(helpOn3PLFormCtrl);
		mainpage.hlpSearchGridPtr =helpOn3PLHdrCollapse;
		//HelpOn3PL Header Section Ends	
		
		//mainpage.ptrMainSection.add(helpOn3PLHdrCollapse)//Add Header Section to Main Page
		gridorigin_obj=
		[		
			{columnname:"Transport Req. No",dataname:"strRequestNo",datatype:"string",width:150},	
			{columnname:"Transport Req. Date",dataname:"strRequestDate",datatype:"string",width:140},				
			{columnname:"Status",dataname:"strStatus",datatype:"string",width:120},
			//{columnname:"Origin",dataname:"strOrigin",datatype:"string",width:100},
			//{columnname:"Destination",dataname:"strDestination",datatype:"string",width:100}
		]
		gridorigin_dtl=
		{
			title:"",
			id:"origin_dtl",
			removetoolbar:true,
			detail:gridorigin_obj,
			columnWidth:.41,
			visibleRow:plf.searchVisibleRows,				
			removeAddDelete:true,
			removeFilter:true
		}
		gridorigin_section = plf.addGrid(gridorigin_dtl,this)
		GridContainer = plf.addColumnSection({title:""});
		GridContainer.add(gridorigin_section);
		
		Ext.data.StoreManager.lookup('origin_dtl_store').loadData([
				{"strRequestNo":"REQ/001","strRequestDate":"07-02-15","strStatus":"Completely Shipped"},
				{"strRequestNo":"REQ/002","strRequestDate":"07-02-15","strStatus":"Completely Shipped"},
				{"strRequestNo":"REQ/003","strRequestDate":"07-02-15","strStatus":"Completely Shipped"}				
				],false);
		mainpage.ptrMainSection.add(GridContainer)		
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
		this.callParent(arguments);
		
	}
});
