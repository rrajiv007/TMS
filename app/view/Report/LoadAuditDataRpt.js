/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			           Remarks             
************************************************************************************************	
1.0.0	     Raj		    16/07/2020                         Load Audit Data Report  		                                   
************************************************************************************************/
Ext.define('CueTrans.view.Report.LoadAuditDataRpt', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Load Audit Data";
		
		
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		
		var ReportsColumn = plf.addColumnSection({});
		
		var ReportsFormCtrl=							
		[	
			plf.addText({"label":"Load #",id:"strLoadNoFrom"}),
			plf.addCombo({"label":"Date Type","id":"strDateType","mandatory":"true"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom","mandatory":"true"}),
			plf.addDate({"label":"Date To",id:"dtDateTo","mandatory":"true"}),
			plf.addText({"label":"Carrier Code",id:"strCarrierCode"})
		
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=3
		var ReportsButtonColumn = plf.addColumnSection({});	
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Show Details","id":"getLdAuditData"}),
		  plf.addBlank(),
		  		
		]
        LdAuditDataReportgrid=
		[  
		
		{columnname:"Load #",dataname:"LOAD_NO",datatype:"string",width:80},
		{columnname:"Load Status",dataname:"LOAD_STATUS",datatype:"string",width:80},
		{columnname:"Load Departure Date",dataname:"LOAD_DEPARTURE_DATE",datatype:"string",width:120},
		{columnname:"Load Delivered Date",dataname:"LOAD_DELIVERED_DATE",datatype:"string",width:110},
		{columnname:"Load Delivered Time",dataname:"LOAD_DELIVERED_TIME",datatype:"string",width:80},
		
		{columnname:"From Region",dataname:"FROM_REGION",datatype:"string",width:110},
		{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:110},
		{columnname:"Origin Location Type",dataname:"ORIGIN_LOCATION_TYPE",datatype:"string",width:160},
		{columnname:"Loading Point",dataname:"LOADING_POINT",datatype:"string",width:110},
		{columnname:"From Finance Region",dataname:"FROM_FINANCE_REGION",datatype:"string",width:120},

		{columnname:"To Region",dataname:"TO_REGION",datatype:"string",width:120},
		{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
		{columnname:"Destination Location Type",dataname:"DESTINATION_LOCATION_TYPE",datatype:"string",width:90},
		{columnname:"Unloading Point",dataname:"UNLOADING_POINT",datatype:"string",width:120},
		{columnname:"To Finance Region",dataname:"TO_FINANCE_REGION",datatype:"string",width:110},
		{columnname:"Inspection #",dataname:"INSPECTION_NO",datatype:"string",width:110},
		{columnname:"Inspection Status",dataname:"INSPECTION_STATUS",datatype:"string",width:110},
		{columnname:"Inspection Date",dataname:"INSPECTION_DATE",datatype:"string",width:100},
		{columnname:"Inspection Completion Date",dataname:"INSPECTION_COMPLETION_DATE",datatype:"string",width:110},
		{columnname:"Inspection Completion Time",dataname:"INSPECTION_COMPLETION_TIME",datatype:"string",width:120},
		{columnname:"Inspector Name",dataname:"INSPECTOR_NAME",datatype:"string",width:90},
		{columnname:"Carrier Code",dataname:"CARRIER_CODE",datatype:"string",width:120},
		{columnname:"Scheduled Vehicle #",dataname:"SCHEDULED_VEHICLE_NO",datatype:"string",width:120},
		{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:120},
		{columnname:"Contract #",dataname:"CONTRACT_NO",datatype:"string",width:140},
		
		{columnname:"Contract Holder Name",dataname:"CONTRACT_HOLDER_NAME",datatype:"string",width:140},
		{columnname:"Contractor Contact #",dataname:"CONTRACTOR_CONTACT_NO",datatype:"string",width:90},
		{columnname:"Reported Vehicle #",dataname:"REPORTED_VEHICLE_NO",datatype:"string",width:95,colAlign:'right'},
		{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:115,colAlign:'right'},
		{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:130,colAlign:'right'},
		{columnname:"Driver Contact #",dataname:"DRIVER_CONTACT_NO",datatype:"string",width:110},
		{columnname:"Journey Plan #",dataname:"JOURNEY_PLAN_NO",datatype:"string",width:150},
		{columnname:"Journey Plan Status",dataname:"JOURNEY_PLAN_STATUS",datatype:"string",width:150},
		{columnname:"Journey Plan Date",dataname:"JOURNEY_PLAN_DATE",datatype:"string",width:170},
		{columnname:"Journey Departed Date",dataname:"JOURNEY_DEPARTED_DATE",datatype:"string",width:170},
		{columnname:"Journey Closure Date",dataname:"JOURNEY_CLOSURE_DATE",datatype:"string",width:180},
		{columnname:"Journey Manager Name",dataname:"JOURNEY_MANAGER_NAME",datatype:"string",width:180},
		{columnname:"Trip #",dataname:"TRIP_NO",datatype:"string",width:130},
		{columnname:"Trip Status",dataname:"TRIP_STATUS",datatype:"string",width:170},
		{columnname:"Trip Date",dataname:"TRIP_DATE",datatype:"string",width:200},
		{columnname:"Trip Closure Date",dataname:"TRIP_CLOSURE_DATE",datatype:"string",width:200},
		{columnname:"Whether billed in CUETRANS",dataname:"WHETHER_BILLED_IN_CUETRANS",datatype:"string",width:200},
		
		{columnname:"Total Load Amount",dataname:"TOTAL_LOAD_AMOUNT",datatype:"string",width:130},
		{columnname:"Carrier Bill ID",dataname:"CARRIER_BILL_ID",datatype:"string",width:130},
		{columnname:"Carrier Bill Description",dataname:"CARRIER_BILL_DESCRIPTION",datatype:"string",width:100},
		{columnname:"Carrier Bill Period",dataname:"CARRIER_BILL_PERIOD",datatype:"string",width:115},
		{columnname:"Carrier Bill Status",dataname:"CARRIER_BILL_STATUS",datatype:"string",width:115},
		{columnname:"Contractor Bill No",dataname:"CONTRACTOR_BILL_NO",datatype:"string",width:115}
				
		]
		LdAuditDataReportdetails=
		{
			title:"Load Audit Data Details",
			id:"LoadAuditDataDetails",
			detail:LdAuditDataReportgrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		LdAuditDataReportSection = plf.addGrid(LdAuditDataReportdetails,this)		
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(LdAuditDataReportSection)
		
		mainpage.eventHandlers = 
		[	
            { 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"initLoadAuditDatadtl"
			},
			{		
				"controlid":"getLdAuditData",
				"tasktype":"btnclick",
				"input":[
				         "strDateType","dtDateFrom","dtDateTo","strLoadNoFrom","strCarrierCode"
						],
				"service":"CoreReportService",
				"methodName":"getLoadAuditDatadtl"
							
			}	
		];
    mainpage.screenLinks=	
		{
		} 
		
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
