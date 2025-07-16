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
Ext.define('CueTrans.view.tariff.ChargeMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Charge Master";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		
		mainpage.toolbarActions= [
			{
                "name": "Create",
                "tooltip": "Click here to create a charge."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a charge."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a charge."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate a charge."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate a charge."
            }
            ]


		plf.columns=4
		var chargeHdrColumn = plf.addColumnSection({});//69997
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var chargeHdrCtrl1=						//69997
			[	
			    plf.addHlpText({"label":"Charge Code",id:"strChargeCode","mandatory":"true",hlpLinkID:"chargehelp"},this),	
				plf.addText({"label":"Charge Description",id:"strChargeDesc","mandatory":"true"}),
				plf.addCombo({"label":"Price Basis",id:"strPriceBasis","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addCombo({"label":"Nature of Charge",id:"strNatOfCharge","mandatory":"true"}),
				plf.addCombo({"label":"Charge Type",id:"strChargeType","mandatory":"true"}),
				plf.addCombo({"label":"Range Based",id:"strRangeBased"}),
				plf.addCombo({"label":"Charge Basis",id:"strChargeBasis"}),
			]
		
		}
		
		else
		{
			chargeHdrCtrl1=
			[	
				plf.addHlpText({"label":"Charge Code",id:"strChargeCode","mandatory":"true",hlpLinkID:"chargehelp"},this),	
				plf.addText({"label":"Charge Description",id:"strChargeDesc","mandatory":"true"}),
				plf.addCombo({"label":"Price Basis",id:"strPriceBasis","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addCombo({"label":"Nature of Charge",id:"strNatOfCharge","mandatory":"true"}),
				plf.addCombo({"label":"Charge Type",id:"strChargeType","mandatory":"true"}),
				plf.addCombo({"label":"Range Based",id:"strRangeBased"}),
				plf.addCombo({"label":"Charge Basis",id:"strChargeBasis"}),
				
			]
		}	
		
		chargeHdrColumn.add(chargeHdrCtrl1)
		
		
		//Charge codes section starts
	
		plf.columns=4
		
		var chargeCodesCol = plf.addColumnSection({title:""});//69997
		
		var chargeCodesGridFieldObj=							//69997
		[   
			{columnname:"Charge Code",dataname:"PAR_CHARGE_CODE",datatype:"string",editControl:"textbox",width:140,helpid:'charge',"onenter":"PARCHARGE_ONENTER"},
			{columnname:"Charge Description",dataname:"CHARGE_DESC",datatype:"string",width:250,editControl:""},
           	{columnname:"Percentage",dataname:"PERCENTAGE",datatype:"string",width:90,editControl:"textbox"}
		]
		chargeCodesGridDtl=
		{
			title:"Charge Codes",
			id:"chargeCodes",
			detail:chargeCodesGridFieldObj,
		
		}
		var chargeCodesGridSection = plf.addGrid(chargeCodesGridDtl,this)  //69997
		
		//Exclusion Section starts
		plf.columns=4
		
		chargeRangeCol = plf.addColumnSection({title:""});
		
		var chargeRangeGridFieldObj=					//69997
		[   
			{columnname:"Range From",dataname:"RANGE_FROM",datatype:"string",editControl:"textbox",width:140},
			{columnname:"Range To",dataname:"RANGE_TO",datatype:"string",width:250,editControl:"textbox"},
           	{columnname:"Charge Basis",dataname:"RANGE_BASIS",storeId:"strRangeBasis",datatype:"string",width:200,editControl:"combo"}
		]
		chargeRangeGridDtl=
		{
			title:"Charge Range",
			id:"chargeRange",
			detail:chargeRangeGridFieldObj,
		
		}
		var chargeRangeGridSection = plf.addGrid(chargeRangeGridDtl,this)	//69997	
		
		
		mainpage.ptrMainSection.add(chargeHdrColumn) 
		mainpage.ptrMainSection.add(chargeCodesGridSection)
		mainpage.ptrMainSection.add(chargeRangeGridSection)
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strChargeCode","strChargeType"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"initChargeMasterTS"
		},
		{
				"controlid":"strChargeType",
				"tasktype":"onchange",
				"input":["strRangeBased","strChargeType","strChargeBasis"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"onchangeChargeTypeTS"
		},	
		{
				"controlid":"strRangeBased",
				"tasktype":"onchange",
				"input":["strRangeBased","strChargeBasis","strChargeType"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"onchangeRanBaseTS"
		},	
		{
				"controlid":"strChargeCode",
				"tasktype":"onenter",
				"input":["strChargeCode"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchChargeTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strChargeCode","strChargeDesc","strPriceBasis","strStatus","strNatOfCharge","strChargeType",
				        "strRangeBased","strChargeBasis","chargeCodes","chargeRange"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"createChargeTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strChargeCode","strChargeDesc","strPriceBasis","strStatus","strNatOfCharge","strChargeType",
				        "strRangeBased","strChargeBasis","chargeCodes","chargeRange"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"editChargeTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strChargeCode","strChargeDesc","strPriceBasis","strStatus","strNatOfCharge","strChargeType",
				        "strRangeBased","strChargeBasis","chargeCodes","chargeRange"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"deleteChargeTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Activate",
				"input":["strChargeCode","strChargeDesc","strPriceBasis","strStatus","strNatOfCharge","strChargeType",
				        "strRangeBased","strChargeBasis","chargeCodes","chargeRange"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"activateChargeTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Inactivate",
				"input":["strChargeCode","strChargeDesc","strPriceBasis","strStatus","strNatOfCharge","strChargeType",
				        "strRangeBased","strChargeBasis","chargeCodes","chargeRange"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"InactivateChargeTS"
		},
		{
				"grideventid":"PARCHARGE_ONENTER",
				"tasktype":"gridonenter",
				"input":["PAR_CHARGE_CODE"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchParChargeCodeTS"
		}
		];
		
		
			mainpage.hlpLinks=
		{
			"chargehelp":
				{
					"hlpType":"Header",
					"hlpScreen":"tariff.ChargeHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strChargeCode","child":"CHARGE_CODE"}
							]
				},
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
							  {"parent":"CHARGE_DESC","child":"CHARGE_DESC"}
							]
				}
		}
		
		
		this.callParent(arguments);
		
	}
});
