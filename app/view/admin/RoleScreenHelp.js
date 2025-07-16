/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.RoleScreenHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		mainpage.screenName = "Role Help";
		
	
	plf.columns=3
	helpOnRoleHdrCollapse = plf.addColumnSection({title:"", collapsed: true});
		
		helpOnRoleFormCtrl=
		[
			plf.addText({"label":"Role ID",id:"strRoleIdFrom"}),
			//plf.addText({"label":"Role ID To",id:"strRoleIdTo"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Entity",id:"strEntity"}),
			plf.addButton({"label":"Search","id":"btnSearch"})
		]
		
		helpOnRoleHdrCollapse.add(helpOnRoleFormCtrl);
		
		helpOnRoleGridFieldObj=
		[
			{columnname:"Role ID",dataname:"ROLE_ID",datatype:"string",width:250},
			{columnname:"Role Name",dataname:"ROLE_DESC",datatype:"string",width:250},
			{columnname:"Entity",dataname:"ENTITY",datatype:"string",width:250},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:250}
			
		]
		helpOnRoleGridDtl=
		{
			title:"",
			id:"roleHdrCache",
			detail:helpOnRoleGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			  removeAddDelete:true 
		}
		helpGridSection = plf.addGrid(helpOnRoleGridDtl,this)
		mainpage.hlpSearchGridPtr = helpGridSection
					
		mainpage.ptrMainSection.add(helpOnRoleHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
				{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreAdminService",
					"methodName":"initRoleHelpTS"
				},
					
				{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strRoleIdFrom","strRoleDesc","strEntity"],
					"service":"CoreAdminService",
					"methodName":"fetchAllRoleHelpTS"
				}
			
		];
		
		this.callParent(arguments);
		
	}
});
