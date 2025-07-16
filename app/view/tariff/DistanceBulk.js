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
Ext.define('CueTrans.view.tariff.DistanceBulk', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Distance Master - Bulk";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= 
		[
			{
                "name": "Fetch Google Data",
                "tooltip": "Click here to save the Distance Master Bulk."
            },
			{
                "name": "Save",
                "tooltip": "Click here to save the Distance Master Bulk."
            }			
        ]	
				
		var TruckGridFieldObj=								//69997
		[
			{columnname:"From Location",dataname:"FROM_LOC",datatype:"string",editControl:"textbox",width:150,helpid:'fromLocationCodeHelpId',"onenter":"FROM_LOC_ONENTER","onkeyup":"FROM_LOC_ONENTER"},
			{columnname:"From Latitude",dataname:"FROM_LATI",datatype:"string",width:90},
			{columnname:"From Longitude",dataname:"FROM_LONG",datatype:"string",width:95},
			{columnname:"To Location",dataname:"TO_LOC",datatype:"string",editControl:"textbox",width:150,helpid:'toLocationCodeHelpId',
			"onenter":"TO_LOC_ONENTER","onkeyup":"TO_LOC_ONENTER"},			
			{columnname:"To Latitude",dataname:"TO_LATI",datatype:"string",width:90},
			{columnname:"To Longitude",dataname:"TO_LONG",datatype:"string",width:90},
			{columnname:"Distance (km)",dataname:"DIST",datatype:"string",width:90,inputFormat:'numeric',editControl:"textbox"},
			{columnname:"Active",dataname:"ACTIVEYN",datatype:"string",storeId:"strStatus",width:100,editControl:"combo"},
			{columnname:"Click here to Fetch Google Data.",dataname:"FetGooData",width:70,linkId:"DistanceGeoUpdate",imageURL:"resources/images/grid/Distance/Grid_Update.png"}
		]
		truckGridDtl=
		{
			title:"",
			id:"distanceBulk",
			columnWidth:0.5,
			detail:TruckGridFieldObj,
			visibleRow:10
		}
		var TruckGridSection = plf.addGrid(truckGridDtl,this)	//69997
		
		
		mainpage.ptrMainSection.add(TruckGridSection) 
		
		//History Data Section
		//mainpage.dataHistorySectionFlag=true;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TARCoreTariffServiceTS",
				"methodName":"initDistSrchTSBulk"
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["distanceBulk"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"createDistanceBulkTS"
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Fetch Google Data",
				"input":["distanceBulk"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"FetchGoogleDataBulkTS"
			},
			{
				"grideventid":"FROM_LOC_ONENTER",
				"tasktype":"gridonenter",
				"input":["FROM_LOC"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchFromLocTS_bulk"
			},
			{
				"grideventid":"TO_LOC_ONENTER",
				"tasktype":"gridonenter",
				"input":["TO_LOC"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchToLocTS_bulk"
			},
			{
				"tasktype":"proto",
				"filename":"jm_master/DistanceBulk.json"
			}
		];
		//Event Handlers Mapping Ends
		
		mainpage.hlpLinks=
		{
			"fromLocationCodeHelpId":
			{
				"hlpType":"grid",
				"gridID":"distanceBulk",
				"hlpScreen":"jm_master.LocationHelp",
				"send":[
						{"parent":"","child":""},
						{"direct":"LOCATION_AC","child":"strContext"}
					   ],
				"receive":[
					{"parent":"FROM_LOC","child":"LOC_CODE"},
					{"parent":"FROM_LATI","child":"GEOLATTITUDE"},
					{"parent":"FROM_LONG","child":"GEOLONGITUDE"}
				]
			},
			"toLocationCodeHelpId":
			{
				"hlpType":"grid",
				"gridID":"distanceBulk",
				"hlpScreen":"jm_master.LocationHelp",
				"send":[
						{"parent":"","child":""},
						{"direct":"LOCATION_AC","child":"strContext"}						
					   ],
				"receive":[
					{"parent":"TO_LOC","child":"LOC_CODE"},
					{"parent":"TO_LATI","child":"GEOLATTITUDE"},
					{"parent":"TO_LONG","child":"GEOLONGITUDE"}
				]
			}
		}
		this.callParent(arguments);
	}
});