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
Ext.define('CueTrans.view.tms.ShipmentItemConfirmation', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Shipment - Item Confirmation";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Refresh","Update Items","Confirm"]
		
		//Add Keyfields
		mainpage.keyFields=["strTransporReqNo"]
		//Driver Master Section Begins
		plf.columns=4
		var shipmentItemConfirmationColumn1 = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var shipmentItemConfirmationCtrl1=
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
				plf.addDisplayOnly({"label":"Weight UOM",id:"strWeightUom"}),
				plf.addDisplayOnly({"label":"Volume UOM",id:"strVolumeUom"}),
				
				plf.addHidden({id:"strRequestNoHid"})
								

			]
		
		}else
		{
		      shipmentItemConfirmationCtrl1=
			[	
			    plf.addHlpText({"label":"Shipment No",id:"strShippmentNo",hlpLinkID:"shipmentno"},this),	
				plf.addDate({"label":"Shipment Date",id:"dtShippmentDate"}),
				plf.addDisplayOnly({"label":"Transportation Request No",id:"strRequestNo"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
				plf.addDisplayOnly({"label":"Reference Doc No",id:"strDocNo"}),
				plf.addDisplayOnly({"label":"Demand status",id:"strDemandStatus"}),
				
				plf.addDisplayOnly({"label":"Priority",id:"strPriority"}),
				plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"}),
				plf.addDisplayOnly({"label":"Weight Uom",id:"strWeightUom"}),
				plf.addDisplayOnly({"label":"Volume Uom",id:"strVolumeUom"}),
				
				plf.addHidden({id:"strRequestNoHid"})
				]
		}
		
	
		shipmentItemConfirmationColumn1.add(shipmentItemConfirmationCtrl1); 
		
		var shipmentItemConfirmationBasedColumn2 = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			var shipmentItemConfirmationCtrl2=
			[	
			    plf.addDisplayOnly({"label":"Customer Code",id:"strCustomerCode"}),	
				plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
				plf.addDisplayOnly({"label":"Contract Type",id:"strContractType"}),
				plf.addDisplayOnly({"label":"Contract No",id:"strContractNo"}),
				
				plf.addDisplayOnly({"label":"Pickup Date",id:"dtPickUpDateTimeFrom"}),
				plf.addDisplayOnly({"label":"Pickup Time",id:"tmPickUpTime"}),
				plf.addDisplayOnly({"label":"ROS Date",id:"dtROSDateTimeFrom"}),
				plf.addDisplayOnly({"label":"ROS Time",id:"tmROSTime"})
				//plf.addDisplayOnly({"label":"Pickup Date Time To",id:"dtPickUpDateTimeTo"}),
				//plf.addDisplayOnly({"label":"ROS Date Time To",id:"dtROSDateTimeTo"})
			]
		
		}
		

		
		shipmentItemConfirmationBasedColumn2.add(shipmentItemConfirmationCtrl2);
		
		
		
		
		
		
		
//Plan Details Section Begins
		plf.columns=4
		
		var materialDetailsPlan = plf.addFieldSet({title:""})
	
		var MaterialDetailsGridFieldObj1=
		[   
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",width:80},
			{columnname:"Item Description",dataname:"ITEM_DESC",datatype:"string",width:250},
			{columnname:"Quantity",dataname:"ITEM_QTY",datatype:"string",width:80},
			{columnname:"Uom",dataname:"ITEM_QTY_UOM",datatype:"string",width:80},
			{columnname:"Weight",dataname:"WEIGHT",datatype:"string",width:80},
			{columnname:"Volume",dataname:"VOLUME",datatype:"string",width:80},
			{columnname:"Remaining Qty",dataname:"REMAINING_QTY",datatype:"string",width:120},
			{columnname:"Shipment Qty",dataname:"SHIPMENT_QTY",datatype:"string",width:120,editControl:"textbox"},
			{columnname:"Line_no",dataname:"LINE_NO",datatype:"string",width:80,hidden:true}
			
		]
		MaterialDetailsGridDtl1=
		{
			title:"Item Details",
			id:"itemdetailsGrid",
			detail:MaterialDetailsGridFieldObj1,
			removeAddDelete:true
		
		}
		var MaterialDetailsGridSection1 = plf.addGrid(MaterialDetailsGridDtl1,this)
		
		var CostCenterColumn = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var CostCenterCtrl3=
			[	
			    plf.addDisplayOnly({"label":"Cost Center Code",id:"strCostCenterCode"}),	
				plf.addDisplayOnly({"label":"Cost Center Name",id:"strCostCenterName"}),
				plf.addBlank(),
				plf.addDisplayOnly({"label":"Total Weight",id:"iActTotWeight"}),
				plf.addDisplayOnly({"label":"Cost Object Type",id:"strCostobjectType"}),
				plf.addDisplayOnly({"label":"Operation Account No",id:"strOperCodeNo"}),
				plf.addBlank(),
				plf.addDisplayOnly({"label":"Total Volume",id:"iActTotVolume"})
			]
		
		}
		
				
		CostCenterColumn.add(CostCenterCtrl3);
		mainpage.dataHistorySectionFlag=true;
        mainpage.ptrMainSection.add(shipmentItemConfirmationColumn1);
		mainpage.ptrMainSection.add(shipmentItemConfirmationBasedColumn2);
		mainpage.ptrMainSection.add(MaterialDetailsGridSection1);
		mainpage.ptrMainSection.add(CostCenterColumn);
		this.callParent(arguments);
		
	}
});
