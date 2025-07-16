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
Ext.define('CueTrans.view.jm_master.RouteMapping', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "RouteAttributeMapping";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Save",
                "tooltip": "Click here to save."
            }
            ]
		//Add Keyfields
		mainpage.keyFields=["strRouteCode"]
		//Driver Master Section Begins
		
		plf.columns=3
		var routeAttrMstrColumn =  plf.addColumnSection({});			//69995
		//Contract Header Section Begins
		var routeMstrCtrl=					//69995
		[	
			plf.addHlpText({"label":"Route Code",id:"strRouteCode","mandatory":"true",hlpLinkID:"route"},this),
			plf.addDisplayOnly({"label":"Route Description","id":"strRouteDesc"}),
			plf.addCombo({"label":"Truck Type",id:"strTruckType"}),
			plf.addCombo({"label":"Speed UOM",id:"iDistanceUom"})
		]
		
		routeAttrMstrColumn.add(routeMstrCtrl);
		//Contract Header Section Ends
		plf.columns=2
	   var routeDefaultMstrColumn = plf.addColumnSection({});			//69995
       var routeDefaultCtrl=											//69995
		[	
			plf.addHlpText({"label":"Constraint","id":"strConstraint",hlpLinkID:"contraint"},this),
			plf.addText({"label":"Speed","id":"iSpeed"}),
			plf.addButton({"label":"Default","id":"btnDetails"})
		]
		
		routeDefaultMstrColumn.add(routeDefaultCtrl);
		//Contract Search Grid Section Starts
		var routeGridFieldObj=				//69995
		[
            {columnname:"Route Code",dataname:"ROUTE_CODE",datatype:"string",width:200,hidden:true},		
			{columnname:"Route Leg",dataname:"ROUTE_LEG",datatype:"string",width:200},
			{columnname:"Distance",dataname:"DISTANCE",datatype:"string",width:150},
			{columnname:"Constraint",dataname:"CONSTRAINT_CODE",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Speed",dataname:"SPEED",datatype:"string",editControl:"textbox",width:150}
			
		]
		var routeAttrGridDtl=				//69995
		{
			title:"Route Attribute Details",
			id:"routeAttributeDtl",
			detail:routeGridFieldObj,
			removeAddDelete:true
		}
		var routeGridSection = plf.addGrid(routeAttrGridDtl,this)			//69995
		//Contract Search Grid Section Ends
		//Add Child Sections
		
		mainpage.ptrMainSection.add(routeAttrMstrColumn) //Add Header Section to Main Page
		mainpage.ptrMainSection.add(routeDefaultMstrColumn)
		mainpage.ptrMainSection.add(routeGridSection)  //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreRouteAttributeService",
				"methodName":"initRouteAttributeMappingScrTS"
			},
            {
				"controlid":"strRouteCode",
				"tasktype":"onenter",
				"input":["strRouteCode","strTruckType"],
				"service":"CoreRouteAttributeService",
				"methodName":"fetchRouteTS"
			},
			{
				"controlid":"btnDetails",
				"tasktype":"btnclick",
				"input":["strRouteCode","strConstraint","iSpeed","strTruckType"],
				"service":"CoreRouteAttributeService",
				"methodName":"defaultRouteAttributeMappingTS"
			},
			{
			
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Save",
				"input":["strRouteCode","routeAttributeDtl","strTruckType","iDistanceUom"],
				"service":"CoreRouteAttributeService",
				"methodName":"maintainRouteAttributeMappingTS"
			}
			
						
			/*{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreContractService",
				"methodName":"fetchAllContractsTS"
			},	
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strContractFrom"],
				"service":"CoreContractService",
				"methodName":"fetchAllContractsTS"
			},					
			/*{
				"tasktype":"proto",
				"filename":"jm_master/DriverMaster.json"
			}*/	
		];
		//Event Handlers Mapping Ends
		mainpage.hlpLinks=
		{
		"route":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.RouteHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRouteCode","child":"ROUTE_CODE"}
							]
				},
				"contraint":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.ConstraintHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strConstraint","child":"CONSTRAINT_CODE"}
							]
				}
		}
			
		//Generate Screen Section
		
		this.callParent(arguments);
		
	}
});
