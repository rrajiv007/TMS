/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
                          
************************************************************************************************/
Ext.define('CueTrans.view.Report.DetailedLoadingReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Detailed Loading Report";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		/*mainpage.toolbarLinks=
		[
			{"name":"Operational Reports","linkid":"operation_rpt"},
			{"name":"Statistical Reports","linkid":"rep_streports"}
		]*/
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var ReportsColumn = plf.addColumnSection({});	
		
		var ReportsFormCtrl=							
		[	
		    plf.addText({"label":"PO No",id:"strRef"}),
			plf.addText({"label":"Ref Doc No",id:"strDocNo"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			
			plf.addCombo({"label":"Date Type",id:"strDateType"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"}),
			plf.addText({"label":"Remarks",id:"strPriority"}),
			
			plf.addCombo({"label":"Loading Point",id:"strLoadAtt"}), 
			plf.addCombo({"label":"Unloading Point",id:"strDelAtt"}),
			plf.addText({"label":"Load Description",id:"strLoadDesc"}),
			plf.addText({"label":"Item No",id:"strItemCode"}),
			
			plf.addCombo({"label":"Vendor Name",id:"strJMname"}),
			plf.addText({"label":"Requester Name",id:"strRequestorId"}),
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			plf.addCombo({"label":"Load Status",id:"strStatus"}),
			
			plf.addCombo({"label":"Inspection Status",id:"strInspectionNoFrom"}),
			plf.addCombo({"label":"Journey Status",id:"strJourneyNoFrom"}),
			plf.addText({"label":"Scheduled Vehicle",id:"strScheduleVeh"}),
			plf.addText({"label":"Reporting Vehicle",id:"strReportedVeh"}),
			
			plf.addText({"label":"Driver Code",id:"strDriverCodeFrom"}),
			plf.addText({"label":"Driver Name",id:"strDriverName"}),
			plf.addText({"label":"Driver Contact No",id:"strMobileNo"})
			
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=3
		var ReportsButtonColumn = plf.addColumnSection({});
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Show Details","id":"GetLoadingDetails"}),	  
		  plf.addBlank()		 
		  	
		]	
		LoadingDetailedpgrid=
		[  
             {columnname:"PO No",dataname:"PO_NO",datatype:"string",width:100},
			 {columnname:"Ref Doc No",dataname:"REF_DOC_NO",datatype:"string",width:100},
			 {columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:130},
			 {columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:130},
			 {columnname:"Request Date",dataname:"REQUEST_DATE",datatype:"string",width:100},
			 {columnname:"Pickup Date/Time",dataname:"PICKUP_DATE",datatype:"string",width:130},
			 {columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:100},
			 {columnname:"Loading Point",dataname:"LOADING_POINT",datatype:"string",width:120},
			 {columnname:"Unloading Point",dataname:"UNLOADING_POINT",datatype:"string",width:120},
			 {columnname:"Load Description",dataname:"LOAD_DESC",datatype:"string",width:120},
			 {columnname:"Actual Weight(ton)",dataname:"ACT_WEIGHT",datatype:"string",width:120,colAlign:'right',weightPrecision:3}, 
			 {columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",width:90},
			 {columnname:"Item Description",dataname:"ITEM_DESC",datatype:"string",width:120},
			 {columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:90},
			 {columnname:"Quantity",dataname:"QTY",datatype:"string",width:90},
			 {columnname:"UOM",dataname:"UOM",datatype:"string",width:50},
			 {columnname:"Weight(ton)",dataname:"WEIGHT",datatype:"string",width:90,colAlign:'right',weightPrecision:3},
             {columnname:"PO Line Item",dataname:"PO_LINE_ITEM",datatype:"string",width:90},
             {columnname:"Item Remarks",dataname:"ITEM_REMARKS",datatype:"string",width:90},	
			 {columnname:"Vendor Name",dataname:"VENDOR_NAME",datatype:"string",width:110},
			 {columnname:"Requestor Name",dataname:"REQUESTOR_NAME",datatype:"string",width:110},
			 {columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:80},
			 {columnname:"Load Status",dataname:"LOAD_STATUS",datatype:"string",width:90},
			 {columnname:"Inspection Status",dataname:"INSP_STATUS",datatype:"string",width:110},
			 {columnname:"Journey Status",dataname:"JOURNEY_STATUS",datatype:"string",width:100},
			 //{columnname:"From Region",dataname:"REGION_FROM",datatype:"string",width:90},
			 //{columnname:"To Region",dataname:"REGION_TO",datatype:"string",width:90},
			  {columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:115},
			 {columnname:"Scheduled Vehicle",dataname:"SCHVEHICLE",datatype:"string",width:115},
             {columnname:"Reporting Vehicle",dataname:"REPOVEHICLE",datatype:"string",width:115},
			 {columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:100},
			 {columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:110},
			 {columnname:"Driver Contact No",dataname:"DRIVER_CONTACT_NO",datatype:"string",width:110}
			 
		]
		LoadingDetailedRepdetails=
		{
			title:"Loading Details",
			id:"Loadsummarydtl",
			detail:LoadingDetailedpgrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		LoadingDetailedSection = plf.addGrid(LoadingDetailedRepdetails,this)
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(LoadingDetailedSection)	
		/*
		mainpage.hlpLinks=
		{
              
		}
		*/
		mainpage.eventHandlers = 
		[	
            { 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"initDetailedLoadingRptTs"
			},
			{		
				"controlid":"GetLoadingDetails",
				"tasktype":"btnclick",
				"input":[
						"strRef","strDocNo","strDateType", "strOrigin", "strDestination","strDelAtt","strLoadAtt", "strLoadNoFrom","strLoadDesc", "strItemCode","strJMname","strRequestorId","strStatus", "strInspectionNoFrom", "strJourneyNoFrom", "strScheduleVeh", "strReportedVeh", "strDriverCodeFrom", "strDriverName", "strMobileNo", "dtDateFrom", "dtDateTo","strPriority"
						],
				"service":"CoreReportService",
				"methodName":"LoadingDetailsRptTs"
							
			}
		];
/*mainpage.screenLinks=	
		{	
		} 
*/
		
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
