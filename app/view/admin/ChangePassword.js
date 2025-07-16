/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.ChangePassword', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{ 
	    var mainpage = this;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.35;
		mainpage.popupWidthRatio=.35;		
		mainpage.startPainting();
		mainpage.screenName = "Change Password";
		//Add Keyfields
		mainpage.keyFields=["strUserId","strPassword","strNewPassword","strConfPassword"]
		plf.columns=1
		ChangePasswordColumn = plf.addColumnSection({});
		renderTo:Ext.getBody()
		ChangePasswordCtrl=
		[	
			
			plf.addDisplayOnly({"labelWidth":160,"label":"User ID",id:"strUserId"}),			
			plf.addText({"labelWidth":160,"label":"Enter Your Email ID",id:"strEmailId","mandatory":"true",inputFormat:'email'}),
			plf.addText({"labelWidth":160,"label":"Enter Your Old Password",id:"strPassword","mandatory":"true",inputType:'password'}),
			plf.addText({"labelWidth":160,"label":"Enter Your New Password",id:"strNewPassword","mandatory":"true",inputType:'password'}),
			plf.addText({"labelWidth":160,"label":"Confirm New Password",id:"strConfPassword","mandatory":"true",inputType:'password'}),
		    plf.addButton({"label":"Change Password",id:"ChangePasswordBtn",
			"handler": function() 
			{	
									if (mainpage.queryById("strEmailId").getValue() =="")
									{
										Ext.MessageBox.show({
												'title':'Error', 
												'msg':'Please enter email id.',
												'buttons': Ext.MessageBox.OK,
												icon:Ext.MessageBox["ERROR"]
												})
										form_obj.setLoading(false);										
										return false;
									}
									if (mainpage.queryById("strPassword").getValue() =="")
									{
										Ext.MessageBox.show({
												'title':'Error', 
												'msg':'Please enter old password.',
												'buttons': Ext.MessageBox.OK,
												icon:Ext.MessageBox["ERROR"]
												})
										form_obj.setLoading(false);
										mainpage.queryById("strPassword").setValue("");
										mainpage.queryById("strNewPassword").setValue("");
										mainpage.queryById("strConfPassword").setValue("");
										return false;
									}
									if (mainpage.queryById("strNewPassword").getValue() =="")
									{
										Ext.MessageBox.show({
												'title':'Error', 
												'msg':'Please enter new password.',
												'buttons': Ext.MessageBox.OK,
												icon:Ext.MessageBox["ERROR"]
												})
										form_obj.setLoading(false);
										mainpage.queryById("strPassword").setValue("");
										mainpage.queryById("strNewPassword").setValue("");
										mainpage.queryById("strConfPassword").setValue("");
										return false;
									}
									if (mainpage.queryById("strConfPassword").getValue() =="")
									{
										Ext.MessageBox.show({
												'title':'Error', 
												'msg':'Please enter confirm password.',
												'buttons': Ext.MessageBox.OK,
												icon:Ext.MessageBox["ERROR"]
												})
										form_obj.setLoading(false);
										mainpage.queryById("strPassword").setValue("");
										mainpage.queryById("strNewPassword").setValue("");
										mainpage.queryById("strConfPassword").setValue("");
										return false;
									}
									if (mainpage.queryById("strNewPassword").getValue() != mainpage.queryById("strConfPassword").getValue())
									{
										Ext.MessageBox.show({
													'title':'Error', 
													'msg':'Password does not match.',
													'buttons': Ext.MessageBox.OK,
													icon:Ext.MessageBox["ERROR"]
													})
										form_obj.setLoading(false);
										mainpage.queryById("strPassword").setValue("");
										mainpage.queryById("strNewPassword").setValue("");
										mainpage.queryById("strConfPassword").setValue("");
										return false;
									}
									else									
									{
										mainpage.queryById("methodName").setValue("UserchangePassword");															
										process_ebpack_service(mainpage,["strUserId","strPassword","strNewPassword","strConfPassword","strEmailId"],"CoreAdminService",null, null,
										function()
											{
											window.onbeforeunload = function (evt) 
											{		 
											};	
											window.location.href="";											
											}
										)
										
									}
								}
			})
			
	    ]
		
		ChangePasswordColumn.add(ChangePasswordCtrl);
		mainpage.ptrMainSection.add(ChangePasswordColumn) //Add Header Section to Main Page
		
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{       
				"controlid":"",
				"tasktype":"onload",
				"input":["strUserId"],
			    "service":"CoreAdminService",
				"methodName":"fetchChangePassword"
		}/*,
		{       
				"controlid":"ChangePasswordBtn",
				"tasktype":"btnclick",
				"input":["strUserId","strPassword","strNewPassword"],
			    "service":"CoreLoginService",
				"methodName":"changePassword"
		}
		*/	
		];
		//Generate Screen Section
		/*mainpage.generateScreen();
		
		
		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
		
	}
});
