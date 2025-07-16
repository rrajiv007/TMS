/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	Tyre RFID Installer Summary                                                                		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.3															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
                                 
************************************************************************************************/
Ext.define('CueTrans.view.TyreManagement.TyreRFIDInstallerSum', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Tyre Installer Summary";
		
		plf.columns=4
		var TyreRFIDInstallerHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
		]
		
		var TyreRFIDInstallerFormCtrl=
		[
			plf.addText({"label":"RFID #",id:"strRFID"}),
			plf.addText({"label":"Serial #",id:"strDOT"}),
			plf.addText({"label":"Supplier",id:"strSupplier"}),
			plf.addCombo({"label":"Assigned Vehicle #",id:"strTruckCode"}),
			plf.addCombo({"label":"Tyre Position",id:"strTyrePosition"})	

		]
		
		 TyreRFIDInstallerHdrCollapse.add(TyreRFIDInstallerFormCtrl);									
		//Search Section Ends
		
		//Grid Section Begins
		var TyreRFIDInstallerGridFieldObj=		
		[
			
			{columnname:"RFID #",dataname:"RFID",datatype:"string",width:130},
			{columnname:"Serial #",dataname:"DOT",datatype:"string",width:130},
			{columnname:"Supplier",dataname:"SUPPLIER",datatype:"string",width:130},
            {columnname:"Assigned Vehicle #",dataname:"TRUCK_CODE",datatype:"string",width:130},
			{columnname:"Tyre Position",dataname:"TYRE_POSITION",datatype:"string",width:130},
			{columnname:"Fitment Initial KM",dataname:"FITMENT_INITIAL_KMS",datatype:"string",width:150,colAlign:'center'},
			{columnname:"Installation Remarks",dataname:"INSTALLATION_REMARKS",datatype:"string",width:180},
			
			{columnname:"Created By",dataname:"CREATED_BY",datatype:"string",width:130},
			{columnname:"Created Date",dataname:"CREATED_DATE",datatype:"string",width:130}
			
		]
		var TyreRFIDInstallerGridDtl=										//69997
		{
			title:"",
			id:"TyreRFIDInstallerSummary",
			detail:TyreRFIDInstallerGridFieldObj,
			removeAddDelete:true,
			readonly:true,
			visibleRow:12
		}
		var tyreRFIDInstallGridSection = plf.addGrid(TyreRFIDInstallerGridDtl,this)
		//Grid Section Ends
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(TyreRFIDInstallerHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(tyreRFIDInstallGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		 	{
			"controlid":"",
			"tasktype":"onload",
			"input":[""],
			"service":"CoreInspectionsService",
			"methodName":"initTyreRFIDInstallerSum"
			
			},
			{
		   "controlid":"btnSearch",
			"tasktype":"btnclick",
			"input":["strRFID","strDOT","strSupplier","strTruckCode","strTyrePosition"],
			"service":"CoreInspectionsService",
			"methodName":"fetchTyreRFIDInstallerSum"
		
			}
		];
		mainpage.hlpLinks=
		{
			
		}
		//Event Handlers Mapping Ends


		this.callParent(arguments);
		
	}
});
