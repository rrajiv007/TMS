/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
                            
************************************************************************************************/
Ext.define('CueTrans.view.track.LoginShipmentTrackingDetails', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Shipment Tracking Details";
		mainpage.toolbarSectionFlag=false;
		//Add Keyfields
		mainpage.keyFields=["strTransporReqNo"]
		//Driver Master Section Begins
		plf.columns=4
		var ShipTrackColumn = plf.addColumnSection({});			
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var ShipTrackCtrl=				
			[
				plf.addDisplayOnly({"label":"Shipment No",id:"strShippmentNo"}),	
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
				plf.addDisplayOnly({"label":"Shipment Status",id:"strStatus"}),
				plf.addDisplayOnly({"label":"Request No",id:"strRequestNo"}),
				plf.addDisplayOnly({"label":"From Region",id:"strFromRegion"}),
				plf.addDisplayOnly({"label":"To Region",id:"strToRegion"}),
				plf.addDisplayOnly({"label":"Ref Doc No",id:"strDocNo"}),	
				plf.addDisplayOnly({"label":"Priority",id:"strPriority"}),
				plf.addDisplayOnly({"label":"Cost Center Code",id:"strCostCenterCode"}),
				plf.addDisplayOnly({"label":"Vendor Name",id:"strVendorId"}),
				plf.addDisplayOnly({"label":"Load No",id:"strLoadNo"}),
				plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"}),
				plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
				plf.addDisplayOnly({"label":"Created Date",id:"dtCreatedDate"}),
				plf.addDisplayOnly({"label":"PickUp Date",id:"dtPickUpDate"}),
				plf.addDisplayOnly({"label":"Shipped Date",id:"dtShipDate"}),
				plf.addDisplayOnly({"label":"Contract Delivery Date",id:"dtContraDate"}),
				plf.addDisplayOnly({"label":"Changed Delivery Date",id:"dtRosDateTime"}),
				plf.addDisplayOnly({"label":"Delivered Date",id:"dtDelvDateTime"}),
				plf.addDisplayOnly({"label":"VehicleNo",id:"strVehNo"}),
				plf.addDisplayOnly({"label":"Carrier Name",id:"strCarrier"}),
				plf.addDisplayOnly({"label":"Driver Name",id:"strDriver"}),
				plf.addDisplayOnly({"label":"Driver Contact No",id:"strContactNo"}),
				plf.addDisplayOnly({"label":"SLA Status",id:"strSLA"}),
				plf.addDisplayOnly({"label":"PO No",id:"strPONum"}), 
			    plf.addButton({"label":"View Item Details",id:"itemdtl",tooltip:"Click here to view Item details.",
						"handler": function() 
							{
								mainpage.launchHlpLink("itemdtls")
							}
						}),
				plf.addButton({"label":"Back","id":"Back",width:150,
							handler:function(obj)
							{
								//window.location.href="";	
								mainpage.processHLink("shipmenttrack")
							}
						  })
				
			]  
		
		}
		ShipTrackColumn.add(ShipTrackCtrl); 

		
		var ShipTrackDetailsGridFieldObj2=								//69997
		[   
			{columnname:"Milestone",dataname:"MILESTONE",datatype:"string",width:250},
			{columnname:"Completed Date Time",dataname:"COMP_DATE_TIME",datatype:"string",width:200},
			{columnname:"Elapsed Time (hh:mm)",dataname:"ELAPSED_TIME",datatype:"string",width:250},
			{columnname:"Cumulative Elapsed Time (hh:mm)",dataname:"CUM_ELAPSED_TIME",datatype:"string",width:250}
		]
		ShipTrackDetailsGridDtl2=
		{
			title:"",
			id:"ShipTrack2",
			detail:ShipTrackDetailsGridFieldObj2,
			removeAddDelete:true,
			visibleRow:15,
			removeTbar:true,
			removePaging:true,
			readonly:true
		
		}
		var ShipTrackGridSection2 = plf.addGrid(ShipTrackDetailsGridDtl2,this);		//69997
		
		ShipTrackDetailsPlan = plf.addColumnSection({title:""});
		//ShipTrackDetailsPlan.add(ShipTrackGridSection1);
		//ShipTrackDetailsPlan.add(ShipTrackFormCtrl);
		ShipTrackDetailsPlan.add(ShipTrackGridSection2);	
	
	
		var ShipTrackColumn3 = plf.addColumnSection({});				//69997
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var ShipTrackCtrl3=											//69997
			[	
			    plf.addDisplayOnly({"label":"SLA (hrs)",id:"strSla"}),	
				plf.addDisplayOnly({"label":"Time Taken (hrs)",id:"tmTimeTaken"}),
				//plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addDisplayOnly({"label":"Time Saved/Lost",id:"strTimediff"}),
			]
		
		}
		
		ShipTrackColumn3.add(ShipTrackCtrl3);
	
		//Add Child Sections
		
		mainpage.ptrMainSection.add(ShipTrackColumn) 
		//mainpage.ptrMainSection.add(ShipTrackColumn3)  /*74637 changes*/
		mainpage.ptrMainSection.add(ShipTrackDetailsPlan)
		//mainpage.ptrMainSection.add(materialDetailsAct)		
		//mainpage.ptrMainSection.add(MaterialDetailsGridSection1)	
		//mainpage.ptrMainSection.add(weightColumn1)
       	//mainpage.ptrMainSection.add(MaterialDetailsGridSection2)
        //mainpage.ptrMainSection.add(weightColumn2)
        //mainpage.ptrMainSection.add(MaterialDetailsGridSection3)
        //mainpage.ptrMainSection.add(ItemBasedColumn3)		
		   
		//History Data Section 
		mainpage.dataHistorySectionFlag=false;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strShippmentNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"initShipTrackScrTS"
				
		},	

         {
					"controlid":"strShippmentNo",
					"tasktype":"onenter",
					"input":["strShippmentNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"OnenterShpTrackScrTS"
		}
		 /*{					
					"controlid":"AvlBtn",
					"tasktype":"btnclick",
					"input":["custContGrid","strLoadNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"getGetailsShipTrackTS"
		}	,
		
        {
				"controlid":"strShippmentNo",
				"tasktype":"onchange",
				"input":["strShippmentNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"getGetailsShipTrackTS"
				}	*/	
		
		];
		mainpage.screenLinks=	
		{	
				"shipmenttrack":
				{
					"dest":"track.LoginShipmentTrack",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
		mainpage.hlpLinks=
		{
			
			"shipmenthelp":                                               /*74637 changes starts*/
				{
					"hlpType":"Header",
					"hlpScreen":"tms.ShipmentHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strShippmentNo","child":"SHIPMENT_NO"}
							]
				},
     "transrequestno":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.TransRequestItemHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRequestNo","child":"TRANS_REQ_NO"}
							]
				}		,

     "itemdtls":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.shipment_refdoc",
					"send":[
							{"parent":"strShippmentNo","child":"selChartSeries"}
						   ],
					"receive":[
							{"parent":"","child":""}
							]
				}					                             /*74637 changes ends*/
		}		
		//Event Handlers Mapping Ends

		this.callParent(arguments);
		
	}
});
