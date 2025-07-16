Ext.define('CueTrans.view.ivms.ivmspopup', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.93;
		/*mainpage.popupWidthRatio=.7;	*/	
		mainpage.startPainting();
		
		//mainpage.screenName = "IVMS";
		// Add Toolbar
		mainpage.toolbarSectionFlag=false;
		mainpage.liveScreenFlag=true;
 
		mainpage.toolbarActions= []	;
		
	
		var ivmsMainPanel = plf.addColumnSection({});
		ivmsMainPanel.add(plf.addHidden({
			id : "strDocNo"
		}));
		plf.columns = 1;
		
		//var gisLayer = plf.addGIS({"columnWidth":.3,heightFactor:.5})
		var gisLayer = plf.addGIS({
			toolBarGroups : ['mapLayers', 'basic', 'utils'],
			//toolBarGroups : ['basic', 'search'],
			columnWidth : 1,	
			//heightFactor:0.7,
			Zoom:10,
			mapId : 'ivmsMap'
			/*,
			contextMenu:tmpContextMenu,
			toolBarConfig:cueToolBarConfig,
			
			actions : [{
				action : 'LoadPID',
				url : 'CueGis/data/sample.json',					
				updateInterval : 10,
				mapWnd : mainpage
			}]*/	
		},mainpage);
		ivmsMainPanel.add(gisLayer)
		
		mainpage.ptrMainSection.add(ivmsMainPanel)
		
		mainpage.eventHandlers = 
		[
			{
				"tasktype":"proto",
				"filename":"ivms/ivmsmain.json"
			},
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strDocNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"initIVMSGISTS",
				"callbackMethod":function()
				{
						var tmp_control_obj = mainpage.queryById("ivmsMap");	
						var searchByValue="Vehicle Reg No";
						var mapElements = tmp_control_obj._gisPallet;
						var _trackingElement= tmp_control_obj._trackingElement;
						console.log(mapElements,"mapElements");
						console.log(_trackingElement,"_trackingElement");
						var results = mapElements.search({
							type : 'PID',
							searchText : "",
							searchBy : searchByValue,
							callBack : function(matchedItems) {
								console.log(matchedItems);
							},
							singleResult : true
						});
						console.log(results,"results");
						for(var resultIndex=0;resultIndex<results.length;resultIndex++) {
							var result = results[resultIndex];			
							_trackingElement.pan(result, false);
							_trackingElement.highlight(result, {
								animation : true,
								animationClass : 'circleOutGreen'
							});
							mapElements.setZoomLevel(8);
						}
					}
			}
		];
		
		this.callParent(arguments);
	}
});

