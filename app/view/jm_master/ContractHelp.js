/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID		Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	        Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.ContractHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		
		mainpage.screenName = "Contract Help";
		
		plf.columns=4
		var contractMstrColumn = plf.addColumnSection({title:"", collapsed: false});		//69995
		//Contract Header Section Begins
		var contractMasterCtrl=					//69995
		[	
			plf.addText({"label":"Contract No From","id":"strContractFrom"}),
			plf.addText({"label":"Contract No To","id":"strContractTo"}),
			plf.addDate({"label":"Effective From","id":"dteffectiveFrom"}),
			plf.addDate({"label":"Effective To","id":"dteffectiveTo"}),
			plf.addCombo({"label":"Contract Type","id":"strContractType"}),
			plf.addText({"label":"Customer/3PL Owner From","id":"strCustomerFrom"}),
			plf.addText({"label":"Customer/3PL Owner T0","id":"strCustomerTo"}),
			plf.addBlank(),
			plf.addButton({"label":"Search","id":"btnSearch"})
		]
		
		contractMstrColumn.add(contractMasterCtrl);
		//Contract Header Section Ends

		//Contract Search Grid Section Starts
		var contractGridFieldObj=				//69995
		[
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:150},
			{columnname:"Contract Date",dataname:"CONTRACT_DATE",datatype:"string",width:150},
			{columnname:"Contract Type",dataname:"CONTRACT_TYPE",datatype:"string",width:150},
			{columnname:"Customer Name",dataname:"CUSTOMER_NAME",datatype:"string",width:150},
			{columnname:"3PL Owner Name",dataname:"OWNER_NAME_3PL",datatype:"string",width:150},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"string",width:150},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"string",width:150}
		]
		var contractGridDtl=			//69995
		{
			title:"Contract Details",
			id:"contractDtlcache",
			detail:contractGridFieldObj
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
		}
		var helpGridSection = plf.addGrid(contractGridDtl,this)  //69995
		mainpage.hlpSearchGridPtr = helpGridSection		
		//Contract Search Grid Section Ends
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(contractMstrColumn) //Add Header Section to Main Page
		//mainpage.ptrMainSection.add(contractGridSection)  //Add Grid Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection)  //Add Grid Section to Main Page
		
		//To Call Master Page Begins
		/*
		mainpage.screenLinks=
		{
			"cntractMstr":
				{
					"dest":"jm_master.ContractMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"CONTRACT_NO","dest":"strContractNo"}
							]
				}
		}
		*/
		//To Call Master Page Ends
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreContractService",
				"methodName":"initContractSearchScrTS"
			},	
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreContractService",
				"methodName":"fetchAllContractsTS"
			},	
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strContractFrom"],
				"service":"CoreContractService",
				"methodName":"fetchAllContractsTS"
			},					
			/*{
				"tasktype":"proto",
				"filename":"jm_master/DriverMaster.json"
			}*/	
		];
		//Event Handlers Mapping Ends
			
		//Generate Screen Section
		
		this.callParent(arguments);
		
	}
});
