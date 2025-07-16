Ext.define('CueTrans.view.journey_management.LoadInspection', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Load Inspection";
			
		
		//Add Keyfields
		mainpage.keyFields=["strInspectionNo"]
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		mainpage.toolbarActions= [{
                "name": "Save",
                "tooltip": "Click here to save the inspection."
            },
			{
                "name": "Reject",
                "tooltip": "Click here to reject an inspection."
            },
			{
                "name": "Confirm",
                "tooltip": "Click here to confirm an inspection."
            },
            {
                "name": "Print",
                "tooltip": "Click here to print the inspection."
            }
           
            ]
	//	mainpage.toolbarActions=["Save","Reject","Confirm","Print"]
		//Pre Journey Inspection  Header Section Begins
		plf.columns=4
		preJourneyInspectionColumn = plf.addColumnSection({});	
		preJourneyInspectionCtrl=
		[
			 plf.addHlpText({"label":"Inspection No",id:"strInspectionNo","mandatory":"true",hlpLinkID:"inspectionno"},this),
			plf.addText({"label":"Inspection Date",id:"dtInspectionDate"}),
			plf.addText({"label":"Inspection Time",id:"iInspectionTime"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			plf.addText({"label":"Truck Code",id:"strTruckCode"}),
			plf.addText({"label":"Truck Description",id:"strTruckDesc"}),
			//plf.addText({"label":"Trailer Code",id:"strTrailerCode"}),
			//plf.addText({"label":"Trailer Description",id:"strTrailerDesc"}),
			
			plf.addText({"label":"Driver Code",id:"strDriverCode"}),
			plf.addText({"label":"Driver Name",id:"strDriverName"}),
			plf.addText({"label":"Last Inspection Date",id:"dtLastInspectionDate"}),
			plf.addText({"label":"Last Ins. Remarks",id:"strLastInspectionRemarks"})
		]
		preJourneyInspectionColumn.add(preJourneyInspectionCtrl);
		preJourneyInspectionColumn.add(plf.addStripLine({}));
		//Pre Journey Inspection  Header Section Ends
		
		
		//Pre Journey Inspection Truck Document Grid Section Begins
		TruckGridFieldObj=
		[
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:100},
			{columnname:"Document<BR>Number",dataname:"DOC_NO",datatype:"string",width:100},
			{columnname:"Expiry Date",dataname:"EXPIRTY_DT",datatype:"string",width:100},
			{columnname:"Issued By",dataname:"ISSUED_BY",datatype:"string",width:150}
		]
		truckGridDtl=
		{
			title:"Truck Documents",
			id:"preJourneyTruck",
			columnWidth:0.5,
			readonly:true,
			detail:TruckGridFieldObj,
			visibleRow:3.5,	
			removeFilter:true
		}
		TruckGridSection = plf.addGrid(truckGridDtl,this)	
		//Pre Journey Inspection Truck Document Grid Section Ends
		
		
		//Pre Journey Inspection Driver Document Grid Section Begins
		preJourneyInspectionDriverGridFieldObj=
		[
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:200},
			{columnname:"Document<BR>Number",dataname:"DOC_NO",datatype:"string",width:100},
			{columnname:"Issue Date",dataname:"ISSUE_DT",datatype:"string",width:100},
			{columnname:"Expiry Date",dataname:"EXPIRTY_DT",datatype:"string",width:100}
		]
		driverGridDtl=
		{
			title:"Driver Documents",
			id:"preJourneyDriver",
			columnWidth:0.5,
			readonly:true,
			detail:preJourneyInspectionDriverGridFieldObj,
			visibleRow:3.5,	
			removeFilter:true
		}
	DriverGridSection = plf.addGrid(driverGridDtl,this)	
	
	
	plf.columns=4
		preJourneyInspectionStatusColumn1 = plf.addColumnSection({});	
		preJourneyInspectionStatusCtrl1=
		[
			plf.addDisplayOnly({"label":"Inspection Remarks",id:"strInspectionRemarks"}),
			plf.addDisplayOnly({"label":"Inspection Result",id:"strInspectionResult"})
			//plf.addBlank(),
			//plf.addText({"label":"Rejection Reasons",id:"strInspectionReasons"})
			//plf.addText({"label":"Weight",id:"iLoadWeight"}),
			//plf.addCombo({"label":"WeightUom",id:"strWeightUom"})
		]
		preJourneyInspectionStatusColumn1.add(preJourneyInspectionStatusCtrl1);
		//Pre Journey Inspection  Status Section Ends
	
	//Check list Grid Section starts
	    truckAndDriverColumn = plf.addColumnSection({});
		truckAndDriverColumn.add(TruckGridSection)
		truckAndDriverColumn.add(plf.addSplitter)
		truckAndDriverColumn.add(DriverGridSection)
		truckAndDriverColumn.add(plf.addStripLine({}));
		
		
	    preJourneyLoadInspectionColumn = plf.addColumnSection({});
		
		checkListOptionRenderFn =  function(val,metaData,record)
		{
			var radioHTML;
			radioHTML=""
			if(val== "")
				return;
			
			val.split(",").forEach(function(tmp_arr_inst)
				{
					radioHTML=radioHTML+"<input type='radio' disabled "
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
		
		checkListOptionNxtRenderFn =  function(val,metaData,record)
		{
		
			var radioHTML;
			radioHTML=""

			if(val== "")
				return;
				
			val.split(",").forEach(function(tmp_arr_inst)
				{
					radioHTML=radioHTML+"<input type='radio' disabled "
					radioHTML=radioHTML+" name='"+ record.get("CHK_LIST_CODE")+'~'+record.get("CHKLST_DTL_SEQ_NO_NXT") +"' "
					radioHTML=radioHTML+" value='"+tmp_arr_inst+"' "
					if(record.get("ANSWER_NXT") == tmp_arr_inst)
					{
						radioHTML=radioHTML+ " checked "
					}
					radioHTML=radioHTML+" onClick=updateCheckListRecord('checkListGrid','"+record.getId()+"','ANSWER_NXT','"+tmp_arr_inst+"') "
					radioHTML=radioHTML+">"+tmp_arr_inst+"</input>"
					
				}
			)							
			return radioHTML
		}
		
		checkListOptionLstRenderFn =  function(val,metaData,record)
		{
			var radioHTML;
			radioHTML=""
			
			if(val== "")
				return;			
				
			val.split(",").forEach(function(tmp_arr_inst)
				{
					radioHTML=radioHTML+"<input type='radio' disabled "
					radioHTML=radioHTML+" name='"+ record.get("CHK_LIST_CODE")+'~'+record.get("CHKLST_DTL_SEQ_NO_LST") +"' "
					radioHTML=radioHTML+" value='"+tmp_arr_inst+"' "
					if(record.get("ANSWER_LST") == tmp_arr_inst)
					{
						radioHTML=radioHTML+ " checked "
					}
					radioHTML=radioHTML+" onClick=updateCheckListRecord('checkListGrid','"+record.getId()+"','ANSWER_LST','"+tmp_arr_inst+"') "
					radioHTML=radioHTML+">"+tmp_arr_inst+"</input>"
					
				}
			)							
			return radioHTML
		}
		
		chkListObj=
		[
			
			{columnname:"No",dataname:"SEQ_NO",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Check List Code",dataname:"CHK_LIST_CODE",datatype:"string",width:100,hidden:true},
			{columnname:"Check List Header Desc",dataname:"CHK_LIST_NAME",datatype:"string",width:200,hidden:true},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC",datatype:"string",width:225},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO",datatype:"string",width:100,hidden:true},
			{columnname:"Options",dataname:"OPTION_DESCCSV",datatype:"string",width:100,renderer:checkListOptionRenderFn},
			{columnname:"Answer",dataname:"ANSWER",datatype:"string",editControl:"textbox",width:100,hidden:true},
			
			{columnname:"No",dataname:"SEQ_NO_NXT",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC_NXT",datatype:"string",width:225},
			{columnname:"Options",dataname:"OPTION_DESCCSV_NXT",datatype:"string",width:100,renderer:checkListOptionNxtRenderFn},			
			{columnname:"Answer",dataname:"ANSWER_NXT",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO_NXT",datatype:"string",width:100,hidden:true},
			
			{columnname:"No",dataname:"SEQ_NO_LST",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC_LST",datatype:"string",width:225},
			{columnname:"Options",dataname:"OPTION_DESCCSV_LST",datatype:"string",width:100,renderer:checkListOptionLstRenderFn},			
			{columnname:"Answer",dataname:"ANSWER_LST",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO_LST",datatype:"string",width:100,hidden:true}
			
			
		]
		chkListGridDetail=
		{
			//title:"Inspection For Driver",
			id:"checkListGrid",
			detail:chkListObj,
			columnWidth:1,
			visibleRow:15,
			//groupByField: 'CHK_LIST_NAME',
			removeAddDelete:true,
			readonly:true,
			removeFilter:true,
			removeColumns:true
		}
		
		checkListGridSection = plf.addGrid(chkListGridDetail)	
	    preJourneyLoadInspectionColumn.add(checkListGridSection)
		preJourneyLoadInspectionColumn.add(plf.addStripLine({}));
		
		newCheckListGridRenderFn =  function(val,metaData,record)
		{
			var radioHTML;
			radioHTML=""
			if(val== "")
				return;	
			val.split(",").forEach(function(tmp_arr_inst)
				{
					radioHTML=radioHTML+"<input type='radio' disabled "
					radioHTML=radioHTML+" name='"+ record.get("CHK_LIST_CODE")+'~'+record.get("CHKLST_DTL_SEQ_NO") +"' "
					radioHTML=radioHTML+" value='"+tmp_arr_inst+"' "
					if(record.get("ANSWER") == tmp_arr_inst)
					{
						radioHTML=radioHTML+ " checked "
					}
					radioHTML=radioHTML+" onClick=updateCheckListRecord('newCheckListGrid','"+record.getId()+"','ANSWER','"+tmp_arr_inst+"') "
					radioHTML=radioHTML+">"+tmp_arr_inst+"</input>"
					
				}
			)							
			return radioHTML
		}	
		
		newCheckListGridNxtRenderFn =  function(val,metaData,record)
		{
		
			var radioHTML;
			radioHTML=""
			if(val== "")
				return;	
			val.split(",").forEach(function(tmp_arr_inst)
				{
					radioHTML=radioHTML+"<input type='radio' disabled "
					radioHTML=radioHTML+" name='"+ record.get("CHK_LIST_CODE")+'~'+record.get("CHKLST_DTL_SEQ_NO_NXT") +"' "
					radioHTML=radioHTML+" value='"+tmp_arr_inst+"' "
					if(record.get("ANSWER_NXT") == tmp_arr_inst)
					{
						radioHTML=radioHTML+ " checked "
					}
					radioHTML=radioHTML+" onClick=updateCheckListRecord('newCheckListGrid','"+record.getId()+"','ANSWER_NXT','"+tmp_arr_inst+"') "
					radioHTML=radioHTML+">"+tmp_arr_inst+"</input>"
					
				}
			)							
			return radioHTML
		}
		
		newCheckListGridLstRenderFn =  function(val,metaData,record)
		{
			var radioHTML;
			radioHTML=""
			if(val== "")
				return;	
			val.split(",").forEach(function(tmp_arr_inst)
				{
					radioHTML=radioHTML+"<input type='radio' disabled "
					radioHTML=radioHTML+" name='"+ record.get("CHK_LIST_CODE")+'~'+record.get("CHKLST_DTL_SEQ_NO_LST") +"' "
					radioHTML=radioHTML+" value='"+tmp_arr_inst+"' "
					if(record.get("ANSWER_LST") == tmp_arr_inst)
					{
						radioHTML=radioHTML+ " checked "
					}
					radioHTML=radioHTML+" onClick=updateCheckListRecord('newCheckListGrid','"+record.getId()+"','ANSWER_LST','"+tmp_arr_inst+"') "
					radioHTML=radioHTML+">"+tmp_arr_inst+"</input>"
					
				}
			)							
			return radioHTML
		}
		
		chkListObj1=
		[
			
			{columnname:"No",dataname:"SEQ_NO",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Check List Code",dataname:"CHK_LIST_CODE",datatype:"string",width:100,hidden:true},
			{columnname:"Check List Header Desc",dataname:"CHK_LIST_NAME",datatype:"string",width:200,hidden:true},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC",datatype:"string",width:225},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO",datatype:"string",width:100,hidden:true},
			{columnname:"Options",dataname:"OPTION_DESCCSV",datatype:"string",width:100,renderer:newCheckListGridRenderFn},
			{columnname:"Answer",dataname:"ANSWER",datatype:"string",editControl:"textbox",width:100,hidden:true},
			
			{columnname:"No",dataname:"SEQ_NO_NXT",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC_NXT",datatype:"string",width:225},
			{columnname:"Options",dataname:"OPTION_DESCCSV_NXT",datatype:"string",width:100,renderer:newCheckListGridNxtRenderFn},			
			{columnname:"Answer",dataname:"ANSWER_NXT",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO_NXT",datatype:"string",width:100,hidden:true},
			
			{columnname:"No",dataname:"SEQ_NO_LST",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC_LST",datatype:"string",width:225},
			{columnname:"Options",dataname:"OPTION_DESCCSV_LST",datatype:"string",width:100,renderer:newCheckListGridLstRenderFn},			
			{columnname:"Answer",dataname:"ANSWER_LST",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO_LST",datatype:"string",width:100,hidden:true}
			
			
		]
		chkListGridDetail1=
		{
			title:"Vehicle Inspection Checklist: Non-critical",
			id:"newCheckListGrid",
			columnWidth:1,
			detail:chkListObj1,
			visibleRow:15,
			//groupByField: 'CHK_LIST_NAME',
			removeAddDelete:true,
			readonly:true,
			removeFilter:true,
			removeColumns:true
		}
		checkListColumn = plf.addColumnSection({title:"Vehicle Inspection Checklist: Critical"});
		checkListSecondGridSection = plf.addGrid(chkListGridDetail1)
		checkListColumn.add(checkListGridSection)
		checkListColumn.add(checkListSecondGridSection)
		//Load check list grid begins
			
		
		LoadCheckListGridRenderFn =  function(val,metaData,record)
		{
			var radioHTML;
			radioHTML=""
			if(val== "")
				return;	
			val.split(",").forEach(function(tmp_arr_inst)
				{
					radioHTML=radioHTML+"<input type='radio' "
					radioHTML=radioHTML+" name='"+ record.get("CHK_LIST_CODE")+'~'+record.get("CHKLST_DTL_SEQ_NO") +"' "
					radioHTML=radioHTML+" value='"+tmp_arr_inst+"' "
					if(record.get("ANSWER") == tmp_arr_inst)
					{
						radioHTML=radioHTML+ " checked "
					}
					radioHTML=radioHTML+" onClick=updateCheckListRecord('checkLoadList','"+record.getId()+"','ANSWER','"+tmp_arr_inst+"') "
					radioHTML=radioHTML+">"+tmp_arr_inst+"</input>"
					
				}
			)							
			return radioHTML
		}	
		
		LoadCheckListGridNxtRenderFn =  function(val,metaData,record)
		{
		
			var radioHTML;
			radioHTML=""
			if(val== "")
				return;	
			val.split(",").forEach(function(tmp_arr_inst)
				{
					radioHTML=radioHTML+"<input type='radio' "
					radioHTML=radioHTML+" name='"+ record.get("CHK_LIST_CODE")+'~'+record.get("CHKLST_DTL_SEQ_NO_NXT") +"' "
					radioHTML=radioHTML+" value='"+tmp_arr_inst+"' "
					if(record.get("ANSWER_NXT") == tmp_arr_inst)
					{
						radioHTML=radioHTML+ " checked "
					}
					radioHTML=radioHTML+" onClick=updateCheckListRecord('checkLoadList','"+record.getId()+"','ANSWER_NXT','"+tmp_arr_inst+"') "
					radioHTML=radioHTML+">"+tmp_arr_inst+"</input>"
					
				}
			)							
			return radioHTML
		}
		
		LoadCheckListGridLstRenderFn =  function(val,metaData,record)
		{
			var radioHTML;
			radioHTML=""
			if(val== "")
				return;	
			val.split(",").forEach(function(tmp_arr_inst)
				{
					radioHTML=radioHTML+"<input type='radio' "
					radioHTML=radioHTML+" name='"+ record.get("CHK_LIST_CODE")+'~'+record.get("CHKLST_DTL_SEQ_NO_LST") +"' "
					radioHTML=radioHTML+" value='"+tmp_arr_inst+"' "
					if(record.get("ANSWER_LST") == tmp_arr_inst)
					{
						radioHTML=radioHTML+ " checked "
					}
					radioHTML=radioHTML+" onClick=updateCheckListRecord('checkLoadList','"+record.getId()+"','ANSWER_LST','"+tmp_arr_inst+"') "
					radioHTML=radioHTML+">"+tmp_arr_inst+"</input>"
					
				}
			)							
			return radioHTML
		}
		
		chkLoadListObj=
		[
			
			{columnname:"No",dataname:"SEQ_NO",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Check List Code",dataname:"CHK_LIST_CODE",datatype:"string",width:100,hidden:true},
			{columnname:"Check List Header Desc",dataname:"CHK_LIST_NAME",datatype:"string",width:200,hidden:true},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC",datatype:"string",width:225},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO",datatype:"string",width:100,hidden:true},
			{columnname:"Options",dataname:"OPTION_DESCCSV",datatype:"string",width:100,renderer:LoadCheckListGridRenderFn},
			{columnname:"Answer",dataname:"ANSWER",datatype:"string",editControl:"textbox",width:100,hidden:true},
			
			{columnname:"No",dataname:"SEQ_NO_NXT",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC_NXT",datatype:"string",width:225},
			{columnname:"Options",dataname:"OPTION_DESCCSV_NXT",datatype:"string",width:100,renderer:LoadCheckListGridNxtRenderFn},			
			{columnname:"Answer",dataname:"ANSWER_NXT",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO_NXT",datatype:"string",width:100,hidden:true},
			
			{columnname:"No",dataname:"SEQ_NO_LST",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC_LST",datatype:"string",width:225},
			{columnname:"Options",dataname:"OPTION_DESCCSV_LST",datatype:"string",width:100,renderer:LoadCheckListGridLstRenderFn},			
			{columnname:"Answer",dataname:"ANSWER_LST",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO_LST",datatype:"string",width:100,hidden:true}
			
			
		]
		chkLoadListGridDetail=
		{
			title:"Load Inspection Checklist",
			id:"checkLoadList",
			detail:chkLoadListObj,
			visibleRow:5,
			//groupByField: 'CHK_LIST_NAME',
			removeAddDelete:true,
			readonly:true,
			removeFilter:true,
			removeColumns:true
		}
		
		checkLoadListGridSection = plf.addGrid(chkLoadListGridDetail)
		
		

		//Pre Journey Inspection  Status Section Begins
		/*
		plf.columns=4
		preJourneyInspectionStatusColumn = plf.addColumnSection({});	
		preJourneyInspectionStatusCtrl=
		[
			//plf.addText({"label":"Inspection Remarks",id:"strInspectionRemarks"}),
			//plf.addText({"label":"Inspection Result",id:"strInspectionResult"}),
			//plf.addBlank(),
			//plf.addText({"label":"Rejection Reasons",id:"strInspectionReasons"})
			plf.addText({"label":"Weight",id:"iLoadWeight"}),
			plf.addCombo({"label":"Weight Uom",id:"strWeightUom"})
		]
		preJourneyInspectionStatusColumn.add(preJourneyInspectionStatusCtrl);
		//Pre Journey Inspection  Status Section Ends
		*/
		
		//Add Header Section to Main Page
		mainpage.ptrMainSection.add(preJourneyInspectionColumn)
		mainpage.ptrMainSection.add(truckAndDriverColumn)
mainpage.ptrMainSection.add(preJourneyInspectionStatusColumn1)
		//Add Truck Grid Section to Main Page
		//mainpage.ptrMainSection.add(preJourneyInspectionDriverGridSection) //Add Truck Grid Section to Main Page
		mainpage.ptrMainSection.add(checkListColumn)
		mainpage.ptrMainSection.add(checkLoadListGridSection)
		//mainpage.ptrMainSection.add(checkLoadListGridSection)
		//mainpage.ptrMainSection.add(inspectionInsideFieldset) //Add Inspection Inside Section to Main Page
		//mainpage.ptrMainSection.add(inspectionAroundFieldset) //Add Inspection Around Section to Main Page
		
		//mainpage.ptrMainSection.add(preJourneyInspectionStatusColumn)
		//Add Inspection Status Section to Main Page
		
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strInspectionNo","strTruckCode"],
				"service":"CoreInspectionService",
				"methodName":"initLoadInspectionScrTS"
				//completed
			},
		
			{
				"controlid":"strInspectionNo",
				"tasktype":"onenter",
				"input":["strInspectionNo","strTruckCode"],
				"service":"CoreInspectionService",
				"methodName":"fetchLoadInspectionScrTS"
				//completed
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["strInspectionNo","strTruckCode"],
				"service":"CoreInspectionService",
				"methodName":"authorizeLoadInspectionScrTS"
				//completed

			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Reject",
				"input":["strInspectionNo","strTruckCode","strDriverCode"],
				"service":"CoreInspectionService",
				"methodName":"rejectLoadInspectionScrTS"
				//completed

			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strInspectionNo","checkLoadList","strStatus","strWeightUom","iLoadWeight","strTruckCode"],
				"service":"CoreInspectionService",
				"methodName":"maintainLoadInspectionScrTS"
				//completed

			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print",
				"input":["strInspectionNo"],
				"service":"CoreInspectionService",
				"methodName":"PrintInspectionReport"
			}
			,
				{
					"tasktype":"proto",
					"filename":"journey_management/LoadInspection.json"
				}
			/*,
{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"maintain",
				"input":["strInspectionNo","checkListGrid","strStatus"],
				"service":"CoreInspectionService",
				"methodName":"maintainPre-InspectionScrTS"

			},	
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"authorise",
				"input":["strInspectionNo"],
				"service":"CoreInspectionService",
				"methodName":"authorizePre-InspectionScrTS"

			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"reject",
				"input":["strInspectionNo"],
				"service":"CoreInspectionService",
				"methodName":"rejectPre-InspectionScrTS"

			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"reinspect",
				"input":["strInspectionNo"],
				"service":"CoreInspectionService",
				"methodName":"reinspectPre-InspectionScrTS"

			}*/
		];
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
				"except":["strInspectionNo"]
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
