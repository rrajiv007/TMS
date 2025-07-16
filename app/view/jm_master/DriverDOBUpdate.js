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
Ext.define('CueTrans.view.jm_master.DriverDOBUpdate', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.30;
		mainpage.popupWidthRatio=.7;	
		mainpage.startPainting();
		
		mainpage.screenName = "Update Driver Date of Birth";
		
	
		mainpage.liveScreenFlag=true;
		mainpage.toolbarSectionFlag=true;
		//Add the header portion
		plf.columns=3
		var DriDOBSummaryColumn = plf.addColumnSection({title:"", collapsed: true});
		
		
		var DriDoBSummaryFormCtrl=
		[
			plf.addHidden({"label":"Sch Driver",id:"strReportingDriver"}),
			plf.addDisplayOnly({"label":"Driver Code","id":"strDriverCode"}),
			plf.addDisplayOnly({"label":"Driver Name","id":"strDriverName"}),
			plf.addDisplayOnly({"label":"Driver Contact No","id":"strDriverPhoneNo"}),
			plf.addDate({"label":"Date of Birth",id:"strRepoDriverDOB","mandatory":true}),
			plf.addDisplayOnly({"label":"Age",id:"strAge"}),
			plf.addBlank(),
			plf.addBlank(), 
			plf.addButton({"label":"Save","id":"DOBSAVE",tooltip:"Click here to update driver date of birth."})
		]
		
		 DriDOBSummaryColumn.add(DriDoBSummaryFormCtrl);
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(DriDOBSummaryColumn)
		//mainpage.ptrMainSection.add(amendDetails) 
		
		
		
		//History Data Section
		//mainpage.dataHistorySectionFlag=false;
		mainpage.screenLinks=
		{
			
		}	
		
		mainpage.hlpLinks=
		{
		}
		
		mainpage.eventHandlers = 
			[
			   {
				"controlid":"",
				"tasktype":"onload",
				"input":["strDriverCode","strReportingDriver"],
				"service":"CoreInspectionsService",
				"methodName":"initFetchDriverDOBTS"
		       },
			   {
					"controlid":"DOBSAVE",
					"tasktype":"btnclick",
					"input":["strDriverCode","strRepoDriverDOB"],
					"service":"CoreInspectionsService",
					"methodName":"updatedriverdobts",
					"callbackMethod":function()
					{	
					
					var tmpDOB =Ext.Date.format(mainpage.queryById("strRepoDriverDOB").getValue(),plf.defDateFormat);
					var tmpAge =mainpage.queryById("strAge").getValue();
					mainpage.hlpParentForm.queryById("strRepoDriverDOB").setValue(tmpDOB);
					mainpage.hlpParentForm.queryById("strRepoDriverAge").setValue(tmpAge);
					mainpage.ownerCt.close();
					}
				}
			]
		this.callParent(arguments);
		
	
	}
});