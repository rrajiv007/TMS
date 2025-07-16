Ext.define('CueTrans.view.freightExchange.EditProfile', 

{ 
extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Freight Exchange Portal - Edit Profile";
		// Add Toolbar
		mainpage.toolbarSectionFlag=false;
		mainpage.toolbarActions=["Authorize","Reject"]
		
		//Add Keyfields
		//mainpage.keyFields=["strUserType"]
		//Registration Section  Section Begins
		plf.columns=4
		RegisDetailColumn = plf.addColumnSection({});
		if(plf.defaultLayout==3)
		{
			plf.columns=3
			
			RegisDetailCtrl=
			[	
				plf.addCombo({"label":"Language",id:"strLanguage"}),
				plf.addBlank(),
				plf.addBlank(),
				plf.addBlank(),
				plf.addCombo({"label":"User Type",id:"strUserType","mandatory":"true"}),
				plf.addText({"label":"Company Name",id:"strCompanyName","mandatory":"true"}),
				plf.addText({"label":"Address",id:"strAddress","mandatory":"true"}),
				plf.addText({"label":"Pincode",id:"strPincode","mandatory":"true"}),
				plf.addText({"label":"Email ID",id:"strEmailId"}),
				plf.addText({"label":"Company Reg No",id:"strCompanyRegNo","mandatory":"true"}),
                plf.addCombo({"label":"Country",id:"strCountry","mandatory":"true"}),
				plf.addText({"label":"Contact Person",id:"strContactPerson","mandatory":"true"}),
				plf.addText({"label":"Website",id:"strWebsite"}),
				plf.addDate({"label":"Company Reg Date",id:"dtCompanyRegDate","mandatory":"true"}),	
                plf.addCombo({"label":"State",id:"strState","mandatory":"true"}),
				plf.addText({"label":"Contact No",id:"strContactNo","mandatory":"true"}),
                plf.addCombo({"label":"Commodity Type",id:"strCommodityType"}),
                plf.addCombo({"label":"Company Type",id:"strCompanyType"}),
                plf.addCombo({"label":"City",id:"strCity","mandatory":"true"}),
                plf.addText({"label":"Fax No",id:"strFaxNo"}),

				plf.addBlank(),
				plf.addBlank(),

                plf.addButton({"label":"Submit",id:"GetDetailsBtn"})

			]
		
		}
		
		else
		{
		RegisDetailCtrl=
			[	
				plf.addCombo({"label":"Language",id:"strLanguage"}),
				plf.addBlank(),
				plf.addBlank(),
				plf.addBlank(),
				plf.addCombo({"label":"User Type",id:"strUserType","mandatory":"true"}),
				plf.addText({"label":"Company Name",id:"strCompanyName","mandatory":"true"}),
				plf.addText({"label":"Address",id:"strAddress","mandatory":"true"}),
				plf.addText({"label":"Pincode",id:"strPincode","mandatory":"true"}),
				plf.addText({"label":"Email ID",id:"strEmailId"}),
				plf.addText({"label":"Company Reg No",id:"strCompanyRegNo","mandatory":"true"}),
                plf.addCombo({"label":"Country",id:"strCountry","mandatory":"true"}),
				plf.addText({"label":"Contact Person",id:"strContactPerson","mandatory":"true"}),
				plf.addText({"label":"Website",id:"strWebsite"}),
				plf.addDate({"label":"Company Reg Date",id:"dtCompanyRegDate","mandatory":"true"}),	
                plf.addCombo({"label":"State",id:"strState","mandatory":"true"}),
				plf.addText({"label":"Contact No",id:"strContactNo","mandatory":"true"}),
                plf.addCombo({"label":"Commodity Type",id:"strCommodityType"}),
                plf.addCombo({"label":"Company Type",id:"strCompanyType"}),
                plf.addCombo({"label":"City",id:"strCity","mandatory":"true"}),
                plf.addText({"label":"Fax No",id:"strFaxNo"}),

				plf.addBlank(),
				plf.addBlank(),

                plf.addButton({"label":"Submit",id:"GetDetailsBtn"})

			]
		
		}
		RegisDetailColumn.add(RegisDetailCtrl);
		
		//Registration detail Section Ends

				
		//Add Child Sections
		
		mainpage.ptrMainSection.add(RegisDetailColumn) //Add Regis Detail Section to Main Page

		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
 			
		{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreRegistrationAuthorize",
				"methodName":"InitRegistrationScrTS"
		},
		
        {       
				"controlid":"GetDetailsBtn",
				"tasktype":"btnclick",
				"input":["strLanguage","strUserType","strCompanyName","strAddress","strPincode","strEmailId","strCompanyRegNo","strCountry","strContactPerson","strWebsite","dtCompanyRegDate","strState","strContactNo","strCommodityType","strCompanyType","strCity","strFaxNo","strRegId"],
			    "service":"CoreRegistrationAuthorize",
				"methodName":"createEditProfileTS"
		},
		
		{
				"controlid":"strCountry",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreRegistrationAuthorize",
				"methodName":"fetchStateTS"
		},
		
		{
				"controlid":"strState",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreRegistrationAuthorize",
				"methodName":"fetchCityTS"
		},
		
 			
		];
		//Event Handlers Mapping Ends
		
		//Generate Screen Section
		this.callParent(arguments);
		
	}
});


