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
Ext.define('CueTrans.view.finance.ProcessCarrierBill', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Process Carrier Bill";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		/*
		 mainpage.toolbarLinks=
		[
			{"name":"Invoice Details","linkid":"fin_viewinvoice","tooltip":"Click here to view invoice details."}
		]
		*/
		mainpage.toolbarActions= [
			{
                "name": "Confirm",
                "tooltip": "Click here to confirm the carrier bill details."
            }
            ]


		plf.columns=4
		var BillHdrColumn = plf.addColumnSection({});		//69995
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var BillHdrCtrl=		//69995
			[	
			    plf.addText({"label":"Carrier Code",id:"strCarCode","anywhereSearch":"true"}),	
				//plf.addCombo({"label":"Region From",id:"strRegionCodeFrom"}),
				//plf.addCombo({"label":"Region To",id:"strRegionCodeTo"}),
				
				plf.addText({"label":"Load No",id:"strLoadNo","anywhereSearch":"true"}),	
				plf.addText({"label":"Trip No",id:"strTripSheetNo","anywhereSearch":"true"}),	
				
				
				plf.addDate({"label":"Trip Closure Date From",id:"dtTripDateFrom"}),	
				plf.addDate({"label":"Trip Closure Date To",id:"dtTripDateTo"}),
				plf.addBlank(),
				plf.addBlank(),
				
				plf.addBlank(),
				plf.addButton({"label":"Fetch Details",id:"btnSearch","tooltip":"Click here to fetch request details."}),
				plf.addBlank(),
				plf.addBlank()
			]
		
		}
		
		else
		{
			var BillHdrCtrl=		//69995
			[	
				plf.addText({"label":"Carrier Code",id:"strCarCode","anywhereSearch":"true"}),	
				//plf.addCombo({"label":"Region From",id:"strRegionCodeFrom"}),
				//plf.addCombo({"label":"Region To",id:"strRegionCodeTo"}),
				
				plf.addText({"label":"Load No",id:"strLoadNo","anywhereSearch":"true"}),	
				plf.addText({"label":"Trip No",id:"strTripSheetNo","anywhereSearch":"true"}),	
				plf.addDate({"label":"Trip Closure Date From",id:"dtTripDateFrom"}),	
				plf.addDate({"label":"Trip Closure Date To",id:"dtTripDateTo"}),
				
				plf.addBlank(),
				plf.addButton({"label":"Fetch Details",id:"btnSearch","tooltip":"Click here to fetch request details."}),
				plf.addBlank()
				
				
			]
		}			
		BillHdrColumn.add(BillHdrCtrl)		
		
		//Request section starts
		
		var tripdetGridFieldObj=			//69995
		[   
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:150},
			{columnname:"Carrier Code",dataname:"CAR_CODE",datatype:"string",width:80},
			{columnname:"Carrier Name",dataname:"CAR_NAME",datatype:"string",width:200},
			{columnname:"Vehicle Category",dataname:"VEH_CAT",datatype:"string",width:200},
			//{columnname:"Starting Point",dataname:"START_PT",datatype:"string",width:100},
			//{columnname:"Ending Point",dataname:"END_PT",datatype:"string",width:100},
			{columnname:"Closure Date",dataname:"CLOSE_DT",datatype:"string",width:100},
			//{columnname:"Load Distance",dataname:"LOAD_DIST",datatype:"string",width:100,colAlign:'right'},
			//{columnname:"Noload Distance",dataname:"NOLOAD_DIST",datatype:"string",width:100,colAlign:'right'},
			{columnname:"Total Distance",dataname:"TOT_DIST",datatype:"string",width:100,colAlign:'right'}
			
		]
		var tripdetGridDtl=			//69995
		{
			title:"Trip Details",
			id:"tripMapGrid",
			detail:tripdetGridFieldObj,
			visibleRow:7,
			readOnly:true,
			removeAddDelete:true
		
		}
		var tripdetGridSection = plf.addGrid(tripdetGridDtl,this)			//69995
		//Request section Ends
		
		plf.columns=4
		var BillDtColumn = plf.addColumnSection({});		//69995
		var BillDtCtrl=										//69995
		[	
			plf.addDate({"label":"Bill Date",id:"dtInvoiceDate"}),	
			plf.addButton({"label":"Process Bill",id:"btnBill","tooltip":"Click here to process bill."}),
			plf.addBlank(),
			plf.addBlank()
		]

		BillDtColumn.add(BillDtCtrl)
		
		//Invoice section starts
		
		var BillGridFieldObj=			//69995
		[   
			{columnname:"Bill No",dataname:"INVOICE_NO",datatype:"string",width:150,linkId:"finInvSumView","tooltip":"Click here to view invoice details."},
			{columnname:"Bill Date",dataname:"INVOICE_DATE",datatype:"string",width:150,editControl:"date"},
			{columnname:"Carrier Code",dataname:"CAR_CODE",datatype:"string",width:100},
			{columnname:"Carrier Name",dataname:"CAR_NAME",datatype:"string",width:130},
			{columnname:"No of<BR>Processed Trips",dataname:"NO_TRIPS",datatype:"string",width:130,colAlign:'right'},
			{columnname:"Total Distance",dataname:"TOT_DIS",datatype:"string",width:130,colAlign:'right',weightPrecision:2},
			{columnname:"Bill Amount",dataname:"AMOUNT",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
			
		]
		var BillGridDtl=			//69995
		{
			title:"Bill Summary",
			id:"invoiceMapGrid",
			detail:BillGridFieldObj,
			visibleRow:7,
			readOnly:true,
			removeAddDelete:true
		
		}
		var BillGridSection = plf.addGrid(BillGridDtl,this)			//69995
		//Invoice section Ends
		
		//Main Page layout starts
		mainpage.ptrMainSection.add(BillHdrColumn) 
		mainpage.ptrMainSection.add(tripdetGridSection) 
		mainpage.ptrMainSection.add(BillDtColumn) 
		mainpage.ptrMainSection.add(BillGridSection) 
		//Main Page layout ends
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"initTripInvDetailsTS"
			},
			{       
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strCarCode","strRegionCodeFrom","strRegionCodeTo","dtTripDateFrom",
						 "dtTripDateTo","strTripSheetNo","strLoadNo"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"fetchTrpDetailsTS"
			},	
			{       
				"controlid":"btnBill",
				"tasktype":"btnclick",
				"input":["tripMapGrid","dtInvoiceDate"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"processTrpInvoiceTS"
			},	
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["invoiceMapGrid"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"confirmTrpInvoiceTS"
			}			
			
		];
		
		
		mainpage.screenLinks=
		{
		
			"finInvSumView":
				{
					"dest":"finance.CarrierBillDetails",
					"hdr":[
							{"src":"","dest":""}						
							],
					"grid":[
							{"src":"INVOICE_NO","dest":"strInvoiceNo"}	
							]
				}
		
		}
		/*
		mainpage.hlpLinks=
		{
			"fin_viewinvoice":
				{
					"dest":"finance.InvoiceDetails",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
			
		}
		*/
		
		this.callParent(arguments);
		
	}
});
