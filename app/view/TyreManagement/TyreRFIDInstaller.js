/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	Tyre RFID Installer                                                                		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
                                   
************************************************************************************************/
Ext.define('CueTrans.view.TyreManagement.TyreRFIDInstaller', 
{
	extend:"CueTrans.lib.plfTransScreen",
   
	
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Tyre Installer";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Tyre Installer Summary","linkid":"tyrerfidInstallMstr","tooltip":"Click here for tyre installer summary."}
		]
		mainpage.toolbarActions= [
		    {
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Save",
                "tooltip": "Click here to save."
            }
            ]
		//Supplier Master Header Section Begins
		plf.columns=4
		var tyresupplierMstrColumn = plf.addColumnSection({});	
		var tyresupplierMstrCtrl=	
		[
			plf.addText({"label":"RFID #",id:"strRFID","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Serial #","id":"strDOT"}),
			plf.addDisplayOnly({"label":"Supplier","id":"strSupplier"}),
			plf.addCombo({"label":"Assign Vehicle #",id:"strTruckCode","mandatory":"true"}),
			plf.addCombo({"label":"Tyre Position",id:"strTyrePosition","mandatory":"true"}),
            plf.addText({"label":"Fitment Initial KM",id:"strFitmentInitialKM",inputFormat:"integer"}),
            plf.addTextArea({"label":"Installation Remarks",id:"strInstallationRemarks",InputLength:"2000"}),
			plf.addBlank(), 
			
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank()		
		]
		tyresupplierMstrColumn.add(tyresupplierMstrCtrl);
		//Supplier Master Header Section Ends
		
		
		
		//Add Header Section to Main Page
		mainpage.ptrMainSection.add(tyresupplierMstrColumn)
		
		
		mainpage.dataHistorySectionFlag=true;
		
		// for green line
		tyresupplierMstrColumn.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(tyresupplierMstrColumn)//add hdr details
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreInspectionsService",
					"methodName":"initrfidinstallerTS"
			},		
			{
					"controlid":"strRFID",
					"tasktype":"onenter",
					"input":["strRFID"],
					"service":"CoreInspectionsService",
					"methodName":"fetchRfidDtl"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Save",
					"input":["strRFID","strDOT","strTruckCode","strTyrePosition","strFitmentInitialKM","strInstallationRemarks"],
					"service":"CoreInspectionsService",
					"methodName":"saverfidinstallerTS"
			}
		];
		//Event Handlers Mapping Ends
		mainpage.screenLinks=
		{
			"tyrerfidInstallMstr":
				{
					"dest":"TyreManagement.TyreRFIDInstallerSum",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}	
		//Generate Screen Section
		//mainpage.generateScreen();
		
		mainpage.screenModes=
		{
		
		}
		
		
		mainpage.hlpLinks=
		{

			
		}
		
		/*Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
	}
});
