/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	                           Added var for all local variable
************************************************************************************************/
Ext.define('CueTrans.view.peoplelogistics.RuleHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
   
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		
		mainpage.screenName = "Rule Help";
		
		
		//HelpOnRuleID Search Section starts
		plf.columns=4
		var ruleMasHdrCollapse = plf.addColumnSection({title:"", collapsed: true});//help
		
		var ruleMasFormCtrl=
		[
			plf.addText({"label":"Rule ID",id:"strRuleId"}),
			plf.addText({"label":"Rule Description",id:"strRuleDesc"}),
			plf.addCombo({"label":"Process Type",id:"strProcessType"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addBlank({}),
			plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
		]
		
		ruleMasHdrCollapse.add(ruleMasFormCtrl);
		//HelpOnRuleID Header Section Ends
		
		//HelpOnRuleID Grid Section Begins
		var ruleMasGridFieldObj=					//69995
		[
			{columnname:"Rule ID",dataname:"RULE_ID",datatype:"string",width:150},
			{columnname:"Rule Description",dataname:"RULE_DESC",datatype:"string",width:150},
			{columnname:"Process Type",dataname:"PROCESS_TYPE",datatype:"string",width:150}

		]
		var ruleMasGridDtl=							//69995
		{

		title:"",
		id:"ApprovalMasterSummary",
	    detail:ruleMasGridFieldObj,
		visibleRow:plf.helpVisibleRows,
		widthBasis:"flex",
		removePaging:true,
		removeTbar:true,
		}
		var ruleMasGridSection = plf.addGrid(ruleMasGridDtl,this)			//69995
		//HelpOnRuleID Grid Section Ends
		mainpage.hlpSearchGridPtr = ruleMasGridSection
		//Add Child Sections
		
		mainpage.ptrMainSection.add(ruleMasHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ruleMasGridSection) //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[	
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"PPLCoreMasterTS",
				"methodName":"initApprovalSummaryTS"
			},
			{       
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strRuleId","strRuleDesc","strProcessType"],
				"service":"PPLCoreMasterTS",
				"methodName":"srchAppMasSearchTS"
			}
			];
		//Event Handlers Mapping Ends
		
		mainpage.screenLinks=
			{
			"ApprovalMaster":
				{
					"dest":"peoplelogistics.ApprovalMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
			"RuleId":
			{
				"dest":"peoplelogistics.ApprovalMaster",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"RULE_ID","dest":"strRuleId"}
						]
			},
			
				
		}
		this.callParent(arguments);
		
	}
});
