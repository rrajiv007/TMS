/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.2															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		 Steffie       22/1/2016      69445            Default Closure date and time Update
1.0.2	  Manibharathi	   05/02/2016     69997            Addition of var  
1.0.3		 Steffie       21/02/2016                      Update Vehicle Release
************************************************************************************************/
Ext.define('CueTrans.view.tms.BulkClosure', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Bulk Closure";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		/*
		mainpage.toolbarActions= [{
                "name": "Update Closure",
                "tooltip": "Click here to Update Closure."
            },
			{
                "name": "Update Closure & Realease",
                "tooltip": "Click here to Update Closure & Realease."
            }
			]
		*/
		plf.columns=4
		var helpOnBulkHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this); //69997
	 	var helpOnBulkClsreCtrl=												//69997
		[
			plf.addCombo({"label":"Action",id:"strAction"})	,
			plf.addText({"label":"Load No",id:"strLoadNo","anywhereSearch":"true"}),
			plf.addText({"label":"Shipment No",id:"strShippmentNo","anywhereSearch":"true"}),
			plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory"}),	
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addDate({"label":"Departure Date",id:"dtDepartureDate"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity"}),
			plf.addText({"label":"Ref Doc No",id:"strRefDocNo","anywhereSearch":"true"}),
			plf.addText({"label":"Vehicle Reg No",id:"strVehCode","anywhereSearch":"true"})
					
			
			//plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."}),
		]
		
		helpOnBulkHdrCollapse.add(helpOnBulkClsreCtrl);
		/*69445* changes start here*/
		var helpOnBulkDefHdrCollapse = plf.addCollapseSection({title:"Default Section",collapsed: true},this);	//69997
		var helpOnDefBulkClsreCtrl=												//69997
		[
			
			plf.addDate({"label":" Default Closure Date",id:"dtClosureDate"}),
			plf.addText({"label":" Default Closure Time",id:"dtClosureTime"}),
			plf.addText({"label":" Default Remarks",id:"strRemarks"}),
			plf.addButton({"label":"Apply Closure Date ",id:"btnDefApp",
			"handler": function() 
							{
								var gridStore = Ext.data.StoreManager.lookup('excelDetail_store');	
								var  tmpClosDt=mainpage.queryById("dtClosureDate").getValue();
								var closureDt;
								if (tmpClosDt !="" && tmpClosDt !=null && tmpClosDt !=' ' && tmpClosDt !=" " && tmpClosDt !=undefined)	
								{
								closureDt=Ext.Date.format(new Date(tmpClosDt), plf.defDateFormat);								
								}
								else
								{
								closureDt="";								
								}
								
								var  tmpClosTm=mainpage.queryById("dtClosureTime").getValue();
								var  tmpRemarks=mainpage.queryById("strRemarks").getValue();			
								
								Ext.each(gridStore.getRange(), function(record) 
								{									
									Ext.each(gridStore.getRange(), function(record) 
											{
												if (record.get("select"))
												{
												record.set('PICKUP_DATE',closureDt);
												record.set('PICKUP_TIME',tmpClosTm);
												record.set('REMARKS',tmpRemarks);
												}
											})
								})
								
								//parentForm.queryById("methodName").setValue("fetchLoadGetLegUtliTS");
								//process_ebpack_service(parentForm,["mappedShipGrid","strLoadNo"],"TMSCoreTransportTS");														
							}
			})
					
			
			//plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."}),
		]
				/*69445* changes ends here*/
		
		helpOnBulkDefHdrCollapse.add(helpOnDefBulkClsreCtrl);		
		
		var parentForm =this;
		var bulkConfirm=[
						plf.addButton({"label":"Update Closure",id:"cmn_btnclosure",tooltip:"Click here to Update Closure.",
						"handler": function() 
							{
								parentForm.queryById("methodName").setValue("updateBulkClosureTS");
								process_ebpack_service(parentForm,["strLoadNo","strShippmentNo","strVehicleCategory","strOrigin","strDestination","strAction","dtDepartureDate","strCommodity","strRefDocNo","excelDetail"],"TMSCoreTransportTS");																										
							}
						}),
						plf.addButton({"label":"Update Closure & Release",id:"cmn_btnvehclosure",tooltip:"Click here to Update Closure & Realease.",
						"handler": function() 
							{
								parentForm.queryById("methodName").setValue("updateBulkClsrRlseTS");
								process_ebpack_service(parentForm,["strLoadNo","strShippmentNo","strVehicleCategory","strOrigin","strDestination","strAction","dtDepartureDate","strCommodity","strRefDocNo","excelDetail"],"TMSCoreTransportTS");																										
							}
						})
						];
						
		var ExcelMaterialDetailsGridFieldObj=											//69997
		[   
		    {columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:80},
			{columnname:"Shipment No",dataname:"LOAD_AT",datatype:"string",width:150},
			{columnname:"Departure Date",dataname:"DELIVERY_DATE",datatype:"string",width:120},
			{columnname:"Contractual Delivery Date",dataname:"DELV_DATE",datatype:"string",width:150},
			{columnname:"Vehicle Allocated Date",dataname:"ALLOC_DATE",datatype:"string",width:150},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:120},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:120},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:120},
			{columnname:"Vehicle Code",dataname:"VEHICLE_CODE",datatype:"string",width:130},
			{columnname:"Vehicle Regn No",dataname:"TRUCK_REG_NO",datatype:"string",width:130},
			{columnname:"Vehicle Category",dataname:"VEH_CAT",datatype:"string",width:120},
			{columnname:"Ref Doc NO",dataname:"DOC_NO",datatype:"string",width:120},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:130},
			{columnname:"Trailer Code",dataname:"TRAILER_CODE",datatype:"string",width:130},
			{columnname:"Closure Date",dataname:"PICKUP_DATE",datatype:"string",width:120,editControl:"date"},
			{columnname:"Closure Time",dataname:"PICKUP_TIME",datatype:"string",width:120,editControl:"time"},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:120,editControl:"textbox"}
		]
		ExcelmaterialDetailsPlan=
		{
			title:"",
			id:"excelDetail",
			detail:ExcelMaterialDetailsGridFieldObj,
			visibleRow:10,
			removeAddDelete:true,
			tool:bulkConfirm			
		}
		var ExcelmaterialDetailsPlanGridSection = plf.addGrid(ExcelmaterialDetailsPlan,this)	//69997
		

		
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnBulkHdrCollapse) 
		mainpage.ptrMainSection.add(helpOnBulkDefHdrCollapse) 
		mainpage.ptrMainSection.add(ExcelmaterialDetailsPlanGridSection)		
		   
		//History Data Section 
		//mainpage.dataHistorySectionFlag=true;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strAction"],
				"service":"TMSCoreTransportTS",
				"methodName":"initBulkClosureTS"
			},
			{
			    "controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strLoadNo","strShippmentNo","strVehicleCategory","strOrigin","strDestination","strAction","dtDepartureDate","strCommodity","strRefDocNo",
					  "strVehCode","excelDetail"], 
				"service":"TMSCoreTransportTS", 
				"methodName":"fetchBulkClosureTS"
			},
			/*
			{
			    "controlid":"btnDefApp",
				"tasktype":"btnclick",
				"input":["excelDetail","dtClosureDate","dtClosureTime","strRemarks","strAction"], 
				"service":"TMSCoreTransportTS", 
				"methodName":"defaultAppBulkClosureTS"
			},
			{       
				"controlid":"cmn_btnclosure",
				"tasktype":"btnclick",
				"input":["strLoadNo","strShippmentNo","strVehicleCategory","strOrigin","strDestination","strAction","dtDepartureDate","strCommodity","strRefDocNo","excelDetail"],
			    "service":"TMSCoreTransportTS",
				"methodName":"updateBulkClosureTS"
			},
			{       
				"controlid":"cmn_btnvehclosure",
				"tasktype":"btnclick",
				"input":["strLoadNo","strShippmentNo","strVehicleCategory","strOrigin","strDestination","strAction","dtDepartureDate","strCommodity","strRefDocNo","excelDetail"],
			    "service":"TMSCoreTransportTS",
				"methodName":"updateBulkClsrRlseTS"
			},*/
			/*
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Update Closure",
					"input":["strLoadNo","strShippmentNo","strVehicleCategory","strOrigin","strDestination","strAction","dtDepartureDate","strCommodity","strRefDocNo","excelDetail"],
					"service":"TMSCoreTransportTS",
					"methodName":"updateBulkClosureTS"
			},
			*/
			{
				"controlid":"strAction",
				"tasktype":"onchange",
				"input":["strLoadNo","strShippmentNo","strVehicleCategory","strOrigin","strDestination","strAction","dtDepartureDate","strCommodity","strRefDocNo","excelDetail"],
				"service":"TMSCoreTransportTS",
				"methodName":"onchange_loadclosureAction"
			}/*,
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Update Closure & Realease",
				"input":["strLoadNo","strShippmentNo","strVehicleCategory","strOrigin","strDestination","strAction","dtDepartureDate","strCommodity","strRefDocNo","excelDetail"],
				"service":"TMSCoreTransportTS",
				"methodName":"updateBulkClsrRlseTS"
			}*/
			
		];
		
		mainpage.hlpLinks=
		{		
						
		}		
		//Event Handlers Mapping Ends

		this.callParent(arguments);
		
	}
});
