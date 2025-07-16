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
Ext.define('CueTrans.view.tms.ItemBased', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Transportation Request-Item Based";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Refresh","Create","Edit","Delete","Authorize","Short Close"]
		
		//Add Keyfields
		mainpage.keyFields=["strTransporReqNo"]
		//Driver Master Section Begins
		plf.columns=4
		ItemBasedColumn1 = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			 var ItemBasedCtrl1=
			[	
			    plf.addHlpText({"label":"Transportation Request No",id:"strTransportReqNo","mandatory":"true",hlpLinkID:"transreqno"},this),	
				plf.addDate({"label":"Transportation Request Date",id:"dtTransportReqDate"}),
				plf.addCombo({"label":"Commodity",id:"strCommodity"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addCombo({"label":"Origin",id:"strOrigin"}),
				plf.addCombo({"label":"Destination",id:"strDestination"}),
				plf.addText({"label":"DO No",id:"strDocNo"}),
				plf.addDisplayOnly({"label":"Demand Status",id:"strDemandStatus"}),
			]
		
		}
		
		else
		{
			ItemBasedCtrl1=
			[	
				plf.addHlpText({"label":"Transportation Request No",id:"strTransportReqNo","mandatory":"true",hlpLinkID:"transreqno"},this),	
				plf.addDate({"label":"Transportation Request No",id:"dtTransportReqDate"}),
				plf.addCombo({"label":"Commodity",id:"strCommodity"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addCombo({"label":"Origin",id:"strOrigin"}),
				plf.addCombo({"label":"Destination",id:"strDestination"}),
				plf.addText({"label":"DO No",id:"strDocNo"}),
				plf.addDisplayOnly({"label":"Demand Status",id:"strDemandStatus"}),
				
			]
		}	
		
		 var ItemBasedColumn1.add(ItemBasedCtrl1); 
		
		var ItemBasedColumn2 = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			ItemBasedCtrl2=
			[	
			    plf.addHlpText({"label":"Customer Code",id:"strCustomerCode","mandatory":"true",hlpLinkID:"customercode"},this),	
				plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
				plf.addCombo({"label":"Contract Type",id:"strContractType"}),
				plf.addText({"label":"Contract No",id:"strContractNo"}),
				plf.addDate({"label":"Pickup Date Time",id:"dtPickUpDateTime"}),
				plf.addDate({"label":"ROS Date Time",id:"dtRosDateTime"}),
				plf.addCombo({"label":"Weight Uom",id:"iWeightUom"}),
				plf.addCombo({"label":"Volume Uom",id:"iVolumeUom"}),
			]
		
		}
		
		else
		{
		var	ItemBasedCtrl2=
			[	
				plf.addHlpText({"label":"Customer Code",id:"strCustomerCode","mandatory":"true",hlpLinkID:"customercode"},this),	
				plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
				plf.addCombo({"label":"Contract Type",id:"strContractType"}),
				plf.addText({"label":"Contract No",id:"strContractNo"}),
				plf.addDate({"label":"Pickup Date Time",id:"dtPickUpDateTime"}),
				plf.addDate({"label":"ROS Date Time",id:"dtRosDateTime"}),
				plf.addCombo({"label":"Weight Uom",id:"iWeightUom"}),
				plf.addCombo({"label":"Volume Uom",id:"iVolumeUom"}),
				
			]
		}	
		
		ItemBasedColumn2.add(ItemBasedCtrl2);
		//Plan Details Section Begins
			plf.columns=4
		
		materialDetailsPlan = plf.addFieldSet({title:""})
		//materialDetailsPlan = plf.addColumnSection({title:""});
		 var MaterialDetailsGridFieldObj1=
		[   
			{columnname:"Item Code",dataname:"",datatype:"string",editControl:"combo",width:140},
			{columnname:"Item Description",dataname:"",datatype:"string",editControl:"textbox",width:250},
			{columnname:"Quantity",dataname:"",datatype:"string",editControl:"textbox",width:200},
			{columnname:"Uom",dataname:"",datatype:"string",width:200,editControl:"textbox"},
			{columnname:"Package Type",dataname:"",storeId:"strTruckCategory",datatype:"string",width:200,editControl:"combo"},
			{columnname:"No Of Packets",dataname:"",datatype:"string",width:150,editControl:"textbox"},
			{columnname:"Total Weight",dataname:"",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Total Volume",dataname:"",datatype:"string",editControl:"textbox",width:150},
		]
		 var MaterialDetailsGridDtl1=
		{
			title:"Material Details(Plan)",
			id:"MaterialDetailsPlanMapping1",
			detail:MaterialDetailsGridFieldObj1,
		
		}
		//MaterialDetailsGridSection1 = plf.addGrid(MaterialDetailsGridDtl1)
		//Plan Details  Section Ends
		

		//Plan Details Section Begins
		plf.columns=4
		//mappedShipmentDetails = plf.addColumnSection({title:""});
		 var unmappedShipmentsFormCtrl=
		[
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addDisplayOnly({"label":"Total Weight",id:"iTotalWeightt"}),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addDisplayOnly({"label":"Total Volume",id:"iTotalWeightt"}),
			
		]
		//mappedShipmentDetails.add(unmappedShipmentsFormCtrl);
		//Plan Details  Section Ends
		
		
		
		
		 var UnmappedGridSection = plf.addGrid(MaterialDetailsGridDtl1,this)	
		materialDetailsPlan.add(UnmappedGridSection);
		materialDetailsPlan.add(unmappedShipmentsFormCtrl);	
		
		//Adding Grid to Plan Details Ends	
		
		
		
		
		
		
		
		
		
		
//Plan Details Section Begins
		plf.columns=4
		
		 var materialDetailsAct = plf.addFieldSet({title:""})
		//materialDetailsAct = plf.addColumnSection({title:""});
		 var MaterialDetailsGridFieldObj1=
		[   
			{columnname:"Item Code",dataname:"",datatype:"string",editControl:"combo",width:140},
			{columnname:"Item Description",dataname:"",datatype:"string",editControl:"textbox",width:250},
			{columnname:"Quantity",dataname:"",datatype:"string",editControl:"textbox",width:200},
			{columnname:"Uom",dataname:"",datatype:"string",width:200,editControl:"textbox"},
			{columnname:"Package Type",dataname:"",storeId:"strTruckCategory",datatype:"string",width:200,editControl:"combo"},
			{columnname:"No Of Packets",dataname:"",datatype:"string",width:150,editControl:"textbox"},
			{columnname:"Total Weight",dataname:"",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Total Volume",dataname:"",datatype:"string",editControl:"textbox",width:150},
		]
		MaterialDetailsGridDtl1=
		{
			title:"Material Details(Actual)",
			id:"MaterialDetailsPlanMapping1",
			detail:MaterialDetailsGridFieldObj1,
		
		}
		//MaterialDetailsGridSection1 = plf.addGrid(MaterialDetailsGridDtl1)
		//Plan Details  Section Ends
		

		//Plan Details Section Begins
		plf.columns=4
		//mappedShipmentDetails = plf.addColumnSection({title:""});
		unmappedShipmentsFormCtrl=
		[
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addDisplayOnly({"label":"Total Weight",id:"iTotalWeightt"}),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addDisplayOnly({"label":"Total Volume",id:"iTotalWeightt"}),
			
		]
		//mappedShipmentDetails.add(unmappedShipmentsFormCtrl);
		//Plan Details  Section Ends
		
		
		
		
		UnmappedGridSection = plf.addGrid(MaterialDetailsGridDtl1,this)	
		materialDetailsAct.add(UnmappedGridSection);
		materialDetailsAct.add(unmappedShipmentsFormCtrl);	
		
		//Adding Grid to Plan Details Ends	
		

		
		ItemBasedColumn3 = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			ItemBasedCtrl3=
			[	
			    plf.addHlpText({"label":"Cost Center Code",id:"strCostCenterCode","mandatory":"true",hlpLinkID:"customercode"},this),	
				plf.addDisplayOnly({"label":"Cost Center Name",id:"strCostCenterName"}),
				plf.addDisplayOnly({"label":"Cost Object Type",id:"strCostobjectType"}),
				plf.addDisplayOnly({"label":"Operation Account No",id:"strOperCodeNo"}),
			]
		
		}
		
		ItemBasedColumn3.add(ItemBasedCtrl3);
	
		//Add Child Sections
		
		mainpage.ptrMainSection.add(ItemBasedColumn1) 
		mainpage.ptrMainSection.add(ItemBasedColumn2)
		mainpage.ptrMainSection.add(materialDetailsPlan)
		mainpage.ptrMainSection.add(materialDetailsAct)		
		//mainpage.ptrMainSection.add(MaterialDetailsGridSection1)	
		//mainpage.ptrMainSection.add(weightColumn1)
       	//mainpage.ptrMainSection.add(MaterialDetailsGridSection2)
        //mainpage.ptrMainSection.add(weightColumn2)
        //mainpage.ptrMainSection.add(MaterialDetailsGridSection3)
        mainpage.ptrMainSection.add(ItemBasedColumn3)		
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			
		];
		//Event Handlers Mapping Ends
		/*mainpage.hlpLinks=
		{
		"driver":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strDriverCode","child":"DRIVER_CODE"}
							]
				},
				"3plowner":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"str3plOwnerCode","child":"OWNER_CODE_3PL"},
							{"parent":"str3plOwnerName","child":"OWNER_NAME_3PL"}
							]
				}
		}
		
				mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":[]
			},
			"locked":
			{
				"enableAll":false,
				"except":["strDriverCode"]
			},
			"active":
			{
				"enableAll":false,
				"except":["strDriverPhoneNo","strNationalityId","strIvmsKeyNo","strRemarks","driverMapping","licenceMapping"]
			}				
		}*/
		//Generate Screen Section
		/*mainpage.generateScreen();
		
		
		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
		
	}
});
