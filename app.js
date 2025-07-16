Ext.application({
    name: 'CueTrans',

    requires: 
	[
	'plf'
    ],

    //autoCreateViewport: true
    launch: function () 
	{
		//loadLogin()
		this.viewport = Ext.create('CueTrans.view.Viewport');
		plf.viewport = this.viewport;
    }

});
