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
Ext.define('CueTrans.view.Report.FatigueManagementReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Fatigue Management Report";
		
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
			plf.addText({"label":"Vehicle No",id:"strVehicleCodeFrom"}),
			plf.addText({"label":"Driver No",id:"strDriverCodeFrom"}),
			
			plf.addDate({"label":"Date From",id:"dtDateFrom","mandatory":"true"}),
			plf.addDate({"label":"Date To",id:"dtDateTo","mandatory":"true"}),			
			
			//plf.addCombo({"label":"Origin",id:"strOrigin"}),
			//plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addHlpText({"label":"Origin Code",id:"strOrigin",hlpLinkID:"Origin_Code",inputFormat:"string",InputLength:"40"},this),
			plf.addHlpText({"label":"Destination Code",id:"strDestination",hlpLinkID:"Destination_Code",inputFormat:"string",InputLength:"40"},this),
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
			{columnname:"Event ID",dataname:"EVENT_ID",datatype:"string",width:150},
			{columnname:"Event",dataname:"EVENT_DESC",datatype:"string",width:150},
			{columnname:"Start Date(Date)",dataname:"STARTDATE",datatype:"string",width:150},
			{columnname:"Start Date(Time)",dataname:"STARTTIME",datatype:"string",width:150},
			{columnname:"End Date(Date)",dataname:"ENDDATE",datatype:"string",width:150},
			{columnname:"End Date(Time)",dataname:"ENDTIME",datatype:"string",width:150},
			{columnname:"Speed",dataname:"MAX_SPEED",datatype:"string",width:150},
			{columnname:"Latitude",dataname:"LATITUDE",datatype:"string",width:150},
			{columnname:"Longitude",dataname:"LONGITUDE",datatype:"string",width:150},
			{columnname:"License Plate",dataname:"VEH_REG_NO",datatype:"string",width:150},
			{columnname:"TMS Truck Code",dataname:"VEHICLE",datatype:"string",width:150},
			{columnname:"OTO Contract Number",dataname:"CONTRACTNUMBER",datatype:"string",width:150},
			{columnname:"Violation Classification",dataname:"REASON",datatype:"string",width:150},
			{columnname:"JP Number",dataname:"JPNUMBER",datatype:"string",width:150},
			
			{columnname:"Driver License Number",dataname:"LICENSENO",datatype:"string",width:150},
			{columnname:"Driver Name",dataname:"DRIVER",datatype:"string",width:150},			
			{columnname:"Driver GSM",dataname:"GSMNUMBER",datatype:"string",width:150},
			{columnname:"Driver Type",dataname:"DRIVER_TYPE",datatype:"string",width:150}
			
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
				"methodName":"InitFatigueManagement"// InitReportScreen
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
				"methodName":"GetFatigueManagement"
							
			}
			// Grid section Ends--Golive
		];
      mainpage.hlpLinks=	
		{	
				"Origin_Code":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"LOCATION_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strOrigin","child":"LOC_CODE"}
						    ]
				},
	           "Destination_Code":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"LOCATION_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strDestination","child":"LOC_CODE"}
						    ]
				}
		} 
		
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});