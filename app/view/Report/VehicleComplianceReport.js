/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.Report.VehicleComplianceReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Vehicle Compliance Report";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		/*
		mainpage.toolbarLinks=
		[
			{"name":"Operational Reports","linkid":"operation_rpt"},
			{"name":"Statistical Reports","linkid":"rep_streports"}
		]
		*/
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var ReportsColumn = plf.addColumnSection({});	//69997
		
		var ReportsFormCtrl=							//69997
		[		
			plf.addCombo({"label":"Vehicle Document",id:"strVehicleDoc"}),
			plf.addText({"label":"Vehicle Code",id:"strVehicleCodeFrom"}),
			plf.addText({"label":"Vehicle Registration",id:"strVehicleNo"}),
			plf.addCombo({"label":"Status","id":"strInspectionNoFrom"}),
			plf.addCombo({"label":"Vehicle Type",id:"strVehicleTypes"}),
			plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory"}),
			plf.addCombo({"label":"Vehicle Availability",id:"strVehicleAvailability"}),
			plf.addCombo({"label":"Region",id:"strRegion"}),
			plf.addCombo({"label":"Carrier Code",id:"strCarrierCode"}),
			plf.addDate({"label":"Expiry On",id:"dtDateFrom"}),
			/*
			plf.addHidden({"label":"Expiry From",id:"dtDateFrom"}),
			plf.addHidden({"label":"Expiry To",id:"dtDateTo"})
			*/
		

		/*	
			plf.addText({"label":"Request No",id:"strRequestNoFrom"}),
			plf.addText({"label":"Shipment No",id:"strShipmentNoFrom"}),
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			plf.addText({"label":"Journey Plan No",id:"strJourneyNoFrom"}),
			plf.addText({"label":"Inspection No",id:"strInspectionNoFrom"}),
			plf.addCombo({"label":"Region",id:"strRegion"}),
			plf.addCombo({"label":"Origin",id:"strRequestNoTo"}),
			plf.addCombo({"label":"Destination",id:"strShipmentNoTo"}),
			plf.addCombo({"label":"Priority",id:"strPriority"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity"}), 
			plf.addText({"label":"Carrier Code",id:"strCarrierCode"}),
			plf.addText({"label":"Driver Code",id:"strDriverCodeFrom"}),
			plf.addText({"label":"Vehicle Code",id:"strVehicleCodeFrom"}),
			plf.addText({"label":"DO No",id:"strInspectionNoTo"}),			
			plf.addCombo({"label":"Logistics Group","id":"strLoadNoTo"}),
			plf.addCombo({"label":"Status","id":"strLocation"}),
			plf.addCombo({"label":"Date Type","id":"strJourneyNoTo"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"})
			*/
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({});	//69997
		ReportsFormCtrl=
		[ 
		  plf.addButton({"label":"Show Details",id:"getvehcomp"}),
		  plf.addButton({"label":"Generate PDF",id:"vehcomp"}),
		  plf.addBlank()
		
		]	
		
		Vehiclecomplgrid=
		[   
		{columnname:"Vehicle Code",dataname:"VEH_CODE",datatype:"string",width:150},
		{columnname:"Vehicle Name",dataname:"VEH_DESC",datatype:"string",width:150},
		{columnname:"Vehicle Registration",dataname:"TRUCK_REG_NO",datatype:"string",width:150},
		{columnname:"Vehicle Type",dataname:"VEH_TYPE_DESC",datatype:"string",width:150},
		{columnname:"Vehicle Category",dataname:"VEH_CAT_DESC",datatype:"string",width:150},
		{columnname:"Vehicle Availability",dataname:"VEHICLE_AVAILABILITY",datatype:"string",width:150},
		{columnname:"Base region",dataname:"REGION",datatype:"string",width:150},
		{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:150},		
		
		{columnname:"Mulkiya Expiry",dataname:"hdnH2S",datatype:"string",hidden:true},
			{columnname:"Mulkiya Expiry",dataname:"H2S_EXP",datatype:"string",width:150
				,renderer:function(value, metadata, record) {
					if (record.get('hdnH2S') == '1'){
						metadata.tdCls = metadata.tdCls +"expiryCell";
					}
					else if (record.get('hdnH2S') == '2'){
						metadata.tdCls = metadata.tdCls +"NoExpiryCell";
					}
					return value;
				}
			},			
			/*{columnname:"Registration Expiry",dataname:"hdnPDO",datatype:"string",hidden:true},
			{columnname:"Registration Expiry",dataname:"PDO_EXP",datatype:"string",width:150
				,renderer:function(value, metadata, record) {
					if (record.get('hdnPDO') == '1'){
						metadata.tdCls = metadata.tdCls +"expiryCell";
					}
					else if (record.get('hdnPDO') == '2'){
						metadata.tdCls = metadata.tdCls +"NoExpiryCell";
					}
					return value;
				}
			},	*/	
			
			{columnname:"Insurance Expiry",dataname:"hdnML",datatype:"string",hidden:true},			
			{columnname:"Insurance Expiry",dataname:"ML_EXP",datatype:"string",width:150
				,renderer:function(value, metadata, record) {
					if (record.get('hdnML') == '1'){
						metadata.tdCls = metadata.tdCls +"expiryCell";
					}
					else if (record.get('hdnML') == '2'){
						metadata.tdCls = metadata.tdCls +"NoExpiryCell";
					}
					return value;
				}
			},		
			
			{columnname:"RAS No. Expiry",dataname:"hdnOTO",datatype:"string",hidden:true},
			{columnname:"RAS No. Expiry",dataname:"OTO_EXP",datatype:"string",width:150
				,renderer:function(value, metadata, record) {
					if (record.get('hdnOTO') == '1'){
						metadata.tdCls = metadata.tdCls +"expiryCell";
					}
					else if (record.get('hdnOTO') == '2'){
						metadata.tdCls = metadata.tdCls +"NoExpiryCell";
					}
					return value;
				}
			},	
			{columnname:"Riyada Card Expiry",dataname:"hdnRCE",datatype:"string",hidden:true},
			{columnname:"Riyada Card Expiry",dataname:"RCE_EXP",datatype:"string",width:150
				,renderer:function(value, metadata, record) {
					if (record.get('hdnRCE') == '1'){
						metadata.tdCls = metadata.tdCls +"expiryCell";
					}
					else if (record.get('hdnRCE') == '2'){
						metadata.tdCls = metadata.tdCls +"NoExpiryCell";
					}
					return value;
				}
			},		
		
		
		{columnname:"Remarks",dataname:"REMARKS",width:150,datatype:"string"}
		/*{columnname:"Document Name",dataname:"DOC_TYPE_DESC",datatype:"string",width:150},
		{columnname:"Document No",dataname:"DOC_NO",datatype:"string",width:150},
		{columnname:"Document Expiry",dataname:"EXPIRTY_DT",datatype:"date",width:150},
		{columnname:"Expiry In",dataname:"EXPIRY_IN",datatype:"string",width:150}*/
			
		]
		Vehiclecompldetails=
		{
			title:"Vehicle Compliance Details",
			id:"vehcmpldetails",
			detail:Vehiclecomplgrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		VehiclecomplGridSection = plf.addGrid(Vehiclecompldetails,this)
		ReportsButtonColumn.add(ReportsFormCtrl);
		var TruckSumgrid=
		[   
			{columnname:"Vehicle Status",dataname:"TRUCK_STATUS",datatype:"string",width:300},
			{columnname:"Vehicle Count",dataname:"TRUCK_CNT",datatype:"string",width:150}
		]
		var TruckSumdetails=
		{
			title:"Vehicle Compliance Summary",
			id:"VehicleComplsum",
			detail:TruckSumgrid,
			visibleRow:5,
			removeTbar:true,
			removePaging:true,
			readonly:true,
			removeColumns:true,
			"rowHighlight":true
		}
		var TrkComplSumGridSection = plf.addGrid(TruckSumdetails,this)
		
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(TrkComplSumGridSection)
		mainpage.ptrMainSection.add(VehiclecomplGridSection)
		
		
		mainpage.eventHandlers = 
		[	
         { 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitReportScreenTrkComp"
			},
		{       
				"controlid":"vehcomp",
				"tasktype":"btnclick", 
				"input":[
				"strVehicleDoc","strVehicleCodeFrom","strVehicleNo","strVehicleTypes",
				"strVehicleCategory","strRegion","strCarrierCode","strJourneyNoTo","dtDateFrom",
				"dtDateTo","strVehicleAvailability"
				
				/*
						"strRequestNoFrom","strShipmentNoFrom","strLoadNoFrom","strJourneyNoFrom","strInspectionNoFrom","strRegion",
						"strRequestNoTo","strShipmentNoTo","strPriority","strCommodity","strCarrierCode","strDriverCodeFrom",
						"strVehicleCodeFrom","strInspectionNoTo","dtDateFrom","dtDateTo","strLoadNoTo","strJourneyNoTo","strLocation"
*/						
						],
			    "service":"CoreReportService",
				"methodName":"printvehiclecomplReport"
			}	,
			{       
				"controlid":"getvehcomp",
				"tasktype":"btnclick", 
				"input":[
				"strVehicleDoc","strVehicleCodeFrom","strVehicleNo","strVehicleTypes",
				"strVehicleCategory","strRegion","strCarrierCode","strJourneyNoTo","dtDateFrom",
				"strInspectionNoFrom","strVehicleAvailability"
				
				/*
						"strRequestNoFrom","strShipmentNoFrom","strLoadNoFrom","strJourneyNoFrom","strInspectionNoFrom","strRegion",
						"strRequestNoTo","strShipmentNoTo","strPriority","strCommodity","strCarrierCode","strDriverCodeFrom",
						"strVehicleCodeFrom","strInspectionNoTo","dtDateFrom","dtDateTo","strLoadNoTo","strJourneyNoTo","strLocation","vehcmpldetails"	
*/						
						],
			    "service":"CoreReportService",
				"methodName":"getvehiclecomplReportXL"
			}
			
		];
mainpage.screenLinks=	
		{	
				"operation_rpt":
				{
					"dest":"Report.Report",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
	"rep_streports":
				{
					"dest":"Report.StatisticalReport",
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
