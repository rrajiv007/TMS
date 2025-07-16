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
Ext.define('CueTrans.view.peoplelogistics.AccommodationReservationSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
   
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Accommodation Reservation Summary";
		//mainpage.liveScreenFlag=true;
		mainpage.toolbarSectionFlag=true;
        /*mainpage.toolbarLinks=
		[
			{"name":"Accommodation Reservation","linkid":"pl_accommReserve","tooltip":"Click here to launch accomadation reservation screen"}
		]
		*/
		
		//HelpOnEmployee Search Section starts
		plf.columns=4
		var accomResHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
		
		
		//plf.addText({"label":"Employee Code To",id:"strEmployeeCodeTo","anywhereSearch":"true"}),
		
		var accomResFormCtrl=
		[
			plf.addText({"label":"Accommodation No",id:"strAccRequestNo"}),			
			plf.addText({"label":"Travel Request No",id:"strTravelRequestNo"}),
			plf.addText({"label":"Traveller Name",id:"strTravellerName"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Work Location",id:"strWorkLocation"}),
			plf.addDate({"label":"Accommodation From",id:"dtAccDtFrom"}),
			plf.addDate({"label":"Accommodation To",id:"dtAccDtTo"}),
			//plf.addCombo({"label":"Travel Type",id:"strTravelType"}),
			
		]
		
		accomResHdrCollapse.add(accomResFormCtrl);
		//HelpOnEmployee Header Section Ends
		
		//HelpOnEmployee Grid Section Begins
		var accomResGridFieldObj=										//69995
		[
			{columnname:"Accommodation No",dataname:"ACC_REQUEST_NO",datatype:"string",width:130,linkId:"accRes","tooltip":"Click here to launch the accommodation reservation screen."},
			{columnname:"Travel Request No",dataname:"TRAVEL_REQ_NO",datatype:"string",width:100},
			{columnname:"Traveller Name",dataname:"TRAVELLER_NAME",datatype:"string",width:100},
			{columnname:"Work Location",dataname:"WORK_LOC",datatype:"string",datatype:"string",width:100},
			{columnname:"Accommodation From",dataname:"ACCOMDATE_FROM",datatype:"string",width:120},
			{columnname:"Accommodation To",dataname:"ACCOMDATE_TO",datatype:"string",width:100},
			//{columnname:"Travel Type",dataname:"TRAVEL_TYPE",datatype:"string",width:80},
		    {columnname:"Status",dataname:"STATUS",datatype:"string",width:80}
		]
		var accomResGridDtl=								//69995
		{

		title:"",
		id:"AccReq",
	    detail:accomResGridFieldObj,
		readonly:true,
		visibleRow:plf.searchVisibleRows,
		widthBasis:"flex",
		}
		var accomResGridSection = plf.addGrid(accomResGridDtl,this)						//69995
		//HelpOnEmployee Grid Section Ends
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(accomResHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(accomResGridSection) //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[	
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"PPLCoreTS",
				"methodName":"initAccomSearchSummScrTS"
			},
			{													
			   "controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strAccRequestNo","strTravelRequestNo","strStatus","strTravellerName",
				"dtAccDtFrom","dtAccDtTo","strWorkLocation"],
				"service":"PPLCoreTS",
				"methodName":"initAccomSearchSummScrTS"
			}
	     
			
		];
		//Event Handlers Mapping Ends
		
		mainpage.screenLinks=
		{
			"accRes":
				{
					"dest":"peoplelogistics.AccomodationReservation",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"ACC_REQUEST_NO","dest":"strAccRequestNo"}
							]
				},
				"pl_accommReserve":
				{
					"dest":"peoplelogistics.AccomodationReservation",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
			
	
		this.callParent(arguments);
		
	}
});
