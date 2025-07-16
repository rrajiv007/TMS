/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
                         
************************************************************************************************/
Ext.define('CueTrans.view.OTOAPP.OTOAppChangePassword', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.30;
		mainpage.popupWidthRatio=.7;	
		mainpage.startPainting();
		
		mainpage.screenName = "Change Password";
		
	
		mainpage.liveScreenFlag=true;
		mainpage.toolbarSectionFlag=true;
		//Add the header portion
		plf.columns=2
		var ChangePasswordColumn = plf.addColumnSection({title:"", collapsed: true});
		
		
		var ChangePasswordFormCtrl=
		[
			plf.addDisplayOnly({"label":"User ID","id":"strNewUserId"}),
			plf.addDisplayOnly({"label":"Username","id":"strUserName"}),
			plf.addDisplayOnly({"label":"Email ID","id":"strEmailId"}),
			plf.addDisplayOnly({"label":"Organization Name","id":"strOrgName"}),
			
			plf.addText({"label":"New Password","id":"strNewPassword","mandatory":"true",inputType:'password'}),
			plf.addText({"label":"Confirm New Password","id":"strPassword","mandatory":"true",inputType:'password'}),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addButton({"label":"Save","id":"Save",tooltip:"Click here to save.",width:100})	

		]
		
		 ChangePasswordColumn.add(ChangePasswordFormCtrl);
		 
				
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(ChangePasswordColumn)
	
		
		
		//History Data Section
		//mainpage.dataHistorySectionFlag=false;
		mainpage.screenLinks=
		{
			
		}	
		
		mainpage.hlpLinks=
		{
		}
		
		mainpage.eventHandlers = 
			[
			   {
				"controlid":"",
				"tasktype":"onload",
				"input":["strNewUserId"],
				"service":"CoreAdminService",
				"methodName":"initOTOAppChangePwd"
		       },
				{
					"controlid":"Save",
					"tasktype":"btnclick",
					"input":["strNewUserId","strNewPassword","strPassword"],
					"service":"CoreAdminService",
					"methodName":"saveOTOAppChangePwd" 
				}
			]
		this.callParent(arguments);
		
	
	}
});