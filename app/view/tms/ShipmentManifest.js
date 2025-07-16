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
Ext.define('CueTrans.view.tms.ShipmentManifest', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Shipment Manifest";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		
		mainpage.toolbarActions= [
			{
                "name": "Confirm Manifest",
                "tooltip": "Click here to confirm shipment manifest."
            }
            ]


		plf.columns=4
		var ShipmentHdrColumn = plf.addColumnSection({});
		var ShipmentHdrCtrl=
			[	
			    plf.addDisplayOnly({"label":"Shipment No",id:"strShippmentNo",keyField:"strShippmentNo"},this),
				plf.addDisplayOnly({"label":"Request No",id:"strRequestNo"}),
				plf.addDisplayOnly({"label":"Request Date",id:"dtRequestDate"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
				plf.addText({"label":"Ref Doc No",id:"strDocNo","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Demand status",id:"strDemandStatus"}),
				plf.addDisplayOnly({"label":"Priority",id:"strPriority"}),
				plf.addDisplayOnly({"label":"Requestor ID",id:"strRequestorId"}),
				plf.addDisplayOnly({"label":"Requestor Name",id:"strRequestorName"}),
				plf.addDisplayOnly({"label":"Requestor Email",id:"strRequestormail"}),
				plf.addDisplayOnly({"label":"Customer Code",id:"strCustomerCode"}),	
				plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
				plf.addDisplayOnly({"label":"Pickup Date/Time",id:"dtPickUpDateTimeFrom"}),
				plf.addDisplayOnly({"label":"Delivery Date/Time",id:"dtROSDateTimeFrom"}),
				plf.addHlpText({"label":"Cost Center Code",id:"strCostCenterCode","mandatory":"true",hlpLinkID:"CostCenter"},this),
				plf.addDisplayOnly({"label":"Cost Center Name",id:"strCostCenterName"}),
				plf.addDisplayOnly({"label":"Cost Object Type",id:"strCostObjType"}),
				plf.addDisplayOnly({"label":"Operation A/C No",id:"strOperAccNo"}),
				plf.addHidden({id:"strRequestNoHid"}),
				plf.addHidden({id:"strShipmentNoHid"}),
				plf.addHidden({id:"strChildShipmentid"})
			]
		
		ShipmentHdrColumn.add(ShipmentHdrCtrl)
		
		
		var ShipmentHdrCol = plf.addColumnSection({title:""});
		var ShipmentGridFieldObj=
		[   
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",editControl:"textbox",width:120,helpid:'ItemCodePlan',"onenter":"ITEM_CODE_ONENTER"},
			{columnname:"Item Description",dataname:"ITEM_DESC",datatype:"string",width:200},
            {columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:100},
			{columnname:"Quantity",dataname:"ITEM_QTY",datatype:"string",editControl:"textbox",width:80,"onenter":"QUANTITY_ONENTER",colAlign:'right'},
			{columnname:"UOM",dataname:"ITEM_QTY_UOM",datatype:"string",width:100,storeId:"strPlanQuantityUom"},
			{columnname:"Weight<BR>(ton)",dataname:"TOT_WEIGHT",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Volume<BR>(cu.m)",dataname:"TOT_VOLUME",datatype:"string",width:100,colAlign:'right',volumePrecision:3},
			{columnname:"Action",dataname:"ACTION",datatype:"string",width:200,editControl:"combo"}
		]
		ShipmentGridDtl=
		{
			title:"Item Details",
			id:"ShipmentDtlCache",
			detail:ShipmentGridFieldObj,
			visibleRow:10
		}
		var ShipmentGridSection = plf.addGrid(ShipmentGridDtl,this)
		
		mainpage.ptrMainSection.add(ShipmentHdrColumn) 
		mainpage.ptrMainSection.add(ShipmentGridSection)
				
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		/*mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strShiftCode"],
				"service":"",
				"methodName":"initShiftMasterTS"
		},
		{
				"controlid":"strShiftCode",
				"tasktype":"onenter",
				"input":["strShiftCode"],
				"service":"",
				"methodName":"fetchShiftMasterTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["strShiftCode","strShiftDesc","strDayType","ShipmentDtlCache"],
				"service":"",
				"methodName":""
		}	
		];
		
		
			mainpage.hlpLinks=
		{
			"ShipmentScreenHelp":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.ShiftMasterHelp",
					"send":[
							{"parent":"strShiftCode","child":"strShiftCode"}
						   ],
					"receive":[
							{"parent":"strShiftCode","child":"SHIFT_CODE"}
							]
				}
				
		}*/
		
		this.callParent(arguments);
		
	}
});