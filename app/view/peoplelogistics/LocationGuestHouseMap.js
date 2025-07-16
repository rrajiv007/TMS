/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
		                                   
************************************************************************************************/
Ext.define('CueTrans.view.peoplelogistics.LocationGuestHouseMap', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Work Location Guest House Mapping";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Save",
                "tooltip": "Click here to save location guest house mapping."
            }
            ]	
		
		var LocationGuestHouseMapDtlObj=
		[   			
			{columnname:"Work Location",dataname:"WORK_LOCATION",datatype:"string",storeId:"strLocation",editControl:"combo",width:150},
			{columnname:"Guest House",dataname:"GUEST_HOUSE",datatype:"string",editControl:"textbox",width:150,helpid:'guesthouse'},
			{columnname:"Guest House Name",dataname:"GUEST_NAME",datatype:"string",width:150},
			{columnname:"Effective From Date",dataname:"EFFECTIVE_FROM",datatype:"string",width:150,editControl:"date"},
			{columnname:"Effective To Date",dataname:"EFFECTIVE_TO",datatype:"string",width:150,editControl:"date"}			
		]
		var LocGuestHouseMapDtl=
		{
			title:"",
			id:"guestHouseDtl",
			detail:LocationGuestHouseMapDtlObj,
			visibleRow:10			
		}
		var LocGuestHouseMapGridSection = plf.addGrid(LocGuestHouseMapDtl,this)			
		//History Data Section
		mainpage.dataHistorySectionFlag=true;	
		
		
		mainpage.ptrMainSection.add(LocGuestHouseMapGridSection)//Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[	
            {
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"PPLCoreMasterTS",
				"methodName":"initLocationGuestHouseMapTS"
			},
			 {       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["guestHouseDtl"],
				"service":"PPLCoreMasterTS",
				"methodName":"saveLocationGuestHouseMapTS"
			}
		];
		//Event Handlers Mapping Ends
	    mainpage.hlpLinks=
		{
			"guesthouse":
			    {
			    "hlpType":"grid",
				"gridID":"guestHouseDtl",
				"hlpScreen":"peoplelogistics.GuestHouseHelp",
				"send":[
						{"parent":"","child":""}
                            							
						],
			    "receive":[
							{"parent":"GUEST_HOUSE","child":"GUEST_CODE"},
                            {"parent":"GUEST_NAME","child":"GUEST_NAME"}	
						  ]
				
				}
				
		}
		
		this.callParent(arguments);
			
	}
});
