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
Ext.define('CueTrans.view.OTOAPP.OTOAppUserSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		//mainpage.hlpSectionFlag=true; 
		mainpage.startPainting();
		mainpage.screenName = "OTO App Users";
		
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
			plf.addText({"label":"User Id",id:"strUserCodeFrom"}),
			plf.addText({"label":"User Name",id:"strUserName"}),
			//plf.addText({"label":"Phone Number",id:"strUserType"}),
			plf.addText({"label":"Organization Name",id:"strOrgName"}),
			plf.addCombo({"label":"Status",id:"strUserStatus"})
		   // plf.addButton({"label":"Search","id":"btnSearch"})
		]
		
		helpOnUserHdrCollapse.add(OTOAppUserSearchCtrl);
		//Driver Search Section Ends
		
		//Driver Grid Section Begins
		UserGridFieldObj=
		[ 
			{columnname:"User Id",dataname:"USER_ID",datatype:"string",width:"auto"}, 
			{columnname:"User Name",dataname:"USER_NAME",datatype:"string",width:"auto"},
			{columnname:"Email Id",dataname:"EMAIL_ID",datatype:"string",width:"auto"},
			{columnname:"Phone Number",dataname:"PHONE_NUMBER",datatype:"string",width:"auto"},

			{columnname:"Organization Name",dataname:"ORGANIZATION_NAME",datatype:"string",width:"auto"},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:"auto"},
			{columnname:"Last logged in",dataname:"LAST_LOGGED_IN",datatype:"string",width:"auto"},
			//{columnname:"Click here to delete.",dataname:"DELETE",width:"auto",linkId:"ReqAmendHdrDtl",imageURL:"resources/images/gridbar/deleteww.png",tooltip:"Click here to delete."}
			{columnname:"Click here to launch change password screen.",dataname:"CHANGE_PASS",width:70,linkId:"Chng_Pass",gridpopup:true,imageURL:"resources/images/grid/Journey/Grid_Update.png"}, 
			
		]
		UserGridDtl=
		{
			title:"User Details",
			id:"UserGridDtl",
			detail:UserGridFieldObj,
			visibleRow:plf.searchVisibleRows,
		    removeAddDelete:true,
			readonly:true,
		}
		
		helpGridSection = plf.addGrid(UserGridDtl,this)
		mainpage.hlpSearchGridPtr = helpGridSection 
		//violationGridSection = plf.addGrid(vio
			
		mainpage.ptrMainSection.add(helpOnUserHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	       {
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreAdminService",
					"methodName":"initOTOAppUser"
				},
					
				{
					"controlid":"searchBtn",
					"tasktype":"btnclick",
					"input":["strUserCodeFrom","strUserName","strUserStatus","strOrgName"],
					"service":"CoreAdminService",
					"methodName":"fetchOTOAppUserTS"
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
