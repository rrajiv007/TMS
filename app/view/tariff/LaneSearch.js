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
1.0.2	 	Manibharathi	05/02/2016    	69997                         Addition of var               
************************************************************************************************/
Ext.define('CueTrans.view.tariff.LaneSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Lane Summary";
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Create a new lane.","linkid":"fin_newlane","tooltip":"Click here to create a new lane."}
		]
			
		plf.columns = 4
		var laneHdrCollapse = plf.addCollapseSection({title:"Search Criteria", collapsed: true,btnID:"searchBtn"},this);//69997
		
		
		var laneFormCtrl=											//69997
		[
			plf.addText({"label":"Lane Code",id:"strLaneCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Lane Code To",id:"strLaneCodeTo"}),
			plf.addText({"label":"Lane Description",id:"strLaneDesc"}),
			plf.addCombo({"label":"Region From",id:"strRegionFrom"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Region To",id:"strRegionTo"})
			
		]
		
		laneHdrCollapse.add(laneFormCtrl);
		//HelpOn3PL Header Section Ends
		
		//HelpOn3PL Grid Section Begins
		var laneGridFieldObj=								//69997
		[
			{columnname:"Lane Code",dataname:"LANE_CODE",datatype:"string",width:150,linkId:"laneMaster","tooltip":"Click here to launch the lane screen."},
			{columnname:"Lane Description",dataname:"LANE_DESC",datatype:"string",width:150},
			{columnname:"Region From",dataname:"REGION_FROM",datatype:"string",datatype:"string",width:100},
			{columnname:"Region To",dataname:"REGION_TO",datatype:"string",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:130},
			{columnname:"Lane Type",dataname:"LANE_TYPE",datatype:"string",width:130},
			{columnname:"Lane Category",dataname:"LANE_CATEGORY",datatype:"string",width:130}
		]
		var laneGridDtl=											//69997
		{
			title:"",
			id:"laneGrid",
			detail:laneGridFieldObj,
			visibleRow:plf.searchVisibleRows,
			readonly:true,
			removeAddDelete:true
		}
		
		//HelpOn3PL Grid Section Ends
		
		//Add Child Sections
	
		mainpage.ptrMainSection.add(laneHdrCollapse)//Add Header Section to Main Page
		var helpGridSection=plf.addGrid(laneGridDtl,this)	//69997
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
				"methodName":"iniLaneSrchTS"
			},
			{
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strLaneCodeFrom","strLaneDesc","strStatus","strRegionFrom","strRegionTo"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchAllLaneTS"	
			}
		];
	
		mainpage.screenLinks=
		{
			"laneMaster":
				{
					"dest":"tariff.LaneMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"LANE_CODE","dest":"strLaneCode"}
							]
				},
				"fin_newlane":
				{
					"dest":"tariff.LaneMaster",
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