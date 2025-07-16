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
Ext.define('CueTrans.view.FX_REGISTRATION.ShipperOPSApproval',
   { 
        extend: "CueTrans.lib.plfTransScreen", 
        initComponent: function() {

	
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "User Registration Verification & Approval";
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
			
			plf.addHidden({"label":"CustomerID",id:"strCode"}),
			plf.addDisplayOnly({"label":"First Name",id:"strCustomerName","mandatory":"true",InputLength:"100"}),
			plf.addText({"label":"Middle Name",id:"strMiddleName",InputLength:"100",inputFormat:"string"}), 
			plf.addText({"label":"Last Name",id:"strLastName",InputLength:"100",inputFormat:"string"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Designation",id:"strDesignation",InputLength:"100"}),
			plf.addText({"label":"Mobile No",id:"strMobileNo",inputFormat:"string",InputLength:"20"}),
			plf.addText({"label":"Email",id:"strEmail",inputFormat:"email","mandatory":"true",InputLength:"50"}),
			plf.addText({"label":"Landline Number",id:"strLandlineNo",InputLength:"50",inputFormat:"string"}), 
			plf.addText({"label":"Extension Number",id:"strExtnNo",InputLength:"50",inputFormat:"string"}),
			plf.addText({"label":"Preferred Login Name",id:"strPrefLogin","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Customer Category",id:"strCustCat"})
			]  
			ShipperBasicDtl.add(NameCtrl)
			 
			plf.columns=4
			//ShipperDtl.add(postedTrkCtrl)
			
			var ManagersBasicDtl = plf.addColumnSection({"title":"Company Details",columnWidth:1});
		 	
			var ManagersCtrl=
			[
			plf.addDisplayOnly({"label":"Company Name",id:"strCompanyName","mandatory":"true",inputFormat:"string",InputLength:"100",blankText:"Please provide your company's name."}),
			plf.addCombo({"label":"Company Category",id:"strCompanyCategory",inputFormat:"string",InputLength:"50"}),
			plf.addText({"label":"Company Reg No",id:"strCompanyRegNo",inputFormat:"string","mandatory":"true",InputLength:"50",blankText:"Please provide your company's registration number."}),
			plf.addText({"label":"Project/Dept Code",id:"strProjectCode","mandatory":"true",InputLength:"100",inputFormat:"string",blankText:"The project/department code is required."}),
			plf.addText({"label":"Project/Dept Name",id:"strProjectName","mandatory":"true",InputLength:"100",inputFormat:"string",blankText:"The project/department name is required."}),			
			plf.addText({"label":"Year of Establishment",id:"strYearsofEst",inputFormat:"integer",InputLength:"4"}),
			plf.addText({"label":"Cost Center Code",id:"strCostCenter","mandatory":"true",InputLength:"100",inputFormat:"string",blankText:"The cost center code field is required."}),
			plf.addText({"label":"Cost Center Description",id:"strCostCenterDesc","mandatory":"true",InputLength:"100",inputFormat:"string",blankText:"The cost center description is required."}),
			plf.addText({"label":"Website",id:"strWebsite",InputLength:"100",inputFormat:"string"}),
			plf.addText({"label":"Phone No",id:"strComPhoneNo",InputLength:"20",inputFormat:"string"}), 
			plf.addText({"label":"Extension Number",id:"strComExtnNo",InputLength:"50",inputFormat:"string"})			
			]
						
			ManagersBasicDtl.add(ManagersCtrl)
			
			var ContactDtl = plf.addColumnSection({"title":"Address Details",columnWidth:1});
			var ContactCtrl=
			[
			plf.addText({"label":"Line1",id:"strAddress",InputLength:"200",inputFormat:"string"}),
			plf.addText({"label":"Line2",id:"strAddress1",InputLength:"200",inputFormat:"string"}),
			plf.addCombo({"label":"Country",id:"strCountry",InputLength:"50"}),
			plf.addText({"label":"Province",id:"strProvince",InputLength:"50"}),
			plf.addText({"label":"Area",id:"strArea",InputLength:"50"}),
			plf.addText({"label":"City",id:"strCity",InputLength:"50",inputFormat:"string",InputLength:"50"}),
			plf.addText({"label":"Phone No",id:"strPhoneNo",inputFormat:"string",InputLength:"20"})
		
			]
			
			
			//ContactDtl.add(ContactDtl1)  
			ContactDtl.add(ContactCtrl)  
			
			var EffectDtl = plf.addColumnSection({"title":"Subscription Period",columnWidth:1});
			var EffectCtrl=
			[
			plf.addDate({"label":"Effective From",id:"dtEffectiveFrom","mandatory":"true"}),
			plf.addDate({"label":"Effective To",id:"dtEffectiveTo","mandatory":"true"})
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
					"input":["strCode"],
					"service":"FXCoreTS",
					"methodName":"FXPORTAL_INITREGOPSAPPTS"
				},
				{
                    "controlid":"",
					"tasktype":"toolbarclick",
					"action":"Approve",
					"input":["strCode","strMiddleName","strLastName","strDesignation","strMobileNo","strEmail","strLandlineNo","strExtnNo",
							"strPrefLogin","strCompanyCategory","strCompanyRegNo","strProjectCode","strProjectName","strYearsofEst","strCostCenter",
							"strCostCenterDesc","strWebsite","strComPhoneNo","strComExtnNo","strAddress","strAddress1","strCountry","strProvince",
							"strArea","strCity","strPhoneNo","dtEffectiveFrom","dtEffectiveTo","strCustomerName"],
					"service":"FXCoreTS",
					"methodName":"FXPORTAL_OPSAPPROVALTS"				
				},
				{
                    "controlid":"",
					"tasktype":"toolbarclick",
					"action":"Reject",
					"input":["strCode"],
					"service":"FXCoreTS",
					"methodName":"FXPORTAL_OPSREJECTAPPROVALTS"				
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