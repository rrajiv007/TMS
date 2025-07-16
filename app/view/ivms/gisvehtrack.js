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
Ext.define('CueTrans.view.ivms.gisvehtrack', 
{
	extend:"CueTrans.lib.plfTransScreen",
	//requires : ['CueGis.plugins.ExtJs.Main'],
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		//mainpage.screenName = "Vehicle Tracking";
		// Add Toolbar
		mainpage.toolbarSectionFlag=false;
		mainpage.liveScreenFlag=true;
 
		//mainpage.toolbarActions= []	;
		mainpage.cls="content_container_new_gis"		
		//var ivmsMainPanel = plf.addColumnSection({"cls":"c-mainpage-section0"});
		var ivmsMainPanel = plf.addBorderSection({});
		
		//plf.columns = 2;
		var parentForm =this;	
		var hiddenSection = plf.addBorderSection({hidden:true});
		var hiddenCtrl=
		[	
			plf.addHidden({id:"strJourneyPlanNo"}),
			plf.addHidden({id:"strStatus"}),
			plf.addHidden({id:"strVehCode"})
		]
		hiddenSection.add(hiddenCtrl);
		
		
		/*Start of JP*/
		JPRenderFn =  function(val,metaData,record)		
		{			
			if(val== "")
				return;	
			var tmpHTML;
			tmpHTML="";
			tmpHTML=tmpHTML+"<div style='cursor: pointer;' class='x-panel-header-text-container-default' "
			tmpHTML=tmpHTML+" onClick=gisHighlightPID('ivmsMap','"+record.get("REGN_NO")+"') <u>" + val + "</u></div>"						
			return tmpHTML;
		}
		
		var JPDetails=
		[	
			{columnname:"Vehicle No",dataname:"REGN_NO",datatype:"string",width:120,editControl:"addDisplayOnly",gridClick:"strVehCode",MethodName:"SearchVehJP",service:"TMSCoreTransportTS",
			"callbackMethod":function(){
					gisHighlightPID('ivmsMap',"");
					}
			},
			{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:120,editControl:"addDisplayOnly"/*,renderer:JPRenderFn*/}
			
		]
		var JPDetailGrid=
		{
			title:"",
			id:"JPData",			
			detail:JPDetails,
			removeAddDelete:true,
			visibleRow:4,
			columnLines:false,									
			removePaging:true,			
			rowHighlight:false,			
			removeTbar:true,
			removeColumns:true,			
			readonly:true,
			cls:"content_container_west_gis"
		}
		var JPGridSection = plf.addGrid(JPDetailGrid,this)	
		JPGridSection.on("checkboxclick",
				function(tmpRecord,checkFlag) {
					if(checkFlag)
					{											
						var tmp_control_obj = mainpage.queryById("ivmsMap");				
						var mapElements = tmp_control_obj._gisPallet.elementObjectList;
						for(var index=0;index<mapElements.length;index++) {
						var mapElement = mapElements[index];
						if(mapElement.constructor === TrackingElement) {
							var pids = mapElement.trackingElementList;
							console.log("PIDs",pids);
							for(var pidIndex = 0; pidIndex<pids.length;pidIndex++) {
								var pid = pids[pidIndex];						
								if (pid.metaData.pid == tmpRecord.get("JP_NO"))
								{									
									mapElement.showPOI(pid);									
								}								
							}								
						}
						}
							
					}
					else
					{
						var tmp_control_obj = mainpage.queryById("ivmsMap");				
						var mapElements = tmp_control_obj._gisPallet.elementObjectList;
						for(var index=0;index<mapElements.length;index++) {
						var mapElement = mapElements[index];
						if(mapElement.constructor === TrackingElement) {
							var pids = mapElement.trackingElementList;
							console.log("PIDs",pids);
							for(var pidIndex = 0; pidIndex<pids.length;pidIndex++) {
								var pid = pids[pidIndex];						
								if (pid.metaData.pid == tmpRecord.get("JP_NO"))
								{									
									mapElement.hidePOI(pid);									
								}								
							}								
						}
						}					
					}
				},this);
		
		
		/*End of JP*/
		/*Context Menu Definition Starts*/
		var tmpContextMenu = {
									pid : {
										Vehicle : [{
											text : 'View',
											action : 'LoadRoute',
											icon : 'CueGis/icons/toolbar/Data_Filter.png',
											//handler : 'loadRoute'
											handler : function() {	
													console.log(arguments[3].entity.metaData.TRAN_NO);
													var tmp_initialValues =[{"ctrl":"strVehCode","value":arguments[3].entity.metaData.TRAN_NO}];													
													launch_helpscreen("","","CueTrans.view.ivms.VehicleDetails",tmp_initialValues)
												}
										}],
										JourneyPlan: 
										[	{
											text : 'Close Journey',
											action : 'LoadRoute',
											icon : 'CueGis/icons/toolbar/Data_Filter.png',
											//handler : 'loadRoute'
											handler : function() {													
													var tmp_initialValues =[{"ctrl":"strJourneyPlanNo","value":arguments[3].entity.metaData.TRAN_NO}];													
													launch_helpscreen("","","CueTrans.view.ivms.jpclosed",tmp_initialValues)
												}
											},
											{
											text : 'Release Journey',
											action : 'LoadRoute',
											icon : 'CueGis/icons/toolbar/Data_Filter.png',
											//handler : 'loadRoute'
											handler : function() {													
													var tmp_initialValues =[{"ctrl":"strJourneyPlanNo","value":arguments[3].entity.metaData.TRAN_NO}];													
													launch_helpscreen("","","CueTrans.view.ivms.JourneyTruckRelease",tmp_initialValues)
												}
											},
											{
											text : 'Print Journey',
											action : 'LoadRoute',
											icon : 'CueGis/icons/toolbar/Data_Filter.png',
											//handler : 'loadRoute'
											handler : function() {													
													var tmp_initialValues =[{"ctrl":"strJourneyPlanNo","value":arguments[3].entity.metaData.TRAN_NO}];	
													
													parentForm.queryById("strJourneyPlanNo").setValue(arguments[3].entity.metaData.TRAN_NO);
													//console.log(parentForm.queryById("strJourneyPlanNo").getValue(),"strJourneyPlanNo");
													parentForm.queryById("methodName").setValue("PrintJourneyPlanReport");
													process_ebpack_service(parentForm,["strJourneyPlanNo"],"CoreJourneyPlanService");	
												}
											},
											/*{
											text : 'Play Route',
											action : 'LoadRoute',
											icon : 'CueGis/icons/toolbar/Data_Filter.png',
											handler : 'loadRoute'
											}*/
											
										]
									},
									poi : {
										Technician : [{
											text : 'Play Route',
											action : 'LoadRoute',
											icon : 'CueGis/icons/toolbar/Data_Filter.png',
											handler : function() {													
													
												}
										},
										{
											text : 'View Assignments',
											action : 'GoToPage',
											icon : 'CueGis/icons/toolbar/settings.png',
											handler : function() {
													alert("Playing Route");
												}
										}]
									},
									fence : {
									
									}, 
									route : {
									
									}		
								};
		
		/*Custom Toolbar Config starts*/
		var cueToolBarConfig = {
					"refresh" : 
					[
						{
							name : 'Refresh',
							icon : 'resources/images/gis/refresh.png',
							tooltip: 'Click here to refresh',
							handler : function()
							{
								parentForm.fireEvent("afterrender");	
								
							}
						}
					],
					"cuetrans" : 
					[	
						{
							name : 'Search Vehicle',
							icon : 'CueGis/icons/toolbar/cuetrack/TktSearch.png',
							tooltip: 'Click here to search vehicles/driver',
							handler : function()
							{
								var tmp_initialValues;
								console.log(arguments);
								parentForm.launchHlpLink("VehSearch")	
								
							}
						}, 
						{
							name : "Search Journey",
							icon : 'CueGis/icons/toolbar/cuetrack/TechSearch.png',
							tooltip: 'Click here to search journey',
							handler : function()
							{
								var tmp_initialValues;
								console.log(arguments);
								parentForm.launchHlpLink("JPSearch")
								
							}
						}			
					],
					"mdr" : [{
						name : "Fences",
						icon : "CueGis/icons/toolbar/mdr/star.png",
						tooltip: 'Click here to load tickets',
						handler : 'loadFences'
					}, {
						name : 'POI',
						icon : 'CueGis/icons/toolbar/cuetrack/ticket.png',
						tooltip: 'Click here to load tickets',
						handler : 'loadPois'
					}, {
						name : 'QBR',
						icon : 'CueGis/icons/toolbar/Query_By_Rectangle.png',
						tooltip: 'Click here to load tickets',
						handler : 'showQBR'
					}, {
						name : 'RT',
						icon : 'CueGis/icons/toolbar/Tracker.png',
						tooltip: 'Click here to load tickets',
						handler : 'loadRoute'
					},
					{
						name : 'RT',
						icon : 'CueGis/icons/toolbar/Tracker.png',
						tooltip: 'Click here to load tickets',
						handler : 'loadRoute'
					}]
				}
		var gisLayer = plf.addGIS({
			toolBarGroups : ['mapLayers', 'basic', 'utils','cuetrans', 'search'],
			//toolBarGroups : ['basic', 'search'],
			columnWidth : 1,			
			mapId : 'ivmsMap',
			contextMenu:tmpContextMenu,
			toolBarConfig:cueToolBarConfig,
			/*
			actions : [{
				action : 'LoadPID',
				url : 'CueGis/data/sample.json',					
				updateInterval : 10,
				mapWnd : mainpage
			}]*/	
		},mainpage);
		
		
		
		Ext.define('gisDtlModel', {
			extend: 'Ext.data.Model',
			fields: [
				{ name:'JP_NO', type:'string' },
				{ name:'ORGIN', type:'string' },
				{ name:'DEST', type:'string' },
				{ name:'POS_TIME', type:'string' },
				{ name:'LAT', type:'string' },
				{ name:'LONG', type:'string' },
				{ name:'SPEED', type:'string' },
				{ name:'SPEED_TIME', type:'string' },
				{ name:'SPEED_LAT', type:'string' },
				{ name:'SPEED_LONG', type:'string' },
				{ name:'NXT_REST', type:'string' },
				{ name:'DRV_NAME', type:'string' },
				{ name:'DRV_NO', type:'string' },
				{ name:'JM_NAME', type:'string' },
				{ name:'JM_NO', type:'string' },
				{ name:'CAR_NO', type:'string' },
				{ name:'CONT_DTL', type:'string' },
				{ name:'IVMS_PROVIDER', type:'string' },
				{ name:'IVMS_NO', type:'string' },
				{ name:'LAST_UPD', type:'string' },
				{ name:'SCREEN_JS', type:'string' }
			]
		});
		
		Ext.create('Ext.data.Store', {
			id:'gisDtl_store',
			model: 'gisDtlModel'
			/*,
			data : [
				   {
				       JP_NO: 'JP0001',ORGIN: 'Muscat Coastal',
					   DEST: 'Marmul Coastal 19-12-2016 15:00',POS_TIME: '14:00',
					   LAT: '12345689.22',LONG: '17896443.2454',
					   SPEED_TIME: '15:45',SPEED_LAT: '12345689.22',
					   SPEED_LONG:'778798.898798',NXT_REST:'Marmul Coastal 19-12-2016 16:00',
					   DRV_NAME:'Mohammed',DRV_NO:'123456789',CAR_NO:'OTO',
					   JM_NAME:'Razhid',JM_NO:'879998',
					   CONT_DTL:'124899',IVMS_PROVIDER:'Mix Telematics',
					   IVMS_NO:'7895466',LAST_UPD:'19-12-2016 16:00',
					   SCREEN_JS:'journey_management.JourneyPlanUpdate'
					   }
					]
			*/		
		});	
		var gisDtlStore = Ext.data.StoreManager.lookup('gisDtl_store')
		
		var gisDtlTpl = new Ext.XTemplate(
			'<tpl for=".">',
				'<div class="vehicle_properties_window">',					
				'<table class="table">',
				'<tbody>',
					/*'<tr>',
						'<td class="title">{JP_NO}</td>',
					'</tr>',*/
					/*'<tr>',
						'<td class="title">Truck Details</td>',
					'</tr>',*/
					'<tr>',
						'<td>',
						'<table class="table">',
							'<tbody>',
								'<tr>',
									'<td >JP No. </td>',
									'<td>:</td>',
									'<td class="notification_container_bold">{JP_NO}</td>',
								'</tr>',
								'<tr>',
									'<td>Origin </td>',
									'<td>:</td>',
									'<td>{ORGIN}</td>',
								'</tr>',
								'<tr>',
									'<td>Destination </td>',
									'<td>:</td>',
									'<td>{DEST}</td>',
								'</tr>',
								'<tr>',
									'<td>Position @{POS_TIME} </td>',
									'<td>:</td>',
									'<td>{LAT};{LONG}</td>',
								'</tr>',
								'<tr>',
									'<td>Speed (km/h) </td>',
									'<td>:</td>',
									'<td>{SPEED}</td>',
								'</tr>',								
							/*	'<tr>',
									'<td>Next rest point </td>',
									'<td>:</td>',
									'<td>{NXT_REST}</td>',
								'</tr>',*/							
								'<tr>',
									'<td>Driver Name</td>',
									'<td>:</td>',
									'<td>{DRV_NAME}</td>',
								'</tr>',
								'<tr>',
									'<td>Driver Contact</td>',
									'<td>:</td>',
									'<td>{DRV_NO}</td>',
								'</tr>',
								'<tr>',
									'<td>Journey Manager</td>',
									'<td>:</td>',
									'<td>{JM_NAME}</td>',
								'</tr>',
								'<tr>',
									'<td>JM Contact </td>',
									'<td>:</td>',
									'<td>{JM_NO}</td>',
								'</tr>',
								'<tr>',
									'<td>Carrier Contact </td>',
									'<td>:</td>',
									'<td>{CAR_NO}</td>',
								'</tr>',
								'<tr>',
									'<td>Contact details </td>',
									'<td>:</td>',
									'<td>{CONT_DTL}</td>',
								'</tr>',
								'<tr>',
									'<td>IVMS Provider </td>',
									'<td>:</td>',
									'<td>{IVMS_PROVIDER}</td>',
								'</tr>',
								'<tr>',
									'<td>IVMS Contact </td>',
									'<td>:</td>',
									'<td>{IVMS_NO}</td>',
								'</tr>',
								'<tr>',
									'<td>Last Update on </td>',
									'<td>:</td>',
									'<td>{LAST_UPD}</td>',
								'</tr>',
								'<tr>',
									'<td style="display: none;">{SCREEN_JS}</td>',
								'</tr>',
							'</tbody>',
						'</table>',						
						'</td>',
					'</tr>',					
				'</tbody>',
			'</table>',				
				'</div>',
			'</tpl>'
		);
		var DtlContainer = Ext.create('Ext.view.View', 
		{
			store: Ext.data.StoreManager.lookup('gisDtl_store'),
			tpl: gisDtlTpl,			
			itemSelector: 'div.vehicle_properties_window',
			emptyText: 'No images available',				
			width : 295,
			listeners: {
					'itemclick': function(view, record, item, idx, event, opts) 
					{
						var initValueObj = [];
						var tmpObj = {}
						tmpObj.ctrl = "strJourneyPlanNo";
                        tmpObj.value = record.get("JP_NO");
                        initValueObj.push(tmpObj)
						
						mainpage.loadEntityScreens(record.get("SCREEN_JS"),initValueObj);
					}
				}
		});
		var JPDetailsPanel = plf.addBorderColumnSection({width :295,"id":"gisjpdtl","region":"west","collapsible":true,"collapsed":false,"title":"Track","cls":"content_container_west_gis_gr"});
		
		var searchTmp={
		xtype : 'panel',
		id : 'cuetrans-map-tracker-tab-asset-search',
		layout : 'hbox',
		width : 290,
		items : [{
			xtype : 'textfield',
			inputText : 'AssetID',
			id : 'strDocNo',	
			emptyText : 'Enter to search',
			enableKeyEvents : true,
			submitEmptyText : false
				},
				{
			xtype : 'button',	
			cls : 'ivms-map-tracker-tab-asset-searchBtn',	
			listeners : {
				click : function() 
				{
					/*
					var toolGroups = CueGis.plugins.ExtJs.ToolBar.Tools.View;					
					var searchTextValue="722";
					var searchByValue="Vehicle Reg No";
					var tmp_control_obj = mainpage.queryById("ivmsMap");				
					var mapElements = tmp_control_obj._gisPallet;
					var _trackingElement= tmp_control_obj._trackingElement;
					console.log(mapElements,"mapElements");
					console.log(_trackingElement,"_trackingElement");
					var results = mapElements.search({
						type : 'PID',
						searchText : searchTextValue,
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
					*/
					parentForm.queryById("methodName").setValue("FetchGisAssestDtlsTS");					
					process_ebpack_service(parentForm,["strDocNo"],"TMSCoreTransportTS");
					
				}
			}
		}]
		}
		
		var tmpWestPanel={
			xtype : 'panel',			
			title : '',
			id : 'ivms-map-tracker',
			width : 310,			
			items : [{
				xtype : 'panel',
				id : 'ivms-map-tracker-base',	
				border : true,				
				items : 
				[
				searchTmp,
				JPGridSection,
				DtlContainer
				]
			}
			]
		}		
		JPDetailsPanel.add(tmpWestPanel)
		/*
		var myData=[
					{"REGN_NO":"Veh1","JP_NO":"JP1000"},
					{"REGN_NO":"veh2","JP_NO":"JP1001"},
					{"REGN_NO":"Veh3","JP_NO":"JP1002"},					
					{"REGN_NO":"veh4","JP_NO":"JP1003"}];
		var gridStore = Ext.data.StoreManager.lookup('JPData_store');
		gridStore.loadData(myData);
		*/
		var gisLayerPanel = plf.addBorderColumnSection({"region":"center","width":1250,"cls":""});
		gisLayerPanel.add(gisLayer)
		
		Ext.define('gisHdrModel', {
			extend: 'Ext.data.Model',
			fields: [
				{ name:'Heading', type:'string' },
				{ name:'value', type:'string' },
				{ name:'cls', type:'string' }
				
			]
		});
		Ext.create('Ext.data.Store', {
			id:'gisHdr_store',
			model: 'gisHdrModel'
			/*,			
			data : [
				   {Heading: 'Active',value: '100',cls:"notification_all"},
				   {Heading: 'In Motion',value: '80',cls:"notification_moving"},
				   {Heading: 'Day Rest',value: '20',cls:"notification_notmoving"},
				   {Heading: 'With Violation',value: '40',cls:"notification_notresponding"},
				   {Heading: 'Delayed',value: '5',cls:"notification_all"},
				   {Heading: 'No IVMS Feed',value: '10',cls:"notification_moving"}
				   
					]
			*/		
					
		});	
		
		//var gisHdrStore = Ext.data.StoreManager.lookup('gisHdrStore')
		var gisHdrTpl = new Ext.XTemplate(
			'<tpl for=".">',
				'<div class="notification_container">',				
				'<div class={cls}>',
				'<p class="label">{Heading}</p>',
				'<p class="numeric">{value}</p>',				
				'</div>',				
				'</div>',
			'</tpl>'
		);
		
		var AllContainer = Ext.create('Ext.view.View', 
		{
			store: Ext.data.StoreManager.lookup('gisHdr_store'),
			tpl: gisHdrTpl,			
			itemSelector: 'div.notification_container',
			emptyText: 'No images available',
			height : 51,	
			width : 1160,
			listeners: 
			{
					'itemclick': function(view, record, item, idx, event, opts) 
					{					
						parentForm.queryById("strStatus").setValue(record.get("Heading"));												
						//mainpage.launchHlpLink("VehSearch");
						parentForm.queryById("methodName").setValue("FetchGisAssestDtl");					
						process_ebpack_service(parentForm,["strStatus"],"TMSCoreTransportTS");
						//mainpage.loadEntityScreens(record.get("SCREEN_JS"),initValueObj);
					}
				}
		});
		
		var gisLayerHdrPanel = plf.addBorderColumnSection({"region":"north","width":1250,height:51,"cls":""});
	
		gisLayerHdrPanel.add(Ext.create('CueGis.plugins.ExtJs.ToolBar.View', {
				_tid : "ivmsMap_toolBar",
				tools : ['cuetrans','refresh'],
				toolBarConfig : cueToolBarConfig,
				width : 150,
				height : 51
			}));
		
		gisLayerHdrPanel.add(AllContainer);	
		
		ivmsMainPanel.add(gisLayerHdrPanel)	
		ivmsMainPanel.add(JPDetailsPanel)		
		ivmsMainPanel.add(gisLayerPanel)
		
		var run = function (delay) {
				Ext.create('Ext.util.DelayedTask', function () 
				{
					parentForm.fireEvent("afterrender");
					run(delay);
				}).delay(delay);
				};

		run(300000);
		 
		//ivmsMainPanel.add(gisLayer);
		mainpage.ptrMainSection.add(hiddenSection)
		mainpage.ptrMainSection.add(ivmsMainPanel)
			
		mainpage.eventHandlers = 
		[	/*
			{
				"tasktype":"gisproto",
				"filename":"ivms/ivms.json"
			},
			*/
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchVehDetails"
			}
			
		];	
		
		mainpage.hlpLinks=
		{	
			
			"VehSearch":
				{
					"hlpType":"hdrgrid",
					"gridID":"VehData",
					"hlpScreen":"ivms.VehSearch",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					]
				},
				"JPSearch":
				{
					"hlpType":"hdrgrid",
					"gridID":"JPData",
					"hlpScreen":"ivms.JPSearch",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					]
				}
		}
		mainpage.gridPopupLinks=
		{
			"historylink":
			{
				"dest":"ivms.JPHistory",
					"hdr":[
							{"src":"","dest":""}
							],
					"grid":[
							{"src":"JOURNEY_PLAN_NO","dest":"strJourneyPlan"}
							//{"src":"TRUCK_CODE","dest":"routeViewer_VehicleNo"}
							]
			}
		}
	
		this.callParent(arguments);
	},
	loadEntityScreens:function(tmp_appScreen,tmp_initialValues)
	{		
		plf.viewport.ptrContentPanel.appScreenJS = "CueTrans.view."+tmp_appScreen;
		plf.viewport.ptrContentPanel.searchScreenPtr.removeAll();
		plf.viewport.ptrContentPanel.appScreenPtr.removeAll();
		plf.viewport.ptrContentPanel.dashboardPtr.removeAll();		
		cueScrHistory.push({"appScreen":"CueTrans.view."+tmp_appScreen,"initValues":tmp_initialValues})
		plf.viewport.ptrContentPanel.loadAppScreen(plf.viewport.ptrContentPanel.appScreenJS,tmp_initialValues);
	},
	listeners : {
		render : function(wnd) {
			wnd.setLoading(true);
		}
	}
});

