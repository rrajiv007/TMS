/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			           Remarks             
************************************************************************************************	
1.0.0	     Raj		    10/06/2018                          OTO Vehicles  		                                   
************************************************************************************************/
Ext.define('CueTrans.view.Report.OTOVehicles', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
        var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "OTO Vehicles";
		
		
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		
		mainpage.toolbarLinks=
		[
		]
	
		var ReportsColumn = plf.addColumnSection({});	
		
		var ReportsFormCtrl=							
		[
			plf.addText({"label":"Vehicle Code",id:"strVehicleCodeFrom"}),
			plf.addText({"label":"Contract No",id:"strContractNo"}),
			plf.addCombo({"label":"Vehicle Type","id":"strVehicleType"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory"}), 
			plf.addText({"label":"IVMS Box ID",id:"strDocNo"})
			
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=3
		var ReportsButtonColumn = plf.addColumnSection({});		
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Get Details","id":"GetDetails"}),
		  plf.addBlank()		
		]	
		
		// Grid section Begins

		OTOVehiclesgrid=
		[   
			{columnname:"Vehicle Code",dataname:"VEHICLE_CODE",datatype:"string",width:"auto"},	
			{columnname:"Vehicle Reg No",dataname:"VEHICLE_REG_NO",datatype:"string",width:"auto"},
		    {columnname:"Vehicle Description",dataname:"VEHICLE_DESC",datatype:"string",width:"auto"},	
			{columnname:"Vehicle Status",dataname:"VEHICLE_STATUS",datatype:"string",width:"auto"},					
			{columnname:"Vehicle Type",dataname:"VEHICLE_TYPE",datatype:"string",width:"auto"},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:"auto"},
			{columnname:"Vehicle Make",dataname:"VEHICLE_MAKE",datatype:"string",width:"auto"},
			{columnname:"No of axles(rear)",dataname:"NO_AXLES_REAR",datatype:"string",width:"auto",colAlign:'center'},
			{columnname:"No of axles(front)",dataname:"NO_AXLES_front",datatype:"string",width:"auto",colAlign:'center'},
			{columnname:"Year of Manufacture",dataname:"YEAR_MANUFACTURE",datatype:"string",width:"auto"},
			{columnname:"Trailer Code",dataname:"TRAILER_CODE",datatype:"string",width:"auto"},			
			{columnname:"Vehicle Availability",dataname:"VEHICLE_AVAILABE",datatype:"string",width:"auto"},	
			{columnname:"Carrier Code",dataname:"CARRIER_CODE",datatype:"string",width:"auto"},			
			{columnname:"Base Location",dataname:"BASE_LOCATION",datatype:"string",width:"auto"},
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:"auto"},
			{columnname:"Contract Holder Name",dataname:"CONTRACT_HOLDER_NM",datatype:"string",width:"auto"},
			{columnname:"Contact No",dataname:"CONTACT_NO",datatype:"string",width:"auto"},			
			{columnname:"IVMS Box ID",dataname:"IVMS_BOX_ID",datatype:"string",width:"auto"},
			{columnname:"DFMS ID",dataname:"DFMS_ID",datatype:"string",width:"auto"},
			{columnname:"Mulkiya Expiry",dataname:"MULKIYA_EXP_PM",datatype:"string",width:"auto"},
            {columnname:"Insurance Expiry",dataname:"INSURANCE_EXP_PM",datatype:"string",width:"auto"},
            {columnname:"RAS Expiry",dataname:"RAS_EXP_PM",datatype:"string",width:"auto"},
			{columnname:"Riyada Card Expiry",dataname:"RIYADA_EXP_PM",datatype:"string",width:"auto"},
			{columnname:"TATI Inspection Expiry",dataname:"TATI_INSP_EX",datatype:"string",width:"auto"},
            {columnname:"Service Location 1",dataname:"SERVICE_LOC_1",datatype:"string",width:"auto"},	
			{columnname:"Service Location 2",dataname:"SERVICE_LOC_2",datatype:"string",width:"auto"},	   
			{columnname:"Service Location 3",dataname:"SERVICE_LOC_3",datatype:"string",width:"auto"},	
			{columnname:"Service Location 4",dataname:"SERVICE_LOC_4",datatype:"string",width:"auto"},	
			{columnname:"Service Location 5",dataname:"SERVICE_LOC_5",datatype:"string",width:"auto"}			
		]
		OTOVehiclesdetails=
		{
			title:"OTO Vehicles Details",
			id:"OTOVehicles",
			detail:OTOVehiclesgrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		OTOVehiclesGridSection = plf.addGrid(OTOVehiclesdetails,this)

		// Grid section Ends
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(OTOVehiclesGridSection)	
		
		
		
		mainpage.eventHandlers = 
		[	
         
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreReportService",
				"methodName":"initOTOVehicelsRpt"
			},
			{
				"controlid":"GetDetails",
				"tasktype":"btnclick",
				"input":["strVehicleCodeFrom","strContractNo","strVehicleType","strStatus","strVehicleCategory","strDocNo",
				        "strDocNo"],
				"service":"CoreReportService",
				"methodName":"getOTOVehicelsRpt"
			}
			// Grid section Ends

			
		];
		
		mainpage.screenLinks=	
		{	
				
		}
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
