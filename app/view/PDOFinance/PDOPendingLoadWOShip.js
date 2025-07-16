/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.PDOFinance.PDOPendingLoadWOShip', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Loads without Shipment";
		mainpage.toolbarSectionFlag=true;
		
		var GridFieldObj=
		[
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:150},
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:150},
			{columnname:"Load Type",dataname:"LOAD_TYPE",datatype:"string",width:150},
			{columnname:"Load Category",dataname:"LOAD_CAT",datatype:"string",width:150},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:150},
			{columnname:"Load Weight",dataname:"LOAD_WEIGHT",datatype:"string",width:150},
			{columnname:"Load Distance",dataname:"LOAD_DIST",datatype:"string",width:150},
			{columnname:"Load Closure Date",dataname:"LOAD_CLOSURE_DT",datatype:"string",width:150},
			{columnname:"Carrier Bill ID",dataname:"CAR_BILL_ID",datatype:"string",width:150},
			{columnname:"Carrier Bill Period",dataname:"CAR_BILL_PERIOD",datatype:"string",width:150},
			{columnname:"Contractor Bill No",dataname:"CAR_BILL_NO",datatype:"string",width:150},
			{columnname:"Generated Date",dataname:"GENERATED_DATE",datatype:"date",width:150}
		]
		var finGridDtl=			//69995
		{
			title:"",
			id:"pendingShip",
			detail:GridFieldObj,
			visibleRow:13,
			readonly:true,
			removeAddDelete:true,
			widthBasis:"flex"
		}
		
		
		
		//Add Child Sections
	
		
		var InvSection=plf.addGrid(finGridDtl,this)		
		mainpage.ptrMainSection.add(InvSection) 
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"PDOinitPendLdWoShipTS"
			}		
		];
		
		this.callParent(arguments);
		
	}
});
