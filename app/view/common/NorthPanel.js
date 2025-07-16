/*
File Version: 1.0.0.1
File Name 	: NorthPanel.js
/* Modified By			Date						ID					*/
/* Rajiv R				03/09/2014					57346				*/
/* Rajiv R				04/09/2014					57410				*/
/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.common.NorthPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.northpanel',
    region: "north",
    UserImagePath: 'resources/images/users/user_default.png',
    bodyPadding: 0,
    UserName: "Smith",
    initComponent: function() {
	
        this.userNameContainer = Ext.create("Ext.Component", {
            tpl: '<div class="user_name"><p class="pan1">Welcome</p><p class="pan2">{USER_NAME}!</p></div>',
            //columnWidth: .2,
            border: false,
			cls:'user_name_container',
            data: {
                "USER_NAME": ""
            }
        })
		this.roleContainer = Ext.create("Ext.Component", {
            tpl: '<div class="appTitle"><p>{ROLE_NAME}</p></div><div class="logo_splitter"></div>',
            //columnWidth: .2,
            border: false,
			cls:'',
            data: {
                "ROLE_NAME": ""
            }
        })
		//<div class="logo_splitter"></div><div class="appTitle"><p>Transport</p><p>Management System</p></div><div class="logo_splitter"></div>
		//<div class="user_name"><p class="pan2">{ENTITY_NAME}!</p></div><div class="logo_splitter"></div>
		this.entityContainer = Ext.create("Ext.Component", {
            tpl: '</div><div class="appTitle"><p>{ENTITY_NAME}</p></div>',
            //columnWidth: .2,
            border: false,
			cls:'',
            data: {
                "ENTITY_NAME": ""
            }
        })
		var tmpmenu=Ext.create('Ext.menu.Menu', {
							cls:"logout_menu",
							items: 
							[
								{text: 'Switch Context',
								iconCls:"switchcontext_icon",
								handler: function() 
									{
										//me.switchContextClick();
										launch_helpscreen("","","CueTrans.view.admin.SwitchContextOU")
									}
								},
								{text: 'Change Password', iconCls:"changepassword_icon",
									handler: function() 
												{
													//me.switchContextClick();
													launch_helpscreen("","","CueTrans.view.admin.ChangePassword")
												}								
								},
								{text: 'Logout', iconCls:"logout_icon",
								handler: function() 
									{						
											window.onbeforeunload = function (evt) 
											{		 
											};
	
											Ext.Ajax.request({
												url: "JMSServlet",
												//url : 'login.json',
												async:false,
												params: {

													workFlowName: "Logout",
													workFlowParams: ""
												},
												success: function(result) {
												},
												failure: function(result) {
												}
											})									
											location.href = "";
									}
								}
							]
						});
		var LogoutBtn=Ext.create('Ext.container.Container', {	
                        cls: 'logout',
						items: [{
                        xtype: 'button',						
                        height: 47,
                        width: 60,
						menu:tmpmenu						
								}]
					});
		

        var me = this;
        Ext.apply(this, {
            height: 0,
            border: false,
            items: [{
                layout: 'column',
                columns: 8,
                border: false,
                baseCls: 'northpanel-header',
                split: false,
                cls: 'banner',
                itemId: 'headerPanel',
                items: [
					{
                        html: '<div class="product_logo"><img src="resources/images/common/logo_patch.png"></div>',
						border: false
                    }, {
                        html: '<div class="logo_splitter"></div><div class="appTitle"><p>Transport</p><p>Management System</p></div><div class="logo_splitter"></div>',
                        //columnWidth: .3,
                        border: false
                    },
					{
                        html: '<div><img src="resources/images/common/logo_patch.png"></div>',
						cls:'customer_logo',
						border: false
                    },
					this.roleContainer,
					this.entityContainer,
					, /*{
                        html: '&nbsp;',
                        columnWidth: .8,
                        border: false
                    },
					*/
					LogoutBtn,	
					this.userNameContainer					
                    /*{
                        xtype: 'button',
						//icon: 'resources/images/users/user_default.png',
                        height: 46,
                        width: 60,
                        cls: 'logout',
						menu:tmpmenu
						/*
						,
                        listeners: {
                            el: {
                                click: function() {
                                    location.href = ""
                                }
                            }
                        }
						
                    },*/
                    
                ]
            }]

        });

        this.callParent(arguments);
    },
    display: function() {
        this.setHeight(46);
        //this.doComponentLayout();
    }
	/*
	,
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
        height: 280,
		autoScroll:false,
		items:tmpSwitchContext
			});
			tmpHelpWindow.show();
	}
	*/
});