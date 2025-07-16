/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.UserSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		//mainpage.hlpSectionFlag=true; 
		mainpage.startPainting();
		mainpage.screenName = "User Search";
		
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Create Users in Bulk","linkid":"ad_CreateBulkUser"},
			{"name":"Create Users in Single","linkid":"ad_CreateSingleUser"}
		]
		
		//Driver Search Section Begins 
		//plf.addText({"label":"User Code To",id:"strUserCodeTo"}),
		plf.columns=4
		helpOnUserHdrCollapse = plf.addCollapseSection({title:"Search Criteria", collapsed: true}); 
		
		userSearchCtrl=
		[
			plf.addText({"label":"User Id",id:"strUserCodeFrom"}),
			
			plf.addText({"label":"User Name",id:"strUserName"}),
			plf.addCombo({"label":"Status",id:"strUserStatus"}),
			plf.addCombo({"label":"UserType",id:"strUserType"}),
			plf.addText({"label":"Organization Name",id:"strOrgName"}),
		    plf.addButton({"label":"Search","id":"btnSearch"})
		]
		
		helpOnUserHdrCollapse.add(userSearchCtrl);
		//Driver Search Section Ends
		
		//Driver Grid Section Begins
		UserGridFieldObj=
		[ 
			{columnname:"User Id",dataname:"USER_ID",datatype:"string",width:150,linkId:"UserMaster"}, 
			{columnname:"User Name",dataname:"USER_NAME",datatype:"string",width:150},
			{columnname:"Phone Number",dataname:"PHONE_NUMBER",datatype:"string",width:150},
			{columnname:"Email Id",dataname:"EMAIL_ID",datatype:"string",width:200},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"string",width:150},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"string",width:150},
			
			{columnname:"User Type",dataname:"USER_TYPE",datatype:"string",width:150},
			{columnname:"Organization Name",dataname:"ORGANIZATION_NAME",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100},
			{columnname:"Last logged in",dataname:"LAST_LOGGED_IN",datatype:"string",width:150},
			{columnname:"User Of",dataname:"USER_OF",datatype:"string",width:150}
		//	{columnname:"Reasons",dataname:"REASONS",datatype:"string",width:100}
			//{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:200}
			
		]
		UserGridDtl=
		{
			title:"User Details",
			id:"UserGridDtl",
			detail:UserGridFieldObj,
			visibleRow:plf.searchVisibleRows,
		    removeAddDelete:true
		}
		
		helpGridSection = plf.addGrid(UserGridDtl,this)
		mainpage.hlpSearchGridPtr = helpGridSection 
		//violationGridSection = plf.addGrid(vio
			
		mainpage.ptrMainSection.add(helpOnUserHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	       {
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreAdminService",
					"methodName":"initUserTS"
				},
					
				{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strUserCodeFrom","strUserName","strUserStatus","strUserType","strOrgName"],
					"service":"CoreAdminService",
					"methodName":"fetchAllUserTS"
				}
			
		];
		
		
	mainpage.screenLinks=
		{
			"ad_CreateBulkUser":
				{
					"dest":"admin.BulkUserMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"ad_CreateSingleUser":
				{
					"dest":"admin.UserMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"UserMaster":
				{
					"dest":"admin.UserMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"USER_ID","dest":"strNewUserId"}
							]
				}
			
		}
		this.callParent(arguments);
		
	}
});
