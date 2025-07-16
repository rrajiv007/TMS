/*57213,57215*/
//newCheckListGrid
//>>MTLFetchChkList - query type
//MTLProcessChkList - mtl process
Ext.define('CueTrans.view.journey_management.PreJourneyInspection', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Vehicle Inspection";
		
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
                "name": "Reject",
                "tooltip": "Click here to reject an inspection."
            },
			{
                "name": "Confirm",
                "tooltip": "Click here to confirm an inspection."
            },
            {
                "name": "ReInspect",
                "tooltip": "Click here to send the inspection for reinspection."
            },
            {
                "name": "Print",
                "tooltip": "Click here to print the inspection."
            }
           
            ]
		//mainpage.toolbarActions=["Save","Reject","Confirm","ReInspect","Print"]
		//Pre Journey Inspection  Header Section Begins
		plf.columns=4
		preJourneyInspectionColumn = plf.addColumnSection({});	
		
		preJourneyInspectionCtrl=
		[
		    plf.addHlpText({"label":"Inspection No",id:"strInspectionNo","mandatory":"true",hlpLinkID:"inspectionno"},this),
			plf.addDateTime({"label":"Inspection Date/Time",dateid:"dtInspectionDate",timeid:"iInspectionTime"}),
			//plf.addDisplayOnly({"label":"Inspection Date",id:"dtInspectionDate"}),
			//plf.addDisplayOnly({"label":"Inspection Time",id:"iInspectionTime"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			plf.addDisplayOnly({"label":"Vehicle Category","id":"strVehicleCategory"}),
			plf.addDisplayOnly({"label":"Carrier Name","id":"strCarrierName"}),
			plf.addDisplayOnly({"label":"Vehicle Regn No","id":"strRegNo"}),
			 
			plf.addDisplayOnly({"label":"Vehicle Code",id:"strTruckCode"}),
			plf.addDisplayOnly({"label":"Vehicle Description",id:"strTruckDesc"}),
			//plf.addDisplayOnly({"label":"Driver Code",id:"strDriverCode"}),
			plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
			plf.addDisplayOnly({"label":"Trailer Code",id:"strTrailerCode"}), 
			plf.addDisplayOnly({"label":"Trailer Description",id:"strTrailerDesc"}),			
			plf.addDisplayOnly({"label":"Last Inspection Date",id:"dtLastInspectionDate"}),
			plf.addDisplayOnly({"label":"Last Ins. Remarks",id:"strLastInspectionRemarks"}),
			plf.addDisplayOnly({"label":"Request No",id:"strRequestNo"}),	
			plf.addDisplayOnly({"label":"Load No",id:"strLoadNo"})
		]
		preJourneyInspectionColumn.add(preJourneyInspectionCtrl);
		preJourneyInspectionColumn.add(plf.addStripLine({}));
		//Pre Journey Inspection  Header Section Ends
		
		
		//Pre Journey Inspection Truck Document Grid Section Begins
		TruckGridFieldObj=
		[
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:188},
			{columnname:"Document No",dataname:"DOC_NO",datatype:"string",width:140},
			{columnname:"Expiry Date",dataname:"EXPIRTY_DT",datatype:"string",width:110},
			{columnname:"Issued By",dataname:"ISSUED_BY",datatype:"string",width:110}
		]
		truckGridDtl=
		{
			title:"Truck Documents",
			id:"preJourneyTruck",
			columnWidth:0.5,
			detail:TruckGridFieldObj,
			visibleRow:6,	
			readonly:true,
			removeFilter:true,
			removeTbar:true

		}
	   TruckGridSection = plf.addGrid(truckGridDtl,this)	
	   
		//Pre Journey Inspection Truck Document Grid Section Ends
		
		//Pre Journey Inspection Driver Document Grid Section Begins
		preJourneyInspectionDriverGridFieldObj=
		[
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:188},
			{columnname:"Document No",dataname:"DOC_NO",datatype:"string",width:140},
			{columnname:"Issue Date",dataname:"DOC_ISSUE_DT",datatype:"string",width:110},
			{columnname:"Expiry Date",dataname:"DOC_EXPIRY_DT",datatype:"string",width:110}
		]
		driverGridDtl=
		{
			title:"Driver Documents",
			id:"preJourneyDriver",
			columnWidth:0.5,
			detail:preJourneyInspectionDriverGridFieldObj,
			visibleRow:6,			
			readonly:true,
			removeFilter:true,
			removeTbar:true				
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
				
			{columnname:"No",dataname:"SEQ_NO",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Check List Code",dataname:"CHK_LIST_CODE",datatype:"string",width:100,hidden:true},
			{columnname:"Check List Header Desc",dataname:"CHK_LIST_NAME",datatype:"string",width:200,hidden:true},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC",datatype:"string",width:230},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO",datatype:"string",width:100,hidden:true},
			{columnname:"Options",dataname:"OPTION_DESCCSV",datatype:"string",width:100,renderer:checkListOptionRenderFn},
			{columnname:"Answer",dataname:"ANSWER",datatype:"string",editControl:"textbox",width:100,hidden:true},
			
			{columnname:"No",dataname:"SEQ_NO_NXT",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC_NXT",datatype:"string",width:230},
			{columnname:"Options",dataname:"OPTION_DESCCSV_NXT",datatype:"string",width:100,renderer:checkListOptionNxtRenderFn},			
			{columnname:"Answer",dataname:"ANSWER_NXT",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO_NXT",datatype:"string",width:100,hidden:true},
			
			{columnname:"No",dataname:"SEQ_NO_LST",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC_LST",datatype:"string",width:230},
			{columnname:"Options",dataname:"OPTION_DESCCSV_LST",datatype:"string",width:100,renderer:checkListOptionLstRenderFn},			
			{columnname:"Answer",dataname:"ANSWER_LST",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO_LST",datatype:"string",width:100,hidden:true}
			
		
		]
		chkListGridDetail=
		{
			//title:"PreLoad-1",
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
		
		checkListGridSection = plf.addGrid(chkListGridDetail,this)	
		
		//Second Check List Grid
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
			/*
			{columnname:"Check List Code",dataname:"CHK_LIST_CODE",datatype:"string",width:100,hidden:true},
			{columnname:"Check List Header Desc",dataname:"CHK_LIST_NAME",datatype:"string",width:200,hidden:true},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC",datatype:"string",width:200},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO",datatype:"string",width:100,hidden:true},
			{columnname:"Options",dataname:"OPTION_DESCCSV",datatype:"string",width:300,renderer:newCheckListGridRenderFn},
			{columnname:"Answer",dataname:"ANSWER",datatype:"string",editControl:"textbox",width:100,hidden:true}
			*/
			{columnname:"No",dataname:"SEQ_NO",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Check List Code",dataname:"CHK_LIST_CODE",datatype:"string",width:100,hidden:true},
			{columnname:"Check List Header Desc",dataname:"CHK_LIST_NAME",datatype:"string",width:200,hidden:true},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC",datatype:"string",width:230},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO",datatype:"string",width:100,hidden:true},
			{columnname:"Options",dataname:"OPTION_DESCCSV",datatype:"string",width:100,renderer:newCheckListGridRenderFn},
			{columnname:"Answer",dataname:"ANSWER",datatype:"string",editControl:"textbox",width:100,hidden:true},
			
			{columnname:"No",dataname:"SEQ_NO_NXT",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC_NXT",datatype:"string",width:230},
			{columnname:"Options",dataname:"OPTION_DESCCSV_NXT",datatype:"string",width:100,renderer:newCheckListGridNxtRenderFn},			
			{columnname:"Answer",dataname:"ANSWER_NXT",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO_NXT",datatype:"string",width:100,hidden:true},
			
			{columnname:"No",dataname:"SEQ_NO_LST",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC_LST",datatype:"string",width:230},
			{columnname:"Options",dataname:"OPTION_DESCCSV_LST",datatype:"string",width:100,renderer:newCheckListGridLstRenderFn},			
			{columnname:"Answer",dataname:"ANSWER_LST",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO_LST",datatype:"string",width:100,hidden:true}
			
			
		]
		chkListGridDetail1=
		{
			title:"Vehicle Inspection Checklist: Non-critical",
			id:"newCheckListGrid",
			detail:chkListObj1,
			columnWidth:1,
			visibleRow:15,
			//groupByField: 'CHK_LIST_NAME',
			removeAddDelete:true,
			readonly:true,
			removeFilter:true,
			removeColumns:true

		}
	
		checkListGridSection1 = plf.addGrid(chkListGridDetail1,this)
		//Second chk list code ends
		checkListColumn = plf.addColumnSection({title:"Vehicle Inspection Checklist: Critical"});
		checkListColumn.add(checkListGridSection)
		checkListColumn.add(plf.addSplitter)
		checkListColumn.add(checkListGridSection1)
		
		
		
		

		//Pre Journey Inspection  Status Section Begins
		plf.columns=4
		preJourneyInspectionStatusColumn = plf.addColumnSection({});	
		preJourneyInspectionStatusCtrl=
		[
			plf.addText({"label":"Inspection Remarks",id:"strInspectionRemarks"}),
			plf.addCombo({"label":"Inspection Result",id:"strInspectionResult"}),
			plf.addBlank(),
			plf.addCombo({"label":"Rejection Reasons",id:"strRejectionReasons"}),
		]
		preJourneyInspectionStatusColumn.add(preJourneyInspectionStatusCtrl);
		//Pre Journey Inspection  Status Section Ends
		
		
		//Add Header Section to Main Page
		mainpage.ptrMainSection.add(preJourneyInspectionColumn)
		mainpage.ptrMainSection.add(truckAndDriverColumn) //Add Truck Grid Section to Main Page
		//mainpage.ptrMainSection.add(preJourneyInspectionDriverGridSection) //Add Truck Grid Section to Main Page
	//	mainpage.ptrMainSection.add(checkListGridSection)
	    mainpage.ptrMainSection.add(checkListColumn)
	
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
				"input":["strInspectionNo","strTruckCode"],
				"service":"CoreInspectionService",
				"methodName":"initPre-InspectionScrTS"
				//completed
			},
		
			{
				"controlid":"strInspectionNo",
				"tasktype":"onenter",
				//"input":["strInspectionNo","strTruckCode"],
				"service":"CoreInspectionService",
				"methodName":"fetchPre-InspectionScrTS"
				//completed
			},
           {
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strInspectionNo","checkListGrid","strStatus","strInspectionRemarks","newCheckListGrid","strTruckCode","strImages"],
				"service":"CoreInspectionService",
				"methodName":"maintainPre-InspectionScrTS"
				//completed

			},	
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["strInspectionNo","strInspectionResult","strTruckCode","strInspectionRemarks","iSeqNo","checkListGrid","newCheckListGrid"],
				"service":"CoreInspectionService",
				"methodName":"authorizePre-InspectionScrTS"
				//completed

			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Reject",
				"input":["strInspectionNo","strInspectionResult","strRejectionReasons","strTruckCode","strTrailerCode","strDriverCode"],
				"service":"CoreInspectionService",
				"methodName":"rejectPre-InspectionScrTS"
				//completed

			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"ReInspect",
				"input":["strInspectionNo","checkListGrid","strInspectionResult"],
				"service":"CoreInspectionService",
				"methodName":"reInspectPre-InspectionScrTS"
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
				},
				"transreqno":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.TransRequestItemHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRequestNo","child":"TRANS_REQ_NO"}
							]
				},
				"LoadNo":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.LoadBuildingHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strLoadNo","child":"LOAD_NO"}
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
