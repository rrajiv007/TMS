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
Ext.define('CueTrans.view.tariff.ServiceMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Service Item Master";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		 mainpage.toolbarLinks=
		[
			{"name":"Charge Mapping.","linkid":"fin_lanechargemap","tooltip":"Click here to map the service to a charge."}
		]
		
		mainpage.toolbarActions= [
			{
                "name": "Create",
                "tooltip": "Click here to create a service."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a service."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a service."
            },
          		
            {
                "name": "Activate",
                "tooltip": "Click here to activate a service."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate a service."
            }
            ]


		plf.columns = 4
		var ServiceHdrColumn = plf.addColumnSection({});	//69997
		if(plf.defaultLayout==3)
		{
			plf.columns = 3
			
			var ServiceHdrCtrl=								//69997
			[	
			    plf.addHlpText({"label":"Service Item Code",id:"strServiceCode","mandatory":"true",hlpLinkID:"servicehelp"},this),	
				plf.addText({"label":"Service Item Description",id:"strServiceDesc","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				
				plf.addCombo({"label":"Service type",id:"strServiceType","mandatory":"true"}),
				plf.addBlank(),
				plf.addBlank(),
				
			]
		
		}
		
		else
		{
			ServiceHdrCtrl=
			[	
				plf.addHlpText({"label":"Service Item Code",id:"strServiceCode","mandatory":"true",hlpLinkID:"servicehelp"},this),	
				plf.addText({"label":"Service Item Description",id:"strServiceDesc","mandatory":"true"}),
				plf.addCombo({"label":"Service type",id:"strServiceType","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"})
				
			]
		}	
		
		ServiceHdrColumn.add(ServiceHdrCtrl)
		
		plf.columns = 4
		var ServiceItemParHdrColumn = plf.addColumnSection({title:"Service Item Parameters"});	//69997
		if(plf.defaultLayout==4)
		{
			plf.columns = 4
			
			var ServiceItemParHdrCtrl=													//69997
			[	
			    plf.addCombo({"label":"Vehicle Category",id:"strVehCat"}),	
				plf.addCombo({"label":"Commodity",id:"strCommodity"}),
				plf.addText({"label":"Weight Min",id:"iWghtFrom",inputFormat:"numeric"}),
				plf.addText({"label":"Weight Max",id:"iWghtTo",inputFormat:"numeric"}),
				
				plf.addText({"label":"Load Distance Min",id:"iLdDistFrom",inputFormat:"numeric"}),
				plf.addText({"label":"Load Distance Max",id:"iLdDistTo",inputFormat:"numeric"}),
				plf.addCombo({"label":"Priority",id:"strPriority"}),
				plf.addBlank()
	
			]
		
		}
		
		else
		{
			ServiceItemParHdrCtrl=
			[	
				plf.addCombo({"label":"Vehicle Category",id:"strVehCat"}),	
				plf.addCombo({"label":"Commodity",id:"strCommodity"}),
				plf.addBlank(),
				
				plf.addText({"label":"Weight Min",id:"iWghtFrom",inputFormat:"numeric"}),
				plf.addText({"label":"Weight Max",id:"iWghtTo",inputFormat:"numeric"}),
				plf.addBlank(),
				
				plf.addText({"label":"Load Distance Min",id:"iLdDistFrom",inputFormat:"numeric"}),
				plf.addText({"label":"Load Distance Max",id:"iLdDistTo",inputFormat:"numeric"}),
				plf.addCombo({"label":"Priority",id:"strPriority"})
				
			]
		}	
		
		
		ServiceItemParHdrColumn.add(ServiceItemParHdrCtrl)
		
		//Service section starts
		plf.columns=4
		
		//Lane Mapping Section starts
		
		var lanemapGridFieldObj=												//69997
		[   
			{columnname:"Lane Code",dataname:"LANE_CODE",datatype:"string",editControl:"textbox",width:140,helpid:'lanehelp',"onenter":"LANE_ONENTER"},
			{columnname:"Lane Description",dataname:"LANE_DESC",datatype:"string",width:250},
			{columnname:"Region From",dataname:"REGION_FROM",datatype:"string",width:250},
			{columnname:"Region To",dataname:"REGION_TO",datatype:"string",width:250},
		]
		lanemapGridDtl=
		{
			title:"Lane Mapping",
			id:"laneMapGrid",
			detail:lanemapGridFieldObj,
			visibleRow:5
		
		}
		servicemapGridSection = plf.addGrid(lanemapGridDtl,this)
		
		
		plf.columns = 4
		var LaneComboHdrColumn = plf.addColumnSection({});	//69997
		if(plf.defaultLayout==4)
		{
			plf.columns = 4
			
			var LaneComboHdrCtrl=								//69997
			[	
			    plf.addCombo({"label":"Lane Code",id:"strLaneCode"})
				//plf.addButton({"label":"Fetch Lanes",id:"fetchLaneBtn"})
	
			]
		}
		else
		{
		   LaneComboHdrCtrl=
			[	
			    plf.addCombo({"label":"Lane Code",id:"strLaneCode"})
			//	plf.addButton({"label":"Fetch Lanes",id:"fetchLaneBtn"})
				
	
			]
		  
		}
		LaneComboHdrColumn.add(LaneComboHdrCtrl)
		//Charge Mapping Section starts
		
		var chargemapGridFieldObj=								//69997
		[   
			{columnname:"Charge Code",dataname:"CHARGE_CODE",datatype:"string",editControl:"textbox",width:140,helpid:'charge'},
			{columnname:"Charge Description",dataname:"CHARGE_DESC",datatype:"string",width:250},
			{columnname:"Price Basis",dataname:"PRICE_BASIS",datatype:"string",width:250},
			{columnname:"Nature of Charge",dataname:"NAT_OF_CHG",datatype:"string",width:250},
			{columnname:"Charge Type",dataname:"CHARGE_TYPE",datatype:"string",width:100},
			{columnname:"Charge Basis",dataname:"CHARGE_BASIS",datatype:"string",width:100}
		]
		chargemapGridDtl=
		{
			title:"Charge Mapping",
			id:"chargeMapGrid",
			detail:chargemapGridFieldObj,
			visibleRow:5
		
		}
		var chargemapGridSection = plf.addGrid(chargemapGridDtl,this) //69997
		
		mainpage.ptrMainSection.add(ServiceHdrColumn) 
		mainpage.ptrMainSection.add(ServiceItemParHdrColumn) 
		mainpage.ptrMainSection.add(servicemapGridSection)
	//	mainpage.ptrMainSection.add(LaneComboHdrColumn)
	//	mainpage.ptrMainSection.add(chargemapGridSection)
		mainpage.dataHistorySectionFlag=true;
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strServiceCode"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"initServiceMastTS"
		},
		
		{
				"controlid":"strServiceCode",
				"tasktype":"onenter",
				"input":["strServiceCode"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchServiceTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strServiceCode","strServiceDesc","strVehCat","strCommodity","iWghtFrom","iWghtTo","iLdDistFrom","iLdDistTo","laneMapGrid","chargeMapGrid","strServiceType","strPriority"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"createServiceTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strServiceCode","strServiceDesc","strVehCat","strCommodity","iWghtFrom","iWghtTo","iLdDistFrom","iLdDistTo","laneMapGrid","chargeMapGrid","strServiceType","strPriority"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"editServiceTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strServiceCode","strServiceDesc","strVehCat","strCommodity","iWghtFrom","iWghtTo","iLdDistFrom","iLdDistTo","laneMapGrid","chargeMapGrid","strServiceType","strPriority"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"deleteServiceTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Activate",
				"input":["strServiceCode","strServiceDesc","strVehCat","strCommodity","iWghtFrom","iWghtTo","iLdDistFrom","iLdDistTo","laneMapGrid","chargeMapGrid","strServiceType","strPriority"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"activateServiceTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Inactivate",
				"input":["strServiceCode","strServiceDesc","strVehCat","strCommodity","iWghtFrom","iWghtTo","iLdDistFrom","iLdDistTo","laneMapGrid","chargeMapGrid","strServiceType","strPriority"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"inactivateServiceTS"
		},
		{
				"grideventid":"LANE_ONENTER",
				"tasktype":"gridonenter",
				"input":["LANE_CODE"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchServLaneTS"
		},
		{
				"controlid":"fetchLaneBtn",
				"tasktype":"btnclick",
				"input":["strServiceCodeFrom","strServiceCodeTo","strCommodity","strStatus","strVehCat"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchAllServTS"
		}
		
		];
		
		
		mainpage.hlpLinks=
		{
		  "lanehelp":
				{
					"hlpType":"grid",
					"gridID":"laneMapGrid",
					"hlpScreen":"tariff.LaneHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					{"parent":"LANE_CODE","child":"LANE_CODE"},
					{"parent":"LANE_DESC","child":"LANE_DESC"},
                    {"parent":"REGION_FROM","child":"REGION_FROM"},
                    {"parent":"REGION_TO","child":"REGION_TO"}

						]
				},
		 "servicehelp":
				{
					"hlpType":"Header",
					"hlpScreen":"tariff.ServiceHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strServiceCode","child":"SERVICE_CODE"}
														]

						
				}
		}
		
		mainpage.screenLinks=
		{
			"fin_lanechargemap":
				{
					"dest":"tariff.LaneChargeMapping",
					"hdr":[
							{"src":"strServiceCode","dest":"strServiceCode"}							
							]					
				}
			
		}
	
		this.callParent(arguments);
		
	}
});
