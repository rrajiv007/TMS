/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
//69997		                                   
************************************************************************************************/
Ext.define('CueTrans.view.tariff.RegionSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Region Summary";
		
		
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=
		[
			{"name":"Create region.","linkid":"fin_newregion","tooltip":"Click here to create a new region."}
		]
		
		
		
		plf.columns = 4
		var regionHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);//69997
		
		
		var regionFormCtrl=																			//69997
		[
			plf.addText({"label":"Region Code",id:"strRegionCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Region Code To",id:"strRegionCodeTo"}),
			plf.addText({"label":"Region Description",id:"strRegionDesc"}),
			plf.addCombo({"label":"Country",id:"strCountry"}),
			plf.addCombo({"label":"Status",id:"strStatus"})
		//	plf.addButton({"label":"Search",id:"btnSearch"})
		]
		
		regionHdrCollapse.add(regionFormCtrl);
		//HelpOn3PL Header Section Ends
		
		//HelpOn3PL Grid Section Begins
		var regionGridFieldObj=																//69997
		[
			{columnname:"Region Code",dataname:"REGION_CODE",datatype:"string",width:150,linkId:"regionmaster"},
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
			visibleRow:plf.searchVisibleRows,
			readonly:true,
			removeAddDelete:true
		}
		var regionGridSection = plf.addGrid(regionGridDtl,this)	//69997
		//HelpOn3PL Grid Section Ends
		
		//Add Child Sections
	
		mainpage.ptrMainSection.add(regionHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(regionGridSection) //Add Grid Section to Main Page
		
	
		
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
				"input":["strRegionCodeFrom","strRegionDesc","strStatus","strCountry"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchRegionsTS"
			}
			
		
		];
		//Event Handlers Mapping Ends
			
		//Generate Screen Section
		mainpage.screenLinks=
		{
			"regionmaster":
				{
					"dest":"tariff.RegionMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"REGION_CODE","dest":"strRegionCode"}
							]
				},
				"fin_newregion":
				{
					"dest":"tariff.RegionMaster",
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
