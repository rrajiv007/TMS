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
Ext.define('CueTrans.view.peoplelogistics.TransportPlanning', 

{ 
extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Transport Planning";
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
			{
                "name": "Create",
                "tooltip": "Click here to create transport plan."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit transport plan."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete transport plan."
            },
            {
                "name": "Confirm",
                "tooltip": "Click here to confirm transport plan."
            }/*,
            {
                "name": "Short Close",
                "tooltip": "Click here to short close a load."
            },
			{
                "name": "Print",
                "tooltip": "Click here to print the waybill."
            } */
            ]
	//	mainpage.toolbarActions=["Refresh","Create","Edit","Delete","Approve","ShortClose","Print"]
		
		//Add Keyfields
		//mainpage.keyFields=["strUserType"]
		//LoadBuilding Section  Section Begins
		plf.columns=4
		var TransportPlanningColumn = plf.addColumnSection({"title":""});				//69995
		var TransportPlanningAddnColumn = plf.addColumnSection({"title":""});			//69995
		if(plf.defaultLayout==3)
		{
			plf.columns=3
			
			var TransportPlanningCtrl=					//69995
			[	
				plf.addHlpText({"label":"Transport Plan No",id:"strTransportPlanNo",hlpLinkID:"TransportNo"},this),
				plf.addDateTime({"label":"Travel Date/Time",dateid:"dtDeptDate",timeid:"tmDeptTime","mandatory":"true"}),	
				plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory","mandatory":"true"}),				
				plf.addDisplayOnly({"label":"Status",id:"strStatus"})				
			]
		
		}
		
		else
		{
		var parentForm =this;
		var TransportPlanningCtrl=											//69995
			[	
				plf.addHlpText({"label":"Transport Plan No",id:"strTransportPlanNo",hlpLinkID:"TransportNo"},this),
				plf.addDateTime({"label":"Travel Date/Time",dateid:"dtDeptDate",timeid:"tmDeptTime","mandatory":"true"}),
				plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory","mandatory":"true"}),				              				
				plf.addDisplayOnly({"label":"Status",id:"strStatus"})			
			]
		
		}
		TransportPlanningColumn.add(TransportPlanningCtrl);
		/*Additional Information*/
		if(plf.defaultLayout==3)
		{
			plf.columns=3			
			var TransportPlanningAddnCtrl=				//69995
			[	
				
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),  
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),				
				plf.addDisplayOnly({"label":"No Of Seats",id:"strNoOFSeats"}),							
                plf.addDisplayOnly({"label":"Utilization %",id:"strUtilization"}),
				plf.addHlpText({"label":"Route Code",id:"strRouteCode",hlpLinkID:"routecode"},this),
				plf.addDisplayOnly({"label":"Service Instance No",id:"strServiceInsNo"})				
			]
		
		}
		
		else
		{
		var parentForm =this;
		var TransportPlanningAddnCtrl=				//69995
			[	
							
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),  
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),				
				plf.addDisplayOnly({"label":"No Of Seats",id:"strNoOFSeats"}),							
                plf.addDisplayOnly({"label":"Utilization %",id:"strUtilization"}),
				plf.addHlpText({"label":"Route Code",id:"strRouteCode",hlpLinkID:"routecode"},this)	,
				plf.addDisplayOnly({"label":"Service Instance No",id:"strServiceInsNo"})
				
			]
		
		}
		TransportPlanningAddnColumn.add(TransportPlanningAddnCtrl);
		
		/*Additional Information*/
		/*Unassigned Shipment Details starts here*/
		var btnSearch=[
						plf.addButton({id:"btnRequest",label:"Search Transport Request",tooltip:"Click here to search transport request.",
							"handler": function() 
							{
								parentForm.launchHlpLink("Request")						
							}}),
						plf.addButton({id:"btnAssign",label:"Assign Transport Request",tooltip:"Click here to assign transport request.",
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
			{columnname:"Transport Request No",dataname:"UN_REQUEST_NO",datatype:"string",width:200,linkId:"db_reqdtl",gridpopup:true,tooltip:"Click here to view transport request details."},							
			{columnname:"Travel Date",dataname:"UN_REP_DATE",datatype:"string",width:150},
			{columnname:"Origin",dataname:"UN_ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"UN_DESTINATION",datatype:"string",width:150},			
			//{columnname:"Traveller Code",dataname:"UN_TRAVELLER_CODE",datatype:"string",width:150},
			{columnname:"Traveller Name",dataname:"UN_TRAVELLER_NAME",datatype:"string",width:150},
			//{columnname:"Travel Type",dataname:"UN_TRAVEL_TYPE",datatype:"string",width:150},
			{columnname:"Purpose",dataname:"UN_PURPOSE",datatype:"string",width:150}			
		]
		var SummaryGridDetail=	//69995
		{
			title:"Unassigned Transport Requests",
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
		var UnAssignedColumn = plf.addColumnSection({"title":"Unassigned Transport Requests"});		
		
		
		
		UnAssignedColumn.add(UnAssignedSummaryGridSection);
		
		/*Unassigned Request Details ends here*/		
		
		/*Assigned Request Details starts here*/
		var btnUnassign=[
		plf.addButton({id:"btnUnAssign",label:"Unassign Transport Request",tooltip:"Click here to unassign transport request.",
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
			{columnname:"Transport Request No",dataname:"UN_REQUEST_NO",datatype:"string",width:200,linkId:"db_reqdtl",gridpopup:true,tooltip:"Click here to view transport request details."},							
			{columnname:"Travel Date",dataname:"UN_REP_DATE",datatype:"string",width:150},
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
			title:"Assigned Transport Requests",
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

		var AssignedColumn = plf.addColumnSection({"title":"Assigned Transport Requests"});			
		
		AssignedColumn.add(SummaryGridSection);
		var unmappedStore = Ext.data.StoreManager.lookup('unmappedReqGrid_store');												
		
		/*Assigned Shipment Details ends here*/		
		/*Plan Leg Details starts here*/
		
		var btnPlanLeg=[
						plf.addButton({"label":"Get Plan Leg",id:"btnPlanLeg",tooltip:"Click here to get plan leg details.",
						"handler": function() 
							{
								parentForm.queryById("methodName").setValue("fetchTplanReqGetLegTS");
								process_ebpack_service(parentForm,["mappedReqGrid","strTransportPlanNo"],"PPLCoreTS");													
							}
						})
						];		
		var btnUtil=[
						plf.addButton({"label":"Get Route & Utilization",id:"btnUtil",tooltip:"Click here to get route & utilization.",
						"handler": function() 
							{
								parentForm.queryById("methodName").setValue("fetchTplanRouteSugTS");
								process_ebpack_service(parentForm,["PlanLegDtlGrid","mappedReqGrid","strVehicleCategory","UtilDtlGrid"],"PPLCoreTS");																										
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
			{columnname:"Utilization %",dataname:"UTILIZATION",datatype:"string",width:100,colAlign:'right'}
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
		var baseTab = plf.addTabSection({ tabs:[UnAssignedColumn,AssignedColumn,tmpbtnSection]
		/*
		"listeners":{
					tabchange:  function(tabPanel, tab)
					{		
						if (tab.title=='Load Leg / Utilization Details')
						{						
						form_obj.queryById("methodName").setValue("fetchLoadShipGetLegTS");
						process_ebpack_service(form_obj,["mappedShipGrid","strLoadNo"],"TMSCoreTransportTS");
						}						
					}
				}
		*/
		});
		
		
		
		//TransportPlanning detail Section Ends
		mainpage.ptrMainSection.add(TransportPlanningColumn)	
		mainpage.ptrMainSection.add(TransportPlanningAddnColumn)	
		
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
					"input":["strTransportPlanNo"],
					"service":"PPLCoreTS",
					"methodName":"initTplanBasedTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strTransportPlanNo","dtDeptDate","tmDeptTime","strStatus","strOrigin","strDestination",
				"strVehicleCategory","mappedReqGrid","strRouteCode","UtilDtlGrid","PlanLegDtlGrid"],
				"service":"PPLCoreTS",
				"methodName":"createTplanBasedTS"
			},
			{
				"controlid":"strTransportPlanNo",
				"tasktype":"onenter",
				"input":["strTransportPlanNo"],
				"service":"PPLCoreTS",
				"methodName":"fetchTplanNoTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strTransportPlanNo","dtDeptDate","tmDeptTime","strStatus","strOrigin","strDestination",
				"strVehicleCategory","mappedReqGrid","strRouteCode","UtilDtlGrid","PlanLegDtlGrid"],
				"service":"PPLCoreTS",
				"methodName":"editTplanBasedTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strTransportPlanNo","dtDeptDate","tmDeptTime","strStatus","strOrigin","strDestination",
				"strVehicleCategory","mappedReqGrid","strRouteCode","UtilDtlGrid","PlanLegDtlGrid"],
				"service":"PPLCoreTS",
				"methodName":"deleteTplanBasedTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["strTransportPlanNo","dtDeptDate","tmDeptTime","strStatus","strOrigin","strDestination",
				"strVehicleCategory","mappedReqGrid","strRouteCode","UtilDtlGrid","PlanLegDtlGrid"],
				"service":"PPLCoreTS",
				"methodName":"authorizeTplanBasedTS"
		    },
			 {
				"tasktype":"proto",
				"filename":"peoplelogistics/TransportPlanning.json"
			 }
		];
		//Event Handlers Mapping Ends
		
		//Help link begins
		
		mainpage.hlpLinks=
		{		
				"TransportNo":
				{
					"hlpType":"Header",
					"hlpScreen":"peoplelogistics.TransportPlanningHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTransportPlanNo","child":"TRANSPORT_PLAN_NO"}
							]
				},
				
				"routecode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.RouteHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRouteCode","child":"ROUTE_CODE"}
							]
				}
					
		}
		
		mainpage.gridPopupLinks=
		{
		"db_reqdtl":
				{
					"hlpType":"hdrgrid",
					"gridID":"unmappedReqGrid",
					"hlpScreen":"peoplelogistics.UnAssignedTransportReq",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					{"parent":"UN_REQUEST_NO","child":"UN_REQUEST_NO"},					
					{"parent":"UN_ORIGIN","child":"UN_ORIGIN"},
					{"parent":"UN_DESTINATION","child":"UN_DESTINATION"},
					{"parent":"UN_REP_DATE","child":"UN_REP_DATE"},
					{"parent":"UN_TRAVELLER_NAME","child":"UN_TRAVELLER_NAME"},
					{"parent":"UN_PURPOSE","child":"UN_PURPOSE"}
					]
				}	
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


