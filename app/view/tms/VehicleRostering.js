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
Ext.define('CueTrans.view.tms.VehicleRostering', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Vehicle Rostering";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Run Available <br>Vehicle Roster","Allocate","Schedule Inspection"]
		
		//Add Keyfields
		mainpage.keyFields=[""]
		//Driver Master Section Begins
		plf.columns=4
		var vehicleRosteringColumn = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var vehicleRosteringCtrl=
			[	
				plf.addDate({"label":"Date",id:"dtDate"}),
				plf.addText({"label":"Time",id:"tmTime"}),
				plf.addBlank(),
				plf.addBlank(),
				plf.addText({"label":"From Location",id:"strFromLocation"}),
				plf.addText({"label":"To Location",id:"strToLocation"}),
				plf.addBlank(),
				plf.addBlank(),
				plf.addButton({"label":"Fetch All",id:"fetchAllBtn"}),
				plf.addButton({"label":"Fetch UnAllocated",id:"unAllcatedBtn"}),
				plf.addButton({"label":"Fetch Request",id:"fetchReqBtn"})
				
			]
		
		}
		
		else
		{
			vehicleRosteringCtrl=
			[	
				plf.addDate({"label":"Date",id:"dtDate"}),
				plf.addText({"label":"Time",id:"tmTime"}),
				plf.addBlank(),
				plf.addBlank(),
				plf.addText({"label":"From Location",id:"strFromLocation"}),
				plf.addText({"label":"To Location",id:"strToLocation"}),
				plf.addBlank(),
				plf.addBlank(),
				plf.addButton({"label":"Fetch All",id:"fetchAllBtn"}),
				plf.addButton({"label":"Fetch UnAllocated",id:"unAllcatedBtn"}),
				plf.addButton({"label":"Fetch Request",id:"fetchReqBtn"})
			]
		}	
		
		var vehicleRosteringColumn.add(vehicleRosteringCtrl);
		
		var vehicleRosteringGridFieldObj=
		[   
			{columnname:"Document Type",dataname:"",datatype:"string",width:140},
			{columnname:"Document No",dataname:"",datatype:"string",width:250},
			{columnname:"Document Line No",dataname:"",datatype:"string",width:200},
			{columnname:"Vehicle Category",dataname:"",datatype:"string",width:200},
			{columnname:"Driver Code",dataname:"",datatype:"string",width:200,editControl:"textbox"},
			{columnname:"Vehicle Code",dataname:"",datatype:"string",width:150,editControl:"textbox"},
			{columnname:"Carrier",dataname:"",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Inspection Date & Time",dataname:"",datatype:"date",editControl:"textbox",width:150},
			{columnname:"Status",dataname:"",datatype:"string",editControl:"textbox",width:150}
			
		]
		vehicleRosteringGridDtl=
		{
			title:"",
			id:"vehicleRostMapping",
			detail:vehicleRosteringGridFieldObj,
		
		}
		var vehicleRosteringGridSection = plf.addGrid(vehicleRosteringGridDtl)	
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(vehicleRosteringColumn) //Add Header Section to Main Page
		//mainpage.ptrMainSection.add(PLFieldset)//Add 3PL Field set to Main Page
		mainpage.ptrMainSection.add(vehicleRosteringGridSection)  //Add Grid Section to Main Page

		
		//History Data Section
		//mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		/*mainpage.eventHandlers = 
		[
		{
				"controlid":"strCategoryName",
				"tasktype":"onload",
				"input":["strCategoryName"],
				"service":"CoreTypeMasterService",
				"methodName":"initTypeMasterScrMSTS"
				},
		{
				"controlid":"strCategoryName",
				"tasktype":"onchange",
				"input":["strCategoryName"],
				"service":"CoreTypeMasterService",
				"methodName":"changeTypeMasterScrTS"
				},
				{
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Maintain",
				"input":["strCategoryName","typeDtlCache"],
				"service":"CoreTypeMasterService",
				"methodName":"maintainTypeMasterScrTS"
				}
		
		/*	{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreRouteService",
				"methodName":"initRouteMasterScrTS"
			},		
			{
				"controlid":"strRouteId",
				"tasktype":"onenter",
				"input":["strRouteId"],
				"service":"CoreRouteService",
				"methodName":"fetchRouteTS"
			},	*/					
			/*{
				"tasktype":"proto",
				"filename":"jm_master/TypeMaster.json"
			}*/
		/*];
		
		//Event Handlers Mapping Ends
		
		//Generate Screen Section
		/*mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":["strCategoryName"]
			},
			"locked":
			{
				"enableAll":false,
				"except":["strCategoryName"]
			},
			"active":
			{
				"enableAll":false,
				"except":["strCategoryName"]
			}		
}		*/	
		//mainpage.generateScreen();
		
		
		/*Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
			
	}
});
