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
Ext.define('CueTrans.view.peoplelogistics.ShuttleHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
   
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		
		mainpage.screenName = "Shuttle Help";
		
		
		//HelpOnEmployee Search Section starts
		plf.columns=3
		var shuttleMasHdrCollapse = plf.addColumnSection({title:"", collapsed: true});//help
		
		
		//plf.addText({"label":"Employee Code To",id:"strEmployeeCodeTo","anywhereSearch":"true"}),
		
		var shuttleMasFormCtrl=
		[
			plf.addText({"label":"Shuttle Code",id:"strShuttleCode"}),	
            plf.addText({"label":"Shuttle Desc",id:"strShuttleDesc"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Calendar Code",id:"strCalendarCode"}),
			plf.addDate({"label":"Effective From",id:"dtTravelDtFrom"}),
			plf.addDate({"label":"Effective To",id:"dtTravelDtTo"}),
			plf.addBlank({}),
			plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
		]
		
		shuttleMasHdrCollapse.add(shuttleMasFormCtrl);
		//HelpOnEmployee Header Section Ends
		
		//HelpOnEmployee Grid Section Begins
		var shuttleMasGridFieldObj=					//69995
		[
			{columnname:"Shuttle Code",dataname:"SHUTTLE_CODE",datatype:"string",width:120},
			{columnname:"Shuttle Description",dataname:"SHUTTLE_DESCRIPTION",datatype:"string",width:120},
			{columnname:"Calendar Code",dataname:"CALENDAR_CODE",datatype:"string",width:120},
			{columnname:"Calendar Description",dataname:"CALENDAR_DESC",datatype:"string",width:120},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"string",width:120},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"string",width:120},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
		]
		var shuttleMasGridDtl=						//69995	
		{

		title:"",
		id:"shuttleDetails",
	    detail:shuttleMasGridFieldObj,
		visibleRow:plf.helpVisibleRows,
		widthBasis:"flex",
		removePaging:true,
		removeTbar:true
		}
		var shuttleMasGridSection = plf.addGrid(shuttleMasGridDtl,this)					//69995
		//HelpOnEmployee Grid Section Ends
		mainpage.hlpSearchGridPtr = shuttleMasGridSection
		//Add Child Sections
		
		mainpage.ptrMainSection.add(shuttleMasHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(shuttleMasGridSection) //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[	
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"PPLCoreMasterTS",
				"methodName":"initShuttleMasterSearchScrTS"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strShuttleCode","strShuttleDesc","strStatus","strCalendarCode","dtTravelDtFrom","dtTravelDtTo"],
				"service":"PPLCoreMasterTS",
				"methodName":"fetchAllShutMaSrchScrTS"
			}
			
		];
		//Event Handlers Mapping Ends
		
		mainpage.screenLinks=
		{
			"Shuttle":
				{
					"dest":"peoplelogistics.ShuttleMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"SHUTTLE_CODE","dest":"strShuttleCode"}
							]
				},
				"pl_ShuttleMaster":
				{
					"dest":"peoplelogistics.ShuttleMaster",
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
