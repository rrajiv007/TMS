Ext.define('CueTrans.view.freightExchange.RegistrationAuthorize', 

{ 
extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Registration Authorize / Rejection";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
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
				plf.addText({"label":"Registration ID From",id:"strRegIdFrom"}),
				plf.addText({"label":"Registration ID To",id:"strRegIdTo"}),
				plf.addText({"label":"Registration Date From",id:"dtRegDateFrom"}),
				plf.addText({"label":"Registration Date To",id:"dtRegDateTo"}),
				plf.addCombo({"label":"User Type",id:"strUserType"}),
				plf.addText({"label":"Company Name",id:"strCompanyName"}),
				plf.addText({"label":"Company Reg No",id:"strCompanyRegNo"}),
                plf.addCombo({"label":"Status",id:"strStatus"}),
				plf.addCombo({"label":"Company Type",id:"strCompanyType"}),
				plf.addCombo({"label":"Country",id:"strCountry"}),
				plf.addCombo({"label":"State",id:"strState"}),	
                plf.addCombo({"label":"City",id:"strCity"}),
				plf.addBlank(),
				plf.addBlank(),
				plf.addBlank(),
				plf.addButton({"label":"Get Details",id:"GetDetailsBtn"}),		

			]
		
		}
		
		else
		{
		RegisDetailCtrl=
			[	
				plf.addText({"label":"Registration ID From",id:"strRegIdFrom"}),
				plf.addText({"label":"Registration ID To",id:"strRegIdTo"}),
				plf.addDate({"label":"Registration Date From",id:"dtRegDateFrom"}),
				plf.addDate({"label":"Registration Date To",id:"dtRegDateTo"}),
				plf.addCombo({"label":"User Type",id:"strUserType"}),
				plf.addText({"label":"Company Name",id:"strCompanyName"}),
				plf.addText({"label":"Company Reg No",id:"strCompanyRegNo"}),
                plf.addCombo({"label":"Status",id:"strStatus"}),
				plf.addCombo({"label":"Company Type",id:"strCompanyType"}),
				plf.addCombo({"label":"Country",id:"strCountry"}),
				plf.addCombo({"label":"State",id:"strState"}),	
                plf.addCombo({"label":"City",id:"strCity"}),
				plf.addBlank(),
				plf.addBlank(),
				plf.addBlank(),
				plf.addButton({"label":"Get Details",id:"GetDetailsBtn"}),		

			]
		
		}
		RegisDetailColumn.add(RegisDetailCtrl);
		
		//Registration detail Section Ends
		
		//Registration Grid Section Begins
		registrationGridObj=
		[
			{columnname:"Registration ID",dataname:"REGISTRATION_ID",datatype:"string",width:100,storeId:"strScopeCategory"},
			{columnname:"Registration<BR>Date",dataname:"REGISTRATION_DATE",datatype:"string",width:100},
			{columnname:"User Type",dataname:"USER_TYPE",datatype:"string",datatype:"string",width:100},
			{columnname:"Company Name",dataname:"COMPANY_NAME",datatype:"string",datatype:"string",width:150},
			{columnname:"Company Reg No",dataname:"COMPANY_REG_NO",datatype:"string",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",datatype:"string",width:100},
			{columnname:"Company Type",dataname:"COMPANY_TYPE",datatype:"string",datatype:"string",width:120},
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",datatype:"string",width:120},
			{columnname:"State",dataname:"STATE",datatype:"string",datatype:"string",width:120},
			{columnname:"City",dataname:"CITY",datatype:"string",datatype:"string",width:120},
		]
		regDtl=
		{
			title:"",
			id:"regAutObj",
			detail:registrationGridObj,
			visibleRow:3
					
		}
		
		registrationGridSection = plf.addGrid(regDtl,this)	
		//Registration Grid Section Ends
				
		//Add Child Sections
		
		mainpage.ptrMainSection.add(RegisDetailColumn) //Add Regis Detail Section to Main Page
		mainpage.ptrMainSection.add(registrationGridSection) //Add Grid Section to Main Page
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strSubject","strToUserMailId"],
				"service":"CoreRegistrationAuthorize",
				"methodName":"initRegistrationAuthorizeTS"
		},
		
        {       
				"controlid":"GetDetailsBtn",
				"tasktype":"btnclick",
				"input":["strRegIdFrom","strRegIdTo","dtRegDateFrom","dtRegDateTo","strUserType","strCompanyName","strCompanyRegNo","strStatus","strCompanyType","strCountry","strState","strCity"],
			    "service":"CoreRegistrationAuthorize",
				"methodName":"getDetailsRegistrationAuthorizeTS"
		},
		
		{
				"controlid":"strCountry",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreRegistrationAuthorize",
				"methodName":"fetchStateRegTS"
		},
		
		{
				"controlid":"strState",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreRegistrationAuthorize",
				"methodName":"fetchCityRegTS"
		},
		
		{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Authorize",
				"input":["regAutObj","strFrightUserId","strUserId","strToUserMailId","strSubject","strContent","strCC1","strCC2","filePath"],
				"service":"CoreRegistrationAuthorize",
				"methodName":"authorizeRegTS"
		},
		
		{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Reject",
				"input":["regAutObj"],
				"service":"CoreRegistrationAuthorize",
				"methodName":"rejectRegTS"
		},
		
 			
		];
		//Event Handlers Mapping Ends
		
		//Generate Screen Section
		this.callParent(arguments);
		
	}
});


