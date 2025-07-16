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
Ext.define('CueTrans.view.ProofOfDelivery.PODLoadBuildingHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		mainpage.screenName = "Help on Load Building";		
		
		//Truck Master Section starts

		var formCtrl=[];
		plf.columns=3
		var loadListSummaryColumn = plf.addColumnSection({collapsed: false});
		
		
		var loadListSummaryFormCtrl=
		[
			
			/*plf.addText({"label":"Load No",id:"strLoadNoFrom","anywhereSearch":"true"}),
			plf.addCombo({"label":"Status","id":"strStatus"}),
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addDate({"label":"Date From","id":"dtLoadDateFrom"}),
			plf.addDate({"label":"Date To","id":"dtLoadDateTo"}),			
			plf.addText({"label":"Origin",id:"strOrigin"}),
			plf.addText({"label":"Destination","id":"strDestination"}),
            plf.addText({"label":"Ref Doc No",id:"strDocNo","anywhereSearch":"true"}),			
			plf.addButton({"label":"Search","id":"btnSearch","tooltip":"Click here to search."})*/
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
			
			plf.addDate({"label":"Date From","id":"dtLoadDateFrom"}),
			plf.addDate({"label":"Date To","id":"dtLoadDateTo"}),
			plf.addText({"label":"Registration No",id:"strRegNo"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination","id":"strDestination"}),
			plf.addCombo({"label":"From Region",id:"strFromRegion"}),
			plf.addCombo({"label":"To Region",id:"strToRegion"}),
			//plf.addText({"label":"Utilization % From",id:"strUtilFrom"}),
			//plf.addText({"label":"Utilization % To",id:"strUtilTo"}),
			plf.addText({"label":"Ref Doc No",id:"strDocNo","anywhereSearch":"true"}),
			plf.addText({"label":"Load Description",id:"strLoadDescription"}),
			plf.addText({"label":"PO No",id:"strPONum","anywhereSearch":"true"}),
			plf.addCombo({"label":"Status","id":"strStatus",hidden:true}),
			plf.addButton({"label":"Search","id":"btnSearch","tooltip":"Click here to search."})
			
			
		]
		
		loadListSummaryColumn.add(loadListSummaryFormCtrl);
		
		
		var loadListSummaryObj=
		[
			
			/*{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:200},
			{columnname:"Departure Date",dataname:"LOAD_DATE",datatype:"string",width:100},			
			{columnname:"Origin",dataname:"FROM_LOCATION",datatype:"string",width:150},
			{columnname:"Destination",dataname:"TO_LOCATION",datatype:"string",width:150},			
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:150},	
            {columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:80},			
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100},
			{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:100},               
			{columnname:"Inspection No",dataname:"INSPECTION_NO",datatype:"string",width:100},   
			{columnname:"Loading Point",dataname:"PICK_AT",datatype:"string",width:100},             
			{columnname:"Unloading Point",dataname:"DELV_AT",datatype:"string",width:100},
			{columnname:"Actual weight(ton)",dataname:"WEIGHT",datatype:"string",width:100},
			{columnname:"Load Description",dataname:"LOAD_DESC",datatype:"string",width:100},
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:100}   */
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:100},
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
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:120},
            {columnname:"Item Weight(ton)",dataname:"WEIGHT",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
		   {columnname:"Actual Weight(ton)",dataname:"ACT_WEIGHT",datatype:"string",width:130,colAlign:'right',weightPrecision:3},
           {columnname:"Item Volume (cu.m)",dataname:"VOLUME",datatype:"string",width:130,colAlign:'right',weightPrecision:3},
            {columnname:"Utilization %",dataname:"UTILIZATION",datatype:"string",width:80,colAlign:'right'},
			{columnname:"Scheduled Vehicle",dataname:"VEHICLE",datatype:"string",width:110},
            {columnname:"Reporting Vehicle",dataname:"REPOVEHICLE",datatype:"string",width:110},
            {columnname:"Scheduled Driver",dataname:"SCHE_DRIVER_NAME",datatype:"string",width:110},
            {columnname:"Reporting Driver",dataname:"REPORTING_DRIVER_NAME",datatype:"string",width:110},
            {columnname:"Shipped Date",dataname:"SHIPPED_DATE",datatype:"string",width:80},
			{columnname:"Delivered Date",dataname:"ROS_DATE",datatype:"string",width:100},
			{columnname:"Distance (km)",dataname:"DISTANCE",datatype:"string",width:100},
			{columnname:"Scheduled Date",dataname:"SCHD_DATE",datatype:"string",width:100},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:100},
			{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:100,hidden:true},
			{columnname:"Inspection No",dataname:"INSPECTION_NO",datatype:"string",width:100,hidden:true},
			{columnname:"Created Date",dataname:"CREATED_DATE",datatype:"string",width:100,hidden:true},
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:100,hidden:true},
		    {columnname:"Load Description",dataname:"LOAD_DESC",datatype:"string",width:120}, 
			{columnname:"Loading Point",dataname:"PICK_AT",datatype:"string",width:100/*,hidden:true*/}, 

			{columnname:"Unloading Point",dataname:"DELV_AT",datatype:"string",width:100/*,hidden:true*/} 
			
		]
		loadListSummaryGridDetail=
		{
			title:"",
			id:"LoadHelpGrid",
			detail:loadListSummaryObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
			
		}
		loadListSummaryGridSection = plf.addGrid(loadListSummaryGridDetail,this)	
		mainpage.hlpSearchGridPtr = loadListSummaryGridSection
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(loadListSummaryColumn)
		mainpage.ptrMainSection.add(loadListSummaryGridSection) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		
			mainpage.eventHandlers = 
			[	
{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initPodLoadLevelSumTS"// initPODLoadLevelTS
			},			
				/*{					
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strLoadNoFrom","strStatus","strDateType","dtLoadDateFrom","dtLoadDateTo","strOrigin","strDestination"],
					"service":"TMSCoreTransportTS",
					"methodName":"fetchPODLoadLevelHelpTS"
					}	*/
			{					
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strLoadNoFrom","strStatus","dtLoadDateFrom","dtLoadDateTo","strOrigin","strDestination","strRequestNo",
				"strShippmentNo","strJourneyPlanNo","strCommodity","strVehicleCategory","strDateType","strRegNo","strFromRegion","strToRegion",
				"strUtilFrom","strUtilTo","strDocNo","strLoadDescription","strPONum"/*,"LoadHelpGrid","strCustomerCode"*/], 
				"service":"TMSCoreTransportTS", 
				"methodName":"PodLoadLevelSearchTS"// initLoadBasedSearchScrTS
			}
			];
			mainpage.hlpLinks=
		{			

					
		}		
		
	
		
		this.callParent(arguments);
		
	
	}
});
