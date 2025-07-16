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
Ext.define('CueTrans.view.tms.BulkRequest', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Create Bulk Request";
		
		mainpage.toolbarSectionFlag=true;
		
		mainpage.toolbarActions= [{
                "name": "Create",
                "tooltip": "Click here to create a bulk request."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit the bulk request."
            },
			{
                "name": "Delete",
                "tooltip": "Click here to delete the bulk request."
            },
            {
                "name": "Confirm",
                "tooltip": "Click here to confirm the bulk request."
            },
            {
                "name": "Amend",
                "tooltip": "Click here to amend the bulk request."
            },
            {
                "name": "Short close",
                "tooltip": "Click here to short close the bulk request."
            }
            ]
			
		
		
		mainpage.toolbarLinks=
		[
		  {"name":"Process Bulk Request","linkid":"tms_procblkrequest","tooltip":"Click here to process the bulk request."}
		]	
			
	//	mainpage.toolbarActions=["Create","Edit","Delete","Confirm","Amend","Short close"]
		
			
		plf.columns = 3
		 var bulkHdr = plf.addColumnSection({});
		
		if(plf.defaultLayout==4)
		{
		plf.columns=4
		var bulkFormCtrl=
		[
			plf.addHlpText({"label":"Bulk Request No",id:"strRequestNo",hlpLinkID:"bulkreqno"},this),
			plf.addDate({"label":"Transaction Date",id:"dtRequestDate","mandatory":"true"}),
			plf.addText({"label":"Bulk Ref Doc No",id:"strDocNo","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Amendment No",id:"iAmendmentNo"})
		]
		}
		else
		{
		  bulkFormCtrl=
		[
			
			plf.addHlpText({"label":"Bulk Request No",id:"strRequestNo",hlpLinkID:"bulkreqno"},this),
			plf.addDate({"label":"Transaction Date",id:"dtRequestDate","mandatory":"true"}),
			plf.addText({"label":"Bulk Ref Doc No",id:"strDocNo","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Amendment No",id:"iAmendmentNo"})
		]
		}
		bulkHdr.add(bulkFormCtrl);
		
		plf.columns=4
		 var bulkGrid = plf.addColumnSection({title:"Request Details"})
		bulkGridFieldObj1=
		[   
			{columnname:"Customer Code",dataname:"CUST_CODE",datatype:"string",editControl:"textbox",width:80,helpid:'customerlink',"onenter":"CUST_CODE_ONENTER"},
			{columnname:"Customer<br>Name",dataname:"CUST_NAME",datatype:"string",width:100},
           	{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:90,editControl:"textbox"},
			{columnname:"Priority",dataname:"PRIORITY",datatype:"string",width:100,editControl:"combo",storeId:"strPriority"},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",editControl:"combo",width:100,storeId:"strOrigin"},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",editControl:"combo",width:100,storeId:"strDestination"},
			{columnname:"Pickup Date",dataname:"PICK_UP_DATE_TIME",datatype:"string",editControl:"date",width:100},
			{columnname:"Pickup<br>Time",dataname:"PICK_UP_TIME",datatype:"string",editControl:"textbox",width:80},
			{columnname:"Delivery<br>Date",dataname:"ROS_DATE_TIME",datatype:"string",editControl:"date",width:100},
			{columnname:"Delivery<br>Time",dataname:"ROSTIME",datatype:"string",editControl:"textbox",width:80},
			{columnname:"Contract<br>Type",dataname:"CONTRACT_TYPE",datatype:"string",width:100},
			{columnname:"Contract<br>No",dataname:"CONTRACT_NO",datatype:"string",width:100},
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",editControl:"textbox",width:80,"onenter":"ITEM_CODE_ONENTER",helpid:'itemlink'},
			{columnname:"Item<br>Description",dataname:"ITEM_DESC",datatype:"string",width:100},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:80},
			{columnname:"Qty",dataname:"ITEM_QTY",datatype:"string",editControl:"textbox",width:80},
			{columnname:"UOM",dataname:"ITEM_QTY_UOM",datatype:"string",editControl:"textbox",width:80},
			{columnname:"Weight",dataname:"TOT_WEIGHT",datatype:"string",editControl:"textbox",width:80},
			{columnname:"UOM",dataname:"TOT_WEIGHT_UOM",datatype:"string",editControl:"combo",width:80,storeId:"strTotWgtUom"},
			{columnname:"Volume",dataname:"TOT_VOLUME",datatype:"string",editControl:"textbox",width:80},
			{columnname:"UOM",dataname:"TOT_VOLUME_UOM",datatype:"string",editControl:"combo",width:80,storeId:"strTotVolUom"},
			{columnname:"Cost Center<br>Code",dataname:"COST_CENTER_CODE",datatype:"string",editControl:"textbox",width:80,helpid:'costcenterlink',"onenter":"COST_CENTER_CODE_ONENTER"},
			{columnname:"Cost Center<br>Name",dataname:"COST_CENTER_NAME",datatype:"string",editControl:"textbox",width:80},
			{columnname:"Request No",dataname:"TRANS_REQ_NO",datatype:"string",editControl:"textbox",width:80},
			{columnname:"Line Status",dataname:"LINE_STATUS",datatype:"string",editControl:"textbox",width:80}
			
		]
		bulkGridDtl1=
		{
			title:"Request Details",
			id:"bulkRequest",
			detail:bulkGridFieldObj1,
			visibleRow:10
		}
		

		mainpage.ptrMainSection.add(bulkHdr)//Add Header Section to Main Page
		BulkRequestGridSection = plf.addGrid(bulkGridDtl1,this)
		mainpage.ptrMainSection.add(BulkRequestGridSection)
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strRequestNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"initBulkMstTS"
			},
			{
				"controlid":"iAmendmentNo",
				"tasktype":"onchange",
				"input":["iAmendmentNo","strRequestNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"onChangeAmendnoTS"
			},
			{
				"grideventid":"CUST_CODE_ONENTER",
				"tasktype":"gridonenter",
				"input":["CUST_CODE"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchCustTS"
			},
			{
				"grideventid":"ITEM_CODE_ONENTER",
				"tasktype":"gridonenter",
				"input":["ITEM_CODE"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchItemTS"
			},
			{
				"grideventid":"COST_CENTER_CODE_ONENTER",
				"tasktype":"gridonenter",
				"input":["COST_CENTER_CODE"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchCostCenterTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strRequestNo","dtRequestDate","strStatus","bulkRequest","iAmendmentNo","strDocNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"createBulkReqTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strRequestNo","dtRequestDate","strStatus","bulkRequest","iAmendmentNo","strDocNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"editBulkReqTS"
		},
		{
					"controlid":"strRequestNo",
					"tasktype":"onenter",
					"input":["strRequestNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"onEnterBulkReqNoTS"
		   },
		   
		   {
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["strRequestNo","dtRequestDate","strStatus","bulkRequest","iAmendmentNo","strDocNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"confirmBulkReqTS"
		   },
		    {
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Amend",
				"input":["strRequestNo","dtRequestDate","strStatus","bulkRequest","iAmendmentNo","strDocNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"amendBulkReqTS"
		   },
		    {
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strRequestNo","dtRequestDate","strStatus","bulkRequest","iAmendmentNo","strDocNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"deleteBulkReqTS"
		   },
		    {
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Short close",
				"input":["strRequestNo","dtRequestDate","strStatus","bulkRequest","iAmendmentNo","strDocNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"shortCloseBulkReqTS"
		   }
			
			
		];
		
		mainpage.hlpLinks=
		{
		  "customerlink":
				{
				
					   "hlpType":"grid",
					   "gridID":"bulkRequest",
						"hlpScreen":"jm_master.CustomerHelp",
						"send":[
									{"parent":"","child":""}
							   ],
						"receive":[
								{"parent":"CUST_CODE","child":"CUST_CODE"},
								{"parent":"CUST_NAME","child":"CUST_NAME"}
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
				},
				"costcenterlink":
				{
					"hlpType":"grid",
					"gridID":"bulkRequest",
					"hlpScreen":"jm_master.CostCenterHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					{"parent":"COST_CENTER_CODE","child":"COST_CENTER_CODE"},
					{"parent":"COST_CENTER_NAME","child":"COST_CENTER_NAME"},
                             ]
				},
				"bulkreqno":
				{
				    "hlpType":"Header",
					"hlpScreen":"tms.BulkRequestHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRequestNo","child":"TRANS_REQ_NO"}
							]
				}			
				
	  }
	
	mainpage.screenLinks=
		{

			"tms_procblkrequest":
				{
					"dest":"tms.ReleaseBulkRequest",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
				
				
		}
	
		
		this.callParent(arguments);
		
	}
});
