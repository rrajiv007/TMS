/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
                                 
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.TruckDocSum', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Vehicle Document Summary";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;

	    mainpage.toolbarLinks=
		[
			{"name":"Manage Vehicle Document","linkid":"jm_vehicleDoc","tooltip":"Click here to manage vehicle document."}
		]
		
		//Vehicle List Header Section Begins
		plf.columns = 4
		var helpOntruckHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);
		
		var helpOntruckFormCtrl=	
		[
			plf.addText({"label":"Vehicle Code",id:"strTruckCodeFrom","anywhereSearch":"true"}),
			plf.addCombo({"label":"Vehicle Type",id:"strTruckType"}),
			plf.addText({"label":"Vehicle Description",id:"strTruckDesc"}),
			plf.addCombo({"label":"Vehicle Category",id:"strTruckCategory"}),
			
			plf.addCombo({"label":"Vehicle Status",id:"strStatus"}),
			plf.addCombo({"label":"Availability Status",id:"strAvailabilityStatus"}),
		    plf.addText({"label":"Vehicle Regn No",id:"strTruckRegNo"}),
			plf.addText({"label":"Carrier code",id:"strTruckOwnerCode"}),
			plf.addHlpText({"label":"Base Location",id:"strBaseLoc",hlpLinkID:"locationhelp"},this),	
            
			//plf.addBlank(),
            // plf.addBlank(),
		]
		helpOntruckHdrCollapse.add(helpOntruckFormCtrl);
		
		//Vehicle List Header Section Ends
			var parentForm =this;
		var printQRCode=[
						plf.addButton({"label":"Print QR code",id:"btnQRCode",tooltip:"Click here to Print QR code.",
						"handler": function() 
							{
								parentForm.queryById("methodName").setValue("PrintQRCodeVehReport");
								process_ebpack_service(parentForm,["truckList"],"CoreReportService");																										
							}
						})
						];
			
						
						
		
		
		//Vehicle List Grid Section Begins
		var helpOntruckGridFieldObj=	
		[
			{columnname:"Vehicle Code",dataname:"TRUCK_CODE",datatype:"string",width:100,linkId:"vehicleDocMaster","tooltip":"Click here to launch manage vehicle document screen."},
			{columnname:"Vehicle Description",dataname:"TRUCK_DESC",datatype:"string",editControl:"textbox",width:120},
			{columnname:"Vehicle Regn No",dataname:"TRUCK_REG_NO",datatype:"string",width:130},
			{columnname:"Contract No",dataname:"TRUCK_CONTRACT_NO",datatype:"string",width:130},
			{columnname:"Carrier code",dataname:"CARRIER_CODE",datatype:"string",width:120},
			{columnname:"Carrier Name",dataname:"TRUCK_OWNER_CODE",datatype:"string",width:150},
			{columnname:"Vehicle Type",dataname:"TRUCK_TYPE",datatype:"string",width:100},
			{columnname:"Vehicle Category",dataname:"TRUCK_CATEGORY",datatype:"string",width:120},
			{columnname:"Base Location",dataname:"BASE_LOCATION",datatype:"string",width:120},
		  	{columnname:"Make",dataname:"TRUCK_MAKE",datatype:"string",width:100},
			{columnname:"Year Of Manufacture",dataname:"YEAR_OF_MFG",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100},
			{columnname:"Availability Status",dataname:"AVAILABILITY_STATUS",datatype:"string",width:120}			

			
		]
		var helpOntruckGridDtl=		
		{
			title:"Vehicle Details",
			id:"truckList",
			detail:helpOntruckGridFieldObj,
			removeAddDelete:true,
			visibleRow:plf.searchVisibleRows,
			"rowHighlight":true,
			selRowProcess:"Y",
			tool:printQRCode
			//readonly:true,
		}
		var helpGridSection = plf.addGrid(helpOntruckGridDtl,this)
			
		//Vehicle Grid Section Ends
		
		//Add Child Sections
		
		
		mainpage.ptrMainSection.add(helpOntruckHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) 
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreTruckService",
				"methodName":"fetchAllTrucksDetailsTS"
				},
				{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strTruckCodeFrom","strTruckCodeTo","strTruckDesc","strTruckCategory","strStatus","strAvailabilityStatus","strTruckType","strTruckRegNo","strTruckOwnerCode","PHONE_1",
				"strBaseLoc"],
				"service":"CoreTruckService",
				"methodName":"fetchAllTruckDetailsTS"
			}
			/* {       
				"controlid":"btnQRCode",
				"tasktype":"btnclick",
				"input":["truckList"],
              	"service":"CoreReportService",
				"methodName":"PrintQRCodeVehReport"				
			}*/
			
		];
		//Event Handlers Mapping Ends
		
		mainpage.screenLinks=
		{
			"vehicleDocMaster":
				{
					"dest":"jm_master.TruckDocMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"TRUCK_CODE","dest":"strTruckCode"}
							]
				},
				"jm_vehicleDoc":
				{
					"dest":"jm_master.TruckDocMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
			
		}
		
		mainpage.hlpLinks=
		{
		   "locationhelp":
		   {
					"hlpType":"Header",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"LOCATION_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strBaseLoc","child":"LOC_NAME"}
														]

						
				}
		}
		
		//Event Handle
		
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
