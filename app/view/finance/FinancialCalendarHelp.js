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
Ext.define('CueTrans.view.finance.FinancialCalendarHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true
		mainpage.startPainting();
		
		mainpage.screenName = "Financial Calendar Search";
		
			
		plf.columns = 3
		var finCalendarHdrCollapse = plf.addCollapseSection({title:"Search Criteria", collapsed:true,btnID:"searchBtn"},this);			//69995
		
		var finCalendarFormCtrl=			//69995
		[
			plf.addText({"label":"Financial Year Code From",id:"strFinYearCodeFrom"}),
			plf.addText({"label":"Financial Year Code To",id:"strFinYearCodeTo"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Description",id:"strFinYearDesc"}),
			plf.addDate({"label":"Start Date",id:"dtStartDate"}),
			plf.addDate({"label":"End Date",id:"dtEndDate"})
			
		]
		
		finCalendarHdrCollapse.add(finCalendarFormCtrl);
	
		
		
		var finCalendarGridFieldObj=			//69995
		[
			{columnname:"Financial Year Code",dataname:"FIN_YEAR_CODE",datatype:"string",width:150},
			{columnname:"Description",dataname:"FIN_DESC",datatype:"string",width:150},
			{columnname:"Start Date",dataname:"START_DATE",datatype:"string",width:100},
			{columnname:"End Date",dataname:"END_DATE",datatype:"string",width:130},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:130}
		]
		var finCalendarGridDtl=					//69995
		{
			title:"",
			id:"finCalGrid",
			detail:finCalendarGridFieldObj,
			visibleRow:plf.searchVisibleRows,
			readOnly:true,
			removeAddDelete:true
		}
		
		//charge Grid Section Ends
		
		//Add Child Sections
	
		mainpage.ptrMainSection.add(finCalendarHdrCollapse)//Add Header Section to Main Page
		var helpGridSection=plf.addGrid(finCalendarGridDtl,this)		//69995
		mainpage.hlpSearchGridPtr = helpGridSection
		mainpage.ptrMainSection.add(helpGridSection) 
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"iniFinCalSrchTS"
			},
			{
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strFinYearCodeFrom","strFinYearCodeTo","strStatus","strFinYearDesc","dtStartDate","dtEndDate"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"fetchAllFinCalTS"
			}
		
		];
	
		this.callParent(arguments);
		
	}
});
