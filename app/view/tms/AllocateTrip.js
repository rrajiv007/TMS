/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
 1.0.1      P.shekar        18/07/2016    73364              Loading Point, Unload Point  and Load description 
 1.0.2         divya         4/08/2016    73742    	
 1.0.3         Shekar       17/11/2016    74583
 1.0.4         Shekar       17/11/2016    74582           
************************************************************************************************/
Ext.define('CueTrans.view.tms.AllocateTrip', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Allocate Trip";
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [
			{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Load Refusal",
                "tooltip": "Click here to refuse load."
            },
			{
                "name": "Allocate Trip",
                "tooltip": "Click here to allocate trip."
            },
			{
                "name": "Print Diversion Letter",
                "tooltip": "Click here to allocate trip."
            }
            ]		
		plf.columns = 3
		var parentForm =this;
		var AllocTripHdrColumn = plf.addColumnSection({title:"Load Details"});
		if(plf.defaultLayout==4)
		{
			plf.columns = 4			
			var AllocTripHdrCtrl=
				[  				
				plf.addDisplayOnly({"label":"Load No",id:"strLoadNo"}),				
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
				plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehCat"}),				
				plf.addDisplayOnly({"label":"Departure Date",id:"dtDepDtFrom"}),
                plf.addDisplayOnly({"label":"Loading Point",id:"strLoadAt"}), // 73364
				plf.addDisplayOnly({"label":"Unloading Point",id:"strDelvAt"}),// 73364
				plf.addDisplayOnly({"label":"Load description",id:"strLoadDesc"}),// 73364	
				plf.addDisplayOnly({"label":"Journey Plan No",id:"strJpNo"})
				]
		}
		
		else
		{    
			var AllocTripHdrCtrl=
				[  				
				plf.addDisplayOnly({"label":"Load No",id:"strLoadNo"}),				
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
				plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehCat"}),				
				plf.addDisplayOnly({"label":"Departure Date From",id:"dtDepDtFrom"}),
                plf.addDisplayOnly({"label":"Loading Point",id:"strLoadAt"}), // 73364
				plf.addDisplayOnly({"label":"Unloading Point",id:"strDelvAt"}),// 73364
				plf.addDisplayOnly({"label":"Load description",id:"strLoadDesc"}),// 73364	
				plf.addDisplayOnly({"label":"Journey Plan No",id:"strJpNo"})				
				]
			
		}	
		AllocTripHdrColumn.add(AllocTripHdrCtrl)
		
		TripLnkRenderFn =  function(val,metaData,record)
		{
			var radioHTML;
			radioHTML=""
			console.log(val,record.getId(),record.data,"val");
			/*Ext.getCmp('ResetLabel').on('click',function(){

				alert("message");
			});*/
			return val;
		}
	
		var AllocTripgridObj=
		[   			
			
			
			{columnname:"Trip Sheet No",dataname:"TRIP_NO",datatype:"string",width:150,gridClick:"strTripNo",MethodName:"VSCHAllocateTripMLCLICK",service:"VEHSCHCoreVehSchServiceTS"},
			{columnname:"Trip Sheet date",dataname:"TRIP_DATE",datatype:"string",width:120},
			{columnname:"Reported Vehicle",dataname:"REP_VEHICLE",datatype:"string",width:120},
			{columnname:"Scheduled Vehicle",dataname:"SCH_VEHICLE",datatype:"string",width:150},
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:120/*,linkId:"Contract_No"*/},
			
			{columnname:"Latest Load",dataname:"LATEST_LOAD",datatype:"string",width:100},
			{columnname:"Latest Journey",dataname:"LATEST_JOURNEY",datatype:"string",width:100},
			{columnname:"Departure Date",dataname:"DEPT_DATE",datatype:"string",width:120},
			{columnname:"From Location",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"To Location",dataname:"DESTINATION",datatype:"string",width:150},
			
			{columnname:"Vehicle Regn No",dataname:"VEH_REG_NO",datatype:"string",width:150,hidden:true},			
			{columnname:"Departure Date",dataname:"DEPARTURE_DATE",datatype:"string",width:150,hidden:true},
		//  {columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
		//	{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
			{columnname:"Carrier Code",dataname:"OWNER_CODE_3PL",datatype:"string",width:150,hidden:true},
			{columnname:"Carrier Type",dataname:"OWNER_CODE_TYPE",datatype:"string",width:150,hidden:true},
			{columnname:"Expected Arrival Date And Time",dataname:"PLANNED_ARRIVAL_DATE_TIME",datatype:"string",width:150,hidden:true},
			{columnname:"Backloads Performed",dataname:"BACKLOADS_PER",datatype:"string",width:150,linkId:"Bcackload_Per",tooltip:"Click here to launch the Backload And Diversion Details Screen."},
			{columnname:"Diversions Performed",dataname:"DIVERSIONS_PER",datatype:"string",width:150,linkId:"Diversions_Per",tooltip:"Click here to launch the Backload And Diversion Details Screen."}
			 //{columnname:"From Location",dataname:"LOAD_AT",datatype:"string",width:150},
			//{columnname:"To Location",dataname:"DELIVERY_AT",datatype:"string",width:150},  // 74583 End  
			
		]
		
		
											
		
		var btnSearch=[
						plf.addButton({id:"btnTrip",label:"Search Trips",tooltip:"Click here to search trips.",
							"handler": function() 
							{
								parentForm.launchHlpLink("Trips")						
							}})
						];
		var AllocTripdGridDtl=
		{
			title:"Existing Trips",
			id:"AllocTripgrid",
			detail:AllocTripgridObj,
			visibleRow:10,
			removeAddDelete:true,
			/*removeFilter:true,
			removeExport:true,			
			removeTbar:true,*/
			tool:btnSearch,
			readonly:true
	   }
		var existtripSection = plf.addGrid(AllocTripdGridDtl,this)
		plf.columns=4
		var AllVehSelectedTripHdrCol = plf.addColumnSection({title:"Selected Trip"});
		var AllVehSelectedTripHdrCtrl=
		[				
			/*plf.addHlpText({"label":"Trip No",id:"strTripNo",hlpLinkID:"tripno"},this),	
			plf.addHlpText({"label":"Vehicle Code",id:"strVehCode",hlpLinkID:"vehiclecode"},this),*/
			
		    plf.addDisplayOnly({"label":"Trip Sheet No",id:"strTripNo"}),
            plf.addDisplayOnly({"label":"Trip Sheet Date",id:"dtTripSheet"}),	
            plf.addDisplayOnly({"label":"Reported Vehicle",id:"strRepVehicleCode"}),	
			plf.addDisplayOnly({"label":"Scheduled Vehicle",id:"strSchVehCode"}),
			plf.addDisplayOnly({"label":"Contract No",id:"strContactNo"}),
			plf.addDisplayOnly({"label":"Backloads Performed",id:"strBackLoad"}),
			plf.addDisplayOnly({"label":"Diversions Performed",id:"strDiveLoad"}),
			plf.addDisplayOnly({"label":"Contractor Name",id:"strContractName"}),
			plf.addDisplayOnly({"label":"Contractor Phone",id:"strContractPhone"}),
			plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
			plf.addDisplayOnly({"label":"Driver Phone",id:"strDriverNo"}),
			plf.addText({"label":"Refusal Reason",id:"strReasonRefusal"}),
			
			plf.addHidden({"label":"Vehicle Code",id:"strVehCode"}), 
            plf.addHidden({"label":"Carrier Name",id:"strCarrierName"}),	
			plf.addHidden({"label":"Carrier Phone No",id:"strCarPhNo"}),
			plf.addHidden({"label":"Vehicle Regn No",id:"strVehRegNo"}),
			plf.addHidden({"label":"Base Location",id:"strBaseLoc"})
			
		]
		
		
		
		AllVehSelectedTripHdrCol.add(AllVehSelectedTripHdrCtrl);
		
		
		mainpage.ptrMainSection.add(AllocTripHdrColumn) 
		mainpage.ptrMainSection.add(existtripSection) 
		mainpage.ptrMainSection.add(AllVehSelectedTripHdrCol) 
		
		
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strLoadNo","strOrigin","strDestination","strVehCat","dtDepDtFrom"],
				"service":"VEHSCHCoreVehSchServiceTS",
				"methodName":"initVSCHAllocateTripTS"
			},
			{
					"controlid":"strTripNo",
					"tasktype":"onenter",
					"input":["strTripNo","strVehCat","dtDepDtFrom"],
					"service":"VEHSCHCoreVehSchServiceTS",
					"methodName":"onenterAllocTripTS"
			},
			{
					"controlid":"strVehCode",
					"tasktype":"onenter",
					"input":["strVehCode","strVehCat","dtDepDtFrom"],
					"service":"VEHSCHCoreVehSchServiceTS",
					"methodName":"onenterAllocVehicleCodeTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Refuse Load",
				"input":["strVehCode","strTripNo","strLoadNo","strReasonRefusal","strVehCat","dtDepDtFrom"],
				"service":"VEHSCHCoreVehSchServiceTS",
				"methodName":"RefuseLoadAllocTripTs"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Allocate Trip",
				"input":["strVehCode","strTripNo","strLoadNo","strVehCat","dtDepDtFrom"],
				"service":"VEHSCHCoreVehSchServiceTS",
				"methodName":"AllocateTripToTripTs"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print Diversion Letter",
				"input":["strTripNo","strLoadNo"],
				"service":"CoreReportService",
				"methodName":"PrintDiversionReport"
			}	
				
		]
		mainpage.hlpLinks=
		{		
		"Trips":
				{
					"hlpType":"hdrgrid",
					"gridID":"AllocTripgrid",
					"hlpScreen":"trip.UnassignedTripHelp",
					"send":[
							{"parent":"dtDepDtFrom","child":"dtDepDtFrom"},
							{"parent":"strVehCat","child":"strVehCat"}							
						   ],
					"receive":[
					{"parent":"TRIP_NO","child":"TRIP_NO"},					
					{"parent":"TRIP_DATE","child":"TRIP_DATE"},
					{"parent":"VEH_REG_NO","child":"VEH_REG_NO"},
					{"parent":"DEPARTURE_DATE","child":"DEPARTURE_DATE"},
					{"parent":"ORIGIN","child":"ORIGIN"},
					{"parent":"DESTINATION","child":"DESTINATION"},
					{"parent":"OWNER_CODE_3PL","child":"OWNER_CODE_3PL"},
					{"parent":"OWNER_CODE_TYPE","child":"OWNER_CODE_TYPE"}
					]
				},
		"tripno":
				{
					"hlpType":"Header",
					"hlpScreen":"trip.AllocateTripHelp",
					"send":[
							{"parent":"strTripNo","child":"strTripSheetNoFrom"},						
							{"parent":"strVehCat","child":"strVehCat"},
							{"parent":"dtDepDtFrom","child":"dtDepDtFrom"}
							],
					"receive":[
							{"parent":"strTripNo","child":"TRIP_SHEET_NO"}
							]
				},
		"vehiclecode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}							
							],
					"receive":[
							{"parent":"strVehCode","child":"TRUCK_CODE"},
							{"parent":"strCarrierName","child":"TRUCK_OWNER_CODE"}
							]
				}
		}
		// 74582  Starts 
		mainpage.screenLinks=
		{		// 74582  Starts 
				"Bcackload_Per":
				{
					"dest":"tms.BackloadDiversionDtl",
					"hdr":[
							{"src":"","dest":""}
							],
					"grid":[
							{"src":"CONTRACT_NO","dest":"strConTractNo"}
						
							]
				},
				"Diversions_Per":
				{
					"dest":"tms.BackloadDiversionDtl",
					"hdr":[
							{"src":"","dest":""}
							],
					"grid":[
							{"src":"CONTRACT_NO","dest":"strConTractNo"}
						
							]
				}   // 74582  End  
				
		}
	
		this.callParent(arguments);
		
	}
});
