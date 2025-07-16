 /*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.CompanyHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true; 
		mainpage.startPainting();
		mainpage.screenName = "Company Help";
		
		//Group Company Help Section Begins 
		plf.columns=3
		helpOnCompanyHdrCollapse = plf.addColumnSection({title:"", collapsed: true}); 
		companySearchCtrl=
		[
			plf.addText({"label":"Company Code",id:"strCompanyCodeFrom"}),
			plf.addText({"label":"Company Name",id:"strCompanyName"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Parent Entity",id:"strParentEntity"}),
			plf.addText({"label":"Address",id:"strAddress"}),
			plf.addCombo({"label":"Country",id:"strCountry"}),
			plf.addCombo({"label":"State",id:"strState"}),
			plf.addCombo({"label":"City",id:"strCity"}),
			plf.addText({"label":"Zipcode",id:"strZipCode"}),
		    plf.addBlank({}),
			plf.addButton({"label":"Search","id":"btnSearch"})
			
		]
		
		helpOnCompanyHdrCollapse.add(companySearchCtrl);
		//Group Company Help Section Ends
		
		//Group Company Grid Section Begins
		CompanyGridFieldObj=
		[
			{columnname:"Company Code",dataname:"COMPANY_CODE",datatype:"string",width:150}, 
			{columnname:"Company Name",dataname:"COMPANY_NAME",datatype:"string",width:150},
			{columnname:"Parent Entity",dataname:"PARENT_ENTITY",datatype:"string",width:130},
			{columnname:"Address",dataname:"ADDRESS",datatype:"string",width:110},			
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",width:100},
			{columnname:"State",dataname:"STATE",datatype:"string",width:100},
			{columnname:"City",dataname:"CITY",datatype:"string",width:100},
			{columnname:"Zip Code",dataname:"ZIPCODE",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
		]
		CompanyGridDtl=
		{
			title:"",
			id:"CompanyGridDtl",
			detail:CompanyGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true,
			removeTbar:false
		}
		helpGridSection = plf.addGrid(CompanyGridDtl,this)
		mainpage.hlpSearchGridPtr = helpGridSection 
		//Group Company Grid Section Ends
			
		mainpage.ptrMainSection.add(helpOnCompanyHdrCollapse)//Add Header Section to Main Page
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
		
		
	/*	mainpage.screenLinks=
		{
			"ViolationMaster":
				{
					"dest":"jm_master.ViolationMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"VIOLATION_CODE","dest":"strViolationCode"}
							]
				}
		}
		//Event Handlers Mapping Ends
			
		//Generate Screen Section
		//mainpage.generateScreen();
		
		
		/*Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
		
	}
});
