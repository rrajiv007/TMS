/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.2															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Manibharathi	04/02/2016      69952					Status Combo Alignment
1.0.2	 	Manibharathi	05/02/2016    	69997                         Addition of var                 
************************************************************************************************/
Ext.define('CueTrans.view.track.ShipmentTracking', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Shipment Tracking Summary";
		//Vehicle Demand Planning Search Section Begins
		plf.columns=4
		var helpOnTrackTraceHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);	//69997
        mainpage.toolbarSectionFlag=true;	
		
			mainpage.toolbarLinks=
		[
			//{"name":"Shipment Tracking Details","linkid":"trk_ShipTrack"},
			{"name":"Request Tracking Summary","linkid":"trk_requestsTrack"}
		]
	 	var helpOnTrackTraceFormCtrl=																		//69997
		[
			plf.addText({"label":"Shipment No",id:"strShippmentNoFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Shipment No To",id:"strShippmentNoTo","anywhereSearch":"true"}),
			plf.addHlpText({"label":"Load No",id:"strLoadNo",hlpLinkID:"loadhelp"},this),	
			plf.addHlpText({"label":"Request No",id:"strRequestNo",hlpLinkID:"requesthelp"},this),	
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Ref Doc No",id:"strRefDocNo"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity"}),
			plf.addHlpText({"label":"Item Code",id:"strItemCode",hlpLinkID:"itemhelp"},this),	
			plf.addCombo({"label":"Region",id:"strRegion"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addCombo({"label":"Priority",id:"strPriority"}),
			plf.addText({"label":"Vendor Name",id:"strVendorId"}),
			//plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"customercode"},this),	
			plf.addCombo({"label":"Date Type",id:"strDateType"}),
			plf.addDate({"label":"Date From","id":"dtShippmentDateFrom"}),
			plf.addDate({"label":"Date To","id":"dtShippmentDateTo"})
		
			//plf.addBlank(),
			//plf.addBlank(),
			//plf.addButton({"label":"Track Shipments",id:"searchBtn","tooltip":"Click here to track the shipments."}),
			//plf.addBlank(),
		]
		
		helpOnTrackTraceHdrCollapse.add(helpOnTrackTraceFormCtrl);
		//Driver Search Section Ends
		
		//Driver Grid Section Begins
		var customerContractSummaryObj=													//69997
		[
			//{columnname:"Request No",dataname:"TRANS_REQ_NO",datatype:"string",width:150,linkId:"reqnolink",tooltip:"Click here to launch the shipment tracking details screen."},
			//{columnname:"Request Date",dataname:"REQUEST_DATE",datatype:"string",width:100},
			{columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",width:150,linkId:"shipnolink",tooltip:"Click here to launch the shipment tracking details screen."},
			{columnname:"Delivery Date & Time",dataname:"DELIVERY_DATE",datatype:"string",width:140},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:130},
			{columnname:"Shipped Date & Time",dataname:"SHIPPED_DATE",datatype:"string",width:140},
			{columnname:"Delivered Date & Time",dataname:"DELIVERED_DATE",datatype:"string",width:140},
			//{columnname:"Delivered Time",dataname:"DELIVERED_TIME",datatype:"string",width:150},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:120},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:120},
			//{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:80,linkId:"jpnolink",tooltip:"Click here to launch the journey plan screen."},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:80,linkId:"loadnolink",tooltip:"Click here to launch the load planning screen."},
			{columnname:"Request No",dataname:"REQUEST_NO",datatype:"string",width:100},
			{columnname:"Ref Doc No",dataname:"REF_DOC_NO",datatype:"string",width:100},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:100},
			{columnname:"Item Count",dataname:"ITEM_COUNT",datatype:"string",width:100},
			{columnname:"Item Quantity",dataname:"ITEM_QTY",datatype:"string",width:100},
			{columnname:"Created Date",dataname:"CREATED_DATE",datatype:"string",width:100},
			{columnname:"Vendor Name",dataname:"VENDOR_CODE",datatype:"string",width:100}

			//{columnname:"Customer Name",dataname:"CUST_NAME",datatype:"string",width:130},
			//{columnname:"Time Saved/Lost",dataname:"TIME_SAVED_LOST",datatype:"string",width:100},
			
		]
		helpOnTrackTraceGridDtl=
		{
			title:"",
			id:"custContGrid",
			detail:customerContractSummaryObj,
			removeAddDelete:true,
			visibleRow:plf.searchVisibleRows,
			readOnly:true
		   }
		var helpGridSection = plf.addGrid(helpOnTrackTraceGridDtl,this)					//69997
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
				"methodName":"initShipTrackSearchScrTS"
			},	
		{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strShippmentNoFrom","strLoadNo","strStatus","strRequestNo","strRefDocNo","strCommodity","strItemCode","strRegion","strOrigin","strDestination","strPriority","strCustomerCode","strDateType","dtShippmentDateFrom","dtShippmentDateTo","strVendorId"],
			    "service":"TMSCoreTransportTS",
				"methodName":"fetchAllShipTrackSearchTS"
		}
			
		];
		mainpage.screenLinks=
		{
				"trk_ShipTrack":
				{
					"dest":"track.ShipmentTrackingDetails",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
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
				"itemlink":
				{
					"dest":"track.ItemDetails",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"SHIPMENT_NO","dest":"strShippmentNo"}
							]
				},
				"trk_requestsTrack":
				{
					"dest":"track.RequestTracking",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"jpnolink":
				{
					"dest":"journey_management.JourneyPlanUpdateTms",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"JP_NO","dest":"strJourneyPlanNo"}
							]
				},

				"loadnolink":
				{
					"dest":"tms.LoadBuilding",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"LOAD_NO","dest":"strLoadNo"}
							]
				}

		
		}
		mainpage.hlpLinks=
		{			
				"customercode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CustomerHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCustomerCode","child":"CUST_CODE"}
							]
				},
					
				"loadhelp":
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
				"itemhelp":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.ItemHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strItemCode","child":"ITEM_CODE"}
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
