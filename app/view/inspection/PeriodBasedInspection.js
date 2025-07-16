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
Ext.define('CueTrans.view.inspection.PeriodBasedInspection', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Period Based Inspection";
		
		//Add Keyfields
		mainpage.keyFields=["strInspectionNo"]
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		//
		mainpage.grid_passviol_flag=true;
		mainpage.toolbarActions=["Refresh","Maintain","Authorise","Reject"]
		//Pre Journey Inspection  Header Section Begins
		plf.columns=4
		var preJourneyInspectionColumn = plf.addColumnSection({});		//69997
		
		var preJourneyInspectionCtrl=							//69997
		[
		    plf.addHlpText({"label":"Inspection No",id:"strInspectionNo","mandatory":"true",hlpLinkID:"inspectionno",inputFormat:"string",InputLength:"100"},this),
			plf.addDisplayOnly({"label":"Inspection Date",id:"dtInspectionDate"}),
			plf.addDisplayOnly({"label":"Inspection Time",id:"iInspectionTime"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			
			plf.addDisplayOnly({"label":"Inspection Type","id":"strInspectionType"}),
			plf.addDisplayOnly({"label":"Valid From","id":"dtValidFrom"}),
			plf.addDisplayOnly({"label":"Valid Till","id":"dtValidTo"}),
			plf.addBlank(),
			
			plf.addDisplayOnly({"label":"Truck Code",id:"strTruckCode"}),
			plf.addDisplayOnly({"label":"Truck Description",id:"strTruckDesc"}),
			plf.addDisplayOnly({"label":"Truck Documents",id:"strTruckDocuments"}),
			plf.addBlank(),
			
			plf.addDisplayOnly({"label":"Trailer Code",id:"strTrailerCode"}),
			plf.addDisplayOnly({"label":"Trailer Description",id:"strTrailerDesc"}),
			plf.addBlank(),
			plf.addBlank(),
			
			plf.addDisplayOnly({"label":"Driver Code",id:"strDriverCode"}),
			plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
			plf.addDisplayOnly({"label":"Driver Documents",id:"strDriverDocuments"}),
			plf.addBlank()
			
						
			//plf.addDisplayOnly({"label":"Last Inspection Date",id:"dtLastInspectionDate"}),
			//plf.addDisplayOnly({"label":"Last Inspection Remarks",id:"strLastInspectionRemarks"})
		]
		 preJourneyInspectionColumn.add(preJourneyInspectionCtrl);			
		preJourneyInspectionColumn.add(plf.addStripLine({}));
		//Pre Journey Inspection  Header Section Ends
		
		
		checkListOptionRenderFn =  function(val,metaData,record)
		{
			var radioHTML;
			radioHTML=""
			val.split(",").forEach(function(tmp_arr_inst)
				{
					radioHTML=radioHTML+"<input type='radio' "
					radioHTML=radioHTML+" name='"+ record.get("CHK_LIST_CODE")+'~'+record.get("CHKLST_DTL_SEQ_NO") +"' "
					radioHTML=radioHTML+" value='"+tmp_arr_inst+"' "
					if(record.get("ANSWER") == tmp_arr_inst)
					{
						radioHTML=radioHTML+ " checked "
					}
					radioHTML=radioHTML+" onClick=updateCheckListRecord('checkListGrid','"+record.getId()+"','ANSWER','"+tmp_arr_inst+"') "
					radioHTML=radioHTML+">"+tmp_arr_inst+"</input>"
					
				}
			)							
			return radioHTML
		}	
		
		var chkListObj=				//69997
		[
			{columnname:"Check List Code",dataname:"CHK_LIST_CODE",datatype:"string",width:100,hidden:true},
			{columnname:"Check List Header Desc",dataname:"CHK_LIST_NAME",datatype:"string",width:200,hidden:true},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC",datatype:"string",width:500},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO",datatype:"string",width:100,hidden:true},
			{columnname:"Options Available",dataname:"OPTION_DESCCSV",datatype:"string",width:300,renderer:checkListOptionRenderFn},
			{columnname:"Answer",dataname:"ANSWER",datatype:"string",editControl:"textbox",width:100,hidden:true}
		]
		var chkListGridDetail=								//69997
		{
			//title:"PreLoad-1",
			id:"checkListGrid",
			detail:chkListObj,
			groupByField: 'CHK_LIST_NAME',
			removeAddDelete:true
		}
		
		var checkListGridSection = plf.addGrid(chkListGridDetail,this)		//69997
		var checkListColumn = plf.addColumnSection({title:"CheckList"});		//69997
		checkListColumn.add(checkListGridSection)
		
		
		
		

		//Pre Journey Inspection  Status Section Begins
		plf.columns=4
		var preJourneyInspectionStatusColumn = plf.addColumnSection({});	 //69997
		var preJourneyInspectionStatusCtrl=										//69997
		[
			plf.addText({"label":"Inspection Remarks",id:"strInspectionRemarks"}),
			plf.addBlank(),
			plf.addBlank(),
			plf.addText({"label":"Rejection Reasons",id:"strRejectionReasons"})
		]
		preJourneyInspectionStatusColumn.add(preJourneyInspectionStatusCtrl);
		//Pre Journey Inspection  Status Section Ends
		
		
		//Add Header Section to Main Page
		mainpage.ptrMainSection.add(preJourneyInspectionColumn)
	//	mainpage.ptrMainSection.add(truckAndDriverColumn) //Add Truck Grid Section to Main Page
		//mainpage.ptrMainSection.add(preJourneyInspectionDriverGridSection) //Add Truck Grid Section to Main Page
	//	mainpage.ptrMainSection.add(checkListGridSection)
	    mainpage.ptrMainSection.add(checkListColumn)
	
		//mainpage.ptrMainSection.add(inspectionInsideFieldset) //Add Inspection Inside Section to Main Page
		//mainpage.ptrMainSection.add(inspectionAroundFieldset) //Add Inspection Around Section to Main Page
		mainpage.ptrMainSection.add(preJourneyInspectionStatusColumn) //Add Inspection Status Section to Main Page
		
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		/*
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strInspectionNo","strTruckCode"],
				"service":"CoreInspectionService",
				"methodName":"initPeriodInspectionScrTS"
				//completed
			},
		
			{
				"controlid":"strInspectionNo",
				"tasktype":"onenter",
				"input":["strInspectionNo","strTruckCode"],
				"service":"CoreInspectionService",
				"methodName":"fetchPeriodInspectionScrTS"
				//completed
			},
           {
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Maintain",
				"input":["strInspectionNo","checkListGrid","strStatus","strInspectionRemarks","strTruckCode","strImages",
				"strInspectionType","dtValidFrom","dtValidTo","strTruckDocuments","strDriverDocuments"],
				"service":"CoreInspectionService",
				"methodName":"maintainPeriodInspectionScrTS"
				//completed

			},	
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Authorise",
				"input":["strInspectionNo","strInspectionResult","strTruckCode","strInspectionRemarks","iSeqNo",
				"strInspectionType","dtValidFrom","dtValidTo","strTruckDocuments","strDriverDocuments"],
				"service":"CoreInspectionService",
				"methodName":"authorizePeriodInspectionScrTS"
				//completed

			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Reject",
				"input":["strInspectionNo","strInspectionResult","strRejectionReasons","strTruckCode","strTrailerCode","strDriverCode",
				"strInspectionType","dtValidFrom","dtValidTo","strTruckDocuments","strDriverDocuments"],
				"service":"CoreInspectionService",
				"methodName":"rejectPeriodInspectionScrTS"
				//completed

			}
			
		
		];
		*/	
		//Event Handlers Mapping Ends
			
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
				"except":["strInspectionNo",]
			},
			"active":
			{
				"enableAll":false,
				"except":["ivmsGrid","truckDocGrid"]
			}			
		}
		mainpage.hlpLinks=
		{
			"inspectionno":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.InspectionHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strInspectionNo","child":"INSPECTION_NO"}
							]
				}
		}
		//Generate Screen Section
	/*	mainpage.generateScreen();
		
		
		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		
		this.callParent(arguments);
	}
});
