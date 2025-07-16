/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.common.SouthPanel', 
{
    extend: 'Ext.panel.Panel',
    alias: 'widget.footerpanel',
	region:"south",
	border:false,
	initComponent: function()
	{
	
		Ext.apply(this, 
					{
					/*
                    split: true,
                    width: 20,
                    animCollapse: true,
                    collapsed: false,
                    collapsible: true,
                    hideCollapseTool: true,
                    title: 'Right'
					*/
					html: '<div class="appFooter"><div class="one"><p>Copyright © 2015 Bahwan CyberTek. All Rights Reserved.</p></div><div class="three"><p>Best viewed in 1280 x 800 resolution and above</p></div><div class="two"><p>Powered by Cuecent</p></div></div>',
					//titleAlign: "center",
					
                    split: false,
					border:0,
                    height: 0,					
					//cls:'footer-panel'
					}
				);
		
		this.callParent(arguments);
	},
	display:function()
	{
		this.setHeight(28);
	}
});
	
	
