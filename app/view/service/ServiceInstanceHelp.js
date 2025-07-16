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
Ext.define('CueTrans.view.service.ServiceInstanceHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.screenName = "Service Instance Help";
		mainpage.startPainting();
		
		
		//Service Instance Header Section Begins
		plf.columns=3
		var helpOnSerInsHdrCollapse = plf.addColumnSection({title:"",collapsed: false});
		
		var helpOnSerInsFormCtrl=
		[
			plf.addText({"label":"Service ID From",id:"strServiceIdFrom"}),
			plf.addText({"label":"Service ID To",id:"strServiceIdTo"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Service Request No",id:"strServiceReqNo"}),
			plf.addText({"label":"Customer Code",id:"strCustomerCode"}),			
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addCombo({"label":"Vehicle Category",id:"strVehicelCategory"}),
			plf.addCombo({"label":"Extended Service","id":"strExtService"}),
			plf.addBlank({}),
			plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."})
		]
		helpOnSerInsHdrCollapse.add(helpOnSerInsFormCtrl);
		//Service Instance Header Section Ends
		
		//Service Instance Grid Section Begins
		var helpOnSerInsGridFieldObj=
		[
			{columnname:"Service ID",dataname:"SERVICE_ID",datatype:"string",width:100},
			{columnname:"Service Request No",dataname:"SERVICE_REQ_NO",datatype:"string",width:100},			
			{columnname:"Request Date",dataname:"REQ_DATE",datatype:"string",width:100},			
			{columnname:"Customer Code",dataname:"CUSTOMER_CODE",datatype:"string",width:100},			
			{columnname:"Customer Name",dataname:"CUSTOMER_Name",datatype:"string",width:100},			
			{columnname:"Ref Doc No",dataname:"REF_DOC_NO",datatype:"string",width:100},	
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:100},	
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:100},	
			{columnname:"Request From Date",dataname:"REQ_FROM_DATE",datatype:"string",width:100},	
			{columnname:"Request From Time",dataname:"REQ_FROM_TIME",datatype:"string",width:100},
			{columnname:"Request To Date",dataname:"REQ_TO_DATE",datatype:"string",width:100},	
			{columnname:"Request To Time",dataname:"REQ_TO_TIME",datatype:"string",width:100},				
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:100},	
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
		]
		var helpOnSerInsGridDtl=
		{
			title:"Service Instance Details",
			id:"ServiceInstance",			
			detail:helpOnSerInsGridFieldObj,
			visibleRow:plf.helpVisibleRows-1,
			readOnly:true,
			removeAddDelete:true
		}
		var helpGridSection = plf.addGrid(helpOnSerInsGridDtl,this)	
		//Service Group Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnSerInsHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strServiceIdFrom","strServiceIdTo","strServiceReqNo","strStatus","strVehicleCategory","strCustomerCode","strOrigin1","strDestination1","strExtService"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"fetchAllServiceInsTS"
			},
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"SERCoreServiceGroupTS",
				"methodName":"initServiceInsSearchScrTS"
				},
				{
					"tasktype":"proto",
					"filename":"jm_master/ServiceGroup.json"
				}
			
		];
		//Event Handlers Mapping Ends			
		this.callParent(arguments);
		
	}
});
