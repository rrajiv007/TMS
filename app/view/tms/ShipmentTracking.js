/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var		                                   
************************************************************************************************/
Ext.define('CueTrans.view.track.ShipmentTracking', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Shipment Tracking";
		mainpage.toolbarSectionFlag = true;
		//Vehicle Demand Planning Search Section Begins
		plf.columns=3
		var helpOnTrackTraceHdrCollapse = plf.addCollapseSection({title:"Search Criteria", collapsed:false}); 
        mainpage.toolbarSectionFlag=false;	
	 	var helpOnTrackTraceFormCtrl=
		[
			plf.addText({"label":"Request No From",id:"strRequestNoFrom"}),
			plf.addText({"label":"Request No To",id:"strRequestNo"}),
			plf.addDate({"label":"Request Date From",id:"strPriority"}),
			plf.addDate({"label":"Request Date To",id:"strOrigin"}),
			plf.addCombo({"label":"Origin",id:"strDestination"}),
			plf.addCombo({"label":"Destination",id:"strDemandStatus"}),
			plf.addCombo({"label":"Priority",id:"strDestination"}),
			plf.addText({"label":"Customer Code",id:"strDestination"}),
			plf.addBlank(),
			plf.addBlank(),
			plf.addButton({"label":"Track Shipments",id:"searchBtn"}),
			plf.addBlank(),
		]
		
		helpOnTrackTraceHdrCollapse.add(helpOnTrackTraceFormCtrl);
		//Driver Search Section Ends
		
		//Driver Grid Section Begins
		var helpOnTrackTraceGridFieldObj=
		[
			{columnname:"Request No",dataname:"REQUEST_NO",datatype:"string",editControl:"textbox",width:100,linkId:"reqnolink"},
			{columnname:"Request Date",dataname:"REQUEST_DATE",datatype:"string",width:100},
			{columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"Customer Name",dataname:"CUST_NAME",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"Do No",dataname:"REF_NO",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100,editControl:"textbox"}
		]
		helpOnTrackTraceGridDtl=
		{
			title:"",
			id:"TrackTrace",
			detail:helpOnTrackTraceGridFieldObj,
		   }
		 var helpGridSection = plf.addGrid(helpOnTrackTraceGridDtl,this)
		//Driver Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnTrackTraceHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreDriveService",
				"methodName":"initDriverSearchScrTS"
			},	
		{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strDriverCodeFrom","strDriverCodeTo","strDriverName","str3plOwnerName","strDriverType","strLicenceType","strStatus",
						"strAvailabilityStatus"],
			    "service":"CoreDriveService",
				"methodName":"fetchAllDriverDetailsTS"
		}
			
		];
				mainpage.screenLinks=
		{
			"reqnolink":
				{
					"dest":"track.ShipmentTrackingDetails",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"LOAD_NO","dest":"strLoadNo"}
							]
				},
				"driver":
				{
					"dest":"jm_master.DriverMaster",
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
