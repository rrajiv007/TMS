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
Ext.define('CueTrans.view.PDOFinance.PDOProcessCarrierBill', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Process Carrier Bill";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		 mainpage.toolbarLinks=
		[
			//{"name":"View Carrier Bill","linkid":"fin_viewbill","tooltip":"Click here to view carrier bill."}
		]
		
		mainpage.toolbarActions= 
			[
			{
                "name": "Generate",
                "tooltip": "Click here to confirm the contract bill details."
            }
            ]
		

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
			plf.addDisplayOnly({"labelWidth":100,"label":"Carrier Bill",id:"strBillNo"}),	
			plf.addText({"labelWidth":150,"label":"Carrier Bill Description",id:"strBillDesc","mandatory":"true"}),	
			plf.addDate({"labelWidth":150,"label":"Process Period From",id:"strPeriodFrom","mandatory":"true"}),	
			plf.addDate({"labelWidth":150,"label":"Process Period To",id:"strPeriodTo","mandatory":"true"}),	
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
			selectedRowCnt:true
		
		}
		var tripdetGridSection = plf.addGrid(tripdetGridDtl,this)
		BillDetailsColumn.add(tripdetGridSection);
		
		
		//Main Page layout starts
		mainpage.ptrMainSection.add(BillHdrColumn) 
		mainpage.ptrMainSection.add(BillDetailsColumn) 
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
				"methodName":"PDOinitTripInvDetailsTS"
			},
			{       
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strContractNo","dtTripDateFrom","dtTripDateTo","strTripSheetNo","strLoadNo","strVehCode","strCarCode"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"PDOfetchTrpDetailsTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Generate",
				"input":["tripMapGrid","strBillNo","strBillDesc","strPeriodFrom","strPeriodTo"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"PDOprocessTrpInvoiceTS"
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
				"dest":"PDOFinance.PDOViewProcessBillTripPopup",// PDOViewTripDetails
				"popMethodName":"finProBillDtlPoupTS",
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
