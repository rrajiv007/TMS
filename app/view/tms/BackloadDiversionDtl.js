
Ext.define('CueTrans.view.tms.BackloadDiversionDtl', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Backload And Diversion Details";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.grid_passviol_flag=true;
		 
		plf.columns=4
	
		var BackloadHdrColumn = plf.addColumnSection({title:"Contract Details"});			 
		var BackloadFormCtrl=						 
		[
			
			plf.addDisplayOnly({"label":"Contract No",id:"strConTractNo"}),
			plf.addDisplayOnly({"label":"Contractor Name",id:"strConName"}),
			plf.addDisplayOnly({"label":"Contractor Phone",id:"strConTackPh"}),
			plf.addDisplayOnly({"label":"Total Loads Completed",id:"strTolLoadCom"}),
			plf.addDisplayOnly({"label":"Backloads Performed",id:"strBackload"}),
			plf.addDisplayOnly({"label":"Diversions Performed",id:"strDiversion"}),
			plf.addDisplayOnly({"label":"Normal Loads Performed",id:"strNmlLoadPre"})

		]
		 BackloadHdrColumn.add(BackloadFormCtrl);
		
		var LoadDtlObj=							
		[
		
		    {columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:80},
			{columnname:"Load Departure Date",dataname:"LOAD_DEPART_DATE",datatype:"string",width:130},
			{columnname:"Scheduled Vehicle",dataname:"SCH_VEHICLE",datatype:"string",width:120},
			{columnname:"Reported Vehicle",dataname:"REP_VEHICLE",datatype:"string",width:120},
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:150},
			{columnname:"Journey Plan No",dataname:"JOU_PLAN_NO",datatype:"string",width:120},
			{columnname:"Journey Start Date",dataname:"JOU_START_DATE",datatype:"string",width:120},
			{columnname:"Journey End Date",dataname:"JOU_END_DATE",datatype:"string",width:120},
			{columnname:"From Location",dataname:"FROM_LOCATION",datatype:"string",width:150},
			{columnname:"To Location",dataname:"TO_LOCATION",datatype:"string",width:150},
			{columnname:"Journey Status",dataname:"JOURNEY_STATUS",datatype:"string",width:150},
			{columnname:"Journey Closure Date",dataname:"JOU_CLOSE_DATE",datatype:"string",width:150}
			

			
		]
		var LoadDtlGridDtl=								
		{
			title:"Backload Details",
			id:"BackloadDtl",
			detail:LoadDtlObj,
			//visibleRow:plf.searchVisibleRows,
			visibleRow:10,
		    removeAddDelete:true,
			readonly:true
			
				
				
		}	
		var  LoadDtlCtrl = plf.addGrid(LoadDtlGridDtl,this)
		
		
		var DiversionDtlObj=							
		[
		    {columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:80},
			{columnname:"Load Departure Date",dataname:"LOAD_DEPART_DATE",datatype:"string",width:130},
			{columnname:"Scheduled Vehicle",dataname:"SCH_VEHICLE",datatype:"string",width:120},
			{columnname:"Reported Vehicle",dataname:"REP_VEHICLE",datatype:"string",width:120},
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:150},
			{columnname:"Journey Plan No",dataname:"JOU_PLAN_NO",datatype:"string",width:120},
			{columnname:"Journey Start Date",dataname:"JOU_START_DATE",datatype:"string",width:120},
			{columnname:"Journey End Date",dataname:"JOU_END_DATE",datatype:"string",width:120},
			{columnname:"From Location",dataname:"FROM_LOCATION",datatype:"string",width:150},
			{columnname:"To Location",dataname:"TO_LOCATION",datatype:"string",width:150},
			{columnname:"Journey Status",dataname:"JOURNEY_STATUS",datatype:"string",width:150},
			{columnname:"Journey Closure Date",dataname:"JOU_CLOSE_DATE",datatype:"string",width:150}
		]
		var DiversionDtlGridDtl=								
		{
			title:"Diversion Details",
			id:"DiversionDtl",
			detail:DiversionDtlObj,
		//	visibleRow:plf.searchVisibleRows,
		    visibleRow:10,
		    removeAddDelete:true,
			readonly:true
			
			
		}	
		var  DiversionDtlCtrl = plf.addGrid(DiversionDtlGridDtl,this)
		
		
		
		var NormalLoadsDtlObj=							
		[
		
		    {columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:80},
			{columnname:"Load Departure Date",dataname:"LOAD_DEPART_DATE",datatype:"string",width:130},
			{columnname:"Scheduled Vehicle",dataname:"SCH_VEHICLE",datatype:"string",width:120},
			{columnname:"Reported Vehicle",dataname:"REP_VEHICLE",datatype:"string",width:120},
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:150},
			{columnname:"Journey Plan No",dataname:"JOU_PLAN_NO",datatype:"string",width:120},
			{columnname:"Journey Start Date",dataname:"JOU_START_DATE",datatype:"string",width:120},
			{columnname:"Journey End Date",dataname:"JOU_END_DATE",datatype:"string",width:120},
			{columnname:"From Location",dataname:"FROM_LOCATION",datatype:"string",width:150},
			{columnname:"To Location",dataname:"TO_LOCATION",datatype:"string",width:150},
			{columnname:"Journey Status",dataname:"JOURNEY_STATUS",datatype:"string",width:150},
			{columnname:"Journey Closure Date",dataname:"JOU_CLOSE_DATE",datatype:"string",width:150}
			
		]
		var NormalLoadDtlGridDtl=								
		{
			title:"Normal Loads",
			id:"NormalLoadsDtl",
			detail:NormalLoadsDtlObj,
			//visibleRow:plf.searchVisibleRows,
			visibleRow:10,
			removeAddDelete:true,
			readonly:true
			
		}	
		var  NormalLoadsDtlCtrl = plf.addGrid(NormalLoadDtlGridDtl,this)
		
		
		var baseTab = plf.addTabSection({ tabs:[LoadDtlCtrl,DiversionDtlCtrl,NormalLoadsDtlCtrl]});
		
		mainpage.ptrMainSection.add(BackloadHdrColumn)
	 
		mainpage.ptrMainSection.add(baseTab) 
		
		
		//History Data Section
		
		
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	     
         {
				"controlid":"",
				"tasktype":"onload",
				"input":["strConTractNo"],
				"service":"VEHSCHCoreVehSchServiceTS",
				"methodName":"backloadDiversionInitTS"
			}

		
		];
		
		mainpage.hlpLinks=
		{
			
			
		}
		

		
		
		this.callParent(arguments);
		
	}
});
