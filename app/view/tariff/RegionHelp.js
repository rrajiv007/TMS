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
Ext.define('CueTrans.view.tariff.RegionHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true
		mainpage.startPainting();
		
		mainpage.screenName = "Region Search";
		
			
		plf.columns = 3
		var regionHdrCollapse = plf.addColumnSection({title:"", collapsed: true});//69997
		
		
		var regionFormCtrl=											//69997
		[
			plf.addText({"label":"Region Code",id:"strRegionCodeFrom"}),
			//plf.addText({"label":"Region Code To",id:"strRegionCodeTo"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			
			plf.addText({"label":"Region Description",id:"strRegionDesc"}),
			plf.addCombo({"label":"Country",id:"strCountry"}),
			plf.addBlank(),
			
			plf.addBlank(),
			plf.addBlank(),
			plf.addButton({"label":"Search",id:"btnSearch"})
			
		]
		
		regionHdrCollapse.add(regionFormCtrl);//69997
		//HelpOn3PL Header Section Ends
		
		//HelpOn3PL Grid Section Begins
		var regionGridFieldObj=						//69997
		[
			{columnname:"Region Code",dataname:"REGION_CODE",datatype:"string",width:150},
			{columnname:"Region Description",dataname:"REGION_DESC",datatype:"string",width:150},
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:130},
			{columnname:"Region Type",dataname:"REGION_TYPE",datatype:"string",width:130}
		]
		regionGridDtl=
		{
			title:"",
			id:"regionGrid",
			detail:regionGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
		}
		
		//HelpOn3PL Grid Section Ends
		
		//Add Child Sections
	
		mainpage.ptrMainSection.add(regionHdrCollapse)//Add Header Section to Main Page
		var helpGridSection=plf.addGrid(regionGridDtl,this)	//69997
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
				"methodName":"initRegionSrchTS"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strRegionCodeFrom","strRegionCodeTo","strRegionDesc","strStatus","strCountry"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchRegionsTS"
			}		
		];
	
		this.callParent(arguments);
		
	}
});