/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	Risk assessment score.                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.0		  sivaraman    19/JAN/2016    67676                      Disable the fields.
1.0.1	   Manibharathi		05/02/2016    69997                         Addition of var  
************************************************************************************************/

Ext.define('CueTrans.view.journey_management.JourneyAssessment', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Journey Risk Assessment";
		
		//Add Keyfields
		mainpage.keyFields=["strJourneyPlanNo"]
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		mainpage.toolbarActions= [{
                "name": "Save",
                "tooltip": "Click here to save the assesment for the journey."
            }/*,
			{
                "name": "Complete",
                "tooltip": "Click here to complete the assessment for the journey."
            }*/
			   
            ]
		//mainpage.toolbarActions=["Save","Complete"]
		mainpage.toolbarLinks=
		[
			{"name":"Journey Plan","linkid":"jms_journeyPlan","tooltip":"Click here to launch the journey plan screen."},
			{"name":"Re-Create","linkid":"jms_recreate","tooltip":"Click here to launch the journey plan recreate screen."}
		]
		
		//Add Keyfields
		mainpage.keyFields=["strJourneyPlanNo"]
		//Journey Assessment  Header Section Begins
		  var formCtrl=[];
		plf.columns=3
		var JourneyAssessmentColumn = plf.addColumnSection({});		//69997
		var JourneyAssessmentCtrl=									//69997
		[
			plf.addHlpText({"label":"Journey Plan No",id:"strJourneyPlanNo",hlpLinkID:"jpno"},this),
			plf.addDisplayOnly({"label":"Journey Date","id":"dtJourneyPlanDate"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			plf.addDisplayOnly({"label":"Origin","id":"strOrigin"}),
			plf.addDisplayOnly({"label":"Via","id":"strVia"}),
			plf.addDisplayOnly({"label":"Destination","id":"strDestination"})
		]
		JourneyAssessmentColumn.add(JourneyAssessmentCtrl);
		
		//Check list Grid Section starts
   		checkListOptionRenderFn =  function(val,metaData,record)
		{
			var radioHTML;
			radioHTML=""
			val.split(",").forEach(function(tmp_arr_inst)
				{
					radioHTML=radioHTML+"<input type='radio' "
					radioHTML=radioHTML+" name='"+ record.get("CHK_LIST_CODE")+'~'+record.get("CHKLST_DTL_SEQ_NO") +"' "
					radioHTML=radioHTML+" value='"+tmp_arr_inst+"' "
					if(record.get("CHK_LIST_FLAG") == tmp_arr_inst)
					{
						radioHTML=radioHTML+ " checked "
					}
					radioHTML=radioHTML+" onClick=\" updateCheckListRecord('journeyAssessment','"+record.getId()+"','CHK_LIST_FLAG','"+tmp_arr_inst+"') \" "
					radioHTML=radioHTML+">"+tmp_arr_inst+"</input>"
					
				}
			)							
			return radioHTML
		}	

		var chkListObj=							//69997
		[      
            {columnname:"Group Name",dataname:"GROUPVAL",datatype:"string",width:150},
			{columnname:"Check List Name",dataname:"CHK_LIST_NAME",datatype:"string",width:350,hidden:true},			
			{columnname:"Check List Description",dataname:"CHKLST_DTL_DESC",datatype:"string",width:300},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO",datatype:"string",width:100,hidden:true},
			{columnname:"Options Available",dataname:"OPTION_DESCCSV",datatype:"string",width:300,renderer:checkListOptionRenderFn},
			{columnname:"Answer",dataname:"CHK_LIST_FLAG",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Score",dataname:"SCORE",datatype:"string",editControl:"textbox",width:100,colAlign:'right'},
			{columnname:"Attachment",dataname:"ATTACH_DOCUMENT",datatype:"string",editControl:"fileupload",fileGroup:"Assessment\\Documents",width:245}
			
		]
		var chkListGridDetail=		//69997
		{
			title:"Journey Assessment",
			id:"journeyAssessment",
			detail:chkListObj,
			visibleRow:12,
			//groupByField: 'CHK_LIST_NAME',
			removeAddDelete:true	
		}
		
	var	checkListGridSection = plf.addGrid(chkListGridDetail,this)	//69997
		//Risk Details Section Begins
		plf.columns=2
		var RiskDetailsCollapse = plf.addColumnSection({});	//69997
		var RiskDetailsFormCtrl=							//69997
		[
			
		
			plf.addDisplayOnly({"label":"RAM Score","id":"iRiskAssessmentScore"}),
			plf.addDisplayOnly({"label":"Risk Assessment","id":"strRiskAssessment"})
/* 
--Below code has been changed by sivaraman on 19/01/16  for bugid 67676
*/		
	//		,Ext.create('Ext.Slider', {
	//			itemId:"iRiskAssessmentScore",
	//			value: 0,
	//			increment: 10,
	//			minValue: 0,
	//			maxValue: 100,
	//			columnWidth:1,
	//			readOnly:true,
	//			height:50,
	//			baseBodyCls:"jpRiskSlider"
	//			})
			
		]
		RiskDetailsCollapse.add(RiskDetailsFormCtrl);
		//Risk Details  Section Ends
		
		var checkListGridColumn = plf.addCollapseSection({title:"RAM CheckList",collapsed:false});	//69997
              checkListGridColumn .add(checkListGridSection )

		
		//Add Header Section to Main Page
		mainpage.ptrMainSection.add(JourneyAssessmentColumn)
		//mainpage.ptrMainSection.add(preJourneyInspectionDriverGridSection) //Add Truck Grid Section to Main Page
		mainpage.ptrMainSection.add(checkListGridColumn)
		//mainpage.ptrMainSection.add(inspectionInsideFieldset) //Add Inspection Inside Section to Main Page
		//mainpage.ptrMainSection.add(inspectionAroundFieldset) //Add Inspection Around Section to Main Page
		mainpage.ptrMainSection.add(RiskDetailsCollapse) //Add Inspection Status Section to Main Page
		
		mainpage.dataHistorySectionFlag=false;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyAssessmentService",
				"methodName":"initJourneyAssessmentTS"
			},
		    {
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strJourneyPlanNo","journeyAssessment","strChecklistAnswer","strChecklistCode","iSeqNo"],
				"service":"CoreJourneyAssessmentService",
				"methodName":"maintainJourneyAssessmentTS"

			},	
			 /*{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"complete",
				"input":["strJourneyPlanNo","journeyAssessment"],
				"service":"CoreJourneyAssessmentService",
				"methodName":"journeyAssessmentCompleteTS"

			},	*/
			{
				"controlid":"strJourneyPlanNo",
				"tasktype":"onenter",
				"input":["strJourneyPlanNo","journeyAssessment","strChecklistAnswer","strChecklistCode","iSeqNo"],
				"service":"CoreJourneyAssessmentService",
				"methodName":"fetchJourneyAssessmentTS"
			},
			/*{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"reject",
				"input":["strInspectionNo","strInspectionResult","strRejectionReasons"],
				"service":"CoreInspectionService",
				"methodName":"rejectPre-InspectionScrTS"

			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"reinspect",
				"input":["strInspectionNo","checkListGrid","strInspectionResult"],
				"service":"CoreInspectionService",
				"methodName":"reinspectPre-InspectionScrTS"

			}*/
			{
				
					"tasktype":"proto",
					"filename":"jm_master/JourneyPlan.json"
			}
		];
		//Event Handlers Mapping Ends
		
		
				mainpage.screenLinks=
		{
			"jms_journeyPlan":
				{
					"dest":"journey_management.JourneyPlanTms",
					"hdr":[
							{"src":"strJourneyPlanNo","dest":"strJourneyPlanNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"jms_recreate":
				{
					"dest":"journey_management.JourneyPlanRecreate",
					"hdr":[
							{"src":"strJourneyPlanNo","dest":"strJourneyPlanNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
		
mainpage.hlpLinks=
		{
			"jpno":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.JourneyPlanHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strJourneyPlanNo","child":"JOURNEY_PLAN_NO"}
							]
				}
		}	
		this.callParent(arguments);
	}
});
