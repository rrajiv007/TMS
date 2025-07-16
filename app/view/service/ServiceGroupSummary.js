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
Ext.define('CueTrans.view.service.ServiceGroupSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.screenName = "Service Group Summary";
		mainpage.startPainting();
		
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Create Service Group","linkid":"jm_createservicegroup","tooltip":"Click here to create service group."}
		]
		//Service Group Header Section Begins
		plf.columns=4
		var helpOnSerGrpHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);
		
		var helpOnSerGrpFormCtrl=
		[
			plf.addText({"label":"Service Group ID From",id:"strServiceGroupFrom"}),
			plf.addText({"label":"Service Group ID To",id:"strServiceGroupTo"}),
			plf.addText({"label":"Description",id:"strServiceGroupDesc"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Vehicle Category","id":"strVehicleCategory"})
		]
		helpOnSerGrpHdrCollapse.add(helpOnSerGrpFormCtrl);
		//Service Group Header Section Ends
		
		//Service Group Grid Section Begins
		var helpOnSerGrpGridFieldObj=
		[
			{columnname:"Service Group ID",dataname:"SERVICE_ID",datatype:"string",width:200,linkId:"servicemaster","tooltip":"Click here to launch the service group master screen."},
			{columnname:"Description",dataname:"SERVICE_DESC",datatype:"string",width:200},			
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:200}
		]
		var helpOnSerGrpGridDtl=
		{
			title:"",
			id:"ServiceGroupSum",
			removeAddDelete:true,
			visibleRow:plf.searchVisibleRows,
			detail:helpOnSerGrpGridFieldObj,
			
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
		
		mainpage.screenLinks=
		{
			"servicemaster":
				{
					"dest":"service.ServiceGroupMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"SERVICE_ID","dest":"strServiceGroup"}
							]
				},
				"jm_createservicegroup":
				{
					"dest":"service.ServiceGroupMaster",
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
