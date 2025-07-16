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
Ext.define('CueTrans.view.finance.FinancialCalendarMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Financial Calendar Master";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		
		mainpage.toolbarActions= [
			{
                "name": "Create",
                "tooltip": "Click here to create a financial calendar."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a financial calendar."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a financial calendar."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate a financial calendar."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate a financial calendar."
            }
            ]


		plf.columns=4
		var finCalendarHdrColumn = plf.addColumnSection({});		//69995
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var finCalendarHdrCtrl1=			//69995
			[	
			    plf.addHlpText({"label":"Financial Year Code",id:"strFinYearCode","mandatory":"true",hlpLinkID:"finCalhelp"},this),	
				plf.addText({"label":"Description",id:"strFinYearDesc","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addDate({"label":"Start Date",id:"dtStartDate","mandatory":"true"}),
				plf.addDate({"label":"End Date",id:"dtEndDate","mandatory":"true"}),
			]
		
		}
		
		else
		{
			var finCalendarHdrCtrl1=			//69995
			[	
				plf.addHlpText({"label":"Financial Year Code",id:"strFinYearCode","mandatory":"true",hlpLinkID:"finCalhelp"},this),	
				plf.addText({"label":"Description",id:"strFinYearDesc","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addDate({"label":"Start Date",id:"dtStartDate","mandatory":"true"}),
				plf.addDate({"label":"End Date",id:"dtEndDate","mandatory":"true"}),
				
			]
		}	
		
		finCalendarHdrColumn.add(finCalendarHdrCtrl1)
		
		
		//Fetch Period Section Begins
		plf.columns=4
		var finCalendarDetailsCollapse = plf.addColumnSection({title:""});			//69995
		var finCalendarDetailsFormCtrl=				//69995
		[
			plf.addCombo({"label":"Period Frequency","id":"strPeriodFrequency"}),
			plf.addButton({"label":"Fetch Period",id:"cmn_btnsubmit","tooltip":"Click here to fetch the period."})
			
		]
		finCalendarDetailsCollapse.add(finCalendarDetailsFormCtrl);
		//Fetch Period  Section Ends
		
		//Adding Grid to Fetch Period Begins
		var finCalendarGridFieldObj=			//69995
		[
			
			{columnname:"Period<BR>Start Date",dataname:"PERIOD_START_DATE",datatype:"string",editControl:"date",width:100},			
			{columnname:"Period<BR>End Date",dataname:"PERIOD_END_DATE",datatype:"string",editControl:"date",width:100},
			{columnname:"Financial<BR>Period Code",dataname:"FIN_PERIOD_CODE",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Description",dataname:"PERIOD_DESC",datatype:"string",editControl:"textbox",width:120},
		]
		var finCalendarGridDtl=					//69995
		{
			title:"Financial Period",
			id:"finPeriod",			
			detail:finCalendarGridFieldObj,
			visibleRow:7,
		    //removeAddDelete:true
		}
		var finCalendarGridSection = plf.addGrid(finCalendarGridDtl)		//69995
		finCalendarDetailsCollapse.add(finCalendarGridSection);
		//Adding Grid to Fetch Period Ends	
		
		
		mainpage.ptrMainSection.add(finCalendarHdrColumn) 
		finCalendarDetailsCollapse.add(plf.addStripLine({}));		
		mainpage.ptrMainSection.add(finCalendarDetailsCollapse)
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strFinYearCode"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"initFinCalMasTS"
		},
				
		{
				"controlid":"strFinYearCode",
				"tasktype":"onenter",
				"input":["strFinYearCode"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"fetchFinCalCodeTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strFinYearCode","strFinYearDesc","dtStartDate","dtEndDate","strPeriodFrequency",
				        "strStatus","finPeriod"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"createFinCalTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strFinYearCode","strFinYearDesc","dtStartDate","dtEndDate","strPeriodFrequency",
				        "strStatus","finPeriod"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"editFinCalTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strFinYearCode","strFinYearDesc","dtStartDate","dtEndDate","strPeriodFrequency",
				        "strStatus","finPeriod"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"deleteFinCalTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Activate",
				"input":["strFinYearCode","strFinYearDesc","dtStartDate","dtEndDate","strPeriodFrequency",
				        "strStatus","finPeriod"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"activateFinCalTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Inactivate",
				"input":["strFinYearCode","strFinYearDesc","dtStartDate","dtEndDate","strPeriodFrequency",
				        "strStatus","finPeriod"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"inactivateFinCalTS"
		},
		{
				"controlid":"cmn_btnsubmit",
				"tasktype":"btnclick",
				"input":["dtStartDate","dtEndDate","strFinYearCode","strPeriodFrequency"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"fetchPeriodTS"
			}
		];
		
		
			mainpage.hlpLinks=
		{
			"finCalhelp":
				{
					"hlpType":"Header",
					"hlpScreen":"finance.FinancialCalendarHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strFinYearCode","child":"FIN_YEAR_CODE"}
							]
				},
				
		}
		
		
		this.callParent(arguments);
		
	}
});
