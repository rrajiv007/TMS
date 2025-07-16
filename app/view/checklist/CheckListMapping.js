Ext.define('CueTrans.view.checklist.CheckListMapping', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "CheckList Mapping";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["maintain"]
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Go to CheckList","linkid":"cl_Checklist"}
		]
		
		
		//Add Keyfields
		mainpage.keyFields=["strInspectionType"]
		
		//Check List Master Section Begins
		plf.columns=4
		checkListMasterColumn = plf.addColumnSection({});
		
		checkListMasterFormCtrl=
		[
			//plf.addText({"label":"CheckList Code",id:"strChkListCode"}),
			//plf.addText({"label":"CheckList Name",id:"strChkListName"}),
			//plf.addCombo({"label":"Critical",id:"strCriticalYN","mandatory":"true"}),
			//plf.addBlank(),
			//plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			//plf.addButton({"label":"submit",id:"buttonclick"})
			plf.addCombo({"label":"Inspection Type",id:"strInspectionType"})
		]
		
		checkListMasterColumn.add(checkListMasterFormCtrl);
		//Check List Master Header Section Ends
		
		//Check List Master Grid Section Begins
	checkListGridFieldObj=
		[
			//{columnname:"Detail Seq No",dataname:"CHKLST_DTL_SEQ_NO",datatype:"string",editControl:"textbox",width:140},
			{columnname:"CheckList Code",dataname:"CHK_LIST_CODE",datatype:"string",editControl:"textbox",width:600},
			{columnname:"CheckList Description",dataname:"CHK_LIST_NAME",datatype:"string",editControl:"textbox",width:360}
			
			
		]
		checkListGridDtl=
		{
			title:"CheckList Details",
			id:"checkListEntity",
			detail:checkListGridFieldObj
		}
		chkListMasterGridSection = plf.addGrid(checkListGridDtl,this)
	checkListMasterColumn.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(checkListMasterColumn)//Add Master Header Section 
		mainpage.ptrMainSection.add(chkListMasterGridSection) //Add Master Grid Section 
		
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strInspectionType","checkListEntity"],
				"service":"CoreChecklistService",
				"methodName":"initChecklistMappingScrTS"
			},
			{
				"controlid":"strInspectionType",
				"tasktype":"onchange",
				"input":["strInspectionType"],
				"service":"CoreChecklistService",
				"methodName":"onchangeChecklistMapping"
				},
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"maintain",
				"input":["checkListEntity","strInspectionType"],
				"service":"CoreChecklistService",
				"methodName":"maintainChecklistMappingDetailsTS"

			}
			/*{
					"controlid":"strChkListCode",
					"tasktype":"onenter",
					"input":["strChkListCode"],
					"service":"CoreChecklistService",
					"methodName":"fetchChecklistTS"
				},
				 {
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"create",
					"input":["strChkListCode","strChkListName","checkListMap","strChkLstDtlDesc","strOptionDescCsv","iWeightageCsv","strCriticalYN"],
					"service":"CoreChecklistService",
					"methodName":"createChecklistTS"
			},
			 {
					"controlid":"strChkListCode",
					"tasktype":"toolbarclick",
					"action":"edit",
					"input":["strChkListCode","strChkListName","strChkLstDtlDesc","strOptionDescCsv","iWeightageCsv","checkListMap"],
					"service":"CoreChecklistService",
					"methodName":"modifyChecklistTS"
			},
			{
					"controlid":"strChkListCode",
					"tasktype":"toolbarclick",
					"action":"delete",
					"input":["strChkListCode","strChkListName","strStatus","strChkLstDtlDesc","strOptionDescCsv","iWeightageCsv"],
					"service":"CoreChecklistService",
					"methodName":"deleteChecklistTS"
			},
			{
					"controlid":"strChkListCode",
					"tasktype":"toolbarclick",
					"action":"activate",
					"input":["strChkListCode"],
					"service":"CoreChecklistService",
					"methodName":"activateChecklistTS"
			},
			{
					"controlid":"strChkListCode",
					"tasktype":"toolbarclick",
					"action":"inactivate",
					"input":["strChkListCode"],
					"service":"CoreChecklistService",
					"methodName":"inactivateChecklistTS"
			}*/
		     
		];
		mainpage.screenLinks=
		{
				"cl_Checklist":
				{
					"dest":"checklist.CheckListMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
		mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":[]
			},
			"locked":
			{
				"enableAll":false,
				"except":["strCustomerCode"]
			},
			"active":
			{
				"enableAll":false,
				"except":["custVendorDtlCache"]
			}			
		}
	
		this.callParent(arguments);
		
	}
});
