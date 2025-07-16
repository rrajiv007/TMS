/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.0	 	Yeshwanth	   23/02/2016    67696                         Data Security  		                                   
************************************************************************************************/
Ext.define('CueTrans.view.journey_management.JourneyPlanTracker', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Journey Plan Tracker Details";
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{ "name": "Save","tooltip": "Click here to save."
            }]
		//Add Keyfields	
		mainpage.keyFields=[""]
		//Driver License Grid section starts
		
		plf.columns=4
		var JourneytrackerColumn1 = plf.addColumnSection({"title":" Journey Plan Details"}); 
		
		if(plf.defaultLayout==6)
		{
			plf.columns=3
			
			var JourntrackerCtrl1=					
			[	
				plf.addDisplayOnly({"label":"Journey plan no",id:"strJourneyPlanNo"}),
				plf.addDisplayOnly({"label":"Journey plan Date",id:"strJourneyPlanDate"}),	
				plf.addDisplayOnly({"label":"Journey Manager",id:"strJourneyManager"}),	
				plf.addDisplayOnly({"label":"Load No",id:"strLoadNo"}),
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"})
			]
		
		}
		
		else
		{
		var parentForm =this;
		JourntrackerCtrl1=
			[	
				plf.addDisplayOnly({"label":"Journey plan no",id:"strJourneyPlanNo"}),
				plf.addDisplayOnly({"label":"Journey plan Date",id:"strJourneyPlanDate"}),	
				plf.addDisplayOnly({"label":"Journey Manager",id:"strJourneyManager"}),	
				plf.addDisplayOnly({"label":"Load No",id:"strLoadNo"}),
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"})
			]
		
		}
		JourneytrackerColumn1.add(JourntrackerCtrl1);
		

		var JourneyPlanTrackerftcObj=
		[
			{columnname:"Journey Tracker",dataname:"EMPLOYEE_CODE",datatype:"string",editControl:"combo",width:"auto",storeId:"strTrackerName"}			
		]
		var JourneyPlanTrackerftcGridDtl=
		{
			title:"",
			id:"journeyResource",
			detail:JourneyPlanTrackerftcObj,
			visibleRow:15,
		}
		var JourneyPlanTrackerftcGridSection = plf.addGrid(JourneyPlanTrackerftcGridDtl,this)	
		
		mainpage.ptrMainSection.add(JourneytrackerColumn1)
		mainpage.ptrMainSection.add(JourneyPlanTrackerftcGridSection) //Add grid Section to Main Page
						
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strJourneyPlanNo","strJourneyPlanDate","strJourneyManager","strLoadNo","strOrigin","strDestination"],
				"service":"CoreJourneyPlanService",
				"methodName":"initJourneyPlanTrackerftcTS"
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strJourneyPlanNo","journeyResource"],
				"service":"CoreJourneyPlanService",
				"methodName":"saveJouTrackerFetchTS"
			}
		];
		//Event Handlers Mapping Ends
		mainpage.hlpLinks=
		{
			
		}
		
		this.callParent(arguments);
		
	}
});