/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.2															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Manibharathi	04/02/2016      69952					Status Combo Alignment               
1.0.2		Bhuvan			05-Feb-2016	  	69995					Added var for all local variable
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.CostCenterSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Cost Center Summary";
		mainpage.toolbarSectionFlag=true;
		 mainpage.toolbarLinks=
		[
			{"name":"Create Cost Center","linkid":"jm_costcentermst","tooltip":"Click here to create a cost center."}
		]
		//Cost Center Search Section Begins
		plf.columns=4
		var helpOnCostHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);		//69995
	 	var helpOnCostFormCtrl=																										//69995
		[
			plf.addText({"label":"Cost Center Code",id:"strCostCenterCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Cost Center Code To",id:"strCostCenterCodeTo","anywhereSearch":"true"}),
			plf.addText({"label":"Cost Center Name",id:"strCostCenterName"}),
			plf.addText({"label":"Cost Department",id:"strCostDepartment"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Company Code",id:"strCompanyCode"}),
			plf.addText({"label":"Operations Account No",id:"strOperAccNo"}),
			plf.addText({"label":"Cost Object Type",id:"strCostObjType"}),
			//plf.addBlank(),
			//plf.addBlank(),
			//plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."}),
			//plf.addBlank()
		]
		
		helpOnCostHdrCollapse.add(helpOnCostFormCtrl);
		//Cost Center Search Section Ends
		
		//Driver Grid Section Begins
		var helpOnCostGridFieldObj=			//69995
		[
			{columnname:"Cost Center Code",dataname:"COST_CENTER_CODE",datatype:"string",width:150,linkId:"CostMaster","tooltip":"Click here to launch the cost center screen."},
			{columnname:"Cost Center Name",dataname:"COST_CENTER_NAME",datatype:"string",width:200},
			{columnname:"Cost Department",dataname:"COST_DEPARTMENT",datatype:"string",width:150},
			{columnname:"Company Code",dataname:"COMPANY_CODE",datatype:"string",storeId:"driveType",width:200},
			{columnname:"Cost Object Type",dataname:"COST_OBJECT_TYPE",datatype:"string",width:200},
			{columnname:"Operations Account No",dataname:"OPERATIONS_ACC_NO",datatype:"string",width:200},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100},
		]
		var helpOnCostGridDtl=					//69995
		{
			title:"",
			id:"CostSearch",
	       detail:helpOnCostGridFieldObj,
		   readonly:true,
		   visibleRow:plf.searchVisibleRows
		   }
		var helpGridSection = plf.addGrid(helpOnCostGridDtl,this)		//69995
		//Driver Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnCostHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreCostCenterService",
				"methodName":"initCostCenterSearchScrTS"
			},	
		{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strCostCenterCodeFrom","strStatus","strCostCenterName","strCostDepartment",
				"strCompanyCode","strOperAccNo","strCostObjType"],
			    "service":"CoreCostCenterService",
				"methodName":"fetchAllCostDetailsTS"
		}
			
		];
			mainpage.screenLinks=
		{
			"CostMaster":
				{
					"dest":"jm_master.CostCenterMaster",
					"hdr":[
							{"src":"","dest":""}
							],
					"grid":[
							{"src":"COST_CENTER_CODE","dest":"strCostCenterCode"}
							]
				},
				"jm_costcentermst":
				{
					"dest":"jm_master.CostCenterMaster",
					"hdr":[
							{"src":"","dest":""}
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
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
