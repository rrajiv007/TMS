/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1       Vidhya P       18/8/2016                             
************************************************************************************************/
Ext.define('CueTrans.view.ivms.jpclosed', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	
		var mainpage = this;
		mainpage.popupSectionFlag=true;
		//mainpage.popupHeightRatio=.5;
		//mainpage.popupWidthRatio=.58;
		mainpage.startPainting();
		
		mainpage.screenName = "Journey Plan Closed";
		mainpage.toolbarSectionFlag=false;
		/*
		mainpage.toolbarActions= 
		 [
			{
                "name": "Close JP",
                "tooltip": "Click here to close the journey plan."
            }
	     
          ]
		*/
		mainpage.keyFields=["strJourneyPlanNo"]
		
		//Journey Plan Header Section Begins
		plf.columns=4
		//Header1
		var JourneyHeaderset1 = plf.addColumnSection({title:"Journey Details"});			
		var JourneyPlanFormCtrl1=															
		[ 
		    plf.addDisplayOnly({"label":"Journey Plan No",id:"strJourneyPlanNo"}),
			plf.addDisplayOnly({"label":"Journey Plan Date",id:"dtJourneyPlanDate"}),
			plf.addDisplayOnly({"label":"Journey Mgr Name",id:"strJourneyManagerName"}),    
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addDisplayOnly({"label":"Vehicle Registration No",id:"strVehicleRegNo"}),
			plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
			plf.addDisplayOnly({"label":"Carrier Name",id:"strCarrierName"}),
			plf.addDisplayOnly({"label":"Route Description",id:"strRouteDescription"})
			
		]
		
		JourneyHeaderset1.add(JourneyPlanFormCtrl1);
	  
		
		//Plan/Actual Details Begins.
		
		var JourneyPlanDetails = plf.addColumnSection({title:""});	
		var planDtsGridFieldObj=		
		[
			
			{columnname:"Transit<BR>Location",dataname:"INTRANSIT_LOCATION",datatype:"string",editControl:"combo",width:100,storeId:"strTransitLocation"},			
			{columnname:"Planned<BR>Arrival Date",dataname:"PLANNED_ARRIVAL_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Planned<BR>Arrival Time",dataname:"PLANNED_ARRIVAL_TIME",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Planned<BR>Departure Date",dataname:"PLANNED_DEPARTURE_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Planned<BR>Departure Time",dataname:"PLANNED_DEPARTURE_TIME",datatype:"string",editControl:"textbox",width:120},
			{columnname:"Arrival Date",dataname:"ACTUAL_ARRIVAL_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Arrival Time",dataname:"ACTUAL_ARRIVAL_TIME",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Departure Date",dataname:"ACTUAL_DEPARTURE_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Departure Time",dataname:"ACTUAL_DEPARTURE_TIME",datatype:"string",editControl:"textbox",width:100}
		]
		var planDtsGridDtl=							
		{
			title:"Plan/Actual Details",
			id:"planDetails",
			detail:planDtsGridFieldObj,
			visibleRow:5,
			removePaging:true,
			removeAddDelete:true,
			readOnly:true,
			removeFilter:true,
			removeTbar:true
		}
		var planDtsGridSection = plf.addGrid(planDtsGridDtl,this)		
		JourneyPlanDetails.add(planDtsGridSection);
	
		
		plf.columns=4
		var statusDetails = plf.addColumnSection({title:"Journey Closure"});		
		var statusDetailsFormCtrl=																			
		[
			plf.addRegexDateTime({"label":"JP Close Date & Time",dateid:"dtJpCloseDateAndTime",timeid:"strJpCloseTime"}),
			plf.addButton({"label":"Close JP",id:"btnclsjp","tooltip":"Click here to close the journey plan."})
			
		
		]
		statusDetails.add(statusDetailsFormCtrl);
		

		
		mainpage.ptrMainSection.add(JourneyHeaderset1)
		mainpage.ptrMainSection.add(statusDetails) 
		mainpage.ptrMainSection.add(JourneyPlanDetails)
		//mainpage.ptrMainSection.add(statusDetails) 

		mainpage.dataHistorySectionFlag=false;
		
		
				mainpage.eventHandlers = 
		[
			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"initJourneyPlanUpdateScrTS"
			},
			{
				"controlid":"btnclsjp",
				"tasktype":"btnclick",
				"input":["strJourneyPlanNo","dtJpCloseDateAndTime","strJpCloseTime"],
			    "service":"CoreJourneyPlanService",
				"methodName":"closeJourneyPlanTS"
			},
			{
				
					"tasktype":"proto",
					"filename":"jm_master/JourneyPlan.json"
			}
			
			
		];
	this.callParent(arguments);
	
	}	
			
});
