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
Ext.define('CueTrans.view.peoplelogistics.TravelRequestApprovalHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		mainpage.screenName = "Travel Request Compliance Help";
		//Travel Request Search Section Begins
		plf.columns=4
		var helpOnTravelReqHdrCollapse = plf.addColumnSection({collapsed: true});			//69995
	 	var helpOnTravelReqFormCtrl=														//69995
		[
			plf.addText({"label":"Travel Request No",id:"strTravelRequestNo"}),
			plf.addDate({"label":"Travel Request Date",id:"dtTravelReqDate"}),
			plf.addCombo({"label":"Purpose",id:"strPurpose"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Traveller Name",id:"strTravellerName"}),
			plf.addCombo({"label":"Travel Type",id:"strTravelType"}),
            plf.addText({"label":"Starting Location",id:"strOrigin"}),
			plf.addText({"label":"Destination Location",id:"strDestination"}),
			plf.addText({"label":"Project Code",id:"strProjectCode"}),
			plf.addDate({"label":"Reporting Date",id:"dtReportDate"}),
			plf.addDate({"label":"Return Date",id:"dtReturnDate"}),
			plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
		]
		helpOnTravelReqHdrCollapse.add(helpOnTravelReqFormCtrl);
		//Travel Request Search Section Ends
		
		//Travel Request Grid Section Begins
		var helpOnTravelReqGridFieldObj=				//69995
		[
			{columnname:"Travel Request No",dataname:"TRAVEL_REQ_NO",datatype:"string",width:120},
			{columnname:"Travel Request Date",dataname:"TRAVEL_REQ_DATE",datatype:"string",width:130},
			{columnname:"Purpose",dataname:"PURPOSE",datatype:"string",width:70},
			//{columnname:"Traveller Code",dataname:"TRAVELLER_CODE",datatype:"string",width:100},
			{columnname:"Traveller Name",dataname:"TRAVELLER_NAME",datatype:"string",width:100},
			{columnname:"Travel Type",dataname:"TRAVEL_TYPE",datatype:"string",width:80},
			{columnname:"Starting Location",dataname:"STARTING_LOC",datatype:"string",width:120},
			{columnname:"Destination Location",dataname:"DEST_LOC",datatype:"string",width:130},
			{columnname:"Project Code",dataname:"PROJECT_CODE",datatype:"string",width:100},
            //{columnname:"Project Description",dataname:"LICENCE_NO",datatype:"string",width:120},
			{columnname:"Reporting Date",dataname:"START_DATE",datatype:"string",storeId:"status",width:105},
			{columnname:"Return Date",dataname:"RETURN_DATE",datatype:"string",storeId:"status",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:70}
			//{columnname:"Advance Amount",dataname:"ADVANCE_AMT",datatype:"string",storeId:"status",width:120},
			//{columnname:"Currency",dataname:"CURRENCY",datatype:"string",storeId:"status",width:80},
		]
		var helpOnTravelReqGridDtl=					//69995
		{
			title:"",
			id:"travelReqSearch",
	        detail:helpOnTravelReqGridFieldObj,
		    readonly:true,
		    visibleRow:plf.searchVisibleRows,
		    widthBasis:"flex",
			removeAddDelete:true,
			removePaging:true,
			removeTbar:true
		   }
		var helpGridSection = plf.addGrid(helpOnTravelReqGridDtl,this)						//69995
		//Travel Request Grid Section Ends
		mainpage.hlpSearchGridPtr = helpGridSection	
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnTravelReqHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		/*mainpage.eventHandlers = 
		[
	        
		];*/
		
		mainpage.screenLinks=
		{
			"travelAppRequest":
			{
				"dest":"peoplelogistics.TravelRequestComplaince",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"TRAVEL_REQ_NO","dest":"strTravelRequestNo"}
						]
			}
			/*"pl_AppTravelReq":
			{
				"dest":"peoplelogistics.TravelRequestComplaince",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
			}*/
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
		mainpage.eventHandlers = 
		[
			
            {
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"PPLCoreTS",
					"methodName":"initTravelReqAppSummTS"
			},
			{
				"controlid":"strTravelRequestNo",
				"tasktype":"onenter",
				"input":["strTravelRequestNo"],
				"service":"PPLCoreTS",
				"methodName":"fetchTravelReqAppTS"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strTravelRequestNo","dtTravelReqDate","strPurpose","strTravellerName","strProjectCode","dtReturnDate","dtReportDate","strStatus","strTravelType","strOrigin","strDestination"],
				"service":"PPLCoreTS",
				"methodName":"initTravelReqAppSummTS"
		    }
		];		
		this.callParent(arguments);
		
	}
});