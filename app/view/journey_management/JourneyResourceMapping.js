/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.2															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID		 Remarks             
************************************************************************************************	
1.0.1	Manibharathi		05/02/2016      69997        Addition of var  	
1.0.2	Yeshwanth	        23/02/2016      67696        DataSecurity  		                                   	                                   
1.0.3   Raj                 22/05/2016      72428        Bulk tracker allocation is throwing the problem occurred error 
1.0.4   Raj                 31/05/2016      72801        Need to show the current tracker in the grid
************************************************************************************************/
Ext.define('CueTrans.view.journey_management.JourneyResourceMapping', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Journey Resource Mapping";
		// Add Toolbar
        mainpage.toolbarSectionFlag=true;
		
		mainpage.toolbarActions= [
			{
                "name": "Save",
                "tooltip": "Click here to save journey resource mapping+."
            },
		]
		
		  mainpage.toolbarLinks=
		[
			{"name":"Journey Plan Summary","linkid":"jms_journeyplansum","tooltip":"Click here to launch journey plan summary screen."},
		]
		//Add Keyfields
		mainpage.keyFields=[""]
		
		//Assign tracker Section starts
		plf.columns=4
		var assignTrackerColumn = plf.addColumnSection({});			//69997
		var assignJourneyTrackerFormCtrl=									
		[
			plf.addCombo({"label":"Tracker Name",id:"strDFTrackerName"})
		]
		
		assignTrackerColumn.add(assignJourneyTrackerFormCtrl);
		
		
		plf.columns=4
		var assignTrackerHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
		var assignTrackerFormCtrl=							
		[
			plf.addText({"label":"Journey Plan No",id:"strJourneyPlanNoFrom","anywhereSearch":"true"}),
			plf.addHlpText({"label":"Load No",id:"strLoadNo",hlpLinkID:"LoadNo"},this),
			plf.addText({"label":"Ref Doc No",id:"strDocNo"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Date Type",id:"strDateType"}),
			plf.addDate({"label":"Date From",id:"dtJourneyDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtJourneyDateTo"}),
			plf.addHlpText({"label":"Journey Manager",id:"strJourneyManager",hlpLinkID:"journeyManagerCode"},this),
			plf.addHlpText({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"carrierno"},this),
			plf.addHlpText({"label":"Vehicle Code",id:"strTruckCode",hlpLinkID:"truckCode"},this),
			plf.addHlpText({"label":"Driver Code",id:"strDriverCode",hlpLinkID:"drivercode"},this),
			plf.addText({"label":"Driver Mobile No",id:"strMobileNo"}),
			plf.addHlpText({"label":"Inspection No",id:"strInspectionNo",hlpLinkID:"inspectionno"},this),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"})
       ]
		
		assignTrackerHdrCollapse.add(assignTrackerFormCtrl);
			
		var journeyResourceObj=
		[   
			{columnname:"Journey Plan No",dataname:"JOURNEY_PLAN_NO",datatype:"string",width:"auto"},
			{columnname:"Journey Plan Date",dataname:"JOURNEY_PLAN_DT",datatype:"string",width:"auto"},
			{columnname:"Journey Manager",dataname:"EMPLOYEE_NAME",datatype:"string",width:"auto"},
			{columnname:"Departed Date",dataname:"DEPARTURE_DATE",datatype:"string",width:"auto"},
			{columnname:"Carrier",dataname:"CARRIER_CODE",datatype:"string",width:"auto"},
            {columnname:"Vehicle",dataname:"TRUCK_CODE",datatype:"string",width:"auto"},
            {columnname:"Driver",dataname:"DRIVER_CODE",datatype:"string",width:"auto"},
            {columnname:"Driver Phone No",dataname:"DRIVER_PHONE_NO",datatype:"string",width:"auto",colAlign:'center'},
			{columnname:"Load No",dataname:"WAYBILL_NO",datatype:"string",width:"auto"},
			{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:"auto"},
			{columnname:"Origin",dataname:"ROUTE_ORIGIN",datatype:"string",width:"auto"},
			{columnname:"Destination",dataname:"ROUTE_DEST",datatype:"string",width:"auto"},
			{columnname:"Journey Status",dataname:"STATUS",datatype:"string",width:"auto"},
			{columnname:"Journey Tracker",dataname:"EMPLOYEE_CODE",datatype:"string",editControl:"combo",width:"auto",storeId:"strTrackerName"}
		]
		var journeyresourceGridDtl=
		{
			title:"Assign Tracker",
			id:"journeyResource",
			detail:journeyResourceObj,
                     selRowProcess:"Y",//72428
			visibleRow:15
		
		}
		var journeyresourceGridSection = plf.addGrid(journeyresourceGridDtl,this)

		var journeyTrackerFetchObj=
		[   
			{columnname:"Journey Plan No",dataname:"JOURNEY_PLAN_NO",datatype:"string",linkId:"journeyPlan","tooltip":"Click here to launch the journey tracker details.",width:"auto"},
			{columnname:"Journey Plan Date",dataname:"JOURNEY_PLAN_DT",datatype:"string",width:"auto"},
			{columnname:"Journey Manager",dataname:"EMPLOYEE_NAME",datatype:"string",width:"auto"},
			{columnname:"Departed Date",dataname:"DEPARTURE_DATE",datatype:"string",width:"auto"},
			{columnname:"Carrier",dataname:"CARRIER_CODE",datatype:"string",width:"auto"},
            {columnname:"Vehicle",dataname:"TRUCK_CODE",datatype:"string",width:"auto"},
            {columnname:"Driver",dataname:"DRIVER_CODE",datatype:"string",width:"auto"},
            {columnname:"Driver Phone No",dataname:"DRIVER_PHONE_NO",datatype:"string",width:"auto",colAlign:'center'},
			{columnname:"Load No",dataname:"WAYBILL_NO",datatype:"string",width:"auto"},
			{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:"auto"},
			{columnname:"Origin",dataname:"ROUTE_ORIGIN",datatype:"string",width:"auto"},
			{columnname:"Destination",dataname:"ROUTE_DEST",datatype:"string",width:"auto"},
			{columnname:"Journey Status",dataname:"STATUS",datatype:"string",width:"auto"},
                  {columnname:"Current Tracker",dataname:"EMPLOYEE_CODE",datatype:"string",width:"auto"}//72801
 
		]
		var journeytrackerfetchGridDtl=
		{
			title:"Tracker Details",
			id:"journeyTrackerFetch",
			detail:journeyTrackerFetchObj,
			readOnly:true,
			removeAddDelete:true,
                     visibleRow:15		
		}
		var journeytrackerfetchGridSection = plf.addGrid(journeytrackerfetchGridDtl,this)	
		
		mainpage.ptrMainSection.add(assignTrackerHdrCollapse)
		mainpage.ptrMainSection.add(assignTrackerColumn)//Add Header Section to Main 		
		
		var baseTab = plf.addTabSection({ tabs:[
												journeyresourceGridSection,journeytrackerfetchGridSection
												]});
		mainpage.ptrMainSection.add(baseTab)
		
		//mainpage.ptrMainSection.add(journeyresourceGridSection) //Add grid Section to Main Page
		
		//History Data Section
		//mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
           	{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreJourneyPlanService",
				"methodName":"initJourneytrcTS"
			},	  

			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strJourneyPlanNoFrom","dtJourneyDateFrom","dtJourneyDateTo","strDriverCode","strTruckCode","strStatus","strInspectionNo",
				"strLoadNo","strJourneyManager","strOrigin","strDestination","strVehicleCategory","strCarrierCode","strLicenceNo","strMobileNo","strDriverCode","strDateType","strDocNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchJourneytrcTS"
			},
			
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["journeyResource","strDFTrackerName","strTrackerName"],
				"service":"CoreJourneyPlanService",
				"methodName":"saveJouResourceMappingTS"
			},
			
		  
		];
		//Event Handlers Mapping Ends
		mainpage.hlpLinks=
		{
         	"JourneyPlanNo":
				{
					"hlpType":"grid",
					"gridID":"journeyResource",
					"hlpScreen":"journey_management.JourneyPlanHelp",
					"send":[
							{"parent":"","child":""},
						   ],
					"receive":[
					           {"parent":"JOURNEY_PLAN_NO","child":"JOURNEY_PLAN_NO"}
							]
				},
				
		   "JourneyTracker":
				{
					"hlpType":"grid",
					"gridID":"journeyResource",
					"hlpScreen":"jm_master.EmployeeHelp",
					"send":[
							{"parent":"","child":""},
						   ],
					"receive":[
					           {"parent":"EMPLOYEE_CODE","child":"EMPLOYEE_CODE"}
							]
				},
			"inspectionno":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.InspectionHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strInspectionNo","child":"INSPECTION_NO"}
							]
				},
				"transreqno":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.TransRequestItemHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRequestNo","child":"TRANS_REQ_NO"}
							]
				},
				"LoadNo":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.LoadBuildingHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strLoadNo","child":"LOAD_NO"}
							]
				},
				"journeyManagerCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.EmployeeHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strJourneyManager","child":"EMPLOYEE_CODE"}
							
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
				"drivercode":
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
				"carrierno":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCarrierCode","child":"OWNER_CODE_3PL"}							
							]
				}			
		}
		
		mainpage.screenLinks=
		{
			"jms_journeyplansum":
				{
					"dest":"journey_management.JourneyPlanSummary",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"journeyPlan":
				{
					"dest":"journey_management.JourneyPlanTracker",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"JOURNEY_PLAN_NO","dest":"strJourneyPlanNo"},
							{"src":"JOURNEY_PLAN_DT" ,"dest":"strJourneyPlanDate"},
							{"src":"EMPLOYEE_NAME" ,"dest":"strJourneyManager"},
							{"src":"WAYBILL_NO" ,"dest":"strLoadNo"},
							{"src":"ROUTE_ORIGIN" ,"dest":"strOrigin"},
							{"src":"ROUTE_DEST" ,"dest":"strDestination"}
							]
				}
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
				"except":["strDriverCode"]
			},
			"active":
			{
				"enableAll":false,
				"except":["strDriverPhoneNo","strNationalityId","strIvmsKeyNo","strRemarks","driverMapping","licenceMapping"]
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