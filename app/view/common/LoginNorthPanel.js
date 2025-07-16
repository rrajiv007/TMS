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
Ext.define('CueTrans.view.common.LoginNorthPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.LoginNorthPanel',
    region: "north",
    UserImagePath: 'resources/images/users/user_default.png',
    bodyPadding: 0,
    UserName: "Smith",
    initComponent: function() {
	
       
		

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
                        html: '<div><img src="resources/images/common/pdo_logo1.jpg"></div>',
						cls:'customer_logo',
						border: false
                    },
					{xtype: "button",align: "right",text:"Shipment Tracking",width:200,height:30,margin:5,cls:"login_btn",
						handler:function(obj)
						{
							plf.viewport.ptrContentPanel.removeAll();							
							plf.viewport.ptrContentPanel = Ext.create('CueTrans.view.common.ContentPanel');
							plf.viewport.ptrContentPanel.setHeight(plf.screenHeight - plf.appMarginHeight)
							plf.viewport.ptrContentPanel.setWidth(plf.screenWidth);
							plf.viewport.ptrContentPanel.searchScreenJS = "CueTrans.view.track.LoginShipmentTrack";
							plf.viewport.ptrContentPanel.loadSearchScreen();
							plf.viewport.ptrLoginNorthPanel.hide();
							plf.viewport.ptrLoginNorthPanel.removeAll();
							plf.viewport.add(plf.viewport.ptrContentPanel)
					}}
                    
                ]
            }]

        });

        this.callParent(arguments);
    },
    display: function() {
        this.setHeight(46);
    },
    hide: function() {
        this.setHeight(0);
    }
	
});