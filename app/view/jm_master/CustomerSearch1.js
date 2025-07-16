Ext.define('CueTrans.view.jm_master.CustomerSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Customer List";
		//Help on Customer Search Section Begins
		plf.columns=2
		helpOncustomerHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
		
		
		helpOncustomerFormCtrl=
		[
			plf.addText({"label":"Customer Code From",id:"strCustomerCodeFrom"}),
			plf.addText({"label":"Customer Code To",id:"strCustomerCodeTo"}),
			plf.addText({"label":"Customer Name",id:"strCustomerName"}),
			plf.addText({"label":"City",id:"strCity"}),
			plf.addText({"label":"State",id:"strState"}),
			plf.addText({"label":"Country",id:"strCountry"}),
			//plf.addBlank(),
			//plf.addButton({"label":"Search","id":"btnSearch"})
			
		]
		
		helpOncustomerHdrCollapse.add(helpOncustomerFormCtrl);
		//Help on Customer Header Section Ends
		
		//Help on Customer Grid Section Begins
		helpOncustomerGridFieldObj=
		[
			{columnname:"Customer Code",dataname:"CUST_CODE",datatype:"string",width:150,linkId:"custMaster"},
			{columnname:"Customer Name",dataname:"CUST_NAME",datatype:"string",width:200},
			{columnname:"Phone1",dataname:"PHONE1",datatype:"string",datatype:"string",width:200},
			{columnname:"City",dataname:"CITY",datatype:"string",width:200},
			{columnname:"State",dataname:"STATE",datatype:"string",width:200},
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",width:200},
			{columnname:"Contact Person",dataname:"CONTACT_PERSON",datatype:"string",width:200},
			{columnname:"Contact PhoneNo",dataname:"CONTACT_PERSON_PH",datatype:"string",width:200}
		]
		helpOncustomerGridDtl=
		{
			title:"Customer Details",
			id:"CustomerDtlCache",
			detail:helpOncustomerGridFieldObj
		}
		helpGridSection = plf.addGrid(helpOncustomerGridDtl,this)
		//Help on Customer Grid Section Ends
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(helpOncustomerHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		
			
			{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strCustomerCodeFrom","strCustomerCodeTo","strCustomerName","strCity","strState","strCountry"],
					"service":"CoreCustomerService",
					"methodName":"fetchAllCustomerTS"
			},
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreCustomerService",
				"methodName":"fetchAllCustomerTS"
				}
					
			
		];
		
		mainpage.screenLinks=
		{
			"custMaster":
				{
					"dest":"jm_master.CustomerMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"CUST_CODE","dest":"strCustomerCode"}
							]
				}
		}
		//Event Handlers Mapping Ends
		/*	
		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});
		*/
		//Generate Screen Section
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
});
