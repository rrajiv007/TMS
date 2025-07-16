/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	            Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.ConstraintMapping', 
{
	extend:"CueTrans.lib.plfTransScreen",

	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Constraint Mapping ";

		//ConstraintList Search Header Section Begins
		plf.columns=3
		var constrainMapingHdr = plf.addColumnSection({});			//69995
		mainpage.toolbarSectionFlag=true;	
        mainpage.toolbarLinks=
		[
			{"name":"Create Constraint","linkid":"jm_Constraint","tooltip":"Click here to create a constraint."}
		]
		
		//Add Keyfields
		mainpage.keyFields=["strConstraintCode"]
		
		mainpage.toolbarActions= [
			{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Save",
                "tooltip": "Click here to save a constraint."
            }
            ]
		
		
		var constraintSearchCtrl=			//69995
		[
			
			plf.addDisplayOnly({"label":"Constraint Code",id:"strConstraintCode"}),
			plf.addDisplayOnly({"label":"Constraint Desc",id:"strConstraintDesc"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"})
		]
		constrainMapingHdr.add(constraintSearchCtrl);
		//ConstraintList Search Header Section Ends
		
		//Calendar Constraint Mapping Grid Section Begins
		var CalendarConstraintMappingObj=			//69995
		[
			{columnname:"Calendar Code",dataname:"CALENDAR_CODE",datatype:"string",width:200,editControl:"textbox",helpid:"calendarMaster","onenter":"CALENDAR_CODE_ONENTER"},
			{columnname:"Description",dataname:"CALENDAR_DESC",datatype:"string",width:200},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"string",width:150},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:150}
			
		]
		var 	constraintGridDtl=				//69995
		{
			title:"Calendar Constraint Mapping",
			id:"calenderContraint",
			detail:CalendarConstraintMappingObj,
			//removeFilter:false,
			//removeExport:false,
			visibleRow:5,
			//removeAddDelete:false
			//readonly:false
		}
		
		var constraintGridSection = plf.addGrid(constraintGridDtl,this)			//69995
		//Calendar Constraint Mapping Grid Section Ends
		
		//Route Constraint Mapping Grid Section Begins
		RouteConstraintMappingObj=
		[
			{columnname:"Route Code",dataname:"ROUTE_CODE",datatype:"string",width:100,editControl:"textbox",helpid:"routeMaster","onenter":"ROUTE_CODE_ONENTER"},
			{columnname:"Route Description",dataname:"ROUTE_DESC",datatype:"string",width:200},
			{columnname:"Sequence No",dataname:"SEQUENCE_NO",datatype:"string",width:150},
			{columnname:"Starting Location",dataname:"STARTING_LOCATION",datatype:"string",width:150},
			{columnname:"Transit Location",dataname:"TRANSIT_LOCATION",datatype:"string",width:150},
			{columnname:"Route Leg Category",dataname:"ROUTE_LEG",datatype:"string",width:150},
			{columnname:"Distance (km)",dataname:"DISTANCE",datatype:"string",width:100},
			{columnname:"Transit Time(hh:mm)",dataname:"TRANSIT_TIME",datatype:"string",width:150},
			
		]
		constraintGridDtl=
		{
			title:"Route Constraint Mapping",
			id:"routeConstraint",
			detail:RouteConstraintMappingObj,
			//removeFilter:true,
			//removeExport:true,
			visibleRow:5,
			//readonly:false
		}
		
		routeGridSection = plf.addGrid(constraintGridDtl,this)
		//Route Constraint Mapping Grid Section Ends
		
		mainpage.ptrMainSection.add(constrainMapingHdr)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(constraintGridSection) //Add Grid Section to Main Page
		mainpage.ptrMainSection.add(routeGridSection) //Add Grid Section to Main Page
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	
			/*
			{
				"controlid":"btnSearch",
				"tasktype":"Save",
				"input":["strConstraintCode","CALENDAR_CODE"],
				"service":"CoreConstraintService",
				"methodName":"fetchAllConstraintTS1"
			},
			*/
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strConstraintCode","strConstraintDesc","strStatus"],
				"service":"CoreConstraintService",
				"methodName":"initConstraintMappingTS"
			},
			
			{
				"grideventid":"CALENDAR_CODE_ONENTER",
				"tasktype":"gridonenter",
				"input":["CALENDAR_CODE"],
				"service":"CoreConstraintService",
				"methodName":"fetchCalendarConstraintTS"
			}/*,
			{
				"grideventid":"ROUTE_CODE_ONENTER",
				"tasktype":"gridonenter",
				"input":["ROUTE_CODE"],
				"service":"CoreConstraintService",
				"methodName":"fetchRouteCodeTS"
			}*/,
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Save",
					"input":["calenderContraint","strConstraintCode","CALENDAR_CODE","routeConstraint"],
					"service":"CoreConstraintService",
					"methodName":"saveConstraintTS" 
			},
			
			
			/*
			{
				"tasktype":"proto",
				"filename":"jm_master/ConstraintSearch.json"
			}
			*/
		];
		mainpage.screenLinks=
		{
			"calendarMaster":
				{
					"dest":"jm_master.CalendarMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"CONSTRAINT_CODE","dest":"strConstraintCode"}
							]
				},
				
				"routeMaster":
				{
					//"dest":"jm_master.RouteMaster",
					"dest":"jm_master.RouteHelp",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"CONSTRAINT_CODE","dest":"strConstraintCode"}
							]
				},
				
				"jm_Constraint":
				{
					"dest":"jm_master.ConstraintMaster",
					"hdr":[
							{"src":"strConstraintCode","dest":"strConstraintCode"},
							{"src":"strConstraintDesc","dest":"strConstraintDesc"},
							{"src":"strStatus","dest":"strStatus"}						
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
		
		
		mainpage.hlpLinks=
		{
			"calendarMaster":
				{
					"hlpType":"grid",
					"gridID":"calenderContraint",
					"hlpScreen":"jm_master.CalendarHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"CALENDAR_CODE","child":"CALENDAR_CODE"},
							{"parent":"CALENDAR_DESC","child":"CALENDAR_DESC"},
							{"parent":"EFFECTIVE_FROM","child":"EFFECTIVE_FROM"},
							{"parent":"EFFECTIVE_TO","child":"EFFECTIVE_TO"},
							{"parent":"STATUS","child":"STATUS"},
							]
				},
				"routeMaster":
				{
					"hlpType":"grid",
					"gridID":"routeConstraint",
					"hlpScreen":"jm_master.RouteTransitHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"ROUTE_CODE","child":"ROUTE_CODE"},
							{"parent":"ROUTE_DESC","child":"ROUTE_DESC"},
							{"parent":"SEQUENCE_NO","child":"ROUTE_DTL_SEQ_NO"},
							{"parent":"STARTING_LOCATION","child":"INTRANSIT_ORIGIN"},
							{"parent":"TRANSIT_LOCATION","child":"INTRANSIT_DEST"},
							{"parent":"ROUTE_LEG","child":"ROUTE_LEG"},
							{"parent":"DISTANCE","child":"DISTANCE"},
							{"parent":"TRANSIT_TIME","child":"TRANSIT_TIME"}
							
					]
				},
				
				
				
		}	
		
		//Event Handlers Mapping Ends
		/*	
		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});
		*/
		//Generate Screen Section
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
});
