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
Ext.define('CueTrans.view.PDOFinance.PrivousTripHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		mainpage.screenName = "Help on Carrier Bill";		
		
		//Master Section starts

		var formCtrl=[];
		plf.columns=3
		var privTripHelpColumn = plf.addColumnSection({collapsed: false});
		
		
		var privTripHelpFormCtrl=
		[
			
			plf.addCombo({"label":"Date Type",id:"strDateType"}),
			plf.addDate({"label":"Date From",id:"dtInvoiceFromDate"}), 
			plf.addDate({"label":"Date To",id:"dtInvoiceToDate"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Carrier Bill ID",id:"strBillNo"}),
			plf.addText({"label":"Carrier Bill Description",id:"strBillDesc"}),		
			plf.addButton({"label":"Search","id":"searchBtn","tooltip":"Click here to search."})
			
			
		]
		
		privTripHelpColumn.add(privTripHelpFormCtrl);
		
		
		var privTripHelpObj=
		[
			
			{columnname:"Carrier Bill ID",dataname:"BILL_NO",datatype:"string",width:150},
			{columnname:"Carrier Bill Description",dataname:"BILL_DESC",datatype:"string",width:150},
			{columnname:"Carrier Bill Period",dataname:"BILL_PERIOD",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",datatype:"string",width:100},
			{columnname:"No of Contractor Bills Generated",dataname:"NO_CONBILL",datatype:"string",width:200,colAlign:'right'},
			{columnname:"No of Trips Processed",dataname:"NO_TRIPS",datatype:"string",width:130,colAlign:'right'},
			{columnname:"No of Loads Processed",dataname:"NO_LOADS",datatype:"string",width:130,colAlign:'right'},
			{columnname:"Amount",dataname:"AMOUNT",datatype:"string",width:130,colAlign:'right'} 
			
		]
		privTripHelpGridDetail=
		{
			title:"",
			id:"billsumGrid",
			detail:privTripHelpObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
			
		}
		privTripHelpGridSection = plf.addGrid(privTripHelpGridDetail,this)	
		mainpage.hlpSearchGridPtr = privTripHelpGridSection
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(privTripHelpColumn)
		mainpage.ptrMainSection.add(privTripHelpGridSection) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		
			mainpage.eventHandlers = 
			[	

				{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"FINCoreFinanceServiceTS",
					"methodName":"PDOinitCarSummaryTS"
				},
				{
					"controlid":"searchBtn",
					"tasktype":"btnclick",
					"input":["strDateType","dtInvoiceFromDate","dtInvoiceToDate","strBillNo","strBillDesc","strStatus"],
					"service":"FINCoreFinanceServiceTS",
					"methodName":"PDOfetchCarSummaryTS"
				}
			];
			mainpage.hlpLinks=
		{			

					
		}		
		
	
		
		this.callParent(arguments);
		
	
	}
});
