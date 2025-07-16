/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var		                                   
************************************************************************************************/
Ext.define('CueTrans.view.service.UnassignedService', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.25;
		mainpage.startPainting();
		mainpage.screenName = "Unassigned Service Instance Help";
		// Add Toolbar	
		
		var formCtrl=[];
		plf.columns=3
		var unassignedLoadsColumn = plf.addColumnSection({title:"",collapsed: false});			//69997
		var unassignedLoadsFormCtrl=															//69997
		[
			plf.addText({"label":"Service Id",id:"strServiceId","anywhereSearch":"true"}),	
			plf.addText({"label":"Service Request No",id:"strServiceReqNo"}),
			plf.addCombo({"label":"Vehicle Category","id":"strVehCat"}),	
			plf.addCombo({"label":"Region From","id":"strRegionFrom"}),
			plf.addCombo({"label":"Region To","id":"strRegionTo"}),	
			plf.addCombo({"label":"Origin","id":"strOrigin"}),
			plf.addCombo({"label":"Destination","id":"strDestination"}),	
			/*plf.addDate({"label":"Required From Date",id:"dtReqDateFrom"}),*/
			plf.addButton({"label":"Search",id:"btnSearch",
			"handler": function() 
			{
						mainpage.queryById("methodName").setValue("fetchAllUnassServiceTS");						
						process_ebpack_service(mainpage,
						["strServiceId","strOrigin","strDestination","strVehCat",
						"dtReqDateFrom","strServiceReqNo",
						"strRegionFrom","strRegionTo"
						],"SERCoreServiceGroupTS");
						mainpage.ownerCt.close()
			}
			})					
		]
		
		unassignedLoadsColumn.add(unassignedLoadsFormCtrl);
		
		
		
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(unassignedLoadsColumn)		
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"SERCoreServiceGroupTS",
				"methodName":"initUnassignedServiceTS"
			}
		]
		
		this.callParent(arguments);
		
	}
});
