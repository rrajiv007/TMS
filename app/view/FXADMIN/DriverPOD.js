Ext.define('CueTrans.view.FXADMIN.DriverPOD', 
/****************************************************************************************************************
                                          Modification History                                                                                                                                                                                
****************************************************************************************************************               
Description           :                                                                                                                      
Author                :  FX
Version               :  1.0.0

****************************************************************************************************************               
Version              Modified By      Date               Defect ID                 Remarks            
****************************************************************************************************************               
****************************************************************************************************************/
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Receive Shipment";
		mainpage.toolbarSectionFlag=true;		
		mainpage.toolbarActions= 
		[	{
                "name": "Receive",
                "tooltip": "Click here to receive shipment"
            }
		]
		//Header Section starts
		plf.columns=3
		var HdrSection = plf.addColumnSection({title:"Shipment Details"},this);		
		var HdrSectionCtrl=
		[
			plf.addDisplayOnly({"label":"Shipment No",id:"strShipmentNo"}),
			plf.addDisplayOnly({"label":"Shipment Date",id:"dtShipmentDate"}),
			plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
			plf.addDisplayOnly({"label":"Shipper Name",id:"strShipperName"})
		]		
		HdrSection.add(HdrSectionCtrl);
		//Header Section Ends
		plf.columns=4
		//Receiver Details Section starts		
		var ReceiverSection = plf.addColumnSection({title:"Receiver Details"},this);		
		var ReceiverSectionCtrl=
		[
			plf.addDisplayOnly({"label":"Driver Name","id":"strDriverName"}),
			plf.addDisplayOnly({"label":"Driver No","id":"strDriverNo"}),
			plf.addText({"label":"Received By",id:"strReceivedBy"}),
			plf.addText({"label":"Signature","id":"strSignature"})
		]		
		ReceiverSection.add(ReceiverSectionCtrl);
		//Receiver Details Section Ends
		
	
		
		//adding the control to the mainpage
		mainpage.ptrMainSection.add(HdrSection)
		mainpage.ptrMainSection.add(ReceiverSection)
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		
			mainpage.eventHandlers = 
			[
				  
               {
				"controlid":"",
				"tasktype":"onload",
				"input":["strShipmentNo"],
				"service":"FXCoreTS",
				"methodName":"FXPORTAL_INITDRIVERPODTS"
		      },
			  {       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Receive",
				"input":["strShipmentNo","strReceivedBy","strSignature"],
				"service":"FXCoreTS",
				"methodName":"FXPORTAL_MNGDRIVERPODTS"
			 }
			             
			];
		
		this.callParent(arguments);
		
	
	}
});
