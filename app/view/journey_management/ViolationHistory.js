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

Ext.define('CueTrans.view.journey_management.ViolationHistory', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();		
		mainpage.screenName = "Violation History";
		
		mainpage.toolbarSectionFlag=true;
	
		mainpage.toolbarActions= [ ]
		
		//Add Keyfields
		mainpage.keyFields=[""]
		
		//Org Header Section Begins
		
		
		plf.columns=4
		var JPDriVioHdrFieldset = plf.addColumnSection({title:"Journey Details"});
		var JPDriVioFormCtrl1=													
		[
			plf.addHlpText({"label":"Journey Plan No",id:"strJourneyPlanNo",hlpLinkID:"jpno",inputFormat:"string",InputLength:"80"},this),
			plf.addDisplayOnly({"label":"Journey Mgr Name",id:"strJourneyManagerName"}),
			plf.addDisplayOnly({"label":"Phone Number",id:"strPhoneNo"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"})		
	
		]
		JPDriVioHdrFieldset.add(JPDriVioFormCtrl1);
    
		
		
		var JPDriVioGridFieldObj=
		[   
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Driver Phone no",dataname:"DRIVER_PH_NO",datatype:"string",editControl:"addDisplayOnly",width:100},
			{columnname:"Violation Code",dataname:"VIOLATION_CODE",datatype:"string",editControl:"addDisplayOnly",width:200},
			{columnname:"Violation Type",dataname:"VIOLATION_TYPE",datatype:"string",editControl:"addDisplayOnly",width:200},
			{columnname:"Description",dataname:"VIOLATION_DESC",datatype:"string",editControl:"addDisplayOnly",width:200},
			{columnname:"Current Violations",dataname:"CURRENT_VIOLATION",datatype:"string",editControl:"addDisplayOnly",width:120},
			{columnname:"Action Date",dataname:"ACTION_DATE",datatype:"string",editControl:"addDisplayOnly",width:120},
			{columnname:"Action By",dataname:"ACTION_BY",datatype:"string",editControl:"addDisplayOnly",width:120}
			//{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"addDisplayOnly",width:150}
					
		]
		var JPDriVioGridFielGridDtl=
		{
			title:"",
			id:"violationDetails",
			detail:JPDriVioGridFieldObj,
            visibleRow:plf.helpVisibleRows,
			removeAddDelete:true
		}
		
		JPDrivVioGridSection = plf.addGrid(JPDriVioGridFielGridDtl,this)	
		
		mainpage.ptrMainSection.add(JPDriVioHdrFieldset)
		mainpage.ptrMainSection.add(JPDrivVioGridSection)
		
	    mainpage.eventHandlers = 
		[
			{
				"controlid":"strJourneyPlanNo",
				"tasktype":"onload",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"initJPDriVioHistoryTS"
			},
		    {
			"controlid":"strJourneyPlanNo",
			"tasktype":"onenter",
			"input":["strJourneyPlanNo"],
			"service":"CoreJourneyPlanService",
			"methodName":"initJPDriVioHistoryTS"
			 }
				
		];
		
	     mainpage.hlpLinks=
			{
				
		    	"jpno":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.JourneyPlanHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strJourneyPlanNo","child":"JOURNEY_PLAN_NO"}
							]
				}
			  
			}
		
		this.callParent(arguments);
		
	
	}
});