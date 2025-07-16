/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	                           Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.DriverHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true; //HelpChanges		
		mainpage.startPainting();
		mainpage.screenName = "Driver Help"; //HelpChanges
		//Driver Search Section Begins
		plf.columns=3
		var helpOndriverHdrCollapse = plf.addColumnSection({title:"", collapsed: true}); 	//HelpChanges		//69995
	 	var helpOndriverFormCtrl=																				//69995
		[
			plf.addText({"label":"Driver Code From",id:"strDriverCodeFrom","anywhereSearch":"true"}),
			plf.addText({"label":"Driver Code To",id:"strDriverCodeTo","anywhereSearch":"true"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Driver Name",id:"strDriverName"}),
			plf.addText({"label":"Carrier Name",id:"str3plOwnerName"}),
			plf.addCombo({"label":"Driver Type",id:"strDriverType"}),
			//plf.addCombo({"label":"Licence Type",id:"strLicenceType"}),
			plf.addCombo({"label":"Availability Status",id:"strAvailabilityStatus"}),
			plf.addHidden({"label":"Context",id:"strContext"}),
			plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."})
		]
		
		helpOndriverHdrCollapse.add(helpOndriverFormCtrl);
		//Driver Search Section Ends
		
		//Driver Grid Section Begins
		var helpOndriverGridFieldObj=			//69995
		[
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:100},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:200},
			{columnname:"Driver Phone No",dataname:"PHONE_NO",datatype:"string",width:150},
			{columnname:"Driver Type",dataname:"DRIVER_TYPE",datatype:"string",storeId:"driveType",width:100},
			//{columnname:"Licence Type",dataname:"LICENCE_TYPE",datatype:"string",storeId:"licenseType",width:100},
			{columnname:"Carrier Name",dataname:"OWNER_NAME_3PL",datatype:"string",width:150},
			//{columnname:"3PL Owner Phone No",dataname:"PHONE_1",datatype:"string",width:150},
			//{columnname:"Nationality Id",dataname:"NATIONALITY_ID",datatype:"string",width:100},
			//{columnname:"IVMS Blue Key No",dataname:"IVMS_BLUEKEYID",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",storeId:"status",width:100},
			{columnname:"Availability Status",dataname:"AVAILABILITY_STATUS",datatype:"string",storeId:"availabilitystatus",width:130},
		]
		var helpOndriverGridDtl=			//69995
		{
			title:"Driver Details",
			id:"driverSearch",
	       detail:helpOndriverGridFieldObj,
		    visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true

		   }
		var helpGridSection = plf.addGrid(helpOndriverGridDtl,this)		//69995
		mainpage.hlpSearchGridPtr = helpGridSection //HelpChanges
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
				"input":["strContext"],
				"service":"CoreDriveService",
				"methodName":"initDriverSearchScrTS"
			},	
			{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strDriverCodeFrom","strDriverCodeTo","strDriverName","str3plOwnerName","strDriverType","strLicenceType","strStatus",
						 "strAvailabilityStatus"],
			    "service":"CoreDriveService",
				"methodName":"fetchAllDriverDetailsTS"
			},
			{
				
					"tasktype":"proto",
					"filename":"jm_master/DriverHelp.json"
			}			
		];
		
		//HelpChanges
		/*
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
				}
		}
		*/
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
