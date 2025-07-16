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
Ext.define('CueTrans.view.checklist.CheckListSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Checklist Summary";
		// Add Toolbar
		//mainpage.toolbarSectionFlag=false;		
		
		//Check List Section Begins
		plf.columns=4
		var checkListSearchColumn = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);		//69997 
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Create Checklist","linkid":"cl_ChecklistMst","tooltip":"Click here to create a checklist."},
			{"name":"RAM Checklist","linkid":"ram_ChecklistMst","tooltip":"Click here for RAM checklist."}
		]
		
		var checkListSearchFormCtrl=										//69997 
		[
			plf.addText({"label":"Checklist Code",id:"strChkListCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Checklist Code To",id:"strChkListCodeTo","anywhereSearch":"true"}),
			plf.addText({"label":"Checklist Name",id:"strChkListName"}),
			plf.addCombo({"label":"Status","id":"strStatus"}),
			plf.addCombo({"label":"Inspection Type","id":"strInspectionType"}),
			//plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."})
			
		
		]
		
		checkListSearchColumn.add(checkListSearchFormCtrl);						
		//Check List Header Section Ends
		
		//Check List Grid Section Begins
		var checkListGridFieldObj=												//69997 
		[
			{columnname:"Checklist Code",dataname:"CHK_LIST_CODE",datatype:"string",width:200,linkId:"checklist","tooltip":"Click here to launch the checklist screen."},
			{columnname:"Checklist Name",dataname:"CHK_LIST_NAME",datatype:"string",width:250},
			{columnname:"Detail Seq No",dataname:"CHKLST_DTL_SEQ_NO",datatype:"string",width:100,hidden:true},
		       //{columnname:"CheckList Description",dataname:"CHKLST_DTL_DESC",datatype:"string",width:550},
			//{columnname:"Options",dataname:"OPTION_DESCCSV",datatype:"string",width:130},
			//{columnname:"Weightage",dataname:"WEIGHTAGECSV",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:140},
                    {columnname:"Criticality",dataname:"CRITICALYN",datatype:"string",width:140},
                     {columnname:"Inspection Type",dataname:"INSPECTION_TYPE",datatype:"string",width:150},
                     {columnname:"Created From",dataname:"CREATED_FROM",datatype:"string",width:150},
                     {columnname:"Count",dataname:"COUNT",datatype:"string",width:120,colAlign:'right'}

			
			
		]
		var checkListGridDtl=										//69997 
		{
			title:"Checklist Details",
			visibleRow:plf.searchVisibleRows,
			id:"checkListSearch",
			removeAddDelete:true,
			detail:checkListGridFieldObj,
			readonly:true
		}
		var checkListGridSection = plf.addGrid(checkListGridDtl,this)		//69997 
		//Check List Grid Section Ends
		
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(checkListSearchColumn)//Add Header Section to Check List Page
		mainpage.ptrMainSection.add(checkListGridSection) //Add Grid Section to Check List Page
		
		//History Data Section 
		//mainpage.data_his_sec_flag=false;
		
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
					"input":["strChkListCodeFrom","strChkListName","strStatus","strInspectionType"],
					"service":"CoreChecklistService",
					"methodName":"fetchAllChecklistsTS"
			}
				/*{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreRouteService",
					"methodName":"initRouteMasterScrTS"
				},		
				{
					"controlid":"strRouteId",
					"tasktype":"onenter",
					"input":["strRouteId"],
					"service":"CoreRouteService",
					"methodName":"fetchRouteTS"
				},	*/					
				/*{
					"tasktype":"proto",
					"filename":"checklist/CheckListSearch.json"
				}*/
			];
			
			mainpage.screenLinks=
		{
			"checklist":
				{
					"dest":"checklist.CheckListMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"CHK_LIST_CODE","dest":"strChkListCode"}
							]
				},
				
			"cl_ChecklistMst":
				{
					"dest":"checklist.CheckListMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
			"ram_ChecklistMst":
				{
					"dest":"checklist.RAMCheckListMaster",
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
