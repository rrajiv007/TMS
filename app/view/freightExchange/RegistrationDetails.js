Ext.define('CueTrans.view.freightExchange.RegistrationDetails',
{ 
extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Freight Exchange Portal-Registration Details";
		// Add Toolbar
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Create"]
		
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
				plf.addText({"label":"Language",id:"strLanguage"}),
				plf.addBlank(),
				plf.addBlank(),
				plf.addBlank(),
				plf.addText({"label":"User Type",id:"strUserType","mandatory":"true"}),
				plf.addText({"label":"Company Name",id:"strCompanyName","mandatory":"true"}),
				plf.addText({"label":"Address",id:"strAddress","mandatory":"true"}),
				plf.addText({"label":"Pincode",id:"strPincode","mandatory":"true"}),
				plf.addText({"label":"Email ID",id:"strEmailId","mandatory":"true"}),
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
				plf.addCheckBox({"label":"I agree with the Terms and Conditions","id":"strAgree","linkid":"Conditions"}),
				plf.addText({"label":"Captcha Code",id:"strCaptchaCode"})
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
				plf.addText({"label":"Email ID",id:"strEmailId","mandatory":"true"}),
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
				plf.addFieldContainer({
					"layout":"hbox",
					"controls":
					[
						plf.addCheckBox({"label":" ","id":"strAgree"}),
						Ext.create('Ext.Button', {
							text: 'I Agree To The Terms and Conditions',
							handler: function() {
								var tmpTCWindow =Ext.create('Ext.Window',{
									title: "Terms and Conditions",
									layout:'fit',
									width: plf.screenWidth*.8,
									height: window.screen.availHeight *.8,
									autoScroll:true,
									autoLoad : {  
													url : 'app/view/freightExchange/TC.html',  
													scripts: true  
												}  									
								});
								tmpTCWindow.show();
							},
							"baseCls":"hyperlinkCls"
						})					
					]
				}
			)				
			]
		
		}
		RegisDetailColumn.add(RegisDetailCtrl);
		
		//Registration detail Section Ends
		//Add Child Sections
		
		mainpage.ptrMainSection.add(RegisDetailColumn) //Add Regis Detail Section to Main Page
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
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
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strLanguage","strUserType","strCompanyName","strAddress","strPincode","strEmailId",                         "strCompanyRegNo","strCountry","strContactPerson","strWebsite","dtCompanyRegDate","strState",
					     "strContactNo","strCommodityType","strCompanyType","strCity","strFaxNo","strAgree",                         "strCaptchaCode","strRegId"],
			    "service":"CoreRegistrationAuthorize",
				"methodName":"createRegistrationScrTS"
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
		}
		];
		mainpage.screenLinks=
		{
			"Conditions":
				{
					"dest":"freightExchange.Terms and Condition",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
				
				
		}
		//Event Handlers Mapping Ends
		
		//Generate Screen Section
		this.callParent(arguments);
		
	}
});


