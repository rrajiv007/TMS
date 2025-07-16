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
Ext.define('CueTrans.view.PDOFinance.CancelLoad', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.3; 
		mainpage.popupWidthRatio=.75;
		mainpage.startPainting();		
		mainpage.screenName = "Cancel Load Details";			
	
		plf.columns=4
		var LoadBasedSummaryColumn = plf.addColumnSection({title:"", collapsed: true});	
		
		var LoadBasedSummaryFormCtrl=
		[			
			plf.addHidden({"label":"Carrier Bill ID",id:"strBillNo"}),	
			plf.addDisplayOnly({"label":"Load No","id":"strLoadNo"}),			
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			plf.addDisplayOnly({"label":"Vehicle Inspection No","id":"strInspectionNo"}),
			plf.addDisplayOnly({"label":"Journey Plan No","id":"strJourneyPlanNo"})
		]
		plf.columns=2
		 LoadBasedSummaryColumn.add(LoadBasedSummaryFormCtrl);
		 
		var amendDetails = plf.addColumnSection({title:"Amend Reason"})
		
		var amendDetailsCtrl=
		[   
		     plf.addText({"label":"Amend Reason",id:"strAmendRsn","mandatory":"true"})    
		]
		
		amendDetails.add(amendDetailsCtrl);
		
		amendDetails.add({xtype:"button",align:"right",text:"Cancel",tooltip:"Click here to cancel load",columnWidth:.12,margin:3,fieldCls:"c-displyonlyctrl",
					handler: function() 
					{
						var result = confirm("Are you sure want to cancel Load?");
								if (result) 
								{
									//Logic to Confirm the shipment									
									mainpage.queryById("methodName").setValue("SaveCancelLoadFinTS");
									process_ebpack_service(mainpage,["strLoadNo","strStatus","strInspectionNo",
									"strJourneyPlanNo","strAmendRsn"],"TMSCoreTransportTS",null,null,
									function()
										{
											mainpage.processHLink("viewCarrierBill");											
											mainpage.ownerCt.close();									
										}
									);
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
			"viewCarrierBill":
				{
					"dest":"PDOFinance.PDOViewCarrierBill",
					"hdr":[
							{"src":"strBillNo","dest":"strBillNo"}						
							],
					"grid":[
							{"src":"","dest":""}	
							]
				}
		}			
		
		mainpage.eventHandlers = 
			[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strLoadNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"OnEnterFinLoadts"
			}
		]
		this.callParent(arguments);
		
	
	}
});