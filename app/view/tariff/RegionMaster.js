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
Ext.define('CueTrans.view.tariff.RegionMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Region Master";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		
		mainpage.toolbarActions= [
			{
                "name": "Create",
                "tooltip": "Click here to create a region."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a region."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a region."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate a region."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate a region."
            }
            ]


		plf.columns=4
		var RegionHdrColumn = plf.addColumnSection({});//69997
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var RegionHdrCtrl1=							//69997
			[	
			    plf.addHlpText({"label":"Region Code",id:"strRegionCode","mandatory":"true",hlpLinkID:"regionhelp"},this),	
				plf.addText({"label":"Region Description",id:"strRegionDesc","mandatory":"true"}),
				plf.addCombo({"label":"Country",id:"strCountry","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addCombo({"label":"Region Type",id:"strRegionType","mandatory":"true"})
			]
		
		}
		
		else
		{
			RegionHdrCtrl1=
			[	
				plf.addHlpText({"label":"Region Code",id:"strRegionCode","mandatory":"true",hlpLinkID:"regionhelp"},this),	
				plf.addText({"label":"Region Description",id:"strRegionDesc","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				
				plf.addBlank({}),
				//plf.addBlank({}),
				plf.addCombo({"label":"Region Type",id:"strRegionType","mandatory":"true"}),
				plf.addCombo({"label":"Country",id:"strCountry","mandatory":"true"}),
				
			]
		}	
		
		RegionHdrColumn.add(RegionHdrCtrl1)
		
		
		//Geographicl section starts
		plf.columns=4
		
		var geographicalAreasCol = plf.addColumnSection({title:""});//69997
		
		var geographicalAreasGridFieldObj=							//69997
		[   
			{columnname:"State",dataname:"STATE",datatype:"string",width:90,editControl:"textbox",helpid:'state',"onenter":"STATE_ONENTER",id:"strGeoState"},
			{columnname:"City",dataname:"CITY",datatype:"string",width:250,editControl:"textbox",helpid:'city',"onenter":"CITY_ONENTER",id:"strGeoCity"},
			{columnname:"Zip Code",dataname:"ZIP_CODE",datatype:"string",width:140,id:"strGeoZip"}
		]
		geographicalAreasGridDtl=
		{
			title:"Geographical Areas",
			id:"geoAreas",
			detail:geographicalAreasGridFieldObj,
		
		}
		var geographicalAreasGridSection = plf.addGrid(geographicalAreasGridDtl,this)//69997
		
		//Exclusion Section starts
		/*plf.columns=4
		
		geographicalExcCol = plf.addColumnSection({title:""});
		
		geographicalExcGridFieldObj=
		[   
            {columnname:"State",dataname:"STATE",datatype:"string",width:90,editControl:"textbox",helpid:'excstate',"onenter":"STATE_ONENTER",id:"strExcState"}	,
			{columnname:"City",dataname:"CITY",datatype:"string",width:250,editControl:"textbox",helpid:'exccity',"onenter":"CITY_ONENTER",id:"strExcCity"},
			{columnname:"Zip Code",dataname:"ZIP_CODE",datatype:"string",width:140,id:"strExcZip"}
		]
		geographicalExcGridDtl=
		{
			title:"Exclusions",
			id:"excGrid",
			detail:geographicalExcGridFieldObj,
		
		}
		geographicalExcGridSection = plf.addGrid(geographicalExcGridDtl,this)
		*/
		
		
		
		mainpage.ptrMainSection.add(RegionHdrColumn) 
		//mainpage.ptrMainSection.add(geographicalAreasGridSection)/*geographical commented for finance*/
		//mainpage.ptrMainSection.add(geographicalExcGridSection)
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strRegionCode"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"initRegionMasterTS"
		},
		{
				"controlid":"strRegionCode",
				"tasktype":"onenter",
				"input":["strRegionCode"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchRegionTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strRegionCode","strRegionDesc","strStatus","strCountry","geoAreas","excGrid","strRegionType"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"createRegionTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strRegionCode","strRegionDesc","strStatus","strCountry","geoAreas","excGrid","strRegionType"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"editRegionTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strRegionCode","strRegionDesc","strStatus","strCountry","geoAreas","excGrid","strRegionType"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"deleteRegionTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Activate",
				"input":["strRegionCode","strRegionDesc","strStatus","strCountry","geoAreas","excGrid","strRegionType"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"activateRegionTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Inactivate",
				"input":["strRegionCode","strRegionDesc","strStatus","strCountry","geoAreas","excGrid","strRegionType"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"InactivateRegionTS"
		},
		{
				"grideventid":"STATE_ONENTER",
				"tasktype":"gridonenter",
				"input":["STATE"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchStateTS"
		},
		{
				"grideventid":"CITY_ONENTER",
				"tasktype":"gridonenter",
				"input":["CITY"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchCityTS"
		}
	
		];
		
		
			mainpage.hlpLinks=
		{
			"regionhelp":
				{
					"hlpType":"Header",
					"hlpScreen":"tariff.RegionHelp",
					"send":[
							//{"parent":"strRegionCode","child":"strRegionCodeFrom"},
							//{"parent":"strRegionCode","child":"strRegionCodeTo"}
						   ],
					"receive":[
							{"parent":"strRegionCode","child":"REGION_CODE"}
							]
				},
				 "state":
				{
					"hlpType":"grid",
					"gridID":"geoAreas",
					"hlpScreen":"tariff.GeoHelp",
					"send":[
							{"parent":"strCountry","child":"strCountry"}
						   ],
					"receive":[
							  //{"parent":"CITY","child":"CITY"},
							  {"parent":"STATE","child":"STATE"}
							  //{"parent":"ZIP_CODE","child":"ZIP_CODE"}
							]
				},
				/* "zipcode":
				{
					"hlpType":"grid",
					"gridID":"geoAreas",
					"hlpScreen":"tariff.GeoHelp",
					"send":[
							{"parent":"strCountry","child":"strCountry"}
						   ],
					"receive":[
							  {"parent":"CITY","child":"CITY"},
							  {"parent":"STATE","child":"STATE"},
							   {"parent":"ZIP_CODE","child":"ZIP_CODE"}
							]
				},*/
				 "excstate":
				{
					"hlpType":"grid",
					"gridID":"excGrid",
					"hlpScreen":"tariff.GeoHelp",
					"send":[
							{"parent":"strCountry","child":"strCountry"}
						   ],
					"receive":[
							  //{"parent":"CITY","child":"CITY"},
							  {"parent":"STATE","child":"STATE"}
							  //{"parent":"ZIP_CODE","child":"ZIP_CODE"}
							]
				},
				/* "exczipcode":
				{
					"hlpType":"grid",
					"gridID":"excGrid",
					"hlpScreen":"tariff.GeoHelp",
					"send":[
							{"parent":"strCountry","child":"strCountry"}
						   ],
					"receive":[
							  {"parent":"CITY","child":"CITY"},
							  {"parent":"STATE","child":"STATE"},
							    {"parent":"ZIP_CODE","child":"ZIP_CODE"}
							]
				},*/
				 "city":
				{
					"hlpType":"grid",
					"gridID":"geoAreas",
					"hlpScreen":"tariff.GeoHelp",
					"send":[
							{"parent":"strCountry","child":"strCountry"}
						   ],
					"receive":[
							  {"parent":"CITY","child":"CITY"},
							  {"parent":"STATE","child":"STATE"},
							  {"parent":"ZIP_CODE","child":"ZIP_CODE"}
							]
				},
				 "exccity":
				{
					"hlpType":"grid",
					"gridID":"excGrid",
					"hlpScreen":"tariff.GeoHelp",
					"send":[
							{"parent":"strCountry","child":"strCountry"}
						   ],
					"receive":[
							  {"parent":"CITY","child":"CITY"},
							  {"parent":"STATE","child":"STATE"},
							  {"parent":"ZIP_CODE","child":"ZIP_CODE"}
							]
				}
		}
		
		this.callParent(arguments);
		
	}
});