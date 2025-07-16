/************************************************************************************************
Modification History        									                               	
************************************************************************************************
Description : Manage Rate
Author      : Raj                                                           		         
Version     : 1.0.0
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
 
Ext.define('CueTrans.view.PDOFinance.ManageRate', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Manage Rate";
		mainpage.toolbarSectionFlag=true;
		//mainpage.liveScreenFlag=false;			
	    mainpage.toolbarLinks=
		[
					
		]
		//Tool bar Section begins
		mainpage.toolbarActions= 
		[
		    {
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },			
			{
                "name": "Submit",
                "tooltip": "Click here to Submit."
            },			
			{
                "name": "Delete",
                "tooltip": "Click here to Delete."
            }
			
        ]
//Tool bar Section ends		
		mainpage.keyFields=["strLaneCode"]
//  Header Section 	
		plf.columns=4
		var ManageRateHdrColumn = plf.addColumnSection({title:""});			
		var ManageRateHdrCtrl=						
		[
			plf.addCombo({"label":"Lane Code",id:"strLaneCode","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Lane Description",id:"strLaneDesc"}), 
			plf.addDisplayOnly({"label":"Type",id:"strType"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			
			plf.addDisplayOnly({"label":"Lane Category",id:"strLaneRegionType"}),
			plf.addDisplayOnly({"label":"Region From",id:"strRegionFrom"}),
			plf.addDisplayOnly({"label":"Region To",id:"strRegionTo"}),
			plf.addBlank()
			
		]
		ManageRateHdrColumn.add(ManageRateHdrCtrl);
	   
	   /* Charge Mapping Detail Section start here	*/

		var ChargeMappingDetails = plf.addColumnSection({columnWidth:.10,title:"Charge Mapping"});
		var ChargeMappingObj=							
		[
		    
			//{columnname:"Charge Code",dataname:"CHARGE_CODE",datatype:"string",width:120,editControl:"combo",storeId:"strChargeCode",mandatory:true},
			//{columnname:"Lane Code",dataname:"LANE_CODE",datatype:"string",editControl:"textbox",width:140,storeId:"strLaneCode",hidden:true},
			
			{columnname:"Charge Code",dataname:"PAR_CHARGE_CODE",datatype:"string",editControl:"textbox",width:140,helpid:'charge',"onenter":"PARCHARGE_ONENTER",storeId:"strParChargeCode"},
			
			{columnname:"Charge Description",dataname:"CHARGE_DESC",datatype:"string",width:120,editControl:"DisplayOnly"},
			{columnname:"Price Basis",dataname:"PRICE_BASIS",datatype:"string",width:120,editControl:"DisplayOnly"},
			{columnname:"Nature of Charge",dataname:"NATURE_CHARGE",datatype:"string",width:120,editControl:"DisplayOnly"},
			{columnname:"Charge Type",dataname:"CHARGE_TYPE",datatype:"string",width:120,editControl:"DisplayOnly"},
			{columnname:"Charge Basis",dataname:"CHARGE_BASIS",datatype:"string",width:120,editControl:"DisplayOnly"}
		]
		var ChargeMappingDtl=								
		{
			title:"",
			id:"chargeCodes",
			detail:ChargeMappingObj,
			visibleRow:plf.searchVisibleRows,
			selDelProcess:'Y',
			//removeAddDelete:false,
			visibleRow:6
			//columnWidth:.825
		}	
			 
		var  ChargeMappingDtlCtrl = plf.addGrid(ChargeMappingDtl,this)	  
	    ChargeMappingDetails.add(ChargeMappingDtlCtrl);
		/* Charge Mapping Detail Section end here	*/
	    
	   //  Fetch Rate Mapping Header Section 	
		plf.columns=3
		var fetchRateMappingButtonHdrColumn = plf.addColumnSection({title:""});			
		var fetchRateMappingButtonHdrCtrl=						
		[
		  plf.addBlank(),
		  plf.addButton({"label":"Save","id":"Save"}),
		  plf.addBlank()
			
		]
		fetchRateMappingButtonHdrColumn.add(fetchRateMappingButtonHdrCtrl);	
	   
	   
	   
	   
	   
	   
	   //  Rate Mapping Header Section 	

		plf.columns=4
		var RateMappingHdrColumn = plf.addColumnSection({title:"Rate Mapping"});			
		var RateMappingHdrCtrl=						
		[
			plf.addCombo({"label":"Charge Code",id:"strChargeCode"/*,mandatory:"true"*/}),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank()
			
		]
		RateMappingHdrColumn.add(RateMappingHdrCtrl);
		
		var ChargeDescSection = plf.addColumnSection({columnWidth:.10,title:""});
		var ChargeDescObj=							
		[		    
		{columnname:"SEQ NO",dataname:"SEQ_NO",datatype:"string",width:150,editControl:"DisplayOnly",storeId:"strGrdSeqNo",hidden:true},
		{columnname:"Charge Code",dataname:"HDR_CHARGE_CODE",datatype:"string",width:150,editControl:"DisplayOnly",storeId:"strGrdChargeCode",hidden:true},
		{columnname:"Charge Description",dataname:"CHARGE_DESCRIPTION",datatype:"string",width:150,editControl:"DisplayOnly",storeId:"strGrdChargeDesc"},
		{columnname:"Range From",dataname:"RANGE_FROM",datatype:"string",width:150,editControl:"DisplayOnly",storeId:"strGrdRangeFrom"},
		{columnname:"Range To",dataname:"RANGE_TO",datatype:"string",width:150,editControl:"DisplayOnly",storeId:"strGrdRangeTo"},
		{columnname:"Charge Basis",dataname:"CHARGE_BASIS_DESC",datatype:"string",editControl:"DisplayOnly",storeId:"strGrdChargeBasis",width:150},
		{columnname:"Charge Basis",dataname:"CHARGE_BASIS",datatype:"string",editControl:"DisplayOnly",storeId:"strGrdChargeBasis",width:150,hidden:true},
		{columnname:"Rate",dataname:"RATE",datatype:"string",editControl:"textbox",storeId:"strGrdRate",width:80,weightPrecision:3,inputFormat:'numeric'}
		]
		var ChargeDescDtl=								
		{
			title:"",
			id:"ChargeDescDtl",
			detail:ChargeDescObj,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true,
			removePaging:true,
			readOnly:true,
			visibleRow:9,
			//AddDelete:true
			//tool:linkShipment,
			//columnWidth:.825
		}	
			 
		var  MilestoneDtlCtrl = plf.addGrid(ChargeDescDtl,this)	  
	    ChargeDescSection.add(MilestoneDtlCtrl);
        /*Shipment Detail Section end here */
       
	   
		
   //Main Page Section Starts

		mainpage.ptrMainSection.add(ManageRateHdrColumn)
		mainpage.ptrMainSection.add(ChargeMappingDetails)
        mainpage.ptrMainSection.add(fetchRateMappingButtonHdrColumn)		
		mainpage.ptrMainSection.add(RateMappingHdrColumn)		
		mainpage.ptrMainSection.add(ChargeDescSection)
   		//mainpage.dataHistorySectionFlag=true;
		
	//Main Page Section ends
			
	// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
          
		  {
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TARCoreTariffServiceTS",
				"methodName":"initManageRateMstTS"
			},
			{
				"controlid":"strLaneCode",
				"tasktype":"onchange",
				"input":["strLaneCode"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"onchangeMRLaneCodeTS"
			},
			{
					"grideventid":"PARCHARGE_ONENTER",
					"tasktype":"gridonenter",
					"input":["PAR_CHARGE_CODE"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"fetchParChargeCodeTS"
			},
			{
				"controlid":"Save",
				"tasktype":"btnclick",
				"input":["strLaneCode","chargeCodes"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"saveLaneChargeMapTS"
			},
			{
				"controlid":"strChargeCode",
				"tasktype":"onchange",
				"input":["strChargeCode","iUID","strLaneCode"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"onchangeMrChargeCodeTS"
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Submit",
				"input":["strChargeCode","strLaneCode","ChargeDescDtl"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"submitManageRateTs"				
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strChargeCode","strLaneCode"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"DeleteManageRateTs"				
			}/*,
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strServiceRequestNo","strShipmentRef","strLeg","ChargeDescDtl"],
				"service":"CoreSerReqTS",
				"methodName":"SaveShipStatusTS"				
			},
			{
				"controlid":"strLeg",
				"tasktype":"onchange",
				"input":["strLeg","strServiceRequestNo","strShipmentRef"],
				"service":"CoreSerReqTS",
				"methodName":"FetchLegNameTS"
			},
			
			/*
			{
				
					"tasktype":"proto",
					"filename":"FMS/ShipmentStatus.json"
			}
			*/
		];
		
// Event Handlers Mapping ends

// Help link section starts	
		mainpage.hlpLinks=
		{
		"charge":
				{
					"hlpType":"grid",
					"gridID":"chargeCodes",
					"hlpScreen":"tariff.ChargeHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							  {"parent":"PAR_CHARGE_CODE","child":"CHARGE_CODE"},
							  {"parent":"CHARGE_DESC","child":"CHARGE_DESC"},
							  {"parent":"PRICE_BASIS","child":"PRICE_BASIS"},
							  {"parent":"NATURE_CHARGE","child":"NAT_OF_CHG"},
							  {"parent":"CHARGE_TYPE","child":"CHARGE_TYPE"},
							  {"parent":"CHARGE_BASIS","child":"CHARGE_BASIS"}
							]
				}

		}
// Help link section ends
	
		mainpage.screenLinks=
		{
			/*"ship_level":
				{
					"dest":"ProofOfDelivery.ProofofDeliveryShipmentLevel",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}*/
		}
		mainpage.gridPopupLinks=
		{
			/*"db_shipitemdtl":
			{
				"dest":"FMS.itemDetails",
				"popMethodName":"",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
			}*/
		}
		this.callParent(arguments);
		
	}
});