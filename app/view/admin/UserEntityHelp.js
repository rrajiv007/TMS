 /*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.UserEntityHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true; 
		mainpage.startPainting();
		mainpage.screenName = "Role Entity Help";
		
		//Entity Help Section Begins 
		plf.columns=3
		helpOnEntityHdrCollapse = plf.addColumnSection({title:"", collapsed: true}); 
		entitySearchCtrl=
		[
			plf.addText({"label":"Entity Code",id:"strEntityCode"}),
			plf.addText({"label":"Entity Name",id:"strEntityName"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),			
			plf.addButton({"label":"Search","id":"btnSearch"})
		]
		
		helpOnEntityHdrCollapse.add(entitySearchCtrl);
		//Entity Help Section Ends
		
		//Entity Grid Section Begins
		EntityGridFieldObj=
		[
			{columnname:"Entity Code",dataname:"ENTITY_CODE",datatype:"string",width:150}, 
			{columnname:"Entity Name",dataname:"ENTITY_NAME",datatype:"string",width:150},
			{columnname:"Entity Type",dataname:"ENTITY_TYPE",datatype:"string",width:150},
			{columnname:"Parent Entity",dataname:"PARENT_ENTITY",datatype:"string",width:150},			
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:150}
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
					"methodName":"initROLEEntityTS"
				},
					
				{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strEntityName","strEntityCode","strStatus"],
					"service":"CoreAdminService",
					"methodName":"fetchAllROLEEntityTS"
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
