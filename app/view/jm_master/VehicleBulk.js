Ext.define('CueTrans.view.jm_master.VehicleBulk', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Vehicle Master - Bulk";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Save",
                "tooltip": "Click here to save the Vehicle Master."
            }
        ]	
		
			
		TruckGridFieldObj=
		[
			{columnname:"From Location",dataname:"FROM_LOC",datatype:"string",editControl:"textbox",width:150,helpid:'fromLocationCodeHelpId'},
			{columnname:"To Location",dataname:"TO_LOC",datatype:"string",editControl:"textbox",width:150,helpid:'toLocationCodeHelpId'},
			{columnname:"Distance (km)",dataname:"DIST",datatype:"string",width:90,inputFormat:'numeric',editControl:"textbox"},
			{columnname:"Active",dataname:"ACTIVEYN",datatype:"string",storeId:"strStatusActive",width:100,editControl:"combo"}
		]
		truckGridDtl=
		{
			title:"Location Details",
			id:"actDetail",
			columnWidth:0.5,
			detail:TruckGridFieldObj,
			visibleRow:10
		}
		TruckGridSection = plf.addGrid(truckGridDtl,this)	
		
		
		mainpage.ptrMainSection.add(TruckGridSection) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreTruckService",
				"methodName":"initTruckMstScrTS"
			},
			/*{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["actDetail"],
				"service":"CoreTruckService",
				"methodName":"maintainNumberingSeriesScrTS"
			},*/
			{
				"tasktype":"proto",
				"filename":"jm_master/VehicleBulk.json"
			}
		];
		//Event Handlers Mapping Ends
		
		mainpage.hlpLinks=
		{
				"fromLocationCodeHelpId":
				{
					"hlpType":"grid",
					"gridID":"actDetail",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
						    {"parent":"","child":""},
							{"direct":"LOCATION_AC","child":"strContext"}
						   ],
					"receive":[
						{"parent":"FROM_LOC","child":"FROM_LOC"}
					]
				},
				"toLocationCodeHelpId":
				{
					"hlpType":"grid",
					"gridID":"actDetail",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
						    {"parent":"","child":""},
							{"direct":"LOCATION_AC","child":"strContext"}
						   ],
					"receive":[
						{"parent":"TO_LOC","child":"TO_LOC"}
					]
				}
		}
		this.callParent(arguments);
	}
});