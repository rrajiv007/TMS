/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1       Steffie        11/04/16        71907                             Cancel Load Details
************************************************************************************************/
Ext.define('CueTrans.view.tms.CancelLoad', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.toolbarSectionFlag=true;
		mainpage.screenName = "Cancel Load Details";	
		
		
		/*mainpage.toolbarActions= [{
                "name": "Save",
                "tooltip": "Click here to refresh."
            }
			]*/
		plf.columns=4
		var LoadBasedSummaryColumn = plf.addColumnSection({title:"", collapsed: true});
		
		
		var LoadBasedSummaryFormCtrl=
		[
			//plf.addCombo({"label":"Request Type","id":"strRequestType"}),
			plf.addHlpText({"label":"Load No","id":"strLoadNo",hlpLinkID:"LoadNo"},this),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			plf.addDisplayOnly({"label":"Vehicle Inspection No","id":"strInspectionNo"}),
			plf.addDisplayOnly({"label":"Journey Plan No","id":"strJourneyPlanNo"})
		]
		
		 LoadBasedSummaryColumn.add(LoadBasedSummaryFormCtrl);
		 
		var amendDetails = plf.addColumnSection({title:"Amend Reason"})
		
		var amendDetailsCtrl=
		[   
		     plf.addText({"label":"Amend Reason",id:"strAmendRsn","mandatory":"true"})    
		]
		
		amendDetails.add(amendDetailsCtrl);
		
		amendDetails.add({xtype:"button",align:"right",text:"Save",tooltip:"Click here to Save modified",columnWidth:.12,margin:3,fieldCls:"c-displyonlyctrl",
					handler: function() 
					{
						var result = confirm("Are you sure want to cancel Load?");
								if (result) 
								{
									//Logic to Confirm the shipment									
									form_obj.queryById("methodName").setValue("SaveCancelLoadDtlsTs");
									process_ebpack_service(form_obj,["strLoadNo","strStatus","strInspectionNo",
									"strJourneyPlanNo","strAmendRsn"],"TMSCoreTransportTS");
								}
					}
		})
	//	customerContractSummaryGridSection = plf.addGrid(customerContractSummaryGridDetail,this)	
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(LoadBasedSummaryColumn)
		mainpage.ptrMainSection.add(amendDetails) 
		
		
		
		//History Data Section
		//mainpage.dataHistorySectionFlag=false;
		mainpage.screenLinks=
		{
			
		}	
		
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
							{"parent":"strLoadNo","child":"LOAD_NO"}/*,
							{"parent":"strStatus","child":"STATUS"},
							{"parent":"strJourneyPlanNo","child":"JP_NO"},
							{"parent":"strInspectionNo","child":"INSPECTION_NO"}*/
							]
				}
		}
		
		mainpage.eventHandlers = 
			[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initCancelLoadTS"
			},
			{
				"controlid":"strLoadNo",
				"tasktype":"onenter",
				"input":["strLoadNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"OnEnterLoadts"
		}
		]
		this.callParent(arguments);
		
	
	}
});