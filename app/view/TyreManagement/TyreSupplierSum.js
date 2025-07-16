/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	Tyre Supplier Summary                                                                		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.3															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
                                 
************************************************************************************************/
Ext.define('CueTrans.view.TyreManagement.TyreSupplierSum', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Tyre Supplier Summary";
		
		plf.columns=4
		var tyreSupplierHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
		]
		
		var tyreSupplierFormCtrl=
		[
			plf.addText({"label":"RFID #",id:"strRFID"}),
			plf.addText({"label":"Serial #",id:"strDOT"}),
			plf.addText({"label":"Supplier",id:"strSupplier"}),

		]
		
		 tyreSupplierHdrCollapse.add(tyreSupplierFormCtrl);									
		//Search Section Ends
		
		//Grid Section Begins
		var tyreSupplierGridFieldObj=												//69997
		[
			
			{columnname:"RFID #",dataname:"RFID",datatype:"string",width:130},
			{columnname:"Serial #",dataname:"DOT",datatype:"string",width:130},
			{columnname:"Supplier",dataname:"SUPPLIER",datatype:"string",width:130},			
			{columnname:"Created By",dataname:"CREATED_BY",datatype:"string",width:130},
			{columnname:"Created Date",dataname:"CREATED_DATE",datatype:"string",width:130}
		]
		var tyreSupplierGridDtl=										//69997
		{
			title:"",
			id:"tyreSupplierSummary",
			detail:tyreSupplierGridFieldObj,
			removeAddDelete:true,
			readonly:true,
			visibleRow:12
		}
		var tyreSuppGridSection = plf.addGrid(tyreSupplierGridDtl,this)
		//Grid Section Ends
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(tyreSupplierHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(tyreSuppGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		 	{
			"controlid":"",
			"tasktype":"onload",
			"input":[""],
			"service":"CoreInspectionsService",
			"methodName":"initTyreSupplierSumTS"
			
			},
			{
		   "controlid":"btnSearch",
			"tasktype":"btnclick",
			"input":["strRFID","strDOT","strSupplier"],
			"service":"CoreInspectionsService",
			"methodName":"fetchTyreSupplierSumTS"
		
			}
		];
		mainpage.hlpLinks=
		{
			
		}
		//Event Handlers Mapping Ends


		this.callParent(arguments);
		
	}
});
