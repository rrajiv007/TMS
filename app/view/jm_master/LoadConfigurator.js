/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	                           Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.LoadConfigurator', 

{ 
extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Commodity Exclusion";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
		];
		
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Save",
                "tooltip": "Click here to configure commodity exclusion"
            }
            ]	     
		plf.columns=4
		var LoadConfiguratorColumn = plf.addColumnSection({"title":""});			//69995
		if(plf.defaultLayout==3)
		{
			plf.columns=3			
			var LoadConfiguratorCtrl=				//69995
			[	
				plf.addCombo({"label":"Commodity",id:"strCommodity","mandatory":"true"})		
			]		
		}
		
		else
		{		
		var LoadConfiguratorCtrl=			//69995
			[	
				plf.addCombo({"label":"Commodity",id:"strCommodity","mandatory":"true"})			
			]		
		}
		LoadConfiguratorColumn.add(LoadConfiguratorCtrl);
		
		/*Commodity Exclusion starts here*/
		var loadSummaryObj=				//69995
		[
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:250,storeId:"strCommodityML",editControl:"combo"}			
		]
		var LoadGridDetail=				//69995
		{
			title:"Exclusions",
			id:"loadconfGrid",
			detail:loadSummaryObj,
			visibleRow:plf.searchVisibleRows,
			removeFilter:true,
			removeExport:true,
			//removePaging:true
		}
		var LoadGridSection = plf.addGrid(LoadGridDetail,this)			//69995
		/*Shipment Details ends here*/		
		
		
		
		//LoadBuilding detail Section Ends
		mainpage.ptrMainSection.add(LoadConfiguratorColumn)	
		//mainpage.ptrMainSection.add(baseTab)
		mainpage.ptrMainSection.add(LoadGridSection)
		//mainpage.ptrMainSection.add(VehUtilGridSection)
		mainpage.dataHistorySectionFlag=true;		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initLoadConfiguratorTS"
		},
		{
				"controlid":"strCommodity",
				"tasktype":"onchange",
				"input":["strCommodity"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchLoadConfTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strCommodity","loadconfGrid"],
				"service":"TMSCoreTransportTS",
				"methodName":"createLoadConfTS"
		}			
		];
		//Event Handlers Mapping Ends
		
		//Help link begins
		mainpage.hlpLinks=
		{				
					
		}
		//Help link ends		
		
		
		//Generate Screen Section
		this.callParent(arguments);
		
	}
});


