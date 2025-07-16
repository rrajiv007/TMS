/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.BulkUserMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Bulk User Master";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Save"]
		
		
		
		//Truck Master Section starts

		var formCtrl=[];
		plf.columns=4
		userMasterColumn = plf.addColumnSection({});
		
		
		userMasterFormCtrl=
		[
			plf.addHlpText({"label":"User ID",id:"strBulkUserId",hlpLinkID:"userCode",inputFormat:"string",InputLength:"40"},this),
			//plf.addText({"label":"User Id","id":"strBulkUserId"}),
			plf.addText({"label":"User Name","id":"strUserName",inputFormat:"string",InputLength:"100"}),
			plf.addCombo({"label":"User Status","id":"strUserStatus"}),
			plf.addCombo({"label":"User Type","id":"strUserType"}),
			plf.addText({"label":"Email Id","id":"strEmailId",inputFormat:"email",InputLength:"50"}),
			plf.addText({"label":"Mobile Number","id":"iPhoneNo",inputFormat:"string",InputLength:"20"}),
			plf.addButton({"label":"Get Details","id":"getDetailsBtn"})
		]
		
		userMasterColumn.add(userMasterFormCtrl);
		
		
		userFieldObj=
		[
			{columnname:"User Id",dataname:"USER_ID",datatype:"string",editControl:"textbox",width:100,inputFormat:"string",InputLength:"40"},
			{columnname:"User Name",dataname:"USER_NAME",datatype:"string",editControl:"textbox",width:150,inputFormat:"string",InputLength:"100"},
			{columnname:"Email Id",dataname:"EMAIL_ID",datatype:"string",editControl:"textbox",width:150,inputFormat:"email",InputLength:"50"},
			{columnname:"User Status",dataname:"STATUS",datatype:"string",width:150,editControl:"combo",storeId:"strUserStatusGrid"},
			{columnname:"Reason",dataname:"REASONS",datatype:"string",width:150,editControl:"combo",storeId:"strReasons"},
			{columnname:"User Type",dataname:"USER_TYPE",datatype:"string",width:150,editControl:"combo",storeId:"strUserTypeGrid"},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:150,editControl:"textbox",inputFormat:"string",InputLength:"250"},
			{columnname:"Mobile No",dataname:"PHONE_NUMBER",datatype:"string",width:150,editControl:"textbox",inputFormat:"string",InputLength:"20"},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"string",width:150,editControl:"date"},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"string",width:150,editControl:"date"},
			{columnname:"User Photo",dataname:"",datatype:"string",width:150,editControl:"textbox",inputFormat:"string",InputLength:"60"},
			{columnname:"Created By",dataname:"CREATED_BY",datatype:"string",width:150},
			{columnname:"Created Date",dataname:"CREATED_DATE",datatype:"string",width:150},
			{columnname:"Modified By",dataname:"MODIFIED_BY",datatype:"string",width:150},
			{columnname:"Modified Date",dataname:"MODIFIED_DATE",datatype:"string",width:150}
			
			
		]
		userGridDetail=
		{
			title:"",
			id:"bulkUserGrid",
			detail:userFieldObj
			
		}
		userGridSection = plf.addGrid(userGridDetail)	
		
		
		
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(userMasterColumn)
		mainpage.ptrMainSection.add(userGridSection) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		
			mainpage.eventHandlers = 
			[
                 {
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreAdminService",
					"methodName":"initBulkUserTS"
				},
				{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Save",
					"input":["bulkUserGrid"],
					"service":"CoreAdminService",
					"methodName":"createBulkUserTS"
				} ,
				{       
				"controlid":"getDetailsBtn",
				"tasktype":"btnclick",
				"input":["strBulkUserId","strUserName","strUserStatus","strUserType","iPhoneNo"],
				"service":"CoreAdminService",
				"methodName":"fetchBulkUserDetailsTS"
			}
			
             
			];
		mainpage.hlpLinks=
		{
			"userCode":
				{
					"hlpType":"Header",
					"hlpScreen":"admin.UserHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strBulkUserId","child":"USER_ID"}
							]
				}
		}
			
		
		this.callParent(arguments);
		
	
	}
});
