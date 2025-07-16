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
Ext.define('CueTrans.view.Report.PODStatusReport', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "POD Status Report";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		/*mainpage.toolbarLinks=
		[
			{"name":"Operational Reports","linkid":"operation_rpt"},
			{"name":"Statistical Reports","linkid":"rep_streports"}
		]*/
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var ReportsColumn = plf.addColumnSection({});	//69997
		
		var ReportsFormCtrl=							//69997
		[	
		
		      plf.addCombo({"label":"Date Type","id":"strLoadType"}),
			  plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			  plf.addDate({"label":"Date To",id:"dtDateTo"}),
			  //plf.addCombo({"label":"Load Status","id":"strLocation"}),
			  plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			  
			  plf.addText({"label":"PO No",id:"strRef"}),
			  plf.addText({"label":"Ref Doc No",id:"strDocNo"}),
			  //plf.addText({"label":"Load Description",id:"strLoadDesc"}),
			  plf.addCombo({"label":"Origin",id:"strOrigin"}),
			  plf.addCombo({"label":"Destination",id:"strDestination"}),
              plf.addCombo({"label":"From Region",id:"strRegion"}),
			  plf.addCombo({"label":"To Region",id:"strDestRegion"}),
			  plf.addCombo({"label":"Loading Point",id:"strLoadAtt"}),
              plf.addCombo({"label":"Unloading Point",id:"strDelAtt"}),
			  //plf.addText({"label":"Item No",id:"strItemCode"}),
			  plf.addCombo({"label":"Vendor Name",id:"strJMname"}),
			  
			  /*
			  
			  plf.addText({"label":"Scheduled Vehicle",id:"strScheduleVeh"}),	
              plf.addText({"label":"Contract No",id:"strRequestNoFrom"}),	
              plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory"}), 
              plf.addText({"label":"Reported Vehicle",id:"strReportedVeh"}),
              plf.addCombo({"label":"Loading Point",id:"strLoadAtt"}),
              plf.addCombo({"label":"Unloading Point",id:"strDelAtt"}),
			  plf.addText({"label":"Ref Doc No",id:"strRef"}),
              plf.addCombo({"label":"Region",id:"strRegion"})			 
		      */
		    
			
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=3
		var ReportsButtonColumn = plf.addColumnSection({});	//69997
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Show Details","id":"GetPODDetails"}),	  
		  //plf.addButton({"label":"Generate","id":"LoadBuildingReport"}),
		  plf.addBlank()		 
		  	
		]	
		PODStatusgrid=
		[  
             {columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:90},
			 {columnname:"Carrier Code",dataname:"CARRIER_CODE",datatype:"string",width:110},
			// {columnname:"PO No",dataname:"PO_NO",datatype:"string",width:100},
			 {columnname:"Ref Doc No",dataname:"REF_DOC_NO",datatype:"string",width:100},
			 //{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",width:90},
			 //{columnname:"Item Description",dataname:"ITEM_DESC",datatype:"string",width:120},
			 {columnname:"Load Status",dataname:"STATUS",datatype:"string",width:100},
			 {columnname:"Departure Date/Time",dataname:"LOAD_DATE",datatype:"string",width:150},
			 {columnname:"Delivered Date/Time",dataname:"DELIVERED_DATE",datatype:"string",width:150},
			 {columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:130},
			 {columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:130},
			 {columnname:"From Region",dataname:"REGION_FROM",datatype:"string",width:100},
			 {columnname:"To Region",dataname:"REGION_TO",datatype:"string",width:100},
			 {columnname:"Loading Point",dataname:"LOADING_POINT",datatype:"string",width:120},
			 {columnname:"Unloading Point",dataname:"UNLOADING_POINT",datatype:"string",width:120},
			 {columnname:"Vendor Name",dataname:"VENDOR_NAME",datatype:"string",width:150},
			 {columnname:"Vendor Request",dataname:"VENDOR_REQ",datatype:"string",width:100},
			 {columnname:"POD Completed",dataname:"POD_COMPLETED",datatype:"string",width:100},
			 {columnname:"Received By",dataname:"RECEIVED_BY",datatype:"string",width:100},
			 {columnname:"Received Date/Time",dataname:"RECEIVED_DT_TM",datatype:"string",width:150},
			 {columnname:"Received Location",dataname:"RECEIVED_LOC",datatype:"string",width:130}
			 
		]
		PODStatusdetails=
		{
			title:"POD Status Details",
			id:"Loadsummarydtl",
			detail:PODStatusgrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		PODStatusSection = plf.addGrid(PODStatusdetails,this)
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(PODStatusSection)	
		/*
		mainpage.hlpLinks=
		{
              
		}
		*/
		mainpage.eventHandlers = 
		[	
            { 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"initPODStatusRep"
			},
			{		
				"controlid":"GetPODDetails",
				"tasktype":"btnclick",
				"input":[
						"strLoadType","dtDateFrom","dtDateTo","strLoadNoFrom","strOrigin","strDestination",,"strRegion","strDestRegion","strLoadAtt","strDelAtt","strJMname","strRef","strDocNo","strItemCode"					
						],
				"service":"CoreReportService",
				"methodName":"PrintPODStatusDtlTs"
							
			}
		];
/*mainpage.screenLinks=	
		{	
		} 
*/
		
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
