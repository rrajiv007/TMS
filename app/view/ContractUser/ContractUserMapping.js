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
Ext.define('CueTrans.view.ContractUser.ContractUserMapping', 

{ 
extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "User Contractor Mapping";
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

				plf.addHlpText({"label":"User ID",id:"strOtoUserId","mandatory":"true",hlpLinkID:"userCode",inputFormat:"string",InputLength:"25"},this),
				plf.addDisplayOnly({"label":"User Name",id:"strOtoUserName","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			]
		
		}
		
		else
		{
		var parentForm =this;
		UserVisiblityCtrl=
			[	
				plf.addHlpText({"label":"User ID",id:"strOtoUserId","mandatory":"true",hlpLinkID:"userCode",inputFormat:"string",InputLength:"25"},this),
				plf.addDisplayOnly({"label":"User Name",id:"strOtoUserName","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			]
		
		}
		UserVisiblityColumn.add(UserVisiblityCtrl);
		
		var unMappedObj=
		[
			{columnname:"Contractor Num",dataname:"CONTRACT_NUM",datatype:"string",width:100},
			{columnname:"Contractor Name",dataname:"CONTRACTOR_NAME",datatype:"string",width:150},
			{columnname:"Contractor Phone #",dataname:"CONTRACTOR_NO",datatype:"string",width:200}	
		]

		var mappedObj=
		[
			{columnname:"Contractor Num",dataname:"CONTRACT_NUM",datatype:"string",width:100},
			{columnname:"Contractor Name",dataname:"CONTRACTOR_NAME",datatype:"string",width:150},
			{columnname:"Contractor Phone #",dataname:"CONTRACTOR_NO",datatype:"string",width:200}
		]
		
		var UsermapHdrSec = plf.addMultiSelect
		    ({
				"id":"usermap",
				"mapgridid":"contractoruserGrid",
				"unmapgridid":"uncontractoruserGrid",
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
					"service":"OTOAppCoreServiceTS",
					"methodName":"OTOAPPINITUCMBASED"
			},	
			{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Save",
					"input":["strOtoUserId","contractoruserGrid"],
					"service":"OTOAppCoreServiceTS",
					"methodName":"OTOAPP_SAVEUCM"
			},
				{
					"controlid":"strOtoUserId",
					"tasktype":"onenter",
					"input":["strOtoUserId"],
					"service":"OTOAppCoreServiceTS",
					"methodName":"ONENTER_CUM"
				},
		];
		//Event Handlers Mapping Ends
		mainpage.hlpLinks=
		{
			"userCode":
				{
					"hlpType":"Header",
					"hlpScreen":"admin.UserHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"USER_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strOtoUserId","child":"USER_ID"},
							{"parent":"strOtoUserName","child":"USER_NAME"}
						
							]
				}
				
		}
	
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


