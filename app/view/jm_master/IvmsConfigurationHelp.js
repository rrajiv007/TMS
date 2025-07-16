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
Ext.define('CueTrans.view.jm_master.IvmsConfigurationHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.hlpSectionFlag=true; 
		mainpage.startPainting();
		mainpage.screenName = "IVMS Configuration Help";
		
		
		//Device Search Section Begins 
		plf.columns=3
		var ivmsHdrCollapse = plf.addColumnSection({collapsed: true});			//69995
		var ivmsConfigurationSearchCtrl=										//69995	
		[
			plf.addText({"label":"IVMS Entry COde",id:"strIvmsEntryCode"}),
			plf.addText({"label":"Description",id:"strDescription"}),
			plf.addCombo({"label":"IVMS Provider",id:"strIvmsProvider"}),			
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Carrier Code",id:"strCarrierCode"}),
			plf.addText({"label":"Carrier Name",id:"strCarrierName"}),
			plf.addBlank({}),
			plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
		]
		ivmsHdrCollapse.add(ivmsConfigurationSearchCtrl);
		//Device Search Section Ends
		
		
		//Device Grid Section Begins
		var ivmsGridFieldObj=				//69995
		[
			{columnname:"IVMS Entry Code",dataname:"IVMS_ENTRY_CODE",datatype:"string",width:50}, 
			{columnname:"Description",dataname:"DESCRIPTION",datatype:"string",width:50},
			{columnname:"IVMS Provider",dataname:"IVMS_PROVIDER",datatype:"string",width:50},
			{columnname:"Carrier Code",dataname:"CARRIER_CODE",datatype:"string",width:50},
			{columnname:"Carrier Name",dataname:"CARRIER_NAME",datatype:"string",width:50},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:50}
			
		]
		var DeviceGridDtl=						//69995
		{
			title:"",
			id:"DeviceGridDtl",
			detail:ivmsGridFieldObj,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true,
			widthBasis:"flex"
		}
		var helpGridSection = plf.addGrid(DeviceGridDtl,this)		//69995
		mainpage.hlpSearchGridPtr = helpGridSection 
		//Device Grid Section Ends
			
		mainpage.ptrMainSection.add(ivmsHdrCollapse)//Add Search Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	       {
					"controlid":"",
					"tasktype":"onload",
					"input":["strIvmsEntryCode"],
					"service":"CoreTruckService",
					"methodName":"initIvmsSearchTS"
				},
					
				{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strIvmsEntryCode","strDescription","strStatus","strIvmsProvider","strCarrierName","strCarrierCode"],
					"service":"CoreTruckService",
					"methodName":"fetchAllIvmssearchTS"
				}
			
		];
		// Event Handlers Mapping Begins
				
		 mainpage.screenLinks=
		{
			"ReportBuildercode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.IvmsConfigurationHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strIvmsEntryCode","child":"IVMS_ENTRY_CODE"}
							]
				}
				
			
				
			
		}
		this.callParent(arguments);
		
	}
});
