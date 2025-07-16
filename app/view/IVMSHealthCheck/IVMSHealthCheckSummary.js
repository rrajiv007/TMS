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
Ext.define('CueTrans.view.IVMSHealthCheck.IVMSHealthCheckSummary',  
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
	//	var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "IVMS Health Check Summary";
		
		//IVMS Search Section Begins
		plf.columns=4
		var helpIVMSHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);		
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"IVMS Health Check","linkid":"mng_ivms","tooltip":"Click here to manage IVMS health check."},
			{"name":"IVMS Health Check Report","linkid":"rpt_ivms","tooltip":"Click here for IVMS health check report."}
		]
		
		var helpOnIVMSFormCtrl=															
		[
			plf.addText({"label":"Health Check Number",id:"strHealthCheckNo"}),
			plf.addText({"label":"Vehicle Regn Number",id:"strVehicleRegnNo"}),
			plf.addText({"label":"Driver License Number",id:"strDriverLicNo"}),
			plf.addCombo({"label":"Health Check Status",id:"strStatus"}),
			plf.addDate({"label":"From Date",id:"strFromDate"}),
			plf.addDate({"label":"To Date",id:"strToDate"})
		
		]
		
		 helpIVMSHdrCollapse.add(helpOnIVMSFormCtrl);									
		//Inspection Search Section Ends
		
		//Inspection Grid Section Begins
		var helpOnIVMSGridFieldObj=												
		[
			{columnname:"Health Check Number",dataname:"HEALTH_CHK_NO",datatype:"string",width:150,linkId:"ml_lnk","tooltip":"Click here to launch IVMS health check."},
			{columnname:"Vehicle Registration Number",dataname:"VEH_REG_NO",datatype:"string",width:170},
			{columnname:"Driver License Number",dataname:"DRV_LIC_NO",datatype:"string",width:170},
			{columnname:"Technician Name",dataname:"TECH_NAME",datatype:"string",width:170},
			{columnname:"Health Check Date/Time",dataname:"HEALTH_CHK_DT_TM",datatype:"string",width:170},
			{columnname:"Health Check Status",dataname:"STATUS",datatype:"string",width:150}
		]
		var helpOnivmsGridDtl=										
		{
			title:"",
			id:"IVMSresultCache",
			detail:helpOnIVMSGridFieldObj,
			removeAddDelete:true,
			visibleRow:12,
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
		mainpage.hlpLinks=
		{				
			/*	"trailerno":
				{
					"hlpType":"Header",
					"hlpScreen":"IVMSHealthCheck.ManageIVMSHealthCheck",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strHealthCheckNo","child":"HEALTH_CHK_NO"}
							
							]
				}*/
		}
		//Event Handlers Mapping Ends
			
		//Generate Screen Section
		
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
				},
				"ml_lnk":
				{
					"dest":"IVMSHealthCheck.ManageIVMSHealthCheck",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"HEALTH_CHK_NO","dest":"strHealthCheckNo"}
							]
				},
				"rpt_ivms":
				{
					"dest":"IVMSHealthCheck.IVMSHealthCheckReport",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		
		}
	
	
		this.callParent(arguments);
		
	}
});
