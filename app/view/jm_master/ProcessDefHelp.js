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
Ext.define('CueTrans.view.jm_master.ProcessDefHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true; //help
		mainpage.startPainting();
		mainpage.screenName = "Process Definition Help";
		// Add Toolbar
		//mainpage.toolbarSectionFlag=false;
		
		//Add Keyfields
		//mainpage.keyFields=["strProcessCodeFrom"]
		
		//Location Search Section Begins
		plf.columns=3
		var locationHdrCollapse =plf.addColumnSection({title:"", collapsed: true});//help					//69995
		
		var locationFormCtrl=									//69995
		[ 
			plf.addText({"label":"Process Code From",id:"strProcessCodeFrom","anywhereSearch":"true"}),
			plf.addText({"label":"Process Code To",id:"strProcessCodeTo","anywhereSearch":"true"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Process Type",id:"strProcessType"}),
			plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."})
		]
		
		locationHdrCollapse.add(locationFormCtrl);
		//Location Header Section Ends
		
		//Location Grid Section Begins
		var locationGridFieldObj=							//69995
		[
			{columnname:"Process Code",dataname:"PROCESS_CODE",datatype:"string",width:110},
			{columnname:"Process Name",dataname:"PROCESS_NAME",datatype:"string",width:120},
			{columnname:"Process Type",dataname:"PROCESS_TYPE",datatype:"string",width:180},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
					]
		var locationGridDtl=								//69995
		{
			title:"Location Details",
			id:"processDtlHelp",
			
			
			detail:locationGridFieldObj,
			visibleRow:plf.helpVisibleRows-2,
			removeAddDelete:true//hrlp
		}
		var locationGridSection = plf.addGrid(locationGridDtl,this)				//69995
		//Location Grid Section Ends
		mainpage.hlpSearchGridPtr = locationGridSection
		//Add Child Sections
			
		mainpage.ptrMainSection.add(locationHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(locationGridSection) //Add Grid Section to Main Page
		
		//History Data Section
		//mainpage.data_his_sec_flag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"coreProcessService",
				"methodName":"initProcessHelpTS"
			},
			{
					"controlid":"searchBtn",
					"tasktype":"btnclick",
					"input":["strProcessCodeFrom","strProcessCodeTo","strStatus","strProcessType"],
					"service":"coreProcessService",
					"methodName":"initProcessHelpSearchTS"
			}
		];
		
	//Event Handlers Mapping Ends
		
		//Generate Screen Section
		//mainpage.generateScreen();
		
		
		/*Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);  
		
	}
});
