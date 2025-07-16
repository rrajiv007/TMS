/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	                           Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.TruckRouteSpeedMapping', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Truck Route Speed Mapping";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		mainpage.toolbarActions= [{
                "name": "Save",
                "tooltip": "Click here to save."
            }
            ]
		
		//Add Keyfields
		mainpage.keyFields=["strRouteId"]
		
		//Route Header Section starts

		var formCtrl=[];
		plf.columns=4
		var RouteHdrFieldset1 = plf.addFieldSet({title:""});			//69995
		
		
		/*RouteFormCtrl=
		[
			//plf.addBlank(),
			//plf.addBlank(),
			//plf.addBlank(),
			plf.addHlpText({"label":"Route Code",id:"strRouteId","mandatory":"true",hlpLinkID:"routecode"},this),	
			//plf.addText({"label":"Route Code",id:"strRouteId","mandatory":"true"}),
			plf.addCombo({"label":"Origin",id:"strOrigin","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Distance",id:"iTotalDistance"}),	
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Route Description",id:"strRouteDesc"}),					
			plf.addCombo({"label":"Destination",id:"strDestination"}),							
			plf.addCombo({"label":"UOM",id:"strDistanceUom"})
			
		
		]*/
		
		//RouteHdrFieldset1.add(RouteFormCtrl);
		//Route Header Section Ends
		
		
		//Route Grid Section Begins
		var RouteGridFieldObj=									//69995
		[
			{columnname:"Truck Category",dataname:"TRUCK_CATEGORY",datatype:"string",storeId:"strTruckCategory",editControl:"combo",width:200},
			{columnname:"Route Leg Category",dataname:"ROUTE_LEG",datatype:"string",storeId:"strRouteLeg",editControl:"combo",width:200},
			{columnname:"Speed",dataname:"SPEED",inputFormat:"numeric",editControl:"textbox",width:200},
			{columnname:"UOM",dataname:"UOM",datatype:"string",storeId:"strDistanceUom",editControl:"combo",width:200}
			
		]
		var RouteGridDtl=										//69995
		{
			title:"",
			id:"mappingrouteDtl",
			detail:RouteGridFieldObj,
			visibleRow:15
		}
		//Route Grid Section Ends
		
		//Add Child Sections
		var tmp_gridsection1 = plf.addGrid(RouteGridDtl)			//69995
		//RouteHdrFieldset1.add(plf.addStripLine({}));
		//mainpage.ptrMainSection.add(RouteHdrFieldset1)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(tmp_gridsection1) //Add Grid Section to Main Page
		
		//History Data Section
	//	mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
				mainpage.eventHandlers = 
			[
				{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreRouteService",
					"methodName":"initTruckRouteSpeedMappingScrTS"
				},
				{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Save",
				     "input":["mappingrouteDtl"],
					"service":"CoreRouteService",
					"methodName":"MaintainTruckRouteSpeedScrTS"
				},
				{
					"tasktype":"proto",
					"filename":"jm_master/TruckRouteSpeedMapping.json"
				}
				/*		
				{
					"controlid":"strRouteId",
					"tasktype":"onenter",
					"input":["strRouteId"],
					"service":"CoreRouteService",
					"methodName":"fetchRouteTS"
				},	
				{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"create",
				     "input":["strRouteId","strRouteDesc","strOrigin","strDestination","strDistanceUom","routeDtlCache_array","routeDtlCache", "iTotalDistance","strConstraintCode"],
					"service":"CoreRouteService",
					"methodName":"createRouteTS"
				},			
				{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"edit",
					"input":["strRouteId","strRouteDesc","strOrigin","strDestination","strDistanceUom",	"routeDtlCache_array","routeDtlCache","iTotalDistance"],
					"service":"CoreRouteService",
					"methodName":"modifyRouteTS"
				},	
				{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"delete",
					"input":["strRouteId","routeDtlCache_array"],
					"service":"CoreRouteService",
					"methodName":"deleteRouteTS"
				},		
				{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"activate",
					"input":["strRouteId","strRouteDesc","strOrigin","strDestination","strDistanceUom",	"routeDtlCache_array","routeDtlCache","iTotalDistance"],
					"service":"CoreRouteService",
					"methodName":"activateRouteTS"
				},		
				{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"inactivate",
					"input":["strRouteId"],
					"service":"CoreRouteService",
					"methodName":"inactivateRouteTS"
				}	*/
				
						
				
			];
			
			/*mainpage.hlpLinks=
		{
			"routecode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.RouteHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRouteId","child":"ROUTE_CODE"}
							]
				}
				
				}*/
			
			//Event Handlers Mapping Ends
			/*mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":[]
			},
			"locked":
			{
				"enableAll":false,
				"except":["strRouteId"]
			},
			"active":
			{
				"enableAll":false,
				"except":["routeDtlCache"]
			}			
		}*/
			
			//Generate Screen Section
	/*	mainpage.generateScreen();
		
		
		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
		
	}
});
