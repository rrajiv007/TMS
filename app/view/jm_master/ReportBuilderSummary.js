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
Ext.define('CueTrans.view.jm_master.ReportBuilderSummary',
{
	extend:"CueTrans.lib.plfTransScreen",
   
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Report Builder Summary";
		//mainpage.liveScreenFlag=false;
		mainpage.toolbarSectionFlag=true;
         mainpage.toolbarLinks=
		[
			{"name":"Create Report","linkid":"jm_ReportBuilderSummary","tooltip":"Click here to create an Report Builder."}
		]
		
		
		//GuestHouse Search Section starts
		plf.columns=4
		var reportbuildMasterColumn = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);			//69995
		var reportbuildMstrCtrl=										//69995
		[
		    plf.addText({"label":"Report Code",id:"strReportCode","anywhereSearch":"true"}),	
		    plf.addText({"label":"Report Name",id:"strReportName"}),	
            plf.addCombo({"label":"Report Category",id:"strReportCategory"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Report Description",id:"strReportDescription"})	

		]
		reportbuildMasterColumn.add(reportbuildMstrCtrl);
		//GuestHouse Header Section Ends
		
		//GuestHouse Grid Section Begins
		var ReportBuilderRoleObj=
		[
			{columnname:"Report Code",dataname:"Report_Code",datatype:"string",width:150,linkId:"ReportBuilderMaster",
						"tooltip":"Click here to launch the Report Builder master screen."},
			{columnname:"Report Name",dataname:"Report_Name",datatype:"string",width:150},			
			{columnname:"Report Category",dataname:"Report_Category",datatype:"string",width:300},
			{columnname:"Report Description",dataname:"Report_Description",datatype:"string",width:130},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:200}		
		]
		var ReportBuilderGridDtl=
		{
			title:"",
			id:"outputParDetail",
			detail:ReportBuilderRoleObj,
			visibleRow:plf.searchVisibleRows,
			readOnly:true,
			removeAddDelete:true
		}
		var ReportBuilderGridSection = plf.addGrid(ReportBuilderGridDtl,this)	
		//GuestHouse Grid Section Ends
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(reportbuildMasterColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportBuilderGridSection) //Add Grid Section to Main Page
		
		
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
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strReportCode","strReportName","strReportCategory","strStatus","strReportDescription"],
				"service":"CoreReportService",
				"methodName":"fetchAllRepoBuSrch"
			},
			
		];
		//Event Handlers Mapping Ends
		
		mainpage.screenLinks=
		{			
			"ReportBuilderMaster":
				{
					"dest":"jm_master.ReportBuilderMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"Report_Code","dest":"strReportCode"}
							]
				},
				"jm_ReportBuilderSummary":
				{
					"dest":"jm_master.ReportBuilderMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}				
		};
			
	
		this.callParent(arguments);
		
	}
});
