Ext.define('CueTrans.view.customerrequest.CustomerRequestHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Material Movement Request Help";
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();		
		
	    
		
		//Customer Request Link starts

		var formCtrl=[];
		plf.columns=3
		customerRequestColumn =  plf.addColumnSection({title:"", collapsed: true});
		
		
		
		customerContractSummaryFormCtrl=
		[
			plf.addText({"label":"Material Movement From",id:"strCustomerRequestFrom"}),
			plf.addText({"label":"Material Movement To",id:"strCustomerRequestTo"}),
			plf.addCombo({"label":"Status","id":"strStatus"}),
			
			plf.addDate({"label":"Material Movement Date From","id":"dtCusDateFrom"}),
			plf.addDate({"label":"Material Movement Date To","id":"dtCusDateTo"}),
			plf.addCombo({"label":"Request Type","id":"strRequestType"}),
			
			
			plf.addHlpText({"label":"Customer Code","id":"strCustomerCode",hlpLinkID:"customer"},this),
			plf.addHlpText({"label":"Contract No",id:"strContractNo",hlpLinkID:"customercontract"},this),
			plf.addCombo({"label":"Contract Type","id":"strContractType"}),
			plf.addCombo({"label":"Origin","id":"strOrigin"}),
			plf.addCombo({"label":"Destination","id":"strDestination"}),
			plf.addBlank(),
			plf.addBlank(),
			plf.addButton({"label":"Search","id":"searchBtn"})
		
		]
		
		customerRequestColumn.add(customerContractSummaryFormCtrl);
		
		
		customerRequestSummaryObj=
		[
			{columnname:"Material<br>Movement No",dataname:"CUST_REQ_NO",datatype:"string",width:120,linkId:"contractsmaster"},
			{columnname:"Material<br>Movement<br>Date",dataname:"CUST_REQ_DATE",datatype:"string",width:90},
			{columnname:"Request<br>Type",dataname:"CUST_REQ_TYPE",datatype:"string",width:100},
			{columnname:"Customer<br>Code",dataname:"CUSTOMER_CODE",datatype:"string",width:80},
			{columnname:"Contract<br>Type",dataname:"CONTRACT_TYPE",datatype:"string",width:80},
			{columnname:"Contract<br>No",dataname:"CONTRACT_NO",datatype:"string",width:120},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:90},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:100},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:100},
			{columnname:"Reference<br>Doc No",dataname:"REFDOCNO",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
		]
		customerRequestSummaryGridDetail=
		{
			title:"",
			id:"custReqGrid",
			detail:customerRequestSummaryObj,
			visibleRow:10,
			removeAddDelete:true
			
		}
		
		helpGridSection=plf.addGrid(customerRequestSummaryGridDetail,this)	
		mainpage.hlpSearchGridPtr = helpGridSection
		
		
		
		mainpage.ptrMainSection.add(customerRequestColumn)
		mainpage.ptrMainSection.add(helpGridSection) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		
		mainpage.eventHandlers = 
		[
	        {
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreCustomerRequest",
				"methodName":"initCustomerLinkTS"
			},
			{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strCustomerRequestFrom","strCustomerRequestTo","dtCusDateFrom","dtCusDateTo","strContractType","strRequestType"
				,"strContractNo","strOrigin","strCustomerCode","strDestination","strStatus"],
				"service":"CoreCustomerRequest",
				"methodName":"fetchCustomerReqTS"
			}
			
			      
			       
			
		];	
		mainpage.hlpLinks=
		{
			"customercontract":
				{
					"hlpType":"Header",
					"hlpScreen":"contracts.CustomerContractHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strContractNo","child":"CUST_CONT_NO"}
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
		

					
		
		this.callParent(arguments);
		
	
	}
});
