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
Ext.define('CueTrans.view.finance.CarrierBillDetails', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Carrier Bill Details";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		mainpage.toolbarActions= [
			{
                "name": "Recalculate",
                "tooltip": "Click here to Recalculate the bill details."
            },
			{
                "name": "Confirm",
                "tooltip": "Click here to confirm the bill details."
            },
			{
                "name": "Delete",
                "tooltip": "Click here to Delete the bill details."
            },
			{
                "name": "Print",
                "tooltip": "Click here to print the bill details."
            },
            ]


		plf.columns=4
		BillHdrColumn = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var BillHdrCtrl=				//69995
			[	
			    plf.addDisplayOnly({"label":"Bill No",id:"strInvoiceNo"}),	
				plf.addDate({"label":"Bill Date",id:"dtInvoiceDate"}),
				plf.addDisplayOnly({"label":"Bill Amount",id:"iAmount",weightPrecision:2}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				
				plf.addDisplayOnly({"label":"Carrier Code",id:"strCarCode"}),	
				plf.addDisplayOnly({"label":"Carrier Name",id:"strCarName"}),
				plf.addDisplayOnly({"label":"Currency Code",id:"strCurrency"}),	
				plf.addDisplayOnly({"label":"Exchange Rate",id:"iExchangeRate"})
			]
		
		}
		
		else
		{
			var BillHdrCtrl=			//69995
			[	
				plf.addDisplayOnly({"label":"Bill No",id:"strInvoiceNo"}),	
				plf.addDate({"label":"Bill Date",id:"dtInvoiceDate"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				
				plf.addDisplayOnly({"label":"Bill Amount",id:"iAmount",weightPrecision:2}),
				plf.addDisplayOnly({"label":"Carrier Code",id:"strCarCode"}),	
				plf.addDisplayOnly({"label":"Carrier Name",id:"strCarName"}),
				
				plf.addDisplayOnly({"label":"Currency Code",id:"strCurrency"}),	
				plf.addDisplayOnly({"label":"Exchange Rate",id:"iExchangeRate"})
				
				
			]
		}	
		
		BillHdrColumn.add(BillHdrCtrl)
		
		
		//Request section starts
		
		var tripdetGridFieldObj=				//69995
		[   
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:150},
			{columnname:"Carrier Code",dataname:"CAR_CODE",datatype:"string",width:80},
			{columnname:"Carrier Name",dataname:"CAR_NAME",datatype:"string",width:200},
			//{columnname:"Starting Point",dataname:"START_PT",datatype:"string",width:100},
			//{columnname:"Ending Point",dataname:"END_PT",datatype:"string",width:100},
			{columnname:"Closure Date",dataname:"CLOSE_DT",datatype:"string",width:100},
			//{columnname:"Load Distance",dataname:"LOAD_DIST",datatype:"string",width:100},
			//{columnname:"Noload Distance",dataname:"NOLOAD_DIST",datatype:"string",width:100},
			{columnname:"Total Distance",dataname:"TOT_DIST",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Amount",dataname:"AMOUNT",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
			
		]
		var tripdetGridDtl=					//69995
		{
			title:"Processed Trips",
			id:"proTripMapGrid",
			detail:tripdetGridFieldObj,
			visibleRow:7,
			readonly:true,
			removeAddDelete:true
		
		}
		var tripdetGridSection = plf.addGrid(tripdetGridDtl,this)					//69995
		//Request section Ends
		
		
		//Invoice section starts
		var BillfixChgGridFieldObj=								//69995
		[   
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:100},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:100},
			{columnname:"Service Item<BR>Desc",dataname:"SERVICE_ITEM_DESC",datatype:"string",width:150},
			{columnname:"Service Type",dataname:"SERVICE_TYPE",datatype:"string",width:150,hidden:true},
			{columnname:"Lane Desc",dataname:"LANE_DESC",datatype:"string",width:100},			
			{columnname:"Charge<BR>Desc",dataname:"CHARGE_DESC",datatype:"string",width:100},
			{columnname:"Nature of<BR>Charge",dataname:"NAT_CHG",datatype:"string",width:130},
			{columnname:"Rate",dataname:"RATE",datatype:"string",width:80,colAlign:'right',weightPrecision:2},
			{columnname:"Price Basis",dataname:"PRICE_BASIS",datatype:"string",width:130},
			{columnname:"Charge Basis",dataname:"CHARGE_BASIS",datatype:"string",width:100},
			{columnname:"Unit",dataname:"UNIT",datatype:"string",width:80,colAlign:'right',weightPrecision:3},		
			{columnname:"Amount",dataname:"AMOUNT",datatype:"string",width:100,colAlign:'right',weightPrecision:2}
			
		]
		var BillfixChgGridDtl=						//69995
		{
			title:"Bill Breakup - Fixed Charges",
			id:"invFixMapGrid",
			detail:BillfixChgGridFieldObj,
			visibleRow:7,
			readonly:true,
			removeAddDelete:true
		
		}
		var BillfixChgGridSection = plf.addGrid(BillfixChgGridDtl,this)		//69995
		
		var BilManChgGridFieldObj=						//69995
		[   
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:100},
			{columnname:"Service Item<BR>Description",dataname:"SERVICE_ITEM_DESC",datatype:"string",width:150},
			{columnname:"Service Item",dataname:"SERVICE_ITEM",datatype:"string",width:150,hidden:true},
			{columnname:"Lane Code",dataname:"LANE_CODE",datatype:"string",width:100,hidden:true},			
			{columnname:"Service Type",dataname:"SERVICE_TYPE",datatype:"string",width:150,hidden:true},
			{columnname:"Charge Code",dataname:"CHARGE_CODE",datatype:"string",width:150,hidden:true},
			{columnname:"Charge<BR>Description",dataname:"CHARGE_DESC",datatype:"string",width:100},
			{columnname:"Nature of<BR>Charge",dataname:"NAT_CHG",datatype:"string",width:130},
			{columnname:"Amount",dataname:"AMOUNT",datatype:"string",width:100,colAlign:'right',
			weightPrecision:2,inputFormat:"numeric",editControl:"textbox"}
			
		]
		var BilManChgGridDtl=					//69995
		{
			title:"Bill Breakup - Manual Charges",
			id:"invManMapGrid",
			detail:BilManChgGridFieldObj,
			visibleRow:7,
			removeAddDelete:true
		
		}
		var BilManChgGridSection = plf.addGrid(BilManChgGridDtl,this)		//69995
		//Invoice section Ends
		
		//Main Page layout starts
		mainpage.ptrMainSection.add(BillHdrColumn) 
		//mainpage.ptrMainSection.add(tripdetGridSection) 
		//mainpage.ptrMainSection.add(BillfixChgGridSection) 
		//mainpage.ptrMainSection.add(BilManChgGridSection) 
		//Main Page layout ends
		//mainpage.ptrMainSection.add(TariffHdrColumn) 
		
		var baseTab = plf.addTabSection({ tabs:[tripdetGridSection,BillfixChgGridSection,BilManChgGridSection]});
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
					"methodName":"initBillDetailsTS"
				},
				
				{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Delete",
					"input":["strInvoiceNo","dtInvoiceDate","strStatus"],
					"service":"FINCoreFinanceServiceTS",
					"methodName":"deleteBillDetTS"
				},
				{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Confirm",
					"input":["strInvoiceNo","dtInvoiceDate","billManMapGrid","strStatus"],
					"service":"FINCoreFinanceServiceTS",
					"methodName":"confirmBillDetTS"
				},
				/*
				{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Recalculate",
					"input":["strBillNo","dtBillDate","billManMapGrid","strStatus"],
					"service":"FINCoreFinanceServiceTS",
					"methodName":"reCalBillDetTS"
				}
				*/
			
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
