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
Ext.define('CueTrans.view.checklist.RAMCheckListMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Journey Risk Assessment";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [
			{
                "name": "Save",
                "tooltip": "Click here to save RAM checklist."
            }
			/*,
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
            }
			*/
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
		var checkListMasterColumn = plf.addColumnSection({});	//69997
		
		var checkListMasterFormCtrl=			//69997
		[   plf.addHidden({"label":"Checklist Code",id:"strChkListCode",value:"RAM"},this),
			plf.addDisplayOnly({"label":"Checklist Name",id:"strChkListName",value:"Risk Assessment Matrix"}),
			plf.addDisplayOnly({"label":"Minimum",id:"strMinimum"}),
			plf.addDisplayOnly({"label":"Maximum",id:"strMaximum"}),
			//plf.addCombo({"label":"Critical",id:"strCriticalYN","mandatory":"true"}),
			//plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			//plf.addCombo({"label":"Inspection Type",id:"strInspectionType"}),
            //plf.addHidden({id:"strCreatedFrom"}),
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
			{columnname:"Group Name",dataname:"GROUPVAL",datatype:"string",editControl:"combo",width:100,storeId:"strGroupName"},
			{columnname:"Checklist Description",dataname:"CHKLST_DTL_DESC",datatype:"string",editControl:"textbox",width:250,inputFormat:"string",InputLength:"4000"},
			{columnname:"Options",dataname:"OPTION_DESCCSV",datatype:"string",editControl:"textbox",width:200,inputFormat:"string",InputLength:"100"},
			//{columnname:"Positive Options",dataname:"POSITIVE_OPTION",datatype:"string",editControl:"textbox",width:200,inputFormat:"string",InputLength:"40"},
			{columnname:"Weightage",dataname:"WEIGHTAGECSV",datatype:"string",editControl:"textbox",width:120,inputFormat:"string",InputLength:"20"},
			{columnname:"Truck<BR>Category",dataname:"TRUCK_CATEGORY",datatype:"string",storeId:"strTruckCategory",editControl:"combo",width:130},
			{columnname:"Route<BR>Category",dataname:"ROUTE_CATEGORY",datatype:"string",storeId:"strRouteCategory",editControl:"combo",width:130}
			
		]
		var checkListGridDtl=				//69997
		{
			//title:"CheckList Details",
			id:"checkListMap",
			detail:checkListGridFieldObj,
			visibleRow:12
		}
		var chkListMasterGridSection = plf.addGrid(checkListGridDtl,this)		//69997
		
		var JourneyAssessmentParameterObj=									 //69997
		[   
			{columnname:"Category",dataname:"CATEGORY",datatype:"string",width:150,storeId:"strCategory"},	
			{columnname:"Range From",dataname:"RANGE_FROM",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Range To",dataname:"RANGE_TO",datatype:"string",editControl:"textbox",width:200}
			
			
			
		]
		var JourneyAssessmentParameterGrid=										//69997
		{
			title:"Risk Assessment Parameter",
			id:"journeyAssessmentMapping",
			detail:JourneyAssessmentParameterObj,
		
		}
		var JAPGridSection = plf.addGrid(JourneyAssessmentParameterGrid,this)			//69997
		
		var ApprovalParameterObj=														//69997
		[   
			{columnname:"Night Driving",dataname:"NIGHT_DRIVE",datatype:"string",editControl:"combo",width:100,storeId:"strNightDrive"},
			{columnname:"Risk Level",dataname:"CATEGORY",datatype:"string",editControl:"combo",width:150,storeId:"strCategoryRisk"},
			{columnname:"Level Seq",dataname:"LEVEL_SEQ",datatype:"string",editControl:"textbox",width:200,inputFormat:"integer"},
			{columnname:"Level Status",dataname:"LEVEL_STATUS",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Approver",dataname:"APPROVER",datatype:"string",editControl:"textbox",width:150,helpid:"userhelp"}
			
			
		]
		var ApprovalParameterGrid=													//69997
		{
			title:"Approval Parameter",
			id:"approvalParameter",
			detail:ApprovalParameterObj,
		
		}
		var APPGridSection = plf.addGrid(ApprovalParameterGrid,this)				//69997
		
		

		/*	
		plf.columns=4
		checkListMasterMinMaxColumn = plf.addColumnSection({});
		checkListMasterMinMaxFormCtrl=
		[  
			plf.addDisplayOnly({"label":"Minimum",id:"strMinimum"}),
			plf.addDisplayOnly({"label":"Maximum",id:"strMaximum"}),
          
		]
		
		checkListMasterMinMaxColumn.add(checkListMasterMinMaxFormCtrl);
		*/

	
		mainpage.ptrMainSection.add(checkListMasterColumn)//Add Master Header Section 
		//mainpage.ptrMainSection.add(checkListMasterMinMaxColumn) //Add Master Grid Section 
		mainpage.ptrMainSection.add(chkListMasterGridSection)
		var baseTab = plf.addTabSection({ tabs:[JAPGridSection,APPGridSection]});
		mainpage.ptrMainSection.add(baseTab)
		
		
		
		

		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strChkListCode","strChkListName"],
				"service":"CoreChecklistService",
				"methodName":"initRAMCheckListMSTS"
			}
			,
				 {
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Save",
					"input":["strChkListCode","strChkListName","checkListMap","strChkLstDtlDesc","strOptionDescCsv",
							 "iWeightageCsv","iChkLstDtlSeqNo","strCreatedFrom","journeyAssessmentMapping",
							 "approvalParameter"],
					"service":"CoreChecklistService",
					"methodName":"createRAMChecklistTS"
			}
			/*,
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
		    */ 
		];
		/*Help Screen handler starts here*/
		mainpage.hlpLinks=
		{
			
			"userhelp":
				{
					"hlpType":"grid",
					"gridID":"approvalMapping",
					"hlpScreen":"admin.UserHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"APPROVER","child":"USER_ID"}
							]
				}

		}
		
		mainpage.screenLinks=
		{
			/*
				
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
			*/		
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
