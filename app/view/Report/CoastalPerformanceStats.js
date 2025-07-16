/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
 		                                   
************************************************************************************************/
Ext.define('CueTrans.view.Report.CoastalPerformanceStats', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		

		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Coastal Performance Stats";
		
		plf.columns=4
		mainpage.toolbarSectionFlag=true;

		var ReportsColumn = plf.addColumnSection({});	
		
		var ReportsFormCtrl=							
		[	
			plf.addCombo({"label":"Year",id:"dtDateFrom"}),
			plf.addCombo({"label":"Month",id:"dtDateTo"})
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({});	
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Fetch Details","id":"fetchDetails"}),
		  plf.addButton({"label":"Generate PDF","id":"fetchPDFDetails"}),
		  plf.addBlank()
		
		]
		
		/* Violation Section Start */
        ViolationsSummarygrid=
		[  
		{columnname:"Month",dataname:"MONTH",datatype:"string",width:"auto"},
		{columnname:"V1",dataname:"V1",datatype:"string",width:"auto"},
		{columnname:"V2",dataname:"V2",datatype:"string",width:"auto"},
		{columnname:"V3",dataname:"V3",datatype:"string",width:"auto"},
		{columnname:"V4",dataname:"V4",datatype:"string",width:"auto"},
		{columnname:"V5",dataname:"V6",datatype:"string",width:"auto"},
		
		{columnname:"V7",dataname:"V7",datatype:"string",width:"auto"},
		{columnname:"V8",dataname:"V8",datatype:"string",width:"auto"},
		{columnname:"V9",dataname:"V9",datatype:"string",width:"auto"},
		{columnname:"Total",dataname:"TOTAL",datatype:"string",width:"auto"}
	
		]
		ViolationsSummarydetails=
		{
			title:"Violation Details",
			id:"ViolationDetails",
			detail:ViolationsSummarygrid,
			visibleRow:5,
			removeExport:false,
			readonly:true,
			columnWidth:0.5
		}
		ViolationsSummarySection = plf.addGrid(ViolationsSummarydetails,this)		
		/* Violation Section End */
		
		
		/* Delay Section Start */
        DelaySummarygrid=
		[  
		{columnname:"Month",dataname:"MONTH",datatype:"string",width:"auto"},
		{columnname:"No SJP Issued",dataname:"NO_SJP_ISSUED",datatype:"string",width:"auto"},
		
		{columnname:"D1 = Breakdown",dataname:"D1",datatype:"string",width:"auto"},
		{columnname:"D2 = Driver HSE",dataname:"D2",datatype:"string",width:"auto"},
		{columnname:"D3 = No Driver",dataname:"D3",datatype:"string",width:"auto"},
		{columnname:"D4 = Weather",dataname:"D4",datatype:"string",width:"auto"},
		{columnname:"D5 = Other",dataname:"D5",datatype:"string",width:"auto"},
	
		]
		DelaySummarydetails=
		{
			title:"Delay Details",
			id:"DelayDetails",
			detail:DelaySummarygrid,
			visibleRow:5,
			removeExport:false,
			readonly:true,
			columnWidth:0.5
		}
		DelaySummarySection = plf.addGrid(DelaySummarydetails,this)	

        var VioAndDelayColumn = plf.addColumnSection({/*title:"Violations & Delay Reasons"*/});	
		VioAndDelayColumn.add(ViolationsSummarySection)
		VioAndDelayColumn.add(plf.addSplitter)
        VioAndDelayColumn.add(DelaySummarySection)
		VioAndDelayColumn.add(plf.addStripLine({}));

		/* Delay Section End */
		
		/* Active Contracts Section Start */
        ActiveContSummarygrid=
		[  
		{columnname:"Month",dataname:"MONTH",datatype:"string",width:"auto"},
		{columnname:"Active Contracts",dataname:"ACTIVE_CONTRACTS",datatype:"string",width:"auto"},
		{columnname:"# of Box Trips",dataname:"NO_OF_BOX_TRIPS",datatype:"string",width:"auto"}
	
		]
		ActiveContSummarydetails=
		{
			title:"Active Contracts Details",
			id:"ActiveContDetails",
			detail:ActiveContSummarygrid,
			visibleRow:5,
			removeExport:false,
			readonly:true,
			columnWidth:0.5
		}
		ActiveContSummarySection = plf.addGrid(ActiveContSummarydetails,this)		
		/* Active Contracts Section End */
		
		
		/* Destination Region Section Start */
        DestRegSummarygrid=
		[  
		{columnname:"Month",dataname:"MONTH",datatype:"string",width:"auto"},
		{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:"auto"},
		{columnname:"North Trips",dataname:"NORTH_TRIPS",datatype:"string",width:"auto"},
		{columnname:"South Trips",dataname:"SOUTH_TRIPS",datatype:"string",width:"auto"},
		{columnname:"Coastal Trips",dataname:"COASTAL_TRIPS",datatype:"string",width:"auto"}
	
		]
		DestRegSummarydetails=
		{
			//title:"Destination Region Details",
			title:"Trip Detail By Region",
			id:"DestRegDetails",
			detail:DestRegSummarygrid,
			visibleRow:5,
			removeExport:false,
			readonly:true,
			columnWidth:0.5
		}
		DestRegSummarySection = plf.addGrid(DestRegSummarydetails,this)		
		/* Destination Region Section End */
		
		
		/* OTO KM Section Start */
        OTOKMSummarygrid=
		[  
		{columnname:"Month",dataname:"MONTH",datatype:"string",width:"auto"},
		{columnname:"OTO KM",dataname:"OTO_KM",datatype:"string",width:"auto"}
	
		]
		OTOKMSummarydetails=
		{
			title:"OTO KM Details",
			id:"OTOKMDetails",
			detail:OTOKMSummarygrid,
			visibleRow:5,
			removeExport:false,
			readonly:true
			//columnWidth:0.20,
			//removeFilter:true
		}
		OTOKMSummarySection = plf.addGrid(OTOKMSummarydetails,this)	

        var ContractDestRegOTOKmColumn = plf.addColumnSection({});	
		ContractDestRegOTOKmColumn.add(ActiveContSummarySection)
		ContractDestRegOTOKmColumn.add(plf.addSplitter)
        ContractDestRegOTOKmColumn.add(DestRegSummarySection)
		ContractDestRegOTOKmColumn.add(plf.addStripLine({}));


    	/* OTO KM Section End */
		
		/* Considering as Ramadan Section Start */
        RamadanSummarygrid=
		[  
		{columnname:"Month",dataname:"MONTH",datatype:"string",width:"auto"},
		{columnname:"Coastal Performance Group",dataname:"COASTAL_PERFORMANCE_GROUP",datatype:"string",width:"auto"},
		{columnname:"On-time(Count)",dataname:"ON_TIME_TR",datatype:"string",width:"auto"},
		{columnname:"On-time(%)",dataname:"ON_TIME_PR",datatype:"string",width:"auto"},
		{columnname:"Delay(Count)",dataname:"DELAY_TR",datatype:"string",width:"auto"},
		{columnname:"Delay(%)",dataname:"DELAY_PR",datatype:"string",width:"auto"},
		{columnname:"Total",dataname:"TOTAL",datatype:"string",width:"auto"}
		
		/*
		{columnname:"Month",dataname:"MONTH",datatype:"string",width:"auto"},
		{columnname:"Status",dataname:"STATUS",datatype:"string",width:"auto"},
		{columnname:"Sohar to North(Count)",dataname:"SOHAR_NORTH_TR",datatype:"string",width:"auto"},
		{columnname:"Sohar to North(%)",dataname:"SOHAR_NORTH_PR",datatype:"string",width:"auto"},
		
		{columnname:"Sohar to North(Count)",dataname:"SOHAR_NORTH_TR",datatype:"string",width:"auto"},
		{columnname:"Sohar to North(%)",dataname:"SOHAR_NORTH_PR",datatype:"string",width:"auto"},
		
		{columnname:"Sohar to South(Count)",dataname:"SOHAR_SOUTH_TR",datatype:"string",width:"auto"},
		{columnname:"Sohar to South(%)",dataname:"SOHAR_SOUTH_PR",datatype:"string",width:"auto"},
		
		{columnname:"Muscat to North(Count)",dataname:"MUSCAT_NORTH_TR",datatype:"string",width:"auto"},
		{columnname:"Muscat to North(%)",dataname:"MUSCAT_NORTH_PR",datatype:"string",width:"auto"},
		
		{columnname:"Muscat to South(Count)",dataname:"MUSCAT_SOUTH_TR",datatype:"string",width:"auto"},
		{columnname:"Muscat to South(%)",dataname:"MUSCAT_SOUTH_PR",datatype:"string",width:"auto"},
	
	    {columnname:"Duqm to North(Count)",dataname:"DUQM_NORTH_TR",datatype:"string",width:"auto"},
		{columnname:"Duqm to North(%)",dataname:"DUQM_NORTH_PR",datatype:"string",width:"auto"},
		
		{columnname:"Duqm to South(Count)",dataname:"DUQM_SOUTH_TR",datatype:"string",width:"auto"},
		{columnname:"Duqm to South(%)",dataname:"DUQM_SOUTH_PR",datatype:"string",width:"auto"},
		
		{columnname:"Duqm to Coastal(Count)",dataname:"DUQM_COASTAL_TR",datatype:"string",width:"auto"},
		{columnname:"Duqm to Coastal(%)",dataname:"DUQM_COASTAL_PR",datatype:"string",width:"auto"},
		
		{columnname:"Total(Count)",dataname:"TOTAL_TR",datatype:"string",width:"auto"},
		{columnname:"Total(%)",dataname:"TOTAL_PR",datatype:"string",width:"auto"}
		*/
		]
		RamadanSummarydetails=
		{
			title:"Considering as Ramadan",
			id:"RamadanDetails",
			detail:RamadanSummarygrid,
			visibleRow:8,
			removeExport:false,
			readonly:true,
			columnWidth:0.5
		}
		RamadanSummarySection = plf.addGrid(RamadanSummarydetails,this)		
		/* Considering as Ramadan Section End */
		
		/* Considering Not as Ramadan Section Start */
        NotRamadanSummarygrid=
		[  
		
		{columnname:"Month",dataname:"MONTH",datatype:"string",width:"auto"},
		{columnname:"Coastal Performance Group",dataname:"COASTAL_PERFORMANCE_GROUP",datatype:"string",width:"auto"},
		{columnname:"On-time(Count)",dataname:"ON_TIME_TR",datatype:"string",width:"auto"},
		{columnname:"On-time(%)",dataname:"ON_TIME_PR",datatype:"string",width:"auto"},
		{columnname:"Delay(Count)",dataname:"DELAY_TR",datatype:"string",width:"auto"},
		{columnname:"Delay(%)",dataname:"DELAY_PR",datatype:"string",width:"auto"},
		{columnname:"Total",dataname:"TOTAL",datatype:"string",width:"auto"}
		/*{columnname:"Month",dataname:"MONTH",datatype:"string",width:"auto"},
		{columnname:"Status",dataname:"STATUS",datatype:"string",width:"auto"},
		{columnname:"Sohar to North(Count)",dataname:"SOHAR_NORTH_TR",datatype:"string",width:"auto"},
		{columnname:"Sohar to North(%)",dataname:"SOHAR_NORTH_PR",datatype:"string",width:"auto"},
		
		{columnname:"Sohar to North(Count)",dataname:"SOHAR_NORTH_TR",datatype:"string",width:"auto"},
		{columnname:"Sohar to North(%)",dataname:"SOHAR_NORTH_PR",datatype:"string",width:"auto"},
		
		{columnname:"Sohar to South(Count)",dataname:"SOHAR_SOUTH_TR",datatype:"string",width:"auto"},
		{columnname:"Sohar to South(%)",dataname:"SOHAR_SOUTH_PR",datatype:"string",width:"auto"},
		
		{columnname:"Muscat to North(Count)",dataname:"MUSCAT_NORTH_TR",datatype:"string",width:"auto"},
		{columnname:"Muscat to North(%)",dataname:"MUSCAT_NORTH_PR",datatype:"string",width:"auto"},
		
		{columnname:"Muscat to South(Count)",dataname:"MUSCAT_SOUTH_TR",datatype:"string",width:"auto"},
		{columnname:"Muscat to South(%)",dataname:"MUSCAT_SOUTH_PR",datatype:"string",width:"auto"},
	
	    {columnname:"Duqm to North(Count)",dataname:"DUQM_NORTH_TR",datatype:"string",width:"auto"},
		{columnname:"Duqm to North(%)",dataname:"DUQM_NORTH_PR",datatype:"string",width:"auto"},
		
		{columnname:"Duqm to South(Count)",dataname:"DUQM_SOUTH_TR",datatype:"string",width:"auto"},
		{columnname:"Duqm to South(%)",dataname:"DUQM_SOUTH_PR",datatype:"string",width:"auto"},
		
		{columnname:"Duqm to Coastal(Count)",dataname:"DUQM_COASTAL_TR",datatype:"string",width:"auto"},
		{columnname:"Duqm to Coastal(%)",dataname:"DUQM_COASTAL_PR",datatype:"string",width:"auto"},
		
		{columnname:"Total(Count)",dataname:"TOTAL_TR",datatype:"string",width:"auto"},
		{columnname:"Total(%)",dataname:"TOTAL_PR",datatype:"string",width:"auto"}*/
		]
		NotRamadanSummarydetails=
		{
			title:"Considering Not as Ramadan",
			id:"NotRamadanDetails",
			detail:NotRamadanSummarygrid,
			visibleRow:8,
			removeExport:false,
			readonly:true,
			columnWidth:0.5
		}
		NotRamadanSummarySection = plf.addGrid(NotRamadanSummarydetails,this)	

        var SLARmdNonRmdColumn = plf.addColumnSection({});	
		SLARmdNonRmdColumn.add(RamadanSummarySection)
		SLARmdNonRmdColumn.add(plf.addSplitter)
        SLARmdNonRmdColumn.add(NotRamadanSummarySection)
		SLARmdNonRmdColumn.add(plf.addStripLine({}));

		
		/* Considering Not as Ramadan Section End */
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(VioAndDelayColumn)//Add Violation to Main Page
		
		//mainpage.ptrMainSection.add(ViolationsSummarySection)//Add Violation to Main Page
		//mainpage.ptrMainSection.add(DelaySummarySection)//Add Delay to Main Page
		mainpage.ptrMainSection.add(ContractDestRegOTOKmColumn)//Add Violation to Main Page
		//mainpage.ptrMainSection.add(ActiveContSummarySection)//Add Active Contracts to Main Page
		//mainpage.ptrMainSection.add(DestRegSummarySection)//Add Destination Region to Main Page
		//mainpage.ptrMainSection.add(OTOKMSummarySection)//Add OTO KM to Main Page
		//mainpage.ptrMainSection.add(RamadanSummarySection)//Add Considering as Ramadan to Main Page
		//mainpage.ptrMainSection.add(NotRamadanSummarySection)//Add Considering Not as Ramadan to Main Page
		
		mainpage.ptrMainSection.add(SLARmdNonRmdColumn)//Add Considering Not as Ramadan to Main Page
		mainpage.ptrMainSection.add(OTOKMSummarySection)//Add OTO KM to Main Page
		
		mainpage.eventHandlers = 
		[	
            { 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitCoastalStat"
			},
		    {		 
				"controlid":"fetchPDFDetails",
				"tasktype":"btnclick",
				"input":[
						"dtDateFrom","dtDateTo"
						],
				"service":"CoreReportService", 
				"methodName":"fetchCoastalStatReport"
							
			},		
			{		
				"controlid":"fetchDetails",
				"tasktype":"btnclick",
				"input":[
						"dtDateFrom","dtDateTo"				
						],
				"service":"CoreReportService",
				"methodName":"fetchCoastalStatDtl"
							
			}	
		];
		
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
