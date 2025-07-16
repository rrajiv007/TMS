/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1       Steffie        15/04/16       71908                     Amend JP  Details
1.0.2       Shekar         16/11/16       74676
1.0.3        Raj          15/12/2016      74993
************************************************************************************************/
Ext.define('CueTrans.view.tms.AmendJPDetails', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.toolbarSectionFlag=true;
		mainpage.screenName = "Amend Journey Plan Details";	
		
		
		/*mainpage.toolbarActions= [{
                "name": "Save",
                "tooltip": "Click here to refresh."
            }
			]*/
		plf.columns=4
		var JPBasedSummaryColumn = plf.addColumnSection({title:"", collapsed: true});
		
		var JPBasedSummaryFormCtrl=
		[
			plf.addHlpText({"label":"Journey Plan No","id":"strJourneyPlanNo",hlpLinkID:"JPNo","mandatory":"true"},this), 
			plf.addDate({"label":"Journey Plan Date",id:"dtJourneyPlanDate"}),   			// 74676
			plf.addDisplayOnly({"label":"Journey Type",id:"strJourneyPlanType"}),			// 74676	
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			plf.addDisplayOnly({"label":"Journey Mgr Name",id:"strJourneyManagerName"}),	// 74676
			plf.addDisplayOnly({"label":"Journey Mgr Code",id:"strJourneyManagerCode"}),	// 74676
		    plf.addDisplayOnly({"label":"Phone Number",id:"strContractNo"}),				// 74676
            plf.addDisplayOnly({"label":"RAM Score",id:"iRiskAssessmentScore"}),			// 74676
			plf.addDisplayOnly({"label":"Load No","id":"strLoadNo"}),
			plf.addDisplayOnly({"label":"Load Origin",id:"strLoadOrigin"}),					// 74676
		    plf.addDisplayOnly({"label":"Load Destination",id:"strLoadDestination"}),		// 74676
			plf.addDisplayOnly({"label":"Load Description","id":"strLoadDesc"}),			// 74676
			plf.addDisplayOnly({"label":"Loading Point","id":"strLoadAt"}),					// 74676
			plf.addDisplayOnly({"label":"Unloading Point","id":"strDeliveryAt"}),			// 74676
			plf.addDisplayOnly({"label":"Carrier Name",id:"strCarrierName"}),				// 74676
			plf.addDisplayOnly({"label":"Vehicle Inspection No","id":"strInspectionNo"}),
			plf.addDisplayOnly({"label":"Driver Compliance",id:"strDriverCompliance"}),		// 74676
			plf.addDisplayOnly({"label":"Vehicle Compliance",id:"strTruckCompliance"}),		// 74676
		    plf.addDisplayOnly({"label":"Load Compliance",id:"strLoadCompliance"})			// 74676
			
		]
		
		 JPBasedSummaryColumn.add(JPBasedSummaryFormCtrl);
		 
		 
		 //74676 start  
		//var ScheVehDetails= plf.addColumnSection({title:"Scheduled Vehicle/Driver"});
		var ScheVehDetails= plf.addColumnSection({title:"Scheduled Asset Details"});
		
		var ScheVehDetailsCtrl=
		[   
		    plf.addDisplayOnly({"label":"Vehicle Code","id":"strSchTruckCode"}),
			 plf.addDisplayOnly({"label":"Vehicle Regn No","id":"strSchVehicleRegNo"}),
			 plf.addDisplayOnly({"label":"Vehicle Category","id":"strSchVehicleCategory"}),
			 plf.addDisplayOnly({"label":"Contract No","id":"strSchContractNo"}),
			 plf.addDisplayOnly({"label":"Carrier Name","id":"strSchCarrierCode"}),
			 plf.addDisplayOnly({"label":"Driver Code","id":"strSchDriverCode"}),
		     plf.addDisplayOnly({"label":"Driver Name","id":"strSchDriverName"}),
			 plf.addDisplayOnly({"label":"Driver Contact No","id":"strSchDriverContact"}),
			 plf.addDisplayOnly({"label":"Driver License No","id":"strSchLicense"}),
			 plf.addDisplayOnly({"label":"Driver Age",id:"strDriverAge"}),
			 plf.addDisplayOnly({"label":"Trailer Code",id:"strTrailerCodeSC"}),
			 plf.addHidden({id:"strTrackVeh"}),	
			 plf.addHidden({id:"strTrackDriv"})
			 
		]
		
		ScheVehDetails.add(ScheVehDetailsCtrl);
		 //74676 end 
		 
		//var ReportVehDetails= plf.addColumnSection({title:"Reported Vehicle/Driver"});
		var ReportVehDetails= plf.addColumnSection({title:"Reporting Asset Details"});
		
		var ReportVehDetailsCtrl=
		[   
		     plf.addHlpText({"label":"Vehicle Code","id":"strTruckCode",hlpLinkID:"VehNo"},this),
			 plf.addDisplayOnly({"label":"Vehicle Regn No","id":"strVehicleRegNo"}),
			 plf.addDisplayOnly({"label":"Vehicle Category","id":"strVehicleCategory"}),
			 plf.addDisplayOnly({"label":"Contract No","id":"strRepContractNo"}),
			 plf.addDisplayOnly({"label":"Carrier Name","id":"strCarrierCode"}),
			 plf.addHlpText({"label":"Driver Code","id":"strDriverCode",hlpLinkID:"Driver"},this),
		     plf.addDisplayOnly({"label":"Driver Name","id":"strDriverName"}),
			 plf.addDisplayOnly({"label":"Driver Contact No","id":"strDriverContact"}),
			 plf.addDisplayOnly({"label":"Driver License No","id":"strLicense"}),
			 plf.addDisplayOnly({"label":"Driver Age",id:"strRepoDriverAge"}),
			 plf.addHlpText({"label":"Trailer Code","id":"strTrailerCode",hlpLinkID:"reportingTrailerCode"},this),//75145
			 plf.addHidden({id:"strRepTrackVeh"}),	
			 plf.addHidden({id:"strRepTrackDriv"})
			 
		]
		
		ReportVehDetails.add(ReportVehDetailsCtrl);
		 //Raj 12-12-17
		
		var TruckGridFieldObj=							
		[
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:140},//188
			{columnname:"Document No",dataname:"DOC_NO",datatype:"string",width:140},//140
			{columnname:"Expiry Date",dataname:"EXPIRTY_DT",datatype:"string",width:140}
			//{columnname:"Issued By",dataname:"ISSUED_BY",datatype:"string",width:110}//Raj
		]
		var truckGridDtl=								//69997
		{
			title:"Truck Documents Details",
			id:"truckDocGrid",//preJourneyTruck
			columnWidth:0.33,
			detail:TruckGridFieldObj,
			visibleRow:6,	
			readonly:true,
			removeFilter:true,
			removeTbar:true,
			"rowHighlight":true

		}
		var  TruckGridSection = plf.addGrid(truckGridDtl,this)		//69997

		//Pre Journey Inspection Truck Document Grid Section Ends

			//Pre Journey Inspection Trailer Document Grid Section start           	
		var TrailerGridFieldObj=							//69997
		[
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:140},
			{columnname:"Document No",dataname:"DOC_NO",datatype:"string",width:140},
			{columnname:"Expiry Date",dataname:"EXPIRTY_DT",datatype:"string",width:140}
			//{columnname:"Issued By",dataname:"ISSUED_BY",datatype:"string",width:110}//Raj
		]
		var TrailerGridDtl=								//69997
		{
			title:"Trailer Documents Details",
			id:"preJourneyTrailer",
			columnWidth:0.34,
			detail:TrailerGridFieldObj,
			visibleRow:6,	
			readonly:true,
			removeFilter:true,
			removeTbar:true,
			"rowHighlight":true

		}
		var  TrailerGridSection = plf.addGrid(TrailerGridDtl,this)		//69997

		//Pre Journey Inspection Truck Document Grid Section Ends        

		//Pre Journey Inspection Driver Document Grid Section Begins
		var preJourneyInspectionDriverGridFieldObj=	     //69997
		[
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:140},
			{columnname:"Document No",dataname:"DOC_NO",datatype:"string",width:140},
			//{columnname:"Issue Date",dataname:"DOC_ISSUE_DT",datatype:"string",width:140},//Raj
			{columnname:"Expiry Date",dataname:"DOC_EXPIRY_DT",datatype:"string",width:110}
			
		]
		var driverGridDtl=			//69997
		{
			title:"Driver Documents Details",
			id:"driverMapping",//driverMapping
			columnWidth:0.33,
			detail:preJourneyInspectionDriverGridFieldObj,
			visibleRow:6,			
			readonly:true,
			removeFilter:true,
			removeTbar:true,
			"rowHighlight":true				
		}

		var DriverGridSection = plf.addGrid(driverGridDtl,this)
		var truckAndDriverColumn = plf.addCollapseSection({collapsed:true,"title":"Documents Details"});			//69997
		truckAndDriverColumn.add(TruckGridSection)
		truckAndDriverColumn.add(plf.addSplitter)
		truckAndDriverColumn.add(TrailerGridSection)//Raj
		truckAndDriverColumn.add(plf.addSplitter)//Raj
		truckAndDriverColumn.add(DriverGridSection)
		truckAndDriverColumn.add(plf.addStripLine({}));
		
		//Raj 12-12-17
		 
		//var amendDetails = plf.addColumnSection({title:"Reason For Vehicle/Driver Change"});
               var amendDetails = plf.addColumnSection({title:"Reason For Amend Journey"});
		
		var amendDetailsCtrl=
		[   
		     plf.addCombo({"label":"Reason for Vehicle Change",id:"strVehAmendRsn","mandatory":"true"}),
			 plf.addCombo({"label":"Reason for Driver Change",id:"strDriAmendRsn","mandatory":"true"}),
			 plf.addCombo({"label":"Reason for Trailer Change",id:"strTriAmendRsn","mandatory":"true"}),//75145
			 plf.addTextArea({"label":"Notes",id:"strAmendRsn",height:"150",width:"265",maxLength:"10000"}),
			// plf.addText({"label":"Reason",id:"strAmendRsn","mandatory":"true"}),
			 plf.addBlank(),
			 plf.addBlank(),
			 plf.addBlank(),
			 plf.addBlank(),
			 plf.addBlank(),
			 plf.addBlank(),
			 plf.addBlank()
		]
		
		amendDetails.add(amendDetailsCtrl);
		var form_obj=this;
		amendDetails.add({xtype:"button",align:"right",text:"Save",tooltip:"Click here to Save modified",columnWidth:.12,margin:3,fieldCls:"c-displyonlyctrl",
					handler: function() 
					{
						var result = confirm("Are you sure want to Amend Journey Plan?");
								if (result) 
								{
									//Logic to Confirm the shipment									
									form_obj.queryById("methodName").setValue("SaveAmendJPDtlsTs");
									process_ebpack_service(form_obj,["strStatus","strInspectionNo","strJourneyPlanNo","strVehAmendRsn","strDriAmendRsn","strTruckCode","strVehicleRegNo","strVehicleCategory",
									"strContractNo","strDriverCode","strDriverName","strLicense","strCarrierCode","strTrackDriv","strTrackVeh","strAmendRsn","strRepTrackVeh","strRepTrackDriv","strTrailerCode","strTriAmendRsn","strLoadNo","strTrailerCodeSC"],"TMSCoreTransportTS");
								}
					}
		})
	//	customerContractSummaryGridSection = plf.addGrid(customerContractSummaryGridDetail,this)	
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(JPBasedSummaryColumn)
		mainpage.ptrMainSection.add(ScheVehDetails)
		mainpage.ptrMainSection.add(ReportVehDetails)
		mainpage.ptrMainSection.add(truckAndDriverColumn)
		mainpage.ptrMainSection.add(amendDetails) 
		
		mainpage.eventHandlers = 
			[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strJourneyPlanNo"],
				"service":"TMSCoreTransportTS",
				//"service":"CoreJourneyPlanService",
				"methodName":"initAmendJPTS"
			},
			{
				"controlid":"strJourneyPlanNo",
				"tasktype":"onenter",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"onenteramendjpsummaryts"
		},
		{
				"controlid":"strTruckCode",
				"tasktype":"onenter",
				"input":["strTruckCode"],
				//"service":"CoreTruckService",
				"service":"CoreTruckService",
				"methodName":"AmdTruckDetailsTS"
		},
		{
				"controlid":"strDriverCode",
				"tasktype":"onenter",
				"input":["strDriverCode"],
				"service":"CoreDriveService",
				"methodName":"AmdDriverDetailsTS"
		},
		 //Raj for 75145
             {
				"controlid":"strTrailerCode",
				"tasktype":"onenter",
				"input":["strTrailerCode"],
				"service":"CoreInspectionsService",
				"methodName":"fetchRepTrailerCodeTS"
			}
		
		]
		
		//History Data Section
		//mainpage.dataHistorySectionFlag=false;
		mainpage.screenLinks=
		{
			
		}	
		
		mainpage.hlpLinks=
		{
			"JPNo":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.JourneyPlanHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					        {"parent":"strJourneyPlanNo","child":"JOURNEY_PLAN_NO"},
							/*{"parent":"strStatus","child":"STATUS"},
							{"parent":"strLoadNo","child":"WAYBILL_NO"},
							{"parent":"strInspectionNo","child":"INSPECTION_NO"},
							{"parent":"strTruckCode","child":"TRUCK_CODE"},
							{"parent":"strVehicleRegNo","child":"TRUCK_REG_NO"},
							{"parent":"strVehicleCategory","child":"TRUCK_CATEGORY"},*/
							/*{"parent":"strContractNo","child":"TRUCK_CONTRACT_NO"},
							{"parent":"strCarrierCode","child":"CARRIER_CODE"},
							{"parent":"strDriverCode","child":"DRIVER_CODE"},
							{"parent":"strDriverName","child":"DRIVER_NAME"},*/
							{"parent":"strDriverContact","child":"PHONE_NO"},
							{"parent":"strLicense","child":"LICENCE_NO"}/*,
							{"parent":"strTrackVeh","child":"TRUCK_CODE"},
							{"parent":"strTrackDriv","child":"DRIVER_CODE"}*/
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
				"Driver":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""},
                                                 {"direct":"DRIVER_AC","child":"strContext"}//74993
						   ],
					"receive":[
							{"parent":"strDriverCode","child":"DRIVER_CODE"}/*,
							{"parent":"strDriverName","child":"DRIVER_NAME"},
							{"parent":"strDriverContact","child":"PHONE_NO"}*/
							]
				},
				//for 75145
				 "reportingTrailerCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TrailerHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTrailerCode","child":"TRUCK_CODE"}
							]
				}
				
		}
		
		this.callParent(arguments);
		
	
	}
});