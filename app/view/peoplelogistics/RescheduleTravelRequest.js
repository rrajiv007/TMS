/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
		                                   
************************************************************************************************/
Ext.define('CueTrans.view.peoplelogistics.RescheduleTravelRequest', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Reschedule Travel Request";
		mainpage.liveScreenFlag=true;
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [
			{
                "name": "Edit",
                "tooltip": "Click here to edit travel request."
            },
         	{
                "name": "Amend",
                "tooltip": "Click here to amend travel request."
            },
			{
                "name": "Confirm",
                "tooltip": "Click here to confirm travel request."
            }
			/*{
                "name": "Shortclose",
                "tooltip": "Click here to shortclose travel request."
            }*/
            ]
			
		mainpage.toolbarLinks=
		[

			{"name":"Travel Request","linkid":"TravelRequest","tooltip":"Click here to launch travel request."},
			
		]
		
		//Add Keyfields
		mainpage.keyFields=["strTravelRequestNo"]
		//truckQrCodeSection = plf.addColumnSection({});
		//Vehicle Master Header Section starts
		plf.columns=4
		var travelRequestColumn = plf.addColumnSection({});

		var travelrequestFormCtrl=
		[
 	        plf.addHlpText({"label":"Travel Request No",id:"strTravelRequestNo",hlpLinkID:"TravelRequestNo",inputFormat:"string",InputLength:"40"},this),	
     		plf.addDisplayOnly({"label":"Travel Request Date",id:"dtTravelReqDate"}),
			plf.addDisplayOnly({"label":"Purpose","id":"strPurpose"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),			
			plf.addDisplayOnly({"label":"Traveller Code",id:"strTravellerCode"}),
			plf.addDisplayOnly({"label":"Traveller Name","id":"strTravellerName"}),			
			plf.addDisplayOnly({"label":"Traveller Type",id:"strTravellerType"}),
			plf.addDisplayOnly({"label":"Grade",id:"strGrade"}),
			plf.addDisplayOnly({"label":"Starting Location",id:"strOrigin"}),
			plf.addDisplayOnly({"label":"Destination Location",id:"strDestination"}),
			plf.addDisplayOnly({"label":"Reporting Date/Time","id":"dtReportDateTime"}),			
			plf.addDisplayOnly({"label":"Return Date/Time",id:"dtReturnDateTime"}),
			plf.addDisplayOnly({"label":"Travel Type",id:"strTravelType"}),
			plf.addDisplayOnly({"label":"Approver Name","id":"strApproverName"}),
			plf.addDisplayOnly({"label":"Project Code",id:"strProjectCode"}),
			plf.addDisplayOnly({"label":"Project Description","id":"strProjectDesc"}),
			plf.addDisplayOnly({"label":"Meal Preference","id":"strMealPreference"}),
			plf.addDisplayOnly({"label":"Remarks",id:"strRemarks"}),
			
		
		]
		
		travelRequestColumn.add(travelrequestFormCtrl);
		
		//Travel Request Grid Section Begins
		var trvelRequestDetailsGridFieldObj=
		[
			{columnname:"Location",dataname:"LOCATION",datatype:"string",width:200},
			{columnname:"Date",dataname:"DATE",datatype:"string",width:200},
			{columnname:"Time",dataname:"TIME",datatype:"string",width:200},
			{columnname:"Stay Duration (Days)",dataname:"DAYS",datatype:"string",width:200}			
		]
		var travelRequestDetailsGridDtl=
		{
			title:"Multi Leg Travel",
			id:"travelRequest",
			detail:trvelRequestDetailsGridFieldObj,
			widthBasis:"flex",
			visibleRow:5
		}
		var traReqDtl =  plf.addCollapseSection({title:"Multi Leg Travel",collapsed:true})
		var travelRequestDetailsGridSection = plf.addGrid(travelRequestDetailsGridDtl,this)
		traReqDtl.add(travelRequestDetailsGridSection)
		
		//Travel Request Grid Amend Section
		plf.columns=4
		var travelRequestAmendColumn = plf.addColumnSection({});

		var travelrequestAmendCtrl=
		[
 	        //plf.addHlpText({"label":"Travel Request No",id:"strTravelRequestNo",hlpLinkID:"TravelRequestNo",inputFormat:"string",InputLength:"40"},this),
			plf.addDateTime({"label":"New Report Date/Time",dateid:"dtNewReportDate",timeid:"tmNewReportTime"}),			
			plf.addDateTime({"label":"New Return Date/Time",dateid:"dtNewReturnDate",timeid:"tmNewReturnTime"}),
			plf.addCombo({"label":"Reason","id":"strReason"}),
			plf.addText({"label":"Reschedule Remarks",id:"strRescheduleRemarks"}),
			plf.addCombo({"label":"Amendment No",id:"iAmendmentNo"})
			
		
		]
		
		travelRequestAmendColumn.add(travelrequestAmendCtrl);
		
		var travelDetailsMapGridFieldObj=
		[
			{columnname:"Start Date",dataname:"START_DATE",datatype:"string",width:100},
			{columnname:"Starting Location",dataname:"START_LOC",datatype:"string",width:150},
			{columnname:"Destination Location",dataname:"DEST_LOC",datatype:"string",width:150},
			{columnname:"Departure Time",dataname:"DEPARTURE_TIME",datatype:"string",width:150},
			{columnname:"Arrival Time",dataname:"ARRIVAl_TIME",datatype:"string",width:160},
			{columnname:"End Date",dataname:"END_DATE",datatype:"date",width:160},
			{columnname:"Mode of Transport",dataname:"VEHICLE_TYPE",datatype:"string",width:160},
			{columnname:"Ticket Details",dataname:"TKT_DETAIL",datatype:"string",width:160},
			{columnname:"Accomodation Details",dataname:"ACC_DETAIL",datatype:"string",width:160}
			
		
		]
		var travelDetailMapGridDtl=
		{
			title:"",
			id:"travelDetail",
			detail:travelDetailsMapGridFieldObj,
			widthBasis:"flex",
			readonly:true,
			visibleRow:5,
			removeAddDelete:true,
			removeTbar:true
			
		}
			
		var travelDetailDtl =  plf.addCollapseSection({title:"Travel Itinerary",collapsed:false})
		var travelDetailMapGridSection = plf.addGrid(travelDetailMapGridDtl,this)
		travelDetailDtl.add(travelDetailMapGridSection)
		
		//Add Child Sections
		mainpage.ptrMainSection.add(travelRequestColumn) //Add Grid Section to Main Page
		mainpage.ptrMainSection.add(traReqDtl)
		mainpage.ptrMainSection.add(travelRequestAmendColumn)
		mainpage.ptrMainSection.add(travelDetailDtl)
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		mainpage.eventHandlers = 
			[	
				{
					"controlid":"",
					"tasktype":"onload",
					"input":["strTravelRequestNo"],
					"service":"PPLCoreTS",
					"methodName":"initRescheduleTravelRequestScrTS"  
				}
			/* {
				"controlid":"strTravelRequestNo",
				"tasktype":"onenter",
				"input":[""],
				"service":"PPLCoreTS",
				"methodName":"initRescheduleTravelRequestScrTS"
			}
				
				//initTransportReq
				
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strTravelRequestNo","dtTravelReqDate","strPurpose","strStatus","strTravellerCode","strTravellerName",
						"strTravellerType","strTravelType","strApproverName","strOrigin","strDestination","strProjectCode",
						"strProjectDesc","dtReportDate","dtReturnDate","strRemarks","travelRequest","travelDetail"],
				"service":"PPLCoreTS",
				"methodName":"createTravelRequestTS"
				},
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strTravelRequestNo","dtTravelReqDate","strPurpose","strStatus","strTravellerCode","strTravellerName",
						"strTravellerType","strTravelType","strApproverName","strOrigin","strDestination","strProjectCode",
						"strProjectDesc","dtReportDate","dtReturnDate","strRemarks","travelRequest","travelDetail"],
				"service":"PPLCoreTS",
				"methodName":"editTravelRequestTS"
				},
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strTravelRequestNo","dtTravelReqDate","strPurpose","strStatus","strTravellerCode","strTravellerName",
						"strTravellerType","strTravelType","strApproverName","strOrigin","strDestination","strProjectCode",
						"strProjectDesc","dtReportDate","dtReturnDate","strRemarks","travelRequest","travelDetail"],
				"service":"PPLCoreTS",
				"methodName":"deleteTravelRequestTS"
				},
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["strTravelRequestNo","dtTravelReqDate","strPurpose","strStatus","strTravellerCode","strTravellerName",
						"strTravellerType","strTravelType","strApproverName","strOrigin","strDestination","strProjectCode",
						"strProjectDesc","dtReportDate","dtReturnDate","strRemarks","travelRequest","travelDetail"],
				"service":"PPLCoreTS",
				"methodName":"confirmTravelRequestTS"
				},
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Amend",
				"input":["strTravelRequestNo","dtTravelReqDate","strPurpose","strStatus","strTravellerCode","strTravellerName",
						"strTravellerType","strTravelType","strApproverName","strOrigin","strDestination","strProjectCode",
						"strProjectDesc","dtReportDate","dtReturnDate","strRemarks","travelRequest","travelDetail"],
				"service":"PPLCoreTS",
				"methodName":"amendTravelRequestTS"
				},
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Shortclose",
				"input":["strTravelRequestNo","dtTravelReqDate","strPurpose","strStatus","strTravellerCode","strTravellerName",
						"strTravellerType","strTravelType","strApproverName","strOrigin","strDestination","strProjectCode",
						"strProjectDesc","dtReportDate","dtReturnDate","strRemarks","travelRequest","travelDetail"],
				"service":"PPLCoreTS",
				"methodName":"shortTravelRequestTS"
				}
				
				/*
				{
					"tasktype":"proto",
					"filename":"peoplelogistics/TravelRequest.json"
				} 
				*/
			];		
		mainpage.hlpLinks=
		{
		/*	
			"truckcode":
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
				"truckownercode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"CARRIER_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strTruckOwnerCode","child":"OWNER_CODE_3PL"}
							//{"parent":"strTruckOwnerName","child":"OWNER_NAME_3PL"},
							//{"parent":"3PLOwnerPhoneNo","child":"PHONE1"}
							]
				},
				"trailercode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTrailerCode","child":"TRUCK_CODE"},
							{"parent":"strTrailerDescription","child":"TRUCK_DESC"}
							]
				},
				
			"supplierCode":
				{
					"hlpType":"grid",
					"gridID":"ivmsGrid",
					"hlpScreen":"jm_master.SupplierHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					{"parent":"IVMS_VENDOR_CODE","child":"SUPPLIER_CODE"}
					//,{"parent":"CONSTRAINT_DESC","child":"CONSTRAINT_DESC"}
							]
				},
                      "baseloc":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"LOCATION_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strLocCode","child":"LOC_NAME"}
						    ]
				}
				
		*/		
		}
		
		mainpage.screenLinks=
		{
			"TravelRequest":
				{
					"dest":"peoplelogistics.TravelRequest",
				"hdr":[
						{"src":"strTravelRequestNo","dest":"strTravelRequestNo"}							
						],
				"grid":[
						{"src":"","dest":""}
						]
				}
		}

		
		/*
		//Screenmode setting starts
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
				"except":[]
			},
			"active":
			{
				"enableAll":false,
				"except":[]
			}			
		}

			//Screen Mode setting ends
		//Generate Screen Section
	//	mainpage.generateScreen();
		*/
		
	/*	Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
		
	}
});
