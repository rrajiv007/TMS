/************************************************************************************************
Modification History        									                               	
************************************************************************************************
Description :Proof of Delivery – Shipment Level
Author      :Vidhya                                                           		         
Version     : 1.0.0
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1      Vidhya   P        29/Dec/2016    75248           Added Shipment No mandatory
1.0.2      Vidhya   P        29/Dec/2016    75267 & 75265            
************************************************************************************************/
Ext.define('CueTrans.view.ProofOfDelivery.ProofofDeliveryShipmentLevel',

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Proof of Delivery – Shipment Level";
		mainpage.toolbarSectionFlag=true;
		//mainpage.liveScreenFlag=false;
		mainpage.toolbarLinks=
		[
			//{"name":"Load Level","linkid":"load_level","tooltip":"Click here to capture POD for load level."}			
		]
		//Tool bar Section begins
		mainpage.toolbarActions= 
		[
		    {
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			
			{
                "name": "Save",
                "tooltip": "Click here to save."
            }
        ]
//Tool bar Section ends		
		
//  Header Section begins	
		plf.columns=4
		var shipmentLevelHdrColumn = plf.addColumnSection({});			
		var shipmentLevelHdrCtrl=						
		[
			plf.addHlpText({"label":"Shipment No",id:"strShippmentNo",mandatory:"true",hlpLinkID:"shipmentno"},this),
            plf.addDisplayOnly({"label":"Ref Doc No",id:"strDocNo"}),
			plf.addDisplayOnly({"label":"Vendor Name",id:"strVendorName"}),
			plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"}),
			plf.addDisplayOnly({"label":"Quantity",id:"strQty"}),
			plf.addDisplayOnly({"label":"Weight(ton)",id:"strWeight"}),
			plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
			plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
			plf.addDisplayOnly({"label":"Contractual Delivery Date/Time",id:"dtContDeliveryDate"}),
			plf.addDisplayOnly({"label":"Delivered Date/Time",id:"dtDeliveredDate"}),
			plf.addDisplayOnly({"label":"Load No",id:"strLoadNo"}),
			plf.addDisplayOnly({"label":"Load Description",id:"strLoadDesc"}),
			plf.addBlank(),
			plf.addDisplayOnly({"label":"Journey Plan No",id:"strJourneyPlanNo"})
			//plf.addHlpText({"label":"Load No",id:"strLoadNo",hlpLinkID:"loadNo"},this),
			//plf.addDisplayOnly({"label":"Jounrney Plan No",id:"strJourneyPlanNo"}),
			
			//plf.addDisplayOnly({"label":"Load Description",id:"strLoadDesc"}),
			//plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
			//plf.addDisplayOnly({"label":"Destination",id:"strDestination"})
          
				
            
		]
		shipmentLevelHdrColumn.add(shipmentLevelHdrCtrl);
		
		var ScheVehDetails= plf.addColumnSection({title:"Scheduled Asset Details"});
		
		var ScheVehDetailsCtrl=
		[   
		   plf.addDisplayOnly({"label":"Vehicle No",id:"strSchVehicleNo"}),
		   plf.addDisplayOnly({"label":"Driver Name",id:"strSchDriverName"}),
		   plf.addDisplayOnly({"label":"Driver Contact",id:"strDriContactNo"}),
		   plf.addDisplayOnly({"label":"Trailer Code",id:"strSchTrailerCodeSC"})
			 
			  
		]
		
		ScheVehDetails.add(ScheVehDetailsCtrl);
		
		 
		
		var ReportVehDetails= plf.addColumnSection({title:"Reporting Asset Details"});
		
		var ReportVehDetailsCtrl=
		[   
		    plf.addDisplayOnly({"label":"Vehicle No",id:"strVehicleNo"}),
			plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
			plf.addDisplayOnly({"label":"Driver Contact",id:"strRptDriContactNo"}),
			plf.addDisplayOnly({"label":"Trailer Code",id:"strRptTrailerCodeSC"})
		]
		
		ReportVehDetails.add(ReportVehDetailsCtrl);

// Header Section ends	

//  Header Section begins	
		plf.columns=4
		var shipmentLvlHdrColumn = plf.addColumnSection({title:"POD  Details"});			
		var shipmentLvlHdrCtrl=						
		[
			plf.addDisplayOnly({"label":"Received By",id:"strReceivedBy",width:200}),
			//plf.addDate({"label":"Received Date",id:"dtReceivedDate",inputFormat:"string",InputLength:"100",mandatory:"true"}),
			//plf.addTime({"label":"Received Time",id:"dtReceivedTime",inputFormat:"string",InputLength:"100",mandatory:"true"}),
			plf.addRegexDateTime({"label":"Received Date & Time",dateid:"dtReceivedDate",timeid:"dtReceivedTime"}),
			plf.addCheckBox({"labelWidth":250,"label":"Material Received in Good Condition",id:"strMRGC",inputFormat:"string",InputLength:"100"})
            
		]
		shipmentLvlHdrColumn.add(shipmentLvlHdrCtrl);

// Update Carrier Request Header Section ends	
var freeTextEditor = plf.addColumnSection({title:"Notes"});
		
		freeTextEditor.add({
                 xtype: "container",
                 layout: "column",
                 //cls: plf.getContainerCls(),
                 items: 
				 [						
						 Ext.create('Ext.form.field.TextArea', {
							itemId:"strNotes",
							label:"Body",
							height: 150,
							width:plf.screenWidth-120
						})
                 ]
             })
		
		//mainpage.dataHistorySectionFlag=true;				
		
//Main Page Section Starts

		mainpage.ptrMainSection.add(shipmentLevelHdrColumn)
		mainpage.ptrMainSection.add(ScheVehDetails)
		mainpage.ptrMainSection.add(ReportVehDetails)
		mainpage.ptrMainSection.add(shipmentLvlHdrColumn)
		mainpage.ptrMainSection.add(freeTextEditor)
		mainpage.dataHistorySectionFlag=true;
		
//Main Page Section ends
		
// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
            {
				"controlid":"",
				"tasktype":"onload",
				"input":["strShippmentNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"initProfDelShipTS"  
			} ,
			{
				"controlid":"strShippmentNo",
				"tasktype":"onenter",
				"input":["strShippmentNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchProfDelShipTS"
			},
			{
				"controlid":"strShippmentNo",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strShippmentNo","dtReceivedDate","dtReceivedTime","strMRGC","strNotes","strLoadNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"SaveProfDelShipTS"
			} 
		];
		
// Event Handlers Mapping ends

// Help link section starts	
		mainpage.hlpLinks=
		{
			"shipmentno":
				{
					"hlpType":"Header",
					"hlpScreen":"ProofOfDelivery.PODShipmentHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strShippmentNo","child":"SHIPMENT_NO"}
							//{"parent":"strRequestNo","child":"TRANS_REQ_NO"}							
							]
				}
	  }
// Help link section ends
	mainpage.screenLinks=
		{
			"load_level":
				{
					"dest":"ProofOfDelivery.ProofofDeliveryLoadLevel",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}

		this.callParent(arguments);
		
	}
});