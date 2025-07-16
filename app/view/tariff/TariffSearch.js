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
Ext.define('CueTrans.view.tariff.TariffSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Tariff Summary";
		mainpage.toolbarSectionFlag=true;
		 mainpage.toolbarLinks=
		[
			{"name":"Create Tariff","linkid":"fin_newTariff","tooltip":"Click here to create tariff."}
		]
		
		plf.columns = 4
		var TariffHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);	//69997
		
		
		var TariffFormCtrl=																					//69997
		[
			plf.addText({"label":"Tariff Code",id:"strTariffCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Tariff Code To",id:"strTariffCodeTo"}),
			plf.addText({"label":"Tariff Description",id:"strTariffDesc"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Currency",id:"strCurrency"}),
			plf.addCombo({"label":"Tariff Type",id:"strTariffType"})
		]
		
		TariffHdrCollapse.add(TariffFormCtrl);
		//HelpOn3PL Header Section Ends
		
		//HelpOn3PL Grid Section Begins
		var TariffGridFieldObj=																				//69997
		[
			{columnname:"Tariff Code",dataname:"TARIFF_CODE",datatype:"string",width:150,linkId:"tariffmaster"},
			{columnname:"Tariff Description",dataname:"TARIFF_DESC",datatype:"string",width:150},
			{columnname:"Currency",dataname:"CURRENCY",datatype:"string",width:100},
			{columnname:"Tariff Type",dataname:"TARIFF_TYPE",datatype:"string",width:150},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"string",width:100},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:130}
		]
		TariffGridDtl=
		{
			title:"",
			id:"tariffGrid",
			detail:TariffGridFieldObj,
			visibleRow:plf.searchVisibleRows,
			readOnly:true,
			removeAddDelete:true
		}
		var TariffGridSection = plf.addGrid(TariffGridDtl,this)									//69997
		//HelpOn3PL Grid Section Ends
		
		//Add Child Sections
	
		mainpage.ptrMainSection.add(TariffHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(TariffGridSection) //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strTariffCodeFrom","strTariffDesc","strStatus","strCountry","strCurrency",
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
		//Event Handlers Mapping Ends
			
		//Generate Screen Section
		mainpage.screenLinks=
		{
			"tariffmaster":
				{
					"dest":"tariff.TariffMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"TARIFF_CODE","dest":"strTariffCode"}
							]
				},
				"fin_newTariff":
				{
					"dest":"tariff.TariffMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
			
		}
		
		this.callParent(arguments);
		
	}
});