Ext.define('CueTrans.view.bpmn.BPMNUserAssignment', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "BPMN User Assignment";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Maintain"]
		mainpage.toolbarLinks=
		[
			{"name":"BPMN Process Flow","linkid":"bpmn_processflow"},
			{"name":"BPMN Rule Definition","linkid":"bpmn_ruledefinition"},			
			{"name":"Multi Authorise - Path Definition","linkid":"bpmn_pathdefinition"},
			{"name":"Multi Authorise - Level Definition","linkid":"bpmn_leveldefinition"}
		]
		
		
		//Add Keyfields
		//mainpage.keyFields=[""]
		
		//Process Master Section Begins
		plf.columns=4
		DecisionMstrColumn = plf.addColumnSection({title:"",columnWidth:.75});
		
		DecisionMasterCtrl=
		[	
			plf.addCombo({"label":"Process Name",id:"strProcessName","mandatory":"true"})
			
		]	
		
		DecisionMstrColumn.add(DecisionMasterCtrl);
		
		DecisiontabColumn = plf.addColumnSection({title:"",columnWidth:.75});
		
		DecisiontabCtrl=
		[	
			/*plf.addHlpText({"label":"Decision Table",id:"strDecisionTbl",hlpLinkID:"Decision",inputFormat:"string",
							InputLength:"100"})*/
			plf.addCombo({"label":"Decision Table",id:"strDecisionTbl","mandatory":"true"})				
			
		]	
		
		DecisiontabColumn.add(DecisiontabCtrl);
		
		DecisionObj=
		[
			
			{columnname:"Rule ID",dataname:"RULE_ID",datatype:"string",editControl:"combo",width:350,storeId:"strRuleId"},
			{columnname:"Approval Type",dataname:"APPROVER_TYPE",datatype:"string",editControl:"combo",width:300,storeId:"strApproverType"},
			{columnname:"Approver",dataname:"APPROVER",datatype:"string",editControl:"combo",width:500,storeId:"strApprover"}
		]
		DecisionGridDtl=
		{
			//title:"Item Details",
			id:"DecisionDetails",
			detail:DecisionObj,
			visibleRow:5
			
			
		}
		DecisionGridSection = plf.addGrid(DecisionGridDtl,this)	
		
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(DecisionMstrColumn) //Add Header Section to Main Page
		mainpage.ptrMainSection.add(DecisiontabColumn)  //Add Grid Section to Main Page
		mainpage.ptrMainSection.add(DecisionGridSection)  //Add Grid Section to Main Page
		
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[],
				"service":"BPMNCoreService",
				"methodName":"initBPMNTS"
			},
						{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Maintain",
				"input":["strProcessName","strDecisionTbl","DecisionDetails"],
				"service":"BPMNCoreService",
				"methodName":"createUserAssgnTS"
			},
			
			{
					"controlid":"strDecisionTbl",
					"tasktype":"onchange",
					"input":["strDecisionTbl"],
					"service":"BPMNCoreService",
					"methodName":"fetchRuleTS"
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
			"bpmn_pathdefinition":
				{
					"dest":"bpmn.PathDefinition",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
			"bpmn_leveldefinition":
				{
					"dest":"bpmn.LevelDefinition",
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