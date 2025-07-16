Ext.define('CueTrans.view.common.NorthPanel', 
{
    extend: 'Ext.panel.Panel',
    alias: 'widget.northpanel',
	region:"north",
	UserImagePath:'resources/images/avatar.jpg',
	UserName:"Smith",
	//bodyCls :'northpanel-header',
	layout:'fit',
	border:false,
	initComponent: function()
	{
		this.userNameContainer = Ext.create("Ext.Component",
			{
			tpl:'<span class="topspace"><br/>Welcome {USER_NAME}!</span>',
			columnWidth:.2,
			border:false,
			date:[{"USER_NAME":"Smith"}]
			})
		
	
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
									bodyCls :'northpanel-header',
									items:
									[
										{
											xtype:'image',
											src: 'resources/images/logo.png',
											height: 45, // Specifying height/width ensures correct layout
											width: 267,
											//border:'3px',
											//columnWidth:.2,
											cls:'logo-icon',
										},
										{
											html:'<span class="topspace">&nbsp;</span>',
											columnWidth:.75,
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
											html:'<span class="topspace">&nbsp;</span>',
											columnWidth:.01,
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
										{
											html:'<a href="" class="logout-icon"><img src="resources/images/logout.png" alt="logout" /></a>',
											//columnWidth:.05,
											border:false,
											height: 56, // Specifying height/width ensures correct layout
											width: 55,
											align:'center',
											cls:'logout'
										}										
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
	}	
});
	
	
