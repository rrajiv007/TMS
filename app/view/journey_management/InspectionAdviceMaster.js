/*
  57214,
  57187
  */
Ext.define('CueTrans.view.journey_management.InspectionAdviceMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Inspection Advice";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Refresh","Create","Edit","Delete","Confirm","Shortclose"]
		
		mainpage.toolbarLinks=
		[
			{"name":"Assign a Inspector","linkid":"ins_AssignInspector"}
		]
		mainpage.keyFields=["strInspectionNo"]
		
		//InspectionMaster Header Section Begins
		plf.columns=4
		inspectionMstrColumn = plf.addColumnSection({});
		inspectionMstrCtrl=
		[   
		
		    plf.addHlpText({"label":"Inspection No",id:"strInspectionNo",hlpLinkID:"inspectionno",inputFormat:"string",InputLength:"80"},this),
			//plf.addText({"label":"Inspection No","id":"strInspectionNo","mandatory":"true"}),
			plf.addDate({"label":"Inspection Date","id":"dtInspectionDate","mandatory":"true"}),
			plf.addText({"label":"Inspection Time","id":"iInspectionTime","mandatory":"true",Increment:"10"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			plf.addText({"label":"Truck Request No","id":"strTruckRequestNo",inputFormat:"string",InputLength:"80"})
			
			
		]
		inspectionMstrColumn.add(inspectionMstrCtrl);
		//inspectionMstrColumn.add(plf.addStripLine({}));
		inspectionMstrFieldSt = plf.addColumnSection({title:"Truck Request Details"});
		
		inspectionFieldCtrl=
		[	
		    plf.addListEdit({"label":"Truck Description","id":"strTruckDesc",inputFormat:"string",InputLength:"100"}),
			plf.addHlpText({"label":"Truck Code",id:"strTruckCode","mandatory":"true",hlpLinkID:"truckcode",inputFormat:"string",InputLength:"60"},this),
		//	plf.addText({"label":"Truck Code","id":"strTruckCode",hlpLinkID:"truckcode"}),
		   	
			
			plf.addListEdit({"label":"Trailer Description","id":"strTrailerDesc",inputFormat:"string",InputLength:"100"}),
		    plf.addHlpText({"label":"Trailer Code",id:"strTrailerCode",hlpLinkID:"trailercode",inputFormat:"string",InputLength:"40"},this),
			//plf.addText({"label":"Trailer Code","id":"strTrailerCode"}),
			
			plf.addListEdit({"label":"Vendor Name","id":"strCustomerVendorName",inputFormat:"string",InputLength:"100"}),
			plf.addHlpText({"label":"Vendor Code",id:"strCustomerVendorCode","mandatory":"true",hlpLinkID:"customervendorcode",inputFormat:"string",InputLength:"40"},this),
			
			plf.addDisplayOnly({"label":"Customer Name","id":"strCustomerName",inputFormat:"string",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Customer Code","id":"strCustomerCode",inputFormat:"string",InputLength:"40"}),
			//plf.addText({"label":"Customer Vendor Code","id":"strCustomerVendorCode"}),
			
			plf.addListEdit({"label":"Driver Name","id":"strDriverName",inputFormat:"string",InputLength:"100"}),
			plf.addHlpText({"label":"Driver Code",id:"strDriverCode","mandatory":"true",hlpLinkID:"DriverCode",inputFormat:"string",InputLength:"40"},this),
			
			plf.addListEdit({"label":"Pick Up Name",id:"strPickUpDesc",inputFormat:"string",InputLength:"100"}),
		    plf.addHlpText({"label":"Pickup Point",id:"strPickUpPoint","mandatory":"true",hlpLinkID:"PickUpPoint",inputFormat:"string",InputLength:"40"},this),
		    
			
			
		   
		]
		inspectionMstrFieldSt.add(inspectionFieldCtrl);
		//inspectionMstrFieldSt.add(plf.addStripLine({}));
		//InspectionMaster Header Section Ends
		
		//InspectionMaster Grid Section Begins
		inspectionFieldObj=
		[
			
			{columnname:"Reference Type",dataname:"REFERENCE_TYPE",datatype:"string",editControl:"combo",width:200,storeId:"strReferenceType"},
			{columnname:"Reference No",dataname:"REFERENCE_NO",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:150},
			
		]
		inspectionMstrGridDtl=
		{
			//title:"Item Details",
			id:"inspectionCache",
			detail:inspectionFieldObj
		}
		
		var passRefDocDtl =  plf.addCollapseSection({title:"Reference Details",collapsed:true})
		inspectionMstrGridSection = plf.addGrid(inspectionMstrGridDtl)	
		passRefDocDtl.add(inspectionMstrGridSection)
		//InspectionMaster Grid Section Ends
		
		
		
		
		
		mainpage.ptrMainSection.add(inspectionMstrColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(inspectionMstrFieldSt)//Add Header Section to Main Page
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
				"service":"CoreInspectionService",
				"methodName":"initInspectionAdviceScrTS"
				//completed
				},				
			{
					"controlid":"strCustomerVendorCode",
					"tasktype":"onenter",
					"input":["strCustomerVendorCode"],
					"service":"CoreInspectionService",
					"methodName":"fetchCustomerDetailsTS"
				},
									
			{
					"controlid":"strTruckCode",
					"tasktype":"onenter",
					"input":["strTruckCode"],
					"service":"CoreInspectionService",
					"methodName":"fetchTruckDetailsTS"
				},
				{
					"controlid":"strPickUpPoint",
					"tasktype":"onenter",
					"input":["strPickUpPoint","strLocCode"],
					"service":"CoreInspectionService",
					"methodName":"fetchPickUpPointDetailsTS"
				},
				{
					"controlid":"strDriverCode",
					"tasktype":"onenter",
					"input":["strDriverCode"],
					"service":"CoreInspectionService",
					"methodName":"fetchDriverDetailsTS"
				},
		
			   {
					"controlid":"strInspectionNo",
					"tasktype":"onenter",
					"input":["strInspectionNo"],
					"service":"CoreInspectionService",
					"methodName":"fetchInspectionAdviceScrTS"
						//completed
				},
				{
					"controlid":"strTrailerCode",
					"tasktype":"onenter",
					"input":["strTrailerCode","strTruckCode"],
					"service":"CoreInspectionService",
					"methodName":"fetchTrailerDetailsTS"

				},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Create",
				    "input":["strInspectionNo","dtInspectionDate","iInspectionTime","strTruckRequestNo","strTruckCode","strDriverCode",
				    "strCustomerVendorCode","inspectionCache","strPickUpPoint","strTrailerCode","strTrailerDesc","strCustomerCode"],
					"service":"CoreInspectionService",
					"methodName":"createInspectionAdviceTS"
					//completed
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Edit",
				    "input":["strInspectionNo","dtInspectionDate","iInspectionTime","strTruckRequestNo","strTruckCode","strDriverCode",
				    "strCustomerVendorCode","strCustomerCode","inspectionCache","strPickUpPoint","strTrailerCode","strModifiedBy","dtModifiedDate"],
					"service":"CoreInspectionService",
					"methodName":"modifyInspectionAdviceTS"
					//completed
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Delete",
				    "input":["strInspectionNo"],
				    "service":"CoreInspectionService",
					"methodName":"deleteInspectionAdviceTS"
					//completed
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Shortclose",
				    "input":["strInspectionNo","strTruckCode","strTrailerCode","strDriverCode"],
				    "service":"CoreInspectionService",
					"methodName":"shortcloseInspectionAdviceTS"
					//completed
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Confirm",
				    "input":["strInspectionNo","strStatus","strInspectionType","strChkListCode","iChkLstDtlSeqNo","strTruckCode","strTrailerCode",
							"strDriverCode"],
				    "service":"CoreInspectionService",
					"methodName":"authorizeInspectionAdviceTS"
					//completed
			},
				{
					"tasktype":"proto",
					"filename":"journey_management/InspectionAdvice.json"
				}	
	];
	
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
							{"parent":"strTrailerDesc","child":"TRUCK_DESC"}
							]
				},
				"PickUpPoint":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strPickUpPoint","child":"LOC_CODE"},
							{"parent":"strPickUpDesc","child":"LOC_NAME"}
							]
				},
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
				"customervendorcode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CustomerVendorHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCustomerVendorCode","child":"CUST_VENDOR_CODE"},
							{"parent":"strCustomerVendorName","child":"CUST_VENDOR_NAME"},
							{"parent":"strCustomerCode","child":"CUST_CODE"},
							{"parent":"strCustomerName","child":"CUST_NAME"}
							]
				},
			
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
			"ins_AssignInspector":
				{
					"dest":"journey_management.AssignInspector",
					"hdr":[
							{"src":"","dest":""}							
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
