/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.UserHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true; 
		mainpage.startPainting();
		mainpage.screenName = "User Help";
		
		//Driver Search Section Begins 
		plf.columns=3
		helpOnUserHdrCollapse = plf.addColumnSection({title:"", collapsed: true}); 
		
		userSearchCtrl=
		[
			plf.addText({"label":"User ID",id:"strUserCodeFrom"}),
		   //plf.addText({"label":"User ID To",id:"strUserCodeTo"}),
		    plf.addCombo({"label":"Status",id:"strUserStatus"}),
			plf.addText({"label":"User Name",id:"strUserName"}),
		
			plf.addCombo({"label":"UserType",id:"strUserType"}),
			plf.addText({"label":"Organization Name",id:"strOrgName"}),
			plf.addBlank(),
			plf.addBlank(),
			plf.addHidden({"label":"Context",id:"strContext"}),	
		    plf.addButton({"label":"Search","id":"btnSearch"})
		]
		
		helpOnUserHdrCollapse.add(userSearchCtrl);
		//Driver Search Section Ends
		
		//Driver Grid Section Begins
		UserGridFieldObj=
		[ 
			{columnname:"User Id",dataname:"USER_ID",datatype:"string",width:100}, 
			{columnname:"User Name",dataname:"USER_NAME",datatype:"string",width:150},
			{columnname:"Phone Number",dataname:"PHONE_NUMBER",datatype:"string",width:100},
			{columnname:"Email Id",dataname:"EMAIL_ID",datatype:"string",width:150},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"string",width:100},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"string",width:100},
			{columnname:"User Type",dataname:"USER_TYPE",datatype:"string",width:150},
			{columnname:"Organization Name",dataname:"ORGANIZATION_NAME",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:75}
			
		//	{columnname:"ZipCode",dataname:"ZIPCODE",datatype:"string",width:100}
			
		]
		UserGridDtl=
		{
			title:"User Details",
			id:"UserGridDtl",
			detail:UserGridFieldObj,
		//Driver Grid Section Ends
		visibleRow:plf.helpVisibleRows,
		//Add Child Sections
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
					"input":["strContext"],
					"service":"CoreAdminService",
					"methodName":"initUserTS"
				},
					
				{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strUserCodeFrom","strUserCodeTo","strUserName","strUserStatus","strUserType","strOrgName"],
					"service":"CoreAdminService",
					"methodName":"fetchAllUserTS"
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
