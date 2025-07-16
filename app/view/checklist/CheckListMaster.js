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
Ext.define('CueTrans.view.checklist.CheckListMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function() 
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Checklist Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            }/*,
			{
                "name": "Create",
                "tooltip": "Click here to create a checklist."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a checklist."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a checklist."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate a checklist."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate a checklist."
            }*/
            ]
		mainpage.toolbarSectionFlag=true;
		/*
		mainpage.toolbarLinks=
		[
			{"name":"Risk Assesment","linkid":"jms_riskassesment","tooltip": "Click here to launch the risk assessment parameter screen."}
		]
		*/
		//Add Keyfields
		mainpage.keyFields=["strChkListCode"]
		
		//Check List Master Section Begins
		plf.columns=4
		var checkListMasterColumn = plf.addColumnSection({});			//69997 
		
		var checkListMasterFormCtrl=									//69997 
		[  // plf.addBlank(),
			//plf.addBlank(),
			//plf.addBlank(),
			
			/*Help Screen*/
			//plf.addText({"label":"CheckList Code",id:"strChkListCode"}),
			plf.addHlpText({"label":"Checklist Code",id:"strChkListCode","mandatory":"true",hlpLinkID:"checklistcode",inputFormat:"string",InputLength:"60"},this),
			/*Help Screen*/
			plf.addText({"label":"Checklist Name",id:"strChkListName","mandatory":"true",inputFormat:"string",InputLength:"400"}),
			plf.addCombo({"label":"Critical",id:"strCriticalYN","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Inspection Type",id:"strInspectionType"}),
                     plf.addHidden({id:"strCreatedFrom"}),
			//plf.addCombo({"label":"Inspection Type",id:"strMappingFor"})
			//plf.addBlank(),
			
			//plf.addButton({"label":"submit",id:"buttonclick"})
		]
		
		checkListMasterColumn.add(checkListMasterFormCtrl);
		//Check List Master Header Section Ends
		
		//Check List Master Grid Section Begins
	var checkListGridFieldObj=							//69997 
		[
			{columnname:"Detail Seq No",dataname:"CHKLST_DTL_SEQ_NO",datatype:"string",editControl:"textbox",width:140,hidden:true},
			//{columnname:"Group Name",dataname:"GROUPVAL",datatype:"string",editControl:"combo",width:100,storeId:"strGroupName"},
			{columnname:"Checklist Description",dataname:"CHKLST_DTL_DESC",datatype:"string",editControl:"textbox",width:250,inputFormat:"string",InputLength:"4000"},
			{columnname:"Options",dataname:"OPTION_DESCCSV",datatype:"string",editControl:"textbox",width:200,inputFormat:"string",InputLength:"100"},
			{columnname:"Positive Options",dataname:"POSITIVE_OPTION",datatype:"string",editControl:"textbox",width:200,inputFormat:"string",InputLength:"40"},
			//{columnname:"Weightage",dataname:"WEIGHTAGECSV",datatype:"string",editControl:"textbox",width:120,inputFormat:"string",InputLength:"20"},
			{columnname:"Truck<BR>Category",dataname:"TRUCK_CATEGORY",datatype:"string",storeId:"strTruckCategory",editControl:"combo",width:130},
			{columnname:"Route<BR>Category",dataname:"ROUTE_CATEGORY",datatype:"string",storeId:"strRouteCategory",editControl:"combo",width:130}
			
		]
		var checkListGridDtl=							//69997 
		{
			title:"CheckList Details",
			id:"checkListMap",
			detail:checkListGridFieldObj,
			visibleRow:plf.searchVisibleRows
		}
		var chkListMasterGridSection = plf.addGrid(checkListGridDtl,this)					//69997 

		plf.columns=4
		var checkListMasterMinMaxColumn = plf.addColumnSection({});							//69997 
		var checkListMasterMinMaxFormCtrl=													//69997 
		[  
			plf.addText({"label":"Minimum",id:"strMinimum"}),
			plf.addText({"label":"Maximum",id:"strMaximum"}),
                     plf.addBlank(),
			plf.addBlank()	
			
		]
		
		checkListMasterMinMaxColumn.add(checkListMasterMinMaxFormCtrl);


	
		mainpage.ptrMainSection.add(checkListMasterColumn)//Add Master Header Section 
		mainpage.ptrMainSection.add(chkListMasterGridSection)
		mainpage.ptrMainSection.add(checkListMasterMinMaxColumn) //Add Master Grid Section 
		

		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strChkListCode"],
				"service":"CoreChecklistService",
				"methodName":"initCheckListMSTS"
			},
			{
					"controlid":"strChkListCode",
					"tasktype":"onenter",
					"input":["strChkListCode","checkListMap"],
					"service":"CoreChecklistService",
					"methodName":"fetchChecklistTS"
				},
				 {
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Create",
					"input":["strChkListCode","strChkListName","checkListMap","strChkLstDtlDesc","strOptionDescCsv","iWeightageCsv","strCriticalYN","strInspectionType",
                                            "iChkLstDtlSeqNo","strCreatedFrom"],
					"service":"CoreChecklistService",
					"methodName":"createChecklistTS"
			},
			 {
					"controlid":"strChkListCode",
					"tasktype":"toolbarclick",
					"action":"Edit",
					"input":["strChkListCode","strChkListName","strChkLstDtlDesc","strOptionDescCsv","iWeightageCsv","checkListMap","strCriticalYN","strInspectionType",
                                           "iChkLstDtlSeqNo","strCreatedFrom"],
					"service":"CoreChecklistService",
					"methodName":"modifyChecklistTS"
			},
			{
					"controlid":"strChkListCode",
					"tasktype":"toolbarclick",
					"action":"Delete",
					"input":["strChkListCode","strChkListName","strStatus","strChkLstDtlDesc","strOptionDescCsv","iWeightageCsv","strCreatedFrom"],
					"service":"CoreChecklistService",
					"methodName":"deleteChecklistTS"
			},
			{
					"controlid":"strChkListCode",
					"tasktype":"toolbarclick",
					"action":"Activate",
					"input":["strChkListCode","strChkListName","strChkLstDtlDesc","strOptionDescCsv","iWeightageCsv","checkListMap","strCriticalYN","strInspectionType",
                                           "iChkLstDtlSeqNo","strCreatedFrom"],
					"service":"CoreChecklistService",
					"methodName":"activateChecklistTS"
			},
			{
					"controlid":"strChkListCode",
					"tasktype":"toolbarclick",
					"action":"Inactivate",
					"input":["strChkListCode"],
					"service":"CoreChecklistService",
					"methodName":"inactivateChecklistTS"
			},
			
				{
			"tasktype":"proto",
			"filename":"checklist/CheckListMaster.json"
		}	
		     
		];
		/*Help Screen handler starts here*/
		mainpage.hlpLinks=
		{
			"checklistcode":
				{
					"hlpType":"Header",
					"hlpScreen":"checklist.CheckListHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strChkListCode","child":"CHK_LIST_CODE"},
							{"parent":"strChkListName","child":"CHK_LIST_NAME"},							
							{"parent":"strStatus","child":"STATUS"}
							]
				}
			
		}
		
		mainpage.screenLinks=
		{
				"jms_riskassesment":
				{
					"dest":"journey_management.JourneyAssessmentParameter",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
		/*Help Screen handler ends here*/
		mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":[]
			},
			"locked":
			{
				"enableAll":false,
				"except":["strChkListCode","checkListMap"]
			},
			"active":
			{
				"enableAll":false,
				"except":["strChkListCode","checkListMap"]
			}			
		}
	
		this.callParent(arguments);
		
	}
});
