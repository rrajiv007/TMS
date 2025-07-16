/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.PDOFinance.PDOSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Carrier Bill Summary";
		mainpage.toolbarSectionFlag=true;
 
			
		plf.columns = 4
		var finInvSumHdrCollapse = plf.addCollapseSection({title:"Search Criteria", collapsed:true,btnID:"searchBtn"},this);		//69995
		
		var finInvSumFormCtrl=					
		[
			plf.addCombo({"label":"Date Type",id:"strDateType"}),
			plf.addDate({"label":"Date From",id:"dtInvoiceFromDate"}), 
			plf.addDate({"label":"Date To",id:"dtInvoiceToDate"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Carrier Bill ID",id:"strBillNo"}),
			plf.addText({"label":"Carrier Bill Description",id:"strBillDesc"})
		]
		
		finInvSumHdrCollapse.add(finInvSumFormCtrl);	
		
		var finInvSumGridFieldObj=
		[
			{columnname:"Carrier Bill ID",dataname:"BILL_NO",datatype:"string",width:150,linkId:"finInvSumView","tooltip":"Click here to view carrier bill details."},
			{columnname:"Carrier Bill Description",dataname:"BILL_DESC",datatype:"string",width:150},
			{columnname:"Carrier Bill Period",dataname:"BILL_PERIOD",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",datatype:"string",width:100},
			{columnname:"No of Contractor Bills Generated",dataname:"NO_CONBILL",datatype:"string",width:200,colAlign:'right'},
			{columnname:"No of Trips Processed",dataname:"NO_TRIPS",datatype:"string",width:130,colAlign:'right'},
			{columnname:"No of Loads Processed",dataname:"NO_LOADS",datatype:"string",width:130,colAlign:'right'},
			{columnname:"Amount",dataname:"AMOUNT",datatype:"string",width:130,colAlign:'right'}	
		]
		var finInvSumGridDtl=			//69995
		{
			title:"",
			id:"billsumGrid",
			detail:finInvSumGridFieldObj,
			visibleRow:13,
			readonly:true,
			removeAddDelete:true,
			widthBasis:"flex"
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
				"methodName":"PDOinitCarOPSSummaryTS"
			},
			{
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strDateType","dtInvoiceFromDate","dtInvoiceToDate","strBillNo","strBillDesc","strStatus"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"PDOfetchCarOPSSummaryTS"
			}
		
		];
		
		mainpage.screenLinks=
		{
				"fin_pendingTrip":
				{
					"dest":"PDOFinance.PDOCarrierPendingTrip",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"fin_LoadWOShip":
				{
					"dest":"PDOFinance.PDOPendingLoadWOShip",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"fin_processbill":
				{
					"dest":"PDOFinance.PDOProcessCarrierBill",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"finInvSumView":
				{
					"dest":"PDOFinance.PDOViewCarrierPDOOTOBill",
					"hdr":[
							{"src":"","dest":""}						
							],
					"grid":[
							{"src":"BILL_NO","dest":"strBillNo"}	
							]
				},
				"fin_loadbill":
				{
					"dest":"PDOFinance.PDOViewLoadDetails",
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
