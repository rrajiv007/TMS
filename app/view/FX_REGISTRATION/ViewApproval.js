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
Ext.define('CueTrans.view.FX_REGISTRATION.ViewApproval',
   { 
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

	
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "View Shipper Registration";
			mainpage.toolbarSectionFlag=true;			
			//mainpage.liveScreenFlag=false;
			/**/
			
			
			/*Header Section starts here*/
			plf.columns=2
			var parentForm =this;
			
			
			var baseCarrPanel = plf.addColumnSection({});
			
			 
		 	plf.columns=4
			var ShipperBasicDtl = plf.addColumnSection({"title":"Employee Details",columnWidth:1});
			var NameCtrl=
			[	
			
			plf.addHidden({"label":"CustomerID",id:"strCode"}),
			plf.addDisplayOnly({"label":"First Name",id:"strCustomerName",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Middle Name",id:"strMiddleName",InputLength:"100",inputFormat:"string"}), 
			plf.addDisplayOnly({"label":"Last Name",id:"strLastName",InputLength:"100",inputFormat:"string"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addDisplayOnly({"label":"Designation",id:"strDesignation",InputLength:"100"}),
			plf.addDisplayOnly({"label":"GSM",id:"strMobileNo",inputFormat:"string",InputLength:"20"}),
			plf.addDisplayOnly({"label":"Email",id:"strEmail",inputFormat:"email",InputLength:"50"}),
			plf.addDisplayOnly({"label":"Landline Number",id:"strLandlineNo",InputLength:"50",inputFormat:"string"}), 
			plf.addDisplayOnly({"label":"Extension Number",id:"strExtnNo",InputLength:"50",inputFormat:"string"}),
			plf.addDisplayOnly({"label":"Preferred Login Name",id:"strPrefLogin",inputFormat:"string",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Customer Category",id:"strCustCat"}),		
			plf.addDisplayOnly({"label":"Fax",id:"strFax",inputFormat:"string",InputLength:"70"}),
			plf.addDisplayOnly({"label":"Organization Name",id:"strOrgName",inputFormat:"string",InputLength:"80"}),
			plf.addDisplayOnly({"label":"Department",id:"strDepartment",inputFormat:"string",InputLength:"80"}),
			plf.addDisplayOnly({"label":"Purchasing Group",id:"strPurchaseGroup",inputFormat:"string",InputLength:"80"})
			]  
			ShipperBasicDtl.add(NameCtrl)
			
			var ContractBasicDtl = plf.addColumnSection({"title":"Contract Holder Details",columnWidth:1});
		 	
			var ContractCtrl=
			[
			plf.addDisplayOnly({"label":"Contract Holder Name",id:"strContractHolderName",inputFormat:"string",InputLength:"80"}),
			plf.addDisplayOnly({"label":"Reference Indicator",id:"strContRefIndicator",inputFormat:"string",InputLength:"70"}),			
			plf.addDisplayOnly({"label":"Phone No",id:"strContPhoneNo",inputFormat:"string",InputLength:"70"}), 
			plf.addDisplayOnly({"label":"Email",id:"strContEmail",inputFormat:"string",InputLength:"100"}), 
			plf.addDisplayOnly({"label":"GSM",id:"strContGSM",inputFormat:"string",InputLength:"70"})			
			]
			
			ContractBasicDtl.add(ContractCtrl)
			
			plf.columns=4
			//ShipperDtl.add(postedTrkCtrl)
			
			var ManagersBasicDtl = plf.addColumnSection({"title":"Company Details",columnWidth:1});
		 	
			var ManagersCtrl=
			[
			plf.addDisplayOnly({"label":"Company Name",id:"strCompanyName",inputFormat:"string",InputLength:"100",blankText:"Please provide your company's name."}),
			plf.addDisplayOnly({"label":"Company Category",id:"strCompanyCategory",inputFormat:"string",InputLength:"50"}),
			plf.addDisplayOnly({"label":"Company Reg No",id:"strCompanyRegNo",inputFormat:"string",InputLength:"50",blankText:"Please provide your company's registration number."}),
			plf.addDisplayOnly({"label":"Project/Dept Code",id:"strProjectCode",InputLength:"100",inputFormat:"string",blankText:"The project/department code is required."}),
			plf.addDisplayOnly({"label":"Project/Dept Name",id:"strProjectName",InputLength:"100",inputFormat:"string",blankText:"The project/department name is required."}),			
			plf.addDisplayOnly({"label":"Year of Establishment",id:"strYearsofEst",inputFormat:"integer",InputLength:"4"}),
			plf.addDisplayOnly({"label":"Cost Center Code",id:"strCostCenter",InputLength:"100",inputFormat:"string",blankText:"The cost center code field is required."}),
			plf.addDisplayOnly({"label":"Cost Center Description",id:"strCostCenterDesc",InputLength:"100",inputFormat:"string",blankText:"The cost center description is required."}),
			plf.addDisplayOnly({"label":"Website",id:"strWebsite",InputLength:"100",inputFormat:"string"}),
			plf.addDisplayOnly({"label":"Phone No",id:"strComPhoneNo",InputLength:"20",inputFormat:"string"}), 
			plf.addDisplayOnly({"label":"Extension Number",id:"strComExtnNo",InputLength:"50",inputFormat:"string"})			
			]
						
			ManagersBasicDtl.add(ManagersCtrl)
			
			var ContactDtl = plf.addColumnSection({"title":"Address Details",columnWidth:1});
			var ContactCtrl=
			[
			plf.addDisplayOnly({"label":"Line1",id:"strAddress",InputLength:"200",inputFormat:"string"}),
			plf.addDisplayOnly({"label":"Line2",id:"strAddress1",InputLength:"200",inputFormat:"string"}),
			plf.addDisplayOnly({"label":"Country",id:"strCountry",InputLength:"50"}),
			plf.addDisplayOnly({"label":"Province",id:"strProvince",InputLength:"50"}),
			plf.addDisplayOnly({"label":"Area",id:"strArea",InputLength:"50"}),
			plf.addDisplayOnly({"label":"City",id:"strCity",InputLength:"50",inputFormat:"string",InputLength:"50"}),
			plf.addDisplayOnly({"label":"Phone No",id:"strPhoneNo",inputFormat:"string",InputLength:"20"})
		
			]
			
			
			//ContactDtl.add(ContactDtl1)  
			ContactDtl.add(ContactCtrl)  
			
			 mainpage.ptrMainSection.add(ShipperBasicDtl);	
			 mainpage.ptrMainSection.add(ContractBasicDtl);	
			 
			 mainpage.ptrMainSection.add(ManagersBasicDtl);
			 mainpage.ptrMainSection.add(ContactDtl);
	 
		
						
		 	 mainpage.eventHandlers = 
			[
			{
					"controlid":"",
					"tasktype":"onload",
					"input":["strCode"],
					"service":"FXCoreTS",
					"methodName":"FXPORTAL_INITREGOPSAPPTS"
				}

			]
			
	
		
			this.callParent(arguments);
			
        }

    });