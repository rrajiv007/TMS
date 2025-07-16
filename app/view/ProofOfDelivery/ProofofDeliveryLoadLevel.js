/************************************************************************************************
Modification History        									                               	
************************************************************************************************
Description :Proof of Delivery – Joruney Plan Level
Author      : Divya                                                           		         
Version     : 1.0.0
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/

Ext.define('CueTrans.view.ProofOfDelivery.ProofofDeliveryLoadLevel',

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Proof of Delivery";
		mainpage.toolbarSectionFlag=true;
		//mainpage.liveScreenFlag=false;			
	    mainpage.toolbarLinks=
		[
			//{"name":"Shipment Level","linkid":"ship_level","tooltip":"Click here to capture POD for shipment level."}			
		]
		//Tool bar Section begins
		mainpage.toolbarActions= 
		[
		    {
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			
			{
                "name": "Save",
                "tooltip": "Click here to save."
            },
			{
                "name": "Print WayBill",
                "tooltip": "Click here to print the way bill."
            }
        ]
//Tool bar Section ends		
		
//  Header Section 	
		plf.columns=4
		var loadLevelHdrColumn = plf.addColumnSection({});			
		var loadLevelHdrCtrl=						
		[
			plf.addHlpText({"label":"Load No",id:"strLoadNo",hlpLinkID:"loadNo",mandatory:"true",width:200},this),
			plf.addDisplayOnly({"label":"Departure Date",id:"dtLoadDate",width:200}),
			plf.addDisplayOnly({"label":"Origin",id:"strOrigin",width:200}),
			plf.addDisplayOnly({"label":"Destination",id:"strDestination",width:200}),
			plf.addDisplayOnly({"label":"Loading Point",id:"strLoadPt",width:200}),  
			plf.addDisplayOnly({"label":"Unloading Point",id:"strDelvAt",width:200}),  
			plf.addDisplayOnly({"label":"Load Description",id:"strLoadDesc",width:200}),
			plf.addDisplayOnly({"label":"Journey Plan No",id:"strJourneyPlanNo",width:200}),
			plf.addDisplayOnly({"label":"Delivered Date",id:"dtLoadDt",width:200}),
			plf.addDisplayOnly({"label":"Actual Weight",id:"strWeight",width:200}),
		]
		loadLevelHdrColumn.add(loadLevelHdrCtrl);

		//var ScheVehDetails= plf.addColumnSection({title:"Scheduled Asset Details"});
		var ScheVehDetails= plf.addCollapseSection({title:"Scheduled Asset Details",collapsed: true});
		var ScheVehDetailsCtrl=
		[   
		  plf.addDisplayOnly({"label":"Vehicle No",id:"strSchVehicleNo",width:200}),
			plf.addDisplayOnly({"label":"Driver Name",id:"strSchDriverName",width:200}),
			plf.addDisplayOnly({"label":"Driver Contact",id:"strDriContactNo",width:200}),
			plf.addDisplayOnly({"label":"Trailer Code",id:"strSchTrailerCodeSC",width:200})
			 
			  
		]
		
		ScheVehDetails.add(ScheVehDetailsCtrl);
		
		 
		
		//var ReportVehDetails= plf.addColumnSection({title:"Reporting Asset Details"});
		var ReportVehDetails= plf.addCollapseSection({title:"Reporting Asset Details",collapsed: true});
		var ReportVehDetailsCtrl=
		[   
		    plf.addDisplayOnly({"label":"Vehicle No",id:"strRepTruckCode",width:200}),
			plf.addDisplayOnly({"label":"Driver Name",id:"strRepDriverCode",width:200}),
			plf.addDisplayOnly({"label":"Driver Contact",id:"strRepMobileNo",width:200}),
			plf.addDisplayOnly({"label":"Trailer Code",id:"strRTri",width:200})
		]
		
		ReportVehDetails.add(ReportVehDetailsCtrl);
		
		
		
		// Detail Section	

		var loadSum = plf.addColumnSection({columnWidth:.10,title:""});
		var loadObj=							
		[
		    {columnname:"Ref Doc No",dataname:"REF_DOC",datatype:"string",editControl:"DisplayOnly",width:120},
			{columnname:"PO No",dataname:"PO_NO",datatype:"string",editControl:"DisplayOnly",width:120},
			{columnname:"PO Line Item",dataname:"PO_LINE_ITEM",width:90,colAlign:'right',editControl:"DisplayOnly"},
			{columnname:"Item Code",dataname:"ITEM_CODE",datatype:"string",width:150,editControl:"DisplayOnly"},
			{columnname:"Item Description",dataname:"ITEM_DESC",datatype:"string",width:150,editControl:"DisplayOnly"},
			{columnname:"Qty",dataname:"QTY",datatype:"string",width:50,editControl:"DisplayOnly",colAlign:'right'},
			{columnname:"Weight(ton)",dataname:"WEIGHT",datatype:"string",width:100,editControl:"DisplayOnly",colAlign:'right'},
			{columnname:"Vendor Name",dataname:"VENDOR_NAME",datatype:"string",editControl:"DisplayOnly",width:120},
			{columnname:"Vendor's Ref No",dataname:"VENDOR_REF_NO",datatype:"string",editControl:"DisplayOnly",width:120},
			{columnname:"Remarks",dataname:"ITEM_REMARKS",width:200,editControl:"DisplayOnly"},
			{columnname:"Shipment No",dataname:"SHIP_NO",datatype:"string",editControl:"DisplayOnly",width:120},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",editControl:"DisplayOnly",width:200},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",editControl:"DisplayOnly",width:200}/*,
			
			{columnname:"Shipment No",dataname:"SHIP_NO",datatype:"string",width:150,linkId:"db_shipitemdtl",gridpopup:true,tooltip:"Click here to view shipment item details."},
			
			
			{columnname:"Priority",dataname:"PRIORITY",datatype:"string",editControl:"DisplayOnly",width:80},
			
			{columnname:"Actual Weight(ton)",dataname:"ACT_WEIGHT",datatype:"string",editControl:"DisplayOnly",width:120,colAlign:'right'},
								
			
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:85,editControl:"DisplayOnly"},
			
			
			{columnname:"Volume (cu.m)",dataname:"VOLUME",datatype:"string",width:150,editControl:"DisplayOnly"},
			
			
			
			
			{columnname:"Pickup Date/Time",dataname:"PICK_DATE_TM",datatype:"string",editControl:"DisplayOnly",width:130},
			{columnname:"Contractual Delivery Date/Time",dataname:"CON_DEL_DATE",datatype:"string",editControl:"DisplayOnly",width:150},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"DisplayOnly",width:200},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",editControl:"DisplayOnly",width:200},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",editControl:"DisplayOnly",width:200},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",editControl:"DisplayOnly",width:200},
			{columnname:"Quantity",dataname:"QTY",datatype:"string",editControl:"DisplayOnly",width:200},
			{columnname:"Weight (ton)",dataname:"WEIGHT",datatype:"string",editControl:"DisplayOnly",width:200},
			{columnname:"Delivered  Date/Time",dataname:"DEL_DATE_TIME",datatype:"string",editControl:"DisplayOnly",width:200}*/
		]
		var loadDtl=								
		{
			title:"Shipment Details",
			id:"loadLevel",
			detail:loadObj,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true,
			visibleRow:6
			//columnWidth:.825
		}	
			 
		var  loadDtlCtrl = plf.addGrid(loadDtl,this)	  
	    loadSum.add(loadDtlCtrl);


//  Header Section 	
		plf.columns=4
		var loadLvlHdrColumn = plf.addColumnSection({title:"POD Details"});			
		var loadLvlHdrCtrl=						
		[
			plf.addDisplayOnly({"label":"Received By",id:"strReceivedBy",width:200}),
			//plf.addDate({"label":"Received Date",id:"dtReceivedDate",inputFormat:"string",InputLength:"100",mandatory:"true",width:200}),
			//plf.addTime({"label":"Received Time",id:"dtReceivedTime",inputFormat:"string",InputLength:"100",mandatory:"true",width:200}),
			plf.addRegexDateTime({"label":"Received Date & Time",dateid:"dtReceivedDate",timeid:"dtReceivedTime"})/*,
			plf.addCheckBox({"labelWidth":250,"label":"Material Received in Good Condition",id:"strMRGC",inputFormat:"string",InputLength:"100",width:200}),
			plf.addCombo({"label":"Received Location",id:"strToRegion",mandatory:"true"})*/
            
		]
		loadLvlHdrColumn.add(loadLvlHdrCtrl);

// free Text Editor
var freeTextEditor = plf.addColumnSection({title:"Notes"});
		
		freeTextEditor.add({
                 xtype: "container",
                 layout: "column",
                 //cls: plf.getContainerCls(),
                 items: 
				 [						
						 Ext.create('Ext.form.field.TextArea', {
							itemId:"strNotes",
							label:"Body",
							height: 150,
							width:plf.screenWidth-120
						})
                 ]
             })			
		
//Main Page Section Starts

		mainpage.ptrMainSection.add(loadLevelHdrColumn)
		//mainpage.ptrMainSection.add(ScheVehDetails)
		//mainpage.ptrMainSection.add(ReportVehDetails)
		mainpage.ptrMainSection.add(loadSum) 
		mainpage.ptrMainSection.add(loadLvlHdrColumn)
		//mainpage.ptrMainSection.add(freeTextEditor)
		mainpage.ptrMainSection.add(ScheVehDetails)
		mainpage.ptrMainSection.add(ReportVehDetails)
		mainpage.dataHistorySectionFlag=true;
		
//Main Page Section ends
		
// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
          /*{
				"controlid":"",
				"tasktype":"onload",
				"input":["strLoadNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"initProfDelLoadTS"
			} ,*/
			{
				"controlid":"strLoadNo",
				"tasktype":"onload",
				"input":["strLoadNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchProfDelLoadTS"
			} ,
			{
				"controlid":"strLoadNo",
				"tasktype":"onenter",
				"input":["strLoadNo"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchProfDelLoadTS"
			},
			{
				"controlid":"strLoadNo",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strLoadNo","strJourneyPlanNo","dtReceivedDate","dtReceivedTime","strMRGC","strNotes","strToRegion"],
				"service":"TMSCoreTransportTS",
				"methodName":"SaveProfDelLoadTS"
			},
			{        
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Print WayBill",
					"input":["strLoadNo"],
					"service":"CoreReportService",
					"methodName":"PrintwaybillloadingReport"
		   }  
 
		];
		
// Event Handlers Mapping ends

// Help link section starts	
		mainpage.hlpLinks=
		{
		"loadNo":
				{
					"hlpType":"Header",
					"hlpScreen":"ProofOfDelivery.PODLoadBuildingHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strLoadNo","child":"LOAD_NO"}
							]
				}

		}
// Help link section ends
	
		mainpage.screenLinks=
		{
			"ship_level":
				{
					"dest":"ProofOfDelivery.ProofofDeliveryShipmentLevel",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
		mainpage.gridPopupLinks=
		{
			"db_shipitemdtl":
			{
				"dest":"ProofOfDelivery.POD_ship_itemdtl",
				"popMethodName":"initPODItemDetailsTs",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"SHIP_NO","dest":"selChartSeries"}
						]
			}
		}
		this.callParent(arguments);
		
	}
});