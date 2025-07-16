/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
		                                   
************************************************************************************************/
Ext.define('CueTrans.view.peoplelogistics.TravelRequestComplaince', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Travel Request Compliance & Approval";
		//mainpage.liveScreenFlag=false;
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Approve",
                "tooltip": "Click here to approve travel request."
            },
			{
                "name": "Reject",
                "tooltip": "Click here to reject travel request."
            },
			{
                "name": "Return",
                "tooltip": "Click here to return travel request."
            },
            ]
		
		//Add Keyfields
		mainpage.keyFields=["strTravelRequestNo"]
		
		//Travel Request Header Section starts
		plf.columns=4
		var travelRequestColumn = plf.addColumnSection({});

		var travelrequestFormCtrl=
		[
 	        plf.addHlpText({"label":"Travel Request No",id:"strTravelRequestNo",hlpLinkID:"TravelRequestNo",inputFormat:"string",InputLength:"40"},this),	
     		plf.addDisplayOnly({"label":"Travel Request Date",id:"dtTravelReqDate"}),
			plf.addDisplayOnly({"label":"Purpose","id":"strPurpose"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),			
			plf.addDisplayOnly({"label":"Traveller Code",id:"strTravellerCode"}),
			plf.addDisplayOnly({"label":"Traveller Name","id":"strTravellerName"}),			
			plf.addDisplayOnly({"label":"Traveller Type",id:"strTravellerType"}),
			plf.addDisplayOnly({"label":"Grade",id:"strGrade"}),
			plf.addDisplayOnly({"label":"Starting Location",id:"strOrigin"}),
			plf.addDisplayOnly({"label":"Destination Location",id:"strDestination"}),
			plf.addDisplayOnly({"label":"Reporting Date/Time","id":"dtReportDateTime"}),			
			plf.addDisplayOnly({"label":"Return Date/Time",id:"dtReturnDateTime"}),
			plf.addDisplayOnly({"label":"Travel Type",id:"strTravelType"}),
			plf.addDisplayOnly({"label":"Approver Name","id":"strApproverName"}),
			plf.addDisplayOnly({"label":"Project Code",id:"strProjectCode"}),
			plf.addDisplayOnly({"label":"Project Description","id":"strProjectDesc"}),
			plf.addDisplayOnly({"label":"Meal Preference","id":"strMealPreference"}),
			plf.addText({"label":"Remarks",id:"strRemarks"}),
					
		]
		
		travelRequestColumn.add(travelrequestFormCtrl);
		
		//Travel Request Grid Section Begins
		var trvelRequestDetailsGridFieldObj=
		[
			{columnname:"Location",dataname:"LOCATION",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Date",dataname:"DATE",datatype:"string",editControl:"date",width:150},
			{columnname:"Time",dataname:"TIME",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Stay Duration (Days)",dataname:"DAYS",datatype:"string",width:150,editControl:"textbox"}			
		]
		var travelRequestDetailsGridDtl=
		{
			title:"",
			id:"travelRequest",
			detail:trvelRequestDetailsGridFieldObj,
			widthBasis:"flex",
			visibleRow:5,
			removeTbar:true,
		}
		var traReqDtl =  plf.addCollapseSection({title:"Multi Leg Travel",collapsed:true})
		var travelRequestDetailsGridSection = plf.addGrid(travelRequestDetailsGridDtl,this)
		traReqDtl.add(travelRequestDetailsGridSection)
		
		var compdtlGridFieldObj=
		[
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:120},
			{columnname:"Criticality",dataname:"CRITICALITY",datatype:"string",width:150},
			{columnname:"Document No",dataname:"DOC_NO",datatype:"string",width:150},
			{columnname:"Effective From",dataname:"EFF_FROM",datatype:"string",width:150},
			{columnname:"Effective To",dataname:"EFF_TO",datatype:"string",width:160},
			{columnname:"Attachment",dataname:"ATTACHMENT",datatype:"date",width:160},
			{columnname:"Compliance",dataname:"COMPLAINCE",datatype:"string",width:200},
			{columnname:"Approval",dataname:"APPROVAL",datatype:"string",width:160,storeId:"strApproval",editControl:"combo"},
			//{columnname:"Approved By",dataname:"APPROVED_BY",datatype:"string",width:160},
			//{columnname:"Approved Date",dataname:"APPROVED_DATE",datatype:"string",width:160}
		
		]
		var compdtlGridDtl=
		{
			title:"",
			id:"compdtl",
			detail:compdtlGridFieldObj,
			widthBasis:"flex",
			readonly:true,
			visibleRow:5,
			removeTbar:true
		}
			
		var travelcompdtl =  plf.addCollapseSection({title:"Compliance Details",collapsed:false})
		var travelDetailMapGridSection = plf.addGrid(compdtlGridDtl,this)
		travelcompdtl.add(travelDetailMapGridSection)
		
		
		//Travel Request Approval History Section Begins
		var trvelRequestAppGridFieldObj=
		[
			//{columnname:"Designation",dataname:"DESIGNATION",datatype:"string",width:100},
			{columnname:"Name",dataname:"NAME",datatype:"string",width:150},
			{columnname:"Date",dataname:"DATE",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:150}			
		]
		var travelRequestAppGridDtl=
		{
			title:"",
			id:"travelRequestApp",
			detail:trvelRequestAppGridFieldObj,
			widthBasis:"flex",
			readonly:"true",
			visibleRow:5,
			removeTbar:true
		}
		var traReqAppDtl =  plf.addCollapseSection({title:"Approval History",collapsed:false})
		var travelRequestAppGridSection = plf.addGrid(travelRequestAppGridDtl,this)
		traReqAppDtl.add(travelRequestAppGridSection)
		
		
		//Add Child Sections
		mainpage.ptrMainSection.add(travelRequestColumn) //Add Grid Section to Main Page
		mainpage.ptrMainSection.add(traReqDtl)
		mainpage.ptrMainSection.add(travelcompdtl)
		mainpage.ptrMainSection.add(traReqAppDtl)
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		mainpage.eventHandlers = 
			[	
				{
					"controlid":"",
					"tasktype":"onload",
					"input":["strTravelRequestNo"],
					"service":"PPLCoreTS",
					"methodName":"initTravelReqAppTS"
				},
				{
					"controlid":"strTravelRequestNo",
					"tasktype":"onenter",
					"input":["strTravelRequestNo"],
					"service":"PPLCoreTS",
					"methodName":"fetchTravelReqAppSummTS"
				},
				{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Approve",
					"input":["strTravelRequestNo","strRemarks","compdtl"],
					"service":"PPLCoreTS",
					"methodName":"approveTravelReqAppTS"
				},
				{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Reject",
					"input":["strTravelRequestNo","strRemarks","compdtl"],
					"service":"PPLCoreTS",
					"methodName":""
				}
				
			];		
		
		mainpage.hlpLinks=
		{
		
			"TravelRequestNo":
				{
					"hlpType":"Header",
					"hlpScreen":"peoplelogistics.TravelRequestApprovalHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTravelRequestNo","child":"TRAVEL_REQ_NO"}
							]
				},
				/*"truckownercode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"CARRIER_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strTruckOwnerCode","child":"OWNER_CODE_3PL"}
							//{"parent":"strTruckOwnerName","child":"OWNER_NAME_3PL"},
							//{"parent":"3PLOwnerPhoneNo","child":"PHONE1"}
							]
				},
				"trailercode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTrailerCode","child":"TRUCK_CODE"},
							{"parent":"strTrailerDescription","child":"TRUCK_DESC"}
							]
				},
				
			"supplierCode":
				{
					"hlpType":"grid",
					"gridID":"ivmsGrid",
					"hlpScreen":"jm_master.SupplierHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					{"parent":"IVMS_VENDOR_CODE","child":"SUPPLIER_CODE"}
					//,{"parent":"CONSTRAINT_DESC","child":"CONSTRAINT_DESC"}
							]
				},
                      "baseloc":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"LOCATION_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strLocCode","child":"LOC_NAME"}
						    ]
				}
				
		*/		
		}
		
		
		this.callParent(arguments);
		
	}
});
