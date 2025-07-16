/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var  		                                   
************************************************************************************************/
Ext.define('CueTrans.view.tariff.DistanceMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Distance Master";
		
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
			    plf.addHlpText({"label":"Distance Code",id:"strDistCode",hlpLinkID:"disthelp"},this),	
				plf.addText({"label":"Description",id:"strDistDesc"}),
				plf.addBlank(),
				plf.addText({"label":"Status",id:"strStatus"})
				
			]
		}
		
		else
		{
			DistHdrCtrl=
			[	
			    plf.addHlpText({"label":"Distance Code",id:"strDistCode","mandatory":"true",hlpLinkID:"disthelp"},this),	
				plf.addText({"label":"Description",id:"strDistDesc","mandatory":"true"}),
				plf.addText({"label":"Status",id:"strStatus"})
			]
		}	
		
		DistHdrColumn.add(DistHdrCtrl)
		
		plf.columns=4
		
		var distFromLocCol = plf.addColumnSection({title:""});//69997
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
		var DistFromHdrCtrl=									//69997
			[	
			    plf.addHlpText({"label":"From Location Code",id:"strFromLoc","mandatory":"true",hlpLinkID:"fromlochelp"},this),	
				plf.addDisplayOnly({"label":"Location Name",id:"strFrmLocName"}),
				plf.addDisplayOnly({"label":"Location Type",id:"strFromLocType"}),
				plf.addDisplayOnly({"label":"Address",id:"strFromLocAdd"}),
				
				plf.addDisplayOnly({"label":"Country",id:"strFrmCountry"}),
				plf.addDisplayOnly({"label":"State",id:"strFrmState"}),
				plf.addDisplayOnly({"label":"City",id:"strFrmCity"}),
				plf.addDisplayOnly({"label":"ZipCode",id:"strFrmZip"}),
				
				plf.addDisplayOnly({"label":"Latitude",id:"strFrmLat"}),
				plf.addDisplayOnly({"label":"Longitude",id:"strFrmLong"}),
				plf.addBlank(),
				plf.addBlank()
				
			]
		}
		
		else
		{
			DistFromHdrCtrl=
			[	
				plf.addHlpText({"label":"From Location Code",id:"strFromLoc","mandatory":"true",hlpLinkID:"fromlochelp"},this),
				plf.addDisplayOnly({"label":"Location Name",id:"strFrmLocName"}),
				plf.addDisplayOnly({"label":"Location Type",id:"strFromLocType"}),
				
				plf.addDisplayOnly({"label":"Address",id:"strFromLocAdd"}),
				plf.addDisplayOnly({"label":"Country",id:"strFrmCountry"}),
				plf.addDisplayOnly({"label":"State",id:"strFrmState"}),
				
				plf.addDisplayOnly({"label":"City",id:"strFrmCity"}),
				plf.addDisplayOnly({"label":"ZipCode",id:"strFrmZip"}),
				plf.addDisplayOnly({"label":"Latitude",id:"strFrmLat"}),
				
				plf.addDisplayOnly({"label":"Longitude",id:"strFrmLong"}),
				plf.addBlank(),
				plf.addBlank()
			]
		}	
		
		

		distFromLocCol.add(DistFromHdrCtrl)
		var distToLocCol = plf.addColumnSection({title:""});//69997
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var DistToHdrCtr=													//69997
			[	
			    plf.addHlpText({"label":"To Location Code",id:"strToLoc","mandatory":"true",hlpLinkID:"tolochelp"},this),
				plf.addDisplayOnly({"label":"Location Name",id:"strToLocName"}),
				plf.addDisplayOnly({"label":"Location Type",id:"strToLocType"}),
				plf.addDisplayOnly({"label":"Address",id:"strToLocAdd"}),
				
				plf.addDisplayOnly({"label":"Country",id:"strToCountry"}),
				plf.addDisplayOnly({"label":"State",id:"strToState"}),
				plf.addDisplayOnly({"label":"City",id:"strToCity"}),
				plf.addDisplayOnly({"label":"ZipCode",id:"strToZip"}),
				
				plf.addDisplayOnly({"label":"Latitude",id:"strToLat"}),
				plf.addDisplayOnly({"label":"Longitude",id:"strToLong"}),
				plf.addBlank(),
				plf.addBlank()
				
			]
		}
		
		else
		{
			DistToHdrCtr			
		     [	
				plf.addHlpText({"label":"To Location Code",id:"strToLoc","mandatory":"true",hlpLinkID:"tolochelp"},this),	
				plf.addDisplayOnly({"label":"Location Name",id:"strToLocName"}),
				plf.addDisplayOnly({"label":"Location Type",id:"strToLocType"}),
				
				plf.addDisplayOnly({"label":"Address",id:"strToLocAdd"}),
				plf.addDisplayOnly({"label":"Country",id:"strToCountry"}),
				plf.addDisplayOnly({"label":"State",id:"strToState"}),
				
				plf.addDisplayOnly({"label":"City",id:"strToCity"}),
				plf.addDisplayOnly({"label":"ZipCode",id:"strToZip"}),
				plf.addDisplayOnly({"label":"Latitude",id:"strToLat"}),
				
				plf.addDisplayOnly({"label":"Longitude",id:"strToLong"}),
				plf.addBlank(),
				plf.addBlank()
			]
		}	
		
	    distToLocCol.add(DistToHdrCtr)
		
		
		plf.columns=4
		DistTimeHdrColumn = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			DistTimeHdrCtrl=
			[	
			    plf.addText({"label":"Distance(km)",id:"strDistance","mandatory":"true",inputFormat:"numeric",width:110}),	
				//plf.addText({"label":"Transit Time(hh:mm)",id:"strTime","mandatory":"true",inputFormat:"string",width:110}),
				plf.addButton({"label":"Fetch Google Data",id:"fetchGooglBtn"}),
				plf.addBlank()
			]
		}
		
		else
		{
			DistTimeHdrCtrl=
			[	
			    plf.addText({"label":"Distance(km)",id:"strDistance","mandatory":"true",inputFormat:"numeric",width:110}),	
				//plf.addText({"label":"Transit Time(hh:mm)",id:"strTime","mandatory":"true",inputFormat:"numeric",width:110}),
				plf.addButton({"label":"Fetch Google Data",id:"fetchGooglBtn"})
				
			]
		}	
		
		DistTimeHdrColumn.add(DistTimeHdrCtrl)
		
		mainpage.ptrMainSection.add(DistHdrColumn) 
		mainpage.ptrMainSection.add(distFromLocCol) 
		mainpage.ptrMainSection.add(distToLocCol) 
		mainpage.ptrMainSection.add(DistTimeHdrCtrl)
		
		
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
					"hlpScreen":"tariff.DistanceHelp",
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
