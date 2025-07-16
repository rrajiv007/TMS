Ext.define('CueTrans.view.dashboard.inspection',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Inspection Current Dashboard";
            // Add Toolbar
            mainpage.toolbarSectionFlag = true;	
			mainpage.liveScreenFlag=false;
			mainpage.toolbarLinks=
		[
			{"name":"Inspection","linkid":"jms_analysis"}
			//{"name":"Inspection Advice","linkid":"Ins_InspectionAdvice"}
		]

					
			plf.columns = 1
            var tmpRow2 = plf.addGenSection({})
			
			
			var tmpChart7= plf.addGraph({
                "id": "InspectionSummary",
                "chartType": "column",
                "xAxisCaption": "Inspection",
                "yAxisCaption": "Count",
				"lnkID":"origin",
                chartHeight: 161.04982,
                chartWidth: 420.17929
            },this)	
			
			// Gauge1 Begins
			var tmpChart = plf.addGraph({
                "id": "guage1",
                "chartType": "guage",
                "xAxisCaption": "Date",
                "yAxisCaption": "Cost",
                chartHeight: 100,
                chartWidth: 235
            })				
			
			Ext.data.StoreManager.lookup('guage1_store').loadData([{"yaxis":2}],false);
			// Gauge1 End
			
			// Grid sec begins
			var gridcustobj=
			[					
				{columnname:"Inspector",dataname:"inspector",datatype:"string",width:140},		
				{columnname:"Inspections<br>available",dataname:"inspavailable",datatype:"string",width:120},						
				{columnname:"Inspections <br>Pending",dataname:"insppending",datatype:"string",width:100}
			]
			var gridcustDtl=
			{
				title:"",
				id:"inspectiondtl",
				removetoolbar:true,
				detail:gridcustobj,
				visibleRow:plf.searchVisibleRows,
				readOnly:true,
				removeAddDelete:true,
				removeFilter:true
			}
			var tmpChart4 = plf.addGrid(gridcustDtl,this) 
			// Grid sec ends
			
			
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
			console.log(tmpChart3,"tmpChart3");
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
						"guage1": tmpChart,
						"InspectionSummary":tmpChart7,
						"dataviewID": tmpChart3,
						"grid1": tmpChart4,
						//"div4": tmpGrid1,
					},
                "svgURL": "resources/images/svg/inspection/Inspection.svg"
            }))
			//mainpage.ptrMainSection.add(tmpRow1) //Add Header Section to Main Page  
			mainpage.ptrMainSection.add(tmpRow2)
		   //mainpage.ptrMainSection.add(tmpRow3) 
            
			mainpage.eventHandlers = 
			[
			
			/*{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"TMSCoreTransportTS",
					"methodName":"initLoadBasedTS1"
			},	*/
			{
				"tasktype":"proto",
				"filename":"dashboard/Inspectioncurrent.json"
			}
				
			];
			mainpage.screenLinks=
			{
			"inspectionscreen":
				{
					"dest":"journey_management.PreJourneyInspection",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"strInspectionNo","dest":"strInspectionNo"}
							]
				},
				
				"jms_analysis":
				{
					"dest":"dashboard.inspectionAnalysis",
					"tab":"dashboard",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
				"Ins_InspectionAdvice":
				{
					"dest":"dashboard.inspectionUser",
					"tab":"dashboard",
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