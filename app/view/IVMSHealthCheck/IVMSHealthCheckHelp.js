/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			Remarks             
************************************************************************************************	
	                                   
************************************************************************************************/
Ext.define('CueTrans.view.IVMSHealthCheck.IVMSHealthCheckHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.screenName = "IVMS Health Check Help";
		mainpage.startPainting();
		
		
		//Calendar List Header Section Begins
		plf.columns=3
		var helpIVMSHdrCollapse = plf.addColumnSection({title:"",collapsed:false});		//69995
		
		var helpOnIVMSFormCtrl=							//69995
		[
			plf.addText({"label":"Health Check Number",id:"strHealthCheckNo"}),
			plf.addText({"label":"Vehicle Regn Number",id:"strVehicleRegnNo"}),
			plf.addCombo({"label":"Health Check Status",id:"strStatus"}),
			plf.addText({"label":"Driver License Number",id:"strDriverLicNo"}),
			plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."}),
		]
		helpIVMSHdrCollapse.add(helpOnIVMSFormCtrl);
		//Calendar List Header Section Ends
		
		//Calendar Grid Section Begins
		var helpOnIVMSGridFieldObj=			//69995
		[
			{columnname:"Health Check Number",dataname:"HEALTH_CHK_NO",datatype:"string",width:150},
			{columnname:"Vehicle Registration Number",dataname:"VEH_REG_NO",datatype:"string",width:170},
			{columnname:"Driver License Number",dataname:"DRV_LIC_NO",datatype:"string",width:170},
			{columnname:"Technician Name",dataname:"TECH_NAME",datatype:"string",width:170},
			{columnname:"Health Check Date/Time",dataname:"HEALTH_CHK_DT_TM",datatype:"string",width:170},
			{columnname:"Health Check Status",dataname:"STATUS",datatype:"string",width:150}
		]
		var helpOnivmsGridDtl=		//69995
		{
			title:"",
			id:"IVMSresultCache",
			detail:helpOnIVMSGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true,
			removeTbar:true,
			widthBasis:"flex"

		}
		var helpGridSection = plf.addGrid(helpOnivmsGridDtl,this)  //69995
		mainpage.hlpSearchGridPtr = helpGridSection		
		//Calendar Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpIVMSHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
			"controlid":"",
			"tasktype":"onload",
			"input":["strStatus"],
			"service":"IVMSHealthChkCoreServiceTS",
			"methodName":"INIT_IVMSHEALTHSUM"
			},
			{       
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strHealthCheckNo","strVehicleRegnNo","strDriverLicNo","strStatus","strFromDate","strToDate"],
				"service":"IVMSHealthChkCoreServiceTS",
				"methodName":"SEARCH_IVMSHEALTHSUM"
			}		
		];
		//Event Handlers Mapping Ends
		/*
		mainpage.screenLinks=
		{
			"calendarmaster":
				{
					"dest":"jm_master.CalendarMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"CALENDAR_CODE","dest":"strCalenderCode"}
							]
				}
		}
		*/
		//Generate Screen Section
	/*	mainpage.generateScreen();

		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
		
	}
});
