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
Ext.define('CueTrans.view.service.ServiceInstance', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.screenName = "Service Instance";
		mainpage.startPainting();
		
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= 
			[{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Amend",
                "tooltip": "Click here to amend service instance."
            },
			{
                "name": "Confirm",
                "tooltip": "Click here to confirm service instance."
            },
			{
                "name": "Vehicle Release",
                "tooltip": "Click here to release vehicle."
            }
            ]
		
		//Service Instance Header Section Begins
		plf.columns=4
		var SerInsHdrPanel = plf.addColumnSection({});
		
		var SerInsFormCtrl=
		[
			plf.addHlpText({"label":"Service ID",id:"strServiceId",hlpLinkID:"serviceid"},this),
			plf.addDisplayOnly({"label":"Service Request No",id:"strServiceReqNo"}),				
			plf.addDisplayOnly({"label":"Request Date",id:"dtSerReqDate"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addDisplayOnly({"label":"Customer Code",id:"strCustomerCode"}),
			plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
			plf.addDisplayOnly({"label":"Ref Doc No",id:"strRefDocNo"}),
			plf.addCombo({"label":"Amendment No",id:"iAmendNo"})				
		]
		SerInsHdrPanel.add(SerInsFormCtrl);
		//Service Instance Header Section Ends
		
		//Service Instance Detail Section Begins
		var SerInsDtlPanel = plf.addColumnSection({title:"Service Details"});		
		var SerdtlFormCtrl=
		[
			plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),			
			plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
			plf.addDateTime({"label":"Req From Date/Time",dateid:"dtReqFromDate",timeid:"tmReqFromTime"}),
			plf.addDateTime({"label":"Req To Date/Time",dateid:"dtReqToDate",timeid:"tmReqToTime"}),				
			/*plf.addDisplayOnly({"label":"Required From Date/Time",id:"strReqFromDateTime"}),
			plf.addDisplayOnly({"label":"Required To Date/Time",id:"strReqToDateTime"}),*/			
			plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehicleCategory"}),
			plf.addDisplayOnly({"label":"Vehicle Code",id:"strVehicleCode"}),
			plf.addDisplayOnly({"label":"Vehicle Regn No",id:"strVehicleRegNo"}),
			plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
			plf.addDisplayOnly({"label":"Driver Phone No",id:"strDriverPhoneNo"})		
		]
		SerInsDtlPanel.add(SerdtlFormCtrl);
		//Service Instance Detail Section Ends
		
		//Service Instance Extension Section Begins
		var SerInsExtPanel = plf.addColumnSection({title:"Service ID Extension"});		
		var SerExtFormCtrl=
		[			
			plf.addDateTime({"label":"Extension Upto Date/Time",dateid:"dtExtUptoDate",timeid:"tmExtUpToTime"}),
			plf.addText({"label":"Extended By",id:"strExtBy"}),
			plf.addDate({"label":"Extended Date",id:"dtExtDate"}),
			plf.addText({"label":"Remarks",id:"strRemarks"})	
		]
		SerInsExtPanel.add(SerExtFormCtrl);
		//Service Instance Extension Section Ends		
		
		//Add Child Sections
		mainpage.ptrMainSection.add(SerInsHdrPanel)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(SerInsDtlPanel)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(SerInsExtPanel) //Add Grid Section to Main Page
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Amend",
				"input":["dtReqToDate","tmReqToTime","strServiceId","strServiceReqNo","dtExtUptoDate","tmExtUpToTime","strExtBy","dtExtDate","strRemarks","iAmendNo"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"AmendServiceInsTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Vehicle Release",
				"input":["strServiceId","strServiceReqNo","iAmendNo"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"vehicleReleaseServiceInsTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Confirm",
				"input":["dtReqToDate","tmReqToTime","strServiceId","strServiceReqNo","dtExtUptoDate","tmExtUpToTime","strExtBy","dtExtDate","strRemarks","iAmendNo"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"ConfirmServiceInsTS"
			},
			{
			"controlid":"",
			"tasktype":"onload",
			"input":["strServiceId","strServiceReqNo"],
			"service":"SERCoreServiceGroupTS",
			"methodName":"initServiceInsTS"
			},
			{
				"controlid":"iAmendNo",
				"tasktype":"onchange",
				"input":["strServiceId","strServiceReqNo","iAmendNo"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"fetch_AmendNo_SerInsTS"
			},
			{
				"controlid":"strServiceId",
				"tasktype":"onenter",
				"input":["strServiceId"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"fetchServiceInsTS"
			},
			{
				"tasktype":"proto",
				"filename":"jm_master/ServiceGroup.json"
			}
			
		];
		mainpage.hlpLinks=
		{
			"serviceid":
				{
					"hlpType":"Header",
					"hlpScreen":"service.ServiceInstanceHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strServiceId","child":"SERVICE_ID"}
							]
				}
		}
		//Event Handlers Mapping Ends
		
		this.callParent(arguments);
		
	}
});
