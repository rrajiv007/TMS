/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.2	 Sudhakar D			13/03/2016	  Golive				Grid addition in JS 
************************************************************************************************/
Ext.define('CueTrans.view.Report.backLoadDiversionReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "BackLoad-Diversion Reports";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			//{"name":"Operational Reports","linkid":"operation_rpt"},
			//{"name":"Statistical Reports","linkid":"rep_streports"}
		]
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var ReportsColumn = plf.addColumnSection({});	//69997
		
		var ReportsFormCtrl=							//69997
		[			
			plf.addCombo({"label":"Region",id:"strRegion"}),
            plf.addCombo({"label":"Hub",id:"strHub"}),
            plf.addCombo({"label":"Origin",id:"strOrigin"}),
            plf.addCombo({"label":"Destination",id:"strDestination"}),
            plf.addCombo({"label":"Commodity",id:"strCommodity"}), 
            plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory"}),
            plf.addCombo({"label":"Load Type",id:"strLoadType"}),
            plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
            plf.addText({"label":"Trip No",id:"strTripNo"}),
            plf.addText({"label":"Journey Plan No",id:"strJourneyNoFrom"}),
            plf.addText({"label":"Vehicle No",id:"strVehicleCode"}),
            plf.addText({"label":"Contract No",id:"strContractNo"}),
            plf.addCombo({"label":"Status","id":"strStatus"}),
            plf.addCombo({"label":"Carrier",id:"strCarrierCode"}),
            plf.addCombo({"label":"Asset Type",id:"strAssetType"}),
            plf.addCombo({"label":"Date Type","id":"strbcklddate"}),
            plf.addDate({"label":"Date From",id:"dtDateFrom"}),
            plf.addDate({"label":"Date To",id:"dtDateTo"})	
			
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({});	//69997
		ReportsFormCtrl=
		[
		  plf.addBlank(),//Golive
		  plf.addButton({"label":"Show Details","id":"GetDetails"}),//Golive	  
		  plf.addButton({"label":"Generate PDF","id":"backloadViolation"}),
		  //plf.addButton({"label":"Request Excel Based","id":"RequestExcel"}),
		  //plf.addButton({"label":"Shipment","id":"shipmentRequest"}),
		  //plf.addButton({"label":"Load","id":"LoadBuildingReport"}),		
		  //plf.addButton({"label":"Inspection","id":"ListInspection"}),
		  //plf.addButton({"label":"Journey Plan",id:"ListJourneyRpt"}),
		  plf.addBlank()//Golive
		
		]	
		
		// Grid section Begins--Golive

		BackLoadDivgrid=
		[   
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:150},		
			{columnname:"Load Type",dataname:"LOAD_TYPE",datatype:"string",width:150},
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:150},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:150},
			{columnname:"From Region",dataname:"FROM_REGION",datatype:"string",width:150},
			{columnname:"To Region",dataname:"TO_REGION",datatype:"string",width:150},			
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Origin Location Type",dataname:"ORIGIN_LOC",datatype:"string",width:200},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},	
            {columnname:"Destination Location Type ",dataname:"DESTINATION_LOC",datatype:"string",width:200},				
			{columnname:"Load Status",dataname:"LOAD_STATUS",datatype:"string",width:150},
			{columnname:"JP NO",dataname:"JP_NO",datatype:"string",width:150},			
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:150},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:150},
			{columnname:"Vehicle No",dataname:"VEHICLE_NO",datatype:"string",width:150},
			{columnname:"Utilisation(%)",dataname:"UTILISATION",datatype:"string",width:150},
			{columnname:"Weight(tons)",dataname:"WEIGHT",datatype:"string",width:150},
			{columnname:"Distance",dataname:"DISTANCE",datatype:"string",width:150},
			{columnname:"tonkm",dataname:"tnokm",datatype:"string",width:150},
			{columnname:"Created Date",dataname:"CREATED_DT",datatype:"string",width:150},
			{columnname:"Load Closed Date",dataname:"LOAD_CLOSED_DT",datatype:"string",width:150}
		]
		BackLoadDivdetails=
		{
			title:"BackLoad-Diversion Summary",
			id:"BackLoadDivdtl",
			detail:BackLoadDivgrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		BackLoadDivGridSection = plf.addGrid(BackLoadDivdetails,this)

		// Grid section Ends--Golive
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(BackLoadDivGridSection)//--Golive		
		
		
		mainpage.eventHandlers = 
		[	
		
			{ 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitBackloadDiversion"
			},
            {		 
				"controlid":"backloadViolation",
				"tasktype":"btnclick",
				"input":[
						"strRegion","strHub","strOrigin","strDestination","strCustomerName",
                         "strCommodity","strVehicleCategory","strLoadType","strLoadNoFrom",
                         "strTripNo","strJourneyNoFrom","strVehicleCode","strContractNo",
                         "strStatus","strCarrierCode","strAssetType","strbcklddate",
                         "dtDateFrom","dtDateTo"						
						],
				"service":"CoreReportService", 
				"methodName":"backLoadDiversionReport"
							
			}	
			// Grid section Begins--Golive
			,{		 
				"controlid":"GetDetails",
				"tasktype":"btnclick",
				"input":[
						"strRegion","strHub","strOrigin","strDestination","strCustomerName",
                         "strCommodity","strVehicleCategory","strLoadType","strLoadNoFrom",
                         "strTripNo","strJourneyNoFrom","strVehicleCode","strContractNo",
                         "strStatus","strCarrierCode","strAssetType","strbcklddate",
                         "dtDateFrom","dtDateTo"						
						],
				"service":"CoreReportService", 
				"methodName":"GetbackLoadDiversion"
							
			}
			// Grid section Ends--Golive
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
