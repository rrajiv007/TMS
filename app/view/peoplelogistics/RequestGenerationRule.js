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
Ext.define('CueTrans.view.peoplelogistics.RequestGenerationRule', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Request Generation Rule";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		//mainpage.liveScreenFlag=true;
		mainpage.toolbarActions= 
			[{
                "name": "Save",
                "tooltip": "Click here to save request generation rule."
            }]		
			
		var RequestGenobj=
		[   			
			{columnname:"Travel Type",dataname:"TRAVEL_TYPE",storeId:"strTravelType",datatype:"string",editControl:"combo",width:150},
			{columnname:"Grade",dataname:"GRADE",storeId:"strGrade",datatype:"string",editControl:"combo",width:150},
			{columnname:"Region From",dataname:"REGION_FROM",datatype:"string",storeId:"strRegionFrom",width:150,editControl:"combo"},
			{columnname:"Region To",dataname:"REGION_TO",datatype:"string",storeId:"strRegionTo",width:150,editControl:"combo"},
			{columnname:"Documents To Generate",dataname:"DOC_TO_GEN",storeId:"strDocgen",datatype:"string",width:150,editControl:"combo"},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"string",width:150,editControl:"date"},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"string",editControl:"date",width:150}
		]
		var RequestGenGridDtl=
		{
			title:"",
			id:"requestGenDtl",
			detail:RequestGenobj,
			widthBasis:"flex",
			visibleRow:10			
		}
		var RequestGenDocGridSection = plf.addGrid(RequestGenGridDtl,this)	
			
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		
		mainpage.ptrMainSection.add(RequestGenDocGridSection)//Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[		
		   {
			"controlid":"",
			"tasktype":"onload",
			"input":[""],
			"service":"PPLCoreMasterTS",
			"methodName":"initReqGenRulTS"
			},
			{       
			"controlid":"",
			"tasktype":"toolbarclick",
			"action":"Save",
			"input":["requestGenDtl"],
			"service":"PPLCoreMasterTS",
			"methodName":"saveReqGenRulTS"
			}
				
			
		];
		
		mainpage.screenLinks=
		{
			"AppMasSumm":
				{
					"dest":"peoplelogistics.ApprovalMasterSummary",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
				}
		}
		
		this.callParent(arguments);
			
	}
});
