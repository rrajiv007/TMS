/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
		                                   
************************************************************************************************/
Ext.define('CueTrans.view.ivms.ivmsmain', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "IVMS";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;
 
		mainpage.toolbarActions= []	;
		
		var ivmsMainPanel = plf.addColumnSection({"cls":"c-mainpage-gis-section"});
		
		plf.columns = 1;
		
		//var gisLayer = plf.addGIS({"columnWidth":.3,heightFactor:.5})
		var gisLayer = plf.addGIS({
			toolBarGroups : ['mapLayers', 'basic', 'utils', 'search'],
			actions : [{
				action : 'LoadPID',
				url : 'CueGis/data/sample.json',					
				updateInterval : 10,
				mapWnd : mainpage
			}],
			mapId : 'ivmsMap'
		});
		ivmsMainPanel.add(gisLayer);
		
		mainpage.ptrMainSection.add(ivmsMainPanel)
		
		/*mainpage.eventHandlers = 
		[
			{
				"tasktype":"proto",
				"filename":"ivms/ivmsmain.json"
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

