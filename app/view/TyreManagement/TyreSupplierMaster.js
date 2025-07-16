/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	Tyre Supplier                                                                		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
                                   
************************************************************************************************/
Ext.define('CueTrans.view.TyreManagement.TyreSupplierMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
   
	
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Tyre Supplier";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Tyre Supplier Summary","linkid":"tyresupplierMstr","tooltip":"Click here for tyre supplier summary."}
		]
		mainpage.toolbarActions= [
		    {
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Save",
                "tooltip": "Click here to save."
            },
			{
                "name": "Delete",
                "tooltip": "Click here to delete."
            }
            ]
		//Supplier Master Header Section Begins
		plf.columns=4
		var tyresupplierMstrColumn = plf.addColumnSection({});	
		var tyresupplierMstrCtrl=	
		[
			plf.addText({"label":"RFID #",id:"strRFID","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addText({"label":"Serial #",id:"strDOT","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addCombo({"label":"Supplier",id:"strSupplier","mandatory":"true"}),
		   
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
					"methodName":"initTyreSuppierTS"
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
					"input":["strRFID","strDOT","strSupplier"],
					"service":"CoreInspectionsService",
					"methodName":"saveTyreSuppierTS"
			},	
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Delete",
					"input":["strRFID","strDOT","strSupplier"],
					"service":"CoreInspectionsService",
					"methodName":"deleteTyreSerialNo",
					"msg" : "Are you sure want to delete ?"
			},		
			{
					"controlid":"strDOT",
					"tasktype":"onenter",
					"input":["strDOT"],
					"service":"CoreInspectionsService",
					"methodName":"onenterTyreSerialNo"
			}
		];
		//Event Handlers Mapping Ends
		mainpage.screenLinks=
		{
			"tyresupplierMstr":
				{
					"dest":"TyreManagement.TyreSupplierSum",
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
