/*
File Version: 1.0.0.0
File Name 	: NorthPanel.js
/* Modified By			Date						ID					*/
/* Rajiv R				03/09/2014					57346				*/
Ext.define('CueTrans.view.common.NorthPanel', 
{
    extend: 'Ext.panel.Panel',
    alias: 'widget.northpanel',
	region:"north",
	UserImagePath:'resources/images/users/default.png',
	UserName:"Smith",
	//bodyCls :'northpanel-header',
	layout:'fit',
	border:false,
	initComponent: function()
	{
		this.userNameContainer = Ext.create("Ext.Component",
			{
			tpl:'<div class="northpanel-header"><br/>Welcome {USER_NAME}!</div>',
			columnWidth:.2,
			border:false,
			data:{"USER_NAME":"Smith"}
			})
		
		var me=this;
		Ext.apply(this, 
					{
						collapsible: false,
						split: false,
						height: 0,
						border:0,
						//bodyCls :'northpanel-header',
						items:
							[
								{
									layout:'column',
									columns:7,
									border:false,
									baseCls :'northpanel-header',
									items:
									[
										{
											xtype:'image',
											src: 'resources/images/common/logo.png',
											height: 50, // Specifying height/width ensures correct layout
											width: 50,
											//border:'3px',
											//columnWidth:.2,
											cls:'logo-icon',
										},
										{
											html:'<div class="application-header">Safe Journey Management System</div>',
											columnWidth:.4,
											baseCls :'northpanel-header',
											border:false								
										},
										{
											xtype:'image',
											src: 'resources/images/northpanel/console.png',
											//border:'3px',
											//columnWidth:.2,
											cls:'northpanel-icon',
											listeners: {
												render: function(objctrl) {
													objctrl.getEl().on('click',
													function(eventobj){me.consoleClick()}, objctrl);
													Ext.create('Ext.tip.ToolTip', {
														target: objctrl.getEl(),
														anchor: 'bottom',
														trackMouse: true,														
														html: "Home"
													});													
												}
											}													
										},
										{
											html:'<span class="northpanel-header">&nbsp;</span>',
											columnWidth:.01,
											baseCls :'northpanel-header',
											border:false
										},										
										{
											xtype:'image',
											src: 'resources/images/northpanel/launch.png',
											//border:'3px',
											//columnWidth:.2,
											cls:'northpanel-icon',
											listeners: {
												render: function(objctrl) {
													objctrl.getEl().on('click',
													function(eventobj){me.searchClick()}, objctrl);
													Ext.create('Ext.tip.ToolTip', {
														target: objctrl.getEl(),
														anchor: 'bottom',
														trackMouse: true,														
														html: "Search"
													});													
												}
											}					
										},
										{
											html:'<span class="northpanel-header">&nbsp;</span>',
											columnWidth:.01,
											baseCls :'northpanel-header',
											border:false
										},															
										{
											xtype:'image',
											src: 'resources/images/northpanel/application.png',
											//border:'3px',
											//columnWidth:.2,
											cls:'northpanel-icon',
											listeners: {
												render: function(objctrl) {
													objctrl.getEl().on('click',
													function(eventobj){me.applicationClick()}, objctrl);
													Ext.create('Ext.tip.ToolTip', {
														target: objctrl.getEl(),
														anchor: 'bottom',
														trackMouse: true,														
														html: "Application"
													});													
												}
											}					
										},
										{
											html:'<span class="northpanel-header">&nbsp;</span>',
											columnWidth:.01,
											baseCls :'northpanel-header',
											border:false
										},															
										{
											xtype:'image',
											src: 'resources/images/northpanel/report.png',
											//border:'3px',
											//columnWidth:.2,
											cls:'northpanel-icon',
											listeners: {
												render: function(objctrl) {
													objctrl.getEl().on('click',
													function(eventobj){me.reportClick()}, objctrl);
													Ext.create('Ext.tip.ToolTip', {
														target: objctrl.getEl(),
														anchor: 'bottom',
														trackMouse: true,														
														html: "Reports"
													});
												}
											}					
										},
										{
											html:'<span class="northpanel-header">&nbsp;</span>',
											columnWidth:.01,
											baseCls :'northpanel-header',
											border:false
										},															
										{
											xtype:'image',
											src: 'resources/images/northpanel/dashboard.png',
											//border:'3px',
											//columnWidth:.2,
											cls:'northpanel-icon',
											listeners: {
												render: function(objctrl) {
													objctrl.getEl().on('click',
													function(eventobj){me.dashboardClick()}, objctrl);
													Ext.create('Ext.tip.ToolTip', {
														target: objctrl.getEl(),
														anchor: 'bottom',
														trackMouse: true,														
														html: "Dashboard"
													});
												}
											}					
										},
										{
											html:'<span class="northpanel-header">&nbsp;</span>',
											columnWidth:.3,
											baseCls :'northpanel-header',
											border:false
										},
										{
											xtype:'image',
											src: this.UserImagePath,
											height: 40, 
											width: 40,
											cls:'user-avatar'
										},										
										{
											html:'<span class="northpanel-header">&nbsp;</span>',
											columnWidth:.01,
											baseCls :'northpanel-header',
											border:false
										},
										this.userNameContainer,
										/*
										{											
											html:'<span class="topspace"><br/>Welcome '+ this.UserName +'!</span>',
											columnWidth:.2,
											border:false
										},
										*/
										/*
										{
											html:'<a href="" class="northpanel-icon"><img src="resources/images/northpanel/logout.png" alt="logout" /></a>',
											//columnWidth:.05,
											border:false,
											//height: 56, // Specifying height/width ensures correct layout
											//width: 55,
											//align:'center',
											cls:'logout'
										}
										*/
										{
											xtype:'image',
											src: 'resources/images/northpanel/logout.png',
											//border:'3px',
											//columnWidth:.2,
											cls:'northpanel-icon logout',
											/*Code added for bug id:57346*/
											title:'Log Out',
											listeners: {
											el: {
												click: function() {
												location.href=""	
												}
											}
										}
										/*code ends here for bugid:57346*/ 
										},										
									]
								}
							]
						
					}
				);
		
		this.callParent(arguments);
	},
	display:function()
	{
		this.setHeight(50);
		this.doComponentLayout();
	},
	consoleClick:function()
	{
		//plf.viewport.ptrContentPanel.setActiveTab(plf.viewport.ptrContentPanel.consolePtr)
		plf.viewport.ptrContentPanel.loadConsoleScreen();
	},
	searchClick:function()
	{
		//plf.viewport.ptrContentPanel.setActiveTab(plf.viewport.ptrContentPanel.applicationPtr)
		plf.viewport.ptrContentPanel.loadSearchScreen();
	},
	applicationClick:function()
	{
		plf.viewport.ptrContentPanel.loadAppScreen();
	},
	reportClick:function()
	{
		plf.viewport.ptrContentPanel.loadReportScreen();
	},
	dashboardClick:function()
	{
		plf.viewport.ptrContentPanel.loadDashboardScreen();
	}
	

});
	
	
