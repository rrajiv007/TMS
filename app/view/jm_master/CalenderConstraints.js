/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1														                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	            Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.CalenderConstraints', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Calender Constraints Mapping";
		
		//Add Keyfields
		mainpage.keyFields=["strCalenderCode"]
		
		//toolbar actions
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Maintain"]
		
		mainpage.toolbarLinks=
		[
			{"name":"Calendar Master","linkid":"jm_calendarmaster"},
			{"name":"Calendar Exceptions","linkid":"jm_calendarexceptions"}
		]
		
		//Calendar Constraint Mapping header section starts

		var formCtrl=[];
		plf.columns=2
		var calendarConstraintsMasterColumn = plf.addColumnSection({});		//69995
		
		
		var calendarConstraintsMasterColumnFormCtrl=						//69995
		[
			plf.addHlpText({"label":"Calendar Code",id:"strCalenderCode","mandatory":"true",hlpLinkID:"calendarcode",inputFormat:"string",InputLength:"40"},this),	
		//	plf.addText({"label":"Calendar Code",id:"strCalendarCode","mandatory":"true"}),
			plf.addText({"label":"Calendar Description","id":"strCalendarDesc","mandatory":"true",inputFormat:"string",InputLength:"100"}),
		//	plf.addButton({"label":"Submit","id":"btnSubmit"})
		]
		
		calendarConstraintsMasterColumn.add(calendarConstraintsMasterColumnFormCtrl);
		//Calendar consraint mapping header section endsSection Ends
		
		
		//Adding Grid to Calendar Constraint Master
		var calConstraintGridFieldObj=				//69995
		[
			{columnname:"Constraint Code",dataname:"CONSTRAINT_CODE",datatype:"string",editControl:"textbox",width:300,helpid:'constraintcode',"onenter":"CONSTRAINT_CODE_ONENTER"},
			{columnname:"Constraint Description",dataname:"CONSTRAINT_DESC",datatype:"string",editControl:"textbox",	width:300}
		
		]
		var calConstraintGridDtl=				//69995
		{
			title:"Calendar Constraint Mapping",
			id:"calenderContraint",
			detail:calConstraintGridFieldObj
		}
		var calExcGridSection = plf.addGrid(calConstraintGridDtl,this)			//69995
		//Calendar Exception Grid Ends*/
		
		//Add Child Sections
		mainpage.ptrMainSection.add(calendarConstraintsMasterColumn)//Add Header Section to Main 
		mainpage.ptrMainSection.add(calExcGridSection) //Add Grid Section to Calendar Exception Page
		
		mainpage.hlpLinks=
		{
			"calendarcode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CalendarHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCalenderCode","child":"CALENDAR_CODE"}
							]
				},
				
			"constraintcode":
				{
					"hlpType":"grid",
					"gridID":"calenderContraint",
					"hlpScreen":"jm_master.ConstraintHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					{"parent":"CONSTRAINT_CODE","child":"CONSTRAINT_CODE"}
					//,{"parent":"CONSTRAINT_DESC","child":"CONSTRAINT_DESC"}
							]
				}
			
			
		}
		
		
		
		mainpage.screenLinks=
		{
			"jm_calendarmaster":
				{
					"dest":"jm_master.CalendarMaster",
					"hdr":[
							{"src":"strCalenderCode","dest":"strCalenderCode"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
			"jm_calendarexceptions":
			{
					"dest":"jm_master.CalendarExceptions",
					"hdr":[
							{"src":"strCalenderCode","dest":"strCalenderCode"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
				
		}				
		
		
		//History Data Section
		//mainpage.dataHistorySectionFlag=true;
			mainpage.eventHandlers = 
			[
               {
					"grideventid":"CONSTRAINT_CODE_ONENTER",
					"tasktype":"gridonenter",
					"input":["CONSTRAINT_CODE","strConstraintCode"],
					"service":"CoreConstraintService",
					"methodName":"fetchConstraintName"
			},  
        	 {       
				"controlid":"strCalenderCode",
				"tasktype":"onenter",
				"input":["strCalenderCode","calenderConstraintGrid"],
				"service":"CoreConstraintService",
				"methodName":"fetchCalenderConstraintsMappingTS"
			},
				{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Maintain",
				    "input":["calenderContraint","strCalenderCode"],
					"service":"CoreConstraintService",
					"methodName":"maintainCalenderConstraintsMappingTS"
			},
			 {
					"controlid":"",
					"tasktype":"onload",
					"input":["strCalenderCode"],
					"service":"CoreConstraintService",
					"methodName":"fetchCalenderConstraintsMappingTS"
				},		
			
		
				
			];
			//Event Handlers Mapping Ends
				
		this.callParent(arguments);
		
	
	}
});
