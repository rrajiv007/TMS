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
Ext.define('CueTrans.view.tms.TransRequestVehicleHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		mainpage.screenName = "Request Search"	
		
		//Truck Master Section starts

		var formCtrl=[];
		plf.columns=3
		var vehicleBasedSummaryColumn = plf.addColumnSection({title:"", collapsed: true});;
		
		
		var vehicleBasedSummaryFormCtrl=
		[
			plf.addText({"label":"Transportation  Request From",id:"strRequestNoFrom","anywhereSearch":"true"}),
			plf.addText({"label":"Transportation  Request To",id:"strRequestNoTo","anywhereSearch":"true"}),
			plf.addCombo({"label":"Status","id":"strStatus"}),
			plf.addDate({"label":"Transportation  Request Date From","id":"dtRequestDateFrom"}),
			plf.addDate({"label":"Transportation  Request Date To","id":"dtRequestDateTo"}),
			plf.addCombo({"label":"Demand Status","id":"strDemandStatus"}),
			plf.addCombo({"label":"Origin","id":"strOrigin"}),
			plf.addCombo({"label":"Destination","id":"strDestination"}),
			plf.addCombo({"label":"Priority","id":"strPriority"}),
			plf.addHlpText({"label":"Customer Code","id":"strCustomerCode",hlpLinkID:"customer"},this),
			
			plf.addButton({"label":"Search","id":"searchBtn","tooltip":"Click here to search."}),
		]
		
		vehicleBasedSummaryColumn.add(vehicleBasedSummaryFormCtrl);
		
		
		var vehicleBasedSummaryObj=
		[
			{columnname:"Vehicle Request No",dataname:"TRANS_REQ_NO",datatype:"string",width:150},
			{columnname:"Vehicle<br>Request<br>Date",dataname:"TARNS_REQ_DATE",datatype:"string",width:100},
		//	{columnname:"Request Type",dataname:"CONTRACT_DATE",datatype:"string",width:100},
			{columnname:"Customer Code",dataname:"CUST_CODE",datatype:"string",width:150},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},			
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:150},
			{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
		]
	  vehicleBasedSummaryGridDetail=
		{
			title:"",
			id:"searchGrid",
			detail:vehicleBasedSummaryObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
			
		}
		var helpGridSection=plf.addGrid(vehicleBasedSummaryGridDetail,this)	
		mainpage.hlpSearchGridPtr = helpGridSection
		
	//	customerContractSummaryGridSection = plf.addGrid(customerContractSummaryGridDetail,this)	
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(vehicleBasedSummaryColumn)
		mainpage.ptrMainSection.add(helpGridSection) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		mainpage.screenLinks=
		{
			"transreqno":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.TransRequestVehicleHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRequestNo","child":"TRANS_REQ_NO"}
							]
				},
				"customer":
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
		mainpage.hlpLinks=
		{
			"transreqno":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.TransRequestVehicleHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRequestNo","child":"TRANS_REQ_NO"}
							]
				}
					
		}		
		mainpage.eventHandlers = 
			[
			
               {
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initTransVehSummaryTS"
		      },
			  {       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strRequestNoFrom","strRequestNoTo","dtRequestDateFrom","dtRequestDateTo","strDemandStatus","strStatus","strOrigin",
				"strDestination","strPriority","strCustomerCode"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchTransOnSearchTS"
			}
			
					
			             
			];
		
		this.callParent(arguments);
		
	
	}
});
