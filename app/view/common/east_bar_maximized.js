/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.common.east_bar_maximized', 
{
    extend: 'Ext.panel.Panel',
    alias: 'widget.eastpanel',
	
	initComponent: function()
	{
		Ext.apply(this, 
					{
                    width: 0,
					//padding:2,					
					border:0,
					layout:'vbox',
					autoScroll:true,
					bodyCls:'sidebaricons-expanded',
					items:
						[
							//this.addmenuitems('collapse-sidebar.png','','menu_max'),
							{
								layout:
								{
									type:'hbox'
								},
								width:'100%',
								bodyCls:'sidebaricons-expanded-title',
								itemId:'menu_max',
								items:
								[
									{
										border:'0px',
										xtype: 'image',
										height: 28, // Specifying height/width ensures correct layout
										width: 28,
										src: 'resources/images/layout/'+'minimized.png'
									}
								],
								listeners: {
									render: function(objctrl) {
											objctrl.getEl().on('click',
												function(eventobj){tbar_screenlaunch(eventobj,objctrl.getItemId())}, objctrl);
																	}
											}					
								
							},
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
							
							//this.addmenuitems('journeyplan.png','Journey Plan Resource','journey_management.journeyplanresourcedetail'),
							
							
							
							
						]
					}
				);
		
		this.callParent(arguments);
	},
	
	addmenuitems: function(imgname,menutext,menuid)
	{
			var obj1 = 
				{
					layout:
					{
						type:'hbox'
					},
					width:'100%',
					bodyCls:'sidebaricons-expanded',
					itemId:menuid,
					items:
					[
						{
							border:'0px',
							xtype: 'image',
							height: 28, // Specifying height/width ensures correct layout
							width: 28,
							src: 'resources/images/eastbar/'+imgname
						},
						{
						xtype:'label',
						text:menutext
						}
					],
					listeners: {
						render: function(objctrl) {
								objctrl.getEl().on('click',
									function(eventobj){tbar_screenlaunch(eventobj,objctrl.getItemId())}, objctrl);
														}
								}					
					
				};
		return obj1;
			
	}
});
	
	
