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
Ext.define('CueTrans.view.service.VehicleRequestHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true; 
		mainpage.startPainting();
		
		mainpage.screenName = "Service Request Help";
		//Help on Customer Search Section Begins
		var formCtrl=[];
		plf.columns=3
		helpOnSerReqHdrCollapse = plf.addColumnSection({title:""});		
		
		var helpOnSerReqFormCtrl=
		[
			plf.addText({"label":"Request No From",id:"strVehicleRequestNoFrom"}),
			plf.addText({"label":"Request No To",id:"strVehicleRequestNoTo"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"CustomerCode"},this),
			plf.addCombo({"label":"Date Type",id:"strDateType"}),
			plf.addDate({"label":"Date From",id:"dtVehicleRequestDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtVehicleRequestDateTo"}),			
			plf.addCombo({"label":"Origin",id:"strOrigin1"}),
			plf.addCombo({"label":"Destination",id:"strDestination1"}),
			plf.addBlank({}),
			plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."})
		]
		helpOnSerReqHdrCollapse.add(helpOnSerReqFormCtrl);
		//Service Request Header Section Ends
		
		//Service Request Grid Section Begins
		var helpOnSerReqGridFieldObj=
		[
			{columnname:"Service Request No",dataname:"VEHICLE_REQUEST_NO",datatype:"string",width:130},
			{columnname:"Service Request Date",dataname:"VEHICLE_REQUEST_DATE",datatype:"string",width:150},
			{columnname:"Customer Code",dataname:"CUSTOMER_CODE",datatype:"string",width:120},
			{columnname:"Customer Name",dataname:"CUSTOMER_NAME",datatype:"string",width:200},
			{columnname:"Service Type",dataname:"SERVICE_TYPE",datatype:"string",width:120},
			{columnname:"Reference Doc No",dataname:"REFERENCE_DOC_NO",datatype:"string",width:130},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
		]
		var helpOnSerReqGridDtl=
		{
			title:"Service Request Details",
			id:"ServiceReqSum",
			detail:helpOnSerReqGridFieldObj,
			visibleRow:plf.helpVisibleRows-1,
			readOnly:true,
			removeAddDelete:true
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
