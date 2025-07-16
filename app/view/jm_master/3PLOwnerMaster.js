Ext.define('CueTrans.view.jm_master.3PLOwnerMaster', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "3PL Owner Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Refresh","Create","Edit","Delete","Activate","Inactivate"]
		
		//Add Keyfields
		mainpage.keyFields=["3plownerCode"]
		
		//3pl Owner Header Section Begins
		plf.columns=4
		threeplOwnerHdrColumn = plf.addColumnSection({});
		
		
		threeplOwnerFormCtrl=
		[
			
			plf.addHlpText({"label":"3PL Owner Code",id:"str3PlOwnerCode","mandatory":"true",hlpLinkID:"3PLOwnerCode"},this),
			plf.addText({"label":"3PL Owner Name",id:"str3PlOwnerName","mandatory":"true"}),
			plf.addText({"label":"Email",id:"strEmail"}),
			
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Phone 1",id:"strPhone1"}),
			plf.addText({"label":"Phone 2",id:"strPhone2"}),			
			plf.addText({"label":"Address",id:"strAddress"}),
			plf.addText({"label":"Area",id:"strArea"}),
			plf.addText({"label":"City",id:"strCity"}),
			plf.addText({"label":"State",id:"strState"}),
			plf.addText({"label":"Country",id:"strCountry"}),
			plf.addText({"label":"Zip Code",id:"strZipCode"}),
			plf.addText({"label":"Contact Person",id:"strContactPerson"}),
			plf.addText({"label":"Contact Phone No",id:"strContactPersonPh"})
			
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
					"input":["str3PlOwnerCode"],
					"service":"Core3PLOwnerService",
					"methodName":"init3PlOwnerMasterScrTS"
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
					"dtCreatedDate","strModifiedBy","dtModifiedDate","strOrganisationId","strStatus"],
					"service":"Core3PLOwnerService",
					"methodName":"create3PlOwnerTS"
			},	

			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Edit",
					"input":["str3PlOwnerCode","str3PlOwnerName","strPhone1","strAddress","strState","strContactPerson","strPhone2",
					"strArea","strCountry","strContactPersonPh","strEmail","strCity","strZipCode","strCreatedBy",
					"dtCreatedDate","strModifiedBy","dtModifiedDate","strOrganisationId","strStatus"],
					"service":"Core3PLOwnerService",
					"methodName":"modify3PlOwnerTS"
			},

			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Delete",
					"input":["str3PlOwnerCode"],
					"service":"Core3PLOwnerService",
					"methodName":"delete3PlOwnerTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Activate",
					"input":["str3PlOwnerCode","str3PlOwnerName","strPhone1","strAddress","strState","strContactPerson","strPhone2",
					"strArea","strCountry","strContactPersonPh","strEmail","strCity","strZipCode","strCreatedBy",
					"dtCreatedDate","strModifiedBy","dtModifiedDate","strOrganisationId","strStatus"],
					"service":"Core3PLOwnerService",
					"methodName":"activate3PlOwnerTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Inactivate",
					"action":"Inactivate",
					"input":["str3PlOwnerCode"],
					"service":"Core3PLOwnerService",
					"methodName":"inactivate3PlOwnerTS"
			},
		{
			"tasktype":"proto",
			"filename":"jm_master/3PLOwnerMaster.json"
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
					"hlpScreen":"jm_master.3PLOwnerHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"str3PlOwnerCode","child":"OWNER_CODE_3PL"}
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
