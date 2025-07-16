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
Ext.define('CueTrans.view.tariff.LaneMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Lane Master";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		 
		mainpage.toolbarActions= [
			{
                "name": "Create",
                "tooltip": "Click here to create a lane."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a lane."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a lane."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate a lane."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate a lane."
            }
            ]


		plf.columns=4
		var LaneHdrColumn = plf.addColumnSection({});//69997
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var LaneHdrCtrl1=						//69997
			[	
			    plf.addHlpText({"label":"Lane Code",id:"strLaneCode","mandatory":"true",hlpLinkID:"lanehelp"},this),	
				plf.addCombo({"label":"Region From",id:"strRegionFrom","mandatory":"true"}),
				plf.addCombo({"label":"Type",id:"strType","mandatory":"true",listeners: {
                      change: function() {
                    	  mainpage.showPage(mainpage, "");
                      }
                      }}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addText({"label":"Lane Description",id:"strLaneDesc","mandatory":"true"}),
				plf.addCombo({"label":"Region To",id:"strRegionTo","mandatory":"true"}),
				plf.addCombo({"label":"Lane Category",id:"strLaneRegionType","mandatory":"true"})
				]
		
		}
		
		else
		{
			var LaneHdrCtrl1=
			[	
				plf.addHlpText({"label":"Lane Code",id:"strLaneCode","mandatory":"true",hlpLinkID:"lanehelp"},this),	
				plf.addCombo({"label":"Region From",id:"strRegionFrom","mandatory":"true"}),
				plf.addCombo({"label":"Type",id:"strType","mandatory":"true",listeners: {
                      change: function() {
                    	  mainpage.showPage(mainpage, "");
                      }
                      }}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addText({"label":"Lane Description",id:"strLaneDesc","mandatory":"true"}),
				plf.addCombo({"label":"Region To",id:"strRegionTo","mandatory":"true"}),
				plf.addCombo({"label":"Lane Category",id:"strLaneRegionType","mandatory":"true"})
				
			]
		}	
		
		LaneHdrColumn.add(LaneHdrCtrl1)
		
		mainpage.LaneGridSection = plf.addColumnSection({title:"Standard Lane"});	
		var LaneDtlObj=
		[	
			{columnname:"Standard Lane",dataname:"STD_LANE",datatype:"string",width:150,editControl:"combo",storeId:"StrStdLane"},
			{columnname:"Region From",dataname:"REG_FROM",datatype:"string",width:150},
			{columnname:"Region To",dataname:"REG_TO",width:200,width:150},
			{columnname:"Seq No",dataname:"SEQ_NO",editControl:"textbox","inputFormat":"integer"}
		]
		var LaneDtl=			
		{
			title:"",
			id:"LaneDtl",
			detail:LaneDtlObj,
			visibleRow:7,
			removeFilter:true,
			removeExport:true,
			removePaging:true
		}
		var LaneSection = plf.addGrid(LaneDtl,this)
		mainpage.LaneGridSection.add(LaneSection)
		
		
		mainpage.ptrMainSection.add(LaneHdrColumn) 
		mainpage.ptrMainSection.add(mainpage.LaneGridSection);
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strLaneCode"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"initLaneMasterTS",
				"callbackMethod":function()
				{
				mainpage.showPage(mainpage, "");
				}
		},
		{
				"controlid":"strLaneCode",
				"tasktype":"onenter",
				"input":["strLaneCode"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchLaneTS",
				"callbackMethod":function()
				{
				mainpage.showPage(mainpage, "");
				}
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strLaneCode","strLaneDesc","strStatus","strRegionFrom","strRegionTo","strLaneRegionType","LaneDtl","strType"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"createLaneTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strLaneCode","strLaneDesc","strStatus","strRegionFrom","strRegionTo","strLaneRegionType","LaneDtl","strType"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"editLanTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strLaneCode","strLaneDesc","strStatus","strRegionFrom","strRegionTo","strLaneRegionType","LaneDtl","strType"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"deleteLaneTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Activate",
				"input":["strLaneCode","strLaneDesc","strStatus","strRegionFrom","strRegionTo","strLaneRegionType","LaneDtl","strType"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"activateLanTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Inactivate",
				"input":["strLaneCode","strLaneDesc","strStatus","strRegionFrom","strRegionTo","strLaneRegionType","LaneDtl","strType"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"InactivateLaneTS"
		}
		];
		
		
			mainpage.hlpLinks=
		{
			"lanehelp":
				{
					"hlpType":"Header",
					"hlpScreen":"tariff.LaneHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strLaneCode","child":"LANE_CODE"}
							]
				}
		}
		
		
		this.callParent(arguments);
		
	},
	showPage : function(mainpage, tType) {
	var LaneType=mainpage.queryById("strType").getValue();
	mainpage.LaneGridSection.setVisible(false);
		if (LaneType == "DERV" )
		{
			mainpage.LaneGridSection.setVisible(true);
		}
	}
});
