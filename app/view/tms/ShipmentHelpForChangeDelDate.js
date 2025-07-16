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
Ext.define('CueTrans.view.tms.ShipmentHelpForChangeDelDate', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.hlpSectionFlag=true; 
		mainpage.startPainting();
		mainpage.screenName = "Shipment List";		
		/*mainpage.toolbarLinks=
		[
			{"name":"Create Shipment","linkid":"carrierContract"}
		]*/		
		
		//Truck Master Section starts

		var formCtrl=[];
		plf.columns=3
		var customerContractSummaryColumn = plf.addColumnSection({title:"", collapsed: false});	
		
		
		var customerContractSummaryFormCtrl=
		[
			plf.addText({"label":"Shipment No",id:"strShippmentNoFrom","anywhereSearch":"true"}),
			plf.addText({"label":"Request No",id:"strRequestNo","anywhereSearch":"true"}),				
			plf.addCombo({"label":"Status","id":"strStatus"}),			
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"customercode"},this),			
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addDateTime({"label":"Date From",dateid:"dtShippmentDateFrom",timeid:"dtShippmentTimeFrom"}),
			plf.addDateTime({"label":"Date To",dateid:"dtShippmentDateTo",timeid:"dtShippmentTimeTo"}),
			plf.addCombo({"label":"Demand Status",id:"strDemandStatus"}),			
			plf.addCombo({"label":"Origin","id":"strOrigin"}),
			plf.addCombo({"label":"Destination","id":"strDestination"}),
			plf.addCombo({"label":"Priority",id:"strPriority"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity"}),				
			plf.addHlpText({"label":"Cost Center Code",id:"strCostCenterCode",hlpLinkID:"CostCenter"},this),	
			plf.addCombo({"label":"Change Delivery Date",id:"strDelDtChgd"}),
			plf.addText({"label":"Ref Doc No",id:"strDocNo","anywhereSearch":"true"}),
			////***********79507 -Vidhya Added 6 Jun 2017*******************//
			plf.addText({"label":"PO No",id:"strPONum"}),
			plf.addCombo({"label":"Vendor Name",id:"strVendorName"}),
			plf.addText({"label":"Load No",id:"strLoadNo"}),
			plf.addBlank(),
			plf.addButton({"label":"Search","id":"btnSearch","tooltip":"Click here to search."})
		]
		
		customerContractSummaryColumn.add(customerContractSummaryFormCtrl);
		
		
		var customerContractSummaryObj=
		[
			{columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",width:120},	
            {columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:120},			
			{columnname:"Request No",dataname:"TRANS_REQ_NO",datatype:"string",width:120},
			{columnname:"Request<br>Date",dataname:"TARNS_REQ_DATE",datatype:"string",width:80},
			{columnname:"Requestor<br>ID",dataname:"REQUESTOR_ID",datatype:"string",width:80},
            {columnname:"Requestor<br>Name",dataname:"REQUESTOR_NAME",datatype:"string",width:80},
			{columnname:"Customer<br>Code",dataname:"CUST_CODE",datatype:"string",width:60},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:80},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:80},			
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:80},			              
			{columnname:"Priority",dataname:"PRIORITY",datatype:"string",width:60},
			{columnname:"Delivery<br>Date",dataname:"ROS_DATE_TIME",datatype:"string",width:80},
			{columnname:"Changed<br>Delivery<br>Date",dataname:"NEW_DEL_DATE",datatype:"string",width:80},
			{columnname:"Delivery Date<br>Change Reason",dataname:"DELDATEREASON",datatype:"string",width:80},
			{columnname:"Shipped<br>Date",dataname:"SHIPPED_DATE",datatype:"string",width:80},
			{columnname:"Delivered Date",dataname:"ROS_DATE",datatype:"string",width:80},
			{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:80},
			{columnname:"Weight<BR>(ton)",dataname:"TOT_WEIGHT",width:60,colAlign:'right',weightPrecision:3},
			{columnname:"Volume<BR>(cu.m)",dataname:"TOT_VOLUME",width:60,colAlign:'right',weightPrecision:3},
			{columnname:"Created<BR>Type",dataname:"CREATED_TYPE",datatype:"string",width:80},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100},
			{columnname:"UOM",dataname:"UOM",datatype:"string",width:100},
			{columnname:"Quantity",dataname:"Quantity",width:100,inputFormat:"numeric",weightPrecision:2},
			 ////***********79507 -Vidhya Added 6 Jun 2017*******************//
            {columnname:"PO No",dataname:"PO_NO",datatype:"string",width:100},
            {columnname:"Vendor Name",dataname:"VENDOR_NAME",datatype:"string",width:100} ,
			
		]
		customerContractSummaryGridDetail=
		{
			title:"",
			id:"custContGrid",
			detail:customerContractSummaryObj,
			visibleRow:5,
			removeAddDelete:true,
			removePaging:true
			
		}
		var customerContractSummaryGridSection = plf.addGrid(customerContractSummaryGridDetail,this)	
		mainpage.hlpSearchGridPtr = customerContractSummaryGridSection
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(customerContractSummaryColumn)
		mainpage.ptrMainSection.add(customerContractSummaryGridSection) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		mainpage.eventHandlers = 
			[	
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
					"strCostCenterCode","strDateType","strDocNo","strLoadNo","strPONum","strVendorName"],
					"service":"TMSCoreTransportTS",
					"methodName":"initShippmentSummarySearchScrTS"
			}	
			];
				this.callParent(arguments);
		
	
	}
});
