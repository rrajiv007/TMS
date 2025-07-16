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
1.0.2     Steffie            14/07/16     73395	      
1.0.2     Steffie            26/07/16     73546	                               
************************************************************************************************/
Ext.define('CueTrans.view.tms.VehicleSequence', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.70;
		mainpage.popupWidthRatio=.7;	
		mainpage.startPainting();
		
		mainpage.screenName = "Contractor Sequence";
		
	
		mainpage.liveScreenFlag=true;
		mainpage.toolbarSectionFlag=true;
		//Add the header portion
		plf.columns=4
		var vehicleSequenceColumn = plf.addColumnSection({});
		/*
		if(plf.defaultLayout==3)
		{
			plf.columns=4
			
		
			
		vehicleSequenceFormCtrl=
		[
		 	plf.addButton({"label":"Update Sequence",id:"updateBtn"}),
			plf.addButton({"label":"Move Up",id:"moveUpBtn"}),
			plf.addButton({"label":"Move Down",id:"moveDownBtn"})
				
		]
		
		
		}
		
		else
		{
		vehicleSequenceFormCtrl=
		[
			
			plf.addButton({"label":"Update Sequence",id:"updateBtn"}),
			plf.addButton({"label":"Move Up",id:"moveUpBtn"}),
			plf.addButton({"label":"Move Down",id:"moveDownBtn"})
		]
		}	
		*/
		var vehicleSequenceFieldObj=
		[ 
			{columnname:"Sequence No",dataname:"SEQ_NO",datatype:"string",width:70}, 
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:70},
			{columnname:"Contract Name",dataname:"CONTRACT_NAME",datatype:"string",width:100},
			{columnname:"Contact No",dataname:"CONTACT_NO",datatype:"string",width:100},						
			{columnname:"Vehicle Code",dataname:"VEH_CODE",datatype:"string",width:90},
			{columnname:"Vehicle Regn No",dataname:"VEH_REGN",datatype:"string",width:90},
			{columnname:"Vehicle Category",dataname:"VEH_CAT",datatype:"string",width:100},
			{columnname:"Base Location",dataname:"BASE_LOCATION",datatype:"string",width:120},//73395 changes for base location
			{columnname:"Carrier Code",dataname:"CAR_CODE",datatype:"string",width:70},
			{columnname:"Carrier Name",dataname:"CAR_NAME",datatype:"string",width:100},
			{columnname:"Next Roster date",dataname:"NXT_ROSTER_DATE",datatype:"string",width:110},
			{columnname:"Smartphone Available",dataname:"SMARTPHONE_AVAILABLE",datatype:"string",width:110},
			{columnname:"Phone OS",dataname:"PHONE_OS",datatype:"string",width:100},
			//{columnname:"Last Journey Plan No",dataname:"LT_JP_PLAN",datatype:"string",width:150},		/*73546 changes*/
			//{columnname:"Last JourneyPlan<br>Date",dataname:"LT_JP_PLAN_DT",datatype:"string",width:100},		
			//{columnname:"Vehicle Release Date",dataname:"VEH_RL_DT",datatype:"string",width:150},		
			//{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}		                    /*73546 changes end*/	
		]  
		vehicleSequenceGridDtl=
		{
			title:"Contractor Sequence",
			id:"VehSeq",
			detail:vehicleSequenceFieldObj,
			visibleRow:plf.searchVisibleRows,
			//visibleRow:15,
			//widthBasis:2,
			removeExport:false,
			removeAddDelete:true
		  
		}
		
		
		//vehicleSequenceColumn.add(vehicleSequenceFormCtrl);
		var violationEscalationGridSection = plf.addGrid(vehicleSequenceGridDtl,this)	
		
		//mainpage.ptrMainSection.add(vehicleSequenceColumn)
		mainpage.ptrMainSection.add(violationEscalationGridSection)
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	      {
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initVehSeqBasedTS"
			},
			
			{
				"tasktype":"proto",
				"filename":"peoplelogistics/VehicleSeq.json"
			}
		
		];
		
		
		this.callParent(arguments);
		
	}
});
