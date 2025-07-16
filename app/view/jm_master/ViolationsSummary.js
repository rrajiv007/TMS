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
Ext.define('CueTrans.view.jm_master.ViolationsSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Violations Summary";
		mainpage.toolbarSectionFlag=true;
		
		
		
		plf.columns=3
		var helpOnVioSummHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnGetDetails"},this);		//69995
		
		var violationSummaryCtrl=				//69995
		[
			plf.addText({"label":"Driver Code",id:""}),
			plf.addDisplayOnly({"label":"Driver Name",id:""}),
			plf.addDisplayOnly({"label":"Carrier Name",id:""}),
			plf.addDate({"label":"Journey Date From",id:""}),
			plf.addDate({"label":"Journey Date To",id:""}),
			//plf.addBlank(),
			//plf.addBlank(),
			//plf.addButton({"label":"Get Details","id":"btnGetDetails","tooltip":"Click here to fetch the violation details."})
			
		]
		
		helpOnVioSummHdrCollapse.add(violationSummaryCtrl);
		
		
		
		var violSummGridFieldObj=			//69995
		[ 
			{columnname:"Journey Plan No",dataname:"",datatype:"string",width:150}, 
			{columnname:"Journey Plan Date",dataname:"",datatype:"string",width:150},
			{columnname:"Vehicle Code",dataname:"",datatype:"string",width:150},
			{columnname:"Origin",dataname:"",datatype:"string",width:200},
			{columnname:"Destination",dataname:"",datatype:"string",width:150},
			{columnname:"Violation Date",dataname:"",datatype:"string",width:150},
			{columnname:"Violation Description",dataname:"",datatype:"string",width:150},
			{columnname:"Violation Expiry",dataname:"",datatype:"string",width:150},
					
		]
		var violSumGridDtl=			//69995
		{
			title:"",
			id:"itemGrid",
			detail:violSummGridFieldObj,
			visibleRow:plf.searchVisibleRows,
		    removeAddDelete:true
		}
		
		
		var itemGridSection = plf.addGrid(violSumGridDtl,this)			//69995
		mainpage.ptrMainSection.add(helpOnVioSummHdrCollapse)
		mainpage.ptrMainSection.add(itemGridSection) 
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	       			
		];
		
		
		
		
			this.callParent(arguments);
		
	}
});
