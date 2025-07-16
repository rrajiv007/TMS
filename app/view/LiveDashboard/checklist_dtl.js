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
Ext.define('CueTrans.view.LiveDashboard.checklist_dtl', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		//mainpage.hlpSectionFlag=true;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.58;
		mainpage.popupWidthRatio=.4;
		mainpage.startPainting();
		
		mainpage.screenName = "Checklist Details";	

		var formCtrl=[];
		plf.columns=1
		var InspSummaryColumn = plf.addColumnSection({title:"", collapsed: false,"cls":""});
		
		var InspSummaryFormCtrl=
		[
			plf.addHidden({"id":"selChartSeries"}),
			plf.addHidden({"id":"selChartValue"})
		]		
		InspSummaryColumn.add(InspSummaryFormCtrl);	
		
		var InspSummaryObj=
		[			
			{columnname:"Inspection Type",dataname:"INSPECTION_TYPE",datatype:"string",width:100},			
			{columnname:"Checklist Description",dataname:"CHK_DESC",datatype:"string",width:150}			
		]
		var InspSummaryGridDetail=
		{
			title:"",
			id:"ChecklistGrid",
			detail:InspSummaryObj,
			visibleRow:10,
			removeAddDelete:true,
			removeFilter:true,
			readonly:true,
			widthBasis:"flex"
		}
		var InspSummaryGridSection = plf.addGrid(InspSummaryGridDetail,this)
				
		//mainpage.hlpSearchGridPtr = loadListSummaryGridSection
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(InspSummaryColumn)
		mainpage.ptrMainSection.add(InspSummaryGridSection) 
		
	    //History Data Section
		mainpage.dataHistorySectionFlag=false;	
	
		mainpage.eventHandlers = 
		[	
		{
			"controlid":"",
			"tasktype":"onload",
			"input":["iUID","selChartSeries","selChartValue"],
			"service":"TMSCoreTransportTS",
			"methodName":"TMSLiveInspDashTOTInsp"
		}	
		]		
		this.callParent(arguments);
	}
});