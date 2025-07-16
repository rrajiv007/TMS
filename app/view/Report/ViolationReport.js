/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.2	 Sudhakar D			13/03/2016	  Golive				Grid addition in JS 
************************************************************************************************/
Ext.define('CueTrans.view.Report.ViolationReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "IVMS Violation Report";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			//{"name":"Operational Reports","linkid":"operation_rpt"},
			//{"name":"Statistical Reports","linkid":"rep_streports"}
		]
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var ReportsColumn = plf.addColumnSection({});	//69997
		
		var ReportsFormCtrl=							//69997
		[			
			plf.addText({"label":"Contract No",id:"strContractNo"}),
			plf.addText({"label":"Journey Plan No",id:"strJourneyNoFrom"}),
			//plf.addText({"label":"Carrier",id:"strCarrierCode"}),
			plf.addText({"label":"Vehicle No",id:"strVehicleCodeFrom"}),
			plf.addText({"label":"Driver No",id:"strDriverCodeFrom"}),
			
			plf.addDate({"label":"Date From",id:"dtDateFrom","mandatory":"true"}),
			plf.addDate({"label":"Date To",id:"dtDateTo","mandatory":"true"}),			
			
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addCombo({"label":"Reason ",id:"strReason"})
			
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({});	//69997
		ReportsFormCtrl=
		[
		  plf.addBlank(),//Golive
		  plf.addButton({"label":"Get Details","id":"GetDetails"}),//Golive	  
		  //plf.addButton({"label":"Generate PDF","id":"ViolationReport"}),
		  plf.addBlank()//Golive
		
		]	
		
		// Grid section Begins--Golive

		DetEventRptgrid=
		[   
			{columnname:"License No",dataname:"LICENSE_NO",datatype:"string",width:150},		
			{columnname:"GSM Number",dataname:"GSM_NO",datatype:"string",width:150},
			{columnname:"Blue Key No",dataname:"BLUE_KEY",datatype:"string",width:150},
			{columnname:"Driver",dataname:"DRIVER_NAME",datatype:"string",width:150},
			{columnname:"Vehicle",dataname:"VEHICLE_DESC",datatype:"string",width:150},
			{columnname:"Contract Number",dataname:"CONTRACT_NUM",datatype:"string",width:150},			
			{columnname:"Registration Number",dataname:"REG_NO",datatype:"string",width:150},
			//{columnname:"Site Name",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Event Description",dataname:"EVENT_DESC",datatype:"string",width:150},			
			{columnname:"Start Date",dataname:"START_DATE",datatype:"string",width:150},
			{columnname:"Start Time",dataname:"START_TIME",datatype:"string",width:150},			
			{columnname:"End Date",dataname:"END_DATE",datatype:"string",width:150},
			{columnname:"End Time",dataname:"END_TIME",datatype:"string",width:150},
			{columnname:"Occurrences",dataname:"OCCUR",datatype:"string",width:150},
			{columnname:"Event Value",dataname:"EVENT_VALUE",datatype:"string",width:150},
			{columnname:"Total Duration (hh:mm:ss)",dataname:"DURATION",datatype:"string",width:200},
			{columnname:"Measurement Unit",dataname:"UNIT",datatype:"string",width:150},
			//{columnname:"Start Location",dataname:"CREATED_DT",datatype:"string",width:150},
			//{columnname:"Start Long/Lat",dataname:"LOAD_CLOSED_DT",datatype:"string",width:150},
			{columnname:"JP Number",dataname:"JP_NO",datatype:"string",width:150},
			{columnname:"Reason",dataname:"REASON",datatype:"string",width:150},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:120},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:120},
			{columnname:"Road Type",dataname:"ROADTYPE",datatype:"string",width:100},
			{columnname:"Provider",dataname:"PROVIDER",datatype:"string",width:100},
			{columnname:"Start Long/Lat",dataname:"START_LONG_LAT",datatype:"string",width:150},
			{columnname:"End Long/Lat",dataname:"END_LONG_LAT",datatype:"string",width:150}
			
		]
		BackLoadDivdetails=
		{
			title:"Detailed Event Report",
			id:"DetailEventdtl",
			detail:DetEventRptgrid,
			visibleRow:10,
			removeExport:false,
			readonly:true
		}
		DetEventRptgridSection = plf.addGrid(BackLoadDivdetails,this)

		// Grid section Ends--Golive
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(DetEventRptgridSection)//--Golive		
		
		
		mainpage.eventHandlers = 
		[	
		
			{ 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitIvmsVioReportScreen"// InitReportScreen
			}
			/*,
            {		 
				"controlid":"ViolationReport",
				"tasktype":"btnclick",
				"input":[
						"strContractNo","strJourneyNoFrom","strCarrierCode",
						"strVehicleCodeFrom","dtDateFrom","dtDateTo"											
						],
				"service":"CoreReportService", 
				"methodName":"ViolationReport"
							
			}	
			*/
			// Grid section Begins--Golive
			,{		 
				"controlid":"GetDetails",
				"tasktype":"btnclick",
				"input":[
						"strContractNo","strJourneyNoFrom","strDriverCodeFrom",
						"strVehicleCodeFrom","dtDateFrom","dtDateTo","strOrigin","strDestination","strReason"											
						],
				"service":"CoreReportService", 
				"methodName":"GetViolationDetails"
							
			}
			// Grid section Ends--Golive
		];
mainpage.screenLinks=	
		{	
				"operation_rpt":
				{
					"dest":"Report.Report",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
	"rep_streports":
				{
					"dest":"Report.StatisticalReport",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		} 
		
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});