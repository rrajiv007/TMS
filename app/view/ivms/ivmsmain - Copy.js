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
		
		var ivmsMainPanel = plf.addColumnSection({});
		
		plf.columns = 1
		
		//var gisLayer = plf.addGIS({"columnWidth":.3,heightFactor:.5})
		var gisLayer = plf.addGIS({})
		ivmsMainPanel.addDocked([Ext.create('Ext.toolbar.Toolbar', {
			dock : 'top',
			items : [{
				xtype : 'button',
				iconCls : 'CueGis-Hand',
				handler : function() {
					CueGisApp.pallet.stopElementSelection();
				}
			}, {
				xtype : 'button',
				iconCls : 'CueGis-ClearAll',
				handler : function() {
					CueGisApp.pallet.clearElementsInMap();
				}
			},{
				xtype : 'button',
				iconCls : 'CueGis-FitView',
				handler : function() {
					CueGisApp.pallet.fitView();
				}
			}, {
				xtype : 'tbseparator'
			}, {
				xtype : 'button',
				iconCls : 'CueGis-RoadMap',
				handler : function() {
					CueGisApp.pallet.setMapType("ROADMAP");
				}
			}, {
				xtype : 'button',
				iconCls : 'CueGis-Satellite',
				handler : function() {
					CueGisApp.pallet.setMapType("SATELLITE");
				}
			}, {
				xtype : 'button',
				iconCls : 'CueGis-Terrain',
				handler : function() {
					CueGisApp.pallet.setMapType("TERRAIN");
				}
			}, {
				xtype : 'button',
				iconCls : 'CueGis-Hybrid',
				handler : function() {
					CueGisApp.pallet.setMapType("HYBRID");
				}
			}, {
				xtype : 'tbseparator'
			}, {
				xtype : 'button',
				iconCls : 'CueGis-AtLatLng',
				handler : function() {
					addPoiAtLatLng();
				}
			}, {
				xtype : 'button',
				iconCls : 'CueGis-AtAddress',
				handler : function() {
					getAddress();
				}
			},  {
				xtype : 'tbseparator'
			}, {
				xtype : 'button',
				iconCls : 'CueGis-AddPoiRest',
				handler : function() {
					CueGisApp.PoiElement.updateMarkerOption({
                        icon : 'CueGis/icons/res.png',
						highlightIcon : 'CueGis/icons/res_Select.png',
                        draggable : true
                    });
					CueGisApp.pallet.updateCurrentElement(CueGisApp.PoiElement);
				}
			}, {
				xtype : 'button',
				iconCls : 'CueGis-AddPoiPetrol',
				handler : function() {
					CueGisApp.PoiElement.updateMarkerOption({
                        icon : 'CueGis/icons/petrolBank.png',
						highlightIcon : 'CueGis/icons/petrolBank_Select.png',
                        draggable : true
                    });
					CueGisApp.pallet.updateCurrentElement(CueGisApp.PoiElement);
				}
			}, {
				xtype : 'tbseparator'
			}, {
				xtype : 'button',
				iconCls : 'CueGis-AddFencePolygon',
				handler : function() {
					CueGisApp.FenceElement.updateFenceType("POLYGON");                   
					CueGisApp.pallet.updateCurrentElement(CueGisApp.FenceElement);
				}
			}, {
				xtype : 'button',
				iconCls : 'CueGis-AddFenceCircle',
				handler : function() {
					CueGisApp.FenceElement.updateFenceType("CIRCLE");                   
					CueGisApp.pallet.updateCurrentElement(CueGisApp.FenceElement);
				}
			}, {
				xtype : 'button',
				iconCls : 'CueGis-AddFenceRectangle',
				handler : function() {
					CueGisApp.FenceElement.updateFenceType("RECTANGLE");                   
					CueGisApp.pallet.updateCurrentElement(CueGisApp.FenceElement);
				}
			}, {
				xtype : 'button',
				iconCls : 'CueGis-AddLineBuffer',
				handler : function() {					                
					CueGisApp.pallet.updateCurrentElement(CueGisApp.LineBufferElement);
				}				
			}, {
				xtype : 'tbseparator'
			}, {
				xtype : 'button',
				iconCls : 'CueGis-MeasureTool',
				handler : function() {
					CueGisApp.pallet.updateCurrentElement(CueGisApp.MeasureTool);
					showMeasureToolMenu();
				}
			}, {
				xtype : 'button',
				iconCls : 'CueGis-DrawingTool',
				handler : function() {	
					CueGisApp.pallet.updateCurrentElement(CueGisApp.DrawTool);
					showDraw();
				}				
			}]
		})]);
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
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initGISTS"
			}
		];
		
		this.callParent(arguments);
	}
});

