/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1    Steffie            04/08/16            73753	      
                             
************************************************************************************************/
Ext.define('CueTrans.view.tms.VehicleSequenceHelp', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
        mainpage.hlpSectionFlag=true; //true
		//mainpage.hlpSectionFlag=false; 
		
		//mainpage.popupSectionFlag=true;
		//mainpage.popupHeightRatio=.70;
		//mainpage.popupWidthRatio=.7;	
		
		
	    mainpage.startPainting();
		
		mainpage.screenName = "Contractor Sequence Help";
		
	
		mainpage.liveScreenFlag=true;
		mainpage.toolbarSectionFlag=true;
		//Add the header portion
		plf.columns=4
		var vehicleSequenceColumn = plf.addColumnSection({});
		/*
		if(plf.defaultLayout==3)
		{
			plf.columns=4
			
		var vehicleSequenceFormCtrl=
		[
		 	plf.addButton({"label":"Fetch all",id:"fetchall"}),
			plf.addButton({"label":"Fetch Mapped",id:"fetchmap"})
				
		]
		
		
		}
		
		else
		{
		vehicleSequenceFormCtrl=
		[
			
			plf.addButton({"label":"Fetch all",id:"fetchall"}),
			plf.addButton({"label":"Fetch Mapped",id:"fetchmap"})
		]
		}	
		*/
		
		var parentForm=mainpage;
		plf.columns=4
		var btnGetBtn=[
		                plf.addHidden({"label":"Load No",id:"strLoadNo"}), 
                              plf.addHidden({"label":"VEhicle Category",id:"strVehCat"}),
						plf.addButton({"label":"Fetch all",id:"fetchall",tooltip:"Click here to get all contractor.",
						"handler": function() 
							{
								parentForm.queryById("methodName").setValue("initVehSeqTS");
								process_ebpack_service(parentForm,["strVehCat","strMnlFlg"],"VEHSCHCoreVehSchServiceTS"/*"TMSCoreTransportTS"*/);																							
							}
						}),
                                        plf.addButton({id:"fetchmap",label:"Fetch Mapped",tooltip:"Click here to mapped contractor.",
							"handler": function() 
							{
								parentForm.queryById("methodName").setValue("initVehSeqMapedTS");
								process_ebpack_service(parentForm,["strLoadNo","strVehCat","strMnlFlg"],"VEHSCHCoreVehSchServiceTS"/*"TMSCoreTransportTS"*/);							
							}
                                           })
		];
               
		//var vehicleSequenceColumn1 = plf.addColumnSection({title:"Search Criteria",tool:btnGetBtn});
		var vehicleSequenceColumn1 = plf.addColumnSection({title:"Search Criteria",tool:btnGetBtn,hidden:true});
		
		var vehicleSequenceFieldObj=
		[ 
			{columnname:"Sequence No",dataname:"SEQ_NO",datatype:"string",width:100}, 
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:100},
			{columnname:"Contract Name",dataname:"CONTRACT_NAME",datatype:"string",width:100},
			{columnname:"Contact No",dataname:"CONTACT_NO",datatype:"string",width:100},						
			{columnname:"Vehicle Code",dataname:"VEH_CODE",datatype:"string",width:100},
			{columnname:"Vehicle Regn No",dataname:"VEH_REGN",datatype:"string",width:180},
			{columnname:"Vehicle Category",dataname:"VEH_CAT",datatype:"string",width:150},
			{columnname:"Base Location",dataname:"BASE_LOCATION",datatype:"string",width:150},//73395 changes for base location
			{columnname:"Carrier Code",dataname:"CAR_CODE",datatype:"string",width:100},
			{columnname:"Carrier Name",dataname:"CAR_NAME",datatype:"string",width:150},
			{columnname:"Next Roster date",dataname:"NXT_ROSTER_DATE",datatype:"string",width:130},
			{columnname:"Smartphone Available",dataname:"SMARTPHONE_AVAILABLE",datatype:"string",width:110},
			{columnname:"Phone OS",dataname:"PHONE_OS",datatype:"string",width:100},
			//{columnname:"Last Journey Plan No",dataname:"LT_JP_PLAN",datatype:"string",width:150},		/*73546 changes*/
			//{columnname:"Last JourneyPlan<br>Date",dataname:"LT_JP_PLAN_DT",datatype:"string",width:100},		
			//{columnname:"Vehicle Release Date",dataname:"VEH_RL_DT",datatype:"string",width:150},		
			{columnname:"Flag",dataname:"MOD_FLAG",datatype:"string",width:100,hidden:true}		                    /*73546 changes end*/	
		]  
		vehicleSequenceGridDtl=
		{
			title:"Contractor Sequence",
			id:"VehSeq",
			detail:vehicleSequenceFieldObj,
			visibleRow:plf.searchVisibleRows,
			removeExport:false,
            removeAddDelete:true,			
		}
		
		
		//vehicleSequenceColumn.add(vehicleSequenceFormCtrl);
		var violationEscalationGridSection = plf.addGrid(vehicleSequenceGridDtl,this)	
		mainpage.hlpSearchGridPtr = violationEscalationGridSection	
		
		mainpage.ptrMainSection.add(vehicleSequenceColumn1)
		mainpage.ptrMainSection.add(violationEscalationGridSection)
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	      {
		  "controlid":"",
		  "tasktype":"onload",
		  "input":[""],//strVehCat
		  "service":"VEHSCHCoreVehSchServiceTS",// TMSCoreTransportTS
		 "methodName":"initVehSeqTS"
				
			}
			/*
			{       
				"controlid":"fetchall",
				"tasktype":"btnclick",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initVehSeqBasedTS"
			},
			{       
				"controlid":"fetchmap",
				"tasktype":"btnclick",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initVehSeqMapedTS"
			},
			*/
		
		];
		
		
		this.callParent(arguments);
		
	}
});
