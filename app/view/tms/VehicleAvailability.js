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
Ext.define('CueTrans.view.tms.VehicleAvailability', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Vehicle Availability";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Load Building","linkid":"tms_loadBuilding"}
		]
		
		//Add Keyfields
		mainpage.keyFields=[]
		//Cost Center Master Section Begins
		plf.columns=3
		var VehDemandMstrColumn = plf.addColumnSection({columnWidth:.75});
		
		var VehDemandMasterCtrl=
		[	
			plf.addDisplayOnly({"label":"Request Date",id:"dtRequestDate"}),
			plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
			plf.addDisplayOnly({"label":"Priority",id:"strPriority"}),
			plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
			plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
			plf.addDisplayOnly({"label":"Total Weight(Tons)",id:"iTotalWeight"})
		]	
		VehDemandMstrColumn.add(VehDemandMasterCtrl);
		//Add Child Sections
		
		var VehDemandGridFieldObj=
		[   
			{columnname:"Carrier Name",dataname:"CARRIER_NAME",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",editControl:"textbox",width:200},
			{columnname:"Vehicle Capacity",dataname:"VEHICLE_CAPACITY",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Number Of Vehicles",dataname:"NO_OF_VEHICLES",datatype:"string",width:150,editControl:"textbox"}
		]
		VehDemandGridDtl=
		{
			title:"",
			id:"VehDemand",
			detail:VehDemandGridFieldObj,
			readOnly:true,
			removeAddDelete: true
		
		}
		var VehDemandGridSection = plf.addGrid(VehDemandGridDtl,this)	
		
		mainpage.ptrMainSection.add(VehDemandMstrColumn)  //Add Master Section to Main Page
		mainpage.ptrMainSection.add(VehDemandGridSection) // Add Grid to Main Page
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		/*mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strCostCenterCode"],
				"service":"",
				"methodName":""
			},	

			{
				"controlid":"",
				"tasktype":"onenter",
				"input":["strCostCenterCode"],
				"service":"",
				"methodName":""
			},	
			{
			
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"create",
				"input":["strCostCenterCode"],
				"service":"",
				"methodName":""
				},
			
			{
			   
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"edit",
				"input":["strCostCenterCode"],
				"service":"",
				"methodName":""
				},
			{
			    
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"delete",
				"input":["strCostCenterCode"],
				"service":"",
				"methodName":""
				},
			{
			    
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"activate",
				"input":["strCostCenterCode"],
				"service":"",
				"methodName":""
				},
			{
			 
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"inactivate",
				"input":["strCostCenterCode"],
				"service":"",
				"methodName":""
				}		
		];*/
		//Event Handlers Mapping Ends
		mainpage.screenLinks=
		{
			"tms_loadBuilding":
				{
					"dest":"tms.LoadBuilding",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
		}
		mainpage.hlpLinks=
		{
		"Cost":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCostCenterCode","child":"COST_CENTER_CODE"}
							]
				},
		}
		
				mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":[]
			},
			"locked":
			{
				"enableAll":false,
				"except":[""]
			},
			"active":
			{
				"enableAll":false,
				"except":[""]
			}	
		}
			
		//Generate Screen Section
		/*mainpage.generateScreen();
		
		
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