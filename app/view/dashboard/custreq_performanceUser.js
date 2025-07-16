Ext.define('CueTrans.view.dashboard.custreq_performanceUser',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Customer Request Dashboard";
			
            // Add Toolbar
            mainpage.toolbarSectionFlag = true;	
			mainpage.liveScreenFlag=false;
			mainpage.toolbarLinks=
		[
			{"name":"request","linkid":"jms_current"}
		]
			plf.columns = 1
            var tmpRow1 = plf.addGenSection({})
			var tmpTitle=["Normal","Urgent"];
			
			
			// Grid sec begins
			var gridcustobj=
			[					
				{columnname:"Origin",dataname:"origin",datatype:"string",width:95},		
				{columnname:"Destination",dataname:"destination",datatype:"string",width:95},						
				{columnname:"Load",dataname:"tot_weight",datatype:"string",width:90}
			]
			var gridcustDtl=
			{
				title:"",
				id:"customer_dtl",
				removetoolbar:true,
				detail:gridcustobj,
				visibleRow:plf.searchVisibleRows,
				readOnly:true,
				removeAddDelete:false,
				removeFilter:false
			}
			var tmpChart1 = plf.addGrid(gridcustDtl,this) 
			// Grid sec ends
			
			// chart1 begins
			var tmpChart2 = plf.addGraph({
                "id": "chart1",
                "chartType": "column",
                "xAxisCaption": "Customer",
                "yAxisCaption": "Weight(Tons)",
				"ChartTitle": tmpTitle,
				"lnkID":"origin",
                chartHeight: 164.7209,
                chartWidth: 547.11646
            },this)	
			Ext.data.StoreManager.lookup('chart1_store').loadData([
				{"yaxis":110,"data1":5000,"xaxis":"Matrix"},
				{"yaxis":80,"data1":1000,"xaxis":"Oman Salt"},
				{"yaxis":105,"data1":4000,"xaxis":"PDO"},
				{"yaxis":160,"data1":1000,"xaxis":"BP Petroleum"}
										
				],false);
			// chart1 end
			
			// chart2 begins
			var tmpChart3 = plf.addGraph({
                "id": "chart2",
                "chartType": "line",
                "xAxisCaption": "Date",
                "yAxisCaption": "Weight(Tons)",
				"ChartTitle": tmpTitle,
				"lnkID":"origin",
                chartHeight: 173.41141,
                chartWidth: 547.11542
            },this)	
			Ext.data.StoreManager.lookup('chart2_store').loadData([
				{"yaxis":1000,"data1":5000,"xaxis":"JAN-29"},
				{"yaxis":9000,"data1":1000,"xaxis":"JAN-30"},
				{"yaxis":5000,"data1":4000,"xaxis":"JAN-31"},
				{"yaxis":4000,"data1":1000,"xaxis":"FEB-01"},
				{"yaxis":2000,"data1":1000,"xaxis":"FEB-02"},
				{"yaxis":500,"data1":9000,"xaxis":"FEB-03"},
				{"yaxis":3000,"data1":1000,"xaxis":"FEB-04"}							
				],false);
			// chart2 end
			
			      
			//Data view begin
			var dataviewobj=
			[					
				{dataname:"strRequestNo",datatype:"string",width:250,linkId:"request"},			
				{dataname:"strOrigin",datatype:"string",width:250},			
				{dataname:"strDestination",datatype:"string",width:250},			
				{dataname:"strImage",datatype:"string",width:140},
				{dataname:"strIconImage",datatype:"string",width:140}
			]
			
			
			var dataviewTbl = new Ext.XTemplate(
			'<tpl for=".">',
				'<div class="emplWrap request_dtl" >',					
				'<table width=100%><tr><td>',
				 '<img width=50 height=50 src="{strImage}"/>',
				  '</td><td>',				  
				  '<br/><span style="font-size:12px"><b> {strRequestNo}</b></span>',
				 '<br/><span style="font-size:11px">({strOrigin}-{strDestination}) </span>',
                  /*'<br/><span>Origin: {strOrigin}</span>',
				  '<br/><span>Destination: {strDestination}</span>',*/
				   //'<br/><span>Vehicle Code: {strVehicleCode}</span>',
				  '</td><td>',
				
				  '</td></tr></table>',
				'</div>',
			'</tpl>'
			);
			
			var dataviewcustDtl=
			{
				title:"",
				id:"request_dtl",				
				detail:dataviewobj,
				tbl:dataviewTbl,
				itemSelector:".request_dtl",
				dataviewlnk:"JourneyPlan"
			}
			
			var tmpChart4 = plf.addDataView(dataviewcustDtl,this) 
			//Data view end
			
			
			//Data view begin
			var dataviewQuickLinksobj=
			[					
				{dataname:"strImage",datatype:"string",width:140},
				{dataname:"strRequestNo",datatype:"string",width:100,linkId:"requestno"},		
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
				 '<input id="gobutton" type="submit" value="Update"/>',
				  '</td><td align="center">',				  
				  '<input id="gobutton" type="submit" value="Re-Plan"/>',
				  '</td><td align="center">',
				 '<input id="gobutton" type="submit" value="Re-Create"/>',
				 '</td><td align="center">',
				 '<input id="gobutton" type="submit" value="Journey Debriefing"/>',
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
				dataviewlnk:"RequestQlink"
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
						"grid1": tmpChart1,
						"chart1": tmpChart2,
						"chart2": tmpChart3,
						"dataviewID12": tmpChart4,
						"dataviewID13": tmpChart5,
						//"div4": tmpGrid1,
					},
                "svgURL": "resources/images/svg/CustomerRequest/custReqUserScreen.svg"
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
					"filename":"dashboard/customerrequestuser.json"
				}
				
			];
			mainpage.screenLinks=
			{
			"jms_current":
				{
					"dest":"dashboard.custreq_performanceCurrent",
					"tab":"dashboard",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"requestno":
				{
					"dest":"tms.TransRequestItemBased",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"RequestQlink":
				{
					"dest":"tms.TransRequestItemBased",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"strRequestNo","dest":"strRequestNo"}
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