Ext.define('CueTrans.view.tms.TransRequestItemConfirmation', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Transport Request - Item Confirmation";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Refresh","Update Items","Confirm"]
		
		//Add Keyfields
		mainpage.keyFields=["strTransporReqNo"]
		//Driver Master Section Begins
		plf.columns=4
		ItemBasedColumn1 = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			ItemBasedCtrl1=
			[	
			    plf.addHlpText({"label":"Transport Request No",id:"strRequestNo",hlpLinkID:"transrequestlink"},this),	
				plf.addDate({"label":"Transport Request Date",id:""}),
				plf.addText({"label":"Commodity",id:""}),
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
		else
		{
			ItemBasedCtrl1=
			[	
				plf.addHlpText({"label":"Transport Request No",id:"strRequestNo",hlpLinkID:"transrequestlink"},this),	
				plf.addDate({"label":"Transport Request Date",id:""}),
				plf.addText({"label":"Commodity",id:""}),
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
		}	
		
		
		ItemBasedColumn2 = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			ItemBasedCtrl2=
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
		else
		{
			ItemBasedCtrl2=
			[	
				plf.addListEdit({"label":"Customer Name",id:"strCustomerName",keyField:"strCustomerCode"},this),
				plf.addHlpText({"label":"Customer Code",id:"strCustomerCode","mandatory":"true",hlpLinkID:"customerlink"},this),	
				plf.addCombo({"label":"Contract Type",id:"strContractType","mandatory":"true"}),
				plf.addText({"label":"Contract No",id:"strContractNo","mandatory":"true"}),
				plf.addDate({"label":"Pickup Date",id:"dtPickUpDateTime"}),
				plf.addText({"label":"Pickup Time",id:"tmPickUpTime"}),
				plf.addDate({"label":"ROS Date ",id:"dtRosDateTime"}),
				plf.addText({"label":"ROS Time",id:"tmROSTime"})
				
				
			]
		}	

		
		materialDetailsPlan = plf.addFieldSet({title:""})
		//materialDetailsPlan = plf.addColumnSection({title:""});
		MaterialDetailsGridFieldObj1=
		[   
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",editControl:"textbox",width:140},
			{columnname:"Item Description",dataname:"ITEM_DESC",datatype:"string",editControl:"textbox",width:250},
			{columnname:"Quantity",dataname:"ITEM_QTY",datatype:"string",editControl:"textbox",width:200},
			{columnname:"UOM",dataname:"ITEM_QTY_UOM",datatype:"string",width:200,editControl:"combo",storeId:"strPlanQuantityUom"
			},
			{columnname:"Weight",dataname:"TOT_WEIGHT",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Volume",dataname:"TOT_VOLUME",datatype:"string",editControl:"textbox",width:150},
		]
		MaterialDetailsGridDtl1=
		{
			title:"Item Details",
			id:"planDetail",
			detail:MaterialDetailsGridFieldObj1,
		
		}
		
		CostCenterColumn = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			CostCenterCtrl3=
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
		
		mainpage.hlpLinks=
		{
			"transrequestlink":
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
		
		itemGridSection = plf.addGrid(MaterialDetailsGridDtl1,this)	
		materialDetailsPlan.add(itemGridSection);
		
		ItemBasedColumn1.add(ItemBasedCtrl1); 
		ItemBasedColumn2.add(ItemBasedCtrl2);
		
		mainpage.ptrMainSection.add(ItemBasedColumn1);
		mainpage.ptrMainSection.add(ItemBasedColumn2);
		mainpage.ptrMainSection.add(materialDetailsPlan);
		mainpage.ptrMainSection.add(CostCenterColumn);
		this.callParent(arguments);
		
	}
});
