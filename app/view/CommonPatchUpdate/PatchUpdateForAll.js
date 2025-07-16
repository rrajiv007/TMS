/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	Patch  Update                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.5															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.CommonPatchUpdate.PatchUpdateForAll', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Common Patch Update";
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
		]	
		
		
		
		//Truck Master Section starts

		//reports button section
		var parentForm=mainpage;
		plf.columns=4
			
		var LoadRelatedButtonColumn = plf.addColumnSection({title:"Load Planning"});	
		ReportsFormCtrl=
		[
		 
		 /*plf.addButton({id:"Load_Origin_Change",label:"Load Origin Change",tooltip:"Click here to change load origin.",    
							"handler": function() 
							{
								parentForm.launchHlpLink("Origin_Change")						
							}
                                           })  ,
		 plf.addButton({id:"Load_Destination_Change",label:"Load Destination Change",tooltip:"Click here to change load destination.",    
							"handler": function() 
							{
								parentForm.launchHlpLink("Destination_Change")						
							}
                                           })  ,*/
		plf.addButton({id:"Load_Origin_Dest_Change",label:"Load Origin & Destination Change",tooltip:"Click here to change load origin and destination.", 
        width:210,		
							"handler": function() 
							{
								parentForm.launchHlpLink("Origin_Dest_Change")						
							}
                                           }),
        plf.addButton({id:"Load_Description_change",label:"Load Description Change",tooltip:"Click here to change load description.",  width:170,    
							"handler": function() 
							{
								parentForm.launchHlpLink("Description_Change")						
							}
                                           })  ,
        plf.addButton({id:"Load_Loading_Unloading",label:"Loading & Unloading Point Change",tooltip:"Click here to change loading & unloading Point.",    
		width:215,					
							"handler": function() 
							{
								parentForm.launchHlpLink("Loading_Unloading")						
							}
                                           })  ,										   
		
		plf.addButton({id:"Load_Departure_Date_Change",label:"Load Departure Date Change",tooltip:"Click here to change load departure Date and time.",   
        width:190,		
							"handler": function() 
							{
								parentForm.launchHlpLink("Departure_Date")						
							}
                                           })  , 
        plf.addButton({id:"Load_Contractual_Delivery_Date",label:"Load Contractual Delivery Date",tooltip:"Click here to change load contractual delivery date.",   
		width:210,
							"handler": function() 
							{
								parentForm.launchHlpLink("Contractual_Delivery")						
							}
                                           }),
       /* plf.addButton({id:"Scheduled_Vehicle_Change",label:"Scheduled Vehicle Change",tooltip:"Click here to change scheduled vehicle.",    
							"handler": function() 
							{
								parentForm.launchHlpLink("Scheduled_Vehicle")						
							}
                                           }), 
        plf.addButton({id:"Reporting_Vehicle_Change",label:"Reporting Vehicle Change",tooltip:"Click here to change reporting vehicle.",    
							"handler": function() 
							{
								parentForm.launchHlpLink("Reporting_Vehicle")						
							}
                                           }), 
        plf.addButton({id:"Scheduled_Driver_Change",label:"Scheduled Driver Change",tooltip:"Click here to change scheduled driver.",    
							"handler": function() 
							{
								parentForm.launchHlpLink("Scheduled_Driver")						
							}
                                           }), 
        plf.addButton({id:"Reporting_Driver_Change",label:"Reporting Driver Change",tooltip:"Click here to change reporting driver.",    
							"handler": function() 
							{
								parentForm.launchHlpLink("Reporting_Driver")						
							}
                                           }), 
        plf.addButton({id:"Reverse_Last_Load_Status",label:"Reverse Last Load Status",tooltip:"Click here to reverse last load status.",    
							"handler": function() 
							{
								parentForm.launchHlpLink("Reverse_Load_Status")						
							}
                                           }), */
        plf.addButton({id:"vehicle_category_change",label:"Vehicle Category Change",tooltip:"Click here to change vehicle category.",  width:170,   
							"handler": function() 
							{
								parentForm.launchHlpLink("vehicle_category")						
							}
                                           }),
        plf.addButton({id:"Load_Shortclosed",label:"Load Short Closed",tooltip:"Click here for short closed confirm load and corresponding shipments/requests.", 
		width:215,
							"handler": function() 
							{
								parentForm.launchHlpLink("Load_SC")						
							}
                                           }),
        plf.addButton({id:"Update_Load_Actual_Weight",label:"Update Load Actual Weight",tooltip:"Click here to update load actual weight.",   width:190,
							"handler": function() 
							{
								parentForm.launchHlpLink("Load_Actual_Weight")						
							}
                                           })/*,	
        plf.addButton({id:"Change_Load_Close_Date",label:"Change Load Close Date",tooltip:"Click here to change load close date.",    
							"handler": function() 
							{
								parentForm.launchHlpLink("Load_Close_Date")						
							}
                                           })	*/									   
		]
		LoadRelatedButtonColumn.add(ReportsFormCtrl)
		LoadRelatedButtonColumn.add(plf.addStripLine({}));
		
		plf.columns=4
			
		var ShipmentRelatedButtonColumn = plf.addColumnSection({title:"Shipment Planning"});	
		ShipFormCtrl=
		[
		 plf.addBlank({}),
		 /*
		 plf.addButton({id:"Delete_Shipments",label:"Delete Shipments",tooltip:"Click here to delete shipments.",    
		 width:158,
							"handler": function() 
							{
								parentForm.launchHlpLink("Del_Shipments")						
							}
                                           }), 
		 */
         plf.addButton({id:"Shipment_Pick_up",label:"Shipment Pickup Date",tooltip:"Click here to change shipment pickup date.",    
		 width:170, 
							"handler": function() 
							{
								parentForm.launchHlpLink("Pick_up")						
							}
                                           }),
		plf.addBlank({}),
		plf.addBlank({})
		]
		ShipmentRelatedButtonColumn.add(ShipFormCtrl)
		ShipmentRelatedButtonColumn.add(plf.addStripLine({}));
		
		plf.columns=4
			
		var JourneyRelatedButtonColumn = plf.addColumnSection({title:"Journey Plan"});	
		JPFormCtrl=
		[
		 plf.addBlank({}),
		 plf.addButton({id:"Update_JP_Distance",label:"Update JP Distance",tooltip:"Click here to update JP distance.",   
		 width:170,
							"handler": function() 
							{
								parentForm.launchHlpLink("JP_Distance_Upd")						
							}
                                           }),
		 plf.addButton({id:"Reverse_JP_Status",label:"Reverse JP Status",tooltip:"Click here to reverse JP status.",   
		 width:215,
							"handler": function() 
							{
								parentForm.launchHlpLink("Reverse_JP")						
							}
                                           })/*,
		 plf.addBlank({}),
		 plf.addBlank({})
										   , 
         plf.addButton({id:"Update_JP_Closed_Date",label:"Update JP Closed Date",tooltip:"Click here to update JP closed date.",    
							"handler": function() 
							{
								parentForm.launchHlpLink("JP_Closed_Date")						
							}
                                           })		*/								   
		]
		JourneyRelatedButtonColumn.add(JPFormCtrl)
		JourneyRelatedButtonColumn.add(plf.addStripLine({}));
		//
		var tripsheetRelatedButtonColumn = plf.addColumnSection({title:"Trip Related Patch "});	
		tripFormCtrl=
		[
		 
		 plf.addButton({id:"deattach_load_from_trip",label:"Deattach Load form Existing Trip",tooltip:"Click here to deattach the load for existing trip sheet.",    
							"handler": function() 
							{
								parentForm.launchHlpLink("deattach_load")						
							}
                                           })									   
		]
		tripsheetRelatedButtonColumn.add(tripFormCtrl)
		tripsheetRelatedButtonColumn.add(plf.addStripLine({}));
		
		
		
		
		
		
		
		mainpage.ptrMainSection.add(LoadRelatedButtonColumn)
		//mainpage.ptrMainSection.add(ShipmentRelatedButtonColumn)
		mainpage.ptrMainSection.add(JourneyRelatedButtonColumn)
		//mainpage.ptrMainSection.add(tripsheetRelatedButtonColumn)
		
		//History Data Section
		//mainpage.dataHistorySectionFlag=false;
		
		
		
		mainpage.eventHandlers = 
			[	
				/*{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"TMSCoreTransportTS",
					"methodName":"initLoadBasedSearchTS"
				}*/
			];
			
		mainpage.hlpLinks=
		{	
			   "Origin_Change":
			{
				"hlpType":"Header",
				"hlpScreen":"CommonPatchUpdate.AmendAllocationReport",
				"send":[
						{"parent":"","child":""}
						],
				"receive":[
						{"parent":"","child":""}
						]
			} ,
			   "Description_Change":
			{
				"hlpType":"Header",
				"hlpScreen":"CommonPatchUpdate.UpdateLoadDescription",
				"send":[
						{"parent":"","child":""}
						],
				"receive":[
						{"parent":"","child":""}
						]
			} ,
				"Departure_Date":
			{
				"hlpType":"Header",
				"hlpScreen":"CommonPatchUpdate.LoadDepartureDateChange",
				"send":[
						{"parent":"","child":""}
						],
				"receive":[
						{"parent":"","child":""}
						]
			} ,
			 "vehicle_category":
			 {
				"hlpType":"Header",
				"hlpScreen":"CommonPatchUpdate.VehicleCategoryChange",
				"send":[
						{"parent":"","child":""}
						],
				"receive":[
						{"parent":"","child":""}
						]
			},
			"Loading_Unloading":
			{
				"hlpType":"Header",
				"hlpScreen":"CommonPatchUpdate.LoadingUnloadingChange",
				"send":[
						{"parent":"","child":""}
						],
				"receive":[
						{"parent":"","child":""}
						]
			},
			"Origin_Dest_Change":
			{
				"hlpType":"Header",
				"hlpScreen":"CommonPatchUpdate.OriginDestinationChange",
				"send":[
						{"parent":"","child":""}
						],
				"receive":[
						{"parent":"","child":""}
						]
			},
			"Contractual_Delivery":
			{
				"hlpType":"Header",
				"hlpScreen":"CommonPatchUpdate.ContraDelDateTime",
				"send":[
						{"parent":"","child":""}
						],
				"receive":[
						{"parent":"","child":""}
						]
			},
			"Load_Actual_Weight":
			{
				"hlpType":"Header",
				"hlpScreen":"CommonPatchUpdate.LoadActualWeight",
				"send":[
						{"parent":"","child":""}
						],
				"receive":[
						{"parent":"","child":""}
						]
			},
			"Load_SC":
			{
				"hlpType":"Header",
				"hlpScreen":"CommonPatchUpdate.ShortClosedLd",
				"send":[
						{"parent":"","child":""}
						],
				"receive":[
						{"parent":"","child":""}
						]
			},
			"Del_Shipments":
			{
				"hlpType":"Header",
				"hlpScreen":"CommonPatchUpdate.DeleteShipments",
				"send":[
						{"parent":"","child":""}
						],
				"receive":[
						{"parent":"","child":""}
						]
			},
			"Pick_up":
			{
				"hlpType":"Header",
				"hlpScreen":"CommonPatchUpdate.shipPickupDTChange",
				"send":[
						{"parent":"","child":""}
						],
				"receive":[
						{"parent":"","child":""}
						]
			},
			"Reverse_JP":
			{
				"hlpType":"Header",
				"hlpScreen":"CommonPatchUpdate.JPStatusChange",
				"send":[
						{"parent":"","child":""}
						],
				"receive":[
						{"parent":"","child":""}
						]
			},
			"JP_Distance_Upd":
			{
				"hlpType":"Header",
				"hlpScreen":"CommonPatchUpdate.JPDistanceUpdate",
				"send":[
						{"parent":"","child":""}
						],
				"receive":[
						{"parent":"","child":""}
						]
			}
         }			
		
		mainpage.screenLinks=
		   {

		    }
		this.callParent(arguments);
		
	
	}
});
