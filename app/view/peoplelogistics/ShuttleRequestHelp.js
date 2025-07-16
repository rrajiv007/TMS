/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	                           Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.peoplelogistics.ShuttleRequestHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		mainpage.screenName = "Shuttle Request Help";
		//Travel Request Search Section Begins
		plf.columns=3
		var helpOnShuttReqHdrCollapse = plf.addColumnSection({collapsed: true});				//69995
	 	var helpOnShuttReqFormCtrl=																//69995	
		[
			plf.addText({"label":"Shuttle Request No",id:"strShutRequestNo"}),
			//plf.addDate({"label":"Date",id:"dtTranDate"}),
			plf.addText({"label":"Travel Request No",id:"strTravelRequestNo"}),
			plf.addCombo({"label":"Purpose",id:"strPurpose"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			//plf.addDate({"label":"Travel Date",id:"dtTravelDate"}),
            //plf.addText({"label":"Traveller Code",id:"strTravellerCode"}),
			plf.addText({"label":"Traveller Name",id:"strTravellerName"}),
			plf.addDate({"label":"Travel Date From",id:"dtTravelDtFrom"}),
			plf.addDate({"label":"Travel Date To",id:"dtTravelDtTo"}),
			//plf.addCombo({"label":"Pickup Location",id:"strOrigin"}),
			//plf.addCombo({"label":"Drop Location",id:"strDestination"}),
			plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
		]
		helpOnShuttReqHdrCollapse.add(helpOnShuttReqFormCtrl);
		//Travel Request Search Section Ends
		
		//Travel Request Grid Section Begins
		var helpOnShuttReqGridFieldObj=												//69995
		[
			{columnname:"Shuttle Request No",dataname:"SHUTTLE_REQ_NO",datatype:"string",width:120},
			//{columnname:"Date",dataname:"SHUTTLE_REQ_DATE",datatype:"string",width:120},
			{columnname:"Purpose",dataname:"PURPOSE",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",storeId:"driveType",width:100},
			//{columnname:"Traveller Code",dataname:"TRAVELLER_CODE",datatype:"string",width:100},
			{columnname:"Traveller Name",dataname:"TRAVELLER_NAME",datatype:"string",width:100},
			{columnname:"Approver Name",dataname:"APPROVER_NAME",datatype:"string",width:100},
			{columnname:"Travel Date From",dataname:"TRAVEL_DATE_FROM",datatype:"string",width:120},
			{columnname:"Travel Date To",dataname:"TRAVEL_DATE_TO",datatype:"string",width:100}
			//{columnname:"Pickup Location",dataname:"PICKUP_LOC",datatype:"string",width:100},
			//{columnname:"Drop Location",dataname:"DROP_LOC",datatype:"string",width:100}
			
		]
		var helpOnShuttsReqGridDtl=													//69995	
		{
			title:"",
			id:"shuttleReqSearch",
	        detail:helpOnShuttReqGridFieldObj,
		    visibleRow:plf.searchVisibleRows,
		    widthBasis:"flex",
		    removeAddDelete:true,
		    removePaging:true,
		    removeTbar:true
		   }
		var helpGridSection = plf.addGrid(helpOnShuttsReqGridDtl,this)				//69995
		//Travel Request Grid Section Ends
		mainpage.hlpSearchGridPtr = helpGridSection		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnShuttReqHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strShutRequestNo","strTravelRequestNo","strPurpose","strStatus","strTravellerName",
				"dtTravelDtFrom","dtTravelDtTo"],
				"service":"PPLCoreTS",
				"methodName":"initShuttleReqSrchTS"
			},
			{
			   "controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strShutRequestNo","strTravelRequestNo","strPurpose","strStatus","strTravellerName",
				"dtTravelDtFrom","dtTravelDtTo"],
				"service":"PPLCoreTS",
				"methodName":"initShuttleReqSrchTS"
			}
	     
		];
		//Event Handlers Mapping Ends
			
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
