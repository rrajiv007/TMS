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
Ext.define('CueTrans.view.service.ServiceInstanceSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.screenName = "Service Instance Summary";
		mainpage.startPainting();
		
		mainpage.toolbarSectionFlag=false;
		/*
		mainpage.toolbarLinks=
		[
			{"name":"Create a Service Instance","linkid":"jm_createserviceinstance","tooltip":"Click here to create a service instance."}
		]
		*/
		//Service Instance Header Section Begins
		plf.columns=4
		var helpOnSerInsHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);
		
		var helpOnSerInsFormCtrl=
		[
			plf.addText({"label":"Service ID From",id:"strServiceIdFrom"}),
			plf.addText({"label":"Service ID To",id:"strServiceIdTo"}),
			plf.addHlpText({"label":"Service Request No",id:"strServiceReqNo",hlpLinkID:"servicereqno"},this),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"CustomerCode"},this),		
			plf.addCombo({"label":"Origin",id:"strOrigin1"}),
			plf.addCombo({"label":"Destination",id:"strDestination1"}),
			plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory"}),
			plf.addCombo({"label":"Extended Service","id":"strExtService"})
		]
		helpOnSerInsHdrCollapse.add(helpOnSerInsFormCtrl);
		//Service Instance Header Section Ends
		
		//Service Instance Grid Section Begins
		var helpOnSerInsGridFieldObj=
		[
			{columnname:"Service ID",dataname:"SERVICE_ID",datatype:"string",width:100,linkId:"serviceinstance","tooltip":"Click here to launch the service instance screen."},
			{columnname:"Service Request No",dataname:"SERVICE_REQ_NO",datatype:"string",width:100},			
			{columnname:"Request Date",dataname:"REQ_DATE",datatype:"date",width:100},			
			{columnname:"Customer Code",dataname:"CUSTOMER_CODE",datatype:"string",width:100},			
			{columnname:"Customer Name",dataname:"CUSTOMER_NAME",datatype:"string",width:100},			
			{columnname:"Ref Doc No",dataname:"REF_DOC_NO",datatype:"string",width:100},	
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:100},	
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:100},	
			{columnname:"Request From Date",dataname:"REQ_FROM_DATE",datatype:"date",width:130},	
			{columnname:"Request From Time",dataname:"REQ_FROM_TIME",datatype:"string",width:100},
			{columnname:"Request To Date",dataname:"REQ_TO_DATE",datatype:"date",width:130},	
			{columnname:"Request To Time",dataname:"REQ_TO_TIME",datatype:"string",width:100},				
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:100},	
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
		]
		var helpOnSerInsGridDtl=
		{
			title:"",
			id:"ServiceInstance",
			removeAddDelete:true,
			visibleRow:plf.searchVisibleRows,
			detail:helpOnSerInsGridFieldObj,
			
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
		
		mainpage.screenLinks=
		{
			"serviceinstance":
				{
					"dest":"service.ServiceInstance",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"SERVICE_ID","dest":"strServiceId"},
							{"src":"SERVICE_REQ_NO","dest":"strServiceReqNo"},
							{"src":"REQ_DATE","dest":"dtSerReqDate"},
							{"src":"CUSTOMER_CODE","dest":"strCustomerCode"},
							{"src":"CUSTOMER_NAME","dest":"strCustomerName"},
							{"src":"REF_DOC_NO","dest":"strRefDocNo"},
							{"src":"ORIGIN","dest":"strOrigin"},
							{"src":"DESTINATION","dest":"strDestination"},
							{"src":"VEHICLE_CATEGORY","dest":"strVehicleCategory"},
							{"src":"STATUS","dest":"strStatus"}
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
				},
				"servicereqno":
				{
					"hlpType":"Header",
					"hlpScreen":"service.VehicleRequestHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strServiceReqNo","child":"VEHICLE_REQUEST_NO"}
							]
				}
		}
		this.callParent(arguments);
		
	}
});
