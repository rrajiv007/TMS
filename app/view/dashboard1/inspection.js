Ext.define('CueTrans.view.dashboard1.inspection',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Inspection Current Dashboard";
            // Add Toolbar
            mainpage.toolbarSectionFlag = true;	
			mainpage.liveScreenFlag=true;
			mainpage.toolbarLinks=
		[
			/*//{"name":"inspectiondash","linkid":"db_inspectiondash"},
			{"name":"requestdash","linkid":"db_requestdash"},
			{"name":"vehicledemandplandash","linkid":"db_vehicledemandplandash"},
			{"name":"journeydash","linkid":"db_journeydash"},
			{"name":"cargodashboard","linkid":"db_cargodashboard"},
			*/
			
			{"name":"Customer Request","linkid":"db_requestdash"},
			{"name":"Vehicle Demand Planning","linkid":"db_vehicledemandplandash"},
			{"name":"Inspection","linkid":"db_inspectiondash"},
			{"name":"Journey Plan","linkid":"db_journeydash"},
			{"name":"Cargo","linkid":"db_cargodashboard"},
			
			
			
		]

					
			plf.columns = 1
            var tmpRow2 = plf.addGenSection({})
			
			//chartbegins
			var tmpChart7= plf.addGraph({
                "id": "cr_insdatecnt",
                "chartType": "column",
                "xAxisCaption": "Date",
                "yAxisCaption": "Count",
				"lnkID":"origin",
                chartHeight: 143.43755,
                chartWidth: 552.33521
            },this)	
			// chart end
			
			//chartbegins
			var tmpChart5= plf.addGraph({
                "id": "cr_ins",
                "chartType": "column",
                "xAxisCaption": "Inspection Type",
                "yAxisCaption": "Count",
				"lnkID":"origin",
                chartHeight: 143.36292,
                chartWidth: 739
            },this)	
			// chart end
			/*
			// Gauge1 Begins
			var tmpChart = plf.addGraph({
                "id": "gu_InspCompleted",
                "chartType": "guage",
                "xAxisCaption": "Date",
                "yAxisCaption": "Cost",
                chartHeight: 100,
                chartWidth: 235
            })				
			
			Ext.data.StoreManager.lookup('guage1_store').loadData([{"yaxis":29}],false);
			// Gauge1 End
			*/
			
			// Grid sec begins
			var gridcustobj=
			[					
				{columnname:"Inspector",dataname:"inspector",datatype:"string",width:90},		
				{columnname:"Total<br>Inspections",dataname:"TotalInspections",datatype:"string",width:90,colAlign:'right'},
				{columnname:"Inspections <br>Pending",dataname:"insppending",datatype:"string",width:90,colAlign:'right'},
				{columnname:"Inspector available<br>After(hrs)",dataname:"Free",datatype:"string",width:130,colAlign:'right',weightPrecision:2},				
			]
			var gridcustDtl=
			{
				title:"",
				id:"inspectiordtl",
				removetoolbar:true,
				detail:gridcustobj,
				visibleRow:10,
				readonly:true,
				removeAddDelete:true,
				removeExport:true,
				removeFilter:true
			}
			var tmpChart4 = plf.addGrid(gridcustDtl,this) 
			// Grid sec ends
			
			/*
			var dataviewobj=
			[					
				{dataname:"strDriverName",datatype:"string",width:250,linkId:"driverMaster"},			
				{dataname:"strDriverNo",datatype:"string",width:250},			
				{dataname:"strDriverAvalStatus",datatype:"string",width:250},			
				{dataname:"strImage",datatype:"string",width:140}
			]
			
		/*	var dataviewTbl = new Ext.XTemplate(
				'<tpl for=".">',
					'<div style="margin-bottom: 10px;" class="emplWrap">',
					 '<span>{strHeading}</span>',
					  '<br/><img src="{strImage}" />',					 
					'</div>',
				'</tpl>'
			);
			
			var dataviewTbl = new Ext.XTemplate(
			'<tpl for=".">',
				'<div style="margin-bottom: 10px;" class="emplWrap" >',					
				'<table><tr>',
				'<td> <img width=150 src="{strImage}"/></td>',
				'<td>',
				'<table><tr>',
				'<td><div><span><u>Driver Details</u></span></div></td></tr>',
				'<tr><td><div class="driverdtl"><span>Code:<u> {strDriverCode}</u></span></div></td></tr>',
				'<tr><td><div class="driverdtl driverdtl1"><span>No: {strDriverNo}</span></div></td></tr>',
				'<tr><td><div><span>Status: {strDriverAvalStatus}</span></div></td></tr>',
				'</table></td>',  
				'</tr></table>',				 
				'</div>',
				'</tpl>'
		);*/
			/*
			var dataviewTbl = new Ext.XTemplate(
			'<tpl for=".">',
				'<div style="margin-bottom: 10px;" class="emplWrap customer_dtl" >',					
				'<table width=100%><tr><td>',
				 '<img width=50 height=50 src="{strImage}"/>',
				  '</td><td>',				  
				 '<br/><span><b> {strInspectionNo}</b></span>',
				  '<br/><span>Driver Code: {strDriverCode}</span>',
				  '<br/><span>Vehicle Code: {strVehicleCode}</span>',	
				  '</td></tr></table>',
				'</div>',
			'</tpl>'
			);
			
			var dataviewcustDtl=
			{
				title:"",
				id:"customer_dtl",				
				detail:dataviewobj,
				tbl:dataviewTbl,
				itemSelector:".customer_dtl",
				dataviewlnk:"inspectionscreen"
			}
			
			var tmpChart3 = plf.addDataView(dataviewcustDtl,this)   
			Ext.data.StoreManager.lookup('customer_dtl_store').loadData(
			[
			{ "strImage":'resources/images/dataview/inspection.jpg', "strDriverCode":'D45678',"strInspectionNo":"IN4567TR56","strVehicleCode":"TR56"},
			{ "strImage":'resources/images/dataview/inspection.jpg', "strDriverCode":'D45678',"strInspectionNo":"IN1234TR57","strVehicleCode":"TR57"},
			{ "strImage":'resources/images/dataview/inspection.jpg', "strDriverCode":'D45678',"strInspectionNo":"IN9876TR58","strVehicleCode":"TR58"}
					
			],false);
			*/
			//console.log(tmpChart3,"tmpChart3");
			tmpRow2.add(
				plf.addSvg({
					"id": "svg1",
					"svgID": "svg1",
					"columnWidth": 1,
					"svgData": {
						"text1": "",
						"text2": ""
					},
					"svgObjData": {
						//"gu_InspCompleted": tmpChart,
						
						//"dataviewID": tmpChart3,
						
						
						//"div4": tmpGrid1,
						"cr_ins": tmpChart5,
						"gr_InspectorSummary": tmpChart4,
						"InspectionSummary":tmpChart7,
					},
                "svgURL": "resources/images/svg/inspection/InspectionCurrent.svg"
            }))
			//mainpage.ptrMainSection.add(tmpRow1) //Add Header Section to Main Page  
			mainpage.ptrMainSection.add(tmpRow2)
		   //mainpage.ptrMainSection.add(tmpRow3) 
            
			mainpage.eventHandlers = 
			[
			
			{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreInspectionService",
					"methodName":"initInsCurrentTS"
			},	
			{
				"tasktype":"proto",
				"filename":"dashboard/Inspectioncurrent.json"
			}
				
			];
			mainpage.screenLinks=
			{
			"driverMaster":
				{
					"dest":"jm_master.DriverMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"strDriverCode","dest":"strDriverCode"}
							]
				},
				
				"db_journeydash":
				{
					"dest":"dashboard1.journeyPlan",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				/*
				"db_inspectiondash":
				{
					"dest":"dashboard1.inspection",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				*/
				"db_requestdash":
				{
					"dest":"dashboard1.custreq_performanceCurrent",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
				"db_vehicledemandplandash":
				{
					"dest":"dashboard1.vehicleDemandPlanningCurrent",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
				"db_cargodashboard":
				{
					"dest":"dashboard1.cargoDashboard",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
			}
			this.callParent(arguments);
        },
		triggerLink:function()
		{
		alert("Test");
		}

    });