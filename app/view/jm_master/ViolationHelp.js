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
Ext.define('CueTrans.view.jm_master.ViolationHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true; 
		mainpage.startPainting();
		mainpage.screenName = "Violation Help";
		
		//Driver Search Section Begins 
		plf.columns=3
		var helpOnViolationHdrCollapse = plf.addColumnSection({title:"", collapsed: true}); 			//69995
		
		var violationSearchCtrl=								//69995
		[
			plf.addText({"label":"Violation Code",id:"strViolationCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Violation Code To",id:"strViolationCodeTo","anywhereSearch":"true"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Violation Name",id:"strViolationDesc"}),
			plf.addCombo({"label":"Violation Type",id:"strViolationType"}),
			plf.addBlank(),
			plf.addBlank(),
			
		plf.addButton({"label":"Search","id":"btnSearch","tooltip":"Click here to search."})
		]
		
		helpOnViolationHdrCollapse.add(violationSearchCtrl);
		//Driver Search Section Ends
		
		//Driver Grid Section Begins
		var ViolationGridFieldObj=				//69995
		[
			{columnname:"Violation Code",dataname:"VIOLATION_CODE",datatype:"string",width:150}, 
			{columnname:"Violation Name",dataname:"VIOLATION_DESC",datatype:"string",width:200},
			{columnname:"Violation Type",dataname:"VIOLATION_TYPE",datatype:"string",width:200},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"string",width:150},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
			
		]
		var violationGridDtl=				//69995
		{
			title:"Violation Details",
			id:"violationGridDtl",
			detail:ViolationGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
		}
		
		var helpGridSection = plf.addGrid(violationGridDtl,this)			//69995
		mainpage.hlpSearchGridPtr = helpGridSection 
		//violationGridSection = plf.addGrid(violationGridDtl,this)
		//Driver Grid Section Ends
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(helpOnViolationHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
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
				},
				{
					"tasktype":"proto",
					"filename":"jm_master/ViolationHelp.json"
				}
			
		];
		
		
	/*	mainpage.screenLinks=
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
