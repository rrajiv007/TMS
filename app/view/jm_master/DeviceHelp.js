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
 Ext.define('CueTrans.view.jm_master.DeviceHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true; 
		mainpage.startPainting();
		mainpage.screenName = "Device Help";
		
		//Device Help Section Begins 
		plf.columns=3
		var helpOnDeviceHdrCollapse = plf.addColumnSection({title:"", collapsed: true}); 			//69995
		var deviceSearchCtrl=																		//69995
		[
			plf.addText({"label":"Device ID",id:"strDeviceID"}),
			plf.addText({"label":"Description",id:"strDescription"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"ESN",id:"strEsn"}),			
			plf.addCombo({"label":"Source",id:"strSource"}),
			plf.addCombo({"label":"Device Type",id:"strDeviceType"}),
			plf.addText({"label":"Device Model",id:"strDeviceModel"}),
			plf.addCombo({"label":"Supplier",id:"strSupplier"}),
			plf.addButton({"label":"Search","id":"btnSearch"})
		]
		
		helpOnDeviceHdrCollapse.add(deviceSearchCtrl);
		//Device Help Section Ends
		
		//Device Grid Section Begins
		var DeviceGridFieldObj=		//69995
		[
			{columnname:"Device ID",dataname:"DEVICE_ID",datatype:"string",width:150}, 
			{columnname:"Description",dataname:"DESCRIPTION",datatype:"string",width:150},
			{columnname:"ESN",dataname:"ESN",datatype:"string",width:120},
			{columnname:"Source",dataname:"SOURCE",datatype:"string",width:120},
			{columnname:"Device Type",dataname:"DEVICE_TYPE",datatype:"string",width:120},
			{columnname:"Device Model",dataname:"DEVICE_MODEL",datatype:"string",width:120},
			{columnname:"Supplier",dataname:"SUPPLIER",datatype:"string",width:120},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:130}
		]
		var DeviceGridDtl=		//69995
		{
			title:"",
			id:"DeviceGridDtl",
			detail:DeviceGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true,
			removeTbar:false
		}
		var helpGridSection = plf.addGrid(DeviceGridDtl,this)		//69995
		mainpage.hlpSearchGridPtr = helpGridSection 
		//Device Grid Section Ends
			
		mainpage.ptrMainSection.add(helpOnDeviceHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	       {
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreTruckService",
					"methodName":"initScrDeviceTS"
				},
					
				{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strDescription","strDeviceType","strStatus","strEsn","strSource","strDeviceModel","strSupplier"],
					"service":"CoreTruckService",
					"methodName":"fetchAllDeviceTS"
				}
			
		];
		
		
		this.callParent(arguments);
		
	}
});
