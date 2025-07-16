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
Ext.define('CueTrans.view.Report.CargoMonthlyStats', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Cargo Monthly Stats";		
		
		plf.columns=4
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Save",
                "tooltip": "Click here to save."
            }
            ]
		
		
		
		
		
		
		var ReportsColumn = plf.addColumnSection({});
		
		var ReportsFormCtrl=						
		[
		  plf.addCombo({"label":"Year",id:"strDuration",mandatory:true}),//dtDateFrom,strLoadType//strDuration//strVehicleAvailability
		  plf.addCombo({"label":"Month",id:"strSelectMonth",mandatory:true}),//strLocationType//strSelectMonth
		  plf.addButton({"label":"Search","id":"btnSearch"})
		]
		
		ReportsColumn.add(ReportsFormCtrl);  
		
		/***Section 1***/
		plf.columns=1
        var ReportsSec1 = plf.addColumnSection({title:"Particulars"});
		var Sect1=						
		[
	   	    plf.addText({"labelWidth":480,"label":"Number Of Scheduled Trips",id:"strCustomerCode",inputFormat:"integer"}),//numeric
			plf.addText({"labelWidth":480,"label":"Distance(KM)",id:"strContractNo",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Weight(T)",id:"strOrganisationId",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Trips By North",id:"strTranNo",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Trips By South",id:"dtTranDate",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Trips By Others",id:"strOrigin",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Delivered Ontime(Standard Trips)",id:"strDestination",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Delivered Overtime(Standard Trips)",id:"strFromDate",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Delivered Overtime=>24",id:"strRequestNo",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Delivered Overtime>24-48",id:"strReqMailId",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Delivered Overtime>49-72",id:"strShipmentNoHid",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Delivered Overtime>72",id:"strDocNo",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Delivered Ontime(HotShot)",id:"strContractType",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Delivered Overtime(HotShot)",id:"dtPickUpDateTime",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Average Weight(Ton)",id:"dtRosDateTime",inputFormat:"numeric",InputPrecision:"3"}),
			plf.addText({"labelWidth":480,"label":"Average Volume(%)",id:"strWeightUom",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Baiza Per Ton Per Km",id:"strVolumeUom",inputFormat:"numeric",InputPrecision:"3"}),
			plf.addText({"labelWidth":480,"label":"Active Contracts Per Month",id:"strPriority",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Box Trucks Available",id:"strLoadNo",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Box Trucks Total Trips",id:"dtLoadDate",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"No SJP issued",id:"tmLoadTime",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Breakdown",id:"strVehicleCategory",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Driver(HSE)",id:"strStatus",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"No Driver",id:"strDemandStatus",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Weather",id:"strShippmentNo",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Other",id:"strCostCenterCode",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Spot Hire Canter",id:"dtShippmentDate",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Spot Hire Box Truck",id:"strCustomerName",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Spot Hire 40 Flat Bed",id:"dtPickUpDateTimeFrom",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Spot Hire Extendable Trailer",id:"dtROSDateTimeFrom",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Spot Hire Low Bed",id:"dtPickUpDateTimeTo",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Spot Hire Canter Cost",id:"dtROSDateTimeTo",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Spot Hire Box Truck Cost",id:"strRequestNoHid",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Spot Hire 40 Flat Bed Cost",id:"strDriverCode",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Spot Hire Extendable Trailer Cost",id:"strTruckCode",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Spot Hire Low Bed Cost",id:"strCarrierCode",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"ADS Total Trips N",id:"strInspectionNo",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"ATE Total Trips S",id:"tmPickUpTime",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"STST Total Trips N",id:"tmROSTime",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"WGCC Total Trips S",id:"strPeriod",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"AH Total N",id:"strRouteCode",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"WPAI Total S",id:"strRouteDesc",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"STS Total S",id:"dtLoadingDate",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"GPS Total S",id:"iLoadStartTime",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"BEC Total S",id:"iLoadCompTime",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"ADS Direct (N)",id:"dtLoadClosDate",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"ATE Direct (S)",id:"iLoadClosTime",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"STST Direct (N)",id:"strRequestorName",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"WGCC Direct (S)",id:"dtNewDelDt",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"AH Direct (N)",id:"dtNewDelTime",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"WPAI Direct (S)",id:"strNotes",inputFormat:"integer"}),//strBlueKeyNo
			plf.addText({"labelWidth":480,"label":"STS Direct (S)",id:"strApproverName",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"GPS Direct (S)",id:"strChgeReason",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"BEC Direct (S)",id:"strUpdatedBy",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Direct Delivery Saving North (OR4.275)",id:"strUpdDtTime",inputFormat:"numeric",InputPrecision:"3"}),
			plf.addText({"labelWidth":480,"label":"Direct Delivery Saving South (OR3.750)",id:"strWeight",inputFormat:"numeric",InputPrecision:"3"}),
			plf.addText({"labelWidth":480,"label":"Direct Delivery Saving Total",id:"strVolume",inputFormat:"numeric",InputPrecision:"3"}),
			plf.addText({"labelWidth":480,"label":"Harsh Acceleration",id:"strCostCenterName",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Harsh Breaking",id:"strCreatedType",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Over Speeding",id:"strFileAttach",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Late Departure(V1)",id:"strChildShipmentid",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Unauthorised Asset Change(V2)",id:"dtUnLoadingDate",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Unauthorised Driver Change(V3)",id:"iUnLoadStartTime",inputFormat:"integer"}),		
			plf.addText({"labelWidth":480,"label":"Did Not Contact JMC(V4)",id:"strTrackVeh",inputFormat:"integer"}),//strTrackVeh//iUnLoadCompTimestrRequestType
			plf.addText({"labelWidth":480,"label":"Failure To Take Rest(V5)",id:"dtUnLoadClosDate",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Arrived Early(V6)",id:"strVehCategoryGroup",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Arrived Late(V7)",id:"dtRequestDate",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Night Driving(V8)",id:"strRequestType",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"IVMS Fault(V9)",id:"strShippmentNoFrom",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Active",id:"strShippmentNoTo",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Counselled",id:"dtShippmentDateFrom",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"First Warning",id:"dtShippmentDateTo",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Second Warning",id:"strDelDtChgd",inputFormat:"integer"}),			
			plf.addText({"labelWidth":480,"label":"Suspended",id:"strRegion",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Terminated",id:"strLocation",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Off",id:"strBulkReqNo",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"SLA Comments",id:"iAmendmentNo",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Coast To North(24hrs on-time)",id:"strRemarks",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Coast To North(24hrs over time)",id:"strDateType",inputFormat:"integer"}), 
			plf.addText({"labelWidth":480,"label":"Coast To South(72hrs on-time)",id:"strVehicleType",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Coast To South(72hrs over time)",id:"strViolationCode",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Sohar To North(36hrs on-time)",id:"tmNewDelTime",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Sohar To North(36hrs over time)",id:"dtNewDeliveryDate",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Sohar To South(72hrs on-time)",id:"strLoadAt",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Sohar To South(72hrs over time)",id:"strVendorCode",inputFormat:"integer"}),		
			plf.addText({"labelWidth":480,"label":"Duqm To North(36hrs on-time)",id:"strVehRegNo",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Duqm To North(36hrs over time)",id:"strFromLocation",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Duqm To South(24hrs on-time)",id:"strToLocation",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Duqm To South(24hrs over time)",id:"strFromRegion",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Duqm To Coast(72hrs on-time)",id:"strToRegion",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Duqm To Coast(72hrs over time)",id:"strToDate",inputFormat:"integer"}),			
			plf.addText({"labelWidth":480,"label":"Consolidated Shipment Received",id:"strLoadingLocation",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Processed Within 72hrs",id:"strDivCode",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Processed Over 72 hrs",id:"strLogGroup",inputFormat:"integer"}),	  
			plf.addText({"labelWidth":480,"label":"Number Of Scheduled Trips From Sumitomo To North",id:"strUnLoadingLocation",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Number Of Scheduled Trips From Sumitomo To South",id:"strUtilization",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Ghala CCC To North",id:"strSplitBasis",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Ghala CCC To South",id:"iSplitValue",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Ghala CCC To Coast",id:"strCarCode",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Sohar To North",id:"iTareWt",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Sohar To South",id:"iGrossWt",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Sohar To Coast",id:"dtDepartureDate",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Duqm To North",id:"strLoaInsReq",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Duqm To South",id:"strVehCat",inputFormat:"integer"}),
			plf.addText({"labelWidth":480,"label":"Duqm To Coast",id:"strVehCode",inputFormat:"integer"})
        ]
		
	
		ReportsSec1.add(Sect1); 
		
		
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsSec1)
	
		
		mainpage.eventHandlers = 
		[	
            { 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"INITCARGOMONTHLYSTATS"
			},
			{		
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":[
						"strDuration","strSelectMonth"
						],
				"service":"TMSCoreTransportTS",
				"methodName":"SEARCH_CARGOMONTHLYSTATS"
							
			},
			{	

                "controlid":"",
				"tasktype":"toolbarclick",			
				//"controlid":"btnSave",
				//"tasktype":"btnclick",
				"action":"Save",
				"input":[
						 "strSelectMonth","strDuration","strCustomerCode", "strContractNo", "strOrganisationId", "strTranNo", "dtTranDate", "strOrigin", "strDestination", "strFromDate", "strRequestNo", "strReqMailId", "strShipmentNoHid", "strDocNo", "strContractType", "dtPickUpDateTime", "dtRosDateTime", "strWeightUom", "strVolumeUom", "strPriority", "strLoadNo", "dtLoadDate", "tmLoadTime", "strVehicleCategory", "strStatus", "strDemandStatus", "strShippmentNo", "strCostCenterCode", "dtShippmentDate", "strCustomerName", "dtPickUpDateTimeFrom", "dtROSDateTimeFrom", "dtPickUpDateTimeTo", "dtROSDateTimeTo", "strRequestNoHid", "strDriverCode", "strTruckCode", "strCarrierCode", "strInspectionNo", "tmPickUpTime", "tmROSTime", "strPeriod", "strRouteCode", "strRouteDesc", "dtLoadingDate", "iLoadStartTime", "iLoadCompTime", "dtLoadClosDate", "iLoadClosTime", "strRequestorName", "dtNewDelDt", "dtNewDelTime", "strNotes", "strApproverName", "strChgeReason", "strUpdatedBy" , "strUpdDtTime", "strWeight", "strVolume",  "strCostCenterName", "strCreatedType", "strFileAttach", "strChildShipmentid", "dtUnLoadingDate", "iUnLoadStartTime", "strTrackVeh", "dtUnLoadClosDate", "strVehCategoryGroup", "dtRequestDate", "strRequestType", "strShippmentNoFrom", "strShippmentNoTo", "dtShippmentDateFrom", "dtShippmentDateTo", "strDelDtChgd", "strRegion", "strLocation", "strBulkReqNo", "iAmendmentNo", "strRemarks", "strDateType", "strVehicleType", "strViolationCode", "tmNewDelTime", "dtNewDeliveryDate", "strLoadAt", "strVendorCode", "strLoadingLocation", "strDivCode", "strLogGroup", "strUnLoadingLocation", "strUtilization", "strSplitBasis", "iSplitValue", "strCarCode", "iTareWt", "iGrossWt", "dtDepartureDate", "strLoaInsReq", "strVehCat", "strVehCode", "strVehRegNo", "strFromLocation", "strToLocation", "strFromRegion", "strToRegion", "strToDate","strTrackVeh"
						],
				"service":"TMSCoreTransportTS",
				"methodName":"SAVE_CARGOMONTHLYSTATS",
				"msg":"Are you sure want to save?"

							
			}
		];	
				
		this.callParent(arguments);		
	}
});
