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
Ext.define('CueTrans.view.tariff.GeoHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true
		mainpage.startPainting();
		
		mainpage.screenName = "Geo Search";
		
			
		plf.columns = 3
		var stateHelpHdrCollapse = plf.addColumnSection({title:"", collapsed: true});//69997
		
		
		var steteHelpFormCtrl=													//69997
		[
		    
			plf.addCombo({"label":"Help Level",id:"strHelpLevel"}),
			plf.addBlank({}),
			plf.addBlank({}),
			
			plf.addDisplayOnly({"label":"Country",id:"strCountry"}),
			plf.addCombo({"label":"State",id:"strState"}),
			plf.addCombo({"label":"City",id:"strCity"}),
			
			plf.addText({"label":"Zip Code",id:"strZipCode"}),
			plf.addBlank({}),
			plf.addBlank({}),
			
		    plf.addBlank({}),
			plf.addBlank({}),
		    plf.addButton({"label":"Search",id:"btnSearch"})
		]
		
		stateHelpHdrCollapse.add(steteHelpFormCtrl);
		//HelpOn3PL Header Section Ends
		
		//HelpOn3PL Grid Section Begins
		var stateHelpGridFieldObj=											//69997
		[
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",width:150},
			{columnname:"State",dataname:"STATE",datatype:"string",width:150},
			{columnname:"City",dataname:"CITY",datatype:"string",width:150},
			{columnname:"Zip Code",dataname:"ZIP_CODE",datatype:"string",width:150}
			
		]
		stateHelpGridDtl=
		{
			title:"",
			id:"stateGrid",
			detail:stateHelpGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
		}
		
		//HelpOn3PL Grid Section Ends
		
		//Add Child Sections
	
		mainpage.ptrMainSection.add(stateHelpHdrCollapse)//Add Header Section to Main Page
		var helpGridSection=plf.addGrid(stateHelpGridDtl,this)	//69997
		mainpage.hlpSearchGridPtr = helpGridSection
		mainpage.ptrMainSection.add(helpGridSection) 
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strCountry"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"initStateHelpTS"
			},
			{
				"controlid":"strState",
				"tasktype":"onchange",
				"input":["strState"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"onChangeStateTS"
		   },
		  {
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strCountry","strState","strCity","strZipCode"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchGeoDetTS"
			}
			
		];
	
		
		
		this.callParent(arguments);
		
	}
});
