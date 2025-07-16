/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.common.ivms', 
{
    extend: 'Ext.panel.Panel',
	id: 'contentpanel_ivms',
	bodyCls: 'content_bg',
	layout:'fit',
	padding:0,
	border:false,
	defaults: 
				{
					autoScroll: true
				},
	
	autoWidth: false,
	autoHeight: false,
	
	items:
	[
		//Ext.create("Ext.ux.CueCent.GIS")										
		/*
		{
			xtype: 'gmappanel',
			height:500,
			center: {
				geoCodeAddr: 'DIC Building 4,Shaikh Zayed Road,Dubai'
			},
			markers: [{
				lat: 42.339641,
				lng: -71.094224,
				title: 'Boston Museum of Fine Arts'
				},
				{
					lat: 42.339419,
					lng: -71.09077,
					title: 'Northeastern University'
				}										
			],
		}
		*/
		{
			xtype:'component',
			width: plf.screenWidth*.95,
			height: window.screen.availHeight *.7,
			html:'<iframe src="http://172.16.0.143:7001/SampleWebApplication/fencing.html" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe>'
		}
	],
	defaults: 
	{
		autoScroll: true
	}
})
