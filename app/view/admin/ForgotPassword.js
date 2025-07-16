Ext.define('CueTrans.view.admin.ForgotPassword', 
{
	extend:"CueTrans.lib.plfTransScreen",
	//autoHeight: true,
    //region: "center",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.25;
		mainpage.popupWidthRatio=.25;	
		mainpage.startPainting();
		mainpage.screenName = "Forgot Password?";
		//Add Keyfields
		mainpage.keyFields=["strUserId"]
		
		plf.columns=1
		var ForgotPasswordColumn = plf.addColumnSection({});
		
		var ForgotPasswordCtrl=
		[	
			
			plf.addText({"label":"Enter Your User ID",id:"strLoginUserId","mandatory":"true",blankText:"Please provide your User ID."}),
			//plf.addText({"label":"Enter Your Email ID",id:"strEmailId","mandatory":"true",inputFormat:'email'}),
		     plf.addButton({"label":"Reset Password",id:"ResetPasswordBtn"})
			
	    ]
		
		ForgotPasswordColumn.add(ForgotPasswordCtrl);
		mainpage.ptrMainSection.add(ForgotPasswordColumn) //Add Header Section to Main Page
		
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{       
				"controlid":"ResetPasswordBtn",
				"tasktype":"btnclick",
				"input":["strLoginUserId","strEmailId"],
			    "service":"FXCoreTS",
				//"methodName":"FXPORTAL_USERFORGOTPASSWRD",
				"methodName":"ADMIN_USERFORGOTPASSWRD",
				"callbackMethod":function()
				{
					Ext.MessageBox.show({
					'title':'Success', 
					'msg':'Password sent to mail id.',
					'buttons': Ext.MessageBox.OK,
					icon:'success_check_icon'
					})
					window.onbeforeunload = function (evt) 
					{		 
					};	
					window.location.href="";	
				}
		}
			
		];
		this.callParent(arguments);
		
	}
});
