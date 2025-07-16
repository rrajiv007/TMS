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
Ext.define('CueTrans.view.jm_master.NumberingTypeMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Numbering Series";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Save",
                "tooltip": "Click here to save the numbering series."
            }
            ]
		//Add Keyfields
		mainpage.keyFields=["iVersionNo"]
		
		//Numbering Type Section starts
		plf.columns=4
		var numberingTypeMasterColumn = plf.addColumnSection({title:""});			//69995
		
		var numberingTypeMasterFormCtrl=			//69995
		[
			
			plf.addCombo({"label":"Tran Type",id:"strTranType","mandatory":"true"}),
			plf.addText({"label":"Version No",id:"iVersionNo","inputFormat":"integer","InputLength":4}),
			plf.addDate({"label":"Effective From",id:"dtEffectiveFrom","mandatory":"true"}),
			plf.addDate({"label":"Effective To",id:"dtEffectiveTo","mandatory":"true"})
		]
		numberingTypeMasterColumn.add(numberingTypeMasterFormCtrl);

		plf.columns=4
		var	numberingMasterColumn = plf.addColumnSection({title:""});			//69995
		var numberingMasterFormCtrl=						//69995
		[
			
			plf.addText({"label":"Auto Length",id:"iAutoLength","mandatory":"true","inputFormat":"integer","InputLength":2}),
			plf.addText({"label":"Level",id:"iLevel","mandatory":"true","inputFormat":"integer","InputLength":2}),			
			plf.addText({"label":"Starting No",id:"iStartingNo","mandatory":"true","inputFormat":"integer","InputLength":20}),
			plf.addText({"label":"Ending No",id:"iEndingNo","inputFormat":"integer","InputLength":20}),/*57655 mandatory removed*/
			plf.addText({"label":"Preview",id:"strPreview",Width:20})			
		]
		
		numberingMasterColumn.add(numberingMasterFormCtrl);
		//Numbering Type Header Section Ends
		
		//Numbering Type Grid Section Begins
		var numberingTypeGridFieldObj=			//69995
		[
			{columnname:"Sequence",dataname:"SEQUENCE",datatype:"string",editControl:"textbox",width:80,"inputFormat":"integer","InputLength":2},
			{columnname:"Element",dataname:"ELEMENT",storeId:"strElement",datatype:"string",editControl:"combo",width:150},
			{columnname:"Data",dataname:"DATA",datatype:"string",storeId:"strData",editControl:"combo",width:150},
			{columnname:"Value",dataname:"VALUE",datatype:"string",editControl:"textbox",width:150,"inputFormat":"string","InputLength":10},
			{columnname:"Length",dataname:"LENGTH",datatype:"string",editControl:"textbox",width:150,"inputFormat":"integer","InputLength":2},
			{columnname:"Type",dataname:"TYPE",datatype:"string",storeId:"strType",editControl:"combo",width:150},
			{columnname:"Separator",dataname:"SEPARATOR",datatype:"string",storeId:"strSeparator",editControl:"combo",width:137},					
		]
		var numberingTypeGridDtl=					//69995
		{
			title:"Prefix / Suffix",
			id:"numberingTypeMaster",
			detail:numberingTypeGridFieldObj
			
		}
		//Numbering Type Grid Section Ends
		var tmp_gridsection1 = plf.addGrid(numberingTypeGridDtl,this);			//69995
		
		numberingGridContainer = plf.addColumnSection({title:""});
		numberingGridContainer.add(tmp_gridsection1);
		//Add Child Sections
		//tmp_gridsection1 = plf.addGrid(numberingTypeGridDtl,this)	
		mainpage.ptrMainSection.add(numberingTypeMasterColumn)//Add Header Section to Numbering Type Page
		mainpage.ptrMainSection.add(numberingMasterColumn)//Add Header Section to Numbering Type Page
		mainpage.ptrMainSection.add(numberingGridContainer) //Add Grid Section to Numbering Type Page
		/*
		mainpage.ptrMainSection.add(numberingTypeMasterColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(violationGridSection) //Add Grid Section to Main Page
		*/
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreNumberingService",
				"methodName":"initNumberingSeriesScrTS"
			},
		
			{
				"controlid":"strTranType",
				"tasktype":"onchange",
				"input":["strTranType"],
				"service":"CoreNumberingService",
				"methodName":"fetch_Tran_type_NumberingSeriesScrTS"
			},
			{
				"controlid":"iVersionNo",
				"tasktype":"onenter",
				"input":["iVersionNo","strTranType"],
				"service":"CoreNumberingService",
				"methodName":"fetch_version_NumberingSeriesScrTS"
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strTranType","iVersionNo","dtEffectiveFrom","dtEffectiveTo","iAutoLength","iLevel","iStartingNo","iEndingNo",					"strPreview","numberingTypeMaster"],
				"service":"CoreNumberingService",
				"methodName":"maintainNumberingSeriesScrTS"

			}
			,
				{
				
					"tasktype":"proto",
					"filename":"jm_master/NumberingSeries.json"
			}
		];
		//Event Handlers Mapping Ends
		
			
		/*	mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":[]
			},
			"locked":
			{
				"enableAll":false,
				"except":["strNumTypeCode"]
			},
			"active":
			{
				"enableAll":false,
				"except":[""]
			}			
		}*/



			
		/*	//Generate Screen Section
		mainpage.generateScreen();
		
		
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
