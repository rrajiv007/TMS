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
Ext.define('CueTrans.view.peoplelogistics.TravelRequest', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Travel Request";
		mainpage.liveScreenFlag=true;
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [
			{
                "name": "Create",
                "tooltip": "Click here to create travel request."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit travel request."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete travel request."
            },
            {
                "name": "Confirm",
                "tooltip": "Click here to confirm travel request."
            }
			/*{
                "name": "Amend",
                "tooltip": "Click here to amend travel request."
            },
			{
                "name": "Shortclose",
                "tooltip": "Click here to shortclose travel request."
            }*/
            ]
			
		mainpage.toolbarLinks=
		[

			{"name":"Reschedule Travel Request","linkid":"rescheduleTravelRequest","tooltip":"Click here to reschedule travel request."},
			
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
     		plf.addDate({"label":"Travel Request Date",id:"dtTravelReqDate",inputFormat:"string",InputLength:"100","mandatory":"true"}),
			plf.addCombo({"label":"Purpose","id":"strPurpose","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),			
			plf.addHlpText({"label":"Traveller Code",id:"strTravellerCode","mandatory":"true",hlpLinkID:"TravellerCode"},this),
			plf.addDisplayOnly({"label":"Traveller Name","id":"strTravellerName"}),			
			plf.addDisplayOnly({"label":"Traveller Type",id:"strTravellerType"}),
			plf.addDisplayOnly({"label":"Grade",id:"strGrade"}),
			plf.addCombo({"label":"Starting Location",id:"strOrigin","mandatory":"true"},this),
			plf.addCombo({"label":"Destination Location",id:"strDestination","mandatory":"true"},this),
			plf.addDateTime({"label":"Reporting Date/Time",dateid:"dtReportDate",timeid:"tmReportTime","mandatory":"true"}),			
			plf.addDateTime({"label":"Return Date/Time",dateid:"dtReturnDate",timeid:"tmReturnTime","mandatory":"true"}),
			plf.addCombo({"label":"Travel Type",id:"strTravelType","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Approver Name","id":"strApproverName"}),
			plf.addText({"label":"Project Code",id:"strProjectCode","mandatory":"true"}),
			plf.addText({"label":"Project Description","id":"strProjectDesc","mandatory":"true"}),
			plf.addCombo({"label":"Meal Preference","id":"strMealPreference","mandatory":"true"}),
			plf.addText({"label":"Remarks",id:"strRemarks"}),
			plf.addCombo({"label":"Amendment No",id:"iAmendmentNo"}),
			
		
		]
		
		travelRequestColumn.add(travelrequestFormCtrl);
		
		//Travel Request Grid Section Begins
		var trvelRequestDetailsGridFieldObj=
		[
			{columnname:"Location",dataname:"LOCATION",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Date",dataname:"DATE",datatype:"string",editControl:"date",width:150},
			{columnname:"Time",dataname:"TIME",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Stay Duration (Days)",dataname:"DAYS",datatype:"string",width:150,editControl:"textbox"}			
		]
		var travelRequestDetailsGridDtl=
		{
			title:"",
			id:"travelRequest",
			detail:trvelRequestDetailsGridFieldObj,
			widthBasis:"flex",
			visibleRow:5
		}
		var traReqDtl =  plf.addCollapseSection({title:"Multi Leg Travel",collapsed:true})
		var travelRequestDetailsGridSection = plf.addGrid(travelRequestDetailsGridDtl,this)
		traReqDtl.add(travelRequestDetailsGridSection)
		
		var travelDetailsMapGridFieldObj=
		[
			{columnname:"Start Date",dataname:"START_DATE",datatype:"string",width:100},
			{columnname:"Starting Location",dataname:"START_LOC",datatype:"string",width:150},
			{columnname:"Destination Location",dataname:"DEST_LOC",datatype:"string",width:150},
			{columnname:"Departure Time",dataname:"DEPARTURE_TIME",datatype:"string",width:150},
			{columnname:"Arrival Time",dataname:"ARRIVAl_TIME",datatype:"string",width:160},
			{columnname:"End Date",dataname:"END_DATE",datatype:"date",width:160},
			{columnname:"Mode of Transport",dataname:"VEHICLE_TYPE",datatype:"string",width:160},
			{columnname:"Ticket No",dataname:"TKT_DETAIL",datatype:"string",width:160},
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
		
		var trvelRequestAppGridFieldObj=
		[
			//{columnname:"Designation",dataname:"DESIGNATION",datatype:"string",width:100},
			{columnname:"Name",dataname:"NAME",datatype:"string",width:150},
			{columnname:"Date",dataname:"DATE",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:150}			
		]
		var travelRequestAppGridDtl=
		{
			title:"",
			id:"travelRequestApp",
			detail:trvelRequestAppGridFieldObj,
			widthBasis:"flex",
			readonly:"true",
			visibleRow:5,
			removeTbar:true
		}
		var traReqAppDtl =  plf.addCollapseSection({title:"Approval History",collapsed:false})
		var travelRequestAppGridSection = plf.addGrid(travelRequestAppGridDtl,this)
		traReqAppDtl.add(travelRequestAppGridSection)
		
		//Add Child Sections
		mainpage.ptrMainSection.add(travelRequestColumn) //Add Grid Section to Main Page
		mainpage.ptrMainSection.add(traReqDtl)
		mainpage.ptrMainSection.add(travelDetailDtl)
		mainpage.ptrMainSection.add(traReqAppDtl)
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		mainpage.eventHandlers = 
			[	
				{
					"controlid":"",
					"tasktype":"onload",
					"input":["strTravelRequestNo"],
					"service":"PPLCoreTS",
					"methodName":"initTravelRequestTS"
				},
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strTravelRequestNo","dtTravelReqDate","strPurpose","strStatus","strTravellerCode","strTravellerName",
						"strTravellerType","strTravelType","strApproverName","strOrigin","strDestination","strProjectCode",
						"strProjectDesc","dtReportDate","dtReturnDate","strRemarks","travelRequest","travelDetail",
						"tmReportTime","tmReturnTime","strMealPreference","strGrade"],
				"service":"PPLCoreTS",
				"methodName":"createTravelRequestTS"
				},
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strTravelRequestNo","dtTravelReqDate","strPurpose","strStatus","strTravellerCode","strTravellerName",
						"strTravellerType","strTravelType","strApproverName","strOrigin","strDestination","strProjectCode",
						"strProjectDesc","dtReportDate","dtReturnDate","strRemarks","travelRequest","travelDetail",
						"tmReportTime","tmReturnTime","strMealPreference","strGrade"],
				"service":"PPLCoreTS",
				"methodName":"editTravelRequestTS"
				},
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strTravelRequestNo","dtTravelReqDate","strPurpose","strStatus","strTravellerCode","strTravellerName",
						"strTravellerType","strTravelType","strApproverName","strOrigin","strDestination","strProjectCode",
						"strProjectDesc","dtReportDate","dtReturnDate","strRemarks","travelRequest","travelDetail",
						"tmReportTime","tmReturnTime","strMealPreference","strGrade"],
				"service":"PPLCoreTS",
				"methodName":"deleteTravelRequestTS"
				},
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["strTravelRequestNo","dtTravelReqDate","strPurpose","strStatus","strTravellerCode","strTravellerName",
						"strTravellerType","strTravelType","strApproverName","strOrigin","strDestination","strProjectCode",
						"strProjectDesc","dtReportDate","dtReturnDate","strRemarks","travelRequest","travelDetail","strGrade"],
				"service":"PPLCoreTS",
				"methodName":"confirmTravelRequestTS"
				},
			{
				"controlid":"strTravellerCode",
				"tasktype":"onenter",
				"input":["strTravellerCode"],
				"service":"PPLCoreMasterTS",
				"methodName":"fetchTravellerCodeTS"
			},
			{
				"controlid":"strTravelRequestNo",
				"tasktype":"onenter",
				"input":["strTravelRequestNo"],
				"service":"PPLCoreTS",
				"methodName":"fetchTravellerReqTS"
			}
				/*
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Amend",
				"input":["strTravelRequestNo","dtTravelReqDate","strPurpose","strStatus","strTravellerCode","strTravellerName",
						"strTravellerType","strTravelType","strApproverName","strOrigin","strDestination","strProjectCode",
						"strProjectDesc","dtReportDate","dtReturnDate","strRemarks","travelRequest","travelDetail",
						"tmReportTime","tmReturnTime","strMealPreference"],
				"service":"PPLCoreTS",
				"methodName":"amendTravelRequestTS"
				},
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Shortclose",
				"input":["strTravelRequestNo","dtTravelReqDate","strPurpose","strStatus","strTravellerCode","strTravellerName",
						"strTravellerType","strTravelType","strApproverName","strOrigin","strDestination","strProjectCode",
						"strProjectDesc","dtReportDate","dtReturnDate","strRemarks","travelRequest","travelDetail",
						"tmReportTime","tmReturnTime","strMealPreference"],
				"service":"PPLCoreTS",
				"methodName":"shortTravelRequestTS"
				} 
				*/
			];		
		mainpage.hlpLinks=
		{
			"TravelRequestNo":
				{
					"hlpType":"Header",
					"hlpScreen":"peoplelogistics.TravelRequestHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTravelRequestNo","child":"TRAVEL_REQ_NO"}
							]
				},
			
			"TravellerCode":
				{
					"hlpType":"Header",
					"hlpScreen":"peoplelogistics.EmployeeHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTravellerCode","child":"TRAVELLER_CODE"}
							]
				},
				"StartingLoc":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""},
						   ],
					"receive":[
							{"parent":"strOrigin","child":"LOC_CODE"}
							]
				},
				"DestinationLoc":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""},
						   ],
					"receive":[
							{"parent":"strOrigin","child":"LOC_CODE"}
							]
				}
				
			
		}
		
		mainpage.screenLinks=
		{
			"rescheduleTravelRequest":
				{
					"dest":"peoplelogistics.RescheduleTravelRequest",
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
