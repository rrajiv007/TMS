Ext.define('CueTrans.view.tms.AmendVendorRequestSum', 
/****************************************************************************************************************
                                          Modification History                                                                                                                                                                                
****************************************************************************************************************               
Description           :                                                                                                                      
Author                :  CUETRANS
Version               :  1.0.5

****************************************************************************************************************               
Version              Modified By      Date               Defect ID                 Remarks            
****************************************************************************************************************               
  
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
			//{"name":"Create Cargo Request","linkid":"create_req_vendor","tooltip":"Click here to create a cargo request."},
			//{"name":"Request Upload via MS Excel","linkid":"tms_transcarreqexcupload","tooltip":"Click here for excel based request upload."}
		]		
		
		//Header Section starts

		var formCtrl=[];
		plf.columns=4
		var customerContractSummaryColumn = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);
		
		
		var customerContractSummaryFormCtrl=
		[
			plf.addText({"label":"Request No",id:"strRequestNoFrom"}),
			plf.addText({"label":"Ref Doc No",id:"strDocNo"}),    
			plf.addText({"label":"Rig No",id:"strRigNo"}),  
			plf.addCombo({"label":"Status","id":"strStatus"}),
			
			plf.addCombo({"label":"Origin","id":"strOrigin"}),
			plf.addComboWithoutStore({"label":"Destination",id:"strDestination",storeId:"strOrigin"}),
			//plf.addCombo({"label":"Destination","id":"strDestination"}),
			plf.addCombo({"label":"Logistics Group",id:"strLogGroup"}),   
			plf.addCombo({"label":"Division",id:"strDivCode"}),          
			plf.addText({"label":"Customer","id":"strCustomerCode"}),//hlpLinkID:"customer"},this),
			plf.addText({"label":"Cost Center",id:"strCostCenter"}), 
			plf.addCombo({"label":"Priority","id":"strPriority"}),
			plf.addCombo({"label":"Created Type","id":"strCreateType"}),
			plf.addCombo({"label":"SAP Error","id":"strRequestNoTo"}),
			plf.addCombo({"label":"Date Type","id":"strDateType"}),
			
			plf.addDate({"label":"Date From","id":"dtRequestDateFrom"}),
			plf.addDate({"label":"Date To","id":"dtRequestDateTo"}),
			//plf.addText({"label":"Vendor Name",id:"strVendorName"}), 
			plf.addText({"label":"Load No",id:"strLoadNoFrom"}),
			//plf.addHidden({"label":"Demand Status","id":"strDemandStatus"}),
			
			plf.addText({"label":"PO No",id:"strPONum"}),
			plf.addText({"label":"Remarks",id:"strRemarks"}),
			plf.addCombo({"label":"Commodity","id":"strCommodity"}),
			plf.addText({"label":"Scheduled Vehicle",id:"strRegNo"}),
			plf.addText({"label":"Reporting Vehicle",id:"strRepVehicle"}),
			plf.addText({"label":"Driver Code",id:"strDriverCode"}),
			plf.addText({"label":"Driver Name",id:"strDriverName"}),
			plf.addText({"label":"Driver Contact No",id:"strDriContactNo"}),
			plf.addText({"label":"Requestor ID",id:"strVendorName"}),
			plf.addText({"label":"Requestor Name","id":"strDemandStatus"})
			
		]
		
		customerContractSummaryColumn.add(customerContractSummaryFormCtrl);
		
		var customerContractSummaryObj=
		[
		  				
		    {columnname:"Click here to amend request header details.",dataname:"REQ_HDR_LINK",width:70,linkId:"ReqAmendHdrDtl",imageURL:"resources/images/grid/Journey/Grid_Re_Create.png"},
			{columnname:"Click here to amend request item details.",dataname:"ITEM_GRID_LINK",width:70,linkId:"ReqAmendItemDtl",imageURL:"resources/images/grid/Journey/Grid_Replan.png"},
			
            {columnname:"Print WayBill",dataname:"WAYBILL",datatype:"string",width:130,gridReport:"PrintWaybill",imageURL:"resources/images/shared/calendar.gif",tooltip:"Click here to print waybill."},
			
			{columnname:"Request No",dataname:"TRANS_REQ_NO",datatype:"string",width:130},
			{columnname:"Amend No",dataname:"AMEND_NO",datatype:"string",width:70,colAlign:'right'},
            {columnname:"Status",dataname:"STATUS",datatype:"string",width:110},
            {columnname:"Request Date",dataname:"TARNS_REQ_DATE",datatype:"date",width:100},
			{columnname:"PO No",dataname:"PO_NO",datatype:"string",width:100},
			{columnname:"Rig No",dataname:"RIG_NO",datatype:"string",width:100},
			{columnname:"Customer",dataname:"CUST_CODE",datatype:"string",width:80},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:90},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:90},
			{columnname:"Requestor ID",dataname:"REQ_ID",datatype:"string",width:100},	
			{columnname:"Requestor Name",dataname:"REQ_NAME",datatype:"string",width:100},
			{columnname:"Cost Center",dataname:"COST_CENTER_CODE",datatype:"string",width:80},
			{columnname:"Priority",dataname:"PRIORITY",datatype:"string",width:100},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:90},
			{columnname:"Pickup Date",dataname:"PICK_UP_DATE",datatype:"date",width:100},
			{columnname:"Delivery Date",dataname:"PICK_UP_DATE_TIME",datatype:"date",width:110},
			{columnname:"Delivered Date",dataname:"ACTUAL_DATE_TIME",datatype:"date",width:120}, 
			{columnname:"Logistics Group",dataname:"LOGISTICS_GROUP",datatype:"string",width:100},
			{columnname:"Division",dataname:"DIVISION",datatype:"string",width:80},
			{columnname:"Item Weight(ton)",dataname:"TOT_WEIGHT",width:100,colAlign:'right',weightPrecision:3},
			{columnname:"Item Volume(cu.m)",dataname:"TOT_VOLUME",width:120,colAlign:'right',volumePrecision:3},
			{columnname:"Created Type",dataname:"CREATED_TYPE",datatype:"string",width:90},
			{columnname:"Vendor Name",dataname:"VendorName",datatype:"string",width:130},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:130} ,
			{columnname:"Loading Point",dataname:"LOAD_AT",datatype:"string",width:120},		           
			{columnname:"Unloading Point",dataname:"UNLOAD_AT",datatype:"string",width:120}, 
			{columnname:"Load description",dataname:"LOAD_DESC",datatype:"string",width:130},
			{columnname:"Load List",dataname:"LOAD_LIST",datatype:"string",width:100},
			{columnname:"Load Status",dataname:"LOAD_STATUS",datatype:"string",width:130},
			{columnname:"Inspection Status",dataname:"INSPECTION_STATUS",datatype:"string",width:130},
			{columnname:"Journey Status",dataname:"JOURNEY_STATUS",datatype:"string",width:130},
			
			{columnname:"Scheduled Vehicle",dataname:"VEHICLE",datatype:"string",width:110},//Raj
		    {columnname:"Reporting Vehicle",dataname:"REPOVEHICLE",datatype:"string",width:110},//Raj
		    {columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:110},//Raj
		    {columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:110},//Raj
			{columnname:"Driver Contact No",dataname:"DRIVER_CONTACT_NO",datatype:"string",width:110},//Raj
			
			{columnname:"Load No",dataname:"strLoadNo",datatype:"string",width:130,hidden:true}
			
			
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
		var customerContractSummaryGridSection = plf.addGrid(customerContractSummaryGridDetail,this)	
		
	    
		//adding the User Master field control to the mainpage
		mainpage.ptrMainSection.add(customerContractSummaryColumn)
		mainpage.ptrMainSection.add(customerContractSummaryGridSection) 
		//mainpage.ptrMainSection.add(bulkConfirm) 
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		
			mainpage.eventHandlers = 
			[
				{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initvenReqAmendSummTS"//   initTransItemVENDSummaryTS
		      },
			  {       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strVendorName","strRequestNoFrom","dtRequestDateFrom","dtRequestDateTo","strDemandStatus","strStatus","strOrigin",
				"strDestination","strPriority","strRigNo","strCustomerCode","strDateType","strLogGroup","strDivCode","strRequestNoTo","strDocNo","strVendorName","strCostCenter","strCreateType","strLoadNoFrom","strPONum","strRemarks","strRegNo","strRepVehicle",
				"strDriverCode","strDriverName","strDriContactNo","strCommodity"], 
				"service":"TMSCoreTransportTS",
				"methodName":"fetchVendorTransItemTS"// fetchTransItemOnSearchTS
			},
			{
				"grideventid":"PrintWaybill",
				"tasktype":"gridonprint",
				"input":["strLoadNo"],
				"service":"CoreReportService",
				"methodName":"PrintwaybillloadingReport"
			}
			];
				
		mainpage.hlpLinks=
		{
			
				/*"customer":
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
				}*/
			
				
		}		
		mainpage.screenLinks=
		   {
			
			/*"tms_CreateLoadBuilding":
				{
					"dest":"tms.LoadBuilding",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}*/
			}
		// screenLinks gridPopupLinks
		mainpage.screenLinks=
		{
			/*"NEXT_LINKID":
			{
				"dest":"tms.AmendVendorTransRequest",
				"popMethodName":"initItemBasedTS",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"TRANS_REQ_NO","dest":"strRequestNo"}
						]
			},
			"ItemBased":
			{
				"dest":"tms.AmendVendorTransRequest",
				"popMethodName":"initItemBasedTS",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"TRANS_REQ_NO","dest":"strRequestNo"}
						]
			}*/
				
				"itemrequest":
				{
					"dest":"tms.AmendVendorTransRequest",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"TRANS_REQ_NO","dest":"strRequestNo"} 
							]
				},
				
				"ItemBased":
				{
					"dest":"tms.AmendVendorTransRequest",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"TRANS_REQ_NO","dest":"strRequestNo"}
							]
				},
				"venitemupdate":
				{
					"dest":"tms.AmendVenItemRequest",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"TRANS_REQ_NO","dest":"strRequestNo"}
							]
				},
				"ReqAmendHdrDtl":
				{
					"dest":"tms.AmendVendorTransRequest",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"TRANS_REQ_NO","dest":"strRequestNo"}
							]
				},
				"ReqAmendItemDtl":
				{
					"dest":"tms.AmendVenItemRequest",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"TRANS_REQ_NO","dest":"strRequestNo"}
							]
				}

				
		}	
		
		this.callParent(arguments);
		
	
	}
});
