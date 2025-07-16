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
Ext.define('CueTrans.view.peoplelogistics.TransportRequest', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Transport Request";
		mainpage.liveScreenFlag=true;
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [
			{
                "name": "Create",
                "tooltip": "Click here to create transport request."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit transport request."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete transport request."
            },
			{
                "name": "Confirm",
                "tooltip": "Click here to confirm transport request."
            },
            {
                "name": "Approve",
                "tooltip": "Click here to approve transport request."
            }
			
            ]
		
		//Add Keyfields
		mainpage.keyFields=["strTranRequestNo"]
		//truckQrCodeSection = plf.addColumnSection({});
		//Vehicle Master Header Section starts
		plf.columns=4
		var TransRequestColumn = plf.addColumnSection({});

		var TransrequestFormCtrl=
		[
 	        plf.addHlpText({"label":"Transport Req No",id:"strTranRequestNo",hlpLinkID:"TransRequestNo"},this),
			plf.addDisplayOnly({"label":"Travel Request No","id":"strTravelRequestNo"}),
			plf.addDate({"label":"Request Date",id:"dtTranDate","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),			
			plf.addHlpText({"label":"Traveller Code",id:"strTravellerCode",hlpLinkID:"TravellerCode","mandatory":"true"},this),
			plf.addDisplayOnly({"label":"Traveller Name","id":"strTravellerName"}),
			plf.addDisplayOnly({"label":"Traveller Type",id:"strTravellerType"}),
			plf.addDisplayOnly({"label":"Grade",id:"strGrade"}),
			plf.addDisplayOnly({"label":"Gender",id:"strGender"}),
			plf.addDateTime({"label":"Travel Date/Time",dateid:"dtTravelDate",timeid:"tmTravelTime","mandatory":"true"}),
			plf.addCombo({"label":"Pickup Location",id:"strOrigin","mandatory":"true"}),
			plf.addCombo({"label":"Drop Location",id:"strDestination","mandatory":"true"}),
			plf.addCombo({"label":"Purpose",id:"strPurpose","mandatory":"true"}),
			plf.addText({"label":"Remarks",id:"strRemarks"}),
			plf.addDisplayOnly({"label":"Approver Name",id:"strApproverName"})
			
		]
		
		TransRequestColumn.add(TransrequestFormCtrl);
		
		//Travel Request Grid Section Begins
		var TransRequestDetailsGridFieldObj=
		[
			{columnname:"Designation",dataname:"DESIGNATION",datatype:"string",width:100},
			{columnname:"Name",dataname:"NAME",datatype:"string",width:100},
			{columnname:"Date",dataname:"DATE",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
		]
		var TransRequestDetailsGridDtl=
		{
			title:"",
			id:"TransRequest",
			detail:TransRequestDetailsGridFieldObj,
			widthBasis:"flex",
			visibleRow:5,
			readonly:"true"
		}
		var TransReqDtl =  plf.addCollapseSection({title:"Approval History",collapsed:false})
		var TransRequestDetailsGridSection = plf.addGrid(TransRequestDetailsGridDtl,this)
		TransReqDtl.add(TransRequestDetailsGridSection)
		
				
		//Add Child Sections
		mainpage.ptrMainSection.add(TransRequestColumn) //Add Grid Section to Main Page
		mainpage.ptrMainSection.add(TransReqDtl)
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		mainpage.eventHandlers = 
			[	
				/*{
					"tasktype":"proto",
					"filename":"peoplelogistics/TransportRequest.json"
				}*/
				{
				"controlid":"",
				"tasktype":"onload",
				"input":["strTranRequestNo"],
				"service":"PPLCoreTS",
				"methodName":"initTransportReq"
				},
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strTranRequestNo", "strPurpose", "strStatus", "dtTravelDate",  "strTravellerCode","tmTravelTime" ,"strRemarks", 
				"strOrigin", "strDestination", "strApproverName", "dtTranDate"],
				"service":"PPLCoreTS",
				"methodName":"insertTransportReq"
				},
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strTranRequestNo","strPurpose","strStatus","strTravellerCode", "dtTravelDate","tmTravelTime","strRemarks", 
						"strApproverName","strOrigin","strDestination", "dtTranDate","strTravelRequestNo"],
				"service":"PPLCoreTS",
				"methodName":"updateTransportReq"
				},
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strTranRequestNo"],
				"service":"PPLCoreTS",
				"methodName":"deleteTransportReq"
				},
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["strTranRequestNo"],
				"service":"PPLCoreTS",
				"methodName":"confirmTransportReq"
				},
				{
					"controlid":"strTranRequestNo",
					"tasktype":"onenter",
					"input":["strTranRequestNo"],
					"service":"PPLCoreTS",
					"methodName":"initTransportReq"
				},	
				
				{
					"controlid":"strTravellerCode",
					"tasktype":"onenter",
					"input":["strTravellerCode"],
					"service":"PPLCoreMasterTS",
				"methodName":"fetchTravellerCodeTS"
				}
			];		
		
		mainpage.hlpLinks=
		{
		"TransRequestNo":
				{
					"hlpType":"Header",
					"hlpScreen":"peoplelogistics.TransportRequestHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTranRequestNo","child":"TRANSPORT_REQ_ID"}
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
