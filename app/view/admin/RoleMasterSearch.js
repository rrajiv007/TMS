/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.RoleMasterSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Role Summary";
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=
		[
			{"name":"Create Role","linkid":"ad_rolemst","tooltip":"Click here to create a role."}
		]
						
		plf.columns = 4
		roleHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
		roleHdrColumn=
		[
			plf.addText({"label":"Role ID",id:"strRoleIdFrom",inputFormat:"string",InputLength:"100"}),
			plf.addText({"label":"Role Name",id:"strRoleDesc",inputFormat:"string",InputLength:"100"}),
			plf.addCombo({"label":"Entity Type",id:"strEntityType"}),
			plf.addCombo({"label":"Status",id:"strStatus"})
			
		]
		
		roleHdrCollapse.add(roleHdrColumn);
		roleGridFieldObj=
		[
			{columnname:"Role ID",dataname:"ROLE_ID",datatype:"string",width:300,linkId:"roleID"},
			{columnname:"Role Name",dataname:"ROLE_NAME",datatype:"string",width:300},			
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:300}
		]
		roleGridDtl=
		{
			title:"",
			id:"roleGrid",
			detail:roleGridFieldObj,
			visibleRow:plf.searchVisibleRows,
			readonly:true,
			removeAddDelete:true
		}
		roleGridSection = plf.addGrid(roleGridDtl,this)	
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
			
		//Generate Screen Section
		mainpage.screenLinks=
		{
			"roleID":
				{
					"dest":"admin.RoleMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"ROLE_ID","dest":"strRoleIdFrom"}
							]
				},
				"ad_rolemst":
				{
					"dest":"admin.RoleMaster",
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
