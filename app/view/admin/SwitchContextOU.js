/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.SwitchContextOU', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.3;
		mainpage.popupWidthRatio=.3;		
		mainpage.startPainting();
		mainpage.screenName = "Switch OU and Role";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=false;
		//mainpage.toolbarActions=[""]
		
		//Add Keyfields
		mainpage.keyFields=["strOrgName"]
		
		//Location Header Section starts
		plf.columns=1
		var SwitchContextHdrColumn = plf.addColumnSection({title:""});
	         LocationFormCtrl=
		[ 
			//plf.addBlank(),
			plf.addCombo({"label":"Login Into",id:"strEntityType"}),
			plf.addCombo({"label":"Entity",id:"strOrgName"}),			
			plf.addCombo({"label":"Role",id:"strRoleIdFrom"}),			
			plf.addCombo({"label":"Language",id:"strLanguageCode"}),						
			plf.addButton({"label":"OK",id:"searchBtn",
			"handler": function() 
			{
						var ser_input_array = {};
						homeStoreValue="";
						ser_input_array["methodName"] = "OKBtnSwithContextTS";
						ser_input_array["strOrgName"] = mainpage.queryById("strOrgName").getValue();
						ser_input_array["strEntityType"] = mainpage.queryById("strEntityType").getValue();
						ser_input_array["strRoleIdFrom"] = mainpage.queryById("strRoleIdFrom").getValue();		
						//console.log(ser_input_array,"ser_input_array");
						var url_tmp = 'JMSServlet'
						 Ext.Ajax.request({
									url: url_tmp,									
									params: {

										workFlowName: "CoreAdminService",
										workFlowParams: Ext.JSON.encode(ser_input_array),
										"processType": "Screen",
										"AuthToken":hdnAuthToken
									},
									success: function(result) {
										
										console.log(homeStoreValue,"success");
										var response_data = Ext.JSON.decode(result.responseText);
										

										var in_json_data = Ext.JSON.decode(result.responseText);

										Ext.each(in_json_data["hdrcache"],
											function(hdrcache_obj) {
												for (var key in hdrcache_obj) {
													var attrName = key;													
													if (key == "ROLE_NAME") {
														plf.viewport.ptrNorthPanel.roleContainer.update(hdrcache_obj);
													}
													if (key == "ENTITY_NAME") {
														plf.viewport.ptrNorthPanel.entityContainer.update(hdrcache_obj);
													}
													if (key == "hdnAuthToken") {
														hdnAuthToken=hdrcache_obj[key];
													}
												}
											}
										)
										
										Ext.each
											(in_json_data["grid_array"],
												function(grid_array_obj)
												{
													for(var key in grid_array_obj)
													{
														var grid_id_key = key;
														var grid_id_value = grid_array_obj[key];
														console.log(grid_id_key,grid_id_value,"homeStoreValue");
														homeStoreValue =grid_id_value;
														
														
													}
												}
											)
										
										//homeStoreValue = in_json_data["consoleTransaction_array"]
										//console.log(homeStoreValue,"homeStoreValue");
										if (
											Ext.data.StoreManager.containsKey("homePageStore") //load grid store
											&&
											homeStoreValue != "" &&
											homeStoreValue != undefined
										) {
											var homePageStore = Ext.data.StoreManager.lookup("homePageStore")
											homePageStore.clearFilter();
											homePageStore.loadData(homeStoreValue, false);

											var masterIconCollection = homePageStore.queryBy(function(rec) {
												if (rec.data.entityType == 'master')
													return true;
											});

											var masterIconStore = Ext.data.StoreManager.lookup("masterIconStore")
											masterIconStore.clearFilter();
											masterIconStore.loadData(masterIconCollection.getRange(), false);											

											var transIconCollection = homePageStore.queryBy(function(rec) {
												if (rec.data.entityType == 'transaction')
													return true;
											});

											var transIconStore = Ext.data.StoreManager.lookup("transIconStore")
											transIconStore.clearFilter();
											transIconStore.loadData(transIconCollection.getRange(), false);

											var bpcIconCollection = homePageStore.queryBy(function(rec) {
												if (rec.data.entityType == 'bpc')
													return true;
											});

											var bpcIconStore = Ext.data.StoreManager.lookup("bpcIconStore")
											bpcIconStore.clearFilter();
											bpcIconStore.loadData(bpcIconCollection.getRange(), false);

											homePageStore.filterBy(function(rec) {
												if (rec.data.entityType != 'bpc')
													return true;
											});
										}

									},
									failure: function(result) {
										alert("failure");
										alert(result.responseText);
										form_obj.setLoading(false);
										// todo
									}
								});
						form_obj.setLoading(false);
						form_obj.removeAll();
						plf.viewport.ptrContentPanel.removeAll();
						plf.viewport.ptrContentPanel = Ext.create('CueTrans.view.common.ContentPanel')						
						plf.viewport.ptrContentPanel.setHeight(plf.screenHeight - plf.appMarginHeight)
						plf.viewport.ptrContentPanel.setWidth(plf.screenWidth)
						form_obj.add(plf.viewport.ptrContentPanel)					
						mainpage.ownerCt.close()
			}
			})
			]		
		SwitchContextHdrColumn.add(LocationFormCtrl);
		//Location Header Section Ends
		SwitchContextHdrColumn.add(plf.addStripLine({}));
		//Add Child Sections
		mainpage.ptrMainSection.add(SwitchContextHdrColumn)//Add Header Section to Main Page
		
		//History Data Section
		//mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		/*{
				"controlid":"",
				"tasktype":"onload",
				"input":["strLocCode"],
				"service":"CoreAdminService",
				"methodName":"initRoleTS"
			}*/
		{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreAdminService",
				"methodName":"initRoleTS"
				},
				{
				"controlid":"strEntityType",
				"tasktype":"onchange",
				"input":["strEntityType"],
				"service":"CoreAdminService",
				"methodName":"ONCHANGELOGININTOTS"
				}
		]		
		//Event Handlers Mapping Ends
		mainpage.hlpLinks=
		{
						
		}
 
		//Generate Screen Section
		//mainpage.generateScreen();
			mainpage.screenModes=
		{
			/*"open":
			{
				"enableAll":true,
				"except":["strLocCode"]  
			},
			"locked":
			{ 
				"enableAll":false,
				"except":["strLocCode"]
			},
			"active":
			{
				"enableAll":false,
				"except":["strLocCode"]
			}*/			
		}
		
		
	/*	Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
		
	}
});
