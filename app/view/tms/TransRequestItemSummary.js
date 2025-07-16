Ext.define('CueTrans.view.tms.TransRequestItemSummary', 
/****************************************************************************************************************
                                          Modification History                                                                                                                                                                                
****************************************************************************************************************               
Description           :                                                                                                                      
Author                :  CUETRANS
Version               :  1.0.5

****************************************************************************************************************               
Version              Modified By      Date               Defect ID                 Remarks            
****************************************************************************************************************               
 1.0.1             P.shekar         4-02-2016             69946         Logistics Group , Division changes Text to Combo
                                                                        and Ref Doc No,Vendor Name Added
 1.0.2	          Manibharathi	    05/02/2016            69997         Addition of var
 1.0.3		      steffie           30/03/2016            71733 
 1.0.4		      steffie           01/04/2016  		  71736
 1.0.5		      steffie           01/04/2016  		  71735
 1.0.6            P.shekar          18/07/2016            73364         Loading Point, Unload Point  and Load description 
 1.0.7            Vidhya            20/07/2016            73460         Added Load no in search and Grid. 
 1.0.8            Vidhya            06/06/2017            79507         Added PO number and Vendor Name 
****************************************************************************************************************/
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
			//{"name":"New Cargo Request","linkid":"tms_cargoitembased","tooltip":"Click here to create a cargo request."},
			{"name":"Create Cargo Request","linkid":"tms_transitembased","tooltip":"Click here to create a cargo request."},
			//{"name":"Create Vehicle Based Request","linkid":"tms_transvehiclebased","tooltip":"Click here to create a vehicle request."},
			//{"name":"Transportation Request Item Confirmation","linkid":"tms_transitemconfirmation"},
			//{"name":"Create Service Request","linkid":"veh_vehiclerequest","tooltip":"Click here to create a service request."},
			{"name":"Request Upload via MS Excel","linkid":"tms_transcarreqexcupload","tooltip":"Click here for excel based request upload."}
		]		
		
		//Truck Master Section starts

		var formCtrl=[];
		plf.columns=4
		var customerContractSummaryColumn = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);
		
		
		var customerContractSummaryFormCtrl=
		[
			//plf.addCombo({"label":"Request Type","id":"strRequestType"}),/*71736 changes starts */
			plf.addText({"label":"Request No",id:"strRequestNoFrom"}),
			plf.addText({"label":"Ref Doc No",id:"strDocNo"}),    //  69944       added by shekar 
			plf.addText({"label":"Rig No",id:"strRigNo"}),  //71735 changes
			plf.addCombo({"label":"Status","id":"strStatus"}),
			
			plf.addCombo({"label":"Origin","id":"strOrigin"}),
			plf.addComboWithoutStore({"label":"Destination","id":"strDestination",storeId:"strOrigin"}),
			//plf.addCombo({"label":"Destination","id":"strDestination"}),
			plf.addCombo({"label":"Logistics Group",id:"strLogGroup"}),   //  69946      added by shekar 
			plf.addCombo({"label":"Division",id:"strDivCode"}),           //  69946      added by shekar 
			plf.addText({"label":"Customer","id":"strCustomerCode"}),//hlpLinkID:"customer"},this),
			plf.addText({"label":"Cost Center",id:"strCostCenter"}), 
			plf.addCombo({"label":"Priority","id":"strPriority"}),
			plf.addCombo({"label":"Created Type","id":"strCreateType"}),
			plf.addCombo({"label":"SAP Error","id":"strRequestNoTo"}),
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			
			plf.addDate({"label":"Date From","id":"dtRequestDateFrom"}),
			plf.addDate({"label":"Date To","id":"dtRequestDateTo"}),
			plf.addText({"label":"Vendor Name",id:"strVendorName"}), 
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),//  69946         added by shekar   /*71736 changes ends *	/*73460 Vidhya Added*/
			
			////***********79507 -Vidhya Added 6 Jun 2017*******************//
			plf.addText({"label":"PO No",id:"strPONum"}),
			plf.addCombo({"label":"Vendor Name","id":"strVendorName"}),
			plf.addText({"label":"Remarks",id:"strRemarks"}),
			plf.addCombo({"label":"Commodity","id":"strCommodity"}),
			plf.addText({"label":"Requestor ID",id:"strDriverCode"}),
			plf.addText({"label":"Requestor Name","id":"strDemandStatus"}),
			plf.addText({"label":"Well ID",id:"strWellID"}),
			plf.addText({"label":"Well Name",id:"strWellName"}),
			plf.addText({"label":"Rig ID",id:"strSapRigId"}),
			plf.addText({"label":"Call Out Number",id:"strCallout"})
			
			//plf.addText({"label":"Logistics Group",id:"strLogGroup","anywhereSearch":"true"}),
			
			//plf.addText({"label":"Division",id:"strDivCode","anywhereSearch":"true"}),
			
			
			          
			    
			
   	        //plf.addBlank(),
			//plf.addButton({"label":"Search","id":"searchBtn","tooltip":"Click here to search."}),
		]
		
		customerContractSummaryColumn.add(customerContractSummaryFormCtrl);
		var parentForm =this;
		var bulkConfirm=[
						plf.addButton({"label":"Bulk Confirm Request",id:"btnConfirmReq",tooltip:"Click here to confirm bulk cargo request.",
						"handler": function() 
							{
								parentForm.queryById("methodName").setValue("bulkCargoRequestConfirmTS");
								process_ebpack_service(parentForm,["searchGrid"],"TMSCoreTransportTS");																										
							}
						})
						];
		var customerContractSummaryObj=
		[
		  
			{columnname:"Click here to duplicate this request",dataname:"DUP_TRANS_REQ_NO",datatype:"string",width:130,linkId:"cargorequest",imageURL:"resources/images/gridbar/append.png"},   
			{columnname:"Request No",dataname:"TRANS_REQ_NO",datatype:"string",width:130,linkId:"NEXT_LINKID","linkType":"DYN","tooltip":"Click here to launch the request screen."},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:130},
			{columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:80},
			{columnname:"PO No",dataname:"PO_NO",datatype:"string",width:100},
			{columnname:"Rig No",dataname:"RIG_NO",datatype:"string",width:100},//71735 changes
			{columnname:"Customer",dataname:"CUST_CODE",datatype:"string",width:80},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:90},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:90},
			{columnname:"Requestor ID",dataname:"REQ_ID",datatype:"string",width:100},	
			{columnname:"Requestor Name",dataname:"REQ_NAME",datatype:"string",width:100},	
			{columnname:"Cost Center",dataname:"COST_CENTER_CODE",datatype:"string",width:80},
			{columnname:"Priority",dataname:"PRIORITY",datatype:"string",width:100},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:90},
			{columnname:"Pickup Date",dataname:"PICK_UP_DATE",datatype:"date",width:80},
			{columnname:"Delivery Date",dataname:"PICK_UP_DATE_TIME",datatype:"date",width:80},
			{columnname:"Delivered Date",dataname:"ACTUAL_DATE_TIME",datatype:"date",width:80}, //71733  changes
			{columnname:"Logistics Group",dataname:"LOGISTICS_GROUP",datatype:"string",width:80},
			{columnname:"Division",dataname:"DIVISION",datatype:"string",width:80},
			{columnname:"Item Weight(ton)",dataname:"TOT_WEIGHT",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Item Volume(cu.m)",dataname:"TOT_VOLUME",width:120,colAlign:'right',volumePrecision:3},
			{columnname:"Rig ID",dataname:"SAP_RIG_ID",datatype:"string",width:100},
			{columnname:"Well ID",dataname:"WELL_ID",datatype:"string",width:100},
			{columnname:"Well Name",dataname:"WELL_NAME",datatype:"string",width:100},
			{columnname:"Call Out Number",dataname:"CALL_OUT",datatype:"string",width:120},
			{columnname:"Created Type",dataname:"CREATED_TYPE",datatype:"string",width:90},
			{columnname:"Vendor Name",dataname:"VendorName",datatype:"string",width:130},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:130}, 	
			{columnname:"Loading Point",dataname:"LOAD_AT",datatype:"string",width:80},		// 73364            
			{columnname:"Unloading Point",dataname:"UNLOAD_AT",datatype:"string",width:60}, //73364 
			{columnname:"Load description",dataname:"LOAD_DESC",datatype:"string",width:80},
			//{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:100}, //73364 //73460-Vidhya added
			{columnname:"Load List",dataname:"LOAD_LIST",datatype:"string",width:100}
          		
			
			//{columnname:"Request<br>Date",dataname:"TARNS_REQ_DATE",datatype:"date",width:70},
			//{columnname:"Request Type",dataname:"REQUEST_TYPE",datatype:"string",width:100},			
			/*{columnname:"Expected Arrival<BR>Time",dataname:"EXP_ARRIVAL_TIME",datatype:"string",width:90},	*/
			//{columnname:"Vehicle",dataname:"VehicleBased",width:70,linkId:"VehicleBased",hidden:true},
			//{columnname:"Item",dataname:"ItemBased",width:70,linkId:"ItemBased",hidden:true}
		]
		customerContractSummaryGridDetail=
		{
			title:"",
			id:"searchGrid",
			detail:customerContractSummaryObj,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true,/*
			tool:bulkConfirm*/
			
		}
		var customerContractSummaryGridSection = plf.addGrid(customerContractSummaryGridDetail,this)	
		
		/*
		plf.columns=3
		
		var bulkConfirm = plf.addColumnSection({title:""});
		var bulkConfirmCtrl=
		[	
			plf.addBlank({}),
			plf.addButton({"label":"Confirm Request",id:"btnConfirmReq",tooltip:"Click here to confirm cargo request."})
				
		]
		bulkConfirm.add(bulkConfirmCtrl);
		*/
			
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(customerContractSummaryColumn)
		mainpage.ptrMainSection.add(customerContractSummaryGridSection) 
		//mainpage.ptrMainSection.add(bulkConfirm) 
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		
			mainpage.eventHandlers = 
			[
				/*
			    {       
				"controlid":"btnConfirmReq",
				"tasktype":"btnclick",
				"input":["searchGrid"],
              	"service":"TMSCoreTransportTS",
				"methodName":"bulkCargoRequestConfirmTS"				
				},      */  
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
				"input":["strDriverCode","strRequestNoFrom","dtRequestDateFrom","dtRequestDateTo","strDemandStatus","strStatus","strOrigin",
				"strDestination","strPriority","strRigNo","strCustomerCode","strDateType","strLogGroup","strDivCode","strRequestNoTo","strDocNo","strVendorName","strCostCenter","strCreateType","strLoadNoFrom","strPONum","strRemarks","strCommodity","strWellID","strWellName","strSapRigId","strCallout"], /*71736 changes */  //71735 changes
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
							{"parent":"","child":""},
							{"direct":"CUST_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strCustomerCode","child":"CUST_CODE"}
														]
				}
			
				
		}		
		
		
		mainpage.screenLinks=
		{
				"tms_cargoitembased":
				{
					"dest":"tms.TransCargoRequestItemBased",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
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
					"dest":"service.VehicleRequestMaster",
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
