Ext.define('CueTrans.view.FEADMIN.VehicleDetails', 
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
		mainpage.hlpSectionFlag=true; //help
		mainpage.startPainting();
		mainpage.screenName = "Vehicle Details";
		
		plf.columns=3
				
		var PickupSection = plf.addColumnSection({title:"Details"},this);		
		var PickupSectionCtrl=
		[
			plf.addDisplayOnly({"label":"Origin","id":"strOrigin"}),
			plf.addDisplayOnly({"label":"Destination","id":"strDestination"}),
			plf.addDisplayOnly({"label":"Pickup Date/Time",id:"dtPickDate"}),
			
		]		
		PickupSection.add(PickupSectionCtrl);
		//Pick up Details Section Ends
		var GridFieldObj=		
		[
			{columnname:"Vehicle Type",dataname:"VEH_TYPE",datatype:"string",width:100,hidden:true},
			{columnname:"Vehicle Desc",dataname:"VEH_DESC",datatype:"string",width:100},
			{columnname:"Vehicle Reg.No",dataname:"VEH_NO",datatype:"string",width:100},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:100},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:100},
			{columnname:"From Region",dataname:"FROM_REGION",datatype:"string",width:100},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:100},			
			{columnname:"To Region",dataname:"TO_REGION",datatype:"string",width:100}
		]
		var GridDtl=			
		{
			title:"Vehicle Details",
			id:"VehicleDetail",
			detail:GridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
		}
		var GridSection = plf.addGrid(GridDtl,this)		
		
		//adding the control to the mainpage
		mainpage.hlpSearchGridPtr = GridSection
		mainpage.ptrMainSection.add(PickupSection)
		mainpage.ptrMainSection.add(GridSection)
		mainpage.eventHandlers = 
			[
				  
               {
				"controlid":"",
				"tasktype":"onload",
				"input":["strOrigin","strDestination","dtPickDate"],
				"service":"FXCoreTS",
				"methodName":"initVehDetailsTS"
		      }
			             
			];
		
		this.callParent(arguments);
		
	
	}
});
