Ext.Loader.setPath('Ext.ux', 'lib/extjs/ux');
Ext.require([
    'Ext.window.*',
    'Ext.ux.GMapPanel'
]);

Ext.define('CueTrans.view.common.ContentPanel', 
{
    extend: 'Ext.tab.Panel',
    alias: 'widget.contentpanel',
	region:"center",
	//uses: ['CueTrans.view.portlet.GridPortlet'],
	id:'contentpanel_id',
	//layout:'fit',
	autoScroll : true,
	width:plf.screenWidth-plf.appMargin,	
	//cls :"strip-hidden",
	autoHeight : true,
	bodyBorder:false,
	border:false,
	padding:10,
	
	searchScreenJS:"",
	appScreenJS:"",
	reportScreenJS:"",
	dashboardJS:"",
	//dashboard_flag:true
	//requires: ['CueTrans.view.portlet.PortalPanel'],
	//uses: ['CueTrans.view.portlet.PortalPanel'],
	loadConsoleScreen:function()
	{
		this.setActiveTab(this.consolePtr)
	},	
	loadSearchScreen:function(tmp_initialValues)	
	{
		if(this.searchScreenJS != "")
		{
			var tmpSearchScreenObj = Ext.create(this.searchScreenJS/*,{"initialValues":tmp_initialValues}*/);
			this.searchScreenPtr.removeAll();
			this.searchScreenPtr.add(tmpSearchScreenObj);
			this.setActiveTab(this.searchScreenPtr)	
		}
		/*
		plf.viewport.ptrContentPanel.appScreenPtr.removeAll();
		plf.viewport.ptrContentPanel.appScreenPtr.add(tmpSearchScreenObj);
		plf.viewport.ptrContentPanel.setActiveTab(plf.viewport.ptrContentPanel.appScreenPtr)	
		*/
	},
	loadAppScreen:function(tmp_appScreen,tmp_initialValues)
	{
		if(tmp_appScreen == undefined) tmp_appScreen=""
		if(tmp_initialValues == undefined) tmp_initialValues=""
		
		if(tmp_appScreen != "" && this.appScreenJS != tmp_appScreen)
		{
			this.appScreenJS = tmp_appScreen
			this.appScreenPtr.removeAll();
		}
		
		if(this.appScreenJS != "")
		{
			if(this.appScreenPtr.items.getCount()==0)
			{
				var tmpAppScreenObj = Ext.create(this.appScreenJS,{"initialValues":tmp_initialValues});
				this.appScreenPtr.removeAll();
				this.appScreenPtr.add(tmpAppScreenObj);
			}
			this.setActiveTab(this.appScreenPtr)
		}
	},
	loadReportScreen:function()
	{
		if(this.reportScreenJS != "")
		{
			if(this.reportScreenPtr.items.getCount()==0)
			{
				var tmpReportScreenObj = Ext.create(this.reportScreenJS);
				this.reportScreenPtr.removeAll();
				this.reportScreenPtr.add(tmpReportScreenObj);
			}
			this.setActiveTab(this.reportScreenPtr)
		}		
	},
	loadDashboardScreen:function()
	{
		if(this.dashboardJS != "")
		{
			if(this.dashboardPtr.items.getCount()==0)
			{
				var tmpDashboardObj = Ext.create(this.dashboardJS);
				this.dashboardPtr.removeAll();
				this.dashboardPtr.add(tmpDashboardObj);
			}
			this.setActiveTab(this.dashboardPtr)
		}		
	},	
	initComponent: function()
	{
		this.callParent(arguments);
		var me=this;
		
		Ext.define('homePageModel', {
			extend: 'Ext.data.Model',
			fields: [
				{ name:'entityType', type:'string' },
				{ name:'searchJS', type:'string' },
				{ name:'appJS', type:'string' },
				{ name:'reportJS', type:'string' },
				{ name:'menuText', type:'string' },
				{ name:'menuIcon', type:'string' } 
			]
		});

		Ext.create('Ext.data.Store', {
			id:'homePageStore',
			model: 'homePageModel'
		});

		Ext.create('Ext.data.Store', {
			id:'bpcIconStore',
			model: 'homePageModel'
		});		
		
		Ext.create('Ext.data.Store', {
			id:'masterIconStore',
			model: 'homePageModel'
		});		

		Ext.create('Ext.data.Store', {
			id:'transIconStore',
			model: 'homePageModel'
		});		
		
		
		me.consolePtr = Ext.create("CueTrans.view.common.Console")
		
		me.searchScreenPtr = Ext.create("Ext.panel.Panel",{
			id: 'contentpanel_searchscreen',
			width:plf.screenWidth-plf.appMargin,
			bodyCls: 'content_bg',
			layout:'fit',
			border:false,
			defaults: 
						{
							autoScroll: true
						},
			autoWidth: false,
			autoHeight: false
		})

		me.appScreenPtr = Ext.create("Ext.panel.Panel",{
			id: 'contentpanel_appscreen',
			width:plf.screenWidth-plf.appMargin,
			bodyCls: 'content_bg',
			layout:'fit',
			border:false,
			defaults: 
						{
							autoScroll: true
						},
			autoWidth: false,
			autoHeight: false
		})

		me.reportScreenPtr = Ext.create("Ext.panel.Panel",{
			id: 'contentpanel_reportscreen',
			width:plf.screenWidth-plf.appMargin,
			bodyCls: 'content_bg',
			layout:'fit',
			border:false,
			defaults: 
						{
							autoScroll: true
						},
			autoWidth: false,
			autoHeight: false
		})
		
		me.getTabBar().hide();
		me.add(me.consolePtr);
		me.add(me.searchScreenPtr);
		me.add(me.appScreenPtr);		
		me.add(me.reportScreenPtr);
		/*
		me.contentPanelPtr = Ext.create("Ext.tab.Panel",{
			id: 'contentpanel_id',
			autoWidth: false,
			autoHeight: false,
			collapsible: false,
			padding:0,
			split: true,
			bodyCls:'content_bg',
			defaults: 
			{
				autoScroll: true
			},
			items:
			[
			me.consolePtr
			]
		})
		*/
		
		//me.contentPanelPtr.add(me.consolePtr)
		//me.contentPanelPtr.add(me.appScreenPtr)
		//me.contentPanelPtr.getTabBar().hide();
		/*
		Ext.apply(this,{
			items:[me.appScreenPtr]
		})
		*/

		/*
		Ext.apply(this, 
					{
						xtype: 'tabpanel',
						items: 
						[
								{
									xtype: 'panel',
									//title: 'Console',
									id: 'consolepanel_console',
									layout:'fit',
									padding:0,
									border:false,
									defaults: 
												{
													autoScroll: true
												},
									
									autoWidth: false,
									autoHeight: false,
									items:
									[],
									defaults: 
									{
										autoScroll: true
									}
								},	
								{
									xtype: 'panel',
									//title: 'LaunchPad',
									id: 'contentpanel_launchpad',
									layout:'fit',
									padding:0,
									border:false,
									defaults: 
												{
													autoScroll: true
												},
									
									autoWidth: false,
									autoHeight: false,
									defaults: 
									{
										autoScroll: true
									}
								},
								{
									xtype: 'panel',
									//title: 'Application',
									id: 'contentpanel_screen',
									width:plf.screenWidth-plf.appMargin,
									bodyCls: 'content_bg',
									layout:'fit',
									padding:0,
									border:false,
									defaults: 
												{
													autoScroll: true
												},
									
									autoWidth: false,
									autoHeight: false,
									
									items:
									[]
									//[Ext.create("CueTrans.view.journey_management.JourneyPlan")]
									
									/-- defaults: 
									{
										autoScroll: true
									}--/
								}
								/--							
								{
									xtype: 'panel',
									title: 'Vehicle Monitor',
									id: 'contentpanel_ivms',
									bodyCls: 'content_bg',
									layout:'fit',
									padding:0,
									border:false,
									defaults: 
												{
													autoScroll: true
												},
									
									autoWidth: false,
									autoHeight: false,
									
									items:
									[
										
										{
											xtype: 'gmappanel',
											center: {
												geoCodeAddr: 'DIC Building 4,Shaikh Zayed Road,Dubai'
											},
											markers: [{
												lat: 42.339641,
												lng: -71.094224,
												title: 'Boston Museum of Fine Arts'
												},
												{
													lat: 42.339419,
													lng: -71.09077,
													title: 'Northeastern University'
												}										
											],
										}
										Ext.create("Ext.ux.CueCent.GIS")										
										

									],
									defaults: 
									{
										autoScroll: true
									}
								}
								--/
						]
					}
				);
		*/
	}
});

