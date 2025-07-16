/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1       Steffie        15/04/16       71910                    Amend Load  Details
1.0.2       Shekar		   04/08/16	      73364	
1.0.3       Rajiv R	   	   01/12/16	      Amend Enhancement
1.0.4       Raj              13/12/16     74947     Added Scheduled and reporting driver
1.0.5       Raj              15/12/16     74993
************************************************************************************************/
Ext.define('CueTrans.view.tms.AmendLoadDetails', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.toolbarSectionFlag=true;
		mainpage.screenName = "Amend Load Details";	
		
		
		/*mainpage.toolbarActions= [{
                "name": "Save",
                "tooltip": "Click here to refresh."
            }
			]*/
		plf.columns=4
		var LDBasedSummaryColumn = plf.addColumnSection({title:"", collapsed: true});
		
		var LDBasedSummaryFormCtrl=
		[
			plf.addHlpText({"label":"Load No","id":"strLoadNo","mandatory":"true",hlpLinkID:"LoadNo"},this),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			plf.addDisplayOnly({"label":"Vehicle Inspection No","id":"strInspectionNo"}),
			plf.addDisplayOnly({"label":"Journey Plan No","id":"strJourneyPlanNo"})
		]
		
		 LDBasedSummaryColumn.add(LDBasedSummaryFormCtrl);
		 
		var LDDetails= plf.addColumnSection({title:""});
		
		var LDDetailsCtrl=
		[   
		     plf.addCombo({"label":"Origin",id:"strOrigin","mandatory":"true"}),   
			 plf.addCombo({"label":"Destination","id":"strDestination","mandatory":"true"}),
			 plf.addDisplayOnly({"label":"Scheduled Vehicle","id":"strSchVehicle"}),
			 plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehicleCategory"}),	
			 plf.addDisplayOnly({"label":"Carrier Name","id":"strCarrierCode"}),
			 plf.addHlpText({"label":"Reporting Vehicle","id":"strTruckCode",hlpLinkID:"VehNo"},this),			 			 
			 plf.addCombo({"label":"Loading Point","id":"strLoadAt"}), //shekar
		     plf.addCombo({"label":"Unloading Point","id":"strDelvAt"}),//shekar
			 plf.addText({"label":"Load Description","id":"strLoadDesc"}),
		     plf.addText({"label":"Actual Weight(ton)","id":"strWeight",inputFormat:"numeric",weightPrecision:"3"}),
             plf.addDisplayOnly({"label":"Scheduled Driver","id":"strSchDriver"}),//74947
             plf.addHlpText({"label":"Reporting Driver","id":"strDriverCode",hlpLinkID:"RepoDriver"},this)//74947	 
			 
		]
		
		LDDetails.add(LDDetailsCtrl);
		 
		 
		var amendDetails = plf.addColumnSection({title:"Amend Reason"});
		
		var amendDetailsCtrl=
		[   
		     plf.addText({"label":"Amend Reason",id:"strAmendRsn","mandatory":"true"})    
		]
		
		amendDetails.add(amendDetailsCtrl);
		var form_obj=this;
		amendDetails.add({xtype:"button",align:"right",text:"Save",tooltip:"Click here to Save modified",columnWidth:.12,margin:3,fieldCls:"c-displyonlyctrl",
					handler: function() 
					{
						var result = confirm("Are you sure want to Amend Load?");
								if (result) 
								{
									//Logic to Confirm the shipment									
									form_obj.queryById("methodName").setValue("SaveAmendLoadDtlsTs");
									process_ebpack_service(form_obj,["strLoadNo","strStatus","strInspectionNo","strJourneyPlanNo","strAmendRsn","strTruckCode","strVehicleCategory",
									"strCarrierCode","strOrigin","strDestination","strLoadAt","strDelvAt","strLoadDesc","strWeight","strDriverCode"],"TMSCoreTransportTS");
								}
					}
		})
	//	customerContractSummaryGridSection = plf.addGrid(customerContractSummaryGridDetail,this)	
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(LDBasedSummaryColumn)
		mainpage.ptrMainSection.add(LDDetails)
		mainpage.ptrMainSection.add(amendDetails) 
		
		mainpage.eventHandlers = 
			[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initAmendLoadTS"
			},
			{
				"controlid":"strLoadNo",
				"tasktype":"onenter",
				"input":["strLoadNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"OnEnterLoadts"
		},
		{
				"controlid":"strTruckCode",
				"tasktype":"onenter",
				"input":["strTruckCode"],
				"service":"CoreTruckService",
				"methodName":"AmdTruckDetailsTS"
		},
              		{
				"controlid":"strDriverCode",
				"tasktype":"onenter",
				"input":["strDriverCode"],
				"service":"CoreDriveService",
				"methodName":"AmdDriverDetailsTS"
		}
		
		]
		
		//History Data Section
		//mainpage.dataHistorySectionFlag=false;
		mainpage.screenLinks=
		{
			
		}	
		
		mainpage.hlpLinks=
		{
			"LoadNo":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.LoadBuildingHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strLoadNo","child":"LOAD_NO"}/*,
							{"parent":"strStatus","child":"STATUS"},
							{"parent":"strJourneyPlanNo","child":"JP_NO"},
							{"parent":"strInspectionNo","child":"INSPECTION_NO"}*/
							]
				},
				"VehNo":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""},
                            {"direct":"VEHICLE_AC","child":"strContext"}//74993
						   ],
					"receive":[
							{"parent":"strTruckCode","child":"TRUCK_CODE"}/*,
							{"parent":"strVehicleRegNo","child":"TRUCK_REG_NO"},
							{"parent":"strVehicleCategory","child":"TRUCK_CATEGORY"},
							{"parent":"strContractNo","child":"TRUCK_CONTRACT_NO"},
							{"parent":"strCarrierCode","child":"TRUCK_OWNER_CODE"}*/
							]
				},
                           	"RepoDriver":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""},
                            {"direct":"DRIVER_AC","child":"strContext"}//74993
						   ],
					"receive":[
							{"parent":"strDriverCode","child":"DRIVER_CODE"}

						   ]
				}
				
		}
		
		this.callParent(arguments);
		
	
	}
});