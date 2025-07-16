/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	Divya																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			Remarks             
************************************************************************************************	
	                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.ConsequenceSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{		
		var mainpage = this;		
		mainpage.startPainting();
		mainpage.screenName = "Consequence Management Summary";
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=
		[
			{"name":"Consequence Management","linkid":"jm_ConSum","tooltip":"Click here to process consequence management."}
		]
		
		
		
		// Header Section Begins
		plf.columns=4
		var helpOnconsHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);		
		
		var helpOnConsFormCtrl=		
		[
			plf.addText({"label":"Consequence Code",id:"strConseqCode"}),
			plf.addText({"label":"Description",id:"strConseqDesc"}),
			plf.addText({"label":"Remarks",id:"strRemarks"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addBlank(),
			plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})			
		]
		helpOnconsHdrCollapse.add(helpOnConsFormCtrl);
		// Header Section Ends
		
		//Grid Section Begins
		var helpOnconsGridFieldObj=		
		[
		    {columnname:"Consequence Code",dataname:"CON_SEQ_CODE",datatype:"string",width:200,linkId:"CONSMaster","tooltip":"Click here to launch the process consequence management."},
			{columnname:"Consequence Description",dataname:"CON_SEQ_DESC",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}, 
			{columnname:"Remark",dataname:"REMARKS",datatype:"string",width:100},			
			{columnname:"Last Processed Date",dataname:"CONSEQ_DATE_FROM",datatype:"string",width:100},
			{columnname:"Period To",dataname:"CONSEQ_DATE_TO",datatype:"string",width:150}
		
		
		]
		var helpOnconsGridDtl=		
		{
			title:"",
			id:"vioDtlHlp",
			detail:helpOnconsGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true,
			widthBasis:"flex",
		}
		var helpGridSection = plf.addGrid(helpOnconsGridDtl,this)
		mainpage.hlpSearchGridPtr = helpGridSection		
		//Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnconsHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreConsequencemanagement",
				"methodName":"initConsHelp"
			},
			{
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strConseqCode","strConseqDesc","strStatus","strRemarks"],
				"service":"CoreConsequencemanagement",
				"methodName":"fetchConsHelp"
			}
		];
		mainpage.screenLinks=
		{
			"CONSMaster":
				{
					"dest":"jm_master.ConseqMgmntGenLetter",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"CON_SEQ_CODE","dest":"strConseqCode"}
							]
				},
				"jm_ConSum":
				{
					"dest":"jm_master.ConseqMgmntGenLetter",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
		this.callParent(arguments);
		
	}
});
