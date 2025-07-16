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
Ext.define('CueTrans.view.peoplelogistics.TransportRequestHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		
		mainpage.screenName = "Transport Request Help";
		//Travel Request Search Section Begins
		plf.columns=3
		helpOnTransReqHdrCollapse = plf.addColumnSection({title:"", collapsed: true});//help
        //mainpage.toolbarSectionFlag=true;	
		//mainpage.liveScreenFlag=true;
	 	var helpOnTransReqFormCtrl=						//69995
		[
			plf.addText({"label":"Transport Req No",id:"strTranRequestNo"}),
			plf.addDate({"label":"Request Date",id:"dtTranDate"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Purpose",id:"strPurpose"}),
			plf.addDate({"label":"Travel Date",id:"dtTravelDate"}),
            plf.addText({"label":"Traveller Code",id:"strTravellerCode"}),
			plf.addCombo({"label":"Pickup Location",id:"strOrigin"}),
			plf.addCombo({"label":"Drop Location",id:"strDestination"}),
			plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."})
		]
		helpOnTransReqHdrCollapse.add(helpOnTransReqFormCtrl);
		//Travel Request Search Section Ends
		
		//Travel Request Grid Section Begins
		var helpOnTransReqGridFieldObj=				//69995
		[
			{columnname:"Transport Request No",dataname:"TRANSPORT_REQ_ID",datatype:"string",width:120},
			//{columnname:"Traveller Code",dataname:"TRAVELLER_CODE",datatype:"string",width:100},
			{columnname:"Traveller Name",dataname:"TRAVELLER_NAME",datatype:"string",width:100},
			{columnname:"Travel Date",dataname:"TRAVEL_DATE",datatype:"string",width:100},
			{columnname:"Request Date",dataname:"REQUEST_DATE",datatype:"string",width:120},
			{columnname:"Purpose",dataname:"PURPOSE",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",storeId:"driveType",width:100},
			{columnname:"Approver Name",dataname:"",datatype:"string",width:100},
			{columnname:"Pickup Location",dataname:"PICKUP_LOC",datatype:"string",width:120},			
			{columnname:"Drop Location",dataname:"DROP_LOC",datatype:"string",width:100},
			
		]
		var helpOnTransReqGridDtl=					//69995
		{
			title:"",
			id:"transReqSearch",
	        detail:helpOnTransReqGridFieldObj,
		    visibleRow:plf.helpVisibleRows,
		    widthBasis:"flex",
		    removePaging:true,
		    removeTbar:true
		   }
		var helpGridSection = plf.addGrid(helpOnTransReqGridDtl,this)		//69995
		//Travel Request Grid Section Ends
		mainpage.hlpSearchGridPtr = helpGridSection
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
				"input":["strTranRequestNo", "dtTranDate", "strPurpose", "strStatus", "dtTravelDate",  "strTravellerCode", 
				"strOrigin", "strDestination"],
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
						{"src":"TRANSPORT_REQ_NO","dest":"strTranRequestNo"}
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