/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.Alert.AlertSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
   
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Alert Summary";
		//mainpage.liveScreenFlag=false;
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=
		[
			{"name":"Create Alert Configuration","linkid":"jm_AlertConfiguration","tooltip":"Click here to create an alert."},
		]
		
		
		//HelpOnAlert Search Section starts
		plf.columns=4
		var AlertMasHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
		
		
		//plf.addText({"label":"Employee Code To",id:"strEmployeeCodeTo","anywhereSearch":"true"}),
		
		var AlertMasFormCtrl=
		[
			plf.addText({"label":"Alert Code",id:"strAlertCode"}),	
            plf.addText({"label":"Alert Description",id:"strAlertDesc"}),
			plf.addCombo({"label":"Module",id:"strModuleId"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			//plf.addCombo({"label":"Alert On",id:"strAlertOn"}),
			plf.addDate({"label":"Effective From",id:"dtEffectiveFrom"}),
			plf.addDate({"label":"Effective To",id:"dtEffectiveTo"}),
			plf.addText({"label":"Subject",id:"strSubject"})
		]
		
		AlertMasHdrCollapse.add(AlertMasFormCtrl);
		//HelpOnEmployee Header Section Ends
		
		//HelpOnEmployee Grid Section Begins
		alertMasGridFieldObj=
		[
			{columnname:"Alert Code",dataname:"ALERT_CODE",datatype:"string",width:100,linkId:"Alert","tooltip":"Click here to launch the alert configuration screen."},
			{columnname:"Alert Description",dataname:"ALERT_DESC",datatype:"string",width:100},
			{columnname:"Module",dataname:"MODULE",datatype:"string",width:100},
			//{columnname:"Alert On",dataname:"ALERT_ON",datatype:"string",width:100},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"string",width:100},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"string",width:100},
			{columnname:"Subject",dataname:"SUBJECT",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
		]
		alertMasGridDtl=
		{

		title:"",
		id:"alertDetails",
	    detail:alertMasGridFieldObj,
		readonly:true,
		visibleRow:plf.searchVisibleRows,
		widthBasis:"flex",
		}
		alertMasGridSection = plf.addGrid(alertMasGridDtl,this)	
		//HelpOnEmployee Grid Section Ends
		 
		//Add Child Sections
		
		mainpage.ptrMainSection.add(AlertMasHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(alertMasGridSection) //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[	
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"alertCoreTS",
				"methodName":"initAlertSrch"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strAlertCode", "strAlertDesc", "strModuleId", "strStatus","dtEffectiveFrom", 
				"dtEffectiveTo","strSubject"],
				"service":"alertCoreTS",
				"methodName":"fetchAllAlertSrch"
			},
			
			
			
		];
		//Event Handlers Mapping Ends
		
		mainpage.screenLinks=
		{
			"Alert":
				{
					"dest":"Alert.AlertConfiguration",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"ALERT_CODE","dest":"strAlertCode"},
							{"src":"MODULE","dest":"strModuleId"}							
							]
				},
			"jm_AlertConfiguration":
				{
					"dest":"Alert.AlertConfiguration",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
			

		this.callParent(arguments);
		
	}
});
