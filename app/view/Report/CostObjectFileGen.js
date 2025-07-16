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
Ext.define('CueTrans.view.Report.CostObjectFileGen', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Cost Object File Generation";		
		
		plf.columns=5
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"WBS Update","linkid":"jm_costcenterWBS","tooltip":"Click here for WBS Update."}
		]
		
		var ReportsColumn = plf.addColumnSection({});	
		
		var ReportsFormCtrl=							
		[	
			plf.addCombo({"label":"Month","id":"strDateType"}),
			plf.addButton({"label":"Process","id":"btnProcess"}),			
		    plf.addButton({"label":"Download File",id:"btnGenFile"}),
			plf.addButton({"label":"Rollback",id:"btnRollback"})			
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
			{columnname:"Load No.",dataname:"LOAD_NO",datatype:"string",width:150},		
			{columnname:"Load Date",dataname:"LOAD_DATE",datatype:"date",width:150},
			{columnname:"Load Origin",dataname:"ORIGIN",datatype:"string",width:150},			
			{columnname:"Load Destination",dataname:"DEST",datatype:"string",width:150},
			{columnname:"Shipment No.",dataname:"SHIPMENT_NO",datatype:"string",width:150},
			{columnname:"Shipment Status",dataname:"STATUS",datatype:"string",width:150},
			{columnname:"Shipment Origin",dataname:"SHIP_ORG",datatype:"string",width:150},
			{columnname:"Shipment Origin Region",dataname:"SHIP_ORG_REG",datatype:"string",width:150},
			{columnname:"Shipment Destination",dataname:"SHIP_DEST",datatype:"string",width:150},	
			{columnname:"Shipment Destination Region",dataname:"SHIP_DEST_REG",datatype:"string",width:170},	
			{columnname:"Shipment Weight(ton)",dataname:"SHIP_WEIGHT",datatype:"string",width:150,colAlign:'right',weightPrecision:3},
			{columnname:"Distance(KM)",dataname:"SHIP_DIST",datatype:"string",width:150,colAlign:'right'},
			{columnname:"Cost Object Number",dataname:"COST_OBJ",datatype:"string",width:150},
			{columnname:"Priority",dataname:"PRIORITY",datatype:"string",width:150},
			{columnname:"Contractual Delivery Date",dataname:"EXPECTED_DELIVERY_DT",datatype:"date",width:150},
			{columnname:"Changed Delivery Date",dataname:"CHANGED_DELIVERY_DT",datatype:"date",width:150},
			{columnname:"Actual Delivery Date",dataname:"ACTUAL_DELIVERY_DT",datatype:"date",width:150}			
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
		//mainpage.ptrMainSection.add(CostObjectGridSection);
		
		
		mainpage.eventHandlers = 
		[	
			{		 
				"controlid":"btnProcess",
				"tasktype":"btnclick",
				"input":["strDateType"],
				"service":"TMSCoreTransportTS", 
				"methodName":"ProcessCostObjSP"							
			},
			{		 
				"controlid":"btnGenFile",
				"tasktype":"btnclick",
				"input":["strDateType"],
				"service":"TMSCoreTransportTS", 
				"methodName":"GenerateCostObjViewer"							
			},
			{		 
				"controlid":"btnRollback",
				"tasktype":"btnclick",
				"input":["strDateType"],
				"service":"TMSCoreTransportTS", 
				"methodName":"RollbackCostObjGen"							
			},
			{		 
				"controlid":"btnGenPDF",
				"tasktype":"btnclick",
				"input":["strDateType"],
				"service":"CoreReportService", 
				"methodName":"GenerateCostObjpdfReport"							
			},			
			{		 
				"controlid":"btnGetDetail",
				"tasktype":"btnclick",
				"input":["strDateType"],
				"service":"CoreReportService", 
				"methodName":"GenerateCostObjFlatdtl"							
			},
			{ 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",//TMSCoreTransportTS
				"methodName":"InitCostObjectFlatSP"
			}			
					
		];		
			mainpage.screenLinks=
		{
			"jm_costcenterWBS":
				{
					"dest":"Report.NewCostObjectWBS",
					"hdr":[
							{"src":"","dest":""}
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}	
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
