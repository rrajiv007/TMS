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
Ext.define('CueTrans.view.tms.LoadBuildingTonnageSummaryHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		mainpage.screenName = "Waybill Tonnage Help";
		//mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
		  ////{"name":"Create Load","linkid":"tms_CreateLoadBuilding","tooltip":"Click here to create a new load."},
		  //{"name":"Bulk Load Allocation via Excel","linkid":"tms_BulkAllocLoadUpload","tooltip":"Click here for excel based load allocation."},
		  ////{"name":"Bulk Load Creation via Excel","linkid":"tms_BulkLoadUpload","tooltip":"Click here for excel based load creation."},
		//{"name":"Load Closure via MS Excel","linkid":"tms_BulkLoadClosureUpload","tooltip":"Click here for excel based load closure upload."}
         //// {"name":"Bulk Closure","linkid":"tms_BulkClosure","tooltip":"Click here for bulk closure."}
          //{"name":"Update Actual Weight","linkid":"tms_updactual","tooltip":"Click here to update actual weight."}
		 // {"name":"Bulk Load Updation via Excel","linkid":"tms_BulkLoadUploadUpdation","tooltip":"Click here for excel based load updation."},
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
				
			plf.addHidden({"label":"Commodity","id":"strCommodity"}),
			
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addDate({"label":"Date From","id":"dtLoadDateFrom"}),
			plf.addDate({"label":"Date To","id":"dtLoadDateTo"}),
			//plf.addHidden({"label":"Registration No",id:"strRegNo"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addComboWithoutStore({"label":"Destination",id:"strDestination",storeId:"strOrigin"}),
			plf.addCombo({"label":"Loading Point",id:"strLoadPt"}), //new dd
			plf.addCombo({"label":"Unloading Point",id:"strDelvAt"}), //new dd
                        plf.addCombo({"label":"Vehicle Category","id":"strVehicleCategory"}),
			plf.addText({"label":"Scheduled Vehicle ",id:"strRegNo"}),//new dd
			plf.addText({"label":"Reporting Vehicle",id:"strRepVehicle"}),//new dd
			  plf.addText({"label":"Driver Code",id:"strDriverCode"}),//new dd
                        plf.addHlpText({"label":"Journey Plan No",id:"strJourneyPlanNo",hlpLinkID:"journeyno"},this),
			
			//plf.addCombo({"label":"Destination","id":"strDestination"}),
			//dd plf.addCombo({"label":"From Region",id:"strFromRegion"}),
			//dd plf.addCombo({"label":"To Region",id:"strToRegion"}),
			//dd plf.addText({"label":"Utilization % From",id:"strUtilFrom"}),
			//dd plf.addText({"label":"Utilization % To",id:"strUtilTo"}),
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
			//{columnname:"Print WayBill",dataname:"WAYBILL",datatype:"string",width:130,gridReport:"PrintWaybill",imageURL:"resources/images/shared/calendar.gif",tooltip:"Click here to print waybill."},
			//{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:80,linkId:"loadnolink",tooltip:"Click here to launch the load screen."},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:200},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:130},
			/*{columnname:"Departure Date",dataname:"LOAD_DATE",datatype:"string",width:100},*/
			{columnname:"Load No",dataname:"strLoadNo",datatype:"string",width:130,hidden:true},
			{columnname:"Load Departure Date",dataname:"LOAD_DATE",datatype:"string",width:130},
			{columnname:"Contractual Delivery Date",dataname:"DELV_DATE",datatype:"string",width:150},
			{columnname:"Scheduled Date",dataname:"SCHD_DATE",datatype:"string",width:100},
			{columnname:"Delivered Date",dataname:"ROS_DATE",datatype:"string",width:100},
		    {columnname:"Load Description",dataname:"LOAD_DESC",datatype:"string",width:120},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:90},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:100},
			{columnname:"Origin",dataname:"FROM_LOCATION",datatype:"string",width:90},
			{columnname:"Destination",dataname:"TO_LOCATION",datatype:"string",width:90},
			{columnname:"Loading Point",dataname:"PICK_AT",datatype:"string",width:100/*,hidden:true*/}, // 73364
			{columnname:"Unloading Point",dataname:"DELV_AT",datatype:"string",width:100/*,hidden:true*/}, // 73364
			{columnname:"Item Weight(ton)",dataname:"WEIGHT",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
		    {columnname:"Actual Weight(ton)",dataname:"ACT_WEIGHT",datatype:"string",width:130,colAlign:'right',weightPrecision:3},
			{columnname:"Actual Weight Remarks",dataname:"ACT_WEIGHT_REMARK",datatype:"string",width:140}, //new dd
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:120},
            {columnname:"Scheduled Vehicle",dataname:"VEHICLE",datatype:"string",width:110},//Raj
            {columnname:"Reporting Vehicle",dataname:"REPOVEHICLE",datatype:"string",width:110},//Raj
			{columnname:"Driver Code",dataname:"REPORTING_DRIVER_CODE",datatype:"string",width:110}, //new dd
			{columnname:"Driver name",dataname:"REPORTING_DRIVER_NAME",datatype:"string",width:110},	//new dd	  
			{columnname:"Driver Contact",dataname:"REPORTING_DRIVER_CONT",datatype:"string",width:110},	  //new dd
			{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:100,hidden:true},
			{columnname:"Load Distance (km)",dataname:"DISTANCE",datatype:"string",width:100},
			{columnname:"Journey Distance (km)",dataname:"JP_DIST",datatype:"string",width:100}, //new dd
			{columnname:"Shipment Number",dataname:"SHIPMENT_LIST",datatype:"string",width:140},
            {columnname:"Request Number",dataname:"REQUEST_LIST",datatype:"string",width:140},
			{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:80},
           //dd {columnname:"Route",dataname:"ROUTE_CODE",datatype:"string",width:90},
						
			//dd {columnname:"Expected Arrival Time",dataname:"EXP_ARRIVAL_TIME",datatype:"string",width:130},	
		
			
			//{columnname:"Route Code",dataname:"ROUTE_CODE",datatype:"string",width:90},
           	
           //dd {columnname:"Item Volume (cu.m)",dataname:"VOLUME",datatype:"string",width:130,colAlign:'right',weightPrecision:3},
          //dd  {columnname:"Utilization %",dataname:"UTILIZATION",datatype:"string",width:80,colAlign:'right'},
			//{columnname:"Vehicle",dataname:"VEHICLE",datatype:"string",width:90},//Raj
                   
                 // dd    {columnname:"Scheduled Driver",dataname:"SCHE_DRIVER_NAME",datatype:"string",width:110},//Raj
                 // dd   {columnname:"Reporting Driver",dataname:"REPORTING_DRIVER_NAME",datatype:"string",width:110},//Raj
                  //dd   {columnname:"Shipped Date",dataname:"SHIPPED_DATE",datatype:"string",width:80},
			
			/*{columnname:"Customer",dataname:"CUST_CODE",datatype:"string",width:80},
			{columnname:"Logistics Group",dataname:"LOG_GROUP",datatype:"string",width:80},
			{columnname:"Division",dataname:"DIVISION",datatype:"string",width:80},*/
			
		
			{columnname:"Inspection No",dataname:"INSPECTION_NO",datatype:"string",width:100,hidden:true},
			{columnname:"Created Date",dataname:"CREATED_DATE",datatype:"string",width:100,hidden:true},
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:100,hidden:true},
	  // 73364
		
			
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
			//tool:printLoadCode
			
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
				"methodName":"initLoadBasedWbTonnageSearchTS"
			},			
			{					
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strLoadNoFrom","strStatus","dtLoadDateFrom","dtLoadDateTo","strOrigin","strDestination","strRequestNo",
				"strShippmentNo","strJourneyPlanNo","strCommodity","strVehicleCategory","strDateType","strRegNo","strFromRegion","strToRegion",
				"strUtilFrom","strUtilTo","strDocNo","strLoadPt","strDelvAt","strDriverCode","strRepVehicle"/*,"LoadHelpGrid","strCustomerCode"*/], 
				"service":"TMSCoreTransportTS", 
				"methodName":"initLoadBasedWbTonSearchScrTS"
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
					"dest":"tms.LoadBuildingTonnage",
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
			"tms_BulkLoadUploadUpdation":
				{
					"dest":"tms.LoadWbTonExcelUpload",
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

//# sourceURL=https://pdo.cuetrans.com/CueTrans/app/view/tms/LoadBuildingSummary.js