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
Ext.define('CueTrans.view.peoplelogistics.ShuttlePlanningHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		mainpage.screenName = "Help on Shuttle Planning";
        //mainpage.liveScreenFlag=true;		
		
		//Truck Master Section starts

		var formCtrl=[];
		plf.columns=4
		var planListSummaryColumn = plf.addColumnSection({collapsed: false});
		
		var planListSummaryFormCtrl=
		[
			
			plf.addText({"label":"Shuttle Plan No","id":"strShutPlanNo"}),
			plf.addCombo({"label":"Status","id":"strStatus"}),						
			plf.addCombo({"label":"Origin","id":"strOrigin"}),
			plf.addCombo({"label":"Destination","id":"strDestination"}),	
			plf.addDate({"label":"Travel Date","id":"dtTravelDate"}),
			//plf.addDate({"label":"Date To","id":"dtDateTo"}),			
			plf.addButton({"label":"Search","id":"btnSearch","tooltip":"Click here to search."})			
		]
		
		planListSummaryColumn.add(planListSummaryFormCtrl);
		
		
		var planListSummaryObj=
		[			
			{columnname:"Shuttle Plan No",dataname:"SHUTTLE_PLAN_NO",datatype:"string",width:100},
			{columnname:"Travel Date",dataname:"DEPT_DATE",datatype:"string",width:100},
			{columnname:"Vehicle Reg No",dataname:"VEHICLE",datatype:"string",width:90},
            {columnname:"Origin",dataname:"START_LOC",datatype:"string",width:90},
			{columnname:"Destination",dataname:"DEST_LOC",datatype:"string",width:90},	
			{columnname:"Route Code",dataname:"ROUTE_CODE",datatype:"string",width:90},
			{columnname:"No of Seats",dataname:"NOOFSEATS",datatype:"string",width:100,colAlign:'right'},            
            {columnname:"Utilization %",dataname:"UTILIZATION",datatype:"string",width:80,colAlign:'right'},			
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:80}		
		]
		var planListSummaryGridDetail=
		{
			title:"",
			id:"ShuttlePlanningGrid",
			detail:planListSummaryObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true,
			widthBasis:"flex"
		}
		var planListSummaryGridSection = plf.addGrid(planListSummaryGridDetail,this)	
		mainpage.hlpSearchGridPtr = planListSummaryGridSection
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(planListSummaryColumn)
		mainpage.ptrMainSection.add(planListSummaryGridSection) 
		
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
				"input":["strShutPlanNo","strStatus","dtTravelDate","strOrigin","strDestination"],
				"service":"PPLCoreTS",
				"methodName":"fetchShuttleSummryTS"
			}
		];
	//	mainpage.hlpLinks=
	
	 mainpage.screenLinks=
		{
			
		}
					
		this.callParent(arguments);
		
	
	}
});
