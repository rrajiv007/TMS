/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.5															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.ProofOfDelivery.PODLoadLevelSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "POD Summary";
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
		  
        ]	
		
		
		
		//Truck Master Section starts

		var formCtrl=[];
		plf.columns=4
		var loadListSummaryColumn = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
		
		
		var loadListSummaryFormCtrl=
		[
			plf.addText({"label":"Load No",id:"strLoadNoFrom","anywhereSearch":"true"}),
			//plf.addHlpText({"label":"Request No",id:"strRequestNo",hlpLinkID:"transreqno"},this),
			plf.addText({"label":"Request No",id:"strRequestNo"}),
			//plf.addHlpText({"label":"Shipment No",id:"strShippmentNo",hlpLinkID:"shipmentno"},this),	
			plf.addText({"label":"Shipment No",id:"strShippmentNo"}),
			
			//plf.addHlpText({"label":"Journey Plan No",id:"strJourneyPlanNo",hlpLinkID:"journeyno"},this),	
			plf.addText({"label":"Journey Plan No",id:"strJourneyPlanNo"}),
			
			plf.addCombo({"label":"Commodity","id":"strCommodity"}),
			plf.addCombo({"label":"Vehicle Category","id":"strVehicleCategory"}),
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addText({"label":"Registration No",id:"strRegNo"}),
			plf.addDate({"label":"Date From","id":"dtLoadDateFrom"}),
			plf.addDate({"label":"Date To","id":"dtLoadDateTo"}),
			
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination","id":"strDestination"}),
			plf.addCombo({"label":"Loading Point",id:"strLoadPt"}),  
			plf.addCombo({"label":"Unloading Point",id:"strDelvAt"}),
		    plf.addCombo({"label":"From Region",id:"strFromRegion"}),
			plf.addCombo({"label":"To Region",id:"strToRegion"}),
			plf.addText({"label":"Ref Doc No",id:"strDocNo","anywhereSearch":"true"}),
			plf.addText({"label":"Load Description",id:"strLoadDescription"}),
			plf.addText({"label":"PO No",id:"strPONum","anywhereSearch":"true"}),
			//plf.addText({"label":"Utilization % From",id:"strUtilFrom",hidden:true}),
			//plf.addText({"label":"Utilization % To",id:"strUtilTo",hidden:true}),
			plf.addCombo({"label":"Status","id":"strStatus",hidden:true})
			
		]
		
		loadListSummaryColumn.add(loadListSummaryFormCtrl);
		
		var loadListSummaryObj=
		[   
			{columnname:"Print WayBill",dataname:"WAYBILL",datatype:"string",width:130,gridReport:"PrintWaybill",imageURL:"resources/images/shared/calendar.gif",tooltip:"Click here to print waybill."},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:100,linkId:"loadnolink",tooltip:"Click here to launch the load screen."},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:80},
			{columnname:"PO No",dataname:"PO_NO",datatype:"string",width:100},
			/*{columnname:"Departure Date",dataname:"LOAD_DATE",datatype:"string",width:100},*/
			{columnname:"Load No",dataname:"strLoadNo",datatype:"string",width:130,hidden:true},
			{columnname:"Shipment Pickup Date",dataname:"LOAD_DATE",datatype:"string",width:130},
			{columnname:"Contractual Delivery Date",dataname:"DELV_DATE",datatype:"string",width:150},
			{columnname:"Shipment Number",dataname:"SHIPMENT_LIST",datatype:"string",width:140},
            {columnname:"Request Number",dataname:"REQUEST_LIST",datatype:"string",width:140},
            {columnname:"Route",dataname:"ROUTE_CODE",datatype:"string",width:90},
			{columnname:"Origin",dataname:"FROM_LOCATION",datatype:"string",width:90},
			{columnname:"Destination",dataname:"TO_LOCATION",datatype:"string",width:90},			
			{columnname:"Expected Arrival Time",dataname:"EXP_ARRIVAL_TIME",datatype:"string",width:130},	
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:90},
			{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:80},
			//{columnname:"Route Code",dataname:"ROUTE_CODE",datatype:"string",width:90},
           	{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:120},
            {columnname:"Item Weight(ton)",dataname:"WEIGHT",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
		{columnname:"Actual Weight(ton)",dataname:"ACT_WEIGHT",datatype:"string",width:130,colAlign:'right',weightPrecision:3},

            {columnname:"Item Volume (cu.m)",dataname:"VOLUME",datatype:"string",width:130,colAlign:'right',weightPrecision:3},
            {columnname:"Utilization %",dataname:"UTILIZATION",datatype:"string",width:80,colAlign:'right'},
			//{columnname:"Vehicle",dataname:"VEHICLE",datatype:"string",width:90},//Raj
                      {columnname:"Scheduled Vehicle",dataname:"VEHICLE",datatype:"string",width:110},//Raj
                      {columnname:"Reporting Vehicle",dataname:"REPOVEHICLE",datatype:"string",width:110},//Raj
                      {columnname:"Scheduled Driver",dataname:"SCHE_DRIVER_NAME",datatype:"string",width:110},//Raj
                     {columnname:"Reporting Driver",dataname:"REPORTING_DRIVER_NAME",datatype:"string",width:110},//Raj
                     {columnname:"Shipped Date",dataname:"SHIPPED_DATE",datatype:"string",width:80},
			{columnname:"Delivered Date",dataname:"ROS_DATE",datatype:"string",width:100},
			/*{columnname:"Customer",dataname:"CUST_CODE",datatype:"string",width:80},
			{columnname:"Logistics Group",dataname:"LOG_GROUP",datatype:"string",width:80},
			{columnname:"Division",dataname:"DIVISION",datatype:"string",width:80},*/
			{columnname:"Distance (km)",dataname:"DISTANCE",datatype:"string",width:100},
			
		
			{columnname:"Scheduled Date",dataname:"SCHD_DATE",datatype:"string",width:100},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:100},
			{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:100,hidden:true},
			{columnname:"Inspection No",dataname:"INSPECTION_NO",datatype:"string",width:100,hidden:true},
			{columnname:"Created Date",dataname:"CREATED_DATE",datatype:"string",width:100,hidden:true},
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:100,hidden:true},
		    {columnname:"Load Description",dataname:"LOAD_DESC",datatype:"string",width:120},  // 73364
			{columnname:"Loading Point",dataname:"PICK_AT",datatype:"string",width:100/*,hidden:true*/}, // 73364

			{columnname:"Unloading Point",dataname:"DELV_AT",datatype:"string",width:100/*,hidden:true*/} // 73364
			
		]
		loadListSummaryGridDetail=
		{
			title:"",
			id:"LoadHelpGrid",
			detail:loadListSummaryObj,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true,
			//readonly:true,
			"rowHighlight":true,
			selRowProcess:"Y"
			
		}
		loadListSummaryGridSection = plf.addGrid(loadListSummaryGridDetail,this)	
		
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
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initPodLoadLevelSumTS"// initLoadBasedSearchTS
			},			
			{					
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strLoadNoFrom","strStatus","dtLoadDateFrom","dtLoadDateTo","strOrigin","strDestination","strRequestNo",
				"strShippmentNo","strJourneyPlanNo","strCommodity","strVehicleCategory","strDateType","strRegNo","strFromRegion","strToRegion",
				"strUtilFrom","strUtilTo","strDocNo","strPONum",/*,"LoadHelpGrid","strCustomerCode"*/"strLoadPt","strDelvAt","strLoadDescription"], 
				"service":"TMSCoreTransportTS", 
				"methodName":"PodLoadLevelSearchTS"// initLoadBasedSearchScrTS
			},
			{
				"grideventid":"PrintWaybill",
				"tasktype":"gridonprint",
				"input":["strLoadNo"],
				"service":"CoreReportService",
				"methodName":"PrintwaybillloadingReport"
			}
			];
			
		mainpage.hlpLinks=
		   {
			}
		
		mainpage.screenLinks=
		   {
			"loadnolink":
				{
					"dest":"ProofOfDelivery.ProofofDeliveryLoadLevel",
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
