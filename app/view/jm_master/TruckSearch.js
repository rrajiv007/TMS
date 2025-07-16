/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	   69995	                           Added var for all local variable		 
1.0.2       Divya           29/12/2016     75263     						Added QR Code Report                                  
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.TruckSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Vehicle Summary";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
	//	mainpage.toolbarActions=["Refresh","Create","Edit","Delete","Activate","Inactivate"]
	    mainpage.toolbarLinks=
		[
			{"name":"Create Vehicle","linkid":"jm_vehiclemst","tooltip":"Click here to create a vehicle."},
			{"name":"Vehicle Category Parameters","linkid":"jm_vehiclecategoryparam","tooltip":"Click here to create vehicle category parameter."}
		]
		
		//Vehicle List Header Section Begins
		plf.columns = 4
		var helpOntruckHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);			//69995
		
		var helpOntruckFormCtrl=		//69995
		[
			plf.addText({"label":"Vehicle Code",id:"strTruckCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Vehicle Code To",id:"strTruckCodeTo","anywhereSearch":"true"}),
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
           	 //plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."})
		]
		helpOntruckHdrCollapse.add(helpOntruckFormCtrl);
		
		//Vehicle List Header Section Ends
		/* 75263 added by divya*/
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
						
			/* 75263 */				
						
						
		
		
		//Vehicle List Grid Section Begins
		var helpOntruckGridFieldObj=				//69995
		[
			{columnname:"Vehicle Code",dataname:"TRUCK_CODE",datatype:"string",width:100,linkId:"vehiclemaster","tooltip":"Click here to launch the vehicle screen."},
			{columnname:"Vehicle Description",dataname:"TRUCK_DESC",datatype:"string",editControl:"textbox",width:120},
			{columnname:"Vehicle Regn<br>No",dataname:"TRUCK_REG_NO",datatype:"string",width:130},
			{columnname:"Contract No",dataname:"TRUCK_CONTRACT_NO",datatype:"string",width:130},
			{columnname:"Carrier code",dataname:"CARRIER_CODE",datatype:"string",width:120},
			{columnname:"Carrier Name",dataname:"TRUCK_OWNER_CODE",datatype:"string",width:150},
			{columnname:"Vehicle Type",dataname:"TRUCK_TYPE",datatype:"string",width:100},
		//	{columnname:"Vehicle Sub Type",dataname:"TRUCK_SUBTYPE",datatype:"string",width:50},
			{columnname:"Vehicle Category",dataname:"TRUCK_CATEGORY",datatype:"string",width:120},
			{columnname:"Base Location",dataname:"BASE_LOCATION",datatype:"string",width:120},
		  	{columnname:"Make",dataname:"TRUCK_MAKE",datatype:"string",width:100},
			{columnname:"Year Of Manufacture",dataname:"YEAR_OF_MFG",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100},
			//{columnname:"Availability Status",dataname:"AVAILABILITY_STATUS",datatype:"string",width:120,"mandatory":"false"}			
			//{columnname:"3PL Phone No",dataname:"PHONE_1",datatype:"string",width:150}
                     

		//	{columnname:"3PL Phone No",dataname:"PHONE_1",datatype:"string",width:150}
			
		]
		var helpOntruckGridDtl=			//69995
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
		var helpGridSection = plf.addGrid(helpOntruckGridDtl,this)		//69995
			
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
			"vehiclemaster":
				{
					"dest":"jm_master.TruckMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"TRUCK_CODE","dest":"strTruckCode"}
							]
				},
				"jm_vehiclemst":
				{
					"dest":"jm_master.TruckMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"jm_vehiclecategoryparam":
				{
					"dest":"jm_master.VehicleCategoryParameter",
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
