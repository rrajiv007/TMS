Ext.define('CueTrans.view.journey_management.JourneyPlanSummary', 
/****************************************************************************************************************
                                          Modification History                                                                                                                                                                                
****************************************************************************************************************               
Description           :                                                                                                                      
Author                :           CUETRANS                                                                                                                                                                                                                                                                                                  
Version               :           1.0.2                                                                                                                                                                                                                                                                                    
****************************************************************************************************************               
Version              Modified By      Date               Defect ID                 Remarks            
****************************************************************************************************************               
1.0.1            p.shekar            04-02-2016          69944                 Ref Doc No
1.0.2	 		  Manibharathi		  05/02/2016         69997                 Addition of var  
****************************************************************************************************************/
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Journey Plan Summary";
		//Journey Summary Addtion
		//var jpSummary = Ext.create("CueTrans.view.journey_management.JPSummary")
		
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=
		[
			{"name":"Create New Journey Plan","linkid":"jms_journeyplanmain","tooltip":"Click here to create a new journey plan."},
			{"name":"Journey Resource Mapping","linkid":"jms_resourcemapping","tooltip":"Click here to launch journey resource mapping screen."},
		]
		
		//mainpage.ptrMainSection.add(jpSummary)
		//Journey Search Section Begins
		plf.columns=4
		var helpOnJourneyHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this); 	//69997
	 	var helpOnJourneyFormCtrl=														//69997
		[
			plf.addText({"label":"Journey Plan No",id:"strJourneyPlanNoFrom","anywhereSearch":"true"}),
			plf.addHlpText({"label":"Inspection No",id:"strInspectionNo",hlpLinkID:"inspectionno"},this),	
			plf.addHlpText({"label":"Load No",id:"strLoadNo",hlpLinkID:"LoadNo"},this),	
			plf.addCombo({"label":"Status",id:"strStatus"}),	
			plf.addCombo({"label":"Date Type",id:"strDateType"}),	
			plf.addDate({"label":"Date From",id:"dtJourneyDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtJourneyDateTo"}),
			plf.addHlpText({"label":"Journey Manager",id:"strJourneyManager",hlpLinkID:"journeyManagerCode"},this),			
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),			
			plf.addHlpText({"label":"Vehicle Code",id:"strTruckCode",hlpLinkID:"truckCode"},this),
			plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory"}),
			plf.addHlpText({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"carrierno"},this),
			plf.addHlpText({"label":"Driver Code",id:"strDriverCode",hlpLinkID:"drivercode"},this),
            plf.addText({"label":"Driver Licence No",id:"strLicenceNo"}),
			plf.addText({"label":"Driver Mobile No",id:"strMobileNo"}),
			plf.addText({"label":"Ref Doc No",id:"strDocNo","anywhereSearch":"true"})
			//plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."}),
		]
		
		helpOnJourneyHdrCollapse.add(helpOnJourneyFormCtrl);
		//Journey Search Section Ends
		
		//Journey Grid Section Begins
		var helpOnJourneyGridFieldObj=														//69997
		[
			{columnname:"Click here to launch the journey plan screen.",dataname:"JP_LINK_ID",width:70,linkId:"journeyPlanScr",imageURL:"resources/images/grid/Journey/Grid_Re_Create.png"},
			{columnname:"Click here to launch the journey plan update screen.",dataname:"JPU_LINK_ID",width:70,linkId:"journeyPlanUpdate",imageURL:"resources/images/grid/Journey/Grid_Update.png"},
			{columnname:"Click here to launch the journey plan replan screen.",dataname:"JPR_LINK_ID",width:70,linkId:"journeyPlanReplan",imageURL:"resources/images/grid/Journey/Grid_Replan.png"},
			//{columnname:"Click here to launch the journey plan recreate screen.",dataname:"JPRC_LINK_ID",width:70,linkId:"journeyPlanRecreate",imageURL:"resources/images/grid/Journey/Grid_Re_Create.png"},
			{columnname:"MAP",dataname:"MAP",datatype:"string",width:100,linkId:"maplink",gridpopup:true,tooltip:"Click here to view map.",imageURL:"resources/images/grid/Journey/Grid_Journey_Plan.png"},
			{columnname:"Journey Plan No",dataname:"JOURNEY_PLAN_NO",datatype:"string",linkId:"NEXT_LINKID","linkType":"DYN","tooltip":"Click here to launch the journey plan details.",width:"auto"},
			{columnname:"Link ID",dataname:"NEXT_LINKID",width:100,hidden:true},
			{columnname:"Journey Plan Date",dataname:"JOURNEY_PLAN_DT",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:80},
			//{columnname:"Journey Plan date",dataname:"JOURNEY_PLAN_DATE",datatype:"string",width:80},
            {columnname:"Origin",dataname:"ROUTE_ORIGIN",datatype:"string",width:100},
			{columnname:"Destination",dataname:"ROUTE_DEST",datatype:"string",width:100},
			{columnname:"Carrier",dataname:"CARRIER_CODE",datatype:"string",width:100},
            {columnname:"Vehicle",dataname:"TRUCK_CODE",datatype:"string",width:100},
            {columnname:"Driver",dataname:"DRIVER_CODE",datatype:"string",width:100},
            {columnname:"Phone No",dataname:"PHONE_NO",datatype:"string",width:100,colAlign:'center'},
            {columnname:"Journey Mgr Name",dataname:"EMPLOYEE_NAME",datatype:"string",width:"auto"},
			{columnname:"Departed Date",dataname:"DEPARTURE_DATE",datatype:"string",width:110},
			{columnname:"Delivered Date",dataname:"DELIVERED_DATE",datatype:"string",width:110},
			{columnname:"JP Closed Date",dataname:"CLOSURE_DATE",datatype:"string",width:110},
			{columnname:"No of Violations",dataname:"NO_OF_VIOLATIONS",datatype:"string",width:110},
            {columnname:"Inspection No",dataname:"INSPECTION_NO",datatype:"string",width:110},
			{columnname:"Load No",dataname:"WAYBILL_NO",datatype:"string",width:110},
			//{columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",width:110},
			{columnname:"Request No",dataname:"REQUEST_NO",datatype:"string",width:110},
			{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:80}
			
		]
		var helpOnJourneyGridDtl=						//69997
		{
			title:"",
			id:"journeySearch",
	        detail:helpOnJourneyGridFieldObj,
		    readOnly:true,
			removeAddDelete:true,
			visibleRow:plf.searchVisibleRows
		   }
		var helpGridSection = plf.addGrid(helpOnJourneyGridDtl,this)		//69997
		//Driver Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnJourneyHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreJourneyPlanService",
				"methodName":"initJourneyPlanSummaryTS"
			},			
		{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strJourneyPlanNoFrom","dtJourneyDateFrom","dtJourneyDateTo","strDriverCode","strTruckCode","strStatus","strInspectionNo",
				"strLoadNo","strJourneyManager","strOrigin","strDestination","strVehicleCategory","strCarrierCode","strLicenceNo","strMobileNo","strDriverCode","strDateType","strDocNo"],
			    "service":"CoreJourneyPlanService",
				"methodName":"fetchAllJourneyDetailsTS"
			} 	
		/*{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strDriverCodeFrom","strDriverCodeTo","strDriverName","str3plOwnerName","strDriverType","strLicenceType"],
			    "service":"CoreDriveService",
				"methodName":"fetchAllDriverDetailsTS"
			}*/
			
		];
		mainpage.hlpLinks=
		{
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
			"journeyPlan":
				{
					"dest":"journey_management.JourneyPlan",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"JOURNEY_PLAN_NO","dest":"strJourneyPlanNo"}
							]
				},
				"jms_resourcemapping":
				{
					"dest":"journey_management.JourneyResourceMapping",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"journeyPlanScr":
				{
					"dest":"journey_management.JourneyPlan",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"JOURNEY_PLAN_NO","dest":"strJourneyPlanNo"}
							]
				},
				
				"journeyPlanUpdate":
				{
					"dest":"journey_management.JourneyPlanUpdate",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"JOURNEY_PLAN_NO","dest":"strJourneyPlanNo"}
							]
				},
				
				"journeyPlanReplan":
				{
					"dest":"journey_management.JourneyPlanReplan",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"JOURNEY_PLAN_NO","dest":"strJourneyPlanNo"}
							]
				},
				
				"journeyPlanRecreate":
				{
					"dest":"journey_management.JourneyPlanRecreate",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"JOURNEY_PLAN_NO","dest":"strOldJourneyPlanNo"}
							]
				},
				"jms_journeyplanmain":
				{
					"dest":"journey_management.JourneyPlan",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
				/*,				
				"maplink":
				{
					"dest":"ivms.RouteMap",
					"hdr":[
							{"src":"","dest":""}
							],
					"grid":[
							{"src":"JOURNEY_PLAN_NO","dest":"routeViewer_JPNo"},
							{"src":"TRUCK_CODE","dest":"routeViewer_VehicleNo"}
							]
				}
				*/
				
		}
		mainpage.gridPopupLinks=
		{
			"maplink":
			{
				"dest":"ivms.RouteMap",
					"hdr":[
							{"src":"","dest":""}
							],
					"grid":[
							{"src":"JOURNEY_PLAN_NO","dest":"routeViewer_JPNo"},
							{"src":"TRUCK_CODE","dest":"routeViewer_VehicleNo"}
							]
			}
		}
		
		this.callParent(arguments);
		
	}
});
