/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.2															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.tms.BulkVehicleRelease', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Bulk Vehicle Release";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Bulk Vehicle Release",
                "tooltip": "Click here to release vehicle release."
            }
        ]

		plf.columns=4
		var helpOnBulkHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: false,btnID:"searchBtn"},this); 
	 	var helpOnBulkClsreCtrl=												
		[
			plf.addCombo({"label":"Date Type",id:"strDateType"}),
			plf.addDate({"label":"Date From",id:"dtShippmentDateFrom"/*,"mandatory":"true"*/}),
			plf.addDate({"label":"Date To",id:"dtShippmentDateTo"/*,"mandatory":"true"*/}),
			plf.addText({"label":"Journey Plan No",id:"strShippmentNo"}),
			plf.addText({"label":"Load No",id:"strLoadNo"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"})
			/*plf.addText({"label":"Shipment No",id:"strShippmentNo","anywhereSearch":"true"}),
			plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory"}),	
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addDate({"label":"Departure Date",id:"dtDepartureDate"}),
			plf.addCombo({"label":"Commodity",id:"strCommodity"}),
			plf.addText({"label":"Ref Doc No",id:"strRefDocNo","anywhereSearch":"true"}),
			plf.addText({"label":"Vehicle Reg No",id:"strVehCode","anywhereSearch":"true"})*/
					
			
			//plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."}),
		]
		
		helpOnBulkHdrCollapse.add(helpOnBulkClsreCtrl);
		
	    var BulkTripCloserGridFieldObj=											
		[   
		    
			{columnname:"Journey Plan No",dataname:"LOAD_AT",datatype:"string",width:150},//$strLoadAt
			{columnname:"JP Date",dataname:"DELIVERY_DATE",datatype:"string",width:120},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:80},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:120},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:120},
			{columnname:"Scheduled Vehicle",dataname:"CUSTOMER_CODE",datatype:"string",width:130},//$strCustomerCode CUSTOMER_CODE
			{columnname:"Contract No",dataname:"DOC_NO",datatype:"string",width:120},
			{columnname:"Contractor Name",dataname:"DRIVER_NAME",datatype:"string",width:130},
			{columnname:"Reported Vehicle",dataname:"VEH_CAT",datatype:"string",width:120},
			{columnname:"Trip No",dataname:"VEH_REG_NO",datatype:"string",width:130},//$strVehRegNo
			
			{columnname:"Journey Close Date & Time",dataname:"JP_CLOSE_DT_TIME",datatype:"string",width:120},
			//{columnname:"Journey Close Time",dataname:"JP_CLOSE_TIME",datatype:"string",width:120},
			
			{columnname:"Release Date",dataname:"PICKUP_DATE",datatype:"string",width:120,editControl:"date"},
			{columnname:"Release Time",dataname:"PICKUP_TIME",datatype:"string",width:120,editControl:"RegexTime"}/*,
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:120,editControl:"textbox"}*/
			
			/*{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:80},
			{columnname:"Shipment No",dataname:"LOAD_AT",datatype:"string",width:150},
			{columnname:"Departure Date",dataname:"DELIVERY_DATE",datatype:"string",width:120},
			{columnname:"Contractual Delivery Date",dataname:"DELV_DATE",datatype:"string",width:150},
			{columnname:"Vehicle Allocated Date",dataname:"ALLOC_DATE",datatype:"string",width:150},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:120},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:120},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:120},
			{columnname:"Vehicle Regn<br>No",dataname:"TRUCK_REG_NO",datatype:"string",width:130},
			{columnname:"Vehicle Category",dataname:"VEH_CAT",datatype:"string",width:120},
			{columnname:"Ref Doc NO",dataname:"DOC_NO",datatype:"string",width:120},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:130},
			{columnname:"Trailer Code",dataname:"TRAILER_CODE",datatype:"string",width:130},
			{columnname:"Closure Date",dataname:"PICKUP_DATE",datatype:"string",width:120,editControl:"date"},
			{columnname:"Closure Time",dataname:"PICKUP_TIME",datatype:"string",width:120,editControl:"time"},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:120,editControl:"textbox","hidden":"true"}*/
		]
		BulkTriplDetailsPlan=
		{
			title:"",
			id:"excelDetail",
			detail:BulkTripCloserGridFieldObj,
			visibleRow:10,
			removeAddDelete:true/*,
			tool:bulkConfirm	*/		
		}
		var BulkTriplDetailsPlanGridSection = plf.addGrid(BulkTriplDetailsPlan,this)	//69997
		

		
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnBulkHdrCollapse) 
		
		mainpage.ptrMainSection.add(BulkTriplDetailsPlanGridSection)		
		   
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initBulkTripClosureTS"
			},
			{
			    "controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strLoadNo","strShippmentNo","strVehicleCategory","strOrigin","strDestination","strAction","dtDepartureDate","strCommodity","strRefDocNo","strDateType","dtShippmentDateFrom","dtShippmentDateTo","strVehCode","excelDetail"], 
				"service":"TMSCoreTransportTS", 
				"methodName":"fetchBulkTripClosureTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Bulk Vehicle Release",
				"input":["strLoadNo","strShippmentNo","strVehicleCategory","strOrigin","strDestination","strAction","dtDepartureDate","strCommodity","strRefDocNo","excelDetail"], 
				"service":"TMSCoreTransportTS",
				"methodName":"updateBulkVehileRlseTS"
		}
		];
		
		mainpage.hlpLinks=
		{		
						
		}		
		

		this.callParent(arguments);
		
	}
});
