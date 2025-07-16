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
Ext.define('CueTrans.view.Report.Driver&VehicleReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Driver and Vehicle Reports";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var ReportsColumn = plf.addColumnSection({});			//69997
		
		var ReportsFormCtrl=									//69997
		[
      		plf.addHlpText({"label":"Driver Code From",id:"strDriverCodeFrom",hlpLinkID:"driverfrom"},this),
		    plf.addHlpText({"label":"Driver Code To",id:"strDriverCodeTo",hlpLinkID:"driverto"},this),
			
			plf.addHlpText({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"carriercode"},this),
			plf.addCombo({"label":"Driver Availability Status",id:"strDriverAvailStatus"}),
			
			plf.addHlpText({"label":"Vehicle Code From",id:"strVehicleCodeFrom",hlpLinkID:"vehiclecodefrom"},this),
		    plf.addHlpText({"label":"Vehicle Code To",id:"strVehicleCodeTo",hlpLinkID:"vehcilecodeto"},this),
			plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory"}), 
			plf.addCombo({"label":"Vehicle Availability Status",id:"strVehicleAvailStatus"}), 
			
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"})			
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({});	//69997
		ReportsFormCtrl=
		[
		  plf.addButton({"label":"Driver Listing","id":"DriverList"}),
		  plf.addButton({"label":"Driver Performance","id":"driverperformance"}),
		  plf.addButton({"label":"Vehicle Listing","id":"VehicleList"}),
		  plf.addButton({"label":"Vehicle Performance","id":"vehicleperformance"})
		  
		
		]	
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		
		mainpage.hlpLinks=
		{       

           
 "carriercode":
			{
				"hlpType":"Header",
				"hlpScreen":"jm_master.CarrierHelp",
				"send":[
						{"parent":"","child":""}
					   ],
				"receive":[
						{"parent":"strCarrierCode","child":"OWNER_CODE_3PL"}
						]
			},
			"driverfrom":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strDriverCodeFrom","child":"DRIVER_CODE"}
							]
				},
				"driverto":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strDriverCodeTo","child":"DRIVER_CODE"}
							]
				},
				"vehiclecodefrom":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strVehicleCodeFrom","child":"TRUCK_CODE"}
							]
				},
				"vehcilecodeto":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strVehicleCodeTo","child":"TRUCK_CODE"}
							]
				}
				}
		
		mainpage.eventHandlers = 
		[	
         
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitReportScreen"
			},
                      {
				"controlid":"DriverList",
				"tasktype":"btnclick",
				"input":["strDriverCodeFrom","strDriverCodeTo","strCarrierCode","strDriverAvailStatus"],
				"service":"CoreReportService",
				"methodName":"DriverListReport"
			},
			  {
				"controlid":"VehicleList",
				"tasktype":"btnclick",
				"input":["strVehicleCodeFrom","strVehicleCodeTo","strCarrierCode","strVehicleAvailStatus","strVehicleCategory"],
				"service":"CoreReportService",
				"methodName":"VehicleListReport"
			},
			{
				"controlid":"driverperformance",
				"tasktype":"btnclick",
				"input":["strDriverCodeFrom","strDriverCodeTo","strCarrierCode","strDriverAvailStatus","dtDateFrom","dtDateTo"],
				"service":"CoreReportService",
				"methodName":"DriverPerformanceReport"
			},
			{
				"controlid":"vehicleperformance",
				"tasktype":"btnclick",
				"input":["strVehicleCodeFrom","strVehicleCodeTo","strCarrierCode","strVehicleAvailStatus","dtDateFrom","dtDateTo"],
				"service":"CoreReportService",
				"methodName":"VehiclePerformanceReport"
			}

			
		];
		
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
