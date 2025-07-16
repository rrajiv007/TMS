/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID		Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995			Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.CarrierMaster', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Carrier Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create a carrier."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a carrier."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a carrier."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate a carrier."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate a carrier."
            }
            ]
		
		//Add Keyfields
		mainpage.keyFields=["3plownerCode"]
		
		//3pl Owner Header Section Begins
		plf.columns=4
		var threeplOwnerHdrColumn = plf.addColumnSection({});			//69995
		
		
		var threeplOwnerFormCtrl=						//69995
		[
			plf.addHlpText({"label":"Carrier Code",id:"str3PlOwnerCode","mandatory":"true",hlpLinkID:"3PLOwnerCode",InputLength:"40"},this),
			plf.addText({"label":"Carrier Name",id:"str3PlOwnerName","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addText({"label":"Email",id:"strEmail",inputFormat:"email","mandatory":"true",InputLength:"50"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),

			plf.addCombo({"label":"Roster Required",id:"strRostering","mandatory":"true",inputFormat:"string",InputLength:"20"}),
        	plf.addCombo({"label":"Carrier Type",id:"strCarrierType","mandatory":"true",inputFormat:"string",InputLength:"20"}),
			plf.addHlpText({"label":"Base Location",id:"strBaseLocation","mandatory":"true",hlpLinkID:"locationlink"},this),
            plf.addBlank(),

			plf.addDate({"label":"Date Effective From",id:"dtFromDate","mandatory":"true",inputFormat:"string",InputLength:"20"}),
			plf.addDate({"label":"Date Effective To",id:"dtToDate","mandatory":"true",inputFormat:"string",InputLength:"20"}),
			plf.addText({"label":"Phone 1",id:"strPhone1",inputFormat:"string",InputLength:"20"}),
			plf.addText({"label":"Phone 2",id:"strPhone2",inputFormat:"string",InputLength:"20"}),			

			plf.addText({"label":"Address",id:"strAddress",inputFormat:"string",InputLength:"200"}),
			plf.addText({"label":"Area",id:"strArea",inputFormat:"string",InputLength:"50"}),
			plf.addCombo({"label":"Country",id:"strCountry",inputFormat:"string",InputLength:"50"}),
			plf.addCombo({"label":"State",id:"strState",inputFormat:"string",InputLength:"50"}),

			plf.addCombo({"label":"City",id:"strCity",inputFormat:"string",InputLength:"50"}),			
			plf.addText({"label":"Zip code",id:"strZipCode",inputFormat:"string",InputLength:"20"}),
			plf.addText({"label":"Contact Person",id:"strContactPerson",inputFormat:"string",InputLength:"100"}),
			plf.addText({"label":"Contact Phone No",id:"strContactPersonPh",inputFormat:"string",InputLength:"20"})
		]
		
		threeplOwnerHdrColumn.add(threeplOwnerFormCtrl);
		//3pl Owner Header Section Ends
		
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(threeplOwnerHdrColumn)//Add Header Section to Main Page
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		threeplOwnerHdrColumn.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(threeplOwnerHdrColumn)//add hdr details
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	      
			{
					"controlid":"",
					"tasktype":"onload",
					"input":["str3PlOwnerCode","strCountry","strState"],
					"service":"Core3PLOwnerService",
					"methodName":"init3PlOwnerMasterScrTS"
			},
			{
					"controlid":"strCountry",
					"tasktype":"onchange",
					"input":["strCountry","strState"],
					"service":"Core3PLOwnerService",
					"methodName":"fetchStateTS"
			},
			
			{
					"controlid":"strState",
					"tasktype":"onchange",
					"input":["strCountry","strState"],
					"service":"Core3PLOwnerService",
					"methodName":"fetchCityTS"
			},
			
			{
					"controlid":"str3PlOwnerCode",
					"tasktype":"onenter",
					"input":["str3PlOwnerCode"],
					"service":"Core3PLOwnerService",
					"methodName":"fetch3PlOwnerTS"
			},	
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Create",
					"input":["str3PlOwnerCode","str3PlOwnerName","strPhone1","strAddress","strState","strContactPerson","strPhone2",
					"strArea","strCountry","strContactPersonPh","strEmail","strCity","strZipCode","strCreatedBy",
					"dtCreatedDate","strModifiedBy","dtModifiedDate","strOrganisationId","strStatus","strRostering",
					"strCarrierType","strBaseLocation","dtFromDate","dtToDate"],
					"service":"Core3PLOwnerService",
					"methodName":"create3PlOwnerTS"
			},	

			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Edit",
					"input":["str3PlOwnerCode","str3PlOwnerName","strPhone1","strAddress","strState","strContactPerson","strPhone2",
					"strArea","strCountry","strContactPersonPh","strEmail","strCity","strZipCode","strCreatedBy",
					"dtCreatedDate","strModifiedBy","dtModifiedDate","strOrganisationId","strStatus","strRostering","strCarrierType","strBaseLocation","dtFromDate","dtToDate"],

					"service":"Core3PLOwnerService",
					"methodName":"modify3PlOwnerTS"
			},

			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Delete",
					"input":["str3PlOwnerCode","str3PlOwnerName","strPhone1","strAddress","strState","strContactPerson","strPhone2",
					"strArea","strCountry","strContactPersonPh","strEmail","strCity","strZipCode","strCreatedBy",
					"dtCreatedDate","strModifiedBy","dtModifiedDate","strOrganisationId","strStatus","strRostering","strCarrierType","strBaseLocation","dtFromDate","dtToDate"],

					"service":"Core3PLOwnerService",
					"methodName":"delete3PlOwnerTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Activate",
					"input":["str3PlOwnerCode","str3PlOwnerName","strPhone1","strAddress","strState","strContactPerson","strPhone2",
					"strArea","strCountry","strContactPersonPh","strEmail","strCity","strZipCode","strCreatedBy",
					"dtCreatedDate","strModifiedBy","dtModifiedDate","strOrganisationId","strStatus","strRostering","strBaseLocation","strCarrierType","dtFromDate","dtToDate"],

					"service":"Core3PLOwnerService",
					"methodName":"activate3PlOwnerTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Inactivate",
					"action":"Inactivate",
					"input":["str3PlOwnerCode","str3PlOwnerName","strPhone1","strAddress","strState","strContactPerson","strPhone2",
					"strArea","strCountry","strContactPersonPh","strEmail","strCity","strZipCode","strCreatedBy",
					"dtCreatedDate","strModifiedBy","dtModifiedDate","strOrganisationId","strStatus","strRostering","strBaseLocation","strCarrierType","dtFromDate","dtToDate"],

					"service":"Core3PLOwnerService",
					"methodName":"inactivate3PlOwnerTS"
			},
		{
			"tasktype":"proto",
			"filename":"jm_master/CarrierMaster.json"
		}
		];
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
				"except":[]
			},
			"active":
			{
				"enableAll":true,
				"except":[]
			}			
		}
		
		mainpage.hlpLinks=
		{
			"3PLOwnerCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"str3PlOwnerCode","child":"OWNER_CODE_3PL"}
							]
				},
			"locationlink":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"LOCATION_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strBaseLocation","child":"LOC_NAME"}
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
