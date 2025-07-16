Ext.define('CueTrans.view.jm_master.DriverReports', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Driver Report";
		
		
		
		plf.columns=3
		driverReportsColumn = plf.addColumnSection({});
		
		driverReportsFormCtrl=
		[
			plf.addHlpText({"label":"Driver Code From",id:"strDriverCodeFrom",hlpLinkID:"driverHelp1"},this),
			plf.addHlpText({"label":"Driver Code To",id:"strDriverCodeTo",hlpLinkID:"driverHelp2"},this),
			plf.addCombo({"label":"Status",id:"strStatus"}),
						
			plf.addListEdit({"label":"Driver Name",id:"strDriverName",inputFormat:"string",InputLength:"100"}),
			plf.addHlpText({"label":"Carrier Code",id:"str3plOwnerCode",hlpLinkID:"CarrierHelp",inputFormat:"string",InputLength:"20"},this),
			plf.addCombo({"label":"Driver Type",id:"strDriverType"}),
			
			plf.addCombo({"label":"Truck Category",id:"strTruckCategory"}),
			plf.addDate({"label":"Effective To",id:"dtTcEffectiveTo"}),
			plf.addBlank(),
			plf.addCombo({"label":"Availability Status",id:"strAvailabilityStatus"}),
			plf.addDate({"label":"From Date",id:"dtFrom"}),
			plf.addDate({"label":"To Date",id:"dtTo"}),
			
			plf.addCombo({"label":"Document Type",id:"strDocumentType"}),
			plf.addDate({"label":"Effective To",id:"dtDtEffectiveTo"}),
			plf.addBlank(),
			plf.addText({"label":"No Of Hrs From",id:"iHrsFrom",inputFormat:"numeric",InputPrecision:"2"}),
			plf.addText({"label":"No Of Hrs To",id:"iHrsTo",inputFormat:"numeric",InputPrecision:"2"}),
			plf.addBlank(),
			plf.addText({"label":"No Of Kms From",id:"iKmsFrom",inputFormat:"numeric",InputPrecision:"2"}),
			plf.addText({"label":"No Of Kms To",id:"iKmsTo",inputFormat:"numeric",InputPrecision:"2"}),
			
					
		]
		
		driverReportsColumn.add(driverReportsFormCtrl);
		
    	//reports button section
		plf.columns=4
		driverReportsButtonColumn = plf.addColumnSection({});
		driverReportsFormCtrl=
		[
		  plf.addButton({"label":"Print Summary","id":"btnPrintSummary"}),
		  plf.addButton({"label":"Print Detail","id":"btnPrintDetail"}),
		  plf.addButton({"label":"Performance Report","id":"btnPerformance"})
		
		]	
		
		driverReportsButtonColumn.add(driverReportsFormCtrl)
		mainpage.ptrMainSection.add(driverReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(driverReportsButtonColumn) //Add buttons to Main Page
		
	   mainpage.hlpLinks=
		{
			"driverHelp1":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
						 	 {"parent":"strDriverCodeFrom","child":"DRIVER_CODE"},
							 
							]
				},
           "driverHelp2":
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
         "CarrierHelp":
		        {
					"hlpType":"Header",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
						 	  {"parent":"str3plOwnerCode","child":"OWNER_CODE_3PL"}
							]
				},
		}
		
		mainpage.eventHandlers = 
		[			
		  {
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreDriveService",
				"methodName":"initDriverReportTS"
			},
			{       
				"controlid":"btnPrintSummary",
				"tasktype":"btnclick",
				"input":["strDriverCodeFrom","strDriverCodeTo","strStatus","strDriverName","str3plOwnerCode","strDriverType","strTruckCategory","dtTcEffectiveTo","strAvailabilityStatus",
				"strDocumentType","dtDtEffectiveTo","iKmsTo","iKmsFrom",,"iHrsFrom","iHrsTo"],
				"service":"CoreDriveService",
				"methodName":"printDriverReport"
			},
			{       
				"controlid":"btnPrintDetail",
				"tasktype":"btnclick",
				"input":["strDriverCodeFrom","strDriverCodeTo","strStatus","strDriverName","str3plOwnerCode","strDriverType","strTruckCategory","dtTcEffectiveTo","strAvailabilityStatus",
				"strDocumentType","dtDtEffectiveTo","iKmsFrom","iKmsTo","iHrsFrom","iHrsTo"],
				"service":"CoreDriveService",
				"methodName":"printDriverDetailReport"
			},
			{       
				"controlid":"btnPerformance",
				"tasktype":"btnclick",
				"input":["strDriverCodeFrom","strDriverCodeTo","strStatus","strDriverName","str3plOwnerCode","strDriverType","strTruckCategory","dtTcEffectiveTo",					"strAvailabilityStatus",
				"strDocumentType","dtDtEffectiveTo"],
				"service":"CoreDriveService",
				"methodName":"printPerformanceReport"
			}
	   ];
		
				
		this.callParent(arguments);
		
		
	}
	
			
});
