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
Ext.define('CueTrans.view.GateEntry.GateEntryMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Vehicle Gate Entry";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		//mainpage.toolbarActions=["Create","Edit","Print"]
		mainpage.toolbarActions=["Create","Print"]
		mainpage.keyFields=["strGateEntryNo"]
		
		//InspectionMaster Header Section Begins
		plf.columns=3
		 var GateEntryMstrColumn = plf.addColumnSection({});			//69997 
		var GateEntryMstrCtrl=  										//69997 
		[   		
				plf.addCombo({"label":"Vehicle Source",id:"strVehicleSource"},this),
				plf.addText({"label":"Vehicle Reg No",id:"strVehicleRegNo","mandatory":"true",inputFormat:"string",InputLength:"60"}),
				plf.addCombo({"label":"Entry Type",id:"strEntryType","mandatory":"true"}),
				plf.addHlpText({"label":"Gate Entry No",id:"strGateEntryNo",hlpLinkID:"GateEntryNo"},this),			
				plf.addDate({"label":"Gate Entry Date",id:"dtGateEntryDate","mandatory":"true"}),
				plf.addText({"label":"Gate Entry Time",id:"strGateEntryTime","mandatory":"true"}),
				plf.addHlpText({"label":"Location Code",id:"strLocationCode","mandatory":"true",hlpLinkID:"Location"},this),
				plf.addText({"label":"Gate No",id:"strGateNo","mandatory":"true",inputFormat:"string",InputLength:"40"}),
				plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory","mandatory":"true"}),
				plf.addListEdit({"label":"Driver/Visitor Name",id:"strDriverName","mandatory":"true",keyField:"strDriverCode"},this),
				plf.addHlpText({"label":"Driver Code",id:"strDriverCode",hlpLinkID:"DiverCode"},this),	
				plf.addText({"label":"Driver/Visitor Mobile No",id:"strMobileNo","mandatory":"true",inputFormat:"string",InputLength:"60"}),
				plf.addHlpText({"label":"Journey Plan No",id:"strJourneyPlanNo",hlpLinkID:"JourneyPlan"},this),
				plf.addText({"label":"Item Carried",id:"strItemCarried",inputFormat:"string",InputLength:"100"}),
				plf.addText({"label":"Remarks",id:"strRemarks",inputFormat:"string",InputLength:"100"})						
		]
		GateEntryMstrColumn.add(GateEntryMstrCtrl);
					
		mainpage.ptrMainSection.add(GateEntryMstrColumn)//Add Header Section to Main Page		
		//Add Grid Section to Main Page
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		
		      
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strUserId"],
				"service":"CoreGateEntry",
				"methodName":"initGateEntryScrTS"
		},
		{
				"controlid":"strVehicleSource",
				"tasktype":"onchange",
				"input":["strVehicleSource"],
				"service":"CoreGateEntry",
				"methodName":"fetch_VehicleSource_Change"
		},
		{
				"controlid":"strGateEntryNo",
				"tasktype":"onenter",
				"input":["strGateEntryNo"],
				"service":"CoreGateEntry",
				"methodName":"fetchGateEntryNo"
		},
		{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strVehicleSource","strVehicleRegNo","strEntryType","strGateEntryNo","dtGateEntryDate",
						 "strGateEntryTime","strLocationCode","strGateNo","strVehicleCategory","strDriverCode","strDriverName",
						 "strMobileNo","strJourneyPlanNo","strItemCarried","strRemarks"],
				"service":"CoreGateEntry",
				"methodName":"saveGateEntryTS"

		},
		{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strVehicleSource","strVehicleRegNo","strEntryType","strGateEntryNo","dtGateEntryDate",
						 "strGateEntryTime","strLocationCode","strGateNo","strVehicleCategory","strDriverCode","strDriverName",
						 "strMobileNo","strJourneyPlanNo","strItemCarried","strRemarks"],
				"service":"CoreGateEntry",
				"methodName":"editGateEntryTS"

		},
		{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print",
				"input":["strVehicleSource","strVehicleRegNo","strEntryType","strGateEntryNo","dtGateEntryDate",
						 "strGateEntryTime","strLocationCode","strGateNo","strVehicleCategory","strDriverCode","strDriverName",
						 "strMobileNo","strJourneyPlanNo","strItemCarried","strRemarks"],
				"service":"CoreGateEntry",
				"methodName":"printGateEntryReport"

		},			
		{
				"controlid":"strDriverCode",
				"tasktype":"onenter",
				"input":["strDriverCode"],
				"service":"CoreGateEntry",
				"methodName":"fetchDriverDetailsTS"
		},				
		{
				"controlid":"strVehicleRegNo",
				"tasktype":"onenter",
				"input":["strVehicleRegNo"],
				"service":"CoreGateEntry",
				"methodName":"fetchVehicleTS"
		},			
			
				
	];
	
		mainpage.hlpLinks=
		{
			"DiverCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strDriverCode","child":"DRIVER_CODE"},
							{"parent":"strDriverName","child":"DRIVER_NAME"},
							{"parent":"strMobileNo","child":"PHONE_NO"}
							]
				},
				"JourneyPlan":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.JourneyPlanHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strJourneyPlanNo","child":"JOURNEY_PLAN_NO"}
							]
				},
				"Location":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strLocationCode","child":"LOC_CODE"}
							]
				},
				"GateEntryNo":
				{
					"hlpType":"Header",
					"hlpScreen":"GateEntry.GateEntryMasterHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strGateEntryNo","child":"GATEENTRY_NO"}
							]
				}				
				
			
		}		
		
		this.callParent(arguments);
			
	}
});
