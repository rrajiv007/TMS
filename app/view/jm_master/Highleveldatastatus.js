/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	 Sivaraman                                                                   		         
Author		  :	CUETRANS 																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		  Sivaraman       22/01/2016   67621                    Add Chart for Rejection. 
1.0.2         Raj             09-June-16   72968            Shipment dashboard screen Link Added
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.Highleveldatastatus',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
			var parentForm =this;
            mainpage.startPainting();
			mainpage.screenName = "High Level Data Status";
            // Add Toolbar
            mainpage.toolbarSectionFlag = true;	
			mainpage.liveScreenFlag=true;
			mainpage.toolbarLinks=
			[
				
				//{"name":"Customer Request","linkid":"db_requestdash"},
				//{"name":"Shipment","linkid":"db_shipmentsdash"},
				//{"name":"Load Planning","linkid":"db_vehicledemandplandash"},
				/*{"name":"Vehicle Demand Planning","linkid":"db_vehicledemandplanning"},*/
				//{"name":"Inspection","linkid":"db_inspectiondash"},
				//{"name":"Journey Plan","linkid":"db_journeydash"}
				/*{"name":"Cargo","linkid":"db_cargodashboard"}*/
				
			]
			plf.columns = 5
			var tmpRow1 = plf.addColumnSection({});	
			tmpRow1.add(
				/*plf.addCombo({"label":"From Zone",id:"strFromRegion"}),
				plf.addCombo({"label":"To Zone",id:"strToRegion"}),*/
				plf.addDate({"label":"From Date",id:"strFromDate",mandatory:"true"}),
				plf.addHidden({"label":"From Date",id:"dtDateFrom"}),
				plf.addHidden({"label":"To Date",id:"dtDateTo"}),
				plf.addDate({"label":"To Date",id:"strToDate",mandatory:"true"}),
				//plf.addButton({"label":"Search",id:"btnSearch"}),
				//plf.addButton({"label":"Generate PDF","id":"Inspectionrpt"}),
				plf.addButton({id:"Inspectionreport",label:"Generate PDF",tooltip:"Click here to generate pdf report.",
				"handler": function() 
							{
								//alert();
								parentForm.queryById("methodName").setValue("PrintHighLevelDataStatusReport");
								var dtfrom =parentForm.queryById("strFromDate").value;
								var dtto =parentForm.queryById("strToDate").value;
								
								dtfrom =  Ext.Date.format(new Date(dtfrom), plf.defDateFormat);
								dtto = Ext.Date.format(new Date(dtto), plf.defDateFormat);
								parentForm.queryById("dtDateFrom").setValue(dtfrom);
								parentForm.queryById("dtDateTo").setValue(dtto);
								process_ebpack_service(parentForm,["dtDateFrom","dtDateTo"],"CoreReportService");
								
							}})
				)
			/*plf.columns = 1*/
            var tmpInspectionPanel = plf.addGenSection({"cls":"chart_panel_container"});	
           
		
			
			
			
			mainpage.ptrMainSection.add(tmpRow1)
			mainpage.ptrMainSection.add(tmpInspectionPanel)
			//mainpage.ptrMainSection.add(tmpPanel)
			/*Svg ends here*/
			/*TMSLiveInspectionDashDtl*/
			mainpage.eventHandlers = 
			[
			{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":[/*"strFromRegion","strToRegion",*/"strFromDate","strToDate"],
					"service":"TMSCoreTransportTS",
					"methodName":"Search_HighLevelDataStatusRpt"
			},
					
			{
					"controlid":"Inspectionrpt",
					"tasktype":"btnclick",
					"input":[/*"strFromRegion","strToRegion",*/"strFromDate","strToDate"],
					"service":"CoreReportService",
					"methodName":"PrintHighLevelDataStatusReport"
			},
						
			{
					"controlid":"",
					"tasktype":"onload",
					"input":[/*"strFromRegion","strToRegion",*/"strFromDate","strToDate"],
					"service":"TMSCoreTransportTS",
					"methodName":"TMSLiveInspectionDashDtl"
			},	
			{
				"tasktype":"proto",
				"filename":"dashboard/Inspectioncurrent.json"
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
			"db_shipmentsdash":
			{
				"dest":"LiveDashboard.shipments",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
			},	
			
			"db_inspectiondash":
			{
				"dest":"LiveDashboard.inspectionnew",
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
			"db_vehicledemandplanning":
				{
				"dest":"LiveDashboard.vehicleDemandPlanning",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
				}
		}
			this.callParent(arguments);
        },
		triggerLink:function()
		{
		alert("Test");
		}

    });