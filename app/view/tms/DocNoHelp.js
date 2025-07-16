/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                   Addition of var	 
1.0.2       steffie        15/03/2016     71027,71738             ref doc no on enter and help                                  
************************************************************************************************/
Ext.define('CueTrans.view.tms.DocNoHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		mainpage.screenName = "Request DocNo Search";	
		
		//Truck Master Section starts

		var formCtrl=[];
		plf.columns=3
		var vehicleBasedSummaryColumn = plf.addColumnSection({title:"", collapsed: true});
		
		
		var vehicleBasedSummaryFormCtrl=
		[
			//plf.addCombo({"label":"Request Type","id":"strRequestType"}),
			plf.addText({"label":"Ref Doc No",id:"strDocNo","anywhereSearch":"true"}),
			plf.addText({"label":"Request No",id:"strRequestNoFrom","anywhereSearch":"true"}),
			plf.addHlpText({"label":"Customer Code","id":"strCustomerCode",hlpLinkID:"customer"},this),
			plf.addCombo({"label":"Priority","id":"strPriority"}),
			plf.addCombo({"label":"Status","id":"strStatus"}),
			
			plf.addCombo({"label":"Origin","id":"strOrigin"}),
			plf.addCombo({"label":"Destination","id":"strDestination"}),
			plf.addCombo({"label":"Demand Status","id":"strDemandStatus"}),
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			
			plf.addDate({"label":"Date From","id":"dtRequestDateFrom"}),
			plf.addDate({"label":"Date To","id":"dtRequestDateTo"}),
			
			plf.addText({"label":"Logistics Group",id:"strLogGroup","anywhereSearch":"true"}),
			
			plf.addText({"label":"Division",id:"strDivCode","anywhereSearch":"true"}),
			plf.addCombo({"label":"Remarks","id":"strRequestNoTo"}),
			plf.addButton({"label":"Search","id":"searchBtn","tooltip":"Click here to search."})
		]
		
		 vehicleBasedSummaryColumn.add(vehicleBasedSummaryFormCtrl);
		
		
		var vehicleBasedSummaryObj=
		[   
		    {columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:150},
			{columnname:"Request No",dataname:"TRANS_REQ_NO",datatype:"string",width:150},
			{columnname:"Request<br>Date",dataname:"TARNS_REQ_DATE",datatype:"string",width:100},
		//	{columnname:"Request Type",dataname:"CONTRACT_DATE",datatype:"string",width:100},
			{columnname:"Customer Code",dataname:"CUST_CODE",datatype:"string",width:150},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},			
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:150},
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
		//mainpage.dataHistorySectionFlag=false;
		mainpage.screenLinks=
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
		
		
		mainpage.eventHandlers = 
			[
			
               {
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initTransItemSummaryTS"
		      },
			  {       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strRequestNoFrom","dtRequestDateFrom","dtRequestDateTo","strDemandStatus","strStatus","strOrigin",
				"strDestination","strPriority","strCustomerCode","strDateType","strLogGroup","strDivCode","strRequestNoTo","strDocNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchTransItemOnSearchTS"
			}     
			];
		
		this.callParent(arguments);
		
	
	}
});