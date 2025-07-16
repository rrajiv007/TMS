Ext.define('CueTrans.view.admin.DefaultPassword', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;			
		mainpage.startPainting();
		mainpage.screenName = "Default Password";
		//Add Keyfields
		mainpage.keyFields=["strUserId","strPassword","strNewPassword","strConfPassword"]
		plf.columns=1
		
		var ChangePasswordCtrl=
		[	
			
			plf.addDisplayOnly({"labelWidth":160,"label":"User ID",id:"strUserId"}),
			plf.addText({"labelWidth":160,"label":"Enter Your Email ID",id:"strEmailId","mandatory":"true",inputFormat:'email'}),
			plf.addText({"labelWidth":160,"label":"Old Password",id:"strPassword","mandatory":"true",inputType:'password'}),
			plf.addText({"labelWidth":160,"label":"New Password",id:"strNewPassword","mandatory":"true",inputType:'password',inputFormat:"Password"}),
			plf.addText({"labelWidth":160,"label":"Confirm New Password",id:"strConfPassword","mandatory":"true",inputType:'password'}),
		    //plf.addButton({"label":"Change Password",id:"ChangePasswordBtn"})			
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
										process_ebpack_service(mainpage,["strUserId","strPassword","strNewPassword","strConfPassword","strEmailId"],"CoreAdminService",null,null,
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
		var ChangePasswordCtrlStrength=
		[				
			plf.addBlank(),
			plf.addBlank(),
			plf.addDisplayLabel({text:"",id:"strNewPwdLength",labelWidth:"0"}),
			plf.addDisplayLabel({text:"",id:"strConfPwdLength",labelWidth:"0"})	    			
	    ]
		var ChangePasswordColumn1 = plf.addColumnSection({columnWidth:.2});
		var ChangePasswordColumn2 = plf.addColumnSection({columnWidth:.2});
		
		var ChangePasswordColumn = plf.addColumnSection({columnWidth:.4});
		var ChangePasswordColumn3 = plf.addColumnSection({columnWidth:.4});
		
		ChangePasswordColumn.add(ChangePasswordCtrl);
		ChangePasswordColumn3.add(ChangePasswordCtrlStrength);
		var tmpSection1 = plf.addColumnSection({columnWidth:.8});
		tmpSection1.add(ChangePasswordColumn);
		tmpSection1.add(ChangePasswordColumn3);
		
		var tmpSection =  plf.addColumnSection({title:""})
		tmpSection.add(ChangePasswordColumn1);
		tmpSection.add(tmpSection1);
		tmpSection.add(ChangePasswordColumn2);
		
		var ChangePasswordCtrlPolicy=
		[				
			plf.addDisplayLabel({text:"* Your password will expire in 90 day(s).",id:"1",labelWidth:"0"}),
			plf.addDisplayLabel({text:"* You must use your newly changed password for atleast 1 day(s).",id:"2",labelWidth:"0"}),
			plf.addDisplayLabel({text:"* You cannot set any of your last 2 passwords as your new password.",id:"3",labelWidth:"0"})	  			,
			plf.addDisplayLabel({text:"* Minimum length of Password should be 3 characters.",id:"4",labelWidth:"0"}),
			plf.addDisplayLabel({text:"* Maximum length of Password can be 5 characters.",id:"5",labelWidth:"0"}),
			plf.addDisplayLabel({text:"* Password should contain atleast any one of these characters: !@#$%^&*()",id:"6",labelWidth:"0"}),
			plf.addDisplayLabel({text:"* Password should contain atleast one number.",id:"7",labelWidth:"0"})
	    ]
		var tmpSection2 =  plf.addColumnSection({title:"Password Policies"})
		tmpSection2.add(ChangePasswordCtrlPolicy)		
		mainpage.ptrMainSection.add(tmpSection)
		//mainpage.ptrMainSection.add(tmpSection2)
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
		}*/
			
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
		
	},
	rankPassword: function(password) 
	{
		
		var rank = {
			TOO_SHORT: 0,
			WEAK: 1,
			MEDIUM: 2,
			STRONG: 3,
			VERY_STRONG: 4
		};
		var upper = /[A-Z]/,
			lower = /[a-z]/,
			number = /[0-9]/,
			special = /[^A-Za-z0-9]/,
			minLength = 8,
			score = 0;

		if (password.length < minLength) {
			return rank.TOO_SHORT; // End early
		}

		// Increment the score for each of these conditions
		if (upper.test(password)) score++;
		if (lower.test(password)) score++;
		if (number.test(password)) score++;
		if (special.test(password)) score++;

		// Penalize if there aren't at least three char types
		if (score < 3) score--;

		if (password.length > minLength) {
			// Increment the score for every 2 chars longer than the minimum
			score += Math.floor((password.length - minLength) / 2);
		}

		// Return a ranking based on the calculated score
		if (score < 3) return rank.WEAK; // score is 2 or lower
		if (score < 4) return rank.MEDIUM; // score is 3
		if (score < 6) return rank.STRONG; // score is 4 or 5
		return rank.VERY_STRONG; // score is 6 or higher
	}
	
});
