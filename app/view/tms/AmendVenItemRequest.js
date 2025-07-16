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
Ext.define('CueTrans.view.tms.AmendVenItemRequest', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Amend Item Request Details";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
           // {"name":"Create Another Load","linkid":"tms_CreateLoadBuilding","tooltip":"Click here to create another new load."},		
		];
		
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Amend",
                "tooltip": "Click here to amend request."
            }
			]
		//Add the header portion
		plf.columns=4
		var venReqAmendColumn = plf.addColumnSection({title:"", collapsed: true});
		
		
		var venReqAmendFormCtrl=
		[
			    plf.addHlpText({"label":"Request No",id:"strRequestNo","mandatory":"true",hlpLinkID:"transreqno"},this),	
				//plf.addText({"label":"Request No",id:"strRequestNo","mandatory":"true"}),	
				plf.addDisplayOnly({"label":"Amend No",id:"iAmendmentNo"/*,"mandatory":"true"*/}),
				plf.addDisplayOnly({"label":"Request Date",id:"dtRequestDate"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addDisplayOnly({"label":"Ref Doc No",id:"strDocNo"}),
                plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
				plf.addDisplayOnly({"label":"PO No",id:"strPONum"}),
				plf.addText({"label":"Amend Reason",id:"strAmendRsn","mandatory":"true"})
		]
		
		venReqAmendColumn.add(venReqAmendFormCtrl);
		
		//Plan Details Section Begins
		plf.columns=4
		
		//materialDetailsAct = plf.addFieldSet({title:""})
		var materialDetailsAct = plf.addColumnSection({title:"Material Details(Actual)"});
		var MaterialDetailsGridFieldObj2=
		[   
			
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",editControl:"textbox",width:140,helpid:'ItemCodeAct',"onenter":"ITEM_CODE_ONENTER","onkeyup":"ITEM_CODE_ONENTER"},
			{columnname:"Item Description",dataname:"ITEM_DESC",datatype:"string",width:250},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:90},
			{columnname:"Quantity",dataname:"ITEM_QTY",datatype:"string",editControl:"textbox",width:120,"onenter":"QUANTITY_ONENTER",colAlign:'right'},
			{columnname:"UOM",dataname:"ITEM_QTY_UOM",datatype:"string",width:100,storeId:"strQuantityUom"},
			{columnname:"Weight<BR>(ton)",dataname:"TOT_WEIGHT",datatype:"string",width:120,colAlign:'right',weightPrecision:3},
			{columnname:"Volume<BR>(cu.m)",dataname:"TOT_VOLUME",datatype:"string",width:120,colAlign:'right',volumePrecision:3},
			{columnname:"PO Line Item",dataname:"PO_LINE_ITEM",datatype:"string",inputFormat:'integer',editControl:"textbox",width:100,colAlign:'right'},//Raj 241217
			{columnname:"Remarks",dataname:"ITEM_REMARKS",datatype:"string",editControl:"textbox",width:200}//Raj 241217
		]
		var MaterialDetailsGridDtl2=
		{
			title:"",
			id:"actDetail",
			detail:MaterialDetailsGridFieldObj2,
			visibleRow:11
		
		}
		UnmappedGridSection = plf.addGrid(MaterialDetailsGridDtl2,this)	
		materialDetailsAct.add(UnmappedGridSection);

		//Plan Details Section end;
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(venReqAmendColumn)
	    mainpage.ptrMainSection.add(materialDetailsAct)	
		
		
		
		//History Data Section
		//mainpage.dataHistorySectionFlag=false;
		mainpage.screenLinks=
		{
		
		}	
		
		mainpage.hlpLinks=
		{
		"ItemCodeAct":
				{
					"hlpType":"grid",
					"gridID":"actDetail",
					"hlpScreen":"jm_master.ItemHelp",
					"send":[
						    {"parent":"","child":""},
							{"direct":"ITEMACT_AC","child":"strContext"}
						   ],
					"receive":[
					{"parent":"ITEM_CODE","child":"ITEM_CODE"},
					{"parent":"ITEM_DESC","child":"ITEM_DESCRIPTION"},
                                   {"parent":"COMMODITY","child":"COMMODITY_TYPE"},
                                   {"parent":"ITEM_QTY_UOM","child":"STANDARD_UOM"}



							]
				},
        "transreqno":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.TransReqAmendItemHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRequestNo","child":"TRANS_REQ_NO"}
							]
				}					
		}
		
		mainpage.eventHandlers = 
			[
			   {
				"controlid":"",
				"tasktype":"onload",
				"input":["strRequestNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"initVenReqAmendTS" //initItemBasedTS
		       },
			   {       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Amend",
				"input":["strRequestNo","strRemarks","strLoadAt","strDelvAt","strPONum","strAmendRsn","actDetail"],
				"service":"TMSCoreTransportTS",
				"methodName":"VenItemReqAmendTS"//VendorAmendTS
		       },
			   {
					"controlid":"strRequestNo",
					"tasktype":"onenter",
					"input":["strRequestNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"onenterVenReqAmendTS"
		        },
				{
				"grideventid":"ITEM_CODE_ONENTER",
				"tasktype":"gridonenter",
				"input":["ITEM_CODE","ITEM_QTY"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchItemCodeTS"
			    },

               {
				"grideventid":"QUANTITY_ONENTER",
				"tasktype":"gridonenter",
				"input":["TOT_VOLUME","TOT_WEIGHT","ITEM_QTY","ITEM_CODE"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchQuantityTS"
			   }
			]
		this.callParent(arguments);
		
	
	}
});