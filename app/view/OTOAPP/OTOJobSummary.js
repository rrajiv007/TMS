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
Ext.define('CueTrans.view.OTOAPP.OTOJobSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		mainpage.liveScreenFlag =true
		mainpage.startPainting();
		
		mainpage.screenName = "OTO Job Summary";
		
		
		/*Contractor Search Starts here*/
				
		plf.columns = 3
		var ContractorSearchSection = plf.addCollapseSection({title:"Search Criteria", collapsed:true,btnID:"searchBtn"},this);
		mainpage.toolbarSectionFlag=true;	
        mainpage.toolbarLinks=
		[
		
		]
		var ContractorSearchSectionCtrl = 
		[
		plf.addText({"label":"Contract Number",id:"strContractNum"}),
		plf.addText({"label":"Contractor Name",id:"strContractorName"}),
		plf.addText({"label":"Contact Number",id:"strContactNo"})
		]
		ContractorSearchSection.add(ContractorSearchSectionCtrl);
		/*Contractor Search Ends here*/
		
	
		
		
		/* Contractor Details Starts here*/
		var ContractorDetailsObj=
		[
		{columnname:"Contract Number",dataname:"CONTRACT_NUMBER",datatype:"string",width:120,linkId:"CONT_NUM","tooltip":"Click here to accept the job."},
		{columnname:"Contractor Name",dataname:"CONTRACTOR_NAME",datatype:"string",width:250},
		{columnname:"Contact Number",dataname:"CONTACT_NUMBER",datatype:"string",width:200},
		{columnname:"Vehicle Code",dataname:"VEHICLE_CODE",datatype:"string",width:180},
		{columnname:"New Jobs",dataname:"NEW_JOBS",datatype:"string",width:120},
		{columnname:"On-going Jobs",dataname:"ONGOING_JOBS",datatype:"string",width:120},
		{columnname:"Completed Jobs",dataname:"COMPLETED_JOBS",datatype:"string",width:120},
		{columnname:"Cancelled Jobs",dataname:"CANCELLED_JOBS",datatype:"string",width:120}
		
		]
		var ContractorDetailsGridDtl=									
		{
			title:"Contractor Details",
			id:"ContractorDetails",
			detail:ContractorDetailsObj,
			removeAddDelete:true,
			readonly:true,
			//removePaging:true
			visibleRow:plf.searchVisibleRows
			
		}
		var ContractorDetailsGridSection = plf.addGrid(ContractorDetailsGridDtl,this)
		/*Contractor Details Ends here*/
		
		mainpage.ptrMainSection.add(ContractorSearchSection)
		mainpage.ptrMainSection.add(ContractorDetailsGridSection)
		
		
		/* Event Handlers Mapping Starts here*/
		mainpage.eventHandlers = 
		[
		{
		"controlid":"",
		"tasktype":"onload",
		"input":[""],
		"service":"OTOAppCoreServiceTS",
		"methodName":"INIT_OTO_JOB_SUM"
	    },
		{
		"controlid":"searchBtn",
		"tasktype":"btnclick",
		"input":["strContractorName","strContractNum","strContactNo"],
		"service":"OTOAppCoreServiceTS",
		"methodName":"SEARCH_OTO_JOB_SUM"
		}
		
		];
		/* Event Handlers Mapping Ends here*/
		mainpage.screenLinks=
		{
			"CONT_NUM":
			{
				"dest":"OTOAPP.OTOJobReport",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"CONTRACT_NUMBER","dest":"strContractNum"},
						{"src":"CONTRACTOR_NAME","dest":"strContractorName"},
						{"src":"CONTACT_NUMBER","dest":"strContactNo"}
					   ]
			}
		}
		this.callParent(arguments);
		
	}
});
