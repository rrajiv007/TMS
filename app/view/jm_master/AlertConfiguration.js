/***********************************************************************************************************
							      Modification History        									                               	
************************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	                           Added var for all local variable        
************************************************************************************************************/
Ext.define('CueTrans.view.jm_master.AlertConfiguration', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
			
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Alert Configuration";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
	//	mainpage.toolbarActions=["refresh","create","edit","delete","activate","inactivate"]
		
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create alert configuration."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit alert configuration."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete alert configuration."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate alert configuration."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate alert configuration."
            }
            ]
			
		//TypeMaster Header1 Section Begins
		plf.columns=4
		var alertHeaderColumn = plf.addColumnSection({});  //69995
		var alertHdrCtrl=								   //69995			
		[
		    plf.addHlpText({"label":"Alert Code",id:"strAlertCode","mandatory":"true",hlpLinkID:"alertCode",inputFormat:"string",InputLength:"40"},this),
			plf.addText({"label":"Alert Description",id:"strAlertDesc",inputFormat:"string",InputLength:"100","mandatory":"true"}),
			plf.addCombo({"label":"Module",id:"strModuleId","width":"50","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Alert On",id:"strAlertOn","width":"50","mandatory":"true"}),
			plf.addDate({"label":"Effective From",id:"dtEffectiveFrom","mandatory":"true"}),
			plf.addDate({"label":"Effective To",id:"dtEffectiveTo","mandatory":"true"})
		]
		alertHeaderColumn.add(alertHdrCtrl);
		//alertMasterColumn.add(plf.addStripLine({}));
		//TypeMaster Header1 Section Ends
		
		//TypeMaster Header2 Section Begins
		plf.columns=1
		var alertMasterColumn = plf.addColumnSection({});		//69995
		var alertMstCtrl=										//69995
		[
		    plf.addText({"label":"To",id:"strTo",inputFormat:"string",InputLength:"4000","mandatory":"true"}),
			plf.addText({"label":"CC",id:"strCc",inputFormat:"string",InputLength:"4000"}),
			plf.addText({"label":"BCC",id:"strBcc",inputFormat:"string",InputLength:"4000"}),
			plf.addBlank({}),
			plf.addText({"label":"Subject",id:"strSubject",inputFormat:"string",InputLength:"4000","mandatory":"true"})
			//plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			//plf.addButton({"label":"submit",id:"buttonclick"})
		]
		
		
		var bodyHtmlEditor = plf.addColumnSection({});
		
		bodyHtmlEditor.add({
                 xtype: "container",
                 layout: "column",
                 //cls: plf.getContainerCls(),
                 items: 
				 [
						plf.addDisplayLabel({}),
						 Ext.create('Ext.form.HtmlEditor', {
							itemId:"strBody",
							label:"Body",
							height: 200,
							width:plf.screenWidth-270
						})
                 ]
             })
		/*
			,
			plf.addText({"label":"Body",id:"strBody",inputFormat:"string",InputLength:"4000","mandatory":"true"})		
		*/
		alertMasterColumn.add(alertMstCtrl);
		//alertMasterColumn.add(plf.addStripLine({}));
		//TypeMaster Header2 Section Ends
		
		mainpage.ptrMainSection.add(alertHeaderColumn)	
	    mainpage.ptrMainSection.add(alertMasterColumn)
		mainpage.ptrMainSection.add(bodyHtmlEditor)
		
		//mainpage.ptrMainSection.add(toCCBCCDocDtl)//Add Header Section to Main Page
		//mainpage.ptrMainSection.add(alertSubjectColumn)
		//mainpage.ptrMainSection.add(alertDayGridSection)

		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strAlertCode"],
				"service":"PPLCoreMasterTS",
				"methodName":"initAlertScrTS"
				},
			{
				"controlid":"strModuleId",
				"tasktype":"onchange",
				"input":["strModuleId"],
				"service":"PPLCoreMasterTS",
				"methodName":"fetchAlertOnTS"
				},
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strAlertCode", "strAlertDesc", "strModuleId", "strStatus", "strAlertOn", "dtEffectiveFrom", 
				"dtEffectiveTo", "strTo", "strCc", "strBcc", "strSubject", "strBody"],
				"service":"PPLCoreMasterTS",
				"methodName":"CreateAlertTS"
				},
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strAlertCode", "strAlertDesc", "strModuleId", "strStatus", "strAlertOn", "dtEffectiveFrom", 
				"dtEffectiveTo", "strTo", "strCc", "strBcc", "strSubject", "strBody"],
				"service":"PPLCoreMasterTS",
				"methodName":"editAlertTS"
				},
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strAlertCode", "strAlertDesc", "strModuleId", "strStatus", "strAlertOn", "dtEffectiveFrom", 
				"dtEffectiveTo", "strTo", "strCc", "strBcc", "strSubject", "strBody"],
				"service":"PPLCoreMasterTS",
				"methodName":"deleteAlertTS"
				},
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Activate",
				"input":["strAlertCode", "strAlertDesc", "strModuleId", "strStatus", "strAlertOn", "dtEffectiveFrom", 
				"dtEffectiveTo", "strTo", "strCc", "strBcc", "strSubject", "strBody"],
				"service":"PPLCoreMasterTS",
				"methodName":"ActivateAlertTS"
				},
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Inactivate",
				"input":["strAlertCode", "strAlertDesc", "strModuleId", "strStatus", "strAlertOn", "dtEffectiveFrom", 
				"dtEffectiveTo", "strTo", "strCc", "strBcc", "strSubject", "strBody"],
				"service":"PPLCoreMasterTS",
				"methodName":"InactivateAlertTS"
				},
			
			{
					"controlid":"strAlertCode",
					"tasktype":"onenter",
					"input":["strAlertCode"],
					"service":"PPLCoreMasterTS",
					"methodName":"fetchAlterConfigTS"
			}
			
		];
		mainpage.hlpLinks=
		{
			"alertCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.AlertHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strAlertCode","child":"ALERT_CODE"}
							]
				}
		}
		
		this.callParent(arguments);
			
	}
});
