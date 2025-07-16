Ext.define('CueTrans.view.dashboard.inspectionAnalysis',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Inspection Analysis Dashboard";
            // Add Toolbar
            mainpage.toolbarSectionFlag = true;	
			mainpage.liveScreenFlag=false;
			mainpage.toolbarLinks=
		[
			{"name":"Journey","linkid":"jms_current"}
		]
			plf.columns = 4		
            var tmpRow1 = plf.addGenSection({})			
			/*Search Criteria starts here*/
			/*tmpRow1.add(
				plf.addLabel({"text":"Customer Request Dashboard",id:"strStatus"}))	*/
			
			tmpRow1.add(
				plf.addCombo({"label":"Projection Period",id:"strPeriod"}))	
		
							
			/*Search Criteria ends here*/
					
			plf.columns = 1
            var tmpRow2 = plf.addGenSection({})
			//var tmpTitle=["Normal","Urgent"];
			// chart1 begins
			var tmpChart1 = plf.addGraph({
                "id": "chart1",
                "chartType": "column",
                "xAxisCaption": "Date",
                "yAxisCaption": "Rejection Count",
				//"ChartTitle": tmpTitle,
				"lnkID":"origin",
                chartHeight: 185,
                chartWidth: 618.04407
            },this)
           			
			
			//Ext.data.StoreManager.lookup('guage1_store').loadData([{"yaxis":70}],false);
			// chart1 End
			
			// chart2 begins
			var tmpChart2 = plf.addGraph({
                "id": "chart2",
                "chartType": "column",
                "xAxisCaption": "Date",
                "yAxisCaption": "Inspection Completed",
				//"ChartTitle": tmpTitle,
				"lnkID":"origin",
                chartHeight: 185,
                chartWidth: 618.06018
            },this)	
            	
			//chart 2 ends
			
			// chart3 begins
			var tmpChart3 = plf.addGraph({
                "id": "chart3",
                "chartType": "column",
                "xAxisCaption": "Count",
                "yAxisCaption": "Inspection",
				//"ChartTitle": tmpTitle,
				"lnkID":"origin",
                chartHeight: 185.21458,
                chartWidth: 408.03116
            },this)	
            
			//chart 3 ends
			
			
			
			// Grid sec begins
			var gridcustobj1=
			[					
				{columnname:"Vehicle Category",dataname:"Vehicle_Category",datatype:"string",width:190},		
				{columnname:"Inspection Pending",dataname:"Inspection_Pending",datatype:"string",width:160},						
			]
			var gridcustDtl1=
			{
				title:"",
				id:"inspection1",
				removetoolbar:true,
				detail:gridcustobj1,
				visibleRow:plf.searchVisibleRows,
				readOnly:true,
				removeAddDelete:true,
				removeFilter:true
			}
			var tmpChart4 = plf.addGrid(gridcustDtl1,this) 
			// Grid sec ends
			
			// Grid sec begins
			var gridcustobj2=
			[					
				{columnname:"Vehicle Category",dataname:"Vehicle_Category",datatype:"string",width:190},		
				{columnname:"Reinspection",dataname:"Re_Inspection",datatype:"string",width:160},						
			]
			var gridcustDtl2=
			{
				title:"",
				id:"inspection2",
				removetoolbar:true,
				detail:gridcustobj2 ,
				visibleRow:plf.searchVisibleRows,
				readOnly:true,
				removeAddDelete:true,
				removeFilter:true
			}
			var tmpChart5 = plf.addGrid(gridcustDtl2,this) 
			// Grid sec ends
			
			
			/*var dataviewobj=
			[					
				{dataname:"strDriverName",datatype:"string",width:250,linkId:"driverMaster"},			
				{dataname:"strDriverNo",datatype:"string",width:250},			
				{dataname:"strDriverAvalStatus",datatype:"string",width:250},			
				{dataname:"strImage",datatype:"string",width:140}
			]*/
			/*
			var dataviewTbl = new Ext.XTemplate(
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
			
			/*var dataviewTbl = new Ext.XTemplate(
			'<tpl for=".">',
				'<div style="margin-bottom: 10px;" class="emplWrap customer_dtl" >',					
				'<table><tr><td>',
				 '<img width=150 src="{strImage}"/>',
				  '</td><td>',
				  '<span><u>Driver Details</u></span>',
				 '<br/><span>Code:<u> {strDriverCode}</u></span>',
				  '<br/><span>No: {strDriverNo}</span>',
				  '<br/><span>Status: {strDriverAvalStatus}</span>',				  
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
				dataviewlnk:"driverMaster"
			}
			
			var tmpChart3 = plf.addDataView(dataviewcustDtl,this)   
			Ext.data.StoreManager.lookup('customer_dtl_store').loadData(
			[
			{ "strImage":'resources/images/dataview/driver.jpg', "strDriverCode":'D45678',"strDriverNo":"123456789","strDriverAvalStatus":"Available"},
			{ "strImage":'resources/images/dataview/driver.jpg', "strDriverCode":'D45678',"strDriverNo":"123456789","strDriverAvalStatus":"Occupied"},
			{ "strImage":'resources/images/dataview/driver.jpg', "strDriverCode":'D45678',"strDriverNo":"123456789","strDriverAvalStatus":"Occupied"},
			{ "strImage":'resources/images/dataview/driver.jpg', "strDriverCode":'D45678',"strDriverNo":"123456789","strDriverAvalStatus":"Occupied"},
			{ "strImage":'resources/images/dataview/driver.jpg', "strDriverCode":'D45678',"strDriverNo":"123456789","strDriverAvalStatus":"Occupied"},
			{ "strImage":'resources/images/dataview/driver.jpg', "strDriverCode":'D45678',"strDriverNo":"123456789","strDriverAvalStatus":"Occupied"},
			{ "strImage":'resources/images/dataview/driver.jpg', "strDriverCode":'D45678',"strDriverNo":"123456789","strDriverAvalStatus":"Occupied"},
			{ "strImage":'resources/images/dataview/driver.jpg', "strDriverCode":'D45678',"strDriverNo":"123456789","strDriverAvalStatus":"Occupied"},
			{ "strImage":'resources/images/dataview/driver.jpg', "strDriverCode":'D45678',"strDriverNo":"123456789","strDriverAvalStatus":"Occupied"}			
			],false);
			console.log(tmpChart3,"tmpChart3");*/
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
						"chart1": tmpChart1,
						"chart2": tmpChart2,
						"chart3": tmpChart3,
						"grid1": tmpChart4,
						"grid2": tmpChart5,
					},
                "svgURL": "resources/images/svg/inspection/inspectionAnalysis.svg"
            }))
			mainpage.ptrMainSection.add(tmpRow1) //Add Header Section to Main Page  
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
			},*/
             {
					"tasktype":"proto",
					"filename":"dashboard/Inspectionanalysis.json"
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
				
				"jms_current":
				{
					"dest":"dashboard.inspection",
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