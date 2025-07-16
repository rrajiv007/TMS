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
Ext.define('CueTrans.view.service.ServiceRequestSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.screenName = "Service Request Summary";
		mainpage.startPainting();
		
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Create Service Request","linkid":"jm_createservicereq","tooltip":"Click here to create service request."}
		]
		//Service Request Header Section Begins
		plf.columns=4
		var helpOnSerReqHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);
		
		var helpOnSerReqFormCtrl=
		[
			plf.addText({"label":"Request No From",id:"strVehicleRequestNoFrom"}),
			plf.addText({"label":"Request No To",id:"strVehicleRequestNoTo"}),			
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"CustomerCode"},this),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Date Type",id:"strDateType"}),
			plf.addDate({"label":"Date From",id:"dtVehicleRequestDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtVehicleRequestDateTo"}),			
			plf.addCombo({"label":"Origin",id:"strOrigin1"}),
			plf.addCombo({"label":"Destination",id:"strDestination1"})
		]
		helpOnSerReqHdrCollapse.add(helpOnSerReqFormCtrl);
		//Service Request Header Section Ends
		
		//Service Request Grid Section Begins
		var helpOnSerReqGridFieldObj=
		[
			{columnname:"Service Request No",dataname:"VEHICLE_REQUEST_NO",datatype:"string",width:150,linkId:"servicereq","tooltip":"Click here to launch the service request screen."},
			{columnname:"Service Request Date",dataname:"VEHICLE_REQUEST_DATE",datatype:"string",width:150},
			{columnname:"Customer Code",dataname:"CUSTOMER_CODE",datatype:"string",width:150},
			{columnname:"Customer Name",dataname:"CUSTOMER_NAME",datatype:"string",width:200},
			{columnname:"Service Type",dataname:"SERVICE_TYPE",datatype:"string",width:150},
			{columnname:"Reference Doc No",dataname:"REFERENCE_DOC_NO",datatype:"string",width:200},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:150}
		]
		var helpOnSerReqGridDtl=
		{
			title:"",
			id:"ServiceReqSum",
			removeAddDelete:true,
			visibleRow:plf.searchVisibleRows,
			detail:helpOnSerReqGridFieldObj,
			
		}
		var helpGridSection = plf.addGrid(helpOnSerReqGridDtl,this)	
		//Service Group Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnSerReqHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
			mainpage.eventHandlers = 
			[
		
			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"SERCoreServiceGroupTS",
				"methodName":"initVehicleRequestSearchScrTS"
			},
			{
					"controlid":"searchBtn",
					"tasktype":"btnclick",
					"input":["strVehicleRequestNoFrom","strVehicleRequestNoTo","strStatus","dtVehicleRequestDateFrom","dtVehicleRequestDateTo","strRequestType","strCustomerCode","strOrigin1","strDestination1","strDateType","vehiclehelp"],
					"service":"SERCoreServiceGroupTS",
					"methodName":"initVehicleRequestHelpSearchScrTS"
					}			
			];
		//Event Handlers Mapping Ends
		
		mainpage.screenLinks=
		{
			"servicereq":
				{
					"dest":"service.VehicleRequestMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"VEHICLE_REQUEST_NO","dest":"strVehicleRequestNo"}
							]
				},
				"jm_createservicereq":
				{
					"dest":"service.VehicleRequestMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
		mainpage.hlpLinks=
		{
			"CustomerCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CustomerHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCustomerCode","child":"CUST_CODE"}
							]
				}
		}		
		this.callParent(arguments);
		
	}
});
