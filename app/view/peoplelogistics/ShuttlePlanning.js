/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	                           Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.peoplelogistics.ShuttlePlanning', 

{ 
extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Shuttle Planning";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;
		mainpage.toolbarLinks=
		[
		];
		
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			/*{
                "name": "Create",
                "tooltip": "Click here to create shuttle plan."
            },*/
			{
                "name": "Edit",
                "tooltip": "Click here to edit shuttle plan."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete shuttle plan."
            },
            {
                "name": "Confirm",
                "tooltip": "Click here to confirm shuttle plan."
            }
            ]
		//ShuttleBuilding Section  Section Begins
		plf.columns=4
		var ShuttlePlanningColumn = plf.addColumnSection({"title":""});
		var ShuttlePlanningAddnColumn = plf.addColumnSection({"title":""});
		if(plf.defaultLayout==3)
		{
			plf.columns=3
			
			var ShuttlePlanningCtrl=								//69995
			[	
				plf.addHlpText({"label":"Shuttle Plan No",id:"strShuttlePlanNo",hlpLinkID:"ShuttleNo"},this),
				plf.addDateTime({"label":"Travel Date/Time",dateid:"dtDeptDate",timeid:"tmDeptTime","mandatory":"true"}),	
				plf.addDisplayOnly({"label":"Vehicle Reg No",id:"strVehicle"}),				
				plf.addDisplayOnly({"label":"Status",id:"strStatus"})				
			]
		
		}
		
		else
		{
		var parentForm =this;
		var ShuttlePlanningCtrl=								//69995
			[	
				plf.addHlpText({"label":"Shuttle Plan No",id:"strShuttlePlanNo",hlpLinkID:"ShuttleNo"},this),
				plf.addDateTime({"label":"Travel Date/Time",dateid:"dtDeptDate",timeid:"tmDeptTime","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Vehicle Reg No",id:"strVehicle"}),				              				
				plf.addDisplayOnly({"label":"Status",id:"strStatus"})			
			]
		
		}
		ShuttlePlanningColumn.add(ShuttlePlanningCtrl);
		/*Additional Information*/
		if(plf.defaultLayout==3)
		{
			plf.columns=3			
			var ShuttlePlanningAddnCtrl=
			[	
				
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),  
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),				
				plf.addDisplayOnly({"label":"No Of Seats",id:"strNoOFSeats"}),							
                plf.addDisplayOnly({"label":"Utilization %",id:"strUtilization"}),
				plf.addDisplayOnly({"label":"Route Code",id:"strRouteCode"})							
			]
		
		}
		
		else
		{
		var parentForm =this;
		var ShuttlePlanningAddnCtrl=
			[	
							
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),  
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),				
				plf.addDisplayOnly({"label":"No Of Seats",id:"strNoOFSeats"}),							
                plf.addDisplayOnly({"label":"Utilization %",id:"strUtilization"}),
				plf.addDisplayOnly({"label":"Route Code",id:"strRouteCode"})				
			]
		
		}
		ShuttlePlanningAddnColumn.add(ShuttlePlanningAddnCtrl);
		
		/*Additional Information*/
		/*Unassigned Shipment Details starts here*/
		var btnSearch=[
						/*plf.addButton({id:"btnRequest",label:"Search Shuttle Request",tooltip:"Click here to search shuttle request.",
							"handler": function() 
							{
								parentForm.launchHlpLink("Request")						
							}}),*/
						plf.addButton({id:"btnAssign",label:"Assign Shuttle Request",tooltip:"Click here to assign shuttle request.",
							"handler": function() 
							{
								var unmappedStore = Ext.data.StoreManager.lookup('unmappedReqGrid_store');
								var mappedStore = Ext.data.StoreManager.lookup('mappedReqGrid_store');	
								var cnt=mappedStore.getCount();
								Ext.each(unmappedStore.getRange(), function(record) 
								{									
									if(record.getData().select) 
									{										
										var tmpChk = mappedStore.findRecord('UN_REQUEST_NO', record.get("UN_REQUEST_NO"));
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
							}
							})
						];	
		var reqSummaryObj=
		[
			{columnname:"Shuttle Request No",dataname:"UN_REQUEST_NO",datatype:"string",width:200,linkId:"db_reqdtl",gridpopup:true,tooltip:"Click here to view shuttle request details."},							
			{columnname:"Travel Date/Time",dataname:"UN_REQ_DATE",datatype:"string",width:150},
			//{columnname:"Travel Date To",dataname:"UN_REQ_TO",datatype:"string",width:150},
			{columnname:"Origin",dataname:"UN_ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"UN_DESTINATION",datatype:"string",width:150},			
			//{columnname:"Traveller Code",dataname:"UN_TRAVELLER_CODE",datatype:"string",width:150},
			{columnname:"Traveller Name",dataname:"UN_TRAVELLER_NAME",datatype:"string",width:150},
			//{columnname:"Travel Type",dataname:"UN_TRAVEL_TYPE",datatype:"string",width:150},
			{columnname:"Purpose",dataname:"UN_PURPOSE",datatype:"string",width:150},
		]
		SummaryGridDetail=
		{
			title:"Unassigned Shuttle Requests",
			id:"unmappedReqGrid",
			detail:reqSummaryObj,
			visibleRow:10,
			removeFilter:false,
			removeExport:false,
			removeAddDelete:true,
			removeTbar:false,
			tool:btnSearch
		}
		var UnAssignedSummaryGridSection = plf.addGrid(SummaryGridDetail,this)		
		var UnAssignedColumn = plf.addColumnSection({"title":"Unassigned Shuttle Requests"});		
		
		
		
		UnAssignedColumn.add(UnAssignedSummaryGridSection);
		
		/*Unassigned Request Details ends here*/		
		
		/*Assigned Request Details starts here*/
		var btnUnassign=[
		plf.addButton({id:"btnUnAssign",label:"Unassign Shuttle Request",tooltip:"Click here to unassign shuttle request.",
						"handler": function() 
		{
			var unmappedStore = Ext.data.StoreManager.lookup('unmappedReqGrid_store');
			var mappedStore = Ext.data.StoreManager.lookup('mappedReqGrid_store');						
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
			//unmappedStore.on("endupdate",function() {mainpage.renderShipment()} )
		}
		})
		];
	
		var requestSummaryObj=
		[
			{columnname:"Shuttle Request No",dataname:"UN_REQUEST_NO",datatype:"string",width:200,linkId:"db_reqdtl",gridpopup:true,tooltip:"Click here to view shuttle request details."},							
			{columnname:"Travel Date",dataname:"UN_REQ_DATE",datatype:"string",width:150},
			{columnname:"Travel Time",dataname:"UN_REQ_TIME",datatype:"string",width:150},
			//{columnname:"Travel Date To",dataname:"UN_REQ_TO",datatype:"string",width:150},
			{columnname:"Origin",dataname:"UN_ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"UN_DESTINATION",datatype:"string",width:150},			
			//{columnname:"Traveller Code",dataname:"UN_TRAVELLER_CODE",datatype:"string",width:150},
			{columnname:"Traveller Name",dataname:"UN_TRAVELLER_NAME",datatype:"string",width:150},
			//{columnname:"Travel Type",dataname:"UN_TRAVEL_TYPE",datatype:"string",width:150},
			{columnname:"Purpose",dataname:"UN_PURPOSE",datatype:"string",width:150},
			{columnname:"Seat No",dataname:"UN_SEAT_NO",datatype:"string",width:150,editControl:"textbox"}
		]
		var requestGridDetail=
		{
			title:"Assigned Shuttle Requests",
			id:"mappedReqGrid",
			detail:requestSummaryObj,
			visibleRow:plf.searchVisibleRows,
			removeFilter:false,
			removeExport:false,
			removePaging:true,
			removeAddDelete:true,
			removeTbar:false,
			tool:btnUnassign
		}
		var SummaryGridSection = plf.addGrid(requestGridDetail,this)	

		var AssignedColumn = plf.addColumnSection({"title":"Assigned Shuttle Requests"});			
		
		AssignedColumn.add(SummaryGridSection);
		var unmappedStore = Ext.data.StoreManager.lookup('unmappedReqGrid_store');												
		
		/*Assigned Shipment Details ends here*/	
		
		
		/*Plan Leg Details starts here*/
		
		var btnPlanLeg=[
						plf.addButton({"label":"Get Plan Leg",id:"btnPlanLeg",tooltip:"Click here to get plan leg details.",
						"handler": function() 
							{
								//parentForm.queryById("methodName").setValue("fetchLoadShipGetLegTS");
								//process_ebpack_service(parentForm,["mappedShipGrid","strLoadNo"],"TMSCoreShuttleTS");													
							}
						})
						];		
		var btnUtil=[
						plf.addButton({"label":"Get Route & Utilization",id:"btnUtil",tooltip:"Click here to get route & utilization.",
						"handler": function() 
							{
								//parentForm.queryById("methodName").setValue("fetchLoadRouteSugTS");
								//process_ebpack_service(parentForm,["LoadLegDtlGrid","mappedShipGrid","strVehicleCategory","UtilDtlGrid"],"TMSCoreShuttleTS");																										
							}
						})
						];
						
						
		var PlanLegSummaryObj=
		[
			{columnname:"Plan Leg",dataname:"PLAN_LEG",datatype:"string",width:150},
			{columnname:"Sequence No",dataname:"SEQ_NO",datatype:"string",width:150,editControl:"textbox","inputFormat":"integer"}			
		]
		var PlanLegGridDetail=
		{
			title:"Plan Leg Details",
			id:"PlanLegDtlGrid",
			detail:PlanLegSummaryObj,
			widthBasis:"flex",
			columnWidth:.5,
			readonly:true,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true,
			removeFilter:true,
			removeExport:true,
			removePaging:true,
			removeTbar:true,
			tool:btnPlanLeg
		}
		var PlanLegGridSection = plf.addGrid(PlanLegGridDetail,this)
		/*Plan Leg Details ends here*/
		
		/*Utilization starts here*/
		var UtilSummaryObj=
		[
			{columnname:"Seq No",dataname:"SEQ_NO",datatype:"string",width:50,hidden:true},
			{columnname:"Origin",dataname:"FROM",datatype:"string",width:100},
			{columnname:"Destination",dataname:"TO",datatype:"string",width:100},	
			{columnname:"No of People",dataname:"NO_OF_PEOPLE",datatype:"string",width:100,"inputFormat":"integer"},
			{columnname:"Utilization %",dataname:"UTILIZATION",datatype:"string",width:100,colAlign:'right',weightPrecision:3}
		]
		var UtilGridDetail=
		{
			title:"Utilization Details",
			id:"UtilDtlGrid",
			widthBasis:"flex",
			detail:UtilSummaryObj,
			columnWidth:.5,
			readonly:true,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true,
			removeFilter:true,
			removeExport:true,
			removePaging:true,
			removeTbar:true,
			tool:btnUtil,
			"rowHighlight":true
		}
		var UtilGridSection = plf.addGrid(UtilGridDetail)
		/*Utilization ends here*/
		plf.columns=2
		
		var tmpbtnSection = plf.addColumnSection({title:"Plan Leg / Utilization Details",collapsed:false});
				
		//tmpbtnSection.add(tmpButton);
		tmpbtnSection.add(PlanLegGridSection)			
		tmpbtnSection.add(UtilGridSection)
		
		var form_obj=this;
		var baseTab = plf.addTabSection({ tabs:[UnAssignedColumn,AssignedColumn]
		
		});
		
		
		
		//ShuttlePlanning detail Section Ends
		mainpage.ptrMainSection.add(ShuttlePlanningColumn)	
		mainpage.ptrMainSection.add(ShuttlePlanningAddnColumn)	
		
		//mainpage.ptrMainSection.add(baseTab)
		mainpage.ptrMainSection.add(baseTab)
		//mainpage.ptrMainSection.add(VehUtilGridSection)
		mainpage.dataHistorySectionFlag=true;		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
					"controlid":"",
					"tasktype":"onload",
					"input":["strShuttlePlanNo"],
					"service":"PPLCoreTS",
					"methodName":"initSplanBasedTS"
			},
			{
				"controlid":"strShuttlePlanNo",
				"tasktype":"onenter",
				"input":["strShuttlePlanNo"],
				"service":"PPLCoreTS",
				"methodName":"fetchSplanNoTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",				
				"input":["strShuttlePlanNo","dtDeptDate","tmDeptTime","mappedReqGrid"],
				"service":"PPLCoreTS",
				"methodName":"editSplanBasedTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strShuttlePlanNo","dtDeptDate","tmDeptTime","mappedReqGrid"],
				"service":"PPLCoreTS",
				"methodName":"deleteSplanBasedTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["strShuttlePlanNo","dtDeptDate","tmDeptTime","mappedReqGrid"],
				"service":"PPLCoreTS",
				"methodName":"authorizeSplanBasedTS"
		    },
			   {
					"tasktype":"proto",
					"filename":"peoplelogistics/ShuttlePlanning.json"
				}	
 			
		];
		//Event Handlers Mapping Ends
		
		//Help link begins
		
		mainpage.hlpLinks=
		{		
				"ShuttleNo":
				{
					"hlpType":"Header",
					"hlpScreen":"peoplelogistics.ShuttlePlanningHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strShuttlePlanNo","child":"SHUTTLE_PLAN_NO"}
							]
				},
				"Request":
				{
					"hlpType":"hdrgrid",
					"gridID":"unmappedReqGrid",
					"hlpScreen":"peoplelogistics.UnAssignedShuttleReq",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					{"parent":"UN_REQUEST_NO","child":"UN_REQUEST_NO"},					
					{"parent":"UN_ORIGIN","child":"UN_ORIGIN"},
					{"parent":"UN_DESTINATION","child":"UN_DESTINATION"},
					{"parent":"UN_REQ_DATE","child":"UN_REQ_DATE"},
					{"parent":"UN_TRAVELLER_NAME","child":"UN_TRAVELLER_NAME"},
					{"parent":"UN_PURPOSE","child":"UN_PURPOSE"}
					]
				}
					
		}
		
		mainpage.gridPopupLinks=
		{
			
		}
		//Help link ends		
		
		
		//Generate Screen Section
		this.callParent(arguments);
		
	},
	renderShipment:function()
	{			
		var unmappedStore = Ext.data.StoreManager.lookup('unmappedReqGrid_store');
		var mappedStore = Ext.data.StoreManager.lookup('mappedReqGrid_store');				
		Ext.each(unmappedStore.getRange(), function(record) 
		{				   
			Ext.each(mappedStore.getRange(), function(record1) 
			{					
				if (record1.get("UN_REQUEST_NO") ==record.get("UN_REQUEST_NO"))
				{						
					unmappedStore.remove(record);
				}				
			})			
		})			
	}
});


