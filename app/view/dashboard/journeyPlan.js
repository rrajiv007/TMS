Ext.define('CueTrans.view.dashboard.journeyPlan',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Journey Plan Current Dashboard";
			
            // Add Toolbar
            mainpage.toolbarSectionFlag = true;	
			mainpage.liveScreenFlag=false;
			mainpage.toolbarLinks=
		[
			{"name":"Journey","linkid":"jms_analysis"}
			//{"name":"journeydash","linkid":"db_journeydash"}
		]
			plf.columns = 1
            var tmpRow1 = plf.addGenSection({})
			
			// Gauge1 Begins
			var tmpChart = plf.addGraph({
                "id": "guage1",
                "chartType": "guage",
                "xAxisCaption": "Date",
                "yAxisCaption": "Cost",
                chartHeight: 108.97917,
                chartWidth: 183.97917
            })			
			
			/*Ext.data.StoreManager.lookup('guage1_store').loadData([{"yaxis":50}],false);*/
			// Gauge1 End
			
			// Gauge Begins
			var tmpChart1 = plf.addGraph({
                "id": "guage2",
                "chartType": "guage",
                "xAxisCaption": "Date",
                "yAxisCaption": "Cost",
                chartHeight: 108.97917,
                chartWidth: 183.97917
            })			
			
			/*Ext.data.StoreManager.lookup('guage2_store').loadData([{"yaxis":50}],false);*/
			// Gauge2 End	
			
            
			var dataviewobj=
			[					
				{dataname:"strJourneyPlanNo",datatype:"string",width:250,linkId:"JourneyPlan"},			
				{dataname:"strDriverName",datatype:"string",width:250},			
				{dataname:"strOrigin",datatype:"string",width:250},			
				{dataname:"strDestination",datatype:"string",width:250},			
				{dataname:"strImage",datatype:"string",width:140},
				{dataname:"strIconImage",datatype:"string",width:140}
			]
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
			
			var dataviewTbl = new Ext.XTemplate(
			'<tpl for=".">',
				'<div class="emplWrap customer_dtl" >',					
				'<table width=100%><tr><td>',
				 '<img width=50 height=50 src="{strImage}"/>',
				  '</td><td>',				  
				  '<br/><span style="font-size:12px"><b> {strJourneyPlanNo}</b></span>',
				 '<br/><span style="font-size:11px">{strDriverName} ({strOrigin}-{strDestination}) </span>',
                  /*'<br/><span>Origin: {strOrigin}</span>',
				  '<br/><span>Destination: {strDestination}</span>',*/
				   //'<br/><span>Vehicle Code: {strVehicleCode}</span>',
				  '</td><td>',
				 '<img width=20 height:20 src="{strIconImage}"/>',
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
				dataviewlnk:"JourneyPlan"
			}
			
			var tmpChart3 = plf.addDataView(dataviewcustDtl,this) 
			/*			
			Ext.data.StoreManager.lookup('customer_dtl_store').loadData(
			[
			{ "strImage":'resources/images/dataview/greenIcon.jpg', "strDriverCode":'D45678',"strJourneyPlanNo":'JP/D05/0001/SEP/2014',"strIconImage":'resources/images/dataview/greenIcon.jpg'},
            { "strImage":'resources/images/dataview/greenIcon.jpg', "strDriverCode":'D45678',"strJourneyPlanNo":'JP/D05/0001/SEP/2014',"strIconImage":'resources/images/dataview/greenIcon.jpg'},
            { "strImage":'resources/images/dataview/greenIcon.jpg', "strDriverCode":'D45678',"strJourneyPlanNo":'JP/D05/0001/SEP/2014'"strIconImage":'resources/images/dataview/greenIcon.jpg'},
            { "strImage":'resources/images/dataview/greenIcon.jpg', "strDriverCode":'D45678',"strJourneyPlanNo":'JP/D05/0001/SEP/2014'"strIconImage":'resources/images/dataview/greenIcon.jpg'}				
			],false);*/
			//console.log(tmpChart3,"tmpChart3");
			tmpRow1.add(
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
						"guage2": tmpChart1,
						"dataviewID": tmpChart3,
						//"div4": tmpGrid1,
					},
                "svgURL": "resources/images/svg/journeyplan/journey100.svg"
            }))
			//mainpage.ptrMainSection.add(tmpRow1) //Add Header Section to Main Page  
			mainpage.ptrMainSection.add(tmpRow1)
			//mainpage.ptrMainSection.add(tmpRow3) 
            
			mainpage.eventHandlers = 
			[
			
			/*{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreJourneyPlanService",
					"methodName":"initJourneyCurrentDashTS"
			}	,*/
			{
					"tasktype":"proto",
					"filename":"journey_management/Journey_plan_current.json"
				}
				
			];
			mainpage.screenLinks=
			{
			"JourneyPlan":
				{
					"dest":"journey_management.JourneyPlan",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"strJouneyPlanNo","dest":"strJouneyPlanNo"}
							]
				},
				
				"jms_analysis":
				{
					"dest":"dashboard.journeyPlanAnalysis",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"db_journeydash":
				{
					"dest":"dashboard.journeyPlanUser",
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