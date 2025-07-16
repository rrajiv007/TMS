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
Ext.define('CueTrans.view.peoplelogistics.CheckInCheckOut', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "CheckIn CheckOut";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		//mainpage.liveScreenFlag=false;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "CheckIn",
                "tooltip": "Click here to checkin traveller."
            },
			{
                "name": "CheckOut",
                "tooltip": "Click here to checkout traveller."
            }
            ]
		
		//Add Keyfields
		mainpage.keyFields=["strCheckInCheckOut"]
		
		//CheckinCheckout Header Section Begins
		plf.columns=4
		var CheckInCheckOutColumn = plf.addColumnSection({});
		var CheckInCheckOutCtrl=
		[
			plf.addHlpText({"label":"Accommodation No",id:"strAccRequestNo",hlpLinkID:"accomrequestno",inputFormat:"string",InputLength:"100"},this),
			plf.addDisplayOnly({"label":"Travel Request No","id":"strTravelRequestNo"}),
			plf.addDisplayOnly({"label":"Work Location",id:"strWorkLocation"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addDisplayOnly({"label":"Request Date",id:"dtTranDate"}),
			plf.addDisplayOnly({"label":"Purpose","id":"strPurpose"}),
			plf.addDisplayOnly({"label":"Date From",id:"dtAccDtFrom"}),
			plf.addDisplayOnly({"label":"Date To",id:"dtAccDtTo"}),
			plf.addDisplayOnly({"label":"Approver Name",id:"strApproverName",inputFormat:"string",InputLength:"100"})
				
		]
		CheckInCheckOutColumn.add(CheckInCheckOutCtrl);
		
		//Traveller Header Section Begins
		plf.columns=4
		var TravellerColumn = plf.addColumnSection({});
		var TravellerColumnCtrl=
		[
			plf.addDisplayOnly({"label":"Traveller Code",id:"strTravellerCode"}),
			plf.addDisplayOnly({"label":"Traveller Name",id:"strTravellerName",inputFormat:"string",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Traveller Type",id:"strTravellerType"}),
			plf.addDisplayOnly({"label":"Grade",id:"strGrade"}),
			plf.addDisplayOnly({"label":"Gender",id:"strGender"}),
			plf.addDisplayOnly({"label":"Phone 1",id:"strPhone1"}),
			plf.addDisplayOnly({"label":"Phone 2",id:"strPhone2"}),
			plf.addDisplayOnly({"label":"Email",id:"strEmail"})
			//plf.addText({"label":"Remarks",id:"strRemarks"}),
			//plf.addDisplayOnly({"label":"Approver Name",id:"strApproverName",inputFormat:"string",InputLength:"100"})
				
		]
		TravellerColumn.add(TravellerColumnCtrl);
		
		//Traveller Header Section Begins
		plf.columns=4
		var CheckInCheckOutTimeColumn = plf.addColumnSection({});
		var CheckInCheckOutTimeCtrl=
		[
			plf.addDateTime({"label":"CheckIn Date/Time",dateid:"dtCheckInDate",timeid:"tmCheckInTime"}),			
			plf.addDateTime({"label":"CheckOut Date/Time",dateid:"dtCheckOutDate",timeid:"tmCheckOutTime"}),
			plf.addText({"label":"Remarks",id:"strRemarks"})
			//plf.addDisplayOnly({"label":"Approver Name",id:"strApproverName",inputFormat:"string",InputLength:"100"})
				
		]
		CheckInCheckOutTimeColumn.add(CheckInCheckOutTimeCtrl);
				
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		mainpage.ptrMainSection.add(CheckInCheckOutColumn)//add hdr1 details
		mainpage.ptrMainSection.add(TravellerColumn)//add hdr2 details
		mainpage.ptrMainSection.add(CheckInCheckOutTimeColumn)//add hdr3 details
		//mainpage.ptrMainSection.add(AccomodationrequestGridSection)//Add Grid Section to Main Page
		mainpage.eventHandlers = 
		[	
				
        {
				"controlid":"",
				"tasktype":"onload",
				"input":["strAccRequestNo"],
				"service":"PPLCoreTS",
				"methodName":"initAccRequestTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strAccRequestNo","dtTranDate","strStatus",
				         "strWorkLocation","strTravellerCode","dtAccDtFrom","dtAccDtTo",
						 "strPurpose","strRemarks"
				],
				"service":"PPLCoreTS",
				"methodName":"insertAccomodationReq"
	
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strAccRequestNo","strTravelRequestNo","dtTranDate","strStatus",
				         "strWorkLocation","strTravellerCode","strTravellerName","strTravellerType",
						 "strGrade","strGender","dtAccDtFrom","dtAccDtTo","strPurpose","strRemarks","strApproverName"
				],
				"service":"PPLCoreTS",
				"methodName":"editAccREQTS"
			},
			
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strAccRequestNo","strTravelRequestNo","dtTranDate","strStatus",
				         "strWorkLocation","strTravellerCode","strTravellerName","strTravellerType",
						 "strGrade","strGender","dtAccDtFrom","dtAccDtTo","strPurpose","strRemarks","strApproverName"
				],
				"service":"PPLCoreTS",
				"methodName":"deleteAccREQTS"
			},
			
			{
					"controlid":"strAccRequestNo",
					"tasktype":"onenter",
					"input":["strAccRequestNo"],
					"service":"PPLCoreTS",
					"methodName":"fetchAccREQTS"
			},	
			
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Approve",
				"input":["strAccRequestNo","strTravelRequestNo","dtTranDate","strStatus",
				         "strWorkLocation","strTravellerCode","strTravellerName","strTravellerType",
						 "strGrade","strGender","dtAccDtFrom","dtAccDtTo","strPurpose","strRemarks","strApproverName"
						 ],
				"service":"PPLCoreTS",
				"methodName":"ApproveACCREQTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["strAccRequestNo","strTravelRequestNo","dtTranDate","strStatus",
				         "strWorkLocation","strTravellerCode","strTravellerName","strTravellerType",
						 "strGrade","strGender","dtAccDtFrom","dtAccDtTo","strPurpose","strRemarks","strApproverName"
				],
				"service":"PPLCoreTS",
				"methodName":"confirmAccREQTS"
			},
			{
					"controlid":"strAccRequestNo",
					"tasktype":"onenter",
					"input":["strAccRequestNo"],
					"service":"PPLCoreTS",
					"methodName":"initAccRequestTS"
				},
					
					
				
		];
		// Event Handlers Mapping Begins
		/*
		//Event Handlers Mapping Ends
		
		//Generate Screen Section
		//mainpage.generateScreen();
		
		mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":[]
			},
			"locked":
			{
				"enableAll":true,
				"except":["strEmployeeName"]
			},
			"active":
			{
				"enableAll":true,
				"except":["strEmployeeName"]
			}			
		}*/
		
		
		mainpage.hlpLinks=
		{
			"accomrequestno":
				{
					"hlpType":"Header",
					"hlpScreen":"peoplelogistics.AccommodationRequestHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strAccRequestNo","child":"ACC_REQUEST_NO"}
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
				}
			
		}
		/*Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
			
	}
});
