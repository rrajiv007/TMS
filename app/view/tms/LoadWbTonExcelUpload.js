/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			       Remarks             
************************************************************************************************	
	                                   
************************************************************************************************/
Ext.define('CueTrans.view.tms.LoadWbTonExcelUpload', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Load Upload";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
			mainpage.toolbarActions= [
			{
                "name": "Bulk Load Waybill Tonnage Updation",
                "tooltip": "Click here to Load Waybill Tonnage Updation"
            }
			]
		//mainpage.toolbarActions=["Save"]
		
		//Add Keyfields
		mainpage.keyFields=[""]
		//Driver Master Section Begins
		plf.columns=4
		var ItemBasedexcelColumn = plf.addColumnSection({});
		//
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
				
		var ExcelMaterialDetailsGridFieldObj=
		[   
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:120},	//strLoadNo
			{columnname:"Actual weight (Ton)",dataname:"ACTUAL_TOT_WEIGHT",editControl:"textbox",inputFormat:'numeric',weightPrecision:3,width:120}, //strActualWeight
			{columnname:"Actual Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:120}, //strRemarks
		]
		 ExcelmaterialDetailsPlan=
		{
			title:"Load Details",
			id:"excelDetail",
			detail:ExcelMaterialDetailsGridFieldObj,
			visibleRow:15,
			removeExport:true,
			readonly:true,
			importTemplate:"excelTemplate/Bulk Ton Updation via Excel.xls"
		}
		ExcelmaterialDetailsPlanGridSection = plf.addGrid(ExcelmaterialDetailsPlan,this)	
		
		ExcelMaterialDetailsGridFetchObj=
		[   
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:120},	
			{columnname:"Departure Date",dataname:"PICKUP_DATE",datatype:"string",width:120},
			{columnname:"Departure Time",dataname:"PICKUP_TIME",datatype:"string",width:120},
			{columnname:"Vehicle Category",dataname:"VEH_CAT",datatype:"string",width:120},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:120},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:120},
			//{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:120},
			//{columnname:"Vehicle No",dataname:"VEH_REG_NO",datatype:"string"},
			//{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:120},
			{columnname:"Load Description",dataname:"LOAD_AT",datatype:"string",width:120},
			{columnname:"Load Inspection",dataname:"LOAD_INS",datatype:"string",width:120},//Raj uncommmented
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:120},
			{columnname:"Load At",dataname:"REQ_NAME",datatype:"string",width:120},
			{columnname:"Delivery At",dataname:"REQ_ID",datatype:"string",width:120}			
		]
		ExcelmaterialDetailsFetchPlan=
		{
			title:"Processed Load",
			id:"FetchexcelDetail",
			detail:ExcelMaterialDetailsGridFetchObj,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		ExcelmaterialDetailsFetchPlanGridSection = plf.addGrid(ExcelmaterialDetailsFetchPlan,this)	
		//Add Child Sections
		mainpage.ptrMainSection.add(ItemBasedexcelColumn) 
		
		//mainpage.ptrMainSection.add(ExcelmaterialDetailsPlanGridSection)
		//mainpage.ptrMainSection.add(ExcelmaterialDetailsFetchPlanGridSection)
		

		var baseTab = plf.addTabSection({ tabs:[
												ExcelmaterialDetailsPlanGridSection/*,ExcelmaterialDetailsFetchPlanGridSection*/
												]});
		
		mainpage.ptrMainSection.add(baseTab)
		
		//History Data Section 
		//mainpage.dataHistorySectionFlag=true;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
					"controlid":"",
					"tasktype":"onload",
					"service":"TMSCoreTransportTS",
					"methodName":"initLoadExcelUploadTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Bulk Load Waybill Tonnage Updation",
					"input":["excelDetail"],
					"service":"TMSCoreTransportTS",
					"methodName":"UpdateBulkLoadWBTonExcelTS"
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
								{"parent":"VEH_REG_NO","child":"TRUCK_CODE"}								
							  ]
				},
				"driverhlp":
				{
					"hlpType":"grid",
					"gridID":"excelDetail",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""}							
						   ],
					"receive":[
								{"parent":"DRIVER_CODE","child":"DRIVER_CODE"}								
							  ]
				},
				"lochlp":
				{
					"hlpType":"grid",
					"gridID":"excelDetail",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""}							
						   ],
					"receive":[
								{"parent":"COST_CENTER_CODE","child":"LOC_CODE"}								
							  ]
				}		
		}		
		//Event Handlers Mapping Ends

		this.callParent(arguments);
		
	}
});

//# sourceURL=https://coe.cuetrans.com/CueTransDemo/app/view/tms/LoadExcelUpload.js