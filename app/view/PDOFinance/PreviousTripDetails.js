/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.PDOFinance.PreviousTripDetails', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Previous Trip Details";
				
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		/*mainpage.toolbarLinks=
		[
			{"name":"Operational Reports","linkid":"operation_rpt"},
			{"name":"Statistical Reports","linkid":"rep_streports"}
		] */
		//helpOncustomerHdrCollapse = plf.addCollapseSection({title:"", collapsed: false});
		var PreTripColumn = plf.addColumnSection({});	
		
		var PreTripFormCtrl=
		[			
			plf.addHlpText({"label":"Carrier Bill ID",id:"strBillNo",hlpLinkID:"Bill_No","mandatory":"true"},this),
			//plf.addDisplayOnly({"label":"Carrier Bill ID",id:"strBillNo"}),	
			plf.addDisplayOnly({"label":"Carrier Bill Description",id:"strBillDesc"}),
			//plf.addDisplayOnly({"label":"Carrier Code",id:"strCarCode"}),
            plf.addDisplayOnly({"label":"Carrier Bill Period",id:"strBillPeriod"}),			
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addDisplayOnly({"label":"No of Contractor Bills",id:"iNoCons"}),	
			plf.addDisplayOnly({"label":"No of Trips",id:"iNoTrips"}),	
			plf.addDisplayOnly({"label":"No of Loads",id:"iNoLoads"}),
			plf.addDisplayOnly({"label":"Amount",id:"strAmount"})
			
			
		]
		
		PreTripColumn.add(PreTripFormCtrl);
		
		// button section
		plf.columns=1
		var PreTripButtonColumn = plf.addColumnSection({});	
		PreTripFormCtrl=
		[
		  plf.addButton({"label":"Show Details","id":"getTripDetails"})	   
		
		]	
		
		PreTripDetailsGrid=
		[   
		{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:130},
		{columnname:"Trip Closure Date",dataname:"TRIP_CLOSURE_DATE",datatype:"string",width:130},
		{columnname:"Scheduled Contract No",dataname:"SCH_CONTRACT_NO",datatype:"string",width:150},
		{columnname:"Scheduled Vehicle No",dataname:"SCH_VEHICLE_NO",datatype:"string",width:150},
		{columnname:"Previous Trip Number",dataname:"PREVIOUS_TRIP_NO",datatype:"string",width:150},
		{columnname:"Last Load of Previous Trip",dataname:"LAST_LOAD_PRE_TRIP",datatype:"string",width:170},
		{columnname:"Journey Plan No",dataname:"JOURNEY_PLAN_NO",datatype:"string",width:110},
		{columnname:"Load Origin",dataname:"LOAD_ORIGIN",datatype:"string",width:120},
		{columnname:"Origin Region",dataname:"ORIGIN_REGION",datatype:"string",width:100},
		{columnname:"Load Destination",dataname:"LOAD_DESTINATION",datatype:"string",width:150},
		{columnname:"Destination Region",dataname:"DESTINATION_REGION",datatype:"string",width:130},
		{columnname:"Release To",dataname:"RELEASE_TO",datatype:"string",width:150},
		{columnname:"Released By",dataname:"RELEASED_BY",datatype:"string",width:120},
		{columnname:"Truck Release Date/Time",dataname:"TRUCK_REL_DT_TM",datatype:"string",width:150},
		{columnname:"Last Update User",dataname:"LAST_UPDATE_USER",datatype:"string",width:120},
		{columnname:"Last Update Date",dataname:"LAST_UPDATE_DATE",datatype:"string",width:120}
			
		]
		VehicleReldetails=
		{
			title:"Trip Details",
			id:"PreTripDetails",
			detail:PreTripDetailsGrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		PreTripDetailsGridSection = plf.addGrid(VehicleReldetails,this)
		
		PreTripButtonColumn.add(PreTripFormCtrl)
		mainpage.ptrMainSection.add(PreTripColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(PreTripButtonColumn) //Add buttons to Main Page
		mainpage.ptrMainSection.add(PreTripDetailsGridSection)

		mainpage.eventHandlers = 
		[	
         
           { 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"InitPriviousTripDts"
			},
			{		 
				"controlid":"getTripDetails",
				"tasktype":"btnclick",
				"input":[
						"strBillNo"					
						],
				"service":"FINCoreFinanceServiceTS", 
				"methodName":"getPriviousTripDts"
				
							
			}
			
		];
		mainpage.screenLinks=	
				{
				} 
		mainpage.hlpLinks=
		{			
				"Bill_No":
				{
					"hlpType":"Header",
					"hlpScreen":"PDOFinance.PrivousTripHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strBillNo","child":"BILL_NO"},
							{"parent":"strBillDesc","child":"BILL_DESC"},
							{"parent":"strBillPeriod","child":"BILL_PERIOD"},
							{"parent":"strStatus","child":"STATUS"},
							{"parent":"iNoCons","child":"NO_CONBILL"},
							{"parent":"iNoTrips","child":"NO_TRIPS"},
							{"parent":"iNoLoads","child":"NO_LOADS"},
							{"parent":"strAmount","child":"AMOUNT"}
							]
				}
		}
		//Help link ends		
				
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
	

			
});
