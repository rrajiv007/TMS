/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var  
1.0.2    steffie            19/10/16	74637	         
1.0.3    Divya           6/6/2017       79508                            
************************************************************************************************/
Ext.define('CueTrans.view.track.RequestTrackingDetails', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Request Tracking Details";
		mainpage.toolbarSectionFlag=true;
		//Add Keyfields
		mainpage.keyFields=["strRequestNo"]
		//Driver Master Section Begins
		plf.columns=4
		var ShipTrackColumn = plf.addColumnSection({}); 	//69997
		if(plf.defaultLayout==4)
		{
			plf.columns=4			
			var ShipTrackCtrl=									//69997
			[
				plf.addHlpText({"label":"Request No",id:"strRequestNo",hlpLinkID:"requesthelp"},this),/*74637 changes starts*/
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
				plf.addDisplayOnly({"label":"Request Status",id:"strStatus"}),
				plf.addDisplayOnly({"label":"Ref Doc No",id:"strDocNo"}),	
				plf.addDisplayOnly({"label":"From Region",id:"strFromRegion"}),
				plf.addDisplayOnly({"label":"To Region",id:"strToRegion"}),
				plf.addDisplayOnly({"label":"Priority",id:"strPriority"}),
				plf.addDisplayOnly({"label":"Requestor ID",id:"strRequestorId"}),
				plf.addDisplayOnly({"label":"Requestor Name",id:"strRequestorName"}),
				plf.addDisplayOnly({"label":"Vendor Name",id:"strVendorName"}),
				plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
				plf.addDisplayOnly({"label":"Cost Center Code",id:"strCostCenterCode"}),	
				plf.addDisplayOnly({"label":"Created Date",id:"dtCreatedate"}),
			       plf.addDisplayOnly({"label":"Delivered Date",id:"dtRosDateTime"}),
				    plf.addDisplayOnly({"label":"PO No",id:"strPONum"}) //79508
				
		
			]		
		}
		ShipTrackColumn.add(ShipTrackCtrl); 
		
		var ShipTrackDetailsGridFieldObj2=							//69997
		[   
		       {columnname:"Item Details",dataname:"SHIP_ITEM",datatype:"string",width:130,linkId:"shpitemlink",gridpopup:true,imageURL:"resources/images/shared/calendar.gif",tooltip:"Click here to launch the Item details against Shipment screen."},
                     {columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",width:150,linkId:"shipnolink",tooltip:"Click here to launch the shipment tracking details screen."},
			{columnname:"Shipment Status",dataname:"STATUS",datatype:"string",width:130},
			{columnname:"Shipment Confirmed Date",dataname:"CONFIRMED_DATE",datatype:"string",width:100},
			{columnname:"Shipped Date",dataname:"SHIPED_DATE",datatype:"string",width:100},
			{columnname:"Contractual Delivery Date",dataname:"CON_DELIVERY_DATE",datatype:"string",width:150},
			{columnname:"Delivered Date",dataname:"DELIVERED_DATE",datatype:"string",width:150},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:100},
			{columnname:"Vehicle No",dataname:"VEH_NO",datatype:"string",width:100},
			{columnname:"Carrier Name",dataname:"CARR_NAME",datatype:"string",width:200},
			{columnname:"Driver  Name",dataname:"DRIVER_NAME",datatype:"string",width:200},
			{columnname:"Driver Contact No",dataname:"CONT_NO",datatype:"string",width:200}      /*74637 changes ends*/
		]
		ShipTrackDetailsGridDtl2=
		{
			title:"",
			id:"ShipTrack2",
			detail:ShipTrackDetailsGridFieldObj2,
			removeAddDelete:true,
			visibleRow:15		
		}
		var ShipTrackGridSection2 = plf.addGrid(ShipTrackDetailsGridDtl2,this);	//69997
		
		ShipTrackDetailsPlan = plf.addColumnSection({title:""});
		//ShipTrackDetailsPlan.add(ShipTrackGridSection1);
		//ShipTrackDetailsPlan.add(ShipTrackFormCtrl);
		ShipTrackDetailsPlan.add(ShipTrackGridSection2);	
		//Add Child Sections

		mainpage.ptrMainSection.add(ShipTrackColumn) 
		mainpage.ptrMainSection.add(ShipTrackDetailsPlan)
			   
		//History Data Section 
		mainpage.dataHistorySectionFlag=false;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strRequestNo","reqTrack2"],
				"service":"TMSCoreTransportTS",
				"methodName":"initReqTrackScrTS"
         }	,	/*74637 changes */

          {
					"controlid":"strRequestNo",
					"tasktype":"onenter",
					"input":["strRequestNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"OnenterReqTrackScrTS"
		}
		/*"fireEvent":
					[
						{"controlid":"strShippmentNo","event":"change"}
					]
		
		 {					
					"controlid":"AvlBtn",
					"tasktype":"btnclick",
					"input":["custContGrid","strLoadNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"getGetailsShipTrackTS"
		},
		        {
				"controlid":"strShippmentNo",
				"tasktype":"onchange",
				"input":["strShippmentNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"getGetailsShipTrackTS"
				}	*/	
		];
		
           /*74637 changes starts*/
		mainpage.hlpLinks=
		{
			"requesthelp":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.TransRequestItemHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRequestNo","child":"TRANS_REQ_NO"}
							]
				}
			
		}	
		
		
             mainpage.gridPopupLinks=
		{
			
			"shpitemlink":
			{
				"dest":"tms.shipment_refdoc",
				"popMethodName":"initShipRefDocItemSearchTS",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"SHIPMENT_NO","dest":"selChartSeries"}
						]
			}
		}
              mainpage.screenLinks=
		{
			"shipnolink":
				{
					"dest":"track.ShipmentTrackingDetails",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"SHIPMENT_NO","dest":"strShippmentNo"}
							]
				}
		}	/*74637 changes ends*/
		//Event Handlers Mapping Ends
		this.callParent(arguments);
	}
});