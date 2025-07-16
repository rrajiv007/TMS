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
Ext.define('CueTrans.view.OTOAPP.OTOCompletedJob',  
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		mainpage.liveScreenFlag =true
		mainpage.startPainting();
		
		mainpage.screenName = "Completed Job Summary";
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=[];
		
		mainpage.toolbarActions=[]
		
		var ContractorDetailSection = plf.addColumnSection({"title":"Contractor Details",hidden:true});
		var ContractorDetailSectionCtrl = 
		[
		plf.addDisplayOnly({"label":"Contract Number",id:"strContractNum"})
		]
		ContractorDetailSection.add(ContractorDetailSectionCtrl);
		mainpage.ptrMainSection.add(ContractorDetailSection)
		
		/*Completed Jobs Starts here*/
		var CompletedJobsObj=
		[
		{columnname:"Job No",dataname:"JOB_NO",datatype:"string",width:150,linkId:"COMPLETED_JOB","tooltip":"Click here to view the job."},
		{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:200},
		{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:200},
		{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:200},
		{columnname:"Departure Date/Time",dataname:"LOAD_DATE",datatype:"string",width:200}
		]
		var CompletedJobsGridDtl=									
		{
			title:"Completed Jobs",
			id:"CompletedJob",
			detail:CompletedJobsObj,
			removeAddDelete:true,
			readonly:true,
			removePaging:true
		}
		var CompletedJobsGridSection = plf.addGrid(CompletedJobsGridDtl,this)
		/*Completed Jobs Ends here*/
		
		
		mainpage.ptrMainSection.add(CompletedJobsGridSection)
		
		/* Event Handlers Mapping Starts here*/
		mainpage.eventHandlers = 
		[
		{
		"controlid":"",
		"tasktype":"onload",
		"input":["strContractNum"],
		"service":"OTOAppCoreServiceTS",
		"methodName":"OTOAPP_INITCOMPLETEDJOBSUMMARY"
	    }
		]
		/* Event Handlers Mapping Ends here*/
		mainpage.screenLinks=
		{
			
			"COMPLETED_JOB":
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
