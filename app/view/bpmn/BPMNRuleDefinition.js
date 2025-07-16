Ext.define('CueTrans.view.bpmn.BPMNRuleDefinition', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "BPMN Rule Definition";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Create","Modify"]
		mainpage.toolbarLinks=
		[
			{"name":"BPMN Process Flow","linkid":"bpmn_processflow"},
			{"name":"BPMN User Assignment","linkid":"bpmn_usrassignment"},
			{"name":"Multi Authorise - Path Definition","linkid":"bpmn_pathdefinition"},
			{"name":"Multi Authorise - Level Definition","linkid":"bpmn_leveldefinition"}
		]
		
		
		//Add Keyfields
		//mainpage.keyFields=[""]
		
		//Process Master Section Begins
		plf.columns=4
		RuleMstrColumn = plf.addColumnSection({title:"",columnWidth:.75});
		
		RuleMasterCtrl=
		[	
			plf.addCombo({"label":"Process Name",id:"strProcessName","mandatory":"true"})
		]	
		
		RuleTypeColumn = plf.addColumnSection({title:"",columnWidth:.75});
		
		RuleTypeCtrl=
		[	
			plf.addCombo({"label":"Rule Type",id:"strRuleType","mandatory":"true"}),
			plf.addHlpText({"label":"Rule ID",id:"strRuleId","mandatory":"true",hlpLinkID:"ruleid",inputFormat:"string",InputLength:"100"},this),
		]	
			
		RuleDescColumn = plf.addColumnSection({title:"",columnWidth:.75,height:75});
		
		RuleDescCtrl=
		[	
			plf.addTextArea({"label":"Rule Desc",id:"strRuleDesc","mandatory":"true",inputFormat:"string",InputLength:"255",height:50,})
		]	
		
		
		RuleMstrColumn.add(RuleMasterCtrl);
		RuleTypeColumn.add(RuleTypeCtrl);
		RuleDescColumn.add(RuleDescCtrl);
		
		
		
	/*	RuleObj=
		[
			{columnname:"Open Brace",dataname:"OPEN_BRACE",datatype:"string",editControl:"combo",width:100,storeId:"strOpenBrace"},
			{columnname:"Parameter Desc",dataname:"PARAMETER_DESC",datatype:"string",editControl:"combo",width:200,storeId:"strParameterDesc"},
			{columnname:"Relational Operator",dataname:"RELATIONAL_OPERATOR",datatype:"string",editControl:"combo",width:150,storeId:"strRelationalOp"},
			{columnname:"Value",dataname:"VALUE",datatype:"string",editControl:"textbox",width:150},
			{columnname:"List",dataname:"LIST",datatype:"string",width:150},
			{columnname:"Logical Operater",dataname:"LOGICAL_OPERATOR",datatype:"string",editControl:"combo",width:150,storeId:"strLogicalOp"},
			{columnname:"Close Brace",dataname:"CLOSE_BRACE",datatype:"string",editControl:"combo",width:100,storeId:"strCloseBrace"},
			{columnname:"Sequence No",dataname:"SEQ_NO",datatype:"string",width:130,editControl:"textbox",inputFormat:"integer",InputLength:"10"},
		]*/
		
		RuleObjDetails=
		[
			{columnname:"SeqNo",dataname:"SEQNO",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Variable",dataname:"PARAMETERS",datatype:"string",editControl:"combo",width:300,storeId:"strParameterDesc"},
			{columnname:"Operator",dataname:"RELATIONALOP",datatype:"string",editControl:"combo",width:250,storeId:"strRelationalOp"},
			{columnname:"Value",dataname:"VALUE",datatype:"string",editControl:"textbox",width:250},
			{columnname:"Operator",dataname:"LOGICALOP",datatype:"string",editControl:"combo",width:250,storeId:"strLogicalOp"}
			
		
		]
		
		RuleGridDtl=
		{
			//title:"Item Details",
			id:"RuleDetails",
			detail:RuleObjDetails,
			//visibleRow:5
			
			
		}
		RuleGridSection = plf.addGrid(RuleGridDtl,this)	
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(RuleMstrColumn) //Add Header Section to Main Page
		mainpage.ptrMainSection.add(RuleTypeColumn)  //Add Grid Section to Main Page
		mainpage.ptrMainSection.add(RuleDescColumn)  //Add Grid Section to Main Page
		mainpage.ptrMainSection.add(RuleGridSection) 
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
				"action":"Create",
				"input":["strProcessName","strRuleId","strRuleDesc","strRuleType","RuleDetails"],
				"service":"BPMNCoreService",
				"methodName":"createBPMNRulesTS"
			},
			{
				"controlid":"strRuleId",
				"tasktype":"onenter",
				"input":["strRuleId","strProcessName","strRuleType"],
				"service":"BPMNCoreService",
				"methodName":"fetchRuleDescTS"
			},	
			{
				"controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Modify",
				"input":["strRuleId","RuleDetails"],
				"service":"BPMNCoreService",
				"methodName":"ModifyBPMNRuleTS"
			}
				

				
		];
		//Event Handlers Mapping Ends
		mainpage.hlpLinks=
		{
		"ruleid":
				{
					"hlpType":"Header",
					"hlpScreen":"bpmn.RuleHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRuleId","child":"RULE_ID"}
							]
				}
		}
		
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