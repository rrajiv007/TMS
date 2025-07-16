/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Sudhakar D			13/03/2016	  Golive					Grid addition in JS
1.0.1    divya              30/05/2016    72787
************************************************************************************************/
Ext.define('CueTrans.view.Report.DriverComplianceReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Driver Compliance Report";
		
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
			plf.addCombo({"label":"Driver Document",id:"strDocType"}),
			plf.addText({"label":"Driver Code",id:"strDriverCodeFrom"}),
			plf.addCombo({"label":"Carrier Code",id:"strCarrierCode"}),
			plf.addCombo({"label":"Status","id":"strInspectionNoFrom"}),
			plf.addText({"label":"Driver Name",id:"strDriverName"}),
			plf.addText({"label":"Driver Mobile No",id:"strMobileNo"}),
			plf.addText({"label":"Blue Key No",id:"strBlueKeyNo"}),
			plf.addCombo({"label":"Driver Type",id:"strDriverType"}),			
			plf.addDate({"label":"Expiry On",id:"dtDateFrom"}),			
			//plf.addCombo({"label":"Date Type","id":"strJourneyNoTo"}),
			/*plf.addHidden({"label":"Expiry From",id:"dtDateFrom"}),
			plf.addHidden({"label":"Expiry To",id:"dtDateTo"})
		
		
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
		var ReportsFormCtrl=
		[
		  plf.addBlank(),//Golive	  
		  plf.addButton({"label":"Show Details","id":"GetDetails"}),//Golive	  
		  plf.addButton({"label":"Generate PDF",id:"Drivercomp"}),
		  plf.addBlank()
		
		]	
		
		// Grid section Begins--Golive

		var DriverComplgrid=
		[   
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:150},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:150},
			{columnname:"Driver Mobile No.",dataname:"DRIVER_MOBILE_NO",datatype:"string",width:150},
			{columnname:"Blue Key No.",dataname:"BLUE_KEY_NO",datatype:"string",width:150},
			{columnname:"Carrier Name",dataname:"CARRIER_NAME",datatype:"string",width:150},
			{columnname:"Licence Expiry",dataname:"hdnLicence",datatype:"string",hidden:true},
			{columnname:"Licence Expiry",dataname:"LICENCE_EXP",datatype:"string",width:150
				,renderer:function(value, metadata, record) {
					if (record.get('hdnLicence') == '1'){
						metadata.tdCls = metadata.tdCls +"expiryCell";
					}
					else if (record.get('hdnLicence') == '2'){
						metadata.tdCls = metadata.tdCls +"NoExpiryCell";
					}
					return value;
				}
			},
			
			{columnname:"H2S Permit Expiry",dataname:"hdnH2S",datatype:"string",hidden:true},
			{columnname:"H2S Permit Expiry",dataname:"H2S_EXP",datatype:"string",width:150
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
			/*
			{columnname:"PDO Permit Expiry",dataname:"hdnPDO",datatype:"string",hidden:true},
			{columnname:"PDO Permit Expiry",dataname:"PDO_EXP",datatype:"string",width:150,hidden:true
				,renderer:function(value, metadata, record) {
					if (record.get('hdnPDO') == '1'){
						metadata.tdCls = metadata.tdCls +"expiryCell";
					}
					else if (record.get('hdnPDO') == '2'){
						metadata.tdCls = metadata.tdCls +"NoExpiryCell";
					}
					return value;
				}
			},		
			*/
			{columnname:"Medical Permit Expiry",dataname:"hdnML",datatype:"string",hidden:true},
			{columnname:"Medical Permit Expiry",dataname:"ML_EXP",datatype:"string",width:150
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
			
			{columnname:"OTO Induction Expiry",dataname:"hdnOTO",datatype:"string",hidden:true},
			{columnname:"OTO Induction Expiry",dataname:"OTO_EXP",datatype:"string",width:150
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
			/* On 04-10-2019 start *****/
			{columnname:"Riyada Card Expiry",dataname:"hdnRIYADA",datatype:"string",hidden:true},
			{columnname:"Riyada Card Expiry",dataname:"RIYADA_EXP",datatype:"string",width:150
				,renderer:function(value, metadata, record) {
					if (record.get('hdnRIYADA') == '1'){
						metadata.tdCls = metadata.tdCls +"expiryCell";
					}
					else if (record.get('hdnRIYADA') == '2'){
						metadata.tdCls = metadata.tdCls +"NoExpiryCell";
					}
					return value;
				}
			},
			{columnname:"PDO DDC02 Expiry",dataname:"hdnDDC02",datatype:"string",hidden:true},
			{columnname:"PDO DDC02 Expiry",dataname:"DDC02_EXP",datatype:"string",width:150
				,renderer:function(value, metadata, record) {
					if (record.get('hdnDDC02') == '1'){
						metadata.tdCls = metadata.tdCls +"expiryCell";
					}
					else if (record.get('hdnDDC02') == '2'){
						metadata.tdCls = metadata.tdCls +"NoExpiryCell";
					}
					return value;
				}
			},
			{columnname:"PDO DDC03 Graded Expiry",dataname:"hdnDDC03",datatype:"string",hidden:true},
			{columnname:"PDO DDC03 Graded Expiry",dataname:"DDC03_EXP",datatype:"string",width:190
				,renderer:function(value, metadata, record) {
					if (record.get('hdnDDC03') == '1'){
						metadata.tdCls = metadata.tdCls +"expiryCell";
					}
					else if (record.get('hdnDDC03') == '2'){
						metadata.tdCls = metadata.tdCls +"NoExpiryCell";
					}
					return value;
				}
			},
			{columnname:"Medical Over 40 to 60 Expiry",dataname:"hdnMED4060",datatype:"string",hidden:true},
			{columnname:"Medical Over 40 to 60 Expiry",dataname:"MED4060_EXP",datatype:"string",width:200
				,renderer:function(value, metadata, record) {
					if (record.get('hdnMED4060') == '1'){
						metadata.tdCls = metadata.tdCls +"expiryCell";
					}
					else if (record.get('hdnMED4060') == '2'){
						metadata.tdCls = metadata.tdCls +"NoExpiryCell";
					}
					return value;
				}
			},
			/* On 04-10-2019 Ends *****/
			{columnname:"Remarks",dataname:"REMARKS",width:150,datatype:"string"},
			
			
			/*
			{columnname:"Document Name",dataname:"DOCUMENT_NAME",datatype:"string",width:150},
			{columnname:"Document No.",dataname:"DOCUMENT_NO",datatype:"string",width:150},
			{columnname:"Document Expiry",dataname:"EXPIRTY_DT",datatype:"date",width:150},
			{columnname:"Expiry In",dataname:"EXPIRY_IN",datatype:"string",width:150}
			*/
		]
		var DriverCompldetails=
		{
			title:"Driver Compliance Details",
			id:"DriverCompldtl",
			detail:DriverComplgrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		var DriverComplGridSection = plf.addGrid(DriverCompldetails,this)

		// Grid section Ends--Golive
		
		var DriverSumgrid=
		[   
			{columnname:"Driver Status",dataname:"DRIVER_STATUS",datatype:"string",width:300},
			{columnname:"Driver Count",dataname:"DRIVER_CNT",datatype:"string",width:150}
		]
		var DriverSumdetails=
		{
			title:"Driver Compliance Summary",
			id:"DriverComplsum",
			detail:DriverSumgrid,
			visibleRow:5,
			removeTbar:true,
			removePaging:true,
			readonly:true,
			removeColumns:true,
			"rowHighlight":true
		}
		var DriverComplSumGridSection = plf.addGrid(DriverSumdetails,this)
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(DriverComplSumGridSection)//--Golive
		mainpage.ptrMainSection.add(DriverComplGridSection)//--Golive		
		
		mainpage.eventHandlers = 
		[	
         { 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitReportScreenDrivComp"
			},
		{       
				"controlid":"Drivercomp",
				"tasktype":"btnclick", 
				"input":[
						"strDocType","strDriverCodeFrom","strDriverName","strMobileNo",
						"strBlueKeyNo","strCarrierCode","strJourneyNoTo","dtDateFrom","strDriverType",
						"strInspectionNoFrom"
				/*
						"strRequestNoFrom","strShipmentNoFrom","strLoadNoFrom","strJourneyNoFrom","strInspectionNoFrom","strRegion",
						"strRequestNoTo","strShipmentNoTo","strPriority","strCommodity","strCarrierCode","strDriverCodeFrom",
						"strVehicleCodeFrom","strInspectionNoTo","dtDateFrom","dtDateTo","strLoadNoTo","strJourneyNoTo","strLocation"						
					*/
					],
			    "service":"CoreReportService",
				"methodName":"printdrivercomplReport"
			}
			
			//--Golive Begins
			,{       
				"controlid":"GetDetails",
				"tasktype":"btnclick", 
				"input":[
						"strDocType","strDriverCodeFrom","strDriverName","strMobileNo",
						"strBlueKeyNo","strCarrierCode","strJourneyNoTo","dtDateFrom","strDriverType",
						"strInspectionNoFrom"
				/*
						"strRequestNoFrom","strShipmentNoFrom","strLoadNoFrom","strJourneyNoFrom","strInspectionNoFrom","strRegion",
						"strRequestNoTo","strShipmentNoTo","strPriority","strCommodity","strCarrierCode","strDriverCodeFrom",
						"strVehicleCodeFrom","strInspectionNoTo","dtDateFrom","dtDateTo","strLoadNoTo","strJourneyNoTo","strLocation"						
						*/
						],
			    "service":"CoreReportService",
				"methodName":"Getdrivercompl"
			}		 	
			//--Golive ENDS
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
