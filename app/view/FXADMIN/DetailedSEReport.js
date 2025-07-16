/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
	                                   
************************************************************************************************/
Ext.define('CueTrans.view.FXADMIN.DetailedSEReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Detailed SE Report";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		
		var ReportsColumn = plf.addColumnSection({});
		
		var ReportsFormCtrl=	
		[			
			plf.addText({"label":"Shipment #",id:"strShipmentNo"}),
			plf.addText({"label":"Waybill #",id:"strWaybillNo"}),
			plf.addText({"label":"Shipper Company",id:"strShipperCompanyName"}),
			plf.addCombo({"label":"Shipment Status","id":"strStatus"}),
			
			plf.addCombo({"label":"Origin Region","id":"strOriginRegion"}),
			plf.addCombo({"label":"Origin Location","id":"strOriginLocation"}),
			plf.addCombo({"label":"Destination Region","id":"strDestinationRegion"}),
			plf.addCombo({"label":"Destination Location","id":"strDestinationLocation"}),
			
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addDate({"label":"Date From",id:"dtFrom"}),
			plf.addDate({"label":"Date To",id:"dtTo"}),			
			plf.addText({"label":"Journey Plan #",id:"strJourneyPlanNo"}),
			plf.addCombo({"label":"Quarantined","id":"strQuarantined"})
			
			
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=3
		var ReportsButtonColumn = plf.addColumnSection({});	
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Show details","id":"getDetailedSEReport"}),
		  plf.addBlank()
		
		]
        DetailedSEReportGrid=
		[   
		{columnname:"Shipment #",dataname:"SHIPMENT_NO",datatype:"string",width:"auto"},
		{columnname:"Shipment Posted Date",dataname:"SHIPMENT_POSTED_DATE",datatype:"string",width:"auto"},
		{columnname:"Shipment Posted By",dataname:"SHIPMENT_POSTED_BY",datatype:"string",width:"auto"},
		{columnname:"Shipment Status",dataname:"SHIPMENT_STATUS",datatype:"string",width:"auto"},
		{columnname:"Shipper Company Name",dataname:"SHIPPER_COMPANY_NAME",datatype:"string",width:"auto"},
		{columnname:"Shipper Company Reg. No.",dataname:"SHIPPER_COMPANY_REG",datatype:"string",width:"auto"},
		{columnname:"Measuring Units",dataname:"MEASURING_UNITS",datatype:"string",width:"auto"},
		{columnname:"Item Description",dataname:"ITEM_DESCRIPTION",datatype:"string",width:"auto"},
		{columnname:"Quantity",dataname:"QUANTITY",datatype:"integer",width:"auto",colAlign:'right'},
		{columnname:"Package Type",dataname:"PACKAGE_TYPE",datatype:"string",width:"auto"},
		{columnname:"Outer Packaging Dimensions of each item (L*B*H)",dataname:"OUTER_PACKAGING_DIM",datatype:"string",width:200},
		{columnname:"Weight(ton)",dataname:"WEIGHT_IN_TON",datatype:"string",width:"auto",colAlign:'right',weightPrecision:3},
		{columnname:"Origin Region",dataname:"ORIGIN_REGION",datatype:"string",width:"auto"},
		{columnname:"Origin Location",dataname:"ORIGIN_LOCATION",datatype:"string",width:"auto"},
		{columnname:"Origin Address",dataname:"ORIGIN_ADDRESS",datatype:"string",width:"auto"},
		
		{columnname:"Pickup Date/Time",dataname:"PICKUP_DATE_TIME",datatype:"string",width:"auto"},
		{columnname:"Pickup - Contact Name",dataname:"PICKUP_CONTACT_NAME",datatype:"string",width:"auto"},
		{columnname:"Pickup - Contact Number",dataname:"PICKUP_CONTACT_NUMBER",datatype:"string",width:"auto"},
		
		{columnname:"Destination Region",dataname:"DESTINATION_REGION",datatype:"string",width:"auto"},
		{columnname:"Destination Location",dataname:"DESTINATION_LOCATION",datatype:"string",width:"auto"},
		{columnname:"Destination Address",dataname:"DESTINATION_ADDRESS",datatype:"string",width:"auto"},
		
		{columnname:"Delivery - Contact Name",dataname:"DELIVERY_CONTACT_NAME",datatype:"string",width:"auto"},
		{columnname:"Delivery - Contact Number",dataname:"DELIVERY_CONTACT_NUMBER",datatype:"string",width:"auto"},
		
		{columnname:"Freight Cost(OMR)",dataname:"FREIGHT_COST_OMR",datatype:"string",width:"auto",colAlign:'right',weightPrecision:3},
		{columnname:"Loading Cost(OMR)",dataname:"LOADING_COST_OMR",datatype:"string",width:"auto",colAlign:'right',weightPrecision:3},
		{columnname:"Unloading Cost(OMR)",dataname:"UNLOADING_COST_OMR",datatype:"string",width:"auto",colAlign:'right',weightPrecision:3},
		{columnname:"Insurance Cost(OMR)",dataname:"INSURANCE_COST_OMR",datatype:"string",width:"auto",colAlign:'right',weightPrecision:3},
		{columnname:"Total Cost(OMR)",dataname:"TOTAL_COST_OMR",datatype:"string",width:"auto",colAlign:'right',weightPrecision:3},
		
		{columnname:"Waybill #",dataname:"WAYBILL_NO",datatype:"string",width:"auto"},
		{columnname:"Journey Plan #",dataname:"JOURNEY_PLAN_NO",datatype:"string",width:"auto"},
		{columnname:"Delivered Date/Time",dataname:"DELIVERED_DATE_TIME",datatype:"string",width:"auto"},
		{columnname:"POD Date/Time",dataname:"POD_DATE_TIME",datatype:"string",width:"auto"},
		
		{columnname:"POD By",dataname:"POD_BY",datatype:"string",width:"auto"},
		{columnname:"POD Details",dataname:"POD_DETAILS",datatype:"string",width:"auto"},
		{columnname:"Quarantined",dataname:"QUARANTINED",datatype:"string",width:"auto"},
		{columnname:"Quarantined Resolution Remarks",dataname:"QUARANTINED_RESOL_REMARKS",datatype:"string",width:"auto"}
		
		]
		DetailedSEReportDetails=
		{
			title:"",
			id:"DetailedSEReport",
			detail:DetailedSEReportGrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		DetailedSEReportSection = plf.addGrid(DetailedSEReportDetails,this)		
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(DetailedSEReportSection)
		
			
		mainpage.eventHandlers = 
		[	
        	
			{ 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"FXCoreTS",
				"methodName":"FXPORTAL_INITDETAILSEDRPTTMS"
			},
			{		 
				"controlid":"getDetailedSEReport",
				"tasktype":"btnclick",
				"input":["strShipmentNo","strDateType","strStatus","strShipperCompanyName","strOriginRegion","strOriginLocation","strDestinationRegion",
				         "strDestinationLocation","strWaybillNo","strJourneyPlanNo","dtFrom","dtTo","strQuarantined"
						],
				"service":"FXCoreTS",
				"methodName":"FXPORTAL_GETDETAILSEDRPTTMS"
							
			},
            {
				"controlid":"strOriginRegion",
				"tasktype":"onchange",
				"input":["strOriginRegion"],
				"service":"FXCoreTS",
				"methodName":"FXPORTAL_ONCHANGEORGRPTREGTS"	
            },
            {
				"controlid":"strDestinationRegion",
				"tasktype":"onchange",
				"input":["strDestinationRegion"],
				"service":"FXCoreTS",
				"methodName":"FXPORTAL_ONCHANGEDESTRPTREGTS"	
            }			
		];
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
