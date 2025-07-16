Ext.define('CueTrans.view.FXADMIN.ShipmentBoard', 
/****************************************************************************************************************
                                          Modification History                                                                                                                                                                                
****************************************************************************************************************               
Description            :                                                                                                                      
Author                :  FX
Version               :  1.0.0 

****************************************************************************************************************               
Version              Modified By      Date               Defect ID                 Remarks            
****************************************************************************************************************               
****************************************************************************************************************/
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Shipment Board";
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			//{"name":"Manage Shipments","linkid":"MANAGE_SHIPMENTS","tooltip":"Click here to manage shipments."},
			//{"name":"Manage Orders","linkid":"MANAGE_ORDERS","tooltip":"Click here to manage orders."}
		]		
		
		//Header Section starts
		plf.columns=4
		var hdrSection = plf.addCollapseSection({title:"Search Criteria"},this);
		
		
		var hdrSectionCtrl=
		[
			plf.addCombo({"label":"Status","id":"strStatus"})
		]
		
		hdrSection.add(hdrSectionCtrl);
		//Header Section Ends
		
		//Grid Section starts
		var GridObj=
		[		
			{columnname:"Shipment No",dataname:"SHIP_NO",datatype:"string",width:130,linkId:"NEXT_LINKID","linkType":"DYN","tooltip":"Click here to launch the screen."},
			{columnname:"Click here to launch the manage order.",dataname:"SHIP_LINK_ID",width:70,linkId:"MANAGE_ORDERS",imageURL:"resources/images/grid/Journey/Grid_Re_Create.png",hidden:true},
			{columnname:"Click here to launch the receive shipment.",dataname:"REC_LINK_ID",width:70,linkId:"RECEIVE_SHIPMENTS",imageURL:"resources/images/grid/Journey/Grid_Re_Create.png",hidden:true},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:130},
			{columnname:"Shipment Date",dataname:"SHIP_DATE",datatype:"string",width:100},
			{columnname:"Pickup Date/Time",dataname:"PICK_UP_DATE",datatype:"string",width:120},
			{columnname:"Customer Name",dataname:"CUST_NAME",datatype:"string",width:100},
			//{columnname:"Shipper Name",dataname:"SHIPPER_NAME",datatype:"string",width:100},
			{columnname:"From Region",dataname:"FROM_REGION",datatype:"string",width:90},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:120},
			{columnname:"To Region",dataname:"TO_REGION",datatype:"string",width:90},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:120},
			
          	{columnname:"Vehicle Reg.No",dataname:"VEH_REG_NO",datatype:"string",width:100},
			{columnname:"Vehicle Type",dataname:"VEH_TYPE",datatype:"string",width:80},
		    {columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:80},
			{columnname:"Driver Contact No",dataname:"DRIVER_NO",datatype:"string",width:130},
			{columnname:"Weight(tons)",dataname:"WEIGHT",datatype:"string",width:80},
			{columnname:"Volume(cum)",dataname:"VOLUME",datatype:"string",width:80},
			//{columnname:"Distance(km)",dataname:"DISTANCE",datatype:"string",width:80}			
		]
		var GridDetail=
		{
			title:"",
			id:"shippersummary",
			detail:GridObj,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true			
		}
		var GridSection = plf.addGrid(GridDetail,this)	
		//Grid Section Ends
			
		//adding the control to the mainpage
		mainpage.ptrMainSection.add(hdrSection)
		mainpage.ptrMainSection.add(GridSection) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		
			mainpage.eventHandlers = 
			[
				  
               {
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"FXCoreTS",
				"methodName":"FXPORTAL_INITSESHIPSUMTS"
		      },
			  {
				"controlid":"strStatus",
				"tasktype":"onchange",
				"input":["strStatus"],
				"service":"FXCoreTS",
				"methodName":"FXPORTAL_FETCHSESHIPSUMTS"
			},
			             
			];
	
		mainpage.screenLinks=
		{
				"CC_SHIPMENT":
				{
					"dest":"FXADMIN.CCShipments",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"SHIP_NO","dest":"strShipmentNo"}
							]
				},
				"MANAGE_SHIPMENT":
				{
					"dest":"FXADMIN.ManageShipments",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"SHIP_NO","dest":"strShipmentNo"}
							]
				},
				"VIEW_SHIPMENT":
				{
					"dest":"FEADMIN.ViewShipments",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"SHIP_NO","dest":"strShipmentNo"}
							]
				},
				"MANAGE_ORDERS":
				{
					"dest":"FEADMIN.ManageOrders",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"SHIP_NO","dest":"strShipmentNo"}
							]
				},
				"RECEIVE_SHIPMENTS":
				{
					"dest":"FXADMIN.DriverPOD",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"SHIP_NO","dest":"strShipmentNo"}
							]
				}
				
		}	
		
		this.callParent(arguments);
		
	
	}
});
