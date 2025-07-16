/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.5															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.2	    Raj             04/2/2016     67607                 Update for Ref doc no.		 
1.0.3	   Manibharathi		05/02/2016    69997                         Addition of var     
1.0.4      Vidhya P         25/04/2016    72070                                  
1.0.5      P.shekar         18/07/2016    73364                   Loading Point, Unload Point  and Load description 
1.0.6      D.Divya          04/05/2017    78682                    Print Load 
************************************************************************************************/
Ext.define('CueTrans.view.tms.LoadBuildingSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Load Summary";
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
		  {"name":"Create Load","linkid":"tms_CreateLoadBuilding","tooltip":"Click here to create a new load."},
		  //{"name":"Bulk Load Allocation via Excel","linkid":"tms_BulkAllocLoadUpload","tooltip":"Click here for excel based load allocation."},
		  {"name":"Bulk Load Creation via Excel","linkid":"tms_BulkLoadUpload","tooltip":"Click here for excel based load creation."},
		//{"name":"Load Closure via MS Excel","linkid":"tms_BulkLoadClosureUpload","tooltip":"Click here for excel based load closure upload."}
          {"name":"Bulk Closure","linkid":"tms_BulkClosure","tooltip":"Click here for bulk closure."}
          //{"name":"Update Actual Weight","linkid":"tms_updactual","tooltip":"Click here to update actual weight."}
        ]	
		
		
		
		//Truck Master Section starts

		var formCtrl=[];
		plf.columns=4
		var loadListSummaryColumn = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
		
		
		var loadListSummaryFormCtrl=
		[
			plf.addText({"label":"Load No",id:"strLoadNoFrom","anywhereSearch":"true"}),
			plf.addHlpText({"label":"Request No",id:"strRequestNo",hlpLinkID:"transreqno"},this),	
			plf.addHlpText({"label":"Shipment No",id:"strShippmentNo",hlpLinkID:"shipmentno"},this),	
			plf.addCombo({"label":"Status","id":"strStatus"}),
			plf.addHlpText({"label":"Journey Plan No",id:"strJourneyPlanNo",hlpLinkID:"journeyno"},this),	
			plf.addCombo({"label":"Commodity","id":"strCommodity"}),
			plf.addCombo({"label":"Vehicle Category","id":"strVehicleCategory"}),
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addDate({"label":"Date From","id":"dtLoadDateFrom"}),
			plf.addDate({"label":"Date To","id":"dtLoadDateTo"}),
			plf.addText({"label":"Registration No",id:"strRegNo"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addComboWithoutStore({"label":"Destination",id:"strDestination",storeId:"strOrigin"}),
			//plf.addCombo({"label":"Destination","id":"strDestination"}),
			plf.addCombo({"label":"From Region",id:"strFromRegion"}),
			plf.addCombo({"label":"To Region",id:"strToRegion"}),
			plf.addText({"label":"Utilization % From",id:"strUtilFrom"}),
			plf.addText({"label":"Utilization % To",id:"strUtilTo"}),
			plf.addText({"label":"Ref Doc No",id:"strDocNo","anywhereSearch":"true"})// Added By Raj  for ref doc 67607
			//plf.addButton({"label":"Search","id":"btnSearch","tooltip":"Click here to search."})
			// Added by Subbu on 23June against Bug ID: 884
			//plf.addListEdit({"label":"Customer Name",id:"strCustomerName",keyField:"strCustomerCode"},this),
			//plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"customerlink"},this),	
			/*
			plf.addText({"label":"Customer Code",id:"strCustomerCode"}),
			plf.addCombo({"label":"Logistics Group",id:"strLogGroup"}),
			plf.addCombo({"label":"Division",id:"strDivCode"}),
			plf.addText({"label":"Item Code",id:"strItemNo"}),
			plf.addText({"label":"Operation A/C No",id:"strOperAccNo"}),
			plf.addText({"label":"Ref Doc No",id:"strDocNo","anywhereSearch":"true"})
			*/
			// Added by Subbu on 23June against Bug ID: 884
		]
		
		loadListSummaryColumn.add(loadListSummaryFormCtrl);
		
				//load List Header Section Ends
		/* added by divya -78682 */
		var parentForm =this;
		var printLoadCode=[
						plf.addButton({"label":"Print Load",id:"btnLoadCode",tooltip:"Click here to Print Load.",
						"handler": function() 
							{
								parentForm.queryById("methodName").setValue("PrintwaybillloadReport");
								process_ebpack_service(parentForm,["LoadHelpGrid"],"CoreReportService");																										
							}
						})
						];
						
			/* 78682  end */		
			
		var loadListSummaryObj=
		[   
			{columnname:"Print WayBill",dataname:"WAYBILL",datatype:"string",width:130,gridReport:"PrintWaybill",imageURL:"resources/images/shared/calendar.gif",tooltip:"Click here to print waybill."},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:100,linkId:"loadnolink",tooltip:"Click here to launch the load screen."},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:80},
			/*{columnname:"Departure Date",dataname:"LOAD_DATE",datatype:"string",width:100},*/
			{columnname:"Load No",dataname:"strLoadNo",datatype:"string",width:130,hidden:true},
			{columnname:"Shipment Pickup Date",dataname:"LOAD_DATE",datatype:"string",width:130},
			{columnname:"Contractual Delivery Date",dataname:"DELV_DATE",datatype:"string",width:150},
			//{columnname:"Shipment Number",dataname:"SHIPMENT_LIST",datatype:"string",width:140},
            {columnname:"Request Number",dataname:"REQUEST_LIST",datatype:"string",width:140},
           // {columnname:"Route",dataname:"ROUTE_CODE",datatype:"string",width:90},
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
			selRowProcess:"Y",
			tool:printLoadCode
			
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
				"methodName":"initLoadBasedSearchTS"
			},			
			{					
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strLoadNoFrom","strStatus","dtLoadDateFrom","dtLoadDateTo","strOrigin","strDestination","strRequestNo",
				"strShippmentNo","strJourneyPlanNo","strCommodity","strVehicleCategory","strDateType","strRegNo","strFromRegion","strToRegion",
				"strUtilFrom","strUtilTo","strDocNo"/*,"LoadHelpGrid","strCustomerCode"*/], 
				"service":"TMSCoreTransportTS", 
				"methodName":"initLoadBasedSearchScrTS"
			},
			/*,
			{
				"controlid":"strCustomerCode",
				"tasktype":"onenter",
				"input":["strCustomerCode"],
				"service":"TMSCoreTransportTS",
				"methodName":"onenterCustomerCodeTS"
			},*/
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
			"transreqno":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.TransRequestItemHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRequestNo","child":"TRANS_REQ_NO"}
							]
				},
			"shipmentno":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.ShipmentHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strShippmentNo","child":"SHIPMENT_NO"}
							]
				},
            "journeyno":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.JourneyPlanHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strJourneyPlanNo","child":"JOURNEY_PLAN_NO"}
							]
				},
				"customerlink":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CustomerHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"CUST_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strCustomerCode","child":"CUST_CODE"}
							]
				}
		     }
		
		mainpage.screenLinks=
		   {
			"loadnolink":
				{
					"dest":"tms.LoadBuilding",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"LOAD_NO","dest":"strLoadNo"}
							]
				},
			"tms_CreateLoadBuilding":
				{
					"dest":"tms.LoadBuilding",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
			"tms_BulkLoadUpload":
				{
					"dest":"tms.LoadExcelUpload",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
			"tms_BulkAllocLoadUpload":
			{
					"dest":"tms.LoadAllocExcelUpload",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
            "tms_BulkLoadClosureUpload":
			   {
					"dest":"tms.LoadClosureExcelUpload",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
			"tms_BulkClosure":
			    {
					"dest":"tms.BulkClosure",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
			  "tms_updactual":	
				{
					"dest":"tms.LoadUpdActWeight",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},			
			"PrintWaybill":
				{
					"dest":"tms.ChangeDeliveryDate",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"SHIPMENT_NO","dest":"strShippmentNo"}
						

							]
				}
				
				
		    }
		this.callParent(arguments);
		
	
	}
});
