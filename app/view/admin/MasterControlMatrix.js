/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.MasterControlMatrix', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
		initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Master Control Visibility Matrix";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Save"]
		
		
		plf.columns=4
		var MasterControlMatrixColumn = plf.addColumnSection({});
		var MasterControlMatrixCtrl=
		[			
		    plf.addCombo({"label":"Configuration OU",id:"strRoleIdFrom","mandatory":"true"})
		]
		MasterControlMatrixColumn.add(MasterControlMatrixCtrl);
		//ConstraintMaster Header Section Ends
		
		//ConstraintMaster Grid Section Begins
		var MasterControlMatrixObj=
		[
			{columnname:"Master Control",dataname:"DEFAULT_OU",datatype:"string",editControl:"combo",storeId:"strDefaultOu",width:150},
			{columnname:"Base Control",dataname:"ROLE_ID",datatype:"string",width:150},			
			{columnname:"Created OU",dataname:"DEFAULT_ROLE",datatype:"string",editControl:"combo",storeId:"strDefaultRole",width:150}
		]
		var MasterControlMatrixGridDtl=
		{
			title:"",
			id:"userOuRoleDtlCache",
			detail:MasterControlMatrixObj,
			visibleRow:10
		}
		
		var MasterControlMatrixGridSection = plf.addGrid(MasterControlMatrixGridDtl,this)	
		
		
		mainpage.ptrMainSection.add(MasterControlMatrixColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(MasterControlMatrixGridSection) //Add Grid Section to Main Page
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreAdminService",
				"methodName":"initMasterControlMatrixTS"
			},
            {       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strRoleIdFrom","userOuRoleDtlCache"],
				"service":"CoreAdminService",
				"methodName":"MasterControlMatrixMapTS"
			},
			{
				"controlid":"strRoleIdFrom",
				"tasktype":"onchange",
				"input":["strRoleIdFrom"],
				"service":"CoreAdminService",
				"methodName":"fetchonchangeConfOUTS"
			}		
		];
		
		//Event Handlers Mapping Ends
		
		//Generate Screen Section
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

