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
Ext.define('CueTrans.view.peoplelogistics.AccommodationRequest', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Accommodation Request";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		//mainpage.liveScreenFlag=false;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create accommodation request."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit accommodation request."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete accommodation request."
            },
            {
                "name": "Confirm",
                "tooltip": "Click here to confirm accommodation request."
            },
			{
                "name": "Approve",
                "tooltip": "Click here to approve accommodation request."
            }
            ]
		
		//Add Keyfields
		mainpage.keyFields=["strAccomodationRequestNo"]
		
		//EmployeeMaster Header Section Begins
		plf.columns=4
		var AccomodationRequestColumn = plf.addColumnSection({});
		var AccomodationRequestCtrl=
		[
			plf.addHlpText({"label":"Accommodation No",id:"strAccRequestNo",hlpLinkID:"accomrequestno",inputFormat:"string",InputLength:"100"},this),
			plf.addDisplayOnly({"label":"Travel Request No","id":"strTravelRequestNo"}),
			plf.addDate({"label":"Request Date",id:"dtTranDate","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus",inputFormat:"string",InputLength:"100"}),
			plf.addCombo({"label":"Work Location",id:"strWorkLocation","mandatory":"true"}),	
			plf.addHlpText({"label":"Traveller Code",id:"strTravellerCode","mandatory":"true",hlpLinkID:"TravellerCode",inputFormat:"string",InputLength:"100"},this),
			plf.addDisplayOnly({"label":"Traveller Name",id:"strTravellerName",inputFormat:"string",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Traveller Type",id:"strTravellerType"}),
			plf.addDisplayOnly({"label":"Grade",id:"strGrade"}),
			plf.addDisplayOnly({"label":"Gender",id:"strGender"}),
			//plf.addDisplayOnly({"label":"DOB",id:"strDob"}),
			//plf.addDisplayOnly({"label":"Age",id:"strAge"}),
			//plf.addDisplayOnly({"label":"Travel Type",id:"strTravelType"}),
			plf.addDate({"label":"Date From",id:"dtAccDtFrom","mandatory":"true"}),
			plf.addDate({"label":"Date To",id:"dtAccDtTo","mandatory":"true"}),
			plf.addCombo({"label":"Purpose","id":"strPurpose","mandatory":"true"}),
			//plf.addCombo({"label":"Meal Preference","id":"strMealPreference","mandatory":"true"}),
			plf.addText({"label":"Remarks",id:"strRemarks"}),
			plf.addDisplayOnly({"label":"Approver Name",id:"strApproverName",inputFormat:"string",InputLength:"100"}),
				
		]
		AccomodationRequestColumn.add(AccomodationRequestCtrl);
		//EmployeeMaster Header Section Ends
		
		var AccomodationRequestDtl=
		[   			
			{columnname:"Designation",dataname:"DESIGNATION",datatype:"string",storeId:"strDesignation",width:200},
			{columnname:"Name",dataname:"NAME",datatype:"string",width:150},
			{columnname:"Date",dataname:"DATE",datatype:"date",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:150},
		]
		var AccomodationRequestGridDtl=
		{
			title:"Approval History",
			id:"accomodationRequest",
			detail:AccomodationRequestDtl,
			readonly:"true",
			visibleRow:5
		}
		var AccomodationrequestGridSection = plf.addGrid(AccomodationRequestGridDtl,this)	
		mainpage.ptrMainSection.add(AccomodationRequestColumn)//Add Header Section to Main Page
		
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		
		// for green line
		//employeeMasterColumn.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(AccomodationRequestColumn)//add hdr details
		mainpage.ptrMainSection.add(AccomodationrequestGridSection)//Add Grid Section to Main Page
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
