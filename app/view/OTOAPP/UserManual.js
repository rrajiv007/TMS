/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
 		                                   
************************************************************************************************/
Ext.define('CueTrans.view.OTOAPP.UserManual', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		//mainpage.hlpSectionFlag=true; 
		mainpage.startPainting();
		mainpage.screenName = "User Manuals";
		
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[

		]
		
		//OTO App Users Search Section Begins 

		plf.columns=4
		//helpOnUserHdrCollapse = plf.addCollapseSection({title:"Search Criteria", collapsed: true}); 
		var helpOnUserHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);
		
		OTOAppUserSearchCtrl=
		[
		plf.addCombo({"label":"Component Name",id:"strComponentCode"}),
		plf.addButton({"label":"Get Details","id":"btnSearch"})
			
			
		]
		
		helpOnUserHdrCollapse.add(OTOAppUserSearchCtrl);
		
		

		UserGridFieldObj=
		[ 
			{columnname:"Module",dataname:"MODULE",datatype:"string",width:250}, 
			{columnname:"URL",dataname:"URL",datatype:"string",width:250,hidden:true},
			{columnname:"Manual",dataname:"MANUAL_LINK",datatype:"string",width:250,editControl:"link","tooltip":"Click here to download the document.",url:"URL"},
			
		 
			
		]
		roleDtlCache=
		{
			title:"Manual Details",
			id:"roleDtlCache",
			detail:UserGridFieldObj,
			visibleRow:plf.searchVisibleRows,
		    removeAddDelete:true,
			readonly:true,
		}
		
		helpGridSection = plf.addGrid(roleDtlCache,this)
		mainpage.hlpSearchGridPtr = helpGridSection 
		//violationGridSection = plf.addGrid(vio
			
		//mainpage.ptrMainSection.add(helpOnUserHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
	mainpage.eventHandlers = 
			[
				{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreAdminService",
					"methodName":"getUserManualTS"
				},
				{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strComponentCode"],
					"service":"CoreAdminService",
					"methodName":"getUserManualTS"
				}

			
			];
		
		
	mainpage.gridPopupLinks=
		{

				/*"Chng_Pass":
				{
					"dest":"OTOAPP.OTOAppChangePassword",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"USER_ID","dest":"strNewUserId"}
							]
				},
				*/
				
				"Chng_Pass":
			{
				"dest":"OTOAPP.OTOAppChangePassword",
				"popMethodName":"initOTOAppChangePwd",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"USER_ID","dest":"strNewUserId"},
						{"src":"USER_NAME","dest":"strUserName"},
						{"src":"EMAIL_ID","dest":"strEmailId"},
						{"src":"ORGANIZATION_NAME","dest":"strOrgName"}
						]
			}
				
			
		}
		this.callParent(arguments);
		
	}
});
