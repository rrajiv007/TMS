/************************************************************************************************
               			    Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1       Raj            07/11/18                             update the diversion distance
************************************************************************************************/
Ext.define('CueTrans.view.tms.UpdateDiversionDist', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.toolbarSectionFlag=true;
		mainpage.screenName = "Update Diversion Distance";	
		
		
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
			//plf.addHlpText({"label":"Load No","id":"strLoadNo",hlpLinkID:"LoadNo"},this),
			plf.addText({"label":"Load No",id:"strLoadNo","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Journey Plan No","id":"strJourneyPlanNo"}),
			plf.addDisplayOnly({"label":"JP Status","id":"strStatus"}),
			plf.addText({"label":"Diversion Distance",id:"strDocNo",inputFormat:'numeric',weightPrecision:3,"mandatory":"true"}),
			plf.addText({"label":"Amend Remarks",id:"strAmendRsn","mandatory":"true"}),
			plf.addBlank(),
			plf.addButton({"label":"Save","id":"Save",width:100,tooltip:"Click here to save diversion distance."})	
		]
		
		 LoadBasedSummaryColumn.add(LoadBasedSummaryFormCtrl);
		 
		/*var amendDetails = plf.addColumnSection({title:"Amend Reason"})
		
		var amendDetailsCtrl=
		[   
		     plf.addText({"label":"Amend Remarks",id:"strAmendRsn","mandatory":"true"})    
		]
		
		amendDetails.add(amendDetailsCtrl);
		
		amendDetails.add({xtype:"button",align:"right",text:"Save",tooltip:"Click here to save diversion distance.",columnWidth:.12,margin:3,fieldCls:"c-displyonlyctrl",
					handler: function() 
					{
						var result = confirm("Are you sure want to save diversion distance?");
								if (result) 
								{
									//Logic to Confirm the shipment									
									form_obj.queryById("methodName").setValue("SaveCancelLoadDtlsTs");
									process_ebpack_service(form_obj,["strLoadNo","strStatus","strDocNo",
									"strJourneyPlanNo","strAmendRsn"],"TMSCoreTransportTS");
								}
					}
		})*/
	//	customerContractSummaryGridSection = plf.addGrid(customerContractSummaryGridDetail,this)	
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(LoadBasedSummaryColumn)
		//mainpage.ptrMainSection.add(amendDetails) 
		
		
		
		//History Data Section
		//mainpage.dataHistorySectionFlag=false;
		mainpage.screenLinks=
		{
			
		}	
		
		mainpage.hlpLinks=
		{
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
				"methodName":"OnEnterBLDivLoadts"
		   },

			{
				"controlid":"Save",
				"tasktype":"btnclick",
				"input":["strLoadNo","strStatus","strDocNo","strJourneyPlanNo","strAmendRsn"],
				"service":"TMSCoreTransportTS",
				"methodName":"SaveBackLoadDivDisTs"
			}
		]
		this.callParent(arguments);
		
	
	}
});