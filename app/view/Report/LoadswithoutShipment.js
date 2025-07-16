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
Ext.define('CueTrans.view.Report.LoadswithoutShipment', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Loads without Shipment";
		
		//Help on Customer Search Section Begins
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		/*mainpage.toolbarLinks=
		[
			{"name":"Operational Reports","linkid":"operation_rpt"},
			{"name":"Statistical Reports","linkid":"rep_streports"}
		]*/
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var ReportsColumn = plf.addColumnSection({});	
		
		var ReportsFormCtrl=							
		[	
		    plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination","id":"strDestination"}),
			
			plf.addCombo({"label":"Load Status","id":"strStatus"}),
			
		    plf.addCombo({"label":"From Region",id:"strRegion"}),
			plf.addCombo({"label":"To Region",id:"strDestRegion"}),
			
			plf.addCombo({"label":"Loading Point",id:"strLoadAtt"}), 
			plf.addCombo({"label":"Unloading Point",id:"strDelAtt"}),
			
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addDate({"label":"Date From","id":"dtDateFrom"}),
			plf.addDate({"label":"Date To","id":"dtDateTo"}),
			
			plf.addText({"label":"Vehicle Inspection No",id:"strInspectionNoFrom"}),
			plf.addText({"label":"Journey Plan No",id:"strJourneyNoFrom"}),
			
			plf.addText({"label":"Scheduled Vehicle",id:"strVehicleCodeFrom"}),
			plf.addText({"label":"Reporting Vehicle",id:"strVehicleCategory"}),
			
			plf.addText({"label":"Driver Code",id:"strDriverCodeFrom"}),
			plf.addText({"label":"Driver Name",id:"strDriverName"}),
			plf.addText({"label":"Driver Contact No",id:"strMobileNo"})
			
					  
		    
			
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=3
		var ReportsButtonColumn = plf.addColumnSection({});	//69997
		ReportsFormCtrl=
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Show Details","id":"GetLoadWOShip"}),	  
		  //plf.addButton({"label":"Generate","id":"LoadBuildingReport"}),
		  plf.addBlank()		 
		  	
		]	
		LoadWOShipgrid=
		[  
             {columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:80},
			 {columnname:"Load Status",dataname:"STATUS",datatype:"string",width:90},
			 {columnname:"Departure Date/Time",dataname:"LOAD_DATE",datatype:"string",width:130},
			 {columnname:"Delivered Date/Time",dataname:"DELIVERED_DATE",datatype:"string",width:130},
			 {columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:130},
			 {columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:130},
			 {columnname:"From Region",dataname:"REGION_FROM",datatype:"string",width:90},
			 {columnname:"To Region",dataname:"REGION_TO",datatype:"string",width:90},
			 {columnname:"Loading Point",dataname:"LOADING_POINT",datatype:"string",width:120},
			 {columnname:"Unloading Point",dataname:"UNLOADING_POINT",datatype:"string",width:120},
			 {columnname:"Load Description",dataname:"LOAD_DESC",datatype:"string",width:120},
			 {columnname:"Actual Weight(ton)",dataname:"ACT_WEIGHT",datatype:"string",width:120,colAlign:'right',weightPrecision:3},
			 {columnname:"Vehicle Inspection No",dataname:"INSPECTION_NO",datatype:"string",width:150},
			 {columnname:"Vehicle Inspection Status",dataname:"VEH_INSP_STATUS",datatype:"string",width:140},
			
			 {columnname:"Journey Plan No",dataname:"JP_NO",datatype:"string",width:100},
			 {columnname:"Journey Status",dataname:"JOURNEY_STATUS",datatype:"string",width:100},
			 {columnname:"Scheduled Vehicle",dataname:"VEHICLE",datatype:"string",width:115},
             {columnname:"Reporting Vehicle",dataname:"REPOVEHICLE",datatype:"string",width:115},
			 
			 {columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:110},
			 {columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:110},
			 {columnname:"Driver Contact No",dataname:"DRIVER_CONTACT_NO",datatype:"string",width:110}
			 
			
			 
		]
		LoadWOShipdetails=
		{
			title:"Load Details",
			id:"Loadsummarydtl",
			detail:LoadWOShipgrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		LoadWOShipStatusSection = plf.addGrid(LoadWOShipdetails,this)
		ReportsButtonColumn.add(ReportsFormCtrl)
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(LoadWOShipStatusSection)	
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
				"methodName":"initLoadWOShipTs"
			},
			{		
				"controlid":"GetLoadWOShip",
				"tasktype":"btnclick",
				"input":[
						"strDateType", "strOrigin", "strDestination", "strRegion", "strDestRegion", "strDelAtt",  "strLoadAtt", "strLoadNoFrom", "strStatus", "strInspectionNoFrom", "strJourneyNoFrom", "strVehicleCodeFrom", "strVehicleCategory", "strDriverCodeFrom", "strDriverName", "strMobileNo", "dtDateFrom", "dtDateTo"					
						],
				"service":"CoreReportService",
				"methodName":"loadWOShipSearchTS"
							
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
