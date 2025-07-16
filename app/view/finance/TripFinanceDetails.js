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
Ext.define('CueTrans.view.finance.TripFinanceDetails', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Financial Details";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		 mainpage.toolbarLinks=
		[
			{"name":"Trip Details","linkid":"fin_viewtrip","tooltip":"Click here to view trip details."}
		]
		
		mainpage.toolbarActions=
			[
				{
					"name": "Recalculate",
					"tooltip": "Click here to recalculate the trip details."
				},
				{
					"name": "Save",
					"tooltip": "Click here to recalculate and save the trip details."
				}
			]

		plf.columns=4
		var InvoiceHdrColumn = plf.addColumnSection({});			//69995
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var InvoiceHdrCtrl=										//69995
			[	
			    plf.addDisplayOnly({"label":"Trip No",id:"strTripSheetNo"}),	
				plf.addDisplayOnly({"label":"Carrier Code",id:"strCarCode"}),
				plf.addDisplayOnly({"label":"Carrier Name",id:"strCarName"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				
				plf.addDisplayOnly({"label":"Currency Code",id:"strCurrency"}),	
				plf.addDisplayOnly({"label":"Exchange Rate",id:"iExchangeRate"}),				
				plf.addDisplayOnly({"label":"Trip Amount",id:"iAmount"}),	
				plf.addDisplayOnly({"label":"Invoice No",id:"strInvoiceNo"})
				
			]
		
		}
		
		else
		{
			var InvoiceHdrCtrl=										//69995
			[	
				plf.addDisplayOnly({"label":"Trip No",id:"strTripSheetNo"}),	
				plf.addDisplayOnly({"label":"Trip Amount",id:"iAmount"}),	
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				
				plf.addDisplayOnly({"label":"Carrier Code",id:"strCarCode"}),
				plf.addDisplayOnly({"label":"Carrier Name",id:"strCarName"}),
				plf.addDisplayOnly({"label":"Currency Code",id:"strCurrency"}),	
				
				plf.addDisplayOnly({"label":"Exchange Rate",id:"iExchangeRate"}),				
				plf.addDisplayOnly({"label":"Invoice No",id:"strInvoiceNo"})
				
				
			]
		}	
		
		InvoiceHdrColumn.add(InvoiceHdrCtrl)
		
		
		var AmountHdrColumn = plf.addColumnSection({});			//69995
		//var parentForm =this;
		var AmountHdrCtrl=										//69995
			[	
				
			    plf.addDisplayOnly({"label":"Service Item Code",id:"strServiceItem"}),	
				plf.addDisplayOnly({"label":"Description",id:"strServiceDesc"})
				/*
				plf.addButton({id:"btnRate",label:"Rate Shop",tooltip:"Click here to rate shop.",
				"listeners":
						{
						el: {
							click: function(){
								parentForm.launchHlpLink("Rate")}
							}
						}
						})
				*/
			]
		
		AmountHdrColumn.add(AmountHdrCtrl)
		
		
		//Invoice section starts
		var InvfixChgGridFieldObj=			//69995
		[   
			{columnname:"Trip Seq No",dataname:"TRP_SEQ_NO",datatype:"string",width:100},
			{columnname:"JP Type",dataname:"JP_TYPE",datatype:"string",width:100},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:100},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:100},
			{columnname:"Service Desc",dataname:"SER_DESC",datatype:"string",width:100},
			{columnname:"Lane Desc",dataname:"LANE_DESC",datatype:"string",width:100},			
			{columnname:"Charge Description",dataname:"CHARGE_DESC",datatype:"string",width:100},
			{columnname:"Nature of<BR>Charge",dataname:"NAT_CHG",datatype:"string",width:130},
			{columnname:"Rate",dataname:"RATE",datatype:"string",width:130,colAlign:'right',weightPrecision:2},
			{columnname:"Price Basis",dataname:"PRICE_BASIS",datatype:"string",width:130},
			{columnname:"Charge Basis",dataname:"CHARGE_BASIS",datatype:"string",width:100},
			{columnname:"Unit",dataname:"UNIT",datatype:"string",width:130,colAlign:'right',weightPrecision:3},		
			{columnname:"Amount",dataname:"AMOUNT",datatype:"string",width:100,colAlign:'right',weightPrecision:2}
			
		]
		var InvfixChgGridDtl=				//69995
		{
			title:"Fixed Charges",
			id:"invFixMapGrid",
			detail:InvfixChgGridFieldObj,
			visibleRow:7,
			readonly:true,
			removeAddDelete:true
		
		}
		var InvfixChgGridSection = plf.addGrid(InvfixChgGridDtl,this)		//69995
		
		var InvManChgGridFieldObj=				//69995
		[   
			{columnname:"Trip Seq No",dataname:"TRP_SEQ_NO",datatype:"string",width:100},
			{columnname:"JP Type",dataname:"JP_TYPE",datatype:"string",width:100},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:100},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:100},
			{columnname:"Service<BR>Description",dataname:"SER_DESC",datatype:"string",width:100},
			{columnname:"Charge Code",dataname:"CHARGE_CODE",datatype:"string",width:150,hidden:true},
			{columnname:"Charge<BR>Description",dataname:"CHARGE_DESC",datatype:"string",width:100},
			{columnname:"Nature of<BR>Charge",dataname:"NAT_CHG",datatype:"string",width:130},
			{columnname:"Amount",dataname:"AMOUNT",datatype:"string",width:100,colAlign:'right',
			weightPrecision:2,inputFormat:"numeric",editControl:"textbox"}
			
		]
		var InvManChgGridDtl=			//69995
		{
			title:"Manual Charges",
			id:"invManMapGrid",
			detail:InvManChgGridFieldObj,
			visibleRow:7,
			removeAddDelete:true
		
		}
		var InvManChgGridSection = plf.addGrid(InvManChgGridDtl,this)		//69995
		//Invoice section Ends
		
		//Main Page layout starts
		mainpage.ptrMainSection.add(InvoiceHdrColumn) 
		//mainpage.ptrMainSection.add(AmountHdrColumn) 
		//Main Page layout ends
		
		var baseTab = plf.addTabSection({ tabs:[InvfixChgGridSection,InvManChgGridSection]});
		mainpage.ptrMainSection.add(baseTab)
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
			[
				
				{
					"controlid":"",
					"tasktype":"onload",
					"input":["strTripSheetNo","strStatus"],
					"service":"FINCoreFinanceServiceTS",
					"methodName":"initTrpDetailsTS"
				},
				{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Recalculate",
					"input":["strTripSheetNo","strInvoiceNo","invManMapGrid"],
					"service":"FINCoreFinanceServiceTS",
					"methodName":"recalcTrpDetTS"
				},
				{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Save",
					"input":["strTripSheetNo","strInvoiceNo","invManMapGrid"],
					"service":"FINCoreFinanceServiceTS",
					"methodName":"saveTrpDetTS"
				}
				
			];
		
		mainpage.screenLinks=
		{
		
			"fin_viewtrip":
				{
					"dest":"trip.TripSheet",
					"hdr":[
							{"src":"strTripSheetNo","dest":"strTripSheetNo"}
							],
					"grid":[
							{"src":"","dest":""}							
							]
				}
		
		}
		
		/*
		mainpage.hlpLinks=
		{
			/*"Rate":
			{
			"hlpType":"hdrgrid",
			"hlpScreen":"finance.RateShop",
			"send":[
					{"parent":"strRequestNo","child":"strRequestNo"},
					{"parent":"strCustCode","child":"strCustCode"},
					{"parent":"strCustName","child":"strCustName"},
				   ],
			"receive":[
					{"parent":"","child":""}				
					  ]
			}
		
		
		}
		
		mainpage.screenLinks=
		{
			
			
		}
		*/
		
		this.callParent(arguments);
		
	}
});
