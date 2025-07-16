Ext.define('CueTrans.view.VehicleRequest.VehicleRequestList', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = " Vehicle Request List";
		// Add Toolbar
		//mainpage.toolbarSectionFlag=false;
		
		//Add Keyfields
		//mainpage.keyFields=["locationCodeFrom"]
		
		//Location Search Section Begins
		plf.columns=3
		locationHdrCollapse = plf.addCollapseSection({title:"Search Criteria", collapsed: true});
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Create Vehicle Request","linkid":"vr_VehicleRequest"}
		]
		locationFormCtrl=
		[ 
		
			plf.addText({"label":"Vehicle Request No From",id:"strVehicleRequestNoFrom"}),
			plf.addText({"label":"Vehicle Request No To",id:"strVehicleRequestNoTo"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addDate({"label":"Vehicle Request Date From",id:"dtVehicleRequestDateFrom"}),
			plf.addDate({"label":"Vehicle Request Date To",id:"dtVehicleRequestDateTo"}),
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode",hlpLinkID:"CustomerCode"},this),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addButton({"label":"Search",id:"searchBtn"})
			
		]
		
		locationHdrCollapse.add(locationFormCtrl);
		//Location Header Section Ends
		
		//Location Grid Section Begins
		locationGridFieldObj=
		[
			{columnname:"Vehicle Request No",dataname:"VEHICLE_REQUEST_NO",datatype:"string",width:130,linkId:"vehicleRequestNo"},
			{columnname:"Vehicle Request Date",dataname:"VEHICLE_REQUEST_DATE",datatype:"string",width:150},
			{columnname:"Customer Code",dataname:"CUSTOMER_CODE",datatype:"string",width:120},
			{columnname:"Contract Type",dataname:"CONTRACT_TYPE",datatype:"string",width:120},
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:110},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:110},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:110},
			{columnname:"Reference Doc No",dataname:"REFERENCE_DOC_NO",datatype:"string",width:130},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
       ]
		locationGridDtl=
		{
			title:"",
			id:"locationDetail",
			
			readonly:true,
			detail:locationGridFieldObj,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true
		}
		locationGridSection = plf.addGrid(locationGridDtl,this)
		//Location Grid Section Ends
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(locationHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(locationGridSection) //Add Grid Section to Main Page
		
		//History Data Section
		//mainpage.data_his_sec_flag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreVehicleRequest",
				"methodName":"initVehicleRequestScrTS"
			},
			{
					"controlid":"searchBtn",
					"tasktype":"btnclick",
					"input":["strVehicleRequestNoFrom","strVehicleRequestNoTo","strStatus","dtVehicleRequestDateFrom","dtVehicleRequestDateTo","strRequestType","strCustomerCode","strContractNo","strContractType","strOrigin","strDestination","locationDetail"],
					"service":"CoreVehicleRequest",
					"methodName":"initVehicleRequestSearchScrTS"
					}		
			/*{
				"controlid":"strRouteId",
				"tasktype":"onenter",
				"input":["strRouteId"],
				"service":"CoreRouteService",
				"methodName":"fetchRouteTS"
			},	*/					
			/*{
				"tasktype":"proto",
				"filename":"jm_master/LocationList.json"
			}*/
		];
		mainpage.hlpLinks=
		{
			"CustomerCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CustomerHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCustomerCode","child":"CUST_CODE"}
							]
				},
				
							
				"contractno":
				{
					"hlpType":"Header",
					"hlpScreen":"contracts.CustomerContractHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strContractNo","child":"CUST_CONT_NO"}
							]
				}
				
			
		}
		mainpage.screenLinks=
		{
			"vr_VehicleRequest":
				{
					"dest":"VehicleRequest.VehicleRequestMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"vehicleRequestNo":
				{
					"dest":"VehicleRequest.VehicleRequestMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"VEHICLE_REQUEST_NO","dest":"strVehicleRequestNo"}
							]
				}
		}
		//Event Handlers Mapping Ends
		
		//Generate Screen Section
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
