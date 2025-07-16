/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  : SUDHAKAR
Version		  :	1.0.1
Date		  : 2-6-2016
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************                               
************************************************************************************************/
Ext.define('CueTrans.view.Report.LoadConsolidationReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Load Consolidation Report";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		/*mainpage.toolbarLinks=
		[
			{"name":"Operational Reports","linkid":"operation_rpt"},
			{"name":"Statistical Reports","linkid":"rep_streports"}
		]*/
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var ReportsColumn = plf.addColumnSection({});	//69997
		
		
		var ReportsFormCtrl=							//69997
		[			
			plf.addCombo({"label":"Region",id:"strRegion"}),
			plf.addCombo({"label":"Hub",id:"strHub"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strShipmentNoTo"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity"}), 
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			plf.addCombo({"label":"Load Type","id":"strLoadType"}),
			plf.addCombo({"label":"Load Status","id":"strStatus"}),
			plf.addText({"label":"Request No",id:"strRequestNoFrom"}),
			plf.addText({"label":"DO No",id:"strDocNo"}),			
			plf.addText({"label":"Journey Plan No",id:"strJourneyNoFrom"}),
			plf.addText({"label":"WBS No",id:"strWBSNo"}),
			plf.addText({"label":"Shipment No",id:"strShipmentNoFrom"}),
			plf.addCombo({"label":"Carrier Code",id:"strCarrierCode"}),						
			plf.addText({"label":"Vehicle Code",id:"strVehicleCodeFrom"}),			
			plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory"}), 
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"}),			
			plf.addCombo({"label":"Year",id:"strYear"}),
			plf.addCombo({"label":"Month","id":"strMonth"})			
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=3
		var ReportsButtonColumn = plf.addColumnSection({});	//69997
		ReportsFormCtrl=
		[
		  plf.addBlank(),		  
		  //plf.addButton({"label":"Show Details","id":"GetLoadSummaryDetails"}),//Golive	  
		  plf.addButton({"label":"Generate PDF","id":"LoadConsolidateReport"}),
		  plf.addBlank()		 		  		
		]	
	

		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
			
		/*
		mainpage.hlpLinks=
		{
                "requestnofrom":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.TransRequestItemHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRequestNoFrom","child":"TRANS_REQ_NO"}
							]
				},                     
		}
		*/
		mainpage.eventHandlers = 
		[	         
			{ 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitReportScreenLdCon"
			},					
			{		
				"controlid":"LoadConsolidateReport",
				"tasktype":"btnclick",
				"input":[
						"strRegion","strHub","strOrigin","strShipmentNoTo","strCommodity","strLoadNoFrom","strLoadType","strStatus","strRequestNoFrom","strDocNo","strJourneyNoFrom","strWBSNo","strPriority","strShipmentNoFrom","strStatus","strCarrierCode","strVehicleCodeFrom","strVehicleCategory","strDateType","dtDateFrom","dtDateTo","strYear","strMonth","strLocation","strLoadDesc","strScheduleVeh","strReportedVeh","strLoadAtt","strDelAtt","strRef"
						],
				"service":"CoreReportService",
				"methodName":"PrintLoadConsolidateReport"
			}
		];
			
		
/*	
mainpage.screenLinks=	
		{	
				"operation_rpt":
				{
					"dest":"Report.Report",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
	"rep_streports":
				{
					"dest":"Report.StatisticalReport",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		} 
		
*/			
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
