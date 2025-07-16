Ext.define('CueTrans.view.inspection.InspectionAdviceMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Inspection Advice";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Refresh","Create","Edit","Delete","Authorise","Shortclose","Assign"]
		
		mainpage.toolbarLinks=
		[
			{"name":"Record Inspection","linkid":"ins_RecordInspection"}
		]
		mainpage.keyFields=["strInspectionNo"]
		
		//InspectionMaster Header Section Begins
		plf.columns=4
		inspectionMstrColumn = plf.addColumnSection({});
		inspectionMstrCtrl=
		[   
			plf.addHlpText({"label":"Inspection No",id:"strInspectionNo",hlpLinkID:"inspectionno",inputFormat:"string",InputLength:"60"},this),
			plf.addDateTime({"label":"Inspection Date/Time","mandatory":"true",dateid:"dtInspectionDate",timeid:"iInspectionTime"}),
			plf.addCombo({"label":"Process Code",id:"strProcessCode"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			
			plf.addHidden({"label":"Truck Request No","id":"strTruckRequestNo",inputFormat:"string",InputLength:"60"}),
			plf.addHidden({"label":"Valid From","id":"dtValidFrom"}),
			plf.addHidden({"label":"Valid Till","id":"dtValidTo"}),
			//plf.addBlank()			
		]
		inspectionMstrColumn.add(inspectionMstrCtrl);
		//inspectionMstrColumn.add(plf.addStripLine({}));
		inspectionMstrFieldSt = plf.addColumnSection({title:"Inspection Details"});
		
		inspectionFieldCtrl=
		[	
			plf.addListEdit({"label":"Vehicle Description","id":"strTruckDesc",inputFormat:"string",InputLength:"100"}),
			plf.addHlpText({"label":"Vehicle Code",id:"strTruckCode",hlpLinkID:"truckcode",inputFormat:"string",InputLength:"40"},this),
		//	plf.addText({"label":"Truck Code","id":"strTruckCode",hlpLinkID:"truckcode"}),
		   	plf.addCombo({"label":"Vehicle Documents",id:"strTruckDocuments"}),
			plf.addBlank(),
			
		    plf.addHidden({"label":"Trailer Description","id":"strTrailerDesc",inputFormat:"string",InputLength:"100"}),
			plf.addHidden({"label":"Trailer Code",id:"strTrailerCode",hlpLinkID:"trailercode",inputFormat:"string",InputLength:"40"},this),
			//plf.addHidden({"label":"Trailer Code","id":"strTrailerCode"}),
			//plf.addBlank(),
			//plf.addBlank()
			
		]
		inspectionMstrFieldSt.add(inspectionFieldCtrl);
		
		inspectionDriverFieldSt = plf.addColumnSection({title:""});
		inspectionFieldCtrl1=
		[	
			plf.addListEdit({"label":"Driver Name","id":"strDriverName",inputFormat:"string",InputLength:"100"}),
			plf.addHlpText({"label":"Driver Code",id:"strDriverCode",hlpLinkID:"DriverCode",inputFormat:"string",InputLength:"40"},this),
			
			plf.addCombo({"label":"Driver Documents",id:"strDriverDocuments"}),
			plf.addBlank()		
		]
		inspectionDriverFieldSt.add(inspectionFieldCtrl1);
		
		
	/*	inspectionAssetFieldSt = plf.addFieldSet({title:""});
		inspectionFieldCtrl2=
		[	
			plf.addHlpText({"label":"Asset Code",id:"strAssetCode",hlpLinkID:"AssetCode"},this),
			plf.addDisplayOnly({"label":"Asset Name","id":"strAssetName"}),
			plf.addCombo({"label":"Asset Documents",id:"strAssetDocuments"}),
			plf.addBlank()		
		]
		inspectionAssetFieldSt.add(inspectionFieldCtrl2);*/
		
		
		inspectionCustFieldSt = plf.addColumnSection({title:""});
		inspectionFieldCtrl3=
		[	
			plf.addListEdit({"label":"Customer Name","id":"strCustomerName",inputFormat:"string",InputLength:"100"}),
			plf.addHlpText({"label":"Customer Code","id":"strCustomerCode",hlpLinkID:"CustomerCode",inputFormat:"string",InputLength:"40"},this),
			
			plf.addBlank(),
			plf.addBlank()		
		]
		inspectionCustFieldSt.add(inspectionFieldCtrl3);
		
		inspectionOtherFieldSt = plf.addColumnSection({title:""});
		inspectionFieldCtrl4=
		[	
			plf.addText({"label":"Audit For","id":"strAuditFor",inputFormat:"string",InputLength:"250"}),
			plf.addText({"label":"Audit Remarks","id":"strAuditRemarks",inputFormat:"string",InputLength:"250"}),
			plf.addFileUpload({"label":"Attach File",id:"strFileAttach",Entity:"Inspection_Advice\\File_Attachment"})
				
		]
		inspectionOtherFieldSt.add(inspectionFieldCtrl4);
		
		//inspectionMstrFieldSt.add(plf.addStripLine({}));
		//InspectionMaster Header Section Ends
		
		assignInspectorObj=
		[
			
			{columnname:"Step Name",dataname:"STEP_NAME",datatype:"string",editControl:"addDisplayOnly",width:200},
			{columnname:"Step sequence No",dataname:"SEQNO",datatype:"string",editControl:"addDisplayOnly",width:200,hidden:true},//iterate2
			{columnname:"Date",dataname:"STEP_DATE",datatype:"string",editControl:"date",width:150},
			{columnname:"Time",dataname:"STEP_TIME",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Inspector Name",dataname:"INSPECTOR_NAME",datatype:"string",editControl:"combo",width:150,storeId:"strInspectorName"},
			{columnname:"Inspection Point",dataname:"INSPECTION_POINT",datatype:"string",editControl:"textbox",width:150,inputFormat:"string",InputLength:"40"},
			{columnname:"Status",dataname:"ASSIGN_STATUS",datatype:"string",width:150}
		]
		inspectionassignGridDtl=
		{
			//title:"Item Details",
			id:"assignCache",
			detail:assignInspectorObj,
			visibleRow:5,
			removeAddDelete:true
			
		}
		
		var passAssignDocDtl =  plf.addCollapseSection({title:"Assign Inspector",collapsed:false})
		inspectionAssignGridSection = plf.addGrid(inspectionassignGridDtl)	
		passAssignDocDtl.add(inspectionAssignGridSection)
		
		//InspectionMaster Grid Section Begins
		inspectionFieldObj=
		[
			
			{columnname:"Reference Type",dataname:"REFERENCE_TYPE",datatype:"string",editControl:"combo",width:200,storeId:"strReferenceType"},
			{columnname:"Reference No",dataname:"REFERENCE_NO",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Attach Document",dataname:"ATTACH_DOCUMENT",datatype:"string",width:150,editControl:"fileupload",fileGroup:"Inspection_Advice\\Reference_Documents",width:175}
			
		]
		inspectionMstrGridDtl=
		{
			//title:"Item Details",
			id:"inspectionCache",
			detail:inspectionFieldObj
		}
		
		var passRefDocDtl =  plf.addCollapseSection({title:"Reference Details",collapsed:true})
		inspectionMstrGridSection = plf.addGrid(inspectionMstrGridDtl,this)	
		passRefDocDtl.add(inspectionMstrGridSection)
		//InspectionMaster Grid Section Ends
		
		mainpage.ptrMainSection.add(inspectionMstrColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(inspectionMstrFieldSt)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(inspectionDriverFieldSt)//Add Header Section to Main Page
		//mainpage.ptrMainSection.add(inspectionAssetFieldSt)//Add Header Section to Main Page
		//mainpage.ptrMainSection.add(inspectionCustFieldSt)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(inspectionOtherFieldSt)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(passAssignDocDtl)
		mainpage.ptrMainSection.add(passRefDocDtl)
		
		//Add Grid Section to Main Page
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		
		      
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strInspectionNo"],
				"service":"CoreInspectionsService",
				"methodName":"initInspectionAdviceScrTS"
				//completed
			},	
			
			{
				"controlid":"strInspectionNo",
				"tasktype":"onenter",
				"input":["strInspectionNo"],
				"service":"CoreInspectionsService",
				"methodName":"fetchInspectionDetailsTS"
				//completed
			},	
			{
				"controlid":"strTruckCode",
				"tasktype":"onenter",
				"input":["strTruckCode"],
				"service":"CoreInspectionsService",
				"methodName":"fetchTruckDetailsTS"
				//completed
			},	
			{
				"controlid":"strTrailerCode",
				"tasktype":"onenter",
				"input":["strTrailerCode"],
				"service":"CoreInspectionsService",
				"methodName":"fetchTrailerDetailsTS"
				//completed
			},	
			
			{
				"controlid":"strDriverCode",
				"tasktype":"onenter",
				"input":["strDriverCode"],
				"service":"CoreInspectionsService",
				"methodName":"fetchDriverDetailsTS"
				//completed
			},	
			{
				"controlid":"strCustomerCode",
				"tasktype":"onenter",
				"input":["strCustomerCode"],
				"service":"CoreInspectionsService",
				"methodName":"fetchCustomerDetailsTS"
				//completed
			},	
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Create",
				    "input":["strInspectionNo","dtInspectionDate","iInspectionTime","strTruckRequestNo","strTruckCode","strDriverCode",
				    "inspectionCache","strTrailerCode","strTrailerDesc","strCustomerCode","dtValidFrom","dtValidTo","strTruckDocuments",
					"strDriverDocuments","strAssetCode","strAssetName","strAssetDocuments","strAuditFor","strAuditRemarks","assignCache","strProcessCode","strFileAttach"],
					"service":"CoreInspectionsService",
					"methodName":"createInspectionAdviceTS"
					//completed
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Edit",
				    "input":["strInspectionNo","dtInspectionDate","iInspectionTime","strTruckRequestNo","strTruckCode","strDriverCode",
				    "inspectionCache","strTrailerCode","strTrailerDesc","strCustomerCode","dtValidFrom","dtValidTo","strTruckDocuments",
					"strDriverDocuments","strAssetCode","strAssetName","strAssetDocuments","strAuditFor","strAuditRemarks","assignCache","strProcessCode","strInspectionNo","strFileAttach"],
					"service":"CoreInspectionsService",
					"methodName":"editInspectionAdviceTS"
					
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Authorise",
				    "input":["strInspectionNo","dtInspectionDate","iInspectionTime","strTruckRequestNo","strTruckCode","strDriverCode",
				    "inspectionCache","strTrailerCode","strTrailerDesc","strCustomerCode","dtValidFrom","dtValidTo","strTruckDocuments",
					"strDriverDocuments","strAssetCode","strAssetName","strAssetDocuments","strAuditFor","strAuditRemarks","assignCache","strProcessCode","strInspectionNo","strFileAttach"],
					"service":"CoreInspectionsService",
					"methodName":"authoriseInspectionAdviceTS"
					
			},
		
			{
					"controlid":"strProcessCode",
					"tasktype":"onchange",
					"input":["strProcessCode"],
					"service":"CoreInspectionsService",
					"methodName":"fetchProcessStepsTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Delete",
				    "input":["strInspectionNo","dtInspectionDate","iInspectionTime","strTruckRequestNo","strTruckCode","strDriverCode",
				    "inspectionCache","strTrailerCode","strTrailerDesc","strCustomerCode","dtValidFrom","dtValidTo","strTruckDocuments",
					"strDriverDocuments","strAssetCode","strAssetName","strAssetDocuments","strAuditFor","strAuditRemarks","assignCache","strProcessCode","strInspectionNo","strFileAttach"],
					"service":"CoreInspectionsService",
					"methodName":"deleteInspectionAdviceTS"
					
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Shortclose",
				    "input":["strInspectionNo","dtInspectionDate","iInspectionTime","strTruckRequestNo","strTruckCode","strDriverCode",
				    "inspectionCache","strTrailerCode","strTrailerDesc","strCustomerCode","dtValidFrom","dtValidTo","strTruckDocuments",
					"strDriverDocuments","strAssetCode","strAssetName","strAssetDocuments","strAuditFor","strAuditRemarks","assignCache","strProcessCode","strInspectionNo","strFileAttach"],
					"service":"CoreInspectionsService",
					"methodName":"shortCloseInspectionAdviceTS"
					
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Assign",
				    "input":["assignCache","strInspectionNo","strProcessCode"],
					"service":"CoreInspectionsService",
					"methodName":"assignInspectionAdviceTS"
					
			}
	
					
	];
	
		mainpage.hlpLinks=
		{
			"inspectionno":
				{
					"hlpType":"Header",
					"hlpScreen":"inspection.InspectionHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strInspectionNo","child":"INSPECTION_NO"}
							]
				},
				/*
				"truckrequestno":
				{
					"hlpType":"Header",
					"hlpScreen":"VehicleRequest.VehicleRequestHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTruckRequestNo","child":"VEHICLE_REQUEST_NO"}
							]
				},
				*/
				
				"truckcode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTruckCode","child":"TRUCK_CODE"},
							{"parent":"strTruckDesc","child":"TRUCK_DESC"}
							]
				}
				/*	,
					"trailercode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTrailerCode","child":"TRUCK_CODE"},
							{"parent":"strTrailerDesc","child":"TRUCK_DESC"}
							]
				}
				*/,
				"DriverCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strDriverCode","child":"DRIVER_CODE"},
							{"parent":"strDriverName","child":"DRIVER_NAME"}
							]
				},
				"CustomerCode":
				{
				  "hlpType":"Header",
					"hlpScreen":"jm_master.CustomerHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCustomerCode","child":"CUST_CODE"},
							{"parent":"strCustomerName","child":"CUST_NAME"}
							]
				
				}
				
				
				
				
				
		}
		
		mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":[""]
			},
			"locked":
			{
				"enableAll":false,
				"except":["strInspectionNo"]
			}
					
		}
		
		mainpage.screenLinks=
		{
			"ins_RecordInspection":
				{
					"dest":"inspection.RecordInspection",
					"hdr":[
							{"src":"strInspectionNo","dest":"strInspectionNo"}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
			
				
		}
		
		//To for an empty Inspection ADvice Screen
		//Event Handlers Mapping Ends
		
		//Generate Screen Section
		/*mainpage.generateScreen();
		
		
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
