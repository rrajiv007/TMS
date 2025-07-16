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
Ext.define('CueTrans.view.tms.LoadClosure', 

{ 
extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Load Closure";
		mainpage.toolbarLinks=
		[
			//{"name":"Loading","linkid":"tms_loadingScr","tooltip":"Click here to create a new journey plan."},
			//{"name":"Unloading","linkid":"tms_unloadingScr","tooltip":"Click here to create a new journey plan."}
		]
		
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		mainpage.toolbarActions= [{
                "name": "Close",
                "tooltip": "Click here to close load."
            }
			
            ]
	//	mainpage.toolbarActions=["Save","Print Way Bill"]
		
		//Loading Section begins
		
		//plf.columns=3
		var LoadingColumn = plf.addColumnSection({});
		if(plf.defaultLayout==3)
		{
			plf.columns=3
			
			var LoadingCtrl=
			[	
				plf.addHlpText({"label":"Load No",id:"strLoadNo",hlpLinkID:"LoadNo"},this),				
				plf.addDisplayOnly({"label":"Vehicle",id:"strVehicleRegNo"}),
				plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
				plf.addDisplayOnly({"label":"Journey Plan No",id:"strJourneyPlanNo"})
				//plf.addCombo({"label":"Unloading Location",id:"strUnLoadingLocation"})
			]
		}
		else
		{
		LoadingCtrl=
			[	
	   			plf.addHlpText({"label":"Load No",id:"strLoadNo",hlpLinkID:"LoadNo"},this),				
				plf.addDisplayOnly({"label":"Vehicle",id:"strVehicleRegNo"}),
				plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
				plf.addDisplayOnly({"label":"Journey Plan No",id:"strJourneyPlanNo"})
				//plf.addCombo({"label":"Unloading Location",id:"strUnLoadingLocation"})
			]
		
		}
		
		//UnLoading Section starts
		
		//plf.columns=3
		/*
		UnloadingSecColumn = plf.addColumnSection({title:""});
		if(plf.defaultLayout==3)
		{
			plf.columns=3
			
			LoadingCtrl2=
			[	
				plf.addDate({"label":"UnLoading Date",id:"dtLoadingDate","mandatory":"true"}),
				plf.addTime({"label":"Start Time",id:"iLoadStartTime","mandatory":"true"}),
				plf.addTime({"label":"End Time",id:"iLoadCompTime",inputFormat:"numeric",weightPrecision:2}),
			]
		}
		else
		{
		LoadingCtrl2=
			[	
	   			plf.addDate({"label":"Unloading Date",id:"dtLoadingDate","mandatory":"true"}),
				plf.addTime({"label":"Start Time",id:"iLoadStartTime","mandatory":"true"}),
				plf.addTime({"label":"End Time",id:"iLoadCompTime",inputFormat:"numeric",weightPrecision:2}),
				
				
			]
		}
		*/
		
		var CarWeighColumn = plf.addColumnSection({title:"Weightment Details"});
		if(plf.defaultLayout==3)
		{
			plf.columns=3
			
			var CarWeighCtrl=
			[	
				plf.addHlpText({"label":"Carrier Code",id:"strCarCode",hlpLinkID:"CarrierCode"},this),
				plf.addDisplayOnly({"label":"Carrier Name",id:"strCarName"}),
				plf.addText({"label":"Tare Weight (ton)",id:"iTareWt","mandatory":"true",inputFormat:"numeric",weightPrecision:2}),
				plf.addText({"label":"Gross Weight (ton)",id:"iGrossWt","mandatory":"true",inputFormat:"numeric",weightPrecision:2}),
				plf.addDisplayOnly({"label":"Net Weight (ton)",id:"iNetWt",inputFormat:"numeric",weightPrecision:2})
				
			]
		}
		else
		{
			CarWeighCtrl=
			[	
	   			plf.addHlpText({"label":"Carrier Code",id:"strCarCode",hlpLinkID:"CarrierCode"},this),
				plf.addDisplayOnly({"label":"Carrier Name",id:"strCarName"}),
				plf.addText({"label":"Tare Weight (ton)",id:"iTareWt",inputFormat:"numeric",weightPrecision:2}),
				plf.addText({"label":"Gross Weight (ton)",id:"iGrossWt",inputFormat:"numeric",weightPrecision:2}),
				plf.addDisplayOnly({"label":"Net Weight (ton)",id:"iNetWt",inputFormat:"numeric",weightPrecision:2})
	 			
			]
		
		}
		
		//Closure Section starts
		
		//plf.columns=3
		var LoadClosureSecColumn = plf.addColumnSection({title:""});
		if(plf.defaultLayout==3)
		{
			plf.columns=3
			
			var LoadingCtrl3=
			[	
				plf.addDateTime({"label":"Load Closure Date/Time",dateid:"dtLoadClosDate",timeid:"iLoadClosTime","mandatory":"true"}),
				plf.addBlank(),
				plf.addBlank()
				
			]
		}
	else
		{
		LoadingCtrl3=
			[	
	   			plf.addDateTime({"label":"Load Closure Date/Time",dateid:"dtLoadClosDate",timeid:"iLoadClosTime","mandatory":"true"}),
				plf.addBlank(),
				plf.addBlank(),
				plf.addBlank()
				
				
			//	plf.addDate({"label":"Unload Closure Date",id:"dtUnLoadClosDate"}),
			//	plf.addText({"label":"Unload Closure Time",id:"iUnLoadClosTime"}),
			//	plf.addBlank()
				
			]
		}
		
		var loadListSummaryObj=
		[
			//{columnname:"Loading Location",dataname:"LOADING_LOC",datatype:"string",width:200},
			{columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",width:150},
			{columnname:"Item Description",dataname:"ITEM_DESCRIPTION",datatype:"string",width:200},
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",width:200,hidden:true},
			{columnname:"Quantity",dataname:"LOADING_QUANTITY",datatype:"string",width:200,inputFormat:"numeric",weightPrecision:2},
			//{columnname:"Unloading Quantity",dataname:"UNLOADING_QUANTITY",datatype:"string",width:200,editControl:"textbox",inputFormat:"numeric",weightPrecision:2},			
			//{columnname:"Unloading Condition",dataname:"UNLOADING_CONDITION",datatype:"string",editControl:"combo",storeId:"strUnloadingCondition",width:200}
			//strUnloadingCondition
		]
		loadListSummaryGridDetail=
		{
			title:"",
			id:"UnLoadingGrid",
			detail:loadListSummaryObj,
			visibleRow:plf.searchVisibleRows-8,
			removeAddDelete:true
			
		}
		loadListSummaryGridSection = plf.addGrid(loadListSummaryGridDetail,this)	
		
		LoadingColumn.add(LoadingCtrl);
		//LoadingSecColumn.add(LoadingCtrl1);
		//UnloadingSecColumn.add(LoadingCtrl2);
		CarWeighColumn.add(CarWeighCtrl);
		LoadClosureSecColumn.add(LoadingCtrl3);
		
				
		mainpage.ptrMainSection.add(LoadingColumn)
		mainpage.ptrMainSection.add(LoadClosureSecColumn)
        //mainpage.ptrMainSection.add(LoadingSecColumn)
       // mainpage.ptrMainSection.add(UnloadingSecColumn)		
		//mainpage.ptrMainSection.add(CarWeighColumn)		
        mainpage.ptrMainSection.add(loadListSummaryGridSection)			//Add Load Building Column Section to Main Page		
			
		//Add Load Building Column Section to Main Page
			
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	 		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strLoadNo","ITEM_CODE","UnLoadingGrid"],
				"service":"TMSCoreTransportTS",
				"methodName":"initcloseLoadTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Close",
				"input":["strLoadNo","dtLoadClosDate","iLoadClosTime","UnLoadingGrid","strCarCode","iTareWt","iGrossWt"],
				"service":"TMSCoreTransportTS",
				"methodName":"closeLoadTS"
		   },
		   {
				"controlid":"strLoadNo",
				"tasktype":"onenter",
				"input":["strLoadNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchcloseLoadTS"
		  }
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
				},
						
				"CarrierCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCarCode","child":"OWNER_CODE_3PL"},
							//{"parent":"strCarCode","child":"OWNER_CODE_3PL"},
							{"parent":"strCarName","child":"OWNER_NAME_3PL"}
							]
				}
						
		}
	
	
	
		/*	
		mainpage.screenLinks=
		{
						
				"tms_loadingScr":
				{
					"dest":"tms.Loading",
					"hdr":[
							{"src":"strLoadNo","dest":"strLoadNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		
				
				
				
		}
		*/
		//Generate Screen Section
		this.callParent(arguments);
		
	}
});


