/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	Divya																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
		                                   
************************************************************************************************/
Ext.define('CueTrans.view.AdditionKMSetup.AddKMSetupMaster', 
{ 
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Additional KM Setup";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		
		mainpage.toolbarActions= [
			{
                "name": "Create",
                "tooltip": "Click here to create distance."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit distance."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete distance."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate distance."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate distance."
            }
            ]


		plf.columns=4
		var DistHdrColumn = plf.addColumnSection({});//69997
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var DistHdrCtrl=						//69997
			[	
			    plf.addHlpText({"label":"Code",id:"strDistCode",hlpLinkID:"disthelp","mandatory":"true"},this),	
				plf.addText({"label":"Description",id:"strDistDesc","mandatory":"true"}),
				plf.addText({"label":"Distance(km)",id:"strDistance","mandatory":"true",inputFormat:"numeric"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addCombo({"label":"Region code",id:"strToLoc","mandatory":"true"}),
				plf.addHlpText({"label":"Location Code",id:"strFromLoc","mandatory":"true",hlpLinkID:"fromlochelp"},this)
				//plf.addCombo({"label":"Location Code",id:"strFromLoc"}),
				
				
			]
		}
		
		else
		{
			DistHdrCtrl=
			[	
			   plf.addHlpText({"label":"Code",id:"strDistCode",hlpLinkID:"disthelp","mandatory":"true"},this),	
				plf.addText({"label":"Description",id:"strDistDesc","mandatory":"true"}),
				plf.addText({"label":"Distance(km)",id:"strDistance","mandatory":"true",inputFormat:"numeric"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addCombo({"label":"Region code",id:"strToLoc","mandatory":"true"}),
				plf.addHlpText({"label":"Location Code",id:"strFromLoc","mandatory":"true",hlpLinkID:"fromlochelp"},this)
				//plf.addCombo({"label":"Location Code",id:"strFromLoc"}),
				
			]
		}	
		
		DistHdrColumn.add(DistHdrCtrl)

		
		mainpage.ptrMainSection.add(DistHdrColumn) 
		//mainpage.ptrMainSection.add(distFromLocCol) 
		//mainpage.ptrMainSection.add(distToLocCol) 
		//mainpage.ptrMainSection.add(DistTimeHdrCtrl)
		
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strDistCode"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"initAddKMSetMastTs"
			},
			{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Create",
					"input":["strDistCode","strDistDesc","strStatus","strFromLoc","strToLoc","strDistance","strTime"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"createAddKMSetTS"
			},
			{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Edit",
					"input":["strDistCode","strDistDesc","strStatus","strFromLoc","strToLoc","strDistance","strTime"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"editAddKMSetTs"
			},
			{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Activate",
					"input":["strDistCode","strDistDesc","strStatus","strFromLoc","strToLoc","strDistance","strTime"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"activeAddKMSetTs"
			},
			{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Inactivate",
					"input":["strDistCode","strDistDesc","strStatus","strFromLoc","strToLoc","strDistance","strTime"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"inactiveAddKMSetTs"
			},
			{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Delete",
					"input":["strDistCode","strDistDesc","strStatus","strFromLoc","strToLoc","strDistance","strTime"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"deleteAddKMSetTs"
			},{
				"controlid":"strFromLoc",
				"tasktype":"onenter",
				"input":["strFromLoc"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchFromLocTS"
			},{
				"controlid":"strDistCode",
				"tasktype":"onenter",
				"input":["strDistCode"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchAddKMSetTs"
			}
		
		/*
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strDistCode"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"initDistMstTS"
			},
			{
				"controlid":"strDistCode",
				"tasktype":"onenter",
				"input":["strDistCode"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchDistDetTS"
			},
			{
				"controlid":"strToLoc",
				"tasktype":"onenter",
				"input":["strToLoc"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchToLocTS"
			},
			{
				"controlid":"strFromLoc",
				"tasktype":"onenter",
				"input":["strFromLoc"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchFromLocTS"
			},
			{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Create",
					"input":["strDistCode","strDistDesc","strStatus","strFromLoc","strToLoc","strDistance","strTime"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"createDistanceTS"
			},
			{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Edit",
					"input":["strDistCode","strDistDesc","strStatus","strFromLoc","strToLoc","strDistance","strTime"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"editDistanceTS"
			},
			{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Activate",
					"input":["strDistCode","strDistDesc","strStatus","strFromLoc","strToLoc","strDistance","strTime"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"activateDistanceTS"
			},
			{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Inactivate",
					"input":["strDistCode","strDistDesc","strStatus","strFromLoc","strToLoc","strDistance","strTime"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"InactivateDistanceTS"
			},
			{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Delete",
					"input":["strDistCode","strDistDesc","strStatus","strFromLoc","strToLoc","strDistance","strTime"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"deleteDistanceTS"
			}
	*/
	
		];
		
		
		mainpage.hlpLinks=
		{
			
			"fromlochelp":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"direct":"LOCATION_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strFromLoc","child":"LOC_CODE"}
							
							]
				},
				
				
			"tolochelp":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"direct":"LOCATION_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strToLoc","child":"LOC_CODE"},
							{"parent":"strToLocName","child":"LOC_NAME"},
							{"parent":"strToLocType","child":"LOC_TYPE"},
							{"parent":"strToLocAdd","child":"ADDRESS"},
							{"parent":"strToCountry","child":"COUNTRY"},
							{"parent":"strToState","child":"STATE"},
							{"parent":"strToCity","child":"CITY"},
							{"parent":"strToLat","child":"GEOLATTITUDE"},
							{"parent":"strToLong","child":"GEOLONGITUDE"},
							]
				},
				"disthelp":
				{
					"hlpType":"Header",
					"hlpScreen":"AdditionKMSetup.AddKMSetupHelp",
					"send":[
							
						   ],
					"receive":[
							{"parent":"strDistCode","child":"DIST_CODE"}
							]
				}
		}
		
		
		this.callParent(arguments);
		
	}
});
