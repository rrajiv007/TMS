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
************************************************************************************************/
Ext.define('CueTrans.view.tms.LoadingUnloading', 

{ 
extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Loading/Unloading";
		
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		mainpage.toolbarActions= [{
                "name": "Save",
                "tooltip": "Click here to save."
            },
			{
                "name": "PrintWayBill",
                "tooltip": "Click here to print the way bill."
            }
			
            ]
	//	mainpage.toolbarActions=["Save","Print Way Bill"]
		
		//Loading Section begins
		
		plf.columns=4
		var LoadingColumn = plf.addColumnSection({});
		if(plf.defaultLayout==3)
		{
			plf.columns=3
			
			var LoadingCtrl=
			[	
				plf.addHlpText({"label":"Load No",id:"strLoadNo",hlpLinkID:"LoadNo"},this),
				plf.addDisplayOnly({"label":"Date",id:"dtLoadDate","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Time",id:"tmLoadTime"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				
				plf.addDisplayOnly({"label":"Route Code",id:"strRouteCode"}),
				plf.addDisplayOnly({"label":"Route Desc",id:"strRouteDesc"}),
				plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehicleCategory"}),
				plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"}),

				plf.addText({"label":"Driver Name",id:"strDriverName"}),
				plf.addText({"label":"Driver Phone No",id:"strPhoneNo"}),
				plf.addText({"label":"3PL Name",id:"strOwnerName"}),
				plf.addText({"label":"Truck Reg No",id:"strTruckNo"})		



	
				
			]
		}
	else
		{
		LoadingCtrl=
			[	
	   			plf.addHlpText({"label":"Load No",id:"strLoadNo",hlpLinkID:"LoadNo"},this),
				plf.addDisplayOnly({"label":"Date",id:"dtLoadDate","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Time",id:"tmLoadTime"}),
				
				plf.addDisplayOnly({"label":"Route Code",id:"strRouteCode"}),
				plf.addDisplayOnly({"label":"Route Desc",id:"strRouteDesc"}),
	   			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
	            
				plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehicleCategory"}),
				plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"}),
				

				plf.addText({"label":"Driver Name",id:"strDriverName"}),
				plf.addText({"label":"Driver Phone No",id:"strPhoneNo"}),
				plf.addText({"label":"3PL Name",id:"strOwnerName"}),
				plf.addText({"label":"Truck Reg No",id:"strTruckNo"})			


	 			
			]
		
		}
		
		//Loading Section starts
		
		plf.columns=3
		var LoadingSecColumn = plf.addColumnSection({title:"Loading"});
		if(plf.defaultLayout==3)
		{
			plf.columns=3
			
			var LoadingCtrl1=
			[	
				plf.addDate({"label":"Loading Date",id:"dtLoadingDate"}),
				plf.addText({"label":"Loading Start Time",id:"iLoadStartTime"}),
				plf.addText({"label":"Loading Completed Time",id:"iLoadCompTime"}),
				
				
				plf.addDate({"label":"Load Closure Date",id:"dtLoadClosDate"}),
				plf.addText({"label":"Load Closure Time",id:"iLoadClosTime"}),
				plf.addBlank()
				
			]
		}
	else
		{
		LoadingCtrl1=
			[	
	   			plf.addDate({"label":"Loading Date",id:"dtLoadingDate"}),
				plf.addText({"label":"Loading Start Time",id:"iLoadStartTime"}),
				plf.addText({"label":"Loading Completed Time",id:"iLoadCompTime"})
				
				
				
				//plf.addDate({"label":"Load Closure Date",id:"dtLoadClosDate"}),
			//	plf.addText({"label":"Load Closure Time",id:"iLoadClosTime"}),
				//plf.addBlank()
				
				
	 			
			]
		
		}
		
		//UnLoading Section starts
		
		plf.columns=3
		var UnloadingSecColumn = plf.addColumnSection({title:"UnLoading"});
		if(plf.defaultLayout==3)
		{
			plf.columns=3
			
			var LoadingCtrl2=
			[	
				plf.addDate({"label":"UnLoading Date",id:"dtUnLoadingDate"}),
				plf.addText({"label":"UnLoading Start Time",id:"iUnLoadStartTime"}),
				plf.addText({"label":"UnLoading Completed Time",id:"iUnLoadCompTime"}),
				
				
				plf.addDate({"label":"UnLoad Closure Date",id:"dtUnLoadClosDate"}),
				plf.addText({"label":"UnLoad Closure Time",id:"iUnLoadClosTime"}),
				plf.addBlank()
				
			]
		}
	else
		{
		var LoadingCtrl2=
			[	
	   			plf.addDate({"label":"Unloading Date",id:"dtUnLoadingDate"}),
				plf.addText({"label":"Unloading Start Time",id:"iUnLoadStartTime"}),
				plf.addText({"label":"Unloading Completed Time",id:"iUnLoadCompTime"})
				
				
				
			//	plf.addDate({"label":"Unload Closure Date",id:"dtUnLoadClosDate"}),
			//	plf.addText({"label":"Unload Closure Time",id:"iUnLoadClosTime"}),
			//	plf.addBlank()
				
			]
		}
		
		//Closure Section starts
		
		plf.columns=3
		var LoadClosureSecColumn = plf.addColumnSection({title:"Load Closure"});
		if(plf.defaultLayout==3)
		{
			plf.columns=3
			
			var LoadingCtrl3=
			[	
								
				plf.addDate({"label":"Load Closure Date",id:"dtLoadClosDate"}),
				plf.addText({"label":"Load Closure Time",id:"iLoadClosTime"}),
				plf.addBlank()
				
			]
		}
	else
		{
		LoadingCtrl3=
			[	
	   			plf.addDate({"label":"Load Closure Date",id:"dtLoadClosDate"}),
				plf.addText({"label":"Load Closure Time",id:"iLoadClosTime"}),
				plf.addBlank()
				
				
			//	plf.addDate({"label":"Unload Closure Date",id:"dtUnLoadClosDate"}),
			//	plf.addText({"label":"Unload Closure Time",id:"iUnLoadClosTime"}),
			//	plf.addBlank()
				
			]
		}
		
		var loadListSummaryObj=
		[
			{columnname:"Shipment Number",dataname:"SHIPMENT_NO",datatype:"string",width:200,linkId:"loadnolink"},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:100},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},			
			{columnname:"Weight",dataname:"WEIGHT",datatype:"string",width:150},
			{columnname:"Volume",dataname:"VOLUME",datatype:"string",width:150}
			
		]
		loadListSummaryGridDetail=
		{
			title:"",
			id:"LoadSummaryGrid",
			detail:loadListSummaryObj,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true
			
		}
		var loadListSummaryGridSection = plf.addGrid(loadListSummaryGridDetail,this)	
		
		LoadingColumn.add(LoadingCtrl);
		LoadingSecColumn.add(LoadingCtrl1);
		UnloadingSecColumn.add(LoadingCtrl2);
		LoadClosureSecColumn.add(LoadingCtrl3);
		
				
		mainpage.ptrMainSection.add(LoadingColumn)
        mainpage.ptrMainSection.add(LoadingSecColumn)
        mainpage.ptrMainSection.add(UnloadingSecColumn)	
		mainpage.ptrMainSection.add(LoadClosureSecColumn)	
        mainpage.ptrMainSection.add(loadListSummaryGridSection)			//Add Load Building Column Section to Main Page		//Add Load Building Column Section to Main Page
			
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	 		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strLoadNo","dtLoadDate","tmLoadTime","strStatus","strRouteCode","strRouteDesc","strVehicleCategory",
				"strVehicleCategory","strCommodity","dtLoadingDate","iLoadStartTime","iLoadCompTime","dtLoadClosDate","iLoadClosTime",
				"dtUnLoadingDate","iUnLoadStartTime","iUnLoadCompTime","dtUnLoadClosDate","iUnLoadClosTime"],
				"service":"TMSCoreTransportTS",
				"methodName":"maintainLoadingUnloading"
		   },
		   {
				"controlid":"strLoadNo",
				"tasktype":"onenter",
				"input":["strLoadNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchLoadUnloadTS"
		  },
           {        
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"PrintWayBill",
                            "input":["strLoadNo"], 
				"service":"CoreReportService",
				"methodName":"PrintwaybillloadunloadReport"
 		   },
          {
				"controlid":"",
				"tasktype":"onload",
				"input":["strLoadNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"initLoadUnloadTS"
		  },		   
		];
	
	//Event Handlers Mapping Ends
		
		//Help link begins
		mainpage.hlpLinks=
		{			
				"LoadNo":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.LoadBuildingHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strLoadNo","child":"LOAD_NO"}
							]
				}
						
		}
	
		
		
		//Generate Screen Section
		this.callParent(arguments);
		
	}
});


