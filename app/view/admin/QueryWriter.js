/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.QueryWriter', 
{
extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Query Writer";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Maintain","Active","InActive"]
		
		//Add Keyfields
		mainpage.keyFields=["strTableName"]
		
		//Violation Header Section Starts
		
		plf.columns=3
		roleHdrColumn = plf.addColumnSection({title:""});
		roleFormCtrl=
		[			
			plf.addCombo({"label":"Table Name",id:"strTableName"}),
			plf.addCombo({"label":"Method Name",id:"strMethodName"}),
			plf.addCombo({"label":"Seq No",id:"iSeqNo"}),
			plf.addText({"label":"New Seq No",id:"iNewSeqNo"}),
			plf.addText({"label":"Query Type",id:"strQueryType"}),
			plf.addText({"label":"Process Type",id:"strProcessType"}),
			plf.addText({"label":"Combo Name",id:"strComboName"}),
			plf.addText({"label":"Error ID",id:"strErrorId"}),
			plf.addText({"label":"Success ID",id:"strSuccessId"})							
		]		
		roleHdrColumn.add(roleFormCtrl);

		plf.columns=1
		roleHdrColumn1 = plf.addColumnSection({title:"",height:450});
		roleFormCtrl1=
		[			
			
			plf.addTextArea({"label":"Service Query",id:"strServiceQuery"})					
		]		
		roleHdrColumn1.add(roleFormCtrl1);
		
		//Add Child Sections			
		mainpage.ptrMainSection.add(roleHdrColumn)//Add Header Section to Main Page		
		mainpage.ptrMainSection.add(roleHdrColumn1)//Add Header Section to Main Page	
		//History Data Section
		mainpage.data_his_sec_flag=true;		
		mainpage.eventHandlers = 
			[
			{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreAdminService",
					"methodName":"initQueryWriterScrTS"
			},
			{
					"controlid":"strTableName",
					"tasktype":"onchange",
					"input":["strTableName"],
					"service":"CoreAdminService",
					"methodName":"fetchTablenamescrTS"
			},
			{
					"controlid":"strMethodName",
					"tasktype":"onchange",
					"input":["strTableName","strMethodName"],
					"service":"CoreAdminService",
					"methodName":"fetchMethodnamescrTS"
			},
			{
					"controlid":"iSeqNo",
					"tasktype":"onchange",
					"input":["strTableName","strMethodName","iSeqNo"],
					"service":"CoreAdminService",
					"methodName":"fetchseqnoscrTS"
			},
			{
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Maintain",
				"input":["strTableName","strMethodName","iSeqNo","iNewSeqNo","strQueryType","strProcessType","strComboName","strErrorId","strSuccessId","strServiceQuery"],
				"service":"CoreAdminService",
				"methodName":"maintainquerywriter"
				}
			]
		
		this.callParent(arguments);
		
	}
});
