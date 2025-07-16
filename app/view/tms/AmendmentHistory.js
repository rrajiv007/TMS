/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1       Shekar         16/11/16       74676
1.0.2       Shekar		   29/12/16        75232
 ************************************************************************************************/

Ext.define('CueTrans.view.tms.AmendmentHistory', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();		
		mainpage.screenName = "Amendment History";
		
		mainpage.toolbarSectionFlag=true;
	
		mainpage.toolbarActions= [ ]
		
		//Add Keyfields
		mainpage.keyFields=[""]
		
		//Org Header Section Begins
		
		
		plf.columns=4
		var JourneyHdrFieldset = plf.addColumnSection({title:"Journey Details"});
		var JourneyPlanFormCtrl1=													
		[
			plf.addHlpText({"label":"Journey Plan No","id":"strJourneyPlanNo",hlpLinkID:"JPNo"},this),
			plf.addDisplayOnly({"label":"Journey Plan Date",id:"dtJourneyPlanDate"}),
			plf.addDisplayOnly({"label":"Journey Type",id:"strJourneyPlanType"}),			
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),		
			plf.addDisplayOnly({"label":"Journey Mgr Name",id:"strJourneyManagerName"}),
			plf.addDisplayOnly({"label":"Journey Mgr Code",id:"strJourneyManagerCode"}),
			plf.addDisplayOnly({"label":"Phone Number",id:"strPhoneNo"}),
			plf.addDisplayOnly({"label":"RAM Score",id:"iRiskAssessmentScore"}),
            plf.addDisplayOnly({"label":"Load No",id:"strLoadNo"}),	
            plf.addDisplayOnly({"label":"Load Origin",id:"strLoadOrigin"}),
		    plf.addDisplayOnly({"label":"Load Destination",id:"strLoadDestination"}), 	
            plf.addDisplayOnly({"label":"Load Description",id:"strLoadDesc"}),	
            plf.addDisplayOnly({"label":"Loading Point","id":"strLoadAt"}),
			plf.addDisplayOnly({"label":"Unloading Point","id":"strDeliveryAt"}),
            plf.addDisplayOnly({"label":"Carrier Name",id:"strCarrierName"}),
            plf.addDisplayOnly({"label":"Inspection No",id:"strInspectionNo"}),
			plf.addDisplayOnly({"label":"Driver Compliance",id:"strDriverCompliance"}),
			plf.addDisplayOnly({"label":"Vehicle Compliance",id:"strTruckCompliance"}),
		    plf.addDisplayOnly({"label":"Load Compliance",id:"strLoadCompliance"})
	
		]
		JourneyHdrFieldset.add(JourneyPlanFormCtrl1);
    
		
		
		var JourneyGridFieldObj=
		[   
			
			{columnname:"Vehicle Code",dataname:"VEHICLE_CODE",datatype:"string",width:150},
			{columnname:"Vehicle Reg Nos",dataname:"VEHICLE_REG_NO",datatype:"string",width:150},
			{columnname:"Driver code",dataname:"DRIVER_CODE",datatype:"string",width:150},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:150},
			{columnname:"Driver Contact Nos",dataname:"DRI_CONTACT_NUM",datatype:"string",width:150},
			{columnname:"Trailer code",dataname:"TRAILER_CODE",datatype:"string",width:150},
			{columnname:"Captured Screen",dataname:"CAPTURED_SCREEN",datatype:"string",width:150},
			{columnname:"Allocated Date",dataname:"ALLOCATED_DATE",datatype:"date",width:150},
			{columnname:"Allocated By",dataname:"ALLOCATED_BY",datatype:"string",width:150},
			{columnname:"Vehicle Change Reason",dataname:"VEHICLE_CHNG_REASON",datatype:"string",width:150},
			{columnname:"Driver Change Reason",dataname:"DRIVER_CHNG_REASON",datatype:"string",width:150},
			{columnname:"Trailer Change Reason",dataname:"TRAILER_CHNG_REASON",datatype:"string",width:150},
			{columnname:"Notes",dataname:"NOTES",datatype:"string",width:150},
			
		]
		var JourneyGridFielGridDtl=
		{
			title:"",
			id:"JourneyGridFiel",
			detail:JourneyGridFieldObj,
            visibleRow:plf.helpVisibleRows,
			removeAddDelete:true
		}
		
		JourneyGridSection = plf.addGrid(JourneyGridFielGridDtl,this)	
		
		mainpage.ptrMainSection.add(JourneyHdrFieldset)
		mainpage.ptrMainSection.add(JourneyGridSection)
		
	    mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"initJourneyHistoryScrTS"
			},
		    {
			"controlid":"strJourneyPlanNo",
			"tasktype":"onenter",
			"input":["strJourneyPlanNo"],
			"service":"CoreJourneyPlanService",
			"methodName":"onenterJourneyHistoryTs"
			 }
				
		];
		
	     mainpage.hlpLinks=
			{
				
		    	"JPNo":
					{
						"hlpType":"Header",
						"hlpScreen":"journey_management.JourneyPlanHelp",
						"send":[
								{"parent":"","child":""}
							   ],
						"receive":[
								{"parent":"strJourneyPlanNo","child":"JOURNEY_PLAN_NO"}
								
								]
					}
			  
			}
		
		this.callParent(arguments);
		
	
	}
});