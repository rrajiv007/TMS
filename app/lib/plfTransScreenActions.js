/*
File Version: 1.0.0.0
File Name 	: plfTransScreenActions.js
Purpose 	: Core file which is used to define Screen action Buttons
Note		: 
*/
Ext.define("CueTrans.lib.plfTransScreenActions",
{
	extend: 'Ext.panel.Panel',
	layout:{
			type: 'hbox',
			//align: 'right',
			pack: 'end'
			},
	border:true,
	cls:'toolbariconbtn',	
	basePtr:{},
	border:0,
	width:plf.screenWidth-plf.appMargin-240,
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
		this.toolbarActions.forEach(function(tmpAction)
			{
				if(tmpAction["name"] !=undefined)
				{
					if(tmpAction["name"].toLowerCase()!="refresh")
					{
						tmpToolbarIcons.push(me.addButton(tmpAction));
					}
				}
				else
				{
				if(tmpAction.toLowerCase()!="refresh")
					{
						tmpToolbarIcons.push(me.addButton1(tmpAction));
					}
				}
				
				
			}
		)

		Ext.apply(this,
		{
			items:
			[
				{
					layout:"hbox",
					border:false,
					//padding:plf.padding,
					xtype:'panel',
					//margin:1,
					//defaults:{"padding":plf.padding},
					bodyCls:'cmn_actionbar',
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
						//alert(key);
						var tmp_name = tmpAction["name"];
						var tooltip_tmp = tmpAction["tooltip"];		
						//alert(tmp_name);						
						var tmpLowerCaseAction = tmp_name.toLowerCase();		
						var me=this;
						
						tmpObj=
							{
								xtype:"button",
								itemId:tmpLowerCaseAction+'_icon',
								height: 25,
								//cls:'toolbariconbtn',
								//iconCls:'toolbariconimg',
								//width: 100,
								//icon:'resources/images/screenbar/'+tmpLowerCaseAction+'.png',
								//iconAlign:'left',
								scale   : 'small',
								text:tmp_name,
								tooltip:tooltip_tmp,
								handler:function(eventobj)
								{
									if(tmpAction["msg"] !=undefined)
									{
										var confirmMsg = confirm(tmpAction["msg"]);
										if (confirmMsg) 
										{
										me.fireEvent(tmpLowerCaseAction);
										}
									}
									else
									{
									console.log("Fire Event",me.basePtr)
									me.fireEvent(tmpLowerCaseAction);
									}
								}
							}		
						return tmpObj
						
						
						
					
			
		
		
	},
	addButton1:function(tmpAction)
	{															
						var tmpLowerCaseAction = tmpAction.toLowerCase();		
						var me=this;
						
						tmpObj=
							{
								xtype:"button",
								itemId:tmpLowerCaseAction+'_icon',
								height: 27,
								//cls:'toolbariconbtn',
								//iconCls:'toolbariconimg',
								//width: 100,
								//icon:'resources/images/screenbar/'+tmpLowerCaseAction+'.png',
								//iconAlign:'left',
								scale   : 'small',
								text:tmpAction,								
								handler:function(eventobj)
								{
									if(tmpAction["msg"] !=undefined)
									{
										var confirmMsg = confirm(tmpAction["msg"]);
										if (confirmMsg) 
										{
										me.fireEvent(tmpLowerCaseAction);
										}
									}
									else
									{
										//me.fireEvent(tmpLowerCaseAction);
										console.log("Fire Event",me.basePtr)
										me.fireEvent(tmpLowerCaseAction);
									}
								}
							}		
						return tmpObj
						
	}
});
