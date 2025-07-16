/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Manibharathi	04/02/2016      69952					Status Combo Alignment               
1.0.2		Bhuvan			05-Feb-2016	    69995	                Added var for all local variable
************************************************************************************************/
Ext.define('CueTrans.view.finance.InvoiceSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Invoice Summary";
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=
		[
			{"name":"Process Invoice","linkid":"fin_processinvoice","tooltip":"Click here to process invoice."}
		]
			
		plf.columns = 4
		var finInvSumHdrCollapse = plf.addCollapseSection({title:"Search Criteria", collapsed:true,btnID:"searchBtn"},this);		//69995
		
		var finInvSumFormCtrl=		//69995
		[
			plf.addText({"label":"Invoice No",id:"strInvoiceFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Invoice No To",id:"strInvoiceTo"}),
			plf.addDate({"label":"Invoice Date From",id:"dtInvoiceFromDate"}),
			plf.addDate({"label":"Invoice Date To",id:"dtInvoiceToDate"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Customer Code",id:"strCustCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Customer Code To",id:"strCustCodeTo"}),
			plf.addBlank({}),
			plf.addBlank({})
			
		]
		
		finInvSumHdrCollapse.add(finInvSumFormCtrl);
	
		
		
		var finInvSumGridFieldObj=			//69995
		[
			{columnname:"Invoice No",dataname:"INVOICE_NO",datatype:"string",width:150,linkId:"finInvSumView","tooltip":"Click here to view invoice details."},
			{columnname:"Invoice Date",dataname:"INVOICE_DATE",datatype:"string",width:100},
			{columnname:"Customer Code",dataname:"CUST_CODE",datatype:"string",datatype:"string",width:100},
			{columnname:"Customer Name",dataname:"CUST_NAME",datatype:"string",width:200},
			{columnname:"No of<BR>Processed Requests",dataname:"NO_REQUEST",datatype:"string",width:130,colAlign:'right'},
			{columnname:"Invoice Amount",dataname:"AMOUNT",datatype:"string",width:130,colAlign:'right',weightPrecision:2},
			{columnname:"Total Weight<BR>(ton)",dataname:"WEIGHT",datatype:"string",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Total Volume<BR>(cu.m)",dataname:"VOLUME",datatype:"string",width:130,colAlign:'right',weightPrecision:3},		
			{columnname:"Status",dataname:"STATUS",datatype:"string",datatype:"string",width:100}			
		]
		var finInvSumGridDtl=			//69995
		{
			title:"",
			id:"invsumGrid",
			detail:finInvSumGridFieldObj,
			visibleRow:10,
			readonly:true,
			removeAddDelete:true
		}
		
		//charge Grid Section Ends
		
		//Add Child Sections
	
		mainpage.ptrMainSection.add(finInvSumHdrCollapse)//Add Header Section to Main Page
		var InvSumSection=plf.addGrid(finInvSumGridDtl,this)			//69995
		mainpage.InvSumGridPtr = InvSumSection
		mainpage.ptrMainSection.add(InvSumSection) 
		
	
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"initInvSummaryTS"
			},
			{
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strInvoiceFrom","strStatus","dtInvoiceFromDate","dtInvoiceToDate",
						 "strCustCodeFrom"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"fetchInvSummaryTS"
			}
		];
		
		mainpage.hlpLinks=
		{			
		
		}
	
		mainpage.screenLinks=
		{
				"fin_processinvoice":
				{
					"dest":"finance.ProcessInvoice",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
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
		
		this.callParent(arguments);
		
	}
});