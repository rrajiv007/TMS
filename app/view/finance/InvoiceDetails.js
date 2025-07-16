/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	                           Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.finance.InvoiceDetails', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Invoice Details";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		mainpage.toolbarActions= [
			{
                "name": "Recalculate",
                "tooltip": "Click here to Recalculate the invoice details."
            },
			{
                "name": "Confirm",
                "tooltip": "Click here to confirm the invoice details."
            },
			{
                "name": "Delete",
                "tooltip": "Click here to Delete the invoice details."
            },
			{
                "name": "Print",
                "tooltip": "Click here to print the invoice details."
            },
            ]


		plf.columns=4
		InvoiceHdrColumn = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var InvoiceHdrCtrl=					//69995
			[	
			    plf.addDisplayOnly({"label":"Invoice No",id:"strInvoiceNo"}),	
				plf.addDate({"label":"Invoice Date",id:"dtInvoiceDate"}),
				plf.addDisplayOnly({"label":"Invoice Amount",id:"iAmount",weightPrecision:2}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				
				plf.addDisplayOnly({"label":"Customer Code",id:"strCustCode"}),	
				plf.addDisplayOnly({"label":"Customer Name",id:"strCustName"}),
				plf.addDisplayOnly({"label":"Currency Code",id:"strCurrency"}),	
				plf.addDisplayOnly({"label":"Exchange Rate",id:"iExchangeRate"}),
				
				plf.addDisplayOnly({"label":"Cost Center Code",id:"strCostCode"}),	
				plf.addDisplayOnly({"label":"Cost Center name",id:"strCostName"}),
				plf.addDisplayOnly({"label":"Cost Object Type",id:"strCostType"}),	
				plf.addDisplayOnly({"label":"Operation A/C No",id:"strCostAcNo"}),
			]
		
		}
		
		else
		{
			var InvoiceHdrCtrl=				//69995
			[	
				plf.addDisplayOnly({"label":"Invoice No",id:"strInvoiceNo"}),	
				plf.addDate({"label":"Invoice Date",id:"dtInvoiceDate"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				
				plf.addDisplayOnly({"label":"Invoice Amount",id:"iAmount",weightPrecision:2}),
				plf.addDisplayOnly({"label":"Customer Code",id:"strCustCode"}),	
				plf.addDisplayOnly({"label":"Customer Name",id:"strCustName"}),
				
				plf.addDisplayOnly({"label":"Currency Code",id:"strCurrency"}),	
				plf.addDisplayOnly({"label":"Exchange Rate",id:"iExchangeRate"}),
				plf.addDisplayOnly({"label":"Cost Center Code",id:"strCostCode"}),	
				
				plf.addDisplayOnly({"label":"Cost Center name",id:"strCostName"}),
				plf.addDisplayOnly({"label":"Cost Object Type",id:"strCostType"}),	
				plf.addDisplayOnly({"label":"Operation A/C No",id:"strCostAcNo"}),
				
				
			]
		}	
		
		InvoiceHdrColumn.add(InvoiceHdrCtrl)
		
		
		//Request section starts
		
		var requestdetGridFieldObj=			//69995
		[   
			{columnname:"Request No",dataname:"REQUEST_NO",datatype:"string",width:100},
			{columnname:"Delivered<BR>Date",dataname:"DEL_DATE",datatype:"string",width:100},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:100},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:100},
			{columnname:"Priority",dataname:"PRIORITY",datatype:"string",width:100},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:100},
			{columnname:"Amount",dataname:"AMOUNT",datatype:"string",width:130,colAlign:'right',weightPrecision:2},
			{columnname:"Total Weight<BR>(tons)",dataname:"WEIGHT",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Total Volume<BR>(cu.m)",dataname:"VOLUME",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
			
		]
		var requestdetGridDtl=			//69995
		{
			title:"Request Details",
			id:"proReqMapGrid",
			detail:requestdetGridFieldObj,
			visibleRow:7,
			readonly:true,
			removeAddDelete:true
		
		}
		var requestdetGridSection = plf.addGrid(requestdetGridDtl,this)		//69995
		//Request section Ends
		
		
		//Invoice section starts
		var InvfixChgGridFieldObj=				//69995
		[   
			{columnname:"Request No",dataname:"REQUEST_NO",datatype:"string",width:100},
			{columnname:"Service Item<BR>Description",dataname:"SERVICE_ITEM_DESC",datatype:"string",width:150},
			{columnname:"Service Type",dataname:"SERVICE_TYPE",datatype:"string",width:150,hidden:true},
			{columnname:"Charge<BR>Description",dataname:"CHARGE_DESC",datatype:"string",width:100},
			{columnname:"Nature of<BR>Charge",dataname:"NAT_CHG",datatype:"string",width:130},
			{columnname:"Rate",dataname:"RATE",datatype:"string",width:130,colAlign:'right',weightPrecision:2},
			{columnname:"Price Basis",dataname:"PRICE_BASIS",datatype:"string",width:130},
			{columnname:"Charge Basis",dataname:"CHARGE_BASIS",datatype:"string",width:100},
			{columnname:"Unit",dataname:"UNIT",datatype:"string",width:130,colAlign:'right',weightPrecision:3},		
			{columnname:"Amount",dataname:"AMOUNT",datatype:"string",width:100,colAlign:'right',weightPrecision:2}
			
		]
		var InvfixChgGridDtl=					//69995	
		{
			title:"Invoice Breakup - Fixed Charges",
			id:"invFixMapGrid",
			detail:InvfixChgGridFieldObj,
			visibleRow:7,
			readonly:true,
			removeAddDelete:true
		
		}
		var InvfixChgGridSection = plf.addGrid(InvfixChgGridDtl,this)		//69995
		
		var InvManChgGridFieldObj=							//69995
		[   
			{columnname:"Request No",dataname:"REQUEST_NO",datatype:"string",width:100},
			{columnname:"Service Item<BR>Description",dataname:"SERVICE_ITEM_DESC",datatype:"string",width:150},
			{columnname:"Service Item",dataname:"SERVICE_ITEM",datatype:"string",width:150,hidden:true},
			{columnname:"Service Type",dataname:"SERVICE_TYPE",datatype:"string",width:150,hidden:true},
			{columnname:"Charge Code",dataname:"CHARGE_CODE",datatype:"string",width:150,hidden:true},
			{columnname:"Charge<BR>Description",dataname:"CHARGE_DESC",datatype:"string",width:100},
			{columnname:"Nature of<BR>Charge",dataname:"NAT_CHG",datatype:"string",width:130},
			{columnname:"Amount",dataname:"AMOUNT",datatype:"string",width:100,colAlign:'right',
			weightPrecision:2,inputFormat:"numeric",editControl:"textbox"}
			
		]
		var InvManChgGridDtl=						//69995
		{
			title:"Invoice Breakup - Manual Charges",
			id:"invManMapGrid",
			detail:InvManChgGridFieldObj,
			visibleRow:7,
			removeAddDelete:true
		
		}
		var InvManChgGridSection = plf.addGrid(InvManChgGridDtl,this)		//69995
		//Invoice section Ends
		
		//Main Page layout starts
		mainpage.ptrMainSection.add(InvoiceHdrColumn) 
		//mainpage.ptrMainSection.add(requestdetGridSection) 
		//mainpage.ptrMainSection.add(InvfixChgGridSection) 
		//mainpage.ptrMainSection.add(InvManChgGridSection) 
		//Main Page layout ends
		//mainpage.ptrMainSection.add(TariffHdrColumn) 
		
		var baseTab = plf.addTabSection({ tabs:[requestdetGridSection,InvfixChgGridSection,InvManChgGridSection]});
		mainpage.ptrMainSection.add(baseTab)
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
			[
				{
					"controlid":"",
					"tasktype":"onload",
					"input":["strInvoiceNo"],
					"service":"FINCoreFinanceServiceTS",
					"methodName":"initInvDetailsTS"
				},
				{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Delete",
					"input":["strInvoiceNo","dtInvoiceDate","strStatus"],
					"service":"FINCoreFinanceServiceTS",
					"methodName":"deleteInvDetTS"
				},
				{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Confirm",
					"input":["strInvoiceNo","dtInvoiceDate","invManMapGrid","strStatus"],
					"service":"FINCoreFinanceServiceTS",
					"methodName":"confirmInvDetTS"
				},
				{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Recalculate",
					"input":["strInvoiceNo","dtInvoiceDate","invManMapGrid","strStatus"],
					"service":"FINCoreFinanceServiceTS",
					"methodName":"reCalInvDetTS"
				}
			
			];
		
		
		mainpage.hlpLinks=
		{
		
			
		
		}
		
		mainpage.screenLinks=
		{
			
			
		}
		
		
		this.callParent(arguments);
		
	}
});
