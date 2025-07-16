/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
		                                   
************************************************************************************************/
Ext.define('CueTrans.view.CueTrack_Dashboard.managementDashboard',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Management Dashboard";
            // Add Toolbar
            mainpage.toolbarSectionFlag = true;	
			mainpage.liveScreenFlag=true;
			mainpage.toolbarLinks=
			[
				
				{"name":"OperatorDashboard","linkid":"db_supervisorDash"}
				
			]
			
			//To add combo Starts
			plf.columns = 4	
            var tmpRow1 = plf.addGenSection({})			
			/*Search Criteria starts here*/
			/*tmpRow1.add(
				plf.addLabel({"text":"Customer Request Dashboard",id:"strStatus"}))	*/
			
			tmpRow1.add(
				plf.addCombo({"label":"Period",id:"strPeriod"}))
			//To add combo end
				
				
			//Svg starts here
			plf.columns = 1
            var tmpManagementPanel = plf.addGenSection({"cls":"chart_panel_container"});	
			var tmpTitle=["",""];
			
			// Ticket Turnaround time begins
			var turnaroundSummary= plf.addChart({
                "id": "turnaround_time",
				"xAxisCaption": "Time Taken",
                "xAxisColumn":"DIFFINDAYS",
				"chartTheme":"chartTheme1",
                "yAxisCaption": "Tickets",
				"chartTheme":"chartTheme3",
				"chartTitle": "Ticket Turnaround Time",
				"heightFactor":.46,
				"popScreen":"LiveDashboard.inspection_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"TMSLiveInspDashINSPTYPE",
				"columnWidth": .3,
				seriesArray:[
					{type:"bar",field:["COUNT"]}					
				]				
            },this)
			
			tmpManagementPanel.add(turnaroundSummary)
			
			/*
			// Grid sec Violation begins
			var zoneSummary= plf.addChart({
                "id": "zone",
				"xAxisCaption": "Zone",
                "xAxisColumn":"ZONE",
                "yAxisCaption": "Count",
				"chartTitle": "Zone / Exchange wise Ticket View",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.inspection_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"TMSLiveInspDashINSPTYPE",
				"columnWidth": .33,
				seriesArray:[
					{type:"bar",field:["COUNT"]}					
				]				
            },this)
			
			tmpManagementPanel.add(zoneSummary)
			*/
			
			var gisLayer = Ext.create("Ext.panel.Panel",
						{
							//itemId:"cueGisLayer",
							//id:"cueGisLayer",
							title:"Ticket by Zone",
							cls:"chart_container",
							layout:'fit',
							height:(plf.screenHeight-170-20)*.5,
							//heightFactor:.5,
							columnWidth:.7
						})
			

			gisLayer.on("afterrender",
				function()
				{
					var cueGisDiv = gisLayer.getEl().dom;
					console.log("cuegis",cueGisDiv)
				
					 CueGis.getImplementation({
							log : true,
							dataSource : 'tenant1'
						}, function(mapImpl) {
							cuecentGISPallet = new CuecentGISPallet({
								//container : document.getElementById('cueGisLayer'),
								container :  cueGisDiv,
								enablePallet : false,
								mapOptions : {
									zoom : 8,
									center : [ 4.4457281,114.7821585 ],
									scale : 'metric'
								}
							}, mapImpl);
							poiElement = new PoiElement({
								
							});
							fenceElement = new FencingElement({
								container : undefined,
								fenceOptions :{
									strokeColor : '#FF4000',
									strokeOpacity : 0.6,
									fillColor : '#FF4000',
									fillOpacity : 0.2,
									draggable : false,
									editable : true
								},
								events : {
									'click' : function(a,b) {
										console.log(b.businessParam);
									}
								},
								isClusteringEnabled : true
							});
							cuecentGISPallet.addElement(poiElement);
							cuecentGISPallet.addElement(fenceElement);
							Ext.Ajax.request({
								url : 'fence.json',
								success : function(result) {
									var fenceData = JSON.parse(result.responseText);									
									for(var i=0;i<fenceData.length; i++) {
										var fence = fenceData[i];
										
										fenceElement.updateFenceOptions({
											strokeColor : fenceColors[i] || 'RED',
											strokeOpacity : 0.6,
											fillColor : fenceColors[i] || 'RED',
											fillOpacity : 0.2,
											draggable : false,
											editable : true
										});
										
										var fenceObj = fenceElement.load({
											geoJson : fence.geoJson,
											config : {
												fenceId : fence.id,
												toolTip : fence.name+":" + fence.count
											},
											type : fence.fenceType,
											cuecentGISPallet : cuecentGISPallet
										});	
										fenceObj.businessParam=fence.name;
									};							
									cuecentGISPallet.fitView();
								}
							})
						});					
				});
			
			tmpManagementPanel.add(gisLayer)
			
            //var tmpWCloudPanel = plf.addGenSection({"cls":"chart_panel_container"});	

			
			
			
			//tmpJourneyPanel.add(tmpgridLostSummary)
			
			
			// Grid sec Lost Vehicles ends
			
			
			
			// Grid sec Overdue Vehicles begins
			var channelSummary= plf.addChart({
                "id": "channel",
				"xAxisCaption": "Channel",
                "xAxisColumn":"CHANNELNAME",
                "yAxisCaption": "Tickets",
				"chartTheme":"chartTheme2",
				"chartTitle": "Trend By Channel",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.inspection_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"TMSLiveInspDashINSPTYPE",
				"columnWidth": .33,
				seriesArray:[
					{type:"line",field:["COUNT"]}					
				]				
            },this)
			// Grid sec Overdue Vehicles ends
			
			
			// Grid sec Violation ends
			
			
			// Grid sec Violation begins
			var compTypeSummary= plf.addChart({
                "id": "conplaintType",
				"xAxisCaption": "Ticket Type",
                "xAxisColumn":"TICKETCATEGORY",
                "yAxisCaption": "Tickets",
				"chartTheme":"chartTheme1",
				"chartTitle": "Trend by Ticket Type",
				"heightFactor":.5,
				"popScreen":"LiveDashboard.inspection_dtl",
				"popSeriesCtrl":"selChartSeries",
				"popValueCtrl":"selChartValue",
				"popMethodName":"TMSLiveInspDashINSPTYPE",
				"columnWidth": .33,
				seriesArray:[
					{type:"bar",field:["COUNT"]}					
				]				
            },this)
		
				
			
			
			//mainpage.ptrMainSection.add(tmpRow1)
			//tmpManagementPanel.add(turnaroundSummary)
			//tmpManagementPanel.add(zoneSummary)
			//tmpManagementPanel.add(tmpWCloudPanel)
			tmpManagementPanel.add(channelSummary)					
			tmpManagementPanel.add(compTypeSummary)
			
			/*Svg starts here*/
			tmpManagementPanel.add(
				plf.addSvg({
					"id": "wordCloud",
					"svgID": "wordCloud",
					"columnWidth": .34,					
					"heightFactor":.5,
					"svgData": {
						//"iReqReceived": "",
						/*"iCustReqNorm": "",
						"iCustReqUrg": "",
						"iShipCreated": "",
						"iShipCreatedNorm1":"",
						"iShipCreatedUrg":""*/
					},
					"svgLinks":
						[	
							//{"linkId":"iReqReceived","popScreen":"LiveDashboard.request_dtl","popMethodName":"initCustReqDB5"},
							/*{"linkId":"iCustReqNorm","popScreen":"LiveDashboard.request_dtl","popMethodName":"initCustReqDBNor5"},
							{"linkId":"iCustReqUrg","popScreen":"LiveDashboard.request_dtl","popMethodName":"initCustReqDBUrg5"},
							{"linkId":"iShipCreated","popScreen":"LiveDashboard.shipment_dtl","popMethodName":"initshipmentcntDB1"},
							{"linkId":"iShipCreatedNorm1","popScreen":"LiveDashboard.shipment_dtl","popMethodName":"initShipmentBNor2"},
							{"linkId":"iShipCreatedUrg","popScreen":"LiveDashboard.shipment_dtl","popMethodName":"initShipmentDBUrg3"}*/
						],
					"svgURL": "resources/images/svg/Dashboard/cloud.svg"
            },this))
			/*Svg ends here*/
			
			mainpage.ptrMainSection.add(tmpManagementPanel)
			
			//mainpage.ptrMainSection.add(map)
			//mainpage.ptrMainSection.add(tmpPanel)
			/*Svg ends here*/
			mainpage.eventHandlers = 
			[
			
			{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"TKTCoreTicketTS",
					"methodName":"dashTwitterIntg"
			},	
			{
				"tasktype":"proto",
				"filename":"CuetrackDashboard/management.json"
			}
			];		
			
			mainpage.screenLinks=
			{
			"db_supervisorDash":
			{
				"dest":"CueTrack_Dashboard.TicketDashboard",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
			}
		}
	/*	mainpage.gridPopupLinks=
		{
			"TweetLink":
			{
				"dest":"https://twitter.com/search?src=typd&q=telbru",
				"popMethodName":"initCustReqDBgrid",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
			}
		}*/
			this.callParent(arguments);
        },
		triggerLink:function()
		{
		alert("Test");
		}

    });