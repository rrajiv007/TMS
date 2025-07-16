/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var	                                   
************************************************************************************************/
Ext.define('CueTrans.view.tms.VehicleDemandPlanning', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Vehicle Demand Planning";
		//Vehicle Demand Planning Search Section Begins
		plf.columns=3
		var helpOnVehDemandHdrCollapse = plf.addCollapseSection({title:"Search Criteria", collapsed:false}); 
        mainpage.toolbarSectionFlag=true;	
			mainpage.toolbarLinks=
		[
			{"name":"Vehicle Availability","linkid":"tms_vehicleavaliability"}
		]		
		
	 var helpOnVehDemandFormCtrl=
		[
			plf.addDate({"label":"Date",id:"dtRequestDate"}),
			plf.addCombo({"label":"Priority",id:"strPriority"}),
			plf.addCombo({"label":"Demand Status",id:"strDemandStatus"}),
			
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory"}),
			
			plf.addButton({"label":"Get Details",id:"searchBtn"}),
			plf.addButton({"label":"Get Availability",id:"AvlBtn"}),
			plf.addBlank(),
		]
		
		helpOnVehDemandHdrCollapse.add(helpOnVehDemandFormCtrl);
		//Driver Search Section Ends
		
		//Driver Grid Section Begins
		var helpOnVehDemandGridFieldObj=
		[
			{columnname:"Request Date",dataname:"TARNS_REQ_DATE",datatype:"string",width:100},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:200},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
			{columnname:"Customer Name",dataname:"CUST_NAME",datatype:"string",width:150},
			{columnname:"Total Weight(ton)",dataname:"TOT_WEIGHT",datatype:"string",width:160},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:160},
			{columnname:"Number Of Vehicles",dataname:"NO_OF_VEHICLES",datatype:"string",width:160}
		]
		helpOnVehDemandGridDtl=
		{
			title:"",
			id:"VehDemand",
			detail:helpOnVehDemandGridFieldObj,
			readOnly:true,
			removeAddDelete: true
		   }
		var helpGridSection = plf.addGrid(helpOnVehDemandGridDtl,this)
		//Driver Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnVehDemandHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		  {
				    "controlid":"",
				    "tasktype":"onload",
				    "input":[""],
				    "service":"TMSCoreTransportTS",
				    "methodName":"initVehicleDemandPlanTS"
	      },
		  {					
					"controlid":"searchBtn",
					"tasktype":"btnclick",
					"input":["strPriority","strOrigin","strDestination","strDemandStatus","dtRequestDate","strVehicleCategory","stRDemandStatus"],
					"service":"TMSCoreTransportTS",
					"methodName":"getGetailsVehDemandTS"
		}				
		
			
		];
			mainpage.screenLinks=
		{
			"tms_vehicleavaliability":
				{
					"dest":"tms.VehicleAvailability",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":"="}
							]
				},
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
