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
Ext.define('CueTrans.view.Report.OTOWorkAllocationReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Latest OTO Trip details";
		mainpage.toolbarSectionFlag=true;
		 var GridFetchObj=
		  [   
			{columnname:"Vehicle Code",dataname:"VEH_CODE",datatype:"string",width:100},
			{columnname:"Contract No",dataname:"CONTRACT_NUM",datatype:"string",width:100},
			{columnname:"Vehicle Category",dataname:"VEH_CAT",datatype:"string",width:140},
			{columnname:"Roster Override",dataname:"MAN_FLAG",datatype:"string",width:120},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:100},
			{columnname:"Load Date",dataname:"LOAD_DATE",datatype:"date",width:100},
			{columnname:"Load Status",dataname:"LOAD_STATUS",datatype:"string",width:120},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"From Region",dataname:"FROM_REGION",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
			{columnname:"To Region",dataname:"TO_REGION",datatype:"string",width:150},
			{columnname:"Loading Point",dataname:"LOAD_AT",datatype:"string",width:140},
			{columnname:"Unloading Point",dataname:"UNLOAD_AT",datatype:"string",width:140},
			{columnname:"Load Description",dataname:"LOAD_DESC",datatype:"string",width:140},
			{columnname:"JP No",dataname:"JP_NO",datatype:"string",width:120},
			{columnname:"JP Status",dataname:"JP_STATUS",datatype:"string",width:120},
			{columnname:"Inspection No",dataname:"INSP_NO",datatype:"string",width:120},
			{columnname:"Inspection Status",dataname:"INSP_STATUS",datatype:"string",width:140},
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:130},
			{columnname:"Trip Status",dataname:"TRIP_STATUS",datatype:"string",width:140},
			{columnname:"Diversion/Backload JP No",dataname:"DIVJP_NO",datatype:"string",width:140},
			{columnname:"Status",dataname:"DIV_JP_STATUS",datatype:"string",width:140}
			
		]
		GridFetchObjdtl=
		{
			title:"",
			id:"otoworkallocation",
			detail:GridFetchObj,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		var GridSection = plf.addGrid(GridFetchObjdtl,this)
		
		
		mainpage.ptrMainSection.add(GridSection)	
		
			
		mainpage.eventHandlers = 
		[	
        			{ 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitOtoWorkAllocationDtl"
			}		
		];
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
