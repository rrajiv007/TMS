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
Ext.define('CueTrans.view.LiveDashboard.rejection_dtl', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		//mainpage.hlpSectionFlag=true;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.58;
		mainpage.popupWidthRatio=.7;
		mainpage.startPainting();
		
		mainpage.screenName = "Inspection Details";	

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
			{columnname:"Inspection No",dataname:"INSPECTION_NO",datatype:"string",width:100},			
			{columnname:"Inspection Date/Time",dataname:"INSPECTION_DATE",datatype:"string",width:150},
			 {columnname:"Load No",dataname:"Load No",datatype:"string",width:150},
			{columnname:"Load Description",dataname:"Load Description",datatype:"string",width:150},
			{columnname:"Loading Point",dataname:"Loading Point",datatype:"string",width:150},
			{columnname:"Unloading Point",dataname:"UnLoading Point",datatype:"string",width:150},
			{columnname:"Scheduled Vehicle",dataname:"SCH_VCH",datatype:"string",width:150},
			{columnname:"Reporting Vehicle",dataname:"REP_VCH",datatype:"string",width:150},
			{columnname:"Driver",dataname:"DRIVER",datatype:"string",width:200},			
			//{columnname:"Vehicle",dataname:"TRUCK",datatype:"string",width:200},
			{columnname:"Vehicle Category",dataname:"TRUCK_CATEGORY",datatype:"string",width:200},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:200},				
			{columnname:"Inspector",dataname:"INSPECTOR",datatype:"string",width:100},
			{columnname:"Rejection Remarks",dataname:"REJ_REMARKS",datatype:"string",width:100},
			{columnname:"Pass",dataname:"PASS",datatype:"string",width:100,colAlign:'right',linkId:"db_passdtl",gridpopup:true,tooltip:"Click here to view checklist details."},
			{columnname:"Fail",dataname:"FAIL",datatype:"string",width:100,colAlign:'right',linkId:"db_faildtl",gridpopup:true,tooltip:"Click here to view checklist details."}
			//{columnname:"Status",dataname:"STATUS",datatype:"string",width:150}
		]
		var InspSummaryGridDetail=
		{
			title:"",
			id:"InspectionGrid",
			detail:InspSummaryObj,
			visibleRow:10,
			removeAddDelete:true,
			removeFilter:true,
			readonly:true
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
		];
		mainpage.gridPopupLinks=
		{
			"db_passdtl":
			{
				"dest":"LiveDashboard.checklist_dtl",
				"popMethodName":"fetchInspdashPassChk",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"INSPECTION_NO","dest":"selChartSeries"}
						]
			},
			"db_faildtl":
			{
				"dest":"LiveDashboard.checklist_dtl",
				"popMethodName":"fetchInspdashFailChk",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"INSPECTION_NO","dest":"selChartSeries"}
						]
			}
		}		
		this.callParent(arguments);
	}
});