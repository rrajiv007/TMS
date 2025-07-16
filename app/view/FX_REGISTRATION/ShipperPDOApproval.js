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
Ext.define('CueTrans.view.FX_REGISTRATION.ShipperPDOApproval',
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
			var ShipperBasicDtl = plf.addColumnSection({"title":"Employee Details",columnWidth:1});
			var NameCtrl=
			[	
			plf.addHidden({"label":"CustomerID",id:"strCode"}),
			plf.addDisplayOnly({"label":"First Name",id:"strCustomerName",InputLength:"100",inputFormat:"string",blankText:"Please provide your first name."}),
			plf.addText({"label":"Last Name",id:"strLastName",InputLength:"100",inputFormat:"string"}),
			plf.addText({"label":"Designation",id:"strDesignation",InputLength:"100",inputFormat:"string"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addDisplayOnly({"label":"Reference Indicator",id:"strRefIndicator",InputLength:"70",inputFormat:"string"}),			
			plf.addDisplayOnly({"label":"Preferred Login Name",id:"strPrefLogin",InputLength:"30",inputFormat:"string",blankText:"Please provide your preferred login name."}),
			plf.addText({"label":"Phone No",id:"strLandlineNo",InputLength:"50",inputFormat:"string"}), 
			plf.addDisplayOnly({"label":"Email",id:"strEmail",inputFormat:"email",InputLength:"50",blankText:"Please provide your email."}),
			plf.addText({"label":"GSM",id:"strMobileNo",inputFormat:"string",InputLength:"20"}),		
			plf.addText({"label":"Fax",id:"strFax",inputFormat:"string",InputLength:"70"}),
			plf.addText({"label":"Organization Name",id:"strOrgName",inputFormat:"string",InputLength:"80"}),
			plf.addText({"label":"Department",id:"strDepartment",inputFormat:"string",InputLength:"80"}),
			plf.addText({"label":"Purchasing Group",id:"strPurchaseGroup",inputFormat:"string",InputLength:"80"})
			]  
			ShipperBasicDtl.add(NameCtrl)
			 
			plf.columns=4
			//ShipperDtl.add(postedTrkCtrl)
			
			var ManagersBasicDtl = plf.addColumnSection({"title":"Contract Holder Details",columnWidth:1});
		 	
			var ManagersCtrl=
			[
			plf.addDisplayOnly({"label":"Contract Holder Name",id:"strContractHolderName",inputFormat:"string",InputLength:"80"}),
			plf.addDisplayOnly({"label":"Reference Indicator",id:"strContRefIndicator",inputFormat:"string",InputLength:"70"}),			
			plf.addDisplayOnly({"label":"Phone No",id:"strContPhoneNo",inputFormat:"string",InputLength:"70"}), 
			plf.addDisplayOnly({"label":"Email",id:"strContEmail",inputFormat:"string",InputLength:"100"}), 
			plf.addText({"label":"GSM",id:"strContGSM",inputFormat:"string",InputLength:"70"})			
			]
			
			ManagersBasicDtl.add(ManagersCtrl)
						
			 mainpage.ptrMainSection.add(ShipperBasicDtl);			
			 mainpage.ptrMainSection.add(ManagersBasicDtl);
		
						
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
					"input":["strCode","strCustomerName","strLastName","strDesignation","strRefIndicator","strPrefLogin","strLandlineNo","strEmail",
			         "strMobileNo","strFax","strOrgName","strDepartment","strPurchaseGroup",
					 "strContractHolderName","strContRefIndicator","strContPhoneNo","strContEmail","strContGSM"],
					"service":"FXCoreTS",
					"methodName":"FXPORTAL_PDOAPPROVALTS"				
				},
				{
                    "controlid":"",
					"tasktype":"toolbarclick",
					"action":"Reject",
					"input":["strCode","strRegType","dtEffectiveFrom","dtEffectiveTo","strCustCat"],
					"service":"FXCoreTS",
					"methodName":"FXPORTAL_PDOREJECTAPPROVALTS"				
				}

			]
			
	
		
			this.callParent(arguments);
			
        }

    });