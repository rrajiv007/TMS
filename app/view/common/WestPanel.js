/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.common.WestPanel', 
{
    extend: 'Ext.panel.Panel',
    alias: 'widget.westpanel',
	region:"west",
	border:false,
	initComponent: function()
	{
	
		Ext.apply(this, 
					{
						id: 'westpanel_id',
						border:0,
						width: 0,
						split: false,
						autoScroll: false,
						title:"<img src=resources/images/eastbar/menu.png>",
						cls:'eastpanel-icons',
						layout:
						{
							type:'vbox',
							align: 'center'
						},
						bodyCls:'sidebaricons',
						componentCls:'sidebaricons',
						defaults:
						{
							padding:0,
							border:0,
							listeners: {
									render: function(objctrl) {
										objctrl.getEl().on('click',
											function(eventobj)
												{
													tbar_screenlaunch(eventobj,objctrl.getItemId())}, objctrl);
												}
										}
						}
					}
				);
				
		
		this.callParent(arguments);
		this.showMinimizedBar();
	},
	showMinimizedBar:function()
	{
		this.width=0;
		/*
		this.add(this.addmenuitems('menu.png','','menu_min'))
		
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
		this.addmenuitems('journeyplan.png','Close Journey Plan', 'journey_management.closejourneyplan')	
		*/
	},
	addmenuitems: function(imgname,menutext,menuid)
	{
			
			var obj1 = 
				{
							
							
							xtype: 'image',							
							itemId:menuid,
							imgCls:'toolBarImg',
							cls:'toolBarImg',
							baseCls:'toolBarImg',
							autoEl: {
										tag:'img',
										src: 'resources/images/Westbar/'+imgname,
										'data-qtip': menutext
									}							
							
				};
				
			/*
		var obj1 = Ext.create('Ext.Img', {
							src:'resources/images/Westbar/'+imgname,
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
		this.add(obj1);
		//return obj1;
	},
	display:function()
	{
		this.setWidth(50);
	}	
	
	
});
	
	

