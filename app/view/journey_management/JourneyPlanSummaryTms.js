/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.7															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1  Manibharathi		      05/02/2016     69997                     Addition of var  
1.0.2  Yeshwanth			  21/02/2016     67690                     Resource Mapping  		                                   
1.0.3  Yeshwanth			  21/02/2016     69944                     Ref Doc No 	
1.0.4  Raj			          12/05/2016     72440                     Commented Request No since it is duplicating 
1.0.5  Raj                    23/06/2016     73148                     Provision to print the inspection report and waybill from Journey plan Summary    
1.0.6  Mohammed Razhith.S.A   17/07/2016     73363                     Removing JP Report Icon     
1.0.7  Gokilapriya.R          29/08/2016     74057                     Add one new column                   
1.0.8  Vidhya P               16/09/2016     74329                     Rearrange of Grid Column and added Release Date.                  
1.0.9  Raj                    05/12/2016     74797
1.0.10 Raj                    20/12/2016     75082                      Added reporting vehicle and driver details
************************************************************************************************/
Ext.define('CueTrans.view.journey_management.JourneyPlanSummaryTms', 
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
			/*{"name":"Create New Journey Plan","linkid":"jms_journeyplanmain","tooltip":"Click here to create a new journey plan."},*/
			{"name":"Journey Resource Mapping","linkid":"jms_resourcemapping","tooltip":"Click here to launch journey resource mapping screen."}
            //{"name":"Amend Journey Plan ","linkid":"Amend_JP","tooltip":"Click here to launch the Amend Journey Plan screen."}
		]
		
		//mainpage.ptrMainSection.add(jpSummary)
		//Journey Search Section Begins
		plf.columns=4
		var helpOnJourneyHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);	//69997
	 	var helpOnJourneyFormCtrl=												//69997
		[
			plf.addText({"label":"Journey Plan No",id:"strJourneyPlanNoFrom"}),
			plf.addHlpText({"label":"Inspection No",id:"strInspectionNo",hlpLinkID:"inspectionno"},this),	
			plf.addHlpText({"label":"Load No",id:"strLoadNo",hlpLinkID:"LoadNo"},this),	
			plf.addCombo({"label":"Status",id:"strStatus"}),			
			plf.addCombo({"label":"Date Type",id:"strDateType"}),	
			plf.addDate({"label":"Date From",id:"dtJourneyDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtJourneyDateTo"}),
			plf.addHlpText({"label":"Journey Manager",id:"strJourneyManager",hlpLinkID:"journeyManagerCode"},this),			
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addComboWithoutStore({"label":"Destination",id:"strDestination",storeId:"strOrigin"}),
			//plf.addCombo({"label":"Destination",id:"strDestination"}),			
			//plf.addHlpText({"label":"Scheduled Vehicle Code",id:"strTruckCode",hlpLinkID:"truckCode"},this),
			plf.addHlpText({"label":"Scheduled Vehicle",id:"strTruckCode",hlpLinkID:"truckCode"},this),
			plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory"}),
			plf.addHlpText({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"carrierno"},this),
			plf.addHlpText({"label":"Driver Code",id:"strDriverCode",hlpLinkID:"drivercode"},this),
                     plf.addText({"label":"Driver Licence No",id:"strLicenceNo"}),
			plf.addText({"label":"Driver Mobile No",id:"strMobileNo"}),
			plf.addText({"label":"Ref Doc No",id:"strDocNo"}),	//69944//Vidhya
			plf.addText({"label":"Trip No",id:"strTripNo"}),
			plf.addHlpText({"label":"Reporting Vehicle",id:"strReportingVehicle",hlpLinkID:"reptruckCode"},this),
			//plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."}),
		]
		
		helpOnJourneyHdrCollapse.add(helpOnJourneyFormCtrl);
		//Journey Search Section Ends
		
		//Journey Grid Section Begins
		var helpOnJourneyGridFieldObj=										//69997
		[
                     {columnname:"Print WayBill",dataname:"WAYBILL",datatype:"string",width:130,gridReport:"PrintWaybill",imageURL:"resources/images/shared/calendar.gif",tooltip:"Click here to print waybill."},
                     {columnname:"Inspection WayBill",dataname:"INSPECTIONVECH",datatype:"string",width:130,gridReport:"PrintInspectionVech",imageURL:"resources/images/grid/Journey/Grid_Replan.png",tooltip:"Click here to print inspection report."},
					 {columnname:"Click here to launch the journey plan screen.",dataname:"JP_LINK_ID",width:70,linkId:"journeyPlanScr",imageURL:"resources/images/grid/Journey/Grid_Re_Create.png"},
		             {columnname:"Click here to launch the journey plan update screen.",dataname:"JPU_LINK_ID",width:70,linkId:"journeyPlanUpdate",imageURL:"resources/images/grid/Journey/Grid_Update.png"}, 
					 {columnname:"MAP",dataname:"MAP",datatype:"string",width:100,linkId:"maplink",gridpopup:true,tooltip:"Click here to view map.",imageURL:"resources/images/grid/Journey/Grid_Journey_Plan.png"},
           //73363
		   /*{columnname:"Journey WayBill",dataname:"JOURNEYREPORT",datatype:"string",width:130,gridReport:"PrintJourneyReport",imageURL:"resources/images/grid/hmenu-desc.gif",tooltip:"Click here to print JP report."}, */			
                   
                     //{columnname:"Click here to launch the journey plan replan screen.",dataname:"JPR_LINK_ID",width:70,linkId:"journeyPlanReplan",imageURL:"resources/images/grid/Journey/Grid_Replan.png"},
                     //{columnname:"Click here to launch the journey plan recreate screen.",dataname:"JPRC_LINK_ID",width:70,linkId:"journeyPlanRecreate",imageURL:"resources/images/grid/Journey/Grid_Re_Create.png"},
			
			{columnname:"Journey Plan No",dataname:"JOURNEY_PLAN_NO",datatype:"string",linkId:"NEXT_LINKID","linkType":"DYN","tooltip":"Click here to launch the journey plan details.",width:"auto"},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:80},
			{columnname:"Link ID",dataname:"NEXT_LINKID",width:100,hidden:true},
			{columnname:"Journey Plan Date",dataname:"JOURNEY_PLAN_DT",datatype:"string",width:120},
			
			//{columnname:"Vehicle",dataname:"TRUCK_CODE",datatype:"string",width:100},//Raj
			{columnname:"Scheduled Vehicle",dataname:"TRUCK_CODE",datatype:"string",width:110},//Raj
			{columnname:"Reporting Vehicle",dataname:"REPORTING_VEHICLE",datatype:"string",width:110},//Raj
			
			{columnname:"Scheduled Trailer",dataname:"SCHEDULED_TRAILER",datatype:"string",width:110},
			{columnname:"Reporting Trailer",dataname:"REPORTING_TRAILER",datatype:"string",width:110},
			
			{columnname:"Load Description",dataname:"LOAD_DESCRIPTION",datatype:"string",width:150},
			{columnname:"Loading Point",dataname:"LOAD_AT",datatype:"string",width:150},
			{columnname:"Unloading Point",dataname:"DELIVERY_AT",datatype:"string",width:150},
			{columnname:"Load No",dataname:"WAYBILL_NO",datatype:"string",width:110},
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:130},
			//{columnname:"Request No",dataname:"REQUEST_NO",datatype:"string",width:110},//Vidhya
			//{columnname:"Journey Plan date",dataname:"JOURNEY_PLAN_DATE",datatype:"string",width:80},
			{columnname:"Origin",dataname:"ROUTE_ORIGIN",datatype:"string",width:100},
			{columnname:"Destination",dataname:"ROUTE_DEST",datatype:"string",width:100},
			{columnname:"Inspection No",dataname:"INSPECTION_NO",datatype:"string",width:110},
			{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:80},
			{columnname:"Carrier",dataname:"CARRIER_CODE",datatype:"string",width:100},            
            //{columnname:"Driver",dataname:"DRIVER_CODE",datatype:"string",width:100},//Raj
			{columnname:"Scheduled Driver",dataname:"DRIVER_CODE",datatype:"string",width:110},//Raj
            //{columnname:"Phone No",dataname:"PHONE_NO",datatype:"string",width:100,colAlign:'center'},//Raj
			{columnname:"Scheduled Driver Ph.No",dataname:"PHONE_NO",datatype:"string",width:145,colAlign:'center'},//Raj
			
			{columnname:"Reporting Driver Code",dataname:"REPORTING_DRIVER",datatype:"string",width:140},
			{columnname:"Reporting Driver",dataname:"REPORTING_DRIVER_NAME",datatype:"string",width:110},//Raj
			{columnname:"Reporting Driver Ph.No",dataname:"REP_PHONE_NO",datatype:"string",width:145,colAlign:'center'},//Raj
            {columnname:"Journey Mgr Name",dataname:"EMPLOYEE_NAME",datatype:"string",width:"auto"},
			{columnname:"Departed Date",dataname:"DEPARTURE_DATE",datatype:"string",width:110},
			//{columnname:"Delivered Date",dataname:"DELIVERED_DATE",datatype:"string",width:110},//Vidhya
			{columnname:"JP Closed Date",dataname:"CLOSURE_DATE",datatype:"string",width:110},
			{columnname:"JP Closed By",dataname:"CLOSURE_BY",datatype:"string",width:110},
			{columnname:"Truck Release Date",dataname:"RELEASED_DATE",datatype:"string",width:110},//Vidhya
			{columnname:"Truck Release By",dataname:"RELEASED_BY",datatype:"string",width:110},
			{columnname:"No of Violations",dataname:"NO_OF_VIOLATIONS",datatype:"string",width:110,colAlign:'center'},
			{columnname:"Journey Distance",dataname:"JOURNEY_DISTANCE",datatype:"string",width:130,colAlign:'center'},
                     
                     {columnname:"Load No",dataname:"strLoadNo",datatype:"string",width:130,hidden:true}, //73148
                     {columnname:"Inspection No",dataname:"strInspectionNo",datatype:"string",width:130,hidden:true},//73148
                     {columnname:"Journey Plan No",dataname:"strJourneyPlanNo",datatype:"string",width:130,hidden:true}//73148
			
	        
           
                     

                                          
			//{columnname:"Request No",dataname:"REQUEST_NO",datatype:"string",width:110},	//69944
						//69944
			//{columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",width:110},
			
			
		]
		var helpOnJourneyGridDtl=								//69997
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
				"input":["strTripNo","strJourneyPlanNoFrom","dtJourneyDateFrom","dtJourneyDateTo","strDriverCode","strTruckCode","strStatus","strInspectionNo",
				"strLoadNo","strJourneyManager","strOrigin","strDestination","strVehicleCategory","strCarrierCode","strLicenceNo","strMobileNo","strDriverCode","strDateType","strDocNo","strReportingVehicle"],
				"service":"CoreJourneyPlanService",
				"methodName":"initJourneyPlanSummaryTS"
			},			
		{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strTripNo","strJourneyPlanNoFrom","dtJourneyDateFrom","dtJourneyDateTo","strDriverCode","strTruckCode","strStatus","strInspectionNo",
				"strLoadNo","strJourneyManager","strOrigin","strDestination","strVehicleCategory","strCarrierCode","strLicenceNo","strMobileNo","strDriverCode","strDateType","strDocNo","strReportingVehicle"],
			    "service":"CoreJourneyPlanService",
				"methodName":"fetchAllJourneyDetailsTS"
			},
		/*{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strDriverCodeFrom","strDriverCodeTo","strDriverName","str3plOwnerName","strDriverType","strLicenceType"],
			    "service":"CoreDriveService",
				"methodName":"fetchAllDriverDetailsTS"
			}*/
              {
				"grideventid":"PrintWaybill",
				"tasktype":"gridonprint",
				"input":["strLoadNo"],
				"service":"CoreReportService",
				"methodName":"PrintwaybillloadingReport"
			},
            			{
			       "grideventid":"PrintInspectionVech",
				"tasktype":"gridonprint",
				"input":["strInspectionNo","strInspectionType"],
				"service":"CoreReportService",
				"methodName":"PrintVehicleInspectReport"
			}
              //73363
			  /*      {
			       "grideventid":"PrintJourneyReport",
				"tasktype":"gridonprint",
				"input":["strJourneyPlanNo"],
				"service":"CoreReportService",
				"methodName":"PrintJourneyPlanReport"
			}

			*/
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
				"reptruckCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strReportingVehicle","child":"TRUCK_CODE"}							
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
					"dest":"journey_management.JourneyPlanTms",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"JOURNEY_PLAN_NO","dest":"strJourneyPlanNo"}
							]
				},
				"journeyPlanScr":
				{
					"dest":"journey_management.JourneyPlanTms",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"JOURNEY_PLAN_NO","dest":"strJourneyPlanNo"}
							]
				},
				
				"journeyPlanUpdate":
				{
					"dest":"journey_management.JourneyPlanUpdateTms",
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
					"dest":"journey_management.JourneyPlanTms",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},//67690
				"jms_resourcemapping":
				{
					"dest":"journey_management.JourneyResourceMapping",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},//67690
                            "Amend_JP":
				{
					"dest":"tms.AmendJPDetails",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
				
                     
                          }
		mainpage.gridPopupLinks=
		{
			"maplink":
			{
				//"dest":"ivms.RouteMap",
				"dest":"ivms.ivmspopup",
					"hdr":[
							{"src":"","dest":""}
							],
					"grid":[
							{"src":"JOURNEY_PLAN_NO","dest":"strDocNo"}
							//{"src":"TRUCK_CODE","dest":"routeViewer_VehicleNo"}
							]
			}
		}
		this.callParent(arguments);
		
	}
});
