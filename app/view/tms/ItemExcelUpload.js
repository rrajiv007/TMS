/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.2															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var     		                                   
1.0.2	 Yeshwanth		21/02/2016    69950                         
1.0.3   Steffie             29/04/2016    72106
1.0.4   Raj                 18/05/2016    72424                       Execl upload success msg changed
************************************************************************************************/
Ext.define('CueTrans.view.tms.ItemExcelUpload', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Request Upload";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
			mainpage.toolbarActions= [{
                "name": "Save",
                "tooltip": "Click here to save."
            }
			]
		//mainpage.toolbarActions=["Save"]
		
		//Add Keyfields
		mainpage.keyFields=[""]
		//Driver Master Section Begins
		plf.columns=4
		ItemBasedexcelColumn = plf.addColumnSection({});
		/*if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			ItemExcelBasedCtrl=
			[	
				plf.addText({"label":"File Path","id":"strFilePath"}),	
			    plf.addButton({"label":"Browse","id":"browseBtn"}),
				plf.addBlank({}),
				plf.addBlank({})

			]
		
		}
		*/
		Ext.apply(Ext.form.VTypes, {
             fileUpload: function(val, field) {                              
                                 var fileName = /^.*\.(xls|xlsx|org)$/i;
                                 return fileName.test(val);
                           },                 
             fileUploadText: 'File must be in .xls,.xlsx,.org format'
			});
		
		var ptrExcelFileUploadField = Ext.create('Ext.form.Panel', {
				title: '',
				width: 400,
				bodyPadding: 10,
				//frame: true,
				renderTo: Ext.getBody(),
				items: 
					[{
					xtype: 'filefield',
					name: 'fileName',
					fieldLabel: 'Upload File',
					labelWidth: 100,
					msgTarget: 'side',
					//allowBlank: false,
					anchor: '100%',
					vtype:'fileUpload',
					listeners:
					{
					change:function( thiss, value, eOpts )
					{	
					if (value !="")
					{
					ptrExcelFileUploadField.submit({									
						url: "UploadExcelServlet",
						waitMsg: 'Uploading...',
						success: function(form, action) 
						{
						
						},									
						failure: function(form, action)
						{	
							
							if (action.response!=undefined)
							{
							
							var response_data = Ext.JSON.decode(action.response.responseText);
							if (Object.keys(response_data).length ==0)
							{
							Ext.MessageBox.show({
												'title':'Failure', 
												'msg':"Error in Excel Format.",
												'buttons': Ext.MessageBox.OK,
												icon:Ext.MessageBox["ERROR"]
												})
							tmpWindow.close();
							return;
							}
							//console.log(value,response_data,response_data["strSessionError"]);
							//Ext.Msg.alert('Success', 'Your File has been uploaded.');
                            //Ext.Msg.alert('Success','Excel details have been uploaded in the grid.');//72424
							//load grid store starts here							
							for(var key in response_data)
							{
								var attrName = key;	
								
								if(attrName.match(/fileName/))
								{
									var attrValue = response_data[key];
									if (attrValue.length ==0)
									{
									Ext.MessageBox.show({
														'title':'Failure', 
														'msg':"No data exists.",
														'buttons': Ext.MessageBox.OK,
														icon:Ext.MessageBox["ERROR"]
														})
									tmpWindow.close();
									return;
									}
									grid_id_key = 'excelDetail';
									if
									(
										Ext.data.StoreManager.containsKey(grid_id_key+'_store') //load grid store
										&& 
										attrValue != null 
									)
									{
										Ext.MessageBox.show({
												'title':'Success', 
												'msg':'Excel details have been uploaded in the grid.',
												'buttons': Ext.MessageBox.OK,
												icon:'success_check_icon'//Ext.MessageBox["ERROR"]
												})
										if (Ext.data.StoreManager.lookup(grid_id_key+'_store').proxy.enablePaging != undefined)
										{
											var tmpStore = Ext.data.StoreManager.lookup(grid_id_key+'_store')											
											tmpStore.getProxy().setData(attrValue,true);
											tmpStore.setRemoteSort(true);
											tmpStore.setRemoteFilter(true);
											tmpStore.loadPage(1);
										}
										else
										{
										Ext.data.StoreManager.lookup(grid_id_key+'_store').clearFilter();
										Ext.data.StoreManager.lookup(grid_id_key+'_store').loadData(attrValue,false);
										}
									}
								}
							}
							
							}
						}});
						return value;
					  }
					}}}]
		});
		ItemBasedexcelColumn.add(ptrExcelFileUploadField); 
		
		
		
		//Plan Details Section Begins
		plf.columns=4
		var ItemAction = plf.addColumnSection({});
		var ItemActionCtrl=
			[	
				plf.addCombo({"label":"Action",id:"strAction"})				
			] 
		ItemAction.add(ItemActionCtrl);
		//ExcelmaterialDetailsPlan = plf.addColumnSection({title:""})
		//materialDetailsPlan = plf.addColumnSection({title:""});
		 var ExcelMaterialDetailsGridFieldObj=
		[   
			{columnname:"Customer Code",dataname:"CUSTOMER_CODE",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"Request Date",dataname:"REQUEST_DATE",datatype:"string",width:100,editControl:"date"},
			{columnname:"Ref Doc No",dataname:"DOC_NO",datatype:"string",width:80,editControl:"textbox"},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:120,editControl:"combo",storeId:"strOrigin"},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:80,editControl:"combo",storeId:"strDestination"},
			//{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:80,editControl:"combo",storeId:"strCommodity"},
			{columnname:"Priority",dataname:"PRIORITY",datatype:"string",width:80,editControl:"combo",storeId:"strPriority"},			
			{columnname:"Rig No",dataname:"RIG_NO",datatype:"string",width:100,editControl:"textbox",storeId:"strRigNo"},
			{columnname:"Requester ID",dataname:"REQ_ID",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"Requester Name",dataname:"REQ_NAME",datatype:"string",width:120,editControl:"textbox"},
			{columnname:"Requester Mail ID",dataname:"REQ_MAIL",datatype:"string",width:120,editControl:"textbox"},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:80,editControl:"textbox"},
			{columnname:"Vendor",dataname:"VENDOR",datatype:"string",width:80,editControl:"combo",storeId:"strVendorCode"},
			{columnname:"Vendor’s Ref No",dataname:"VENDOR_REF_NO",datatype:"string",width:110,editControl:"textbox",storeId:"strVenRefNo"},
			{columnname:"PO No",dataname:"PO_NUM",datatype:"string",width:80,editControl:"textbox",storeId:"strPONo"},
			{columnname:"Logistic Group",dataname:"LOG_GROUP",datatype:"string",width:100,editControl:"combo",storeId:"strLogGroup"},
			{columnname:"Division",dataname:"LOG_DIV",datatype:"string",width:80,editControl:"combo",storeId:"strDivCode"},
			{columnname:"Pickup Date",dataname:"PICKUP_DATE",datatype:"string",width:80,editControl:"date"},
			{columnname:"Pickup Time",dataname:"PICKUP_TIME",datatype:"string",width:80,editControl:"time"},
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",width:80,editControl:"textbox"},
			{columnname:"Quantity",dataname:"QUANTITY",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"PO Line Item",dataname:"PO_LINE_ITEM",datatype:"string",width:100,editControl:"textbox",inputFormat:'integer'},
			{columnname:"Item Remarks",dataname:"ITEM_REMARKS",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"Actual Weight(tons)",dataname:"ACTUAL_TOT_WEIGHT",datatype:"string",width:120,editControl:"textbox",inputFormat:'numeric',weightPrecision:3},   //72106
			{columnname:"Cost Centre Code",dataname:"COST_CENTER_CODE",datatype:"string",width:120,editControl:"textbox"},
			{columnname:"Vehicle Category",dataname:"VEH_CAT",datatype:"string",width:100,editControl:"combo",storeId:"strVehCat"},	
			{columnname:"Loading Point",dataname:"LOAD_AT",datatype:"string",width:80,editControl:"combo",storeId:"strLoadAt"},
			{columnname:"Unloading Point",dataname:"UNLOADING_POINT",datatype:"string",width:80,editControl:"combo",storeId:"strUnloadingPoint"},
			{columnname:"Load Description",dataname:"LOAD_DESCRIPTION",datatype:"string",width:80,editControl:"textbox",storeId:"strLoadDescription"},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:80,editControl:"textbox"},
			{columnname:"Load Inspection Required",dataname:"LOAD_INSPECTION",datatype:"string",width:120,editControl:"combo",storeId:"strLdInspReq"},
			{columnname:"Vehicle Reg No",dataname:"VEH_REG_NO",datatype:"string",editControl:"textbox",width:140,helpid:'vehreghlp'},
			
			{columnname:"Demand Status",dataname:"DEMAND_STATUS",datatype:"string",width:100,editControl:"combo",storeId:"strDemandStatus",hidden:true},
			//{columnname:"Contract<BR>Type",dataname:"CONTRACT_TYPE",datatype:"string",width:80,editControl:"combo",storeId:"strContractType"},
			
			//{columnname:"Item<BR>Description",dataname:"ITEM_DESC",datatype:"string",width:120,editControl:"textbox"},
			
			//{columnname:"Uom",dataname:"QUANTITY_UOM",datatype:"string",width:80,editControl:"combo",storeId:"strPlanQuantityUom"},
			//{columnname:"Weight",dataname:"WEIGHT",datatype:"string",width:80,editControl:"textbox"},
			//{columnname:"Uom",dataname:"WEIGHT_UOM",datatype:"string",width:80,editControl:"combo",storeId:"strWeightUom"},
			//{columnname:"Volume",dataname:"VOLUME",datatype:"string",width:80,editControl:"textbox"},
			//{columnname:"Uom",dataname:"VOLUME_UOM",datatype:"string",width:80,editControl:"combo",storeId:"strVolumeUom"},
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:120,editControl:"textbox",hidden:true},
			{columnname:"Load Closure Date",dataname:"DELIVERY_DATE",datatype:"string",width:110,editControl:"date",hidden:true},
			{columnname:"Load Closure Time",dataname:"DELIVERY_TIME",datatype:"string",width:110,editControl:"time",hidden:true},
			
			
			
			
			//{columnname:"Load At",dataname:"LOAD_AT",datatype:"string",width:80,editControl:"textbox",hidden:true},
			//{columnname:"Loading Point",dataname:"LOADING_POINT",datatype:"string",width:80,editControl:"combo",storeId:"strLoadingPoint"},
			
			
					
		]
		ExcelmaterialDetailsPlan=
		{
			title:"Request Details",
			id:"excelDetail",
			detail:ExcelMaterialDetailsGridFieldObj,
			visibleRow:15,
			removeExport:true,
			readonly:true,
			importTemplate:"excelTemplate/Request Upload Template.xls"
		}
		 var ExcelmaterialDetailsPlanGridSection = plf.addGrid(ExcelmaterialDetailsPlan,this)	
		 
		 //69950
		  var ExcelMaterialDetailsGridFetchObj=
		[   
			{columnname:"Request No",dataname:"REQUEST_NO",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"Customer Code",dataname:"CUSTOMER_CODE",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"Request Date",dataname:"REQUEST_DATE",datatype:"string",width:100,editControl:"date"},
			{columnname:"Ref Doc No",dataname:"DOC_NO",datatype:"string",width:80,editControl:"textbox"},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:120,editControl:"combo",storeId:"strOrigin1"},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:80,editControl:"combo",storeId:"strDestination1"},
			{columnname:"Priority",dataname:"PRIORITY",datatype:"string",width:80,editControl:"combo",storeId:"strPriority1"},			
			{columnname:"Rig No",dataname:"RIG_NO",datatype:"string",width:100,editControl:"textbox",storeId:"strRigNo1"},
			{columnname:"Requester ID",dataname:"REQ_ID",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"Requester Name",dataname:"REQ_NAME",datatype:"string",width:120,editControl:"textbox"},
			{columnname:"Requester Mail ID",dataname:"REQ_MAIL",datatype:"string",width:120,editControl:"textbox"},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:80,editControl:"textbox"},
			{columnname:"Vendor",dataname:"VENDOR",datatype:"string",width:80,editControl:"combo",storeId:"strVendorCode1"},
			{columnname:"Vendor’s Ref No",dataname:"VENDOR_REF_NO",datatype:"string",width:110,editControl:"textbox",storeId:"strVenRefNo1"},
			{columnname:"PO No",dataname:"PO_NUM",datatype:"string",width:80,editControl:"textbox",storeId:"strPONo1"},
			{columnname:"Logistic Group",dataname:"LOG_GROUP",datatype:"string",width:100,editControl:"combo",storeId:"strLogGroup1"},
			{columnname:"Division",dataname:"LOG_DIV",datatype:"string",width:80,editControl:"combo",storeId:"strDivCode1"},
			{columnname:"Pickup Date",dataname:"PICKUP_DATE",datatype:"string",width:80,editControl:"date"},
			{columnname:"Pickup Time",dataname:"PICKUP_TIME",datatype:"string",width:80,editControl:"time"},
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",width:80,editControl:"textbox"},
			{columnname:"Quantity",dataname:"QUANTITY",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"PO Line Item",dataname:"PO_LINE_ITEM",datatype:"string",width:100,editControl:"textbox",inputFormat:'integer'},
			{columnname:"Item Remarks",dataname:"ITEM_REMARKS",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"Actual Weight(tons)",dataname:"ACTUAL_TOT_WEIGHT",datatype:"string",width:120,editControl:"textbox",inputFormat:'numeric',weightPrecision:3}, //72106
			{columnname:"Cost Centre Code",dataname:"COST_CENTER_CODE",datatype:"string",width:120,editControl:"textbox"},
			{columnname:"Vehicle Category",dataname:"VEH_CAT",datatype:"string",width:100,editControl:"combo",storeId:"strVehCat1"},
			{columnname:"Loading Point",dataname:"LOAD_AT",datatype:"string",width:80,editControl:"combo",storeId:"strLoadAt1"},
			//{columnname:"Load At",dataname:"LOAD_AT",datatype:"string",width:80,editControl:"textbox",hidden:true},
			//{columnname:"Loading Point",dataname:"LOADING_POINT",datatype:"string",width:80,editControl:"combo",storeId:"strLoadingPoint1"},
			{columnname:"Unloading Point",dataname:"UNLOADING_POINT",datatype:"string",width:80,editControl:"combo",storeId:"strUnloadingPoint1"},
			{columnname:"Load Description",dataname:"LOAD_DESCRIPTION",datatype:"string",width:80,editControl:"textbox",storeId:"strLoadDescription1"},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:80,editControl:"textbox"},
			{columnname:"Load Inspection Required",dataname:"LOAD_INSPECTION",datatype:"string",width:120,editControl:"combo",storeId:"strLdInspReq1"},
			{columnname:"Vehicle Reg No",dataname:"VEH_REG_NO",datatype:"string",editControl:"textbox",width:140,helpid:'vehreghlp'},
			{columnname:"Demand Status",dataname:"DEMAND_STATUS",datatype:"string",width:100,editControl:"combo",storeId:"strDemandStatus1",hidden:true},
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:120,editControl:"textbox",hidden:true},
			{columnname:"Load Closure Date",dataname:"DELIVERY_DATE",datatype:"string",width:110,editControl:"date",hidden:true},
			{columnname:"Load Closure Time",dataname:"DELIVERY_TIME",datatype:"string",width:110,editControl:"time",hidden:true}
			
		]
		ExcelmaterialDetailsFetchPlan=
		{
			title:"Processed Request",
			id:"FetchexcelDetail",
			detail:ExcelMaterialDetailsGridFetchObj,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		var ExcelmaterialDetailsFetchPlanGridSection = plf.addGrid(ExcelmaterialDetailsFetchPlan,this)
		//69950
		
		//Add Child Sections
		mainpage.ptrMainSection.add(ItemBasedexcelColumn) 
		mainpage.ptrMainSection.add(ItemAction) 
		
		//mainpage.ptrMainSection.add(ExcelmaterialDetailsPlanGridSection)
		//69950
		var baseTab = plf.addTabSection({ tabs:[
												ExcelmaterialDetailsPlanGridSection,ExcelmaterialDetailsFetchPlanGridSection
												]});
		
		mainpage.ptrMainSection.add(baseTab)	
		//69950
		   
		//History Data Section 
		//mainpage.dataHistorySectionFlag=true;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
					"controlid":"",
					"tasktype":"onload",
					"service":"TMSCoreTransportTS",
					"methodName":"initItemBasedExcelTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Save",
					"input":["excelDetail","strAction"],
					"service":"TMSCoreTransportTS",
					"methodName":"createBulkItemTS"
			},
			{
				"controlid":"strAction",
				"tasktype":"onchange",
				"input":["strAction"],
				"service":"TMSCoreTransportTS",
				"methodName":"onchange_itemcargoActionExcel"
			}
		];
		
		mainpage.hlpLinks=
		{		
				"vehreghlp":
				{
					"hlpType":"grid",
					"gridID":"excelDetail",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}							
						   ],
					"receive":[
								{"parent":"VEH_REG_NO","child":"TRUCK_REG_NO"}								
							  ]
				}		
		}		
		//Event Handlers Mapping Ends

		this.callParent(arguments);
		
	}
});
