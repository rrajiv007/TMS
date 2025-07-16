Ext.define('CueTrans.view.test.testing', 
{
	extend:"Ext.panel.Panel",
	initComponent: function()
	{
		
		var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		
		//Screen Heading
		mainpage.screenName = "Test Page";
		
		//Toolbar Section
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Refresh","Create","Edit","Delete","Activate","Inactivate"]
		mainpage.keyFields=["strRouteId"]
		
		//Creating Route Header Section Starts
		//This section will have 5 columns
		plf.columns=4
		RouteHdrFieldset = plf.addFieldSet({title:"Route Info"});
		
		//Adding Header Controls.
		RouteFormCtrl=
		[
			plf.addText({"label":"Route Code",id:"strRouteId"}),
			plf.addCombo({"label":"Origin","id":"strOrigin"}),
			plf.addDisplayOnly({"label":"Total Distance","id":"iTotalDistance"}),
			plf.addDisplayOnly({"label":"Total Duration","id":"iTotalDuration"}),
			plf.addText({"label":"Route Description",id:"strRouteDesc"}),
			
			plf.addCombo({"label":"Destination","id":"strDestination"}),
			plf.addCombo({"label":"Distance UOM","id":"strDistanceUom"}),
			plf.addCombo({"label":"Duration UOM","id":"strDurationUom"}),
			plf.addCombo({"label":"Vehicle Type","id":"strVehicleType"}),
			//plf.addFieldSet({"label":"Length","controls":{plf.addPlainText{"id":"strLength"},plf.addPlainCombo{"id":"strLengthUOM"}}})
			
			plf.addFieldContainer({"label":"Length",
									"controls":[
										plf.addPlainText({"id":"strLenghth",width:90}),
										plf.addSplitter(),
										plf.addPlainCombo({"id":"strLengthUOM",width:50})
												]
									}),
			plf.addPlainText({"id":"strLenghth1"})
		]
		RouteHdrFieldset.add(RouteFormCtrl);
		//Creating Route Header Section Ends
		
		//Creating Route Grid Section Starts
		RouteGridFieldObj=
		[
			{columnname:"Sequence No",dataname:"ROUTE_DTL_SEQ_NO",datatype:"string",editControl:"textbox",width:500},
			{columnname:"Starting Location",dataname:"INTRANSIT_ORIGIN",datatype:"string",storeId:"strIntransitOrigin",editControl:"combo",				width:200},
			{columnname:"Transit Location",dataname:"INTRANSIT_DEST",datatype:"string",storeId:"strIntransitDestination",editControl:			 "combo",width:200},
			{columnname:"DISTANCE",dataname:"DISTANCE",datatype:"string",width:200},
			{columnname:"DURATION",dataname:"DURATION",datatype:"string",width:200}
		]
		
		RouteGridDtl=
		{
			title:"Route Transit Details",
			id:"routeDtlCache",
			detail:RouteGridFieldObj
		}
		tmpGridSection = plf.addGrid(RouteGridDtl)	
		//Creating Route Grid Section Ends
		
		//Adding Child sections to screens
		mainpage.ptrMainSection.add(RouteHdrFieldset) //Adding Header Section
		mainpage.ptrMainSection.add(tmpGridSection) //Adding Grid Section
		
		//Data History Section
		mainpage.data_his_sec_flag=true;
		
		//Mapping Event Handlers
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreRouteService",
				"methodName":"initRouteMasterScrTS"
			},		
			{
				"controlid":"strRouteId",
				"tasktype":"onenter",
				"input":["strRouteId"],
				"service":"CoreRouteService",
				"methodName":"fetchRouteTS"
			},						
			{
				"tasktype":"proto",
				"filename":"jm_master/routemaster.json"
			}
		];

		//Generating Screen
		mainpage.generateScreen();
		
		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});
		this.callParent(arguments);
		
	}
});
