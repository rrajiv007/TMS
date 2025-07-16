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
Ext.define('CueTrans.view.peoplelogistics.AccommodationRequestHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
   
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		
		mainpage.screenName = "Accommodation Request Help";
		//mainpage.liveScreenFlag=true;
		//HelpOnEmployee Search Section starts
		plf.columns=3
		var accomReqHdrCollapse = plf.addColumnSection({collapsed: true});
		
		
		//plf.addText({"label":"Employee Code To",id:"strEmployeeCodeTo","anywhereSearch":"true"}),
		
		var accomReqFormCtrl=
		[
			plf.addText({"label":"Accommodation No",id:"strAccRequestNo"}),			
			plf.addText({"label":"Travel Request No",id:"strTravelRequestNo"}),
			plf.addText({"label":"Traveller Name",id:"strTravellerName"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Work Location",id:"strWorkLocation"}),
			plf.addDate({"label":"Accommodation From",id:"dtAccDtFrom"}),
			plf.addDate({"label":"Accommodation To",id:"dtAccDtTo"}),		
       		plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})	
		]
		
		accomReqHdrCollapse.add(accomReqFormCtrl);
		//HelpOnEmployee Header Section Ends
		
		//HelpOnEmployee Grid Section Begins
		var accomReqGridFieldObj=
		[
			{columnname:"Accommodation No",dataname:"ACC_REQUEST_NO",datatype:"string",width:130},
			{columnname:"Travel Request No",dataname:"TRAVEL_REQ_NO",datatype:"string",width:100},
			{columnname:"Traveller Name",dataname:"TRAVELLER_NAME",datatype:"string",width:100},
			{columnname:"Work Location",dataname:"WORK_LOC",datatype:"string",datatype:"string",width:100},
			{columnname:"Accommodation From",dataname:"ACCOMDATE_FROM",datatype:"string",width:120},
			{columnname:"Accommodation To",dataname:"ACCOMDATE_TO",datatype:"string",width:100},
			//{columnname:"Travel Type",dataname:"TRAVEL_TYPE",datatype:"string",width:80},
		    {columnname:"Status",dataname:"STATUS",datatype:"string",width:80}
		]
		var accomReqGridDtl=
		{

		title:"",
		id:"AccReq",
	    detail:accomReqGridFieldObj,
		visibleRow:plf.helpVisibleRows,
		widthBasis:"flex",
		removePaging:true,
		removeTbar:true
		}
		var accomReqGridSection = plf.addGrid(accomReqGridDtl,this)			//69995
		//HelpOnEmployee Grid Section Ends
		mainpage.hlpSearchGridPtr = accomReqGridSection		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(accomReqHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(accomReqGridSection) //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[	
			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strAccRequestNo", "strStatus", "dtAccDtFrom",  "strTravellerName", 
				"dtAccDtTo", "strWorkLocation", "strTravelRequestNo"],
				"service":"PPLCoreTS",
				"methodName":"initAccomSearchSummScrTS"
			},
			    
		    {
			    "controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strAccRequestNo", "strStatus", "dtAccDtFrom",  "strTravellerName", 
				"dtAccDtTo", "strWorkLocation", "strTravelRequestNo"],
				"service":"PPLCoreTS",
				"methodName":"fetchAccomSearchSummScrTS"
			}
		];
		//Event Handlers Mapping Ends
		
		mainpage.screenLinks=
		{
			"accReq":
				{
					"dest":"peoplelogistics.AccommodationRequest",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"ACC_REQUEST_NO","dest":"strAccRequestNo"}
							]
				}
				/*"pl_accommRequest":
				{
					"dest":"peoplelogistics.AccommodationRequest",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}*/
		}
			
	
		this.callParent(arguments);
		
	}
});
