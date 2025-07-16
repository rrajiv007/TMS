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
Ext.define('CueTrans.view.OTOAPP.OTOAcceptJob', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function() 
	{
		
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Accept Job";
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=[];
		
		mainpage.toolbarActions=
		[
				{
					"name": "Accept",
					"tooltip": "Click here to accept job."
				},
				/*
				{
					"name": "Skip",
					"tooltip": "I am not willing to take this job."
				},
				*/
				{
					"name": "Next Day",
					"tooltip": "I am not available today."
				},
				{
					"name": "Deny",
					"tooltip": "I am not available for a while."
				}
				
			]
		
		var ContractorDetailSection = plf.addColumnSection({"title":"Contractor Details"});
		var ContractorDetailSectionCtrl = 
		[
		plf.addDisplayOnly({"label":"Contractor Name",id:"strContractorName"}),
		plf.addDisplayOnly({"label":"Contract Number",id:"strContractNum"}),
		plf.addDisplayOnly({"label":"Contact Number",id:"strContactNo"}),
		plf.addDisplayOnly({"label":"Vehicle Registration #",id:"strVehRegNo"}),
		plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehCat"}),
		plf.addDisplayOnly({"label":"Vehicle Make",id:"strVehMake"}),
		plf.addDisplayOnly({"label":"Year of MFG",id:"strYearMfg"}),
		]
		ContractorDetailSection.add(ContractorDetailSectionCtrl);
		
		
		/*Job Details Starts here*/
		plf.columns=4
		var JobDetailSection = plf.addColumnSection({"title":"Job Details"});
		var JobDetailSectionCtrl = 
		[
		plf.addDisplayOnly({"label":"Job No",id:"strJobNo"}),
		plf.addDisplayOnly({"label":"Load No",id:"strLoadNo"}),
		plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
		plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
		plf.addDisplayOnly({"label":"Departure Date",id:"dtDepartureDt"}),
		plf.addDisplayOnly({"label":"Loading Point",id:"strLoadingPoint"}),
		plf.addDisplayOnly({"label":"Unloading Point",id:"strUnloadingPoint"}),
		plf.addDisplayOnly({"label":"Special Trailer",id:"strSpecialTrailer"}),
		plf.addCombo({"label":"Reason",id:"strReason"}),
		plf.addText({"label":"Remarks",id:"strRemarks"})
		]
		JobDetailSection.add(JobDetailSectionCtrl);
		/*Job Details Ends here*/
		
		/*Inspection Details Starts here*/
		plf.columns=4
		var InspectionDetailSection = plf.addColumnSection({"title":"Inspection Details"});
		var InspectionDetailSectionCtrl = 
		[
		plf.addDisplayOnly({"label":"Inspection Location",id:"strInsLoc"}),
		plf.addDisplayOnly({"label":"Inspection Date/Time",id:"dtInspDtTm"}),
		plf.addDisplayOnly({"label":"Inspection Bay #",id:"strInspBayNo"}),
		//plf.addDisplayOnly({"label":"Special Trailer",id:"strSpecialTrailer"}),
		plf.addDisplayOnly({"label":"Token No",id:"strTokenNo"})
		]
		InspectionDetailSection.add(InspectionDetailSectionCtrl);
		/*Inspection Details Ends here*/
		mainpage.ptrMainSection.add(ContractorDetailSection)		
		mainpage.ptrMainSection.add(JobDetailSection)
		mainpage.ptrMainSection.add(InspectionDetailSection)
		
		/* Event Handlers Mapping Starts here*/
		mainpage.eventHandlers = 
		[
		{
		"controlid":"",
		"tasktype":"onload",
		"input":["strJobNo","strLoadNo"],
		"service":"OTOAppCoreServiceTS",
		"methodName":"OTOAPP_INITACCEPTJOB"
	    },
		{
		"controlid":"",
		"tasktype":"toolbarclick",
		"action":"Accept",
		"input":["strJobNo","strLoadNo","strReason","strRemarks"],
		"service":"OTOAppCoreServiceTS",
		"methodName":"OTOAPP_ACCEPTJOB"	
		},
		{
		"controlid":"",
		"tasktype":"toolbarclick",
		"action":"Skip",
		"input":["strJobNo","strLoadNo","strReason","strRemarks"],
		"service":"OTOAppCoreServiceTS",
		"methodName":"OTOAPP_SKIPJOB"	
		},
		{
		"controlid":"",
		"tasktype":"toolbarclick",
		"action":"Next Day",
		"input":["strJobNo","strLoadNo","strReason","strRemarks"],
		"service":"OTOAppCoreServiceTS",
		"methodName":"OTOAPP_NEXTDAYJOB"	
		},
		{
		"controlid":"",
		"tasktype":"toolbarclick",
		"action":"Deny",
		"input":["strJobNo","strLoadNo","strReason","strRemarks"],
		"service":"OTOAppCoreServiceTS",
		"methodName":"OTOAPP_DENYJOB"	
		}
		]
		/* Event Handlers Mapping Ends here*/
		
		this.callParent(arguments);
		
	}
});
