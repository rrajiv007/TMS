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
Ext.define('CueTrans.view.jm_master.TrailerHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.hlpSectionFlag=true; 
		mainpage.startPainting();
		mainpage.screenName = "Trailer Help";
	
		plf.columns=3
		var helpOntruckHdrCollapse = plf.addColumnSection({title:"", collapsed: true});				//69995
		
		var helpOntruckFormCtrl=							
		[
			plf.addText({"label":"Vehicle Code",id:"strTruckCodeFrom"}),			
			plf.addText({"label":"Vehicle Description",id:"strTruckDesc"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),			
			plf.addCombo({"label":"Vehicle Category",id:"strTruckCategory"}),		
			plf.addCombo({"label":"Availability Status",id:"strAvailabilityStatus"}),
		    plf.addText({"label":"Vehicle Registration No",id:"strTruckRegNo"}),
			plf.addText({"label":"Base Location",id:"strBaseLoc"}),
			plf.addText({"label":"Carrier Code",id:"strTruckOwnerCode"}),            			
			plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."})	
		    
		]
		helpOntruckHdrCollapse.add(helpOntruckFormCtrl);
		
		//Vehicle List Header Section Ends
		
		//Vehicle List Grid Section Begins
		var helpOntruckGridFieldObj=								
		[
			{columnname:"Vehicle Code",dataname:"TRUCK_CODE",datatype:"string",width:100},
			{columnname:"Vehicle Description",dataname:"TRUCK_DESC",datatype:"string",width:120},
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
			title:"",
			id:"truckList",
			detail:helpOntruckGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
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
				"methodName":"initTrailerDetailsTS"
				},
				{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strTruckCodeFrom","strTruckDesc","strTruckCategory","strStatus",
				"strAvailabilityStatus","strBaseLoc","strTruckRegNo","strTruckOwnerCode"],
				"service":"CoreTruckService",
				"methodName":"fetchAllTrailerTS"
			}
			
		];
		//Event Handlers Mapping Ends
		
		
		this.callParent(arguments);
		
	}
});
