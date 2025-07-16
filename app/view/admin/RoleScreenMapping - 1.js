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
			{"name":"RoleTaskMapping","linkid":"strRoleId"}
		]
	roleFormCtrl=
		[
			plf.addHlpText({"label":"Role ID",id:"strRoleId","mandatory":"true",hlpLinkID:"roleid"},this),
			plf.addText({"label":"Role Name",id:"strRoleDesc","mandatory":"true"}),
			plf.addBlank({}),
			plf.addCombo({"label":"Component Code",id:"strComponentCode"}),
			plf.addDisplayOnly({"label":"Component Name",id:"strComponentDesc"}),
			plf.addButton({"label":"Get Details","id":"btnSearch"}),
			plf.addCombo({"label":"Default Permission",id:"strDefaultPermission","listeners":{
										change: function (field, newValue, oldValue) 
										{					 	 
											var gridStore = Ext.data.StoreManager.lookup('roleDtlCache_store');				 
											Ext.each(gridStore.getRange(), function(record) 
											{
												record.set('PERMISSION',newValue)												
											})				 
										}
									}})
			
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
			{columnname:"Component Code",dataname:"MODULE_ID",datatype:"string",width:150},
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
			removeAddDelete:true
		}
		roleGridSection = plf.addGrid(roleGridDtl)
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
					"input":["strRoleId"],
					"service":"CoreAdminService",
					"methodName":"initRoleMasterScrTS"
				},		
				{
					"controlid":"strRoleId",
					"tasktype":"onenter",
					"input":["strRoleId"],
					"service":"CoreAdminService",
					"methodName":"fetchRoleMasterTS"
				},
				{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strComponentCode","strRoleId"],
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
				"input":["strRoleId","strRoleDesc","strComponentCode","strComponentDesc","roleDtlCache","strPermission"],
				"service":"CoreAdminService",
				"methodName":"maintainRoleMasterTS"
				}
							//CoreViolationService
			];
			//Event Handlers Mapping Ends
		
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
		
		mainpage.hlpLinks=
		{
			"roleid":
				{
					"hlpType":"Header",
					"hlpScreen":"admin.RoleScreenHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRoleId","child":"ROLE_ID"},
							{"parent":"strRoleDesc","child":"ROLE_DESC"}
							]
				}
		}
		mainpage.screenLinks=
		{
			
				"strRoleId":
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
			//Generate Screen Section
		/*mainpage.generateScreen();
		
		
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
