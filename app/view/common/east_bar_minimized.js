/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.common.east_bar_minimized', 
{
    extend: 'Ext.panel.Panel',
    alias: 'widget.eastpanel',
	bodyBorder:false,
	initComponent: function()
	{
	
		Ext.apply(this, 
					{
                    width: 0,
					border:0,
					height:0,
					cls:'eastpanel-icons',
					layout:
					{
						type:'vbox',
						align: 'center'
					},
					bodyCls:'sidebaricons',
					//title:"<img src='resources/images/eastbar/menu.png' style:'title_icon'>",
					items:
						[
							/*
							this.addmenuitems('menu.png','','menu_min'),
							this.addmenuitems('vehicle.png','Truck Master','jm_master.trucklist'),
							this.addmenuitems('driver.png','Driver	','jm_master.driversearch'),
							this.addmenuitems('violation.png','Violation','jm_master.violationsearch'),
							this.addmenuitems('location.png','Location','jm_master.locationlist'),
							this.addmenuitems('route.png','Route','jm_master.routelist'),
							this.addmenuitems('vendor.png','Vendor','jm_master.vendorsearch'),
							this.addmenuitems('contract.png','Contract','jm_master.contractlisting'),
							this.addmenuitems('checklist.png','Checklist','checklist.checklistsearch'),
							this.addmenuitems('type.png','Type Master','jm_master.typelist'),
							this.addmenuitems('journeyplan.png','Journey Plan','journey_management.journeyplan')
							*/
							this.addmenuitems('menu.png','','menu_min'),
							this.addmenuitems('vehicle.png','Truck Master','jm_master.trucklist'),
							this.addmenuitems('driver.png','Driver','jm_master.driversearch'),
							this.addmenuitems('violation.png','Violation','jm_master.violationsearch'),
							this.addmenuitems('location.png','Location','jm_master.locationlist'),
							this.addmenuitems('route.png','Route','jm_master.routelist'),
							this.addmenuitems('contract.png','Vendor Contract','jm_master.contractlisting'),
							this.addmenuitems('checklist.png','Checklist','checklist.checklistsearch'),
							this.addmenuitems('type.png','Type Master','jm_master.typelist'),
							this.addmenuitems('vendor.png','Vendor','jm_master.vendorsearch'),
							this.addmenuitems('vehicle.png','Truck Request','journey_management.truckrequestsearch'),
							this.addmenuitems('journeyplan.png','Journey Plan','journey_management.journeyplan'),
							this.addmenuitems('journeyplan.png','Load Inspection','journey_management.loadinspection'),
							this.addmenuitems('journeyplan.png','Journey Re-Plan','journey_management.journeyreplan'),
							this.addmenuitems('journeyplan.png','Journey Re-Create','journey_management.journeyplanrecreate'),
							//this.addmenuitems('journeyplan.png','Journey Plan Asset','journey_management.journeyplanasset'),
							this.addmenuitems('journeyplan.png','Close Journey Plan', 'journey_management.closejourneyplan')							
						],
						defaults:
						{
							padding:2,
							border:2,
							componentCls:'sidebaricons',
							//height: 32, // Specifying height/width ensures correct layout
							//width: 32,
							listeners: {
									render: function(objctrl) {
										objctrl.getEl().on('click',
											function(eventobj){tbar_screenlaunch(eventobj,objctrl.getItemId())}, objctrl);
																}
										}
						}
					}
				);
		
		this.callParent(arguments);
	},
	addmenuitems: function(imgname,menutext,menuid)
	{
			
			var obj1 = 
				{
							
							
							xtype: 'image',							
							itemId:menuid,
							autoEl: {
										tag:'img',
										src: 'resources/images/eastbar/'+imgname,
										'data-qtip': menutext
									}							
							
				};
			
			/*
		var obj1 = Ext.create('Ext.Img', {
							src:'resources/images/eastbar/'+imgname,
							id:menuid
							});
			*/
			/*
		 Ext.create('Ext.tip.ToolTip', {
				target: obj1.getEl(),
				html: menutext
			});	
				*/		
		/*
		// Manually register a quick tip for a specific element
		Ext.tip.QuickTipManager.register({
			target: menuid,
			title: 'My Tooltip',
			text: menutext,
			width: 100,
			dismissDelay: 10000 // Hide after 10 seconds hover
		});
		*/
		return obj1;
	}
	
});
	
	
