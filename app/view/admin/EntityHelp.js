 /*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.EntityHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true; 
		mainpage.startPainting();
		mainpage.screenName = "Entity Help";
		
		//Entity Help Section Begins 
		plf.columns=3
		helpOnEntityHdrCollapse = plf.addColumnSection({title:"", collapsed: true}); 
		entitySearchCtrl=
		[
			plf.addText({"label":"Entity Code",id:"strEntityCode"}),
			plf.addText({"label":"Entity Name",id:"strEntityName"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Entity Type",id:"strEntityType"}),
			//plf.addCombo({"label":"Parent Entity",id:"strParentEntity"}),
			plf.addText({"label":"Address 1",id:"strAddress"}),
			plf.addCombo({"label":"Country",id:"strCountry"}),
			plf.addCombo({"label":"State",id:"strState"}),
			plf.addCombo({"label":"City",id:"strCity"}),
			plf.addText({"label":"Zipcode",id:"strZipCode"}),
			plf.addButton({"label":"Search","id":"btnSearch"})
		]
		
		helpOnEntityHdrCollapse.add(entitySearchCtrl);
		//Entity Help Section Ends
		
		//Entity Grid Section Begins
		EntityGridFieldObj=
		[
			{columnname:"Entity Code",dataname:"ENTITY_CODE",datatype:"string",width:100}, 
			{columnname:"Entity Name",dataname:"ENTITY_NAME",datatype:"string",width:100},
			{columnname:"Entity Type",dataname:"ENTITY_TYPE",datatype:"string",width:100},
			{columnname:"Parent Entity",dataname:"PARENT_ENTITY",datatype:"string",width:100},
			{columnname:"Address 1",dataname:"ADDRESS",datatype:"string",width:100},
			{columnname:"Address 2",dataname:"ADDRESS2",datatype:"string",width:100},
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",width:100},
			{columnname:"State",dataname:"STATE",datatype:"string",width:100},
			{columnname:"City",dataname:"CITY",datatype:"string",width:100},
			{columnname:"Zip Code",dataname:"ZIPCODE",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
		]
		EntityGridDtl=
		{
			title:"",
			id:"EntityGridDtl",
			detail:EntityGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true,
			removeTbar:false
		}
		helpGridSection = plf.addGrid(EntityGridDtl,this)
		mainpage.hlpSearchGridPtr = helpGridSection 
		//Entity Grid Section Ends
			
		mainpage.ptrMainSection.add(helpOnEntityHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	       {
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreAdminService",
					"methodName":"initScrEntityTS"
				},
					
				{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strEntityCode","strEntityName","strEntityType","strStatus","strParentEntity","strAddress","strCountry","strState","strCity","strZipCode"],
					"service":"CoreAdminService",
					"methodName":"fetchAllEntityTS"
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
