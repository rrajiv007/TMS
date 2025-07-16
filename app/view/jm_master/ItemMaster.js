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
Ext.define('CueTrans.view.jm_master.ItemMaster', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Item Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create an item."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit an item."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete an item."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate an item."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate an item."
            }
            ]
		
		
		
		plf.columns=3
		var itemHdrColumn = plf.addColumnSection({});			//69995
		

		var itemFormCtrl=						//69995
		[
			plf.addHlpText({"label":"Item Code",id:"strItemCode",mandatory:"true",hlpLinkID:"itemhelp"},this),
			plf.addText({"label":"Item Description",id:"strItemDescription",mandatory:"true",inputFormat:"string",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Standard UOM",id:"strStandardUom"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity",mandatory:"true"}),
			plf.addText({"label":"Unit Weight(kg)",id:"iWidth",mandatory:"true",inputFormat:"integer",InputLength:"6"}),
			 plf.addText({"label":"Length(m)",id:"iLength",inputFormat:"numeric",weightPrecision:"3"}),
			 plf.addText({"label":"Width(m)",id:"iWeight",inputFormat:"numeric",weightPrecision:"3"}),
			 plf.addText({"label":"Height(m)",id:"iHeight",inputFormat:"numeric",weightPrecision:"3"}),
			 plf.addText({"label":"Volume(cu.m)",id:"iVolume",inputFormat:"numeric",weightPrecision:"3"}),
			 plf.addBlank(),
			 plf.addBlank(),
			 plf.addFileUpload({"label":"Attach TREM",id:"strTREM",Entity:"Reports/images/TREM/File_Attachment",Path:"app"}),
			 plf.addFileUpload({"label":"Attach SHOC",id:"strSHOC",Entity:"Reports/images/SHOC/File_Attachment",Path:"app"}),
			 plf.addCombo({"label":"Hazmet",id:"strHazmet"}),
			 plf.addBlank(),
			 plf.addBlank()
		]
		 
		
		itemHdrColumn.add(itemFormCtrl);
		
		
		
		
		
		mainpage.ptrMainSection.add(itemHdrColumn)//Add Header Section to Main Page
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	      {
					"controlid":"",
					"tasktype":"onload",
					"input":["strItemCode"],
					"service":"CoreItemService",
					"methodName":"initItemMasterScrTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Create",
					"input":["strItemCode","strItemDescription","strCommodity","strStandardUom","iWidth","strStatus","iLength","iWeight","iHeight","strTREM",
					"strSHOC","strHazmet","iVolume"],
					"service":"CoreItemService",
					"methodName":"createItemTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Edit",
					"input":["strItemCode","strItemDescription","strCommodity","strStandardUom","iWidth","strStatus","iLength","iWeight","iHeight",
					,"strTREM",
					"strSHOC","strHazmet","iVolume"],
					"service":"CoreItemService",
					"methodName":"editItemTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Activate",
					"input":["strItemCode","strItemDescription","strCommodity","strStandardUom","iWidth","strStatus","iLength","iWeight","iHeight","strTREM",
					"strSHOC","strHazmet","iVolume"],
					"service":"CoreItemService",
					"methodName":"activeItemTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Inactivate",
					"input":["strItemCode","strItemDescription","strCommodity","strStandardUom","iWidth","strStatus","iLength","iWeight","iHeight","strTREM",
					"strSHOC","strHazmet","iVolume"],
					"service":"CoreItemService",
					"methodName":"inactivateItemTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Delete",
					"input":["strItemCode","strItemDescription","strCommodity","strStandardUom","iWidth","strStatus","iLength","iWeight","iHeight","strTREM",
					"strSHOC","strHazmet","iVolume"],
					"service":"CoreItemService",
					"methodName":"deleteItemTS"
			},
			
			{
				"controlid":"strItemCode",
				"tasktype":"onenter",
				"input":["strItemCode"],
				"service":"CoreItemService",
				"methodName":"fetchItemTS"
			}
            

		
		];
		
		mainpage.hlpLinks=
		{
			"itemhelp":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.ItemHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strItemCode","child":"ITEM_CODE"},
							{"parent":"strItemDescription","child":"ITEM_DESCRIPTION"},
							{"parent":"strStatus","child":"STATUS"},
							{"parent":"strCommodity","child":"COMMODITY_TYPE"},
							{"parent":"strStandardUom","child":"STANDARD_UOM"},
							{"parent":"iWeight","child":"WEIGHT_IN_KG"},
							{"parent":"iVolume","child":"TOT_VOLUME"},
							{"parent":"iLength","child":"LENGTH"},
							{"parent":"iWidth","child":"WIDTH"},
							{"parent":"iHeight","child":"HEIGHT"}
							]
				}
			
		}
		

		
		
		this.callParent(arguments);
		
	}
});
