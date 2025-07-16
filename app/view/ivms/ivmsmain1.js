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
		var gisLayer = plf.addGIS({})
		ivmsMainPanel.addDocked([Ext.create('Ext.toolbar.Toolbar', {
			dock : 'top',
			cls	: 'GIS_header_Panel',
			items : [{
				xtype : 'image',
				cls : 'CueGis-Hand',
				listeners: {
							el: {
								click: function(){							
									CueGisApp.pallet.stopElementSelection();								
								}}
						  }				
			    }, {
				xtype : 'image',
				cls : 'CueGis-ClearAll',
				listeners: {
							el: {
								click: function(){							
									CueGisApp.pallet.clearElementsInMap();							
								}}
						  }
			},{
				xtype : 'image',
				cls : 'CueGis-FitView',
				listeners: {
							el: {
								click: function(){							
									CueGisApp.pallet.fitView();						
								}}
						  }
			}, {
				xtype : 'tbseparator'
			}, {
				xtype : 'image',
				cls : 'CueGis-RoadMap',
				listeners: {
							el: {
								click: function(){							
									CueGisApp.pallet.setMapType("ROADMAP");				
								}}
						  }
			}, {
				xtype : 'image',
				cls : 'CueGis-Satellite',
				listeners: {
							el: {
								click: function(){							
									CueGisApp.pallet.setMapType("SATELLITE");				
								}}
						  }
			}, {
				xtype : 'image',
				cls : 'CueGis-Terrain',
				listeners: {
							el: {
								click: function(){							
									CueGisApp.pallet.setMapType("TERRAIN");				
								}}
						  }
			}, {
				xtype : 'image',
				cls : 'CueGis-Hybrid',
				listeners: {
							el: {
								click: function(){							
									CueGisApp.pallet.setMapType("HYBRID");				
								}}
						  }
			}, {
				xtype : 'tbseparator'
			}, {
				xtype : 'image',
				cls : 'CueGis-AtLatLng',
				listeners: {
							el: {
								click: function(){							
									addPoiAtLatLng();			
								}}
						  }
			}, {
				xtype : 'image',
				cls : 'CueGis-AtAddress',
				listeners: {
							el: {
								click: function(){							
									getAddress();	
								}}
						  }
			}/*,,  {
				xtype : 'tbseparator'
			} {
				xtype : 'image',
				cls : 'CueGis-AddPoiRest',
				listeners: {
							el: {
								click: function(){							
									CueGisApp.PoiElement.updateMarkerOption({
									icon : 'CueGis/icons/res.png',
									highlightIcon : 'CueGis/icons/res_Select.png',
									draggable : true
								});
								CueGisApp.pallet.updateCurrentElement(CueGisApp.PoiElement);
								}}
						  }
			}, {
				xtype : 'image',
				cls : 'CueGis-AddPoiPetrol',
				listeners: {
							el: {
								click: function(){							
									CueGisApp.PoiElement.updateMarkerOption({
										icon : 'CueGis/icons/petrolBank.png',
										highlightIcon : 'CueGis/icons/petrolBank_Select.png',
										draggable : true
									});
									CueGisApp.pallet.updateCurrentElement(CueGisApp.PoiElement);
								}}
						  }
			}*/, {
				xtype : 'tbseparator'
			}, {
				xtype : 'image',
				cls : 'CueGis-AddFencePolygon',
				listeners: {
							el: {
								click: function(){							
									CueGisApp.FenceElement.updateFenceType("POLYGON");                   
									CueGisApp.pallet.updateCurrentElement(CueGisApp.FenceElement);
								}}
						  }
				
			}, {
				xtype : 'image',
				cls : 'CueGis-AddFenceCircle',
				listeners: {
							el: {
								click: function(){							
									CueGisApp.FenceElement.updateFenceType("CIRCLE");                   
									CueGisApp.pallet.updateCurrentElement(CueGisApp.FenceElement);
								}}
						  }
			}, {
				xtype : 'image',
				cls : 'CueGis-AddFenceRectangle',
				listeners: {
							el: {
								click: function(){							
									CueGisApp.FenceElement.updateFenceType("RECTANGLE");                   
									CueGisApp.pallet.updateCurrentElement(CueGisApp.FenceElement);
								}}
						  }
			}, {
				xtype : 'image',
				cls : 'CueGis-AddLineBuffer',
				listeners: {
							el: {
								click: function(){							
									CueGisApp.pallet.updateCurrentElement(CueGisApp.LineBufferElement);
								}}
						  }				
			}, {
				xtype : 'tbseparator'
			}, {
				xtype : 'image',
				cls : 'CueGis-MeasureTool',
				listeners: {
							el: {
								click: function(){							
									CueGisApp.pallet.updateCurrentElement(CueGisApp.MeasureTool);
									showMeasureToolMenu();
								}}
						  }
			}, {
				xtype : 'image',
				cls : 'CueGis-DrawingTool',
				listeners: {
							el: {
								click: function(){							
									CueGisApp.pallet.updateCurrentElement(CueGisApp.DrawTool);
									showDraw();
								}}
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

