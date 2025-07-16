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
Ext.define('CueTrans.view.OTOAPP.OTOJob', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		mainpage.liveScreenFlag =true
		mainpage.startPainting();
		
		mainpage.screenName = "Job Details";
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=[];
		
		mainpage.toolbarActions=[]
		
		/*Contractor Details Starts here*/
		plf.columns=3
		var ContractorDetailSection = plf.addColumnSection({"title":"Contractor Details"});
		var ContractorDetailSectionCtrl = 
		[
		plf.addDisplayOnly({"label":"Contractor Name",id:"strContractorName"}),
		plf.addDisplayOnly({"label":"Contract Number",id:"strContractNum"}),
		plf.addDisplayOnly({"label":"Contact Number",id:"strContactNo"})
		]
		ContractorDetailSection.add(ContractorDetailSectionCtrl);
		/*Contractor Details Ends here*/
		
		/*Vehicle Details Starts here*/
		plf.columns=4
		var VehicleDetailSection = plf.addColumnSection({"title":"Vehicle Details"});
		var VehicleDetailSectionCtrl = 
		[
		plf.addDisplayOnly({"label":"Vehicle Registration #",id:"strVehRegNo"}),
		plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehCat"}),
		plf.addDisplayOnly({"label":"Vehicle Make",id:"strVehMake"}),
		plf.addDisplayOnly({"label":"Year of MFG",id:"strYearMfg"}),
		plf.addHidden({"label":"Queue #",id:"strQueueNo"})
		]
		VehicleDetailSection.add(VehicleDetailSectionCtrl);
		/*Vehicle Details Ends here*/
		
		
		/*New Jobs Starts here*/
		var NewJobsObj=
		[
		{columnname:"Job No",dataname:"JOB_NO",datatype:"string",width:150,linkId:"NEW_JOB","tooltip":"Click here to accept the job."},
		{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:200},
		{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:200},
		{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:200},
		{columnname:"Departure Date/Time",dataname:"LOAD_DATE",datatype:"string",width:200},
		{columnname:"Expiry Date",dataname:"EXP_DATE",datatype:"string",width:200}
		]
		var NewJobsGridDtl=									
		{
			title:"New Jobs",
			id:"NewJob",
			detail:NewJobsObj,
			removeAddDelete:true,
			readonly:true,
			removePaging:true
		}
		var NewJobsGridSection = plf.addGrid(NewJobsGridDtl,this)
		/*New Jobs Ends here*/
		
		/*On-going Jobs Starts here*/
		var OngoingJobsObj=
		[
		{columnname:"Job No",dataname:"JOB_NO",datatype:"string",width:150,linkId:"ONGOING_JOB","tooltip":"Click here to view the job."},
		{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:200},
		{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:200},
		{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:200},
		{columnname:"Departure Date/Time",dataname:"LOAD_DATE",datatype:"string",width:200},
		{columnname:"Load Date",dataname:"LOAD_DT",datatype:"string",width:200,hidden:true}
		]
		var OngoingJobsGridDtl=									
		{
			title:"On-going Jobs",
			id:"OngoingJob",
			detail:OngoingJobsObj,
			removeAddDelete:true,
			readonly:true,
			removePaging:true
		}
		var OngoingJobsGridSection = plf.addGrid(OngoingJobsGridDtl,this)
		/*On-going Jobs Ends here*/
		
		mainpage.ptrMainSection.add(ContractorDetailSection)
		mainpage.ptrMainSection.add(VehicleDetailSection)
		mainpage.ptrMainSection.add(NewJobsGridSection)
		mainpage.ptrMainSection.add(OngoingJobsGridSection)
		
		/* Event Handlers Mapping Starts here*/
		mainpage.eventHandlers = 
		[
		{
		"controlid":"",
		"tasktype":"onload",
		"input":["strContractNum"],
		"service":"OTOAppCoreServiceTS",
		"methodName":"OTOAPP_INITJOBSUMMARY"
	    }
		]
		/* Event Handlers Mapping Ends here*/
		mainpage.screenLinks=
		{
			"NEW_JOB":
			{
				"dest":"OTOAPP.OTOAcceptJob",
				"hdr":[
						{"src":"strContractorName","dest":"strContractorName"},
						{"src":"strContractNum","dest":"strContractNum"},
						{"src":"strContactNo","dest":"strContactNo"},
						{"src":"strVehRegNo","dest":"strVehRegNo"},
						{"src":"strVehCat","dest":"strVehCat"},
						{"src":"strVehMake","dest":"strVehMake"},
						{"src":"strYearMfg","dest":"strYearMfg"}						
						],
				"grid":[
						{"src":"JOB_NO","dest":"strJobNo"},
						{"src":"LOAD_NO","dest":"strLoadNo"}
						]
			},
			"ONGOING_JOB":
			{
				"dest":"OTOAPP.OTOViewJob",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"JOB_NO","dest":"strJobNo"},
						{"src":"LOAD_NO","dest":"strLoadNo"}
						]
			}
		}
		this.callParent(arguments);
		
	}
});
