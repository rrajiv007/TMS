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
Ext.define('CueTrans.view.jm_master.ViolationsEscalations', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Violations Escalations";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Refresh","Create","Edit","Delete","Confirm","Print","Short Close","Customer Approved"]
		
		
		//Add the header portion
		plf.columns=4
		var violationEscalationColumn = plf.addColumnSection({});			//69995
		
		if(plf.defaultLayout==3)
		{
			plf.columns=4
			
		
			
		var violEscalationFormCtrl=				//69995
		[
		 	plf.addText({"label":"Escalation No",id:""}),
			plf.addDate({"label":"Escalation Date",id:""}),
			plf.addText({"label":"Customer Code",id:""}),
			plf.addDisplayOnly({"label":"Customer Name",id:""}),
			
			plf.addText({"label":"Driver Code",id:""}),
			plf.addDisplayOnly({"label":"Driver Name",id:""}),
			plf.addDisplayOnly({"label":"Carrier Name",id:""}),
			plf.addText({"label":"Attachment",id:""}),
			plf.addText({"label":"Remarks",id:"",inputFormat:"string",InputLength:"100"})
				
		]
		
		
		}
		
		else
		{
		var violEscalationFormCtrl=										//69995
		[
			
			plf.addText({"label":"Escalation No",id:""}),
			plf.addDate({"label":"Escalation Date",id:""}),
			plf.addText({"label":"Attachment",id:""}),
			
			plf.addText({"label":"Customer Code",id:""}),
			plf.addDisplayOnly({"label":"Customer Name",id:""}),
			plf.addText({"label":"Remarks",id:"",inputFormat:"string",InputLength:"100"}),
			
			plf.addText({"label":"Driver Code",id:""}),
			plf.addDisplayOnly({"label":"Driver Name",id:""}),
			plf.addDisplayOnly({"label":"Carrier Name",id:""}),
			
			
			
		]
		
		}	
		
		//Add the journey part of the Violation summary screen
		plf.columns=4
		var violationEscalationJourneyColumn = plf.addColumnSection({});			//69995
		if(plf.defaultLayout==3)
		{
					
		  plf.columns=4			
		  var violationEscalationJourneyFormCtrl=									//69995
		 [
		 	plf.addDate({"label":"Journey Date From",id:""}),
			plf.addDate({"label":"Journey Date To",id:""}),
			plf.addButton({"label":"Get Details","id":"btnGetDetails"}),
			plf.addBlank()
		]
			
		}
		
		else
		{
		var violationEscalationJourneyFormCtrl=						//69995
		[
			
			plf.addDate({"label":"Journey Date From",id:""}),
			plf.addDate({"label":"Journey Date To",id:""}),
			plf.addButton({"label":"Get Details","id":"btnGetDetails"})
			
		]
		
		}	
		
		var ViolationEscalationFieldObj=							//69995
		[
			{columnname:"Journey plan No",dataname:"",datatype:"string",width:200}, 
			{columnname:"Journey Plan Date",dataname:"",datatype:"string",width:200},
			{columnname:"Vehicle Code",dataname:"",datatype:"string",width:200},
			{columnname:"Origin",dataname:"",datatype:"string",width:100},
			{columnname:"Destination",dataname:"",datatype:"string",width:100},
			{columnname:"Violation Date",dataname:"",datatype:"string",width:100},
			{columnname:"Violation Description",dataname:"",datatype:"string",width:190},
			{columnname:"Violation Expiry",dataname:"",datatype:"string",width:150}
			
		]
		var violationEscalationGridDtl=			//69995
		{
			title:"Violations",
			id:"violationGridDtl",
			detail:ViolationEscalationFieldObj,
			visibleRow:plf.searchVisibleRows,
			readonly:true
		}
		var violationEscalationGridSection = plf.addGrid(violationEscalationGridDtl,this)	//69995
		
		
		
		
		violationEscalationColumn.add(violEscalationFormCtrl);
		violationEscalationJourneyColumn.add(violationEscalationJourneyFormCtrl);
		
		
		
		
		mainpage.ptrMainSection.add(violationEscalationColumn)
		mainpage.ptrMainSection.add(violationEscalationJourneyColumn)
		mainpage.ptrMainSection.add(violationEscalationGridSection)//Add Header Section to Main Page//Add Header Section to Main Page
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	      
		
		];
		
		
		this.callParent(arguments);
		
	}
});
