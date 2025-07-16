/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
		                                   
************************************************************************************************/
Ext.define('CueTrans.view.peoplelogistics.TransportPlanningHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		mainpage.screenName = "Transport Planning Help";		
		
		//Truck Master Section starts

		var formCtrl=[];
		plf.columns=4
		var planListSummaryColumn = plf.addColumnSection({collapsed: false});
		
		
		var planListSummaryFormCtrl=
		[
			
			plf.addText({"label":"Transport Plan No",id:"strTransportPlanNo","anywhereSearch":"true"}),
			plf.addCombo({"label":"Status","id":"strStatus"}),						
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination","id":"strDestination"}),	
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addDate({"label":"Date From","id":"dtDateFrom"}),
			plf.addDate({"label":"Date To","id":"dtDateTo"}),			
			plf.addButton({"label":"Search","id":"btnSearch","tooltip":"Click here to search."})			
		]
		
		planListSummaryColumn.add(planListSummaryFormCtrl);
		
		
		var planListSummaryObj=
		[			
			{columnname:"Transport Plan No",dataname:"TRANSPORT_PLAN_NO",datatype:"string",width:200},
			{columnname:"Departure Date",dataname:"DEP_DATE",datatype:"string",width:100},			
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},		
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},			
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}			
		]
		var planListSummaryGridDetail=
		{
			title:"",
			id:"PlanHelpGrid",
			detail:planListSummaryObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true,
			widthBasis:"flex"
		}
		var planListSummaryGridSection = plf.addGrid(planListSummaryGridDetail,this)	
		mainpage.hlpSearchGridPtr = planListSummaryGridSection
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(planListSummaryColumn)
		mainpage.ptrMainSection.add(planListSummaryGridSection) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;		
		mainpage.eventHandlers = 
		[	
		    {
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"PPLCoreTS",
				"methodName":"initTransPlanHelpTS"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strTransportPlanNo","strStatus","strOrigin","strDestination","strDateType",
				         "dtDateFrom","dtDateTo",
				        ],
				"service":"PPLCoreTS",
				"methodName":"fetchTransPlanHelpTS"
			}	
		];
		mainpage.hlpLinks=
		{			

					
		}			
		this.callParent(arguments);
		
	
	}
});
