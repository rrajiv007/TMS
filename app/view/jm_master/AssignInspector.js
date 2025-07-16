Ext.define('CueTrans.view.journey_management.AssignInspector', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Assign Inspector";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Maintain"]
		
		//Assign Inspector Section starts
		plf.columns=4
		assignInspectorColumn = plf.addColumnSection({});
		
		assignInspectorFormCtrl=
		[
			plf.addCombo({"label":"Inspector Name",id:"strInspectorName","mandatory":"true"}),
			plf.addCombo({"label":"Mode of Inspection",id:"strInspectionMode"}),
			plf.addBlank()
			//plf.addDisplayOnly({"label":"Status","id":"strStatus"})
			//plf.addButton({"label":"Submit",id:"cmn_btnsubmit"})
		]
		
		assignInspectorColumn.add(assignInspectorFormCtrl);
		//Assign Inspector Header Section Ends
		
		//Assign Inspector Grid Section Begins
		assignInspectorGridFieldObj=
		[
			{columnname:"Inspection No",dataname:"INSPECTION_NO",datatype:"string",width:200},
			{columnname:"Inspection Date & Time",dataname:"INSPECTIONDATETIME",datatype:"string",width:200},
			{columnname:"Truck Code",dataname:"TRUCK_CODE",datatype:"string",width:200},
			{columnname:"Truck Description",dataname:"TRUCK_DESC",datatype:"string",width:250},
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:250},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:250}
		]
		itemGridDtl=
		{
			title:"Pending Inspection Advice Details",
			id:"assignInspectorGrid",
			visibleRow:8,
			//removeAddDelete:true,
			detail:assignInspectorGridFieldObj
		}
		assignInspectorGridSection = plf.addGrid(itemGridDtl)
		//Assign Inspector Grid Section Ends
		
		
		//Add Child Sections
		mainpage.ptrMainSection.add(assignInspectorColumn)//Add Header Section to Main 
		mainpage.ptrMainSection.add(assignInspectorGridSection)//Add Header Section to Main 
		
		//History Data Section
		//mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
				mainpage.eventHandlers = 
			[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strStatus"],
				"service":"CoreInspectionService",
				"methodName":"initAssignInspectorScrTS"
				},
				
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Maintain",
				"input":["assignInspectorGrid","strInspectorName"],
				"service":"CoreInspectionService",
				"methodName":"maintainAssignInspectorScrTS"

			}
			
				/*{
					"tasktype":"proto",
					"filename":"jm_master/AssignInspector.json"
				}*/
			/*{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreInspectorService",
				"methodName":"initInspectionNameTS"
			},
			{
					"controlid":"cmn_btnsubmit",
					"tasktype":"btnclick",
					"input":["strInspectorName","assignInspectorGrid"],
					"service":"CoreInspectorService",
					"methodName":"createInspectorTS"
					}*/
];
			//Event Handlers Mapping Ends
			
			//Generate Screen Section
		//mainpage.generateScreen();
		
		
		/*Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
		
	
	}
});
