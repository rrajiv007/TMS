Ext.define('CueTrans.view.tms.TransRequestVehicleSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Transportation Request List";
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Create Transportation Request Vehicle Based","linkid":"tms_transvehbasedsum"}
		]		
		
		//Truck Master Section starts

		var formCtrl=[];
		plf.columns=3
		customerContractSummaryColumn = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);
		
		
		customerContractSummaryFormCtrl=
		[
			plf.addText({"label":"Transportation  Request From",id:"strRequestNoFrom"}),
			plf.addText({"label":"Transportation  Request To",id:"strRequestNoTo"}),
			plf.addCombo({"label":"Status","id":"strStatus"}),
			plf.addDate({"label":"Transportation  Request Date From","id":"dtRequestDateFrom"}),
			plf.addDate({"label":"Transportation  Request Date To","id":"dtRequestDateTo"}),
			plf.addCombo({"label":"Demand Status","id":"strDemandStatus"}),
			plf.addCombo({"label":"Origin","id":"strOrigin"}),
			plf.addCombo({"label":"Destination","id":"strDestination"}),
			plf.addCombo({"label":"Priority","id":"strPriority"}),
			plf.addHlpText({"label":"Customer Code","id":"strCustomerCode",hlpLinkID:"customer"},this),
			
			//plf.addButton({"label":"Search","id":"searchBtn"}),
		]
		
		customerContractSummaryColumn.add(customerContractSummaryFormCtrl);
		
		
		customerContractSummaryObj=
		[
			{columnname:"Vehicle Request No",dataname:"TRANS_REQ_NO",datatype:"string",width:150,linkId:"vehiclerequest"},
			{columnname:"Vehicle<br>Request<br>Date",dataname:"TARNS_REQ_DATE",datatype:"string",width:100},
		//	{columnname:"Request Type",dataname:"CONTRACT_DATE",datatype:"string",width:100},
			{columnname:"Customer Code",dataname:"CUST_CODE",datatype:"string",width:150},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},			
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:150},
			{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
		]
		customerContractSummaryGridDetail=
		{
			title:"",
			id:"searchGrid",
			detail:customerContractSummaryObj,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true
			
		}
		customerContractSummaryGridSection = plf.addGrid(customerContractSummaryGridDetail,this)	
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(customerContractSummaryColumn)
		mainpage.ptrMainSection.add(customerContractSummaryGridSection) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		
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
		
		
		mainpage.hlpLinks=
		{
			
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
		
		mainpage.screenLinks=
		{
			
				"tms_transvehbasedsum":
				{
					"dest":"tms.TransRequestVehicleBased",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"vehiclerequest":
				{
					"dest":"tms.TransRequestVehicleBased",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"TRANS_REQ_NO","dest":"strRequestNo"}
							]
				}
				
				
					
		}
		
		
		
		this.callParent(arguments);
		
	
	}
});
