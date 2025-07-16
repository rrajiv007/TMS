/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	    steffie		  18/08/2016    		                                   
************************************************************************************************/
Ext.define('CueTrans.view.ivms.VehicleDetails', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.5;
		mainpage.popupWidthRatio=.58;
		mainpage.startPainting();
		
		mainpage.screenName = "Vehicle Details";	

		var formCtrl=[];
		plf.columns=3
		var VehSummaryColumn = plf.addColumnSection({title:"", collapsed: false,"cls":""});
		
	
		var VehFormCtrl=														//69995
		[
 	        plf.addDisplayOnly({"label":"Vehicle Code",id:"strTruckCode"}),	
     		plf.addDisplayOnly({"label":"Vehicle Description",id:"strTruckDesc"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			plf.addDisplayOnly({"label":"Vehicle Reg No","id":"strVehicleRegno"}),			
			plf.addDisplayOnly({"label":"Vehicle Type",id:"strTruckType"}),
			plf.addDisplayOnly({"label":"Vehicle Category","id":"strTruckCategory"}),
			plf.addDisplayOnly({"label":"Trailer Description ","id":"strTrailerDescription"}),
			plf.addDisplayOnly({"label":"Trailer Code",id:"strTrailerCode"}),		
			plf.addDisplayOnly({"label":"Vehicle Availability",id:"strVehicleAvailability"}),
			plf.addDisplayOnly({"label":"Carrier Code",id:"strTruckOwnerCode"}),
			plf.addDisplayOnly({"label":"Carrier Name",id:"strTruckOwnerName"}),
			plf.addDisplayOnly({"label":"Base Location",id:"strLocCode"}),
            plf.addDisplayOnly({"label":"Contract No",id:"strContractNum"}),
			plf.addDisplayOnly({"label":"Contract Holder Name",id:"strContractHolderName"}),
			plf.addDisplayOnly({"label":"Contact No",id:"strContractContactNum"}) // 73727 
		]
				
		VehSummaryColumn.add(VehFormCtrl);	
		
		
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(VehSummaryColumn)
		
		
	    //History Data Section
		mainpage.dataHistorySectionFlag=false;	
	
		mainpage.eventHandlers = 
		[	
		{
			"controlid":"",
			"tasktype":"onload",
			"input":["strTruckCode"],
			"service":"CoreTruckService",
			"methodName":"initVehicleDtlsTS"
		}	
		];		
		this.callParent(arguments);
	}
});