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
Ext.define('CueTrans.view.tms.AvailableTimeSlot', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.70;
		mainpage.popupWidthRatio=.7;	
		mainpage.startPainting();
		
		mainpage.screenName = "Available Time Slot";
		
	
		mainpage.liveScreenFlag=true;
		mainpage.toolbarSectionFlag=true;
		//Add the header portion
		plf.columns=3
		//var timeSlotHdrCollapse = plf.addColumnSection({title:"",collapsed: true});	
        var timeSlotHdrCollapse = plf.addColumnSection({});			
		var timeSlotFormCtrl=															
		[
			plf.addDate({"label":"Inspection Date",id:"strFromDate","mandatory":"true"}),
			plf.addCombo({"label":"Inspection Location",id:"strOrigin"}),
			plf.addButton({"label":"Search","id":"getTimeSlot"})
		
		]
		
		 timeSlotHdrCollapse.add(timeSlotFormCtrl);									
		//Inspection Search Section Ends
		
		//Inspection Grid Section Begins
		var timeSlotGridFieldObj=												
		[
			{columnname:"Inspection Location",dataname:"INSP_LOC",datatype:"string",width:"auto"}, 
			{columnname:"Inspection Date",dataname:"INSP_DT",datatype:"string",width:"auto"},
			{columnname:"Inspection Slot",dataname:"INSP_TM",datatype:"string",width:"auto"},
			{columnname:"Total Vehicles",dataname:"TOT_VEH_CAPCITY",datatype:"string",width:"auto"},						
			{columnname:"Allocated Vehicles",dataname:"ALLOCATED_VEH_CNT",datatype:"string",width:"auto"},
			{columnname:"Remaing Vehicles",dataname:"REMAING_VEH_CNT",datatype:"string",width:"auto"}
		]
		var timeSlotGridDtl=										
		{
			title:"",
			id:"AvailableTimeSlot",
			detail:timeSlotGridFieldObj,
			removeAddDelete:true,
			visibleRow:plf.searchVisibleRows,
			readonly:true,
			"rowHighlight":true
		}
		var timeSlotGridSection = plf.addGrid(timeSlotGridDtl,this)
		//Inspection Grid Section Ends
		/* Mainpage section */
		mainpage.ptrMainSection.add(timeSlotHdrCollapse)
		mainpage.ptrMainSection.add(timeSlotGridSection)
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	      {
				"controlid":"",
				"tasktype":"onload",
				"input":["strFromDate"],
				"service":"TMSCoreTransportTS",
				"methodName":"initVehTimeSlotTS"
			},
			{
				"controlid":"getTimeSlot",
				"tasktype":"btnclick",
				"input":["strFromDate","strOrigin"],
				"service":"TMSCoreTransportTS",
				"methodName":"searchVehTimeSlotTS"
			}
		
		];
		
		
		this.callParent(arguments);
		
	}
});
