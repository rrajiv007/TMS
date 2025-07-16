/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.Alert.AlertConfiguration', 
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
		alertHeaderColumn = plf.addColumnSection({});
		alertHdrCtrl=
		[
		    plf.addHlpText({"label":"Alert Code",id:"strAlertCode","mandatory":"true",hlpLinkID:"alertCode",inputFormat:"string",InputLength:"40"},this),
			plf.addText({"label":"Alert Description",id:"strAlertDesc",inputFormat:"string",InputLength:"100","mandatory":"true"}),
			plf.addCombo({"label":"Module",id:"strModuleId","width":"50","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Alert On",id:"strAlertOn","mandatory":"true","width":"50"}),
			plf.addDate({"label":"Effective From",id:"dtEffectiveFrom","mandatory":"true"}),
			plf.addDate({"label":"Effective To",id:"dtEffectiveTo","mandatory":"true"})
		]
		alertHeaderColumn.add(alertHdrCtrl);
		//alertMasterColumn.add(plf.addStripLine({}));
		//TypeMaster Header1 Section Ends
		
		//TypeMaster Header2 Section Begins
		plf.columns=1
		alertMasterColumn = plf.addColumnSection({});
		alertMstCtrl=
		[
		    plf.addText({"label":"To",id:"strTo",inputFormat:"string",InputLength:"4000","mandatory":"true",inputFormat:"email"}),
			plf.addText({"label":"CC",id:"strCc",inputFormat:"string",InputLength:"4000",inputFormat:"email"}),
			plf.addText({"label":"BCC",id:"strBcc",inputFormat:"string",InputLength:"4000",inputFormat:"email"}),
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
				"input":["strAlertCode","strModuleId","strAlertOn"],
				"service":"alertCoreTS",
				"methodName":"initAlertScrTS"
				},
			{
				"controlid":"strModuleId",
				"tasktype":"onchange",
				"input":["strModuleId"],
				"service":"alertCoreTS",
				"methodName":"fetchAlertOnTS"
				},
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strAlertCode", "strAlertDesc", "strModuleId", "strStatus", "strAlertOn", "dtEffectiveFrom", 
				"dtEffectiveTo", "strTo", "strCc", "strBcc", "strSubject", "strBody"],
				"service":"alertCoreTS",
				"methodName":"CreateAlertTS"
				},
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strAlertCode", "strAlertDesc", "strModuleId", "strStatus", "strAlertOn", "dtEffectiveFrom", 
				"dtEffectiveTo", "strTo", "strCc", "strBcc", "strSubject", "strBody"],
				"service":"alertCoreTS",
				"methodName":"editAlertTS"
				},
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strAlertCode", "strAlertDesc", "strModuleId", "strStatus", "strAlertOn", "dtEffectiveFrom", 
				"dtEffectiveTo", "strTo", "strCc", "strBcc", "strSubject", "strBody"],
				"service":"alertCoreTS",
				"methodName":"deleteAlertTS"
				},
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Activate",
				"input":["strAlertCode", "strAlertDesc", "strModuleId", "strStatus", "strAlertOn", "dtEffectiveFrom", 
				"dtEffectiveTo", "strTo", "strCc", "strBcc", "strSubject", "strBody"],
				"service":"alertCoreTS",
				"methodName":"ActivateAlertTS"
				},
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Inactivate",
				"input":["strAlertCode", "strAlertDesc", "strModuleId", "strStatus", "strAlertOn", "dtEffectiveFrom", 
				"dtEffectiveTo", "strTo", "strCc", "strBcc", "strSubject", "strBody"],
				"service":"alertCoreTS",
				"methodName":"InactivateAlertTS"
				},
			
			{
					"controlid":"strAlertCode",
					"tasktype":"onenter",
					"input":["strAlertCode"],
					"service":"alertCoreTS",
					"methodName":"fetchAlterConfigTS"
			}
			
		];
		mainpage.hlpLinks=
		{
			"alertCode":
				{
					"hlpType":"Header",
					"hlpScreen":"Alert.AlertHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strAlertCode","child":"ALERT_CODE"}
							//,{"parent":"strAlertDesc","child":"ALERT_DESC"},
							//{"parent":"strModuleId","child":"MODULE"},
							//{"parent":"strStatus","child":"STATUS"},
							//{"parent":"dtEffectiveFrom","child":"EFFECTIVE_FROM"},
							//{"parent":"dtEffectiveTo","child":"EFFECTIVE_TO"}
							]
				}
		}
		
		this.callParent(arguments);
			
	}
});
