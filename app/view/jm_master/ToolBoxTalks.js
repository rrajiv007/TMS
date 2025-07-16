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
Ext.define('CueTrans.view.jm_master.ToolBoxTalks', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
			
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "ToolBox Talks Mapping";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
	//	mainpage.toolbarActions=["refresh","create","edit","delete","activate","inactivate"]
	    
		mainpage.toolbarActions= [{
                "name": "Save",
                "tooltip": "Click here to save."
            }
            ]
		
		//TypeMaster Header Section Begins
		plf.columns=4
		var toolBoxMasterColumn = plf.addColumnSection({});					//69995
		var typeMstrCtrl=													//69995
		[
			plf.addCombo({"label":"Mapping for",id:"strMappingFor"})
			
			
		]
		toolBoxMasterColumn.add(typeMstrCtrl);
		//TypeMaster Header Section Ends
		
		toolBoxCollapse = plf.addColumnSection({title:""});
		//TypeMaster Grid Section Begins
		var typeMstrFieldObj=				//69995
		[
		    {columnname:"Category",dataname:"CATEGORY_CODE",datatype:"string",storeId:"strCategory",editControl:"combo",width:200},	
			{columnname:"ToolBox Code",dataname:"TOOLBOX_CODE",datatype:"string",editControl:"textbox","onenter":"TOOLBOX_ONENTER",width:200},
			{columnname:"Tool Box Description",dataname:"TOOLBOX_DESC",datatype:"string",width:300},
			
		]
		var typeMstrGridDtl=								//69995
		{
			title:"ToolBox Talks Mapping",
			id:"toolboxDtl",
			detail:typeMstrFieldObj
		}
		
		var toolBoxMstrGridSection = plf.addGrid(typeMstrGridDtl,this)			//69995
		toolBoxCollapse.add(toolBoxMstrGridSection);	
		
		//TypeMaster Grid Section Ends
		
		mainpage.ptrMainSection.add(toolBoxMasterColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(toolBoxMstrGridSection) //Add Grid Section to Main Page
		
		//History Data Section
		//mainpage.dataHistorySectionFlag=false;
		
		
		
		// for green line
		//toolBoxCollapse.add(plf.addStripLine({}));		
		//mainpage.ptrMainSection.add(toolBoxCollapse)
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strMappingFor"],
				"service":"CoreToolboxTalkService",
				"methodName":"initToolboxTalksMappingScrTS"
				},
		        //to fetch the grid details on selecting the combo value
				{
				"controlid":"strMappingFor",
				"tasktype":"onchange",
				"input":["strMappingFor"],
				"service":"CoreToolboxTalkService",
				"methodName":"fetchToolboxTypeDetailsTS"
				},
				{
				"grideventid":"TOOLBOX_ONENTER",
				"tasktype":"gridonenter",
				"input":["TOOLBOX_CODE"],
				"service":"CoreToolboxTalkService",
				"methodName":"fetchToolboxTS"
				//completed
			},
				{
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Save",
				"input":["strMappingFor","toolboxDtl"],
				"service":"CoreToolboxTalkService",
				"methodName":"maintainToolboxTalksMappingTS"
				},
				{
					"tasktype":"proto",
					"filename":"jm_master/ToolBoxTalks.json"
				}
		
		/*	{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreRouteService",
				"methodName":"initRouteMasterScrTS"
			},		
			{
				"controlid":"strRouteId",
				"tasktype":"onenter",
				"input":["strRouteId"],
				"service":"CoreRouteService",
				"methodName":"fetchRouteTS"
			},	*/					
			/*{
				"tasktype":"proto",
				"filename":"jm_master/TypeMaster.json"
			}*/
		];
		//Event Handlers Mapping Ends
		
		//Generate Screen Section
		mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":[""]
			},
			"locked":
			{
				"enableAll":false,
				"except":[""]
			},
			"active":
			{
				"enableAll":false,
				"except":[""]
			}		
}			
		
		this.callParent(arguments);
			
	}
});
