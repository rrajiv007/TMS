/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1         Raj          09-June-16    72968            Shipment screen Link added	
1.0.2  Mohammed Razhith.S.A	  15-June-16 73011            Changing From To Orgin           
************************************************************************************************/
Ext.define('CueTrans.view.LiveDashboard.custreq_performanceCurrent',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Customer Request Current Dashboard";
            // Add Toolbar
            mainpage.toolbarSectionFlag = true;
			//mainpage.liveScreenFlag=true;
			mainpage.liveScreenFlag=true;

			mainpage.toolbarLinks=
			[		
				
				{"name":"Customer Request","linkid":"db_requestdash"},
                {"name":"Shipment","linkid":"db_shipmentsdash"},
				{"name":"Load Planning","linkid":"db_vehicledemandplandash"},
				{"name":"Inspection","linkid":"db_inspectiondash"},
				{"name":"Journey Plan","linkid":"db_journeydash"},
                            /*{"name":"Cargo","linkid":"db_cargodashboard"}	*/ 
				
			]
            
			plf.columns = 4
			var tmpRow1 = plf.addColumnSection({});	
			tmpRow1.add(
				plf.addCombo({"label":"Origin Region",id:"strFromRegion"}),
				plf.addCombo({"label":"Destination  Region",id:"strToRegion"}),
				plf.addDate({"label":"From Date",id:"strFromDate",mandatory:"true"}),
				plf.addDate({"label":"To Date",id:"strToDate",mandatory:"true"}),
				plf.addCombo({"label":"Status",id:"strStatus"}),
				plf.addButton({"label":"Search",id:"btnSearch"})
				)

			plf.columns = 1
            var tmpCargoPanel = plf.addGenSection({"cls":"chart_panel_container"});	

			/*Svg starts here*/
			tmpCargoPanel.add(
				plf.addSvg({
					"id": "cargoDash",
					"svgID": "cargoDash",
					"columnWidth": .33,					
					"heightFactor":.5,
					"svgData": {
						"iReqReceived": "",
						"iCustReqNorm": "",
						"iCustReqUrg": "",
						"iShipCreated": "",
						"iShipCreatedNorm1":"",
						"iShipCreatedUrg":""
					},
					"svgLinks":
						[	
							{"linkId":"iReqReceived","popScreen":"LiveDashboard.request_dtl","popMethodName":"initCustReqDB5"},
							{"linkId":"iCustReqNorm","popScreen":"LiveDashboard.request_dtl","popMethodName":"initCustReqDBNor5"},
							{"linkId":"iCustReqUrg","popScreen":"LiveDashboard.request_dtl","popMethodName":"initCustReqDBUrg5"},
							{"linkId":"iShipCreated","popScreen":"LiveDashboard.shipment_dtl","popMethodName":"initshipmentcntDB1"},
							{"linkId":"iShipCreatedNorm1","popScreen":"LiveDashboard.shipment_dtl","popMethodName":"initShipmentBNor2"},
							{"linkId":"iShipCreatedUrg","popScreen":"LiveDashboard.shipment_dtl","popMethodName":"initShipmentDBUrg3"}
						],
					"svgURL": "resources/images/svg/LiveDashboard/CargoDashboard.svg"
            },this))
			/*Svg ends here*/
			
			/*Tonnage(tons) by Zone starts here*/
			var TonnageZone_tmp = plf.addChart({
                "id": "cr_tonnageByZone",
				"xAxisCaption": "Zone",
                "xAxisColumn":"zone",
                "yAxisCaption": "Tonnage",
				"chartTitle": "Tonnage by Zone",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.request_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initcrcdser3",
				"showLegend":false,
				"columnWidth": .33,
				seriesArray:[
					{type:"barcolor",field:["cnt"]}										
				]				
            },this)
			/*Tonnage(tons) by Zone ends here*/
			
			/*Tonnage(tons) by Zone/Commodity starts here*/
			var gridcustobj=
			[										
				{columnname:"Zone",dataname:"Region",datatype:"string",width:60},
				{columnname:"Commodity",dataname:"Commodity",datatype:"string",width:80},
				{columnname:"Req Count",dataname:"RequestCount",datatype:"string",width:72,colAlign:'right',linkId:"db_requestdtl",gridpopup:true,tooltip:"Click here to view request details."},
				{columnname:"Ship Count",dataname:"ShipmentCount",datatype:"string",width:78,colAlign:'right',linkId:"db_shipmentdtl",gridpopup:true,tooltip:"Click here to view shipment details."},	
				{columnname:"Tonnage",dataname:"Tonnage",datatype:"string",width:71,colAlign:'right',weightPrecision:3},			
			]
			var gridcustDtl=
			{
				title:"Tonnage By Zone And Commodity",
				id:"zoneByCommodity_dtl",				
				detail:gridcustobj,				
				columnWidth:.34,
				readonly:true,
				removeTbar:true,
				removePaging:true,
				margin:2,
				heightFactor:.5,
				widthBasis:"flex"
			}
			var TonnageZoneCommodity_tmp = plf.addGrid(gridcustDtl,this) 
			/*Tonnage(tons) by Zone/Commodity ends here*/
			
			/*Customer Request starts here*/
			var ReqCnt_tmp = plf.addChart({
                "id": "cr_ReqCnt",
				"xAxisCaption": "Day",
                "xAxisColumn":"day",
                "yAxisCaption": "Request Count",
				"chartTitle": "Customer Request",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.request_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initcrcdser4",
				"columnWidth": .5,
				seriesArray:[
					{type:"barcolor",field:["cnt"]}					
				]				
            },this)
			/*Customer Request starts here*/
			
			/*Tonnage(tons) by Commodity starts here*/
			var TonnageCommodity_tmp = plf.addChart({
                "id": "cr_tonnageByCommodity",
				"xAxisCaption": "Commodity",
                "xAxisColumn":"commodity",
                "yAxisCaption": "Tonnage",
				"chartTitle": "Tonnage by Commodity",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.request_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"initcrcdser2",
				"columnWidth": .5,
				seriesArray:[
					{type:"barcolor",field:["cnt"]}					
				]				
            },this)
			/*Tonnage(tons) by Commodity starts here*/
			
					
			
			mainpage.ptrMainSection.add(tmpRow1) //Add Header Section to Main Page  
			tmpCargoPanel.add(TonnageZone_tmp)
			tmpCargoPanel.add(TonnageZoneCommodity_tmp);			
			tmpCargoPanel.add(ReqCnt_tmp);
			tmpCargoPanel.add(TonnageCommodity_tmp);				
			mainpage.ptrMainSection.add(tmpCargoPanel)
			

			mainpage.eventHandlers = 
			[
				{
						"controlid":"",
						"tasktype":"onload",
						"input":[""],
						"service":"TMSCoreTransportTS",
						"methodName":"initcrcdser"
				},
				{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strFromRegion","strToRegion","strFromDate","strToDate","strStatus"],
					"service":"TMSCoreTransportTS",
					"methodName":"serfetchcustreq"
			},
				{
				"tasktype":"proto",
				"filename":"dashboard/customerrequestcurrent.json"
				}

			];

	mainpage.screenLinks=
		{
			"db_journeydash":
			{
				"dest":"LiveDashboard.journeyplan",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
			},
			
			"db_inspectiondash":
			{
				"dest":"LiveDashboard.inspection",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
			},				
			"db_vehicledemandplandash":
			{
				"dest":"LiveDashboard.vehicleDemandPlanningCurrent",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
			},
			
			"db_cargodashboard":
			{
				"dest":"LiveDashboard.cargoDashboard",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
			},
			"db_requestdash":
			{
				"dest":"LiveDashboard.custreq_performanceCurrent",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
			},
                     "db_shipmentsdash":
			{
				"dest":"LiveDashboard.shipments",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
			}						
		}	
	mainpage.gridPopupLinks=
		{
			"db_requestdtl":
			{
				"dest":"LiveDashboard.request_dtl",
				"popMethodName":"initCustReqDBgrid",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"Region","dest":"selChartSeries"},
						{"src":"Commodity","dest":"selChartValue"}
						]
			},
			"db_shipmentdtl":
			{
				"dest":"LiveDashboard.shipment_dtl",
				"popMethodName":"initShipmentDBgrid",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"Region","dest":"selChartSeries"},
						{"src":"Commodity","dest":"selChartValue"}
						]
			}
		}
			this.callParent(arguments);
        }

    });