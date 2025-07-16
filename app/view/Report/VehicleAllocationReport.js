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
Ext.define('CueTrans.view.Report.VehicleAllocationReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Vehicle Allocation Report";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		
		var ReportsColumn = plf.addColumnSection({});
		
		var ReportsFormCtrl=	
		[			
			plf.addText({"label":"Load Number",id:"strLoadNoFrom"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addText({"label":"Contract Number",id:"strContractNo"}),
			plf.addText({"label":"Scheduled Vehicle",id:"strScheduleVeh"}),
			plf.addCombo({"label":"Date Type","id":"strDateType","mandatory":"true"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom","mandatory":"true"}),
			plf.addDate({"label":"Date To",id:"dtDateTo","mandatory":"true"})
			
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({});	
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Show details","id":"getVehAlloction"}),
		//  plf.addButton({"label":"Generate PDF","id":"vehicleRequest"}),
		  plf.addBlank(),
		
		]
        VehAllocationgrid=
		[   
		{columnname:"S.No",dataname:"S_NO",datatype:"integer",width:"auto"},
		{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:"auto"},
		{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:"auto"},
		{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:"auto"},
		{columnname:"Loading Point",dataname:"LOAD_AT",datatype:"string",width:"auto"},
		{columnname:"Load Description",dataname:"LOAD_DESC",datatype:"string",width:"auto"},
		{columnname:"Unloading Point",dataname:"DELIVERY_AT",datatype:"string",width:"auto"},
		
		{columnname:"Load Departure Date/Time",dataname:"LD_DEPART_DT_TM",datatype:"string",width:"auto"},
		{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:"auto"},
		{columnname:"Vehicle No",dataname:"TRUCK_CODE",datatype:"string",width:"auto"},
		{columnname:"Vehicle Category",dataname:"TRUCK_CAT",datatype:"string",width:"auto"},
		{columnname:"Trailer Category",dataname:"SPL_TRL",datatype:"string",width:"auto"},
		{columnname:"Scheduler Name",dataname:"SCHEDULER_NAME",datatype:"string",width:"auto"},
		
		{columnname:"Vehicle Allocated Date/Time",dataname:"VEH_ALLOCATED_DT_TM",datatype:"string",width:"auto"},
		{columnname:"Inspection Number",dataname:"INSPECTION_NO",datatype:"string",width:"auto"},
		{columnname:"Inspection Location",dataname:"INSPECTION_LOCATION",datatype:"string",width:"auto"},
		{columnname:"Inspection Date",dataname:"INSPECTION_DT",datatype:"string",width:"auto"},
		{columnname:"Inspection Time",dataname:"INSPECTION_TM",datatype:"string",width:"auto"},
		{columnname:"Token Number",dataname:"TOKEN_NUMBER",datatype:"string",width:"auto"},
		{columnname:"Time Slot",dataname:"TIME_SLOT",datatype:"string",width:"auto"},
		{columnname:"Inspection Bay #",dataname:"INSPECTION_BAY_NO",datatype:"string",width:"auto"},
		
		{columnname:"Inspection Completed Date/Time",dataname:"INSP_COMPLETED_DT_TM",datatype:"string",width:"auto"},
		{columnname:"Load Status",dataname:"LOAD_STATUS",datatype:"string",width:"auto"},
		{columnname:"Inspection Status",dataname:"INSP_STATUS",datatype:"string",width:"auto"}
		
		]
		VehAllocationdetails=
		{
			title:"Vehicle Allocation Details",
			id:"vehAllocationDetails",
			detail:VehAllocationgrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		VehAllocationSection = plf.addGrid(VehAllocationdetails,this)		
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(VehAllocationSection)
		
			
		mainpage.eventHandlers = 
		[	
        	{		 
				"controlid":"getVehAlloction",
				"tasktype":"btnclick",
				"input":[
						"strLoadNoFrom","strOrigin","strDestination","strContractNo","strScheduleVeh","strDateType","dtDateFrom","dtDateTo"
						],
				"service":"CoreReportService",
				"methodName":"getVehAlloctionDtl"
							
			},
			
			{ 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitVehAlloctionDtl"
			}		
		];
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
