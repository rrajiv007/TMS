/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.OrganisationHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true; 
		mainpage.startPainting();
		mainpage.screenName = "Organisation Help";
		
		//Driver Search Section Begins 
		plf.columns=3
		helpOnOrgHdrCollapse = plf.addColumnSection({title:"", collapsed: true}); 
		
		orgSearchCtrl=
		[
			plf.addText({"label":"Organisation Code",id:"strOrgCodeFrom"}),
			plf.addText({"label":"Organisation Name",id:"strOrgName"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Parent Entity",id:"strParentEntity"}),
			//plf.addCombo({"label":"Entity Type",id:"strEntityType"}),
			plf.addText({"label":"Address",id:"strAddress"}),
			plf.addCombo({"label":"Country",id:"strCountry"}),
			plf.addCombo({"label":"State",id:"strState"}),
			plf.addCombo({"label":"City",id:"strCity"}),
			plf.addText({"label":"Zipcode",id:"strZipCode"}),
			plf.addButton({"label":"Search","id":"btnSearch"})
		]
		
		helpOnOrgHdrCollapse.add(orgSearchCtrl);
		//Driver Search Section Ends
		
		//Driver Grid Section Begins
		OrgGridFieldObj=
		[ 
			
			{columnname:"Organisation Code",dataname:"ORG_UNIT_CODE",datatype:"string",width:150}, 
			{columnname:"Organisation Name",dataname:"ORG_UNIT_NAME",datatype:"string",width:160},
			//{columnname:"Entity Type",dataname:"ENTITY_TYPE",datatype:"string",width:130},
			{columnname:"Parent Entity",dataname:"PARENT_ENTITY",datatype:"string",width:130},
			//{columnname:"Company Code",dataname:"COMPANY_CODE",datatype:"string",width:150},
			{columnname:"Address",dataname:"ADDRESS",datatype:"string",width:150},			
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",width:130},
			{columnname:"State",dataname:"STATE",datatype:"string",width:130},
			{columnname:"City",dataname:"CITY",datatype:"string",width:130},
			{columnname:"Zip Code",dataname:"ZIPCODE",datatype:"string",width:130},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:130}
			
		]
		OrgGridDtl=
		{
			title:"",
			id:"OrgGridDtl",
			detail:OrgGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true,
			removeTbar:false
		}
		
		helpGridSection = plf.addGrid(OrgGridDtl,this)
		mainpage.hlpSearchGridPtr = helpGridSection 
		//violationGridSection = plf.addGrid(vio
			
		mainpage.ptrMainSection.add(helpOnOrgHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	       {
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreAdminService",
					"methodName":"initOrgTS"
				},
					
				{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strOrgCodeFrom","strOrgName","strStatus","strParentEntity","strAddress","strCountry","strState","strCity","strZipCode"],
					"service":"CoreAdminService",
					"methodName":"fetchAllOrgTS"
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
