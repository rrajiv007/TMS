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
Ext.define('CueTrans.view.tms.CustomerDemandSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Customer Demand Planning";
		mainpage.toolbarSectionFlag=true;
		//Customer demand Planning Search Section Begins
		plf.columns=3
		 var helpOnCustDemandHdrCollapse =plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);
	 	var helpOnCustDemandFormCtrl=
		[
			plf.addCombo({"label":"Request Type",id:"strRequestType"}),
			plf.addText({"label":"Request No From",id:"strRequestNoFrom"}),
			plf.addText({"label":"Request No To",id:"strRequestNoTo"}),
			plf.addDate({"label":"Request Date From",id:"dtTransReqDateFrom"}),
			plf.addDate({"label":"Request Date To",id:"dtTransReqDateTo"}),
			plf.addCombo({"label":"Priority",id:"strPriority"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addCombo({"label":"Demand Status",id:"strDemandStatus"}),
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"customerlink"},this),	
			//plf.addBlank(),
			//plf.addBlank(),
			//plf.addBlank(),
			//plf.addButton({"label":"Get Customer Demand",id:"searchBtn"}),
			//plf.addBlank()
		]
		
		helpOnCustDemandHdrCollapse.add(helpOnCustDemandFormCtrl);
		//Customer demand Search Section Ends
		
		//Customer Demand Grid Section Begins
		 var helpOnCustDemandGridFieldObj=
		[
			{columnname:"Request Date",dataname:"TARNS_REQ_DATE",datatype:"string",width:150},
			{columnname:"Customer Name",dataname:"CUST_NAME",datatype:"string",width:200},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:200},
			{columnname:"Total Weight(Tons)",dataname:"TOT_WEIGHT",datatype:"string",storeId:"status",width:200},
		]
		 var helpOnCustDemandGridDtl=
		{
			title:"",
			id:"CustDemandSearch",
	       detail:helpOnCustDemandGridFieldObj,
		   readonly:true,
		   visibleRow:plf.searchVisibleRows
		   }
		 var helpGridSection = plf.addGrid(helpOnCustDemandGridDtl,this)
		//Customer Demand Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnCustDemandHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		         {
				    "controlid":"",
				    "tasktype":"onload",
				    "input":[""],
				    "service":"TMSCoreTransportTS",
				    "methodName":"initCustomerDemandPlanTS"
			      },
                  {					
					"controlid":"searchBtn",
					"tasktype":"btnclick",
					"input":["strRequestType","strRequestNoFrom","strRequestNoTo","dtTransReqDateFrom","dtTransReqDateTo","strPriority","strOrigin","strDestination","strDemandStatus",
					"strCustomerCode"],
					"service":"TMSCoreTransportTS",
					"methodName":"getCustomerDemandTS"
					}				
		
			
		];
		
		mainpage.hlpLinks=
		{
			"customerlink":
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
	
		/*	mainpage.screenLinks=
		{
				"Create":
				{
					"dest":"jm_master.DriverMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
			
		}*/
		//Event Handlers Mapping Ends
			
		//Generate Screen Section
		/*mainpage.generateScreen();
		
		
		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
		
	}
});
