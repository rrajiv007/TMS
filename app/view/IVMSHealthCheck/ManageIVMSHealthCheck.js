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
Ext.define('CueTrans.view.IVMSHealthCheck.ManageIVMSHealthCheck', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "IVMS Health Check";
		
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
            {"name":"IVMS Health Check","linkid":"mng_ivms","tooltip":"Click here to manage IVMS health check."}		
		];

		//
		//mainpage.toolbarActions=["Refresh","Save","Re-Inspect","Authorise","Reject"]
		mainpage.toolbarActions= 
			[
				{
					"name": "Submit",
					"tooltip": "Click here to Submit the IVMS health check."
				},
				{
					"name": "Print",
					"tooltip": "Click here to print report."
				},
            ]
	
		//Header Section Begins
		plf.columns=4
		var preIVMSHealthColumn = plf.addColumnSection({title:"IVMS Health Check Details"});		
		
		var preJourneyInspectionCtrl=								
		[	
			plf.addHlpText({"label":"Health Check Number",id:"strHealthCheckNo",hlpLinkID:"IVMShealthhlp"},this),
			plf.addHlpText({"label":"Vehicle Regn Number",id:"strVehicleRegnNo","mandatory":"true",hlpLinkID:"vehiclehlp"},this),
			plf.addHlpText({"label":"Driver License No","id":"strDriverLicNo",hlpLinkID:"driverhelp"},this),// cmd by naren "mandatory":"true"
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addHidden({"label":"Health Check Number",id:"strTruckCode"})
			
		]
		preIVMSHealthColumn.add(preJourneyInspectionCtrl);	
		preIVMSHealthColumn.add(plf.addStripLine({}));
		//Header Section Ends
		
		//Checklist Section Begins
		plf.columns=1
		var ChecklistColumn = plf.addColumnSection({title:"Checklist"});	
		var ChecklistFormCtrl=														
		[
			plf.addCheckBox({"label":"Seatbelt Sensor Fitted","id":"strseatSenFit","labelWidth":200,
			listeners:{
					   click: {
						   element: 'el',
						   fn: function (id) 
						   {
						    var tmpChecked=mainpage.queryById("strseatSenFit").getValue();
							if (tmpChecked)
							{
							mainpage.queryById("strSeatSenWor").setDisabled(false);	
							}							
							else
							{
							mainpage.queryById("strSeatSenWor").setDisabled(true);
							mainpage.queryById("strSeatSenWor").setValue(false);								
							}					
							}}}			
			}),
			plf.addCheckBox({"label":"Seatbelt Sensor Working","id":"strSeatSenWor","labelWidth":200,"disabled":true,"conditionalmandatory":"true"}),
			plf.addCheckBox({"label":"Tamper Box fitted","id":"strTamBoxFit","labelWidth":200}),
			plf.addCheckBox({"label":"Panic Button Working & Notifying","id":"strPanButWor","labelWidth":200,"mandatory":"true"}),
			plf.addCheckBox({"label":"Buzzer Audible","id":"strBuzAud","labelWidth":200,"mandatory":"true"}),
			plf.addCheckBox({"label":"No Signs of Tampering","id":"strNoSignTam","labelWidth":200,"mandatory":"true"}),
			plf.addCheckBox({"label":"Driver Key Name matched","id":"strDriverMat","labelWidth":200}) //"mandatory":"true" Removed by naren 
		
		]
		ChecklistColumn.add(ChecklistFormCtrl);
		//Checklist Section Ends
		
		plf.columns=1
		var ActionColumn = plf.addColumnSection({title:"Action Details"});	
		var ActionFormCtrl=														
		[
			plf.addDisplayOnly({"label":"Technician Name","id":"strTechName","labelWidth":200}),
			plf.addDisplayOnly({"label":"Health Check Date/Time","id":"strHealthChk","labelWidth":200})
		]
		ActionColumn.add(ActionFormCtrl);
		//Add Header Section to Main Page
		mainpage.ptrMainSection.add(preIVMSHealthColumn)
		mainpage.ptrMainSection.add(ChecklistColumn)//Add check list Section to Main 
        mainpage.ptrMainSection.add(ActionColumn)     
		
		mainpage.dataHistorySectionFlag=false;
		
		// Event Handlers Mapping Begins
		
		mainpage.eventHandlers = 
		[
			{
			"controlid":"",
			"tasktype":"onload",
			"input":["strHealthCheckNo","strVehicleRegnNo","strDriverLicNo","strStatus","strseatSenFit",
				"strSeatSenWor","strTamBoxFit","strPanButWor","strBuzAud","strNoSignTam","strDriverMat","strTechName",
				"strHealthChk"],
			"service":"IVMSHealthChkCoreServiceTS",
			"methodName":"INIT_IVMSHEALTH"
			},
			{
				"controlid":"strHealthCheckNo",
				"tasktype":"toolbarclick",
				"action":"Submit",
				"input":["strHealthCheckNo","strVehicleRegnNo","strDriverLicNo","strStatus","strseatSenFit",
				"strSeatSenWor","strTamBoxFit","strPanButWor","strBuzAud","strNoSignTam","strDriverMat","strTechName",
				"strHealthChk"],
				"service":"IVMSHealthChkCoreServiceTS",
				"methodName":"SUBMIT_IVMSHEALTH",
				"msg":"Only if all the * and ** checklists are checked, then IVMS Health Check is pass"
			},
			{
				"controlid":"strTruckCode",
				"tasktype":"toolbarclick",
				"action":"Print",
				"input":["strTruckCode"],
				"service":"CoreReportService",
				"methodName":"IVMSHEALTHReport"
			},
			{
				"controlid":"strVehicleRegnNo",
				"tasktype":"onenter",
				"input":["strVehicleRegnNo"],
				"service":"IVMSHealthChkCoreServiceTS",
				"methodName":"ONENTER_IVMSVEHNO"
			},
			{
				"controlid":"strDriverLicNo",
				"tasktype":"onenter",
				"input":["strDriverLicNo"],
				"service":"IVMSHealthChkCoreServiceTS",
				"methodName":"ONENTER_IVMSDRVNO"
			},
			{
				"controlid":"strHealthCheckNo",
				"tasktype":"onenter",
				"input":["strHealthCheckNo"],
				"service":"IVMSHealthChkCoreServiceTS",
				"methodName":"ONENTER_IVMSHELTHCHK"
			}				
		];
		mainpage.screenLinks=	
		{	 
				"mng_ivms":
				{
					"dest":"IVMSHealthCheck.ManageIVMSHealthCheck",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		};
		
		mainpage.hlpLinks=
		{
		"driverhelp":
		{
			"hlpType":"Header",
			"hlpScreen":"jm_master.DriverHelp",
			"send":[
					{"parent":"","child":""},
					{"direct":"","child":""}
				   ],
			"receive":[
					{"parent":"strDriverLicNo","child":"DRIVER_CODE"}
					
					]
		},
		"vehiclehlp":
		{
			"hlpType":"Header",
			"hlpScreen":"jm_master.TruckHelp",
			"send":[
					{"parent":"","child":""},
					{"direct":"VEHICLE_AC","child":"strContext"}
				   ],
			"receive":[
					{"parent":"strVehicleRegnNo","child":"TRUCK_REG_NO"}
					]
		},
		"IVMShealthhlp":
		{
			"hlpType":"Header",
			"hlpScreen":"IVMSHealthCheck.IVMSHealthCheckHelp",
			"send":[
					{"parent":"","child":""},
					{"direct":"","child":""}
				   ],
			"receive":[
					{"parent":"strHealthCheckNo","child":"HEALTH_CHK_NO"}
					]
		}
		}
		
		this.callParent(arguments);
	}
});
