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
		var stateHelpHdrCollapse = plf.addColumnSection({title:"", collapsed: true});	//69997
		
		
		var steteHelpFormCtrl=				//69997
		[
		   // plf.addText({"label":"Country",id:"strCountry"})
	
		]
		
		stateHelpHdrCollapse.add(steteHelpFormCtrl);
		//HelpOn3PL Header Section Ends
		
		//HelpOn3PL Grid Section Begins
		var stateHelpGridFieldObj=					//69997
		[
			{columnname:"City",dataname:"CITY",datatype:"string",width:150},
			{columnname:"Zip Code",dataname:"ZIPCODE",datatype:"string",width:150}
			
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
		var helpGridSection=plf.addGrid(stateHelpGridDtl,this)				//69997
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
			}
			
		];
	
		
		
		this.callParent(arguments);
		
	}
});
