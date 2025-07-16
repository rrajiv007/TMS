/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	Steffie			s													                                         
Version		  :	1.0.0														                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
   1.0.0     steffie        17/12/16                                    
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.ConseqMgmntGenLetter', 
{
extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Consequence Management";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
	
		mainpage.toolbarActions= [
			{
                "name": "Generate",
                "tooltip": "Click here to Generate a Consequence letter."
            },
			{
                "name": "Save",
                "tooltip": "Click here to Rollback a Consequence Action."
            },
            {
                "name": "Confirm",
                "tooltip": "Click here to Confirm a Consequence Action."
            },
			{
                "name": "Issue Letter",
                "tooltip": "Click here to Confirm a Consequence Action."
            }
            ]
		
		/*
		mainpage.toolbarLinks=
		[
			{"name":"Consequence Action","linkid":"con_perf_act","tooltip":"Click here to launch Consequence ActionScreen"}
		]
		*/
		//Consequence Header Section 

		plf.columns=4
		var conseqHdrColumn = plf.addColumnSection({title:""});			
		var conseqFormCtrl=												
		[
			plf.addHlpText({"label":"Consequence Code",id:"strConseqCode",hlpLinkID:"Conseqno",InputLength:"40",inputFormat:"string"},this),
			//plf.addText({"label":"Consequence Code",id:"strConseqCode"}),
			plf.addText({"label":"Description",id:"strConseqDesc"}),			
			plf.addText({"label":"Remarks",id:"strRemarks",InputLength:"250",inputFormat:"string"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"})
			
        ]
		
		conseqHdrColumn.add(conseqFormCtrl);
		
		var conseqsecHdrColumn = plf.addColumnSection({title:""});			
		var conseqsecFormCtrl=												
		[
			
			plf.addDisplayOnly({"label":"Last Processed Date",id:"dtLstProcessDt"}),
			plf.addDate({"label":"Period To",id:"dtPeriodTo"}),
			//plf.addBlank(),
			plf.addButton({"label":"Fetch violation",id:"cmn_fetchvio","tooltip":"Click here to Fetch Violatons."})
                    
		]
		
		conseqsecHdrColumn.add(conseqsecFormCtrl);
		
		//Consequence Grid Section 
		var conseqGridFieldObj=									
		[
		    {columnname:"Driver/Contractor Code",dataname:"DRI_CODE",datatype:"string",width:150},
			{columnname:"Driver/Contractor  Name",dataname:"DRI_NAME",datatype:"string",width:150},
			{columnname:"Consequence For",dataname:"CON_FOR",datatype:"string",width:200},
			{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:125},
			{columnname:"Violation List",dataname:"VIO_LIST",width:125,linkId:"JPlanVio",gridpopup:true,heading:true,imageURL:"resources/images/grid/Inspection/Inspection_Advice.png"},
			{columnname:"Incident No",dataname:"strIncidentNo",datatype:"string",width:200,hidden:true},
			//{columnname:"Incident No",dataname:"strAction",datatype:"string",width:200,hidden:true},
			//{columnname:"Incident No",dataname:"INCIDENT_NO",datatype:"string",width:200},
			{columnname:"Actions Taken",dataname:"ACT_TAKN",datatype:"string",width:220,storeId:"strAction",editControl:"combo"},
			{columnname:"Print Letter",dataname:"CONSEQ_RPT",datatype:"string",width:125,gridReport:"PrintConseqRpt",heading:true,imageURL:"resources/images/shared/calendar.gif",tooltip:"Click here to print Consequence Management Report"},
			{columnname:"Issue Letter",dataname:"LETTER_ISSUE",datatype:"string",width:200,editControl:"checkbox"},
			{columnname:"Issued By",dataname:"LOGGED_BY",datatype:"string",width:150},
			{columnname:"Remarks",dataname:"REMARK",datatype:"string",width:200,editControl:"textbox"}
			
			
		]
		var conseqGridDtl=										
		{
			title:"Violation Details",
			id:"vioDtl",
			visibleRow:plf.searchVisibleRows,
			detail:conseqGridFieldObj,
			//selRowProcess:"Y",
			removeAddDelete:true
		}
		var conseqGridSection = plf.addGrid(conseqGridDtl,this);
		
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(conseqHdrColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(conseqsecHdrColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(conseqGridSection) //Add Grid Section to Main Page
		
		//History Data Section
		
			mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
				mainpage.eventHandlers = 
			[
				{
					"controlid":"",
					"tasktype":"onload",
					"input":["strConseqCode"],
					"service":"CoreConsequencemanagement",
					"methodName":"initConseqMngTS"
				},		
				{
					"controlid":"cmn_fetchvio",
					"tasktype":"btnclick",
					"input":["dtPeriodFrom","dtPeriodTo"],
					"service":"CoreConsequencemanagement",
					"methodName":"fetchViolationDtlsTS"
				},
				{
				"controlid":"strConseqCode",
				"tasktype":"onenter",
				"input":["strConseqCode"],
				"service":"CoreConsequencemanagement",
				"methodName":"Onenterconseqts"
		        },
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Generate",
				"input":["strConseqCode","strConseqDesc","strConseqFor","strStatus","strRemarks","dtPeriodFrom","dtPeriodTo","vioDtl"],
				"service":"CoreConsequencemanagement",
				"methodName":"generateConseqMngTS"
				},
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["strConseqCode","strConseqDesc","strConseqFor","strStatus","strRemarks","dtPeriodFrom","dtPeriodTo","vioDtl"],
				"service":"CoreConsequencemanagement",
				"methodName":"confirmConseqMngTS"
				},
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strConseqCode","strConseqDesc","strConseqFor","strStatus","strRemarks","dtPeriodFrom","dtPeriodTo","vioDtl"],
				"service":"CoreConsequencemanagement",
				"methodName":"saveConseqMngTS"
				},
				{
				"grideventid":"PrintConseqRpt",
				"tasktype":"gridonprint",
				"input":["strConseqCode","strIncidentNo","strAction"],
				"service":"CoreReportService",
				"methodName":"printConseqMngReport"
		       	}
				,
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Issue Letter",
				"input":["strConseqCode","strConseqDesc","strConseqFor","strStatus","strRemarks","dtPeriodFrom","dtPeriodTo","vioDtl"],
				"service":"CoreConsequencemanagement",
				"methodName":"issueLetterConseqMngTS"
				}
						
			];
			//Event Handlers Mapping Ends
		
       // Help Link Sections
		mainpage.hlpLinks=
		{
			"Conseqno":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.ConsequenceHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strConseqCode","child":"CON_SEQ_CODE"}
							]
				}
				
		}
		
		//Screen Link Sections
		/*mainpage.screenLinks=
		{
			"con_perf_act":
				{
					"dest":"jm_master.ConsequenceManagementPerformAction",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
	     }*/
		 
		 	mainpage.gridPopupLinks=
		{
			"JPlanVio":
			{
				"dest":"journey_management.JPViolationDtls",
				"popMethodName":"initVioDtlsTS",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"JP_NO","dest":"selChartSeries"}
						]
			}
		}
		this.callParent(arguments);
	
	}
});
