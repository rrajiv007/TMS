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
Ext.define('CueTrans.view.service.UnassignedServiceHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;	
		
		mainpage.hlpSectionFlag=true
		mainpage.startPainting();
		mainpage.screenName = "Help on Unassigned Services";
		// Add Toolbar	
		
		var formCtrl=[];
		plf.columns=4
		var unassignedLoadsColumn = plf.addColumnSection({title:"",collapsed: false});		//69997	
		var unassignedLoadsFormCtrl=														//69997
		[
			plf.addText({"label":"Service Id",id:"strServiceId","anywhereSearch":"true"}),	
			plf.addText({"label":"Service Request No",id:"strServiceReqNo"}),
			plf.addCombo({"label":"Vehicle Category","id":"strVehCat"}),	
			plf.addCombo({"label":"Region From","id":"strRegionFrom"}),
			plf.addCombo({"label":"Region To","id":"strRegionTo"}),	
			plf.addCombo({"label":"Origin","id":"strOrigin"}),
			plf.addCombo({"label":"Destination","id":"strDestination"}),	
			/*plf.addDate({"label":"Required From Date",id:"dtReqDateFrom"}),*/
			plf.addButton({"label":"Search",id:"btnSearch"})					
		]
		
		unassignedLoadsColumn.add(unassignedLoadsFormCtrl);
		
		var unassignedLoadsTabObj=
		[   
			{columnname:"Service Id",dataname:"SERVICE_ID",datatype:"string",width:120},
			{columnname:"Service Request No",dataname:"SERVICE_REQUEST_NO",datatype:"string",width:120},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:120},
			{columnname:"Required From Date/Time",dataname:"REQ_FROM_DATE",datatype:"string",width:120},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:120},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:120},
			{columnname:"Customer Name",dataname:"CUSTOMER_NAME",datatype:"string",width:120}
		]
		var unassignedLoadsTabDtl=
		{
			title:"",
			id:"unassignedServiceHlp",
			detail:unassignedLoadsTabObj,
			visibleRow:8,
			removeFilter:false,
			removeExport:false,
			removeAddDelete:true,
			removeTbar:false		
		}
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(unassignedLoadsColumn)		
		var helpGridSection=plf.addGrid(unassignedLoadsTabDtl,this)	
		mainpage.hlpSearchGridPtr = helpGridSection
		mainpage.ptrMainSection.add(helpGridSection)
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"SERCoreServiceGroupTS",
				"methodName":"initUnassignedServiceHlpTS"
			},
			{       
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strServiceId","strOrigin","strDestination","strVehCat",
						"dtReqDateFrom","strServiceReqNo",
						"strRegionFrom","strRegionTo"
						],
				"service":"SERCoreServiceGroupTS",
				"methodName":"fetchAllUnassServiceHlpTS"
			}
		]
		
		this.callParent(arguments);
		
	}
});
