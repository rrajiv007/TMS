/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************		                                   
************************************************************************************************/
Ext.define('CueTrans.view.EDI.EDIIntegrationLog', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "EDI Integration Log";
		mainpage.toolbarSectionFlag=true;
		/******* Header Section start ****/
		plf.columns=4
		var EDISummaryColumn = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
		
		
		var EDISummaryFormCtrl=
		[
			plf.addText({"label":"Wasil Shipment ID",id:"strShippmentNoFrom"}),
			plf.addText({"label":"File Name",id:"strDocNo"}),
			plf.addText({"label":"Message",id:"strRemarks"}),
			plf.addCombo({"label":"Status","id":"strStatus"}),
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addDate({"label":"Date From","id":"dtShippmentDateFrom"}),
			plf.addDate({"label":"Date To","id":"dtShippmentDateTo"})
		]
		
		EDISummaryColumn.add(EDISummaryFormCtrl);
		/******* Header Section end ****/
		
		/******* Grid Section start ****/
		var EDIIntegrationLogObj=
		[
        //{columnname:"Delivery Order No.",dataname:"DELIVERY_ORDER_NO",datatype:"string",width:300},	
        {columnname:"Wasil Shipment ID",dataname:"DELIVERY_ORDER_NO",datatype:"string",width:300},		
		{columnname:"File Name",dataname:"FILE_NAME",datatype:"string",width:500},
		{columnname:"Status",dataname:"STATUS",datatype:"string",width:100},
		{columnname:"Created Date",dataname:"CREATED_DATE",datatype:"string",width:140},
		{columnname:"Message",dataname:"MSG",datatype:"string",width:300},
		{columnname:"Timestamp Id",dataname:"TIMESTAMP_ID",datatype:"string",width:300,hidden:true}
			
		]
		EDIIntegrationLogObjdtl=
		{
			title:"",
			id:"EDIIntegrationLog",
			detail:EDIIntegrationLogObj,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		var GridSection = plf.addGrid(EDIIntegrationLogObjdtl,this)
		/******* Grid Section end ****/
		
		mainpage.ptrMainSection.add(EDISummaryColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(GridSection)	
		
			
		mainpage.eventHandlers = 
		[	
        	{ 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"INIT_EDIINTGRATIONLOG_SUM"
			},
            {					
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strShippmentNoFrom","strDocNo","strRemarks","strStatus","strDateType","dtShippmentDateFrom","dtShippmentDateTo"], 
				"service":"TMSCoreTransportTS", 
				"methodName":"FETCH_EDIINTGRATIONLOG"
			}			
		];
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
