/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var  		                                   
************************************************************************************************/
Ext.define('CueTrans.view.Report.LoadingProgram', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Loading Program Report";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		
		var ReportsColumn = plf.addColumnSection({});	//69997
		
		var ReportsFormCtrl=							//69997
		[			
			//plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			//plf.addText({"label":"Inspection No",id:"strInspectionNoFrom"}),
			//plf.addCombo({"label":"Region",id:"strRegion"}),
			//plf.addCombo({"label":"Origin",id:"strRequestNoTo"}),
			//plf.addCombo({"label":"Destination",id:"strShipmentNoTo"}),
			//plf.addText({"label":"Vehicle Code",id:"strVehicleCodeFrom"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addCombo({"label":"Loading Point",id:"strOrigin"}),
			plf.addCombo({"label":"Unloading Point",id:"strDestRegion"}),
			plf.addText({"label":"Scheduled Vehicle",id:"strVehicleCodeFrom"})
			//plf.addDate({"label":"Date To",id:"dtDateTo"})
			
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({});	//69997
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Show details","id":"getldprogram"}),
		//  plf.addButton({"label":"Generate PDF","id":"vehicleRequest"}),
		  plf.addBlank(),
		
		]
        ReqSummarygrid=
		[   
		{columnname:"SL.No",dataname:"SL_NO",datatype:"integer",width:"auto"},
		{columnname:"Date",dataname:"DATE",datatype:"string",width:"auto"},
		{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:"auto"},
		{columnname:"Vehicle No",dataname:"TRUCK_CODE",datatype:"string",width:"auto"},
		{columnname:"Trailer Category",dataname:"SPL_TRL",datatype:"string",width:"auto"},
		{columnname:"Vehicle Category",dataname:"TRUCK_CAT",datatype:"string",width:"auto",hidden:true},
		
		{columnname:"Scheduler Name",dataname:"SCHEDULER_NAME",datatype:"string",width:"auto",hidden:true},
		{columnname:"Inspection Number",dataname:"INSPECTION_NO",datatype:"string",width:"auto",hidden:true},
		{columnname:"Inspection Location",dataname:"INSPECTION_LOCATION",datatype:"string",width:"auto"},
		
		{columnname:"Inspection Date",dataname:"INSPECTION_DT",datatype:"string",width:"auto",hidden:true},
		{columnname:"Inspection Time",dataname:"INSPECTION_TM",datatype:"string",width:"auto"},
		{columnname:"Token Number",dataname:"TOKEN_NUMBER",datatype:"string",width:"auto"},
		{columnname:"Time Slot",dataname:"TIME_SLOT",datatype:"string",width:"auto"},
		{columnname:"Loading Point",dataname:"LOAD_AT",datatype:"string",width:"auto"},
		{columnname:"Load Description",dataname:"LOAD_DESC",datatype:"string",width:"auto"},
		{columnname:"Unloading Point",dataname:"DELIVERY_AT",datatype:"string",width:"auto"},
		{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:"auto"},
		{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:"auto"},
		{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:"auto"},
		{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:"auto"},
		{columnname:"Inspection Bay #",dataname:"INSPECTION_BAY_NO",datatype:"string",width:"auto"}
		
		]
		ReqSummarydetails=
		{
			title:"Loading Program Details",
			id:"ldprogramdetails",
			detail:ReqSummarygrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		ReqSummarySection = plf.addGrid(ReqSummarydetails,this)		
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(ReqSummarySection)
		
			
		mainpage.eventHandlers = 
		[	
        	{		 
				"controlid":"getldprogram",
				"tasktype":"btnclick",
				"input":[
						"strLoadNoFrom","strInspectionNoFrom","strRegion",
						"strRequestNoTo","strShipmentNoTo","strVehicleCodeFrom","dtDateFrom","dtDateTo","strOrigin","strDestRegion",
						],
				"service":"CoreReportService",
				"methodName":"getLoadingProgram"
							
			},
			
			{ 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitReportLdProgram"// InitReportScreen
			}		
		];
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
