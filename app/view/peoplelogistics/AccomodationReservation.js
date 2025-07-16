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
Ext.define('CueTrans.view.peoplelogistics.AccomodationReservation', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Accommodation Reservation";
		mainpage.liveScreenFlag=true;
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [
			{
                "name": "Save",
                "tooltip": "Click here to save accommodation details."
            },
			{
                "name": "Confirm",
                "tooltip": "Click here to confirm accommodation details."
            }
            ]
		
		//Add Keyfields
		mainpage.keyFields=["strAccRequestNo"]
		//truckQrCodeSection = plf.addColumnSection({});
		//Vehicle Master Header Section starts
		plf.columns=4
		var AccRequestColumn = plf.addColumnSection({});
		var parentForm =this;
		var AccrequestFormCtrl=
		[
 	        plf.addHlpText({"label":"Accommodation No",id:"strAccRequestNo",hlpLinkID:"AccRequestNo",inputFormat:"string",InputLength:"40"},this),	
     		plf.addDisplayOnly({"label":"Travel Request No",id:"strTravelRequestNo"}),
			plf.addDisplayOnly({"label":"Work Location","id":"strWorkLocation"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),			
			plf.addDisplayOnly({"label":"Traveller Code",id:"strTravellerCode"}),
			plf.addDisplayOnly({"label":"Traveller Name","id":"strTravellerName"}),
			plf.addDisplayOnly({"label":"Traveller Type","id":"strTravellerType"}),
			plf.addDisplayOnly({"label":"Grade",id:"strGrade"}),
			plf.addDisplayOnly({"label":"Gender",id:"strGender"}),
			//plf.addDisplayOnly({"label":"DOB",id:"strDob"}),
			//plf.addDisplayOnly({"label":"Age",id:"strAge"}),
			//plf.addDisplayOnly({"label":"Travel Type",id:"strTravelType"}),
			plf.addDisplayOnly({"label":"Purpose",id:"strPurpose"}),
			plf.addDisplayOnly({"label":"Date From",id:"dtAccDtFrom"}),
			plf.addDisplayOnly({"label":"Date To",id:"dtAccDtTo"}),
			//plf.addDisplayOnly({"label":"Meal Preference",id:"strMealPreference"}),
			plf.addText({"label":"Remarks",id:"strRemarks"}),
			plf.addButton({id:"btnRoom",label:"Room Availability",tooltip:"Click here to check room availability.",
					"handler": function() 
							{
							parentForm.launchHlpLink("Room")
							}})			
		]
		
		AccRequestColumn.add(AccrequestFormCtrl);
		
		//Travel Request Grid Section Begins
		var AccRequestDetailsGridFieldObj=
		[
			{columnname:"Date",dataname:"DATE_FROM",datatype:"string",width:100},
			{columnname:"Guest House",dataname:"GUEST_HOUSE",datatype:"string",editControl:"combo",width:100,storeId:"strGuestHouse"},
			
			//{columnname:"Date To",dataname:"DATE_TO",datatype:"string",editControl:"date",width:100},
			{columnname:"Room No",dataname:"ROOM_NO",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Room Type",dataname:"ROOM_TYPE",datatype:"string",width:100},
			{columnname:"Bed No",dataname:"BED_NO",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Line No",dataname:"LINE_NO",datatype:"string",editControl:"textbox",width:150,hidden:true,inputFormat:"numeric",},
		]
		var AccRequestDetailsGridDtl=
		{
			title:"",
			id:"accRequest",
			detail:AccRequestDetailsGridFieldObj,
			widthBasis:"flex",
			visibleRow:5,
			readonly:true
		}
		var AccReqDtl =  plf.addCollapseSection({title:"Accommodation Details",collapsed:false})
		var AccRequestDetailsGridSection = plf.addGrid(AccRequestDetailsGridDtl,this)
		AccReqDtl.add(AccRequestDetailsGridSection)
		
				
		//Add Child Sections
		mainpage.ptrMainSection.add(AccRequestColumn) //Add Grid Section to Main Page
		mainpage.ptrMainSection.add(AccReqDtl)
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		mainpage.eventHandlers = 
			[
{
				"controlid":"",
				"tasktype":"onload",
				"input":["strAccRequestNo"],
				"service":"PPLCoreTS",
				"methodName":"initAccomTS"
			},	
			{
					"controlid":"strAccRequestNo",
					"tasktype":"onenter",
					"input":["strAccRequestNo"],
					"service":"PPLCoreTS",
					"methodName":"fetchAccomTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strAccRequestNo","accRequest","strTravelRequestNo"],
				"service":"PPLCoreTS",
				"methodName":"editAccomTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["strAccRequestNo","accRequest","strTravelRequestNo"],
				"service":"PPLCoreTS",
				"methodName":"AccomconfirmTS"
			},
				{
					"tasktype":"proto",
					"filename":"peoplelogistics/AccomReservation.json"
				}
			];		
		
		mainpage.hlpLinks=
		{
		
			"Room":
				{
					"hlpType":"Header",
					"hlpScreen":"peoplelogistics.RoomAvailability",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"","child":""}
							]
				},
			"AccRequestNo":
			    {
					"hlpType":"Header",
					"hlpScreen":"peoplelogistics.AccommodationRequestHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strAccRequestNo","child":"ACC_REQUEST_NO"}
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
