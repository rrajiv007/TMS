/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var     		                                   
************************************************************************************************/
Ext.define('CueTrans.view.tms.LoadBuilding', 

{ 
extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Load Planning";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create a load."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a load."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a load."
            },
            {
                "name": "Confirm",
                "tooltip": "Click here to confirm a load."
            },
            {
                "name": "Short Close",
                "tooltip": "Click here to short close a load."
            },
			{
                "name": "Print",
                "tooltip": "Click here to print the waybill."
            } 
            ]
	//	mainpage.toolbarActions=["Refresh","Create","Edit","Delete","Confirm","ShortClose","Print"]
		
		//Add Keyfields
		//mainpage.keyFields=["strUserType"]
		//LoadBuilding Section  Section Begins
		plf.columns=4
		var LoadBuildingColumn = plf.addColumnSection({});
		if(plf.defaultLayout==3)
		{
			plf.columns=3
			
			var LoadBuildingCtrl=
			[	
				plf.addHlpText({"label":"Load No",id:"strLoadNo",hlpLinkID:"LoadNo"},this),
				plf.addDate({"label":"Date",id:"dtLoadDate","mandatory":"true"}),
				//plf.addText({"label":"Time",id:"tmLoadTime"}),
				plf.addDisplayOnly({"label":"Demand Status",id:"strDemandStatus"}),  
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				
				//plf.addHlpText({"label":"Route Code",id:"strRouteCode","mandatory":"true",hlpLinkID:"routecode"},this),
				//plf.addDisplayOnly({"label":"Route Desc",id:"strRouteDesc"}),
				//plf.addCombo({"label":"From Location",id:"strOrigin","mandatory":"true"}),
				//plf.addCombo({"label":"To Location",id:"strDestination","mandatory":"true"}),
			//	plf.addCombo({"label":"Commodity",id:"strCommodity","mandatory":"true"}),
				
				plf.addDisplayOnly({"label":"Vehicle Capacity",id:"strVehicleCapacity","mandatory":"true"}),
                            plf.addDisplayOnly({"label":"Total Weight",id:"strTotShipWeight","mandatory":"true"}),
                            plf.addDisplayOnly({"label":"Utilization %",id:"strUtilization"}),
                          
				plf.addTextArea({"label":"Journey Legs",id:"strJourneyLegs",height:100,width:500,readOnly:true})
			]
		
		}
		
		else
		{
		LoadBuildingCtrl=
			[	
				plf.addHlpText({"label":"Load No",id:"strLoadNo",hlpLinkID:"LoadNo"},this),
				plf.addDate({"label":"Date",id:"dtLoadDate","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Demand Status",id:"strDemandStatus"}),                
				//plf.addText({"label":"Time",id:"tmLoadTime"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				//plf.addHlpText({"label":"Route Code",id:"strRouteCode","mandatory":"true",hlpLinkID:"routecode"},this),
				//plf.addDisplayOnly({"label":"Route Desc",id:"strRouteDesc"}),
				//plf.addCombo({"label":"From Location",id:"strOrigin","mandatory":"true"}),
				//plf.addCombo({"label":"To Location",id:"strDestination","mandatory":"true"}),
				//plf.addCombo({"label":"Commodity",id:"strCommodity","mandatory":"true"}),
				plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Vehicle Capacity",id:"strVehicleCapacity",}),
                plf.addDisplayOnly({"label":"Total Weight",id:"strTotShipWeight"}),
                plf.addDisplayOnly({"label":"Utilization %",id:"strUtilization"}),
				//plf.addTextArea({"label":"Journey Legs",id:"strJourneyLegs",height:90,width:500,readOnly:true})
				
			]
		
		}
		LoadBuildingColumn.add(LoadBuildingCtrl);
		
		//LoadBuilding detail Section Ends
		
		
		
		
		
		
		
		
		//Plan Details Section Begins
		plf.columns=4
		
		//unmappedShipmentDetails = plf.addFieldSet({title:""})
		var unmappedShipmentDetails = plf.addCollapseSection({title:"Shipments Search",collapsed: true});
		var unmappedShipmentsFormCtrl=
		[
			plf.addCombo({"label":"From Location",id:"strOrigin","mandatory":"true"}),
			plf.addCombo({"label":"To Location",id:"strDestination","mandatory":"true"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity","mandatory":"true"}),
			plf.addDate({"label":"Delivery Date","id":"dtPickUpDateTime"}),

			plf.addText({"label":"Request No","id":"strRequestNo"}),
			plf.addText({"label":"Shipment No From","id":"strShippmentNoFrom"}),
			plf.addText({"label":"Shipment No To","id":"strShippmentNoTo"}),
			plf.addCombo({"label":"Shipment Priority","id":"strPriority"}),
			plf.addBlank(),

			
			plf.addBlank(),
			plf.addBlank(),			
			plf.addButton({"label":"Search",id:"btnSearch"}),
			plf.addBlank()
			
		]
		unmappedShipmentDetails.add(unmappedShipmentsFormCtrl);
		//Plan Details  Section Ends
		
		/*Drag and Drop Features Starts Here*/
		/*Drag and Drop Features Ends Here*/
		var dvTpl = new Ext.XTemplate(
			'<tpl for=".">',
				'<div class="emplWrap" >',					
				'<table><tr><td width:50>',
				 '<img src="resources/images/dataview/shipment.jpg"/>',
				  '</td><td>',
				  '<span>{UN_SHIPMENT_NO},{UN_ORIGIN}-{UN_DESTINATION},{UN_WEIGHT}(ton),{UN_VOLUME}(cu.m)</span>',
			//	  '<b><span>Shipment No:{UN_SHIPMENT_NO}</span></b>',
			//	  '<br/><span>{UN_ORIGIN}-{UN_DESTINATION},Weight:{UN_WEIGHT},Volume:{UN_VOLUME}</span>',
				  //'<br/><span>{UN_DESTINATION}</span>',
				  //'<br/><span>Weight:{UN_WEIGHT}</span>',
				  //'<br/><span>Volume:{UN_VOLUME}</span>',
				 // '<br/><span>Status:{UN_DEMAND_STATUS}</span>',	
				  '</td></tr></table>',
				'</div>',
			'</tpl>'
		);
		
		Ext.define('unmappedShipGrid_model', 
			{
				extend: 'Ext.data.Model',
				requires: ['Ext.data.identifier.Sequential'],
				idProperty: 'id',
				identifier:'sequential',
				fields: ['UN_SHIPMENT_NO', 'UN_ORIGIN', 'UN_DESTINATION','UN_WEIGHT','UN_VOLUME','UN_DEMAND_STATUS']			
			});		
		Ext.create("Ext.data.Store",
					{
						storeId:'unmappedShipGrid_store',
						model:'unmappedShipGrid_model'						
					})
					
		var UnMappedShip = new Ext.DataView({
        tpl           : dvTpl,
        store         : Ext.data.StoreManager.lookup('unmappedShipGrid_store'),
        loadingText   : 'loading..',
        multiSelect   : true,		
        //overCls     : 'emplOver',
		itemId		  : 'unmappedShipGrid',
        selectedItemCls : 'emplSelected',
        itemSelector  : 'div.emplWrap',
        //emptyText     : 'No employees on staff.',
        style         : 'overflow:auto;'
		});
		
		Ext.define('mappedShipGrid_model', 
			{
				extend: 'Ext.data.Model',
				requires: ['Ext.data.identifier.Sequential'],
				idProperty: 'id',
				identifier:'sequential',
				fields: ['UN_SHIPMENT_NO', 'UN_ORIGIN', 'UN_DESTINATION','UN_WEIGHT','UN_VOLUME','UN_DEMAND_STATUS']			
			});		
		Ext.create("Ext.data.Store",
					{
						storeId:'mappedShipGrid_store',
						model:'mappedShipGrid_model'						
					})
					
		var MappedShip = new Ext.DataView({
        tpl           : dvTpl,
        store         : Ext.data.StoreManager.lookup('mappedShipGrid_store'),
        loadingText   : 'loading..',
        multiSelect   : true,		
		itemId		  : 'mappedShipGrid',
        //overCls     : 'emplOver',
        selectedItemCls : 'emplSelected',
        itemSelector  : 'div.emplWrap',
        //emptyText     : 'No employees on staff.',
        style         : 'overflow:auto;'
		});
		UnMappedShip.on('render', function(v) {
		UnMappedShip.dragZone = new Ext.dd.DragZone(v.getEl(), {
			//      On receipt of a mousedown event, see if it is within a DataView node.
			//      Return a drag data object if so.
					getDragData: function(e) {

			//          Use the DataView's own itemSelector (a mandatory property) to
			//          test if the mousedown is within one of the DataView's nodes.
						var sourceEl = e.getTarget(v.itemSelector, 10);

			//          If the mousedown is within a DataView node, clone the node to produce
			//          a ddel element for use by the drag proxy. Also add application data
			//          to the returned data object.
						if (sourceEl) {
							var selectedNodes = v.getSelectedNodes();
							var dragDropEl = document.createElement('div');
							 if (selectedNodes.length < 1) {
								selectedNodes.push(sourceEl);
							}
							 Ext.each(selectedNodes, function(node) {
							dragDropEl.appendChild(node.cloneNode(true));
							});
							
							d = sourceEl.cloneNode(true);
							d.id = Ext.id();
							return {
								ddel           : dragDropEl,
								sourceEl: sourceEl,
								repairXY: Ext.fly(sourceEl).getXY(),
								sourceStore: v.store,
								draggedRecord: v.getSelectionModel().getSelection()/*v.getRecord(sourceEl)*/
							}
						}
					},

			//      Provide coordinates for the proxy to slide back to on failed drag.
			//      This is the original XY coordinates of the draggable element captured
			//      in the getDragData method.
			getRepairXY: function() {
				return this.dragData.repairXY;
			}
		});
		});

		MappedShip.on('render', function(v) {
		MappedShip.dragZone = new Ext.dd.DragZone(v.getEl(), {
			//      On receipt of a mousedown event, see if it is within a DataView node.
			//      Return a drag data object if so.
					getDragData: function(e) {

			//          Use the DataView's own itemSelector (a mandatory property) to
			//          test if the mousedown is within one of the DataView's nodes.
						var sourceEl = e.getTarget(v.itemSelector, 10);

			//          If the mousedown is within a DataView node, clone the node to produce
			//          a ddel element for use by the drag proxy. Also add application data
			//          to the returned data object.
						if (sourceEl) {
							var selectedNodes = v.getSelectedNodes();
							var dragDropEl = document.createElement('div');
							 if (selectedNodes.length < 1) {
								selectedNodes.push(sourceEl);
							}
							 Ext.each(selectedNodes, function(node) {
							dragDropEl.appendChild(node.cloneNode(true));
							});
							
							d = sourceEl.cloneNode(true);
							d.id = Ext.id();
							return {
								ddel           : dragDropEl,
								sourceEl: sourceEl,
								repairXY: Ext.fly(sourceEl).getXY(),
								sourceStore: v.store,
								draggedRecord: v.getSelectionModel().getSelection()/*v.getRecord(sourceEl)*/
							}
						}
					},

			//      Provide coordinates for the proxy to slide back to on failed drag.
			//      This is the original XY coordinates of the draggable element captured
			//      in the getDragData method.
			getRepairXY: function() {
				return this.dragData.repairXY;
			}
		});
		});	
		MappedShip.on('render', function(v) {
		MappedShip.dropZone = new Ext.dd.DropZone(v.getEl(), 
		{
			onContainerDrop : function(dropZone, evtObj, dragData) {	
			
			var dragRecords = dragData.draggedRecord;
			var store = v.store;	
			console.log(dragRecords);		
			Ext.each(dragRecords, function(record) {				
				   dragData.sourceStore.remove(record);
				});
			v.store.add(dragRecords);                
			return true;
				
			}
		});})
		UnMappedShip.on('render', function(v) {
		UnMappedShip.dropZone = new Ext.dd.DropZone(v.getEl(), 
		{
			onContainerDrop : function(dropZone, evtObj, dragData) {	
			
			var dragRecords = dragData.draggedRecord;
			var store = v.store;	
			console.log(dragRecords);		
			Ext.each(dragRecords, function(record) {				
				   dragData.sourceStore.remove(record);
				});
			v.store.add(dragRecords);                
			return true;
				
			}
		});})
		/*
		Ext.data.StoreManager.lookup('unmappedShipGrid_store').loadData([
				{ UN_SHIPMENT_NO : "SHIPREQ/00110", UN_ORIGIN : "Dubai", UN_DESTINATION : "Adam",UN_WEIGHT: "1600",UN_VOLUME: "150",UN_DEMAND_STATUS: "Planned" },
				{ UN_SHIPMENT_NO : "SHIPREQ/00111", UN_ORIGIN : "Nimr", UN_DESTINATION : "Adam",UN_WEIGHT: "3200",UN_VOLUME: "450",UN_DEMAND_STATUS: "Planned" },
				{ UN_SHIPMENT_NO : "SHIPREQ/00112", UN_ORIGIN : "Fahud", UN_DESTINATION : "Nimr" ,UN_WEIGHT: "4200",UN_VOLUME: "350",UN_DEMAND_STATUS: "Planned"},
				{ UN_SHIPMENT_NO : "SHIPREQ/00113", UN_ORIGIN : "Vellore", UN_DESTINATION : "Tambaram" ,UN_WEIGHT: "1600",UN_VOLUME: "230",UN_DEMAND_STATUS: "Planned"} 				
				],false);
		Ext.data.StoreManager.lookup('mappedShipGrid_store').loadData([
				{ UN_SHIPMENT_NO : "SHIPREQ/00115", UN_ORIGIN : "Dubai", UN_DESTINATION : "Adam" ,UN_WEIGHT: "2700",UN_VOLUME: "1200`",UN_DEMAND_STATUS: "Planned"} ,
				{ UN_SHIPMENT_NO : "SHIPREQ/00116", UN_ORIGIN : "Nimr", UN_DESTINATION : "Dubai",UN_WEIGHT: "1200",UN_VOLUME: "120",UN_DEMAND_STATUS: "Planned" },
				{ UN_SHIPMENT_NO : "SHIPREQ/00117", UN_ORIGIN : "Vellore", UN_DESTINATION : "Tambaram",UN_WEIGHT: "3520",UN_VOLUME: "2100",UN_DEMAND_STATUS: "Planned" },
				{ UN_SHIPMENT_NO : "SHIPREQ/00118", UN_ORIGIN : "Fahud", UN_DESTINATION : "Nimr",UN_WEIGHT: "2000",UN_VOLUME: "800",UN_DEMAND_STATUS: "Planned" },
				{ UN_SHIPMENT_NO : "SHIPREQ/00119", UN_ORIGIN : "Adam", UN_DESTINATION : "Dubai",UN_WEIGHT: "1000",UN_VOLUME: "186",UN_DEMAND_STATUS: "Planned" } 						
				],false);
		*/
		var displayPanel = Ext.create('Ext.Panel', {
		columnWidth        : 1,
		height       : 300,
		layout       : {
			type: 'hbox',
			align: 'stretch',
			padding: 5
		},
		//renderTo : Ext.getBody(),
		defaults     : { flex : 1 }, //auto stretch
		items         :  [

			{
				title  : 'Shipments to be Processed',
				frame  : true,
				layout : 'fit',
				items  : UnMappedShip,
				flex   : 1
			},
			{
				title  : 'Shipments Assigned to Load',
				frame  : true,
				layout : 'fit',
				id     : "test",
				items  : MappedShip,
				flex   : 1
			}
		]
		
		});		
		unmappedView = plf.addColumnSection({title:""});
		/*Drag and Drop Features Ends Here*/
		unmappedView.add(displayPanel);
		//unmappedShipmentDetails.add(unmappedView);
				
		mainpage.ptrMainSection.add(LoadBuildingColumn) //Add Load Building Column Section to Main Page
		mainpage.ptrMainSection.add(unmappedShipmentDetails) //Add Unmapped Grid Section to Main Page
		mainpage.ptrMainSection.add(unmappedView)
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strLoadNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"initLoadBasedTS"
		},	
		{
				"controlid":"strLoadNo",
				"tasktype":"onenter",
				"input":["strLoadNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchLoadNoTS"
		},		
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strLoadNo","dtLoadDate","tmLoadTime","strStatus","strOrigin","strDestination","strCommodity",
				"strDemandStatus","strVehicleCategory","mappedShipGrid","strCreatedBy","dtCreatedDate","strRouteCode",
					"strRouteDesc","dtPickUpDateTime"],
				"service":"TMSCoreTransportTS",
				"methodName":"createLoadBasedTS"
		},
		{       
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["dtLoadDate","tmLoadTime","strOrigin","strDestination","strCommodity","strShippmentNoFrom",
				"strShippmentNoTo","strPriority","strRouteCode",
					"strRouteDesc","dtPickUpDateTime","strRequestNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchAllLoadBasedTS"
		},/*
		{       
				"controlid":"btnMove",
				"tasktype":"btnclick",
				"input":["strLoadNo","unmappedShipGrid","mappedShipGrid"],
				"service":"TMSCoreTransportTS",
				"methodName":"createLoadBasedUnmappedTS"
		},*/
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strLoadNo","dtLoadDate","tmLoadTime","strStatus","strOrigin","strDestination","strCommodity",
				"strDemandStatus","strVehicleCategory","mappedShipGrid","strModifiedBy","dtModifiedDate","strRouteCode",
					"strRouteDesc","dtPickUpDateTime"],
				"service":"TMSCoreTransportTS",
				"methodName":"editLoadBasedTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["mappedShipGrid","strLoadNo","dtLoadDate","tmLoadTime","strStatus","strOrigin","strDestination",
				"strCommodity","strDemandStatus","strVehicleCategory","mappedShipGrid","strRouteCode",
					"strRouteDesc","dtPickUpDateTime"],
				"service":"TMSCoreTransportTS",
				"methodName":"authorizeLoadBasedTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strLoadNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"deleteLoadBasedTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"ShortClose",
				"input":["strLoadNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"shortcloseLoadBasedTS"
		},
              {
				"controlid":"strVehicleCategory",
				"tasktype":"onchange",
				"input":["strVehicleCategory"],
				"service":"TMSCoreTransportTS",
				"methodName":"onchangeVehicleCatTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print",
				"input":["strRequestNoFrom","strRequestNoTo","strShipmentNoFrom","strShipmentNoTo",
                                     "strLoadNoFrom","strLoadNoTo","dtDateFrom","dtDateTo","strLocationCode","strRegion","strPriority","strCarrierCode","strCustomerCode"],
				"service":"CoreReportService",
				"methodName":"PrintwaybillReport"
		}/*,
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
					"hlpScreen":"tms.LoadBuildingHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strLoadNo","child":"LOAD_NO"}
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
		//Help link ends		
		
		
		//Generate Screen Section
		this.callParent(arguments);
		
	}
});


