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
Ext.define('CueTrans.view.tariff.LaneChargeMapping', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Lane-Charge Mapping";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		
		mainpage.toolbarActions= [
			{
                "name": "Save",
                "tooltip": "Click here to map a charge against a lane."
            }
            ]
			
		mainpage.toolbarLinks=
		[
			{"name":"Service Item Master.","linkid":"fin_lanemap","tooltip":"Click here to go back to the service item screen"}
		]	
        
		plf.columns = 4
		var LaneComboHdrColumn = plf.addColumnSection({}); //69997
		if(plf.defaultLayout==4)
		{
			plf.columns = 4
			
			var LaneComboHdrCtrl=							//69997
			[	
			    plf.addDisplayOnly({"label":"Service Item Code",id:"strServiceCode","mandatory":"true"}),	
				plf.addDisplayOnly({"label":"Service Item Description",id:"strServiceDesc"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addDisplayOnly({"label":"Service type",id:"strServiceType"}),
				
				plf.addCombo({"label":"Lane Code",id:"strLaneCode"}),
				plf.addBlank(),
				plf.addBlank()
				
	
			]
		}
		else
		{
		   LaneComboHdrCtrl=
			[	
			    plf.addDisplayOnly({"label":"Service Item Code",id:"strServiceCode","mandatory":"true"}),	
				plf.addDisplayOnly({"label":"Service Item Description",id:"strServiceDesc"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				
				plf.addDisplayOnly({"label":"Service type",id:"strServiceType"}),
				plf.addCombo({"label":"Lane Code",id:"strLaneCode"}),
				plf.addBlank()
				
	
			]
		  
		}
		LaneComboHdrColumn.add(LaneComboHdrCtrl)
		//Charge Mapping Section starts
		
		var chargemapGridFieldObj=									//69997
		[   
			{columnname:"Charge Code",dataname:"CHARGE_CODE",datatype:"string",editControl:"textbox",width:140,helpid:'charge',"onenter":"CHARGE_ONENTER"},
			{columnname:"Charge Description",dataname:"CHARGE_DESC",datatype:"string",width:250},
			{columnname:"Price Basis",dataname:"PRICE_BASIS",datatype:"string",width:250},
			{columnname:"Nature of Charge",dataname:"NAT_OF_CHG",datatype:"string",width:250},
			{columnname:"Charge Type",dataname:"CHARGE_TYPE",datatype:"string",width:100},
			{columnname:"Charge Basis",dataname:"CHARGE_BASIS",datatype:"string",width:100}
		]
		chargemapGridDtl=
		{
			title:"Charge Mapping",
			id:"chargeMapGrid",
			detail:chargemapGridFieldObj,
			visibleRow:5
		
		}
		chargemapGridSection = plf.addGrid(chargemapGridDtl,this)
		
	
		mainpage.ptrMainSection.add(LaneComboHdrColumn)
		mainpage.ptrMainSection.add(chargemapGridSection)
	
		mainpage.eventHandlers = 
		[
			
		{
				"controlid":"",
				"tasktype":"onload",
				"input":["strServiceCode","strLaneCode"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"initLaneChargeMap"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strServiceCode","strLaneCode","chargeMapGrid"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"saveLaneChargeTS"
		},
		{
				"controlid":"strLaneCode",
				"tasktype":"onchange",
				"input":["strLaneCode","strServiceCode"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"onchangeLaneCodeTS"
		},
		{
				"grideventid":"CHARGE_ONENTER",
				"tasktype":"gridonenter",
				"input":["CHARGE_CODE"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"onEnterChargeTS"
		}
		];
		
		mainpage.hlpLinks=
		{
		  "charge":
				{
					"hlpType":"grid",
					"gridID":"chargeMapGrid",
					"hlpScreen":"tariff.ChargeHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					{"parent":"CHARGE_CODE","child":"CHARGE_CODE"},
					{"parent":"CHARGE_DESC","child":"CHARGE_DESC"},
					{"parent":"PRICE_BASIS","child":"PRICE_BASIS"},
                    {"parent":"NAT_OF_CHG","child":"NAT_OF_CHG"},
					{"parent":"CHARGE_TYPE","child":"CHARGE_TYPE"},
					{"parent":"CHARGE_BASIS","child":"CHARGE_BASIS"}
    						]
				}
		}
	
		
	mainpage.screenLinks=
		{
			"fin_lanemap":
				{
					"dest":"tariff.ServiceMaster",
					"hdr":[
							{"src":"strServiceCode","dest":"strServiceCode"}							
							]					
				}
			
		}	
		this.callParent(arguments);
	}
});
