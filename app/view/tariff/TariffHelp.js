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
Ext.define('CueTrans.view.tariff.TariffHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.hlpSectionFlag=true
		mainpage.startPainting();
		
		mainpage.screenName = "Tariff Search";
		
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=
		[
			{"name":"Create a new Tariff.","linkid":"fin_newTariff","tooltip":"Click here to create a new Tariff."}
		]
		
		plf.columns = 3
		var tariffHdrCollapse = plf.addColumnSection({title:"Search Criteria",collapsed: false,btnID:"btnSearch"},this); 	//69997
		
		
		var tariffFormCtrl=																				//69997

		[
			plf.addText({"label":"Tariff Code",id:"strTariffCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Tariff Code To",id:"strTariffCodeTo"}),
			plf.addText({"label":"Tariff Description",id:"strTariffDesc"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Currency",id:"strCurrency"}),
			plf.addCombo({"label":"Tariff Type",id:"strTariffType"}),
			plf.addButton({"label":"Search",id:"btnSearch"})
			
		]
		
		tariffHdrCollapse.add(tariffFormCtrl);
		//HelpOn3PL Header Section Ends
		
		//HelpOn3PL Grid Section Begins
		var tariffGridFieldObj=							//69997

		[
			{columnname:"Tariff Code",dataname:"TARIFF_CODE",datatype:"string",width:150},
			{columnname:"Tariff Description",dataname:"TARIFF_DESC",datatype:"string",width:150},
			{columnname:"Currency",dataname:"CURRENCY",datatype:"string",width:100},
			{columnname:"Tariff Type",dataname:"TARIFF_TYPE",datatype:"string",width:150},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"string",width:100},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:130},
			{columnname:"Exchange Rate",dataname:"EXCHANGE_RATE",datatype:"string",width:130}
		]
		 tariffGridDtl=										

		{
			title:"",
			id:"tariffGrid",
			detail:tariffGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
		}
		
		//HelpOn3PL Grid Section Ends
		
		//Add Child Sections
	
		mainpage.ptrMainSection.add(tariffHdrCollapse)//Add Header Section to Main Page
		var helpGridSection=plf.addGrid(tariffGridDtl,this)			//69997

		mainpage.hlpSearchGridPtr = helpGridSection
		mainpage.ptrMainSection.add(helpGridSection) 

		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strTariffCodeFrom","strTariffCodeTo","strTariffDesc","strStatus","strCountry","strCurrency",
						 "strTariffType"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"initTariffSrchTS"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strTariffCodeFrom","strTariffCodeTo","strTariffDesc","strStatus","strCountry","strCurrency",
						 "strTariffType"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchTariffSrchTS"
			}		
		];
		
		this.callParent(arguments);
		
	}
});