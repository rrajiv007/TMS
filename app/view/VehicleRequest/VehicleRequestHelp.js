/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var		                                   
************************************************************************************************/
Ext.define('CueTrans.view.VehicleRequest.VehicleRequestHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true; 
		mainpage.startPainting();
		
		mainpage.screenName = "Help On Service Request";
		//Help on Customer Search Section Begins
		var formCtrl=[];
		plf.columns=3
		var locationHdrCollapse = plf.addColumnSection({title:"Search Criteria", collapsed: true});		//69997
		
		
		var locationFormCtrl=																		//69997
		[
			plf.addText({"label":"Service Request No From",id:"strVehicleRequestNoFrom","anywhereSearch":"true"}),
			plf.addText({"label":"Service Request No To",id:"strVehicleRequestNoTo","anywhereSearch":"true"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addDate({"label":"Service Request Date From",id:"dtVehicleRequestDateFrom"}),
			plf.addDate({"label":"Service Request Date To",id:"dtVehicleRequestDateTo"}),
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"CustomerCode"},this),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."})
			
		]
		
		locationHdrCollapse.add(locationFormCtrl);
		//Help on Customer Header Section Ends
		
		//Help on Customer Grid Section Begins
		var locationGridFieldObj=														//69997
		[
			{columnname:"Service Request No",dataname:"VEHICLE_REQUEST_NO",datatype:"string",width:130,linkId:"vehicleRequestNo"},
			{columnname:"Service Request Date",dataname:"VEHICLE_REQUEST_DATE",datatype:"string",width:150},
			{columnname:"Customer Code",dataname:"CUSTOMER_CODE",datatype:"string",width:120},
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:110},
			{columnname:"Reference Doc No",dataname:"REFERENCE_DOC_NO",datatype:"string",width:130},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}			
		]
		locationGridDtl=
		{
			title:"Service Request Help",
			id:"vehiclehelp",
			detail:locationGridFieldObj,
			visibleRow:plf.helpVisibleRows-1,
			readOnly:true,
			removeAddDelete:true
		}
		var helpGridSection = plf.addGrid(locationGridDtl,this)						//69997
		mainpage.hlpSearchGridPtr = helpGridSection
		//Help on Customer Grid Section Ends
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(locationHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		
			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreVehicleRequest",
				"methodName":"initVehicleRequestHelpScrTS"
			},
			{
					"controlid":"searchBtn",
					"tasktype":"btnclick",
					"input":["strVehicleRequestNoFrom","strVehicleRequestNoTo","strStatus","dtVehicleRequestDateFrom","dtVehicleRequestDateTo","strRequestType","strCustomerCode","strContractNo","strContractType","strOrigin","strDestination","vehiclehelp"],
					"service":"CoreVehicleRequest",
					"methodName":"initVehicleRequestHelpSearchScrTS"
					}			
		];
		
		
		
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
});
