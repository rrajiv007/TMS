Ext.define('CueTrans.view.jm_master.TruckReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Vehicle Report";
		
		
		
		//Help on Customer Search Section Begins
		plf.columns=3
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		truckReportsColumn = plf.addColumnSection({});
		
		truckReportsFormCtrl=
		[
			plf.addHlpText({"label":"Vehicle Code From",id:"strTruckCodeFrom",hlpLinkID:"truckCodeFrom"},this),
			plf.addHlpText({"label":"Vehicle code To",id:"strTruckCodeTo",hlpLinkID:"truckCodeTo"},this),
			plf.addCombo({"label":"Status","id":"strStatus"}),
			plf.addListEdit({"label":"Vehicle Description",id:"strTruckDesc",inputFormat:"string",InputLength:"100"}),
			
			plf.addHlpText({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"carrierCode",inputFormat:"string",InputLength:"100"},this),
			plf.addCombo({"label":"Vehicle Type",id:"strTruckType"}),
			plf.addCombo({"label":"Vehicle Category",id:"strTruckCategory"}),
			
			//plf.addText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"customerCode"},this),
			plf.addText({"label":"Trailer Code",id:"strTrailerCode",inputFormat:"string",InputLength:"100"}),
			plf.addCombo({"label":"Availability Status",id:"strAvailabilityStatus"}),
			plf.addCombo({"label":"Document Type",id:"strInsType"}),
			plf.addDate({"label":"Effective To",id:"dtEffectiveTo"}),
			plf.addDate({"label":"From Date",id:"dtFromDate"}),
			plf.addText({"label":"No of Hrs From",id:"strNoOfHrsFrom",inputFormat:"numeric",InputPrecision:"2"}),
			plf.addText({"label":"No of Hrs To",id:"strNoOfHrsTo",inputFormat:"numeric",InputPrecision:"2"}),
			plf.addDate({"label":"To Date",id:"dtToDate"}),
			
			
			plf.addText({"label":"No of Kms From",id:"strNoOfKmsFrom",inputFormat:"numeric",InputPrecision:"2"}),
			plf.addText({"label":"No of Kms To ",id:"strNoOfKmsTo",inputFormat:"numeric",InputPrecision:"2"})
			/*plf.addCombo({"label":"Report Name",id:"strReportName"})*/
			
		  
				
		]
		
		truckReportsColumn.add(truckReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		truckReportsButtonColumn = plf.addColumnSection({});
		truckReportsFormCtrl=
		[
		  plf.addButton({"label":"Print Summary","id":"btnPrintSummary"}),
		  plf.addButton({"label":"Print Detail","id":"btnPrintDetail"}),
		  plf.addButton({"label":"Performance Report","id":"btnPerformance"})	
		
		]	
		
		truckReportsButtonColumn.add(truckReportsFormCtrl)
		mainpage.ptrMainSection.add(truckReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(truckReportsButtonColumn) //Add buttons to Main Page
		
	   mainpage.hlpLinks=
		{
			"truckCodeFrom":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTruckCodeFrom","child":"TRUCK_CODE"}
							]
				},
				
				"truckCodeTo":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTruckCodeTo","child":"TRUCK_CODE"}
							]
				},
			
				"carrierCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCarrierCode","child":"OWNER_CODE_3PL"}
							]
				}
			
		}
		
		mainpage.eventHandlers = 
		[			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreTruckService",
				"methodName":"initTruckReportScrTS"
				},
				{
				"controlid":"btnPrintSummary",
				"tasktype":"btnclick",
				"input":["strTruckCodeFrom","strTruckCodeTo","strStatus","strTruckDesc","strCarrierCode","strCarrierCode",
							"strTruckType","strTruckCategory","strTrailerCode","strInsType"],
				"service":"CoreTruckService",
				"methodName":"printTruckSummaryReport"
				},
				{
				"controlid":"btnPrintDetail",
				"tasktype":"btnclick",
				"input":["strTruckCodeFrom","strTruckCodeTo","strStatus","strTruckDesc","strCarrierCode","strCarrierCode",
							"strTruckType","strTruckCategory","strTrailerCode","strInsType"],
				"service":"CoreTruckService",
				"methodName":"printTruckDetailReport"
				},
				{
				"controlid":"btnPerformance",
				"tasktype":"btnclick",
				"input":["strTruckCodeFrom","strTruckCodeTo","strStatus","strTruckDesc","strTruckType","strTruckCategory","strAvailabilityStatus","dtFromDate","dtToDate"],
				"service":"CoreTruckService",
				"methodName":"printPerformanceReport"
				}
			
	   ];
		
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	
			
});
