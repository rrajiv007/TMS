/************************************************************************************************
Modification History        									                               	
************************************************************************************************
Description : SAP PO Details
Author      : Rajiv                                                       		         
Version     : 1.0.0
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/

Ext.define('CueTrans.view.GATEPASS.SAPPODtl',

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "SAP PO Details";
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;			
	    mainpage.toolbarLinks=
		[
						
		]
		//Tool bar Section begins
		mainpage.toolbarActions= 
		[
		    
		]
		//Tool bar Section ends		
		
		//Header Section 	
		plf.columns=4
		var HdrColumn = plf.addColumnSection({title:"PO Details"});			
		var HdrCtrl=						
		[	
			plf.addDisplayOnly({"label":"PO Number",id:"strPONumber"},this),
			plf.addDisplayOnly({"label":"PO Date",id:"dtPODate"}), 
			plf.addDisplayOnly({"label":"Vendor Number",id:"strVendorNo"}),	
			plf.addDisplayOnly({"label":"Vendor Name",id:"strVendorName"}),	
			plf.addDisplayOnly({"label":"Received Date",id:"dtReceived"}),			
			plf.addDisplayOnly({"label":"Received Time",id:"tmReceived"}),
			plf.addDisplayOnly({"label":"SAP PO Status",id:"strStatus"}),
			plf.addCombo({"label":"Amendment No",id:"strAmendmentNo"}),
			plf.addDisplayOnly({"label":"Amendment Date",id:"dtAmendmentNo"}),
			plf.addDisplayOnly({"label":"Amendment Time",id:"tmAmendmentNo"})			
		]
		HdrColumn.add(HdrCtrl);   
		
		/*** PO Item Details start here	*****/

		var ItemObj=							
		[
			{columnname:"PO Line Number",dataname:"SL_NO",datatype:"string",width:120},
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",width:150},
			{columnname:"Item Description",dataname:"ITEM_DESC",datatype:"string",width:200},
			{columnname:"Quantity",dataname:"QTY",datatype:"string",width:100}
		]
		var ItemDtl=								
		{
			title:"Item Details",
			id:"ItemDtl",
			detail:ItemObj,
			visibleRow:8,
			readonly:true,
			removeAddDelete:true
		}	
			 
		var  ItemSection = plf.addGrid(ItemDtl,this)	  
		/*** PO Item Details Ends here	*****/
		
		/*** Delivery Details start here	*****/

		var DeliveryObj=							
		[
			{columnname:"Vendor DO Number",dataname:"VENDOR_DO_NO",datatype:"string",width:150},
			{columnname:"Gate Pass Number",dataname:"GATE_PASS_NO",datatype:"string",width:150},
			{columnname:"Issued By",dataname:"ISSUED_BY",datatype:"string",width:150},
			{columnname:"Vehicle Number",dataname:"VEH_NO",datatype:"string",width:100},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:100},
			{columnname:"Driver Contact",dataname:"DRIVER_NO",datatype:"string",width:100},
			{columnname:"Vehicle In Date/Time",dataname:"VEH_IN_DT",datatype:"string",width:150},
			{columnname:"Vehicle Out Date/Time",dataname:"VEH_OUT_DT",datatype:"string",width:150},
			{columnname:"GR1 Date/Time",dataname:"GR1_DT",datatype:"string",width:150},
			{columnname:"QC Date/Time",dataname:"QC_DT",datatype:"string",width:150},
			{columnname:"GR2 Date/Time",dataname:"GR2_DT",datatype:"string",width:150},
			{columnname:"GI Date/Time",dataname:"GI_DT",datatype:"string",width:150}
		]
		var DeliveryDtl=								
		{
			title:"Delivery Details",
			id:"DeliveryDtl",
			detail:DeliveryObj,
			visibleRow:8,
			readonly:true,
			removeAddDelete:true
		}	
			 
		var  DeliverySection = plf.addGrid(DeliveryDtl,this)	  
		/*** Delivery Details Ends here	*****/
		
        //Main Page Section Starts

		mainpage.ptrMainSection.add(HdrColumn)
		mainpage.ptrMainSection.add(ItemSection)
		mainpage.ptrMainSection.add(DeliverySection)
		mainpage.dataHistorySectionFlag=false;
		
	    //Main Page Section ends
			
	    // Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
          {
				"controlid":"",
				"tasktype":"onload",
				"input":["strPONumber"],
				"service":"GPCoreServiceTS",
				"methodName":"initSAPPOTS"
			},
			{
				"controlid":"strAmendmentNo",
				"tasktype":"onchange",
				"input":["strPONumber","strAmendmentNo"],
				"service":"GPCoreServiceTS",
				"methodName":"SAPPOOnchangeAmendNoTS"
			},
 
		];
		
		
		this.callParent(arguments);
		
	}
});