Ext.define('CueTrans.view.tms.TransRequestItemSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Request Summary";
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Create Cargo Request","linkid":"tms_transitembased"},
			{"name":"Create Vehicle Based Request","linkid":"tms_transvehiclebased"},
			//{"name":"Transportation Request Item Confirmation","linkid":"tms_transitemconfirmation"},
			{"name":"Create Service Request","linkid":"veh_vehiclerequest"},
			{"name":"Request Upload via MS Excel","linkid":"tms_transcarreqexcupload"}
		]		
		
		//Truck Master Section starts

		var formCtrl=[];
		plf.columns=3
		customerContractSummaryColumn = plf.addCollapseSection({title:"Search Criteria",collapsed: true});
		
		
		customerContractSummaryFormCtrl=
		[
			
			plf.addText({"label":"Request No From",id:"strRequestNoFrom"}),
			plf.addText({"label":"Request No To",id:"strRequestNoTo"}),
			plf.addCombo({"label":"Request Type","id":"strRequestType"}),

			plf.addHlpText({"label":"Customer Code","id":"strCustomerCode",hlpLinkID:"customer"},this),
			plf.addDate({"label":"Request Date From","id":"dtRequestDateFrom"}),
			plf.addDate({"label":"Request Date To","id":"dtRequestDateTo"}),

			plf.addCombo({"label":"Status","id":"strStatus"}),
			plf.addCombo({"label":"Demand Status","id":"strDemandStatus"}),
			plf.addCombo({"label":"Priority","id":"strPriority"}),

			plf.addCombo({"label":"Origin","id":"strOrigin"}),
			plf.addCombo({"label":"Destination","id":"strDestination"}),
		       plf.addBlank(),			
           	       plf.addBlank(),
			plf.addButton({"label":"Search","id":"searchBtn"}),
		]
		
		customerContractSummaryColumn.add(customerContractSummaryFormCtrl);
		
		
		customerContractSummaryObj=
		[
		  
			{columnname:"Duplicate",dataname:"DUP_TRANS_REQ_NO",datatype:"string",width:130,linkId:"cargorequest",imageURL:"resources/images/gridbar/append.png"},						   
			{columnname:"Request No",dataname:"TRANS_REQ_NO",datatype:"string",width:130,linkId:"NEXT_LINKID","linkType":"DYN"},
			{columnname:"Request<br>Date",dataname:"TARNS_REQ_DATE",datatype:"string",width:70},
			{columnname:"Customer<br>Code",dataname:"CUST_CODE",datatype:"string",width:80},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:90},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:90},			
			{columnname:"Request Type",dataname:"REQUEST_TYPE",datatype:"string",width:100},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:90},
			{columnname:"Priority",dataname:"PRIORITY",datatype:"string",width:100},			
			{columnname:"Delivery<br>Date",dataname:"PICK_UP_DATE_TIME",datatype:"string",width:80},			
			{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:80},
			{columnname:"Weight (ton)",dataname:"TOT_WEIGHT",width:100,colAlign:true,weightPrecision:3},
			{columnname:"Volume (cu.m)",dataname:"TOT_VOLUME",width:100,colAlign:true,volumePrecision:3},
			{columnname:"Created Type",dataname:"CREATED_TYPE",datatype:"string",width:90},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:130},
			//{columnname:"Vehicle",dataname:"VehicleBased",width:70,linkId:"VehicleBased",hidden:true},
			//{columnname:"Item",dataname:"ItemBased",width:70,linkId:"ItemBased",hidden:true}
		]
		customerContractSummaryGridDetail=
		{
			title:"",
			id:"searchGrid",
			detail:customerContractSummaryObj,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true,
			readonly:true
			
		}
		customerContractSummaryGridSection = plf.addGrid(customerContractSummaryGridDetail,this)	
		
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(customerContractSummaryColumn)
		mainpage.ptrMainSection.add(customerContractSummaryGridSection) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		
			mainpage.eventHandlers = 
			[
			            
               {
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initTransItemSummaryTS"
		      },
			  {       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strRequestNoFrom","strRequestNoTo","dtRequestDateFrom","dtRequestDateTo","strDemandStatus","strStatus","strOrigin",
				"strDestination","strPriority","strCustomerCode","strRequestType"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchTransItemOnSearchTS"
			}
			             
			];
				
		mainpage.hlpLinks=
		{
			
				"customer":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CustomerHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCustomerCode","child":"CUST_CODE"}
														]
				}
			
				
		}		
		
		
		mainpage.screenLinks=
		{
				"tms_transitembased":
				{
					"dest":"tms.TransRequestItemBased",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"tms_transvehiclebased":
				{
					"dest":"tms.TransRequestVehicleBased",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
			"itemrequest":
				{
					"dest":"tms.TransRequestItemBased",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"TRANS_REQ_NO","dest":"strRequestNo"}
							]
				},
				
				"ItemBased":
				{
					"dest":"tms.TransRequestItemBased",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"TRANS_REQ_NO","dest":"strRequestNo"}
							]
				},
				"VehicleBased":
				{
					"dest":"tms.TransRequestVehicleBased",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"TRANS_REQ_NO","dest":"strRequestNo"}
							]
				},
				/*	
				"tms_transitemconfirmation":
				{
					"dest":"tms.TransRequestItemConfirmation",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				*/
				"tms_transcarreqexcupload":
				{
					"dest":"tms.ItemExcelUpload",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},	
				"veh_vehiclerequest":
				{
					"dest":"VehicleRequest.VehicleRequestMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"cargorequest":
				{
					"dest":"tms.TransRequestItemBased",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"TRANS_REQ_NO","dest":"strRequestNoHid"},
							{"src":"TRANS_REQ_NO","dest":"strRequestNo"}

							//{"src":"","dest":""}

							]
				}

				
		}	
		
		this.callParent(arguments);
		
	
	}
});
