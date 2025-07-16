Ext.define('CueTrans.view.jm_master.CustomerMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Customer Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["refresh","create","edit","delete","activate","inactivate"]
		
		//Add Keyfields
		mainpage.keyFields=["CustomerCode"]
		
		//3pl Owner Header Section Begins
		plf.columns=3
		customerHdrColumn = plf.addColumnSection({title:"Customer master"});
		
		
		customerFormCtrl=
		[
			
			plf.addText({"label":"Customer Code",id:"strCustomerCode","mandatory":"true"}),
			plf.addText({"label":"Customer Name",id:"strCustomerName","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Phone1",id:"strPhone1"}),
			plf.addText({"label":"Phone2",id:"strPhone2"}),
			plf.addText({"label":"Email",id:"strEmail","mandatory":"true"}),
			plf.addText({"label":"Address",id:"strAddress"}),
			plf.addText({"label":"Area",id:"strArea"}),
			plf.addText({"label":"City",id:"strCity"}),
			plf.addText({"label":"State",id:"strState"}),
			plf.addText({"label":"Country",id:"strCountry"}),
			plf.addText({"label":"ZipCode",id:"strZipCode"}),
			plf.addText({"label":"Contact Person",id:"strContactPerson"}),
			plf.addText({"label":"Contact Phone No",id:"strContactPersonPh"})
			
		]
		
		customerHdrColumn.add(customerFormCtrl);
		//3pl Owner Header Section Ends
		
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(customerHdrColumn)//Add Header Section to Main Page
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	       /* {
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreRouteService",
				"methodName":"initSupplierMasterScrTS"
			},		*/
			{
					"controlid":"",
					"tasktype":"onload",
					"input":["strCustomerCode"],
					"service":"CoreCustomerService",
					"methodName":"initCustomerMasterScrTS"
			},
			{
					"controlid":"",
					"tasktype":"onload",
					"input":["strCustomerCode"],
					"service":"CoreCustomerService",
					"methodName":"fetchCustomerTS"
			},
			{
					"controlid":"strCustomerCode",
					"tasktype":"onenter",
					"input":["strCustomerCode"],
					"service":"CoreCustomerService",
					"methodName":"fetchCustomerTS"
			},	
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"create",
					"input":["strCustomerCode","strCustomerName","strPhone1","strAddress","strState","strContactPerson","strPhone2",
					"strArea","strCountry","strContactPersonPh","strEmail","strCity","strZipCode","strCreatedBy",
					"dtCreatedDate","strOrganisationId","strStatus"],
					"service":"CoreCustomerService",
					"methodName":"createCustomerTS"
			},

			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"edit",
					"input":["strCustomerCode","strCustomerName","strPhone1","strAddress","strState","strContactPerson","strPhone2",
					"strArea","strCountry","strContactPersonPh","strEmail","strCity","strZipCode","strCreatedBy",
					"dtCreatedDate","strOrganisationId","strStatus"],
					"service":"CoreCustomerService",
					"methodName":"modifyCustomerTS"
			},	

			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"delete",
					"input":["strCustomerCode"],
					"service":"CoreCustomerService",
					"methodName":"deleteCustomerTS"
			},

			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"activate",
					"input":["strCustomerCode"],
					"service":"CoreCustomerService",
					"methodName":"activateCustomerTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"inactivate",
					"input":["strCustomerCode"],
					"service":"CoreCustomerService",
					"methodName":"inactivateCustomerTS"
			},
		{
					"tasktype":"proto",
					"filename":"jm_master/CustomerMaster.json"
				}
		];
		//Event Handlers Mapping Ends
			
		//Generate Screen Section
		
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
				"except":["strCustomerCode"]
			},
			"active":
			{
				"enableAll":false,
				"except":["strCustomerCode"]
			}
		}
		
		
		

		
		/*
		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});
		*/
		
		this.callParent(arguments);
		//mainpage.generateScreen();
	}
});
