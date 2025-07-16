Ext.define('CueTrans.view.journey_management.JourneySummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Journey Report";
		//Journey Summary Addtion
		
		mainpage.toolbarSectionFlag=true;
		
		
		mainpage.toolbarLinks=
		[
			{"name":"Inspection Report","linkid":"inspectionreport"}
		]
		
		//var jpSummary = Ext.create("CueTrans.view.journey_management.JPSummary")
		
				
		//mainpage.ptrMainSection.add(jpSummary)
		//Journey Search Section Begins
		plf.columns=3
		helpOnJourneyHdrCollapse = plf.addColumnSection({title:"", collapsed: false}); 	
	 	helpOnJourneyFormCtrl=
		[
			plf.addHlpText({"label":"Journey Plan No From",id:"strJourneyPlanNoFrom",hlpLinkID:"jpnoFrom",inputFormat:"string",InputLength:"80"},this),			
			plf.addHlpText({"label":"Journey Plan No To",id:"strJourneyPlanNoTo",hlpLinkID:"jpnoTo",inputFormat:"string",InputLength:"80"},this),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			
			plf.addDate({"label":"Journey Date From",id:"dtJourneyDateFrom"}),
			plf.addDate({"label":"Journey Date To",id:"dtJourneyDateTo"}),
			plf.addCombo({"label":"Journey Mgr Name",id:"strJourneyManager"}),
			
			plf.addHlpText({"label":"Route Code","id":"strRouteCode",hlpLinkID:"routeCode",inputFormat:"string",InputLength:"40"},this),
			plf.addHlpText({"label":"Customer Vendor Code",id:"strCustomerVendorCode",hlpLinkID:"customerVendor",inputFormat:"string",InputLength:"40"},this),
			plf.addCombo({"label":"Journey Plan Type",id:"strJourneyPlanType"}),
			
			plf.addHlpText({"label":"Violation Code From",id:"strViolationCodeFrom",hlpLinkID:"ViolationCodeFrom",inputFormat:"string",InputLength:"40"},this),
			plf.addHlpText({"label":"Violation Code To",id:"strViolationCodeTo",hlpLinkID:"ViolationCodeTo",inputFormat:"string",InputLength:"40"},this),
			plf.addCombo({"label":"Violation Type",id:"strViolationType"}),			
			plf.addHlpText({"label":"Truck Code",id:"strTruckCode",hlpLinkID:"truckCode",inputFormat:"string",InputLength:"40"},this),
			plf.addHlpText({"label":"Driver Code",id:"strDriverCode",hlpLinkID:"driver",inputFormat:"string",InputLength:"40"},this)		
				
			
		]
		
		helpOnJourneyHdrCollapse.add(helpOnJourneyFormCtrl);
		//Journey Search Section Ends
		

		plf.columns=4
		JourneyHdrFieldset2 = plf.addColumnSection({title:"",collapsed: false});
		JourneyPlanFormCtrl2=
		[
			 plf.addButton({"label":"Journey Plan Summary",id:"jpSummaryBtn"}),
			 plf.addButton({"label":"Journey Plan Detail",id:"jpDetailBtn"}),
		     plf.addButton({"label":"Top 10 Violations",id:"top10ViolationBtn"}),
			 plf.addButton({"label":"Journey Violation Detail",id:"violationBtn"})
		]
		JourneyHdrFieldset2.add(JourneyPlanFormCtrl2);
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnJourneyHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(JourneyHdrFieldset2)
		//mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreJourneyPlanService",
				"methodName":"initJourneyReport1"
			},	
		    {       
				"controlid":"jpSummaryBtn",
				"tasktype":"btnclick",
				"input":["strJourneyPlanNoFrom","strJourneyPlanNoTo","strStatus","dtJourneyDateFrom","dtJourneyDateTo","strJourneyManager","strRouteCode","strCustomerVendorCode","strJourneyPlanType","strViolationCodeFrom","strViolationCodeTo","strViolationType","strTruckCode","strDriverCode"],
			    "service":"CoreJourneyPlanService",
				"methodName":"printJourneyPlanSummaryReport"
			},
			
			{       
				"controlid":"jpDetailBtn",
				"tasktype":"btnclick",
				"input":["strJourneyPlanNoFrom","strJourneyPlanNoTo","strStatus","dtJourneyDateFrom","dtJourneyDateTo","strJourneyManager","strRouteCode","strCustomerVendorCode","strJourneyPlanType","strViolationCodeFrom","strViolationCodeTo","strViolationType","strTruckCode","strDriverCode"],
			    "service":"CoreJourneyPlanService",
				"methodName":"printJourneyPlanDetailReport"
			},
			{       
				"controlid":"top10ViolationBtn",
				"tasktype":"btnclick",
				"input":["strJourneyPlanNoFrom","strJourneyPlanNoTo","strStatus","dtJourneyDateFrom","dtJourneyDateTo","strJourneyManager","strRouteCode","strCustomerVendorCode","strJourneyPlanType","strViolationCodeFrom","strViolationCodeTo","strViolationType","strTruckCode","strDriverCode"],
			    "service":"CoreJourneyPlanService",
				"methodName":"printJourneyTop10ViolationReport"
			},
		    {       
				"controlid":"violationBtn",
				"tasktype":"btnclick",
				"input":["strJourneyPlanNoFrom","strJourneyPlanNoTo","strStatus","dtJourneyDateFrom","dtJourneyDateTo","strJourneyManager","strRouteCode","strCustomerVendorCode","strJourneyPlanType","strViolationCodeFrom","strViolationCodeTo","strViolationType","strTruckCode","strDriverCode"],
			    "service":"CoreJourneyPlanService",
				"methodName":"printJourneyViolationReport"
			}
			
		];
		
		mainpage.screenLinks=
		{
			"inspectionreport":
				{
					"dest":"journey_management.InspectionReport",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
		
		mainpage.hlpLinks=
		{
			"jpnoFrom":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.JourneyPlanHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strJourneyPlanNoFrom","child":"JOURNEY_PLAN_NO"}
							]
				},
				"jpnoTo":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.JourneyPlanHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strJourneyPlanNoTo","child":"JOURNEY_PLAN_NO"}
							]
				},
			"driver":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strDriverCode","child":"DRIVER_CODE"}
							
							]
				},
				
				"truckCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTruckCode","child":"TRUCK_CODE"}
							]
				},
				
				"customerVendor":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CustomerVendorHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCustomerVendorCode","child":"CUST_VENDOR_CODE"}
							]
				},
				"routeCode":
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
				
			"ViolationCodeFrom":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.ViolationHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strViolationCodeFrom","child":"VIOLATION_CODE"}
							
							
							
							
							]
				},
				"ViolationCodeTo":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.ViolationHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strViolationCodeTo","child":"VIOLATION_CODE"}
							
							
							
							
							]
				}
				
		}	
		
		this.callParent(arguments);
		
	}
});
