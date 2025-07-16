/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	                      Added var for all local variable	
1.0.2       Steffie         21-Feb-2016   70564                       System Parameter Changes 
1.0.3       Steffie         23-Feb-2016   67696                       Data Level Security  	 
1.0.4       Steffie         14-Jul-2016   73945                       Vehicle Release Applicable 
1.0.5       Steffie         26-Jul-2016   73558                                                         
1.0.6       Vidhya          21-Jul-2017   80642                       Added Two  Columns
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.SystemParam', 
{
extend:"CueTrans.lib.plfTransScreen", 
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "System Parameter";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
 
		mainpage.toolbarActions= [
			{
                "name": "Save",
                "tooltip": "Click here to save a system parameter."
            }
            ]	
		
		//Request Module Parameters Starts
		plf.columns=1
		var sysparamHdrColumn = plf.addColumnSection({title:"Request Module Parameters"});				//69995
		var sysparamFormCtrl=																			//69995
		[
			plf.addText({"labelWidth":480,"label":"Number of days before Tentative demands can be created",id:"strReqModParam","mandatory":"true",inputFormat:"integer",InputLength:2}),
			plf.addText({"labelWidth":480,"label":"Number of days allowed for Amendment after Delivery",id:"strReqAmendParam","mandatory":"true",inputFormat:"integer",InputLength:2})
		]		
		sysparamHdrColumn.add(sysparamFormCtrl);
		//Request Module Parameters ends
		
		//Shipment Module Parameters Starts
		plf.columns=1
		var sysparamHdrColumn1 = plf.addColumnSection({title:"Shipment Module Parameters"});		//69995
		var sysparamFormCtrl1=																		//69995
		[			
			plf.addText({"labelWidth":480,"label":"Recommended weight (tons) for Splitting by default",id:"strShipModParam","mandatory":"true",inputFormat:"numeric",weightPrecision:2})			
		]		
		sysparamHdrColumn1.add(sysparamFormCtrl1);
		//Shipment Module Parameters ends
		
		//Load Planning Module Parameters Starts
		plf.columns=1
		var sysparamHdrLoad = plf.addColumnSection({title:"Load Planning Module Parameters"});		//69995
		var sysparamLoadFormCtrl=							//69995
		[			
			plf.addCombo({"labelWidth":480,"label":"Allow to confirm load if utilization(%)<70",id:"strLoadModParam","mandatory":"true"})
		]		
		sysparamHdrLoad.add(sysparamLoadFormCtrl);
		//Load Planning Module Parameters ends
		
		//Vehicle Demand Planning Parameters Starts
		plf.columns=1
		var sysparamHdrColumn2 = plf.addColumnSection({title:"Vehicle Demand Planning Parameters"});					//69995
		var sysparamFormCtrl2=																							//69995
		[			
			plf.addText({"labelWidth":480,"label":"Number of days before to stop planning on Vehicle Document Expiry",id:"strVehDemandParam","mandatory":"true",inputFormat:"integer",InputLength:2}),
			plf.addText({"labelWidth":480,"label":"Number of days before to stop planning on Driver Document Expiry",id:"strVehDemandParam1","mandatory":"true",inputFormat:"integer",InputLength:2})
		]		
		sysparamHdrColumn2.add(sysparamFormCtrl2);
		//Vehicle Demand Planning Parameters ends
		
		//Vehicle Scheduling and Roster Parameters Starts
		plf.columns=1
		var sysparamHdrColumn2 = plf.addColumnSection({title:"Vehicle Scheduling & Roster Parameters"});		//69995
		var sysparamFormCtrl2=																					//69995					
		[			
			plf.addCombo({"labelWidth":480,"label":"Inspection & Journey Management required for 3PL",id:"strInspJpReq","mandatory":"true"}),
			plf.addCombo({"labelWidth":480,"label":"Inspection & Journey Management required for Roster based Allocation",id:"strInspJpReqOto","mandatory":"true"}),
			plf.addCombo({"labelWidth":480,"label":"Generate Mob Journey",id:"strMobJpReq","mandatory":"true"}),
			plf.addCombo({"labelWidth":480,"label":"Generate OnJob Mob Journey",id:"strOnJobJpReq","mandatory":"true"}),
			plf.addCombo({"labelWidth":480,"label":"Generate DeMob Journey",id:"strDeMobJpReq","mandatory":"true"})
		]		
		sysparamHdrColumn2.add(sysparamFormCtrl2);
		//Vehicle Scheduling and Roster Parameters ends
		
		//Inspection Module Parameters Starts
		plf.columns=1
		var sysparamHdrColumn3 = plf.addColumnSection({title:"Inspection Module Parameters"});		//69995
		var sysparamFormCtrl3=							//69995
		[			
			plf.addText({"labelWidth":480,"label":"Vehicle Inspection fault clearing time (hh:mm)",id:"strInspModParam","mandatory":"true"}),			
			plf.addText({"labelWidth":480,"label":"No show time (hh:mm)",id:"strNoShow","mandatory":"true"})
		]		
		sysparamHdrColumn3.add(sysparamFormCtrl3);
		//Inspection Module Parameters ends
		
		
		//Document Validation Starts
		plf.columns=1
		var sysparamHdrColumnDocVal = plf.addColumnSection({title:"Document Validation Parameters"});		//69995
		var sysparamFormCtrlDocVal=							//69995
		[			
			plf.addCombo({"labelWidth":480,"label":"Validate driver document expiry",id:"strdriverExpiry","mandatory":"true"}),
			plf.addCombo({"labelWidth":480,"label":"Validate vehicle document expiry",id:"strVehicleExpiry","mandatory":"true"})
		]		
		sysparamHdrColumnDocVal.add(sysparamFormCtrlDocVal);
		//Document Validation Starts
		
		//Journay Plan Parameters Starts
		plf.columns=1
		var sysparamHdrColumn4 = plf.addColumnSection({title:"Journey Plan Parameters"});			//69995
		var sysparamFormCtrl4=																		//69995
		[			
			plf.addCombo({"labelWidth":480,"label":"Does Violations needs to be displayed in Journey Plan",id:"strJPModParam","mandatory":"true"}),
			plf.addText({"labelWidth":480,"label":"Automatic Journey Plan will not be created if the Journey is less than (specified Kms)",id:"strJPModParam1","mandatory":"true",inputFormat:"integer",InputLength:2}),
			plf.addText({"labelWidth":480,"label":"Allowable days to confirm journey Plan","mandatory":"true",id:"strJPModParam2",inputFormat:"integer",InputLength:1})

		]		
		sysparamHdrColumn4.add(sysparamFormCtrl4);
		//Journay Plan Parameters ends
		
		//Dashboard Parameters Starts
		plf.columns=1
		var sysparamHdrColumn5 = plf.addColumnSection({title:"Dashboard Parameters"});			//69995
		var sysparamFormCtrl5=										//69995
		[				
			plf.addTime({"labelWidth":480,"label":"Dashboard auto refresh time",id:"strDashParam","mandatory":"true"})
		]
		sysparamHdrColumn5.add(sysparamFormCtrl5);
		//Dashboard Parameters ends
		
		//Search Parameters Starts
		plf.columns=1
		var sysparamHdrColumn6 = plf.addColumnSection({title:"Search Parameters"});			//69995
		var sysparamFormCtrl6=																//69995		
		[				
			plf.addText({"labelWidth":480,"label":"No of grid entry in Search box",id:"strGridSrch","mandatory":"true",inputFormat:"integer"})
		]
		sysparamHdrColumn6.add(sysparamFormCtrl6);
		//Search Parameters ends
		
		//Loading/Unloading Parameters Starts
		plf.columns=1
		var sysparamHdrLoadColumn = plf.addColumnSection({title:"Loading/Unloading Parameters"});		//69995
		var sysparamFormLoadCtrl=									//69995
		[				
			plf.addTime({"labelWidth":480,"label":"Loading time",id:"strLoadingParam","mandatory":"true"}),
			plf.addTime({"labelWidth":480,"label":"Unloading time",id:"strUnloadingParam","mandatory":"true"}),
			plf.addCombo({"labelWidth":480,"label":"Loading/Unloading Required",id:"strLdReq","mandatory":"true"}),
		]
		sysparamHdrLoadColumn.add(sysparamFormLoadCtrl);
		//Loading/Unloading Parameters ends
		
		
		//OTO Contractor Parameters Starts
		plf.columns=1
		var sysparamHdrOTOContractor = plf.addColumnSection({title:"OTO Contractor"});		//69995
		var sysparamFormLoadCtrl=									//69995
		[				
			plf.addText({"labelWidth":480,"label":"Allowable Acceptance Time",id:"strAllowAcceptTime","mandatory":"true",inputFormat:"numeric"}),
			plf.addText({"labelWidth":480,"label":"# of roster next day allowed",id:"strNoRosterNextDay","mandatory":"true",inputFormat:"integer"}),
			plf.addCombo({"labelWidth":480,"label":"Automatic Roster Next Day on Expiry",id:"strAutoNextExpiry","mandatory":"true"}),
			plf.addCombo({"labelWidth":480,"label":"Automatic Mark Unavailable",id:"strAutoMarkUnavailable","mandatory":"true"})
		]
		sysparamHdrOTOContractor.add(sysparamFormLoadCtrl);
		//OTO Contractor Parameters ends
		
		
		
		//Vehicle Master Parameters Starts
		/****
		plf.columns=1
		var sysparamHdrTyreMgmt = plf.addColumnSection({title:"Vehicle Master - Tyre Management"});	
		var sysparamFormTyreMgmtCtrl=				
		[				
			plf.addCombo({"labelWidth":480,"label":"Tyre Management Required",id:"strTyreMgtReq","mandatory":"true"})
		]
		sysparamHdrTyreMgmt.add(sysparamFormTyreMgmtCtrl);
		*/
		//Vehicle Master Parameters ends
		
		
		
		
		/*Journey Plan Dashboard Parameters starts*/
		var JBdashCtrl=
		[	
			{columnname:"seqno",dataname:"SEQNO",datatype:"string",width:150,hidden:true},
			{columnname:"Period",dataname:"PERIOD",datatype:"string",width:150},
			{columnname:"From Time (mm)",dataname:"FROM_TIME",datatype:"string",width:150,editControl:"textbox",inputFormat:"integer",InputLength:3},
			{columnname:"To Time (mm)",dataname:"TO_TIME",datatype:"string",width:100,editControl:"textbox",inputFormat:"integer",InputLength:3}			
		]
		var JBdashGridDtl=			//69995
		{
			title:"Journey Plan Dashboard Parameters",
			id:"JBdashDtlCache",
			detail:JBdashCtrl,
			visibleRow:plf.searchVisibleRows,
			readonly:true,
			removeAddDelete:true,
			removeFilter:true,
			removeExport:true,
			removeColumns:true
		}
		var JBdashGridSection = plf.addGrid(JBdashGridDtl,this)			//69995
		/*Journey Plan Dashboard Parameters ends*/
		
		/*SLA for Cargo Delivery starts*/
		var SLACtrl=
		[
			//{columnname:"Region",dataname:"REGION",datatype:"string",width:150},
			{columnname:"SLA Lane",dataname:"LANE",datatype:"string",width:150,storeId:"LANE",editControl:"combo"},
			{columnname:"Priority",dataname:"PRIORITY",datatype:"string",width:100,storeId:"PRIORITY",editControl:"combo"},			
			//{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:100,storeId:"COMMODITY",editControl:"combo"},			
			//{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:150,storeId:"VEHICLE_CATEGORY",editControl:"combo"},
			{columnname:"SLA (hh:mm)",dataname:"SLA_TIME",datatype:"string",width:100,editControl:"textbox"/*,storeId:"SLA_TIME",editControl:"time"*/}	
		]
		var SLAGridDtl=				//69995
		{
			title:"SLA for Cargo Delivery",
			id:"SLDtlCache",
			detail:SLACtrl,
			visibleRow:plf.searchVisibleRows,
			//readonly:true,
			//removeAddDelete:true,
			removeFilter:true,
			removeExport:true,
			removeColumns:true
		}
		var SLAGridSection = plf.addGrid(SLAGridDtl,this)			//69995
		/*SLA for Cargo Delivery ends*/
		
		/*Time Configuration for Track & Trace Milestones  starts*/
		var TraceTraceCtrl=
		[
			{columnname:"seqno",dataname:"SEQNO",datatype:"string",width:150,hidden:true},
			{columnname:"Milestones",dataname:"MILESTONES",datatype:"string",width:150},			
			{columnname:"Acceptable Duration (hh:mm)",dataname:"ACCEPTABLE_TIME",datatype:"string",width:200,storeId:"ACCEPTABLE_TIME",editControl:"time"}	
		]
		var TraceTraceGridDtl=									//69995
		{
			title:"Time Configuration for Track & Trace Milestones",
			id:"TraceTraceDtlCache",
			detail:TraceTraceCtrl,
			visibleRow:plf.searchVisibleRows,
			readonly:true,
			removeAddDelete:true,
			removeFilter:true,
			removeExport:true,
			removeColumns:true
		}
		var TraceTraceGridSection = plf.addGrid(TraceTraceGridDtl,this)				//69995
		/*Time Configuration for Track & Trace Milestones  ends*/
		/*67696 changes starts*/
		/*Data Level Security  starts*/
		var DataSecurityCtrl=
		[
			{columnname:"Module",dataname:"MODULE_ID",datatype:"string",width:150},	
            {columnname:"Yes/No",dataname:"FLAG",datatype:"string",width:100,storeId:"strYesNo",editControl:"combo"}
		]
		var DataSecurityGridDtl=									//69995
		{
			title:"Data Level Security",
			id:"DataSecurityCache",
			detail:DataSecurityCtrl,
			visibleRow:plf.searchVisibleRows,
            readonly:true,
			removeAddDelete:true,
			removeFilter:true,
			removeExport:true,
			removeColumns:true
		}
		var DataSecurityGridSection = plf.addGrid(DataSecurityGridDtl,this)				//69995
		/*Data Level Security   ends*/
		/*67696 changes ends*/
		
		/*73945 changes*/
        var VehReleaseObj=
		[
			{columnname:"Location Code",dataname:"LOC_CODE",datatype:"string",width:150,editControl:"textbox",helpid:'Location'},
			{columnname:"Location Name",dataname:"LOC_NAME",datatype:"string",width:150,editControl:"addDisplayOnly"},
            {columnname:"Region",dataname:"REGION",datatype:"string",width:200,editControl:"addDisplayOnly"}			
			
		]
		var VehReleaseGridDtl=									
		{
			title:"Vehicle Release -Applicable Location",
			id:"VehReleaseDtlCache",
			detail:VehReleaseObj,
			visibleRow:plf.searchVisibleRows,
			//readonly:true,                          //73558  changes
			//removeAddDelete:true,                   //73558  changes
            removeFilter:true,
			removeExport:true,
			removeColumns:true
		}
		var VehReleaseGridSection = plf.addGrid(VehReleaseGridDtl,this)	
		/*73945 changes end*/
		var LoadingTimeconfObj=
		[
			{columnname:"From Location Code",dataname:"FRM_LOC_CODE",datatype:"string",width:150,editControl:"textbox",helpid:'frm_Location'},
			{columnname:"From Location Name",dataname:"FRM_LOC_NAME",datatype:"string",width:150,editControl:"addDisplayOnly"},
			{columnname:"To Location Code",dataname:"TO_LOC_CODE",datatype:"string",width:150,editControl:"textbox",helpid:'To_Location'},
			{columnname:"To Location Name",dataname:"TO_LOC_NAME",datatype:"string",width:150,editControl:"addDisplayOnly"},
            {columnname:"Loading Time(hh:mm)",dataname:"LOADING_TIME",datatype:"string",editControl:"textbox",width:150,colAlign:"right",inputFormat:"time"}			
			
		]
		var LoadingTimeconfGridDtl=									
		{
			title:"Loading Time Configuration",
			id:"LoadingTimeconfig",
			detail:LoadingTimeconfObj,
			visibleRow:plf.searchVisibleRows, 
			//readonly:true,                          
			//removeAddDelete:true,                   
            removeFilter:true,
			removeExport:true,
			removeColumns:true
		}
		var LoadingTimeconfGridSection = plf.addGrid(LoadingTimeconfGridDtl,this)
		
		/*IVMS Health Check - Application Location Starts here*/
		var IVMSHealthChkObj=
		[
			{columnname:"Location Code",dataname:"LOC_CODE",datatype:"string",width:150,editControl:"textbox",helpid:'IvmsLocation'},
			{columnname:"Location Name",dataname:"LOC_NAME",datatype:"string",width:150,editControl:"addDisplayOnly"},
            {columnname:"Region",dataname:"REGION",datatype:"string",width:200,editControl:"addDisplayOnly"}			
			
		]
		var IVMSHealthChkGridDtl=									
		{
			title:"IVMS Health Check - Application Location",
			id:"IvmsDtlCache",
			detail:IVMSHealthChkObj,
			visibleRow:plf.searchVisibleRows,                  
            removeFilter:true,
			removeExport:true,
			removeColumns:true
		}
		var IVMSHealthChkGridSection = plf.addGrid(IVMSHealthChkGridDtl,this)	
		/*IVMS Health Check - Application Location Ends here*/
		
		
		/*Data Visibility- Vehicle/Driver Starts here*/
		var DataVisibilityObj=
		[
			{columnname:"Asset Type",dataname:"ASSET_TYPE",datatype:"string",width:150,editControl:"combo",storeId:"strAssetType"},
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:150,editControl:"combo",storeId:"strCarrier"},
            {columnname:"Region",dataname:"REGION",datatype:"string",width:200,editControl:"combo",storeId:"strRegionType"}			
			
		]
		var DataVisibilityGridDtl=									
		{
			title:"Data Visibility- Vehicle/Driver",
			id:"DataVisibility",
			detail:DataVisibilityObj,
			visibleRow:plf.searchVisibleRows,                  
            removeFilter:true,
			removeExport:true,
			removeColumns:true
		}
		var DataVisibilityGridSection = plf.addGrid(DataVisibilityGridDtl,this)	
		/*Data Visibility- Vehicle/Driver Ends here*/
		
		
		/*Post Inspection- Interior Location Starts here*/
		var PostInspInteriorObj=
		[
			{columnname:"Location Code",dataname:"LOC_CODE",datatype:"string",width:150,editControl:"textbox",helpid:'InteriorLocation'},
			{columnname:"Location Name",dataname:"LOC_NAME",datatype:"string",width:150,editControl:"addDisplayOnly"},
            {columnname:"Region",dataname:"REGION",datatype:"string",width:200,editControl:"addDisplayOnly"}			
			
		]
		var PostInspInteriorGridDtl=									
		{
			title:"Post Inspection- Interior Location",
			id:"PostInspInterior",
			detail:PostInspInteriorObj,
			visibleRow:plf.searchVisibleRows,                  
            removeFilter:true,
			removeExport:true,
			removeColumns:true
		}
		var PostInspInteriorLocGridSection = plf.addGrid(PostInspInteriorGridDtl,this)	
		/*Post Inspection- Interior Location Ends here*/
		
		/*Insepction Locations Starts here */
		var InspectionLocationObj=
		[
			{columnname:"Inspection Location",dataname:"LOC_CODE",datatype:"string",width:150,editControl:"textbox",helpid:'InspectionLocation'},
			{columnname:"Location Name",dataname:"LOC_NAME",datatype:"string",width:150,editControl:"addDisplayOnly"}
		]
		var InspectionLocationGridDtl=									
		{
			title:"Inspection Location",
			id:"InspectionLocation",
			detail:InspectionLocationObj,
			visibleRow:5,                  
            removeFilter:true,
			removeExport:true,
			removeColumns:true
		}
		var InspectionLocationGridSection = plf.addGrid(InspectionLocationGridDtl,this)	
		/*Insepction Locations Ends here*/
		
		/*Vehicle Inspection Configuration Starts here*/
		var VehicleInspectionConfigObj=
		[
			{columnname:"Inspection Location",dataname:"LOC_CODE",datatype:"string",width:130,editControl:"textbox",helpid:'VehicleInspectionLoc'},
			{columnname:"Inspection Start Time (hh:mm)",dataname:"INSP_ST_TM",datatype:"string",width:180,editControl:"RegexTime"},
			{columnname:"Is time slot restriction Mandatory",dataname:"TIME_MANDATORY",datatype:"string",width:200,editControl:"combo",storeId:"strTimeMen"},
			{columnname:"Time Slot Duration (hh:mm)",dataname:"INSP_SLOT_TM",datatype:"string",width:180,editControl:"RegexTime"},
			{columnname:"# of vehicles per time slot",dataname:"NO_OF_TM_SLOT",datatype:"string",width:180,editControl:"textbox",inputFormat:"integer"}
		]
		var VehicleInspectionConfigGridDtl=									
		{
			title:"Vehicle Inspection Configuration",
			id:"VehicleInspectionConfig",
			detail:VehicleInspectionConfigObj,
			visibleRow:5,                  
            removeFilter:true,
			removeExport:true,
			removeColumns:true
		}
		var VehicleInspectionConfigGridSection = plf.addGrid(VehicleInspectionConfigGridDtl,this)	
		/*Vehicle Inspection Configuration Ends here*/
		
		/*Loading Charges Applicable Locations Starts here */
		var SELoadingChargesLocationsObj=
		[
			{columnname:"Location Name",dataname:"SE_LOC_NAME",datatype:"string",width:150,editControl:"combo",storeId:"strSELoadLocName"}
		]
		var SELoadingChargesLocationsGridDtl=									
		{
			title:"SE Loading Charges Locations",
			id:"SELoadingChargesLocations",
			detail:SELoadingChargesLocationsObj,
			visibleRow:5,                  
            removeFilter:true,
			removeExport:true,
			removeColumns:true
		}
		var SELoadingChargesLocationsGridSection = plf.addGrid(SELoadingChargesLocationsGridDtl,this)	
		/*Loading Charges Applicable Locations Ends here*/	

		/*UnLoading Charges Applicable Locations Starts here */
		var SEUnLoadingChargesLocationsObj=
		[
			{columnname:"Location Name",dataname:"SE_LOC_NAME",datatype:"string",width:150,editControl:"combo",storeId:"strSEUnloadLocName"}
		]
		var SEUnLoadingChargesLocationsGridDtl=									
		{
			title:"SE Unloading Charges Locations",
			id:"SEUnloadingChargesLocations",
			detail:SEUnLoadingChargesLocationsObj,
			visibleRow:5,                  
            removeFilter:true,
			removeExport:true,
			removeColumns:true
		}
		var SEUnLoadingChargesLocationsGridSection = plf.addGrid(SEUnLoadingChargesLocationsGridDtl,this)	
		/*UnLoading Charges Applicable Locations Ends here*/	


        /*ValidateDriverRest Starts here */
		var DriverRestRegionObj=
		[
			{columnname:"Applicable Region",dataname:"APPLICABLE_REGION",datatype:"string",width:150,editControl:"combo",storeId:"strApplicableRegion"}
		]
		var DriverRestRegionGridDtl=									
		{
			title:"Driver Rest Applicable Region",
			id:"ValidateDriverRestRegion",
			detail:DriverRestRegionObj,
			visibleRow:5,                  
            removeFilter:true,
			removeExport:true,
			removeColumns:true
		}
		var DriverRestRegionGridSection = plf.addGrid(DriverRestRegionGridDtl,this)	
		/*ValidateDriverRest Ends here*/


        /*Journey Route - Auto Sleep Adjustments Starts here */
		var AutoSleepJPRouteObj=
		[
			{columnname:"Route Code",dataname:"ROUTE_CODE",datatype:"string",width:130,editControl:"textbox",helpid:'routeCode'},
			{columnname:"Day Rest Override Location Code",dataname:"OVERRIDE_LOC_CODE",datatype:"string",width:200,editControl:"textbox",helpid:'overrideloccode'},
			{columnname:"Next-Day Start Time (hh:mm)",dataname:"NEXT_DAY_START_TM",datatype:"string",width:180,editControl:"RegexTime"}
		]
		var AutoSleepJPRouteGridDtl=									
		{
			title:"Auto Sleep - Journey Route",
			id:"AutoSleepJPRoute",
			detail:AutoSleepJPRouteObj,
			visibleRow:5,                  
            removeFilter:true,
			removeExport:true,
			removeColumns:true
		}
		var AutoSleepJPRouteGridSection = plf.addGrid(AutoSleepJPRouteGridDtl,this)	
		/*Journey Route - Auto Sleep Adjustments Ends here*/

		/*Tyre RFID Entry Locations Starts here */
		var TyreRFIDEntryLocObj=
		[
			{columnname:"Tyre RFID Entry Location",dataname:"RFID_ENTRY_LOC_CODE",datatype:"string",width:150,editControl:"textbox",helpid:'rfidLocation'},
			{columnname:"Tyre RFID Entry Location Name",dataname:"RFID_ENTRY_LOC_NAME",datatype:"string",width:350,editControl:"addDisplayOnly"},
			{columnname:"Validation Required",dataname:"VALIDATION_REQUIRED",datatype:"string",width:150,editControl:"combo",storeId:"strRfidValReq"}
		]
		var TyreRFIDEntryLocGridDtl=									
		{
			title:"Tyre RFID Entry Location",
			id:"TyreRFIDEntryLoc",
			detail:TyreRFIDEntryLocObj,
			visibleRow:5,                  
            removeFilter:true,
			removeExport:true,
			removeColumns:true
		}
		var TyreRFIDEntryLocGridSection = plf.addGrid(TyreRFIDEntryLocGridDtl,this)	
		/*Tyre RFID Entry Locations Ends here*/
		
		
		var tmpTabs=
		[
		JBdashGridSection,
		SLAGridSection,
		TraceTraceGridSection,
		DataSecurityGridSection,
		VehReleaseGridSection, //73945
		LoadingTimeconfGridSection,
		IVMSHealthChkGridSection,
		DataVisibilityGridSection,
		PostInspInteriorLocGridSection,
		InspectionLocationGridSection,
		VehicleInspectionConfigGridSection,
		SELoadingChargesLocationsGridSection,
		SEUnLoadingChargesLocationsGridSection,
		DriverRestRegionGridSection,
		AutoSleepJPRouteGridSection,
		TyreRFIDEntryLocGridSection
		]
		tabSection=plf.addTabSection({tabs:tmpTabs})		
		mainpage.ptrMainSection.add(sysparamHdrColumn)	       
		mainpage.ptrMainSection.add(sysparamHdrColumn1)	
		mainpage.ptrMainSection.add(sysparamHdrLoad)			
		mainpage.ptrMainSection.add(sysparamHdrColumn2)
		mainpage.ptrMainSection.add(sysparamHdrColumn3)
		mainpage.ptrMainSection.add(sysparamHdrColumnDocVal)
		mainpage.ptrMainSection.add(sysparamHdrColumn4)
		mainpage.ptrMainSection.add(sysparamHdrColumn5)
		mainpage.ptrMainSection.add(sysparamHdrColumn6)
		mainpage.ptrMainSection.add(sysparamHdrLoadColumn)
		mainpage.ptrMainSection.add(sysparamHdrOTOContractor)
		//mainpage.ptrMainSection.add(sysparamHdrTyreMgmt)
		
		mainpage.ptrMainSection.add(tabSection)
		
		mainpage.eventHandlers = 
		[			
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strLoadModParam","strReqModParam","strReqAmendParam","strGridSrch","strShipModParam","strVehDemandParam","strVehDemandParam1","strInspModParam",
						"strJPModParam","strJPModParam1","strJPModParam2","strDashParam","JBdashDtlCache","strLoadingParam","strUnloadingParam",
						"SLDtlCache","TraceTraceDtlCache","strNoShow","strLdReq","strInspJpReq","strInspJpReqOto","strMobJpReq","strOnJobJpReq","strDeMobJpReq","DataSecurityCache",
						"VehReleaseDtlCache","strdriverExpiry","strVehicleExpiry","strInspectionReq","strJourneyReq","LoadingTimeconfig","IvmsDtlCache","DataVisibility",
						"PostInspInterior","InspectionLocation","VehicleInspectionConfig","strAllowAcceptTime","strNoRosterNextDay","strAutoNextExpiry","strAutoMarkUnavailable",
						"SELoadingChargesLocations","SEUnloadingChargesLocations","ValidateDriverRestRegion","AutoSleepJPRoute","strTyreMgtReq","TyreRFIDEntryLoc"], //73945
				"service":"CoreSystemParameterTS",
				"methodName":"maintainSystemParamTS"
		},
		{
				"controlid":"strOrgId",
				"tasktype":"onload",
				"input":["strOrgId"],
				"service":"CoreSystemParameterTS",
				"methodName":"initSystemParamTS"
			},
		]
		
		//73945
		mainpage.hlpLinks=
		{
		"InspectionLocation":
		{
			"hlpType":"grid",
			"gridID":"InspectionLocation",
			"hlpScreen":"jm_master.LocationHelp",
			"send":[
					{"parent":"","child":""}
				   ],
			"receive":[
					   {"parent":"LOC_CODE","child":"LOC_CODE"},
					   {"parent":"LOC_NAME","child":"LOC_NAME"}
					   ]
		},
		"VehicleInspectionLoc":
		{
			"hlpType":"grid",
			"gridID":"VehicleInspectionConfig",
			"hlpScreen":"jm_master.LocationHelp",
			"send":[
					{"parent":"","child":""}
				   ],
			"receive":[
					   {"parent":"LOC_CODE","child":"LOC_CODE"}
					   ]
		},
		"InteriorLocation":
		{
			"hlpType":"grid",
			"gridID":"PostInspInterior",
			"hlpScreen":"jm_master.LocationHelp",
			"send":[
					{"parent":"","child":""}
				   ],
			"receive":[
					   {"parent":"LOC_CODE","child":"LOC_CODE"},
					   {"parent":"LOC_NAME","child":"LOC_NAME"},
					   {"parent":"REGION","child":"REGION"}
					   ]
		},
		"IvmsLocation":
		{
			"hlpType":"grid",
			"gridID":"IvmsDtlCache",
			"hlpScreen":"jm_master.LocationHelp",
			"send":[
					{"parent":"","child":""}
				   ],
			"receive":[
					   {"parent":"LOC_CODE","child":"LOC_CODE"},
					   {"parent":"LOC_NAME","child":"LOC_NAME"},
					   {"parent":"REGION","child":"REGION"}
					   ]
		},
		"Location":
				{
					"hlpType":"grid",
					"gridID":"VehReleaseDtlCache",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
					        {"parent":"","child":""}
						],
					"receive":[
					           {"parent":"LOC_CODE","child":"LOC_CODE"},
							  {"parent":"LOC_NAME","child":"LOC_NAME"},
							  {"parent":"REGION","child":"REGION"}

                                             ]
				},
		"frm_Location":
				{
					"hlpType":"grid",
					"gridID":"LoadingTimeconfig",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
					        {"parent":"","child":""}
						],
					"receive":[
					           {"parent":"FRM_LOC_CODE","child":"LOC_CODE"},
                                              {"parent":"FRM_LOC_NAME","child":"LOC_NAME"}

                                             ]
				},
		"To_Location":
				{
					"hlpType":"grid",
					"gridID":"LoadingTimeconfig",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
					        {"parent":"","child":""}
						],
					"receive":[
					           {"parent":"TO_LOC_CODE","child":"LOC_CODE"},
                                              {"parent":"TO_LOC_NAME","child":"LOC_NAME"}
                                             ]
				},
		"routeCode":
				{
					"hlpType":"grid",
					"gridID":"AutoSleepJPRoute",
					"hlpScreen":"jm_master.RouteHelp",
					"send":[
					        {"parent":"","child":""},
							{"direct":"ROUTE_AC","child":"strContext"}
						],
					"receive":[
					           {"parent":"ROUTE_CODE","child":"ROUTE_CODE"}
                               ]
				},
		"overrideloccode":
				{
					"hlpType":"grid",
					"gridID":"AutoSleepJPRoute",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
					        {"parent":"","child":""},
							{"direct":"LOCATION_AC","child":"strContext"}
						],
					"receive":[
					           {"parent":"OVERRIDE_LOC_CODE","child":"LOC_CODE"}
                              ]
				},
				"rfidLocation":
                {
					"hlpType":"grid",
					"gridID":"TyreRFIDEntryLoc",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
					        {"parent":"","child":""},
							{"direct":"LOCATION_AC","child":"strContext"}
						],
					"receive":[
					           {"parent":"RFID_ENTRY_LOC_CODE","child":"LOC_CODE"},
							   {"parent":"RFID_ENTRY_LOC_NAME","child":"LOC_NAME"}
                              ]
				}
				
		}
		this.callParent(arguments);
	}
});
