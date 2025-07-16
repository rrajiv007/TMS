/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.RoleScreenMapping', 
{
extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Role Screen Mapping";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Refresh","Maintain"]
		
		//Add Keyfields
		mainpage.keyFields=["strRoleId"]
		
		//Violation Header Section Starts

		plf.columns=3
		roleHdrColumn = plf.addColumnSection({title:""});
		 mainpage.toolbarSectionFlag=true;	
        mainpage.toolbarLinks=
		[
			{"name":"Role Screen Task Mapping","linkid":"ad_RoleScreenTaskMapping"}
		]
		roleFormCtrl=
		[
			plf.addHlpText({"label":"Role ID",id:"strRoleIdFrom","mandatory":"true",hlpLinkID:"roleid",inputFormat:"string",InputLength:"40"},this),
			plf.addText({"label":"Role Name",id:"strRoleDesc","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addBlank({}),
			plf.addCombo({"label":"Component Name",id:"strComponentCode"}),
			//plf.addDisplayOnly({"label":"Component Name",id:"strComponentDesc"}),
			plf.addCombo({"label":"Default Permission",id:"strDefaultPermission","listeners":{
										change: function (field, newValue, oldValue) 
										{					 	 
											var gridStore = Ext.data.StoreManager.lookup('roleDtlCache_store');				 
											Ext.each(gridStore.getRange(), function(record) 
											{
												record.set('PERMISSION',newValue)												
											})				 
										}
									}}),
			plf.addButton({"label":"Get Details","id":"btnSearch"})
			
			
																		
			
		]
		
		roleHdrColumn.add(roleFormCtrl);
		roleHdrColumn.add(plf.addStripLine({}));
		//Violation Header Section Ends
		
		//Violation Footer Section starts

		/*plf.columns=2
		roleFtrColumn = plf.addColumnSection({title:""});
		
		
		roleFtrFormCtrl=
		[
			plf.addDisplayOnly({"label":"Created By",id:"strCreatedBy"}),
			plf.addDisplayOnly({"label":"Modified By",id:"dtModifiedBy"}),
			plf.addDisplayOnly({"label":"Created Date",id:"dtCreatedDate"}),
			plf.addDisplayOnly({"label":"Modified Date",id:"dtModifiedDate"})
			
		]
		
		roleFtrColumn.add(roleFtrFormCtrl);*/
		//Violation Footer Section Ends
		
		
		//Violation Grid Section Begins
		roleGridFieldObj=
		[
			{columnname:"Seq No",dataname:"SEQ_NO",datatype:"string",width:150,hidden:true},
			{columnname:"Component Code",dataname:"MODULE_ID",datatype:"string",width:150,hlpLinkID:"roleid"},
			{columnname:"Component Name",dataname:"MODULE_DESC",datatype:"string",width:200},
			{columnname:"Screen Code",dataname:"SCREEN_ID",datatype:"string",width:150},
			{columnname:"Screen Name",dataname:"SCREEN_DESC",datatype:"string",width:200},
			{columnname:"Permission",dataname:"PERMISSION",datatype:"string",storeId:"strPermission",editControl:"combo",width:150}
			
		]
		roleGridDtl=
		{
			title:"Role Screen Details",
			id:"roleDtlCache",
			detail:roleGridFieldObj,
			visibleRow:plf.searchVisibleRows,//Added By sudhakar for BUG 68526
			removeAddDelete:true,
			visibleRow:10
			//,removePaging:true //commented By sudhakar for BUG 68526
		}
		//roleGridSection = plf.addGrid(roleGridDtl)//commented By sudhakar for BUG 68526
		roleGridSection = plf.addGrid(roleGridDtl,this)	//Added By sudhakar for BUG 68526
		//Violation Grid Section Ends
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(roleHdrColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(roleGridSection) //Add Grid Section to Main Page
	//	mainpage.ptrMainSection.add(roleFtrColumn)//Add Footer Section to Main Page
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
				mainpage.eventHandlers = 
			[
				{
					"controlid":"",
					"tasktype":"onload",
					"input":["strRoleIdFrom"],
					"service":"CoreAdminService",
					"methodName":"initRoleMasterScrTS"
				},		
				{
					"controlid":"strRoleIdFrom",
					"tasktype":"onenter",
					"input":["strRoleIdFrom"],
					"service":"CoreAdminService",
					"methodName":"fetchRoleMasterTS"
				},
				{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strComponentCode","strRoleIdFrom"],
					"service":"CoreAdminService",
					"methodName":"getRoleMasterTS"
				},
{
					"controlid":"strComponentCode",
					"tasktype":"onchange",
					"input":["strComponentCode"],
					"service":"CoreAdminService",
					"methodName":"fetchComponentNameTS"
				},				
				{
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Maintain",
				"input":["strRoleIdFrom","strRoleDesc","strComponentCode","strComponentDesc","roleDtlCache","strPermission"],
				"service":"CoreAdminService",
				"methodName":"maintainRoleMasterTS"
				}
			
			];
			
			//Event Handlers Mapping Ends
		/*
        mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":[]
			},
			"locked":
			{
				"enableAll":false,
				"except":["StrRoleId"]
			},
			"active":
			{
				"enableAll":false,
				"except":["roleDtlCache","StrRoleId"]
			}			
		}
		*/
		mainpage.hlpLinks=
		{
			"roleid":
				{
					"hlpType":"Header",
					"hlpScreen":"admin.RoleMasterHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRoleIdFrom","child":"ROLE_ID"},
							{"parent":"strRoleDesc","child":"ROLE_DESC"}
							]
				}
		}
		
		mainpage.screenLinks=
		{
			
			"ad_RoleScreenTaskMapping":
			{
				"dest":"admin.RoleTaskMapping",
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
