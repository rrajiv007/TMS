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
Ext.define('CueTrans.view.tariff.TariffMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Tariff Master";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		 mainpage.toolbarLinks=
		[
			{"name":"Define rate","linkid":"fin_serchargemap","tooltip":"Click here to define rate."}
		]
		
		mainpage.toolbarActions= [
			{
                "name": "Create",
                "tooltip": "Click here to create a Tariff."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a Tariff."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a Tariff."
            },
            {
                "name": "Amend",
                "tooltip": "Click here to amend a Tariff."
            },			
            {
                "name": "Confirm",
                "tooltip": "Click here to confirm a Tariff."
            }
			/*,
            {
                "name": "Shortclose",
                "tooltip": "Click here to short close a Tariff."
            }*/
            ]

	
		plf.columns=4
		var TariffHdrColumn = plf.addColumnSection({}); 	//69997
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var TariffHdrCtrl1=								//69997
			[	
			    plf.addHlpText({"label":"Tariff Code",id:"strTariffCode","mandatory":"true",hlpLinkID:"Tariffhelp"},this),	
				plf.addText({"label":"Tariff Description",id:"strTariffDesc","mandatory":"true"}),
				plf.addCombo({"label":"Amendment No",id:"iAmendmentNo"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				
				
				plf.addDate({"label":"Effective From",id:"dtEffectiveFrom","mandatory":"true"}),	
				plf.addDate({"label":"Effective To",id:"dtEffectiveTo","mandatory":"true"}),
				plf.addCombo({"label":"Currency",id:"strCurrency"}),
				plf.addText({"label":"Exchange Rate",id:"iExchangeRate",inputFormat:"numeric",InputLength:6,weightPrecision:3,"mandatory":"true"}),
				
				plf.addCombo({"label":"Tariff Type",id:"strTariffType","mandatory":"true"}),
				plf.addBlank(),
				plf.addBlank(),
				plf.addBlank()
			]
		
		}
		
		else
		{
			TariffHdrCtrl1=
			[	
				plf.addHlpText({"label":"Tariff Code",id:"strTariffCode","mandatory":"true",hlpLinkID:"Tariffhelp"},this),	
				plf.addText({"label":"Tariff Description",id:"strTariffDesc","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				
				plf.addCombo({"label":"Amendment No",id:"iAmendmentNo","mandatory":"true"}),
				plf.addDate({"label":"Effective From",id:"dtEffectiveFrom","mandatory":"true"}),	
				plf.addDate({"label":"Effective To",id:"dtEffectiveTo"}),
				
				plf.addCombo({"label":"Currency",id:"strCurrency"}),
				plf.addText({"label":"Exchange Rate",id:"iExchangeRate",inputFormat:"numeric",InputLength:6,weightPrecision:3,"mandatory":"true"}),
				plf.addCombo({"label":"Tariff Type",id:"strTariffType","mandatory":"true"})
				
			]
		}	
		
		TariffHdrColumn.add(TariffHdrCtrl1)
		
		
		//Service section starts
		
		var servicemapGridFieldObj=																//69997
		[   
			{columnname:"Service Item Code",dataname:"SERVICE_ITEM",datatype:"string",editControl:"textbox",width:140,
				helpid:"servicelink","onenter":"SERVICE_CODE_ONENTER"},
			{columnname:"Service Item Description",dataname:"SERVICE_ITEM_DESC",datatype:"string",width:250},
			{columnname:"Line_no",dataname:"LINE_NO",datatype:"string",width:80,hidden:true}
		]
		servicemapGridDtl=
		{
			title:"Service Items",
			id:"tarserMapGrid",
			detail:servicemapGridFieldObj,
			visibleRow:5
		
		}
		var servicemapGridSection = plf.addGrid(servicemapGridDtl,this)				//69997
		//Service section Ends
		
		//Main Page layout starts
		mainpage.ptrMainSection.add(TariffHdrColumn) 
		mainpage.ptrMainSection.add(servicemapGridSection) 
		
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
				"methodName":"initTariffTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strTariffCode","strTariffDesc","strStatus","iAmendmentNo","dtEffectiveFrom","dtEffectiveTo",
				"strCurrency","iExchangeRate","strTariffType","tarserMapGrid"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"createTariffTS"
			},			
			{
				"grideventid":"SERVICE_CODE_ONENTER",
				"tasktype":"gridonenter",
				"input":["SERVICE_ITEM"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchServiceCodeTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strTariffCode","strTariffDesc","strStatus","iAmendmentNo","dtEffectiveFrom","dtEffectiveTo",
				"strCurrency","iExchangeRate","strTariffType","tarserMapGrid"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"editTariffTS"
			},
			{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Delete",
					"input":["strTariffCode","strTariffDesc","strStatus","iAmendmentNo","dtEffectiveFrom","dtEffectiveTo",
							"strCurrency","iExchangeRate","strTariffType","tarserMapGrid"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"deleteTariffTS"
			},
			{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Shortclose",
					"input":["strTariffCode","strTariffDesc","strStatus","iAmendmentNo","dtEffectiveFrom","dtEffectiveTo",
							"strCurrency","iExchangeRate","strTariffType","tarserMapGrid"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"shortcloseTariffTS"
			},
			{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Confirm",
					"input":["strTariffCode","strTariffDesc","strStatus","iAmendmentNo","dtEffectiveFrom","dtEffectiveTo",
							"strCurrency","iExchangeRate","strTariffType","tarserMapGrid"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"confirmTariffTS"
			},
			{       
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Amend",
					"input":["strTariffCode","strTariffDesc","strStatus","iAmendmentNo","dtEffectiveFrom","dtEffectiveTo",
							"strCurrency","iExchangeRate","strTariffType","tarserMapGrid"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"amendTariffTS"
			},
			
			{
					"controlid":"strTariffCode",
					"tasktype":"onenter",
					"input":["strTariffCode"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"fetchTariffTS"
			},
			
			{
					"controlid":"iAmendmentNo",
					"tasktype":"onchange",
					"input":["strTariffCode"],
					"service":"TARCoreTariffServiceTS",
					"methodName":"amendDetailsTS"
			}
			
		];
		
		
		mainpage.hlpLinks=
		{
		
			"servicelink":
				{
					"hlpType":"grid",
					"gridID":"tarserMapGrid",
					"hlpScreen":"tariff.ServiceHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
								{"parent":"SERVICE_ITEM","child":"SERVICE_CODE"},
								{"parent":"SERVICE_ITEM_DESC","child":"SERVICE_DESC"}
							]
				},
			"Tariffhelp":{
					"hlpType":"Header",
					"hlpScreen":"tariff.TariffHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTariffCode","child":"TARIFF_CODE"}
							//{"parent":"strTariffDesc","child":"TARIFF_DESC"}
							]
				}	
		
		}
		
		mainpage.screenLinks=
		{
			"fin_serchargemap":
				{
					"dest":"tariff.ServiceChargeMapping",
					"hdr":[
							{"src":"strTariffCode","dest":"strTariffCode"}							
							]					
				}
			
		}
		
		
		this.callParent(arguments);
		
	}
});
