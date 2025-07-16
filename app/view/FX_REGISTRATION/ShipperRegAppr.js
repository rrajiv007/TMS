/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                   		         
Author		  :	Divya																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.FX_REGISTRATION.ShipperRegAppr',
   { 
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

	
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Shipper Approval";
			mainpage.toolbarSectionFlag=true;			
			//mainpage.liveScreenFlag=false;
			/**/
			mainpage.toolbarActions= 
			[
							
				{
					"name": "Approve",
					"tooltip": "Click here to Approve."
				},
				{
					"name": "Reject",
					"tooltip": "Click here to Reject."
				}
			]	
			
			/*Header Section starts here*/
			plf.columns=2
			var parentForm =this;
			
			
			var baseCarrPanel = plf.addColumnSection({});
			
			
		 	plf.columns=4
			var ShipperBasicDtl = plf.addColumnSection({"title":"Basic Details",columnWidth:1});
			var NameCtrl=
			[	
			plf.addHidden({"label":"CustomerCode",id:"strCode"}),
			plf.addHidden({"label":"RegType",id:"strRegType"}),
			plf.addDisplayOnly({"label":"First Name",id:"strCustomerName","mandatory":"true",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Middle Name",id:"strMiddleName",InputLength:"100"}), 
			plf.addDisplayOnly({"label":"Last Name",id:"strLastName",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addDisplayOnly({"label":"Role",id:"strDesignation",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Mobile No",id:"strMobileNo",inputFormat:"integer",InputLength:"15"}),
			plf.addDisplayOnly({"label":"Email",id:"strEmail",inputFormat:"email","mandatory":"true",InputLength:"50"}),
			plf.addDisplayOnly({"label":"Landline Number",id:"strLandlineNo",InputLength:"100",inputFormat:"integer"}), 
			plf.addDisplayOnly({"label":"Extension Number",id:"strExtnNo",InputLength:"10",inputFormat:"integer"}),
			plf.addDisplayOnly({"label":"Preferred Login Name",id:"strPrefLogin"})
			]  
			ShipperBasicDtl.add(NameCtrl)
			 
			plf.columns=4
			//ShipperDtl.add(postedTrkCtrl)
			
			var ManagersBasicDtl = plf.addColumnSection({"title":"Company Details",columnWidth:1});
		 	
			var ManagersCtrl=
			[
			plf.addDisplayOnly({"label":"Company Name",id:"strCompanyName","mandatory":"true",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Company Category",id:"strCompanyCategory",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Year of Establishment",id:"strYearsofEst",inputFormat:"integer",InputLength:"4"}),
			plf.addDisplayOnly({"label":"Company Registration No",id:"strCompanyRegNo",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Website",id:"strWebsite",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Phone No",id:"strComPhoneNo",InputLength:"10",inputFormat:"integer"}), 
			plf.addDisplayOnly({"label":"Extension Number",id:"strComExtnNo",InputLength:"10",inputFormat:"integer"})
			
			]
			
			ManagersBasicDtl.add(ManagersCtrl)
			
			var ContactDtl = plf.addColumnSection({"title":"Address Details",columnWidth:1});
			var ContactCtrl=
			[
			plf.addDisplayOnly({"label":"Line1",id:"strAddress",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Line2",id:"strAddress1",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Country",id:"strCountry",InputLength:"50"}),
			plf.addDisplayOnly({"label":"Province",id:"strProvince",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Area",id:"strArea",InputLength:"100"}),
			plf.addDisplayOnly({"label":"City",id:"strCity",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Phone No",id:"strPhoneNo",inputFormat:"integer",InputLength:"15"})
		
			]
			
			
			//ContactDtl.add(ContactDtl1)  
			ContactDtl.add(ContactCtrl)  
			
			var EffectDtl = plf.addColumnSection({"title":"Subscription Period & other details",columnWidth:1});
			var EffectCtrl=
			[
			plf.addDate({"label":"Effective From",id:"dtEffectiveFrom","mandatory":"true"}),
			plf.addDate({"label":"Effective To",id:"dtEffectiveTo","mandatory":"true"}),
			plf.addCombo({"label":"Customer Category",id:"strCustCat","mandatory":"true"})
			]
			
			EffectDtl.add(EffectCtrl) 
			
			plf.columns=4
			var btnsection = plf.addColumnSection({});			
			var btnsectionCtrl=						
			[
				plf.addBlank({}),
				plf.addButton({"label":"Approve","id":"btnAppr",width:150}),
				plf.addButton({"label":"Reject","id":"btnReject",width:150})
				/*plf.addButton({"label":"Back","id":"Back",width:150,
								handler:function(obj)
								{
									window.location.href="";					
								}
							  })*/
				
			]
			 btnsection.add(btnsectionCtrl)
			 mainpage.ptrMainSection.add(ShipperBasicDtl);			
			 mainpage.ptrMainSection.add(ManagersBasicDtl);
			 mainpage.ptrMainSection.add(ContactDtl);
		     mainpage.ptrMainSection.add(EffectDtl);
			 //mainpage.ptrMainSection.add(btnsection); 
		
						
		 	 mainpage.eventHandlers = 
			[
{
					"controlid":"",
					"tasktype":"onload",
					"input":["strCode","strRegType","strPrefLogin"],
					"service":"FXCoreTS",
					"methodName":"FXPORTAL_INITADSHIPPERREGTS"
				},
				{
                    "controlid":"",
					"tasktype":"toolbarclick",
					"action":"Approve",
					"input":["strCode","strRegType","dtEffectiveFrom","dtEffectiveTo","strCustCat"],
					"service":"FXCoreTS",
					"methodName":"FXPORTAL_APPROVALTS"				
				},
				{
                    "controlid":"",
					"tasktype":"toolbarclick",
					"action":"Reject",
					"input":["strCode","strRegType","dtEffectiveFrom","dtEffectiveTo","strCustCat"],
					"service":"FXCoreTS",
					"methodName":"FXPORTAL_REJECTAPPROVALTS"				
				}

			]
			
	
		
			this.callParent(arguments);
			
        },
		
		addExtnCheckbox:function(inObj)
		{
			var tmpObj = {
						 xtype: 'container',
						 layout: "column",
						 cls:"c-portalcontainer",
						 layoutConfig : {
							align : 'stretch'
						 },
						 itemId: "cnt_" + inObj.id,
						 columnWidth: plf.getColumnwidth(),				
						 items: [
									{
										xtype	  :"checkboxfield",										
										itemId    : inObj.id
									},
									{
									 xtype: 'container',																		
									 html: inObj.label,
									 cls:"c-portalCheckboxlabel"
									}
								]
						}
			return tmpObj;
		},
		addTermExtnCheckbox:function(inObj)
		{
			var tmpObj = {
						 xtype: 'container',
						 layout: "column",
						 cls:"c-portalcontainer",
						 layoutConfig : {
							align : 'stretch'
						 },
						 itemId: "cnt_" + inObj.id,
						 columnWidth: plf.getColumnwidth(),				
						 items: [
									{
										xtype	  :"checkboxfield",										
										itemId    : inObj.id
									},
									{
									 xtype: 'container',																		
									 html: "<a target='new' href='Documents/FE_Terms of Service_Privacy_Policy.pdf'>"+inObj.label +'</a>',
									 cls:"c-portalCheckboxlabel"
									}
								]
						}
			return tmpObj;
		}

    });