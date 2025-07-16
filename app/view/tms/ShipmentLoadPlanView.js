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
Ext.define('CueTrans.view.tms.ShipmentLoadPlanView', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Shipment-Load View";
		mainpage.toolbarSectionFlag=true;	
		//mainpage.toolbarActions=["Confirm Load"]
		mainpage.toolbarLinks=
		[
			{"name":"Vehicle Demand Planning","linkid":"tms_vehdemandplan"}			,
			{"name":"Load Plan View","linkid":"tms_loadplanview"}	
		]
		/*Hdr starts here*/
		plf.columns=4
		var ShipLoanPlanViewHdr = plf.addColumnSection({}); 
		var ShipLoanPlanViewHdrFormCtrl=
		[
		plf.addDisplayOnly({"label":"Plan Line No",id:"strPlanLineNo"}),
		plf.addDisplayOnly({"label":"Load Line No",id:"strLoadLineNo"}),		
		plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
		plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
		plf.addDisplayOnly({"label":"Route",id:"strRouteCode"}),
		plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"}),
		plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehicleCategory"}),
		plf.addDisplayOnly({"label":"Capacity",id:"strCapacity"}),
		plf.addDisplayOnly({"label":"Load Weight (ton)",id:"iLoadWeight"}),
		plf.addDisplayOnly({"label":"Utilization %",id:"iLoadUtil"}),
		plf.addDate({"label":"Load Date",id:"dtLoadDate","mandatory":"true"}),
		//plf.addText({"label":"Load Time",id:"tmLoadTime","mandatory":"true"}),
		plf.addHidden({"label":"",id:"strHdnGuid"}),
		plf.addHidden({"label":"",id:"strRequestType"})
		]	
		ShipLoanPlanViewHdr.add(ShipLoanPlanViewHdrFormCtrl); 
		/*Hdr ends here*/	
		
		/*LoanPlanView Grid Section starts here*/
		var ShipLoanPlanViewGridObj=
		[			
			{columnname:"Shipment No",dataname:"SHIPMENT_NO",datatype:"string",width:150},			
			{columnname:"Request No",dataname:"TRANS_REQ_NO",datatype:"string",width:150},			
			{columnname:"Customer<br>code",dataname:"CUST_CODE",datatype:"string",width:100},		
			{columnname:"Pickup<br>Date",dataname:"PICKUP_DATE",datatype:"string",width:100},			
			{columnname:"Delivery<br>Date",dataname:"DELIVERY_DATE",datatype:"string",width:100},
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",width:100},
			{columnname:"Item Description",dataname:"ITEM_DESC",datatype:"string",width:223},
			{columnname:"Quantity",dataname:"ITEM_QTY",datatype:"string",width:100},
			{columnname:"Uom",dataname:"ITEM_QTY_UOM",datatype:"string",width:100},
			{columnname:"Weight (tons)",dataname:"WEIGHT",datatype:"string",width:100}
		]
		ShipLoanPlanViewGridDtl=
		{
			title:"",
			id:"ShipLoanPlanView",
			detail:ShipLoanPlanViewGridObj,
			readOnly:true,
			removeAddDelete: true
		   }
		var GridSection = plf.addGrid(ShipLoanPlanViewGridDtl,this)
				
		//Add Child Sections
		mainpage.ptrMainSection.add(ShipLoanPlanViewHdr)		
		mainpage.ptrMainSection.add(GridSection) 
		//mainpage.ptrMainSection.add(VehDemandHdrConfirmLoadbtn) 
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		  {
				    "controlid":"",
				    "tasktype":"onload",
				    "input":["strOrigin","strDestination","strRouteCode","strVehicleCategory","strCommodity","strHdnGuid","strRequestType"],
				    "service":"TMSCoreTransportTS",
				    "methodName":"initShipLoanPlanViewTS"
	      }
		];
		mainpage.screenLinks=
		{
			
			"tms_vehdemandplan":
				{
					"dest":"tms.VehiclePlanning",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"tms_loadplanview":
				{
					"dest":"tms.LoadPlanView",
					"hdr":[
							{"src":"strHdnGuid","dest":"strHdnGuid"},
							{"src":"strPlanLineNo","dest":"strPlanLineNo"},
							{"src":"strRouteCode","dest":"strRouteCode"},
							{"src":"strDestination","dest":"strDestination"},
							{"src":"strOrigin","dest":"strOrigin"},
							{"src":"strVehicleCategory","dest":"strVehicleCategory"}
							]					
				}			
				
				
		}
		this.callParent(arguments);
		
	}
});
