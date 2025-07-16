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
Ext.define('CueTrans.view.peoplelogistics.EmployeeMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Traveller Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create a traveller."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a traveller."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a traveller."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate a traveller."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate a traveller."
            }
            ]
		
		//Add Keyfields
		mainpage.keyFields=["strEmployeeCode"]
		
		//EmployeeMaster Header Section Begins
		plf.columns=4
		var TravellerMasterColumn = plf.addColumnSection({});
		var TravellerMstrCtrl=
		[
			plf.addHlpText({"label":"Traveller Code",id:"strTravellerCode","mandatory":"true",hlpLinkID:"TravellerCode",inputFormat:"string",InputLength:"40"},this),
			plf.addText({"label":"Traveller Name",id:"strTravellerName","mandatory":"true",inputFormat:"string",InputLength:"100"}),			
			plf.addCombo({"label":"Gender",id:"strGender"}),	
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addDate({"label":"DOB","id":"dtDateOfBirth"}),
			//plf.addDisplayOnly({"label":"Age",id:"strAge"}),
			plf.addCombo({"label":"Traveller Type",id:"strTravellerType"}),			
			plf.addCombo({"label":"Grade",id:"strGrade"}),	
			plf.addCombo({"label":"Work Location",id:"strWorkLocation","mandatory":"true"},this),
			plf.addText({"label":"Phone 1",id:"strPhone1",inputFormat:"string",InputLength:"20"}),
			plf.addText({"label":"Phone 2",id:"strPhone2",inputFormat:"string",InputLength:"20"}),
			plf.addText({"label":"Email",id:"strEmail",inputFormat:"email",InputLength:"60","mandatory":"true"}),
			plf.addText({"label":"Address",id:"strAddress",inputFormat:"string",InputLength:"200"}),
			plf.addText({"label":"Area",id:"strArea",inputFormat:"string",InputLength:"50"}),
			plf.addCombo({"label":"Country",id:"strCountry",inputFormat:"string",InputLength:"60"}),			
			plf.addCombo({"label":"State",id:"strState",inputFormat:"string",InputLength:"60"}),
			plf.addCombo({"label":"City",id:"strCity",inputFormat:"string",InputLength:"50"}),
			plf.addText({"label":"Zip Code",id:"strZipCode",inputFormat:"string",InputLength:"20"})
			
		]
		TravellerMasterColumn.add(TravellerMstrCtrl);
		//TravellerMaster Header Section Ends
		
		var travellerDocObj=
		[   			
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",storeId:"strDocumentType",editControl:"combo",width:200},
			{columnname:"Document Number",dataname:"DOC_NO",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Issued By",dataname:"ISSUED_BY",datatype:"string",width:150,editControl:"textbox"},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"string",width:150,editControl:"date"},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"string",width:150,editControl:"date"},
			{columnname:"Attach Document",dataname:"ATTACH_DOCUMENT",datatype:"string",editControl:"fileupload",fileGroup:"Traveller\\Documents",width:245}
		]
		var TravellerDocDtlGridDtl=
		{
			title:"Document Details",
			id:"travellerDoc",
			detail:travellerDocObj,
			visibleRow:10
		}
		var TravellerDocGridSection = plf.addGrid(TravellerDocDtlGridDtl,this)	
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;	
		
		mainpage.ptrMainSection.add(TravellerMasterColumn)//add hdr details
		mainpage.ptrMainSection.add(TravellerDocGridSection)//Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[		
			 {
					"controlid":"",
					"tasktype":"onload",
					"input":["strTravellerCode","travellerDoc"],
					"service":"PPLCoreMasterTS",
					"methodName":"initTravellerTS"
			},					 
			{
					"controlid":"strTravellerCode",
					"tasktype":"onenter",
					"input":["strTravellerCode"],
					"service":"PPLCoreMasterTS",
					"methodName":"fetchTravellerTS"
			},	
				
		    {       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strTravellerCode","strTravellerName","strGender","strStatus","strTravellerType","strGrade","strWorkLocation","strPhone1","strPhone2","strEmail","strAddress","strArea","strCountry","strState","strCity","strZipCode","travellerDoc","dtDateOfBirth","strAge"],
				"service":"PPLCoreMasterTS",
				"methodName":"createTravellerTS"
			},	
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strTravellerCode","strTravellerName","strGender","strStatus","strTravellerType","strGrade","strWorkLocation","strPhone1","strPhone2","strEmail","strAddress","strArea","strCountry","strState","strCity","strZipCode","travellerDoc","dtDateOfBirth","strAge"],
				"service":"PPLCoreMasterTS",
				"methodName":"editTravellerTS"
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strTravellerCode","strTravellerName","strGender","strStatus","strTravellerType","strGrade","strWorkLocation","strPhone1","strPhone2","strEmail","strAddress","strArea","strCountry","strState","strCity","strZipCode","travellerDoc","dtDateOfBirth","strAge"],
				"service":"PPLCoreMasterTS",
				"methodName":"delTravellerTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Activate",
				"input":["strTravellerCode","strTravellerName","strGender","strStatus","strTravellerType","strGrade","strWorkLocation","strPhone1","strPhone2","strEmail","strAddress","strArea","strCountry","strState","strCity","strZipCode","travellerDoc","dtDateOfBirth","strAge"],
				"service":"PPLCoreMasterTS",
				"methodName":"actTravellerTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Inactivate",
				"input":["strTravellerCode","strTravellerName","strGender","strStatus","strTravellerType","strGrade","strWorkLocation","strPhone1","strPhone2","strEmail","strAddress","strArea","strCountry","strState","strCity","strZipCode","travellerDoc","dtDateOfBirth","strAge"],
				"service":"PPLCoreMasterTS",
				"methodName":"inActTravellerTS"
			},
			{
				"controlid":"strCountry",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreLocationService",
				"methodName":"fetchStateTS"
		    },
		
		    {
				"controlid":"strState",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreLocationService",
				"methodName":"fetchCityTS"
		    }
		];
		//Event Handlers Mapping Ends
		
		//Generate Screen Section
		//mainpage.generateScreen();
			
		mainpage.hlpLinks=
		{
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
			"WorkLocation":
				{
					"hlpType":"Header",
					"hlpScreen":"",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"","child":""}
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
