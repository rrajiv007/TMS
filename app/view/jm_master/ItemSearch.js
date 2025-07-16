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
Ext.define('CueTrans.view.jm_master.ItemSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Item Summary";
		
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Create Item","linkid":"jm_CreateItemMst","tooltip":"Click here to create an item."},
		]

		plf.columns = 3
		var helpOnItemHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);		//69995
		
		var itemSearchCtrl=			//69995
		[
			plf.addText({"label":"Item Code",id:"strItemCode","anywhereSearch":"true"}),
			plf.addText({"label":"Item Description",id:"strItemDescription","anywhereSearch":"true"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity","mandatory":"true"}),
			plf.addCombo({"label":"Status",id:"strStatus"})
            //plf.addText({"label":"Weight",id:"iWeightFrom","anywhereSearch":"true"})
			//plf.addText({"label":"Weight To",id:"iWeightTo"}),
            //plf.addBlank(),
			//plf.addButton({"label":"Search","id":"btnSearch","tooltip":"Click here to search."})
		]
		
		helpOnItemHdrCollapse.add(itemSearchCtrl);
		
		var itemGridFieldObj=			//69995
		[ 
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",width:120,linkId:"itemmaster","tooltip":"Click here to launch the item screen."}, 
			{columnname:"Item Description",dataname:"ITEM_DESCRIPTION",datatype:"string",width:280},
			{columnname:"Commodity",dataname:"COMMODITY_TYPE",datatype:"string",width:120},
			{columnname:"Standard<BR>UOM",dataname:"STANDARD_UOM",datatype:"string",width:100},
			{columnname:"Weight<BR>(kg)",dataname:"WEIGHT_IN_KG",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Volume<BR>(cu.m)",dataname:"TOT_VOLUME",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
            {columnname:"Length<BR>(m)",dataname:"LENGTH",datatype:"string",width:100,colAlign:'right',weightPrecision:2},
			{columnname:"Width<BR>(m)",dataname:"WIDTH",datatype:"string",width:100,colAlign:'right',weightPrecision:2}, 
            {columnname:"Height<BR>(m)",dataname:"HEIGHT",datatype:"string",width:100,colAlign:'right',weightPrecision:2},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
		]
		
		var itemGridDtl=			//69995
		{
			title:"ItemDetails",
			id:"itemGrid",
			detail:itemGridFieldObj,
			visibleRow:plf.searchVisibleRows,
		    removeAddDelete:true
		}
		
		var helpGridSection = plf.addGrid(itemGridDtl,this)			//69995
		mainpage.hlpSearchGridPtr = helpGridSection 
		
		mainpage.ptrMainSection.add(helpOnItemHdrCollapse)
		mainpage.ptrMainSection.add(helpGridSection) 
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	       	{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreItemService",
				"methodName":"initItemSrchTS"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strItemCode","strItemDescription","strCommodity","iWeightFrom","strStatus"],
				"service":"CoreItemService",
				"methodName":"fetchAllItems"
			}	
		];
		
		mainpage.screenLinks=
		{
				"itemmaster":
				{
					"dest":"jm_master.ItemMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"ITEM_CODE","dest":"strItemCode"}
							]
				},
				"jm_CreateItemMst":
				{
					"dest":"jm_master.ItemMaster",
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