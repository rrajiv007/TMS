/*
File Version: 1.0.0.0
File Name 	: plfTransScreenToolBar.js
Purpose 	: Core file which is used to define Toolbar
*/
Ext.define("CueTrans.lib.plfTransScreenToolBar",
{
	extend: 'Ext.panel.Panel',
	layout:'vbox',
	border:true,
	bodyCls:'toolbarlinkbtn',
	basePtr:{},
	border:0,
	width:plf.screenWidth-plf.appMargin-420,
	
	/*
		Array List to hold Toolbar Action items.
	*/
	toolbarActions:[],
	
	/*
		Array List to hold Toolbar Links
	*/
	toolbarLinks:[],
	initComponent: function()
	{	
		var hrLine = {html:"<hr>",border:false,cls:"c-mainpage-section"};
		var me=this;
		var tmpToolbarIcons=[]
		var tmpToolbarBtnLinks=[]
		
		/*
			Toolbar icons rendered.
		*/
		/*
		this.toolbarActions.forEach(function(tmpAction)
			{
				tmpToolbarIcons.push(me.addButton(tmpAction));
			}
		)
		*/

		/*
			Toolbar links rendered.
		*/
		this.toolbarLinks.forEach(function(tmpObj)
			{
				tmpToolbarIcons.push(me.addLinkButton(tmpObj.name,tmpObj.linkid,tmpObj.tooltip));
				//tmpToolbarBtnLinks.push(me.addLinkButton(tmpObj.name,tmpObj.linkid));
			}
		)
		
		tmpToolbarIcons.push(me.addRefreshButton());
		tmpToolbarIcons.push(me.addBackButton());
		/*
		this.tmpTBLinkMenu = Ext.create("Ext.menu.Menu",{baseCls:"gotomenucls",items:tmpToolbarBtnLinks,autoDestory:true})
		*/
		/*
		if(tmpToolbarBtnLinks.length > 0)
		{
			tmpToolbarIcons.push({xtype:"container",width:20})
			
			tmpToolbarIcons.push(
				{
					xtype:"button",
					text      : 'Goto:',
					height: 25, //Changed from 50 to 25
					baseCls:'toolbariconbtn',
					arrowAlign: 'right',
					menu      : this.tmpTBLinkMenu
				})
		}
		*/
		
		Ext.apply(this,
		{
			items:
			[
				{
					layout: {
							type: 'hbox',
							//align: 'center',
							pack: 'end'
						},
					border:false,
					xtype:'panel',
					//margin:1,
					//"padding":plf.padding,
					//defaults:{"padding":plf.padding},
					//bodyCls:'cmn_actionbar',
					width:plf.screenWidth-plf.appMargin-420,
					items:tmpToolbarIcons
				}
			]
		});
		this.callParent(arguments);
	},
	
	/*
		Toolbar Button renderer.
	*/
	addButton:function(tmpAction)
	{
		var tmpLowerCaseAction = tmpAction.toLowerCase();		
		var me=this;
		/*
		tmpObj=
			{
				xtype:"container",
				cls:"tb_button",
				layout: {
					   type: 'vbox',
					   align: 'center'
					   },
				border:1,
				width: 100,
				padding:plf.padding,
				items:
				[
					{
						columnWidth:.02,
						itemId:tmpLowerCaseAction+'_icon',
						xtype:'image',
						//baseCls:'toolbariconimg',
						height: 22,
						width: 22,
						src:'resources/images/screenbar/'+tmpLowerCaseAction+'.png'
					}
					,{xtype:'label',text:tmpAction}
				],
				listeners: {
					render: function(objctrl) {
						objctrl.getEl().on('mousedown',
								function(eventobj){
									me.fireEvent(tmpLowerCaseAction);
								})
					}
				}
				
			}
		*/
		tmpObj=
			{
				xtype:"button",
				itemId:tmpLowerCaseAction+'_icon',
				height: 25,
				baseCls:'toolbariconbtn',
				margin:0,
				//iconCls:'toolbariconimg',
				//width: 100,
				//icon:'resources/images/screenbar/'+tmpLowerCaseAction+'.png',
				//iconAlign:'left',
				scale   : 'small',
				text:tmpAction,
				handler:function(eventobj){
						me.fireEvent(tmpLowerCaseAction);
							}
			}		
		return tmpObj
	},
	addBackButton:function()
	{
		var me=this;	
		tmpObj=
		{
			xtype:"image",
			itemId:'backbtn_id',
			src: 'resources/images/common/spacer.png',	
			width:41,
			height:26,
			cls:"back_button",
			title:"Click here to view back history.",
			listeners: {
					el: {
						click: function() {
							//plf.viewport.ptrContentPanel.loadConsoleScreen();
							var result = confirm("Do you want to continue?");
							if (result) 
							{
							cueScrHistory.pop();
							var backHistoryObj = cueScrHistory.pop();
							//console.log(cueScrHistory)
							console.log(backHistoryObj)
							if(backHistoryObj)
							{
								launch_screen(backHistoryObj.form_obj,backHistoryObj.appScreen,backHistoryObj.initValues,backHistoryObj.tab)
							}
							else
							{
								plf.viewport.ptrContentPanel.loadConsoleScreen();
							}
							}
								
						}
					}
				}
		}		
		return tmpObj;						
	},
	/*Refresh Button*/
	addRefreshButton:function()
	{
		var me=this;	
		tmpObj=
		{
			xtype:"image",
			itemId:'refreshbtn_id',
			src: 'resources/images/common/spacer.png',	
			width:41,
			height:26,
			cls:"refresh_button",
			title:"Click here to refresh.",
			listeners: {
					el: {
						click: function() 
						{
							/*
							var form_obj=me.basePtr;
							form_obj.initialValues = [];
							console.log(form_obj.query('.field'));
							form_obj.query('.field').forEach(function(field_obj) 
							{
								field_obj.setDisabled(false);
								field_obj.suspendEvents(false);
								field_obj.setValue();
								field_obj.resumeEvents();
							})

							form_obj.query('.grid').forEach(function(field_obj) {
								field_obj.setDisabled(false); //By default, make all the controls editable.
								field_obj.getStore().clearFilter();
								field_obj.getStore().removeAll();
							})
							*/
							var form_obj=me.basePtr;
							form_obj.fireEvent("afterrender");
						}
					}
				}
		}		
		return tmpObj;						
	},
	/*Refresh button*/
	/*
		Toolbar Button renderer.
	*/
	addLinkButton:function(tmpAction,tmpLinkID,tmpTooltip)
	{
		var tmpLowerCaseAction = tmpAction.toLowerCase();	
		var	tmpLowerCaseLinkId = tmpLinkID.toLowerCase();
		var me=this;
		tmpObj=
			{
				xtype:"button",
				itemId:tmpLowerCaseAction+'_icon',
				height: 27,
				//margin:1,
				//height: 40,
				//width: 175,
				//baseCls:'toolbarlinkbtn',
				//iconCls:'toolbarlinkimg',
				//width: 80,
				//cls:'toolbarlinkbtn',
				//src:'resources/images/cuetoolbar/'+tmpLowerCaseLinkId+'.svg',
				//iconAlign:'left',
				//scale   : 'large',
				text:tmpAction,
				tooltip:tmpTooltip,
				/*listeners: {
					el: {
						click: function() {
							me.basePtr.processHLink(tmpLinkID);
						}
					}
				},*/
				handler:function(eventobj){
						me.basePtr.processHLink(tmpLinkID);
						}
			}		
		return tmpObj
	}	
});
