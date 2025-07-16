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
Ext.define('CueTrans.view.peoplelogistics.TravelRequestHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		
		mainpage.screenName = "Travel Request Help";
		mainpage.liveScreenFlag=true;
		//Travel Request Search Section Begins
		plf.columns=3
		var helpOnTravelReqHdrCollapse = plf.addColumnSection({title:"", collapsed: true});//help								//69995
        mainpage.toolbarSectionFlag=false;	
        mainpage.toolbarLinks=
		[
			{"name":"Create Travel Request","linkid":"pl_TravelReq","tooltip":"Click here to create a travel request."},
		]
	 	var helpOnTravelReqFormCtrl=					//69995
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
			plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."})
		]
		helpOnTravelReqHdrCollapse.add(helpOnTravelReqFormCtrl);
		//Travel Request Search Section Ends
		
		//Travel Request Grid Section Begins
		var helpOnTravelReqGridFieldObj=			//69995
		[
			{columnname:"Travel Request No",dataname:"TRAVEL_REQ_NO",datatype:"string",width:120},
			{columnname:"Travel Request Date",dataname:"TRAVEL_REQ_DATE",datatype:"string",width:120},
			{columnname:"Purpose",dataname:"PURPOSE",datatype:"string",width:150},
			{columnname:"Traveller Name",dataname:"TRAVELLER_NAME",datatype:"string",width:100},			
			{columnname:"Travel Type",dataname:"TRAVEL_TYPE",datatype:"string",width:100},
			{columnname:"Starting Location",dataname:"STARTING_LOC",datatype:"string",width:110},
			{columnname:"Destination Location",dataname:"DEST_LOC",datatype:"string",width:120},
			{columnname:"Project Code",dataname:"PROJ_CODE",datatype:"string",width:80},            
			{columnname:"Reporting Date",dataname:"REPORTING_DATE",datatype:"string",width:100},
			{columnname:"Return Date",dataname:"RETURN_DATE",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",storeId:"driveType",width:80},
		]
		helpOnTravelReqGridDtl=
		{
			title:"",
			id:"travelReqSearch",
	       detail:helpOnTravelReqGridFieldObj,
		   visibleRow:plf.helpVisibleRows,
		   widthBasis:"flex",
		   removePaging:true,
		   removeTbar:true
		   }
		var helpGridSection = plf.addGrid(helpOnTravelReqGridDtl,this)			//69995
		//Travel Request Grid Section Ends
		mainpage.hlpSearchGridPtr = helpGridSection //HelpChanges
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnTravelReqHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
	/*	mainpage.eventHandlers = 
		[
		
		
	     {
					"tasktype":"proto",
					"filename":"peoplelogistics/TravelRequestSummary.json"
				}
		];
		*/
		mainpage.screenLinks=
		{
			"travelRequest":
			{
				"dest":"peoplelogistics.TravelRequest",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"TRAVEL_REQ_NO","dest":"strTravelRequestNo"}
						]
			},
			"pl_TravelReq":
			{
				"dest":"peoplelogistics.TravelRequest",
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
		//mainpage.generateScreen();
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"PPLCoreTS",
				"methodName":"initTravelRequestSummTS"
			},	
           {
			 "controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strTravelRequestNo","dtTravelReqDate","strPurpose","strStatus","strTravellerName","strTravelType"
                         ,"strOrigin","strDestination","strProjectCode","dtReportDate","dtReturnDate"],
				"service":"PPLCoreTS",
				"methodName":"fetchTravelRequestSummTS"   	
            },				
			{
				"tasktype":"proto",
				"filename":"peoplelogistics/TravelRequestSummary.json"
			}
		];
		
		//Ext.apply(this,
		//{
			//items:
		//	[
			//	mainpage
			//]
		//})
		this.callParent(arguments);
		
	}
});