Ext.define('CueTrans.view.journey_management.JourneyDebriefing', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Journey Debriefing";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		//mainpage.toolbarActions=["Save"]
		mainpage.toolbarActions= [{
                "name": "Save",
                "tooltip": "Click here to save."
            }
            ]
		mainpage.toolbarLinks=
		[
			{"name":"Journey Plan","linkid":"jms_journeyPlan","tooltip":"Click here to launch the journey plan screen."},
			{"name":"Update","linkid":"jms_update","tooltip":"Click here to launch the journey update screen."}
		]
		//mainpage.keyFields=["strJourneyDebriefingNo"]
		
		//InspectionMaster Header Section Begins
		plf.columns=4
		JourneyDebriefingMstrColumn = plf.addColumnSection({});
		JourneyDebriefingMstrCtrl=
		[   		
				plf.addHlpText({"label":"Journey Plan No",id:"strJourneyPlanNo","mandatory":"true",hlpLinkID:"JourneyPlan"},this),
				plf.addDisplayOnly({"label":"Journey Date","id":"dtJourneyPlanDate"}),
				plf.addBlank(),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addDisplayOnly({"label":"Truck Code",id:"strTruckCode"}),
				plf.addDisplayOnly({"label":"Truck Description",id:"strTruckDescription"}),
				plf.addDisplayOnly({"label":"Trailer Code",id:"strTrailerCode"}),
				plf.addDisplayOnly({"label":"Trailer Description",id:"strTrailerDescription"}),
				plf.addDisplayOnly({"label":"Driver Code",id:"strDriverCode"}),
				plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
				plf.addDisplayOnly({"label":"Vendor Code",id:"strCustomerVendorCode"}),
				plf.addDisplayOnly({"label":"Vendor Name",id:"strCustomerVendorName"}),
				plf.addDisplayOnly({"label":"Route Code","id":"strRouteCode"}),
				plf.addDisplayOnly({"label":"Route Description","id":"strRouteDescription"}),
				plf.addDisplayOnly({"label":"Customer Code",id:"strCustomerCode"}),
				plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
				plf.addDisplayOnly({"label":"Departure Time",id:"tmDepartureTime"}),
				plf.addDisplayOnly({"label":"Pickup Point",id:"strPickupPoint"})					
		]
		JourneyDebriefingMstrColumn.add(JourneyDebriefingMstrCtrl);
					
		mainpage.ptrMainSection.add(JourneyDebriefingMstrColumn)//Add Header Section to Main Page		
		//Add Grid Section to Main Page
		
		JourneyDebriefingGridFieldObj=
		[   
			
			{columnname:"Type",dataname:"TYPE",datatype:"string",storeId:"strType",editControl:"combo",width:250},
			{columnname:"Sub Type",dataname:"SUB_TYPE",datatype:"string",storeId:"strSubType",editControl:"combo",width:250},
			{columnname:"Details",dataname:"DETAILS",datatype:"string",editControl:"textbox",width:200}			
			
		]
		JourneyDebriefingGridDtl=
		{
			title:"De-Briefing Details",
			id:"DebreifingDetailsObj",
			detail:JourneyDebriefingGridFieldObj,
		
		}
		JourneyDebriefingGridSection = plf.addGrid(JourneyDebriefingGridDtl)	
		
		
		PostJourneyDebriefingGridFieldObj=
		[   			
			{columnname:"Violation<br>Code",dataname:"VIOLATION_CODE",datatype:"string",editControl:"addDisplayOnly",width:150},
			{columnname:"Violation Type",dataname:"VIOLATION_TYPE",datatype:"string",editControl:"addDisplayOnly",	width:120},
			{columnname:"Violation<br>Description",dataname:"VIOLATION_DESC",datatype:"string",editControl:"addDisplayOnly",width:150},
			{columnname:"Existing<br>Violations",dataname:"EXISTING_VIOLATION",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Current<br>Violations",dataname:"CURRENT_VIOLATION",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Violation<br>Remarks",dataname:"REMARKS",datatype:"string",editControl:"addDisplayOnly",width:150}
			
		]
		PostJourneyDebriefingGridDtl=
		{
			title:"",
			id:"PostDeBriefingDtl",
			detail:PostJourneyDebriefingGridFieldObj,
			readOnly:true,
			removeAddDelete:true
		
		}
		var PostDeBriefingDtl =  plf.addCollapseSection({title:"Violation History",collapsed:false})		
		PostJourneyDebriefingGridSection = plf.addGrid(PostJourneyDebriefingGridDtl)	
		PostDeBriefingDtl.add(PostJourneyDebriefingGridSection)
		
		
		
		mainpage.ptrMainSection.add(JourneyDebriefingMstrColumn) //Add Header Section to Main Page		
		mainpage.ptrMainSection.add(PostDeBriefingDtl)
		mainpage.ptrMainSection.add(JourneyDebriefingGridSection)  //Add Grid Section to Main Page
		  //Add Grid Section to Main Page
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		// Event Handlers Mapping Begins
		
		mainpage.eventHandlers = 
		[
		
		      
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"initJourneyDebriefingScrTS"
		},
		{
				"controlid":"strJourneyPlanNo",
				"tasktype":"onenter",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchJourneyDebriefingNo"
		},
		{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strJourneyPlanNo","DebreifingDetailsObj","PostDeBriefingDtl"],
				"service":"CoreJourneyPlanService",
				"methodName":"maintainJourneyDebriefingNo"

			}
			
			
				
	];
			mainpage.screenLinks=
		{
			"jms_journeyPlan":
				{
					"dest":"journey_management.JourneyPlan",
					"hdr":[
							{"src":"strJourneyPlanNo","dest":"strJourneyPlanNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"jms_update":
				{
					"dest":"journey_management.JourneyPlanUpdate",
					"hdr":[
							{"src":"strJourneyPlanNo","dest":"strJourneyPlanNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
		mainpage.hlpLinks=
		{
			
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
				}
				
			
		}		
		
		this.callParent(arguments);
			
	}
});
