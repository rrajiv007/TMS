Ext.define('CueTrans.view.bpmn.PathDefinition', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Multi Authorise - Path Definition";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Maintain"]
		mainpage.toolbarLinks=
		[
			{"name":"BPMN Process Flow","linkid":"bpmn_processflow"},
			{"name":"BPMN Rule Definition","linkid":"bpmn_ruledefinition"},
			{"name":"BPMN User Assignment","linkid":"bpmn_usrassignment"},
			{"name":"Multi Authorise - Level Definition","linkid":"bpmn_leveldefinition"}
		]
		
		
		//Add Keyfields
		//mainpage.keyFields=[""]
		
		//Process Master Section Begins
		plf.columns=4
		PathMstrColumn = plf.addColumnSection({title:"",columnWidth:.75});
		
		PathMasterCtrl=
		[	
			plf.addCombo({"label":"Process Name",id:"strProcessName","mandatory":"true"})
			
		]	
		
		PathMstrColumn.add(PathMasterCtrl);
		
		PathtabColumn = plf.addColumnSection({title:"",columnWidth:.75});
		
		PathtabCtrl=
		[	
			plf.addCombo({"label":"Task Name",id:"strTaskName","mandatory":"true"})
			
		]	
		
		PathtabColumn.add(PathtabCtrl);
		
		PathObj=
		[
			
			{columnname:"Path Code",dataname:"PATH_CODE",datatype:"string",editControl:"textbox",width:250},
			{columnname:"Path Desc",dataname:"PATH_DESC",datatype:"string",editControl:"textbox",width:250},
			{columnname:"Rule",dataname:"RULE",datatype:"string",editControl:"textbox",width:250,helpid:'rule'}
		]
		PathGridDtl=
		{
			//title:"Item Details",
			id:"PathDetails",
			detail:PathObj,
			visibleRow:5
			
			
		}
		PathGridSection = plf.addGrid(PathGridDtl,this)	
		
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(PathMstrColumn) //Add Header Section to Main Page
		mainpage.ptrMainSection.add(PathtabColumn)  //Add Grid Section to Main Page
		mainpage.ptrMainSection.add(PathGridSection)  //Add Grid Section to Main Page
		
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strProcessName","strTaskName"],
				"service":"BPMNCoreService",
				"methodName":"initBPMNPathLevelTS"
			},	
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Maintain",
				"input":["strProcessName","strTaskName","PathDetails"],
				"service":"BPMNCoreService",
				"methodName":"MaintainPathTS"
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