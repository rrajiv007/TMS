/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			         Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.Report.NewCostObjectWBS', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "WBS Update";
		
		//Help on Customer Search Section Begins
		plf.columns=3
		mainpage.toolbarSectionFlag=true;
				mainpage.toolbarActions= 
			[
				{
					"name": "Save",
					"tooltip": "Click here to save the WBS."
				}
            ]

		
		/*var WBSColumn = plf.addColumnSection({});	
		
		var WBSFormCtrl=							
		[
	
			plf.addBlank(),
			plf.addCombo({"label":"Process Months",id:"strPriority"})
		]
		
		WBSColumn.add(WBSFormCtrl);*/
		

		CostObjectgrid=
		[   

			{columnname:"Existing WBS No",dataname:"REQUEST_NO",datatype:"string",editControl:"textbox",width:200,helpid:'WBSCodePlan',"onenter":"WBS_CODE_ONENTER"},
			{columnname:"New WBS No",dataname:"LOAD_NO",datatype:"string",width:200,editControl:"textbox"}

				
		]
		CostObjectdetails=
		{
			title:"",
			id:"vehschgrid2",
			detail:CostObjectgrid,
			visibleRow:13
			/*removeExport:false,
			removeAddDelete:false,
			readonly:true*/
		}
		CostObjectGridSection = plf.addGrid(CostObjectdetails,this)

		//mainpage.ptrMainSection.add(WBSColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(CostObjectGridSection)//--Golive	
       	
		
	mainpage.hlpLinks=
		{
				"WBSCodePlan":
				{
					"hlpType":"grid",
					"gridID":"vehschgrid2",
					"hlpScreen":"jm_master.WBSHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"COST_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"REQUEST_NO","child":"COST_CENTER_CODE"}
						
							]
				}
			
		}
		
		mainpage.eventHandlers = 
		[			
				{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["vehschgrid2"],
				"service":"VEHSCHCoreVehSchServiceTS",
				"methodName":"saveNewCostObjectTS"
				}
		];
		mainpage.screenLinks=	
		{
		} 
								
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	
			
});
