/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1       divya                                            
************************************************************************************************/
Ext.define('CueTrans.view.ivms.JourneyTruckRelease', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.popupSectionFlag=true;
		//mainpage.popupHeightRatio=.5;
		//mainpage.popupWidthRatio=.58;
		mainpage.startPainting();
		
		mainpage.screenName = "Journey Truck Release";
		// Add Toolbar
		mainpage.toolbarSectionFlag=false;
		/*
		mainpage.toolbarActions= [
		
            {
                "name": "Truck Release",
                "tooltip": "Click here to release the truck."
            }
			
            ]
		*/	

		//Add Keyfields
		mainpage.keyFields=["strJourneyPlanNo"]
		
		//Journey Plan Header Section Begins
		plf.columns=4
		var JourneyHdrFieldset1 = plf.addColumnSection({title:"Journey Details"});			//69997
		var JourneyPlanFormCtrl1=															//69997	
		[
			plf.addDisplayOnly({"label":"Journey Plan No",id:"strJourneyPlanNo"}),
			plf.addDisplayOnly({"label":"Journey Plan Date",id:"dtJourneyPlanDate"}),
			plf.addDisplayOnly({"label":"Journey Mgr Name",id:"strJourneyManagerName"}),    
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addDisplayOnly({"label":"Vehicle Registration No",id:"strVehicleRegNo"}),
			plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
			plf.addDisplayOnly({"label":"Carrier Name",id:"strCarrierName"}),
			plf.addDisplayOnly({"label":"Route Description",id:"strRouteDescription"}),

			plf.addHidden({"label":"Vehicle Code",id:"strTruckCode"}),	
			plf.addHidden({"label":"Trailer Code",id:"strTrailerCode"}),	
			plf.addHidden({"label":"Driver Code",id:"strDriverCode"})			
			
		]
		
		JourneyHdrFieldset1.add(JourneyPlanFormCtrl1);
		
		//Adding Grid to Plan Details Begins
		var journeyPlanDetailsCollapse = plf.addColumnSection({title:""});	
		var planDtsGridFieldObj=		//69997
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
		var planDtsGridDtl=								//69997
		{
			title:"Plan/Actual Details",
			id:"planDetails",
			detail:planDtsGridFieldObj,
			visibleRow:7,
			removePaging:true,
			removeAddDelete:true,
			readOnly:true,
			removeFilter:true,
			removeTbar:true
		}
		var planDtsGridSection = plf.addGrid(planDtsGridDtl,this)		//69997
		journeyPlanDetailsCollapse.add(planDtsGridSection);
		//Adding Grid to Plan Details Ends	
		
		
		
		
		plf.columns=4
		var statusDetailsCollapse = plf.addColumnSection({title:"Journey Vehicle Release"});		//69997
		var statusDetailsFormCtrl=																			//69997
		[
			
			plf.addDateTime({"label":"Release Date & Time",dateid:"dtReleaseDateAndTime",timeid:"strReleaseTime"}),			
			plf.addText({"label":"Release Remarks",id:"strReleaseRemarks"}),
			plf.addButton({"label":"Release JP",id:"btnreljp","tooltip":"Click here to release the journey plan."})
			
		]
		statusDetailsCollapse.add(statusDetailsFormCtrl);
		
		
		mainpage.ptrMainSection.add(JourneyHdrFieldset1)
		mainpage.ptrMainSection.add(statusDetailsCollapse) 
		mainpage.ptrMainSection.add(journeyPlanDetailsCollapse)
		
		// Event Handlers Mapping Begins
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
				"controlid":"btnreljp",
				"tasktype":"btnclick",
				"input":["strJourneyPlanNo","dtReleaseDateAndTime","strReleaseTime","strReleaseRemarks","strTruckCode","strTrailerCode","strDriverCode"],
			       "service":"CoreJourneyPlanService",
				"methodName":"releaseJourneyPlanTS"
			},

			
			{
				
					"tasktype":"proto",
					"filename":"jm_master/JourneyPlan.json"
			}
		
		
			
			];
			
		this.callParent(arguments);
		
	
	}
		
});

