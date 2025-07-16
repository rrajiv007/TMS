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
Ext.define('CueTrans.view.jm_master.ReportBuilderHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.screenName = "Report Builder Help";
		//mainpage.liveScreenFlag=false;
		mainpage.startPainting();
		
		
		//GuestHouse Header Section Begins
		plf.columns=3
		var ReportBuildHelpHdrCollapse = plf.addColumnSection({collapsed: true});
		
		var ReportBuildHelpFormCtrl=
		[
			plf.addText({"label":"Report Code",id:"strReportCode"}),	
		    plf.addText({"label":"Report Name",id:"strReportName"}),	
            plf.addCombo({"label":"Report Category",id:"strReportCategory"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Report Description",id:"strReportDescription"}),	
			plf.addBlank({}),
			plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
		]
		ReportBuildHelpHdrCollapse.add(ReportBuildHelpFormCtrl);
		//GuestHouse Header Section Ends
		
		//GuestHouse Grid Section Begins
		var ReportBuildHelpFieldObj=
		[
			{columnname:"Report Code",dataname:"Report_Code",datatype:"string",width:150},
			{columnname:"Report Name",dataname:"Report_Name",datatype:"string",width:150},			
			{columnname:"Report Category",dataname:"Report_Category",datatype:"string",width:100},
			{columnname:"Report Description",dataname:"Report_Description",datatype:"string",width:130},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:200}		
		]
		var ReportBuildHelpGridDtl=
		{
			title:"Report Builder Details",
			id:"outputParDetail",
			detail:ReportBuildHelpFieldObj,
			visibleRow:plf.searchVisibleRows,
			readOnly:true,
			removeAddDelete:true
		}
		var ReportBuildHelpSection = plf.addGrid(ReportBuildHelpGridDtl,this)	
		
		mainpage.hlpSearchGridPtr = ReportBuildHelpSection		
		//GuestHouse Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(ReportBuildHelpHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportBuildHelpSection) //Add Grid Section to Main Page
		
		
	 mainpage.screenLinks=
		{
			"ReportBuildercode":
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
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strReportCode"],
				"service":"CoreReportService",
				"methodName":"initRepoBuSearchTS"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strReportCode","strReportName","strReportCategory","strStatus","strReportDescription"],
				"service":"CoreReportService",
				"methodName":"fetchAllRepoBuSrch"
			},
		];		
		this.callParent(arguments);
		
	}
});
