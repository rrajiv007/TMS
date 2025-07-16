Ext.define('CueTrans.view.common.Console', 
{
	extend: 'Ext.panel.Panel',
	padding:10,
	baseCls:"consoleMasterPanel",
	layout:"column",
	height:520,
	defaults:
	{
		padding:10
	},
	initComponent: function()
	{	
		var me = this;
		
		this.callParent(arguments);
		
		var homePageStore = Ext.data.StoreManager.lookup('homePageStore')

		var homePageTpl = new Ext.XTemplate(
			'<tpl for=".">',
				'<div style="float:left" class="homepage-tplcls"  align="center">',
				'<div class="homepage-btn">',
				  '<img src="resources/images/console/largeicon/{menuIcon}" width="70" height="70" />',
				  '</img></div><div class="consoleContainerFont">{menuText}</div>',
				  '</div>',
			'</tpl>'
		);

		var tmpBPCIcon = Ext.create('Ext.view.View', {
			store: Ext.data.StoreManager.lookup('bpcIconStore'),
			tpl: homePageTpl,
			//width:900,
			itemSelector: 'div.homepage-tplcls',
			emptyText: 'No images available'
		});

		
		var tmpMasterIcon = Ext.create('Ext.view.View', {
			store: Ext.data.StoreManager.lookup('masterIconStore'),
			tpl: homePageTpl,
			//width:900,
			itemSelector: 'div.homepage-tplcls',
			emptyText: 'No images available',
			listeners: {
					'itemclick': function(view, record, item, idx, event, opts) {
						//me.launch_searchscreen("CueTrans.view."+record.get("searchJS"),"CueTrans.view."+record.get("appJS"))
						me.loadEntityScreens(record.get("searchJS"),record.get("appJS"),record.get("reportJS"))
					}
				}		
		});

		var tmpTransIcon = Ext.create('Ext.view.View', {
			store: Ext.data.StoreManager.lookup('transIconStore'),
			tpl: homePageTpl,
			//width:900,
			itemSelector: 'div.homepage-tplcls',
			emptyText: 'No images available',
			listeners: {
					'itemclick': function(view, record, item, idx, event, opts) {
						//me.launch_searchscreen("CueTrans.view."+record.get("searchJS"),"CueTrans.view."+record.get("appJS"))
						me.loadEntityScreens(record.get("searchJS"),record.get("appJS"),record.get("reportJS"))
					}
				}		
		});
		
		
		//var tmpConsoleBase = Ext.create("Ext.panel.Panel",{layout:"column",padding:5})
		var tmpBPCPanel = Ext.create("Ext.panel.Panel",{
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				//"vbox",
				padding:1,
				columnWidth:.25,
				height:500,
				baseCls:"consoleContainer"
			})

		tmpBPCPanel.add({xtype:"container",height:50,html:"<div class=consoleHeading>Business Process</div>",baseCls:"consoleHeading"})
		tmpBPCPanel.add({xtype:"container",height:450,items:[tmpBPCIcon]})
		
		var tmpMasterPanel = Ext.create("Ext.panel.Panel",{
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				//"vbox",
				padding:1,
				columnWidth:.5,
				height:500,
				baseCls:"consoleContainer"
			})
			
		tmpMasterPanel.add({xtype:"container",height:50,html:"<div class=consoleHeading>Masters</div>",baseCls:"consoleHeading"})
		tmpMasterPanel.add({xtype:"container",height:450,items:[tmpMasterIcon]})
		
		var tmpTransactionPanel = Ext.create("Ext.panel.Panel",{
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				//"vbox",
				padding:1,
				columnWidth:.25,
				height:500,
				baseCls:"consoleContainer"
			})
			
		tmpTransactionPanel.add({xtype:"container",height:50,html:"<div class=consoleHeading>Modules</div>",baseCls:"consoleHeading"})
		tmpTransactionPanel.add({xtype:"container",height:450,items:[tmpTransIcon]})
		
		this.add(tmpBPCPanel)
		this.add(tmpTransactionPanel)
		this.add(tmpMasterPanel)
		
		//this.add(tmpReportPanel)
		
		
		//this.add(tmpHomePageView);
	},
	loadEntityScreens:function(tmp_searchScreen,tmp_appScreen,tmp_reportScreen,tmp_initialValues)
	{
		if(tmp_searchScreen=="" & tmp_appScreen == "" & tmp_reportScreen=="")
		{
			return
		}
	
		if(tmp_searchScreen=="")
		{
			plf.viewport.ptrContentPanel.searchScreenJS = "";
		}
		else
		{
			plf.viewport.ptrContentPanel.searchScreenJS = "CueTrans.view."+tmp_searchScreen;
		}
		
		plf.viewport.ptrContentPanel.appScreenJS = "CueTrans.view."+tmp_appScreen;
		if(tmp_reportScreen == "")
		{
			plf.viewport.ptrContentPanel.reportScreenJS = "";
		}
		else
		{
			plf.viewport.ptrContentPanel.reportScreenJS = "CueTrans.view."+tmp_reportScreen;
		}
		
		plf.viewport.ptrContentPanel.searchScreenPtr.removeAll();
		plf.viewport.ptrContentPanel.appScreenPtr.removeAll();
		plf.viewport.ptrContentPanel.reportScreenPtr.removeAll();
		
		if(tmp_searchScreen=="")
		{
			plf.viewport.ptrContentPanel.loadAppScreen(tmp_initialValues);
		}
		else
		{
			plf.viewport.ptrContentPanel.loadSearchScreen(tmp_initialValues);
		}
	}
});
		