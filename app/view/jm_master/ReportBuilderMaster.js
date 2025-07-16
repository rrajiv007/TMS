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
Ext.define('CueTrans.view.jm_master.ReportBuilderMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Report Builder";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;
		mainpage.toolbarActions= [
			{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create an report."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit an report."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete an report."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate an report."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate an report."
            }
            ]
		
		
		//EmployeeMaster Header Section Begins
		plf.columns=4
		var reportbuildMasterColumn = plf.addColumnSection({title:"Schedule",collapsed: true},this);			//69995
		var reportbuildMstrCtrl=									//69995
		[
		    plf.addHlpText({"label":"Report Code",id:"strReportCode","mandatory":"true",hlpLinkID:"ReportCode",inputFormat:"string",InputLength:"100"},this),	
		    plf.addText({"label":"Report Name",id:"strReportName","mandatory":"true",inputFormat:"string",InputLength:"100"},this),	
            plf.addCombo({"label":"Report Category",id:"strReportCategory","mandatory":"true",inputFormat:"string",InputLength:"40"},this),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Report Description",id:"strReportDescription",inputFormat:"string",InputLength:"100"},this)	

		]
		reportbuildMasterColumn.add(reportbuildMstrCtrl);
		//EmployeeMaster Header Section Ends
		
		var ReportbuilderinputDtl=
		[   			
			{columnname:"Input Parameters",dataname:"INPUT_PARAMETER",datatype:"string",storeId:"strInputParameters",editControl:"combo",width:200},
			//{columnname:"Seq No",dataname:"Seq_No",datatype:"string",editControl:"textbox",width:150,inputFormat:"string",InputLength:"40"},
			//{columnname:"Name",dataname:"Name",datatype:"string",editControl:"textbox",width:150,inputFormat:"string",InputLength:"40"},

		]
		
		var ReportbuildinputDocDtlGridDtl=
		{
			title:"",
			id:"inputParDetail",
			detail:ReportbuilderinputDtl		
		}
		var ReportbuildinputDocGridSection = plf.addGrid(ReportbuildinputDocDtlGridDtl,this)	
		
		
		var ReportbuilderoutputDtl=
		[   			
			{columnname:"Output Parameters",dataname:"OUTPUT_PARAMETER",datatype:"string",storeId:"strOutputParameters",editControl:"combo",width:200},
			//{columnname:"Seq No",dataname:"Seq_No",datatype:"string",editControl:"textbox",width:150,inputFormat:"string",InputLength:"40"},
			//{columnname:"Name",dataname:"Name",datatype:"string",editControl:"textbox",width:150,inputFormat:"string",InputLength:"40"},

			]
		
		var ReportbuildoutputDocDtlGridDtl=
		{
			title:"",
			id:"outputParDetail",
			detail:ReportbuilderoutputDtl		
		}
		var ReportbuildoutputDocGridSection = plf.addGrid(ReportbuildoutputDocDtlGridDtl,this)	
		
		
		
		mainpage.ptrMainSection.add(reportbuildMasterColumn)//Add Header Section to Main Page
		
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		
		// for green line
		reportbuildMasterColumn.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(reportbuildMasterColumn)//add hdr details
		mainpage.ptrMainSection.add(ReportbuildinputDocGridSection)//Add Input Grid Section to Main Page
		mainpage.ptrMainSection.add(ReportbuildoutputDocGridSection)//Add Output Grid Section to Main Page
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[									
			{
					"controlid":"",
					"tasktype":"onload",
					"input":["strReportCode"],
					"service":"CoreReportService",
					"methodName":"initReqbuilderMasterScrTS"
			},	
			{
				"controlid":"strReportCategory",
				"tasktype":"onchange",
				"input":["strReportCategory"],
				"service":"CoreReportService",
				"methodName":"onchangeRebuTs"
			},
			
			{
					"controlid":"strReportCode",
					"tasktype":"onenter",
					"input":["strReportCode"],
					"service":"CoreReportService",
					"methodName":"fetchReqbuilderTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Create",
					"input":["strReportCategory","strReportCode","strReportName","strReportDescription","strStatus",
							 "inputParDetail","outputParDetail"],
					"service":"CoreReportService",
					"methodName":"createReqbuilderTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Edit",
					"input":["strReportCategory","strReportCode","strReportName","strReportDescription","strStatus",
							 "inputParDetail","outputParDetail"],
					"service":"CoreReportService",
					"methodName":"modifyReqbuilderTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Delete",
					"input":["strReportCategory","strReportCode","strReportName","strReportDescription","strStatus",
							 "inputParDetail","outputParDetail"],
					"service":"CoreReportService",
					"methodName":"deleteReqbuilderTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Activate",
					"input":["strReportCategory","strReportCode","strReportName","strReportDescription","strStatus",
							 "inputParDetail","outputParDetail"],
					"service":"CoreReportService",
					"methodName":"activateReqbuilderTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Inactivate",
					"input":["strReportCategory","strReportCode","strReportName","strReportDescription","strStatus",
							 "inputParDetail","outputParDetail"],
					"service":"CoreReportService",
					"methodName":"inactivateReqbuilderTS"
			}
		];
		//Event Handlers Mapping Ends
		
		//Generate Screen Section
		//mainpage.generateScreen();
		
		/*mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":[]
			},
			"locked":
			{
				"enableAll":true,
				"except":["strEmployeeName"]
			},
			"active":
			{
				"enableAll":true,
				"except":["strEmployeeName"]
			}			
		}
		*/
		
		mainpage.hlpLinks=
		{
			"ReportCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.ReportBuilderHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strReportCode","child":"Report_Code"}
							]
				}
		}
		/*Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
			
	}
});
