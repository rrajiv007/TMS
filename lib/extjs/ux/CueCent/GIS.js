Ext.define("Ext.ux.CueCent.GIS",
{
	extend: 'Ext.panel.Panel',
	zoom:16,
	refresh:0,
	latitude:100,
	longitude:100,
	width:0,
	height:0,
	initComponent: function()
	{
		var mapOptions=
		{
			zoom:this.zoom,
			refresh:this.refresh,
			latitude:this.latitude,
			longitude:this.longitude
		};
		console.log(mapOptions)
		if(this.height==0)
		{
			this.height =window.screen.availHeight * (60/100)
		}
		if(this.width==0)
		{
			this.width =window.screen.availWidth
		}
		
		var mapContainer = Ext.create("Ext.container.Container",{height:this.height,width:this.width,id:"myMap"})
		this.callParent(arguments);
		
		mapContainer.on("afterrender",
					function()
					{
						var mapGIS=new CuecentGIS();
						console.log(document.getElementById('myMap'))
						//var m=map.CreateMap(document.getElementById('myMap'),options);									
						//var mapContent=mapGIS.CreateMap(mapContainer.getEl(),mapOptions);
						var mapContent=mapGIS.CreateMap(document.getElementById('myMap'),mapOptions);
						mapContent.renderEvent('newJob');
						mapContent.renderEvent('8718');
						mapContent.renderEvent('8718A');
						
					});
					
		this.add(mapContainer);
					
	}
}
)