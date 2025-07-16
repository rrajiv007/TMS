/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
		                                   
************************************************************************************************/
Ext.define('CueTrans.view.service.TripSheetService', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Trip Sheet for Service";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;		
		
		 mainpage.toolbarLinks=
			[
				{"name":"View Financial Details","linkid":"fin_viewbill","tooltip":"Click here to view financial details."}
			]		
		
			mainpage.toolbarActions= [
			{
                "name": "Create",
                "tooltip": "Click here to create trip."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit trip."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete trip."
            },			
            {
                "name": "Confirm",
                "tooltip": "Click here to confirm trip."
            }
            ]

		
		
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
				plf.addHlpText({"label":"Primary Service ID",id:"strPriServiceId",hlpLinkID:"serviceidhelp","mandatory":"true"},this),
				plf.addDisplayOnly({"label":"Trip Status",id:"strTripStatus"}),				
				plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehCat"}),
				plf.addDateTime({"label":"Req From Date/Time",dateid:"dtReqFromDate",timeid:"tmReqFromTime"}),								
				plf.addCombo({"label":"Amendment No",id:"iAmendmentNo"}),				
				plf.addDate({"label":"Trip Closure Date",id:"dtTripClosDate"}),
				plf.addCombo({"label":"Inspection Required",id:"strVehInsRqd"}),
				plf.addHlpText({"label":"Inspection Location",id:"strRptgLoc",hlpLinkID:"reptlocation"},this),
				plf.addDateTime({"label":"Inspection Date/Time",dateid:"dtRepDate",timeid:"tmRepTime"})				
			]		
		}
		
		else
		{
			var TripSheetHdrCtrl1=
			[	
			    plf.addHlpText({"label":"Trip Sheet No",id:"strTripSheetNo",hlpLinkID:"triphelp"},this),	
				plf.addDate({"label":"Trip Sheet Date",id:"dtTripDate","mandatory":"true"}),
				plf.addHlpText({"label":"Primary Service ID",id:"strPriServiceId",hlpLinkID:"serviceidhelp","mandatory":"true"},this),
				plf.addDisplayOnly({"label":"Trip Status",id:"strTripStatus"}),				
				plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehCat"}),
				plf.addDateTime({"label":"Req From Date/Time",dateid:"dtReqFromDate",timeid:"tmReqFromTime"}),					
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
				plf.addDisplayOnly({"label":"Carrier Name",id:"strCarrierCode"}),
				plf.addDisplayOnly({"label":"Vehicle Code",id:"strVehCode"}),
				plf.addDisplayOnly({"label":"Vehicle Regn No",id:"strVehRegNo"}),
				plf.addDisplayOnly({"label":"Driver Code",id:"strDriverCode"}),
				plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
				//plf.addDisplayOnly({"label":"Driver Phone No",id:"strDriverPhoneNo"}),
				plf.addDisplayOnly({"label":"Origin",id:"strTripStgPt"}),
				plf.addDisplayOnly({"label":"Destination",id:"strTripEnd"}),
				plf.addDisplayOnly({"label":"No-load Distance",id:"strNoLdDist"})
			]


        } 			
		TripSumHdrCol.add(TripSumHdrCtrl)
		
		var btnSearch=[
						plf.addButton({id:"btnLoad",label:"Search Service Instance",tooltip:"Click here to search for unassigned service id.",
							"handler": function() 
							{
								parentForm.launchHlpLink("Service")						
							}}),
						plf.addButton({id:"btnAssign",label:"Assign Service ID",tooltip:"Click here to assign service id to trip.",
							"handler": function() 
							{
								var unmappedStore = Ext.data.StoreManager.lookup('unassignedService_store');
								var mappedStore = Ext.data.StoreManager.lookup('assignedService_store');	
								var cnt=mappedStore.getCount();
								Ext.each(unmappedStore.getRange(), function(record) 
								{									
									if(record.getData().select) 
									{										
										var tmpChk = mappedStore.findRecord('SERVICE_ID', record.get("SERVICE_ID"));
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
						
		var unassignedLoadsTabCol = plf.addColumnSection({title:"Unassigned Service ID"});
		var unassignedLoadsTabObj=
		[   
			{columnname:"Service ID",dataname:"SERVICE_ID",datatype:"string",width:150},
			{columnname:"Service Request No",dataname:"SERVICE_REQUEST_NO",datatype:"string",width:150},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:200},
			{columnname:"Required From Date/Time",dataname:"REQ_FROM_DATE",datatype:"string",width:150},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
			{columnname:"Customer Name",dataname:"CUSTOMER_NAME",datatype:"string",width:200}
		]
		var unassignedLoadsTabDtl=
		{
			title:"",
			id:"unassignedService",
			detail:unassignedLoadsTabObj,
			visibleRow:8,
			removeFilter:false,
			removeExport:false,
			removeAddDelete:true,
			removeTbar:false,
			tool:btnSearch			
		}
		
		
		//Assigned loads Section begins		
		var btnTripDet=[
						/*plf.addButton({"label":"Trip Details",id:"btnTripDet",tooltip:"Click here to fetch trip summary details.",
						"handler": function() 
							{
								parentForm.queryById("methodName").setValue("tripDetailsTS");
								process_ebpack_service(parentForm,["strTripSheetNo","dtTripDate","strPriServiceId","strTripStatus","strVehCat","strCarrierCode",
																   "iAmendmentNo","dtTripClosDate","strVehInsRqd","strRptgLoc","dtRepDate","dtReqFromDate","tmReqFromTime","strTripStgPt","strTripEnd",
																   "tmRepTime","strNoLdDist","strVehCode","strVehRegNo","strDriverCode","strDriverName","assignedService","tripSchedule"],"SERCoreServiceGroupTS");																							
							}
						}),*/
						plf.addButton({id:"btnUnAssign",label:"Unassign Service ID",tooltip:"Click here to unassign service id.",
						"handler": function() 
						{
							var unmappedStore = Ext.data.StoreManager.lookup('unassignedService_store');
							var mappedStore = Ext.data.StoreManager.lookup('assignedService_store');	
												
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
		var assignedLoadsTabCol = plf.addColumnSection({title:"Assigned Service ID"});
		var assignedLoadsTabObj=
		[   
			{columnname:"Service ID",dataname:"SERVICE_ID",datatype:"string",width:150},
			{columnname:"Sequence No",dataname:"SEQ_NO",datatype:"string",width:90,editControl:"textbox","inputFormat":"integer"},
			{columnname:"Service Request No",dataname:"SERVICE_REQUEST_NO",datatype:"string",width:150},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:200},
			{columnname:"Required From Date/Time",dataname:"REQ_FROM_DATE",datatype:"string",width:150},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
			{columnname:"Customer Name",dataname:"CUSTOMER_NAME",datatype:"string",width:200}				
			
		]
		var assignedLoadsTabDtl=
		{
			title:"",
			id:"assignedService",
			detail:assignedLoadsTabObj,
			visibleRow:7,
			removePaging:true,
			removeFilter:true,
			removeExport:true,
			removeTbar:true,
			tool:btnTripDet
			
		}
				
		plf.columns=4
		var TripSheetHdrCol3 = plf.addColumnSection({title:"Trip Summary"});
		/*
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			TripSheetHdrCtrl3=
			[	
				
			]

        } 			
		TripSheetHdrCol3.add(TripSheetHdrCtrl3)
		*/
		//Trip Summary Section begins
		plf.columns=4
		//tripSummaryTabCol = plf.addColumnSection({title:"Trip Schedule"});
		var tripSummaryTabObj=
		[   
			{columnname:"JP Number",dataname:"JP_NO",datatype:"string",width:140},
			{columnname:"JP type",dataname:"JP_TYPE",datatype:"string",width:100},
			{columnname:"Ref Service ID",dataname:"REF_SERVICE_NO",datatype:"string",width:150},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DEST",datatype:"string",width:200},
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
					"hlpScreen":"service.ServiceTripHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTripSheetNo","child":"TRIP_SHEET_NO"}
							]
				},
		"serviceidhelp":
				{
					"hlpType":"Header",
					"hlpScreen":"service.UnassignedServiceHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strPriServiceId","child":"SERVICE_ID"},
							{"parent":"strVehCat","child":"VEHICLE_CATEGORY"}
							]
				},
		"reptlocation":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRptgLoc","child":"LOC_NAME"}
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
				"Service":
				{
					"hlpType":"hdrgrid",
					"gridID":"unassignedLoads",
					"hlpScreen":"service.UnassignedService",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					{"parent":"LOAD_NO","child":"LOAD_NO"}					
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
				"service":"SERCoreServiceGroupTS",
				"methodName":"initTripListTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strTripSheetNo","dtTripDate","strPriServiceId","strTripStatus","strVehCat","strCarrierCode",
						"iAmendmentNo","dtTripClosDate","strVehInsRqd","strRptgLoc","dtRepDate","dtReqFromDate","tmReqFromTime","strTripStgPt","strTripEnd",
						"tmRepTime","strNoLdDist","strVehCode","strVehRegNo","strDriverCode","strDriverName","assignedService","tripSchedule"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"createTripListTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strTripSheetNo","dtTripDate","strPriServiceId","strTripStatus","strVehCat","strCarrierCode",
						"iAmendmentNo","dtTripClosDate","strVehInsRqd","strRptgLoc","dtRepDate","dtReqFromDate","tmReqFromTime","strTripStgPt","strTripEnd",
						"tmRepTime","strNoLdDist","strVehCode","strVehRegNo","strDriverCode","strDriverName","assignedService","tripSchedule"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"editTripListTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strTripSheetNo","dtTripDate","strPriServiceId","strTripStatus","strVehCat","strCarrierCode",
						"iAmendmentNo","dtTripClosDate","strVehInsRqd","strRptgLoc","dtRepDate","dtReqFromDate","tmReqFromTime","strTripStgPt","strTripEnd",
						"tmRepTime","strNoLdDist","strVehCode","strVehRegNo","strDriverCode","strDriverName","assignedService","tripSchedule"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"deleteTriplistTS"
			},
			{
				"controlid":"strTripSheetNo",
				"tasktype":"onenter",
				"input":["strTripSheetNo"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"fetchTripSheetTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Amend",
				"input":["strTripSheetNo","dtTripDate","strPriServiceId","strTripStatus","strVehCat","strCarrierCode",
						"iAmendmentNo","dtTripClosDate","strVehInsRqd","strRptgLoc","dtRepDate","dtReqFromDate","tmReqFromTime","strTripStgPt","strTripEnd",
						"tmRepTime","strNoLdDist","strVehCode","strVehRegNo","strDriverCode","strDriverName","assignedService","tripSchedule"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"amendTripSheetTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["strTripSheetNo","dtTripDate","strPriServiceId","strTripStatus","strVehCat","strCarrierCode",
						"iAmendmentNo","dtTripClosDate","strVehInsRqd","strRptgLoc","dtRepDate","dtReqFromDate","tmReqFromTime","strTripStgPt","strTripEnd",
						"tmRepTime","strNoLdDist","strVehCode","strVehRegNo","strDriverCode","strDriverName","assignedService","tripSchedule"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"confirmTripSheetTS"
			},
			{
					"controlid":"iAmendmentNo",
					"tasktype":"onchange",
					"input":["iAmendmentNo","strTripSheetNo"],
					"service":"SERCoreServiceGroupTS",
					"methodName":"onChangeAmNoTS"
			},
			{       
				"controlid":"TripSummaryBtn",
				"tasktype":"btnclick",
				"input":["tripSchedule","strPriServiceId","assignedService"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"tripDetailsTS"
			},
			{
				"controlid":"strPriServiceId",
				"tasktype":"onenter",
				"input":["strPriServiceId"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"fetchPriLoadTS"
			}
		]	
		
		this.callParent(arguments);
		
	}
	
});
