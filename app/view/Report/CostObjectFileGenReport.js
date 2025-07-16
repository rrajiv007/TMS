/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :CUTRANS
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.Report.CostObjectFileGenReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Cost Object File Report";		
		
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			
		]
		
		var ReportsColumn = plf.addColumnSection({});	
		
		var ReportsFormCtrl=							
		[	
			plf.addCombo({"label":"Region",id:"strRegion"}),
			plf.addCombo({"label":"Hub",id:"strHub"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity"}),
			plf.addText({"label":"Requester ID",id:"strRequestorId"}),
			plf.addText({"label":"DO No",id:"strDocNo"}),
			plf.addText({"label":"Shipment No",id:"strShipmentNoFrom"}),
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			plf.addText({"label":"WBS No",id:"strWBSNo"}),
			plf.addText({"label":"Vehicle No",id:"strVehicleCodeFrom"}),
			plf.addCombo({"label":"Shipment Type",id:"strInspectionNoFrom"}),
			plf.addCombo({"label":"Carrier Code",id:"strCarrierCode"}),
			plf.addCombo({"label":"Process Period","id":"strDateType"}),
			plf.addCombo({"label":"Date Type","id":"strVehicleType"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"}),
			plf.addButton({"label":"Get Details","id":"btnGetDetail"}),		    
			plf.addButton({"label":"Generate PDF",id:"btnGenPDF"})
		]
		
		ReportsColumn.add(ReportsFormCtrl);	
		/*
		var DtsGridFieldObj=			//69997
		[
			{columnname:"Data",dataname:"DATA",datatype:"string",width:800}
	
		]
		var DtsGridDtl=					//69997
		{
			title:"",
			id:"COSTOBJ_FLAT",
			detail:DtsGridFieldObj,			
			removeAddDelete:true,
			visibleRow:15,
			removePaging:true,
			readonly:true,
			removeFilter:true
		}
		var DtsGridSection = plf.addGrid(DtsGridDtl,this)			
		*/
		var CostObjectgrid=
		[   
			{columnname:"DO No",dataname:"DO_NO",datatype:"string",width:150},	
			{columnname:"Load No.",dataname:"LOAD_NO",datatype:"string",width:150},		
			{columnname:"Load Date",dataname:"LOAD_DATE",datatype:"string",width:150},
			/*{columnname:"Load Origin",dataname:"ORIGIN",datatype:"string",width:150},			
			{columnname:"Load Destination",dataname:"DEST",datatype:"string",width:150},	*/					
			{columnname:"Requester ID",dataname:"REQ_ID",datatype:"string",width:130},	
			{columnname:"Requester Name",dataname:"REQ_NAME",datatype:"string",width:130},
			{columnname:"Shipment No.",dataname:"SHIPMENT_NO",datatype:"string",width:150},	
			{columnname:"Origin",dataname:"SHIP_ORG",datatype:"string",width:150},
			{columnname:"Origin Region",dataname:"SHIP_ORG_REG",datatype:"string",width:150},
			{columnname:"Origin Location Type",dataname:"SHIP_ORG_TYPE",datatype:"string",width:150},
			{columnname:"Destination",dataname:"SHIP_DEST",datatype:"string",width:150},	
			{columnname:"Destination Region",dataname:"SHIP_DEST_REG",datatype:"string",width:170},	
			{columnname:"Destination Location Type",dataname:"SHIP_DEST_TYPE",datatype:"string",width:170},				
			{columnname:"Shipment Type",dataname:"PRIORITY",datatype:"string",width:150},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:150},			
			{columnname:"WBS No",dataname:"COST_OBJ",datatype:"string",width:150},
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:150},
			{columnname:"Vehicle No",dataname:"VEH_CODE",datatype:"string",width:150},
			{columnname:"Shipment Weight(ton)",dataname:"SHIP_WEIGHT",datatype:"string",width:150,colAlign:'right',weightPrecision:3},
			{columnname:"Distance(KM)",dataname:"SHIP_DIST",datatype:"string",width:150,colAlign:'right'},
			{columnname:"Tonkm",dataname:"TON_KM",datatype:"string",width:150,colAlign:'right'},
			{columnname:"Created Date",dataname:"CREATED_DT",datatype:"string",width:150},
			{columnname:"Expected Delivery Date",dataname:"ACTUAL_DELIVERY_DT",datatype:"string",width:150},
			{columnname:"Changed Delivery Date",dataname:"CHANGED_DELIVERY_DT",datatype:"string",width:150},
			{columnname:"Delivered Date",dataname:"EXPECTED_DELIVERY_DT",datatype:"string",width:150}		
				
		]
		var CostObjectgriddetails=
		{
			title:"Details",
			id:"CostObjectdtl",
			detail:CostObjectgrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		CostObjectGridSection = plf.addGrid(CostObjectgriddetails,this)

		
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(CostObjectGridSection);
		
		
		mainpage.eventHandlers = 
		[	
			
			{		 
				"controlid":"btnGenPDF",
				"tasktype":"btnclick",
				"input":["strRegion","strHub","strOrigin","strDestination","strCommodity","strRequestorId","strDocNo","strShipmentNoFrom","strLoadNoFrom","strWBSNo",
					    "strVehicleCodeFrom","strInspectionNoFrom","strCarrierCode","strDateType","strVehicleType","dtDateFrom","dtDateTo"],
				"service":"CoreReportService", 
				"methodName":"GenerateCostObjpdfReport"							
			},			
			{		 
				"controlid":"btnGetDetail",
				"tasktype":"btnclick",
				"input":["strRegion","strHub","strOrigin","strDestination","strCommodity","strRequestorId","strDocNo","strShipmentNoFrom","strLoadNoFrom","strWBSNo",
						"strVehicleCodeFrom","strInspectionNoFrom","strCarrierCode","strDateType","strVehicleType","dtDateFrom","dtDateTo"],
				"service":"CoreReportService", 
				"methodName":"GenerateCostObjFlatdtl"							
			},
			{ 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitCostObjectFlatSP"
			}			
					
		];		
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
