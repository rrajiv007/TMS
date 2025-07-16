/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.6															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	                          
************************************************************************************************/
Ext.define('CueTrans.view.Report.ApiStats', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "API Summary";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		 mainpage.toolbarLinks=
		[
			//{"name":"View Carrier Bill","linkid":"fin_viewbill","tooltip":"Click here to view carrier bill."}
		]
		
		

		plf.columns=5
		var BillHdrColumn = plf.addCollapseSection({title:"Search Criteria", collapsed:true},this);		

			var BillHdrCtrl=		
			[	
			
				plf.addDate({"label":"From Date",id:"fromDate","mandatory":"true"}),
                plf.addText({"label":"From Time",id:"fromTime",inputFormat:"string",InputLength:"5"}),			
				plf.addDate({"label":"To Date",id:"toDate","mandatory":"true"}),
				plf.addText({"label":"To Time",id:"toTime",inputFormat:"string",InputLength:"5"}),
                plf.addButton({"label":"Search",id:"searchBtn"})
				
				
				
			]
			
		BillHdrColumn.add(BillHdrCtrl)		
		
		
		plf.columns=4
		var BillDetailsColumn = plf.addColumnSection({"title":"Trip Details"});	
		var BillDetailsCtrl=										
		[	
			/*
			plf.addDisplayOnly({"labelWidth":100,"label":"Carrier Bill",id:"strBillNo"}),	
			plf.addText({"labelWidth":150,"label":"Carrier Bill Description",id:"strBillDesc","mandatory":"true"}),	
			plf.addDate({"labelWidth":150,"label":"Process Period From",id:"strPeriodFrom","mandatory":"true"}),	
			plf.addDate({"labelWidth":150,"label":"Process Period To",id:"strPeriodTo","mandatory":"true"}),	
			*/
		]
		
		BillDetailsColumn.add(BillDetailsCtrl);		
		
		var tripMapGridObj=			
		[   {columnname:"Journey Plan No",dataname:"JOURNEY_PLAN_NO",datatype:"string",width:150},
		    {columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:150},
			{columnname:"Contract No",dataname:"PDO_CONTRACT_NO",datatype:"string",width:150},
			{columnname:"Status",dataname:"JOURNEY_STATUS",datatype:"string",width:150},
			{columnname:"Vehicle Reg No",dataname:"VEHICLE_REG_NO",datatype:"string",width:150},
			{columnname:"Start Location",dataname:"START_LOCATION",datatype:"string",width:150},
			{columnname:"End Location",dataname:"END_LOCATION",datatype:"string",width:150},
			{columnname:"Start Location Lat Lng",dataname:"START_LOCATION_LAT_LON",datatype:"string",width:150},
			{columnname:"End Location  Lat Lng",dataname:"END_LOCATION_LAT_LON",datatype:"string",width:150},
			{columnname:"Company Name",dataname:"COMPANY_NAME",datatype:"string",width:150},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:150},
			{columnname:"Driver Id",dataname:"DRIVER_ID",datatype:"string",width:150},
			{columnname:"IVMS Vendor",dataname:"IVMS_VENDOR",datatype:"string",width:150},
			{columnname:"Journey Manager Name",dataname:"JOURNEY_MANAGER_NAME",datatype:"string",width:150},
			{columnname:"Journey Manager Id",dataname:"JOURNEY_MANAGER_ID",datatype:"string",width:150},
			{columnname:"Start time",dataname:"START_TIME",datatype:"date",width:150},
			{columnname:"End Time",dataname:"END_TIME",datatype:"date",width:150},
			{columnname:"Distance",dataname:"DISTANCE",datatype:"string",width:150},
			{columnname:"IVMS Site Id",dataname:"IVMS_SITE_ID",datatype:"string",width:200},
			{columnname:"IVMS Org Id",dataname:"IVMS_ORG_ID",datatype:"string",width:200},
			{columnname:"Journey Manager Email",dataname:"JOURNEY_MANAGER_EMAIL",datatype:"string",width:200},
			{columnname:"Journey Manager Contact",dataname:"JOURNEY_MANAGER_GSM",datatype:"string",width:200},
			{columnname:"Journey Manager Area",dataname:"JOURNEY_MANAGER_AREA",datatype:"string",width:200},
			{columnname:"JM Course Expiry",dataname:"JM_COURSE_EXPIRY",datatype:"string",width:200},
			//{columnname:"Id",dataname:"VEH_ID",datatype:"string",width:200},
			{columnname:"Base Location",dataname:"BASE_LOCATION",datatype:"string",width:200},
			{columnname:"License Plate",dataname:"LICENSE_PLATE",datatype:"string",width:200},
			{columnname:"Vehicle Make",dataname:"MAKE_MODEL",datatype:"string",width:150},
			{columnname:"Vehicle category",dataname:"VEHICEL_CATEGORY",datatype:"string",width:200},
			{columnname:"Vehicle Id",dataname:"VEHICLE_ID",datatype:"string",width:150},
			{columnname:"VIN/CHASIS Number",dataname:"CHASIS NUMBER",datatype:"string",width:200},
			{columnname:"Id",dataname:"DRI_ID",datatype:"string",width:200},
			{columnname:"Base Location",dataname:"DRI_BASE_LOCATION",datatype:"string",width:200},
			{columnname:"Driver Contact",dataname:"GSM",datatype:"string",width:100},
			{columnname:"Driver Email",dataname:"EMAIL",datatype:"string",width:200},
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:150},
			{columnname:"DD Lisence Expiry date",dataname:"DD_LISENCE_EXPIRY_DATE",datatype:"date",width:150}
			
			
		]
		var tripdetGridDtl=			
		{
			title:"",
			id:"JOURNEY_RESPONSE_DATA",
			detail:tripMapGridObj,
			visibleRow:15,
			removeExport:false,
			readonly:true
		
		}
		var tripdetGridSection = plf.addGrid(tripdetGridDtl,this)
		//BillDetailsColumn.add(tripdetGridSection);
		
		
		/****************************************************/
		plf.columns=4
		var TripExceptionHdrCol = plf.addColumnSection({title:"Journey Response Data",id:"tab_TripExceptionHdrCol"});
		var tripDetailsSection = plf.addGrid(tripdetGridDtl,mainpage)
		TripExceptionHdrCol.add(tripDetailsSection)	
		
		
		/*********************************************************************************************************************************************************************************************************************/
		
		var JourneyMangerGridObj=			
		[   
			{columnname:"Journey Manager Name",dataname:"JOURNEY_MANAGER_NAME",datatype:"string",width:200},
			{columnname:"Journey Manager Email",dataname:"JOURNEY_MANAGER_EMAIL",datatype:"string",width:200},
			{columnname:"Journey Manager Contact",dataname:"JOURNEY_MANAGER_GSM",datatype:"string",width:200},
			{columnname:"Journey Manager Area",dataname:"JOURNEY_MANAGER_AREA",datatype:"string",width:200},
			{columnname:"Journey Manager Id",dataname:"JOURNEY_MANAGER_ID",datatype:"string",width:200},
			{columnname:"JM Course Expiry",dataname:"JM_COURSE_EXPIRY",datatype:"string",width:200}
			
		]
		var JourneyMangerdetGridDtl=			
		{
			title:"",
			id:"JOURNEY_MANAGER_RESPONSE",
			detail:JourneyMangerGridObj,
			visibleRow:15,
			removeExport:false,
			readonly:true
		
		}
		var JourneyMangerGridSection = plf.addGrid(JourneyMangerdetGridDtl,this)
		//BillDetailsColumn.add(tripdetGridSection);
		
		
		/****************************************************/
		plf.columns=4
		var JourneyMangerHdrCol = plf.addColumnSection({title:"Journey Manager Response Data",id:"tab_JourneyMangerHdrCol"});
		var JourneyMangerSection = plf.addGrid(JourneyMangerdetGridDtl,mainpage)
		JourneyMangerHdrCol.add(JourneyMangerSection)	
		
		/*********************************************************************************************************************************************************************************************************************/
		
		var vehicleresponseGridObj=			
		[   
			{columnname:"Id",dataname:"ID",datatype:"string",width:150},
			{columnname:"Base Location",dataname:"BASE_LOCATION",datatype:"string",width:200},
			{columnname:"License Plate",dataname:"LICENSE_PLATE",datatype:"string",width:200},
			{columnname:"Vehicle Make",dataname:"MAKE_MODEL",datatype:"string",width:150},
			{columnname:"Vehicle category",dataname:"VEHICEL_CATEGORY",datatype:"string",width:200},
			{columnname:"Vehicle Id",dataname:"VEHICLE_ID",datatype:"string",width:150},
			{columnname:"VIN/CHASIS Number",dataname:"CHASIS_NUMBER",datatype:"string",width:200},
			{columnname:"IVMS Vendor",dataname:"IVMS_VENDOR",datatype:"string",width:200},
			{columnname:"IVMS Site Id",dataname:"IVMS_SITE_ID",datatype:"string",width:200},
			{columnname:"IVMS Org Id",dataname:"IVMS_ORG_ID",datatype:"string",width:200}
			
		]
		var vehicleresponseGridDtl=			
		{
			title:"",
			id:"JOURNEY_VEHICLE_RESPONSE",
			detail:vehicleresponseGridObj,
			visibleRow:15,
			removeExport:false,
			readonly:true
		
		}
		var vehicleresponseGridSection = plf.addGrid(vehicleresponseGridDtl,this)
		//BillDetailsColumn.add(tripdetGridSection);
		
		
		/****************************************************/
		plf.columns=4
		var vehicleresponseHdrCol = plf.addColumnSection({title:"Vehicle Response Data",id:"tab_vehicleresponseHdrCol"});
		var vehicleresponseDetailsSection = plf.addGrid(vehicleresponseGridDtl,mainpage)
		vehicleresponseHdrCol.add(vehicleresponseDetailsSection)	
		
		/*********************************************************************************************************************************************************************************************************************/
			
		var driverresponseGridObj=			
		[   
			{columnname:"ID",dataname:"ID",datatype:"string",width:150},
			{columnname:"Base Location",dataname:"BASE_LOCATION",datatype:"string",width:200},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:200},
			{columnname:"Driver Id",dataname:"DRIVER_ID",datatype:"string",width:150},
			{columnname:"Driver Contact",dataname:"GSM",datatype:"string",width:100},
			{columnname:"Driver Email",dataname:"EMAIL",datatype:"string",width:200},
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:150},
			{columnname:"IVMS Site Id",dataname:"IVMS_SITE_ID",datatype:"string",width:200},
			{columnname:"IVMS Org Id",dataname:"IVMS_ORG_ID",datatype:"string",width:200},
			{columnname:"DD Lisence Expiry date",dataname:"DD_LISENCE_EXPIRY_DATE",datatype:"date",width:150}
			
		]
		var driverresponseGridDtl=			
		{
			title:"",
			id:"JOURNEY_DRIVER_RESPONSE",
			detail:driverresponseGridObj,
			visibleRow:15,
			removeExport:false,
			readonly:true
		
		}
		var driverresponseGridSection = plf.addGrid(driverresponseGridDtl,this)
		//BillDetailsColumn.add(tripdetGridSection);
		
		
		/****************************************************/
		plf.columns=4
		var driverresponseHdrCol = plf.addColumnSection({title:"Driver Response Data",id:"tab_driverresponseHdrCol"});
		var driverresponseDetailsSection = plf.addGrid(driverresponseGridDtl,mainpage)
		driverresponseHdrCol.add(driverresponseDetailsSection)	
		
		/*********************************************************************************************************************************************************************************************************************/
			

		/****************************************************/

	   
	   
		var baseTab = plf.addTabSection({ listeners:true,tabs:[
												TripExceptionHdrCol,JourneyMangerHdrCol,vehicleresponseHdrCol,driverresponseHdrCol
												]},this);
		
		mainpage.ptrMainSection.add(BillHdrColumn) 
		mainpage.ptrMainSection.add(baseTab) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[],
				"service":"CoreJourneyPlanService",
				"methodName":"GET_JOURNEY_MANAGER_RESPONSE_DATA"
			},
			{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["fromDate","fromTime","toDate","toTime"],
				"service":"CoreJourneyPlanService",
				"methodName":"GET_JOURNEY_RESPONSE_DATA"
			},
			{       
				"controlid":"cnt_tab_JourneyMangerHdrCol",
				"tasktype":"tabchange",
				"input":[""],
				"service":"CoreJourneyPlanService",
				"methodName":"GET_JOURNEY_MANAGER_RESPONSE_DATA"
			},
			{       
				"controlid":"cnt_tab_vehicleresponseHdrCol",
				"tasktype":"tabchange",
				"input":[""],
				"service":"CoreJourneyPlanService",
				"methodName":"GET_VEHICLE_RESPONSE_DATA"
			},
			{       
				"controlid":"cnt_tab_driverresponseHdrCol",
				"tasktype":"tabchange",
				"input":[""],
				"service":"CoreJourneyPlanService",
				"methodName":"GET_DRIVER_RESPONSE_DATA"
			}
			
		];
		
		
		this.callParent(arguments);
		
	}
});
