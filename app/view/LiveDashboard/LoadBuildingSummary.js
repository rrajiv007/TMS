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
Ext.define('CueTrans.view.LiveDashboard.LoadBuildingSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		
		mainpage.screenName = "Load Summary";
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.58;
		mainpage.popupWidthRatio=.7;
		mainpage.startPainting();

		plf.columns=1
		var loadListSummaryColumn = plf.addColumnSection({title:"", collapsed: false,"cls":""});		
		
		var loadListSummaryFormCtrl=
		[
			plf.addHidden({"id":"selChartSeries"}),
			plf.addHidden({"id":"selChartValue"})
		]		
		loadListSummaryColumn.add(loadListSummaryFormCtrl);	

		var loadListSummaryObj=
		[   			
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:100},			
			{columnname:"Start Date",dataname:"START_DATE",datatype:"string",width:100},
			{columnname:"End Date",dataname:"END_DATE",datatype:"string",width:100},
			{columnname:"Logistics Group",dataname:"LOG_GRP",datatype:"string",width:120},
			{columnname:"Origin",dataname:"FROM_LOCATION",datatype:"string",width:90},
			{columnname:"Destination",dataname:"TO_LOCATION",datatype:"string",width:90},			
           		{columnname:"Vehicle<BR>Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:90},
		       {columnname:"Item Weight(ton)",dataname:"WEIGHT",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
		       {columnname:"Item Volume (cu.m)",dataname:"VOLUME",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
            		{columnname:"Utilization %",dataname:"UTILIZATION",datatype:"string",width:80,colAlign:'right'},
			{columnname:"Vehicle",dataname:"VEHICLE",datatype:"string",width:90}
			
		]
		var loadListSummaryGridDetail=
		{
			title:"",
			id:"LoadHelpGrid",
			detail:loadListSummaryObj,
			visibleRow:10,
			removeAddDelete:true,
			removeFilter:true,
			readonly:true,
			widthBasis:"flex"
			
		}
		var loadListSummaryGridSection = plf.addGrid(loadListSummaryGridDetail,this)	
		
		//adding the User Master field control to the mainpage	
	
		mainpage.ptrMainSection.add(loadListSummaryColumn) 
		mainpage.ptrMainSection.add(loadListSummaryGridSection) 
		
		//History Data Section
		//mainpage.dataHistorySectionFlag=false;
		
		
		
		mainpage.eventHandlers = 
			[	
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["iUID","selChartSeries","selChartValue"],
				"service":"TMSCoreTransportTS",
				"methodName":"initsearchassetutilLoadTS"
			}
			];
			
		
		
		mainpage.screenLinks=
		   {
			"loadnolink":
				{
					"dest":"tms.LoadBuilding",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"LOAD_NO","dest":"strLoadNo"}
							]
				}			
				
		    }
		this.callParent(arguments);
		
	
	}
});
