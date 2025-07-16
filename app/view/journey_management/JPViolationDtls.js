/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	Steffie	  														                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
 1.0.0     steffie        05/01/17       		                                   
************************************************************************************************/
Ext.define('CueTrans.view.journey_management.JPViolationDtls', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		//mainpage.hlpSectionFlag=true;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.5;
		mainpage.popupWidthRatio=.58;
		mainpage.startPainting();
		
		mainpage.screenName = "Violation List";	

		var formCtrl=[];
		plf.columns=3
		var violSummaryColumn = plf.addColumnSection({title:"", collapsed: false,"cls":""});
		
		var violSummaryFormCtrl=
		[   
		    plf.addDisplayOnly({"label":"Manual Violation Count",id:"strJPCnt"}),
			plf.addDisplayOnly({"label":"IVMS Violation Count",id:"strIVMSCnt"}),
			plf.addBlank(),
			plf.addHidden({"id":"selChartSeries"}),
			plf.addHidden({"id":"selChartValue"})
			
			
		]		
		violSummaryColumn.add(violSummaryFormCtrl);	
		
		var violSummaryObj=
		[			
			{columnname:"Violation Code",dataname:"VIO_CODE",datatype:"string",width:150},			
			{columnname:"Violation Name",dataname:"VIO_DESC",datatype:"string",width:150},						
			{columnname:"Violation Type",dataname:"VIO_TYPE",datatype:"string",width:150}
					
		]
		violSummaryGridDetail=
		{
			title:"Manual Violation Details",
			id:"vioDtl",
			detail:violSummaryObj,
			visibleRow:10,
			removeAddDelete:true,
			removeTbar:true,
			readonly:true
			
		}
		var violSummaryGridSection = plf.addGrid(violSummaryGridDetail,this)
		
		var vioIVMSSummaryObj=
		[			
			{columnname:"Violation Code",dataname:"IVMS_VIO_CODE",datatype:"string",width:150},			
			{columnname:"Violation Name",dataname:"IVMS_VIO_DESC",datatype:"string",width:150},						
			{columnname:"Violation Type",dataname:"IVMS_VIO_TYPE",datatype:"string",width:150},
			{columnname:"Violation Start Time",dataname:"VIO_START",datatype:"string",width:150},
			{columnname:"Violation End Time",dataname:"VIO_END",datatype:"string",width:150},
			{columnname:"Duration",dataname:"DURATION",datatype:"string",width:150}
					
		]
		vioIVMSSummaryGridDetail=
		{
			title:"IVMS Violation Details",
			id:"vio1Dtls",
			detail:vioIVMSSummaryObj,
			visibleRow:10,
			removeAddDelete:true,
			removeTbar:true,
			readonly:true
			
		}
		var vioIVMSSummaryGridSection = plf.addGrid(vioIVMSSummaryGridDetail,this)	
		
		var baseTab = plf.addTabSection({ tabs:[violSummaryGridSection,vioIVMSSummaryGridSection
												]});
		//mainpage.hlpSearchGridPtr = loadListSummaryGridSection
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(violSummaryColumn)
		mainpage.ptrMainSection.add(baseTab) 
		
	    //History Data Section
		mainpage.dataHistorySectionFlag=false;	
	
		mainpage.eventHandlers = 
		[	
		{
			"controlid":"",
			"tasktype":"onload",
			"input":["iUID","selChartSeries","selChartValue"],
			"service":"CoreConsequencemanagement",
			"methodName":"initVioDtlsTS"
		}	
		];		
		this.callParent(arguments);
	}
});