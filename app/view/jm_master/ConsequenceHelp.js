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
Ext.define('CueTrans.view.jm_master.ConsequenceHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.screenName = "Consequence Help";
		mainpage.startPainting();
		
		
		// Header Section Begins
		plf.columns=3
		var helpOnconsHdrCollapse = plf.addColumnSection({title:"Search Criteria",collapsed:false});		
		
		var helpOnConsFormCtrl=		
		[
			plf.addText({"label":"Consequence Code",id:"strConseqCode"}),
			plf.addText({"label":"Description",id:"strConseqDesc"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Remarks",id:"strRemarks"}),
			//plf.addBlank(),
			plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})			
		]
		helpOnconsHdrCollapse.add(helpOnConsFormCtrl);
		// Header Section Ends
		
		//Grid Section Begins
		var helpOnconsGridFieldObj=		
		[
		    {columnname:"Consequence Code",dataname:"CON_SEQ_CODE",datatype:"string",width:200},
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
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strConseqCode","strConseqDesc","strStatus","strRemarks","dtPeriodFrom","dtPeriodTo","vioDtl"],
					"service":"CoreConsequencemanagement",
					"methodName":"fetchConsHelp"
				}
		/*
			{
				"tasktype":"proto",
				"filename":"jm_master/ConseqSearch.json"
			}				
			*/
		];
		this.callParent(arguments);
		
	}
});
