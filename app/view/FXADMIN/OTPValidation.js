/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	Divya																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.FXADMIN.OTPValidation', 
{
extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "OTP Validation";
		// Add Toolbar
		mainpage.toolbarSectionFlag=false;
 
		mainpage.toolbarActions= [
			/*{
                "name": "Save",
                "tooltip": "Click here to save a Password Policy."
            }*/
            ]		
		
		plf.columns=3//1
		var otpValidationHdrColumn = plf.addColumnSection({title:""});				
		var otpValidationFormCtrl=																			
		[
		plf.addBlank(),
		//plf.addDisplayOnly({"labelWidth":480,"label":"User ID",id:"strUserId"}),
		plf.addDisplayOnly({"label":"User ID",id:"strUserId"}),
		plf.addBlank(),
		plf.addBlank(),
		plf.addDisplayOnly({"label":"User Name",id:"strUserName"}),
		plf.addBlank(),
		plf.addBlank(),
		//plf.addDisplayOnly({"labelWidth":480,"label":"Email ID",id:"strEmailId"}),
		plf.addDisplayOnly({"label":"Email ID",id:"strEmailId"}),
		plf.addBlank(),
		plf.addBlank(),
		//plf.addText({"labelWidth":480,"label":"Enter Your OTP",id:"strNewPassword","mandatory":"true"}),
		plf.addText({"label":"Enter Your OTP",id:"strNewPassword","mandatory":"true",inputType:'password'}),
		plf.addBlank(),
		plf.addBlank(),
		plf.addButton({"label":"Submit","id":"Submit",width:100})
		]		
		otpValidationHdrColumn.add(otpValidationFormCtrl);
		
	
		mainpage.ptrMainSection.add(otpValidationHdrColumn)
	
		
		mainpage.eventHandlers = 
		[	
		/*{
				"controlid":"",
				"tasktype":"onload",
				"input":["strUserId"],
				"service":"CoreAdminService",
				"methodName":"initOTPValidation"
			},*/
            {		 
				"controlid":"Submit",
				"tasktype":"btnclick",
				"input":[
						"strUserId","strEmailId","strNewPassword","strUserName"										
						],
				"service":"CoreAdminService", 
				"methodName":"submitOTPValidation"
							
			}
		
		]
		
	
		mainpage.hlpLinks=
		{			
		}
		this.callParent(arguments);
	}
});