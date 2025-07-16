/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.2
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Manibharathi	04/02/2016      69952					Status Combo Alignment
1.0.2		Bhuvan			05-Feb-2016	  	69995	                Added var for all local variable
************************************************************************************************/
Ext.define('CueTrans.view.finance.CarrierBillSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Carrier Bill Summary";
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=
		[
			{"name":"Process Carrier Bill","linkid":"fin_processbill","tooltip":"Click here to process carrier bill."}
		]
			
		plf.columns = 3
		var finInvSumHdrCollapse = plf.addCollapseSection({title:"Search Criteria", collapsed:true,btnID:"searchBtn"},this);		//69995
		
		var finInvSumFormCtrl=					//69995
		[
			plf.addText({"label":"Bill No",id:"strInvoiceFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Bill No To",id:"strBillNoTo"}),
			plf.addText({"label":"Carrier Code",id:"strCarCode","anywhereSearch":"true"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addDate({"label":"Bill Date From",id:"dtInvoiceFromDate"}),
			plf.addDate({"label":"Bill Date To",id:"dtInvoiceToDate"}),
		//	plf.addText({"label":"Carrier Code To",id:"strCarCodeTo"}),
			plf.addBlank({}),
			plf.addBlank({})
			
		]
		
		finInvSumHdrCollapse.add(finInvSumFormCtrl);
	
		
		
		var finInvSumGridFieldObj=			//69995
		[
			{columnname:"Bill No",dataname:"INVOICE_NO",datatype:"string",width:150,linkId:"finInvSumView","tooltip":"Click here to view invoice details."},
			{columnname:"Bill Date",dataname:"INVOICE_DATE",datatype:"string",width:100},
			{columnname:"Carrier Code",dataname:"CAR_CODE",datatype:"string",datatype:"string",width:100},
			{columnname:"Carrier Name",dataname:"CAR_NAME",datatype:"string",width:200},
			{columnname:"No of<BR>Processed Trips",dataname:"NO_TRIPS",datatype:"string",width:130,colAlign:'right'},
			{columnname:"Total Distance",dataname:"TOT_DIS",datatype:"string",width:130,colAlign:'right',weightPrecision:2},
			{columnname:"Bill Amount",dataname:"AMOUNT",datatype:"string",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Status",dataname:"STATUS",datatype:"string",datatype:"string",width:100},
			
		]
		var finInvSumGridDtl=			//69995
		{
			title:"",
			id:"billsumGrid",
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
				"methodName":"initCarSummaryTS"
			},
			{
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strInvoiceFrom","strStatus","dtInvoiceFromDate","dtInvoiceToDate","strCarCode"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"fetchCarSummaryTS"
			}
		
		];
		
		mainpage.hlpLinks=
		{
		
			
		
		}
	
		mainpage.screenLinks=
		{
			
				"fin_processbill":
				{
					"dest":"finance.ProcessCarrierBill",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
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
		
		this.callParent(arguments);
		
	}
});
