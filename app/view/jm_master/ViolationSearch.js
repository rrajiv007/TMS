/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	                           Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.ViolationSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Violation Summary";
		
		//Driver Search Section Begins 
		plf.columns=4
		var violationHdrCollapsible = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);			//69995
		  mainpage.toolbarSectionFlag=true;	
        mainpage.toolbarLinks=
		[
			{"name":"Create Violation","linkid":"jm_Violation","tooltip":"Click here to create a violation."},
			{"name":"See Violation Summary","linkid":"jm_ViolationSummary","tooltip":"Click here to see the violation summary."}
		]
		var violationSearchCtrl=			//69995
		[
			plf.addText({"label":"Violation Code",id:"strViolationCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Violation Code To",id:"strViolationCodeTo","anywhereSearch":"true"}),
			plf.addText({"label":"Violation Name",id:"strViolationDesc"}),
			plf.addCombo({"label":"Violation Type",id:"strViolationType"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
		//plf.addButton({"label":"Search","id":"btnSearch","tooltip":"Click here to search."})
		]
		
		violationHdrCollapsible.add(violationSearchCtrl);
		//Driver Search Section Ends
		
		//Driver Grid Section Begins
		var ViolationGridFieldObj=			//69995
		[
			{columnname:"Violation Code",dataname:"VIOLATION_CODE",datatype:"string",width:200,linkId:"ViolationMaster","tooltip":"Click here to launch the violation screen."}, 
			{columnname:"Violation Name",dataname:"VIOLATION_DESC",datatype:"string",width:200},
			{columnname:"Violation Type",dataname:"VIOLATION_TYPE",datatype:"string",width:200},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"string",width:200},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"string",width:200},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
			
		]
		var violationGridDtl=				//69995
		{
			title:"Violation Details",
			id:"violationGridDtl",
			detail:ViolationGridFieldObj,
			visibleRow:plf.searchVisibleRows,
			readonly:true
		}
		var violationGridSection = plf.addGrid(violationGridDtl,this)		//69995
		//Driver Grid Section Ends
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(violationHdrCollapsible)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(violationGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	       {
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreViolationService",
					"methodName":"initViolationTS"
				},
					
				{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strViolationType","strViolationCodeFrom","strViolationDesc","strStatus"],
					"service":"CoreViolationService",
					"methodName":"fetchAllViolationTS"
				}
			
		];
		
		
		mainpage.screenLinks=
		{
			"ViolationMaster":
				{
					"dest":"jm_master.ViolationMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"VIOLATION_CODE","dest":"strViolationCode"}
							]
				},
				"jm_Violation":
				{
					"dest":"jm_master.ViolationMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"jm_ViolationSummary":
				{
					"dest":"jm_master.ViolationsSummary",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
		//Event Handlers Mapping Ends
			
		//Generate Screen Section
		//mainpage.generateScreen();
		
		
		/*Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
		
	}
});
