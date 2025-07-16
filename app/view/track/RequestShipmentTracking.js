/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Steffie		 18/10/2016    	74637	  
1.0.2    Divya           6/6/2017       79508                                    
************************************************************************************************/
Ext.define('CueTrans.view.track.RequestShipmentTracking', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Request and Shipment Tracking";
		//Vehicle Demand Planning Search Section Begins
		plf.columns=4
		var helpOnTrackTraceHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: false,btnID:"searchBtn"},this);	//69997
        mainpage.toolbarSectionFlag=true;	
		
	 	var helpOnTrackTraceFormCtrl=												//69997
		[   
		    plf.addHlpText({"label":"Shipment No",id:"strShippmentNo",hlpLinkID:"shipmenthelp"},this),	
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addCombo({"label":"Shipment Status",id:"strStatus"}),
			plf.addHlpText({"label":"Request No",id:"strRequestNoFrom",hlpLinkID:"requesthelp"},this),
			plf.addCombo({"label":"From Region",id:"strFromRegion"}),
			plf.addCombo({"label":"To Region",id:"strToRegion"}),
			plf.addText({"label":"Ref Doc No",id:"strRefDocNo"}),
			plf.addCombo({"label":"Priority",id:"strPriority"}),
			plf.addHlpText({"label":"Cost Center Code",id:"strCostCenterCode",hlpLinkID:"CostCode"},this),
			plf.addCombo({"label":"Vendor Name",id:"strVendorId"}),	//79508
			plf.addText({"label":"Load No",id:"strLoadNo"}),	
			plf.addCombo({"label":"Commodity",id:"strCommodity"}),
			plf.addCombo({"label":"Date Type",id:"strDateType"}),
			plf.addDate({"label":"Date From","id":"dtShippmentDateFrom"}),
			plf.addDate({"label":"Date To","id":"dtShippmentDateTo"}),
			plf.addText({"label":"PO No",id:"strPONum"}) //79508
			
		]
		
		helpOnTrackTraceHdrCollapse.add(helpOnTrackTraceFormCtrl);
		
		var customerContractSummaryObj=												//69997
		[
			
			{columnname:"Request No",dataname:"REQUEST_NO",datatype:"string",width:150,linkId:"reqnolink",tooltip:"Click here to launch the request tracking details screen."},
			{columnname:"Shipment Status",dataname:"STATUS",datatype:"string",width:130},
			{columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",width:150,linkId:"shipnolink",tooltip:"Click here to launch the shipment tracking details screen."},
			{columnname:"Ref Doc No",dataname:"REF_DOC_NO",datatype:"string",width:100,linkId:"itemlink",gridpopup:true,tooltip:"Click here to launch the Item details against Ref Doc No  screen."},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:100},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:100},
			
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:100},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:100},
			{columnname:"From Region",dataname:"FROM_REGION",datatype:"string",width:100},
			{columnname:"To Region",dataname:"TO_REGION",datatype:"string",width:100},
			{columnname:"Priority",dataname:"PRIORITY",datatype:"string",width:100},
			{columnname:"Cost Center Code",dataname:"COST_CENT",datatype:"string",width:130},
			{columnname:"Vendor Name",dataname:"VENDOR_ID",datatype:"string",width:130},
			{columnname:"Customer Name",dataname:"CUST_NAME",datatype:"string",width:130},
			{columnname:"Created Date",dataname:"CREATED_DATE",datatype:"string",width:100},
			{columnname:"PickUp Date",dataname:"PICKUP_DATE",datatype:"string",width:150},
			{columnname:"Contractual Delivery Date",dataname:"CON_DELIVERY_DATE",datatype:"string",width:150},
			{columnname:"Delivered Date",dataname:"DELIVERED_DATE",datatype:"string",width:150},
			{columnname:"PO Number",dataname:"PO_NUM",datatype:"string",width:150} //79508
			
		]
		helpOnTrackTraceGridDtl=
		{
			title:"",
			id:"reqtrackGrid",
			detail:customerContractSummaryObj,
			removeAddDelete:true,
			visibleRow:plf.searchVisibleRows,
			readOnly:true
		   }
		var helpGridSection = plf.addGrid(helpOnTrackTraceGridDtl,this)						//69997
		//Driver Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnTrackTraceHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initReqShipTrackSrchTS"
			},	
		{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strRequestNoFrom","strRequestNoTo","strLoadNo","strStatus","strShippmentNo","strRefDocNo","strCommodity","strItemCode","strRegion","strOrigin","strFromRegion","strToRegion","strCostCenterCode",
				"strDestination","strPriority","strCustomerCode","strDateType","dtShippmentDateFrom","dtShippmentDateTo","strVendorId","strPONum"],
			    "service":"TMSCoreTransportTS",
				"methodName":"fetchReqShpTrackSearchTS"
		}			
		];
		mainpage.screenLinks=
		{
			"shipnolink":
				{
					"dest":"track.ShipmentTrackingDetails",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"SHIPMENT_NO","dest":"strShippmentNo"}
							]
				},	
			"reqnolink":
				{
					"dest":"track.RequestTrackingDetails",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"REQUEST_NO","dest":"strRequestNo"}
							]
				}



		
		}

             mainpage.gridPopupLinks=
		{
			
			"itemlink":
			{
				"dest":"tms.shipment_itemdt2",
				"popMethodName":"initRefDocItemSearchTS",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"REF_DOC_NO","dest":"selChartSeries"}
						]
			}
		}
		mainpage.hlpLinks=
		{			
				"CostCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CostCenterHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCostCenterCode","child":"COST_CENTER_CODE"}
							]
				},
					
				/*"loadhelp":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.LoadBuildingHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strLoadNo","child":"LOAD_NO"}
							]
				},*/
				"requesthelp":
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
				"shipmenthelp":
				{
					
					"hlpType":"Header",
					"hlpScreen":"tms.ShipmentHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strShippmentNo","child":"SHIPMENT_NO"}
							]
				}
					
		}	
			
		//Event Handlers Mapping Ends
			
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
