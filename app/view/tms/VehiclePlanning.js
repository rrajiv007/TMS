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
Ext.define('CueTrans.view.tms.VehiclePlanning', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Vehicle Demand Planning";
		mainpage.toolbarSectionFlag=true;	
		mainpage.toolbarActions= [{
                "name": "Confirm Load",
                "tooltip": "Click here to confirm load."
            }
		     ]
	//	mainpage.toolbarActions=["Confirm Load"]

        plf.columns=4
		var VehicleDemandHdr = plf.addColumnSection({}); 
		var VehicleDemandHdrFormCtrl=
		[
			plf.addDate({"label":"Load Date",id:"dtLoadDate","mandatory":"true"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addCombo({"label":"Priority",id:"strPriority"}),
			plf.addCombo({"label":"Vehicle Type",id:"strVehCategoryGroup"}),
			//plf.addCombo({"label":"Region",id:"strRegion"}),
			//plf.addText({"label":"Load Time",id:"tmLoadTime","mandatory":"true"}),
			
			//plf.addCombo({"label":"Demand Status",id:"strDemandStatus"})
			
			plf.addCombo({"label":"Commodity",id:"strCommodity"}),	
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addButton({"label":"Plan Vehicles",id:"PlanVehicle",tooltip:"Click here to plan a vehicle."}),	
			plf.addHidden({"label":"",id:"strHdnGuid"})
		]	
		VehicleDemandHdr.add(VehicleDemandHdrFormCtrl); 
		
		/*Available Vehicles starts here*/
		var VehDemandAvaliablityGridFieldObj=
		[
		{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",storeId:"strVehicleCategory",editControl:"combo",width:200},
		//{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:250},
		{columnname:"Number Of<br>Vehicles",dataname:"NO_OF_VEHICLES",datatype:"string",width:113,editControl:"textbox"}
		]
		
		var VehDemandAvaliablityGridDtl=
		{
			title:"Available Vehicles",
			id:"VehDemandAvailablity",
			detail:VehDemandAvaliablityGridFieldObj,
			readOnly:true,	
			visibleRow:5,		
			columnWidth:.3,
			removeFilter:true,
			removeAddDelete:true,
			removeColumns:true,
			removePaging:true,
			removeTbar:true
		}
		var AvailablityGridSection = plf.addGrid(VehDemandAvaliablityGridDtl,this)
		/*Available Vehicles ends here*/	
		
		/*Search Grid Section starts here*/
		var VehDemandGridFieldsearchObj=
		[			
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:135},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:135},
			{columnname:"Route",dataname:"ROUTE_CODE",datatype:"string",width:150},	
			{columnname:"Customer Name",dataname:"CUST_NAME",datatype:"string",width:150},	
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:147},
			{columnname:"Weight(ton)",dataname:"TOT_WEIGHT",datatype:"string",width:100}
		]
		var VehDemandGridSearchDtl=
		{
			title:"Consolidated Shipment Details",
			id:"VehDemandSearch",
			detail:VehDemandGridFieldsearchObj,
			readOnly:true,
			visibleRow:7,
			columnWidth:.7,
			removeFilter:true,
			removeFilter:true,
			removeAddDelete:true,
			removeTbar:true,
			removePaging:true,
			removeColumns:true
		   }

		var GridSearchSection = plf.addGrid(VehDemandGridSearchDtl,this)

		var tmpSection =  plf.addColumnSection({title:""})
		//tmpSection.add(VehDemandHdr)
		tmpSection.add(plf.addSplitter)
		tmpSection.add(AvailablityGridSection)
		tmpSection.add(plf.addSplitter)
		tmpSection.add(GridSearchSection)
		
		
		
		/*Search Grid Section Ends here*/		
		
		/*Suggested Loads Grid Section starts here*/
		var VehDemandGridFieldSuggestedLoadObj=
		[			
			{columnname:"Plan Line No",dataname:"PLANLINENO",datatype:"string",width:200,hidden:true},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:200},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
			//{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
			{columnname:"Route",dataname:"ROUTE_CODE",datatype:"string",width:150},	
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:160},			
			{columnname:"Number of<br> Vehicles",dataname:"NOOFVEHICLES",datatype:"string",width:100,linkId:"loadlink"},	
			{columnname:"Under Utilized<br>Vehicles",dataname:"UTILVEHICLES",datatype:"string",width:130}			
		]
		VehDemandGridSuggestedLoadDtl=
		{
			title:"Suggested Loads",
			id:"VehDemandSuggestedLoad",
			detail:VehDemandGridFieldSuggestedLoadObj,
			columnWidth:.5,
			readOnly:true,
			removeFilter:true			
		   }
		var GridSuggestedLoadSection = plf.addGrid(VehDemandGridSuggestedLoadDtl,this)
		/*Suggested Loads Grid Section Ends here*/
		
		/*
		var tmpSection_shipments =  plf.addColumnSection({title:""})
		tmpSection_shipments.add(GridSearchSection)
		tmpSection_shipments.add(plf.addSplitter)
		tmpSection_shipments.add(GridSuggestedLoadSection)
		*/
		
		/*Plan Vehicles btn starts here*/
		/*
		plf.columns=3;
		VehDemandHdrPlanVehbtn = plf.addColumnSection({}); 
		VehDemandHdrPlanVehbtnCtrl=
		[
			plf.addBlank(),				
			plf.addButton({"label":"Plan Vehicles",id:"planVehicleBtn"})
		]	
		VehDemandHdrPlanVehbtn.add(VehDemandHdrPlanVehbtnCtrl); 
		*/
		/*Plan Vehicles btn ends here*/
		
		
		
		/*Confirm Load btn starts here*/
		/*
		plf.columns=3;
		VehDemandHdrConfirmLoadbtn = plf.addColumnSection({}); 
		VehDemandHdrConfirmLoadbtnCtrl=
		[
			plf.addBlank(),				
			plf.addButton({"label":"Confirm Load",id:"ConfirmLoadBtn"})
		]	
		VehDemandHdrConfirmLoadbtn.add(VehDemandHdrConfirmLoadbtnCtrl); 
		*/
		/*Confirm Load btn ends here*/
		
		//Add Child Sections
		mainpage.ptrMainSection.add(VehicleDemandHdr)
		mainpage.ptrMainSection.add(tmpSection)
		//mainpage.ptrMainSection.add(AvailablityGridSection)
		//mainpage.ptrMainSection.add(VehDemandHdrPendingShipments)
		//mainpage.ptrMainSection.add(GridSearchSection)
		//mainpage.ptrMainSection.add(VehDemandHdrPlanVehbtn)
		mainpage.ptrMainSection.add(GridSuggestedLoadSection) 
		//mainpage.ptrMainSection.add(VehDemandHdrConfirmLoadbtn) 
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		  {
				    "controlid":"",
				    "tasktype":"onload",
				    "input":[""],
				    "service":"TMSCoreTransportTS",
				    "methodName":"initVehicleDemandPlanningTS"
	      },
		  {					
					"controlid":"PlanVehicle",
					"tasktype":"btnclick",
					"input":["strOrigin","strDestination","strDemandStatus","strPriority","strCommodity","strHdnGuid","strRouteCode"],
					"service":"TMSCoreTransportTS",
					"methodName":"getGetailsVehDemandplanning"
		},		
		{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm Load",
				"input":["strOrigin","strDestination","strDemandStatus","strPriority","strCommodity","strHdnGuid","dtLoadDate","tmLoadTime"],
				"service":"TMSCoreTransportTS",
				"methodName":"createAutoGenLoadBasedTS"
			},
		];
		mainpage.screenLinks=
		{
			"loadlink":
				{
					"dest":"tms.LoadPlanView",
					"hdr":[
							{"src":"strHdnGuid","dest":"strHdnGuid"}							
							],
					"grid":[
							{"src":"PLANLINENO","dest":"strPlanLineNo"},
							{"src":"ROUTE_CODE","dest":"strRouteCode"},
							{"src":"ORIGIN","dest":"strOrigin"},
							{"src":"DESTINATION","dest":"strDestination"},
							{"src":"VEHICLE_CATEGORY","dest":"strVehicleCategory"}
							]
				}
		}	
		this.callParent(arguments);
		
	}
});
