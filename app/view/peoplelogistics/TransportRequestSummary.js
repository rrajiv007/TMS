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
Ext.define('CueTrans.view.peoplelogistics.TransportRequestSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Transport Request Summary";
		//Travel Request Search Section Begins
		plf.columns=4
		helpOnTransReqHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);
        mainpage.toolbarSectionFlag=true;	
		mainpage.liveScreenFlag=true;
        mainpage.toolbarLinks=
		[
			{"name":"Create Transport Request","linkid":"pl_TransReq","tooltip":"Click here to create a transport request."},
		]
	 	var helpOnTransReqFormCtrl=								//69995
		[
			plf.addText({"label":"Transport Request No",id:"strTranRequestNo"}),
			plf.addText({"label":"Travel Request No",id:"strTravelRequestNo"}),
			plf.addCombo({"label":"Purpose",id:"strPurpose"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Traveller Name",id:"strTravellerName"}),
			plf.addDate({"label":"Travel Date",id:"dtTravelDate"}),
            plf.addCombo({"label":"Pickup Location",id:"strOrigin"}),
			plf.addCombo({"label":"Drop Location",id:"strDestination"}),
		]
		helpOnTransReqHdrCollapse.add(helpOnTransReqFormCtrl);
		//Travel Request Search Section Ends
		
		//Travel Request Grid Section Begins
		var helpOnTransReqGridFieldObj=							//69995
		[
			{columnname:"Transport Request No",dataname:"TRANSPORT_REQ_ID",datatype:"string",width:120,linkId:"transRequest","tooltip":"Click here to launch the transport request screen."},
			{columnname:"Travel Request No",dataname:"TRAVEL_REQ_NO",datatype:"string",width:100},
			{columnname:"Purpose",dataname:"PURPOSE",datatype:"string",width:100},
			{columnname:"Traveller Name",dataname:"TRAVELLER_NAME",datatype:"string",width:100},
			{columnname:"Travel Date",dataname:"TRAVEL_DATE",datatype:"string",width:100},
			{columnname:"Travel Time",dataname:"TRAVEL_TIME",datatype:"string",width:100},
			{columnname:"Request Date",dataname:"REQUEST_DATE",datatype:"string",width:120},
			{columnname:"Approver Name",dataname:"APPROVER",datatype:"string",width:100},
			{columnname:"Pickup Location",dataname:"PICKUP_LOC",datatype:"string",width:120},			
			{columnname:"Drop Location",dataname:"DROP_LOC",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",storeId:"driveType",width:100}
		]
		var helpOnTransReqGridDtl=			//69995
		{
			title:"",
			id:"transReqSearch",
	       detail:helpOnTransReqGridFieldObj,
		   readonly:true,
		   visibleRow:plf.searchVisibleRows,
		   widthBasis:"flex",
		   }
		var helpGridSection = plf.addGrid(helpOnTransReqGridDtl,this)			//69995
		//Travel Request Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnTransReqHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
				/*{
					"tasktype":"proto",
					"filename":"peoplelogistics/TransportRequestSummary.json"
				}*/
				{
				"controlid":"",
				"tasktype":"onload",
				"input":["strUserId"],
				"service":"PPLCoreTS",
				"methodName":"initTransportSrch"
				//completed
				},
				{
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strTranRequestNo", "strPurpose", "strStatus", "dtTravelDate",  "strTravellerName", 
				"strOrigin", "strDestination", "strTravelRequestNo"],
				"service":"PPLCoreTS",
				"methodName":"fetchTransportSrch"
				}
		];
		
		mainpage.screenLinks=
		{
			"transRequest":
			{
				"dest":"peoplelogistics.TransportRequest",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"TRANSPORT_REQ_ID","dest":"strTranRequestNo"}
						]
			},
			"pl_TransReq":
			{
				"dest":"peoplelogistics.TransportRequest",
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