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
Ext.define('CueTrans.view.peoplelogistics.ShuttleSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
   
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Shuttle Summary";
		//mainpage.liveScreenFlag=false;
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=
		[
			{"name":" Create Shuttle Master","linkid":"pl_ShuttleMaster","tooltip":"Click here to launch the shuttle master screen."},
		]
		
		
		//HelpOnEmployee Search Section starts
		plf.columns=4
		var shuttleMasHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
		
		
		//plf.addText({"label":"Employee Code To",id:"strEmployeeCodeTo","anywhereSearch":"true"}),
		
		var shuttleMasFormCtrl=
		[
			plf.addText({"label":"Shuttle Code",id:"strShuttleCode"}),	
            plf.addText({"label":"Shuttle Desc",id:"strShuttleDesc"}),
			plf.addText({"label":"Calendar Code",id:"strCalendarCode"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addDate({"label":"Effective From",id:"dtTravelDtFrom"}),
			plf.addDate({"label":"Effective To",id:"dtTravelDtTo"})
		]
		
		shuttleMasHdrCollapse.add(shuttleMasFormCtrl);
		//HelpOnEmployee Header Section Ends
		
		//HelpOnEmployee Grid Section Begins
		var shuttleMasGridFieldObj=									//69995
		[
			{columnname:"Shuttle Code",dataname:"SHUTTLE_CODE",datatype:"string",width:120,linkId:"Shuttle","tooltip":"Click here to launch the shuttle master screen."},
			{columnname:"Shuttle Description",dataname:"SHUTTLE_DESCRIPTION",datatype:"string",width:120},
			{columnname:"Calendar Code",dataname:"CALENDAR_CODE",datatype:"string",width:120},
			{columnname:"Calendar Description",dataname:"CALENDAR_DESC",datatype:"string",width:120},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"string",width:120},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"string",width:120},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
		]
		var shuttleMasGridDtl=										//69995
		{

		title:"",
		id:"shuttleDetails",
	    detail:shuttleMasGridFieldObj,
		readonly:true,
		visibleRow:plf.searchVisibleRows,
		widthBasis:"flex",
		}
		var shuttleMasGridSection = plf.addGrid(shuttleMasGridDtl,this)							//69995
		//HelpOnEmployee Grid Section Ends
		
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
