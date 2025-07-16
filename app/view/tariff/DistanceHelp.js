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
Ext.define('CueTrans.view.tariff.DistanceHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		
		mainpage.screenName = "Distance Help";
		

		plf.columns = 3
		var distHdrCollapse = plf.addColumnSection({title:"", collapsed: true});//69997
		
		
		var distFormCtrl=								//69997
		[
			plf.addText({"label":"Distance Code",id:"strDistCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Distance Code To",id:"strDistCodeTo"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),			
			plf.addText({"label":"Description",id:"strDistDesc"}),
			plf.addText({"label":"From Location",id:"strFromLoc"}),
			plf.addText({"label":"To Location",id:"strToLoc"}),			
			plf.addText({"label":"Distance(km)",id:"strDistance"}),
			plf.addBlank({}),
			plf.addButton({"label":"Search",id:"btnSearch"}),
			plf.addBlank({})
			
		]
		
		distHdrCollapse.add(distFormCtrl);
		
		var distGridFieldObj=									//69997
		[
			{columnname:"Distance Code",dataname:"DIST_CODE",datatype:"string",width:150,linkId:"distancemaster"},
			{columnname:"Description",dataname:"DIST_DESC",datatype:"string",width:150},
			{columnname:"From Location",dataname:"FRM_LOC_CODE",datatype:"string",datatype:"string",width:100},
			{columnname:"To Location",dataname:"TO_LOC_CODE",datatype:"string",width:130},
			{columnname:"Distance(Km)",dataname:"DISTANCE",datatype:"string",width:130},			
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:130}
		]
		distGridDtl=
		{
			title:"",
			id:"distGrid",
			detail:distGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
		}
		
		
	
		mainpage.ptrMainSection.add(distHdrCollapse)
		var helpGridSection=plf.addGrid(distGridDtl,this)	//69997
		mainpage.hlpSearchGridPtr = helpGridSection
		mainpage.ptrMainSection.add(helpGridSection) //Add Header Section to Main Page
		 //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins

		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TARCoreTariffServiceTS",
				"methodName":"initDistSrchTS"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strDistCodeFrom","strDistCodeTo","strDistDesc","strStatus","strFromLoc","strToLoc","strDistance"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchAllDistanceTS"
			}
		
		];
		
		this.callParent(arguments);
		
	}
});