Ext.define('CueTrans.view.dashboard.vehicleDemandPlanningUser',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Journey Plan Dashboard Current";
			
            // Add Toolbar
            mainpage.toolbarSectionFlag = true;	
			mainpage.liveScreenFlag=false;
			mainpage.toolbarLinks=
		[
			{"name":"Journey","linkid":"jms_analysis"}
		]
			plf.columns = 1
            var tmpRow1 = plf.addGenSection({})
			var tmpTitle=["Normal","Urgent"];
			// Gauge1 Begins
			var tmpChart1 = plf.addGraph({
                "id": "guage1",
                "chartType": "guage",
                "xAxisCaption": "Date",
                "yAxisCaption": "Cost",
                chartHeight: 100,
                chartWidth: 235
            })				
			
			Ext.data.StoreManager.lookup('guage1_store').loadData([{"yaxis":2}],false);
			// Gauge1 End
			
			// chart1 begins
			var tmpChart2= plf.addGraph({
                "id": "chart1",
                "chartType": "column",
                "xAxisCaption": "Inspection Type",
                "yAxisCaption": "Count",
				"lnkID":"origin",
                chartHeight: 140.85614,
                chartWidth: 420.21674
            },this)	
            
			//chart 1 ends
			
			
			
			// chart2 begins
			var tmpChart3 = plf.addGraph({
                "id": "chart2",
                "chartType": "line",
                "xAxisCaption": "Count",
                "yAxisCaption": "Date",
				//"ChartTitle": tmpTitle,
				"lnkID":"origin",
                chartHeight: 140.85614,
                chartWidth: 420.21674
            },this)	
            
			//chart 2 ends
			
			
            
			//Data view begin
			var dataviewobj=
			[					
				{dataname:"strJourneyPlanNo",datatype:"string",width:250,linkId:"JourneyPlan"},			
				{dataname:"strDriverName",datatype:"string",width:250},			
				{dataname:"strOrigin",datatype:"string",width:250},			
				{dataname:"strDestination",datatype:"string",width:250},			
				{dataname:"strImage",datatype:"string",width:140},
				{dataname:"strIconImage",datatype:"string",width:140}
			]
			
			
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
				 '<img width=25 height:25 src="{strIconImage}"/>',
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
				dataviewlnk:"inspection"
			}
			
			var tmpChart4 = plf.addDataView(dataviewcustDtl,this) 
			//Data view end
			
			
			//Data view begin
			var dataviewQuickLinksobj=
			[					
				{dataname:"strImage",datatype:"string",width:140},
				{dataname:"strJourneyPlanNo",datatype:"string",width:100,linkId:"inspection"},		
			]
			
			
			var dataviewQuickLinksTbl = new Ext.XTemplate(
			'<tpl for=".">',
						
			/*
				'<div class="emplWrap quicklnk_dtl" >',					
				'<table width=100% height=50px ><tr><td align="center">',
				 '<span style="font-size:12px;border-style:solid;background-color: #eee; border-color:rgba(246,171,28,255);border-radius: 5px;padding:2px;"><i>Journey plan</i></span>',
				  '</td><td align="center">',				  
				  '<span style="font-size:12px;border-style:solid; border-color:rgba(246,171,28,255);border-radius: 5px;padding:2px;"><i>Journey plan</i></span>',
				  '</td><td align="center">',
				 '<span style="font-size:12px;border-style:solid; border-color:rgba(246,171,28,255);border-radius: 5px;padding:2px;"><i>Journey plan</i></span>',
				 '</td><td align="center">',
				 '<span style="font-size:12px;border-style:solid; border-color:rgba(246,171,28,255);border-radius: 5px;padding:2px;"><i>Journey plan</i></span>',
				 '</td><td align="center">',
				 '<span style="font-size:12px;border-style:solid; border-color:rgba(246,171,28,255);border-radius: 5px;padding:2px;"><i>Journey plan</i></span>',
				  '</td></tr></table>',
				'</div>',
				*/
				
				'<div class="emplWrap quicklnk_dtl" >',					
				'<table width=100% height=50px ><tr><td align="center">',
				 '<input id="gobutton" type="submit" value="Vehicle Inspection"/>',
				  '</td><td align="center">',				  
				  '<input id="gobutton" type="submit" value="Re-Inspection"/>',
				  '</td><td align="center">',
				 '<input id="gobutton" type="submit" value="Load-Inspection"/>',
				 '</td></tr></table>',
				'</div>',
				
				
				//'<input id="gobutton" type="submit" value="Journey plan"/>', 
				//'<input id="bigbutton" type="submit" value="Big Button That Needs Clicking" />',
				
				/*<a href="#" class="push_button red">Push the button</a>
				<a href="#" class="push_button blue">Push the button</a>*/
				
			'</tpl>'
			);
			
			var dataviewQuickLinlsDtl=
			{
				title:"",
				id:"quicklnk_dtl",				
				detail:dataviewQuickLinksobj,
				tbl:dataviewQuickLinksTbl,
				itemSelector:".quicklnk_dtl",
				dataviewlnk:"inspection"
			}
			
			var tmpChart5 = plf.addDataView(dataviewQuickLinlsDtl,this) 
			//Data view end
			
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
						"gauge1": tmpChart1,
						"chart1": tmpChart2,
						"chart2": tmpChart3,
						"dataviewID12": tmpChart4,
						"dataviewID13": tmpChart5,
						//"div4": tmpGrid1,
					},
                "svgURL": "resources/images/svg/VehicleDemandPlanning/vehicleDemandPlanningUser.svg"
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
					"filename":"journey_management/Journey_plan_user.json"
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
				
				"inspection":
				{
					"dest":"journey_management.LoadInspection",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
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
				}
			}
			this.callParent(arguments);
        },
		triggerLink:function()
		{
		alert("Test");
		}

    });