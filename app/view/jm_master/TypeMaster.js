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
Ext.define('CueTrans.view.jm_master.TypeMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
			
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Business Parameters";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		 mainpage.toolbarLinks=
		[
			{"name":"Commodity Exclusion","linkid":"commodityExclusionId","tooltip":"Click here to configure commodity exclusion."}
		]
		
	//	mainpage.toolbarActions=["refresh","create","edit","delete","activate","inactivate"]
		mainpage.toolbarActions= [{
                "name": "Save",
                "tooltip": "Click here to save."
            }
            ]
		//TypeMaster Header Section Begins
		plf.columns=4
		var typeMasterColumn = plf.addColumnSection({});	//69995
		var typeMstrCtrl=									//69995
		[
		    plf.addCombo({"label":"Group Category",id:"strGroup","width":"50"}),
			plf.addCombo({"label":"Category",id:"strCategoryName","width":"50"}),
			plf.addBlank(),
			plf.addBlank(),
			//plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			//plf.addButton({"label":"submit",id:"buttonclick"})
		]
		typeMasterColumn.add(typeMstrCtrl);
		typeMasterColumn.add(plf.addStripLine({}));
		//TypeMaster Header Section Ends
		
		//TypeMaster Grid Section Begins
		var typeMstrFieldObj=				//69995
		[
			{columnname:"Sequence No",dataname:"TYPE_SEQ_NO",datatype:"string",editControl:"textbox",width:150,hidden:true},	
			{columnname:"Type Code",dataname:"TYPE_CODE",datatype:"string",editControl:"textbox",width:150,inputFormat:"string",InputLength:"40"},
			{columnname:"Type Description",dataname:"TYPE_DESC",datatype:"string",editControl:"textbox",width:150,inputFormat:"string",InputLength:"100"},
			{columnname:"Default",dataname:"TYPE_DEFAULT",datatype:"string",editControl:"combo",width:150,storeId:"strDefault"},
			{columnname:"Active",dataname:"TYPE_STATUS",datatype:"string",editControl:"combo",width:150,storeId:"strStatus"}
			
		]
		var typeMstrGridDtl=			//69995
		{
			title:"Type Details",
			id:"typeDtlCache",
			detail:typeMstrFieldObj,
			visibleRow:10
		}
		
		var typeMstrGridSection = plf.addGrid(typeMstrGridDtl,this)				//69995
		//TypeMaster Grid Section Ends
		
		//Catergory Description section starts
		var catergoryDescColumn = plf.addColumnSection({});			//69995
		var catergoryDescCtrl=										//69995
		[
		 plf.addDisplayOnly({"label":"Catergory Description",id:"strCategoryDesc",inputFormat:"string",InputLength:"100"}),
		]
		catergoryDescColumn.add(catergoryDescCtrl);
		catergoryDescColumn.add(plf.addStripLine({}));
		
		
		mainpage.ptrMainSection.add(typeMasterColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(typeMstrGridSection) //Add Grid Section to Main Page
		mainpage.ptrMainSection.add(catergoryDescColumn) //Add Grid Section to Main Page

		
		//History Data Section
		//mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"strCategoryName",
				"tasktype":"onload",
				"input":["strCategoryName","strGroup"],
				"service":"CoreTypeMasterService",
				"methodName":"initTypeMasterScrMSTS"
				},
			{
				"controlid":"strGroup",
				"tasktype":"onchange",
				"input":["strCategoryName","strGroup"],
				"service":"CoreTypeMasterService",
				"methodName":"onchangeGroupTS"
				},	
		{
				"controlid":"strCategoryName",
				"tasktype":"onchange",
				"input":["strCategoryName","strGroup"],
				"service":"CoreTypeMasterService",
				"methodName":"changeTypeMasterScrTS"
				},
				{
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Save",
				"input":["strCategoryName","typeDtlCache","strGroup"],
				"service":"CoreTypeMasterService",
				"methodName":"maintainTypeMasterScrTS"
				},
		

		];
		//Event Handlers Mapping Ends
		
		//Generate Screen Section
		mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":["strCategoryName"]
			},
			"locked":
			{
				"enableAll":false,
				"except":["strCategoryName"]
			},
			"active":
			{
				"enableAll":false,
				"except":["strCategoryName"]
			}		
		}			
		mainpage.screenLinks=
		{
			"commodityExclusionId":
				{
					"dest":"jm_master.LoadConfigurator",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
		//mainpage.generateScreen();
		
		
		/*Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
			
	}
});