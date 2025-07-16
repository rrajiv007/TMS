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
Ext.define('CueTrans.view.tms.ShipmentManifestSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Shipment Manifest Summary";
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
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"customercode"},this),			
			plf.addCombo({"label":"Status","id":"strStatus"}),
			
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addDateTime({"label":"Date From",dateid:"dtShippmentDateFrom",timeid:"dtShippmentTimeFrom"}),
			plf.addDateTime({"label":"Date To",dateid:"dtShippmentDateTo",timeid:"dtShippmentTimeTo"}),
			plf.addCombo({"label":"Demand Status",id:"strDemandStatus"}),
			
			plf.addCombo({"label":"Origin","id":"strOrigin"}),
			plf.addCombo({"label":"Destination","id":"strDestination"}),
			plf.addCombo({"label":"Priority",id:"strPriority"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity"}),
			
				
			plf.addHlpText({"label":"Cost Center Code",id:"strCostCenterCode",hlpLinkID:"CostCenter"},this),	
			plf.addCombo({"label":"Change Delivery Date",id:"strDelDtChgd"})
			//plf.addBlank(),
			//plf.addButton({"label":"Search","id":"btnSearch","tooltip":"Click here to search."}),

		]
		
		customerContractSummaryColumn.add(customerContractSummaryFormCtrl);
		
		
		var customerContractSummaryObj=
		[

                     //{columnname:"Click here to launch the change delivery date.",dataname:"CHANGE_SHIPMENT_NO",datatype:"string",width:130,linkId:"changeDelivery",imageURL:"resources/images/shared/calendar.gif"},
                     //{columnname:"Click here to launch the split itinerary.",dataname:"SPLIT_SHIPMENT_NO",datatype:"string",width:130,linkId:"splitItenary",imageURL:"resources/images/gridbar/append.png"},
                     {columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",width:120,linkId:"shipmentnolink",tooltip:"Click here to launch the shipment manifest screen."},
			//{columnname:"Shipment Date",dataname:"SHIPMENT_DATE",datatype:"string",width:100},
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
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
			
		]
		customerContractSummaryGridDetail=
		{
			title:"",
			id:"custContGrid",
			detail:customerContractSummaryObj,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true,
			"rowHighlight":true
			
		}
		var customerContractSummaryGridSection = plf.addGrid(customerContractSummaryGridDetail,this)	
		
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
					"strCostCenterCode","strDateType"],
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
					"dest":"tms.ShipmentManifest",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"SHIPMENT_NO","dest":"strShippmentNo"},
							{"src":"TRANS_REQ_NO","dest":"strRequestNo"}
							]
				}
					
				
						
		}	
		
		this.callParent(arguments);
		
	
	}
});
