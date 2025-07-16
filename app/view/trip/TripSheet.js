/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		 Steffie       04/02/2016      69613                 Trip short close  
************************************************************************************************/
Ext.define('CueTrans.view.trip.TripSheet', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Trip Sheet for Load";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		
		 mainpage.toolbarLinks=
		[
			{"name":"View Financial Details","linkid":"fin_viewbill","tooltip":"Click here to view financial details."}
		]
		
		
			mainpage.toolbarActions= [
			{
                "name": "Create",
                "tooltip": "Click here to create a trip."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a trip."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a trip."
            }/*,
            {
                "name": "Amend",
                "tooltip": "Click here to amend a trip."
            }*/,			
            {
                "name": "Confirm",
                "tooltip": "Click here to confirm a trip."
            },
			//69613 changes
			{
                "name": "Short Close",
                "tooltip": "Click here to shortclose a trip."
            }
	     /*,
	     	
            {
                "name": "Vehicle Release",
                "tooltip": "Click here to release vehicle."
            }*/
            ]

		
		//Add Keyfields
		//mainpage.keyFields=["strRequestNo"]
		
		
		plf.columns=4
		var TripSheetHdrColumn1 = plf.addColumnSection({});
		var parentForm =this;
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var TripSheetHdrCtrl1=
			[	
			    plf.addHlpText({"label":"Trip Sheet No",id:"strTripSheetNo",hlpLinkID:"triphelp"},this),	
				plf.addDate({"label":"Trip Sheet Date",id:"dtTripDate","mandatory":"true"}),
				plf.addHlpText({"label":"Primary Load",id:"strPriLoad",hlpLinkID:"loadnohelp","mandatory":"true"},this),
				plf.addDisplayOnly({"label":"Trip Status",id:"strTripStatus"}),
				
				plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehCat"}),
				plf.addDateTime({"label":"Departure Date/Time",dateid:"dtDepDate",timeid:"tmDepTime"}),
				plf.addDisplayOnly({"label":"Carrier Code",id:"strCarrierCode"}),				
				plf.addCombo({"label":"Amendment No",id:"iAmendmentNo"}),
				
				plf.addDate({"label":"Trip Closure Date",id:"dtTripClosDate"}),
				plf.addCombo({"label":"Inspection Required",id:"strVehInsRqd"}),
				plf.addHlpText({"label":"Inspection Location",id:"strRptgLoc",hlpLinkID:"reptlocation"},this),
				plf.addDateTime({"label":"Inspection Date/Time",dateid:"dtRepDate",timeid:"tmRepTime"}),
				
			]
		
		}
		
		else
		{
			var TripSheetHdrCtrl1=
			[	
			   plf.addHlpText({"label":"Trip Sheet No",id:"strTripSheetNo",hlpLinkID:"triphelp"},this),	
				plf.addDate({"label":"Trip Sheet Date",id:"dtTripDate","mandatory":"true"}),
				plf.addHlpText({"label":"Primary Load",id:"strPriLoad",hlpLinkID:"loadnohelp","mandatory":"true"},this),
				plf.addDisplayOnly({"label":"Trip Status",id:"strTripStatus"}),
				
				plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehCat"}),
				plf.addDateTime({"label":"Departure Date/Time",dateid:"dtDepDate",timeid:"tmDepTime"}),
				plf.addHlpText({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"carrierNoHelp"}),				
				plf.addCombo({"label":"Amendment No",id:"iAmendmentNo"}),
				
				plf.addDate({"label":"Trip Closure Date",id:"dtTripClosDate"}),
				plf.addCombo({"label":"Inspection Required",id:"strVehInsRqd"}),
				plf.addHlpText({"label":"Inspection Location",id:"strRptgLoc",hlpLinkID:"reptlocation"},this),
				plf.addDateTime({"label":"Inspection Date/Time",dateid:"dtRepDate",timeid:"tmRepTime"})
				
				
			]
		}	
		
		plf.columns=4
		var TripSumHdrCol = plf.addColumnSection({title:""});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			var TripSumHdrCtrl=
			[	
				plf.addDisplayOnly({"label":"Origin",id:"strTripStgPt"}),
				plf.addDisplayOnly({"label":"Destination",id:"strTripEnd"}),
				plf.addDisplayOnly({"label":"Load Distance",id:"strLoadDist"}),
				plf.addDisplayOnly({"label":"No-load Distance",id:"strNoLdDist"}),
				plf.addHidden({"label":"Driver Code",id:"strDriverCode"}),
				plf.addHidden({"label":"Vehicle Code",id:"strVehCode"}),
				
			]


        } 			
		TripSumHdrCol.add(TripSumHdrCtrl)
		
		var btnSearch=[
						plf.addButton({id:"btnLoad",label:"Search Loads",tooltip:"Click here to search for unassigned loads.",
							"handler": function() 
							{
								parentForm.launchHlpLink("Load")						
							}}),
						plf.addButton({id:"btnAssign",label:"Assign Loads",tooltip:"Click here to assign loads to a trip.",
							"handler": function() 
							{
								var unmappedStore = Ext.data.StoreManager.lookup('unassignedLoads_store');
								var mappedStore = Ext.data.StoreManager.lookup('assignedLoads_store');	
								var cnt=mappedStore.getCount();
								Ext.each(unmappedStore.getRange(), function(record) 
								{									
									if(record.getData().select) 
									{										
										var tmpChk = mappedStore.findRecord('LOAD_NO', record.get("LOAD_NO"));
										if (tmpChk ==null)
										{
										record.set('select',false);										
										record.commit();
										mappedStore.add(record.copy());										
										unmappedStore.remove(record);										
										}
										else
										{
										unmappedStore.remove(record);
										}
									}
								})
								
								var items = mappedStore.data.items;
								/*suspend events to block firing the events on setting record values
								then resume and refresh the view
								*/							
								for (var i = 0; i < items.length; i++)
								{	
									var record = mappedStore.getAt(i);
									record.set("SEQ_NO", i+1);									
								}								
								mappedStore.reload();	
															
							}
							})
						];	
						
		var unassignedLoadsTabCol = plf.addColumnSection({title:"Unassigned Loads"});
		var unassignedLoadsTabObj=
		[   
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:150},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:200},
			{columnname:"Departure Date",dataname:"DEP_DATE",datatype:"string",width:100},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:200},
			{columnname:"Weight (ton)",dataname:"WEIGHT",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Volume (cu.m)",dataname:"VOLUME",width:120,colAlign:'right',volumePrecision:3}
		]
		var unassignedLoadsTabDtl=
		{
			title:"Unassigned Loads",
			id:"unassignedLoads",
			detail:unassignedLoadsTabObj,
			visibleRow:7,
			/*removeFilter:true,
			removeExport:true,
			removeTbar:true,*/
			removeAddDelete:true,
			tool:btnSearch
	
/*			readonly:true,
			removeAddDelete:true,
			removeExport:true,
			removePaging:true*/
			
		}
		
		
		//Assigned loads Section begins		
		var btnTripDet=[
						plf.addButton({"label":"Trip Details",id:"btnTripDet",tooltip:"Click here to fetch trip summary details.",
						"handler": function() 
							{
								parentForm.queryById("methodName").setValue("tripDetailsTS");
								process_ebpack_service(parentForm,["tripSchedule","strPriLoad","assignedLoads",
								"strTripSheetNo","dtTripDate","strPriLoad","strTripStatus", "strVehCat","dtDepDate",
								"tmDepTime", "dtTripClosDate","strVehInsRqd","strRptgLoc","dtRepDate","tmRepTime","strTotDist",
								"strLoadDist","strNoLdDist","strTripEff","strCarrierCode","strVehCode","strbaseLoc",
								"strDriverCode","strDriverName","iAmendmentNo","strTripStgPt","strTripEnd"],"TRPLISTCoreTripListTS");																							
							}
						}),
						plf.addButton({id:"btnUnAssign",label:"Unassign Loads",tooltip:"Click here to unassign loads.",
						"handler": function() 
						{
							var unmappedStore = Ext.data.StoreManager.lookup('unassignedLoads_store');
							var mappedStore = Ext.data.StoreManager.lookup('assignedLoads_store');						
							Ext.each(mappedStore.getRange(), function(record) 
							{									
								if(record.getData().select) 
								{														
									record.set('select',false);									
									record.commit();										
									unmappedStore.add(record.copy());
									mappedStore.remove(record);	
									
								}
								
							})
						}
						})
		];
		
		plf.columns=4
		var assignedLoadsTabCol = plf.addColumnSection({title:"Assigned Loads"});
		var assignedLoadsTabObj=
		[   
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",editControl:"textbox",width:140,helpid:'loadhelp'},
			{columnname:"Sequence No",dataname:"SEQ_NO",datatype:"string",width:90,editControl:"textbox","inputFormat":"integer"},
			{columnname:"Departure Date",dataname:"DEP_DATE",datatype:"string",width:100},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:200},
			{columnname:"Weight (ton)",dataname:"WEIGHT",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Volume (cu.m)",dataname:"VOLUME",width:120,colAlign:'right',volumePrecision:3}
			
			
			
		]
		var assignedLoadsTabDtl=
		{
			title:"",
			id:"assignedLoads",
			detail:assignedLoadsTabObj,
			visibleRow:7,
			removePaging:true,
		/*	removeFilter:true,
			removeExport:true,
			removeTbar:true			*/
			removeAddDelete:true,
			tool:btnTripDet
/*			readonly:true,
			removeAddDelete:true,
			removeExport:true,
			removePaging:true*/
			
		}
		
		/*
		plf.columns=3
		TripSheetHdrCol2 = plf.addColumnSection({title:""});
		TripSheetHdrCtrl2=
			[	
			    plf.addBlank(),
				plf.addButton({"label":"Update Trip Details",id:"TripSummaryBtn","tooltip": "Click here to populate trip details."}),
				plf.addBlank()
			]	
	    TripSheetHdrCol2.add(TripSheetHdrCtrl2)
		*/
		plf.columns=4
		var TripSheetHdrCol3 = plf.addColumnSection({title:"Trip Summary"});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			TripSheetHdrCtrl3=
			[	
				//plf.addDisplayOnly({"label":"Origin",id:"strTripStgPt"}),
				//plf.addDisplayOnly({"label":"Destination",id:"strTripEnd"}),
				//plf.addDisplayOnly({"label":"Load Distance",id:"strLoadDist"}),
				//plf.addDisplayOnly({"label":"No-load Distance",id:"strNoLdDist"}),
				
				plf.addDisplayOnly({"label":"Total Distance",id:"strTotDist"}),
				plf.addDisplayOnly({"label":"Trip Efficiency",id:"strTripEff"}),
				//plf.addDisplayOnly({"label":"Vehicle Code",id:"strVehCode"}),
				plf.addDisplayOnly({"label":"Vehicle Regn No",id:"strVehRegNo"}),
				
				//plf.addDisplayOnly({"label":"Base Location",id:"strbaseLoc"}),
				//plf.addDisplayOnly({"label":"Driver Code",id:"strDriverCode"}),
				plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
				//plf.addBlank({}),
				
			
				
			]


        } 			
		TripSheetHdrCol3.add(TripSheetHdrCtrl3)
		
		//Trip Summary Section begins
		plf.columns=4
		//tripSummaryTabCol = plf.addColumnSection({title:"Trip Schedule"});
		var tripSummaryTabObj=
		[   
			{columnname:"JP Number",dataname:"JP_NO",datatype:"string",width:140},
			{columnname:"JP type",dataname:"JP_TYPE",datatype:"string",width:100},
			{columnname:"Ref load No",dataname:"REF_LOAD_NO",datatype:"string",width:150},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DEST",datatype:"string",width:200},
			{columnname:"Route Code",dataname:"ROUTE_CODE",datatype:"string",width:150},
			{columnname:"Distance",dataname:"DISTANCE",datatype:"string",width:140},
			{columnname:"Start Time",dataname:"START_TIME",datatype:"string",width:140},
			{columnname:"End Time",dataname:"END_TIME",datatype:"string",width:140}
		]
		var tripSummaryTabDtl=
		{
			title:"",
			id:"tripSchedule",
			detail:tripSummaryTabObj,
			visibleRows:7,
			readonly:true,
			removeAddDelete:true,
			removeExport:true,
			removePaging:true
			
		}
		
		
		
		tripScheduleTabSection = plf.addGrid(tripSummaryTabDtl)
		TripSheetHdrCol3.add(tripScheduleTabSection);
		
		//TripSheetHdrCol3.add(chargemapGridSection);
		
		assignedLoadsTabSection = plf.addGrid(assignedLoadsTabDtl,this)
		assignedLoadsTabCol.add(assignedLoadsTabSection);
		
		unassignedLoadsTabSection = plf.addGrid(unassignedLoadsTabDtl,this)
		unassignedLoadsTabCol.add(unassignedLoadsTabSection);
		
		//tripsummaryHdrTabCol.add(TripSheetHdrCol3);
		
		var baseTab = plf.addTabSection({ tabs:[unassignedLoadsTabCol,assignedLoadsTabCol,TripSheetHdrCol3]});
		
		TripSheetHdrColumn1.add(TripSheetHdrCtrl1)
		mainpage.ptrMainSection.add(TripSheetHdrColumn1)	
		mainpage.ptrMainSection.add(TripSumHdrCol)			
		//mainpage.ptrMainSection.add(TripSheetHdrCol3)	
		//mainpage.ptrMainSection.add(TripSheetHdrCol2)
		mainpage.ptrMainSection.add(baseTab)				
		//mainpage.ptrMainSection.add(TripSheetHdrCol3)	
		
		mainpage.hlpLinks=
		{
		
		"triphelp":
				{
					"hlpType":"Header",
					"hlpScreen":"trip.TripHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTripSheetNo","child":"TRIP_SHEET_NO"}
							]
				},
		"loadnohelp":
				{
					"hlpType":"Header",
					"hlpScreen":"trip.UnassignedLoads",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strPriLoad","child":"LOAD_NO"},
							{"parent":"strVehCat","child":"VEHICLE_CATEGORY"}
							]
				},
		"reptlocation":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"LOCATION_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strRptgLoc","child":"LOC_NAME"}
							]
				},
		"carrierNoHelp":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"CARRIER_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strCarrierCode","child":"OWNER_CODE_3PL"}
							]
				},
		"loadhelp":
				{
					"hlpType":"grid",	
					"gridID":"assignedLoads",
					"hlpScreen":"trip.UnassignedLoads",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
								{"parent":"LOAD_NO","child":"LOAD_NO"},					
								{"parent":"ORIGIN","child":"ORIGIN"},
								{"parent":"DESTINATION","child":"DESTINATION"},
								{"parent":"COMMODITY","child":"COMMODITY"}
								]
				},
				"Load":
				{
					"hlpType":"hdrgrid",
					"gridID":"unassignedLoads",
					"hlpScreen":"trip.UnassignedLoadsHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					{"parent":"LOAD_NO","child":"LOAD_NO"}
					/*,					
					{"parent":"ORIGIN","child":"ORIGIN"},
					{"parent":"DESTINATION","child":"DESTINATION"},
					{"parent":"COMMODITY","child":"COMMODITY"},
					{"parent":"WEIGHT","child":"WEIGHT"},
					{"parent":"VOLUME","child":"VOLUME"}
					*/
					]
				}
	
		}	
		
		mainpage.screenLinks=
		{
		
			"fin_viewbill":
				{
					"dest":"finance.TripFinanceDetails",
					"hdr":[
							{"src":"strTripSheetNo","dest":"strTripSheetNo"}
							],
					"grid":[
							{"src":"","dest":""}							
							]
				}
		
		}
		
		mainpage.dataHistorySectionFlag=true;
		
		mainpage.eventHandlers = 
		[
			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strTripSheetNo"],
				"service":"TRPLISTCoreTripListTS",
				"methodName":"initTripListTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strTripSheetNo","dtTripDate","strPriLoad","strTripStatus","strVehCat","dtDepDate",
						"tmDepTime","iAmendmentNo","dtTripClosDate","strVehInsRqd","strRptgLoc","dtRepDate",
						"tmRepTime","strTripStgPt","strTripEnd","strTotDist","strLoadDist","strNoLdDist","strTripEff",
                        "strCarrierCode","iAmt","strVehCode","strbaseLoc","strDriverCode","strDriverName","assignedLoads","tripSchedule"],
				"service":"TRPLISTCoreTripListTS",
				"methodName":"createTripListTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strTripSheetNo","dtTripDate","strPriLoad","strTripStatus","strVehCat","dtDepDate",
						"tmDepTime","iAmendmentNo","dtTripClosDate","strVehInsRqd","strRptgLoc","dtRepDate",
						"tmRepTime","strTripStgPt","strTripEnd","strTotDist","strLoadDist","strNoLdDist","strTripEff",
                        "strCarrierCode","iAmt","strVehCode","strbaseLoc","strDriverCode","strDriverName","assignedLoads","tripSchedule"],
				"service":"TRPLISTCoreTripListTS",
				"methodName":"editTripListTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strTripSheetNo","dtTripDate","strPriLoad","strTripStatus","strVehCat","dtDepDate",
						"tmDepTime","iAmendmentNo","dtTripClosDate","strVehInsRqd","strRptgLoc","dtRepDate",
						"tmRepTime","strTripStgPt","strTripEnd","strTotDist","strLoadDist","strNoLdDist","strTripEff",
                        "strCarrierCode","iAmt","strVehCode","strbaseLoc","strDriverCode","strDriverName","assignedLoads","tripSchedule"],
				"service":"TRPLISTCoreTripListTS",
				"methodName":"deleteTriplistTS"
			},
			{
				"controlid":"strTripSheetNo",
				"tasktype":"onenter",
				"input":["strTripSheetNo"],
				"service":"TRPLISTCoreTripListTS",
				"methodName":"fetchTripSheetTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Amend",
				"input":["strTripSheetNo","dtTripDate","strPriLoad","strTripStatus","strVehCat","dtDepDate",
						"tmDepTime","iAmendmentNo","dtTripClosDate","strVehInsRqd","strRptgLoc","dtRepDate",
						"tmRepTime","strTripStgPt","strTripEnd","strTotDist","strLoadDist","strNoLdDist","strTripEff",
                        "strCarrierCode","iAmt","strVehCode","strbaseLoc","strDriverCode","strDriverName","assignedLoads","tripSchedule"],
				"service":"TRPLISTCoreTripListTS",
				"methodName":"amendTripSheetTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["strTripSheetNo","dtTripDate","strPriLoad","strTripStatus","strVehCat","dtDepDate",
						"tmDepTime","iAmendmentNo","dtTripClosDate","strVehInsRqd","strRptgLoc","dtRepDate",
						"tmRepTime","strTripStgPt","strTripEnd","strTotDist","strLoadDist","strNoLdDist","strTripEff",
                        "strCarrierCode","iAmt","strVehCode","strbaseLoc","strDriverCode","strDriverName","assignedLoads","tripSchedule"],
				"service":"TRPLISTCoreTripListTS",
				"methodName":"confirmTripSheetTS"
			},
			//69613 changes
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Short Close",
				"input":["strTripSheetNo","dtTripDate","strPriLoad","strTripStatus","strVehCat","dtDepDate",
						"tmDepTime","iAmendmentNo","dtTripClosDate","strVehInsRqd","strRptgLoc","dtRepDate",
						"tmRepTime","strTripStgPt","strTripEnd","strTotDist","strLoadDist","strNoLdDist","strTripEff",
                        "strCarrierCode","iAmt","strVehCode","strbaseLoc","strDriverCode","strDriverName","assignedLoads","tripSchedule"],
				"service":"TRPLISTCoreTripListTS",
				"methodName":"shortcloseTripSheetTS"
			},
			{
					"controlid":"iAmendmentNo",
					"tasktype":"onchange",
					"input":["iAmendmentNo","strTripSheetNo"],
					"service":"TRPLISTCoreTripListTS",
					"methodName":"onChangeAmNoTS"
			},
			{       
				"controlid":"TripSummaryBtn",
				"tasktype":"btnclick",
				"input":["tripSchedule","strPriLoad","assignedLoads"],
				"service":"TRPLISTCoreTripListTS",
				"methodName":"tripDetailsTS"
			},
			{
					"controlid":"strCarrierCode",
					"tasktype":"onenter",
					"input":["strCarrierCode"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"fetchCarrierCodeTS"
			},
			{
				"controlid":"strPriLoad",
				"tasktype":"onenter",
				"input":["strPriLoad"],
				"service":"TRPLISTCoreTripListTS",
				"methodName":"fetchPriLoadTS"
			}
		]	
		
		this.callParent(arguments);
		
	}
	
});
