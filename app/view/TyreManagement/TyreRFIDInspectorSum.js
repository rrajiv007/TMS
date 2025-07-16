/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	Tyre RFID Inspector Summary                                                                		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.3															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
                                 
************************************************************************************************/
Ext.define('CueTrans.view.TyreManagement.TyreRFIDInspectorSum', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Tyre Inspector Summary";
		
		plf.columns=4
		var TyreRFIDInspectorHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
		]
		
		var TyreRFIDInspectorFormCtrl=
		[
			plf.addText({"label":"RFID #",id:"strRFID"}),
			plf.addText({"label":"Serial #",id:"strDOT"}),
			plf.addText({"label":"Supplier",id:"strSupplier"}),
			plf.addCombo({"label":"Assigned Vehicle #",id:"strTruckCode"}),
			plf.addCombo({"label":"Tyre Position",id:"strTyrePosition"}),
			
			plf.addDate({"label":"Scan Date",id:"strScanDate","mandatory":"true"}),
		    plf.addCombo({"label":"Location",id:"strScanLocation"}),
			plf.addCombo({"label":"Status","id":"strStatus"}),
			plf.addText({"label":"Remarks",id:"strInspectionRemarks"})
			

		]
		
		 TyreRFIDInspectorHdrCollapse.add(TyreRFIDInspectorFormCtrl);									
		//Search Section Ends
		
		//Grid Section Begins
		var TyreRFIDInspectorGridFieldObj=		
		[
			
			{columnname:"RFID #",dataname:"RFID",datatype:"string",width:130,gridpopup:true,linkId:"ViewDocPopup","tooltip":"Click here to view uploaded photo."},
			
			
			{columnname:"Serial #",dataname:"DOT",datatype:"string",width:130},
			{columnname:"Supplier",dataname:"SUPPLIER",datatype:"string",width:130},
            {columnname:"Assigned Vehicle #",dataname:"TRUCK_CODE",datatype:"string",width:130},
			{columnname:"Tyre Position",dataname:"TYRE_POSITION",datatype:"string",width:130},
			
			{columnname:"Scan Date",dataname:"SCAN_DATE",datatype:"string",width:130,"mandatory":"true"},
            {columnname:"Location",dataname:"LOCATION",datatype:"string",width:130},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:70},
			{columnname:"Version",dataname:"VERSION",datatype:"string",width:80},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:130},
			{columnname:"Arrived Vehicle #",dataname:"ARRIVED_VEHICLE",datatype:"string",width:130},
			{columnname:"Mismatch Reason",dataname:"MISMATCH_REASON",datatype:"string",width:130},
			{columnname:"Created By",dataname:"CREATED_BY",datatype:"string",width:130},
			{columnname:"Created Date",dataname:"CREATED_DATE",datatype:"string",width:130},
			{columnname:"Changed Vehicle #",dataname:"CHANGED_VEHICLE",datatype:"string",width:130,hidden:true}
			
			
		]
		var TyreRFIDInspectorGridDtl=		
		{
			title:"",
			id:"TyreRFIDInspectorSummary",
			detail:TyreRFIDInspectorGridFieldObj,
			removeAddDelete:true,
			readonly:true,
			visibleRow:12
		}
		var tyreRFIDInspectorGridSection = plf.addGrid(TyreRFIDInspectorGridDtl,this)
		//Grid Section Ends
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(TyreRFIDInspectorHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(tyreRFIDInspectorGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		 	{
			"controlid":"",
			"tasktype":"onload",
			"input":[""],
			"service":"CoreInspectionsService",
			"methodName":"initTyreRFIDInspectorSum"
			
			},
			{
		   "controlid":"btnSearch",
			"tasktype":"btnclick",
			"input":["strRFID","strDOT","strSupplier","strTruckCode","strTyrePosition","strScanDate","strScanLocation","strInspectionRemarks","strStatus"],
			"service":"CoreInspectionsService",
			"methodName":"fetchTyreRFIDInspectorSum"
		
			}
		];
		mainpage.hlpLinks=
		{
			
		}
		//Event Handlers Mapping Ends
		/******  GRIDPOPUP LINK BEGINS******/
		mainpage.gridPopupLinks=
		{
		"ViewDocPopup":
			{
				"dest":"TyreManagement.TyreUploadedPhotoPopup",
				"popMethodName":"initRFIDTyrePhotopopup",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"RFID","dest":"strRFID"},
						{"src":"VERSION","dest":"strDocNo"},
						{"src":"DOT","dest":"strDOT"}
						
						]
			}
		
		}
		/******  GRIDPOPUP LINK END******/

		this.callParent(arguments);
		
	}
});
