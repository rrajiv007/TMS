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
		
		mainpage.toolbarLinks=
		[
			{"name":"Record Inspection","linkid":"ins_RecordInspection","tooltip": "Click here to record inspection."}
		]
		
		mainpage.toolbarActions=
		[
				{
					"name": "Create",
					"tooltip": "Click here to create inspection advice."
				},
				{
					"name": "Edit",
					"tooltip": "Click here to edit inspection advice."
				},
				{
					"name": "Delete",
					"tooltip": "Click here to delete inspection advice."
				},
				{
					"name": "Confirm",
					"tooltip": "Click here to confirm inspection advice."
				},
				{
					"name": "Shortclose",
					"tooltip": "Click here to shortclose inspection advice."
				},
				{
					"name": "Assign",
					"tooltip": "Click here to assign inspector to inspection advice."
				}
				
			]
			
		mainpage.keyFields=["strInspectionNo"]
		
		//InspectionMaster Header Section Begins
		plf.columns=4
		var inspectionMstrColumn = plf.addColumnSection({});					//69997
		var inspectionMstrCtrl=													//69997
		[   
			plf.addHlpText({"label":"Inspection No",id:"strInspectionNo",hlpLinkID:"inspectionno",inputFormat:"string",InputLength:"60"},this),
			plf.addDateTime({"label":"Inspection Date/Time","mandatory":"true",dateid:"dtInspectionDate",timeid:"iInspectionTime"}),
			plf.addCombo({"label":"Process Code",id:"strProcessCode","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			//plf.addHlpText({"label":"Location Code",id:"strInspLocCode","mandatory":"true"}),
			//plf.addDisplayOnly({"label":"Location Name",id:"strInspLocName"}),
						
		]
		inspectionMstrColumn.add(inspectionMstrCtrl);
		var inspectionMstrFieldSt = plf.addColumnSection({title:"Inspection Details"});						//69997
		
		var inspectionFieldCtrl=															//69997
		[	
			plf.addListEdit({"label":"Vehicle Description","id":"strTruckDesc",inputFormat:"string",InputLength:"100"}),
			plf.addHlpText({"label":"Vehicle Code",id:"strTruckCode",hlpLinkID:"truckcode",inputFormat:"string",InputLength:"40","mandatory":"true"},this),
			plf.addListEdit({"label":"Driver Name","id":"strDriverName",inputFormat:"string",InputLength:"100"}),
			plf.addHlpText({"label":"Driver Code",id:"strDriverCode",hlpLinkID:"DriverCode",inputFormat:"string",InputLength:"40","mandatory":"true"},this),
		
			
		]
		inspectionMstrFieldSt.add(inspectionFieldCtrl);
		
		
		var assignInspectorObj=														//69997
		[
			
			{columnname:"Step Name",dataname:"STEP_NAME",datatype:"string",editControl:"addDisplayOnly",width:200},
			{columnname:"Step sequence No",dataname:"SEQNO",datatype:"string",editControl:"addDisplayOnly",width:200,hidden:true},//iterate2
			{columnname:"Date",dataname:"STEP_DATE",datatype:"string",editControl:"date",width:150},
			{columnname:"Time",dataname:"STEP_TIME",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Inspector Name",dataname:"INSPECTOR_NAME",datatype:"string",editControl:"combo",width:150,storeId:"strInspectorName"},
			{columnname:"Inspection Point",dataname:"INSPECTION_POINT",datatype:"string",editControl:"textbox",width:150,inputFormat:"string",InputLength:"40"},
			{columnname:"Status",dataname:"ASSIGN_STATUS",datatype:"string",width:150}
		]
		var inspectionassignGridDtl=													//69997
		{
			//title:"Item Details",
			id:"assignCache",
			detail:assignInspectorObj,
			visibleRow:5,
			removeAddDelete:true
			
		}
		
		var passAssignDocDtl =  plf.addCollapseSection({title:"Assign Inspector",collapsed:false})
		var inspectionAssignGridSection = plf.addGrid(inspectionassignGridDtl)	//69997
		passAssignDocDtl.add(inspectionAssignGridSection)
		
		//InspectionMaster Grid Section Begins
		var inspectionFieldObj=														//69997
		[
			
			{columnname:"Reference Type",dataname:"REFERENCE_TYPE",datatype:"string",editControl:"combo",width:200,storeId:"strReferenceType"},
			{columnname:"Reference No",dataname:"REFERENCE_NO",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Attach Document",dataname:"ATTACH_DOCUMENT",datatype:"string",width:150,editControl:"fileupload",fileGroup:"Inspection_Advice\\Reference_Documents",width:175}
			
		]
		var inspectionMstrGridDtl=							//69997
		{
			//title:"Item Details",
			id:"inspectionCache",
			detail:inspectionFieldObj
		}
		
		var passRefDocDtl =  plf.addCollapseSection({title:"Reference Details",collapsed:true})
		var inspectionMstrGridSection = plf.addGrid(inspectionMstrGridDtl,this)					//69997
		passRefDocDtl.add(inspectionMstrGridSection)
		//InspectionMaster Grid Section Ends
		
		mainpage.ptrMainSection.add(inspectionMstrColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(inspectionMstrFieldSt)//Add Header Section to Main Page
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
			/*	
			{
				"controlid":"strTrailerCode",
				"tasktype":"onenter",
				"input":["strTrailerCode"],
				"service":"CoreInspectionsService",
				"methodName":"fetchTrailerDetailsTS"
				//completed
			},	
			*/
			{
				"controlid":"strDriverCode",
				"tasktype":"onenter",
				"input":["strDriverCode"],
				"service":"CoreInspectionsService",
				"methodName":"fetchDriverDetailsTS"
				//completed
			},	
			/*
			{
				"controlid":"strCustomerCode",
				"tasktype":"onenter",
				"input":["strCustomerCode"],
				"service":"CoreInspectionsService",
				"methodName":"fetchCustomerDetailsTS"
				//completed
			},
			*/		
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Create",
				    "input":["strInspectionNo","dtInspectionDate","iInspectionTime","strTruckCode","strDriverCode",
				    "inspectionCache","strProcessCode","assignCache"],
					"service":"CoreInspectionsService",
					"methodName":"createInspectionAdviceTS"
					//completed
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Edit",
				    "input":["strInspectionNo","dtInspectionDate","iInspectionTime","strTruckCode","strDriverCode",
				    "inspectionCache","strProcessCode","assignCache"],
					"service":"CoreInspectionsService",
					"methodName":"editInspectionAdviceTS"
					
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Confirm",
				    "input":["strInspectionNo","dtInspectionDate","iInspectionTime","strTruckCode","strDriverCode",
				    "inspectionCache","strProcessCode","assignCache"],
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
				    "input":["strInspectionNo","dtInspectionDate","iInspectionTime","strTruckCode","strDriverCode",
				    "inspectionCache","strProcessCode","assignCache"],
					"service":"CoreInspectionsService",
					"methodName":"deleteInspectionAdviceTS"
					
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Shortclose",
				    "input":["strInspectionNo","dtInspectionDate","iInspectionTime","strTruckCode","strDriverCode",
				    "inspectionCache","strProcessCode","assignCache"],
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
				}
				/*		
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
				*/
				
				
				
				
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
