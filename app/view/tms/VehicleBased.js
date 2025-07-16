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
Ext.define('CueTrans.view.tms.VehicleBased', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Transportation Request-Vehicle Based";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Refresh","Create","Edit","Delete","Authorize","Short Close"]
		
		//Add Keyfields
		mainpage.keyFields=["strTransportReqNo"]
		//Driver Master Section Begins
		plf.columns=4
		var VehicleBasedColumn1 = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var VehicleBasedCtrl1=
			[	
			    plf.addHlpText({"label":"Vehicle Request No",id:"strTransportReqNo","mandatory":"true",hlpLinkID:"transreqno"},this),	
				plf.addDate({"label":"Vehicle Request Date",id:"dtTransportReqDate"}),
				plf.addCombo({"label":"Request Type",id:"strRequestType"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addCombo({"label":"Origin",id:"strOrigin"}),
				plf.addCombo({"label":"Destination",id:"strDestination"}),
				plf.addCombo({"label":"Commodity",id:"strCommodity"}),
				plf.addText({"label":"DO No",id:"strDocNo"}),
			]
		
		}
		
		else
		{
			VehicleBasedCtrl1=
			[	
				plf.addHlpText({"label":"Vehicle Request No",id:"strTransportReqNo","mandatory":"true",hlpLinkID:"transreqno"},this),	
				plf.addDate({"label":"Vehicle Request Date",id:"dtTransportReqDate"}),
				plf.addCombo({"label":"Request Type",id:"strRequestType"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addCombo({"label":"Origin",id:"strOrigin"}),
				plf.addCombo({"label":"Destination",id:"strDestination"}),
				plf.addCombo({"label":"Commodity",id:"strCommodity"}),
				plf.addText({"label":"DO No",id:"strDocNo"}),
				
			]
		}	
		
		VehicleBasedColumn1.add(VehicleBasedCtrl1); 
		
		var VehicleBasedColumn2 = plf.addColumnSection({});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var VehicleBasedCtrl2=
			[	
			    plf.addHlpText({"label":"Customer Code",id:"strCustomerCode","mandatory":"true",hlpLinkID:"customercode"},this),	
				plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
				plf.addCombo({"label":"Contract Type",id:"strContractType"}),
				plf.addText({"label":"Contract No",id:"strContractNo"}),
				plf.addDate({"label":"Pickup Date Time From",id:"dtPickUpDateTimeFrom"}),
				plf.addDate({"label":"ROS Date Time From",id:"dtRosDateTimeFrom"}),
				plf.addBlank(),
		        plf.addBlank(),
				plf.addDate({"label":"Pickup Date Time To",id:"dtPickUpDateTimeTo"}),
				plf.addDate({"label":"ROS Date Time To",id:"dtRosDateTimeTo"}),
				plf.addBlank(),
		        plf.addBlank()
			]
		
		}
		
		else
		{
			VehicleBasedCtrl2=
			[	
				plf.addHlpText({"label":"Customer Code",id:"strCustomerCode","mandatory":"true",hlpLinkID:"customercode"},this),	
				plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
				plf.addCombo({"label":"Contract Type",id:"strContractType"}),
				plf.addText({"label":"Contract No",id:"strContractNo"}),
				plf.addDate({"label":"Pickup Date Time From",id:"dtPickUpDateTimeFrom"}),
				plf.addDate({"label":"ROS Date Time From",id:"dtRosDateTimeFrom"}),
				plf.addBlank(),
		        plf.addBlank(),
				plf.addDate({"label":"Pickup Date Time To",id:"dtPickUpDateTimeTo"}),
				plf.addDate({"label":"ROS Date Time To",id:"dtRosDateTimeTo"}),
				plf.addBlank(),
		        plf.addBlank()
				
			]
		}	
		
		VehicleBasedColumn2.add(VehicleBasedCtrl2);
		
		var VehicleDetailsGridFieldObj1=
		[   
			{columnname:"Vehicle Category",dataname:"",datatype:"string",storeId:"strTruckCategory",editControl:"combo",width:140},
			{columnname:"No Of Vehicles",dataname:"",datatype:"string",editControl:"textbox",width:250},
			{columnname:"Weight",dataname:"",datatype:"string",editControl:"textbox",width:200},
			{columnname:"Uom",dataname:"",datatype:"string",width:200,editControl:"textbox"},
		]
		VehicleDetailsGridDtl1=
		{
			title:"Vehicle Details",
			id:"VehicleDetailsPlanMapping1",
			detail:VehicleDetailsGridFieldObj1,
		
		}
		var VehicleDetailsGridSection1 = plf.addGrid(VehicleDetailsGridDtl1)
		
		
       var MaterialDetailsGridFieldObj2=
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
		MaterialDetailsGridDtl2=
		{
			title:"Material Details(Actual)",
			id:"MaterialDetailsPlanMapping2",
			detail:MaterialDetailsGridFieldObj2,
		
		}
		var MaterialDetailsGridSection2 = plf.addGrid(MaterialDetailsGridDtl2)	
		
		var VehicleDetailsGridFieldObj3=
		[   
			{columnname:"Reference Document Type",dataname:"",storeId:"strRefDocumentType",datatype:"string",width:200,editControl:"combo"},
			{columnname:"Reference Document No",dataname:"",datatype:"string",editControl:"textbox",width:250},
			{columnname:"Remarks",dataname:"",datatype:"string",editControl:"textbox",width:200}
		]
		VehicleDetailsGridDtl3=
		{
			title:"Reference Details",
			id:"MaterialDetailsPlanMapping3",
			detail:VehicleDetailsGridFieldObj3,
		
		}
		var VehicleDetailsGridSection3 = plf.addGrid(VehicleDetailsGridDtl3)	
		var passRefDocDtl =  plf.addCollapseSection({title:"Reference Details",collapsed:true})
		passRefDocDtl.add(VehicleDetailsGridSection3)
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(VehicleBasedColumn1) 
		mainpage.ptrMainSection.add(VehicleBasedColumn2)
		mainpage.ptrMainSection.add(VehicleDetailsGridSection1)	
       	mainpage.ptrMainSection.add(MaterialDetailsGridSection2)
        mainpage.ptrMainSection.add(passRefDocDtl)	
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initVehicleBasedTS"
				},
		
		];
		
		//Event Handlers Mapping Ends
		
		//Generate Screen Section
		/*mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":["strCategoryName"]
			},
			"locked":
			{
				"enableAll":false,
				"except":["strCategoryName"]
			},
			"active":
			{
				"enableAll":false,
				"except":["strCategoryName"]
			}		
}		*/	
		//mainpage.generateScreen();
		
		
		/*Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
			
	}
});
