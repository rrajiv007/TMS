/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	Tyre Database                                                              		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
                                   
************************************************************************************************/
Ext.define('CueTrans.view.TyreManagement.updateTyreDatabaseDtl', 
{
	extend:"CueTrans.lib.plfTransScreen",
   
	
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Update Tyre Database";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
		]
		mainpage.toolbarActions= [
		    {
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Submit",
                "tooltip": "Click here to submit."
            }
            ]
		//Supplier Master Header Section Begins
		plf.columns=3
		var tyresupplierMstrColumn1 = plf.addColumnSection({});
		
		var tyresupplierMstrCtrl1=						
		[
		    plf.addDisplayOnly({"label":"RFID #",id:"strRFID"}),
			plf.addDisplayOnly({"label":"Serial #","id":"strDOT"}),
			plf.addDisplayOnly({"label":"Supplier","id":"strSupplier"}),
			plf.addDisplayOnly({"label":"Vehicle No","id":"strTruckCode"}),
			
			plf.addDisplayOnly({"label":"Fitment Position","id":"strTyrePosition"}),
			plf.addDisplayOnly({"label":"Fitment Date",id:"strFitmentDate"}),
		]
		
		tyresupplierMstrColumn1.add(tyresupplierMstrCtrl1);  
		
		plf.columns=1
		var tyresupplierMstrColumn2 = plf.addColumnSection({});	
		var tyresupplierMstrCtrl2=	
		[
			
			plf.addText({"labelWidth":480,"label":"Tyre Brand",id:"strTyreBrand"}),
			plf.addText({"labelWidth":480,"label":"Tyre Size",id:"strTyreSize"}),
			plf.addText({"labelWidth":480,"label":"Pattern",id:"strPattern"}),
			
			plf.addText({"labelWidth":480,"label":"LI/SS",id:"strLISS"}),
			plf.addText({"labelWidth":480,"label":"DOT",id:"strTyreDOTValue"}),
			plf.addText({"labelWidth":480,"label":"Inflation Pressure(PSI)",id:"strInflationPressurePSI",inputFormat:'integer'}),
			plf.addText({"labelWidth":480,"label":"Load per Tyre(Kg)-Single Axle",id:"strLoadTyreSingleAxle",inputFormat:'integer'}),
			plf.addText({"labelWidth":480,"label":"Load per Tyre(Kg)-Dual Axle",id:"strLoadTyreDualAxle",inputFormat:'integer'}),
			plf.addText({"labelWidth":480,"label":"Speed Symbol(SS) Km/Hr",id:"strSpeedSymbolSS",inputFormat:'integer'}),
			plf.addText({"labelWidth":480,"label":"Fitment Initial(Km)",id:"strFitmentInitialKM",inputFormat:'integer'}),
			plf.addTextArea({"labelWidth":480,"label":"Installation Remarks",id:"strInstallationRemarks",InputLength:"2000"}),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank()
			//plf.addCombo({"label":"Truck Code",id:"strTruckCode","mandatory":"true"}),
			//plf.addCombo({"label":"Tyre Position",id:"strTyrePosition","mandatory":"true"})		   
		]
		tyresupplierMstrColumn2.add(tyresupplierMstrCtrl2);
		//Supplier Master Header Section Ends
		
		
		
		//Add Header Section to Main Page
		mainpage.ptrMainSection.add(tyresupplierMstrColumn1)
		mainpage.ptrMainSection.add(tyresupplierMstrColumn2)
		
		
		mainpage.dataHistorySectionFlag=true;
		
		// for green line
		//tyresupplierMstrColumn.add(plf.addStripLine({}));
		//mainpage.ptrMainSection.add(tyresupplierMstrColumn)//add hdr details
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
					"controlid":"",
					"tasktype":"onload",
					"input":["strRFID","strDOT","strSupplier","strTruckCode","strTyrePosition"],
					"service":"CoreInspectionsService",
					"methodName":"initupdateTyreDBTS"
			},		
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Submit",
					"input":["strRFID","strDOT","strSupplier","strTruckCode","strTyrePosition","strTyreBrand",
					        "strTyreSize","strPattern","strLISS","strTyreDOTValue","strInflationPressurePSI","strLoadTyreSingleAxle",
							"strLoadTyreDualAxle","strSpeedSymbolSS","strFitmentInitialKM","strInstallationRemarks"],
					"service":"CoreInspectionsService",
					"methodName":"submitupdateTyreDBTS",
					"msg":"Are you sure you want to submit?"
			}
		];
		//Event Handlers Mapping Ends
		mainpage.screenLinks=
		{

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
