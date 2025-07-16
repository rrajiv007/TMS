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
Ext.define('CueTrans.view.COASTAL_PERF_CONFI.SLAForNonRamadan', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.50;
		mainpage.popupWidthRatio=.7;	
		mainpage.startPainting();
		
		mainpage.screenName = "SLA Considering Not as Ramadan";
		
	
		mainpage.liveScreenFlag=true;
		mainpage.toolbarSectionFlag=true;
		//Add the header portion
		plf.columns=3
		var ConsideringNotasRamadanDetailsColumn = plf.addColumnSection({title:"Considering Not as Ramadan (On-time in Hrs)", collapsed: true});
		
		
		var ConsideringNotasRamadanCtrl=
		[
			plf.addText({"label":"Sohar to North",id:"strBLDistance",inputFormat:'integer',InputLength:"3","mandatory":"true"}),
			plf.addText({"label":"Sohar to South",id:"strBLWeight",inputFormat:'integer',InputLength:"3","mandatory":"true"}),
			plf.addText({"label":"Muscat to North",id:"strBLRemarks",inputFormat:'integer',InputLength:"3","mandatory":"true"}),
			plf.addText({"label":"Muscat to South",id:"strFuelReq",inputFormat:'integer',InputLength:"3","mandatory":"true"}),
			plf.addText({"label":"Duqm to North",id:"strFuelChitNo",inputFormat:'integer',InputLength:"3","mandatory":"true"}),
			plf.addText({"label":"Duqm to South",id:"strFcnNo",inputFormat:'integer',InputLength:"3","mandatory":"true"}),
			plf.addText({"label":"Duqm to Coastal",id:"strJPDistance",inputFormat:'integer',InputLength:"3","mandatory":"true"})
		]
		
		 ConsideringNotasRamadanDetailsColumn.add(ConsideringNotasRamadanCtrl);
		 
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
		mainpage.ptrMainSection.add(ConsideringNotasRamadanDetailsColumn)
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
				"methodName":"initSLANonRmdConfCosatal"
			    },
				{
					"controlid":"Save",
					"tasktype":"btnclick",
					"input":["strBLDistance","strBLWeight","strBLRemarks","strFuelReq","strFuelChitNo","strFcnNo","strJPDistance","strLSRVioInform","strLSRVioRemarks"],
					"service":"CoreJourneyPlanService",
					"methodName":"saveSLANonRmdConfCosatal"
				}
			]
		this.callParent(arguments);
		
	
	}
});