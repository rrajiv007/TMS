Ext.define("CueTrans.lib.control.Date",{
	extend:"Ext.panel.Panel",
	initComponent: function()
	{
		var summCont1=Ext.create("Ext.container.Container",{			
					
			items:
			[
				{					
					baseCls:'c-svgsearch1',
					html:"<html><object id='" + this.svgID + "_obj'  name='"+ this.svgID +"_obj' type='image/svg+xml' data='" + this.svgFileName +  "' /></html>",					
				}
			]
		})
		
		this.callParent(arguments);		
		this.add(summCont1)
	} 	
})