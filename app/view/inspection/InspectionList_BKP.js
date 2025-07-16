/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var  		                                   
************************************************************************************************/
Ext.define('CueTrans.view.inspection.InspectionList', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
	//	var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Inspection List";
		
		//Inspection Search Section Begins
		plf.columns=3
		var helpOninspectionHdrCollapse = plf.addCollapseSection({title:"", collapsed: true});	//69997
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Create an Inspection Advice","linkid":"Ins_InspectionAdvice"}
		]
		
		var helpOninspectionFormCtrl=									//69997
		[
			plf.addText({"label":"Inspection No From",id:"strInspectionNoFrom","anywhereSearch":"true"}),
			plf.addText({"label":"Inspection No To",id:"strInspectionNoTo","anywhereSearch":"true"}),
			plf.addHlpText({"label":"Request No",id:"strRequestNo",hlpLinkID:"transreqno"},this),	
			plf.addHlpText({"label":"Load No",id:"strLoadNo",hlpLinkID:"LoadNo"},this),
				
			plf.addHlpText({"label":"Truck Code",id:"strTruckCode",hlpLinkID:"truckno"},this),
			plf.addDate({"label":"Inspection Date From",id:"strInspectionDateFrom"}),
		    plf.addDate({"label":"Inspection Date To",id:"strInspectionDateTo"}),
			plf.addHlpText({"label":"Carrier Code",id:"strCarrierCode",hlpLinkID:"carrierno"},this),
			plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory"}),
			plf.addText({"label":"Vehicle Registration No",id:"strRegNo"}),
			plf.addHlpText({"label":"Driver Code",id:"strDriverCode",hlpLinkID:"drivercode"},this),
			plf.addText({"label":"Driver Licence Number",id:"strDriverLicenceNo"}),
			plf.addText({"label":"Driver Mobile Number",id:"strDriverMobileNo"}),
			plf.addHlpText({"label":"Trailer Code",id:"strTrailerCode",hlpLinkID:"trailerno"},this),
			plf.addHlpText({"label":"Pickup Point",id:"strPickUpPoint",hlpLinkID:"pickuppoint"},this),
			plf.addCombo({"label":"Status",id:"strStatus"}),
		]
		
		helpOninspectionHdrCollapse.add(helpOninspectionFormCtrl);
		//Inspection Search Section Ends
		
		//Inspection Grid Section Begins
		var helpOninspectionGridFieldObj=													//69997
		[
			{columnname:"Inspection No",dataname:"INSPECTION_NO",datatype:"string",width:150,linkId:"NEXT_LINKID","linkType":"DYN","tooltip":"Click here to launch inspection details."},
			{columnname:"Link ID",dataname:"NEXT_LINKID",width:100,hidden:true},
            {columnname:"Request No",dataname:"REQUEST_NO",datatype:"string",width:150},
            {columnname:"Load No",dataname:"WAYBILL_NO",datatype:"string",width:130},
			{columnname:"Vehicle",dataname:"TRUCK_CODE",datatype:"string",width:130},
			{columnname:"Driver",dataname:"DRIVER_CODE",datatype:"string",width:130},
			{columnname:"Driver<BR>Mobile No",dataname:"MOBILE_NO",datatype:"string",width:130},
			{columnname:"Carrier",dataname:"CARRIER",datatype:"string",width:130},
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:130},
			{columnname:"Inspection Date<BR>& Time",dataname:"INS_DT_TIME",datatype:"string",width:130},
			//{columnname:"Inspector Name",dataname:"INSPECTOR_NAME",datatype:"string",width:130},
            {columnname:"Inspection Status",dataname:"INS_STATUS",datatype:"string",width:220}
			
		]
		var helpOninspectionGridDtl=													//69997
		{
			title:"Inspection Details",
			id:"inspectionresultCache",
			detail:helpOninspectionGridFieldObj,
			removeAddDelete:true,
			visibleRow:12
		}
		var helpGridSection = plf.addGrid(helpOninspectionGridDtl,this)						//69997
		//Inspection Grid Section Ends
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(helpOninspectionHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		 
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreInspectionsService",
				"methodName":"initInspAdvSrchScrTS"
				//"methodName":"mobileFetchInspection"
				//completed
				},
            {
			   "controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strInspectionNoFrom","strInspectionNoTo","strInspectionDateFrom",
				"strInspectionDateTo","strTruckCode","strDriverCode","strStatus","strPickUpPoint",
				"strCustomerVendorCode","strTrailerCode","strAssetCode"],
				"service":"CoreInspectionsService",
				"methodName":"fetchAllInspectionAdviceScrTS"
			//completed
			}				
		];
		
			
		//Event Handlers Mapping Ends
		
		
		
		mainpage.hlpLinks=
		{
			"truckcode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTruckCode","child":"TRUCK_CODE"}
							
							]
				},
			"DriverCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strDriverCode","child":"DRIVER_CODE"}
							
							]
				}
				
			
				
				
		}
			
		//Generate Screen Section
		
		mainpage.screenLinks=
	
		{	"inspectionmaster":
				{
					"dest":"inspection.InspectionAdviceMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"INSPECTION_NO","dest":"strInspectionNo"}
							]
				},
			"Ins_InspectionAdvice":
				{
					"dest":"inspection.InspectionAdviceMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
				
		}
	/*	mainpage.generateScreen();
		
		
		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
		
	}
});
