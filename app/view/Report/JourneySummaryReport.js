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
Ext.define('CueTrans.view.Report.JourneySummaryReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Journey Summary Reports";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var ReportsColumn = plf.addColumnSection({});	//69997
		
		var ReportsFormCtrl=							//69997
		[

			plf.addCheckBox({"label":"Region",id:"strRegion",hlpLinkID:"region"},this),
			plf.addCheckBox({"label":"Hub",id:"strHub",hlpLinkID:"hub"},this),

			plf.addHlpText({"label":"Origin",id:"strOrigin",hlpLinkID:"origin"},this),
			plf.addHlpText({"label":"Destination",id:"strDestination",hlpLinkID:"destination"},this),
			
			plf.addHlpText({"label":"JP NO",id:"strJpNo",hlpLinkID:"jpno"},this),
		    plf.addHlpText({"label":"Journey Manager Name",id:"strJourneyManagerName",hlpLinkID:"journeymanagername"},this),
			
			plf.addHlpText({"label":"Inspection No",id:"strInspectionNo",hlpLinkID:"inspectionno",inputFormat:"string",InputLength:"80"},this),
			
			plf.addHlpText({"label":"Driver Name",id:"strDriverName",hlpLinkID:"drivername",inputFormat:"string",InputLength:"80"},this),
            plf.addHlpText({"label":"Driver Mobile No",id:"strDriverMobileNo",hlpLinkID:"drivermobileno",inputFormat:"string",InputLength:"11"},this),
			
			plf.addHlpText({"label":"Vehicle No",id:"strVechicleNo",hlpLinkID:"vehicleno",inputFormat:"string",InputLength:"80"},this),
			
			plf.addHlpText({"label":"Contract No",id:"strContractNo",hlpLinkID:"contractno",inputFormat:"string",InputLength:"80"},this),
			
			plf.addHlpText({"label":"ShipmentNo",id:"strShipmentNo",hlpLinkID:"shipmentno",inputFormat:"string",InputLength:"80"},this),
			
			plf.addHlpText({"label":"DO No",id:"strDoNo",hlpLinkID:"dono",inputFormat:"string",InputLength:"80"},this),
            plf.addHlpText({"label":"Load No",id:"strLoadNo",hlpLinkID:"LoadNo",inputFormat:"string",InputLength:"80"},this),
//          plf.addHlpText({"label":"Load No From",id:"strLoadNoFrom",hlpLinkID:"LoadFrom",inputFormat:"string",InputLength:"80"},this),			
//			plf.addHlpText({"label":"Load No To",id:"strLoadNoTo",hlpLinkID:"LoadTo",inputFormat:"string",InputLength:"80"},this),
			plf.addHlpText({"label":"Trip No",id:"strTripNo",hlpLinkID:"TripNo",inputFormat:"string",InputLength:"80"},this),			

			plf.addHlpText({"label":"Request No",id:"strRequestNo",hlpLinkID:"requestno",inputFormat:"string",InputLength:"80"},this),		
			
			plf.addCombo({"label":"Journey Status","id":"strJourneyStatus"}),
			plf.addCombo({"label":"Carrier","id":"strCarrier"}),
			
			plf.addCheckBox({"label":"Night Driving","id":"strNightDriving"}),
			
			//Year	-dropdown
			plf.addCombo({"label":"Year",id:"strYear"}),
			//Month -checkbox?
			plf.addCombo({"label":"Month",id:"strMonth"}),
			//Date Type -dropdown
			plf.addCombo({"label":"DateType",id:"strDateType"}),
			
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"})	
				
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({});		//69997
		 ReportsFormCtrl=								
		[
		  plf.addButton({"label":"Journey Summary by Region","id":"JourneySummaryRegion"}),
		  plf.addButton({"label":"Journey Summary by Hub","id":"JourneySummaryHub"}),
		  plf.addButton({"label":"Journey Status","id":"JourneyStatus"}),
		  plf.addButton({"label":"Journey Summary by 3PL","id":"JourneySummary3pl"})
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
				"controlid":"JourneySummaryRegion",
				"tasktype":"btnclick",
				"input":["strRegion","strVechicleNo","strTripNo","dtDateFrom","dtDateTo"],
				"service":"CoreReportService",
				"methodName":"JourneySummaryRegionReport"
			},
			  {
				"controlid":"JourneySummaryHub",
				"tasktype":"btnclick",
				"input":["strHub","strRegion","strVechicleNo","strTripNo","dtDateFrom","dtDateTo"],
				"service":"CoreReportService",
				"methodName":"JourneySummaryHubReport"
			},
			{
				"controlid":"JourneyStatus",
				"tasktype":"btnclick",
				"input":["strRegion","dtDateFrom","dtDateTo"],
				"service":"CoreReportService",
				"methodName":"JourneyStatusReport"
			},
			{
				"controlid":"JourneySummary3pl",
				"tasktype":"btnclick",
				"input":["strHub","strVechicleNo","strTripNo","dtDateFrom","dtDateTo"],
				"service":"CoreReportService",
				"methodName":"JourneySummary3plReport"
			}
			
		];		
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
