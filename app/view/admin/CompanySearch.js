/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.CompanySearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Company Summary";
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Create Company","linkid":"ad_companyMasterScr","tooltip":"Click here to create a company."}
		]
		
		//Group Company Search Section Begins 
		plf.columns=4
		helpOnCompanyHdrCollapse = plf.addCollapseSection({title:"Search Criteria", collapsed: true,btnID:"btnSearch"},this); 
		companySearchCtrl=
		[
			plf.addText({"label":"Company Code",id:"strCompanyCodeFrom"}),
			plf.addText({"label":"Company Name",id:"strCompanyName"}),
			plf.addCombo({"label":"Parent Entity",id:"strParentEntity"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Address",id:"strAddress"}),
			plf.addCombo({"label":"Country",id:"strCountry"}),
			plf.addCombo({"label":"State",id:"strState"}),
			plf.addCombo({"label":"City",id:"strCity"}),
			plf.addText({"label":"Zipcode",id:"strZipCode"})
		    //plf.addButton({"label":"Search","id":"btnSearch"})
		]
		helpOnCompanyHdrCollapse.add(companySearchCtrl);
		//Group Company Search Section Ends
		
		//Group Company Grid Section Begins
		CompanyGridFieldObj=
		[
			{columnname:"Company Code",dataname:"COMPANY_CODE",datatype:"string",width:150,linkId:"CompanyMaster"}, 
			{columnname:"Company Name",dataname:"COMPANY_NAME",datatype:"string",width:160},
			{columnname:"Parent Entity",dataname:"PARENT_ENTITY",datatype:"string",width:130},
			{columnname:"Address",dataname:"ADDRESS",datatype:"string",width:150},			
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",width:130},
			{columnname:"State",dataname:"STATE",datatype:"string",width:130},
			{columnname:"City",dataname:"CITY",datatype:"string",width:130},
			{columnname:"Zip Code",dataname:"ZIPCODE",datatype:"string",width:130},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:130}
		]
		CompanyGridDtl=
		{
			title:"",
			id:"CompanyGridDtl",
			detail:CompanyGridFieldObj,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true,
			widthBasis:"flex"
		}
		helpGridSection = plf.addGrid(CompanyGridDtl,this)
		mainpage.hlpSearchGridPtr = helpGridSection 
		//Group Company Grid Section Ends
			
		mainpage.ptrMainSection.add(helpOnCompanyHdrCollapse)//Add Search Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	       {
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreAdminService",
					"methodName":"initCompanyTS"
				},
					
				{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strCompanyCodeFrom","strCompanyName","strStatus","strParentEntity","strAddress",
							"strCountry","strState","strCity","strZipCode"
							],
					"service":"CoreAdminService",
					"methodName":"fetchAllCompanyTS"
				},
				{
				"controlid":"strCountry",
				"tasktype":"onchange",
				"input":["strCountry"],
				"service":"CoreAdminService",
				"methodName":"sumonchangeENTCountryTS"
				},		
				{
				"controlid":"strState",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreAdminService",
				"methodName":"sumonchangeENTStateTS"
				}
			
		];
		// Event Handlers Mapping Begins
				
		mainpage.screenLinks=
		{
			
				"ad_companyMasterScr":
				{
					"dest":"admin.CompanyMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"CompanyMaster":
				{
					"dest":"admin.CompanyMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"COMPANY_CODE","dest":"strCompanyCode"}
							]
				}
		}
		this.callParent(arguments);
		
	}
});
