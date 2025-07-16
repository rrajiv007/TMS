Ext.define('CueTrans.view.bpmn.LevelDefinition', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Multi Authorise - Level Definition";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Maintain"]
		mainpage.toolbarLinks=
		[
			{"name":"BPMN Process Flow","linkid":"bpmn_processflow"},
			{"name":"BPMN Rule Definition","linkid":"bpmn_ruledefinition"},
			{"name":"BPMN User Assignment","linkid":"bpmn_usrassignment"},
			{"name":"Multi Authorise - Path Definition","linkid":"bpmn_pathdefinition"}
		]
		
		
		//Add Keyfields
		//mainpage.keyFields=[""]
		
		//Process Master Section Begins
		plf.columns=4
		LevelMstrColumn = plf.addColumnSection({title:"",columnWidth:.75});
		
		LevelMasterCtrl=
		[	
			plf.addCombo({"label":"Process Name",id:"strProcessName","mandatory":"true"})
			
		]	
		
		LevelMstrColumn.add(LevelMasterCtrl);
		
		LeveltabColumn = plf.addColumnSection({title:"",columnWidth:.75});
		
		LeveltabCtrl=
		[	
			plf.addCombo({"label":"Task Name",id:"strTaskName","mandatory":"true"})
			
		]	
		
		LeveltabColumn.add(LeveltabCtrl);
		
		LevelpathColumn = plf.addColumnSection({title:"",columnWidth:.75});
		
		LevelpathCtrl=
		[	
			plf.addCombo({"label":"Path Name",id:"strPathName","mandatory":"true"})
			
		]	
		
		LevelpathColumn.add(LevelpathCtrl);
		
		LevelObj=
		[
			
			{columnname:"Level",dataname:"Level",datatype:"string",editControl:"textbox",width:200},
			{columnname:"Approval Type",dataname:"APPROVAL_TYPE",datatype:"string",editControl:"combo",width:250,storeId:"strApprovalType"},
			{columnname:"Value",dataname:"VALUE",datatype:"string",editControl:"textbox",width:150}
		]
		LevelGridDtl=
		{
			//title:"Item Details",
			id:"LevelDetails",
			detail:LevelObj,
			visibleRow:5
			
			
		}
		LevelGridSection = plf.addGrid(LevelGridDtl,this)	
		
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(LevelMstrColumn) //Add Header Section to Main Page
		mainpage.ptrMainSection.add(LeveltabColumn)  //Add Grid Section to Main Page
		mainpage.ptrMainSection.add(LevelpathColumn)
		mainpage.ptrMainSection.add(LevelGridSection)  //Add Grid Section to Main Page
		
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strProcessName"],
				"service":"BPMNCoreService",
				"methodName":"initBPMNPathLevelTS"
			},	
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Maintain",
				"input":["strProcessName","strTaskName","strPathName","LevelDetails"],
				"service":"BPMNCoreService",
				"methodName":"MaintainLevelTS"
			},
			{
				"controlid":"strProcessName",
				"tasktype":"onchange",
				"input":["strProcessName"],
				"service":"BPMNCoreService",
				"methodName":"fetchProcessDetailsTS"
			},
			{
				"controlid":"strTaskName",
				"tasktype":"onchange",
				"input":["strProcessName","strTaskName"],
				"service":"BPMNCoreService",
				"methodName":"fetchTaskDetailsTS"
			},
			{
				"controlid":"strPathName",
				"tasktype":"onchange",
				"input":["strProcessName","strTaskName","strPathName"],
				"service":"BPMNCoreService",
				"methodName":"fetchPathDetailsTS"
			}
		];
		//Event Handlers Mapping Ends
		mainpage.screenLinks=
		{
			"bpmn_processflow":
				{
					"dest":"bpmn.BPMNProcess",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
			"bpmn_ruledefinition":
				{
					"dest":"bpmn.BPMNRuleDefinition",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
			"bpmn_usrassignment":
				{
					"dest":"bpmn.BPMNUserAssignment",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
			"bpmn_pathdefinition":
				{
					"dest":"bpmn.PathDefinition",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}	
		}
		
		
			
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
		
	}
});