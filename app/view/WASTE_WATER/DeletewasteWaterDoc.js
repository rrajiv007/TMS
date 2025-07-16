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
Ext.define('CueTrans.view.WASTE_WATER.DeletewasteWaterDoc', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Delete Uploaded Details";
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
                "name": "Delete",
                "tooltip": "Click here to delete details.",
				"msg":"Are you sure want to delete details?"
            }
			]
		//Add the header portion
		plf.columns=4
		var venReqAmendColumn = plf.addColumnSection({title:"", collapsed: true});
		
		
		var venReqAmendFormCtrl=
		[
			plf.addDisplayOnly({"label":"Type",id:"strType"}),
			plf.addDisplayOnly({"label":"Contractor Name",id:"strContractorName"}),
			plf.addDisplayOnly({"label":"Year",id:"strYear"}),
			plf.addDisplayOnly({"label":"Month",id:"strMonth"}),
			plf.addDisplayOnly({"label":"Total Amount",id:"strTotalAmount",inputFormat:'numeric',weightPrecision:3}),
			plf.addDisplayOnly({"label":"Uploaded By",id:"strUploadedBy"}),
			
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}), 
			//plf.addTextArea({"label":"Remarks",id:"strRemarks"}),addDisplayTextArea
			plf.addBlank(), 
			plf.addDisplayTextArea({"label":"Remarks",id:"strRemarks"}),
			plf.addBlank(), 
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addHidden({"label":"Uploaded Date",id:"strUploadedDT"}),
			plf.addText({"label":"Amend Reason",id:"strAmendRsn","mandatory":"true"}),
			plf.addHidden({"label":"Seq No",id:"strSeqno"})
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
		
		}
		
		mainpage.eventHandlers = 
			[
			   {
				"controlid":"",
				"tasktype":"onload",
				"input":["strSeqno"],
				"service":"WasteWaterCoreServiceTS",
				"methodName":"initDeleteUploadTs" 
		       },
			   {       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strSeqno","strAmendRsn"],
				"service":"WasteWaterCoreServiceTS",
				"methodName":"DeleteWWUploadTs"
		       }
			]
		this.callParent(arguments);
		
	
	}
});