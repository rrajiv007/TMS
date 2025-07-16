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
Ext.define('CueTrans.view.jm_master.WBSHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true; //HelpChanges		
		mainpage.startPainting();
		mainpage.screenName = "WBS Help"; //HelpChanges
		//Cost Center Search Section Begins
		plf.columns=3
		var helpOnCostHdrCollapse = plf.addColumnSection({title:"", collapsed: false}); 			//69995
	 	var helpOnCostFormCtrl=																		//69995
		[
			plf.addText({"label":"Cost Center Code",id:"strCostCenterCodeFrom","anywhereSearch":"true"}),			
			plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."})
		]
		
		helpOnCostHdrCollapse.add(helpOnCostFormCtrl);
		//Cost Center Search Section Ends
		
		//Driver Grid Section Begins
		var helpOnCostGridFieldObj=			//69995
		[
			{columnname:"Cost Center Code",dataname:"COST_CENTER_CODE",datatype:"string",width:150},
			{columnname:"Cost Center Name",dataname:"COST_CENTER_NAME",datatype:"string",width:200},
			{columnname:"Cost Department",dataname:"COST_DEPARTMENT",datatype:"string",width:150},
			{columnname:"Company Code",dataname:"COMPANY_CODE",datatype:"string",storeId:"driveType",width:200},
			{columnname:"Cost Object Type",dataname:"COST_OBJECT_TYPE",datatype:"string",width:200},
			{columnname:"Operations Account No",dataname:"OPERATIONS_ACC_NO",datatype:"string",width:200},
		]
		var helpOnCostGridDtl=				//69995
		{
			title:"",
			id:"WBSCostSearch",
	        detail:helpOnCostGridFieldObj,
		    visibleRow:15,
			removeAddDelete:true,
			removePaging:true
		   }
		var helpGridSection = plf.addGrid(helpOnCostGridDtl,this)		//69995
		mainpage.hlpSearchGridPtr = helpGridSection 
		//Driver Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnCostHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[			
		{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strCostCenterCodeFrom"],
			    "service":"CoreCostCenterService",
				"methodName":"fetchAllWBSCostDetailsTS"
		}
			
		];
		//Event Handlers Mapping Ends
			
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
