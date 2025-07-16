Ext.define('CueTrans.view.tms.ShipmentSummary', 
/****************************************************************************************************************
                                          Modification History                                                                                                                                                                                
****************************************************************************************************************               

Description           :                                                                                                                      
Author                :  CUETRANS
Version               :  1.0.6

****************************************************************************************************************               
Version              Modified By      Date               Defect ID                 Remarks            
****************************************************************************************************************               
1.0.01          P.shekar              04-02-2016         69945                    Ref Doc No
1.0.2	 		Manibharathi		  05/02/2016         69997                    Addition of var
1.0.3           Vidhya P              25/04/2016         72070
1.0.4           Mohammed Razhith.S.A  19/05/2016         72423                    Ros_Date
1.0.5           P.shekar              18/07/2016         73364                   Loading Point, Unload Point  and Load description 
1.0.6           Gokilapriya.R         24/08/2016         73995                   Quantity Alignment
1.0.8            Vidhya            06/06/2017            79507         Added PO number and Vendor Name
****************************************************************************************************************/
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Shipment Summary";
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			//{"name":"Create Shipment","linkid":"tms_shippment"},
			//{"name":"Shipment Split/Unsplit","linkid":"tms_shipsplit"}
			//{"name":"Shipment Item Confirmation","linkid":"tms_shipItemConf"}
		]		
		
		//Truck Master Section starts

		var formCtrl=[];
		plf.columns=4
		var customerContractSummaryColumn = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
		
		
		var customerContractSummaryFormCtrl=
		[
			plf.addText({"label":"Shipment No",id:"strShippmentNoFrom","anywhereSearch":"true"}),
			plf.addText({"label":"Request No",id:"strRequestNo","anywhereSearch":"true"}),
			plf.addText({"label":"Load No",id:"strLoadNo"}),							
			plf.addCombo({"label":"Status","id":"strStatus"}),	
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"customercode"},this),		
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addDateTime({"label":"Date From",dateid:"dtShippmentDateFrom",timeid:"dtShippmentTimeFrom"}),
			plf.addDateTime({"label":"Date To",dateid:"dtShippmentDateTo",timeid:"dtShippmentTimeTo"}),
			plf.addCombo({"label":"Demand Status",id:"strDemandStatus"}),			
			plf.addCombo({"label":"Origin","id":"strOrigin"}),
			plf.addComboWithoutStore({"label":"Destination",id:"strDestination",storeId:"strOrigin"}),
			//plf.addCombo({"label":"Destination","id":"strDestination"}),
			plf.addCombo({"label":"Priority",id:"strPriority"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity"}),				
			plf.addHlpText({"label":"Cost Center Code",id:"strCostCenterCode",hlpLinkID:"CostCenter"},this),	
			plf.addCombo({"label":"Change Delivery Date",id:"strDelDtChgd"}),
			plf.addText({"label":"Ref Doc No",id:"strDocNo","anywhereSearch":"true"}),
			////***********79507 -Vidhya Added 6 Jun 2017*******************//
			plf.addText({"label":"PO No",id:"strPONum"}),
			plf.addCombo({"label":"Vendor Name",id:"strVendorName"}),			//  Bug 67607  added by shekar 
			//plf.addBlank(),
			//plf.addButton({"label":"Search","id":"btnSearch","tooltip":"Click here to search."}),
            plf.addText({"label":"Rig ID",id:"strSapRigId"}),
			plf.addText({"label":"Well ID",id:"strWellID"}),
			plf.addText({"label":"Well Name",id:"strWellName"}),
			plf.addText({"label":"Call Out Number",id:"strCallout"})
		]
		
	 customerContractSummaryColumn.add(customerContractSummaryFormCtrl);
		
		var parentForm =this;
		var bulkConfirm=[
						plf.addButton({"label":"Bulk Confirm Shipment",id:"btnConfirmShip",tooltip:"Click here to confirm bulk shipment.",
						"handler": function() 
							{
								parentForm.queryById("methodName").setValue("bulkCargoShipConfirmTS");
								process_ebpack_service(parentForm,["custContGrid"],"TMSCoreTransportTS");																										
							}
						})
						];
		var customerContractSummaryObj=
		[

            		{columnname:"Click here to launch the change delivery date.",dataname:"CHANGE_SHIPMENT_NO",datatype:"string",width:130,linkId:"changeDelivery",imageURL:"resources/images/shared/calendar.gif"},
            		//{columnname:"Click here to launch the split itinerary.",dataname:"SPLIT_SHIPMENT_NO",datatype:"string",width:130,linkId:"splitItenary",imageURL:"resources/images/gridbar/append.png"},
            		{columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",width:120,linkId:"shipmentnolink",tooltip:"Click here to launch the shipment details screen."},
					{columnname:"Status",dataname:"STATUS",datatype:"string",width:100},
			//{columnname:"Shipment Date",dataname:"SHIPMENT_DATE",datatype:"string",width:100},
			{columnname:"Request No",dataname:"TRANS_REQ_NO",datatype:"string",width:120},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:120},
			//{columnname:"Request Date",dataname:"TARNS_REQ_DATE",datatype:"string",width:80},
			{columnname:"Pickup Date",dataname:"PICK_DATE",datatype:"string",width:120},
			{columnname:"Requestor ID",dataname:"REQUESTOR_ID",datatype:"string",width:80},
            		{columnname:"Requestor Name",dataname:"REQUESTOR_NAME",datatype:"string",width:100},
			{columnname:"Customer Code",dataname:"CUST_CODE",datatype:"string",width:100},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:80},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:80},			
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:80},			              
			{columnname:"Priority",dataname:"PRIORITY",datatype:"string",width:60},
			{columnname:"Delivery Date",dataname:"ROS_DATE_TIME",datatype:"string",width:80},
			{columnname:"Changed Delivery Date",dataname:"NEW_DEL_DATE",datatype:"string",width:140},
			{columnname:"Change Reason",dataname:"DELDATEREASON",datatype:"string",width:100},
			{columnname:"Shipped Date",dataname:"SHIPPED_DATE",datatype:"string",width:80},
			{columnname:"Delivered Date",dataname:"ROS_DATE",datatype:"string",width:100},
			{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:80},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:130},
			{columnname:"Weight(ton)",dataname:"TOT_WEIGHT",width:80,colAlign:'right',weightPrecision:3},
			{columnname:"Volume(cu.m)",dataname:"TOT_VOLUME",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Created Type",dataname:"CREATED_TYPE",datatype:"string",width:80},
			
			{columnname:"UOM",dataname:"UOM",datatype:"string",width:100},
			{columnname:"Quantity",dataname:"QUANTITY",width:100,inputFormat:"numeric",weightPrecision:2,colAlign:'right'},
			{columnname:"Loading Point",dataname:"LOAD_AT",datatype:"string",width:80},		// 3364            
			{columnname:"Unloading Point",dataname:"UNLOAD_AT",datatype:"string",width:60}, //73364 
			{columnname:"Load description",dataname:"LOAD_DESC",datatype:"string",width:80},
			
             ////***********79507 -Vidhya Added 6 Jun 2017*******************//
            {columnname:"PO No",dataname:"PO_NO",datatype:"string",width:100},
            {columnname:"Vendor Name",dataname:"VENDOR_NAME",datatype:"string",width:100},
            {columnname:"Rig ID",dataname:"SAP_RIG_NO",datatype:"string",width:100},//71735 changes
			{columnname:"Well ID",dataname:"WELL_ID",datatype:"string",width:100},
			{columnname:"Well Name",dataname:"WELL_NAME",datatype:"string",width:100},
			{columnname:"Call Out Number",dataname:"CALL_OUT",datatype:"string",width:120}			
			
			
		]
		customerContractSummaryGridDetail=
		{
			title:"",
			id:"custContGrid",
			detail:customerContractSummaryObj,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true,
			"rowHighlight":true,
			tool:bulkConfirm			
		}
		var customerContractSummaryGridSection = plf.addGrid(customerContractSummaryGridDetail,this)	
		/*
		plf.columns=3
		var bulkConfirm = plf.addColumnSection({title:""});
		var bulkConfirmCtrl=
		[	
			plf.addBlank({}),
			plf.addButton({"label":"Confirm Shipment",id:"btnConfirmShip",tooltip:"Click here to confirm shipment."})
				
		]
		bulkConfirm.add(bulkConfirmCtrl);
		*/
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(customerContractSummaryColumn)
		mainpage.ptrMainSection.add(customerContractSummaryGridSection) 
		//mainpage.ptrMainSection.add(bulkConfirm) 
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		
			mainpage.eventHandlers = 
			[
			 /*
			 {       
				"controlid":"btnConfirmShip",
				"tasktype":"btnclick",
				"input":["custContGrid"],
              	"service":"TMSCoreTransportTS",
				"methodName":"bulkCargoShipConfirmTS"				
			}, 
			*/
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strShippmentNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"initShippmentSummaryScrTS"
			},			
			{					
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strShippmentNoFrom","strStatus","dtShippmentDateFrom","dtShippmentDateTo","dtShippmentTimeFrom","dtShippmentTimeTo",
					"strDemandStatus","strOrigin","strDestination","strPriority","strCustomerCode","strRequestNo","strDelDtChgd","strCommodity",
					"strCostCenterCode","strDateType","strDocNo","strLoadNo","strPONum","strVendorName","strSapRigId","strWellID","strWellName","strCallout"],
					"service":"TMSCoreTransportTS",
					"methodName":"initShippmentSummarySearchScrTS"
			}	
			];
			mainpage.hlpLinks=
		{			
				"customercode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CustomerHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"CUST_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strCustomerCode","child":"CUST_CODE"},
							
							]
				},
				"CostCenter":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CostCenterHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"COST_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strCostCenterCode","child":"COST_CENTER_CODE"}							
							]
				}
					
		}		
		
		mainpage.screenLinks=
		{
				
				"shipmentnolink":
				{
					"dest":"tms.ShipmentSplit",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"SHIPMENT_NO","dest":"strShippmentNo"},
							{"src":"TRANS_REQ_NO","dest":"strRequestNo"}
							]
				},
					
				
				/*"tms_shippment":
				{
					"dest":"tms.ShipmentSplit",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},*/
				/*"tms_shipItemConf":
				{
					"dest":"tms.ShipmentItemConfirmation",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},*/
                 		 "changeDelivery":
				{
					"dest":"tms.ChangeDeliveryDate",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"SHIPMENT_NO","dest":"strShippmentNo"}
						

							]
				},
                             "splitItenary":
				{
					"dest":"tms.SplitItenary",
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
