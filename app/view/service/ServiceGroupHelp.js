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
Ext.define('CueTrans.view.service.ServiceGroupHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.screenName = "Service Group Help";
		mainpage.startPainting();
		
		//Service Group Header Section Begins
		plf.columns=3
		var helpOnSerGrpHdrCollapse = plf.addColumnSection({title:""});
		
		var helpOnSerGrpFormCtrl=
		[
			plf.addText({"label":"Service Group ID",id:"strServiceGroupFrom"}),
			plf.addText({"label":"Service Group ID To",id:"strServiceGroupTo"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Description",id:"strServiceGroupDesc"}),
			plf.addCombo({"label":"Vehicle Category","id":"strVehicleCategory"}),
			plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."})
		]
		helpOnSerGrpHdrCollapse.add(helpOnSerGrpFormCtrl);
		//Service Group Header Section Ends
		
		//Service Group Grid Section Begins
		var helpOnSerGrpGridFieldObj=
		[
			{columnname:"Service Group ID",dataname:"SERVICE_ID",datatype:"string",width:100},
			{columnname:"Description",dataname:"SERVICE_DESC",datatype:"string",width:300},			
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:200}
		]
		var helpOnSerGrpGridDtl=
		{
			title:"Service Group Details",
			id:"ServiceGroupSum",					
			detail:helpOnSerGrpGridFieldObj,
			visibleRow:plf.helpVisibleRows-1,
			readOnly:true,
			removeAddDelete:true
		}
		var helpGridSection = plf.addGrid(helpOnSerGrpGridDtl,this)	
		//Service Group Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnSerGrpHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strServiceGroupFrom","strServiceGroupTo","strServiceGroupDesc","strStatus","strVehicleCategory"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"fetchAllServiceGrpTS"
			},
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"SERCoreServiceGroupTS",
				"methodName":"initServiceGrpSearchScrTS"
				},
				{
					"tasktype":"proto",
					"filename":"jm_master/ServiceGroup.json"
				}
			
		];
		//Event Handlers Mapping Ends				
		this.callParent(arguments);
		
	}
});
