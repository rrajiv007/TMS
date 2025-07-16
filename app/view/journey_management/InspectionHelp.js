/*
57203
*/
Ext.define('CueTrans.view.journey_management.InspectionHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
	//	var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
	    var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		mainpage.screenName = "Inspection Help";
		
		//Inspection Search Section Begins
		plf.columns=3
		helpOninspectionHdrCollapse =plf.addColumnSection({title:"", collapsed: true});
		
		
		helpOninspectionFormCtrl=
		[
			plf.addText({"label":"Inspection No From",id:"strInspectionNoFrom","anywhereSearch":"true"}),
			plf.addText({"label":"Inspection No To",id:"strInspectionNoTo","anywhereSearch":"true"}),
			plf.addText({"label":"Truck Code",id:"strTruckCode"}),
			plf.addDate({"label":"Inspection Date From",id:"strInspectionDateFrom"}),
		    plf.addDate({"label":"Inspection Date To",id:"strInspectionDateTo"}),
			plf.addText({"label":"Driver Code",id:"strDriverCode"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
		]
		
		helpOninspectionHdrCollapse.add(helpOninspectionFormCtrl);
		//Inspection Search Section Ends
		
		//Inspection Grid Section Begins
		helpOninspectionGridFieldObj=
		[
			//{columnname:"Pre Inspection",dataname:"preInspection",datatype:"string",width:150},
			//{columnname:"Load Inspection",dataname:"loadInspection",datatype:"string",width:150},
			//{columnname:"RSST History",dataname:"rsstHistory",datatype:"string",width:150},
			//{columnname:"Re-Inspection",dataname:"reInspection",datatype:"string",storeId:"driveType",width:100},
			{columnname:"Inspection No",dataname:"INSPECTION_NO",datatype:"string",width:150},
			{columnname:"Inspection Date & Time",dataname:"INSPECTIONTIME",datatype:"string",width:200},
			{columnname:"Truck Code",dataname:"TRUCK_CODE",datatype:"string",width:100},
			{columnname:"Truck Description",dataname:"TRUCK_DESC",datatype:"string",width:200},
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:100},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:200}
		]
		helpOninspectionGridDtl=
		{
			title:"Inspection Details",
			id:"inspectionresultCache",
			visibleRow:plf.helpVisibleRows,
			detail:helpOninspectionGridFieldObj,
			removeAddDelete:true
		}
		helpGridSection = plf.addGrid(helpOninspectionGridDtl,this)
		mainpage.hlpSearchGridPtr = helpGridSection
		//Inspection Grid Section Ends
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(helpOninspectionHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		 
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreInspectionService",
				"methodName":"initInspectionAdviceSearchScrTS"
				},
            {
			   "controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strInspectionNoFrom","strInspectionNoTo","strInspectionDateFrom","strInspectionDateTo","strTruckCode","strDriverCode","strStatus"],
				"service":"CoreInspectionService",
				"methodName":"fetchAllInspectionAdviceScrTS"
			},
				{
					"tasktype":"proto",
					"filename":"journey_management/InspectionHelp.json"
				}		
		];
		//Event Handlers Mapping Ends
			
		//Generate Screen Section
		
		/*mainpage.screenLinks=
		{
			"inspectionmaster":
				{
					"dest":"journey_management.InspectionAdviceMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"INSPECTION_NO","dest":"strInspectionNo"}
							]
				}
		}*/
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
