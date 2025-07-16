/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.EntitySearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Entity Summary";
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			
			//{"name":"View Entity Hierarchy","linkid":"vw_entityHierar","tooltip":"Click here to view entity hierarchy."},
			{"name":"Create Entity","linkid":"ad_entityScr","tooltip":"Click here to create an entity."}
			
		]
		
		//Entity Search Section Begins 
		plf.columns=4
		helpOnEntityHdrCollapse = plf.addCollapseSection({title:"Search Criteria", collapsed: true,btnID:"btnSearch"},this); 
		entitySearchCtrl=
		[
			plf.addText({"label":"Entity Code",id:"strEntityCode"}),
			plf.addText({"label":"Entity Name",id:"strEntityName"}),
			plf.addCombo({"label":"Entity Type",id:"strEntityType"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			//plf.addCombo({"label":"Parent Entity",id:"strParentEntity"}),
			plf.addText({"label":"Address 1",id:"strAddress"}),
			plf.addCombo({"label":"Country",id:"strCountry"}),
			plf.addCombo({"label":"State",id:"strState"}),
			plf.addCombo({"label":"City",id:"strCity"}),
			plf.addText({"label":"Zipcode",id:"strZipCode"})
		    //plf.addButton({"label":"Search","id":"btnSearch"})
		]
		helpOnEntityHdrCollapse.add(entitySearchCtrl);
		//Entity Search Section Ends
		
		
		//Entity Grid Section Begins
		EntityGridFieldObj=
		[
			{columnname:"Entity Code",dataname:"ENTITY_CODE",datatype:"string",width:150,linkId:"entityCode"}, 
			{columnname:"Entity Name",dataname:"ENTITY_NAME",datatype:"string",width:160},
			{columnname:"Entity Type",dataname:"ENTITY_TYPE",datatype:"string",width:130},
			{columnname:"Parent Entity",dataname:"PARENT_ENTITY",datatype:"string",width:130},
			{columnname:"Address 1",dataname:"ADDRESS",datatype:"string",width:150},
			{columnname:"Address 2",dataname:"ADDRESS2",datatype:"string",width:150},
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",width:130},
			{columnname:"State",dataname:"STATE",datatype:"string",width:130},
			{columnname:"City",dataname:"CITY",datatype:"string",width:130},
			{columnname:"Zip Code",dataname:"ZIPCODE",datatype:"string",width:130},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:130}
		]
		EntityGridDtl=
		{
			title:"",
			id:"EntityGridDtl",
			detail:EntityGridFieldObj,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true,
			widthBasis:"flex"
		}
		helpGridSection = plf.addGrid(EntityGridDtl,this)
		mainpage.hlpSearchGridPtr = helpGridSection 
		//Entity Grid Section Ends
			
		mainpage.ptrMainSection.add(helpOnEntityHdrCollapse)//Add Search Section to Main Page
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
					"input":["strEntityCode","strEntityName","strEntityType","strStatus","strAddress","strCountry","strState","strCity","strZipCode"],
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
		// Event Handlers Mapping Begins
				
		mainpage.screenLinks=
		{
			
				"ad_entityScr":
				{
					"dest":"admin.EntityMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"entityCode":
				{
					"dest":"admin.EntityMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"ENTITY_CODE","dest":"strEntityCode"},
							{"src":"ENTITY_TYPE","dest":"strEntityType"},
							]
				},
				"vw_entityHierar":
				{
					"dest":"admin.entitytree",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
		this.callParent(arguments);
		
	}
});
