Ext.define('CueTrans.view.ivms.RouteMap', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.78;
		mainpage.popupWidthRatio=.82;
		mainpage.startPainting();
		
		mainpage.screenName = "IVMS";
		// Add Toolbar
		//mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;
 
		mainpage.toolbarActions= []	;
		
		plf.addHidden({
			id : 'routeViewer_VehicleNo'
		});
		plf.addHidden({
			id : 'routeViewer_JPNo'
		});
		
		var routeMapPanel = plf.addColumnSection({"cls":"c-mainpage-gis-section"});
		
		plf.columns = 1;
		
		var props = this.initialValues;
		var vehicleNo, jpNo;
		Ext.each(props, function(prop){
			if(prop.ctrl == "routeViewer_VehicleNo") {
				vehicleNo = prop.value;
			} else if(prop.ctrl == "routeViewer_JPNo") {
				jpNo = prop.value;
			}
		});
		
		var gisLayer = plf.addGIS({
			toolBarGroups : ['mapLayers', 'basic'],
			actions : [{
				action : 'LoadRoute',
				params : {					
					jpNo : jpNo					
				},
				mapWnd : mainpage
			}],							
			mapId : 'routeMap'
		});		
		routeMapPanel.add(gisLayer);		
		mainpage.ptrMainSection.add(routeMapPanel);
		mainpage.setLoading(true);
		/*mainpage.eventHandlers = 
		[
			{
				"tasktype":"proto",
				"filename":"ivms/RouteMap.json"
			},
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initGISTS"
			}
		];*/
		
		this.callParent(arguments);
	},
	listeners : {
		render : function(wnd) {
			wnd.setLoading(true);
		}
	}	
});