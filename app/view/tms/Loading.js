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
Ext.define('CueTrans.view.tms.Loading', 

{ 
extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Loading";
		mainpage.toolbarLinks=
		[
			//{"name":"Loading","linkid":"tms_loadingScr","tooltip":"Click here to create a new journey plan."},
			{"name":"Unloading","linkid":"tms_unloadingScr","tooltip":"Click here to create a new journey plan."}
		]
		
		
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
				plf.addDisplayOnly({"label":"Vehicle",id:"strVehicleRegNo"}),
				plf.addDisplayOnly({"label":"Driver",id:"strDriverName"}),
				plf.addCombo({"label":"Loading Location",id:"strLoadingLocation"})
				
			]
		}
	else
		{
		LoadingCtrl=
			[	
	   			plf.addHlpText({"label":"Load No",id:"strLoadNo",hlpLinkID:"LoadNo"},this),
				plf.addDisplayOnly({"label":"Vehicle",id:"strVehicleRegNo"}),
				plf.addDisplayOnly({"label":"Driver",id:"strDriverName"}),
				plf.addCombo({"label":"Loading Location",id:"strLoadingLocation"})
			]
		
		}
		
		//Loading Section starts
		
		//plf.columns=3
		var LoadingSecColumn = plf.addColumnSection({title:""});
		if(plf.defaultLayout==3)
		{
			plf.columns=3
			
			var LoadingCtrl1=
			[	
				plf.addDate({"label":"Loading Date",id:"dtLoadingDate","mandatory":"true"}),
				plf.addTime({"label":"Start Time",id:"iLoadStartTime","mandatory":"true"}),
				plf.addTime({"label":"End Time",id:"iLoadCompTime","mandatory":"true"}),
				/*
				plf.addHlpText({"label":"Carrier Code",id:"strCarCode",hlpLinkID:"CarrierCode"},this),
				plf.addDisplayOnly({"label":"Carrier Name",id:"strCarName"}),
				plf.addText({"label":"Tare Weight (ton)",id:"strTareWt","mandatory":"true"}),
				plf.addText({"label":"Gross Weight (ton)",id:"strGrossWt","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Net Weight (ton)",id:"strNetWt"})
				*/
				
			]
		}
		else
		{
		LoadingCtrl1=
			[	
	   			plf.addDate({"label":"Loading Date",id:"dtLoadingDate","mandatory":"true"}),
				plf.addTime({"label":"Start Time",id:"iLoadStartTime","mandatory":"true"}),
				plf.addTime({"label":"End Time",id:"iLoadCompTime","mandatory":"true"}),
				/*
				plf.addHlpText({"label":"Carrier Code",id:"strCarCode",hlpLinkID:"CarrierCode"},this),
				plf.addDisplayOnly({"label":"Carrier Name",id:"strCarName"}),
				plf.addText({"label":"Tare Weight (ton)",id:"strTareWt","mandatory":"true"}),
				plf.addText({"label":"Gross Weight (ton)",id:"strGrossWt","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Net Weight (ton)",id:"strNetWt"})
				*/
	 			
			]
		
		}
		
		CarWeighColumn = plf.addColumnSection({title:"Weightment Details"});
		if(plf.defaultLayout==3)
		{
			plf.columns=3
			
			var CarWeighCtrl=
			[	
				plf.addHlpText({"label":"Carrier Code",id:"strCarCode",hlpLinkID:"CarrierCode1"},this),
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
				plf.addText({"label":"Tare Weight (ton)",id:"iTareWt","mandatory":"true",inputFormat:"numeric",weightPrecision:2}),
				plf.addText({"label":"Gross Weight (ton)",id:"iGrossWt","mandatory":"true",inputFormat:"numeric",weightPrecision:2}),
				plf.addDisplayOnly({"label":"Net Weight (ton)",id:"iNetWt",inputFormat:"numeric",weightPrecision:2})
	 			
			]
		
		}
		
	
		var loadListSummaryObj=
		[
			{columnname:"UnLoading Location",dataname:"UNLOADING_LOC",datatype:"string",width:200},
			{columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",width:150},
			{columnname:"Item Description",dataname:"ITEM_DESCRIPTION",datatype:"string",width:200},
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",width:200,hidden:true},
			{columnname:"Quantity",dataname:"QUANTITY",datatype:"string",width:100,inputFormat:"numeric",weightPrecision:2},
			{columnname:"Loading Quantity",dataname:"LOADING_QUANTITY",datatype:"string",editControl:"textbox",width:150,inputFormat:"numeric",weightPrecision:2},
			{columnname:"Container Ref No",dataname:"REFERENCE_NO",datatype:"string",width:120,editControl:"textbox"}
			
		]
		loadListSummaryGridDetail=
		{
			title:"",
			id:"LoadSummaryGrid",
			detail:loadListSummaryObj,
			visibleRow:8,
			removeAddDelete:true,
			columnWidth:.5
		}
		var loadListSummaryGridSection = plf.addGrid(loadListSummaryGridDetail,this)	
		
		LoadingColumn.add(LoadingCtrl);
		LoadingSecColumn.add(LoadingCtrl1);
		CarWeighColumn.add(CarWeighCtrl);
		//UnloadingSecColumn.add(LoadingCtrl2);
		//LoadClosureSecColumn.add(LoadingCtrl3);
		
				
		mainpage.ptrMainSection.add(LoadingColumn)
        mainpage.ptrMainSection.add(LoadingSecColumn)
		mainpage.ptrMainSection.add(CarWeighColumn)
		
        //mainpage.ptrMainSection.add(UnloadingSecColumn)	
		//mainpage.ptrMainSection.add(LoadClosureSecColumn)	
        mainpage.ptrMainSection.add(loadListSummaryGridSection)			
		//Add Load Building Column Section to Main Page		//Add Load Building Column Section to Main Page
			
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	 		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strLoadNo","strLoadingLocation","dtLoadingDate","iLoadStartTime","iLoadCompTime","LoadSummaryGrid",
				"ITEM_CODE","iLoadingQuantity","iQuantity","strCarCode","iTareWt","iGrossWt"],
				"service":"TMSCoreTransportTS",
				"methodName":"saveLoadingTS"			
				
		   },
		   {
				"controlid":"strLoadNo",
				"tasktype":"onenter",
				"input":["strLoadNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchLoadingTS"
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
				"input":["strLoadNo","ITEM_CODE","LoadSummaryGrid"],
				"service":"TMSCoreTransportTS",
				"methodName":"initLoadingTS"
		  },
		  {
				"controlid":"strLoadingLocation",
				"tasktype":"onchange",
				"input":["strLoadingLocation","strLoadNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"onchangeLoadingTS"
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
	
	
		
		mainpage.screenLinks=
		{
				"tms_unloadingScr":
				{
					"dest":"tms.Unloading",
					"hdr":[
							{"src":"strLoadNo","dest":"strLoadNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
				
		}
		//Generate Screen Section
		this.callParent(arguments);
		
	}
});


