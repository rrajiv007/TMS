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
Ext.define('CueTrans.view.finance.ProcessInvoice', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Process Invoice";
		
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
                "tooltip": "Click here to confirm the invoice details."
            }
            ]


		plf.columns=4
		var InvoiceHdrColumn = plf.addColumnSection({});			//69995
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var InvoiceHdrCtrl=		//69995
			[	
			    plf.addText({"label":"Customer Code From",id:"strCustCodeFrom"},this),	
				plf.addText({"label":"Customer Code To",id:"strCustCodeTo"}),
				plf.addCombo({"label":"Region From",id:"strRegionCodeFrom"}),
				plf.addCombo({"label":"Region To",id:"strRegionCodeTo"}),
				
				
				plf.addDate({"label":"Delivered Date From",id:"dtDelDateFrom"}),	
				plf.addDate({"label":"Delivered Date To",id:"dtDelDateTo"}),
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
			var InvoiceHdrCtrl=				//69995
			[	
				 plf.addText({"label":"Customer Code From",id:"strCustCodeFrom"},this),	
				plf.addText({"label":"Customer Code To",id:"strCustCodeTo"}),
				plf.addCombo({"label":"Region From",id:"strRegionCodeFrom"}),
				
				plf.addCombo({"label":"Region To",id:"strRegionCodeTo"}),
				plf.addDate({"label":"Delivered Date From",id:"dtDelDateFrom"}),	
				plf.addDate({"label":"Delivered Date To",id:"dtDelDateTo"}),
				
				plf.addBlank(),
				plf.addButton({"label":"Fetch Details",id:"btnSearch","tooltip":"Click here to fetch request details."}),
				plf.addBlank()
				
				
			]
		}	
		
		InvoiceHdrColumn.add(InvoiceHdrCtrl)
		
		
		//Request section starts
		
		var requestdetGridFieldObj=				//69995
		[   
			{columnname:"Request No",dataname:"REQUEST_NO",datatype:"string",width:150},
			{columnname:"Customer<BR>Code",dataname:"CUST_CODE",datatype:"string",width:80},
			{columnname:"Customer<BR>Name",dataname:"CUST_NAME",datatype:"string",width:200},
			{columnname:"Delivered<BR>Date",dataname:"DEL_DATE",datatype:"string",width:100},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:100},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:100},
			{columnname:"Priority",dataname:"PRIORITY",datatype:"string",width:100},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:100},
			{columnname:"Total Weight<BR>(tons)",dataname:"WEIGHT",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Total Volume<BR>(cu.m)",dataname:"VOLUME",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
			
		]
		var requestdetGridDtl=			//69995
		{
			title:"Request Details",
			id:"reqMapGrid",
			detail:requestdetGridFieldObj,
			visibleRow:7,
			readOnly:true,
			removeAddDelete:true
		
		}
		var requestdetGridSection = plf.addGrid(requestdetGridDtl,this)			//69995
		//Request section Ends
		
		plf.columns=4
		var InvoiceDtColumn = plf.addColumnSection({});			//69995
		var InvoiceDtCtrl=										//69995
		[	
			plf.addDate({"label":"Invoice Date",id:"dtInvoiceDate"}),	
			plf.addButton({"label":"Process Invoice",id:"btnInvoice","tooltip":"Click here to process invoice."}),
			plf.addBlank(),
			plf.addBlank()
		]

		InvoiceDtColumn.add(InvoiceDtCtrl)
		
		//Invoice section starts
		
		var InvoiceGridFieldObj=				//69995
		[   
			{columnname:"Invoice No",dataname:"INVOICE_NO",datatype:"string",width:150,linkId:"finInvSumView","tooltip":"Click here to view invoice details."},
			{columnname:"Invoice Date",dataname:"INVOICE_DATE",datatype:"string",width:150,editControl:"date"},
			{columnname:"Customer Code",dataname:"CUST_CODE",datatype:"string",width:100},
			{columnname:"Customer Name",dataname:"CUST_NAME",datatype:"string",width:130},
			{columnname:"No of<BR>Processed Requests",dataname:"NO_REQUEST",datatype:"string",width:130,colAlign:'right'},
			{columnname:"Invoice Amount",dataname:"AMOUNT",datatype:"string",width:130,colAlign:'right',weightPrecision:2},
			{columnname:"Total Weight<BR>(tons)",dataname:"WEIGHT",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Total Volume<BR>(cu.m)",dataname:"VOLUME",datatype:"string",width:130,colAlign:'right',weightPrecision:3},		
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
			
		]
		var InvoiceGridDtl=					//69995
		{
			title:"Invoice Summary",
			id:"invoiceMapGrid",
			detail:InvoiceGridFieldObj,
			visibleRow:7,
			readOnly:true,
			removeAddDelete:true
		
		}
		var InvoiceGridSection = plf.addGrid(InvoiceGridDtl,this)			//69995
		//Invoice section Ends
		
		//Main Page layout starts
		mainpage.ptrMainSection.add(InvoiceHdrColumn) 
		mainpage.ptrMainSection.add(requestdetGridSection) 
		mainpage.ptrMainSection.add(InvoiceDtColumn) 
		mainpage.ptrMainSection.add(InvoiceGridSection) 
		//Main Page layout ends
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strInvoiceCode","dtInvoiceDate"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"initReqInvDetailsTS"
			},
			{       
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strCustCodeFrom","strCustCodeTo","strRegionCodeFrom","strRegionCodeTo","dtDelDateFrom",
						 "dtDelDateTo"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"fetchReqDetailsTS"
			},	
			{       
				"controlid":"btnInvoice",
				"tasktype":"btnclick",
				"input":["reqMapGrid","dtInvoiceDate"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"processInvoiceTS"
			},	
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["invoiceMapGrid"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"confirmInvoiceTS"
			}			
			
		];
		
		
		mainpage.screenLinks=
		{
		
			"finInvSumView":
				{
					"dest":"finance.InvoiceDetails",
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
