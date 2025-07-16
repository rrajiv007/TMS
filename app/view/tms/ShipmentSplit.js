/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Steffie       22/1/2016        69449                convert to fresh changes     
1.0.2       shekar        04-02-2016       69945                added Vendor Name, Logistics Group  & Division  
1.0.3       steffie       15/03/2016       71027,71740          ref doc no on enter and help
1.0.5       shekar        18/07/2016       73364                Loading Point, Unload Point  and Load description 
1.0.6       Raj           14/03/2017       76925                Addition of cancel button
1.0.7        Vidhya       06/06/2017       79507                Added PO number and Vendor Name
************************************************************************************************/
Ext.define('CueTrans.view.tms.ShipmentSplit', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Shipment Details";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Confirm",
                "tooltip": "Click here to confirm all the shipments."
            }/*,
			{
                "name": "Convert to fresh",
                "tooltip": "Click here to Convert to fresh all the shipments."
				
            }*/
            ]
		//mainpage.toolbarActions=["Confirm"]
		mainpage.toolbarLinks=
		[
			//{"name":"Change Delivery Date","linkid":"tms_chgedeldate"},
                     //{"name":"Split Itenary","linkid":"tms_splititenary"},
		// {"name":"Proof Of Delivery","linkid":"ProofOfDelivery_Shipment","tooltip":"Click here for Proof Of Delivery."}
		]	
		
		//Add Keyfields
		mainpage.keyFields=["strShipmentNo","strRequestNo"]
		//Driver Master Section Begins
		plf.columns=4
		var ItemBasedColumn1 = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var ItemBasedCtrl1=
			[	
			    //plf.addDisplayOnly({"label":"Shipment No",id:"strShippmentNo",keyField:"strShippmentNo"},this),
				plf.addHlpText({"label":"Shipment No",id:"strShippmentNo",hlpLinkID:"shipmentno"},this),
				plf.addDisplayOnly({"label":"Request No",id:"strRequestNo"}),
				plf.addDisplayOnly({"label":"Request Date",id:"dtRequestDate"}),
				//plf.addDisplayOnly({"label":"Shipment Date",id:"dtShippmentDate"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
				plf.addHlpText({"label":"Ref Doc No",id:"strDocNo",hlpLinkID:"shipDocNo"},this),  //71027,71740 changes
				plf.addHidden({"label":"Demand status",id:"strDemandStatus"}),
				
				plf.addDisplayOnly({"label":"Priority",id:"strPriority"}),
				/*plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"}),*/
				plf.addDisplayOnly({"label":"Requestor ID",id:"strRequestorId"}),
				plf.addDisplayOnly({"label":"Requestor Name",id:"strRequestorName"}),
				plf.addDisplayOnly({"label":"Requestor Email",id:"strRequestormail"}),
				
				plf.addDisplayOnly({"label":"Customer Code",id:"strCustomerCode"}),	
				plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
				/*plf.addDisplayOnly({"label":"Contract Type",id:"strContractType"}),
				plf.addDisplayOnly({"label":"Contract No",id:"strContractNo"}),*/
				
				//plf.addDateTime({"label":"PickUp Date/Time",dateid:"dtPickUpDateTimeFrom",timeid:"tmPickUpTime"}),
				plf.addDisplayOnly({"label":"Pickup Date/Time",id:"dtPickUpDateTimeFrom"}),
				//plf.addDisplayOnly({"label":"Pickup Time",id:"tmPickUpTime"}),
				//plf.addDateTime({"label":"Delivery Date/Time",dateid:"dtROSDateTimeFrom",timeid:"tmROSTime"}),
				plf.addDisplayOnly({"label":"Delivery Date/Time",id:"dtROSDateTimeFrom"}),
				//plf.addDisplayOnly({"label":"Delivery Time",id:"tmROSTime"}),

				plf.addDisplayOnly({"label":"Cost Center Code",id:"strCostCenterCode"}),
				plf.addDisplayOnly({"label":"Cost Center Name",id:"strCostCenterName"}),
				plf.addDisplayOnly({"label":"Cost Object Type",id:"strCostObjType"}),
				plf.addDisplayOnly({"label":"Operation A/C No",id:"strOperAccNo"}),
				plf.addDisplayOnly({"label":"Vendor Name",id:"strVendorName"}),
				plf.addDisplayOnly({"label":"Logistic Group",id:"strLogisticGroup"}),
				plf.addDisplayOnly({"label":"Division",id:"strDivision"}),
				plf.addDisplayOnly({"label":"Remarks",id:"strRemarks"}),
				plf.addDisplayOnly({"label":"Loading Point",id:"strLoadAt"}), // 73364 
				plf.addDisplayOnly({"label":"Unloading Point",id:"strDelvAt"}), // 73364 
				plf.addDisplayOnly({"label":"Load description",id:"strLoadDesc"}), // 73364  
			 
			   ////***********79507 -Vidhya Added 6 Jun 2017*******************//
				
			    plf.addDisplayOnly({"label":"PO No",id:"strPONum"}),
				plf.addDisplayOnly({"label":"Rig ID",id:"strSapRigId"}),
				plf.addDisplayOnly({"label":"Well ID",id:"strWellID"}),
				plf.addDisplayOnly({"label":"Well Name",id:"strWellName"}),
				plf.addDisplayOnly({"label":"Call Out Number",id:"strCallout"}),
                //plf.addDisplayOnly({"label":"Vendor Name",id:"strVendorName"}),


				plf.addHidden({id:"strRequestNoHid"}),
				plf.addHidden({id:"strShipmentNoHid"}),
				plf.addHidden({id:"strChildShipmentid"})
			]
		
		}
		
	
		ItemBasedColumn1.add(ItemBasedCtrl1); 
		
		/*Auto Split Section starts here*/
		/*plf.columns=4
		var AutoSplitSection = plf.addColumnSection({title:"Auto-Split Criteria"});
		var ctrlAutoSplit=
				[
					plf.addCombo({"label":"Split Basis","id":"strSplitBasis"}),
					plf.addText({"label":"Split Value",id:"iSplitValue",inputFormat:"numeric",weightPrecision:3}),
					plf.addButton({"label":"Optimize","id":"btnOptimize","tooltip":"Click here to optimize."})
				]
		AutoSplitSection.add(ctrlAutoSplit);
		*/
		/*Auto Split Section ends here*/
		
		
		//Plan Details Section Begins
		
		var materialDetailsPlan = plf.addColumnSection({title:"Item Details",hidden:true})
		//materialDetailsPlan = plf.addColumnSection({title:""});
		var MaterialDetailsGridFieldObj1=
		[   
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",width:80},
			{columnname:"Item Description",dataname:"ITEM_DESC",datatype:"string",width:250},
			{columnname:"Quantity",dataname:"ITEM_QTY",datatype:"string",width:80,colAlign:'right'},
			{columnname:"UOM",dataname:"ITEM_QTY_UOM",datatype:"string",width:80},
			{columnname:"Shipment Qty",dataname:"REMAINING_QTY",datatype:"string",width:120,colAlign:'right'},
			{columnname:"Split Qty",dataname:"SHIPMENT_QTY",datatype:"string",width:120,editControl:"textbox",colAlign:'right',inputFormat:'integer'},
			{columnname:"Weight(ton)",dataname:"WEIGHT",datatype:"string",width:80,colAlign:'right',weightPrecision:3},
			{columnname:"Volume(cu.m)",dataname:"VOLUME",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Line_no",dataname:"LINE_NO",datatype:"string",width:80,hidden:true}
			
		]
		var MaterialDetailsGridDtl1=
		{
			title:"",
			id:"itemdetailsGrid",
			detail:MaterialDetailsGridFieldObj1,
			removeAddDelete:true,
			readonly:true,
			removePaging:true
		}
		
		var MaterialDetailsGridSection1 = plf.addGrid(MaterialDetailsGridDtl1)
		//Plan Details  Section Ends
		

		
		
		
		var UnmappedGridSection = plf.addGrid(MaterialDetailsGridDtl1,this)	
		materialDetailsPlan.add(UnmappedGridSection);
		
		//Adding Grid to Plan Details Ends	
		
		
		var NewShipmentColumn = plf.addColumnSection({title:"Split Shipment Details",id:"splitShipmentPanel"});
		
		var NewShipmentDetGridFieldObj=
		[   
			{columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",width:120},
			{columnname:"Weight(ton)",dataname:"WEIGHT",datatype:"string",width:80,colAlign:true,weightPrecision:3},
			{columnname:"Volume(cu.m)",dataname:"VOLUME",datatype:"string",width:80,colAlign:true,weightPrecision:3},
			{columnname:"Shipment Type",dataname:"SHIPMENT_TYPE",datatype:"string",width:80,colAlign:true,weightPrecision:3}
		]
		var NewShipmentDetGridDtl=
		{
			title:"",
			id:"ShipmentDet",
			detail:NewShipmentDetGridFieldObj,
			removeAddDelete:true,
			removePaging:true
		}
		
		NewShipmentGridFieldObj=
		[   
			{columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",width:120,hidden:true},
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",width:135,hidden:false},
			{columnname:"Item Description",dataname:"ITEM_DESC",datatype:"string",width:150},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:100},//Raj 76140
			{columnname:"Quantity",dataname:"ITEM_QTY",datatype:"string",width:80,hidden:true},
			{columnname:"Uom",dataname:"ITEM_QTY_UOM",datatype:"string",width:80,hidden:true},
			{columnname:"Shipment<BR>Qty",dataname:"SHIPMENT_QTY",datatype:"string",width:80,colAlign:'right'},
			{columnname:"Split<BR>Qty",dataname:"REMAINING_QTY",datatype:"string",width:60,editControl:"textbox",colAlign:'right',inputFormat:'integer'},
			{columnname:"Weight<BR>(ton)",dataname:"WEIGHT",datatype:"string",width:70,colAlign:'right',weightPrecision:3},
			{columnname:"Volume<BR>(cu.m)",dataname:"VOLUME",datatype:"string",width:70,colAlign:'right',weightPrecision:3},
			{columnname:"Line_no",dataname:"LINE_NO",datatype:"string",width:80,hidden:true}
		]
		var NewShipmentGridDtl=
		{
			title:"",
			id:"NewShipment",
			detail:NewShipmentGridFieldObj,
			removeAddDelete:true,
			removePaging:true
		}
		
		var ShipmentDetGridSection = plf.addGrid(NewShipmentDetGridDtl,this)	
		var ShipmentGridSection = plf.addGrid(NewShipmentGridDtl,this)	
		
		//NewShipmentColumn.add(ShipmentDetGridSection);
		//NewShipmentColumn.add(ShipmentGridSection);
		
		//Add Child Sections
		
		var shipHdrRec = Ext.data.StoreManager.lookup('ShipmentDet_store')
		var shipDtlRec = Ext.data.StoreManager.lookup('NewShipment_store')
		
		//shipHdrRec.on("endupdate",function() {mainpage.renderShipment(NewShipmentColumn)} )
		shipDtlRec.on("endupdate",function() {mainpage.renderShipment(NewShipmentColumn)} )
		
		mainpage.ptrMainSection.add(ItemBasedColumn1) 
		//mainpage.ptrMainSection.add(AutoSplitSection) 		
		mainpage.ptrMainSection.add(materialDetailsPlan)
		mainpage.ptrMainSection.add(NewShipmentColumn)
		//mainpage.ptrMainSection.add(ShipmentGridSection)		
		   
		//History Data Section 
		mainpage.dataHistorySectionFlag=true;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 

		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strShippmentNo","dtShippmentDate","strRequestNo","strStatus","strOrigin","strDestination","strDocNo","dtRequestDate","strRequestormail",
				"strDemandStatus","strPriority","strCommodity","strWeightUom","strVolumeUom","strCustomerCode","strCustomerName","strContractType","strContractNo","dtPickUpDateTimeFrom","dtROSDateTimeFrom","dtPickUpDateTimeTo","dtROSDateTimeTo","itemdetailsGrid","strCostCenterCode","strCostCenterName","iTotalWeightt","strCostObjType","strOperAccNo","iTotalVolume","strRemarks","strPONum","strVendorName","strSapRigId","strWellID","strWellName","strCallout"],
				"service":"TMSCoreTransportTS",
				"methodName":"initShippmentNoScrTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["strShippmentNo","dtShippmentDate","strRequestNo","strStatus","strOrigin","strDestination","strDocNo","dtRequestDate","strRequestormail",
				"strDemandStatus","strPriority","strCommodity","strWeightUom","strVolumeUom","strCustomerCode","strCustomerName","strContractType","strContractNo",
				"dtPickUpDateTimeFrom","dtROSDateTimeFrom","dtPickUpDateTimeTo","dtROSDateTimeTo","itemdetailsGrid","strCostCenterCode","tmROSTime",
				,"strCostCenterName","iTotalWeightt","strCostObjType","strOperAccNo","iTotalVolume","strRequestNoHid","strRemarks","strPONum","strVendorName","strSapRigId","strWellID","strWellName","strCallout"],
				"service":"TMSCoreTransportTS",
				"methodName":"saveallShippmentScrTS"
			},
			/*
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Convert to fresh",
				"input":["strShippmentNo","dtShippmentDate","strRequestNo","strStatus","strOrigin","strDestination","strDocNo","dtRequestDate","strRequestormail",
				"strDemandStatus","strPriority","strCommodity","strWeightUom","strVolumeUom","strCustomerCode","strCustomerName","strContractType","strContractNo",
				"dtPickUpDateTimeFrom","dtROSDateTimeFrom","dtPickUpDateTimeTo","dtROSDateTimeTo","itemdetailsGrid","strCostCenterCode","tmROSTime",
				,"strCostCenterName","iTotalWeightt","strCostObjType","strOperAccNo","iTotalVolume","strRequestNoHid","strRemarks"],
				"service":"TMSCoreTransportTS",
				"methodName":"covertallfrShipScrTS"
			},*/
			{       
				"controlid":"btnOptimize",
				"tasktype":"btnclick",
				"input":["strSplitBasis","iSplitValue","strShipmentNoHid","strShippmentNo","dtShippmentDate","strRequestNo","strStatus","strOrigin","strDestination","strDocNo","dtRequestDate","strRequestormail",
				"strDemandStatus","strPriority","strCommodity","strWeightUom","strVolumeUom","strCustomerCode","strCustomerName","strContractType","strContractNo",
				"dtPickUpDateTimeFrom","dtROSDateTimeFrom","dtPickUpDateTimeTo","dtROSDateTimeTo","itemdetailsGrid","strCostCenterCode","tmROSTime",
				,"strCostCenterName","iTotalWeightt","strCostObjType","strOperAccNo","iTotalVolume","strRequestNoHid","strPONum","strVendorName","strSapRigId","strWellID","strWellName","strCallout"],
				"service":"TMSCoreTransportTS",
				"methodName":"optimizesplitallShippmentScrTS"
			},
		/*
		{       
				"controlid":"splitBtn",
				"tasktype":"btnclick",
				"action":"",
				"input":["strShippmentNo","dtShippmentDate","strRequestNo","strStatus","strOrigin","strDestination","strDocNo",
				"strDemandStatus","strPriority","strCommodity","strWeightUom","strVolumeUom","strCustomerCode","strCustomerName","strContractType","strContractNo",
				"dtPickUpDateTimeFrom","dtROSDateTimeFrom","dtPickUpDateTimeTo","dtROSDateTimeTo","itemdetailsGrid","strCostCenterCode","strCostCenterName","tmROSTime",
				"iTotalWeightt","strCostObjType","strOperAccNo","iTotalVolume"],
				"service":"TMSCoreTransportTS",
				"methodName":"splitShippmentScrTS"
		},
		*/
/*
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
		
*/      //71027,71740 changes
        {
					"controlid":"strDocNo",
					"tasktype":"onenter",
					"input":["strDocNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"onenterDNoSplitTS"
		},
		{
					"controlid":"strShippmentNo",
					"tasktype":"onenter",
					"input":["strRequestNo","strShippmentNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"onenterShipmentNOSplitTS"
		}
/*,
		{
					"controlid":"strShippmentNo",
					"tasktype":"onenter",
					"input":["strShippmentNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"onenterShipmentNoTS"
		}
*/
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
							{"parent":"strShippmentNo","child":"SHIPMENT_NO"},
							{"parent":"strRequestNo","child":"TRANS_REQ_NO"}							
							]
				},
				//71027,71740 changes
			"shipDocNo":
			   {
					"hlpType":"Header",
					"hlpScreen":"tms.ShipDocNoHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					        {"parent":"strDocNo","child":"DO_NO"},
							{"parent":"strShippmentNo","child":"SHIPMENT_NO"},
							{"parent":"strRequestNo","child":"TRANS_REQ_NO"}							
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
             mainpage.screenLinks=
		{
			
			"ProofOfDelivery_Shipment":
				{
					"dest":"ProofOfDelivery.ProofofDeliveryShipmentLevel",
					"hdr":[
							{"src":"strShippmentNo","dest":"strShippmentNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
			
			/*	
				"tms_chgedeldate":
				{
					"dest":"tms.ChangeDeliveryDate",
					"hdr":[
							{"src":"strShippmentNo","dest":"strShippmentNo"}							
						],
					"grid":    [
							
							]
				},
			 	"tms_splititenary":
				{
					"dest":"tms.SplitItenary",
					"hdr":[
							{"src":"strShippmentNo","dest":"strShippmentNo"}							
						],
					"grid":    [
							
							]
				}

			*/	
		}	
	
		//Event Handlers Mapping Ends

		this.callParent(arguments);
		
	},
	renderShipment:function(NewShipmentColumn)
	{
	
		var form_obj =this;
		var shipHdrRec = Ext.data.StoreManager.lookup('ShipmentDet_store')
		var shipDtlRec = Ext.data.StoreManager.lookup('NewShipment_store')
		//console.log(shipDtlRec,"shipDtlRec");
		shipHdrRec.clearFilter();
		shipDtlRec.clearFilter();
		NewShipmentColumn.removeAll();
		var shipCounter = 1
		shipHdrRec.each( function(shipRec)
		{
			/*
			var splitShipHdrPanel = Ext.create("Ext.panel.Panel",
			{
				layout:'column',
				border:1,
				margin:10,
				defaults:{margin:10}
			})
			*/
			var currentDate = new Date();
			console.log(currentDate);
			
			var splitShipHdrPanel = plf.addColumnSection({title:"",columnWidth:.5,cls:"splitShipCls",margin:5,padding:3});
			var splitShipHdrPanel1 = plf.addColumnSection({title:"",columnWidth:1,cls:"splitShipCls",margin:5,padding:3});
			
			//splitShipHdrPanel.add({xtype:"textfield",labelWidth:0,value:shipRec.get("SHIPMENT_NO"),columnWidth:.30,readOnly:true,fieldCls:"c-displyonlyctrl"})
			splitShipHdrPanel.add({xtype:"container",html:shipRec.get("SHIPMENT_NO"),columnWidth:.25,cls:"c-displyonlyctrldummyhdr",border:false})
			splitShipHdrPanel.add({xtype:"container",columnWidth:.10,cls:"c-displyonlyctrldummy",border:false})
			splitShipHdrPanel.add({xtype:"button",align:"right",text:"Confirm",tooltip:"Click here to confirm this shipment.",columnWidth:.12,margin:3,fieldCls:"c-displyonlyctrl",
					handler: function() 
					{
						if (shipRec.get("SHIPMENT_TYPE").toLowerCase() == 'p')
						{
								var result = confirm("Parent shipment confirmation will confirm all the child shipments. Do you want to continue?");
								if (result) 
								{
									//Logic to Confirm the shipment									
									form_obj.queryById("methodName").setValue("saveShippmentScrTS");
									form_obj.queryById("strChildShipmentid").setValue(shipRec.get("SHIPMENT_NO"));
									process_ebpack_service(form_obj,["strChildShipmentid","strShippmentNo","itemdetailsGrid",
									"strRequestNo","dtShippmentDate","strCustomerCode","strPriority","strDocNo","dtShippmentDate",
									"strOrigin","strDestination","strDemandStatus","strCommodity","strCustomerCode","strContractType",
									"strContractNo","dtPickUpDateTimeFrom","tmROSTime","dtROSDateTimeFrom","strCostCenterCode",
									"strShipmentNoHid"],"TMSCoreTransportTS");
								}
						}
						else
						{								
								form_obj.queryById("methodName").setValue("saveShippmentScrTS");
								form_obj.queryById("strChildShipmentid").setValue(shipRec.get("SHIPMENT_NO"));
								process_ebpack_service(form_obj,["strChildShipmentid","strShippmentNo","itemdetailsGrid",
								"strRequestNo","dtShippmentDate","strCustomerCode","strPriority","strDocNo","dtShippmentDate",
								"strOrigin","strDestination","strDemandStatus","strCommodity","strCustomerCode","strContractType",
								"strContractNo","dtPickUpDateTimeFrom","tmROSTime","dtROSDateTimeFrom","strCostCenterCode",
								"strShipmentNoHid"],"TMSCoreTransportTS");
						}
						
					}					
			})	
			splitShipHdrPanel.add({xtype:"button",align:"right",text:"Un-split",tooltip:"Click here to Un-split.",columnWidth:.12,margin:3,fieldCls:"c-displyonlyctrl",
					handler: function() {
						form_obj.queryById("methodName").setValue("UnsplitShippmentScrTS");
						form_obj.queryById("strChildShipmentid").setValue(shipRec.get("SHIPMENT_NO"));
						process_ebpack_service(form_obj,["strChildShipmentid","strShippmentNo","itemdetailsGrid",
						"strRequestNo","dtShippmentDate","strCustomerCode","strPriority","strDocNo","dtShippmentDate",
						"strOrigin","strDestination","strDemandStatus","strCommodity","strCustomerCode","strContractType",
						"strContractNo","dtPickUpDateTimeFrom","tmROSTime","dtROSDateTimeFrom","strCostCenterCode",
						"strShipmentNoHid"],"TMSCoreTransportTS");
					}					
			})
			splitShipHdrPanel.add({xtype:"button",align:"right",text:"Split",tooltip:"Click here to Split.",columnWidth:.09,margin:3,fieldCls:"c-displyonlyctrl",
					handler: function() {
						form_obj.queryById("methodName").setValue("splitShippmentScrTS");
						form_obj.queryById("strChildShipmentid").setValue(shipRec.get("SHIPMENT_NO"));
						//shipDtlRec.clearFilter();
						//shipDtlRec.filter("SHIPMENT_NO",shipRec.get("SHIPMENT_NO"))
						//Ext.data.StoreManager.lookup('itemdetailsGrid_store').loadData(shipDtlRec.getRange())
						Ext.data.StoreManager.lookup('itemdetailsGrid_store').loadData(Ext.data.StoreManager.lookup("splitDtl_"+shipRec.get("SHIPMENT_NO")+'_store').getRange())
						process_ebpack_service(form_obj,["strChildShipmentid","strShippmentNo","itemdetailsGrid",
						"strRequestNo","dtShippmentDate","strCustomerCode","strPriority","strDocNo","dtShippmentDate",
						"strOrigin","strDestination","strDemandStatus","strCommodity","strCustomerCode","strContractType",
						"strContractNo","dtPickUpDateTimeFrom","tmROSTime","dtROSDateTimeFrom","strCostCenterCode",
						"strShipmentNoHid"],"TMSCoreTransportTS");
						shipDtlRec.clearFilter();
					}					
			})
			/*69449     changes */
			splitShipHdrPanel.add({xtype:"button",align:"right",text:"Convert to Fresh",tooltip:"Click here to convert fresh shipment.",columnWidth:.20,margin:3,fieldCls:"c-displyonlyctrl",
					handler: function() {
						form_obj.queryById("methodName").setValue("convertFrshShipScrTS");
						form_obj.queryById("strChildShipmentid").setValue(shipRec.get("SHIPMENT_NO"));
						process_ebpack_service(form_obj,["strChildShipmentid","strShippmentNo","itemdetailsGrid",
						"strRequestNo","dtShippmentDate","strCustomerCode","strPriority","strDocNo","dtShippmentDate",
						"strOrigin","strDestination","strDemandStatus","strCommodity","strCustomerCode","strContractType",
						"strContractNo","dtPickUpDateTimeFrom","tmROSTime","dtROSDateTimeFrom","strCostCenterCode",
						"strShipmentNoHid"],"TMSCoreTransportTS");
			        }
			}) /*69449     changes end */
			
			//Below added by raj for cancel shipment
					/*69449     changes */
			splitShipHdrPanel.add({xtype:"button",align:"right",text:"Cancel",tooltip:"Click here to  cancel shipment.",columnWidth:.12,margin:3,fieldCls:"c-displyonlyctrl",
					handler: function() {
						form_obj.queryById("methodName").setValue("cancelShippmentScrTS");
						form_obj.queryById("strChildShipmentid").setValue(shipRec.get("SHIPMENT_NO"));
						process_ebpack_service(form_obj,["strChildShipmentid","strShippmentNo","itemdetailsGrid",
						"strRequestNo","dtShippmentDate","strCustomerCode","strPriority","strDocNo","dtShippmentDate",
						"strOrigin","strDestination","strDemandStatus","strCommodity","strCustomerCode","strContractType",
						"strContractNo","dtPickUpDateTimeFrom","tmROSTime","dtROSDateTimeFrom","strCostCenterCode",
						"strShipmentNoHid"],"TMSCoreTransportTS");
			        }
			}) /*69449     changes end */
			
			
			splitShipHdrPanel1.add({xtype:"textfield",labelWidth:125,fieldLabel:"Commodity",value:shipRec.get("COMMODITY"),columnWidth:.35,readOnly:true,fieldCls:"c-displyonlyctrl"})
			splitShipHdrPanel1.add({xtype:"container",columnWidth:.21,cls:"c-displyonlyctrldummy",border:false})
			splitShipHdrPanel1.add({xtype:"textfield",labelWidth:90,fieldLabel:"Status",value:shipRec.get("STATUS"),columnWidth:.35,readOnly:true,fieldCls:"c-displyonlyctrl"})
			//splitShipHdrPanel.add({xtype:"container",columnWidth:.04,cls:"c-displyonlyctrldummy",border:false})			
			splitShipHdrPanel1.add({xtype:"textfield",labelWidth:125,fieldLabel:"Weight (ton)",value:parseFloat(shipRec.get("WEIGHT")).toFixed(3),columnWidth:.35,readOnly:true,fieldCls:"c-displyonlyctrl"})
			splitShipHdrPanel1.add({xtype:"container",columnWidth:.21,cls:"c-displyonlyctrldummy",border:false})
			splitShipHdrPanel1.add({xtype:"textfield",labelWidth:90,fieldLabel:"Volume (cu.m)",value:parseFloat(shipRec.get("VOLUME")).toFixed(3),columnWidth:.35,readOnly:true,fieldCls:"c-displyonlyctrl"})
			//splitShipHdrPanel.add({xtype:"container",columnWidth:.10,cls:"c-displyonlyctrldummy",border:false})
			//splitShipHdrPanel1.add({xtype:"textfield",labelWidth:125,fieldLabel:"Delivery Date/Time",value:shipRec.get("DEL_DT_TME"),columnWidth:.35,readOnly:true,fieldCls:"c-displyonlyctrl"})
			//splitShipHdrPanel1.add({xtype:"container",columnWidth:.21,cls:"c-displyonlyctrldummy",border:false})
			splitShipHdrPanel.add(splitShipHdrPanel1);
			//splitShipHdrPanel.add({xtype:"textfield",labelWidth:90,fieldLabel:"Change Delivery Date/Time",value:shipRec.get("tmROSTime"),columnWidth:.30,readOnly:true,fieldCls:"c-displyonlyctrl"})
			
			/*
			splitShipHdrPanel.add({xtype:"button",align:"right",text:"Un-split",columnWidth:.15,margin:3,fieldCls:"c-displyonlyctrl",
					handler: function() {
						form_obj.queryById("methodName").setValue("UnsplitShippmentScrTS");
						form_obj.queryById("strChildShipmentid").setValue(shipRec.get("SHIPMENT_NO"));
						process_ebpack_service(form_obj,["strChildShipmentid","strShippmentNo"],"TMSCoreTransportTS");
					}					
			})
			*/
			//splitShipHdrPanel.add(plf.addDisplayOnly({label:"Weight",value:shipRec.get("WEIGHT"),columnWidth:.4}))
			//splitShipHdrPanel.add(plf.addDisplayOnly({label:"Volume",value:shipRec.get("VOLUME"),columnWidth:.4}))

			/*
			var splitShipDtlPanel = Ext.create("Ext.panel.Panel",
			{
				layout:'column',
				columnWidth:1,
				margin:10,
				defaults:{margin:5}
			})
			*/
			var splitShipDtlPanel = plf.addColumnSection({columnWidth:.97,cls:"splitShipCls",padding:2});
			/*
			splitShipDtlPanel.add({xtype:"textfield",value:"Item",columnWidth:.40,readOnly:true,fieldCls:"c-displyonlyctrlhdr"})
			splitShipDtlPanel.add({xtype:"textfield",value:"Qty",columnWidth:.15,readOnly:true,fieldCls:"c-displyonlyctrl1hdr"})
			splitShipDtlPanel.add({xtype:"textfield",value:"Split Qty",columnWidth:.15,readOnly:true,fieldCls:"c-displyonlyctrl1hdr"})
			splitShipDtlPanel.add({xtype:"textfield",value:"Weight",columnWidth:.15,readOnly:true,fieldCls:"c-displyonlyctrl1hdr"})
			splitShipDtlPanel.add({xtype:"textfield",value:"Volume",columnWidth:.15,readOnly:true,fieldCls:"c-displyonlyctrl1hdr"})
			var rowCounter = 1

			
			shipDtlRec.each( function(recDtl)
			{
				splitShipDtlPanel.add({xtype:"textfield",value:recDtl.get("ITEM_DESC"),columnWidth:.40,readOnly:true,fieldCls:"c-displyonlyctrl"})
				splitShipDtlPanel.add({xtype:"textfield",value:recDtl.get("SHIPMENT_QTY"),columnWidth:.15,readOnly:true,fieldCls:"c-displyonlyctrl1"})
				splitShipDtlPanel.add({xtype:"textfield",value:recDtl.get("REMAINING_QTY"),columnWidth:.15,maskRe: /[0-9]/,fieldCls:"c-displyonlyctrl1",
										 listeners: {
													blur: function(field) 
														{
															
															shipDtlRec.clearFilter();										
															shipDtlRec.filter("SHIPMENT_NO",recDtl.get("SHIPMENT_NO"))
															shipDtlRec.filter("LINE_NO",recDtl.get("LINE_NO"))
															//shipDtlRec.suspendEvents(true)
															shipDtlRec.each( function(recDtltmp)
																				{
																					//shipDtlRec.suspendEvents(false)
																					recDtltmp.set("REMAINING_QTY",field.getValue())
																					//shipDtlRec.suspendEvents(true)
																					
																				}
																			)
															//shipDtlRec.suspendEvents(false)
															shipDtlRec.clearFilter();
															
														}
															
													}
									  })
				splitShipDtlPanel.add({xtype:"textfield",value:parseFloat(recDtl.get("WEIGHT")).toFixed(3),columnWidth:.15,readOnly:true,fieldCls:"c-displyonlyctrl1"})
				splitShipDtlPanel.add({xtype:"textfield",value:parseFloat(recDtl.get("VOLUME")).toFixed(3),columnWidth:.15,readOnly:true,fieldCls:"c-displyonlyctrl1"})
				rowCounter = rowCounter + 1;
			});
			*/
			
			splitShipDtlPanel.add(plf.addGrid({
					title:"",
					id:"splitDtl_"+shipRec.get("SHIPMENT_NO"),
					detail:NewShipmentGridFieldObj,
					removeAddDelete:true,
					removeFilter:true,
					removeExport:true,
					visibleRow:7,
					readonly:true,
					removePaging:true
				},this))
				
			shipDtlRec.clearFilter();
			shipDtlRec.filter("SHIPMENT_NO",shipRec.get("SHIPMENT_NO"))	
			Ext.data.StoreManager.lookup("splitDtl_"+shipRec.get("SHIPMENT_NO")+'_store').loadData(shipDtlRec.getRange())			
			shipDtlRec.clearFilter();
			
			splitShipHdrPanel.add(splitShipDtlPanel)
			NewShipmentColumn.add(splitShipHdrPanel)
			shipCounter = shipCounter + 1;
		})
		shipDtlRec.clearFilter();
	}
})