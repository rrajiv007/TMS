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
Ext.define('CueTrans.view.FX_REGISTRATION.ShipperRegAppSum', 
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
		
		plf.columns=4
		var RegistrationSumHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: false,btnID:"searchBtn"},this);	
	 	var RegistrationSumFormCtrl=												
		[
		
		plf.addText({"label":"Name","id":"strName"}),	
		plf.addDate({"label":"Effective From","id":"dtEffectiveFrom"}),
		plf.addDate({"label":"Effective To","id":"dtEffectiveTo"}),
		plf.addCombo({"label":"Status","id":"strStatus"}), 	
		plf.addText({"label":"Phone","id":"strPhone"})
		
		]
		
		RegistrationSumHdrCollapse.add(RegistrationSumFormCtrl);
		
		/****** SEARCH HEADER ENDS ******/
		
		/****** SEARCH GRID BEGINS ******/
		
		var RegistrationSumGridFieldObj=						
		[
			//{columnname:"First Name",dataname:"FIRST_NAME",datatype:"string",linkId:"PLAN_SCREEN","tooltip":"Click here to launch the Registration Approval screen.",width:"auto"},
			{columnname:"Preferred Login",dataname:"PREFERRED_LOGIN",datatype:"string",linkId:"PLAN_SCREEN","tooltip":"Click here to launch the Registration Approval screen.",width:"auto"},
		        {columnname:"Customer Code",dataname:"CUST_CODE",width:150,hidden:true},	
				{columnname:"Code Type",dataname:"CODE_TYPE",width:150,hidden:true},	
				{columnname:"Name",dataname:"NAME",width:150},	
				{columnname:"Email",dataname:"EMAIL",width:150},
				{columnname:"Phone No1",dataname:"PHONE1",width:150},
				{columnname:"Company Name",dataname:"COMPANY_NAME",width:150},
				{columnname:"Country",dataname:"COUNTRY",width:150},
				{columnname:"Province",dataname:"PROVINCE",width:150},
				{columnname:"status",dataname:"STATUS",width:150}
				//{columnname:"Type",dataname:"TYPE",width:150},
				//{columnname:"Contact Person Name",dataname:"CON_PERSON",width:150},
				//{columnname:"City",dataname:"CITY",width:150},
				//{columnname:"Phone No2",dataname:"PHONE2",width:150},
				//{columnname:"Remarks",dataname:"REMARKS",width:150,editControl:"textbox"}		
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
				"methodName":"FXPORTAL_INITSHIPAPPTS"
			},
			{
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strName","strPhone","strStatus","dtEffectiveFrom","dtEffectiveTo"],
				"service":"FXCoreTS",
				"methodName":"FXPORTAL_FETCHSHIPAPPTS"
			}
		
		];
		mainpage.hlpLinks=
		{

		}
			
		mainpage.screenLinks=
		{
			"PLAN_SCREEN":
			{
				"dest":"FX_REGISTRATION.ShipperRegAppr",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"CUST_CODE","dest":"strCode"}
						]
			}			
		}	
		
		
		this.callParent(arguments);
		
	}
});
