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
Ext.define('CueTrans.view.peoplelogistics.ComplainceRulesEngine', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Compliance Rules Engine";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Save",
                "tooltip": "Click here to save a compliance rules engine."
            }
            ]	
		
		var ComplainceRulesDtlObj=
		[   			
			{columnname:"From Region",dataname:"FROM_REGION",datatype:"string",width:150,editControl:"combo",storeId:"strFromRegion"},
			{columnname:"To Region",dataname:"TO_REGION",datatype:"string",editControl:"combo",width:150,storeId:"strToRegion"},
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:150,editControl:"combo",storeId:"strDocType"},
			{columnname:"Criticality",dataname:"CRITICALITY",datatype:"string",width:150,editControl:"combo",storeId:"strCriticality"},
			{columnname:"From Date",dataname:"EFFECTIVE_FROM",datatype:"string",width:150,editControl:"date"},
			{columnname:"To Date",dataname:"EFFECTIVE_TO",datatype:"string",width:150,editControl:"date"}			
		]
		var ComplainceRulesGridDtl=
		{
			title:"",
			id:"ComplainceRulesDtl",
			detail:ComplainceRulesDtlObj,
			visibleRow:10			
		}
		var ComplainceRulesGridSection = plf.addGrid(ComplainceRulesGridDtl,this)			
		//History Data Section
		mainpage.dataHistorySectionFlag=true;	
		
		
		mainpage.ptrMainSection.add(ComplainceRulesGridSection)//Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[	
            {
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"PPLCoreMasterTS",
				"methodName":"initComplRulesMapScrTS"
			},
			 {       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"save",
				"input":["ComplainceRulesDtl"],
				"service":"PPLCoreMasterTS",
				"methodName":"saveComplRulesMapScrTS"
			}
		];
		//Event Handlers Mapping Ends
	
		
		this.callParent(arguments);
			
	}
});
