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
Ext.define('CueTrans.view.tariff.LaneHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true
		mainpage.startPainting();
		
		mainpage.screenName = "Lane Search";
		
		
		plf.columns = 3
		var laneHdrCollapse = plf.addColumnSection({title:"", collapsed: true});//69997
		
		
		var laneFormCtrl=														//69997
		[
			plf.addText({"label":"Lane Code",id:"strLaneCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Lane Code To",id:"strLaneCodeTo"}),
			plf.addText({"label":"Lane Description",id:"strLaneDesc"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Region From",id:"strRegionFrom"}),
			plf.addCombo({"label":"Region To",id:"strRegionTo"}),
			plf.addBlank(),
			plf.addButton({"label":"Search",id:"btnSearch"})
			
		]
		
		laneHdrCollapse.add(laneFormCtrl);
		//HelpOn3PL Header Section Ends
		
		//HelpOn3PL Grid Section Begins
		var laneGridFieldObj=										//69997
		[
			{columnname:"Lane Code",dataname:"LANE_CODE",datatype:"string",width:150},
			{columnname:"Lane Description",dataname:"LANE_DESC",datatype:"string",width:150},
			{columnname:"Region From",dataname:"REGION_FROM",datatype:"string",datatype:"string",width:100},
			{columnname:"Region To",dataname:"REGION_TO",datatype:"string",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:130},
			{columnname:"Lane Type",dataname:"LANE_TYPE",datatype:"string",width:130},
			{columnname:"Lane Category",dataname:"LANE_CATEGORY",datatype:"string",width:130}
		]
		laneGridDtl=
		{
			title:"",
			id:"laneGrid",
			detail:laneGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
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
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strLaneCodeFrom","strLaneCodeTo","strLaneDesc","strStatus","strRegionFrom","strRegionTo"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchAllLaneTS"
			}
		];
		this.callParent(arguments);
		
	}
});