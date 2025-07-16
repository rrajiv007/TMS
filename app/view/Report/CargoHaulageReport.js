/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			   Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                 Addition of var
1.0.2	 Sudhakar D			13/03/2016	  Golive				Grid addition in JS  	
1.0.3    Divya	             04/05/2016    72254                      
************************************************************************************************/
Ext.define('CueTrans.view.Report.CargoHaulageReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Cargo Haulage Performance Summary";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		/*
		mainpage.toolbarLinks=
		[
			{"name":"Tactical Reports","linkid":"rep_opreports"},
			{"name":"Operational Reports","linkid":"operation_rpt"},
			{"name":"Vehicle and Driver Reports","linkid":"DV_reports"}

			]
		*/
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var ReportsColumn = plf.addColumnSection({});	//69997
		
		var ReportsFormCtrl=							//69997
		[
			plf.addCombo({"label":"Region",id:"strRegion"}),
			plf.addCombo({"label":"Hub",id:"strHub"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addCombo({"label":"Delivery Status",id:"strStatus"}),
			plf.addText({"label":"Request No",id:"strRequestNoFrom"}),
			plf.addText({"label":"DO No",id:"strDocNo"}),
			plf.addText({"label":"Rig No",id:"strRigNo"}),
			plf.addText({"label":"Shipment No",id:"strShipmentNoFrom"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity"}), 
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			plf.addText({"label":"Journey Plan No",id:"strJourneyNoFrom"}),
			plf.addText({"label":"Vehicle No",id:"strVehicleCodeFrom"}),
			plf.addText({"label":"Contract No",id:"strInspectionNoFrom"}),
			plf.addCombo({"label":"Carrier",id:"strCarrierCode"}),
			plf.addCombo({"label":"Process Period","id":"strDateType"}),
			plf.addCombo({"label":"Date Type","id":"strVehicleType"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom","mandatory":"true"}),
			plf.addDate({"label":"Date To",id:"dtDateTo","mandatory":"true"})			
			/*
			plf.addCombo({"label":"Date Type","id":"strDateT"}),
			//plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			//plf.addDate({"label":"Date To",id:"dtDateTo"}),
			plf.addCombo({"label":"Origin Region",id:"strShipmentNoTo"}),
			//plf.addCombo({"label":"Destination ",id:"strShipmentNoTo"}),
			plf.addCombo({"label":"Destination Region",id:"strRegion"}),
			plf.addCombo({"label":"Year",id:"strYear"}),
			plf.addCombo({"label":"Month",id:"strMonth"})
			
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"customerCode"},this),
            plf.addHlpText({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"carriercode"},this),
			plf.addCombo({"label":"Priority",id:"strPriority"}),
            plf.addCombo({"label":"Commodity",id:"strCommodity"}), 
			plf.addCombo({"label":"Region",id:"strRegion"}),
			plf.addCombo({"label":"Location",id:"strLocation"}),

			plf.addText({"label":"Request No From",id:"strRequestNoFrom"}),
			plf.addText({"label":"Request No To",id:"strRequestNoTo"}),
			plf.addText({"label":"Shipment No From",id:"strShipmentNoFrom"}),
			plf.addText({"label":"Shipment No To",id:"strShipmentNoTo"}),

			plf.addHlpText({"label":"Request No From",id:"strRequestNoFrom",hlpLinkID:"requestnofrom",inputFormat:"string",InputLength:"80"},this),
			plf.addHlpText({"label":"Request No To",id:"strRequestNoTo",hlpLinkID:"requestnoto",inputFormat:"string",InputLength:"80"},this),	
            plf.addHlpText({"label":"Shipment No From",id:"strShipmentNoFrom",hlpLinkID:"shipmentnofrom",inputFormat:"string",InputLength:"80"},this),
			plf.addHlpText({"label":"Shipment No To",id:"strShipmentNoTo",hlpLinkID:"shipmentnoto",inputFormat:"string",InputLength:"80"},this),					
			plf.addHlpText({"label":"Inspection No From",id:"strInspectionNoFrom",hlpLinkID:"inspectionno",inputFormat:"string",InputLength:"80"},this),
			plf.addHlpText({"label":"Inspection No To",id:"strInspectionNoTo",hlpLinkID:"inspectionnoto",inputFormat:"string",InputLength:"80"},this),				
			plf.addHlpText({"label":"Journey Plan No From",id:"strJourneyNoFrom",hlpLinkID:"jpnoFrom",inputFormat:"string",InputLength:"80"},this),			
			plf.addHlpText({"label":"Journey Plan No To",id:"strJourneyNoTo",hlpLinkID:"jpnoTo",inputFormat:"string",InputLength:"80"},this),
            plf.addHlpText({"label":"Load No From",id:"strLoadNoFrom",hlpLinkID:"LoadFrom",inputFormat:"string",InputLength:"80"},this),			
			plf.addHlpText({"label":"Load No To",id:"strLoadNoTo",hlpLinkID:"LoadTo",inputFormat:"string",InputLength:"80"},this),
			*/
			
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		var ReportsButtonColumn = plf.addColumnSection({});		//69997
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  //plf.addBlank(),//Golive	  
		  plf.addButton({"label":"Get Details","id":"GetDetails"}),//Golive	  
		  plf.addButton({"label":"Generate PDF","id":"cargohaulage"}),
		  plf.addBlank()		
		]	
		
		// Grid section Begins--Golive

		CargoHaulagegrid=
		[   
			{columnname:"DO No",dataname:"DO_NO",datatype:"string",width:150},
			{columnname:"Request Date",dataname:"REQUEST_DATE",datatype:"string",width:150},
			{columnname:"Shipment No.",dataname:"SHIPMENT_NO",datatype:"string",width:150},
			{columnname:"Shipment Type",dataname:"SHIPMENT_TYPE",datatype:"string",width:150},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:150},
			{columnname:"Load No.",dataname:"LOAD_NO",datatype:"string",width:150},	
			{columnname:"Departed Date",dataname:"LOAD_DATE",datatype:"string",width:150},					
			{columnname:"JP No.",dataname:"JP_NO",datatype:"string",width:100},	
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:150},
			{columnname:"Region",dataname:"ORG_REG",datatype:"string",width:150},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},			
			{columnname:"Destination",dataname:"DEST_DESC",datatype:"string",width:150},	
			{columnname:"Shipment Created Date",dataname:"CREATED_DT",datatype:"string",width:160},			
			{columnname:"Expected Delivery Date",dataname:"EXPECTED_DELIVERY_DT",datatype:"string",width:150},
			{columnname:"Contractual Delivery Date",dataname:"CONT_DELIVERY_DT",datatype:"string",width:150},
			{columnname:"Changed Delivery Date",dataname:"CHANGED_DELIVERY_DT",datatype:"string",width:150},
			{columnname:"Actual Delivery Date",dataname:"ACTUAL_DELIVERY_DT",datatype:"string",width:150},			
			{columnname:"Difference(Hrs)",dataname:"DIFFERENCE",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:150}			
		]
		CargoHaulagedetails=
		{
			title:"Cargo Haulage Details",
			id:"CargoHaulagedtl",
			detail:CargoHaulagegrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		CargoHaulageGridSection = plf.addGrid(CargoHaulagedetails,this)

		// Grid section Ends--Golive
		
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(CargoHaulageGridSection)//--Golive		
		
		
		
		mainpage.eventHandlers = 
		[	
         
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitCargoHaulageRPT"
			},
			{
				"controlid":"cargohaulage",
				"tasktype":"btnclick",
				"input":["strRegion","strHub","strOrigin","strDestination","strStatus","strRequestNoFrom","strDocNo","strRigNo","strShipmentNoFrom","strLoadNoFrom","strJourneyNoFrom","strVehicleCodeFrom","strInspectionNoFrom","strCarrierCode","strDateType","strVehicleType","dtDateFrom","dtDateTo","strCommodity"],
				"service":"CoreReportService",
				"methodName":"CargoHaulageListReport"
			},
			// Grid section Begins--Golive
			{
				"controlid":"GetDetails",
				"tasktype":"btnclick",
				"input":["strRegion","strHub","strOrigin","strDestination","strStatus","strRequestNoFrom","strDocNo","strRigNo","strShipmentNoFrom","strLoadNoFrom","strJourneyNoFrom","strVehicleCodeFrom","strInspectionNoFrom","strCarrierCode","strDateType","strVehicleType","dtDateFrom","dtDateTo","strCommodity"],
				"service":"CoreReportService",
				"methodName":"GetCargoHaulageList"
			}
			// Grid section Ends--Golive

			
		];
		
		mainpage.screenLinks=	
		{	
				"rep_opreports":
				{
					"dest":"Report.TMSReport",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
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
				"DV_reports":
				{
					"dest":"Report.Driver&VehicleReport",
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
