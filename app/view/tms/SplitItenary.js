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
Ext.define('CueTrans.view.tms.SplitItenary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Split Shipment Itinerary";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Save","Confirm"]
		
		
		plf.columns=4
		var splititenaryColumn1 = plf.addColumnSection({title:"Shipment Details"});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var splititenaryCtrl1=
			[	
			    plf.addDisplayOnly({"label":"Shipment No",id:"strShippmentNo"}),	
				plf.addDisplayOnly({"label":"Request No",id:"strRequestNo"}),
				plf.addDisplayOnly({"label":"Ref Doc No",id:"strDocNo","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
				plf.addDisplayOnly({"label":"Priority",id:"strPriority"}),
				plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"}),
				
				plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
				plf.addDisplayOnly({"label":"Created Type",id:"strCreatedType"}),
				plf.addDisplayOnly({"label":"Cost Center Name",id:"strCostCenterName"}),
				plf.addDisplayOnly({"label":"Operations A/c No",id:"strOperAccNo"}),
				
				plf.addDisplayOnly({"label":"Total Weight(tons)",id:"strWeight"}),
				plf.addDisplayOnly({"label":"Total Volume(cu.m)",id:"strVolume"})
				
			]
		
		}
		
		else
		{
			splititenaryCtrl1=
			[	
			    plf.addDisplayOnly({"label":"Shipment No",id:"strShippmentNo"}),	
				plf.addDisplayOnly({"label":"Request No",id:"strRequestNo"}),
				plf.addDisplayOnly({"label":"Ref Doc No",id:"strDocNo","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
				plf.addDisplayOnly({"label":"Priority",id:"strPriority"}),
				plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"}),
				
				plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
				plf.addDisplayOnly({"label":"Created Type",id:"strCreatedType"}),
				plf.addDisplayOnly({"label":"Cost Center Name",id:"strCostCenterName"}),
				plf.addDisplayOnly({"label":"Operations A/c No",id:"strOperAccNo"}),
				
				plf.addDisplayOnly({"label":"Total Weight(tons)",id:"strWeight"}),
				plf.addDisplayOnly({"label":"Total Volume(cu.m)",id:"strVolume"})
				
			]
		}	
		
		
              splititenaryColumn1 .add(splititenaryCtrl1); 
              

		var SplitIteDetGridFieldObj=
		[   
			{columnname:"Leg Sequence",dataname:"LEG_SEQUENCE",datatype:"string",editControl:"textbox",width:140},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",editControl:"combo",width:150,storeId:"strOrigin"},
                     {columnname:"Destination",dataname:"DESTINATION",datatype:"string",editControl:"combo",width:150,storeId:"strDestination"}


		]
		SplitItenaryGridDtl1=
		{	
			title:"",
			id:"splitItenary",
			detail:SplitIteDetGridFieldObj,
		
		}
		var SplitDetailsGridSection1 = plf.addGrid(SplitItenaryGridDtl1,this)

		
		mainpage.ptrMainSection.add(splititenaryColumn1 ) 
		mainpage.ptrMainSection.add(SplitDetailsGridSection1) 
		//mainpage.ptrMainSection.add(docUpload) 

             mainpage.eventHandlers = 
			[	
			{	                     
					"controlid":"",
					"tasktype":"onload",
					"input":["strShippmentNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"initSplitItenaryTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Save",
					"input":["strShippmentNo","splitItenary"],
					"service":"TMSCoreTransportTS",
					"methodName":"saveSplitItenaryTS"
			}
			];

	
	      this.callParent(arguments);
		
	}
});
