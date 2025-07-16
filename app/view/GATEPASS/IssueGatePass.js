/************************************************************************************************
Modification History        									                               	
************************************************************************************************
Description : GATEPASS -Issue Gate Pass
Author      : Raj                                                           		         
Version     : 1.0.0
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/

Ext.define('CueTrans.view.GATEPASS.IssueGatePass',

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Issue Gate Pass";
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;			
	    mainpage.toolbarLinks=
		[
						
		]
		//Tool bar Section begins
		mainpage.toolbarActions= 
		[
		    
			{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			
			{
                "name": "Vehicle In",
                "tooltip": "Click here to vehicle in.",
				"msg":"Are you sure about Vehicle In?"
            },
			{
                "name": "Vehicle Out",
                "tooltip": "Click here to vehicle out.",
				"msg":"Are you sure about Vehicle Out?"
            },
			{
                "name": "Print Gate Pass",
                "tooltip": "Click here to print gate pass."
            }
			
        ]
		//Tool bar Section ends		
		
		//  Header Section 	
		plf.columns=4
		var IssueGPHdrColumn = plf.addColumnSection({});			
		var IssueGPHdrCtrl=						
		[
			plf.addHlpText({"label":"Gate Pass Number",id:"strGatePassNo",hlpLinkID:"GPNo",width:200},this),
			//plf.addDisplayOnly({"label":"Gate Pass Number",id:"strGatePassNo"}), 
			plf.addText({"label":"Vehicle Number",id:"strVehicleNo","mandatory":"true"}),			
			plf.addText({"label":"Driver Name",id:"strDriverName","mandatory":"true"}),
			plf.addText({"label":"Driver Contact",id:"strDriverContact","mandatory":"true"}),	
			plf.addDisplayOnly({"label":"Issued By",id:"strIssuedBy"}),
			plf.addDisplayOnly({"label":"Vehicle In Date/Time",id:"dtVehicleInDT"}),
			plf.addDisplayOnly({"label":"Vehicle Out Date/Time",id:"dtVehicleOutDT"}),
			plf.addDisplayOnly({"label":"Gate Pass Status",id:"strStatus"})
		]
		IssueGPHdrColumn.add(IssueGPHdrCtrl);
       
	   
		
		/*** PO / Vendor DO Details start here	*****/

		var POVendorDOSection = plf.addColumnSection({});
		var POVendorDOObj=							
		[
			{columnname:"S.No.",dataname:"SL_NO",datatype:"string",width:80,editControl:"textbox",inputFormat:"integer",hidden:true},
			{columnname:"PO Number",dataname:"PO_NUMBER",datatype:"string",editControl:"textbox",width:150},
			{columnname:"PO Date",dataname:"PO_DATE",datatype:"string",editControl:"date",width:150},
			{columnname:"Vendor Number",dataname:"VENDOR_NUMBER",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Vendor Name",dataname:"VENDOR_NAME",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Vendor DO Number",dataname:"VENDOR_DO_NUMBER",datatype:"string",editControl:"textbox",width:150}
		]
		var POVendorDoDtl=								
		{
			title:"PO/Vendor DO Details",
			id:"POVenDODtl",
			detail:POVendorDOObj,
			selDelProcess:'Y',
			visibleRow:14,
			//removeAddDelete:true,
			//removePaging:true
		}	
			 
		var  gridSection = plf.addGrid(POVendorDoDtl,this)	  
	    POVendorDOSection.add(gridSection);
		/**** PO / Vendor DO Details end here	****/
		
		
		
		
        //Main Page Section Starts

		mainpage.ptrMainSection.add(IssueGPHdrColumn)
		mainpage.ptrMainSection.add(POVendorDOSection)
		mainpage.dataHistorySectionFlag=true;
		
	    //Main Page Section ends
			
	    // Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
          {
				"controlid":"",
				"tasktype":"onload",
				"input":["strGatePassNo"],
				"service":"GPCoreServiceTS",
				"methodName":"initGateIssueTS"
			},
			{
				"controlid":"strGatePassNo",
				"tasktype":"onenter",
				"input":["strGatePassNo"],
				"service":"GPCoreServiceTS",
				"methodName":"onenterGatePassNoTS"
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Vehicle In",
				"input":["strGatePassNo","strVehicleNo","strDriverName","strDriverContact","strIssuedBy","dtVehicleInDT","dtVehicleOutDT","strStatus","POVenDODtl"],
				"service":"GPCoreServiceTS",
				"methodName":"vehicleinTS"				
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Vehicle Out",
				"input":["strGatePassNo","strVehicleNo","strDriverName","strDriverContact","strIssuedBy","dtVehicleInDT","dtVehicleOutDT","strStatus","POVenDODtl"],
				"service":"GPCoreServiceTS",
				"methodName":"vehicleoutTS"				
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print Gate Pass",
				"input":["strGatePassNo"],
				"service":"CoreReportService",
				"methodName":"PrintissueGPReport"				
			}
 
		];
		
		// Event Handlers Mapping ends
		mainpage.hlpLinks=
		{
		    "GPNo":
					{
						"hlpType":"Header",
						"hlpScreen":"GATEPASS.IssueGatePassHelp",
						"send":[
								{"parent":"","child":""}
							   ],
						"receive":[
								  {"parent":"strGatePassNo","child":"GATE_PASS_NUMBER"}/*,
								  {"parent":"dtServiceReqDT","child":"SERVICE_REQUEST_DT"},
								  {"parent":"strShortDesc","child":"SHORT_DESC"},
								  {"parent":"strSRStatus","child":"STATUS"},
								  {"parent":"strPONumber","child":"PO_NUMBER"},
								  {"parent":"strIncoterms","child":"INCOTERMS"},
								  {"parent":"iAmendmentNo","child":"AMENDMENT_NO"},
								  {"parent":"strRequesterName","child":"REQUESTER_NAME"},
								  {"parent":"strRefIndicator","child":"REF_INDICATOR"}*/
								]
					}

		}
		mainpage.gridPopupLinks=
		{
			
		}
		mainpage.screenLinks=
		{
					
		}
		this.callParent(arguments);
		
	}
});