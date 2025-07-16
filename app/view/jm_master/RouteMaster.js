/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1														                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	                           Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.RouteMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Route Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create a route."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a route."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a route."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate a route."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate a route."
            }
            ]
		
		//Add Keyfields
		mainpage.keyFields=["strRouteId"]
		routeFileUploadSection=plf.addFileUploadColumnSection({});
		
		//Route Header Section starts

		var formCtrl=[];
		plf.columns=3
		var routeMstrColumn = plf.addColumnSection({columnWidth:.75});			//69995
		var RouteHdrFieldset1 = plf.addColumnSection({title:""});				//69995		
		
		
		var RouteFormCtrl=					//69995
		[
			plf.addHlpText({"label":"Route Code",id:"strRouteId",mandatory:"true",hlpLinkID:"routecode",inputFormat:"string",InputLength:"40"},this),	
			plf.addText({"label":"Route Description",id:"strRouteDesc",mandatory:"true",inputFormat:"string",InputLength:"100"}),	
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
		//	plf.addDisplayOnly({"label":"Total Distance",id:"iTotalDistance"}),	
		    
			plf.addCombo({"label":"Origin",id:"strOrigin","mandatory":"true","width":"200"}),	
			plf.addComboWithoutStore({"label":"Via",id:"strVia",storeId:"strOrigin","mandatory":"true"}),
			plf.addComboWithoutStore({"label":"Destination",id:"strDestination",storeId:"strOrigin","mandatory":"true"}),
			//plf.addCombo({"label":"Via",id:"strVia","mandatory":"true"}),							
			//plf.addCombo({"label":"Destination",id:"strDestination","mandatory":"true"}),
			plf.addText({"label":"JMC Code",id:"strJMCCode"})
		//	plf.addCombo({"label":"UOM",id:"strDistanceUom",mandatory:"true"})
		//	plf.addBlank(),
			//plf.addDisplayOnly({"label":"Total Transit Time",id:"strTotalTime"}),
			//plf.addDisplayOnly({"label":"Uom",id:"strUom"}),
		]
		
				
		
		
		RouteHdrFieldset1.add(RouteFormCtrl);
		//routeMstrColumn.add(RouteFormCtrl);
		
		routeUpload = plf.addColumnSection({columnWidth:.75});	
		plf.columns=4		
		var routeUploadCtrl=		//69995
		[		
			
			plf.addImageFileUpload({"label":"Route Map",id:"strMap",Entity:"RouteMap"})
		]
		
		routeFileUploadSection.add(routeMstrColumn)	
		routeFileUploadSection.add(routeUploadCtrl)
		/*
		
		
		plf.addFieldContainer({"label":"Length","id":"conTruckLength",
				"controls":[
					plf.addPlainText({id:"iTruckLength","width":"50","mandatory":"true"}),
					plf.addPlainCombo({id:"iTruckLengthUom","width":"70"})
				]	
			}),
			//plf.addText({"label":"Height",id:"iTruckHeight"}),
		//	plf.addCombo({"label":"Uom",id:"iTruckHeightUom"}),
		   plf.addFieldContainer({"label":"Width",
				"controls":[
					plf.addPlainText({id:"iTruckWidth","width":"50"}),
					plf.addPlainCombo({id:"iTruckWidthUom","width":"70"})
				]	
			}),
		*/
		
		
		
		timeFieldset = plf.addColumnSection({title:"",});

		var configFieldsetFormCtrl=					//69995
		[
		
		       plf.addFieldContainer({"label":"Total Distance / Uom","id":"",
				"controls":[
				//plf.addPlainText({id:"iTotalDistance","width":"40",inputFormat:"numeric"}),
				//plf.addDisplayOnly({id:"iTotalDistance","width":"5",inputFormat:"numeric"}),
				plf.addDisplayOnly({id:"iTotalDistance",inputFormat:"numeric"}),
				plf.addPlainCombo({id:"strDistanceUom","width":"60"})
				]
                	
			}),
				
				//plf.addFieldContainer({"label":"Total Time (hh:mm)","id":"", 
				plf.addFieldContainer({"label":"Total Time (hh:mm)","id":"", 
				"controls":[ 
				//plf.addDisplayOnly({id:"strTotalTime","width":"10",inputFormat:"string"})
				plf.addDisplayOnly({id:"strTotalTime",inputFormat:"string"})
				//plf.addPlainText({id:"strTotalTime","width":"40",inputFormat:"string"})
				//plf.addPlainText({id:"strUom","width":"40"})
				]
                	
			})
			
			
			
		]
		
		timeFieldset.add(configFieldsetFormCtrl);
		
		//timeFieldset1.add(configFieldsetForm1Ctrl);
		//Route Header Section Ends
		Ext.define('listcombo_model', 
		{
			extend: 'Ext.data.Model',
			fields: ["id","value","startTime","endTime","contDrivHrs","maxDrivHrs"]
		});

		var dvTpl = new Ext.XTemplate(
			'<tpl for=".">',
				'<div class="x-boundlist-item comboWrap">',
				'<b>{value}</b></br>',
				'Start Time: {startTime}</br>',
				'End Time: {endTime}</br>',
				'Cont.Driving(Hrs): {contDrivHrs}</br>',
				'Max.Driving(Hrs): {maxDrivHrs}',
				'</div>',
				'</tpl>'
		);

		//Route Grid Section Begins
		var RouteGridFieldObj=					//69995
		[    //iSeqNo
			{columnname:"Sequence No",dataname:"ROUTE_DTL_SEQ_NO",datatype:"string",editControl:"textbox",width:150,inputFormat:"integer",colAlign:"center"},
			//strIntransitOrigin
			{columnname:"Starting<BR>Location",dataname:"INTRANSIT_ORIGIN",datatype:"string",storeId:"strIntransitOrigin",editControl:"combo",width:170},
			//strIntransitDestination
			{columnname:"Transit<BR>Location",dataname:"INTRANSIT_DEST",datatype:"string",storeId:"strIntransitDestination",editControl:"combo",width:170},
			//strRouteLeg
			{columnname:"Route Leg<BR>Category",dataname:"ROUTE_LEG",datatype:"string",storeId:"strRouteLeg",editControl:"combo",width:150},
			//strConstraintCode
			{columnname:"Constraint",dataname:"CONSTRAINT_CODE",datatype:"string",editControl:"listcombo",width:180,storeId:"strConstraintCode",model:"listcombo_model",tbl:dvTpl},
			//iDistance
			{columnname:"Distance (km)",dataname:"DISTANCE",datatype:"string",editControl:"textbox",width:150,inputFormat:"numeric",InputPrecision:"2",colAlign:"right"},
			{columnname:"Transit<BR>Time (hh:mm)",dataname:"TRANSIT_TIME",datatype:"string",editControl:"textbox",width:150,colAlign:"right",inputFormat:"time"},
			
		]


		var RouteGridDtl=						//69995
		{
			title:"Route Transit Details",
			id:"routeDtlGrid",
			detail:RouteGridFieldObj,
			visibleRow:8
		}
		//Route Grid Section Ends
		//mainpage.ptrMainSection.add(routeFileUploadSection)
		//Add Child Sections
		var tmp_gridsection1 = plf.addGrid(RouteGridDtl,this)		//69995
		RouteHdrFieldset1.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(RouteHdrFieldset1)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(timeFieldset)
 	//Add Grid Section to Main Page
		mainpage.ptrMainSection.add(tmp_gridsection1) //Add Grid Section to Main Page
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
				mainpage.eventHandlers = 
			[
				{
					"controlid":"",
					"tasktype":"onload",
					"input":["strRouteId"],
					"service":"CoreRouteService",
					"methodName":"initRouteMasterScrTS"
				},		
				{
					"controlid":"strRouteId",
					"tasktype":"onenter",
					"input":["strRouteId","routeDtlGrid"],
					"service":"CoreRouteService",
					"methodName":"fetchRouteTS"
				},	
				{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"create",
				     "input":["strRouteId","strVia","strRouteDesc","strOrigin","strDestination","strDistanceUom","routeDtlGrid", "iTotalDistance","strConstraintCode","strMap","strJMCCode"],
					"service":"CoreRouteService",
					"methodName":"createRouteTS"
				},			
				{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"edit",
					"input":["strRouteId","strVia","strRouteDesc","strOrigin","strDestination","strDistanceUom","routeDtlGrid","iTotalDistance","strMap","strConstraintCode","strJMCCode"],
					"service":"CoreRouteService",
					"methodName":"modifyRouteTS"
				},	
				{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"delete",
					"input":["strRouteId","routeDtlGrid"],
					"service":"CoreRouteService",
					"methodName":"deleteRouteTS"
				},		
				{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"activate",
					"input":["strRouteId","strVia","strRouteDesc","strOrigin","strDestination","strDistanceUom","routeDtlGrid","iTotalDistance","strMap","strConstraintCode","strJMCCode"],
					"service":"CoreRouteService",
					"methodName":"activateRouteTS"
				},		
				{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"inactivate",
					"input":["strRouteId","strVia","strRouteDesc","strOrigin","strDestination","strDistanceUom","routeDtlGrid","iTotalDistance","strMap","strConstraintCode","strJMCCode"],
					"service":"CoreRouteService",
					"methodName":"inactivateRouteTS" 
				},
				{
					"tasktype":"proto",
					"filename":"jm_master/routemaster.json"
				}
						
				
			];
			
			mainpage.hlpLinks=
		{
			"routecode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.RouteHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRouteId","child":"ROUTE_CODE"}
							]
				}
				}
			
			//Event Handlers Mapping Ends
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
				"except":["strRouteId"]
			},
			"active":
			{
				"enableAll":false,
				"except":["routeDtlCache"]
			}			
		}
			
			//Generate Screen Section
	/*	mainpage.generateScreen();
		
		
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
