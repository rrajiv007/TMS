/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1          divya        3/06/2016       72874 
************************************************************************************************/
Ext.define('CueTrans.view.Report.DistanceDrivCoastalReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Distance Driven Report - Coastal";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		/*
		mainpage.toolbarLinks=
		[
			{"name":"Operational Reports","linkid":"operation_rpt"},
			{"name":"Statistical Reports","linkid":"rep_streports"}
		]
		*/
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var ReportsColumn = plf.addColumnSection({});	//69997
		
		var ReportsFormCtrl=							//69997
		[			
			plf.addCombo({"label":"Region",id:"strRegion"}),
			plf.addCombo({"label":"Hub",id:"strHub"}),
			plf.addCombo({"label":"Origin",id:"strRequestNoTo"}),
			plf.addCombo({"label":"Destination",id:"strShipmentNoTo"}),
			plf.addText({"label":"Journey Plan No",id:"strJourneyNoFrom"}),
			plf.addText({"label":"Journey Manager",id:"strDriverCodeFrom"}),
			plf.addText({"label":"Inspection No",id:"strInspectionNoFrom"}),
			plf.addText({"label":"Driver Name",id:"strVehicleCodeFrom"}),
			plf.addText({"label":"Driver Mobile No",id:"strMobileNo"}),
			plf.addText({"label":"Vehicle No",id:"strVehicleNo"}),
			plf.addText({"label":"Contract No",id:"strContNo"}),
			plf.addText({"label":"Shipment No",id:"strShipmentNoFrom"}),
			plf.addText({"label":"DO No",id:"strDocNo"}),
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			plf.addText({"label":"Trip No",id:"strTripNo"}),
			plf.addText({"label":"Request No",id:"strRequestNoFrom"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity"}), 
			plf.addCombo({"label":"Carrier",id:"strCarrierCode"}),
			plf.addCombo({"label":"Date Type","id":"strDateT"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"})
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({});	//69997
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Show Details","id":"getDistanceDrivenDtl"}),
		  plf.addButton({"label":"Generate PDF",id:"DistanceDriven"}),
		  plf.addBlank()
		
		]	
		DistanceDrivengrid=
		[   
			
			{columnname:"JP No",dataname:"JOURNEY_PLAN_NO",datatype:"string",width:100},
			{columnname:"Distance Driven",dataname:"TOT_DIST",datatype:"string",width:150},
			{columnname:"Journey Distance",dataname:"JP_DIST",datatype:"string",width:150},
			{columnname:"Region",dataname:"REGION_DESC",datatype:"string",width:100},
			{columnname:"Origin",dataname:"ORIGIN_DESC",datatype:"string",width:100},
			{columnname:"Origin Location Type",dataname:"ORG_TYPE_DESC",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DESTINATION_DESC",datatype:"string",width:100},
			{columnname:"Destination location type",dataname:"DEST_TYPE_DESC",datatype:"string",width:150},
			{columnname:"Load No",dataname:"WAYBILL_NO",datatype:"string",width:100},
			{columnname:"Load Status",dataname:"LOAD_STATUS",datatype:"string",width:130},
			{columnname:"commodity",dataname:"COMMODITY_DESC",datatype:"string",width:100},
			{columnname:"Load Type",dataname:"LOAD_TYPE_DESC",datatype:"string",width:100},
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:100},
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:150},
			{columnname:"Vehicle No",dataname:"TRUCK_REG_NO",datatype:"string",width:150},
			{columnname:"Vehicle Category",dataname:"TRUCK_CATEGORY_DESC",datatype:"string",width:150},
			{columnname:"Contract No",dataname:"CONT_NUM",datatype:"string",width:150},
			{columnname:"Journey Manager",dataname:"JM_CODE",datatype:"string",width:150},
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:150},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:150},
			{columnname:"Journey Plan Date",dataname:"JP_DT",datatype:"string",width:125},
			{columnname:"JP Created Date",dataname:"CREATED_DATE",datatype:"string",width:100},
			{columnname:"Total Load Weight",dataname:"TOTAL_LOAD_WT",datatype:"string",width:125},
			{columnname:"Load Delivered Date",dataname:"LOAD_DELIVERED_DT",datatype:"string",width:125},
			{columnname:"Actual Weight",dataname:"ACTUAL_WEIGHT",datatype:"string",width:125},
			{columnname:"Loading Point",dataname:"LOAD_AT",datatype:"string",width:125},
			{columnname:"Unloading Point",dataname:"DELIVERY_AT",datatype:"string",width:125}
			
				
		]
		DistanceDrivendetails=
		{
			title:"Distance Driven Details",
			id:"DistanceDrivendtl",
			detail:DistanceDrivengrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		DistanceDrivenGridSection = plf.addGrid(DistanceDrivendetails,this)
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(DistanceDrivenGridSection)//--Golive		
		
		
		mainpage.eventHandlers = 
		[	
         { 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitDistanceDrivCost"// InitReportScreen_Dist
			},
		{       
				"controlid":"DistanceDriven",
				"tasktype":"btnclick", 
				"input":[
						"strRegion","strRequestNoTo","strShipmentNoTo","strJourneyNoFrom","strDriverCodeFrom","strInspectionNoFrom","strDriverName","strMobileNo",
						"strVehicleRegno","strContNo","strShipmentNoFrom","strInspectionNoTo","strLoadNoFrom","strVehicleNo","strVehicleCodeFrom",
						"strTripNo","strRequestNoFrom","strCommodity","strCarrierCode","strDateT","dtDateFrom","dtDateTo","strDocNo","strLoadType"
				/*
						"strRequestNoFrom","strShipmentNoFrom","strLoadNoFrom","strJourneyNoFrom","strInspectionNoFrom","strRegion",
						"strRequestNoTo","strShipmentNoTo","strPriority","strCommodity","strCarrierCode","strDriverCodeFrom",
						"strVehicleCodeFrom","strInspectionNoTo","dtDateFrom","dtDateTo","strLoadNoTo","strJourneyNoTo","strLocation","strDrivername","strDriverno"	*/					
						],
			    "service":"CoreReportService",
				"methodName":"printDistDrivCoastalReport"
			},
{       
				"controlid":"getDistanceDrivenDtl",
				"tasktype":"btnclick", 
				"input":[
				
						"strRegion","strRequestNoTo","strShipmentNoTo","strJourneyNoFrom","strDriverCodeFrom","strInspectionNoFrom","strDriverName","strMobileNo",
						"strVehicleRegno","strContNo","strShipmentNoFrom","strInspectionNoTo","strLoadNoFrom","strVehicleNo","strVehicleCodeFrom",
						"strTripNo","strRequestNoFrom","strCommodity","strCarrierCode","strDateT","dtDateFrom","dtDateTo","strDocNo","strLoadType"
				/*
						"strRequestNoFrom","strShipmentNoFrom","strLoadNoFrom","strJourneyNoFrom","strInspectionNoFrom","strRegion",
						"strRequestNoTo","strShipmentNoTo","strPriority","strCommodity","strCarrierCode","strDriverCodeFrom",
						"strVehicleCodeFrom","strInspectionNoTo","dtDateFrom","dtDateTo","strLoadNoTo","strJourneyNoTo","strLocation","strDrivername","strDriverno"	
*/						
						],
			    "service":"CoreReportService",
				"methodName":"printDistDrivCoastalDtl"
			}			
		];
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
		
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
