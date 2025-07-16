/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			           Remarks             
************************************************************************************************	
1.0.0	     Raj		    04/06/2018                               Consolidation Report  		                                   
************************************************************************************************/
Ext.define('CueTrans.view.Report.ConsolidationReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "DO Report";
		
		
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		
		var ReportsColumn = plf.addColumnSection({});
		
		var ReportsFormCtrl=							
		[	
			plf.addCombo({"label":"From Region",id:"strRegion"}),
			plf.addCombo({"label":"Date Type","id":"strDateType","mandatory":"true"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom","mandatory":"true"}),
			plf.addDate({"label":"Date To",id:"dtDateTo","mandatory":"true"})
		
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=3
		var ReportsButtonColumn = plf.addColumnSection({});	
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Show Details","id":"getRequest"}),
		  plf.addBlank(),
		  		
		]
        ConsoReportgrid=
		[  
		
		{columnname:"DO No",dataname:"REF_DOC_NO",datatype:"string",width:100},
		{columnname:"Request No",dataname:"TRANS_REQ_NO",datatype:"string",width:120},
		{columnname:"Created Type",dataname:"CREATED_TYPE",datatype:"string",width:100},
		{columnname:"OU ID",dataname:"OU_ID",datatype:"string",width:80},
		{columnname:"Request Status",dataname:"STATUS",datatype:"string",width:110},
		{columnname:"Request Created Date",dataname:"REQUEST_DT",datatype:"string",width:150},
		{columnname:"Request Created Date/Time",dataname:"REQUEST_CRT_DT_TIME",datatype:"string",width:170},
		{columnname:"Journey Start Date/Time",dataname:"JP_START_DT_TIME",datatype:"string",width:150},
		{columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",width:150},
		{columnname:"Shipment Status",dataname:"SHIPMENT_STATUS",datatype:"string",width:110},
		{columnname:"Load NO",dataname:"LOAD_NO",datatype:"string",width:80},
		{columnname:"Load Status",dataname:"LOAD_STATUS",datatype:"string",width:110},
		{columnname:"Shipment Pickup Date",dataname:"SHIP_PICKUP_DATE",datatype:"string",width:150},
		{columnname:"Shipment Pickup Date/Time",dataname:"SHIP_PICKUP_DT_TIME",datatype:"string",width:170},
		{columnname:"Load Scheduled Date/Time",dataname:"LOAD_SCH_DT_TIME",datatype:"string",width:170},
		{columnname:"Load Created Date/Time",dataname:"LOAD_CRE_DT_TIME",datatype:"string",width:170},
		{columnname:"Consolidation Time(D:HH:MI)",dataname:"CONSOLIDATION_TIME",datatype:"string",width:170,hidden:true},
		{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
		{columnname:"From Region",dataname:"ORG_REG_DESC",datatype:"string",width:100},
		{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
		{columnname:"To Region",dataname:"DEST_REG_DESC",datatype:"string",width:100}
				
		]
		ConsoReportdetails=
		{
			title:"Consolidation Report Details",
			id:"reqsummdetails",
			detail:ConsoReportgrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		ConsoReportSection = plf.addGrid(ConsoReportdetails,this)		
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(ConsoReportSection)
		
		mainpage.eventHandlers = 
		[	
            { 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"initConsolidationRpt"
			},
			{		
				"controlid":"getRequest",
				"tasktype":"btnclick",
				"input":[
				         "strRegion","strDateType","dtDateFrom","dtDateTo"
						],
				"service":"CoreReportService",
				"methodName":"getConsolidationRpt"
							
			}	
		];
    mainpage.screenLinks=	
		{
		} 
		
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
