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
Ext.define('CueTrans.view.jm_master.TruckDocHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.hlpSectionFlag=true; 
		mainpage.startPainting();
		mainpage.screenName = "Vehicle Documnet Help";
	
		plf.columns=3
		var helpOntruckHdrCollapse = plf.addColumnSection({title:"", collapsed: true});				//69995
		
		var helpOntruckFormCtrl=							//69995
		[
			//plf.addCombo({"label":"AdvancedSearch","id":"advanceSearch"}),
			
			
			plf.addText({"label":"Vehicle Code",id:"strTruckCodeFrom"}),
			//plf.addText({"label":"Vehicle Code To",id:"strTruckCodeTo","anywhereSearch":"true"}),
			plf.addCombo({"label":"Vehicle Type",id:"strTruckType"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Vehicle Description",id:"strTruckDesc"}),
			plf.addCombo({"label":"Vehicle Category",id:"strTruckCategory"}),
		
			plf.addCombo({"label":"Availability Status",id:"strAvailabilityStatus"}),
		    plf.addText({"label":"Vehicle Registration No",id:"strTruckRegNo"}),
			plf.addText({"label":"Base Location",id:"strBaseLoc"}),
			plf.addText({"label":"Carrier Code",id:"strTruckOwnerCode"}),
            plf.addHidden({"label":"Context",id:"strContext"}),			
			plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."})
			
		    
		]
		helpOntruckHdrCollapse.add(helpOntruckFormCtrl);
		
		//Vehicle List Header Section Ends
		
		//Vehicle List Grid Section Begins
		var helpOntruckGridFieldObj=								//69995
		[
			{columnname:"Vehicle Code",dataname:"TRUCK_CODE",datatype:"string",width:100},
			{columnname:"Vehicle Description",dataname:"TRUCK_DESC",datatype:"string",editControl:"textbox",width:120},
			{columnname:"Vehicle Regn No",dataname:"TRUCK_REG_NO",datatype:"string",width:130},
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
			{columnname:"Availability Status",dataname:"AVAILABILITY_STATUS",datatype:"string",width:120}
			//{columnname:"3PL Phone No",dataname:"PHONE_1",datatype:"string",width:150}
			
		]
		var helpOntruckGridDtl=				//69995
		{
			title:"",
			id:"truckList",
			detail:helpOntruckGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			//removeTbar:true,
			removePaging:true
		}
		var helpGridSection = plf.addGrid(helpOntruckGridDtl,this)					//69995
		mainpage.hlpSearchGridPtr = helpGridSection	
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
				"input":["strContext"],
				"service":"CoreTruckService",
				"methodName":"fetchAllTrucksDetailsTS"
				},
				{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strTruckCodeFrom","strTruckDesc","strTruckCategory","strStatus",
				"strAvailabilityStatus","strTruckType","strBaseLoc","strTruckRegNo","strTruckOwnerCode"],
				"service":"CoreTruckService",
				"methodName":"fetchAllTruckDetailsTS"
			}
			
		];
		//Event Handlers Mapping Ends
		
		mainpage.screenLinks=
		{
			"truckmaster":
				{
					"dest":"jm_master.TruckMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"TRUCK_CODE","dest":"strTruckCode"}
							]
				},
				"Create":
				{
					"dest":"jm_master.TruckMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
			"ReportBuildercode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTruckCodeFrom","child":"TRUCK_CODE"}
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
							{"parent":"","child":""}
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
