/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.common.EastPanel', 
{
    extend: 'Ext.panel.Panel',
    alias: 'widget.eastpanel',
	region:"east",
	border:false,
	cls:'sidebaricons',
	width: 60,
	layout:"vbox",	
	initComponent: function()
	{
		var me = this;
		
	
		Ext.apply(this, 
					{
						collapsible: false,
						split: false,
						height: 0,
						border:0,						
						items:
							[
								{
									layout:{type:"vbox",align:"center",pack: 'center'},									
									border:false,
									width: 60,
									items:
									[										
										{
											xtype:'image',
											src: 'resources/images/northpanel/console_icon.png',
											cls: 'east_panel_button_container',
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
											xtype:'image',
											src: 'resources/images/northpanel/search_icon.png',
											cls: 'east_panel_button_container',
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
										}/*,
										{
											xtype:'image',
											src: 'resources/images/northpanel/application_icon.png',
											cls: 'east_panel_button_container',
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
											xtype:'image',
											src: 'resources/images/northpanel/reports_icon.png',
											cls: 'east_panel_button_container',
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
											xtype:'image',
											src: 'resources/images/northpanel/dashboard_icon.png',
											cls: 'east_panel_button_container',
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
											xtype:'image',
											src: 'resources/images/northpanel/switch_context_icon.png',
											cls: 'east_panel_button_container',
											listeners: {
												render: function(objctrl) {
													objctrl.getEl().on('click',
													function(eventobj){me.switchContextClick()}, objctrl);
													Ext.create('Ext.tip.ToolTip', {
														target: objctrl.getEl(),
														anchor: 'bottom',
														trackMouse: true,														
														html: "Switch Context"
													});
												}
											}					
										}*/									
									]
								}
							]
						
					}
				);	
this.callParent(arguments);				
	},
	display:function()
	{
		this.setWidth(60);
	},
	consoleClick:function()
	{
		//plf.viewport.ptrContentPanel.setActiveTab(plf.viewport.ptrContentPanel.consolePtr)
		plf.viewport.ptrContentPanel.loadConsoleScreen();
	},
	searchClick:function()
	{
		//plf.viewport.ptrContentPanel.setActiveTab(plf.viewport.ptrContentPanel.applicationPtr)
		cueScrHistory.push({"appScreen":plf.viewport.ptrContentPanel.searchScreenJS})
		plf.viewport.ptrContentPanel.loadSearchScreen();
	},
	applicationClick:function()
	{
		cueScrHistory.push({"appScreen":plf.viewport.ptrContentPanel.appScreenJS,"initValues":plf.viewport.ptrContentPanel.appScreenPtr.initialValues})
		plf.viewport.ptrContentPanel.loadAppScreen();
	},
	reportClick:function()
	{
		plf.viewport.ptrContentPanel.loadReportScreen();
	},
	/*code added for id: 57410 starts here*/
	dashboardClick:function()
	{
		plf.viewport.ptrContentPanel.loadDashboardScreen();
	},
	switchContextClick:function()
	{
		var tmpObj="CueTrans.view.admin.SwitchContextOU";
		var tmpSwitchContext = Ext.create(tmpObj,
		{
			"initialValues":""
		});
		
		var tmpHelpWindow =Ext.create('Ext.Window',{
		title: "",
		layout:'fit',
        width: plf.screenWidth*.93,
        height: window.screen.availHeight *.8,
		autoScroll:false,
		items:tmpSwitchContext
			});
			tmpHelpWindow.show();
	}
	
});
	
	
