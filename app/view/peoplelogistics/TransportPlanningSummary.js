/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
		                                   
************************************************************************************************/
Ext.define('CueTrans.view.peoplelogistics.TransportPlanningSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Transport Planning Summary";
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;
		mainpage.toolbarLinks=
		[
		  {"name":"Create Transport Plan","linkid":"tms_CreateTransportPlanning","tooltip":"Click here to create a new transport plan."}
		]			
		//People Planning Section starts

		var formCtrl=[];
		plf.columns=4
		var TransportPlanningSummaryColumn = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
		
		
		var PeoplePlanningSummaryFormCtrl=
		[
			plf.addText({"label":"Transport Plan No",id:"strTransportPlanNo"}),
			//plf.addText({"label":"Transport Req No",id:"strTranRequestNo"}),			
			plf.addCombo({"label":"Vehicle Category","id":"strVehicleCategory"}),
			plf.addCombo({"label":"Status","id":"strStatus"}),
			//plf.addCombo({"label":"Date Type","id":"strDateType"}),
			//plf.addDate({"label":"Date From","id":"dtDateFrom"}),
			//plf.addDate({"label":"Date To","id":"dtDateTo"}),
			plf.addDate({"label":"Travel Date",id:"dtTravelDate"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination","id":"strDestination"}),
			plf.addText({"label":"Utilisation% From",id:"strUtilFrom"}),
			plf.addText({"label":"Utilisation% To",id:"strUtilTo"}),
		
		]
		
		TransportPlanningSummaryColumn.add(PeoplePlanningSummaryFormCtrl);
		
		
		var TransportPlanningSummaryObj=
		[   			
			{columnname:"Transport Plan No",dataname:"TRANSPORT_PLAN_NO",datatype:"string",width:100,linkId:"Transportnolink",tooltip:"Click here to launch the transport plan screen."},
			{columnname:"Travel Date",dataname:"DEP_DATE",datatype:"string",width:100},   
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:90},
            {columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:90},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:90},		
			{columnname:"Route Code",dataname:"ROUTE_CODE",datatype:"string",width:90},
			{columnname:"No of Seats",dataname:"NOOFSEATS",datatype:"string",width:100,colAlign:'right'},            
            {columnname:"Utilization %",dataname:"UTILIZATION",datatype:"string",width:80,colAlign:'right'},			
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:80}
		]
		var TransportPlanningSummaryGridDetail=
		{
			title:"",
			id:"TransportPlanningGrid",
			detail:TransportPlanningSummaryObj,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true,
			readonly:true,
			widthBasis:"flex"
		}
		var TransportPlanningSummaryGridSection = plf.addGrid(TransportPlanningSummaryGridDetail,this)	
		
		//adding the field control to the mainpage
		mainpage.ptrMainSection.add(TransportPlanningSummaryColumn)
		mainpage.ptrMainSection.add(TransportPlanningSummaryGridSection) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		mainpage.eventHandlers = 
		[
		 {
			"controlid":"",
			"tasktype":"onload",
			"input":[""],
			"service":"PPLCoreTS",
			"methodName":"initTplanBasedSearchTS"
		 },
		 {					
			"controlid":"btnSearch",
			"tasktype":"btnclick",
			"input":["strTransportPlanNo","strStatus","strOrigin","strDestination",
					 "strVehicleCategory","strDateType","strUtilFrom","dtTravelDate",
					 "strUtilTo","TransportPlanningGrid"], 
			"service":"PPLCoreTS", 
			"methodName":"initTplanBasedSearchScrTS"
		 },
		 {
			"tasktype":"proto",
			"filename":"peoplelogistics/TransportPlanningSummary.json"
		 }
		];
			
		
			mainpage.screenLinks=
			{
			"Transportnolink":
				{
					"dest":"peoplelogistics.TransportPlanning",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"TRANSPORT_PLAN_NO","dest":"strTransportPlanNo"}
							]
				},
			"tms_CreateTransportPlanning":
				{
					"dest":"peoplelogistics.TransportPlanning",
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
