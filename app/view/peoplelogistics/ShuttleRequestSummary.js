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
Ext.define('CueTrans.view.peoplelogistics.ShuttleRequestSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Shuttle Request Summary";
		//Travel Request Search Section Begins
		plf.columns=4
		helpOnShuttReqHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);
        mainpage.toolbarSectionFlag=true;
		//mainpage.liveScreenFlag=true;		
        mainpage.toolbarLinks=
		[
			{"name":"Create Shuttle Request","linkid":"pl_ShuttleReq","tooltip":"Click here to create a shuttle request."},
		]
	 	var helpOnShuttReqFormCtrl=												//69995
		[
			plf.addText({"label":"Shuttle Request No",id:"strShutRequestNo"}),
			plf.addText({"label":"Travel Request No",id:"strTravelRequestNo"}),
			plf.addCombo({"label":"Purpose",id:"strPurpose"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			//plf.addDate({"label":"Travel Date",id:"dtTravelDate"}),
            plf.addText({"label":"Traveller Name",id:"strTravellerName"}),
			plf.addDate({"label":"Travel Date From",id:"dtTravelDtFrom"}),
			plf.addDate({"label":"Travel Date To",id:"dtTravelDtTo"}),
			//plf.addCombo({"label":"Pickup Location",id:"strOrigin"}),
			//plf.addCombo({"label":"Drop Location",id:"strDestination"})
		]
		helpOnShuttReqHdrCollapse.add(helpOnShuttReqFormCtrl);
		//Travel Request Search Section Ends
		
		//Travel Request Grid Section Begins
		var helpOnShuttReqGridFieldObj=																			//69995
		[
			{columnname:"Shuttle Request No",dataname:"SHUTTLE_REQ_NO",datatype:"string",width:120,linkId:"shuttleRequest","tooltip":"Click here to launch the shuttle request screen."},
			{columnname:"Travel Request No",dataname:"TRAVEL_REQ_NO",datatype:"string",width:100},
			//{columnname:"Date",dataname:"SHUTTLE_REQ_DATE",datatype:"string",width:120},
			{columnname:"Purpose",dataname:"PURPOSE",datatype:"string",width:100},
			//{columnname:"Traveller Code",dataname:"TRAVELLER_CODE",datatype:"string",width:100},
			{columnname:"Traveller Name",dataname:"TRAVELLER_NAME",datatype:"string",width:100},
			//{columnname:"Approver Name",dataname:"APPROVER_NAME",datatype:"string",width:100},
			{columnname:"Travel Date From",dataname:"TRAVEL_DATE_FROM",datatype:"string",width:120},
			{columnname:"Travel Date To",dataname:"TRAVEL_DATE_TO",datatype:"string",width:100},
			//{columnname:"Pickup Location",dataname:"PICKUP_LOC",datatype:"string",width:100},
			//{columnname:"Drop Location",dataname:"DROP_LOC",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",storeId:"driveType",width:100}
			
		]
		var helpOnShuttsReqGridDtl=							//69995
		{
			title:"",
			id:"shuttleReqSearch",
	       detail:helpOnShuttReqGridFieldObj,
		   readonly:true,
		   visibleRow:plf.searchVisibleRows,
		   widthBasis:"flex"
		   }
		var helpGridSection = plf.addGrid(helpOnShuttsReqGridDtl,this)			//69995
		//Travel Request Grid Section Ends
		
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
		
		mainpage.screenLinks=
		{
			"shuttleRequest":
			{
				"dest":"peoplelogistics.ShuttleRequest",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"SHUTTLE_REQ_NO","dest":"strShuttleRequestNo"}
						]
			},
			"pl_ShuttleReq":
			{
				"dest":"peoplelogistics.ShuttleRequest",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
			}
		}
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
