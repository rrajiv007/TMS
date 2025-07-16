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
Ext.define('CueTrans.view.COASTAL_PERF_CONFI.SLAForRamadan', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.50;
		mainpage.popupWidthRatio=.7;	
		mainpage.startPainting();
		
		mainpage.screenName = "SLA Considering as Ramadan";
		
	
		mainpage.liveScreenFlag=true;
		mainpage.toolbarSectionFlag=true;
		//Add the header portion
		plf.columns=3
		var ConsideringasRamadanDetailsColumn = plf.addColumnSection({title:"Considering as Ramadan (On-time in Hrs)", collapsed: true});
		
		
		var ConsideringasRamadanCtrl=
		[
			plf.addText({"label":"Sohar to North",id:"strReleaseRemarks",inputFormat:'integer',InputLength:"3","mandatory":"true"}),
			plf.addText({"label":"Sohar to South",id:"strReleaseTo",inputFormat:'integer',InputLength:"3","mandatory":"true"}),
			plf.addText({"label":"Muscat to North",id:"strBackLdRefused",inputFormat:'integer',InputLength:"3","mandatory":"true"}),
			plf.addText({"label":"Muscat to South",id:"strApprovalReason",inputFormat:'integer',InputLength:"3","mandatory":"true"}),
			plf.addText({"label":"Duqm to North",id:"strApproverName",inputFormat:'integer',InputLength:"3","mandatory":"true"}),
			plf.addText({"label":"Duqm to South",id:"strNightDriveApproval",inputFormat:'integer',InputLength:"3","mandatory":"true"}),
			plf.addText({"label":"Duqm to Coastal",id:"strVioDriver",inputFormat:'integer',InputLength:"3","mandatory":"true"})
		]
		
		 ConsideringasRamadanDetailsColumn.add(ConsideringasRamadanCtrl);
		 
		var amendDetails = plf.addColumnSection({title:"SLA Amend Details"})
		
		var amendDetailsCtrl=
		[   
		    plf.addDisplayOnly({"label":"Amend No",id:"strLSRVioInform"}),
			plf.addTextArea({"label":"Remarks",id:"strLSRVioRemarks",InputLength:"4000",width:400,"mandatory":"true"}),
			plf.addDisplayOnly({"label":"Updated By",id:"strUpdatedBy"}),
			plf.addDisplayOnly({"label":"Updated Date",id:"strUpdatedDt"}),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addButton({"label":"Save","id":"Save",tooltip:"Click here to save.",width:100})			 
		]
		
		amendDetails.add(amendDetailsCtrl);
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(ConsideringasRamadanDetailsColumn)
		mainpage.ptrMainSection.add(amendDetails) 
		
		
		
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
				"service":"CoreJourneyPlanService",
				"methodName":"initSLARmdConfCosatalrpt"
			    },
				{
					"controlid":"Save",
					"tasktype":"btnclick",
					"input":["strReleaseRemarks","strReleaseTo","strBackLdRefused","strApprovalReason","strApproverName","strNightDriveApproval","strVioDriver",
				"strLSRVioInform","strLSRVioRemarks"],
					"service":"CoreJourneyPlanService",
					"methodName":"saveSLARmdConfCosatalrpt"
				}
			]
		this.callParent(arguments);
		
	
	}
});