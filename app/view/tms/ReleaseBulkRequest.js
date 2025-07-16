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
Ext.define('CueTrans.view.tms.ReleaseBulkRequest', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Process Bulk Request";
		
		
		plf.columns = 3
		var bulkReleaseHdr = plf.addColumnSection({});
		
		if(plf.defaultLayout==4)
		{
		plf.columns=4
		var bulkReleaseFormCtrl=
		[
			plf.addDate({"label":"Pick Up Date From",id:"dtPickUpDateFrom"}),
			plf.addDate({"label":"Pick Up Date To",id:"dtPickUpDateTo"}),
			plf.addDate({"label":"Delivery Date From",id:"dtDelDateFrom"}),
			plf.addDate({"label":"Delivery Date To",id:"dtDelDateTo"}),
			
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity"}),
			plf.addBlank(),
			
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"customerlink"},this),
			plf.addText({"label":"Ref Doc No",id:"strDocNo"}),
			plf.addBlank(),
			plf.addBlank(),
			
			plf.addBlank(),
			plf.addButton({"label":"Get Details",id:"getDetailsBtn"}),
			plf.addBlank(),
			plf.addBlank(),
		]
		}
		else
		{
		  bulkReleaseFormCtrl=
		[
			
			plf.addDate({"label":"Pick Up Date From",id:"dtPickUpDateFrom"}),
			plf.addDate({"label":"Pick Up Date To",id:"dtPickUpDateTo"}),
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"customerlink"},this),
			
			plf.addDate({"label":"Delivery Date From",id:"dtDelDateFrom"}),
			plf.addDate({"label":"Delivery Date To",id:"dtDelDateTo"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity"}),
			
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addText({"label":"Ref Doc No",id:"strDocNo"}),
			
			plf.addBlank(),
			plf.addButton({"label":"Get Details",id:"getDetailsBtn"}),
			plf.addBlank()
			
			
		]
		}
		bulkReleaseHdr.add(bulkReleaseFormCtrl);
	
		var bulkReleaseGrid = plf.addColumnSection({title:"Request Details"})
		var bulkReleaseObj=
		[   
			{columnname:"Error Message",dataname:"ERRORMSG",datatype:"string",width:100},
			{columnname:"Customer Code",dataname:"CUST_CODE",datatype:"string",width:80,helpid:'customerlink',"onenter":"CUST_CODE_ONENTER",editControl:"textbox"},
			{columnname:"Customer<br>Name",dataname:"CUST_NAME",datatype:"string",width:100},
           	{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:90,editControl:"textbox"},
			{columnname:"Priority",dataname:"PRIORITY",datatype:"string",width:80,editControl:"combo",storeId:"strPriority"},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:80,storeId:"strOrigin",editControl:"textbox"},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:80,storeId:"strDestination"},
			{columnname:"Pickup Date",dataname:"PICK_UP_DATE_TIME",datatype:"string",editControl:"date",width:80},
			{columnname:"Pickup<br>Time",dataname:"PICK_UP_TIME",datatype:"string",editControl:"textbox",width:80},
			{columnname:"Delivery<br>Date",dataname:"ROS_DATE_TIME",datatype:"string",editControl:"date",width:80},
			{columnname:"Delivery<br>Time",dataname:"ROSTIME",datatype:"string",editControl:"textbox",width:80},
			{columnname:"Contract<br>Type",dataname:"CONTRACT_TYPE",datatype:"string",width:80},
			{columnname:"Contract<br>No",dataname:"CONTRACT_NO",datatype:"string",width:80},
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",editControl:"textbox",width:80,"onenter":"ITEM_CODE_ONENTER",helpid:'itemlink'},
			{columnname:"Item<br>Description",dataname:"ITEM_DESC",datatype:"string",width:80},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:80},
			{columnname:"Qty",dataname:"ITEM_QTY",datatype:"string",editControl:"textbox",width:80},
			{columnname:"UOM",dataname:"ITEM_QTY_UOM",datatype:"string",width:80},
			{columnname:"Weight",dataname:"TOT_WEIGHT",datatype:"string",editControl:"textbox",width:80},
			{columnname:"UOM",dataname:"TOT_WEIGHT_UOM",datatype:"string",editControl:"combo",width:80,storeId:"strTotWgtUom"},
			{columnname:"Volume",dataname:"TOT_VOLUME",datatype:"string",editControl:"textbox",width:80},
			{columnname:"UOM",dataname:"TOT_VOLUME_UOM",datatype:"string",editControl:"combo",width:80,storeId:"strTotVolUom"},
			{columnname:"Cost Center<br>Code",dataname:"COST_CENTER_CODE",datatype:"string",editControl:"textbox",width:80,helpid:'costcenterlink',"onenter":"COST_CENTER_CODE_ONENTER"},
			{columnname:"Request No",dataname:"TRANS_REQ_NO",datatype:"string",editControl:"textbox",width:80},
			{columnname:"Maximum Amendment No",dataname:"AMENDMENT_NO",datatype:"string",editControl:"textbox",width:80},
			{columnname:"Line No",dataname:"LINE_NO",datatype:"string",editControl:"textbox",width:80}
			
		]
		bulkReleaseGridDt=
		{
			title:"Request Details",
			id:"bulkRequest",
			detail:bulkReleaseObj,
		}
		
        plf.columns = 3
		var bulkReleaseReqHdr = plf.addColumnSection({});
		
		
		var bulkReleaseReqFormCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Release",id:"releaseBtn"}),
		  plf.addBlank()
		 ] 
		var BulkRelReqGridSection = plf.addGrid(bulkReleaseGridDt,this)
		 bulkReleaseReqHdr.add(bulkReleaseReqFormCtrl)
		
		mainpage.ptrMainSection.add(bulkReleaseHdr)
		mainpage.ptrMainSection.add(BulkRelReqGridSection)
		mainpage.ptrMainSection.add(bulkReleaseReqHdr)
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initProcessBulkReqTS"
			},
			{
			   "controlid":"getDetailsBtn",
				"tasktype":"btnclick",
				"input":["dtPickUpDateFrom","dtPickUpDateTo","dtDelDateFrom","dtDelDateTo",
				 "strOrigin","strDestination","strCommodity","strCustomerCode","strDocNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchProcessBulkReqTS"
			},
			{
				"controlid":"releaseBtn",
				"tasktype":"btnclick",
				"input":["bulkRequest","dtPickUpDateFrom","dtPickUpDateTo","dtDelDateFrom","dtDelDateTo",
				 "strOrigin","strDestination","strCommodity","strCustomerCode","strDocNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"releaseReqTS"
			}
			
			
		];
		
		mainpage.hlpLinks=
		{			
				"customerlink":
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
				"itemlink":
				{
					"hlpType":"grid",
					"gridID":"bulkRequest",
					"hlpScreen":"jm_master.ItemHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					{"parent":"ITEM_CODE","child":"ITEM_CODE"},
					{"parent":"ITEM_DESC","child":"ITEM_DESCRIPTION"},
                                   {"parent":"COMMODITY","child":"COMMODITY_TYPE"},
                                   {"parent":"ITEM_QTY_UOM","child":"STANDARD_UOM"}



							]
				}
					
		}		
	
		
	
		
		this.callParent(arguments);
		
	}
});
