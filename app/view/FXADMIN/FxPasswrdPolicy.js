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
Ext.define('CueTrans.view.FXADMIN.FxPasswrdPolicy', 
{
extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Password Policy";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
 
		mainpage.toolbarActions= [
			{
                "name": "Save",
                "tooltip": "Click here to save a Password Policy."
            }
            ]	
		
		/*	var tmpUsrPass = plf.addText({"labelWidth":170,"label":"User passwords expire in ",id:"strUsrPass","mandatory":"true",inputFormat:"integer",InputLength:2,cls:"c-portalfieldlabel",columnWidth:.60})
			tmpUsrPass.columnWidth=.60
			tmpUsrPass.height=40
			tmpUsrPass.margin=2
			
			var tmpDays=this.addDisplayOnly({"label":"",value:"days",id:"strdays",cls:"c-fieldlabelforsysparam",columnWidth:.33})
			tmpDays.columnWidth=.40
			tmpDays.height=40
			tmpDays.margin=2
			
			var tmpUsrPassObj = {
                 xtype: "container",
                 layout: "column",	
				 cls:"c-portalcontainer",				 
                 columnWidth: plf.getColumnwidth(),
                 itemId: "cnt_days",
                 items: [
					tmpUsrPass,
					tmpDays
                 ]
             }
			 
			 var tmpUsrPass1 = plf.addText({"labelWidth":170,"label":"Enforce password history",id:"strPassHis","mandatory":"true",inputFormat:"integer",InputLength:2,cls:"c-portalfieldlabel"})
			tmpUsrPass1.columnWidth=.45
			tmpUsrPass1.height=40
			tmpUsrPass1.margin=2
			
			var tmpDays1=this.addDisplayOnly({"label":"",value:"Passwords Remembered",id:"strPas",cls:"c-fieldlabelforsysparam"})
			tmpDays1.columnWidth=.55
			tmpDays1.height=40
			tmpDays1.width=200
			tmpDays1.margin=2
			
			var tmpUsrPassObj1 = {
                 xtype: "container",
                 layout: "column",	
				 cls:"c-portalcontainer",				 
                 columnWidth: plf.getColumnwidth(),
                 itemId: "cnt_pass",
                 items: [
					tmpUsrPass1,
					tmpDays1
                 ]
             }*/
		
		//Policy Setting Starts
		plf.columns=1
		var sysparamHdrColumn = plf.addColumnSection({title:"Policy Setting"});				
		var sysparamFormCtrl=																			
		[
		//plf.addBlank(),
		//tmpUsrPassObj,
		//plf.addBlank(),
		//plf.addBlank(),
		//plf.addBlank(),
		//tmpUsrPassObj1
		plf.addText({"labelWidth":480,"label":"User passwords expire in (days)",id:"strUsrPass","mandatory":"true",inputFormat:"integer",InputLength:2}),
		//plf.addDisplayOnly({value:"days"}),
		plf.addText({"labelWidth":480,"label":"Enforce password history (Passwords Remembered)",id:"strPassHis","mandatory":"true",inputFormat:"integer",InputLength:2}),
		plf.addText({"labelWidth":480,"label":"Inactivate user who have not login for No. of days",id:"strUserInactive","mandatory":"true",inputFormat:"integer",InputLength:2}),
		//plf.addDisplayOnly({value:"Passwords Remembered"}),
		]		
		sysparamHdrColumn.add(sysparamFormCtrl);
		//Policy Setting ends
		
		//Login Attempt starts
		plf.columns=1
		var sysparamHdrColumn1 = plf.addColumnSection({title:"Invalid Login Attempt(lock)"});				
		var sysparamFormCtrl1=																			
		[
		plf.addText({"labelWidth":480,"label":"Account lockout threshold",id:"strAccLock","mandatory":"true",inputFormat:"integer",InputLength:2}),
		]		
		sysparamHdrColumn1.add(sysparamFormCtrl1);
		//Login Attempt ends
		
		//Password Length Starts
		plf.columns=1
		var sysparamHdrColumn2 = plf.addColumnSection({title:"Password Length"});				
		var sysparamFormCtrl2=																			
		[
		plf.addText({"labelWidth":480,"label":"Minimum password length",id:"strMiniPass","mandatory":"true",inputFormat:"integer",InputLength:2}),
		plf.addText({"labelWidth":480,"label":"Maximum password length",id:"strMaxPass","mandatory":"true",inputFormat:"integer",InputLength:2}),
		]		
		sysparamHdrColumn2.add(sysparamFormCtrl2);
		//Password Length ends
		
		//Password age starts
		plf.columns=1
		var sysparamHdrColumn3 = plf.addColumnSection({title:"Password Age (Expiry)"});				
		var sysparamFormCtrl3=																			
		[
		plf.addText({"labelWidth":480,"label":"Minimum Password age",id:"strMinPassAge","mandatory":"true",inputFormat:"integer",InputLength:2}),
		plf.addText({"labelWidth":480,"label":"Maximum password age",id:"strMaxPassAge","mandatory":"true",inputFormat:"integer",InputLength:2}),
		]		
		sysparamHdrColumn3.add(sysparamFormCtrl3);
		//Password age ends
		
		//Password Complexity Starts
		plf.columns=1
		var sysparamHdrColumn4 = plf.addColumnSection({title:"Password Complexity"});		
		var sysparamFormCtrl4=																		
		[		
			plf.addCombo({"labelWidth":480,"label":"Password must be case sensitive",id:"strPassCaseSen","mandatory":"true"}),
		    plf.addText({"labelWidth":480,"label":"Special Characters allowed ",id:"strSplChar","mandatory":"true",inputFormat:"string",InputLength:25}),
			plf.addText({"labelWidth":480,"label":"Lowercase",id:"strLower","mandatory":"true",inputFormat:"integer",InputLength:2}),
			plf.addText({"labelWidth":480,"label":"Uppercase",id:"strUpper","mandatory":"true",inputFormat:"integer",InputLength:2}),
			plf.addText({"labelWidth":480,"label":"Numbers ",id:"strNumber","mandatory":"true",inputFormat:"integer",InputLength:2}),
			plf.addCombo({"labelWidth":480,"label":"Force user to login on first time",id:"strForceUsr","mandatory":"true"}),
			plf.addText({"labelWidth":480,"label":"Change Password frequency",id:"strChangePass","mandatory":"true",inputFormat:"integer",InputLength:2})
		]		
		sysparamHdrColumn4.add(sysparamFormCtrl4);
		//Password Complexity ends
		
		
	
		mainpage.ptrMainSection.add(sysparamHdrColumn)	       
		mainpage.ptrMainSection.add(sysparamHdrColumn1)	
		mainpage.ptrMainSection.add(sysparamHdrColumn2)	
		mainpage.ptrMainSection.add(sysparamHdrColumn3)	
		mainpage.ptrMainSection.add(sysparamHdrColumn4)	
	
		
		mainpage.eventHandlers = 
		[	
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"FXCoreTS",
				"methodName":"FXPORTAL_INITPASSPOLICYTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":[ "strUsrPass","strPassHis","strAccLock","strMiniPass","strMaxPass","strMinPassAge",
				"strMaxPassAge","strPassCaseSen","strSplChar","strLower","strUpper","strNumber","strForceUsr","strChangePass","strUserInactive"],
				"service":"FXCoreTS",
				"methodName":"FXPORTAL_SAVEPASSPOLICYTS"
			}				
		
		
		]
		
	
		mainpage.hlpLinks=
		{
		

				
		}
		this.callParent(arguments);
	},
		 addDisplayOnly: function(inObj) {
             //return {xtype:'container',columnWidth:plf.getColumnwidth(),cls:plf.getContainerCls(),items:plf.addPlainDate(inObj)};
             outObj = {
                 xtype: "container",
                 layout: "column",
                 columnWidth: plf.getColumnwidth(),
                 cls: plf.getContainerCls(),
                 itemId: "cnt_" + inObj.id,
                 items: [
                     plf.addSysParamFieldLabel(inObj),
                     plf.addPlainDisplayOnly(inObj)
                 ]
             }
             return outObj;

         }
});