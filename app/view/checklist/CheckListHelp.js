/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var  		                                   
************************************************************************************************/
Ext.define('CueTrans.view.checklist.CheckListHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.screenName = "Checklist Help";
		mainpage.startPainting();
		
		
		//CheckList List Header Section Begins
		plf.columns=3
		var helpOnCheckListHdrCollapse = plf.addColumnSection({title:"", collapsed: true}); //69997 
		
		var helpOnCheckListFormCtrl=	//69997 
		[
			plf.addText({"label":"Checklist Code From",id:"strChkListCodeFrom","anywhereSearch":"true"}),
			plf.addText({"label":"Checklist Code To",id:"strChkListCodeTo","anywhereSearch":"true"}),
			plf.addText({"label":"Checklist Name",id:"strChkListName"}),
			plf.addCombo({"label":"Status","id":"strStatus"}),
			plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."})
		]
		 helpOnCheckListHdrCollapse.add(helpOnCheckListFormCtrl);		
		//CheckList List Header Section Ends
		
		//CheckList Grid Section Begins
		var helpOnCheckListGridFieldObj=		//69997 
		[
			{columnname:"Checklist Code",dataname:"CHK_LIST_CODE",datatype:"string",width:100},
			{columnname:"Checklist Name",dataname:"CHK_LIST_NAME",datatype:"string",width:200},
			{columnname:"Detail Seq No",dataname:"CHKLST_DTL_SEQ_NO",datatype:"string",width:100,hidden:true},
			//{columnname:"CheckList Description",dataname:"CHKLST_DTL_DESC",datatype:"string",width:400},
			//{columnname:"Options",dataname:"OPTION_DESCCSV",datatype:"string",width:100},
			//{columnname:"Weightage",dataname:"WEIGHTAGECSV",datatype:"string",width:100},
			{columnname:"status",dataname:"STATUS",datatype:"string",width:100}
		]
	var helpOnCheckListGridDtl=						//69997 
		{
			title:"CheckList Details",
			id:"checkListSearch",
			removeAddDelete:true,
			visibleRow:plf.helpVisibleRows,
			detail:helpOnCheckListGridFieldObj

		}
		var helpGridSection = plf.addGrid(helpOnCheckListGridDtl,this)	//69997 
		mainpage.hlpSearchGridPtr = helpGridSection		
		//CheckList Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnCheckListHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
			[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreChecklistService",
				"methodName":"initCheckListTS"
			}
			,
			{
					"controlid":"searchBtn",
					"tasktype":"btnclick",
					"input":["strChkListCodeFrom","strChkListCodeTo","strChkListName","strStatus"],
					"service":"CoreChecklistService",
					"methodName":"fetchAllChecklistsTS"
			}
				
			];
		//Event Handlers Mapping Ends
		
		this.callParent(arguments);
		
	}
});
