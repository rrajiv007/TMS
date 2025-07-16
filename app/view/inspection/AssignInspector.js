/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.2															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var  		                                   
1.0.2	 Bhuvan		        24/02/2016    67415                         Inspector Allocation 		
1.0.3    Raj                22/05/2016     72438                        Bulk assign inspector is throwing the problem occurred error. 
************************************************************************************************/
Ext.define('CueTrans.view.inspection.AssignInspector', 
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
		mainpage.toolbarActions=["Save"]
		
		//Assign Inspector Section starts
		plf.columns=4
		var assignInspectorColumn = plf.addColumnSection({});			//69997
		mainpage.toolbarLinks=
		[
			{"name":"Inspection Advice","linkid":"Ins_InspAdviceMaster"}
		]
		var assignInspectorFormCtrl=									//69997
		[
			plf.addCombo({"label":"Inspector Name",id:"strDFInspectorName"}),
			//plf.addCombo({"label":"Inspection Mode",id:"strInspectionMode"}),
			//plf.addBlank(),
			//plf.addButton({"label":"Default",id:"btndefault","tooltip":"Click here to default inspector name for selected inspection."})
			//plf.addButton({"label":"Submit",id:"cmn_btnsubmit"})
		]
		
		assignInspectorColumn.add(assignInspectorFormCtrl);
		//Assign Inspector Header Section Ends
		
		plf.columns=4
		var assigninspectionHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);		//69997
		var assignOninspectionFormCtrl=							//69997
		[
			plf.addText({"label":"Inspection No",id:"strInspectionNoFrom","anywhereSearch":"true"}),
			//plf.addHlpText({"label":"Request No",id:"strRequestNo",hlpLinkID:"transreqno"},this),	
			plf.addText({"label":"Load No",id:"strLoadNo",hlpLinkID:"LoadNo"},this),
			plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory"}),			
			plf.addHidden({"label":"Date Type","id":"strDateType"}),
			plf.addHidden({"label":"Date From",id:"strInspectionDateFrom"}),
		    	plf.addHidden({"label":"Date To",id:"strInspectionDateTo"}),
			plf.addHidden({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"carrierno"},this),			
			plf.addText({"label":"Vehicle Regn No",id:"strRegNo",hlpLinkID:"truckno"},this),
			plf.addText({"label":"Driver Name",id:"strDriverName",hlpLinkID:"drivercode"},this),
			plf.addText({"label":"Driver Licence No",id:"strDriverLicenceNo"}),
			plf.addText({"label":"Driver Mobile No",id:"strDriverMobileNo"}),			
		    	plf.addHidden({"label":"Status",id:"strStatus"}),
			plf.addHidden({"label":"Carrier Type",id:"strCarrierType"}),
			plf.addText({"label":"Reporting Driver",id:"strReportingDriver"}),
			plf.addText({"label":"Reporting Vehicle",id:"strReportingVehicle"})
		
        ]
		
		assigninspectionHdrCollapse.add(assignOninspectionFormCtrl);
		
		//Assign Inspector Grid Section Begins
		var assignInspectorGridFieldObj=			//69997
		[
			{columnname:"Inspection No",dataname:"INSPECTION_NO",datatype:"string",width:150},
			{columnname:"Inspection Date & Time",dataname:"INSPECTIONDATETIME",datatype:"string",width:150},
			{columnname:"Load No",dataname:"WAYBILL_NO",datatype:"string",width:130},
			{columnname:"Load Description",dataname:"LOAD_DESCRIPTION",datatype:"string",width:150},
			{columnname:"Loading Point",dataname:"LOAD_AT",datatype:"string",width:150},
			{columnname:"Unloading Point",dataname:"DELIVERY_AT",datatype:"string",width:150},
			{columnname:"Truck Code",dataname:"TRUCK_CODE",datatype:"string",width:150},
			{columnname:"Truck Description",dataname:"TRUCK_DESC",datatype:"string",width:150},
			{columnname:"Reporting Vehicle",dataname:"REP_TRUCK_CODE",datatype:"string",width:150},
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:150},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:150},
			{columnname:"Reporting Driver",dataname:"REP_DRIVER_NAME",datatype:"string",width:150},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:130},
            		{columnname:"Inspection Status",dataname:"INS_STATUS",datatype:"string",width:150},
			{columnname:"Inspector Name",dataname:"INSPECTOR_NAME",datatype:"string",width:130,editControl:"combo",storeId:"strInspectorName"}
			
		]
		var itemGridDtl=			//69997
		{
			title:"",
			id:"assignInspectorGrid",
			visibleRow:15,
			removeAddDelete:true,
			selRowProcess:"Y",       //72438 
			detail:assignInspectorGridFieldObj
		}
		var assignInspectorGridSection = plf.addGrid(itemGridDtl,this)			//69997
		//Assign Inspector Grid Section Ends
		
		
		//Add Child Sections
		mainpage.ptrMainSection.add(assigninspectionHdrCollapse)
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
				"input":[],
				"service":"CoreInspectionService",
				"methodName":"initAssignInspectorScrTS"
				},
				{
			   "controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strInspectionNoFrom","strLoadNo","strVehicleCategory","strRegNo","strDriverName",
				"strDriverLicenceNo","strDriverMobileNo","strReportingDriver","strReportingVehicle"], 
				"service":"CoreInspectionService",
				"methodName":"fetchAllInspectorShift"
				},
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strDFInspectorName","assignInspectorGrid"],
				"service":"CoreInspectionService",
				"methodName":"maintainAssignInspectorScrTS"

			}
	];		
					mainpage.screenLinks=
		{
			"Ins_InspAdviceMaster":
				{
					"dest":"inspection.InspectionAdviceMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
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
