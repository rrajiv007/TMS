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
Ext.define('CueTrans.view.PDOFinance.BillExceptionReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function() 
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Bill Exception Report";
		mainpage.toolbarSectionFlag=true;
        
			
		plf.columns = 4
		var BillExcRptSumHdrCollapse = plf.addCollapseSection({title:"Search Criteria", collapsed:false,btnID:"searchBtn"},this);		
		
		var BillExcRptSumFormCtrl=	
		[
		
			plf.addText({"label":"Carrier Bill No",id:"strBillNo"}),
			plf.addText({"label":"Load No",id:"strLoadNo"}),
			plf.addText({"label":"Trip No",id:"strTripSheetNo"})
			
			
		]
		
		BillExcRptSumHdrCollapse.add(BillExcRptSumFormCtrl);
	
		
		
		var BillExcRptSumGridFieldObj=			
		[
		
			
			{columnname:"Carrier Bill ID",dataname:"BILL_NO",datatype:"string",width:"auto"},
			{columnname:"Carrier Bill Description",dataname:"BILL_DESC",datatype:"string",width:"auto"},
			{columnname:"Carrier Bill Period",dataname:"BILL_PERIOD",datatype:"string",width:"auto"},
			{columnname:"Carrier Bill Status",dataname:"STATUS",datatype:"string",datatype:"string",width:"auto"},
			
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:"auto"},		
			{columnname:"Load Closure Date",dataname:"LOAD_CLS_DT",datatype:"string",width:"auto"},
			{columnname:"Load Category",dataname:"LOAD_CAT",datatype:"string",width:"auto"},
			{columnname:"Load Type",dataname:"LOAD_TYPE",datatype:"string",width:"auto"},
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:"auto"},
			{columnname:"Trip Closure Date",dataname:"TRIP_CLS_DT",datatype:"string",width:"auto"}
			
		]
		var BillExcRptSumGridDtl=			
		{
			title:"",
			id:"loadDetailsGrid",
			detail:BillExcRptSumGridFieldObj,
			visibleRow:13,
			readonly:true,
			removeAddDelete:true
		}
		
		//charge Grid Section Ends
		
		//Add Child Sections
	
		mainpage.ptrMainSection.add(BillExcRptSumHdrCollapse)//Add Header Section to Main Page
		var BillExcRptSumSection=plf.addGrid(BillExcRptSumGridDtl,this)			
		mainpage.BillExcRptSumGridPtr = BillExcRptSumSection
		mainpage.ptrMainSection.add(BillExcRptSumSection) 
		
	// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[	
			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"initBillExcepDetails"
			},
			{
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strBillNo","strLoadNo","strTripSheetNo"			 
						],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"fetchBillExcepDetails"
			}
			
		];
		
		mainpage.screenLinks=
		{
			
		}		
		this.callParent(arguments);
		
	}
});
