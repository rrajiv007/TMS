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
Ext.define('CueTrans.view.PDOFinance.LoadLegsDetails', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		//mainpage.hlpSectionFlag=true;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.6;
		mainpage.popupWidthRatio=.75;
		mainpage.startPainting();
		
		mainpage.screenName = "Load Legs Details";	

		var formCtrl=[];
		plf.columns=1
		var loadLegSummaryColumn = plf.addColumnSection({title:"", collapsed: false,"cls":""});
		
		var loadLegSummaryFormCtrl=
		[
			plf.addHidden({"id":"strFromRegion"}),
			plf.addHidden({"id":"strToRegion"}),
			plf.addHidden({"id":"strBillNo"}),
			plf.addHidden({"id":"strLoadCat"}),
			plf.addHidden({"id":"strLoadType"})
		]		
		loadLegSummaryColumn.add(loadLegSummaryFormCtrl);	
		
		var loadLegSummaryObj=
		[			
			{columnname:"Key Field",dataname:"KEY_FIELD",datatype:"string",width:150,hidden:true},
			{columnname:"Charge Code",dataname:"CHARGE_CODE",datatype:"string",width:150,hidden:true},
			{columnname:"Lane Code",dataname:"LANE_CODE",datatype:"string",width:150,hidden:true},
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:100},
			{columnname:"Trip Closure Date",dataname:"TRIP_CLS_DT",datatype:"string",width:100},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:90,hidden:true},
			{columnname:"Load No",dataname:"GRD_LOAD_NO",datatype:"string",width:90},
			{columnname:"Load Scheduled Date",dataname:"SCH_DT",datatype:"string",width:130},
			{columnname:"Load Closure Date",dataname:"LOAD_CLS_DT",datatype:"string",width:120},
			{columnname:"Load Leg Type",dataname:"LOAD_TYPE",datatype:"string",width:100},
			{columnname:"Load Category",dataname:"LOAD_CAT",datatype:"string",width:100},
			{columnname:"Journey Plan No",dataname:"JOURNEY_PLAN_NO",datatype:"string",width:100},
			{columnname:"Journey Type",dataname:"JOURNEY_TYPE",datatype:"string",width:100},
			{columnname:"Charge Basis",dataname:"CHARGE_BASIS",datatype:"string",width:100},
			{columnname:"Scheduled Vehicle No",dataname:"VEH_CODE",datatype:"string",width:140},
			{columnname:"Scheduled Vehicle Category",dataname:"SCH_CAT",datatype:"string",width:180},
			{columnname:"Scheduled Contract No",dataname:"CONTRACT_NO",datatype:"string",width:150},
			
			{columnname:"Scheduled Contractor Name",dataname:"CONTRACTOR_NAME",datatype:"string",width:200},
			{columnname:"Reported Vehicle No",dataname:"REP_VEH",datatype:"string",width:150,hidden:true},
			{columnname:"Reported Contract No",dataname:"REP_CON",datatype:"string",width:150,hidden:true},
			{columnname:"Reported Contractor Name",dataname:"REP_CON_NM",datatype:"string",width:200,hidden:true},
			
			{columnname:"Loading Point",dataname:"LD_PT",datatype:"string",width:120},
			
			{columnname:"Origin",dataname:"ORG",datatype:"string",width:170},
			{columnname:"Destination",dataname:"DEST",datatype:"string",width:170},
			//{columnname:"From Region",dataname:"FRM_REG",datatype:"string",width:170},
			//{columnname:"To Region",dataname:"TO_REG",datatype:"string",width:170},
			{columnname:"Finance From Region",dataname:"FIN_FROM_REG",datatype:"string",width:170},
			{columnname:"Finance To Region",dataname:"FIN_TO_REG",datatype:"string",width:170},
			{columnname:"Unloading Point",dataname:"ULD_PT",datatype:"string",width:120},
			{columnname:"Load Weight",dataname:"LOAD_WT",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Load Distance",dataname:"LOAD_DIST",datatype:"string",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Load Leg Amount",dataname:"CHARGE_AMT",datatype:"string",width:120,colAlign:'right',weightPrecision:3},
			
			{columnname:"Adjustments",dataname:"ADJ",datatype:"string",width:100,editControl:"textbox",colAlign:'right',weightPrecision:3},			
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"Total Load Leg Amount",dataname:"TOT_LOAD_LEG_AMT",datatype:"string",width:150,colAlign:'right',weightPrecision:3},
			{columnname:"Generated Date",dataname:"GEN_DATE",datatype:"string",width:120},
			
			{columnname:"Contractor Bill No",dataname:"CONTRACT_BILL_NO",datatype:"string",width:170},			
			{columnname:"Operations Approval",dataname:"OPS_APP",datatype:"string",width:150},
			{columnname:"Approved By",dataname:"OPS_APP_BY",datatype:"string",width:100},
			{columnname:"Approved Date",dataname:"OPS_APP_DT",datatype:"string",width:100},
			{columnname:"PDO Approval",dataname:"PDO_APP",datatype:"string",width:120},
			{columnname:"Approved By",dataname:"PDO_APP_BY",datatype:"string",width:100},
			{columnname:"Approved Date",dataname:"PDO_APP_DT",datatype:"string",width:100},
			{columnname:"Paid to OTO",dataname:"PAID_OTO",datatype:"string",width:100},
			{columnname:"Updated By",dataname:"UPDATE_BY",datatype:"string",width:100},
			{columnname:"Updated Date",dataname:"PAID_OTO_DT",datatype:"string",width:100},
			{columnname:"Cancel Load",dataname:"CAN_LOAD",datatype:"string",width:80,linkId:"cancellink",heading:true,gridpopup:true,tooltip:"Click here to cancel load.",imageURL:"resources/images/gridbar/delete.png",hidden:true}

					
		]
		loadListSummaryGridDetail=
		{
			title:"",
			id:"LoadLegDetailGrid",
			detail:loadLegSummaryObj,
			visibleRow:10,
			removeAddDelete:true,
			readonly:true,
            groupByField: 'LOAD_NO'				
		}
		var loadListSummaryGridSection = plf.addGrid(loadListSummaryGridDetail,this)
				
		//mainpage.hlpSearchGridPtr = loadListSummaryGridSection
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(loadLegSummaryColumn)
		mainpage.ptrMainSection.add(loadListSummaryGridSection) 
		
	    //History Data Section
		mainpage.dataHistorySectionFlag=false;	
	
		mainpage.eventHandlers = 
		[	
		{
			"controlid":"",
			"tasktype":"onload",
			"input":["iUID","strFromRegion","strToRegion","strBillNo","strLoadCat","strLoadType"],
			"service":"FINCoreFinanceServiceTS",
			"methodName":"initFinLoadLegPopupTS"
		}	
		];		
		this.callParent(arguments);
	}
});