/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			           Remarks             
************************************************************************************************	
1.0.0	     Raj		    20/07/2020                         Origin Group Configuration  		                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.SLAConfigurationForCoastalPerRpt', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "SLA Configuration For Coastal Performance Report";
		
		
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [
			
			{
                "name": "Save",
                "tooltip": "Click here to save."
            }
            ]
		plf.columns=4
		//Considering Not as Ramadan  Section start
		var ConsideringNotasRamadanDetailsColumn = plf.addColumnSection({title:"Considering Not as Ramadan (On-time in Hrs)"});
		
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
		//Considering Not as Ramadan  Section end
        
		//Considering as Ramadan  Section start
		var ConsideringasRamadanDetailsColumn = plf.addColumnSection({title:"Considering as Ramadan (On-time in Hrs)"});
		
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
		//Considering  as Ramadan  Section end
		
		var AmendDetailsColumn = plf.addColumnSection({title:"SLA Amend Details"});
        var AmendCtrl=										
		[	
			plf.addDisplayOnly({"label":"Amend No",id:"strLSRVioInform"}),
			plf.addTextArea({"label":"Remarks",id:"strLSRVioRemarks",InputLength:"4000",width:400,"mandatory":"true"}),
			plf.addDisplayOnly({"label":"Updated By",id:"strUpdatedBy"}),
			plf.addDisplayOnly({"label":"Updated Date",id:"strUpdatedDt"}),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank()
		]
		AmendDetailsColumn.add(AmendCtrl);
		//Considering  as Ramadan  Section end
		
		mainpage.ptrMainSection.add(ConsideringNotasRamadanDetailsColumn)
		ConsideringasRamadanDetailsColumn.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(ConsideringasRamadanDetailsColumn);
		AmendDetailsColumn.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(AmendDetailsColumn);
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		mainpage.eventHandlers = 
		[	
            { 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreJourneyPlanService",
				"methodName":"initSLAConfiforCosatalrpt"
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strBLDistance","strBLWeight","strBLRemarks","strFuelReq","strFuelChitNo","strFcnNo","strJPDistance","strReleaseRemarks",
				"strReleaseTo","strBackLdRefused","strApprovalReason","strApproverName","strNightDriveApproval","strVioDriver",
				"strLSRVioInform","strLSRVioRemarks"],
				"service":"CoreJourneyPlanService",
				"methodName":"saveSLAConfiforCosatalrpt"
			}/*,
            {
				"controlid":"strJourneyPlanNo",
				"tasktype":"onchange",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"onchangeOrgGrpConfiNameTs"
			}	*/		
		];
		
		mainpage.screenLinks=	
		{
		} 
		
		mainpage.hlpLinks= 
		{

		} 
        
		
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
