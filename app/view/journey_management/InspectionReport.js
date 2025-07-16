Ext.define('CueTrans.view.journey_management.InspectionReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Inspection Detail Report";
		
		
		
		//Help on Customer Search Section Begins
		plf.columns=3
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		inspectionReportsColumn = plf.addColumnSection({});
		
		inspectionReportsFormCtrl=
		[
			plf.addHlpText({"label":"Inspection No From",id:"strInspectionNoFrom",hlpLinkID:"inspectionno",inputFormat:"string",InputLength:"80"},this),
			plf.addHlpText({"label":"Inspection No To",id:"strInspectionNoTo",hlpLinkID:"inspectionnoto",inputFormat:"string",InputLength:"80"},this),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			
			plf.addDate({"label":"Inspection Date From",id:"dtInspectionDateFrom","mandatory":"true"}),
			plf.addDate({"label":"Inspection Date To",id:"dtInspectionDateTo","mandatory":"true"}),
			plf.addCombo({"label":"Inspector Name",id:"strInspectorName"}),
			
			plf.addHlpText({"label":"Truck Code",id:"strTruckCode",hlpLinkID:"truckcode",inputFormat:"string",InputLength:"40"},this),
			plf.addHlpText({"label":"Driver Code",id:"strDriverCode",hlpLinkID:"DriverCode",inputFormat:"string",InputLength:"40"},this),
			plf.addCombo({"label":"Inspection Type",id:"strInspectionType"}),
			
			plf.addHlpText({"label":"Customer Vendor Code",id:"strCustomerVendorCode",hlpLinkID:"customervendorcode",inputFormat:"string",InputLength:"40"},this),
			plf.addHlpText({"label":"Pickup Point",id:"strPickupPoint",hlpLinkID:"PickUpPoint",inputFormat:"string",InputLength:"40"},this)
			
		  
				
		]
		
		inspectionReportsColumn.add(inspectionReportsFormCtrl);
		
		//reports button section
		plf.columns=4
		inspectionReportsButtonColumn = plf.addColumnSection({});
		inspectionReportsFormCtrl=
		[
		  plf.addButton({"label":"Inspection Summary","id":"InspectionSummary"}),
		  plf.addButton({"label":"Inspection Detail","id":"InspectionDetail"}),
		  plf.addButton({"label":"Top 10 Defects","id":"Top10Defects"}),
		  plf.addButton({"label":"Defectless Inspection","id":"DefectLessInspection"})
		
		
		]	
		
		inspectionReportsButtonColumn.add(inspectionReportsFormCtrl)
		mainpage.ptrMainSection.add(inspectionReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(inspectionReportsButtonColumn) //Add buttons to Main Page
		
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
							{"parent":"strInspectionNoFrom","child":"INSPECTION_NO"}
							]
				},
				"inspectionnoto":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.InspectionHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strInspectionNoTo","child":"INSPECTION_NO"}
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
							{"parent":"strTruckCode","child":"TRUCK_CODE"}
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
							{"parent":"strPickupPoint","child":"LOC_CODE"}
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
							{"parent":"strDriverCode","child":"DRIVER_CODE"}
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
							{"parent":"strCustomerVendorCode","child":"CUST_VENDOR_CODE"}
							]
				}
			
		}
		
		mainpage.eventHandlers = 
		[			
			{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreInspectionService",
					"methodName":"InitInspectionReport1"
				},
	     {		
             "controlid":"InspectionSummary",
				"tasktype":"btnclick",
				"input":["strInspectionNoFrom","strInspectionNoTo","dtInspectionDateFrom","dtInspectionDateTo","strTruckCode","strDriverCode","strStatus","strCustomerVendorCode","strPickUpPoint","strInspectionType","strInspectorName"],
				"service":"CoreInspectionService",
				"methodName":"PrintInspectionSummaryReport"
			            
		},
		{		
             "controlid":"InspectionDetail",
				"tasktype":"btnclick",
				"input":["strInspectionNoFrom","strInspectionNoTo","dtInspectionDateFrom","dtInspectionDateTo","strTruckCode","strDriverCode","strStatus","strCustomerVendorCode","strPickUpPoint","strInspectionType","strInspectorName"],
				"service":"CoreInspectionService",
				"methodName":"PrintInspectionDetailReport"
			            
		},
		{		
             "controlid":"Top10Defects",
				"tasktype":"btnclick",
				"input":["strInspectionNoFrom","strInspectionNoTo","dtInspectionDateFrom","dtInspectionDateTo","strTruckCode","strDriverCode","strStatus","strCustomerVendorCode","strPickUpPoint","strInspectionType","strInspectorName"],
				"service":"CoreInspectionService",
				"methodName":"PrintTop10DefectsReport"
			            
		},
        {		
             "controlid":"DefectLessInspection",
				"tasktype":"btnclick",
				"input":["strInspectionNoFrom","strInspectionNoTo","dtInspectionDateFrom","dtInspectionDateTo","strTruckCode","strDriverCode","strStatus","strCustomerVendorCode","strPickUpPoint","strInspectionType","strInspectorName"],
				"service":"CoreInspectionService",
				"methodName":"PrintDefectlessInspectionReport"
			            
		}		
		];
		
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	
			
});
