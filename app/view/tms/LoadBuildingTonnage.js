/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.2															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		 Steffie       01/2/2016       69601        	         Load  short close 	                                   
1.0.2	 	Manibharathi   05/02/2016      69997                         Addition of var  
1.0.3		 Steffie       25/02/2016      71741     	             	 
1.0.4        Raj           19/05/2016      72612                     Bring Actual weight field in Load planning screen
1.0.7       shekar          18/07/2016       73364            Loading Point, Unload Point  and Load description
1.0.8        Vidhya		    28/12/2016	   75113

************************************************************************************************/
Ext.define('CueTrans.view.tms.LoadBuildingTonnage', 

{ 
extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		var parentForm =this;
		mainpage.startPainting();
		mainpage.screenName = "Manage Waybill Tonnage";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
            //{"name":"Create Another Load","linkid":"tms_CreateLoadBuilding","tooltip":"Click here to create another new load."},		
		];
		
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			/*{
                "name": "Create",
                "tooltip": "Click here to create load."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit load."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete load."
            },
            {
                "name": "Confirm",
                "tooltip": "Click here to confirm load."
            }, */
			/*
			{
                "name": "Edit Manifest",
                "tooltip": "Click here to edit manifest."
            }, 
			{
                "name": "Confirm Manifest",
                "tooltip": "Click here to confirm manifest."
            }, 
			{
                "name": "Update Closure",
                "tooltip": "Click here to update closure date/time."
            },
			*/		
			/*{
                "name": "Load Closure",
                "tooltip": "Click here to close load."
            }, 
						
			{
                "name": "Print PickSheet",
                "tooltip": "Click here to print the Pick Sheet."
            },*/
			{
                "name": "Save",
                "tooltip": "Click here to save."
            },
			{
                "name": "Print WayBill",
                "tooltip": "Click here to print the way bill."
            }

			,
			/*69601 changes */
           /* {
                "name": "Short Close",
                "tooltip": "Click here to short close a load."
            },
			{
                "name": "Reset",
                "tooltip": "Click here to reset."
            }*/
			/*
			{
                "name": "Print",
                "tooltip": "Click here to print the waybill."
            } */
            ]
	//	mainpage.toolbarActions=["Refresh","Create","Edit","Delete","Confirm","ShortClose","Print"]
		
		//Add Keyfields
		//mainpage.keyFields=["strUserType"]
		//LoadBuilding Section  Section Begins
		plf.columns=4
		var LoadBuildingColumn = plf.addColumnSection({"title":""}); //69997
		var LoadBuildingAddnColumn = plf.addColumnSection({"title":""});	//69997
		if(plf.defaultLayout==3)
		{
			plf.columns=3
			
			var LoadBuildingCtrl=					//69997
			[	
				plf.addHlpText({"label":"Load No",id:"strLoadNo",hlpLinkID:"LoadNo"},this),
				plf.addDisplayOnly({"label":"Dept Date/Time",id:"dtLoadDate"}),/*ss*/
				plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehicleCategory"}),				
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),	
				plf.addDisplayOnly({"label":"Destination",id:"strDestination",storeId:"strOrigin"}),
				//plf.addCombo({"label":"Destination",id:"strDestination","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Load Description",id:"strLoadAt"}),
				plf.addDisplayOnly({"label":"Load Inspection",id:"strLoaInsReq"}),
				plf.addDisplayOnly({"label":"Remarks",id:"strRemarks"}),
				plf.addDisplayOnly({"label":"Loading Point",id:"strLoadPt"}),  //73364
				plf.addDisplayOnly({"label":"Unloading Point",id:"strDelvAt"}), //73364  
				
			]
		
		}
		
		else
		{
		
		var LoadBuildingCtrl=
			[	
				plf.addHlpText({"label":"Load No",id:"strLoadNo",hlpLinkID:"LoadNo"},this),
				plf.addDisplayOnly({"label":"Dept Date/Time",id:"dtLoadDate"}),	/*ss*/
				plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehicleCategory"}),				
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),	
				plf.addDisplayOnly({"label":"Destination",id:"strDestination",storeId:"strOrigin"}),
				//plf.addCombo({"label":"Destination",id:"strDestination","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Load Description",id:"strLoadAt"}),
				plf.addDisplayOnly({"label":"Load Inspection",id:"strLoaInsReq"}),
				plf.addDisplayOnly({"label":"Remarks",id:"strRemarks"}),
				plf.addDisplayOnly({"label":"Loading Point",id:"strLoadPt"}),  //73364
				plf.addDisplayOnly({"label":"Unloading Point",id:"strDelvAt"}), //73364  
			]
		
		}
		LoadBuildingColumn.add(LoadBuildingCtrl);
		/*Additional Information*/
		if(plf.defaultLayout==3)
		{
			plf.columns=3			
			var LoadBuildingAddnCtrl=									//69997
			[	
				
				//plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),  
				//plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
				plf.addDisplayOnly({"label":"Demand Status",id:"strDemandStatus"}),  
				plf.addDisplayOnly({"label":"Vehicle Capacity",id:"strVehicleCapacity","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Commodity",id:"strCommodity",}),				
                plf.addDisplayOnly({"label":"Utilization %",id:"strUtilization"}),
				plf.addDisplayOnly({"label":"Route Code",id:"strRouteCode"}),
				//plf.addDisplayOnly({"label":"Actual Weight (ton)",id:"strWeight"})//72612
				plf.addText({"label":"Actual Weight (ton)",id:"strWeight",inputFormat:'numeric',weightPrecision:3})
				/*plf.addButton({id:"btnShipment",label:"Add Shipment",tooltip:"Click here to add shipment.",
				"listeners":
						{
						el: {
							click: function(){
								parentForm.launchHlpLink("Shipment")}
							}
						}
				})*/
				/*
				{xtype:"button",align:"right",text:"Add Shipment",tooltip:"Click here to add shipment.",fieldCls:"c-displyonlyctrl",
					handler: function() 
					{
						parentForm.launchHlpLink("Shipment")
					}					
				}*/
			]
		
		}
		
		else
		{
		
		var LoadBuildingAddnCtrl=
			[	
							
				//plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),  
				//plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
				plf.addDisplayOnly({"label":"Demand Status",id:"strDemandStatus"}),  
				plf.addDisplayOnly({"label":"Vehicle Capacity",id:"strVehicleCapacity",}),	
				plf.addDisplayOnly({"label":"Commodity",id:"strCommodity",}),	
                plf.addDisplayOnly({"label":"Utilization %",id:"strUtilization"}),
				plf.addDisplayOnly({"label":"Route Code",id:"strRouteCode"}),
				//plf.addDisplayOnly({"label":"Actual Weight (ton)",id:"strWeight"})
				plf.addText({"label":"Actual Weight (ton)",id:"strWeight",inputFormat:'numeric',weightPrecision:3}),
				plf.addText({"label":"Actual Weight Remarks",id:"strNotes"})
				/*
				{xtype:"button",align:"right",text:"Add Shipment",tooltip:"Click here to add shipment.",fieldCls:"c-displyonlyctrl",
					handler: function() 
					{
						parentForm.launchHlpLink("Shipment")
					}					
				}*/
				/*plf.addButton({id:"btnShipment",label:"Add Shipment",tooltip:"Click here to add shipment.",
				"listeners":
						{
						el: {
							click: function(){
								parentForm.launchHlpLink("Shipment")}
							}
						}
				})
				*/
				
			]
		
		}
		LoadBuildingAddnColumn.add(LoadBuildingAddnCtrl);
		
		/*Additional Information*/
		/*Unassigned Shipment Details starts here*/
		var tmpbtnSearch=[
						plf.addButton({id:"btnShipment",label:"Search Shipments",tooltip:"Click here to search shipment.",
							"handler": function() 
							{
								parentForm.launchHlpLink("Shipment")						
							}}),
						plf.addButton({id:"btnAssign",label:"Assign Shipments",tooltip:"Click here to assign shipment.",
							"handler": function() 
							{
								var unmappedStore = Ext.data.StoreManager.lookup('unmappedShipGrid_store');
								var mappedStore = Ext.data.StoreManager.lookup('mappedShipGrid_store');	
								var unmappeddata = unmappedStore.getProxy().getReader().rawData;
								var mappeddata = mappedStore.getProxy().getReader().rawData;
								var dataToSave = [];
								Ext.each(unmappeddata, function(record) 
								 {
										 if (record.select) 
										 {											
											 var tmpSelRecord = Ext.clone(record);
											 tmpSelRecord.recStatus = "I";
											 record.select = false;
											 tmpSelRecord.select = false;
											 delete tmpSelRecord["id"];
											 
											 mappeddata.push(tmpSelRecord)
											
										 }
										 else
										 {
										 dataToSave.push(record);
										 }
										 
									 })
								 
								 unmappedStore.getProxy().setData(dataToSave, true);
								 unmappedStore.setRemoteSort(true)
								 unmappedStore.setRemoteFilter(true)
								 unmappedStore.loadPage(1);
								 
								 
								 mappedStore.getProxy().setData(mappeddata, true);
								 mappedStore.setRemoteSort(true)
								 mappedStore.setRemoteFilter(true)
								 mappedStore.loadPage(1);
								
								/*
								Ext.each(unmappedStore.getRange(), function(record) 
								{									
									if(record.getData().select) 
									{										
										var tmpChk = mappedStore.findRecord('UN_SHIPMENT_NO', record.get("UN_SHIPMENT_NO"));
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
								*/
								//parentForm.queryById("methodName").setValue("fetchLoadGetLegUtliTS");
								//process_ebpack_service(parentForm,["mappedShipGrid","strLoadNo"],"TMSCoreTransportTS");														
							}
							})								
							
							
						];	
		var shipmentSummaryObj=											//69997
		[
			{columnname:"Shipment No",dataname:"UN_SHIPMENT_NO",datatype:"string",width:200,linkId:"db_shipitemdtl",gridpopup:true,tooltip:"Click here to view shipment item details."},					
			{columnname:"Ref Doc No",dataname:"UN_REF_DOC_NO",datatype:"string",width:150,linkId:"db_shipitemdt2",gridpopup:true,tooltip:"Click here to view Ref Doc No details."},//71741 changes
			{columnname:"PickUp Date & Time",dataname:"PICK",datatype:"string",width:150},
			{columnname:"Contractual Delivery DateTime",dataname:"DELIVERY",datatype:"string",width:180},
			{columnname:"Origin",dataname:"UN_ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"UN_DESTINATION",datatype:"string",width:150},
			{columnname:"Priority",dataname:"UN_PRIORITY",datatype:"string",width:150},
			{columnname:"Commodity",dataname:"UN_COMMODITY",datatype:"string",width:150},	
			{columnname:"Quantity",dataname:"UN_QUANTITY",datatype:"string",width:100,colAlign:'right'},
			{columnname:"Weight (ton)",dataname:"UN_WEIGHT",datatype:"string",width:150,colAlign:'right'},
			{columnname:"Volume (cu.m)",dataname:"UN_VOLUME",datatype:"string",width:150,colAlign:'right'}
			
		]
		var SummaryGridDetail=													//69997
		{
			title:"Unassigned Shipments",
			id:"unmappedShipGrid",
			detail:shipmentSummaryObj,
			visibleRow:10,
			removeFilter:false,
			removeExport:false,
			removeAddDelete:true,
			removeTbar:false,
			tool:tmpbtnSearch,
			//removePaging:true
		}
		var UnAssignedSummaryGridSection = plf.addGrid(SummaryGridDetail,this)		
		var UnAssignedColumn = plf.addColumnSection({"title":"Unassigned Shipments"});		//69997
		
		
		/*				
		tmp.add(plf.addButton({id:"btnSearch",label:"Search",tooltip:"Click here to add search unassigned shipment.",
					"handler": function() 
					{
						parentForm.launchHlpLink("Shipment")						
					}}));
		
		tmp.add(plf.addButton({id:"btnAssign",label:"Assign to load",tooltip:"Click here to assign shipment.",
							"handler": function() 
							{
								var unmappedStore = Ext.data.StoreManager.lookup('unmappedShipGrid_store');
								var mappedStore = Ext.data.StoreManager.lookup('mappedShipGrid_store');
								Ext.each(unmappedStore.getRange(), function(record) 
								{									
									if(record.getData().select) 
									{
										record.set('select',false);
										record.commit();
										mappedStore.add(record.copy());
										unmappedStore.remove(record);
									}
								})							
							}
		}));
		
		UnAssignedColumn.add(tmp);
		*/
		UnAssignedColumn.add(UnAssignedSummaryGridSection);
		
		/*Unassigned Shipment Details ends here*/		
		
		/*Assigned Shipment Details starts here*/
		var tmpbtnUnassign=[
		plf.addButton({id:"btnUnAssign",label:"Unassign Shipments",tooltip:"Click here to unassign shipments.",
						"handler": function() 
		{
			var unmappedStore = Ext.data.StoreManager.lookup('unmappedShipGrid_store');
			var mappedStore = Ext.data.StoreManager.lookup('mappedShipGrid_store');	
			var unmappeddata = unmappedStore.getProxy().getReader().rawData;
			var mappeddata = mappedStore.getProxy().getReader().rawData;
			var dataToSave = [];
			Ext.each(mappeddata, function(record) 
			 {
					 if (record.select) 
					 {											
						 var tmpSelRecord = Ext.clone(record);
						 tmpSelRecord.recStatus = "I";
						 record.select = false;
						 tmpSelRecord.select = false;
						 delete tmpSelRecord["id"];
						 
						 unmappeddata.push(tmpSelRecord)
						
					 }
					 else
					 {
					 dataToSave.push(record);
					 }
					 
				 })
			 
			 unmappedStore.getProxy().setData(unmappeddata, true);
			 unmappedStore.setRemoteSort(true)
			 unmappedStore.setRemoteFilter(true)
			 unmappedStore.loadPage(1);
			 
			 
			 mappedStore.getProxy().setData(dataToSave, true);
			 mappedStore.setRemoteSort(true)
			 mappedStore.setRemoteFilter(true)
			 mappedStore.loadPage(1);
			 
			/*
			var unmappedStore = Ext.data.StoreManager.lookup('unmappedShipGrid_store');
			var mappedStore = Ext.data.StoreManager.lookup('mappedShipGrid_store');						
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
			*/
		}
		}),
		plf.addButton({"label":"Edit Manifest",id:"btnEdtMan",tooltip:"Click here to edit manifest details.",
						"handler": function() 
							{
								parentForm.queryById("methodName").setValue("editManifestTS");
								console.log("before edit manifest process");
								process_ebpack_service(parentForm,["mappedShipGrid","strLoadNo","strOrigin","strDestination","dtLoadDate","tmLoadTime",
								"strVehicleCategory","UtilDtlGrid","LoadLegDtlGrid"],"TMSCoreTransportTS");			

							}
						})/*,
		plf.addButton({"label":"Confirm Manifest",id:"btnConMan",tooltip:"Click here to confirm manifest details.",
						"handler": function() 
							{
								parentForm.queryById("methodName").setValue("confirmManifestTS");
								process_ebpack_service(parentForm,["mappedShipGrid","strLoadNo","strOrigin","strDestination","dtLoadDate","tmLoadTime",
								"strVehicleCategory","UtilDtlGrid","LoadLegDtlGrid"],"TMSCoreTransportTS");																							
							}
						})*/,
		plf.addButton({"label":"Update Closure Date",id:"btnUpdDt",tooltip:"Click here to update load closure date/time.",
						"handler": function() 
							{
								parentForm.queryById("methodName").setValue("UpdClosureDateTS");
								process_ebpack_service(parentForm,["mappedShipGrid","strLoadNo","strOrigin","strDestination","dtLoadDate","tmLoadTime",
								"strVehicleCategory"],"TMSCoreTransportTS");																							
							}
						})				
		];
	
		var shipmentSummaryObj=								//69997
		[
			{columnname:"Shipment No",dataname:"UN_SHIPMENT_NO",datatype:"string",width:150,linkId:"db_shipitemdtl",gridpopup:true,tooltip:"Click here to view shipment item details."},					
			{columnname:"Ref Doc No.",dataname:"UN_REF_DOC_NO",datatype:"string",width:150,linkId:"db_shipitemdt2",gridpopup:true,tooltip:"Click here to view Ref Doc No details."},//71741 changes
			{columnname:"PickUp Date & Time",dataname:"PICK",datatype:"string",width:150},
			{columnname:"Contractual Delivery DateTime",dataname:"DELIVERY",datatype:"string",width:180},
			{columnname:"Origin",dataname:"UN_ORIGIN",datatype:"string",width:120},
			{columnname:"Destination",dataname:"UN_DESTINATION",datatype:"string",width:120},
			{columnname:"Priority",dataname:"UN_PRIORITY",datatype:"string",width:120},
			{columnname:"Commodity",dataname:"UN_COMMODITY",datatype:"string",width:100},	
			{columnname:"Quantity",dataname:"UN_QUANTITY",datatype:"string",width:100,colAlign:'right'},
			{columnname:"Weight (ton)",dataname:"UN_WEIGHT",datatype:"string",width:100,colAlign:'right'},
			{columnname:"Volume (cu.m)",dataname:"UN_VOLUME",datatype:"string",width:100,colAlign:'right'},
			{columnname:"Closure Date",dataname:"CLOSURE_DATE",width:150},
			{columnname:"Closure Time (hh:mm)",dataname:"CLOSURE_TIME",datatype:"string",width:150}
			
		]
		var SummaryGridDetail=
		{
			title:"Assigned Shipments",
			id:"mappedShipGrid",
			detail:shipmentSummaryObj,
			visibleRow:plf.searchVisibleRows,
			removeFilter:false,
			removeExport:false,
			//removePaging:true,
			removeAddDelete:true,
			removeTbar:false
			//tool:tmpbtnUnassign
		}
		var SummaryGridSection = plf.addGrid(SummaryGridDetail,this)	//69997

		var AssignedColumn = plf.addColumnSection({"title":"Assigned Shipments"});			
		/*		
		AssignedColumn.add(plf.addButton({id:"btnUnAssign",label:"Unassign to load",tooltip:"Click here to Unassign shipment.",
							"handler": function() 
							{
								var unmappedStore = Ext.data.StoreManager.lookup('unmappedShipGrid_store');
								var mappedStore = Ext.data.StoreManager.lookup('mappedShipGrid_store');						
								Ext.each(mappedStore.getRange(), function(record) 
								{									
									if(record.getData().select) 
									{
										mappedStore.remove(record);										
										record.set('select',false);
										record.commit();										
										unmappedStore.add(record.copy());
										
									}
								})
								//unmappedStore.on("endupdate",function() {mainpage.renderShipment()} )
							}
		}));
		*/
		AssignedColumn.add(SummaryGridSection);
		//var unmappedStore = Ext.data.StoreManager.lookup('unmappedShipGrid_store');												
		//unmappedStore.on("endupdate",function() {mainpage.renderShipment()} )
		/*Assigned Shipment Details ends here*/		
		/*Load Leg Details starts here*/
		
		var tmpbtnLoadLeg=[
						plf.addButton({"label":"Get Load Leg",id:"btnLoadLeg",tooltip:"Click here to get load leg details.",
						"handler": function() 
							{
								parentForm.queryById("methodName").setValue("fetchLoadShipGetLegTS");
								process_ebpack_service(parentForm,["mappedShipGrid","strLoadNo"],"TMSCoreTransportTS");													
							}
						})
						];		
		var tmpbtnUtil=[
						plf.addButton({"label":"Get Route & Utilization",id:"btnUtil",tooltip:"Click here to get route & utilization.",
						"handler": function() 
							{
								parentForm.queryById("methodName").setValue("fetchLoadRouteSugTS");
								process_ebpack_service(parentForm,["LoadLegDtlGrid","mappedShipGrid","strVehicleCategory","UtilDtlGrid"],"TMSCoreTransportTS");																										
							}
						})
						];
						
						
		var LoadLegSummaryObj=
		[
			{columnname:"Load Leg",dataname:"LOAD_LEG",datatype:"string",width:150},
			{columnname:"Sequence No",dataname:"SEQ_NO",datatype:"string",width:150,editControl:"textbox","inputFormat":"integer"},
			{columnname:"Load Inspection Required",dataname:"LOAD_INSP_REQ",datatype:"string",width:150,storeId:"strLoadInspReq",editControl:"combo"}
		]
		var LoadLegGridDetail=
		{
			title:"Load Leg Details",
			id:"LoadLegDtlGrid",
			detail:LoadLegSummaryObj,
			widthBasis:"flex",
			columnWidth:.5,
			readonly:true,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true,
			removeFilter:true,
			removeExport:true,
			removePaging:true,
			removeTbar:true,
			tool:tmpbtnLoadLeg
		}
		var LoadLegGridSection = plf.addGrid(LoadLegGridDetail,this)			//69997
		/*Load Leg Details ends here*/
		
		/*Vehicle Utilization starts here*/
		var VehUtilSummaryObj=
		[
			{columnname:"Seq No",dataname:"SEQ_NO",datatype:"string",width:50,hidden:true},
			{columnname:"From",dataname:"FROM",datatype:"string",width:100},
			{columnname:"To",dataname:"TO",datatype:"string",width:100},	
			{columnname:"Distance",dataname:"DIST",datatype:"string",width:100},
			{columnname:"Net Weight (ton)",dataname:"NET_WEIGHT",datatype:"string",width:100,colAlign:'right'},
			{columnname:"Utilization %",dataname:"UTILIZATION",datatype:"string",width:100,colAlign:'right'}
		]
		var VehUtilGridDetail=
		{
			title:"Utilization Details",
			id:"UtilDtlGrid",
			widthBasis:"flex",
			detail:VehUtilSummaryObj,
			columnWidth:.5,
			readonly:true,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true,
			removeFilter:true,
			removeExport:true,
			removePaging:true,
			removeTbar:true,
			tool:tmpbtnUtil,
			"rowHighlight":true
		}
		VehUtilGridSection = plf.addGrid(VehUtilGridDetail,this)
		/*Vehicle Utilization ends here*/
		plf.columns=2
		
		var tmpbtnSection = plf.addColumnSection({title:"Load Leg / Utilization Details",collapsed:false});
				
		//tmpbtnSection.add(tmpButton);
		tmpbtnSection.add(LoadLegGridSection)			
		tmpbtnSection.add(VehUtilGridSection)
		//tmpbtnSection1 = plf.addColumnSection({});		
		//tmpbtnSection1.add(LoadLegGridSection)
		//tmpbtnSection1.add(VehUtilGridSection)
		
		
		
		//tmpSection.add(tmpbtnSection1)		
		
		//tmpSection.add(LoadLegGridSection)		
		//tmpSection.add(plf.addSplitter)
		//tmpSection.add(tmpSection1)		
		//tmpSection.add(VehUtilGridSection)	
		
		var baseTab = plf.addTabSection({id:"baseTabId", tabs:[AssignedColumn] /*UnAssignedColumn,tmpbtnSection*/
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
		
		
		
		//LoadBuilding detail Section Ends
		mainpage.ptrMainSection.add(LoadBuildingColumn)	
		mainpage.ptrMainSection.add(LoadBuildingAddnColumn)	
		
		//mainpage.ptrMainSection.add(baseTab)
		mainpage.ptrMainSection.add(baseTab)
		//mainpage.ptrMainSection.add(VehUtilGridSection)
		mainpage.dataHistorySectionFlag=true;		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Reset",
				"input":[""],// 73364
				"service":"TMSCoreTransportTS",
				"methodName":"initLoadBasedWbTonTS"
		},
		{        
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print PickSheet",
                "input":["strLoadNo"],
				"service":"CoreReportService",
				"methodName":"PrintpicksheetloadingReport"
	   },
		{        
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print WayBill",
                "input":["strLoadNo"],
				"service":"CoreReportService",
				"methodName":"PrintwaybillloadingReport"
	   },

		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strLoadNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"initLoadBasedWbTonTS"
		},	
		{
				"controlid":"strLoadNo",
				"tasktype":"onenter",
				"input":["strLoadNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchLoadNoWbTonTS"
		},		
		/*{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strLoadNo","dtLoadDate","tmLoadTime","strStatus","strOrigin","strDestination","strCommodity",
				         "strDemandStatus","strVehicleCategory","mappedShipGrid","strCreatedBy","dtCreatedDate","strRouteCode","strLoaInsReq","strRouteDesc","dtPickUpDateTime","UtilDtlGrid","LoadLegDtlGrid","strLoadAt","strRemarks","strLoadPt","strDelvAt","strWeight"],// 73364
				"service":"TMSCoreTransportTS",
				"methodName":"createLoadBasedTS"
		},*/
		
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strLoadNo","strWeight","strNotes"],// 73364
				"service":"TMSCoreTransportTS",
				"methodName":"SaveLoadBasedWbTonTS"
		},
		
	/*	{       
				"controlid":"btnAssign1",
				"tasktype":"btnclick",
				"input":["strLoadNo","unmappedShipGrid","mappedShipGrid"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchAllLoadBasedTS"
		},
		
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strLoadNo","dtLoadDate","tmLoadTime","strStatus","strOrigin","strDestination","strCommodity",
				         "strDemandStatus","strVehicleCategory","mappedShipGrid","strModifiedBy","dtModifiedDate","strRouteCode","strLoaInsReq","strRouteDesc","dtPickUpDateTime","UtilDtlGrid","LoadLegDtlGrid","strUtilization","strLoadAt","strRemarks","strLoadPt","strDelvAt","strWeight","strNotes"],//73364
				"service":"TMSCoreTransportTS",
				"methodName":"editLoadBasedTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["mappedShipGrid","strLoadNo","dtLoadDate","tmLoadTime","strStatus","strOrigin","strDestination",
				         "strCommodity","strDemandStatus","strVehicleCategory","mappedShipGrid","strRouteCode","strLoaInsReq",
					     "strRouteDesc","dtPickUpDateTime","UtilDtlGrid","LoadLegDtlGrid","strUtilization","strLoadAt","strRemarks","strLoadPt","strDelvAt","strWeight"], //73364
				"service":"TMSCoreTransportTS",
				"methodName":"authorizeLoadBasedTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["mappedShipGrid","strLoadNo","dtLoadDate","tmLoadTime","strStatus","strOrigin","strDestination",
				         "strCommodity","strDemandStatus","strVehicleCategory","mappedShipGrid","strRouteCode","strLoaInsReq",
					     "strRouteDesc","dtPickUpDateTime","UtilDtlGrid","LoadLegDtlGrid","strLoadAt","strRemarks","strLoadPt","strDelvAt"],// 73364
				"service":"TMSCoreTransportTS",
				"methodName":"deleteLoadBasedTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Load Closure",
				"input":["mappedShipGrid","strLoadNo","dtLoadDate","tmLoadTime","strStatus","strOrigin","strDestination",
				          "strCommodity","strDemandStatus","strVehicleCategory","mappedShipGrid","strRouteCode","strLoaInsReq",
					     "strRouteDesc","dtPickUpDateTime","UtilDtlGrid","LoadLegDtlGrid","strLoadAt","strRemarks","strLoadPt","strDelvAt"],
					     //73364
				"service":"TMSCoreTransportTS",
				"methodName":"loadClosureTS"
		},*/
		
		/*69601 changes */
		/*{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Short Close",
				"input":["mappedShipGrid","strLoadNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"shortcloseLoadBasedTS"
		},
              {
				"controlid":"strVehicleCategory",
				"tasktype":"onchange",
				"input":["strVehicleCategory"],
				"service":"TMSCoreTransportTS",
				"methodName":"onchangeVehicleCatTS"
		}*//*,
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print",
				"input":["strRequestNoFrom","strRequestNoTo","strShipmentNoFrom","strShipmentNoTo",
                                     "strLoadNoFrom","strLoadNoTo","dtDateFrom","dtDateTo","strLocationCode","strRegion","strPriority","strCarrierCode","strCustomerCode"],
				"service":"CoreReportService",
				"methodName":"PrintwaybillReport"
		},
			{
				"controlid":"strRouteCode",
				"tasktype":"onenter",
				"input":["strRouteCode"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchRouteDetailsTS"
			}
		*/
		
 			
		];
		//Event Handlers Mapping Ends
		
		//Help link begins
		mainpage.hlpLinks=
		{			
				"LoadNo":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.LoadBuildingTonnageSummaryHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strLoadNo","child":"LOAD_NO"}
							]
				},
				"Shipment":
				{
					"hlpType":"hdrgrid",
					"gridID":"mappedShipGrid",
					"hlpScreen":"tms.LoadPlanningHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					{"parent":"UN_SHIPMENT_NO","child":"UN_SHIPMENT_NO"},					
					{"parent":"UN_ORIGIN","child":"UN_ORIGIN"},
					{"parent":"UN_DESTINATION","child":"UN_DESTINATION"},
					{"parent":"UN_PRIORITY","child":"UN_PRIORITY"},
					{"parent":"UN_COMMODITY","child":"UN_COMMODITY"},
					{"parent":"UN_WEIGHT","child":"UN_WEIGHT"},
					{"parent":"UN_VOLUME","child":"UN_VOLUME"},
					{"parent":"CLOSURE_DATE","child":"CLOSURE_DATE"},
					{"parent":"CLOSURE_TIME","child":"CLOSURE_TIME"}
					]
				},
				"routecode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.RouteHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"ROUTE_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strRouteCode","child":"ROUTE_CODE"}
							]
				}
					
		}
		mainpage.screenLinks=
		   {
			
			"tms_CreateLoadBuilding":
				{
					"dest":"tms.LoadBuilding",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
			}
		mainpage.gridPopupLinks=
		{
			"db_shipitemdtl":
			{
				"dest":"tms.shipment_itemdtl",
				"popMethodName":"initLoadShipItemSearchTS",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"UN_SHIPMENT_NO","dest":"selChartSeries"}
						]
			},//71741 changes
			"db_shipitemdt2":
			{
				"dest":"tms.shipment_itemdt2",
				"popMethodName":"initRefDocItemSearchTS",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"UN_REF_DOC_NO","dest":"selChartSeries"}
						]
			}
		}
		//Help link ends		
		
		
		//Generate Screen Section
		this.callParent(arguments);
		
	}
});



//# sourceURL=https://pdo.cuetrans.com/CueTrans/app/view/tms/LoadBuilding.js