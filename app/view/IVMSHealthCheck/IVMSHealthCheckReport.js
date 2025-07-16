/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.3															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
                                 
************************************************************************************************/
Ext.define('CueTrans.view.IVMSHealthCheck.IVMSHealthCheckReport',  
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
	//	var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "IVMS Health Check Report";
		
		//IVMS Search Section Begins
		plf.columns=4
		var helpIVMSHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);		
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			//{"name":"IVMS Health Check","linkid":"mng_ivms","tooltip":"Click here to manage IVMS health check."}
		]
		
		var helpOnIVMSFormCtrl=															
		[
			plf.addText({"label":"Health Check Number",id:"strHealthCheckNo"}),
			plf.addText({"label":"Vehicle Regn Number",id:"strVehicleRegnNo"}),
			plf.addText({"label":"Driver License #",id:"strDriverLicNo"}),
			plf.addCombo({"label":"Health Check Status",id:"strStatus"}),
			plf.addText({"label":"Technician Name",id:"strTechnicianName"}),
			plf.addDate({"label":"From Date",id:"strFromDate"}),
			plf.addDate({"label":"To Date",id:"strToDate"})
		
		]
		
		 helpIVMSHdrCollapse.add(helpOnIVMSFormCtrl);									
		//Inspection Search Section Ends
		
		//Inspection Grid Section Begins
		var helpOnIVMSGridFieldObj=												
		[
			{columnname:"Print Health Check Report",dataname:"HEALTH_CHECK_REPORT",datatype:"string",width:130,gridReport:"HealthCheckReport",imageURL:"resources/images/shared/calendar.gif",tooltip:"Click here to print health check report."},
			{columnname:"Health Check Number",dataname:"HEALTH_CHK_NO",datatype:"string",width:150},
			{columnname:"Vehicle Registration Number",dataname:"VEH_REG_NO",datatype:"string",width:170},
			{columnname:"Driver License Number",dataname:"DRV_LIC_NO",datatype:"string",width:170},
			{columnname:"Technician Name",dataname:"TECH_NAME",datatype:"string",width:170},
			{columnname:"Health Check Date/Time",dataname:"HEALTH_CHK_DT_TM",datatype:"string",width:170},
			{columnname:"Health Check Status",dataname:"STATUS",datatype:"string",width:150},
			{columnname:"Seatbelt Sensor Fitted",dataname:"SEATBELT_SENSOR_FITTED",datatype:"string",width:170},
			{columnname:"Seatbelt Sensor Working",dataname:"SEATBELT_SENSOR_WORKING",datatype:"string",width:170},
			{columnname:"Tamper Box fitted",dataname:"TAMPER_BOX_FITTED",datatype:"string",width:160},
			{columnname:"Panic Button Working & Notifying",dataname:"PANIC_BUTTON_WORK_NOTIFY",datatype:"string",width:200},
			{columnname:"Buzzer Audible",dataname:"BUZZER_AUDIBLE",datatype:"string",width:150},
			{columnname:"No Signs of Tampering",dataname:"NO_SIGNS_TAMPERING",datatype:"string",width:170},
			{columnname:"Driver Key Name matched",dataname:"DRIVER_KEY_NAME_MATCHED",datatype:"string",width:170},
			{columnname:"Health Check Number",dataname:"strTruckCode",datatype:"string",width:130,hidden:true}
		]
		var helpOnivmsGridDtl=										
		{
			title:"",
			id:"IVMSresultCache",
			detail:helpOnIVMSGridFieldObj,
			removeAddDelete:true,
			visibleRow:12,
			readonly:true,
			"rowHighlight":true
		}
		var helpGridSection = plf.addGrid(helpOnivmsGridDtl,this)
		//Inspection Grid Section Ends
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(helpIVMSHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
			"controlid":"",
			"tasktype":"onload",
			"input":[""],
			"service":"IVMSHealthChkCoreServiceTS",
			"methodName":"INIT_IVMSHEALTHRPT"
			},
			{       
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strHealthCheckNo","strVehicleRegnNo","strDriverLicNo","strStatus","strFromDate","strToDate","strTechnicianName"],
				"service":"IVMSHealthChkCoreServiceTS",
				"methodName":"SEARCH_IVMSHEALTHRPT"
			},
           {
				"grideventid":"HealthCheckReport",
				"tasktype":"gridonprint",
				"input":["strTruckCode"],
				"service":"CoreReportService",
				"methodName":"IVMSHEALTHReport"
			},			
		];
		mainpage.hlpLinks=
		{
		}
		//Event Handlers Mapping Ends
			
		//Generate Screen Section
		
		mainpage.screenLinks=
	
		{
		
		}
	
	
		this.callParent(arguments);
		
	}
});
