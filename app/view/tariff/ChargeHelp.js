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
Ext.define('CueTrans.view.tariff.ChargeHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true
		mainpage.startPainting();
		
		mainpage.screenName = "Charge Help";
		
		plf.columns = 3
		var chargeHdrCollapse = plf.addColumnSection({title:" ", collapsed:true},this);	//69997
		
		var chargeFormCtrl=																//69997
		[
			plf.addText({"label":"Charge Code",id:"strChargeCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Charge Code To",id:"strChargeCodeTo"}),
			plf.addText({"label":"Charge Description",id:"strChargeDesc"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Price Basis",id:"strPriceBasis"}),
			plf.addCombo({"label":"Nature of Charge",id:"strNatOfCharge"}),
			plf.addCombo({"label":"Charge Type",id:"strChargeType"}),
			plf.addBlank(),
			plf.addButton({"label":"Search",id:"searchBtn"})
		]
		
		chargeHdrCollapse.add(chargeFormCtrl);
		
		var chargeGridFieldObj=														//69997
		[
			{columnname:"Charge Code",dataname:"CHARGE_CODE",datatype:"string",width:150},
			{columnname:"Charge Description",dataname:"CHARGE_DESC",datatype:"string",width:150},
			{columnname:"Price Basis",dataname:"PRICE_BASIS",datatype:"string",datatype:"string",width:100},
			{columnname:"Nature of Charge",dataname:"NAT_OF_CHG",datatype:"string",datatype:"string",width:100},
			{columnname:"Charge Type",dataname:"CHARGE_TYPE",datatype:"string",width:130},
			{columnname:"Charge Basis",dataname:"CHARGE_BASIS",datatype:"string",width:130},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:130}
		]
		chargeGridDtl=
		{
			title:"",
			id:"chargeGrid",
			detail:chargeGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
		}
		
		//charge Grid Section Ends
		
		//Add Child Sections
	
		mainpage.ptrMainSection.add(chargeHdrCollapse)//Add Header Section to Main Page
		var helpGridSection=plf.addGrid(chargeGridDtl,this)	//69997
		mainpage.hlpSearchGridPtr = helpGridSection
		mainpage.ptrMainSection.add(helpGridSection) 
		
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TARCoreTariffServiceTS",
				"methodName":"iniChargeSrchTS"
			},
			{
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strChargeCodeFrom","strChargeCodeTo","strChargeDesc","strStatus","strPriceBasis","strNatOfCharge","strChargeType"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchAllChargeTS"
			}
		];
	
		mainpage.screenLinks=
		{
			"chargeMaster":
				{
					"dest":"tariff.LaneMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"LANE_CODE","dest":"strLaneCode"}
							]
				}
		}
		
		this.callParent(arguments);
		
	}
});