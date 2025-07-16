/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
		                                   
************************************************************************************************/
Ext.define('CueTrans.view.peoplelogistics.ApprovalMasterSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Approval Master Summary";
		mainpage.toolbarSectionFlag=true;
		//mainpage.liveScreenFlag=true;
		mainpage.toolbarLinks=
		[

			{"name":"Create Approval Master","linkid":"ApprovalMaster","tooltip":"Click here to launch the approval master screen."},
			
		]	
		
		//Approval Master Section starts

		var formCtrl=[];
		plf.columns=4
		var ApprovalMasterSummaryColumn = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
		
		
		var ApprovalMasterSummaryFormCtrl=
		[
			plf.addText({"label":"Rule ID",id:"strRuleId"}),
			plf.addText({"label":"Rule Description",id:"strRuleDesc"}),
			plf.addCombo({"label":"Process Type",id:"strProcessType"}),
			plf.addCombo({"label":"Status",id:"strStatus"})
		]
		
		ApprovalMasterSummaryColumn.add(ApprovalMasterSummaryFormCtrl);
		
		
		var ApprovalMasterSummaryObj=
		[   			
			{columnname:"Rule ID",dataname:"RULE_ID",datatype:"string",width:100,linkId:"RuleId",tooltip:"Click here to launch the approval master screen."},
			{columnname:"Rule Description",dataname:"RULE_DESC",datatype:"string",width:150},
			{columnname:"Process Type",dataname:"PROCESS_TYPE",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:150}
		]
		var ApprovalMasterSummaryGridDetail=
		{
			title:"",
			id:"ApprovalMasterSummary",
			detail:ApprovalMasterSummaryObj,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true,
			readonly:true,
			//widthBasis:"flex"
		}
		var ApprovalMasterSummaryGridSection = plf.addGrid(ApprovalMasterSummaryGridDetail,this)	
		
		//adding the field control to the mainpage
		mainpage.ptrMainSection.add(ApprovalMasterSummaryColumn)
		mainpage.ptrMainSection.add(ApprovalMasterSummaryGridSection) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		
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
