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
Ext.define('CueTrans.view.tms.AmendVendorTransRequest', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Amend Vendor Request";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
           // {"name":"Create Another Load","linkid":"tms_CreateLoadBuilding","tooltip":"Click here to create another new load."},		
		];
		
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Amend",
                "tooltip": "Click here to amend request."
            }
			]
		//Add the header portion
		plf.columns=4
		var venReqAmendColumn = plf.addColumnSection({title:"", collapsed: true});
		
		
		var venReqAmendFormCtrl=
		[
			    plf.addHlpText({"label":"Request No",id:"strRequestNo","mandatory":"true",hlpLinkID:"transreqno"},this),	
				//plf.addText({"label":"Request No",id:"strRequestNo","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Amend No",id:"iAmendmentNo"/*,"mandatory":"true"*/}),
				plf.addDisplayOnly({"label":"Request Date",id:"dtRequestDate"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addDisplayOnly({"label":"Ref Doc No",id:"strDocNo"}),
                	
				
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
				
				
				plf.addText({"label":"Remarks",id:"strRemarks","mandatory":"true"}),
				
				
				plf.addText({"label":"PO No",id:"strPONum","mandatory":"true"}),
				plf.addCombo({"label":"Loading Point",id:"strLoadAt"}), 
				plf.addCombo({"label":"Unloading Point",id:"strDelvAt"}),
				plf.addText({"label":"Amend Reason",id:"strAmendRsn","mandatory":"true"}) 
		]
		
		venReqAmendColumn.add(venReqAmendFormCtrl);
		
		//amendDetails.add(amendDetailsCtrl);
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(venReqAmendColumn)
	
		
		
		
		//History Data Section
		//mainpage.dataHistorySectionFlag=false;
		mainpage.screenLinks=
		{
			
		}	
		
		mainpage.hlpLinks=
		{
		"transreqno":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.TransReqAmendItemHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRequestNo","child":"TRANS_REQ_NO"}
							]
				}	
		}
		
		mainpage.eventHandlers = 
			[
			   {
				"controlid":"",
				"tasktype":"onload",
				"input":["strRequestNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"initVenReqAmendTS" //initItemBasedTS
		       },
			   {       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Amend",
				"input":["strRequestNo","strRemarks","strLoadAt","strDelvAt","strPONum","strAmendRsn"],
				"service":"TMSCoreTransportTS",
				"methodName":"VenReqAmendTS"//VendorAmendTS
		       },
			   {
					"controlid":"strRequestNo",
					"tasktype":"onenter",
					"input":["strRequestNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"onenterVenReqAmendTS"
		        }/*,
			   {
					"controlid":"strLoadNo",
					"tasktype":"onenter",
					"input":["strLoadNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"OnEnterLoadForPatchUpd"
				},
				{
					"controlid":"LoadUnloadPoint",
					"tasktype":"btnclick",
					"input":["strLoadNo","strStatus","strAmendRsn","strLoadAt","strDelvAt"],
					"service":"TMSCoreTransportTS",
					"methodName":"patchLoadUnloadPoint" 
				}*/
			]
		this.callParent(arguments);
		
	
	}
});