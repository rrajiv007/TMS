/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :CUTRANS
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.track.LoginShipmentTrack', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Shipment Tracking";
	
		plf.columns=4
		mainpage.toolbarSectionFlag=false;
		mainpage.toolbarLinks=
		[
		]

		var TrackShipColumn = plf.addColumnSection({});	
		
		var TrackShipFormCtrl=		
		[			
			plf.addText({"label":"Shipment #",id:"strShippmentNo"}),	
			plf.addText({"label":"Ref Doc No",id:"strRefDocNo"}),
			plf.addText({"label":"PO #",id:"strPONum"}) ,
			plf.addText({"label":"Load #",id:"strLoadNo"})
		
		]
		
		TrackShipColumn.add(TrackShipFormCtrl);
		
		//button section
		plf.columns=4
		var TrackShipButtonColumn = plf.addColumnSection({});
		TrackShipFormCtrl=
		[  
		  plf.addBlank(),
		  plf.addButton({"label":"Submit","id":"Submit",width:150}),  
		  plf.addButton({"label":"Back","id":"Back",width:150,
							handler:function(obj)
							{
								window.location.href="";					
							}
						  }),
		plf.addBlank()
		
		]

		TrackShipGridSection=
		[   
			{columnname:"Shipment #",dataname:"SHIPMENT_NO",datatype:"string",width:150,linkId:"shipnolink",tooltip:"Click here to launch the shipment tracking details screen."}, 
			{columnname:"Ref Doc #",dataname:"REF_DOC_NO",datatype:"string",width:100},
			{columnname:"PO #",dataname:"PO_NUM",datatype:"string",width:150},
			{columnname:"Shipment Priority",dataname:"PRIORITY",datatype:"string",width:100},
			{columnname:"Shipment Status",dataname:"STATUS",datatype:"string",width:130},
			{columnname:"Load #",dataname:"LOAD_NO",datatype:"string",width:100},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:100},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:100},
			{columnname:"From Region",dataname:"FROM_REGION",datatype:"string",width:100},
			{columnname:"To Region",dataname:"TO_REGION",datatype:"string",width:100},
			{columnname:"Created Date",dataname:"CREATED_DATE",datatype:"string",width:100},
			{columnname:"PickUp Date",dataname:"PICKUP_DATE",datatype:"string",width:150},
			{columnname:"Contractual Delivery Date",dataname:"CON_DELIVERY_DATE",datatype:"string",width:150},
			{columnname:"Delivered Date",dataname:"DELIVERED_DATE",datatype:"string",width:150}
		]
		TrackShipDetails=
		{
			title:"Shipment Details",
			id:"reqtrackGrid",
			detail:TrackShipGridSection,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		TrackShipGridSectionSection = plf.addGrid(TrackShipDetails,this)

		// Grid section Ends	
		
		TrackShipButtonColumn.add(TrackShipFormCtrl)
		mainpage.ptrMainSection.add(TrackShipColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(TrackShipButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(TrackShipGridSectionSection)		

		mainpage.eventHandlers = 
		[	
        	{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initloginShpTrackTS"
				},
            {
			   "controlid":"Submit",
				"tasktype":"btnclick",
				"input":["strLoadNo","strShippmentNo","strRefDocNo","strPONum"], 
				"service":"TMSCoreTransportTS",
				"methodName":"fetchloginShpTrackTS"
			}	
					
		];
		mainpage.screenLinks=	
		{	
				"shipnolink":
				{
					"dest":"track.LoginShipmentTrackingDetails",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"SHIPMENT_NO","dest":"strShippmentNo"}
							]
				}
		} 
		
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});