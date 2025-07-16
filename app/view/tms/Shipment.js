/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var     		                                   
************************************************************************************************/
Ext.define('CueTrans.view.tms.Shipment', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Shipment";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Refresh","Create","Edit","Delete","Authorise","Shortclose"]
		
		//Add Keyfields
		mainpage.keyFields=["strTransporReqNo"]
		//Driver Master Section Begins
		plf.columns=4
		var ItemBasedColumn1 = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var ItemBasedCtrl1=
			[	
			    plf.addHlpText({"label":"Shipment No",id:"strShippmentNo",hlpLinkID:"shipmentno"},this),	
				plf.addDate({"label":"Shipment Date",id:"dtShippmentDate"}),
				plf.addHlpText({"label":"Request No",id:"strRequestNo","mandatory":"true",hlpLinkID:"transrequestno"},this),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
				plf.addDisplayOnly({"label":"Reference Doc No",id:"strDocNo"}),
				plf.addDisplayOnly({"label":"Demand status",id:"strDemandStatus"}),
				
				plf.addDisplayOnly({"label":"Priority",id:"strPriority"}),
				plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"}),
				plf.addDisplayOnly({"label":"Weight Uom",id:"strWeightUom"}),
				plf.addDisplayOnly({"label":"Volume Uom",id:"strVolumeUom"}),
				plf.addDisplayOnly({"label":"Created type",id:"strCreatedType"}),

				plf.addHidden({id:"strRequestNoHid"})
								

			]
		
		}
		
	
		ItemBasedColumn1.add(ItemBasedCtrl1); 
		
		var ItemBasedColumn2 = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			var ItemBasedCtrl2=
			[	
			    plf.addDisplayOnly({"label":"Customer Code",id:"strCustomerCode"}),	
				plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
				plf.addDisplayOnly({"label":"Contract Type",id:"strContractType"}),
				plf.addDisplayOnly({"label":"Contract No",id:"strContractNo"}),
				
				plf.addDisplayOnly({"label":"Pickup Date",id:"dtPickUpDateTimeFrom"}),
				plf.addDisplayOnly({"label":"Pickup Time",id:"tmPickUpTime"}),
				plf.addDisplayOnly({"label":"Delivery Date",id:"dtROSDateTimeFrom"}),
				plf.addDisplayOnly({"label":"Delivery Time",id:"tmROSTime"})
				//plf.addDisplayOnly({"label":"Pickup Date Time To",id:"dtPickUpDateTimeTo"}),
				//plf.addDisplayOnly({"label":"ROS Date Time To",id:"dtROSDateTimeTo"})
			]
		
		}
		

		
		ItemBasedColumn2.add(ItemBasedCtrl2);
		
		
		
		
		
		
		
//Plan Details Section Begins
		plf.columns=4
		
		var materialDetailsPlan = plf.addFieldSet({title:""})
		//materialDetailsPlan = plf.addColumnSection({title:""});
		var MaterialDetailsGridFieldObj1=
		[   
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",width:80},
			{columnname:"Item Description",dataname:"ITEM_DESC",datatype:"string",width:250},
			{columnname:"Quantity",dataname:"ITEM_QTY",datatype:"string",width:80},
			{columnname:"Uom",dataname:"ITEM_QTY_UOM",datatype:"string",width:80},
			{columnname:"Remaining Qty",dataname:"REMAINING_QTY",datatype:"string",width:120},
			{columnname:"Shipment Qty",dataname:"SHIPMENT_QTY",datatype:"string",width:120,editControl:"textbox"},
			{columnname:"Weight",dataname:"WEIGHT",datatype:"string",width:80},
			{columnname:"Volume",dataname:"VOLUME",datatype:"string",width:80},
			{columnname:"Line_no",dataname:"LINE_NO",datatype:"string",width:80,hidden:true}
			
		]
		MaterialDetailsGridDtl1=
		{
			title:"Item Details",
			id:"itemdetailsGrid",
			detail:MaterialDetailsGridFieldObj1,
			removeAddDelete:true
		
		}
		//MaterialDetailsGridSection1 = plf.addGrid(MaterialDetailsGridDtl1)
		//Plan Details  Section Ends
		

		//Plan Details Section Begins
		plf.columns=4
		//mappedShipmentDetails = plf.addColumnSection({title:""});
		var unmappedShipmentsFormCtrl=
		[
			plf.addDisplayOnly({"label":"Cost Center Code",id:"strCostCenterCode"}),
			plf.addDisplayOnly({"label":"Cost Center Name",id:"strCostCenterName"}),
			plf.addDisplayOnly({"label":"Cost Object Type",id:"strCostObjType"}),
			plf.addDisplayOnly({"label":"Operation Account No",id:"strOperAccNo"})
			
		]
		
		plf.columns=4
		//mappedShipmentDetails = plf.addColumnSection({title:""});
		var TotalFormCtrl=
		[
			plf.addBlank(),
			plf.addBlank(),
			plf.addDisplayOnly({"label":"Total Weight",id:"iTotalWeightt"}),
			plf.addDisplayOnly({"label":"Total Volume",id:"iTotalVolume"})
			
		]
		//mappedShipmentDetails.add(unmappedShipmentsFormCtrl);
		//Plan Details  Section Ends
		
		var UnmappedGridSection = plf.addGrid(MaterialDetailsGridDtl1,this)	
		materialDetailsPlan.add(UnmappedGridSection);
		materialDetailsPlan.add(TotalFormCtrl);
		materialDetailsPlan.add(unmappedShipmentsFormCtrl);	
		
		//Adding Grid to Plan Details Ends	
	   //Plan Details Section Begins
		plf.columns=4
		
		var materialDetailsAct = plf.addFieldSet({title:""})
		//materialDetailsAct = plf.addColumnSection({title:""});
		var MaterialDetailsGridFieldObj1=
		[   
			{columnname:"Item Code",dataname:"",datatype:"string",editControl:"combo",width:140},
			{columnname:"Item Description",dataname:"",datatype:"string",editControl:"textbox",width:250},
			{columnname:"Quantity",dataname:"",datatype:"string",editControl:"textbox",width:200},
			{columnname:"Uom",dataname:"",datatype:"string",width:200,editControl:"textbox"},
			{columnname:"Package Type",dataname:"",storeId:"strTruckCategory",datatype:"string",width:200,editControl:"combo"},
			{columnname:"No Of Packets",dataname:"",datatype:"string",width:150,editControl:"textbox"},
			{columnname:"Total Weight",dataname:"",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Total Volume",dataname:"",datatype:"string",editControl:"textbox",width:150},
		]
		MaterialDetailsGridDtl1=
		{
			title:"Material Details(Actual)",
			id:"MaterialDetailsPlanMapping1",
			detail:MaterialDetailsGridFieldObj1,
		
		}
		//MaterialDetailsGridSection1 = plf.addGrid(MaterialDetailsGridDtl1)
		//Plan Details  Section Ends
		

		//Plan Details Section Begins
		plf.columns=4
		//mappedShipmentDetails = plf.addColumnSection({title:""});
		unmappedShipmentsFormCtrl=
		[
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addDisplayOnly({"label":"Total Weight",id:"iTotalWeightt"}),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addDisplayOnly({"label":"Total Volume",id:"iTotalVolume"}),
			
		]
		//mappedShipmentDetails.add(unmappedShipmentsFormCtrl);
		//Plan Details  Section Ends
		
		
		
		
		UnmappedGridSection = plf.addGrid(MaterialDetailsGridDtl1,this)	
		materialDetailsAct.add(UnmappedGridSection);
		materialDetailsAct.add(unmappedShipmentsFormCtrl);	
		
		//Adding Grid to Plan Details Ends	
		

		
		ItemBasedColumn3 = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			ItemBasedCtrl3=
			[	
			    plf.addHlpText({"label":"Cost Center Code",id:"strCostCenterCode","mandatory":"true",hlpLinkID:"customercode"},this),	
				plf.addDisplayOnly({"label":"Cost Center Name",id:"strCostCenterName"}),
				plf.addDisplayOnly({"label":"Cost Object Type",id:"strCostobjectType"}),
				plf.addDisplayOnly({"label":"Operation Account No",id:"strOperCodeNo"}),
			]
		
		}
		
		ItemBasedColumn3.add(ItemBasedCtrl3);
	
		//Add Child Sections
		
		mainpage.ptrMainSection.add(ItemBasedColumn1) 
		mainpage.ptrMainSection.add(ItemBasedColumn2)
		mainpage.ptrMainSection.add(materialDetailsPlan)
		//mainpage.ptrMainSection.add(materialDetailsAct)		
		//mainpage.ptrMainSection.add(MaterialDetailsGridSection1)	
		//mainpage.ptrMainSection.add(weightColumn1)
       	//mainpage.ptrMainSection.add(MaterialDetailsGridSection2)
        //mainpage.ptrMainSection.add(weightColumn2)
        //mainpage.ptrMainSection.add(MaterialDetailsGridSection3)
        //mainpage.ptrMainSection.add(ItemBasedColumn3)		
		   
		//History Data Section 
		mainpage.dataHistorySectionFlag=true;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strShippmentNo","dtShippmentDate","strRequestNo","strStatus","strOrigin","strDestination","strDocNo",
				"strDemandStatus","strPriority","strCommodity","strWeightUom","strVolumeUom","strCustomerCode","strCustomerName","strContractType","strContractNo","dtPickUpDateTimeFrom","dtROSDateTimeFrom","dtPickUpDateTimeTo","dtROSDateTimeTo","itemdetailsGrid","strCostCenterCode","strCostCenterName","iTotalWeightt","strCostObjType","strOperAccNo","iTotalVolume"],
				"service":"TMSCoreTransportTS",
				"methodName":"initShippmentNoSummaryScrTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strShippmentNo","dtShippmentDate","strRequestNo","strStatus","strOrigin","strDestination","strDocNo",
				"strDemandStatus","strPriority","strCommodity","strWeightUom","strVolumeUom","strCustomerCode","strCustomerName","strContractType","strContractNo","dtPickUpDateTimeFrom","dtROSDateTimeFrom","dtPickUpDateTimeTo","dtROSDateTimeTo","itemdetailsGrid","strCostCenterCode","strCostCenterName","iTotalWeightt","strCostObjType","strOperAccNo","iTotalVolume","strRequestNoHid"],
				"service":"TMSCoreTransportTS",
				"methodName":"createShippmentSummaryScrTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strShippmentNo","dtShippmentDate","strRequestNo","strStatus","strOrigin","strDestination","strDocNo",
				"strDemandStatus","strPriority","strCommodity","strWeightUom","strVolumeUom","strCustomerCode","strCustomerName","strContractType","strContractNo","dtPickUpDateTimeFrom","dtROSDateTimeFrom","dtPickUpDateTimeTo","dtROSDateTimeTo","itemdetailsGrid","strCostCenterCode","strCostCenterName","iTotalWeightt","strCostObjType","strOperAccNo","iTotalVolume"],
				"service":"TMSCoreTransportTS",
				"methodName":"editShippmentSummaryScrTS"
		},		
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Authorise",
				"input":["strShippmentNo","dtShippmentDate","strRequestNo","strStatus","strOrigin","strDestination","strDocNo",
				"strDemandStatus","strPriority","strCommodity","strWeightUom","strVolumeUom","strCustomerCode","strCustomerName","strContractType","strContractNo","dtPickUpDateTimeFrom","dtROSDateTimeFrom","dtPickUpDateTimeTo","dtROSDateTimeTo","itemdetailsGrid","strCostCenterCode","strCostCenterName","iTotalWeightt","strCostObjType","strOperAccNo","iTotalVolume"],
				"service":"TMSCoreTransportTS",
				"methodName":"authoriseShippmentSummaryScrTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strShippmentNo","dtShippmentDate","strRequestNo","strStatus","strOrigin","strDestination","strDocNo",
				"strDemandStatus","strPriority","strCommodity","strWeightUom","strVolumeUom","strCustomerCode","strCustomerName","strContractType","strContractNo","dtPickUpDateTimeFrom","dtROSDateTimeFrom","dtPickUpDateTimeTo","dtROSDateTimeTo","itemdetailsGrid","strCostCenterCode","strCostCenterName","iTotalWeightt","strCostObjType","strOperAccNo","iTotalVolume"],
				"service":"TMSCoreTransportTS",
				"methodName":"deleteShippmentSummaryScrTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Shortclose",
				"input":["strShippmentNo","dtShippmentDate","strRequestNo","strStatus","strOrigin","strDestination","strDocNo",
				"strDemandStatus","strPriority","strCommodity","strWeightUom","strVolumeUom","strCustomerCode","strCustomerName","strContractType","strContractNo","dtPickUpDateTimeFrom","dtROSDateTimeFrom","dtPickUpDateTimeTo","dtROSDateTimeTo","itemdetailsGrid","strCostCenterCode","strCostCenterName","iTotalWeightt","strCostObjType","strOperAccNo","iTotalVolume"],
				"service":"TMSCoreTransportTS",
				"methodName":"shortcloseShippmentSummaryScrTS"
		},
		{
					"controlid":"strRequestNo",
					"tasktype":"onenter",
					"input":["strRequestNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"onenterReqNoShipmentTS"
		},
		{
					"controlid":"strShippmentNo",
					"tasktype":"onenter",
					"input":["strShippmentNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"onenterShipmentNoTS"
		}
		];
		
		mainpage.hlpLinks=
		{
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
                     "transrequestno":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.TransRequestItemHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRequestNo","child":"TRANS_REQ_NO"}
							]
				}						
		}		
		//Event Handlers Mapping Ends

		this.callParent(arguments);
		
	}
});
