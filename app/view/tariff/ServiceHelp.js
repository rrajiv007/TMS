/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var  	                                   
************************************************************************************************/
Ext.define('CueTrans.view.tariff.ServiceHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true
		mainpage.startPainting();
		
		mainpage.screenName = "Service Item Summary";
		
			
		plf.columns = 3
		var serviceHdrCollapse = plf.addColumnSection({title:"", collapsed: true});//69997
		
		
		var serviceFormCtrl=													//69997
		[
			plf.addText({"label":"Service Item Code",id:"strServiceCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Service Item Code To",id:"strServiceCodeTo"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			
			plf.addText({"label":"Service Item Description",id:"strServiceDesc"}),
			plf.addCombo({"label":"Vehicle Category",id:"strVehCat"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity"}),
			
			
			plf.addCombo({"label":"Service Type",id:"strServiceType"}),
			plf.addCombo({"label":"Priority",id:"strPriority"}),
			plf.addButton({"label":"Search",id:"btnSearch"})
		]
		
		serviceHdrCollapse.add(serviceFormCtrl);
		//HelpOn3PL Header Section Ends
		
		//HelpOn3PL Grid Section Begins
		var serviceGridFieldObj=									//69997
		[
			{columnname:"Service Item Code",dataname:"SERVICE_CODE",datatype:"string",width:150},
			{columnname:"Service Item Description",dataname:"SERVICE_DESC",datatype:"string",width:150},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",datatype:"string",width:100},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:130}
		]
		serviceGridDtl=
		{
			title:"",
			id:"serviceSrchGrid",
			detail:serviceGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
		}
		
		//HelpOn3PL Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(serviceHdrCollapse)//Add Header Section to Main Page
		var helpGridSection=plf.addGrid(serviceGridDtl,this)	//69997
		mainpage.hlpSearchGridPtr = helpGridSection
		mainpage.ptrMainSection.add(helpGridSection) 

		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TARCoreTariffServiceTS",
				"methodName":"initServiceSrchTS"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strServiceCodeFrom","strCommodity","strStatus","strVehCat","strServiceType","strPriority","strServiceDesc"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchAllServTS"
			}
		];
		
		this.callParent(arguments);
		
	}
});
