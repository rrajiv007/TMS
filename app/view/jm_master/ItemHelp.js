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
Ext.define('CueTrans.view.jm_master.ItemHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Item Help";
		
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		
		mainpage.screenName = "Item Help";
		// Add Toolbar
		mainpage.toolbarSectionFlag=false;
				
		plf.columns=3
		var helpOnItemHdrCollapse = plf.addColumnSection({title:"Search Criteria", collapsed: false}); 		//69995
		
		var itemSearchCtrl=			//69995
		[
			plf.addText({"label":"Item Code",id:"strItemCode","anywhereSearch":"true"}),
			//plf.addText({"label":"Item Code To",id:"strItemCodeTo","anywhereSearch":"true"}),
			plf.addText({"label":"Item Description",id:"strItemDescription"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity","mandatory":"true"}),
			plf.addHidden({"label":"Context",id:"strContext"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addButton({"label":"Search","id":"btnSearch","tooltip":"Click here to search."})
			
		]
		
		helpOnItemHdrCollapse.add(itemSearchCtrl);
			
		
		var itemGridFieldObj=			//69995
		[ 
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",width:100}, 
			{columnname:"Item Description",dataname:"ITEM_DESCRIPTION",datatype:"string",width:270},
			{columnname:"Commodity",dataname:"COMMODITY_TYPE",datatype:"string",width:100},
			{columnname:"Standard<BR>UOM",dataname:"STANDARD_UOM",datatype:"string",width:80},
			{columnname:"Weight<BR>(kg)",dataname:"WEIGHT_IN_KG",datatype:"string",width:80,colAlign:'right',weightPrecision:3},
            {columnname:"Volume<BR>(cu.m)",dataname:"TOT_VOLUME",datatype:"string",width:70,colAlign:'right',weightPrecision:3},
            {columnname:"Length<BR>(m)",dataname:"LENGTH",datatype:"string",width:70,colAlign:'right',weightPrecision:2},
            {columnname:"Width<BR>(m)",dataname:"WIDTH",datatype:"string",width:70,colAlign:'right',weightPrecision:2}, 
            {columnname:"Height<BR>(m)",dataname:"HEIGHT",datatype:"string",width:70,colAlign:'right',weightPrecision:2},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:70}
		]
		var itemGridDtl=				//69995
		{
			title:"ItemDetails",
			id:"itemGrid",
			detail:itemGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
		}
		
		var helpGridSection = plf.addGrid(itemGridDtl,this)		//69995
		mainpage.hlpSearchGridPtr = helpGridSection 
			
		mainpage.ptrMainSection.add(helpOnItemHdrCollapse)
		mainpage.ptrMainSection.add(helpGridSection) 
		
		// Event Handlers Mapping Begins
			mainpage.eventHandlers = 
		[
	       	{
					"controlid":"",
					"tasktype":"onload",
					"input":["strContext"],
					"service":"CoreItemService",
					"methodName":"initItemSrchTS"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strItemCode","strItemDescription","strCommodity","strStatus"],
				"service":"CoreItemService",
				"methodName":"fetchAllItems"
			},
				
		];
				
		
			this.callParent(arguments);
		
	}
});