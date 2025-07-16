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
Ext.define('CueTrans.view.tms.BulkRequestSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Bulk Request";
		
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Create Bulk Request","linkid":"tms_createbulkrequest","tooltip":"Click here to create a bulk request."}
		]
		
		
		mainpage.toolbarSectionFlag=true;
        /*mainpage.toolbarLinks=
		[
			{"name":"New Carrier","linkid":"jm_3PlOwnerScr"},
			{"name":"New Carrier","linkid":"jm_3PlOwnerScr"}
		]*/
		
		
		
		plf.columns = 3
		 var bulkHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
		 var bulkFormCtrl=
		[
			plf.addText({"label":"Bulk Request",id:"strRequestNoFrom","anywhereSearch":"true"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			
			plf.addDate({"label":"Transaction Date From",id:"dtRequestDateFrom"}),
			plf.addDate({"label":"Transaction Date To",id:"dtRequestDateTo"}),
			plf.addText({"label":"Bulk Ref Doc No",id:"strDocNo","anywhereSearch":"true"}),
			
			//plf.addBlank(),
			//plf.addButton({"label":"Search",id:"btnSearch",tooltip:"Click here to search."}),
			//plf.addBlank()
		]
		
	
		bulkHdrCollapse.add(bulkFormCtrl);
		//HelpOn3PL Header Section Ends
		
		//HelpOn3PL Grid Section Begins
		 var bulkGridFieldObj=
		[
			{columnname:"Bulk Request No",dataname:"TRANS_REQ_NO",datatype:"string",width:150,linkId:"bulkrequestlink",tooltip:"Click here to launch the bulk request screen."},
			{columnname:"Transaction Date",dataname:"TARNS_REQ_DATE",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",datatype:"string",width:150},
			{columnname:"Bulk Ref Doc No",dataname:"DO_NO",datatype:"string",width:130}
		]
		bulkGridDtl=
		{
			title:"",
			id:"bulkReqSumGrid",
			detail:bulkGridFieldObj,
			removeAddDelete:true,
			visibleRow:plf.searchVisibleRows,
			readonly:true
			
		}
		helpGridSection = plf.addGrid(bulkGridDtl,this)	
		//HelpOn3PL Grid Section Ends
		
		//Add Child Sections

		mainpage.ptrMainSection.add(bulkHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strRequestNoFrom","dtRequestDateFrom","dtRequestDateTo","strStatus","strDocNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchBulkReqTS"
			},
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initBulkRequestTS"
			}
			
			
		];
	
	mainpage.screenLinks=
		{
			"tms_createbulkrequest":
				{
					"dest":"tms.BulkRequest",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
			"bulkrequestlink":
			{
					"dest":"tms.BulkRequest",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"TRANS_REQ_NO","dest":"strRequestNo"}
							]
				}
		
		}
		
		
		
		this.callParent(arguments);
		
	}
});
