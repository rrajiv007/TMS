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
Ext.define('CueTrans.view.FX_REGISTRATION.ShipperSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Registration Summary";
		mainpage.toolbarSectionFlag=true;
		//mainpage.liveScreenFlag=false;	
        mainpage.toolbarLinks=
		[
            
		]
		/****** SEARCH HEADER BEGINS ******/
		
		plf.columns=3
		var RegistrationSumHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: false,btnID:"searchBtn"},this);	
	 	var RegistrationSumFormCtrl=												
		[
		
		plf.addText({"label":"Name","id":"strName"}),	
		plf.addText({"label":"Company Name","id":"strCompanyName"}), 	
		plf.addCombo({"label":"Status","id":"strStatus"}),
		plf.addText({"label":"Preferred Login Name","id":"strPrefLogin"}), 	
		plf.addText({"label":"Contract Holder Name","id":"strContractHolderName"})		
		]
		
		RegistrationSumHdrCollapse.add(RegistrationSumFormCtrl);
		
		/****** SEARCH HEADER ENDS ******/
		
		/****** SEARCH GRID BEGINS ******/
		
		var RegistrationSumGridFieldObj=						
		[
				/*
				{columnname:"Customer Code",dataname:"CUST_CODE",width:150,hidden:true},
				{columnname:"Name",dataname:"NAME",width:150,linkId:"NEXT_LINKID","linkType":"DYN","tooltip":"Click here to launch the Registration Approval screen."},	
				{columnname:"Status",dataname:"STATUS",width:200},		
				{columnname:"Company Name",dataname:"COMP_NAME",width:200},		
				{columnname:"Customer Category",dataname:"CUST_CATEGORY",width:150},					
				{columnname:"Email",dataname:"EMAIL",width:150},
				{columnname:"Contact No",dataname:"CONTACT_NO",width:150},				,
				{columnname:"Preferred Login Name",dataname:"PREFERRED_LOGIN",width:190},
				{columnname:"Contract Holder Name",dataname:"CONT_NAME",width:150}
				*/
				{columnname:"Customer Code",dataname:"CUST_CODE",width:150,hidden:true},
				{columnname:"Name",dataname:"NAME",width:150,linkId:"NEXT_LINKID","linkType":"DYN","tooltip":"Click here to launch the Registration Approval screen."},	
				//{columnname:"Link ID",dataname:"NEXT_LINKID",width:100,hidden:true},
				{columnname:"Status",dataname:"STATUS",width:200},		
				{columnname:"Company Name",dataname:"COMP_NAME",width:200},		
				{columnname:"Customer Category",dataname:"CUST_CATEGORY",width:150},					
				{columnname:"Email",dataname:"EMAIL",width:150},
				{columnname:"Contact No",dataname:"CONTACT_NO",width:150},					
				{columnname:"Preferred Login Name",dataname:"PREFERRED_LOGIN",width:190},
				{columnname:"Contract Holder Name",dataname:"CONT_NAME",width:150}
		]
		var RegistrationSumGridDtl=
		{
			title:"",
			id:"approvalDtl",
	        detail:RegistrationSumGridFieldObj,
		    readOnly:true,
			removeAddDelete:true,
			visibleRow:9
		   }
		var RegistrationSumGridDtlSection = plf.addGrid(RegistrationSumGridDtl,this)
		
		/****** SEARCH GRID ENDS ******/
		
		/****** ADD CHILD  SECTIONS BEGINS HERE ******/
		
		mainpage.ptrMainSection.add(RegistrationSumHdrCollapse)
		mainpage.ptrMainSection.add(RegistrationSumGridDtlSection)
		
		/****** ADD CHILD  SECTIONS ENDS HERE ******/
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""], 
				"service":"FXCoreTS",
				"methodName":"FXPORTAL_INITSHIPSUMMTS"
			},
			{
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strName","strCompanyName","strStatus","strPrefLogin","strContractHolderName"],
				"service":"FXCoreTS",
				"methodName":"FXPORTAL_FETCHSHIPSUMMTS"
			}
		
		];
		mainpage.hlpLinks=
		{

		}
			
		mainpage.screenLinks=
		{
			"OPS_APP":
			{
				"dest":"FX_REGISTRATION.ShipperOPSApproval",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"CUST_CODE","dest":"strCode"},
						{"src":"CUST_CATEGORY","dest":"strCustCat"}
						
						]
			},
			"PDO_APP":
			{
				"dest":"FX_REGISTRATION.ShipperPDOApproval",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"CUST_CODE","dest":"strCode"}
						]
			},
			"PDOOPS_APP":
			{
				"dest":"FX_REGISTRATION.ShipperPDOOPSApproval",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"CUST_CODE","dest":"strCode"},
						{"src":"CUST_CATEGORY","dest":"strCustCat"}
						]
			},
			"VIEW_APP":
			{
				"dest":"FX_REGISTRATION.ViewApproval",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"CUST_CODE","dest":"strCode"},
						{"src":"CUST_CATEGORY","dest":"strCustCat"}
						]
			}
		}	
		
		
		this.callParent(arguments);
		
	}
});
