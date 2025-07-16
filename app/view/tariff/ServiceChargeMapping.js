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
Ext.define('CueTrans.view.tariff.ServiceChargeMapping', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Service Charge Mapping";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		 mainpage.toolbarLinks=
		[
			{"name":"Tariff Details","linkid":"fin_tariff","tooltip":"Click here to edit Tariff Details."}
		]
		
		
		mainpage.toolbarActions= [
			{
                "name": "Save",
                "tooltip": "Click here to Save a Tariff Details."
            },
            {
                "name": "Amend",
                "tooltip": "Click here to amend a Tariff."
            },			
            {
                "name": "Confirm",
                "tooltip": "Click here to confirm a Tariff."
            }
            ]


		plf.columns=4
		var TariffHdrColumn = plf.addColumnSection({});//69997
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var TariffHdrCtrl1=								//69997
			[	
			    plf.addDisplayOnly({"label":"Tariff Code",id:"strTariffCode","mandatory":"true",hlpLinkID:"Tariffhelp"},this),	
				plf.addDisplayOnly({"label":"Tariff Description",id:"strTariffDesc","mandatory":"true"}),
				plf.addCombo({"label":"Amendment No",id:"iAmendmentNo"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				
				
				plf.addDisplayOnly({"label":"Effective From",id:"dtEffectiveFrom","mandatory":"true"}),	
				plf.addDisplayOnly({"label":"Effective To",id:"dtEffectiveTo"}),
				plf.addDisplayOnly({"label":"Currency",id:"strCurrency"}),
				plf.addDisplayOnly({"label":"Exchange Rate",id:"iExchangeRate",inputFormat:"numeric",InputLength:6,weightPrecision:3}),
				
				plf.addDisplayOnly({"label":"Tariff Type",id:"strTariffType","mandatory":"true"}),
				plf.addBlank(),
				plf.addBlank(),
				plf.addBlank()
			]
		
		}
		
		else
		{
			TariffHdrCtrl1=
			[	
				plf.addDisplayOnly({"label":"Tariff Code",id:"strTariffCode","mandatory":"true",hlpLinkID:"Tariffhelp"},this),	
				plf.addDisplayOnly({"label":"Tariff Description",id:"strTariffDesc","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				
				plf.addCombo({"label":"Amendment No",id:"iAmendmentNo","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Effective From",id:"dtEffectiveFrom","mandatory":"true"}),	
				plf.addDisplayOnly({"label":"Effective To",id:"dtEffectiveTo"}),
				
				plf.addDisplayOnly({"label":"Currency",id:"strCurrency"}),
				plf.addDisplayOnly({"label":"Exchange Rate",id:"iExchangeRate",inputFormat:"numeric",InputLength:6,weightPrecision:3,"mandatory":"true"}),
				plf.addDisplayOnly({"label":"Tariff Type",id:"strTariffType","mandatory":"true"})
				
			]
		}	
		
		TariffHdrColumn.add(TariffHdrCtrl1)
		
		
		//Charges Section starts
		
		var chargemapCol = plf.addColumnSection({title:""});//69997
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			var chargeHdrCtrl1=								//69997
			[	
				plf.addCombo({"label":"Service Item Code",id:"strServiceItemSerChg"}),
				plf.addCombo({"label":"Lane Code",id:"strLaneCodeSerChg"}),
				plf.addCombo({"label":"Charge Code",id:"strChargeCodeSerChg"})				
			]
		}
		else
		{
			chargeHdrCtrl1=
			[	
				plf.addCombo({"label":"Service Item Code",id:"strServiceItemSerChg"}),
				plf.addCombo({"label":"Lane Code",id:"strLaneCodeSerChg"}),
				plf.addCombo({"label":"Charge Code",id:"strChargeCodeSerChg"}),
			]
		}	
		chargemapCol.add(chargeHdrCtrl1)
		
		var chargemapGridFieldObj=										//69997
		[   
			{columnname:"Service<BR>Item Code",dataname:"SERVICE_ITEM",datatype:"string",width:140},
			{columnname:"Service<BR>Item Description",dataname:"SERVICE_ITEM_DESC",datatype:"string",width:200},
           	{columnname:"Charge Code",dataname:"CHARGE_CODE",datatype:"string",width:90,hidden:true},
			{columnname:"Lane Code",dataname:"LANE_CODE",datatype:"string",width:90,hidden:true},
			{columnname:"Lane<BR>Description",dataname:"LANE_DESC",datatype:"string",width:200},
			{columnname:"Charge<BR>Description",dataname:"CHARGE_DESC",datatype:"string",width:200},
			{columnname:"Charge<BR>Basis",dataname:"CHARGE_BASIS",datatype:"string",width:90},
			//{columnname:"Rate",dataname:"RATE",datatype:"string",inputFormat:"numeric",width:100,editControl:"textbox",colAlign:'right',weightPrecision:2},
			{columnname:"Min<BR>Amount",dataname:"MIN_AMT",datatype:"string",inputFormat:"numeric",width:100,editControl:"textbox",colAlign:'right',weightPrecision:2},
			{columnname:"Max<BR>Amount",dataname:"MAX_AMT",datatype:"string",inputFormat:"numeric",width:100,editControl:"textbox",colAlign:'right',weightPrecision:2},
			{columnname:"Chg Line no",dataname:"CHG_LINE_NO",datatype:"string",width:80,hidden:true},
			//{columnname:"Range Line no",dataname:"RNG_LINE_NO",datatype:"string",width:80,hidden:true}
			
		]
		chargemapGridDtl=
		{
			title:"Amount Restrictions",
			id:"serchgMapGrid",
			detail:chargemapGridFieldObj,
			removeAddDelete:true		
		}
		var chargemapGridSection = plf.addColumnSection({title:"",hidden:true});//69997
		var chargemapGrid = plf.addGrid(chargemapGridDtl,this) //69997
		chargemapGridSection.add(chargemapGrid);
		//Charges Section ends
		
		// Service Charges Section Starts
		
		//serchargemapCol = plf.addColumnSection({title:"Charges"});
		/*
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			serchargeHdrCtrl1=
			[	
				plf.addCombo({"label":"Service Item Code",id:"strServiceItemSerChg"}),
				plf.addCombo({"label":"Lane Code",id:"strLaneCodeSerChg"}),
				plf.addCombo({"label":"Charge Code",id:"strChargeCodeSerChg"}),
				plf.addBlank({})
			]
		}
		else
		{
			serchargeHdrCtrl1=
			[	
				plf.addCombo({"label":"Service Item Code",id:"strServiceItemSerChg"}),
				plf.addCombo({"label":"Lane Code",id:"strLaneCodeSerChg"}),
				plf.addCombo({"label":"Charge Code",id:"strChargeCodeSerChg"})
				
				
			]
		}
*/		
		//serchargemapCol.add(serchargeHdrCtrl1)
		
		var serchargemapGridFieldObj=					//69997
		[   
			{columnname:"Service<BR>Item Code",dataname:"SERVICE_ITEM",datatype:"string",width:140},
			{columnname:"Service<BR>Item Description",dataname:"SERVICE_ITEM_DESC",datatype:"string",width:170},
           	{columnname:"Charge Code",dataname:"CHARGE_CODE",datatype:"string",width:90,hidden:true},
			{columnname:"Lane Code",dataname:"LANE_CODE",datatype:"string",width:90,hidden:true},
			{columnname:"Lane<BR>Description",dataname:"LANE_DESC",datatype:"string",width:200},
			{columnname:"Charge<BR>Description",dataname:"CHARGE_DESC",datatype:"string",width:170},
			{columnname:"Range<BR>From",dataname:"RANGE_FROM",datatype:"string",width:90,colAlign:'right'},
			{columnname:"Range<BR>To",dataname:"RANGE_TO",datatype:"string",width:90,colAlign:'right'},
			{columnname:"Charge<BR>Basis",dataname:"CHARGE_BASIS",datatype:"string",width:90},
			{columnname:"Rate",dataname:"RATE",datatype:"string",width:100,editControl:"textbox",inputFormat:"numeric",InputLength:6,colAlign:'right',weightPrecision:3},
			//{columnname:"Min<BR>Amount",dataname:"MIN_AMT",datatype:"string",inputFormat:"numeric",width:100,editControl:"textbox",colAlign:'right',weightPrecision:2},
			//{columnname:"Max<BR>Amount",dataname:"MAX_AMT",datatype:"string",inputFormat:"numeric",width:100,editControl:"textbox",colAlign:'right',weightPrecision:2},
			{columnname:"Chg Line no",dataname:"CHG_LINE_NO",datatype:"string",width:80,hidden:true},
			{columnname:"Range Line no",dataname:"RNG_LINE_NO",datatype:"string",width:80,hidden:true}
		]
		serchargemapGridDtl=
		{
			title:"Charges",
			id:"chgrngMapGrid",
			detail:serchargemapGridFieldObj,
			removeAddDelete:true
		
		}
		var serchargemapGridSection = plf.addGrid(serchargemapGridDtl,this)	//69997
		//serchargemapCol.add(serchargemapGridSection);
		
		// Service Charges Section Ends
		
		
		//Main Page layout starts
		mainpage.ptrMainSection.add(TariffHdrColumn) 
		mainpage.ptrMainSection.add(chargemapCol) 
		
		var baseTab = plf.addTabSection({ tabs:[serchargemapGridSection,chargemapGridSection]});
		mainpage.ptrMainSection.add(baseTab)
		
		//Main Page layout ends
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strTariffCode"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"initTariffSerChgTS"
			},
			/*
			{
					"controlid":"strServiceItemChg",
					"tasktype":"onchange",
					"input":["strServiceItemChg"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"fetchSerChgDetailsTS"
			},
			{
					"controlid":"strLaneCodeChg",
					"tasktype":"onchange",
					"input":["strLaneCodeChg","strServiceItemChg"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"fetchLnChgDetailsTS"
			},
			*/
			{
					"controlid":"strServiceItemSerChg",
					"tasktype":"onchange",
					"input":["strServiceItemSerChg","strTariffCode","strLaneCodeSerChg","strChargeCodeSerChg"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"fetchSerRngDetailsTS"
			},
			{
					"controlid":"strLaneCodeSerChg",
					"tasktype":"onchange",
					"input":["strTariffCode","strLaneCodeSerChg","strServiceItemSerChg","strChargeCodeSerChg"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"fetchLnRngDetailsTS"
			},
			{
					"controlid":"strChargeCodeSerChg",
					"tasktype":"onchange",
					"input":["strTariffCode","strChargeCodeSerChg","strLaneCodeSerChg","strServiceItemSerChg"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"fetchchgRngDetailsTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Save",
					"input":["strTariffCode","strChargeCodeSerChg","strLaneCodeSerChg","strServiceItemSerChg","serchgMapGrid",
							"chgrngMapGrid","strStatus","iAmendmentNo"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"saveTariffTS"
			},
			{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Confirm",
					"input":["strTariffCode","strChargeCodeSerChg","strLaneCodeSerChg","strServiceItemSerChg","serchgMapGrid",
							"chgrngMapGrid","strStatus","iAmendmentNo"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"confirmSerChgTariffTS"
			},
			{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Amend",
					"input":["strTariffCode","strChargeCodeSerChg","strLaneCodeSerChg","strServiceItemSerChg","serchgMapGrid",
							"chgrngMapGrid","strStatus","iAmendmentNo"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"amendSerChgTariffTS"
			},
			{
					"controlid":"iAmendmentNo",
					"tasktype":"onchange",
					"input":["strTariffCode","iAmendmentNo"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"amendSerChgDetailsTS"
			}
			
		
		];
		
		
		mainpage.hlpLinks=
		{
		/*
			"Tariffhelp":
				{
					"hlpType":"Header",
					"hlpScreen":"tariff.TariffHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTariffCode","child":"Tariff_CODE"}
							]
				}
		*/		
		}
		
		mainpage.screenLinks=
		{
			"fin_tariff":
				{
					"dest":"tariff.TariffMaster",
					"hdr":[
							{"src":"strTariffCode","dest":"strTariffCode"}							
							]					
				}
			
		}
		
		
		this.callParent(arguments);
		
	}
});
