/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.RoleMasterHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.hlpSectionFlag=true; 
		mainpage.startPainting();		
		mainpage.screenName = "Role Help";						
		plf.columns = 3
		var roleHdrCollapse = plf.addColumnSection({title:"", collapsed: true}); 
		var roleHdrColumn=
		[
			plf.addText({"label":"Role ID",id:"strRoleIdFrom",inputFormat:"string",InputLength:"100"}),
			plf.addText({"label":"Role Name",id:"strRoleDesc",inputFormat:"string",InputLength:"100"}),
			plf.addCombo({"label":"Entity Type",id:"strEntityType"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addButton({"label":"Search","id":"btnSearch"})			
		]
		
		roleHdrCollapse.add(roleHdrColumn);
		var roleGridFieldObj=
		[
			{columnname:"Role ID",dataname:"ROLE_ID",datatype:"string",width:300},
			{columnname:"Role Name",dataname:"ROLE_NAME",datatype:"string",width:300},			
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:300}
		]
		var roleGridDtl=
		{
			title:"",
			id:"roleGrid",
			detail:roleGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true,
			removeTbar:false
		}
		roleGridSection = plf.addGrid(roleGridDtl,this)	
		mainpage.hlpSearchGridPtr = roleGridSection 
		//HelpOn3PL Grid Section Ends
		
		//Add Child Sections
	
		mainpage.ptrMainSection.add(roleHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(roleGridSection) //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreAdminService",
				"methodName":"initRoleSrchTS"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strRoleIdFrom","strRoleDesc","strStatus","strEntityType"],
				"service":"CoreAdminService",
				"methodName":"FETCHALLRoleSrchTS"
			}
			
		
		];
		//Event Handlers Mapping Ends
			
		
		
		
		this.callParent(arguments);
		
	}
});
