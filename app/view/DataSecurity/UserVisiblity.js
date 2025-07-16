/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.0		Yeshwanth		23-02-16		67696							Data Security
************************************************************************************************/
Ext.define('CueTrans.view.DataSecurity.UserVisiblity', 

{ 
extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "User Visibility Mapping";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
		//	{"name":"Data Level Security - Module","linkid":"db_dsecurity","tooltip":"Click here to edit."},
		];
		
		
		mainpage.toolbarActions= 
			[
					{
						"name": "Save",
						"tooltip": "Click here to save."
					}
            ]

		
		plf.columns=4
		var UserVisiblityColumn = plf.addColumnSection({"title":""}); 
		
		if(plf.defaultLayout==3)
		{
			plf.columns=3
			
			var UserVisiblityCtrl=					
			[	
				plf.addCombo({"label":"Module",id:"strModule"}),
				plf.addCombo({"label":"Parameter",id:"strParameter"}),	
				plf.addCombo({"label":"Value",id:"strValue"})
			]
		
		}
		
		else
		{
		var parentForm =this;
		UserVisiblityCtrl=
			[	
				plf.addCombo({"label":"Module",id:"strModule"}),
				plf.addCombo({"label":"Parameter",id:"strParameter"}),	
				plf.addCombo({"label":"Value",id:"strValue"}),
				plf.addBlank({})
			]
		
		}
		UserVisiblityColumn.add(UserVisiblityCtrl);
		
		var unMappedObj=
		[
			{columnname:"User Id",dataname:"USER_ID",datatype:"string",width:100},
			{columnname:"User Name",dataname:"USER_NAME",datatype:"string",width:150},
			{columnname:"Email",dataname:"EMAIL_ID",datatype:"string",width:200}	
		]

		var mappedObj=
		[
			{columnname:"User Id",dataname:"USER_ID",datatype:"string",width:100},
			{columnname:"User Name",dataname:"USER_NAME",datatype:"string",width:150},
			{columnname:"Email",dataname:"EMAIL_ID",datatype:"string",width:200}
		]
		
		var UsermapHdrSec = plf.addMultiSelect
		    ({
				"id":"usermap",
				"mapgridid":"mappeduserGrid",
				"unmapgridid":"unmappeduserGrid",
				"keycolumn":"USER_ID",
				"mapdetail":mappedObj,
				"unmapdetail":unMappedObj
			});
		
		
		
		
		//UserVisiblity detail Section Ends
		mainpage.ptrMainSection.add(UserVisiblityColumn)	
		mainpage.ptrMainSection.add(UsermapHdrSec)
		mainpage.dataHistorySectionFlag=false;		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"DSCoreSecurityTS",
					"methodName":"initDSBasedTS"
			},
			{
					"controlid":"strModule",
					"tasktype":"onchange",
					"input":["strModule","strParameter","strValue"],
					"service":"DSCoreSecurityTS",
					"methodName":"onchangeModuleTS"
			},
			{
					"controlid":"strParameter",
					"tasktype":"onchange",
					"input":["strModule","strParameter","strValue"],
					"service":"DSCoreSecurityTS",
					"methodName":"onchangeParamTS"
			},	
			{
					"controlid":"strValue",
					"tasktype":"onchange",
					"input":["strModule","strParameter","strValue"],
					"service":"DSCoreSecurityTS",
					"methodName":"onchangeValueTS"
			},			
			{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Save",
					"input":["strModule","strParameter","strValue","mappeduserGrid"],
					"service":"DSCoreSecurityTS",
					"methodName":"saveUserVisibleTS"
			}/*,
			{
					"controlid":"strVehicleCategory",
					"tasktype":"onchange",
					"input":["strVehicleCategory"],
					"service":"DSCoreSecurityTS",
					"methodName":"onchangeVehicleCatTS"
			}
			*/
		];
		//Event Handlers Mapping Ends
		mainpage.screenLinks=
		{
			"db_dsecurity":
				{
					"dest":"DataSecurity.DocUserMapping",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
		
		//Generate Screen Section
		this.callParent(arguments);
		
	}
	
});


