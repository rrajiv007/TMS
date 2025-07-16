Ext.define('CueTrans.view.bpmn.RuleHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Rule Help";
		
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		
		mainpage.screenName = "Rule Help";
		// Add Toolbar
		mainpage.toolbarSectionFlag=false;
		
		
		plf.columns=2
		helpOnRouteHdrCollapse = plf.addCollapseSection({title:"Search Criteria", collapsed: false}); 
		
		routeSearchCtrl=
		[
			plf.addCombo({"label":"Process Name",id:"strProcessName","mandatory":"true"}),
			plf.addCombo({"label":"Rule Type",id:"strRuleType","mandatory":"true"}),
			plf.addText({"label":"RuleID From",id:"strRuleIdFrom"}),
			plf.addText({"label":"RuleID To",id:"strRuleIdTo"}),
			plf.addBlank(),
			plf.addButton({"label":"Search","id":"btnSearch"})
			
		]
		
		helpOnRouteHdrCollapse.add(routeSearchCtrl);
		
		
		
		RuleObj=
		[ 
			{columnname:"ProcessName",dataname:"PROCESS_NAME",datatype:"string",width:250}, 
			{columnname:"Rule Type",dataname:"RULE_TYPE",datatype:"string",width:250},
			{columnname:"Rule ID",dataname:"RULE_ID",datatype:"string",width:150},
			{columnname:"Rule Description",dataname:"RULE_DESC",datatype:"string",width:300},
							
		]
		RuleGridDtl=
		{
			title:"ItemDetails",
			id:"RuleDetailsHelp",
			detail:RuleObj,
			visibleRow:plf.helpVisibleRows,
			readOnly:true,
			removeAddDelete:true
		}
		
		helpGridSection = plf.addGrid(RuleGridDtl,this)
		mainpage.hlpSearchGridPtr = helpGridSection 
		
			
		mainpage.ptrMainSection.add(helpOnRouteHdrCollapse)
		mainpage.ptrMainSection.add(helpGridSection) 
		
		// Event Handlers Mapping Begins
			mainpage.eventHandlers = 
		[
	       	{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"BPMNCoreService",
					"methodName":"initBPMNTS"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strProcessName","strRuleIdFrom","strRuleIdTo","strRuleType"],
				"service":"BPMNCoreService",
				"methodName":"fetchAllRules"
			},
				
		];
		
		
		
		
			this.callParent(arguments);
		
	}
});
