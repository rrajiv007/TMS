/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.3															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Manibharathi	04/02/2016      69952					Status Combo Alignment   
1.0.2		Manibharathi	04/02/2016      69951					Ref Doc No added 
1.0.3	    Manibharathi	05/02/2016      69997                   Addition of var     
************************************************************************************************/
Ext.define('CueTrans.view.tms.LoadUnloadingSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Loading & Unloading Summary";
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=
		[
			{"name":"Loading","linkid":"tms_loadingScr","tooltip":"Click here to do loading."},
			{"name":"Unloading","linkid":"tms_unloadingScr","tooltip":"Click here to do unloading."},
			{"name":"Load Closure","linkid":"tms_loadCloseScr","tooltip":"Click here to do load closure."}
			
		]		
		
		//Truck Master Section starts

		var formCtrl=[];
		plf.columns=4
		var loadListSummaryColumn = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);

		
		
		var loadListSummaryFormCtrl=
		[
			plf.addText({"label":"Load No",id:"strLoadNoFrom","anywhereSearch":"true"}),
			plf.addHlpText({"label":"Request No",id:"strRequestNo",hlpLinkID:"RequestNo"},this),
			//plf.addText({"label":"Request No","id":"strRequestNo"}),
			
			//plf.addText({"label":"Shipment No","id":"strShippmentNo"}),
			plf.addHlpText({"label":"Shipment No",id:"strShippmentNo",hlpLinkID:"shippmentNo"},this),
			plf.addCombo({"label":"Status","id":"strStatus"}),

			//plf.addText({"label":"Customer Code","id":"strCustomerCode"}),
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"CustomerCode"},this),
			//plf.addText({"label":"Carrier Code","id":"strCarrierCode"}),
			plf.addHlpText({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"CarrierCode"},this),
			//plf.addText({"label":"Item Code","id":"strItemCode"}),
			plf.addHlpText({"label":"Item Code",id:"strItemCode",hlpLinkID:"ItemCode"},this),
			
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addDate({"label":"Date From","id":"dtLoadDateFrom"}),
			plf.addDate({"label":"Date To","id":"dtLoadDateTo"}),
			plf.addCombo({"label":"Commodity","id":"strCommodity"}),
			
			plf.addCombo({"label":"Origin","id":"strOrigin"}),
			plf.addCombo({"label":"Destination","id":"strDestination"}),
			plf.addCombo({"label":"Vehicle Category","id":"strVehicleCategory"}),
			plf.addText({"label":"Vehicle Reg. No","id":"strRegNo"}),
			plf.addText({"label":"Ref Doc No",id:"strDocNo","anywhereSearch":"true"})
			//plf.addButton({"label":"Search","id":"btnSearch","tooltip":"true"})
		]
		
		loadListSummaryColumn.add(loadListSummaryFormCtrl);

            var loadListSummaryObj=
		[
			{columnname:"Click here to launch the Loading screen.",dataname:"LOAD_NO",width:70,linkId:"loadingScr",imageURL:"resources/images/grid/Journey/Grid_Replan.png"},
			{columnname:"Click here to launch the Unloading screen.",dataname:"LOAD_NO",width:70,linkId:"unloadingScr",imageURL:"resources/images/grid/Journey/Grid_Update.png"},
			{columnname:"Click here to launch the load closure screen.",dataname:"LOAD_NO",width:70,linkId:"loadCloseScr",imageURL:"resources/images/grid/Journey/Grid_Re_Create.png"},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:100,linkId:"loadnolink",tooltip:"Click here to launch the load screen."},

			//{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",linkId:"NEXT_LINKID","linkType":"DYN","tooltip":"Click here to launch the Loading / Unloading details.",width:"auto"},
			//{columnname:"Link ID",dataname:"NEXT_LINKID",width:100,hidden:true},
			//{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:100,linkId:"loadnolink","tooltip":"Click here to launch the load screen."},
			//{columnname:"Load Date",dataname:"LOAD_DATE",datatype:"string",width:100},
			{columnname:"Shipment Number",dataname:"SHIPMENT_LIST",datatype:"string",width:150},
            {columnname:"Request Number",dataname:"REQUEST_LIST",datatype:"string",width:150},
            {columnname:"Route",dataname:"ROUTE_CODE",datatype:"string",width:90,hidden:false},
			{columnname:"Origin",dataname:"FROM_LOCATION",datatype:"string",width:90},
			{columnname:"Destination",dataname:"TO_LOCATION",datatype:"string",width:90},			
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:90},
			{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:80},
            {columnname:"Vehicle<BR>Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:90},
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:90},
			{columnname:"Vehicle",dataname:"VEHICLE",datatype:"string",width:90},
            {columnname:"Item<BR>Weight(ton)",dataname:"WEIGHT",datatype:"string",width:100,colAlign:'center',weightPrecision:3,hidden:false},
            {columnname:"Item<BR>Volume (cu.m)",dataname:"VOLUME",datatype:"string",width:100,colAlign:'center',volumePrecision:3,hidden:false},
            {columnname:"Utilization %",dataname:"UTILIZATION",datatype:"string",width:80,hidden:false},
			{columnname:"Total<BR>Unloading Time",dataname:"TOTAL_UNLOADING_TIME",datatype:"string",width:95,hidden:false},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:150}
		]
		
		
		
		loadListSummaryGridDetail=
		{
			title:"",
			id:"LoadSummaryGrid",
			detail:loadListSummaryObj,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true
			
		}
		var loadListSummaryGridSection = plf.addGrid(loadListSummaryGridDetail,this)	
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(loadListSummaryColumn)
		mainpage.ptrMainSection.add(loadListSummaryGridSection) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		
			mainpage.eventHandlers = 
			[	
{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initLoadingUnloadingSearchTS"
			},			
			{					
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strRegNo","strLoadNoFrom","strStatus","dtLoadDateFrom","dtLoadDateTo","strOrigin","strDestination","strRequestNo","strShippmentNo","strJourneyPlanNo","strCommodity","strVehicleCategory","strDateType","strRegNo","strFromRegion","strToRegion","strUtilFrom","strUtilTo"
					,"strCarrierCode","strItemCode","strCustomerCode","strDocNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"fetchAllLoadUnloadSearchTS"
					}	
			];
			
			
			
			mainpage.hlpLinks=
		{
			"shippmentNo":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.ShipmentHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strShippmentNo","child":"SHIPMENT_NO"}
							]
				},
				
				"CustomerCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CustomerHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"CUST_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strCustomerCode","child":"CUST_CODE"}
							]
				},
				
				"CarrierCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCarrierCode","child":"OWNER_CODE_3PL"}
							]
				},
				
				"ItemCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.ItemHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"ITEMACT_AC","child":"strContext"} 
							
							
						   ],
					"receive":[
							{"parent":"strItemCode","child":"ITEM_CODE"}
							]
				},
				
				"RequestNo":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.TransRequestItemHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strRequestNo","child":"TRANS_REQ_NO"}
							]
				},
				
			}
			
			
			mainpage.screenLinks=
		{
				"loadnolink":
				{
					"dest":"tms.LoadBuilding",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"LOAD_NO","dest":"strLoadNo"}
							]
				},
				"loadingScr":
				{
					"dest":"tms.Loading",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"LOAD_NO","dest":"strLoadNo"}
							]
				},
				
				"unloadingScr":
				{
					"dest":"tms.Unloading",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"LOAD_NO","dest":"strLoadNo"}
							]
				},
				
				"tms_loadingScr":
				{
					"dest":"tms.Loading",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
				"tms_unloadingScr":
				{
					"dest":"tms.Unloading",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
				"tms_loadCloseScr":
				{
					"dest":"tms.LoadClosure",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				
				"loadCloseScr":
				{
					"dest":"tms.LoadClosure",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"LOAD_NO","dest":"strLoadNo"}
							]
				}
				
				
		}
		this.callParent(arguments);
		
	
	}
});
