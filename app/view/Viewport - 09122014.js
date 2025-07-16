/*
CueTrans Viewport Panel.

KeyPoints:
Border layout is used for the layout.

KeyMethods:

*/

Ext.define('CueTrans.view.Viewport', {

    extend: 'Ext.container.Viewport',

	//Pointer to hold West Panel
	ptrWestPanel:"",
	
	//Pointer to hold East Panel
	ptrEastPanel:"",
	
	//Pointer to hold North Panel
	ptrNorthPanel:"",
	
	//Pointer to hold South Panel
	ptrSouthPanel:"",
	
	//Pointer to hold Content Panel
	ptrContentPanel:"",
	
    initComponent: function()
	{
		Ext.QuickTips.init();
		if(plf.screenWidth<=1250)
		{
			plf.screenWidth=1250;
		}
		
		//Apply Border 
        Ext.apply(this, 
		{
			layout: 
			{
				type: 'border'
			},
			border:false,
			id: 'app-cuetrans',
			width:plf.screenWidth-plf.appMargin
        });
		
		this.callParent(arguments);
	
		this.ptrWestPanel = Ext.create('CueTrans.view.common.WestPanel')
		this.add(this.ptrWestPanel);

		//this.ptrEastPanel = Ext.create('CueTrans.view.common.EastPanel')
		//this.ptrEastPanel = Ext.create('Ext.panel.Panel')
		//this.add(this.ptrEastPanel);
		
		this.ptrNorthPanel = Ext.create('CueTrans.view.common.NorthPanel')
		this.add(this.ptrNorthPanel);

		this.ptrSouthPanel = Ext.create('CueTrans.view.common.SouthPanel')
		this.add(this.ptrSouthPanel);

		this.ptrContentPanel = Ext.create('CueTrans.view.admin.login')
		//this.ptrContentPanel = Ext.create('CueTrans.view.common.ContentPanel')
		this.add(this.ptrContentPanel);		

		//this.ptrSouthPanel.display()
		//this.ptrNorthPanel.display()
		//this.ptrEastPanel.display()
		//this.ptrWestPanel.display()
		
		
    }
});
