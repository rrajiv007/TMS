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
Ext.define('CueTrans.view.GateEntry.GateEntryMasterHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		mainpage.screenName = "Gate Entry Help";
		
		
		//Truck Master Section starts

		//var formCtrl=[];
		plf.columns=3
		//gateEntryHelpColumn = plf.addColumnSection({});
		var gateEntryHelpColumn =  plf.addColumnSection({});		//69997
		
		
		var gateEntryHelpFormCtrl=						//69997
		[
			plf.addCombo({"label":"Vehicle Source",id:"strVehicleSource"}),
			plf.addText({"label":"Vehicle Reg No",id:"strVehicleRegNo"}),
			plf.addCombo({"label":"Entry Type","id":"strEntryType"}),
			plf.addText({"label":"Gate Entry No From","id":"strGateEntryNoFrom"}),
			plf.addText({"label":"Gate Entry No To","id":"strGateEntryNoTo"}),
			plf.addText({"label":"Gate No","id":"strGateNo"}),
			plf.addDate({"label":"Gate Entry Date From","id":"dtGateEntryDateFrom"}),
			plf.addDate({"label":"Gate Entry Date To","id":"dtGateEntryDateTo"}),
			plf.addCombo({"label":"Vehicle Category","id":"strVehicleCategory"}),
			plf.addText({"label":"Driver Code","id":"strDriverCode"}),
			plf.addText({"label":"Driver / Visitor Name","id":"strDriverName"}),
			plf.addText({"label":"Journey Plan No","id":"strJourneyPlanNo"}),
			plf.addText({"label":"Location Code","id":"strLocationCode"}),			
			plf.addButton({"label":"Search","id":"btnSearch"}),
		]
		
		gateEntryHelpColumn.add(gateEntryHelpFormCtrl);
		
		
		var customerContractSummaryObj=								//69997
		[
			{columnname:"Gate Entry No",dataname:"GATEENTRY_NO",datatype:"string",width:150,linkId:"carrierContractScr"},
			{columnname:"Vehicle Source",dataname:"VEH_SOURCE",datatype:"string",width:100},
			{columnname:"Entry Type",dataname:"ENTRY_TYPE",datatype:"string",width:100},
			{columnname:"Vehicle Reg No",dataname:"VEH_REG_NO",datatype:"string",width:100},
			{columnname:"Gate Entry Date",dataname:"GATE_ENTRY_DATE",datatype:"string",width:100},
			{columnname:"Gate Entry Time",dataname:"GATE_ENTRY_TIME",datatype:"string",width:100},
			{columnname:"Gate No",dataname:"GATE_NO",datatype:"string",width:100},
			{columnname:"Vehicle Category",dataname:"VEH_CATEGORY",datatype:"string",width:100},
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:100},
			{columnname:"Driver/Visitor Name",dataname:"DRI_VIS_NAME",datatype:"string",width:100},
			{columnname:"Journey Plan No",dataname:"JP_NO",datatype:"string",width:100},
			{columnname:"Location Code",dataname:"LOC_CODE",datatype:"string",width:100}
		]
		var customerContractSummaryGridDetail=						//69997
		{
			title:"",
			id:"gateEntryObj",
			detail:customerContractSummaryObj,
			visibleRow:6,
			readOnly:true,
			removeAddDelete:true
			
		}
		var customerContractSummaryGridSection = plf.addGrid(customerContractSummaryGridDetail,this)		//69997
		mainpage.hlpSearchGridPtr = customerContractSummaryGridSection
		
		
		
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(gateEntryHelpColumn)
		mainpage.ptrMainSection.add(customerContractSummaryGridSection) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		
			mainpage.eventHandlers = 
			[
               {
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strVehicleSource","strVehicleRegNo","strEntryType","strGateEntryNoFrom","strGateEntryNoTo","strGateNo","dtGateEntryDateFrom","dtGateEntryDateTo","strVehicleCategory","strDriverCode","strDriverName","strJourneyPlanNo","strLocationCode"],
					"service":"CoreGateEntry",
					"methodName":"fetchAllGateEntryTS"
			},
			{
					"controlid":"strVehicleSource",
					"tasktype":"onchange",
					"input":["strVehicleSource"],
					"service":"CoreGateEntry",
					"methodName":"onChangeVehicleSourceTS"
			},			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreGateEntry",
				"methodName":"initGateEntryHelpScrTS"
			} 
			             
			];
		
			
		
		this.callParent(arguments);
		
	
	}
});
