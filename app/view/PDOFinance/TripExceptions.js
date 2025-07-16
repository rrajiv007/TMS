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
Ext.define('CueTrans.view.PDOFinance.TripExceptions', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Trip Exceptions";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		 mainpage.toolbarLinks=
		[
			//{"name":"View Carrier Bill","linkid":"fin_viewbill","tooltip":"Click here to view carrier bill."}
		]
		
		/*mainpage.toolbarActions= 
			[
			{
                "name": "Generate",
                "tooltip": "Click here to confirm the contract bill details."
            }
            ]*/
		

		plf.columns=4
		var BillHdrColumn = plf.addCollapseSection({title:"Search Criteria", collapsed:true,btnID:"searchBtn"},this);		
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			var BillHdrCtrl=		
			[	
			
				plf.addDate({"label":"Trip Closure From",id:"dtTripDateFrom"}),	
				plf.addDate({"label":"Trip Closure To",id:"dtTripDateTo"}),
				plf.addText({"label":"Contract No",id:"strContractNo"}),	
				plf.addText({"label":"Vehicle Regn No",id:"strVehCode"}),
				
				plf.addDisplayOnly({"label":"Carrier Code",id:"strCarCode"}),
				plf.addText({"label":"Load No",id:"strLoadNo"}),	
				plf.addText({"label":"Trip No",id:"strTripSheetNo"}),	
				
				
			]
		
		}
		
		else
		{
			var BillHdrCtrl=		
			[	
				plf.addDate({"label":"Trip Closure From",id:"dtTripDateFrom"}),	
				plf.addDate({"label":"Trip Closure To",id:"dtTripDateTo"}),
				plf.addText({"label":"Contract No",id:"strContractNo"}),	
				
				plf.addText({"label":"Vehicle Regn No",id:"strVehCode"}),
				plf.addText({"label":"Load No",id:"strLoadNo"}),	
				plf.addText({"label":"Trip No",id:"strTripSheetNo"}),	
				
				plf.addDisplayOnly({"label":"Carrier Code",id:"strCarCode"}),
				plf.addBlank(),
				plf.addBlank(),
				
				
			]
		}			
		BillHdrColumn.add(BillHdrCtrl)		
		
		
		plf.columns=4
		var BillDetailsColumn = plf.addColumnSection({"title":"Trip Details"});	
		var BillDetailsCtrl=										
		[	
			/*
			plf.addDisplayOnly({"labelWidth":100,"label":"Carrier Bill",id:"strBillNo"}),	
			plf.addText({"labelWidth":150,"label":"Carrier Bill Description",id:"strBillDesc","mandatory":"true"}),	
			plf.addDate({"labelWidth":150,"label":"Process Period From",id:"strPeriodFrom","mandatory":"true"}),	
			plf.addDate({"labelWidth":150,"label":"Process Period To",id:"strPeriodTo","mandatory":"true"}),	
			*/
		]
		
		BillDetailsColumn.add(BillDetailsCtrl);		
		
		var tripMapGridObj=			
		[   
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:150,linkId:"finTripView",gridpopup:true,"tooltip":"Click here to view trip details."},
			//{columnname:"Trip Sheet Date",dataname:"TRIP_DT",datatype:"string",width:100},
			{columnname:"Trip Closure Date",dataname:"CLOSE_DT",datatype:"string",width:100},
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:150},
			{columnname:"Contractor Name",dataname:"CONTRACT_NAME",datatype:"string",width:150},
			{columnname:"Vehicle Regn No",dataname:"VEH_CODE",datatype:"string",width:100},
			{columnname:"Carrier Code",dataname:"CAR_CODE",datatype:"string",width:80,hidden:true}
			
		]
		var tripdetGridDtl=			
		{
			title:"",
			id:"tripMapGrid",
			detail:tripMapGridObj,
			visibleRow:11,
			readOnly:true,
			removeAddDelete:true,
			removePaging:true,
			removeTbar:false,
			selRowProcess:"Y",
			widthBasis: "Flex",
			selectedRowCnt:true,
			//selectedRowCnt:true
			processdRowCnt:10,
			processdRowMsg:"Please select maximum of 10 rows."
		
		}
		var tripdetGridSection = plf.addGrid(tripdetGridDtl,this)
		//BillDetailsColumn.add(tripdetGridSection);
		
		
		/****************************************************/
		plf.columns=4
		var TripExceptionHdrCol = plf.addColumnSection({title:"Trip Details"});
		TripExceptionHdrCtrl=
		[	
			plf.addBlank({}),
			plf.addButton({"label":"Generate",id:"Generate",tooltip:"Click here to confirm the contract bill details."})
				
		]
		var tripDetailsSection = plf.addGrid(tripdetGridDtl,mainpage)
		TripExceptionHdrCol.add(tripDetailsSection)	
        TripExceptionHdrCol.add(TripExceptionHdrCtrl)	
		/****************************************************/
		/*Trip Exception Details*/
		var execptionDetailslevelTrip=
		[   			
			
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:120},
			{columnname:"Trip Sheet Date",dataname:"TRIP_SHEET_DATE",datatype:"string",width:100},
			{columnname:"Trip Closure Date",dataname:"TRIP_CLOSE_DATE",datatype:"string",width:120},			
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:90},
	        {columnname:"Contractor Name",dataname:"CONTRACTOR_NAME",datatype:"string",width:110},
			{columnname:"Vehicle Regn No",dataname:"VEHICLE_REGN_NO",datatype:"string",width:110},
			{columnname:"Journey Plan No",dataname:"JP_NO",datatype:"string",width:120},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:90},
			{columnname:"Load Type",dataname:"LOAD_TYPE",datatype:"string",width:100},
			{columnname:"Load Category",dataname:"LOAD_CAT",datatype:"string",width:120},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Finance Region From",dataname:"FIN_FROM",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DEST",datatype:"string",width:150},
			{columnname:"Finance Region To",dataname:"FIN_TO",datatype:"string",width:150},
			{columnname:"Load Weight",dataname:"LOAD_WT",datatype:"string",width:100},
			{columnname:"Load Distance",dataname:"LOAD_DIST",datatype:"string",width:100},
			{columnname:"Start Time",dataname:"START_TIME",datatype:"string",width:110},
			{columnname:"End Time",dataname:"END_TIME",datatype:"string",width:110},
			{columnname:"Journey Type",dataname:"JOURNEY_TYPE",datatype:"string",width:110},
			{columnname:"JP Exception",dataname:"JP_EXCEPTION",datatype:"string",width:300}
			
		]
		execptionTrip_dtl=
		{
			title:"Trip Exception Details",
			id:"tripsumGrid",
			detail:execptionDetailslevelTrip,
			visibleRow:11,
			removeAddDelete:true
	   }
	   var execptionTrip_section = plf.addGrid(execptionTrip_dtl,mainpage)
	   /*Trip Exception Details*/
		/****************************************************/

	   
		var baseTab = plf.addTabSection({ tabs:[
												TripExceptionHdrCol,execptionTrip_section
												]});
		
		mainpage.ptrMainSection.add(BillHdrColumn) 
		mainpage.ptrMainSection.add(baseTab) 
		//Main Page layout starts
		//mainpage.ptrMainSection.add(BillHdrColumn) 
		//mainpage.ptrMainSection.add(BillDetailsColumn) 
		//Main Page layout ends
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"initTripExceptionTS"
			},
			{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strContractNo","dtTripDateFrom","dtTripDateTo","strTripSheetNo","strLoadNo","strVehCode","strCarCode"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"fetchTrpExceDetailsTS"
			},
			{       
				"controlid":"Generate",
				"tasktype":"btnclick",
				"input":["tripMapGrid","strBillNo","strBillDesc","strPeriodFrom","strPeriodTo"],
		        "service":"FINCoreFinanceServiceTS",
				"methodName":"PDOTripExcepInvoiceTS"				
				},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Generate",
				"input":["tripMapGrid","strBillNo","strBillDesc","strPeriodFrom","strPeriodTo"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"PDOTripExcepInvoiceTS"
			}
			
		];
		
		mainpage.screenLinks=
		{
		
				"fin_viewbill":
				{
					"dest":"PDOFinance.PDOViewCarrierBill",
					"hdr":[
							{"src":"strBillNo","dest":"strBillNo"}						
						   ],
					"grid":[
							{"src":"","dest":""}	
						   ]
				}
				
		
		}
		
		mainpage.gridPopupLinks=
		{
			"finTripView":
			{
				"dest":"PDOFinance.PDOViewTripDetails",
				"popMethodName":"finTripDetalsPoupTS",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"TRIP_NO","dest":"strTripSheetNo"}
						]
			}
		}	
		/*
		mainpage.hlpLinks=
		{
			"fin_viewinvoice":
				{
					"dest":"finance.InvoiceDetails",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
			
		}
		*/
		
		this.callParent(arguments);
		
	}
});
