Ext.define('CueTrans.view.journey_management.ReInspection', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Vehicle ReInspection";
		
		//Add Keyfields
		mainpage.keyFields=["strInspectionNo"]
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		//
		mainpage.grid_passviol_flag=true;
		
		mainpage.toolbarActions= [{
                "name": "Save",
                "tooltip": "Click here to save the inspection."
            },
			{
                "name": "Confirm",
                "tooltip": "Click here to confirm the inspection."
            },
			{
                "name": "Reject",
                "tooltip": "Click here to reject the inspection."
            },
            {
                "name": "Print",
                "tooltip": "Click here to print the inspection."
            }           
            ]
	//	mainpage.toolbarActions=["Maintain","Authorise","Reject","Print"]
		//Pre Journey Inspection  Header Section Begins
		plf.columns=4
		preJourneyInspectionColumn = plf.addColumnSection({});	
		preJourneyInspectionCtrl=
		[
			plf.addHlpText({"label":"Inspection No",id:"strInspectionNo","mandatory":"true",hlpLinkID:"inspectionno"},this),
			plf.addDisplayOnly({"label":"Inspection Date",id:"dtInspectionDate"}),
			plf.addDisplayOnly({"label":"Inspection Time",id:"iInspectionTime"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			plf.addDisplayOnly({"label":"Truck Code",id:"strTruckCode"}),
			plf.addDisplayOnly({"label":"Truck Description",id:"strTruckDesc"}),
			plf.addDisplayOnly({"label":"Driver Code",id:"strDriverCode"}),
			plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
			plf.addDisplayOnly({"label":"Trailer Code",id:"strTrailerCode"}),
			plf.addDisplayOnly({"label":"Trailer Description",id:"strTrailerDesc"}),
			
			
			plf.addDisplayOnly({"label":"Last Inspection Date",id:"dtLastInspectionDate"}),
			plf.addDisplayOnly({"label":"Last Ins. Remarks",id:"strLastInspectionRemarks"})
		]
		preJourneyInspectionColumn.add(preJourneyInspectionCtrl);
		preJourneyInspectionColumn.add(plf.addStripLine({}));
		//Pre Journey Inspection  Header Section Ends
		
		
		//Pre Journey Inspection Truck Document Grid Section Begins
		TruckGridFieldObj=
		[
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:100},
			{columnname:"Document<BR>Number",dataname:"DOC_NO",datatype:"string",width:180},
			{columnname:"Expiry Date",dataname:"EXPIRTY_DT",datatype:"string",width:100},
			{columnname:"Issued By",dataname:"ISSUED_BY",datatype:"string",width:150}
		]
		truckGridDtl=
		{
			title:"Truck Documents",
			id:"preJourneyTruck",
			columnWidth:0.5,
			visibleRow:3.5,	
			readonly:true,
			removeFilter:true,
			detail:TruckGridFieldObj
		}
		TruckGridSection = plf.addGrid(truckGridDtl,this)	
		//Pre Journey Inspection Truck Document Grid Section Ends
		
		
		//Pre Journey Inspection Driver Document Grid Section Begins
		preJourneyInspectionDriverGridFieldObj=
		[
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:200},
			{columnname:"Document<BR>Number",dataname:"DOC_NO",datatype:"string",width:100},
			{columnname:"Issue Date",dataname:"DOC_ISSUE_DT",datatype:"string",width:100},
			{columnname:"Expiry Date",dataname:"DOC_EXPIRY_DT",datatype:"string",width:100}
		]
		driverGridDtl=
		{
			title:"Driver Documents",
			id:"preJourneyDriver",
			columnWidth:0.5,
			visibleRow:3.5,	
			readonly:true,
			removeFilter:true,
			detail:preJourneyInspectionDriverGridFieldObj
		}
	DriverGridSection = plf.addGrid(driverGridDtl,this)

	truckAndDriverColumn = plf.addColumnSection({});
		truckAndDriverColumn.add(TruckGridSection)
		
		truckAndDriverColumn.add(plf.addSplitter)
		truckAndDriverColumn.add(DriverGridSection)
	    truckAndDriverColumn.add(plf.addStripLine({}));
	//Check list Grid Section starts
	    checkListOptionRenderFn =  function(val,metaData,record)
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
					radioHTML=radioHTML+"<input type='radio' "
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
					radioHTML=radioHTML+"<input type='radio' "
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
			
			{columnname:"Seq<BR>No",dataname:"SEQ_NO",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Check List Code",dataname:"CHK_LIST_CODE",datatype:"string",width:100,hidden:true},
			{columnname:"Check List Header Desc",dataname:"CHK_LIST_NAME",datatype:"string",width:200,hidden:true},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC",datatype:"string",width:230},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO",datatype:"string",width:100,hidden:true},
			{columnname:"Options<BR>Available",dataname:"OPTION_DESCCSV",datatype:"string",width:100,renderer:checkListOptionRenderFn},
			{columnname:"Answer",dataname:"ANSWER",datatype:"string",editControl:"textbox",width:100,hidden:true},
			
			{columnname:"Seq<BR>No",dataname:"SEQ_NO_NXT",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC_NXT",datatype:"string",width:230},
			{columnname:"Options<BR>Available",dataname:"OPTION_DESCCSV_NXT",datatype:"string",width:100,renderer:checkListOptionNxtRenderFn},			
			{columnname:"Answer",dataname:"ANSWER_NXT",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO_NXT",datatype:"string",width:100,hidden:true},
			
			{columnname:"Seq<BR>No",dataname:"SEQ_NO_LST",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC_LST",datatype:"string",width:230},
			{columnname:"Options<BR>Available",dataname:"OPTION_DESCCSV_LST",datatype:"string",width:100,renderer:checkListOptionLstRenderFn},			
			{columnname:"Answer",dataname:"ANSWER_LST",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO_LST",datatype:"string",width:100,hidden:true}
			
					
		]
		chkListGridDetail=
		{ 	
			title:"Inspections",
			id:"checkListGrid",
			detail:chkListObj,
			columnWidth:1,
			visibleRow:15,
			readonly:true,
			removeFilter:true,
			groupByField: 'CHK_LIST_NAME',
			removeAddDelete:true,
			removeColumns:true
			
		}
		
		checkListGridSection = plf.addGrid(chkListGridDetail,this)	
		
		//Adding the second check list grid
		checkListColumn = plf.addColumnSection({});
		
		//Rendering Function for the second Grid
		newCheckListGridRenderFn =  function(val,metaData,record)
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
					radioHTML=radioHTML+"<input type='radio' "
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
					radioHTML=radioHTML+"<input type='radio' "
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
			
			{columnname:"Seq<BR>No",dataname:"SEQ_NO",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Check List Code",dataname:"CHK_LIST_CODE",datatype:"string",width:100,hidden:true},
			{columnname:"Check List Header Desc",dataname:"CHK_LIST_NAME",datatype:"string",width:200,hidden:true},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC",datatype:"string",width:230},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO",datatype:"string",width:100,hidden:true},
			{columnname:"Options<BR>Available",dataname:"OPTION_DESCCSV",datatype:"string",width:100,renderer:newCheckListGridRenderFn},
			{columnname:"Answer",dataname:"ANSWER",datatype:"string",editControl:"textbox",width:100,hidden:true},
			
			{columnname:"Seq<BR>No",dataname:"SEQ_NO_NXT",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC_NXT",datatype:"string",width:230},
			{columnname:"Options<BR>Available",dataname:"OPTION_DESCCSV_NXT",datatype:"string",width:100,renderer:newCheckListGridNxtRenderFn},			
			{columnname:"Answer",dataname:"ANSWER_NXT",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO_NXT",datatype:"string",width:100,hidden:true},
			
			{columnname:"Seq<BR>No",dataname:"SEQ_NO_LST",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC_LST",datatype:"string",width:230},
			{columnname:"Options<BR>Available",dataname:"OPTION_DESCCSV_LST",datatype:"string",width:100,renderer:newCheckListGridLstRenderFn},			
			{columnname:"Answer",dataname:"ANSWER_LST",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO_LST",datatype:"string",width:100,hidden:true}
			
					
		]
		chkListSecondGridDetail=
		{ 	
			title:"",
			id:"newCheckListGrid",
			detail:chkListObj1,
			columnWidth:1,
			readonly:true,
			visibleRow:15,
			removeFilter:true,
			groupByField: 'CHK_LIST_NAME',
			removeAddDelete:true,
			removeColumns:true
			
		}
		
		checkListSecondGridSection = plf.addGrid(chkListSecondGridDetail,this)	
		
		
		checkListColumn.add(checkListGridSection);
		checkListColumn.add(plf.addSplitter)
		checkListColumn.add(checkListSecondGridSection);

		//Pre Journey Inspection  Status Section Begins
		plf.columns=4
		preJourneyInspectionStatusColumn = plf.addColumnSection({});	
		preJourneyInspectionStatusCtrl=
		[
			plf.addText({"label":"Inspection Remarks",id:"strInspectionRemarks"}),
			plf.addCombo({"label":"Inspection Result",id:"strInspectionResult"}),
			plf.addBlank(),
			plf.addCombo({"label":"Rejection Reasons",id:"strRejectionReasons"})
		]
		preJourneyInspectionStatusColumn.add(preJourneyInspectionStatusCtrl);
		//Pre Journey Inspection  Status Section Ends
		
		
		//Add Header Section to Main Page
		mainpage.ptrMainSection.add(preJourneyInspectionColumn)
		mainpage.ptrMainSection.add(truckAndDriverColumn) 
		mainpage.ptrMainSection.add(checkListColumn)
		//Add Truck Grid Section to Main Page
		//mainpage.ptrMainSection.add(preJourneyInspectionDriverGridSection) //Add Truck Grid Section to Main Page
	//	mainpage.ptrMainSection.add(checkListGridSection)
		//mainpage.ptrMainSection.add(inspectionInsideFieldset) //Add Inspection Inside Section to Main Page
		//mainpage.ptrMainSection.add(inspectionAroundFieldset) //Add Inspection Around Section to Main Page
		mainpage.ptrMainSection.add(preJourneyInspectionStatusColumn) //Add Inspection Status Section to Main Page
		
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strInspectionNo"],
				"service":"CoreInspectionService",
				"methodName":"initRe-InspectionScrTS"
				//completed
			},
		
			{
				"controlid":"strInspectionNo",
				"tasktype":"onenter",
				"input":["strInspectionNo"],
				"service":"CoreInspectionService",
				"methodName":"fetchRe-InspectionScrTS"
			},
{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strInspectionNo","checkListGrid","strStatus","newCheckListGrid"],
				"service":"CoreInspectionService",
				"methodName":"maintainRe-InspectionScrTS"

			},	
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["strInspectionNo","strInspectionResult","strRejectionReasons"],
				"service":"CoreInspectionService",
				"methodName":"authoriseRe-InspectionScrTS"

			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Reject",
				"input":["strInspectionNo","strTruckCode","strTrailerCode","strDriverCode"],
				"service":"CoreInspectionService",
				"methodName":"rejectRe-InspectionScrTS"

			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print",
				"input":["strInspectionNo"],
				"service":"CoreInspectionService",
				"methodName":"PrintInspectionReport"

			}
		
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
