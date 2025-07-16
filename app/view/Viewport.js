/*
CueTrans Viewport Panel.

KeyPoints:
Border layout is used for the layout.

KeyMethods:

*/

/*
Generic Model which is used to load all the  combos.
*/
Ext.define('combo_model', 
{
	extend: 'Ext.data.Model',
	fields: ["id","value"]
});

Ext.define('Ext.chart.theme.chartTheme1', {
	extend: 'Ext.chart.theme.Base',
	singleton: true,
	alias: 'chart.theme.chartTheme1',
	colors:['#4A96AD','#A8CD1B','#C63D0F','#CBE32D','#E9E581','#fff056','#F3FAB6','#67BCDB','#74AFAD','#D9853B','#A2AB58','#C1E1A6','#FF9009'],
	
	config: {
		//baseColor: '#0717bf'
		colors:['#4A96AD','#A8CD1B','#C63D0F','#CBE32D','#E9E581','#fff056','#F3FAB6','#67BCDB','#74AFAD','#D9853B','#A2AB58','#C1E1A6','#FF9009']
	}
});

Ext.define('Ext.chart.theme.chartTheme2', {
	extend: 'Ext.chart.theme.Base',
	singleton: true,
	alias: 'chart.theme.chartTheme2',
	config: {
		//baseColor: '#0717bf'
		colors:['#E9E581','#fff056','#F3FAB6','#67BCDB','#74AFAD','#D9853B','#A2AB58','#C1E1A6','#FF9009']
	}
});

Ext.define('Ext.chart.theme.chartTheme3', {
	extend: 'Ext.chart.theme.Base',
	singleton: true,
	alias: 'chart.theme.chartTheme3',
	//baseColor:'#4A96AD',
	axis: {
	  defaults: {
		style: {strokeStyle: 'black'}
	  },
	  left: {
		title: {fillStyle: 'black'}
	  }
	},	
	chart: {
	  defaults: {
		background: 'white'
	  },
	  polar: {
		background: 'white'
	  }
	},
	gradients:{
	  type: 'linear',
	  degrees: 90
	},
	series: {
	  defaults: {
		style: {
		  lineWidth: 2
		}
	  }
	},
	sprites: {
	  text: {
		fontWeight: 100
	  }
	},
	//colors:['#C63D0F','#CBE32D','#E9E581','#fff056','#F3FAB6','#67BCDB','#74AFAD','#D9853B','#A2AB58','#C1E1A6','#FF9009','#67BCDB','#A8CD1B']
	colors:['#49BB93','#FF2A00', '#0D6F96', '#F18A20']
});

Ext.define('Ext.chart.theme.chartTheme4', {
	extend: 'Ext.chart.theme.Base',
	singleton: true,
	alias: 'chart.theme.chartTheme4',
	//baseColor:'#4A96AD',
	axis: {
	  defaults: {
		style: {strokeStyle: 'black'}
	  },
	  left: {
		title: {fillStyle: 'black'}
	  }
	},	
	chart: {
	  defaults: {
		background: 'white'
	  },
	  polar: {
		background: 'white'
	  }
	},
	gradients:{
	  type: 'linear',
	  degrees: 90
	},
	series: {
	  defaults: {
		style: {
		  lineWidth: 2
		}
	  }
	},
	sprites: {
	  text: {
		fontWeight: 100
	  }
	},
	//colors:['#F3FAB6','#67BCDB','#74AFAD','#D9853B','#A2AB58','#C1E1A6','#FF9009','#67BCDB','#A8CD1B','#C63D0F','#CBE32D','#E9E581','#fff056']
	colors:['#FF2A00', '#0D6F96', '#F18A20', '#49BB93']
});

Ext.define('Ext.chart.theme.chartTheme5', {
	extend: 'Ext.chart.theme.Base',
	singleton: true,
	alias: 'chart.theme.chartTheme5',
	//baseColor:'#4A96AD',
	axis: {
	  defaults: {
		style: {strokeStyle: 'black'}
	  },
	  left: {
		title: {fillStyle: 'black'}
	  }
	},	
	chart: {
	  defaults: {
		background: 'white'
	  },
	  polar: {
		background: 'white'
	  }
	},
	gradients:{
	  type: 'linear',
	  degrees: 90
	},
	series: {
	  defaults: {
		style: {
		  lineWidth: 2
		}
	}
	},
	sprites: {
	  text: {
		fontWeight: 100
	  }
	},
	//colors:['#67BCDB','#74AFAD','#D9853B','#A2AB58','#C1E1A6','#FF9009','#67BCDB','#A8CD1B','#C63D0F','#CBE32D','#E9E581','#fff056','#F3FAB6']
	colors:['#F18A20', '#FF2A00','#49BB93', '#0D6F96']
});
	
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
		
		this.ptrLoginNorthPanel = Ext.create('CueTrans.view.common.LoginNorthPanel')
		this.add(this.ptrLoginNorthPanel);
		
		//this.ptrSouthPanel = Ext.create('CueTrans.view.common.SouthPanel')
		//this.add(this.ptrSouthPanel);
		//this.ptrSouthPanel = Ext.create('Ext.container.Container',{height:10,region:"south"})
		//this.add(this.ptrSouthPanel);

		this.ptrContentPanel = Ext.create('CueTrans.view.admin.login')
		//this.ptrContentPanel = Ext.create('CueTrans.view.common.Console')
		//this.ptrContentPanel = Ext.create('CueTrans.view.journey_management.JourneyPlan')
		//this.ptrContentPanel = Ext.create('CueTrans.view.journey_management.JourneyPlanSummary')
		//this.ptrContentPanel = Ext.create('CueTrans.view.view.tms.ShipmentSplit')
		
		
		
		this.add(this.ptrContentPanel);
		this.ptrLoginNorthPanel.display()
		Ext.Ajax.setTimeout(300000);
		Ext.EventManager.on(window, 'keydown', function(e, t) 
		{
		}); 
		
		
		window.onbeforeunload = function (evt) 
		{		 
		}


		/*
		Ext.EventManager.on(window, 'keydown', function(e, t) 
		{
			if (e.getKey() == e.BACKSPACE && (!/^input$/i.test(t.tagName) || t.disabled || t.readOnly)) {
				e.stopEvent();
			}
			});
			Ext.EventManager.addListener(Ext.getBody(), 'keydown', function(e){
			
			if(e.getTarget().type != 'text' && e.getKey() == '8' ){
				e.preventDefault();
			}
		}); 
		
		
		window.onbeforeunload = function (evt) 
		{		 
			  var message = 'Are you sure you want to leave?';		 
			  if (typeof evt == 'undefined') 
			  {
				evt = window.event;
			  }
			  if (evt) 
			  {
				evt.returnValue = message;
			  }
			  return message;
		}
		*/
		/*
		Ext.EventManager.on(window, 'keydown', function(e, t) 
		{
		console.log(plf.viewport.ptrNorthPanel.userNameContainer.data["USER_NAME"],"sss");
		if (e.getKey()==116)
		{	
			if (plf.viewport.ptrNorthPanel.userNameContainer.data["USER_NAME"] !="")
			{
				var txt;
				var r = confirm("Do you want to refresh?");
				if (r == true) 
				{					
					
				} else 
				{
					e.stopEvent();
				}
			}						
		}
		});
		*/
		//this.ptrSouthPanel.display()
		//this.ptrNorthPanel.display()
		//this.ptrEastPanel.display()
		//this.ptrWestPanel.display()
		
		
    }
});
