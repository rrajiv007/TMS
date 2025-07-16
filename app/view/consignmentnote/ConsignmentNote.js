Ext.define('CueTrans.view.consignmentnote.ConsignmentNote', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Consignment Note";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Refresh","Create","Edit","Delete","Freeze","UnFreeze"]
		
		//Add Keyfields
		//mainpage.keyFields=[""]
		
		
		plf.columns=3
		
		consignmentNoteColumn = plf.addColumnSection({});
		if(plf.defaultLayout==3)
		{
			plf.columns=3
			
			helpOnConsignmentNoteCtrl=
		[
			plf.addHlpText({"label":"Consignment Note No",id:"strConsNoteNo",hlpLinkID:"consignment"},this),
			plf.addDate({"label":"Consignment Note Date",id:"dtConsNoteDate","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			
			plf.addHlpText({"label":"Material Movement No",id:"strCustomerRequestNo",hlpLinkID:"materialmovement"},this),
			//plf.addText({"label":"Material Movement No",id:"strCustomerRequestNo","mandatory":"true"}),
			plf.addDate({"label":"Plan Date",id:"dtPlanDate"}),
			plf.addText({"label":"Plan Time",id:"iPlanTime"}),
			
			plf.addBlank(),
			plf.addButton({"label":"Fetch MMR Details","id":""}),
			plf.addBlank(),
			
			plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
			plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
			plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"}),
			
			plf.addDisplayOnly({"label":"Total Weight",id:"iTotalWeightt"}),
			plf.addDisplayOnly({"label":"Total Volume",id:"iTotalVolume"}),
			plf.addDisplayOnly({"label":"Service Type",id:"strServiceType"})
			
		]
		
		}
		
		else
		{
		
			helpOnConsignmentNoteCtrl=
		[
			plf.addHlpText({"label":"Consignment Note No",id:"strConsNoteNo",hlpLinkID:"consignment"},this),
			plf.addDate({"label":"Consignment Note Date",id:"dtConsNoteDate","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			
			plf.addHlpText({"label":"Material Movement No",id:"strCustomerRequestNo",hlpLinkID:"customerrequest"},this),
			//plf.addText({"label":"Material Movement No",id:"strCustomerRequestNo","mandatory":"true"}),
			plf.addDate({"label":"Plan Date",id:"dtPlanDate"}),
			plf.addText({"label":"Plan Time",id:"iPlanTime"}),
			
			plf.addBlank(),
			plf.addButton({"label":"Fetch MMR Details","id":"fetchMMRBtn"}),
			plf.addBlank(),
			
			plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
			plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
			plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"}),
			
			plf.addDisplayOnly({"label":"Total Weight",id:"iTotalWeightt"}),
			plf.addDisplayOnly({"label":"Total Volume",id:"iTotalVolume"}),
			plf.addDisplayOnly({"label":"Service Type",id:"strServiceType"})
					
		]
		
		}
		
		
		consignmentNoteObj=
		[
			
			{columnname:"Material Movement L.No",dataname:"LINE_NO",datatype:"string",width:200},
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",width:150},
			{columnname:"Item Description",dataname:"ITEM_DESCRIPTION",datatype:"string",width:150},
			{columnname:"Weight",dataname:"WEIGHT",datatype:"string",width:150},
			{columnname:"Volume",dataname:"VOLUME",datatype:"string",width:150},
			{columnname:"Total Packages",dataname:"NO_OF_PCKGS",datatype:"string",width:150},
			{columnname:"Remaining Packages",dataname:"REM_PACKAGES",datatype:"string",width:150},
			{columnname:"No Of Packages",dataname:"NO_OF_PCKGES",editControl:"textbox",datatype:"string",width:150},
			{columnname:"Material Mvmt No",dataname:"CUST_REQ_NO",datatype:"string",width:150}
		]
		consignmentGridDtl=
		{
			//title:"Item Details",
			id:"materialDetails",
			detail:consignmentNoteObj,
			visibleRow:5,
			removeAddDelete:true
			
		}
		helpOnConsignGridSection = plf.addGrid(consignmentGridDtl,this)	
			
	    consignmentNoteColumn.add(helpOnConsignmentNoteCtrl)
		mainpage.ptrMainSection.add(consignmentNoteColumn)
		mainpage.ptrMainSection.add(helpOnConsignGridSection)
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	       	{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strConsNoteNo","dtConsNoteDate","strCustomerRequestNo","dtPlanDate","iPlanTime","strOrigin","strDestination","strCommodity","strCommodity",
				"iTotalWeightt","iTotalVolume","strServiceType","materialDetails"],
				"service":"CoreConsignment",
				"methodName":"createConsignmentTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strConsNoteNo","dtConsNoteDate","strCustomerRequestNo","dtPlanDate","iPlanTime","strOrigin","strDestination","strCommodity","strCommodity",
				"iTotalWeightt","iTotalVolume","strServiceType","materialDetails"],
				"service":"CoreConsignment",
				"methodName":"editConsignmentTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strConsNoteNo","dtConsNoteDate","strCustomerRequestNo","dtPlanDate","iPlanTime","strOrigin","strDestination","strCommodity","strCommodity",
				"iTotalWeightt","iTotalVolume","strServiceType","materialDetails"],
				"service":"CoreConsignment",
				"methodName":"deleteConsignmentTS"
			},
           {
				"controlid":"strCustomerRequestNo",
				"tasktype":"onenter",
				"input":["strCustomerRequestNo","dtPlanDate","iPlanTime"],
				"service":"CoreConsignment",
				"methodName":"fetchMatMovDetailsTS"
			},
			{
				"controlid":"strConsNoteNo",
				"tasktype":"onenter",
				"input":["strConsNoteNo"],
				"service":"CoreConsignment",
				"methodName":"fetchConsignmentDetailsTS"
			},
			{       
				"controlid":"fetchMMRBtn",
				"tasktype":"btnclick",
				"input":["strCustomerRequestNo","dtPlanDate","iPlanTime"],
				"service":"CoreConsignment",
				"methodName":"fetchMMRDetailsTS"
			},
			//Freeze
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Freeze",
				"input":["strConsNoteNo","dtConsNoteDate","strCustomerRequestNo","dtPlanDate","iPlanTime","strOrigin","strDestination","strCommodity","strCommodity",
				"iTotalWeightt","iTotalVolume","strServiceType","materialDetails"],
				"service":"CoreConsignment",
				"methodName":"freezeConsignmentTS"
			},
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strConsNoteNo"],
				"service":"CoreConsignment",
				"methodName":"initConsignmentDetailsTS"
				},	
				//UnFreeze
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"UnFreeze",
				"input":["strConsNoteNo","dtConsNoteDate","strCustomerRequestNo","dtPlanDate","iPlanTime","strOrigin","strDestination","strCommodity","strCommodity",
				"iTotalWeightt","iTotalVolume","strServiceType","materialDetails"],
				"service":"CoreConsignment",
				"methodName":"unfreezeConsignmentTS"
			}	
		];
		
		
		
		mainpage.hlpLinks=
		{
			"consignment":
				{
					"hlpType":"Header",
					"hlpScreen":"consignmentnote.ConsignmentNoteHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strConsNoteNo","child":"CONS_NO"}
							]
				},
				"customerrequest":
				{
					"hlpType":"Header",
					"hlpScreen":"customerrequest.CustomerRequestHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCustomerRequestNo","child":"CUST_REQ_NO"}
							]
				}
					
		}		
		
		
		this.callParent(arguments);
		
	}
});
