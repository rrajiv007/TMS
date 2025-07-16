/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.5															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			          Remarks             
************************************************************************************************	
1.0.1		Manibharathi	04/02/2016      69950					Notes field addded      
1.0.2       steffie         14/03/2016      71027,71738             ref doc no on enter and help
1.0.3       steffie         04/04/2016      71735  
1.0.4       shekar          18/07/2016      73364                   Loading Point, Unload Point  and Load description 
1.0.5       Vidhya          25/07/2016      73460                   Added Load No
1.0.6       Vidhya          06/06/2017      79507                   Added PO number and Vendor Name  
************************************************************************************************/
Ext.define('CueTrans.view.tms.TransRequestItemBased', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Cargo Request";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"View Financial Details","linkid":"fin_findet","tooltip":"Click here to view financial details."}
                     
		]
		
		
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create a request."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a request."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a request."
            },
            {
                "name": "Confirm",
                "tooltip": "Click here to confirm a request."
            },
            {
                "name": "Short Close",
                "tooltip": "Click here to short close a request."
            }
            ]

		//mainpage.toolbarActions=["Refresh","Create","Edit","Delete","Confirm","Short Close"]
		
		//Add Keyfields
		mainpage.keyFields=["strRequestNo"]
		//Driver Master Section Begins
		plf.columns=4
		var ItemBasedColumn1 = plf.addColumnSection({});
		var ItemAction = plf.addColumnSection({});
		var ItemActionCtrl=
			[	
				plf.addCombo({"label":"Action",id:"strAction","mandatory":"true"}),
				plf.addCombo({"label":"Vehicle Category",id:"strVehCat"}),				
				plf.addListEdit({"label":"Vehicle Reg No",id:"strVehRegNo",keyField:"strVehCode"},this),
				plf.addHlpText({"label":"Vehicle No",id:"strVehCode",hlpLinkID:"vehiclehlp"},this),
				plf.addCombo({"label":"Loading Point",id:"strLoadAt"}), //73364
				plf.addCombo({"label":"Unloading Point",id:"strDelvAt"}), //73364
				plf.addText({"label":"Load description",id:"strLoadDesc"}), //73364
				plf.addText({"label":"Actual Weight",id:"strActualWeight",inputFormat:'numeric',weightPrecision:3}), //Raj 241217 strActualWeight
				plf.addHlpText({"label":"Load No",id:"strLoadNo",hlpLinkID:"LoadNo"},this)//73460//
			
			] 
		ItemAction.add(ItemActionCtrl);
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var ItemBasedCtrl1=
			[	
			    plf.addHlpText({"label":"Request No",id:"strRequestNo",hlpLinkID:"transreqno"},this),	
				plf.addDate({"label":"Request Date",id:"dtRequestDate","mandatory":"true"}),
				plf.addHlpText({"label":"Ref Doc No",id:"strDocNo","mandatory":"true",hlpLinkID:"refdocno"},this),//71027,71738 changes
                plf.addDisplayOnly({"label":"Status",id:"strStatus"}),

			//	plf.addCombo({"label":"Commodity",id:"strCommodity","mandatory":"true"}),
				
				plf.addCombo({"label":"Origin",id:"strOrigin","mandatory":"true"}),
				plf.addComboWithoutStore({"label":"Destination",id:"strDestination",storeId:"strOrigin","mandatory":"true"}),
				//plf.addCombo({"label":"Destination",id:"strDestination","mandatory":"true"}),
				plf.addHidden({"label":"Demand Status",id:"strDemandStatus"}),
				plf.addCombo({"label":"Priority",id:"strPriority"}),
				plf.addText({"label":"Rig No",id:"strRigNo"}), //71735 changes
				//plf.addCombo({"label":"Weight UOM",id:"strWeightUom"}),
				//plf.addCombo({"label":"Volume UOM",id:"strVolumeUom"}),
			    plf.addText({"label":"Requestor ID",id:"strRequestorId","mandatory":"true"}),
				plf.addText({"label":"Requestor Name",id:"strRequestorName","mandatory":"true"}),
				plf.addText({"label":"Requestor Mail ID",id:"strReqMailId"}),
				plf.addDisplayOnly({"label":"Created type",id:"strCreatedType"}),
				plf.addText({"label":"Remarks",id:"strRemarks"}),
				plf.addCombo({"label":"Vendor Name",id:"strVendorCode"}),
				plf.addText({"label":"Vendor's Ref No",id:"strVenRefNo"}),//Raj 241217
				plf.addDisplayOnly({"label":"Load No",id:"strLoadNoFrom"}),//73460
				//plf.addText({"label":"Load At",id:"strLoadAt"}), // Commented By shekar
				////***********79507 -Vidhya Added 6 Jun 2017*******************//
				plf.addText({"label":"PO No",id:"strPONum"}),
				plf.addDisplayOnly({"label":"Rig ID",id:"strSapRigIdHdr"}),
				plf.addDisplayOnly({"label":"Well ID",id:"strWellIDHdr"}),
			    plf.addDisplayOnly({"label":"Well Name",id:"strWellNameHdr"}),
				plf.addDisplayOnly({"label":"EDI Vendor ID",id:"strEDIVendorId"}),
				plf.addDisplayOnly({"label":"EDI Vendor Name",id:"strEDIVendorName"}),
				plf.addHidden({id:"strRequestNoHid"})
			    
				

			]
		
		}
		
		else
		{
			var ItemBasedCtrl1=
			[	
				plf.addHlpText({"label":"Request No",id:"strRequestNo",hlpLinkID:"transreqno"},this),	
				plf.addDate({"label":"Request No",id:"dtRequestDate","mandatory":"true"}),
				plf.addHlpText({"label":"Ref Doc No",id:"strDocNo","mandatory":"true",hlpLinkID:"refdocno"},this),//71027 changes
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),

			//	plf.addCombo({"label":"Commodity",id:"strCommodity","mandatory":"true"}),
				
				plf.addCombo({"label":"Origin",id:"strOrigin","mandatory":"true"}),
				plf.addComboWithoutStore({"label":"Destination",id:"strDestination",storeId:"strOrigin","mandatory":"true"}),
				//plf.addCombo({"label":"Destination",id:"strDestination","mandatory":"true"}),
				plf.addHidden({"label":"Demand Status",id:"strDemandStatus"}),
				plf.addCombo({"label":"Priority",id:"strPriority"}),
				plf.addText({"label":"Rig No",id:"strRigNo"}),//71735 changes
				//plf.addCombo({"label":"Weight UOM",id:"strWeightUom"}),
				//plf.addCombo({"label":"Volume UOM",id:"strVolumeUom"}),
				plf.addText({"label":"Requestor ID",id:"strRequestorId","mandatory":"true"}),
				plf.addText({"label":"Requestor Name",id:"strRequestorName","mandatory":"true"}),
				plf.addText({"label":"Requestor Mail ID",id:"strReqMailId"}),
				plf.addDisplayOnly({"label":"Created type",id:"strCreatedType"}),
				plf.addText({"label":"Remarks",id:"strRemarks",width:255}),
				plf.addCombo({"label":"Vendor Code",id:"strVendorCode"}),
				
				plf.addText({"label":"PO No",id:"strPONum"}),
				plf.addDisplayOnly({"label":"Rig ID",id:"strSapRigIdHdr"}),
				plf.addDisplayOnly({"label":"Well ID",id:"strWellIDHdr"}),
			    plf.addDisplayOnly({"label":"Well Name",id:"strWellNameHdr"}),
			//	plf.addText({"label":"Load At",id:"strLoadAt"}), // Commented By shekar
				plf.addHidden({id:"strRequestNoHid"})
			]
		}	
		
		ItemBasedColumn1.add(ItemBasedCtrl1); 
		
		ItemBasedColumn2 = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var ItemBasedCtrl2=
			[	
			    plf.addListEdit({"label":"Customer Name",id:"strCustomerName",keyField:"strCustomerCode"},this),
				plf.addHlpText({"label":"Customer Code",id:"strCustomerCode","mandatory":"true",hlpLinkID:"customerlink"},this),	
				plf.addCombo({"label":"Logistics Group",id:"strLogGroup"}),
				plf.addCombo({"label":"Division",id:"strDivCode"}),
				/*plf.addDate({"label":"Pickup Date",id:"dtPickUpDateTime"}),
				plf.addText({"label":"Pick Up Time",id:"tmPickUpTime"}),*/
				plf.addDateTime({"label":"Pickup Date/Time",dateid:"dtPickUpDateTime",timeid:"tmPickUpTime","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Delivery Date/Time",id:"dtRosDateTime"})				
				//plf.addDateTime({"label":"Delivery Date/Time",dateid:"dtRosDateTime",timeid:"tmROSTime","mandatory":"true"})
				/*plf.addCombo({"label":"Contract Type",id:"strContractType","mandatory":"true"}),
				plf.addText({"label":"Contract No",id:"strContractNo","mandatory":"true"})*/
				//plf.addDate({"label":"Delivery Date ",id:"dtRosDateTime","mandatory":"true"}),
				//plf.addText({"label":"Delivery Time",id:"tmROSTime"})
			]		
		}		
		else
		{
			var ItemBasedCtrl2=
			[	
				plf.addListEdit({"label":"Customer Name",id:"strCustomerName",keyField:"strCustomerCode"},this),
				plf.addHlpText({"label":"Customer Code",id:"strCustomerCode","mandatory":"true",hlpLinkID:"customerlink"},this),	
				plf.addCombo({"label":"Logistics Group",id:"strLogGroup"}),
				plf.addCombo({"label":"Division",id:"strDivCode"}),
				plf.addDateTime({"label":"Pickup Date/Time",dateid:"dtPickUpDateTime",timeid:"tmPickUpTime","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Delivery Date/Time",id:"dtRosDateTime"})
				//plf.addDateTime({"label":"Delivery Date/Time",dateid:"dtRosDateTime",timeid:"tmROSTime","mandatory":"true"})
				/*plf.addCombo({"label":"Contract Type",id:"strContractType","mandatory":"true"}),
				plf.addText({"label":"Contract No",id:"strContractNo","mandatory":"true"})*/
				
				
			]
		}	
		
		ItemBasedColumn2.add(ItemBasedCtrl2);
		//Plan Details Section Begins
		plf.columns=4
		
		var materialDetailsPlan = plf.addFieldSet({title:""})
		//materialDetailsPlan = plf.addColumnSection({title:""});
		var MaterialDetailsGridFieldObj1=
		[   
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",editControl:"textbox",width:140,helpid:'ItemCodePlan',"onenter":"ITEM_CODE_ONENTER"},
			{columnname:"Item Description",dataname:"ITEM_DESC",datatype:"string",width:250},
            {columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:90},
			{columnname:"Quantity",dataname:"ITEM_QTY",datatype:"string",editControl:"textbox",width:80,"onenter":"QUANTITY_ONENTER",colAlign:'right'},
			{columnname:"UOM",dataname:"ITEM_QTY_UOM",datatype:"string",width:200,storeId:"strPlanQuantityUom"},
			{columnname:"Weight<BR>(ton)",dataname:"TOT_WEIGHT",datatype:"string",width:150,colAlign:'right',weightPrecision:3},
			{columnname:"Volume<BR>(cu.m)",dataname:"TOT_VOLUME",datatype:"string",width:150,colAlign:'right',volumePrecision:3},
		]
		var MaterialDetailsGridDtl1=
		{
			title:"",
			id:"planDetail",
			detail:MaterialDetailsGridFieldObj1,
		
		}
		
		MaterialDetailsGridSection1 = plf.addGrid(MaterialDetailsGridDtl1)
		//Plan Details  Section Ends
		

		//Plan Details Section Begins
		plf.columns=4
		//mappedShipmentDetails = plf.addColumnSection({title:""});
		var unmappedShipmentsFormCtrl=
		[
			plf.addBlank(),
			plf.addBlank(),
			plf.addDisplayOnly({"label":"Total Weight",id:"iPlanTotWeight"}),
			plf.addDisplayOnly({"label":"Total Volume",id:"iPlanTotVolume"})
			
		]
		//mappedShipmentDetails.add(unmappedShipmentsFormCtrl);
		//Plan Details  Section Ends
		//UnmappedGridSection = plf.addGrid(MaterialDetailsGridDtl1,this)	
		//materialDetailsPlan.add(UnmappedGridSection);
		//materialDetailsPlan.add(unmappedShipmentsFormCtrl);	
		
		var passRefDocDtl1 =  plf.addCollapseSection({title:"Material Details(Plan)",collapsed:true,hidden:true})
		var TransrequestGridSection = plf.addGrid(MaterialDetailsGridDtl1,this)	
		passRefDocDtl1.add(TransrequestGridSection)
		
		//Adding Grid to Plan Details Ends	
		//Plan Details Section Begins
		plf.columns=4
		
		//materialDetailsAct = plf.addFieldSet({title:""})
		var materialDetailsAct = plf.addColumnSection({title:"Material Details(Actual)"});
		var MaterialDetailsGridFieldObj2=
		[   
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",editControl:"textbox",width:140,helpid:'ItemCodeAct',"onenter":"ITEM_CODE_ONENTER","onkeyup":"ITEM_CODE_ONENTER"},
			{columnname:"Item Description",dataname:"ITEM_DESC",datatype:"string",width:250},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:90},
			{columnname:"Quantity",dataname:"ITEM_QTY",datatype:"string",editControl:"textbox",width:120,"onenter":"QUANTITY_ONENTER",colAlign:'right'},
			{columnname:"UOM",dataname:"ITEM_QTY_UOM",datatype:"string",width:100,storeId:"strQuantityUom"},
			{columnname:"Weight<BR>(ton)",dataname:"TOT_WEIGHT",datatype:"string",width:120,colAlign:'right',weightPrecision:3},
			{columnname:"Volume<BR>(cu.m)",dataname:"TOT_VOLUME",datatype:"string",width:120,colAlign:'right',volumePrecision:3},
			{columnname:"PO Line Item",dataname:"PO_LINE_ITEM",datatype:"string",inputFormat:'integer',editControl:"textbox",width:100,colAlign:'right'},//Raj 241217
			{columnname:"Remarks",dataname:"ITEM_REMARKS",datatype:"string",editControl:"textbox",width:200},//Raj 241217
			{columnname:"EDI DO Number",dataname:"EDI_DO_NUMBER",datatype:"string",editControl:"readonly",width:200}//Raj 030820
		]
		var MaterialDetailsGridDtl2=
		{
			title:"",
			id:"actDetail",
			detail:MaterialDetailsGridFieldObj2,
			visibleRow:11
		
		}
		//MaterialDetailsGridSection1 = plf.addGrid(MaterialDetailsGridDtl1)
		//Plan Details  Section Ends

		//Plan Details Section Begins
		plf.columns=4
		mappedShipmentDetails = plf.addColumnSection({title:""});
		unmappedShipmentsFormCtrl=
		[
		//	plf.addBlank(),
          	//	plf.addBlank(),
			plf.addDisplayOnly({"label":"Total Weight (ton)",id:"iActTotWeight"}),
			//plf.addCombo({"label":"Weight UOM",id:"strWeightUom"}),
			plf.addDisplayOnly({"label":"Total Volume (cu.m)",id:"iActTotVolume"}),
			plf.addDisplayOnly({"label":"EDI Total Weight(ton)",id:"iEDITotalReqWeight"}),
			plf.addBlank()
		
		//	plf.addDisplayOnly({"label":"Total Volume",id:"iActTotVolume"}),
			//plf.addCombo({"label":"Volume UOM",id:"strVolumeUom"})
		
			
		]
		mappedShipmentDetails.add(unmappedShipmentsFormCtrl);
		/*	capacityFieldsetSection = plf.addColumnSection({title:""});
			//Capcity field set code
			capacityFieldset = plf.addFieldSet({title:""});
			capacityFieldsetFormCtrl=
				[
					plf.addFieldContainer({"label":"Total Weight(ton)",
						"controls":[
					plf.addDisplayOnly({id:"iActTotWeight","width":"50",labelWidth:0}),
					//plf.addPlainCombo({id:"strWeightUom","width":"100"})
								]	
			}),			
			plf.addFieldContainer({"label":"Total Volume(cu.m)",
				"controls":[
					plf.addDisplayOnly({id:"iActTotVolume","width":"50",labelWidth:0}),
					//plf.addPlainCombo({id:"strVolumeUom","width":"100"})
				]	
			})
		]
		capacityFieldset.add(capacityFieldsetFormCtrl);
		capacityFieldsetSection.add(plf.addBlank({}))
		capacityFieldsetSection.add(plf.addBlank({}))
		capacityFieldsetSection.add(plf.addBlank({}))
		capacityFieldsetSection.add(plf.addBlank({}))
		capacityFieldsetSection.add(capacityFieldset);  
		*/
		//Plan Details  Section Ends
		UnmappedGridSection = plf.addGrid(MaterialDetailsGridDtl2,this)	
		materialDetailsAct.add(UnmappedGridSection);
		//materialDetailsAct.add(UnmappedGridSection);
		//materialDetailsAct.add(unmappedShipmentsFormCtrl);	
		
		//Adding Grid to Plan Details Ends	
		

		
		ItemBasedColumn3 = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			ItemBasedCtrl3=
			[	
			    plf.addHlpText({"label":"Cost Center Code",id:"strCostCenterCode","mandatory":"true",hlpLinkID:"CostCenter"},this),	
				plf.addDisplayOnly({"label":"Cost Center Name",id:"strCostCenterName"}),
				plf.addDisplayOnly({"label":"Cost Object Type",id:"strCostObjType"}),
				plf.addDisplayOnly({"label":"Operation A/C No",id:"strOperAccNo"}),
			]
		
		}
		
		ItemBasedColumn3.add(ItemBasedCtrl3);
		
		
		ItemDetailsGridFieldObj3=
		[   
			{columnname:"Reference Document Type",dataname:"REF_DOC_TYPE",storeId:"strRefDocumentType",datatype:"string",width:200,editControl:"combo"},
			{columnname:"Reference Document No",dataname:"REF_DOC_NO",datatype:"string",editControl:"textbox",width:250},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:200}
		]
		ItemDetailsGridDtl3=
		{
			title:"",
			id:"refGrid",
			detail:ItemDetailsGridFieldObj3,
		
		}
		//ItemDetailsGridSection3 = plf.addGrid(ItemDetailsGridDtl3,this)	
		
		var passRefDocDtl =  plf.addCollapseSection({title:"Reference Details",collapsed:false})
		TransrequestGrid1Section = plf.addGrid(ItemDetailsGridDtl3,this)	
		passRefDocDtl.add(TransrequestGrid1Section)
        
		// SAP details section start		
		var SapBasedColumn4 = plf.addCollapseSection({title:"SAP Section",collapsed:false})
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			var SapBasedCtrl3=
			[					
				plf.addDisplayOnly({"label":"Origin",id:"strOriginLoc"}),
			    plf.addDisplayOnly({"label":"Destination",id:"strDestinationLoc"}),
				plf.addDisplayOnly({"label":"Error Status",id:"strErrorStatus"}),
				plf.addDisplayOnly({"label":"Notes",id:"strSapNotes"}),
				plf.addDisplayOnly({"label":"Well ID",id:"strWellID"}),
			    plf.addDisplayOnly({"label":"Well Name",id:"strWellName"}),
				plf.addDisplayOnly({"label":"Rig ID",id:"strSapRigId"}),
				plf.addDisplayOnly({"label":"Call Out Number",id:"strCallout"})
			]		
		}		
		SapBasedColumn4.add(SapBasedCtrl3);		
		// SAP details section end	
		
		//Add Notes Section 
		
		var freeTextEditor = plf.addCollapseSection({title:"Notes",collapsed: false },this);
		
		freeTextEditor.add({
                 xtype: "container",
                 layout: "column",
                 //cls: plf.getContainerCls(),
                 items: 
				 [						
						 Ext.create('Ext.form.field.TextArea', {
							itemId:"strNotes",
							label:"Body",
							height: 250,
							width:plf.screenWidth-120
						})
                 ]
             })
				//Add Child Sections
		
		mainpage.ptrMainSection.add(ItemBasedColumn1) 
		mainpage.ptrMainSection.add(ItemBasedColumn2)
		mainpage.ptrMainSection.add(ItemAction)
		
		mainpage.ptrMainSection.add(passRefDocDtl1)
		mainpage.ptrMainSection.add(materialDetailsAct)	
		//mainpage.ptrMainSection.add(capacityFieldsetSection)	
        mainpage.ptrMainSection.add(mappedShipmentDetails)	


	
		//mainpage.ptrMainSection.add(MaterialDetailsGridSection1)	
		//mainpage.ptrMainSection.add(weightColumn1)
       	//mainpage.ptrMainSection.add(MaterialDetailsGridSection2)
        //mainpage.ptrMainSection.add(weightColumn2)
        //mainpage.ptrMainSection.add(MaterialDetailsGridSection3)
        mainpage.ptrMainSection.add(ItemBasedColumn3)	
        mainpage.ptrMainSection.add(passRefDocDtl)	
		mainpage.ptrMainSection.add(SapBasedColumn4)
		mainpage.ptrMainSection.add(freeTextEditor)//Inserted New Section by Razhith and Manibharathi

		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strRequestNo","strRequestNoHid"],
				"service":"TMSCoreTransportTS",
				"methodName":"initItemBasedTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strRequestNo","dtRequestDate","strCommodity","strOrigin","strDestination","strDocNo","strCustomerCode",
				"strCustomerName","strContractType","strContractNo","dtPickUpDateTime","dtRosDateTime","strPriority","strWeightUom","strVolumeUom",
				"planDetail","actDetail","refGrid","strDemandStatus","strCostCenterCode","tmPickUpTime","tmROSTime","strRequestorId","strRequestorName","strReqMailId","strRemarks","strLogGroup","strDivCode","strVendorCode","strLoadAt","strNotes",
				"strAction","strVehCat","strVehRegNo","strVehCode","strRigNo","strDelvAt","strLoadDesc","strLoadNo","strPONum",
				"strActualWeight","strVenRefNo","iPoLineItem","strItemRemaks"],//71735 changes//73460 changes
				"service":"TMSCoreTransportTS",
				"methodName":"createItemBasedTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strRequestNo","dtRequestDate","strCommodity","strOrigin","strDestination","strDocNo","strCustomerCode",
				"strCustomerName","strContractType","strContractNo","dtPickUpDateTime","dtRosDateTime","strPriority","strWeightUom","strVolumeUom",
				"planDetail","actDetail","refGrid","strDemandStatus","strCostCenterCode","tmPickUpTime","tmROSTime","strRequestorId","strRequestorName","strReqMailId","strRemarks","strLogGroup","strDivCode","strVendorCode","strLoadAt","strNotes",
				"strAction","strVehCat","strVehRegNo","strVehCode","strRigNo","strDelvAt","strLoadDesc","strLoadNo","strPONum",
				"strActualWeight","strVenRefNo","iPoLineItem","strItemRemaks"],//71735 changes//73460 changes
				"service":"TMSCoreTransportTS",
				"methodName":"editItemBasedTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strRequestNo","dtRequestDate","strCommodity","strOrigin","strDestination","strDocNo","strCustomerCode",
				"strCustomerName","strContractType","strContractNo","dtPickUpDateTime","dtRosDateTime","strPriority","strWeightUom","strVolumeUom","strRigNo",//71735 changes
				"planDetail","actDetail","refGrid","strDemandStatus","strCostCenterCode","tmPickUpTime","tmROSTime","strRequestorId","strRequestorName","strReqMailId","strStatus","strRemarks","strLogGroup","strDivCode","strVendorCode","strLoadAt","strDelvAt","strLoadDesc","strLoadNo","strPONum",
				"strActualWeight","strVenRefNo","iPoLineItem","strItemRemaks"],
				"service":"TMSCoreTransportTS",
				"methodName":"deleteItemBasedTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["strRequestNo","dtRequestDate","strCommodity","strOrigin","strDestination","strDocNo","strCustomerCode",
				"strCustomerName","strContractType","strContractNo","dtPickUpDateTime","dtRosDateTime","strPriority","strWeightUom","strVolumeUom",
				"planDetail","actDetail","refGrid","strDemandStatus","strCostCenterCode","tmPickUpTime","tmROSTime","strRequestorId","strRequestorName","strReqMailId","strStatus","strRemarks","strLogGroup","strDivCode","strVendorCode","strLoadAt","strNotes",
				"strAction","strVehCat","strVehRegNo","strVehCode","strRigNo","strDelvAt","strLoadDesc","strLoadNoFrom","strLoadNo","strPONum",
				"strActualWeight","strVenRefNo","iPoLineItem","strItemRemaks"],//71735 changes//73460 changes
				"service":"TMSCoreTransportTS",
				"methodName":"authorizeItemBasedTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Short Close",
				"input":["strRequestNo","dtRequestDate","strCommodity","strOrigin","strDestination","strDocNo","strCustomerCode",
				"strCustomerName","strContractType","strContractNo","dtPickUpDateTime","dtRosDateTime","strPriority","strWeightUom","strVolumeUom","strRigNo",//71735 changes
				"planDetail","actDetail","refGrid","strDemandStatus","strCostCenterCode","tmPickUpTime","tmROSTime","strRequestorId","strRequestorName","strReqMailId","strRemarks","strLogGroup","strDivCode","strVendorCode","strLoadAt",
				"strAction","strVehCat","strVehRegNo","strVehCode","strDelvAt","strLoadDesc","strLoadNoFrom","strLoadNo","strPONum",
				"strActualWeight","strVenRefNo","iPoLineItem","strItemRemaks"],
				"service":"TMSCoreTransportTS",
				"methodName":"shortcloseItemBasedTS"
		},
		
		{
					"controlid":"strCustomerCode",
					"tasktype":"onenter",
					"input":["strCustomerCode"],
					"service":"TMSCoreTransportTS",
					"methodName":"onenterCustomerCodeTS"
		},
		/*
		{
					"controlid":"strCostCenterCode",
					"tasktype":"onenter",
					"input":["strCostCenterCode"],
					"service":"TMSCoreTransportTS",
					"methodName":"onenterCostCenterCodeTS"
		},*/
		{
					"controlid":"strRequestNo",
					"tasktype":"onenter",
					"input":["strRequestNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"onenterItemReqNoTS"
		},
		//71027,71738 changes
		{
					"controlid":"strDocNo",
					"tasktype":"onenter",
					"input":["strDocNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"onenterDocNoTS"
		},
			/*{
					"controlid":"strContractType",
					"tasktype":"onchange",
					"input":["strContractType","strCustomerCode"],
					"service":"TMSCoreTransportTS",
					"methodName":"fetchContractNoTS"
		},*/
		{
				"grideventid":"ITEM_CODE_ONENTER",
				"tasktype":"gridonenter",
				"input":["ITEM_CODE","ITEM_QTY"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchItemCodeTS"
			},

               {
				"grideventid":"QUANTITY_ONENTER",
				"tasktype":"gridonenter",
				"input":["TOT_VOLUME","TOT_WEIGHT","ITEM_QTY","ITEM_CODE"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchQuantityTS"
			},
			{
				"controlid":"strCostCenterCode",
				"tasktype":"onenter",
				"input":["strCostCenterCode"],
				"service":"CoreCostCenterService",
				"methodName":"fetchCostCentercargoTS"
			},
			{
				"controlid":"strAction",
				"tasktype":"onchange",
				"input":["strAction"],
				"service":"TMSCoreTransportTS",
				"methodName":"onchange_itemcargoAction"
			}

		];
		//Event Handlers Mapping Ends
			mainpage.hlpLinks=
		{
			"vehiclehlp":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strVehCode","child":"TRUCK_CODE"},
							{"parent":"strVehRegNo","child":"TRUCK_REG_NO"}
							]
				},
				"LoadNo":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.LoadBuildingHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strLoadNo","child":"LOAD_NO"}
							]
				},
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
				//71027,71738 changes
				"refdocno":
			    {
					"hlpType":"Header",
					"hlpScreen":"tms.DocNoHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strDocNo","child":"DO_NO"}
							]
				},
				"customerlink":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CustomerHelp",
					"send":[
							{"parent":"","child":""}
							//{"direct":"CUST_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strCustomerCode","child":"CUST_CODE"},
							{"parent":"strCustomerName","child":"CUST_NAME"}
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
							{"parent":"strCostCenterCode","child":"COST_CENTER_CODE"},
							{"parent":"strCostCenterName","child":"COST_CENTER_NAME"},
							{"parent":"strCostObjType","child":"COST_OBJECT_TYPE"},
							{"parent":"strOperAccNo","child":"OPERATIONS_ACC_NO"}
							]
				},
				"ItemCodePlan":
				{
					"hlpType":"grid",
					"gridID":"planDetail",
					"hlpScreen":"jm_master.ItemHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"ITEMACT_AC","child":"strContext"}
						   ],
					"receive":[
					{"parent":"ITEM_CODE","child":"ITEM_CODE"},
					{"parent":"ITEM_DESC","child":"ITEM_DESCRIPTION"},
                                   {"parent":"COMMODITY","child":"COMMODITY_TYPE"},
                                   {"parent":"ITEM_QTY_UOM","child":"STANDARD_UOM"}




							]
				},
				"ItemCodeAct":
				{
					"hlpType":"grid",
					"gridID":"actDetail",
					"hlpScreen":"jm_master.ItemHelp",
					"send":[
						    {"parent":"","child":""},
							{"direct":"ITEMACT_AC","child":"strContext"}
						   ],
					"receive":[
					{"parent":"ITEM_CODE","child":"ITEM_CODE"},
					{"parent":"ITEM_DESC","child":"ITEM_DESCRIPTION"},
                                   {"parent":"COMMODITY","child":"COMMODITY_TYPE"},
                                   {"parent":"ITEM_QTY_UOM","child":"STANDARD_UOM"}



							]
				}	
		}
		
		mainpage.screenLinks=
		{
		
			"fin_findet":
			{
				"dest":"finance.ReqFinanceDetails",
				/*
				"linkservice":
				{
					"input":["strRequestNo","strStatus"],
					"service":"FINCoreFinanceServiceTS",
					"methodName":"initReqDetailsTS"				
				},
				*/
				"hdr":[
						{"src":"strRequestNo","dest":"strRequestNo"},							
						{"src":"strStatus","dest":"strStatus"}
						/*
						{"src":"strDocNo","dest":"strRefDocNo"},
						{"src":"strOrigin","dest":"strOrigin"},
						{"src":"strDestination","dest":"strDestination"},
						{"src":"strCustomerCode","dest":"strCustCode"},
						{"src":"strPriority","dest":"strPriority"},
						{"src":"iActTotWeight","dest":"iTotWeight"},
						{"src":"iActTotVolume","dest":"iTotVolume"}
						*/
						],
				"grid":[
						{"src":"","dest":""}
						]
			}
			
		}
		
				/*mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":[]
			},
			"locked":
			{
				"enableAll":false,
				"except":["strDriverCode"]
			},
			"active":
			{
				"enableAll":false,
				"except":["strDriverPhoneNo","strNationalityId","strIvmsKeyNo","strRemarks","driverMapping","licenceMapping"]
			}				
		}*/
		//Generate Screen Section
		/*mainpage.generateScreen();
		
		
		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
		
	}
});
