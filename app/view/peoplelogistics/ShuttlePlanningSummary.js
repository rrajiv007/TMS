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
Ext.define('CueTrans.view.peoplelogistics.ShuttlePlanningSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Shuttle Planning Summary";
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;
		mainpage.toolbarLinks=
		[
		  {"name":"Create Shuttle Plan","linkid":"tms_CreateShuttlePlanning","tooltip":"Click here to create a new shuttle plan."}
		]			
		//Shuttle Planning Section starts

		var formCtrl=[];
		plf.columns=4
		var ShuttlePlanningSummaryColumn = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
		
		
		var PeoplePlanningSummaryFormCtrl=
		[
			plf.addText({"label":"Shuttle Plan No",id:"strShutPlanNo"}),
			//plf.addText({"label":"Shuttle Req No",id:"strShutReqNo"}),			
			plf.addText({"label":"Vehicle Reg No","id":"strVehicle"}),
			plf.addCombo({"label":"Status","id":"strStatus"}),
			//plf.addCombo({"label":"Date Type","id":"strDateType"}),
			//plf.addDate({"label":"Date From","id":"dtDateFrom"}),
			//plf.addDate({"label":"Date To","id":"dtDateTo"}),	
            plf.addDate({"label":"Travel Date","id":"dtTravelDate"}), 			
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination","id":"strDestination"}),
			plf.addText({"label":"Utilisation% From",id:"strUtilFrom"}),
			plf.addText({"label":"Utilisation% To",id:"strUtilTo"})
		
		]
		
		ShuttlePlanningSummaryColumn.add(PeoplePlanningSummaryFormCtrl);
		
		
		var ShuttlePlanningSummaryObj=
		[   			
			{columnname:"Shuttle Plan No",dataname:"SHUTTLE_PLAN_NO",datatype:"string",width:100,linkId:"Shuttlenolink",tooltip:"Click here to launch the shuttle planning screen."},
			{columnname:"Travel Date",dataname:"DEPT_DATE",datatype:"string",width:100},
			{columnname:"Vehicle Reg No",dataname:"VEHICLE",datatype:"string",width:90},
            {columnname:"Origin",dataname:"START_LOC",datatype:"string",width:90},
			{columnname:"Destination",dataname:"DEST_LOC",datatype:"string",width:90},	
			{columnname:"Route Code",dataname:"ROUTE_CODE",datatype:"string",width:90},
			{columnname:"No of Seats",dataname:"NOOFSEATS",datatype:"string",width:100,colAlign:'right'},            
            {columnname:"Utilization %",dataname:"UTILIZATION",datatype:"string",width:80,colAlign:'right'},			
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:80}
		]
		var ShuttlePlanningSummaryGridDetail=
		{
			title:"",
			id:"ShuttlePlanningGrid",
			detail:ShuttlePlanningSummaryObj,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true,
			readonly:true,
			widthBasis:"flex"
		}
		var ShuttlePlanningSummaryGridSection = plf.addGrid(ShuttlePlanningSummaryGridDetail,this)	
		
		//adding the field control to the mainpage
		mainpage.ptrMainSection.add(ShuttlePlanningSummaryColumn)
		mainpage.ptrMainSection.add(ShuttlePlanningSummaryGridSection) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		
			mainpage.eventHandlers = 
			[	
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"PPLCoreTS",
				"methodName":"initShuttleSummryTS"
			},
			{       
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strShutPlanNo","strStatus","strVehicle","dtTravelDate",
				"strOrigin","strDestination","strUtilFrom","strUtilTo"],
				"service":"PPLCoreTS",
				"methodName":"fetchShuttleSummryTS"
			}
			];
			
		
			mainpage.screenLinks=
			{
			"Shuttlenolink":
				{
					"dest":"peoplelogistics.ShuttlePlanning",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"SHUTTLE_PLAN_NO","dest":"strShuttlePlanNo"}
							]
				},
			"tms_CreateShuttlePlanning":
				{
					"dest":"peoplelogistics.ShuttlePlanning",
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
