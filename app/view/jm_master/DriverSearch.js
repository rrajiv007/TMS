/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995				Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.DriverSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Driver Summary";
		//Driver Search Section Begins
		plf.columns=4
		helpOndriverHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);
        mainpage.toolbarSectionFlag=true;	
        mainpage.toolbarLinks=
		[
			{"name":"Create Driver","linkid":"jm_driverMst","tooltip":"Click here to create a driver."},
			{"name":"Violation Summary","linkid":"jm_ViolationSummary","tooltip":"Click here to launch violation summary."},
			{"name":"Violation Escalations","linkid":"jm_ViolationEscalations","tooltip":"Click here to launch violation escalations."}
		]
	 	var helpOndriverFormCtrl=			//69995
		[
			plf.addText({"label":"Driver Code",id:"strDriverCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Driver Code To",id:"strDriverCodeTo","anywhereSearch":"true"}),
			plf.addText({"label":"Driver Name",id:"strDriverName"}),
			plf.addText({"label":"Carrier Name",id:"str3plOwnerName"}),
			plf.addCombo({"label":"Driver Type",id:"strDriverType"}),
			//plf.addCombo({"label":"Licence Type",id:"strLicenceType"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Availability Status",id:"strAvailabilityStatus"}),
            plf.addText({"label":"Driver Licence No",id:"strDriverLicenceNo"}),
			plf.addText({"label":"IVMS Blue Key No",id:"strIvmsKeyNo"})
			//plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."})
		]
		helpOndriverHdrCollapse.add(helpOndriverFormCtrl);
		//Driver Search Section Ends
		
		//Driver Grid Section Begins
		var helpOndriverGridFieldObj=			//69995
		[
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:150,linkId:"driverMaster","tooltip":"Click here to launch the driver screen."},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:200},
			{columnname:"Driver Phone No",dataname:"PHONE_NO",datatype:"string",width:150},
			{columnname:"Driver Type",dataname:"DRIVER_TYPE",datatype:"string",storeId:"driveType",width:200},
			//{columnname:"Licence Type",dataname:"LICENCE_TYPE",datatype:"string",storeId:"licenseType",width:100},
			{columnname:"Carrier Name",dataname:"OWNER_NAME_3PL",datatype:"string",width:200},
			//{columnname:"3PL Owner Phone No",dataname:"PHONE_1",datatype:"string",width:150},
			//{columnname:"Nationality Id",dataname:"NATIONALITY_ID",datatype:"string",width:100},
			{columnname:"IVMS Blue Key No",dataname:"IVMS_BLUEKEYID",datatype:"string",width:150},
			{columnname:"Availability Status",dataname:"AVAILABILITY_STATUS",datatype:"string",storeId:"availabilitystatus",width:130},
            //{columnname:"Driver Licence No",dataname:"LICENCE_NO",datatype:"string",width:130},
			{columnname:"Status",dataname:"STATUS",datatype:"string",storeId:"status",width:100},
			{columnname:"DOB",dataname:"DOB", width:"auto"},
			{columnname:"Age",dataname:"AGE", width:"auto"},
			{columnname:"Contract Number",dataname:"CONTRACT_NUM",datatype:"string",width:140},
		]
		var helpOndriverGridDtl=			//69995
		{
			title:"Driver Details",
			id:"driverSearch",
	       detail:helpOndriverGridFieldObj,
		   readonly:true,
		   visibleRow:plf.searchVisibleRows
		   }
		var helpGridSection = plf.addGrid(helpOndriverGridDtl,this)			//69995
		//Driver Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOndriverHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreDriveService",
				"methodName":"initDriverSearchScrTS"
			},	
			{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strDriverCodeFrom","strDriverName","str3plOwnerName","strDriverType","strStatus",
						"strAvailabilityStatus","strDriverLicenceNo","strIvmsKeyNo"],
				"service":"CoreDriveService",
				"methodName":"fetchAllDriverDetailsTS"
			}
		];
		
		mainpage.screenLinks=
		{
			"driverMaster":
			{
				"dest":"jm_master.DriverMaster",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"DRIVER_CODE","dest":"strDriverCode"}
						]
			},
			"jm_driverMst":
			{
				"dest":"jm_master.DriverMaster",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
			},
			"jm_ViolationSummary":
			{
				"dest":"jm_master.ViolationsSummary",

				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
			},
			"jm_ViolationEscalations":
			{
				"dest":"jm_master.ViolationsEscalations",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
			}	
		}
		//Event Handlers Mapping Ends
			
		//Generate Screen Section
		/*mainpage.generateScreen();
		
		
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