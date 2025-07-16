/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	                           Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.ContractMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Contract Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Refresh","Create","Edit","Delete","Activate","Inactivate"]
		
		//Add Keyfields
		mainpage.keyFields=["strContractNo"]
		
		//Contract Master Section Begins
		plf.columns=4
		var contractMstrColumn = plf.addColumnSection({});		//69995
		var contractMasterCtrl=									//69995	
		[	
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addDisplayOnly({"label":"Status",id:"strstatus"}),
			plf.addHlpText({"label":"Contract No",id:"strContractNo",hlpLinkID:"conno"},this),
			plf.addText({"label":"Contract Details","id":"strContractDetails"}),
			plf.addDate({"label":"Contract Date","id":"dtContractDate"}),
			plf.addCombo({"label":"Contract Type",id:"strContractType"}),
			plf.addCombo({"label":"3PL Owner/Customer",id:"strCustomer"}),
			plf.addText({"label":"3PL Owner Code/Customer Code","id":"strCustomerCode"}),
			plf.addText({"label":"3PL Owner Code/Customer Name","id":"strCustomerName"}),
			plf.addDate({"label":"Effective From","id":"dteffectiveFrom"}),
			plf.addDate({"label":"Effective To","id":"dteffectiveTo"}),
			plf.addButton({"label":"Submit","id":"btnSubmit"})
			
		]
		
		contractMstrColumn.add(contractMasterCtrl);
		//Contract Header Section Ends

		//Add Child Sections
		
		mainpage.ptrMainSection.add(contractMstrColumn) //Add Header Section to Main Page
		
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strContractNo","strContractType"],
				"service":"CoreContractService",
				"methodName":"initContractMasterScrTS"
			},
			{
				"controlid":"strContractType",
				"tasktype":"onchange",
				"input":["strContractType"],
				"service":"CoreContractService",
				"methodName":"onChangeCustomerTS"
			},
			{
				"controlid":"strCustomerCode",
				"tasktype":"onenter",
				"input":["strCustomerCode"],
				"service":"CoreContractService",
				"methodName":"fetch3PLOwnerTS"
			},
			/*{
				"controlid":"btnSubmit",
				"tasktype":"btnclick",
				"input":["strContractNo","strContractDetails","strContractType","dtContractDate","strCustomerCode","dteffectiveFrom","dteffectiveTo"],
				"service":"CoreContractService",
				"methodName":"modifyContractTS"
			},*/
			{  
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"create",
					"input":["strContractNo","strContractDetails","strContractType","dtContractDate","strCustomerCode","dteffectiveFrom","dteffectiveTo"],
					"service":"CoreContractService",
					"methodName":"createContractTS"
			},
			{  
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"edit",
					"input":["strContractNo"],
					"service":"CoreContractService",
					"methodName":"modifyContractTS"
			},
			
			{  
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"delete",
					"input":["strContractNo"],
					"service":"CoreContractService",
					"methodName":"deleteContractTS"
			},
			{  
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"activate",
					"input":["strContractNo"],
					"service":"CoreContractService",
					"methodName":"activateContractTS"
			},
			{  
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"inactivate",
					"input":["strContractNo"],
					"service":"CoreContractService",
					"methodName":"inactivateContractTS"
			},
		];
		//Event Handlers Mapping Ends
		mainpage.hlpLinks=
		{
			"conno":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.ContractHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strContractNo","child":"CONTRACT_NO"}
							]
				}
		}
		
		mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":[]
			},
			"locked":
			{
				"enableAll":false,
				"except":["strRouteId"]
			},
			"active":
			{
				"enableAll":false,
				"except":["routeDtlCache"]
			}			
		}	
		//Generate Screen Section
		
		this.callParent(arguments);
		
	}
});
