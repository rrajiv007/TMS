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
Ext.define('CueTrans.view.track.ItemDetails', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Item Details";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		//Add Keyfields
		mainpage.keyFields=["strItemCode"]
		
		var formCtrl=[];
		
		//Item Details Grid Section Begins
		var RouteGridFieldObj=											//69997
		[   
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Item Description",dataname:"ITEM_DESC",datatype:"string",editControl:"textbox",width:170},
			{columnname:"Quantity",dataname:"ITEM_QTY",datatype:"string",editControl:"textbox",width:170},
			{columnname:"Weight (Tons)",dataname:"WEIGHT",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Volume (cu.m.)",dataname:"VOLUME",datatype:"string",editControl:"textbox",width:180}			
			
		]
		RouteGridDtl=
		{
			title:"Item Details",
			id:"itemDtlCache",
			detail:RouteGridFieldObj,
			visibleRow:8
		}
		//Route Grid Section Ends
		//mainpage.ptrMainSection.add(routeFileUploadSection)
		//Add Child Sections
		var tmp_gridsection1 = plf.addGrid(RouteGridDtl)	//69997
		
 	//Add Grid Section to Main Page
		mainpage.ptrMainSection.add(tmp_gridsection1) //Add Grid Section to Main Page
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
				mainpage.eventHandlers = 
			[
				{
					"controlid":"",
					"tasktype":"onload",
					"input":["strShippmentNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"initItemDetailsTS"
				}
								
				
			];
			
			mainpage.hlpLinks=
		{
		
		}
			
			//Event Handlers Mapping Ends
			mainpage.screenModes=
		{
			

			
		}
			
			//Generate Screen Section
	/*	mainpage.generateScreen();
		
		
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
